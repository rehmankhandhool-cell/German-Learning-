import { getFirestore, doc, getDoc, setDoc, Firestore } from 'firebase/firestore';
import { getApps } from 'firebase/app';
import { DailyUsage, UsageTrackableFeature, LearningFeature, UserProfile } from '../types';
import { authService } from './authService';

// Read runtime environment variables
const env = (import.meta as any).env || {};
const firebaseApiKey = env.VITE_FIREBASE_API_KEY;
const firebaseProjectId = env.VITE_FIREBASE_PROJECT_ID;

// Firestore instance (Active only when Firebase configuration is provided)
let firestoreDb: Firestore | null = null;

if (firebaseApiKey && firebaseProjectId && getApps().length > 0) {
  try {
    firestoreDb = getFirestore();
  } catch (err) {
    console.warn('Firestore usageService initialization notice:', err);
  }
}

// Local storage persistent fallback key prefix
const STORAGE_PREFIX = 'germanteacher_daily_usage_';

// Usage change listeners for reactive UI updates
type UsageListener = (usage: DailyUsage) => void;
const listeners: Set<UsageListener> = new Set();

/**
 * Returns today's date formatted as YYYY-MM-DD
 */
export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Returns the effective user identifier for usage tracking.
 * Strictly uses the authenticated user's ID to prevent accessing other users' data.
 */
function resolveUserId(user?: UserProfile | null): string {
  if (user && (user.id || user.userId)) return user.id || user.userId!;
  const currentUser = authService.getCurrentUser();
  if (currentUser && (currentUser.id || currentUser.userId)) return currentUser.id || currentUser.userId!;
  return 'guest';
}

/**
 * Construct local storage key for a specific user and date
 */
function getStorageKey(userId: string, date: string): string {
  return `${STORAGE_PREFIX}${userId}_${date}`;
}

/**
 * Creates a clean default zero-count usage record for a given date and user
 */
function createDefaultUsage(date: string, userId: string): DailyUsage {
  return {
    date,
    userId,
    aiTeacherMessages: 0,
    conversationSessions: 0,
    speakingPractices: 0,
    vocabularyWords: 0,
    updatedAt: new Date().toISOString()
  };
}

/**
 * Synchronously retrieves today's usage from memory / localStorage cache
 */
export function getTodayUsageSync(user?: UserProfile | null): DailyUsage {
  const userId = resolveUserId(user);
  const today = getTodayDateString();
  const key = getStorageKey(userId, today);

  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      const parsed = JSON.parse(raw) as DailyUsage;
      if (parsed && parsed.date === today) {
        return parsed;
      }
    }
  } catch (_e) {
    // Ignore storage parsing error
  }

  return createDefaultUsage(today, userId);
}

/**
 * TASK 5: getTodayUsage()
 * Asynchronously retrieves today's usage for the user.
 * Reads from Firestore (/users/{userId}/dailyUsage/{date}) if configured,
 * or from localStorage fallback.
 * If today's record does not exist, returns zeroed usage.
 */
export async function getTodayUsage(user?: UserProfile | null): Promise<DailyUsage> {
  const userId = resolveUserId(user);
  const today = getTodayDateString();
  const fallbackUsage = getTodayUsageSync(user);

  // If user is authenticated and Firestore is active, query Firestore
  if (firestoreDb && userId !== 'guest') {
    try {
      const usageDocRef = doc(firestoreDb, 'users', userId, 'dailyUsage', today);
      const snapshot = await getDoc(usageDocRef);

      if (snapshot.exists()) {
        const data = snapshot.data() as Partial<DailyUsage>;
        const mergedUsage: DailyUsage = {
          date: today,
          userId,
          aiTeacherMessages: Number(data.aiTeacherMessages) || 0,
          conversationSessions: Number(data.conversationSessions) || 0,
          speakingPractices: Number(data.speakingPractices) || 0,
          vocabularyWords: Number(data.vocabularyWords) || 0,
          updatedAt: data.updatedAt || new Date().toISOString()
        };

        // Sync local cache
        try {
          localStorage.setItem(getStorageKey(userId, today), JSON.stringify(mergedUsage));
        } catch (_e) {
          // Ignore local storage error
        }

        return mergedUsage;
      }
    } catch (err) {
      console.warn('Firestore getTodayUsage read fallback:', err);
    }
  }

  return fallbackUsage;
}

