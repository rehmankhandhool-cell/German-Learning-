import { 
  UserProfile, 
  PaymentStatus, 
  PaymentProvider, 
  SubscriptionStatus, 
  PremiumSubscription, 
  CheckoutSessionOptions, 
  CheckoutSessionResult, 
  SubscriptionStatusResult, 
  CustomerPortalResult, 
  CancelSubscriptionResult,
  PaymentProviderAdapter
} from '../types';
import { authService } from './authService';
import { stripeProvider } from './stripeProvider';

/**
 * Phase 12B — Payment Architecture with Stripe Adapter Preparation
 * 
 * DESIGN PRINCIPLES:
 * 1. Clean provider-agnostic interface supporting Stripe and future providers.
 * 2. Strict separation of concerns:
 *    - Membership status ('free' | 'premium') -> managed solely by membershipService.ts
 *    - Payment status ('idle' | 'not_configured' | 'pending' | 'succeeded' | 'failed')
 *    - Subscription status ('none' | 'active' | 'past_due' | 'canceled' | 'trialing')
 * 3. Security:
 *    - ZERO payment-provider secrets in frontend code.
 *    - Never collect, touch, or store card numbers, CVVs, or bank info.
 *    - Future payment webhooks and secret keys remain server-side.
 * 4. Safe Placeholder Mode:
 *    - Real payments are NOT active.
 *    - Stripe adapter remains disabled.
 *    - Functions return transparent "payments not configured yet / coming soon" outcomes.
 *    - Does NOT falsely promote users from Free to Premium.
 */

class PaymentService {
  private activeProvider: PaymentProvider = 'none';
  private providers: Map<PaymentProvider, PaymentProviderAdapter> = new Map();

  constructor() {
    // Register the Stripe provider adapter (disabled by default)
    this.registerProvider(stripeProvider);
  }

  /**
   * Registers a payment provider adapter.
   */
  public registerProvider(adapter: PaymentProviderAdapter): void {
    this.providers.set(adapter.providerName, adapter);
  }

  /**
   * Retrieves a registered provider adapter.
   */
  public getProvider(provider: PaymentProvider): PaymentProviderAdapter | undefined {
    return this.providers.get(provider);
  }

  /**
   * Checks whether a live payment gateway (Stripe/PayPal) is active and configured.
   * In Phase 12B, returns false as payments are disabled.
   */
  public isPaymentConfigured(): boolean {
    const provider = this.providers.get(this.activeProvider);
    return provider ? provider.isConfigured() : false;
  }

  /**
   * Returns the current active payment provider.
   */
  public getActiveProvider(): PaymentProvider {
    return this.activeProvider;
  }

  /**
   * Sets the active provider (e.g. 'stripe' when ready in future phases).
   */
  public setActiveProvider(provider: PaymentProvider): void {
    this.activeProvider = provider;
  }

  /**
   * Retrieves the current subscription status for a user.
   * In Phase 12A foundation, returns a non-configured status.
   */
  public async getSubscriptionStatus(user?: UserProfile | null): Promise<SubscriptionStatusResult> {
    const activeUser = user !== undefined ? user : authService.getCurrentUser();

    if (!activeUser) {
      return {
        subscription: null,
        status: 'none',
        provider: 'none',
        isConfigured: false,
        message: 'No authenticated user found.'
      };
    }

    // In Phase 12A, payment processing is not configured yet.
    return {
      subscription: null,
      status: 'none',
      provider: 'none',
      isConfigured: false,
      message: 'Payment system is not yet configured. Premium subscriptions are coming soon.'
    };
  }

  /**
   * Prepares a checkout session for upgrading to Premium.
   * In Phase 12C, delegates to the server-backed Stripe Test Mode provider.
   * Safe fallback: Returns clear coming-soon feedback if Stripe test mode is not configured.
   */
  public async createCheckoutSession(
    user?: UserProfile | null,
    options?: CheckoutSessionOptions
  ): Promise<CheckoutSessionResult> {
    const activeUser = user !== undefined ? user : authService.getCurrentUser();

    console.info('[PaymentService] Checkout session requested:', {
      userId: activeUser?.id,
      billingInterval: options?.billingInterval || 'monthly'
    });

    // Attempt through Stripe provider
    const provider = this.providers.get('stripe');
    if (provider) {
      const result = await provider.createCheckoutSession(activeUser, options);
      return result;
    }

    return {
      success: false,
      notConfigured: true,
      message: 'Premium payments are coming soon. Secure payment processing is currently in preparation.'
    };
  }

  /**
   * Cancels an active subscription.
   * Safe placeholder: Returns not-configured notification.
   */
  public async cancelSubscription(user?: UserProfile | null): Promise<CancelSubscriptionResult> {
    const activeUser = user !== undefined ? user : authService.getCurrentUser();

    console.info('[PaymentService] Subscription cancellation requested:', {
      userId: activeUser?.id,
      configured: false
    });

    return {
      success: false,
      notConfigured: true,
      message: 'No active payment subscription found. Subscriptions are coming soon.'
    };
  }

  /**
   * Opens the billing management customer portal (e.g., Stripe Customer Portal).
   * Safe placeholder: Returns not-configured feedback.
   */
  public async openCustomerPortal(user?: UserProfile | null): Promise<CustomerPortalResult> {
    const activeUser = user !== undefined ? user : authService.getCurrentUser();

    console.info('[PaymentService] Customer portal requested:', {
      userId: activeUser?.id,
      configured: false
    });

    return {
      success: false,
      notConfigured: true,
      message: 'Billing management portal is not yet configured. Coming soon.'
    };
  }
}

export const paymentService = new PaymentService();
