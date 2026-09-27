import { UserProfile } from '../types';
import { authService } from '../services/authService';

const STORAGE_KEY_MASTERED_WORDS = 'germanteacher_mastered_words';
const STORAGE_KEY_QUIZ_STATS = 'germanteacher_quiz_stats';

export const DEFAULT_DEMO_USER: UserProfile = {
  id: 'usr_demo_101',
  name: 'Alex Müller',
  email: 'alex.mueller@example.com',
  level: 'A1',
  streakDays: 5,
  xp: 1450,
  dailyGoalLessons: 5,
  dailyGoalMinutes: 20,
  completedLessonsToday: 3,
  studiedMinutesToday: 16,
  wordsMasteredCount: 148,
  wordsReviewCount: 12,
  averageQuizScore: 92,
  isPremium: false,
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
};

export function getStoredUser(): UserProfile | null {
  return authService.getCurrentUser();
}

export function saveStoredUser(user: UserProfile | null): void {
  if (typeof window === 'undefined') return;
  try {
    if (user) {
      localStorage.setItem('germanteacher_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('germanteacher_auth_user');
    }
  } catch (err) {
    console.error('Failed to save user session:', err);
  }
}

export function getMasteredWordIds(): string[] {
  if (typeof window === 'undefined') return ['v1', 'v2', 'v5', 'v11'];
  try {
    const data = localStorage.getItem(STORAGE_KEY_MASTERED_WORDS);
    return data ? JSON.parse(data) : ['v1', 'v2', 'v5', 'v11'];
  } catch {
    return ['v1', 'v2', 'v5', 'v11'];
  }
}

export function toggleMasteredWordId(id: string): string[] {
  const current = getMasteredWordIds();
  const updated = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
  try {
    localStorage.setItem(STORAGE_KEY_MASTERED_WORDS, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to update mastered words:', err);
  }
  return updated;
}
