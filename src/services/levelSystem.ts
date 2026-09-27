/**
 * XP & Level System for German Teacher Application
 * 
 * Levels:
 * Level 1 — Beginner (0 XP)
 * Level 2 — Starter (100 XP)
 * Level 3 — A1 Learner (250 XP)
 * Level 4 — A1 Progress (500 XP)
 * Level 5 — A1 Strong (1000 XP)
 * Level 6 — A2 Learner (2000 XP)
 * Level 7 — A2 Progress (3500 XP)
 * Level 8 — B1 Learner (5000 XP)
 * Level 9 — B1 Progress (7500 XP)
 * Level 10 — German Explorer (10000 XP)
 */

export interface XpLevel {
  level: number;
  name: string;
  minXp: number;
  description: string;
}

/**
 * Easily modifiable XP thresholds for German Teacher levels
 */
export const XP_LEVELS: XpLevel[] = [
  { level: 1, name: 'Beginner', minXp: 0, description: 'Starting your German learning adventure' },
  { level: 2, name: 'Starter', minXp: 100, description: 'First words, basic greetings, and core foundations' },
  { level: 3, name: 'A1 Learner', minXp: 250, description: 'Building essential vocabulary and daily phrases' },
  { level: 4, name: 'A1 Progress', minXp: 500, description: 'Navigating practical dialogues and supermarket German' },
  { level: 5, name: 'A1 Strong', minXp: 1000, description: 'Solid mastery of A1 fundamentals and sentence structure' },
  { level: 6, name: 'A2 Learner', minXp: 2000, description: 'Expanding practical communication and past tenses' },
  { level: 7, name: 'A2 Progress', minXp: 3500, description: 'Handling German official appointments and everyday life' },
  { level: 8, name: 'B1 Learner', minXp: 5000, description: 'Conversational independence in work and social settings' },
  { level: 9, name: 'B1 Progress', minXp: 7500, description: 'Expressing nuanced thoughts, clauses, and opinions' },
  { level: 10, name: 'German Explorer', minXp: 10000, description: 'Master of everyday German life and culture' },
];

export interface UserLevelInfo {
  currentLevel: XpLevel;
  nextLevel: XpLevel | null;
  currentXp: number;
  xpNeededForNextLevel: number;
  // Progress toward next level target percentage (0 to 100)
  progressPercent: number;
  // Progress within the current level tier (0 to 100)
  tierProgressPercent: number;
}

/**
 * Automatically calculates the user's current level, next level,
 * XP needed for the next level, and progress percentages from total XP.
 */
export function calculateUserLevel(totalXp: number): UserLevelInfo {
  const currentXp = Math.max(0, Math.floor(totalXp || 0));

  let currentLevel = XP_LEVELS[0];
  let nextLevel: XpLevel | null = XP_LEVELS[1] || null;

  for (let i = XP_LEVELS.length - 1; i >= 0; i--) {
    if (currentXp >= XP_LEVELS[i].minXp) {
      currentLevel = XP_LEVELS[i];
      nextLevel = XP_LEVELS[i + 1] || null;
      break;
    }
  }

  if (!nextLevel) {
    // Top Level reached (Level 10 — German Explorer)
    return {
      currentLevel,
      nextLevel: null,
      currentXp,
      xpNeededForNextLevel: 0,
      progressPercent: 100,
      tierProgressPercent: 100
    };
  }

  const xpNeededForNextLevel = Math.max(0, nextLevel.minXp - currentXp);

  // Overall progress towards next level threshold (e.g. 350 / 500 = 70%)
  const progressPercent = nextLevel.minXp > 0
    ? Math.min(100, Math.max(0, Math.round((currentXp / nextLevel.minXp) * 100)))
    : 100;

  // Bracket progress within this level (e.g. (350 - 250) / (500 - 250) = 40%)
  const tierRange = nextLevel.minXp - currentLevel.minXp;
  const tierProgress = currentXp - currentLevel.minXp;
  const tierProgressPercent = tierRange > 0
    ? Math.min(100, Math.max(0, Math.round((tierProgress / tierRange) * 100)))
    : 100;

  return {
    currentLevel,
    nextLevel,
    currentXp,
    xpNeededForNextLevel,
    progressPercent,
    tierProgressPercent
  };
}
