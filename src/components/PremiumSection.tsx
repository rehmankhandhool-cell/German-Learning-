import React, { useState } from 'react';
import { 
  Check, 
  Crown, 
  Sparkles, 
  X, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  Clock, 
  BookOpen, 
  MessageSquare, 
  Mic, 
  Layers, 
  GraduationCap, 
  TrendingUp 
} from 'lucide-react';
import { UserProfile } from '../types';
import { membershipService } from '../services/membershipService';
import { paymentService } from '../services/paymentService';

interface PremiumSectionProps {
  user: UserProfile | null;
  onOpenAuth?: (mode: 'login' | 'signup') => void;
}

export const PremiumSection: React.FC<PremiumSectionProps> = ({
  user,
  onOpenAuth
}) => {
  const [showComingSoonModal, setShowComingSoonModal] = useState<boolean>(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [billingInterval, setBillingInterval] = useState<'monthly' | 'annual'>('monthly');
  const [isInitiatingCheckout, setIsInitiatingCheckout] = useState<boolean>(false);

  // Check user membership status via reusable membership service
  const currentPlan = membershipService.getUserPlan(user);
  const isPremium = currentPlan === 'premium';

  // FAQ dataset
  const faqs = [
    {
      question: 'Can I use German Teacher for free?',
      answer: 'Yes. The Free Plan gives you access to the core German learning experience.'
    },
    {
      question: 'What does Premium include?',
      answer: 'Premium will unlock expanded AI learning, unlimited practice, and advanced learning features.'
    },
    {
      question: 'When will Premium payments be available?',
      answer: 'Premium payments will be added in a future version.'
    }
  ];

  // Comparison table dataset
  const comparisonItems = [
    { feature: 'A1 Course', free: '✓', premium: '✓', freeIsCheck: true, premiumIsCheck: true },
    { feature: 'Vocabulary', free: 'Limited', premium: 'Unlimited', freeIsCheck: false, premiumIsCheck: false },
    { feature: 'AI German Teacher', free: 'Limited', premium: 'Unlimited', freeIsCheck: false, premiumIsCheck: false },
    { feature: 'Conversation Practice', free: 'Limited', premium: 'Unlimited', freeIsCheck: false, premiumIsCheck: false },
    { feature: 'Speaking Practice', free: 'Limited', premium: 'Unlimited', freeIsCheck: false, premiumIsCheck: false },
    { feature: 'Learning Progress', free: '✓', premium: '✓', freeIsCheck: true, premiumIsCheck: true },
    { feature: 'Advanced Features', free: '—', premium: '✓', freeIsCheck: false, premiumIsCheck: true },
    { feature: 'Future Premium Courses', free: '—', premium: '✓', freeIsCheck: false, premiumIsCheck: true }
  ];

  const handleUpgradeClick = async () => {
    setIsInitiatingCheckout(true);
    try {
      // Initiate checkout session through payment service with chosen billing cycle
      const result = await paymentService.createCheckoutSession(user, { billingInterval });
      if (result.notConfigured || !result.success) {
        setShowComingSoonModal(true);
      }
    } catch {
      setShowComingSoonModal(true);
    } finally {
      setIsInitiatingCheckout(false);
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div id="premium-section" className="min-h-screen bg-slate-50/70 py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* ============================================================ */}
        {/* 1. Header Area                                               */}
        {/* ============================================================ */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/90 border border-amber-300/80 text-amber-950 text-xs font-bold uppercase tracking-wider shadow-2xs">
            <Crown className="w-3.5 h-3.5 text-amber-600" />
            <span>Membership Plans</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-['Outfit']">
            Learn German Faster with Premium
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Unlock more practice, more AI learning, and more ways to improve your German.
          </p>

          {/* Current plan banner for logged in user */}
          {user && (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 shadow-2xs mt-2">
              <span className="font-semibold text-slate-900">{user.name}</span>
              <span className="text-slate-300">|</span>
              <span>Current Status:</span>
              <span className={`font-bold px-2 py-0.5 rounded-md ${
                isPremium 
                  ? 'bg-amber-100 text-amber-900 border border-amber-200' 
                  : 'bg-slate-100 text-slate-800 border border-slate-200'
              }`}>
                {isPremium ? 'Premium Plan' : 'Free Plan'}
              </span>
            </div>
          )}
        </div>

        {/* ============================================================ */}
        {/* 2. Plan Cards Grid (FREE & PREMIUM)                         */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto">
          
          {/* ----------------- FREE PLAN CARD ----------------- */}
          <div 
            id="plan-card-free"
            className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all bg-white border ${
              !isPremium 
                ? 'border-slate-300 shadow-md ring-2 ring-slate-900/5' 
                : 'border-slate-200 shadow-xs'
            }`}
          >
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 font-['Outfit']">
                    Free
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Essential German fundamentals
                  </p>
                </div>
                {!isPremium && (
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                    Current Plan
                  </span>
                )}
              </div>

              {/* Price */}
              <div className="my-6">
                <div className="text-4xl font-extrabold text-slate-900 font-['Outfit']">
                  Free
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  No credit card required · Free forever
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-3.5 pt-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Included in Free:
                </div>
                <ul className="space-y-3 text-sm text-slate-700">
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5 border border-emerald-200">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>A1 German Course</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5 border border-emerald-200">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>Basic Vocabulary</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5 border border-emerald-200">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>Learning Progress</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center flex-shrink-0 mt-0.5 border border-amber-200">
                      <Clock className="w-3 h-3" />
                    </div>
                    <span>Limited AI German Teacher</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center flex-shrink-0 mt-0.5 border border-amber-200">
                      <Clock className="w-3 h-3" />
                    </div>
                    <span>Limited Conversation Practice</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center flex-shrink-0 mt-0.5 border border-amber-200">
                      <Clock className="w-3 h-3" />
                    </div>
                    <span>Limited Speaking Practice</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Button */}
            <div className="pt-8 mt-6 border-t border-slate-100">
              <button
                id="btn-plan-free"
                disabled={true}
                className="w-full py-3 px-4 rounded-xl text-sm font-bold text-slate-700 bg-slate-100 border border-slate-200/80 cursor-default flex items-center justify-center gap-2"
              >
                {!isPremium ? 'Current Plan' : 'Free Tier'}
              </button>
            </div>
          </div>

          {/* ----------------- PREMIUM PLAN CARD ----------------- */}
          <div 
            id="plan-card-premium"
            className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all bg-white border-2 ${
              isPremium 
                ? 'border-amber-400 shadow-xl ring-4 ring-amber-400/20' 
                : 'border-[#DE0000] shadow-xl'
            }`}
          >
            {/* Top Badge */}
            <div className="absolute -top-3.5 right-6 px-3.5 py-1 rounded-full bg-[#DE0000] text-white text-xs font-extrabold tracking-wide uppercase shadow-md flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Recommended</span>
            </div>

            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-bold text-slate-900 font-['Outfit']">
                      Premium
                    </h3>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1">
                      <Crown className="w-3 h-3 text-amber-600" />
                      PRO
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    For serious learners aiming for real fluency
                  </p>
                </div>
                {isPremium && (
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                    Current Plan
                  </span>
                )}
              </div>

              {/* Price & Plan Selection (Phase 12C Stripe Test Mode) */}
              <div className="my-6 space-y-3">
                {/* Clean Monthly / Annual Selector */}
                <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600">
                  <button
                    type="button"
                    onClick={() => setBillingInterval('monthly')}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      billingInterval === 'monthly'
                        ? 'bg-white text-slate-900 shadow-xs font-bold'
                        : 'hover:text-slate-900'
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    type="button"
                    onClick={() => setBillingInterval('annual')}
                    className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                      billingInterval === 'annual'
                        ? 'bg-white text-slate-900 shadow-xs font-bold'
                        : 'hover:text-slate-900'
                    }`}
                  >
                    <span>Annual</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      Save 20%
                    </span>
                  </button>
                </div>

                <div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Outfit'] flex items-baseline gap-1.5">
                    {billingInterval === 'monthly' ? (
                      <>
                        <span>€9.99</span>
                        <span className="text-sm font-medium text-slate-500">/ month</span>
                      </>
                    ) : (
                      <>
                        <span>€7.99</span>
                        <span className="text-sm font-medium text-slate-500">/ month (€95.88/yr)</span>
                      </>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {billingInterval === 'monthly' 
                      ? 'Billed monthly. Cancel anytime.' 
                      : 'Billed annually. 2 months free.'}
                  </p>
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-3.5 pt-2">
                <div className="text-xs font-bold uppercase tracking-wider text-red-600">
                  Everything in Free, plus:
                </div>
                <ul className="space-y-3 text-sm text-slate-800">
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0 mt-0.5 border border-red-200">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-semibold text-slate-900">Everything in Free</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0 mt-0.5 border border-red-200">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>Full AI German Teacher</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0 mt-0.5 border border-red-200">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>Unlimited Conversation Practice</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0 mt-0.5 border border-red-200">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>Unlimited Speaking Practice</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0 mt-0.5 border border-red-200">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>Full Vocabulary Practice</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0 mt-0.5 border border-red-200">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>Advanced learning features</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0 mt-0.5 border border-red-200">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>Future premium courses</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0 mt-0.5 border border-red-200">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>Future premium content</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Action Button */}
            <div className="pt-8 mt-6 border-t border-slate-100">
              {isPremium ? (
                <button
                  id="btn-plan-premium-active"
                  disabled={true}
                  className="w-full py-3.5 px-4 rounded-xl text-sm font-bold text-emerald-800 bg-emerald-100 border border-emerald-200 cursor-default flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Premium Plan Active</span>
                </button>
              ) : (
                <button
                  id="btn-upgrade-to-premium"
                  onClick={handleUpgradeClick}
                  disabled={isInitiatingCheckout}
                  className="w-full py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-red-600 hover:bg-red-700 active:scale-[0.99] disabled:opacity-75 transition-all shadow-md shadow-red-200 flex items-center justify-center gap-2"
                >
                  <Crown className="w-4 h-4 text-amber-300" />
                  <span>
                    {isInitiatingCheckout 
                      ? 'Connecting to Checkout...' 
                      : `Upgrade to Premium (${billingInterval === 'annual' ? 'Annual' : 'Monthly'})`}
                  </span>
                </button>
              )}
            </div>
          </div>

        </div>

        {/* ============================================================ */}
        {/* 3. Feature Comparison Table                                  */}
        {/* ============================================================ */}
        <div id="compare-plans-section" className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit']">
              Compare Plans
            </h2>
            <p className="text-sm text-slate-600">
              Detailed breakdown of features across Free and Premium memberships.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-700">
                    <th className="py-4 px-5 sm:px-6 font-bold">Feature</th>
                    <th className="py-4 px-4 sm:px-6 font-bold text-center w-28 sm:w-36">Free</th>
                    <th className="py-4 px-4 sm:px-6 font-bold text-center w-28 sm:w-36 text-red-600">
                      <div className="flex items-center justify-center gap-1">
                        <Crown className="w-3.5 h-3.5 text-amber-500" />
                        <span>Premium</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                  {comparisonItems.map((item, idx) => (
                    <tr 
                      key={item.feature}
                      className={idx % 2 === 0 ? 'bg-white hover:bg-slate-50/50' : 'bg-slate-50/30 hover:bg-slate-50/70'}
                    >
                      <td className="py-3.5 px-5 sm:px-6 font-semibold text-slate-800">
                        {item.feature}
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 text-center text-slate-600">
                        {item.free === '✓' ? (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 font-bold">
                            ✓
                          </span>
                        ) : item.free === '—' ? (
                          <span className="text-slate-300 font-bold text-base">—</span>
                        ) : (
                          <span className="font-medium text-slate-600 px-2 py-0.5 bg-slate-100 rounded-md text-xs">
                            {item.free}
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 text-center">
                        {item.premium === '✓' ? (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 font-bold">
                            ✓
                          </span>
                        ) : (
                          <span className="font-bold text-red-700 px-2 py-0.5 bg-red-50 border border-red-100 rounded-md text-xs">
                            {item.premium}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 4. Frequently Asked Questions (FAQ)                          */}
        {/* ============================================================ */}
        <div id="premium-faq-section" className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit']">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-600">
              Got questions about German Teacher memberships? Find answers below.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={faq.question}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-red-600 transition-colors"
                  >
                    <span className="text-sm sm:text-base">{faq.question}</span>
                    <span className="text-slate-400 flex-shrink-0">
                      {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* ============================================================ */}
      {/* 5. "Premium Payments Coming Soon" Modal                       */}
      {/* ============================================================ */}
      {showComingSoonModal && (
        <div 
          id="premium-coming-soon-modal" 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150"
          role="dialog"
          aria-modal="true"
        >
          <div 
            className="bg-white w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95 duration-150 relative"
          >
            {/* Close cross */}
            <button
              onClick={() => setShowComingSoonModal(false)}
              className="absolute top-5 right-5 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Icon & Title */}
            <div className="text-center space-y-3 pt-2">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center shadow-xs">
                <Crown className="w-7 h-7" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit']">
                Premium payments are coming soon.
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We are currently preparing secure payment integration for subscriptions. In the meantime, you can continue using all core German courses, vocabulary drills, and practice tools for free!
              </p>
            </div>

            {/* Close Button */}
            <div className="pt-2">
              <button
                id="btn-close-coming-soon-modal"
                onClick={() => setShowComingSoonModal(false)}
                className="w-full py-3 px-4 rounded-xl text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
