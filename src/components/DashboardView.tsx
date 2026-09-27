import React, { useState, useEffect } from 'react';
import { UserProfile, Lesson, UserProgress, DailyGoal } from '../types';
import { learningDatabase } from '../services/learningDatabase';
import { 
  Flame, 
  Target, 
  Layers, 
  Award, 
  Play, 
  BookOpen, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  Database
} from 'lucide-react';

interface DashboardViewProps {
  user: UserProfile;
  onContinueLearning: () => void;
  onLaunchAITeacher: () => void;
  onOpenVocabulary: () => void;
  onOpenQuizzes: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  onContinueLearning,
  onLaunchAITeacher,
  onOpenVocabulary,
  onOpenQuizzes
}) => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [progressMap, setProgressMap] = useState<Record<string, UserProgress>>({});
  const [dailyGoal, setDailyGoal] = useState<DailyGoal>({
    userId: user.id,
    dailyTarget: user.dailyGoal || 5,
    completedAmount: user.completedLessonsToday || 3,
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    let isMounted = true;
    async function loadDashboardData() {
      const [allLessons, prog, goal] = await Promise.all([
        learningDatabase.getLessons(user.level),
        learningDatabase.getUserProgress(user.id),
        learningDatabase.getDailyGoal(user.id)
      ]);
      if (isMounted) {
        setLessons(allLessons);
        setProgressMap(prog);
        setDailyGoal(goal);
      }
    }
    loadDashboardData();
    return () => { isMounted = false; };
  }, [user.id, user.level]);

  // Calculate stats from database records
  const progressList = Object.values(progressMap) as UserProgress[];
  const completedCount = progressList.filter(p => p.completionStatus === 'completed').length;
  const totalXp = progressList.reduce((sum, p) => sum + (p.xpEarned || 0), user.xp || 120);
  const nextLesson = lessons.find((l) => progressMap[l.lessonId]?.completionStatus !== 'completed') || lessons[0];

  return (
    <div id="user-dashboard-view" className="py-10 sm:py-14 bg-slate-50 min-h-[calc(100vh-80px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Welcome Greeting & Action Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-[#0A1128] text-white rounded-3xl p-6 sm:p-9 border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
                  <Flame className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{user.streakDays || user.learningStreak || 1}-Day Learning Streak Active!</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-400/30">
                  <Database className="w-3 h-3" />
                  <span>{learningDatabase.isFirestoreAvailable() ? 'Connected to Firestore' : 'Encrypted Learning DB'}</span>
                </div>
              </div>

              {/* Welcome message */}
              <h1 className="text-2xl sm:text-4xl font-extrabold font-['Outfit'] text-white">
                Willkommen zurück, {user.name}! 👋
              </h1>
              <p className="text-sm sm:text-base text-slate-300 max-w-xl">
                Ready for today&apos;s German session? You are currently working through{' '}
                <strong className="text-amber-300">Level {user.level || user.germanLevel || 'A1'}</strong> with {totalXp} Total XP.
              </p>
            </div>

            {/* Top Quick Actions: Continue Learning & AI Teacher */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Continue Learning button */}
              <button
                id="dashboard-continue-learning-btn"
                onClick={onContinueLearning}
                className="px-6 py-3.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm shadow-md hover:shadow-red-600/30 transition-all flex items-center gap-2"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Continue Learning</span>
              </button>

              {/* AI Teacher button */}
              <button
                id="dashboard-ai-teacher-btn"
                onClick={onLaunchAITeacher}
                className="px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white border border-white/20 font-bold text-sm backdrop-blur-md transition-all flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>AI German Teacher</span>
              </button>
            </div>
          </div>
        </div>

        {/* 4 Core Metric Panels */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Current German Level */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Current Level</span>
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-xs">
                CEFR
              </div>
            </div>
            <div className="mt-4">
              <div className="text-3xl font-black text-slate-900 font-['Outfit']">
                Level {user.level || user.germanLevel || 'A1'}
              </div>
              <p className="text-xs text-slate-500 mt-1 font-semibold">{totalXp} XP Accumulated</p>
            </div>
          </div>

          {/* Daily Goal */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Daily Goal</span>
              <Target className="w-5 h-5 text-red-600" />
            </div>
            <div className="mt-4">
              <div className="text-3xl font-black text-slate-900 font-['Outfit']">
                {dailyGoal.completedAmount} / {dailyGoal.dailyTarget}
              </div>
              <div className="mt-2 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-red-600 h-full rounded-full transition-all duration-300" 
                  style={{ width: `${Math.min(100, (dailyGoal.completedAmount / dailyGoal.dailyTarget) * 100)}%` }}
                />
              </div>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                {dailyGoal.completedAmount >= dailyGoal.dailyTarget ? '🎉 Daily goal reached!' : `${dailyGoal.dailyTarget - dailyGoal.completedAmount} more lessons to reach daily target`}
              </p>
            </div>
          </div>

          {/* Vocabulary Progress */}
          <div 
            onClick={onOpenVocabulary}
            className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between hover:border-slate-300 cursor-pointer transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Vocabulary Bank</span>
              <Layers className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="mt-4">
              <div className="text-3xl font-black text-slate-900 font-['Outfit']">
                {user.wordsMasteredCount || 148}
              </div>
              <p className="text-xs text-emerald-700 font-semibold mt-1">
                A1-B2 Words with Pronunciation
              </p>
            </div>
          </div>

          {/* Completed Modules */}
          <div 
            onClick={onOpenQuizzes}
            className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between hover:border-slate-300 cursor-pointer transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Completed Lessons</span>
              <Award className="w-5 h-5 text-amber-500" />
            </div>
            <div className="mt-4">
              <div className="text-3xl font-black text-slate-900 font-['Outfit']">
                {completedCount} Modules
              </div>
              <p className="text-xs text-amber-800 font-semibold mt-1">
                {user.averageQuizScore || 92}% Average Quiz Accuracy
              </p>
            </div>
          </div>

        </div>

        {/* Up Next & Recent Lessons Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Continue Learning Featured Card */}
          {nextLesson && (
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-red-600" />
                  <h3 className="font-extrabold text-base text-slate-900 font-['Outfit']">
                    Next Scheduled Lesson
                  </h3>
                </div>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-red-100 text-red-700">
                  Ready to Start
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase">
                    {nextLesson.germanLevel} · {nextLesson.category}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    Lesson #{nextLesson.lessonOrder}
                  </span>
                </div>
                <h4 className="text-xl font-extrabold text-slate-900 font-['Outfit']">
                  {nextLesson.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {nextLesson.description}
                </p>
              </div>

              <button
                onClick={onContinueLearning}
                className="w-full py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <span>Launch This Lesson</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Database Lessons List */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-base text-slate-900 font-['Outfit']">
                Level {user.level || 'A1'} Curriculum Modules
              </h3>
              <span className="text-xs text-slate-400 font-semibold">{lessons.length} Modules</span>
            </div>

            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
              {lessons.map((lesson) => {
                const isDone = progressMap[lesson.lessonId]?.completionStatus === 'completed';
                return (
                  <div
                    key={lesson.lessonId}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isDone ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-500'
                      }`}>
                        {isDone ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 line-clamp-1">
                          {lesson.title}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {lesson.germanLevel} · {lesson.category}
                        </div>
                      </div>
                    </div>

                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                      isDone ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {isDone ? 'Done' : 'Next Up'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