/**
 * Maps feature name to feature counter value
 */
export function getUsageForFeature(
  feature: UsageTrackableFeature | LearningFeature | string,
  usage: DailyUsage
): number {
  switch (feature) {
    case 'aiTeacher':
      return usage.aiTeacherMessages;
    case 'conversation':
    case 'conversationPractice':
      return usage.conversationSessions;
    case 'speaking':
    case 'speakingPractice':
      return usage.speakingPractices;
    case 'vocabulary':
      return usage.vocabularyWords;
    default:
      return 0;
  }
}

/**
 * Convenience helper to get usage count directly
 */
export async function getFeatureUsageCount(
  feature: UsageTrackableFeature | LearningFeature | string,
  user?: UserProfile | null
): Promise<number> {
  const usage = await getTodayUsage(user);
  return getUsageForFeature(feature, usage);
}

/**
 * TASK 6: incrementUsage(feature)
 * Increases ONLY the selected feature by 1 for today's record.
 * Saves to Firestore and localStorage, and notifies listeners.
 */
export async function incrementUsage(
  feature: UsageTrackableFeature | LearningFeature | string,
  user?: UserProfile | null
): Promise<DailyUsage> {
  const userId = resolveUserId(user);
  const today = getTodayDateString();
  const current = await getTodayUsage(user);

  const updated: DailyUsage = {
    ...current,
    date: today,
    userId,
    updatedAt: new Date().toISOString()
  };

  switch (feature) {
    case 'aiTeacher':
      updated.aiTeacherMessages = (updated.aiTeacherMessages || 0) + 1;
      break;
    case 'conversation':
    case 'conversationPractice':
      updated.conversationSessions = (updated.conversationSessions || 0) + 1;
      break;
    case 'speaking':
    case 'speakingPractice':
      updated.speakingPractices = (updated.speakingPractices || 0) + 1;
      break;
    case 'vocabulary':
      updated.vocabularyWords = (updated.vocabularyWords || 0) + 1;
      break;
    default:
      console.warn(`Unrecognized feature for usage tracking: ${feature}`);
      return current;
  }

  // 1. Always update localStorage for fast offline-first responsiveness
  try {
    localStorage.setItem(getStorageKey(userId, today), JSON.stringify(updated));
  } catch (_e) {
    // Ignore localStorage quota error
  }

  // 2. Persist to Firestore if available and user is authenticated
  if (firestoreDb && userId !== 'guest') {
    try {
      const usageDocRef = doc(firestoreDb, 'users', userId, 'dailyUsage', today);
      await setDoc(usageDocRef, updated, { merge: true });
    } catch (err) {
      console.warn('Firestore incrementUsage write fallback:', err);
    }
  }

  // 3. Notify all reactive subscribers
  notifyListeners(updated);

  return updated;
}

/**
 * Subscribe to daily usage changes
 */
export function onDailyUsageChange(listener: UsageListener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function notifyListeners(usage: DailyUsage): void {
  listeners.forEach((listener) => {
    try {
      listener(usage);
    } catch (err) {
      console.error('Error in usage listener:', err);
    }
  });

  // Also dispatch window custom event for cross-component synchronization
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('germanteacher-usage-updated', { detail: usage }));
  }
}

/**
 * Exported service object
 */
export const usageService = {
  getTodayDateString,
  getTodayUsage,
  getTodayUsageSync,
  getUsageForFeature,
  getFeatureUsageCount,
  incrementUsage,
  onDailyUsageChange
};
