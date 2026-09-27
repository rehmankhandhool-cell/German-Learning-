import { UserProfile, MembershipPlan, LearningFeature, FeatureLimit } from '../types';
import { authService } from './authService';

/**
 * Standard Feature Limits by Membership Plan
 */
export const MEMBERSHIP_LIMITS: Record<MembershipPlan, Record<LearningFeature, FeatureLimit>> = {
  free: {
    aiTeacher: {
      limit: 10,
      unit: 'messages/day',
      description: '10 messages/day'
    },
    conversationPractice: {
      limit: 3,
      unit: 'sessions/day',
      description: '3 sessions/day'
    },
    speakingPractice: {
      limit: 5,
      unit: 'practices/day',
      description: '5 practices/day'
    },
    vocabulary: {
      limit: 20,
      unit: 'words/day',
      description: '20 new words/day'
    }
  },
  premium: {
    aiTeacher: {
      limit: 'unlimited',
      unit: 'messages/day',
      description: 'Unlimited messages'
    },
    conversationPractice: {
      limit: 'unlimited',
      unit: 'sessions/day',
      description: 'Unlimited sessions'
    },
    speakingPractice: {
      limit: 'unlimited',
      unit: 'practices/day',
      description: 'Unlimited practices'
    },
    vocabulary: {
      limit: 'unlimited',
      unit: 'words/day',
      description: 'Unlimited words'
    }
  }
};

/**
 * Retrieves the membership plan for a specified user or the currently authenticated user.
 * Existing users who do not have a 'plan' property automatically default to 'free'.
 */
export function getUserPlan(user?: UserProfile | null): MembershipPlan {
  const activeUser = user !== undefined ? user : authService.getCurrentUser();
  if (!activeUser) {
    return 'free';
  }
  // Check explicit plan field, with fallback to legacy isPremium boolean
  if (activeUser.plan === 'premium' || activeUser.isPremium === true) {
    return 'premium';
  }
  return 'free';
}

/**
 * Checks whether a user is currently a Premium subscriber.
 */
export function isPremiumUser(user?: UserProfile | null): boolean {
  return getUserPlan(user) === 'premium';
}

/**
 * Checks whether a feature is available for the given user.
 * During this preparation phase, core features remain accessible to all users.
 */
export function isFeatureAvailable(feature: LearningFeature | string, user?: UserProfile | null): boolean {
  const coreFeatures: string[] = ['aiTeacher', 'conversationPractice', 'speakingPractice', 'vocabulary'];
  if (coreFeatures.includes(feature)) {
    return true;
  }
  return isPremiumUser(user);
}

/**
 * Retrieves the usage limit for a specific feature and user.
 */
export function getFeatureLimit(feature: LearningFeature | string, user?: UserProfile | null): FeatureLimit {
  const plan = getUserPlan(user);
  const planLimits = MEMBERSHIP_LIMITS[plan];

  if (feature in planLimits) {
    return planLimits[feature as LearningFeature];
  }

  // Graceful fallback for any unspecified feature
  return plan === 'premium'
    ? { limit: 'unlimited', unit: 'actions', description: 'Unlimited' }
    : { limit: 10, unit: 'actions/day', description: 'Standard daily limit' };
}

/**
 * Reusable Membership Service export
 */
export const membershipService = {
  getUserPlan,
  isPremiumUser,
  isFeatureAvailable,
  getFeatureLimit,
  MEMBERSHIP_LIMITS
};
