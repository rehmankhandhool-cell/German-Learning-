import React, { useState, useEffect } from 'react';
import { UserProfile, UserProgress } from '../types';
import { BrandLogo } from './BrandLogo';
import { learningDatabase } from '../services/learningDatabase';
import { authService } from '../services/authService';
import { A1_COURSE_LESSONS } from '../data/a1CourseData';
import { calculateUserLevel } from '../services/levelSystem';
import { 
  Sparkles, 
  GraduationCap, 
  BookOpen, 
  Layers, 
  TrendingUp, 
  Flame,
  RefreshCw
} from 'lucide-react';

interface ProgressSectionProps {
  user?: UserProfile | null;
  onOpenAuth?: () => void;
}

export const ProgressSection: React.FC<ProgressSectionProps> = ({
  user: initialUser,
  onOpenAuth
}) => {
  // Synchronized active user profile
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(
    initialUser || authService.getCurrentUser()
  );

  const [loading, setLoading] = useState<boolean>(true);
  const [userProgressMap, setUserProgressMap] = useState<Record<string, UserProgress>>({});
  const [vocabLearnedCount, setVocabLearnedCount] = useState<number>(0);

  // Sync with auth changes
  useEffect(() => {
    if (initialUser) {
      setCurrentUser(initialUser);
    }
    const unsubscribe = authService.onAuthStateChange((u) => {
      setCurrentUser(u);
    });
    return () => unsubscribe();
  }, [initialUser]);

  // Load user progress and vocabulary records from existing database/local storage
  const userId = currentUser?.id || currentUser?.email || 'guest_learner';

  useEffect(() => {
    let isMounted = true;

    async function loadProgressData() {
      setLoading(true);
      try {
        const [progress, vocabProgress] = await Promise.all([
          learningDatabase.getUserProgress(userId),
          learningDatabase.getUserVocabProgress(userId)
        ]);

        if (isMounted) {
          setUserProgressMap(progress);
          const knownCount = vocabProgress.knownWordIds.length || currentUser?.wordsMasteredCount || 0;
          setVocabLearnedCount(knownCount);
          setLoading(false);
        }
      } catch (err) {
        console.warn('Failed to load user progress data:', err);
        if (isMounted) setLoading(false);
      }
    }

    loadProgressData();

    return () => {
      isMounted = false;
    };
  }, [userId, currentUser?.wordsMasteredCount]);

  // 1. Total XP Calculation
  const progressList = Object.values(userProgressMap) as UserProgress[];
  const lessonXp = progressList.reduce((sum, p) => sum + (p.xpEarned || 0), 0);
  const vocabXp = vocabLearnedCount * 5;
  const profileXp = currentUser?.xp || currentUser?.totalXp || 0;
  const guestXp = authService.getGuestXp();
  const totalXp = Math.max(profileXp, guestXp, lessonXp + vocabXp);

  // 2. Current Level & Progress Calculation from levelSystem
  const levelInfo = calculateUserLevel(totalXp);

  // Synchronize XP to active user profile if earned during session
  useEffect(() => {
    if (currentUser && totalXp > (currentUser.xp || 0)) {
      authService.updateUserProfile({ xp: totalXp });
    }
  }, [currentUser?.id, totalXp]);

  // 3. A1 Lessons Completed
  const totalA1Lessons = A1_COURSE_LESSONS.length; // 20 lessons
  const a1CompletedCount = A1_COURSE_LESSONS.filter((lesson) => {
    const shortId = lesson.id.replace('a1_lesson_', 'les_a1_');
    return (
      userProgressMap[lesson.id]?.completionStatus === 'completed' ||
      userProgressMap[shortId]?.completionStatus === 'completed'
    );
  }).length;

  // 4. Vocabulary Learned
  // Already computed in vocabLearnedCount state

  // 5. Learning Percentage
  const learningPercentage = totalA1Lessons > 0
    ? Math.min(100, Math.round((a1CompletedCount / totalA1Lessons) * 100))
    : 0;

  // 6. Current Streak
  const currentStreak = currentUser?.streakDays || currentUser?.learningStreak || (a1CompletedCount > 0 ? 1 : 0);

  return (
    <section id="my-progress-section" className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with German Teacher Logo and Design */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs mb-4">
            <BrandLogo size="sm" />
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              My Progress
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Outfit'] tracking-tight">
            My Learning Progress
          </h2>
          <p className="mt-2.5 text-base sm:text-lg text-slate-600 leading-relaxed">
            Track your German study milestones, completed lessons, vocabulary mastered, and daily learning streak.
          </p>

          {!currentUser && onOpenAuth && (
            <div className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-slate-600 bg-amber-50 border border-amber-200/80 px-4 py-2 rounded-2xl">
              <span>Viewing guest progress.</span>
              <button 
                onClick={onOpenAuth}
                className="text-red-600 font-bold hover:underline"
              >
                Sign up free to sync your progress
              </button>
            </div>
          )}
        </div>

        {/* 6 Required Progress Cards */}
        {loading ? (
          <div className="py-16 text-center text-slate-400 bg-white rounded-3xl border border-slate-200">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto text-red-500 mb-2" />
            <p className="text-sm font-semibold">Loading your learning progress...</p>
          </div>
        ) : (
          <div id="progress-cards-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            
            {/* 1. Total XP */}
            <div 
              id="card-total-xp"
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Total XP
                </span>
                <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200/80 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
              </div>

              <div className="mt-6">
                <div className="text-3xl sm:text-4xl font-black text-slate-900 font-['Outfit'] tracking-tight">
                  {totalXp.toLocaleString()} <span className="text-xl font-bold text-amber-600">XP</span>
                </div>
                <p className="text-xs text-amber-800 font-semibold mt-1.5">
                  Earned across lessons and vocabulary · Level {levelInfo.currentLevel.level} ({levelInfo.currentLevel.name})
                </p>
              </div>
            </div>

            {/* 2. Current Level */}
            <div 
              id="card-current-level"
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Current Level
                </span>
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 border border-blue-200/80 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5" />
                </div>
              </div>

              <div className="mt-5">
                <div className="text-2xl sm:text-3xl font-black text-slate-900 font-['Outfit'] tracking-tight">
                  Level {levelInfo.currentLevel.level} — {levelInfo.currentLevel.name}
                </div>
                
                {/* XP Progress Bar towards next level */}
                <div className="mt-3 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                    <span>{levelInfo.currentLevel.name}</span>
                    <span className="font-mono text-slate-700">
                      {levelInfo.currentXp.toLocaleString()} / {levelInfo.nextLevel ? levelInfo.nextLevel.minXp.toLocaleString() : levelInfo.currentXp.toLocaleString()} XP
                    </span>
                  </div>

                  <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2.5 rounded-full transition-all duration-500" 
                      style={{ width: `${levelInfo.progressPercent}%` }}
                    />
                  </div>

                  <div className="text-[11px] font-semibold text-blue-700">
                    {levelInfo.nextLevel 
                      ? `${levelInfo.xpNeededForNextLevel.toLocaleString()} XP to ${levelInfo.nextLevel.name}`
                      : 'German Explorer reached!'}
                  </div>
                </div>
              </div>
            </div>

            {/* 3. A1 Lessons Completed */}
            <div 
              id="card-a1-lessons-completed"
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  A1 Lessons Completed
                </span>
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200/80 flex items-center justify-center">
                  <BookOpen className="w-5 h-5" />
                </div>
              </div>

              <div className="mt-6">
                <div className="text-3xl sm:text-4xl font-black text-slate-900 font-['Outfit'] tracking-tight flex items-baseline gap-1.5">
                  {a1CompletedCount}
                  <span className="text-lg font-bold text-slate-400">/ {totalA1Lessons}</span>
                </div>
                <p className="text-xs text-emerald-800 font-semibold mt-1.5">
                  {a1CompletedCount} of {totalA1Lessons} A1 lessons finished
                </p>
              </div>
            </div>

            {/* 4. Vocabulary Learned */}
            <div 
              id="card-vocabulary-learned"
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Vocabulary Learned
                </span>
                <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 border border-purple-200/80 flex items-center justify-center">
                  <Layers className="w-5 h-5" />
                </div>
              </div>

              <div className="mt-6">
                <div className="text-3xl sm:text-4xl font-black text-slate-900 font-['Outfit'] tracking-tight">
                  {vocabLearnedCount}{' '}
                  <span className="text-lg font-bold text-slate-500">Words</span>
                </div>
                <p className="text-xs text-purple-800 font-semibold mt-1.5">
                  German vocabulary mastered
                </p>
              </div>
            </div>

            {/* 5. Learning Percentage */}
            <div 
              id="card-learning-percentage"
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Learning Percentage
                </span>
                <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-600 border border-red-200/80 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5" />
                </div>
              </div>

              <div className="mt-6">
                <div className="text-3xl sm:text-4xl font-black text-slate-900 font-['Outfit'] tracking-tight">
                  {learningPercentage}%
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 mt-2.5 overflow-hidden">
                  <div 
                    className="bg-red-600 h-2 rounded-full transition-all duration-500" 
                    style={{ width: `${learningPercentage}%` }}
                  />
                </div>
                <p className="text-xs text-slate-500 font-semibold mt-2">
                  A1 curriculum completion
                </p>
              </div>
            </div>

            {/* 6. Current Streak */}
            <div 
              id="card-current-streak"
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Current Streak
                </span>
                <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200/80 flex items-center justify-center">
                  <Flame className="w-5 h-5 fill-amber-500" />
                </div>
              </div>

              <div className="mt-6">
                <div className="text-3xl sm:text-4xl font-black text-slate-900 font-['Outfit'] tracking-tight flex items-center gap-2">
                  {currentStreak}{' '}
                  <span className="text-lg font-bold text-slate-500">Days</span>
                </div>
                <p className="text-xs text-amber-800 font-semibold mt-1.5">
                  Consecutive daily learning
                </p>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
