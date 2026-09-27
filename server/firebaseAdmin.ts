import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore, FieldValue, Firestore } from 'firebase-admin/firestore';

/**
 * Phase 13A — Server-Only Firebase Admin Initialization
 * 
 * SECURITY & ARCHITECTURAL RULES:
 * 1. This file runs ONLY on the server. Never import this into src/ or client code.
 * 2. Credentials are read exclusively from environment variables:
 *    - FIREBASE_PROJECT_ID
 *    - FIREBASE_CLIENT_EMAIL
 *    - FIREBASE_PRIVATE_KEY
 * 3. Graceful degradation: If any environment variable is missing or malformed,
 *    the server DOES NOT CRASH. It reports that Firebase Admin is not configured.
 * 4. Private keys with escaped newlines (\n) are properly parsed.
 */

let firestoreDb: Firestore | null = null;
let initAttempted = false;

/**
 * Checks if Firebase Admin environment variables are present.
 */
export function isFirebaseAdminConfigured(): boolean {
  return Boolean(
    process.env.FIREBASE_PROJECT_ID &&
    process.env.FIREBASE_CLIENT_EMAIL &&
    process.env.FIREBASE_PRIVATE_KEY
  );
}

/**
 * Returns the initialized Firestore Admin instance, or null if unconfigured/failed.
 */
export function getFirestoreAdmin(): Firestore | null {
  if (firestoreDb) {
    return firestoreDb;
  }
  if (initAttempted) {
    return null;
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  let privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) {
    console.info(
      '[Firebase Admin] Not configured: FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, or FIREBASE_PRIVATE_KEY is missing. ' +
      'Server-side Firestore membership updates remain disabled until credentials are provided.'
    );
    initAttempted = true;
    return null;
  }

  try {
    // Correctly format escaped newlines if passed in single-line env var format
    if (privateKey.includes('\\n')) {
      privateKey = privateKey.replace(/\\n/g, '\n');
    }

    // Ensure standard PEM header and footer if omitted
    if (!privateKey.includes('-----BEGIN PRIVATE KEY-----')) {
      privateKey = `-----BEGIN PRIVATE KEY-----\n${privateKey.trim()}\n-----END PRIVATE KEY-----\n`;
    }

    if (!getApps().length) {
      initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey
        })
      });
    }

    firestoreDb = getFirestore();
    initAttempted = true;
    console.info(`[Firebase Admin] Successfully initialized for project "${projectId}".`);
    return firestoreDb;
  } catch (error: any) {
    console.warn('[Firebase Admin] Initialization failed:', error?.message);
    initAttempted = true;
    return null;
  }
}

/**
 * Result structure for membership operations
 */
export interface MembershipUpdateResult {
  success: boolean;
  status: 'updated' | 'already_processed' | 'user_not_found' | 'not_configured' | 'error';
  userId?: string;
  message: string;
}

// In-memory set for rapid local deduplication of webhook event IDs
const processedWebhookEvents = new Set<string>();

/**
 * Updates a user's membership to Premium after a verified Stripe checkout event.
 * 
 * IDEMPOTENCY & SAFETY GUARANTEES:
 * 1. Checks if the Stripe event has already been processed (via Firestore collection and memory).
 * 2. Verifies that the user exists in `users/{userId}`. If the user doesn't exist, does NOT
 *    create a random account and does NOT grant Premium.
 * 3. Does not trust client-supplied plan values; unconditionally writes `plan: "premium"`.
 * 4. Records server timestamp for `premiumSince`.
 * 5. Stores payment/subscription reference metadata in a separate subfield (`stripeSubscription`),
 *    keeping billing bookkeeping separate from core membership permission logic.
 */
