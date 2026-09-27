import React, { useState, useEffect } from 'react';
import { CEFR_LEVELS } from '../data/curriculumData';
import { GermanLevel, Lesson, UserProgress } from '../types';
import { learningDatabase } from '../services/learningDatabase';
import { authService } from '../services/authService';
import { 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  Award, 
  ChevronRight, 
  PlayCircle, 
  Layers, 
  Target,
  Sparkles,
  X,
  Volume2,
  BookmarkCheck
} from 'lucide-react';
import { speakGerman } from '../utils/audio';

interface LearnLevelsSectionProps {
  onStartLesson?: (lessonId: string) => void;
}

export const LearnLevelsSection: React.FC<LearnLevelsSectionProps> = ({
  onStartLesson
}) => {
  const [selectedLevel, setSelectedLevel] = useState<GermanLevel>('A1');
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [activeLessonModal, setActiveLessonModal] = useState<Lesson | null>(null);
  const [userProgressMap, setUserProgressMap] = useState<Record<string, UserProgress>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [savingProgress, setSavingProgress] = useState<boolean>(false);

  const currentLevelData = CEFR_LEVELS.find((lvl) => lvl.level === selectedLevel) || CEFR_LEVELS[0];
  const currentUser = authService.getCurrentUser();
  const userId = currentUser?.id || 'guest_learner';

  // Fetch lessons & user progress for this level from learningDatabase
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      setLoading(true);
      try {
        const [levelLessons, progress] = await Promise.all([
          learningDatabase.getLessons(selectedLevel),
          learningDatabase.getUserProgress(userId)
        ]);
        if (isMounted) {
          setLessons(levelLessons);
          setUserProgressMap(progress);
        }
      } catch (err) {
        console.error('Error loading curriculum data:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadData();
    return () => { isMounted = false; };
  }, [selectedLevel, userId]);

  const handleOpenLesson = (lesson: Lesson) => {
    setActiveLessonModal(lesson);
  };

  const handleMarkCompleted = async (lesson: Lesson) => {
    setSavingProgress(true);
    const newProgress: UserProgress = {
      userId,
      lessonId: lesson.lessonId,
      completionStatus: 'completed',
      quizScore: 100,
      vocabularyLearned: 15,
      xpEarned: 50,
      lastActivity: new Date().toISOString()
    };

    await learningDatabase.saveUserProgress(newProgress);
    setUserProgressMap(prev => ({
      ...prev,
      [lesson.lessonId]: newProgress
    }));
    
    // Also update daily goal
    const todayGoal = await learningDatabase.getDailyGoal(userId);
    await learningDatabase.updateDailyGoal(userId, todayGoal.completedAmount + 1, todayGoal.dailyTarget);

    setSavingProgress(false);
    setActiveLessonModal(null);
  };

  return (
    <section id="learn-levels-section" className="py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-wider mb-3">
            <span>Structured CEFR Roadmap</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Outfit'] tracking-tight">
            Learn German from A1 to B2
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Follow the standardized Common European Framework of Reference (CEFR). Each level builds targeted skills for Goethe, Telc, and German residency tests.
          </p>
        </div>

        {/* 4 CEFR Level Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10">
          {CEFR_LEVELS.map((lvl) => {
            const isSelected = selectedLevel === lvl.level;
            return (
              <button
                key={lvl.level}
                id={`level-tab-${lvl.level}`}
                onClick={() => setSelectedLevel(lvl.level)}
                className={`p-5 rounded-3xl text-left border transition-all duration-200 ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xl scale-[1.02]'
                    : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xl font-extrabold font-['Outfit'] px-3 py-0.5 rounded-xl ${
                    isSelected ? 'bg-red-600 text-white' : 'bg-slate-200 text-slate-900'
                  }`}>
                    {lvl.level}
                  </span>
                  <span className={`text-xs font-semibold flex items-center gap-1 ${
                    isSelected ? 'text-slate-300' : 'text-slate-500'
                  }`}>
                    <Clock className="w-3.5 h-3.5" />
                    {lvl.hours.split(' ')[0]}
                  </span>
                </div>
                <div className="font-extrabold text-sm sm:text-base mt-2">{lvl.name}</div>
                <div className={`text-xs font-medium mt-0.5 ${isSelected ? 'text-amber-300' : 'text-slate-500'}`}>
                  {lvl.target}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Level Deep Dive Card */}
        <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Overview & Milestones */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl font-black text-slate-900 font-['Outfit']">
                    Level {currentLevelData.level} · {currentLevelData.name}
                  </span>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                    Officially Accredited
                  </span>
                </div>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {currentLevelData.description}
                </p>
              </div>

              {/* Real World Milestones */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                  <Award className="w-4 h-4 text-amber-500" />
                  <span>Real-Life Milestone in Germany</span>
                </div>
                <p className="text-sm font-semibold text-slate-800 leading-normal">
                  {currentLevelData.milestones}
                </p>
              </div>

              {/* Core Topics Taught */}
              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                  Key Curriculum Topics in {currentLevelData.level}:
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {currentLevelData.topics.map((topic, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-800 flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-red-600 flex-shrink-0" />
                      <span className="truncate">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Curriculum Lessons from Learning Database */}
            <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-red-600" />
                  <span className="font-extrabold text-sm text-slate-900">
                    {selectedLevel} Learning Database Lessons
                  </span>
                </div>
                <span className="text-xs text-slate-500 font-semibold">
                  {lessons.length} Modules
                </span>
              </div>

              <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                {loading ? (
                  <div className="py-8 text-center text-xs text-slate-400">Loading curriculum...</div>
                ) : lessons.length === 0 ? (
                  <div className="py-8 text-center text-xs text-slate-400">No lessons found for {selectedLevel}</div>
                ) : (
                  lessons.map((lesson) => {
                    const isCompleted = userProgressMap[lesson.lessonId]?.completionStatus === 'completed';
                    return (
                      <div
                        key={lesson.lessonId}
                        id={`lesson-item-${lesson.lessonId}`}
                        onClick={() => handleOpenLesson(lesson)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between group ${
                          isCompleted
                            ? 'bg-emerald-50/70 border-emerald-200'
                            : 'bg-slate-50 hover:bg-slate-100 border-slate-200/80'
                        }`}
                      >
                        <div className="pr-3">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-200 text-slate-700">
                              #{lesson.lessonOrder}
                            </span>
                            <span className="text-xs font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                              {lesson.category}
                            </span>
                            {isCompleted && (
                              <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-0.5">
                                <CheckCircle2 className="w-3 h-3" /> Done
                              </span>
                            )}
                          </div>
                          <p className="text-xs font-semibold text-slate-700 line-clamp-1">{lesson.title}</p>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 group-hover:text-red-600 flex-shrink-0">
                          <PlayCircle className="w-4 h-4" />
                          <span>Open</span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => lessons[0] && handleOpenLesson(lessons[0])}
                  className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <span>Start First {selectedLevel} Lesson</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Lesson Content Viewer Modal */}
      {activeLessonModal && (
        <div 
          id="lesson-content-modal"
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-xl bg-red-600 text-white font-black text-xs">
                  {activeLessonModal.germanLevel}
                </span>
                <div>
                  <h3 className="text-lg font-bold font-['Outfit']">{activeLessonModal.title}</h3>
                  <p className="text-xs text-slate-400">{activeLessonModal.category}</p>
                </div>
              </div>
              <button
                onClick={() => setActiveLessonModal(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700 flex-1">
              {/* Description */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <p className="text-sm font-medium text-slate-800">{activeLessonModal.description}</p>
              </div>

              {/* Lesson Dialogue */}
              {typeof activeLessonModal.lessonContent === 'object' && activeLessonModal.lessonContent.dialogue && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Real-Life German Dialogue:</span>
                  </h4>
                  <div className="space-y-2">
                    {activeLessonModal.lessonContent.dialogue.map((line, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200/90 flex items-start justify-between gap-3">
                        <div>
                          <div className="text-xs font-bold text-red-600 mb-0.5">{line.speaker}</div>
                          <div className="font-bold text-slate-900 text-sm">{line.german}</div>
                          <div className="text-xs text-slate-500 mt-0.5">{line.english}</div>
                        </div>
                        <button
                          onClick={() => speakGerman(line.german)}
                          className="p-1.5 rounded-lg bg-white hover:bg-slate-200 text-slate-600 transition-colors flex-shrink-0"
                          title="Listen to German pronunciation"
                        >
                          <Volume2 className="w-4 h-4 text-slate-700" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Grammar Note */}
              {typeof activeLessonModal.lessonContent === 'object' && activeLessonModal.lessonContent.grammarNote && (
                <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 space-y-1">
                  <div className="font-bold uppercase tracking-wider text-amber-950">Grammar Focus:</div>
                  <p className="leading-relaxed">{activeLessonModal.lessonContent.grammarNote}</p>
                </div>
              )}

              {/* Practical Cultural Tip */}
              {typeof activeLessonModal.lessonContent === 'object' && activeLessonModal.lessonContent.practicalTip && (
                <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200 text-xs text-blue-950 space-y-1">
                  <div className="font-bold uppercase tracking-wider text-blue-900">Life in Germany Practical Tip:</div>
                  <p className="leading-relaxed">{activeLessonModal.lessonContent.practicalTip}</p>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => setActiveLessonModal(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-white"
              >
                Close
              </button>

              <button
                id="lesson-complete-btn"
                disabled={savingProgress}
                onClick={() => handleMarkCompleted(activeLessonModal)}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-colors disabled:opacity-50"
              >
                <BookmarkCheck className="w-4 h-4" />
                <span>{savingProgress ? 'Saving Progress...' : 'Mark as Completed (+50 XP)'}</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
