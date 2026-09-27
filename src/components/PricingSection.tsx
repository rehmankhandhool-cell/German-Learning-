import React, { useState } from 'react';
import { Check, Sparkles, Shield, ArrowRight } from 'lucide-react';

interface PricingSectionProps {
  onSelectPlan: (plan: 'free' | 'premium') => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  onSelectPlan
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <section id="pricing-section" className="py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-wider mb-3">
            <span>Transparent Pricing for Learners</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Outfit'] tracking-tight">
            Start Free. Upgrade for Real Fluency.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Begin learning essential German without paying a cent. Unlock comprehensive CEFR modules and unlimited AI tutoring when you&apos;re ready.
          </p>

          {/* Monthly / Yearly Billing Toggle */}
          <div className="mt-8 inline-flex items-center p-1.5 rounded-2xl bg-slate-100 border border-slate-200">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                billingCycle === 'yearly'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded bg-red-100 text-red-700">
                Save 30%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* FREE PLAN */}
          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black text-slate-900 font-['Outfit']">FREE</h3>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-200 text-slate-700">
                    Starter
                  </span>
                </div>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-900 font-['Outfit']">€0</span>
                  <span className="text-xs font-semibold text-slate-500">/ forever free</span>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Ideal for absolute beginners taking their first steps in German.
                </p>
              </div>

              {/* Exact user requested Free tier features */}
              <div className="space-y-3 pt-4 border-t border-slate-200">
                <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-800">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Basic A1 lessons</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-800">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Limited vocabulary practice</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-800">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Limited AI Teacher usage</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-800">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Basic quizzes</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200">
              <button
                onClick={() => onSelectPlan('free')}
                className="w-full py-3.5 rounded-2xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-900 font-extrabold text-sm transition-colors shadow-xs"
              >
                Get Started Free
              </button>
            </div>
          </div>

          {/* PREMIUM PLAN */}
          <div className="relative bg-slate-900 text-white rounded-3xl p-8 border-2 border-red-500 shadow-2xl flex flex-col justify-between">
            {/* Top Recommended Tag */}
            <div className="absolute -top-3.5 right-8 px-3.5 py-1 rounded-full bg-red-600 text-white text-[11px] font-extrabold uppercase tracking-wider shadow-md">
              Recommended for Newcomers
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-black text-white font-['Outfit']">PREMIUM</h3>
                    <Sparkles className="w-5 h-5 text-amber-400" />
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-red-600/30 text-red-300 border border-red-500/40">
                    Full Access
                  </span>
                </div>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-black text-white font-['Outfit']">
                    {billingCycle === 'monthly' ? '€14.90' : '€9.90'}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">/ month</span>
                </div>
                <p className="text-xs text-slate-300 mt-2">
                  Complete German fluency for studies, job hunt & visa permanent residency.
                </p>
              </div>

              {/* Exact user requested Premium tier features */}
              <div className="space-y-3 pt-4 border-t border-slate-800">
                <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-white">
                  <div className="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Full A1-B2 lessons</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-white">
                  <div className="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Unlimited AI Teacher</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-white">
                  <div className="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Speaking practice with audio drills</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-white">
                  <div className="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Advanced quizzes & explanations</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-white">
                  <div className="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Personalized learning path</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-white">
                  <div className="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Progress tracking & streak metrics</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800 space-y-2">
              <button
                onClick={() => onSelectPlan('premium')}
                className="w-full py-3.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm shadow-lg shadow-red-600/30 transition-all flex items-center justify-center gap-2"
              >
                <span>Upgrade to Premium</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[11px] text-center text-slate-400">
                UI demonstration only · No payment charged yet
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