export async function upgradeUserToPremium(
  userId: string,
  eventDetails: {
    eventId: string;
    subscriptionId?: string | null;
    customerId?: string | null;
    billingInterval?: string | null;
  }
): Promise<MembershipUpdateResult> {
  const { eventId, subscriptionId, customerId, billingInterval } = eventDetails;

  // 1. In-memory deduplication check
  if (eventId && processedWebhookEvents.has(eventId)) {
    console.info(`[Membership Admin] Duplicate event ${eventId} detected in memory cache. Skipping.`);
    return {
      success: true,
      status: 'already_processed',
      userId,
      message: 'Event already processed.'
    };
  }

  const db = getFirestoreAdmin();
  if (!db) {
    console.warn('[Membership Admin] Cannot update user membership: Firebase Admin is not configured.');
    return {
      success: false,
      status: 'not_configured',
      userId,
      message: 'Firebase Admin is not configured. Membership update skipped safely.'
    };
  }

  try {
    // 2. Check persistent event deduplication in Firestore: `stripe_events/{eventId}`
    const eventDocRef = db.collection('stripe_events').doc(eventId);
    const eventDoc = await eventDocRef.get();
    if (eventDoc.exists) {
      processedWebhookEvents.add(eventId);
      console.info(`[Membership Admin] Duplicate event ${eventId} found in Firestore stripe_events. Skipping.`);
      return {
        success: true,
        status: 'already_processed',
        userId,
        message: 'Event was previously processed and logged.'
      };
    }

    // 3. User verification: Ensure user exists in `users/{userId}`
    const userDocRef = db.collection('users').doc(userId);
    const userDoc = await userDocRef.get();

    if (!userDoc.exists) {
      console.warn(`[Membership Admin] User document "users/${userId}" does not exist in Firestore. Skipping upgrade.`);
      return {
        success: false,
        status: 'user_not_found',
        userId,
        message: `User ${userId} not found in Firestore. No random account created.`
      };
    }

    const currentData = userDoc.data() || {};
    const now = FieldValue.serverTimestamp();

    // 4. Perform atomic batch update for user doc and event deduplication doc
    const batch = db.batch();

    const userUpdatePayload: Record<string, any> = {
      plan: 'premium',
      isPremium: true,
      updatedAt: now,
      // Separate subscription tracking from membership permissions
      stripeSubscription: {
        subscriptionId: subscriptionId || null,
        customerId: customerId || null,
        billingInterval: billingInterval || 'monthly',
        status: 'active',
        lastEventId: eventId,
        updatedAt: now
      }
    };

    // Only set premiumSince if it doesn't already exist
    if (!currentData.premiumSince) {
      userUpdatePayload.premiumSince = now;
    }

    batch.update(userDocRef, userUpdatePayload);

    // Record processed event to guarantee persistent idempotency
    batch.set(eventDocRef, {
      eventId,
      eventType: 'checkout.session.completed',
      userId,
      subscriptionId: subscriptionId || null,
      customerId: customerId || null,
      processedAt: now,
      status: 'succeeded'
    });

    await batch.commit();

    // Mark as processed in memory
    processedWebhookEvents.add(eventId);
    console.info(`[Membership Admin] Successfully upgraded user "${userId}" to Premium (Event: ${eventId}).`);

    return {
      success: true,
      status: 'updated',
      userId,
      message: `User ${userId} successfully updated to Premium.`
    };
  } catch (error: any) {
    console.error(`[Membership Admin Error] Failed to update user ${userId}:`, error?.message);
    return {
      success: false,
      status: 'error',
      userId,
      message: error?.message || 'Unknown Firestore update error.'
    };
  }
}

/**
 * Handles subscription cancellation or deletion events idempotently.
 */
export async function downgradeUserMembership(
  userId: string,
  eventDetails: {
    eventId: string;
    subscriptionId?: string | null;
  }
): Promise<MembershipUpdateResult> {
  const { eventId, subscriptionId } = eventDetails;

  if (eventId && processedWebhookEvents.has(eventId)) {
    return {
      success: true,
      status: 'already_processed',
      userId,
      message: 'Event already processed.'
    };
  }

  const db = getFirestoreAdmin();
  if (!db) {
    return {
      success: false,
      status: 'not_configured',
      userId,
      message: 'Firebase Admin not configured.'
    };
  }

  try {
    const userDocRef = db.collection('users').doc(userId);
    const userDoc = await userDocRef.get();

    if (!userDoc.exists) {
      return {
        success: false,
        status: 'user_not_found',
        userId,
        message: 'User document not found.'
      };
    }

    const now = FieldValue.serverTimestamp();
    const batch = db.batch();

    batch.update(userDocRef, {
      plan: 'free',
      isPremium: false,
      updatedAt: now,
      'stripeSubscription.status': 'canceled',
      'stripeSubscription.canceledAt': now,
      'stripeSubscription.lastEventId': eventId
    });

    const eventDocRef = db.collection('stripe_events').doc(eventId);
    batch.set(eventDocRef, {
      eventId,
      eventType: 'customer.subscription.deleted',
      userId,
      subscriptionId: subscriptionId || null,
      processedAt: now,
      status: 'canceled'
    });

    await batch.commit();
    processedWebhookEvents.add(eventId);

    console.info(`[Membership Admin] Downgraded user "${userId}" to Free upon subscription cancellation.`);
    return {
      success: true,
      status: 'updated',
      userId,
      message: `User ${userId} membership adjusted to Free.`
    };
  } catch (error: any) {
    console.error(`[Membership Admin Error] Failed to downgrade user ${userId}:`, error?.message);
    return {
      success: false,
      status: 'error',
      userId,
      message: error?.message || 'Firestore error during downgrade.'
    };
  }
}
