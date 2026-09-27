import React, { useState, useEffect } from 'react';
import { A1_COURSE_LESSONS } from '../data/a1CourseData';
import { A1Lesson, UserProfile, UserProgress } from '../types';
import { learningDatabase } from '../services/learningDatabase';
import { authService } from '../services/authService';
import { speakGerman, stopGermanSpeech } from '../utils/audio';
import { backButtonManager } from '../utils/backButtonHandler';
import { 
  BookOpen, 
  CheckCircle2, 
  Volume2, 
  Sparkles, 
  Award, 
  ChevronLeft, 
  ChevronRight, 
  HelpCircle, 
  Check, 
  X, 
  Lightbulb, 
  MessageSquare, 
  Clock, 
  ArrowRight,
  Flame,
  BookmarkCheck,
  RotateCcw,
  Layers,
  GraduationCap
} from 'lucide-react';

interface A1CourseViewProps {
  user: UserProfile | null;
  initialLessonNumber?: number;
  onNavigateToQuiz?: () => void;
  onNavigateToVocab?: () => void;
}

export const A1CourseView: React.FC<A1CourseViewProps> = ({
  user,
  initialLessonNumber = 1,
  onNavigateToQuiz,
  onNavigateToVocab
}) => {
  const [activeLessonIdx, setActiveLessonIdx] = useState<number>(initialLessonNumber - 1);
  const [userProgressMap, setUserProgressMap] = useState<Record<string, UserProgress>>({});
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submittedQuestions, setSubmittedQuestions] = useState<Record<string, boolean>>({});
  const [isMarkingComplete, setIsMarkingComplete] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'content' | 'dialogue' | 'grammar' | 'practice'>('content');
  const [playingAudioKey, setPlayingAudioKey] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);

  const activeLesson: A1Lesson = A1_COURSE_LESSONS[activeLessonIdx] || A1_COURSE_LESSONS[0];
  const userId = user?.id || 'guest_learner';

  // Load user progress for A1 lessons from learningDatabase
  useEffect(() => {
    let isMounted = true;
    async function loadProgress() {
      try {
        const progress = await learningDatabase.getUserProgress(userId);
        if (isMounted) {
          setUserProgressMap(progress);
        }
      } catch (err) {
        console.error('Error fetching progress:', err);
      }
    }
    loadProgress();
    return () => { isMounted = false; };
  }, [userId]);

  // Reset question selections when changing lesson
  useEffect(() => {
    setSelectedAnswers({});
    setSubmittedQuestions({});
    setActiveTab('content');
    setShowCelebration(false);
  }, [activeLessonIdx]);

  // Handle hardware back button inside A1CourseView
  useEffect(() => {
    if (showCelebration) {
      return backButtonManager.register('a1-celebration', 80, () => {
        setShowCelebration(false);
        return true;
      });
    }
  }, [showCelebration]);

  useEffect(() => {
    if (activeTab !== 'content') {
      return backButtonManager.register('a1-tab-back', 60, () => {
        setActiveTab('content');
        return true;
      });
    }
  }, [activeTab]);

  const isCurrentLessonCompleted = userProgressMap[activeLesson.id]?.completionStatus === 'completed';

  // Count total completed A1 lessons
  const completedLessonsCount = A1_COURSE_LESSONS.filter(
    (l) => userProgressMap[l.id]?.completionStatus === 'completed'
  ).length;

  // Cleanup speech on unmount
  useEffect(() => {
    return () => {
      stopGermanSpeech();
    };
  }, []);

  const totalA1Xp = A1_COURSE_LESSONS.reduce((sum, l) => {
    return sum + (userProgressMap[l.id]?.completionStatus === 'completed' ? l.xpReward : 0);
  }, 0);

  const handlePlayAudio = async (text: string, key: string, e?: React.MouseEvent | React.TouchEvent) => {
    if (e) {
      e.stopPropagation();
    }
    if (playingAudioKey === key) {
      await stopGermanSpeech();
      setPlayingAudioKey(null);
      return;
    }
    setPlayingAudioKey(key);
    try {
      await speakGerman(text);
    } finally {
      setPlayingAudioKey(null);
    }
  };

  const handleSelectAnswer = (questionId: string, optionIdx: number) => {
    if (submittedQuestions[questionId]) return;
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIdx }));
    setSubmittedQuestions(prev => ({ ...prev, [questionId]: true }));
  };

  const handleMarkCompleted = async () => {
    setIsMarkingComplete(true);
    try {
      const isAlreadyCompleted = 
        userProgressMap[activeLesson.id]?.completionStatus === 'completed' ||
        userProgressMap[activeLesson.id.replace('a1_lesson_', 'les_a1_')]?.completionStatus === 'completed';

      const newProgress: UserProgress = {
        userId,
        lessonId: activeLesson.id,
        completionStatus: 'completed',
        quizScore: 100,
        vocabularyLearned: activeLesson.vocabulary.length,
        xpEarned: activeLesson.xpReward || 100,
        lastActivity: new Date().toISOString()
      };

      await learningDatabase.saveUserProgress(newProgress);
      setUserProgressMap(prev => ({ ...prev, [activeLesson.id]: newProgress }));

      // Update today's daily goal
      const todayGoal = await learningDatabase.getDailyGoal(userId);
      await learningDatabase.updateDailyGoal(userId, todayGoal.completedAmount + 1, todayGoal.dailyTarget);

      // Award XP ONLY if not previously completed (prevent duplicate XP)
      if (!isAlreadyCompleted) {
        authService.addXp(activeLesson.xpReward || 100);
      }

      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 4000);
    } catch (err) {
      console.error('Failed to mark lesson complete:', err);
    } finally {
      setIsMarkingComplete(false);
    }
  };

  const handleNextLesson = () => {
    if (activeLessonIdx < A1_COURSE_LESSONS.length - 1) {
      setActiveLessonIdx(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevLesson = () => {
    if (activeLessonIdx > 0) {
      setActiveLessonIdx(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getArticleColor = (article?: 'der' | 'die' | 'das') => {
    if (article === 'der') return 'bg-blue-100 text-blue-800 border-blue-200';
    if (article === 'die') return 'bg-red-100 text-red-800 border-red-200';
    if (article === 'das') return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    return 'bg-slate-100 text-slate-700 border-slate-200';
  };

  return (
    <div id="a1-course-container" className="py-10 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Course Header Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-[#111c3a] text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-red-600 text-white font-extrabold text-xs tracking-wider uppercase">
                  A1 Beginner Course
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 text-slate-300 font-bold text-xs border border-white/15">
                  20 Practical German Lessons
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] text-white">
                Complete A1 German for Daily Life in Germany
              </h1>
              <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
                Step-by-step practical German curriculum designed specifically for newcomers, international students, and workers in Germany. Master greetings, appointments, Anmeldung, supermarkets, and everyday conversations.
              </p>
            </div>

            {/* Course Overall Progress Metrics */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/20 w-full lg:w-auto lg:min-w-[240px] max-w-full space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                <span>Course Progress</span>
                <span className="text-amber-400 font-black">{completedLessonsCount} / 20 Completed</span>
              </div>
              <div className="w-full bg-white/20 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-amber-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${(completedLessonsCount / 20) * 100}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-300">
                <span className="flex items-center gap-1 font-semibold">
                  <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  {totalA1Xp} Course XP
                </span>
                <span className="font-semibold text-emerald-300">
                  {Math.round((completedLessonsCount / 20) * 100)}% Finished
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Main Workspace: Lesson List Sidebar + Active Lesson Deep Dive */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: 20 Lessons Directory */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-4 lg:sticky lg:top-24">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-red-600" />
                <h2 className="font-extrabold text-sm text-slate-900 font-['Outfit']">
                  Course Curriculum
                </h2>
              </div>
              <span className="text-xs text-slate-500 font-bold">20 Modules</span>
            </div>

            {/* Scrollable List of 20 Lessons */}
            <div className="space-y-2 max-h-[620px] overflow-y-auto pr-1">
              {A1_COURSE_LESSONS.map((lesson, idx) => {
                const isSelected = idx === activeLessonIdx;
                const isCompleted = userProgressMap[lesson.id]?.completionStatus === 'completed';

                return (
                  <button
                    key={lesson.id}
                    id={`a1-lesson-nav-${lesson.lessonNumber}`}
                    onClick={() => {
                      setActiveLessonIdx(idx);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`w-full p-3 rounded-2xl text-left border transition-all flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-[1.01]'
                        : isCompleted
                        ? 'bg-emerald-50/60 border-emerald-200 text-slate-900 hover:bg-emerald-50'
                        : 'bg-slate-50/80 border-slate-200/80 text-slate-800 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs flex-shrink-0 ${
                        isSelected
                          ? 'bg-red-600 text-white'
                          : isCompleted
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-200 text-slate-700'
                      }`}>
                        {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : lesson.lessonNumber}
                      </div>
                      <div className="min-w-0">
                        <div className={`text-xs font-bold truncate ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                          {lesson.lessonNumber}. {lesson.germanTitle}
                        </div>
                        <div className={`text-[11px] truncate ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                          {lesson.englishTitle}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 flex-shrink-0">
                      <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded ${
                        isSelected
                          ? 'bg-white/20 text-amber-300'
                          : 'bg-slate-200/80 text-slate-700'
                      }`}>
                        +{lesson.xpReward} XP
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Active Lesson Interactive Study Panel */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Active Lesson Header Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
              
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-xl bg-red-100 text-red-700 font-black text-xs">
                    Lesson {activeLesson.lessonNumber} of 20
                  </span>
                  <span className="px-2.5 py-1 rounded-xl bg-blue-50 text-blue-700 font-bold text-xs">
                    Level A1
                  </span>
                  {isCurrentLessonCompleted && (
                    <span className="px-2.5 py-1 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrevLesson}
                    disabled={activeLessonIdx === 0}
                    className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-30 transition-colors"
                    title="Previous Lesson"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNextLesson}
                    disabled={activeLessonIdx === A1_COURSE_LESSONS.length - 1}
                    className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-30 transition-colors"
                    title="Next Lesson"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1 flex-1 min-w-0">
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-['Outfit']">
                    {activeLesson.germanTitle}
                  </h2>
                  <div className="text-sm sm:text-base font-bold text-red-600 mt-0.5">
                    {activeLesson.englishTitle}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlayAudio(activeLesson.germanTitle, `lesson_title_${activeLesson.id}`);
                  }}
                  className="relative z-10 pointer-events-auto min-w-[44px] min-h-[44px] w-11 h-11 p-2 rounded-xl bg-white hover:bg-slate-200 active:bg-slate-300 active:scale-95 text-slate-700 border border-slate-200 shadow-2xs transition-all flex items-center justify-center shrink-0 cursor-pointer select-none touch-manipulation"
                  title="Listen to lesson title"
                  aria-label={`Listen to lesson title: ${activeLesson.germanTitle}`}
                >
                  <Volume2 className={`w-4 h-4 pointer-events-none ${playingAudioKey === `lesson_title_${activeLesson.id}` ? 'text-red-600 animate-pulse' : ''}`} aria-hidden="true" />
                </button>
              </div>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                {activeLesson.shortExplanation}
              </p>

              {/* Navigation Tabs for Active Lesson */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
                <button
                  id="tab-content"
                  onClick={() => setActiveTab('content')}
                  className={`px-4 py-2 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 ${
                    activeTab === 'content'
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Vocabulary & Sentences ({activeLesson.vocabulary.length})</span>
                </button>
                <button
                  id="tab-dialogue"
                  onClick={() => setActiveTab('dialogue')}
                  className={`px-4 py-2 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 ${
                    activeTab === 'dialogue'
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Real-Life Dialogue</span>
                </button>
                <button
                  id="tab-grammar"
                  onClick={() => setActiveTab('grammar')}
                  className={`px-4 py-2 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 ${
                    activeTab === 'grammar'
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>Grammar Focus & Phrases</span>
                </button>
                <button
                  id="tab-practice"
                  onClick={() => setActiveTab('practice')}
                  className={`px-4 py-2 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 ${
                    activeTab === 'practice'
                      ? 'bg-red-600 text-white shadow-sm'
                      : 'bg-red-50 text-red-700 hover:bg-red-100'
                  }`}
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>5 Practice Questions</span>
                </button>
              </div>

            </div>

            {/* TAB 1: Important Vocabulary & Example Sentences */}
            {activeTab === 'content' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                
                {/* Important German Vocabulary Section */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-base text-slate-900 font-['Outfit'] flex items-center gap-2">
                      <Layers className="w-4 h-4 text-red-600" />
                      <span>Important German Vocabulary</span>
                    </h3>
                    <span className="text-xs text-slate-500 font-semibold">
                      Click audio button to pronounce
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {activeLesson.vocabulary.map((vocab, i) => (
                      <div 
                        key={i}
                        className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between hover:border-slate-300 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0 pr-1">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              {vocab.article && (
                                <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold border shrink-0 ${getArticleColor(vocab.article)}`}>
                                  {vocab.article}
                                </span>
                              )}
                              <span className="font-extrabold text-base text-slate-900 font-['Outfit']">
                                {vocab.german}
                              </span>
                            </div>
                            <div className="text-xs font-semibold text-slate-600 mt-0.5">
                              {vocab.english}
                            </div>
                          </div>

                          <div className="flex flex-col items-end gap-1.5 shrink-0">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePlayAudio(vocab.german, `voc_${i}`);
                              }}
                              className="relative z-10 pointer-events-auto min-w-[44px] min-h-[44px] w-11 h-11 p-2 rounded-xl bg-white hover:bg-slate-200 active:bg-slate-300 active:scale-95 text-slate-700 border border-slate-200 shadow-2xs transition-all flex items-center justify-center shrink-0 cursor-pointer select-none touch-manipulation"
                              title="Listen to German pronunciation"
                              aria-label={`Listen to German pronunciation: ${vocab.german}`}
                            >
                              <Volume2 className={`w-4 h-4 pointer-events-none ${playingAudioKey === `voc_${i}` ? 'text-red-600 animate-pulse' : ''}`} aria-hidden="true" />
                            </button>
                          </div>
                        </div>

                        {/* Pronunciation guide and example */}
                        <div className="mt-3 pt-2.5 border-t border-slate-200/80 space-y-1">
                          {vocab.pronunciation && (
                            <div className="text-[11px] font-mono text-slate-500">
                              /{vocab.pronunciation}/
                            </div>
                          )}
                          {vocab.exampleSentence && (
                            <div className="text-xs text-slate-700 font-medium flex items-center justify-between gap-2.5 pt-0.5">
                              <div className="flex-1 min-w-0">
                                <span className="font-bold text-slate-900">&ldquo;{vocab.exampleSentence}&rdquo;</span>
                                {vocab.exampleTranslation && (
                                  <span className="block text-[11px] text-slate-500 mt-0.5">
                                    {vocab.exampleTranslation}
                                  </span>
                                )}
                              </div>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handlePlayAudio(vocab.exampleSentence!, `voc_ex_${i}`);
                                }}
                                className="relative z-10 pointer-events-auto min-w-[44px] min-h-[44px] w-11 h-11 p-2 rounded-xl bg-white hover:bg-slate-200 active:bg-slate-300 active:scale-95 text-slate-700 border border-slate-200 shadow-2xs transition-all flex items-center justify-center shrink-0 cursor-pointer select-none touch-manipulation"
                                title="Listen to example sentence"
                                aria-label={`Listen to example sentence: ${vocab.exampleSentence}`}
                              >
                                <Volume2 className={`w-4 h-4 pointer-events-none ${playingAudioKey === `voc_ex_${i}` ? 'text-red-600 animate-pulse' : ''}`} aria-hidden="true" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* German Example Sentences Section */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-extrabold text-base text-slate-900 font-['Outfit'] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>German Example Sentences & English Translations</span>
                  </h3>

                  <div className="space-y-3">
                    {activeLesson.exampleSentences.map((sent, i) => (
                      <div 
                        key={i}
                        className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3"
                      >
                        <div className="space-y-0.5 flex-1 min-w-0 pr-1">
                          <div className="text-sm font-bold text-slate-900">
                            {sent.german}
                          </div>
                          <div className="text-xs text-slate-600">
                            {sent.english}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePlayAudio(sent.german, `sent_${i}`);
                          }}
                          className="relative z-10 pointer-events-auto min-w-[44px] min-h-[44px] w-11 h-11 p-2 rounded-xl bg-white hover:bg-slate-200 active:bg-slate-300 active:scale-95 text-slate-700 border border-slate-200 shadow-2xs transition-all flex items-center justify-center shrink-0 cursor-pointer select-none touch-manipulation"
                          title="Listen to sentence"
                          aria-label={`Listen to sentence: ${sent.german}`}
                        >
                          <Volume2 className={`w-4 h-4 pointer-events-none ${playingAudioKey === `sent_${i}` ? 'text-red-600 animate-pulse' : ''}`} aria-hidden="true" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: Short Real-Life Dialogue */}
            {activeTab === 'dialogue' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 animate-in fade-in duration-200">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="space-y-0.5">
                    <h3 className="font-extrabold text-base text-slate-900 font-['Outfit'] flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-red-600" />
                      <span>Real-Life German Dialogue in Practice</span>
                    </h3>
                    <p className="text-xs text-slate-500">
                      Natural conversational exchange used in German daily life.
                    </p>
                  </div>
                </div>

                <div className="space-y-3.5">
                  {activeLesson.dialogue.map((line, i) => (
                    <div 
                      key={i}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-3"
                    >
                      <div className="space-y-1 flex-1 min-w-0 pr-1">
                        <div className="text-xs font-bold text-red-600">
                          {line.speaker}
                        </div>
                        <div className="text-sm sm:text-base font-bold text-slate-900">
                          {line.german}
                        </div>
                        <div className="text-xs text-slate-500 font-medium">
                          {line.english}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlayAudio(line.german, `dial_${i}`);
                        }}
                        className="relative z-10 pointer-events-auto min-w-[44px] min-h-[44px] w-11 h-11 p-2 rounded-xl bg-white hover:bg-slate-200 active:bg-slate-300 active:scale-95 text-slate-700 border border-slate-200 shadow-2xs transition-all flex items-center justify-center shrink-0 cursor-pointer select-none touch-manipulation"
                        title="Listen to line"
                        aria-label={`Listen to line: ${line.german}`}
                      >
                        <Volume2 className={`w-4 h-4 pointer-events-none ${playingAudioKey === `dial_${i}` ? 'text-red-600 animate-pulse' : ''}`} aria-hidden="true" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: Grammar Focus & 5 Useful Phrases */}
            {activeTab === 'grammar' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                
                {/* Grammar Focus Explanation */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-900 w-fit">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                    <span>A1 Grammar Focus</span>
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-900 font-['Outfit']">
                    {activeLesson.grammarFocus.title}
                  </h3>

                  <p className="text-sm text-slate-700 leading-relaxed bg-amber-50/70 p-4 rounded-2xl border border-amber-200/70 text-amber-950">
                    {activeLesson.grammarFocus.explanation}
                  </p>

                  {activeLesson.grammarFocus.rules && activeLesson.grammarFocus.rules.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Key Grammar Rules & Examples:
                      </h4>
                      <div className="grid grid-cols-1 gap-2.5">
                        {activeLesson.grammarFocus.rules.map((rule, idx) => (
                          <div 
                            key={idx}
                            className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                          >
                            <span className="font-bold text-slate-900 flex-1 min-w-0">{rule.rule}</span>
                            <div className="flex items-center justify-between sm:justify-end gap-2.5 shrink-0">
                              <span className="font-mono text-red-700 bg-red-50 px-2.5 py-1 rounded-lg border border-red-100">
                                {rule.example}
                              </span>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handlePlayAudio(rule.example, `rule_${idx}`);
                                }}
                                className="relative z-10 pointer-events-auto min-w-[44px] min-h-[44px] w-11 h-11 p-2 rounded-xl bg-white hover:bg-slate-200 active:bg-slate-300 active:scale-95 text-slate-700 border border-slate-200 shadow-2xs transition-all flex items-center justify-center shrink-0 cursor-pointer select-none touch-manipulation"
                                title="Listen to grammar rule example"
                                aria-label={`Listen to grammar rule example: ${rule.example}`}
                              >
                                <Volume2 className={`w-4 h-4 pointer-events-none ${playingAudioKey === `rule_${idx}` ? 'text-red-600 animate-pulse' : ''}`} aria-hidden="true" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* 5 Useful Words / Phrases Section */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-extrabold text-base text-slate-900 font-['Outfit'] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>5 Useful Words & Phrases to Remember</span>
                  </h3>

                  <div className="space-y-3">
                    {activeLesson.usefulPhrases.map((phrase, i) => (
                      <div 
                        key={i}
                        className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-3"
                      >
                        <div className="space-y-1 flex-1 min-w-0 pr-1">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-800 text-[11px] font-black flex items-center justify-center shrink-0">
                              {i + 1}
                            </span>
                            <span className="text-sm sm:text-base font-extrabold text-slate-900">
                              {phrase.german}
                            </span>
                          </div>
                          <div className="text-xs font-semibold text-slate-600 pl-7">
                            {phrase.english}
                          </div>
                          {phrase.note && (
                            <div className="text-[11px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60 w-fit ml-7 mt-1">
                              💡 {phrase.note}
                            </div>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePlayAudio(phrase.german, `phr_${i}`);
                          }}
                          className="relative z-10 pointer-events-auto min-w-[44px] min-h-[44px] w-11 h-11 p-2 rounded-xl bg-white hover:bg-slate-200 active:bg-slate-300 active:scale-95 text-slate-700 border border-slate-200 shadow-2xs transition-all flex items-center justify-center shrink-0 cursor-pointer select-none touch-manipulation"
                          title="Listen"
                          aria-label={`Listen: ${phrase.german}`}
                        >
                          <Volume2 className={`w-4 h-4 pointer-events-none ${playingAudioKey === `phr_${i}` ? 'text-red-600 animate-pulse' : ''}`} aria-hidden="true" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* TAB 4: 5 Practice Questions */}
            {activeTab === 'practice' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 animate-in fade-in duration-200">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="space-y-0.5">
                    <h3 className="font-extrabold text-base text-slate-900 font-['Outfit'] flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-red-600" />
                      <span>5 Practice Questions for Lesson {activeLesson.lessonNumber}</span>
                    </h3>
                    <p className="text-xs text-slate-500">
                      Test your understanding of the vocabulary and grammar rules.
                    </p>
                  </div>
                  <span className="text-xs font-extrabold px-2.5 py-1 rounded-lg bg-red-100 text-red-700">
                    5 Questions
                  </span>
                </div>

                <div className="space-y-6">
                  {activeLesson.practiceQuestions.map((q, qIndex) => {
                    const isSubmitted = !!submittedQuestions[q.id];
                    const selectedIdx = selectedAnswers[q.id];
                    const isCorrect = selectedIdx === q.correctIndex;

                    return (
                      <div 
                        key={q.id}
                        className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4"
                      >
                        <div className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                            {qIndex + 1}
                          </span>
                          <h4 className="text-sm sm:text-base font-bold text-slate-900">
                            {q.question}
                          </h4>
                        </div>

                        {/* Question Options */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {q.options.map((opt, optIdx) => {
                            const isThisOptionSelected = selectedIdx === optIdx;
                            let style = 'bg-white border-slate-200 text-slate-800 hover:bg-slate-100';

                            if (isSubmitted) {
                              if (optIdx === q.correctIndex) {
                                style = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-500/20';
                              } else if (isThisOptionSelected) {
                                style = 'bg-red-50 border-red-500 text-red-950 font-bold ring-2 ring-red-500/20';
                              } else {
                                style = 'bg-white border-slate-200 text-slate-400 opacity-60';
                              }
                            }

                            return (
                              <button
                                key={optIdx}
                                disabled={isSubmitted}
                                onClick={() => handleSelectAnswer(q.id, optIdx)}
                                className={`p-3 rounded-xl border text-left text-xs sm:text-sm font-semibold transition-all flex items-center justify-between ${style}`}
                              >
                                <span>{opt}</span>
                                {isSubmitted && (
                                  optIdx === q.correctIndex ? (
                                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                                  ) : isThisOptionSelected ? (
                                    <X className="w-4 h-4 text-red-600 flex-shrink-0" />
                                  ) : null
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {/* Pedagogical Explanation */}
                        {isSubmitted && (
                          <div className={`p-3.5 rounded-xl text-xs space-y-1 animate-in fade-in duration-200 ${
                            isCorrect ? 'bg-emerald-100/70 text-emerald-950 border border-emerald-300' : 'bg-amber-100/70 text-amber-950 border border-amber-300'
                          }`}>
                            <div className="font-bold flex items-center gap-1.5">
                              {isCorrect ? '✅ Richtig (Correct)!' : '💡 Erklärung (Explanation):'}
                            </div>
                            <p className="leading-relaxed">{q.explanation}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Bottom Actions Bar: XP Reward & Mark Completed Button */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center font-black">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Lesson Reward
                  </div>
                  <div className="text-base font-black text-slate-900">
                    +{activeLesson.xpReward} XP for Completion
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <button
                  id="mark-completed-btn"
                  disabled={isMarkingComplete}
                  onClick={handleMarkCompleted}
                  className={`w-full sm:w-auto px-6 py-3.5 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 shadow-md transition-all ${
                    isCurrentLessonCompleted
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : 'bg-red-600 hover:bg-red-700 text-white hover:shadow-red-600/30'
                  }`}
                >
                  <BookmarkCheck className="w-4 h-4" />
                  <span>
                    {isMarkingComplete
                      ? 'Saving Progress...'
                      : isCurrentLessonCompleted
                      ? 'Completed (Update +100 XP)'
                      : 'Mark Lesson as Completed (+100 XP)'}
                  </span>
                </button>

                {activeLessonIdx < A1_COURSE_LESSONS.length - 1 && (
                  <button
                    onClick={handleNextLesson}
                    className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Next Lesson</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Celebration Floating Notification */}
            {showCelebration && (
              <div 
                id="a1-celebration-toast"
                className="p-4 rounded-2xl bg-slate-950 text-white border border-emerald-500/50 shadow-2xl flex items-center justify-between gap-4 animate-in slide-in-from-bottom-4 duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-black">
                    ✓
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white">
                      Lesson {activeLesson.lessonNumber} Completed! 🎉
                    </h5>
                    <p className="text-xs text-emerald-300 font-medium">
                      +100 XP saved to your learning progress. Keep the streak going!
                    </p>
                  </div>
                </div>

                {activeLessonIdx < A1_COURSE_LESSONS.length - 1 && (
                  <button
                    onClick={handleNextLesson}
                    className="px-3.5 py-1.5 rounded-xl bg-white text-slate-900 font-bold text-xs hover:bg-slate-100 flex items-center gap-1 flex-shrink-0"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};
