import React, { useState, useEffect } from 'react';
import { SPEAKING_DRILLS } from '../data/curriculumData';
import { speakGerman, stopGermanSpeech } from '../utils/audio';
import { GermanLevel, Quiz } from '../types';
import { learningDatabase } from '../services/learningDatabase';
import { authService } from '../services/authService';
import { backButtonManager } from '../utils/backButtonHandler';
import { 
  Sparkles, 
  HelpCircle, 
  Mic, 
  Volume2, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ArrowRight,
  Award,
  Layers,
  Flame
} from 'lucide-react';

export const PracticeSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'quiz' | 'speaking'>('quiz');
  
  // Database Quiz State
  const [selectedLevel, setSelectedLevel] = useState<GermanLevel>('A1');
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [activeQuizIndex, setActiveQuizIndex] = useState<number>(0);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [isSavingProgress, setIsSavingProgress] = useState(false);

  // Speaking drill state
  const [activeDrillId, setActiveDrillId] = useState('s1');
  const [playingPhrase, setPlayingPhrase] = useState<string | null>(null);
  const [speechRate, setSpeechRate] = useState<number>(0.85);

  const currentUser = authService.getCurrentUser();
  const userId = currentUser?.id || 'guest_learner';

  // Load quizzes from learning database
  useEffect(() => {
    let isMounted = true;
    async function loadQuizzes() {
      const data = await learningDatabase.getQuizzes(selectedLevel);
      if (isMounted) {
        setQuizzes(data);
        setActiveQuizIndex(0);
        setCurrentQuestionIdx(0);
        setSelectedOption(null);
        setShowExplanation(false);
        setScore(0);
        setQuizFinished(false);
      }
    }
    loadQuizzes();
    return () => { isMounted = false; };
  }, [selectedLevel]);

  // Handle hardware back button inside PracticeSection (quiz finished or previous question)
  useEffect(() => {
    if (quizFinished) {
      return backButtonManager.register('practice-quiz-finished', 70, () => {
        handleRestartQuiz();
        return true;
      });
    }
  }, [quizFinished]);

  useEffect(() => {
    if (currentQuestionIdx > 0 && !quizFinished) {
      return backButtonManager.register('practice-question-back', 65, () => {
        setCurrentQuestionIdx((prev) => prev - 1);
        setSelectedOption(null);
        setShowExplanation(false);
        return true;
      });
    }
  }, [currentQuestionIdx, quizFinished]);

  const activeQuiz = quizzes[activeQuizIndex] || quizzes[0];
  const currentQuestion = activeQuiz?.questions?.[currentQuestionIdx];
  const activeDrill = SPEAKING_DRILLS.find((d) => d.id === activeDrillId) || SPEAKING_DRILLS[0];

  const handleSelectOption = (idx: number) => {
    if (showExplanation || !currentQuestion) return;
    setSelectedOption(idx);
    setShowExplanation(true);
    if (idx === currentQuestion.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = async () => {
    if (!activeQuiz) return;
    if (currentQuestionIdx < activeQuiz.questions.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setQuizFinished(true);
      // Persist User Progress to Learning Database
      setIsSavingProgress(true);
      try {
        const totalQ = activeQuiz.questions.length || 1;
        const percentage = Math.round((score / totalQ) * 100);
        const xpEarned = score * 25;

        await learningDatabase.saveUserProgress({
          userId,
          lessonId: activeQuiz.quizId,
          completionStatus: 'completed',
          quizScore: percentage,
          vocabularyLearned: 5,
          xpEarned,
          lastActivity: new Date().toISOString()
        });

        // Update daily goal
        const todayGoal = await learningDatabase.getDailyGoal(userId);
        await learningDatabase.updateDailyGoal(userId, todayGoal.completedAmount + 1, todayGoal.dailyTarget);
      } catch (err) {
        console.error('Error saving quiz progress:', err);
      } finally {
        setIsSavingProgress(false);
      }
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setScore(0);
    setQuizFinished(false);
  };

  const handleSpeak = async (text: string) => {
    if (playingPhrase === text) {
      await stopGermanSpeech();
      setPlayingPhrase(null);
      return;
    }
    setPlayingPhrase(text);
    try {
      await speakGerman(text, speechRate);
    } finally {
      setPlayingPhrase(null);
    }
  };

  return (
    <section id="practice-section" className="py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Learning Database Quizzes & Speaking Workshop</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Outfit'] tracking-tight">
            Reinforce What You Learned
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Test your knowledge with level-aligned quizzes from A1 to B2, or tune your ear and mouth with guided German pronunciation drills.
          </p>
        </div>

        {/* Tab Switcher: Quizzes vs Speaking */}
        <div className="flex justify-center mb-8 px-2">
          <div className="p-1.5 bg-slate-200 rounded-2xl inline-flex max-w-full gap-1">
            <button
              onClick={() => setActiveTab('quiz')}
              className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-6 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all whitespace-nowrap ${
                activeTab === 'quiz'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              <HelpCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>Quizzes & Exercises</span>
            </button>
            <button
              onClick={() => setActiveTab('speaking')}
              className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-6 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all whitespace-nowrap ${
                activeTab === 'speaking'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              <Mic className="w-4 h-4 text-red-600 shrink-0" />
              <span>Speaking Workshop</span>
            </button>
          </div>
        </div>

        {/* Level Selector for Quizzes */}
        {activeTab === 'quiz' && (
          <div className="flex justify-center gap-2 mb-8">
            {(['A1', 'A2', 'B1', 'B2'] as GermanLevel[]).map((lvl) => (
              <button
                key={lvl}
                id={`quiz-level-${lvl}`}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedLevel === lvl
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                Level {lvl} Quizzes
              </button>
            ))}
          </div>
        )}

        {/* QUIZ INTERACTIVE CARD */}
        {activeTab === 'quiz' && (
          <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md">
            {!quizFinished && currentQuestion ? (
              <div className="space-y-6">
                
                {/* Quiz Meta & Progress Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                    <span className="px-2.5 py-1 rounded-lg bg-red-50 text-red-700 font-extrabold">
                      {activeQuiz?.germanLevel} · {activeQuiz?.category}
                    </span>
                    <span>
                      Question {currentQuestionIdx + 1} of {activeQuiz?.questions?.length || 1}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-red-600 h-full transition-all duration-300"
                      style={{ 
                        width: `${(((currentQuestionIdx + 1) / (activeQuiz?.questions?.length || 1)) * 100)}%` 
                      }}
                    />
                  </div>
                </div>

                {/* Prompt */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit']">
                    {currentQuestion.question || currentQuestion.prompt}
                  </h3>
                  {currentQuestion.prompt && currentQuestion.prompt !== currentQuestion.question && (
                    <div className="mt-2 p-3 bg-slate-50 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 flex items-center justify-between">
                      <span>{currentQuestion.prompt}</span>
                      <button
                        onClick={() => handleSpeak(currentQuestion.prompt || '')}
                        className="p-1 rounded bg-white hover:bg-slate-200 text-slate-600"
                        title="Pronounce"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Options */}
                <div className="space-y-3">
                  {currentQuestion.options.map((option, idx) => {
                    const isCorrect = idx === currentQuestion.correctIndex;
                    const isSelected = selectedOption === idx;
                    
                    let btnStyle = 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800';
                    if (showExplanation) {
                      if (isCorrect) {
                        btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-500/20';
                      } else if (isSelected) {
                        btnStyle = 'bg-red-50 border-red-500 text-red-950 ring-2 ring-red-500/20';
                      } else {
                        btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        id={`quiz-option-${idx}`}
                        disabled={showExplanation}
                        onClick={() => handleSelectOption(idx)}
                        className={`w-full p-4 rounded-2xl border text-left font-bold text-sm sm:text-base transition-all flex items-center justify-between ${btnStyle}`}
                      >
                        <span>{option}</span>
                        {showExplanation && (
                          isCorrect ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                          ) : isSelected ? (
                            <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                          ) : null
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation Banner */}
                {showExplanation && (
                  <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2 animate-in fade-in duration-200">
                    <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                      Pedagogical Explanation:
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      {currentQuestion.explanation}
                    </p>
                  </div>
                )}

                {/* Next Button */}
                {showExplanation && (
                  <button
                    id="quiz-next-question-btn"
                    onClick={handleNextQuestion}
                    className="w-full py-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <span>
                      {currentQuestionIdx < (activeQuiz?.questions?.length || 1) - 1
                        ? 'Next Question'
                        : 'Finish Quiz & Save Progress'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}

              </div>
            ) : quizFinished ? (
              /* Quiz Finished Summary */
              <div className="text-center py-6 space-y-6">
                <div className="w-20 h-20 rounded-3xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-inner">
                  <Award className="w-10 h-10" />
                </div>
                
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-['Outfit']">
                    Quiz Completed!
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    You scored <strong className="text-slate-900">{score}</strong> out of{' '}
                    <strong className="text-slate-900">{activeQuiz?.questions?.length || 1}</strong> on Level {selectedLevel}!
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                    <div className="text-2xl font-black text-emerald-700">
                      +{score * 25} XP
                    </div>
                    <div className="text-xs font-semibold text-emerald-800 mt-0.5">
                      Earned for Profile
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
                    <div className="text-2xl font-black text-amber-700">
                      {Math.round((score / (activeQuiz?.questions?.length || 1)) * 100)}%
                    </div>
                    <div className="text-xs font-semibold text-amber-800 mt-0.5">
                      Accuracy Recorded
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={handleRestartQuiz}
                    className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Try Again</span>
                  </button>
                  <button
                    onClick={() => {
                      const nextLvl: GermanLevel = selectedLevel === 'A1' ? 'A2' : selectedLevel === 'A2' ? 'B1' : 'B2';
                      setSelectedLevel(nextLvl);
                    }}
                    className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-2"
                  >
                    <span>Practice Next Level</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-slate-400 text-sm">No quiz questions loaded.</div>
            )}
          </div>
        )}

        {/* SPEAKING WORKSHOP CARD */}
        {activeTab === 'speaking' && (
          <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md space-y-8">
            
            {/* Drill Category Tabs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {SPEAKING_DRILLS.map((drill) => (
                <button
                  key={drill.id}
                  onClick={() => setActiveDrillId(drill.id)}
                  className={`p-4 rounded-2xl text-left border transition-all ${
                    activeDrillId === drill.id
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  <div className="text-xs font-bold uppercase tracking-wider opacity-70 mb-1">Drill {drill.id}</div>
                  <div className="font-bold text-xs sm:text-sm line-clamp-2">{drill.title}</div>
                </button>
              ))}
            </div>

            {/* Active Drill Content */}
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-amber-950">
                <h4 className="font-extrabold text-sm mb-1">{activeDrill.title}</h4>
                <p className="text-xs leading-relaxed text-amber-900">{activeDrill.description}</p>
              </div>

              {/* Speed Controller */}
              <div className="flex items-center justify-between px-2 text-xs font-bold text-slate-600">
                <span>Playback Speech Rate:</span>
                <div className="flex gap-2">
                  {[0.7, 0.85, 1.0].map((rate) => (
                    <button
                      key={rate}
                      onClick={() => setSpeechRate(rate)}
                      className={`px-3 py-1 rounded-lg border ${
                        speechRate === rate
                          ? 'bg-red-600 text-white border-red-600'
                          : 'bg-white text-slate-700 border-slate-200'
                      }`}
                    >
                      {rate === 0.7 ? 'Slow (0.7x)' : rate === 0.85 ? 'Standard (0.85x)' : 'Native (1.0x)'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Drill Phrases */}
              <div className="space-y-3">
                {activeDrill.phrases.map((phrase, idx) => {
                  const isPlaying = playingPhrase === phrase.text;
                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4"
                    >
                      <div>
                        <div className="text-base sm:text-lg font-black text-slate-900 font-['Outfit']">
                          {phrase.text}
                        </div>
                        <div className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
                          {phrase.translation}
                        </div>
                      </div>
                      <button
                        onClick={() => handleSpeak(phrase.text)}
                        className={`p-3 rounded-xl flex items-center gap-1.5 text-xs font-bold transition-all ${
                          isPlaying
                            ? 'bg-red-600 text-white'
                            : 'bg-white hover:bg-slate-200 text-slate-800 border border-slate-200 shadow-xs'
                        }`}
                      >
                        <Volume2 className="w-4 h-4" />
                        <span>{isPlaying ? 'Playing...' : 'Listen'}</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
