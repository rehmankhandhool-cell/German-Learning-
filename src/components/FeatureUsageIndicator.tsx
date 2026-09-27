import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Infinity } from 'lucide-react';
import { LearningFeature, UserProfile, MembershipPlan, DailyUsage } from '../types';
import { membershipService } from '../services/membershipService';
import { usageService } from '../services/usageService';
import { PremiumBadge } from './PremiumBadge';

export interface FeatureUsageIndicatorProps {
  feature: LearningFeature;
  currentUsage?: number;
  user?: UserProfile | null;
  userPlan?: MembershipPlan;
  onUpgrade?: () => void;
  theme?: 'light' | 'dark';
  className?: string;
}

export const FeatureUsageIndicator: React.FC<FeatureUsageIndicatorProps> = ({
  feature,
  currentUsage,
  user,
  userPlan,
  onUpgrade,
  theme = 'light',
  className = ''
}) => {
  // Determine plan via explicit plan prop or membership service
  const activePlan: MembershipPlan = userPlan || membershipService.getUserPlan(user);
  const isPremium = activePlan === 'premium';
  const limitInfo = membershipService.getFeatureLimit(feature, user);

  // Reactive state for real daily usage from usageService
  const [realUsage, setRealUsage] = useState<number>(() => {
    if (currentUsage !== undefined) return currentUsage;
    const cached = usageService.getTodayUsageSync(user);
    return usageService.getUsageForFeature(feature, cached);
  });

  // Fetch real usage on mount and subscribe to daily usage updates
  useEffect(() => {
    if (currentUsage !== undefined) return;

    let isMounted = true;

    // Immediately sync with synchronous cached usage
    const cached = usageService.getTodayUsageSync(user);
    setRealUsage(usageService.getUsageForFeature(feature, cached));

    // Async fetch (e.g. from Firestore if configured)
    usageService.getTodayUsage(user).then((daily) => {
      if (isMounted) {
        setRealUsage(usageService.getUsageForFeature(feature, daily));
      }
    }).catch(() => {});

    // Listen for real-time usage increment events
    const unsubscribe = usageService.onDailyUsageChange((updated: DailyUsage) => {
      if (isMounted) {
        setRealUsage(usageService.getUsageForFeature(feature, updated));
      }
    });

    const handleCustomEvent = (e: Event) => {
      const customEvent = e as CustomEvent<DailyUsage>;
      if (isMounted && customEvent.detail) {
        setRealUsage(usageService.getUsageForFeature(feature, customEvent.detail));
      }
    };

    window.addEventListener('germanteacher-usage-updated', handleCustomEvent);

    return () => {
      isMounted = false;
      unsubscribe();
      window.removeEventListener('germanteacher-usage-updated', handleCustomEvent);
    };
  }, [feature, user, currentUsage]);

  // Effective count to display
  const displayCount = currentUsage !== undefined ? currentUsage : realUsage;

  // Friendly unit labels per feature
  const getUnitLabel = (feat: LearningFeature): string => {
    switch (feat) {
      case 'aiTeacher':
        return 'messages today';
      case 'conversationPractice':
        return 'sessions today';
      case 'speakingPractice':
        return 'practices today';
      case 'vocabulary':
        return 'new words today';
      default:
        return 'today';
    }
  };

  const isDark = theme === 'dark';

  if (isPremium) {
    return (
      <div 
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-xl text-xs font-semibold select-none ${
          isDark 
            ? 'bg-slate-900/90 text-amber-300 border border-amber-400/30' 
            : 'bg-amber-50 text-amber-950 border border-amber-200'
        } ${className}`}
      >
        <div className="flex items-center gap-1.5 font-bold">
          <Infinity className="w-3.5 h-3.5 text-amber-500" />
          <span>Unlimited</span>
        </div>
        <span className={isDark ? 'text-slate-600' : 'text-amber-300'}>•</span>
        <PremiumBadge size="xs" variant={isDark ? 'dark' : 'gold'} />
      </div>
    );
  }

  // Free Tier Indicator
  const freeLimit = typeof limitInfo.limit === 'number' ? limitInfo.limit : 10;
  const unitLabel = getUnitLabel(feature);

  return (
    <div 
      className={`inline-flex items-center flex-wrap gap-2 px-3 py-1.5 rounded-xl text-xs ${
        isDark 
          ? 'bg-slate-900/90 border border-slate-700/80 text-slate-300' 
          : 'bg-slate-100/90 border border-slate-200 text-slate-700'
      } ${className}`}
    >
      <div className="flex items-center gap-1.5 font-medium">
        <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {displayCount} / {freeLimit}
        </span>
        <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>
          {unitLabel}
        </span>
      </div>

      {onUpgrade && (
        <>
          <span className={isDark ? 'text-slate-700' : 'text-slate-300'}>|</span>
          <button
            type="button"
            onClick={onUpgrade}
            className={`font-bold inline-flex items-center gap-1 transition-colors group ${
              isDark 
                ? 'text-amber-400 hover:text-amber-300' 
                : 'text-red-600 hover:text-red-700'
            }`}
          >
            <span>Upgrade to Premium</span>
            <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
          </button>
        </>
      )}
    </div>
  );
};
