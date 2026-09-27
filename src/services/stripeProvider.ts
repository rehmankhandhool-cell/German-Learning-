import { 
  UserProfile, 
  PaymentProviderAdapter, 
  SubscriptionStatusResult, 
  CheckoutSessionOptions, 
  CheckoutSessionResult, 
  CancelSubscriptionResult, 
  CustomerPortalResult,
  StripeConfig
} from '../types';
import { getApiUrl } from '../utils/apiConfig';

/**
 * Phase 12C — Stripe Test Mode Provider Adapter
 * 
 * DESIGN & SECURITY CONSTRAINTS:
 * 1. ZERO secret keys in frontend code. STRIPE_SECRET_KEY & STRIPE_WEBHOOK_SECRET
 *    reside exclusively on the server.
 * 2. Talks strictly to server-side /api/payments/* endpoints.
 * 3. Never collects, stores, or handles credit card numbers directly.
 * 4. Safe fallback: If test keys/prices are missing on the server, gracefully reports
 *    notConfigured: true so the friendly "coming soon" modal appears.
 */
export class StripeProviderAdapter implements PaymentProviderAdapter {
  public readonly providerName = 'stripe' as const;

  /**
   * Safe status check: returns false locally by default until verified with server.
   */
  public isConfigured(): boolean {
    return false;
  }

  /**
   * Fetches public Stripe client configuration from the server.
   * Secret keys are NEVER returned.
   */
  public async getStripeConfig(): Promise<StripeConfig> {
    try {
      const res = await fetch(getApiUrl('/api/payments/config'));
      if (!res.ok) {
        return { isConfigured: false, mode: 'test' };
      }
      const data = await res.json();
      return {
        isConfigured: Boolean(data.isConfigured),
        currency: 'eur',
        mode: 'test'
      };
    } catch {
      return {
        isConfigured: false,
        currency: 'eur',
        mode: 'test'
      };
    }
  }

  /**
   * Subscription status check for Stripe.
   */
  public async getSubscriptionStatus(_user?: UserProfile | null): Promise<SubscriptionStatusResult> {
    return {
      subscription: null,
      status: 'none',
      provider: 'stripe',
      isConfigured: false,
      message: 'Stripe subscription status is monitored server-side via webhooks.'
    };
  }

  /**
   * Server-backed Stripe Test Mode Checkout Session initiator.
   * Connects to /api/payments/create-checkout-session and redirects to Stripe Hosted Checkout.
   */
  public async createCheckoutSession(
    user?: UserProfile | null,
    options?: CheckoutSessionOptions
  ): Promise<CheckoutSessionResult> {
    try {
      const response = await fetch(getApiUrl('/api/payments/create-checkout-session'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id,
          userEmail: user?.email,
          billingInterval: options?.billingInterval || 'monthly'
        })
      });

      if (!response.ok) {
        return {
          success: false,
          notConfigured: true,
          message: 'Premium payments are coming soon. Secure payment processing is currently in preparation.'
        };
      }

      const data = await response.json();

      if (data.url) {
        // Redirect to Stripe-hosted Test Mode Checkout
        window.location.href = data.url;
        return {
          success: true,
          notConfigured: false,
          message: 'Redirecting to Stripe Test Mode Checkout...',
          url: data.url
        };
      }

      return {
        success: false,
        notConfigured: Boolean(data.notConfigured ?? true),
        message: data.message || 'Premium payments are coming soon. Secure payment processing is currently in preparation.'
      };
    } catch (err) {
      console.warn('[StripeProvider] Error calling checkout endpoint:', err);
      return {
        success: false,
        notConfigured: true,
        message: 'Premium payments are coming soon. Secure payment processing is currently in preparation.'
      };
    }
  }

  /**
   * Safe placeholder for Stripe subscription cancellation.
   */
  public async cancelSubscription(_user?: UserProfile | null): Promise<CancelSubscriptionResult> {
    return {
      success: false,
      notConfigured: true,
      message: 'Stripe subscription cancellation is managed via Customer Portal or server webhook.'
    };
  }

  /**
   * Safe placeholder for Stripe Customer Portal redirect.
   */
  public async openCustomerPortal(_user?: UserProfile | null): Promise<CustomerPortalResult> {
    try {
      const res = await fetch(getApiUrl('/api/payments/customer-portal'), { method: 'POST' });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
        return { success: true, notConfigured: false, message: 'Redirecting to portal...', url: data.url };
      }
      return {
        success: false,
        notConfigured: true,
        message: data.message || 'Billing portal is not yet active.'
      };
    } catch {
      return {
        success: false,
        notConfigured: true,
        message: 'Billing management portal is not yet active.'
      };
    }
  }
}

export const stripeProvider = new StripeProviderAdapter();
