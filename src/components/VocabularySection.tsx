import React, { useState, useEffect, useMemo, useRef } from 'react';
import { GermanLevel, Vocabulary, UserProfile, DailyGoal } from '../types';
import { learningDatabase } from '../services/learningDatabase';
import { authService } from '../services/authService';
import { usageService } from '../services/usageService';
import { membershipService } from '../services/membershipService';
import { speakGerman, stopGermanSpeech } from '../utils/audio';
import { VOCABULARY_CATEGORIES } from '../data/vocabularyData';
import { FeatureUsageIndicator } from './FeatureUsageIndicator';
import { backButtonManager } from '../utils/backButtonHandler';
import {
  Volume2,
  Check,
  RotateCw,
  Search,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Award,
  Sparkles,
  Flame,
  Target,
  RefreshCw,
  Eye,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  X,
  Filter
} from 'lucide-react';

interface VocabularySectionProps {
  user?: UserProfile | null;
  onUpgrade?: () => void;
}

export const VocabularySection: React.FC<VocabularySectionProps> = ({ user: initialUser, onUpgrade }) => {
  // Active User session state
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(
    initialUser || authService.getCurrentUser()
  );

  // Sync auth state if changed
  useEffect(() => {
    if (initialUser) {
      setCurrentUser(initialUser);
    }
    const unsub = authService.onAuthStateChange((u) => {
      setCurrentUser(u);
    });
    return () => unsub();
  }, [initialUser]);

  // View state: 'all' | 'review'
  const [activeTab, setActiveTab] = useState<'all' | 'review'>('all');

  // Filters & Search
  const [selectedLevel, setSelectedLevel] = useState<GermanLevel | 'All'>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Vocabulary Data
  const [allVocab, setAllVocab] = useState<Vocabulary[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Progress Tracking: Learned & Review IDs
  const [knownWordIds, setKnownWordIds] = useState<string[]>([]);
  const [reviewWordIds, setReviewWordIds] = useState<string[]>([]);
  const [dailyGoal, setDailyGoal] = useState<DailyGoal | null>(null);

  // Active Flashcard Index & Flip State
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);

  // XP celebration notification toast
  const [xpToast, setXpToast] = useState<{ show: boolean; text: string } | null>(null);

  // Daily Usage limit state & click guard
  const [dailyLimitReached, setDailyLimitReached] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const isMarkingRef = useRef<boolean>(false);

  // Check today's Vocabulary usage on mount and reactively subscribe to usage updates
  useEffect(() => {
    let isMounted = true;

    const checkLimitStatus = async () => {
      const isPremium = membershipService.isPremiumUser(currentUser);
      if (isPremium) {
        if (isMounted) setDailyLimitReached(false);
        return;
      }
      const todayUsage = await usageService.getTodayUsage(currentUser);
      const count = usageService.getUsageForFeature('vocabulary', todayUsage);
      if (isMounted) {
        setDailyLimitReached(count >= 20);
      }
    };

    checkLimitStatus();

    const unsubscribe = usageService.onDailyUsageChange((usage) => {
      if (!isMounted) return;
      const isPremium = membershipService.isPremiumUser(currentUser);
      if (isPremium) {
        setDailyLimitReached(false);
      } else {
        const count = usageService.getUsageForFeature('vocabulary', usage);
        setDailyLimitReached(count >= 20);
      }
    });

    const handleCustomUsageEvent = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (isMounted && customEvent.detail) {
        const isPremium = membershipService.isPremiumUser(currentUser);
        if (isPremium) {
          setDailyLimitReached(false);
        } else {
          const count = usageService.getUsageForFeature('vocabulary', customEvent.detail);
          setDailyLimitReached(count >= 20);
        }
      }
    };

    window.addEventListener('germanteacher-usage-updated', handleCustomUsageEvent);

    return () => {
      isMounted = false;
      unsubscribe();
      window.removeEventListener('germanteacher-usage-updated', handleCustomUsageEvent);
    };
  }, [currentUser]);

  const userId = currentUser?.id || currentUser?.email || 'guest_user';

  // Handle hardware back button inside VocabularySection
  useEffect(() => {
    if (isFlipped) {
      return backButtonManager.register('vocab-flipped', 80, () => {
        setIsFlipped(false);
        return true;
      });
    }
  }, [isFlipped]);

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      return backButtonManager.register('vocab-search', 70, () => {
        setSearchQuery('');
        return true;
      });
    }
  }, [searchQuery]);

  useEffect(() => {
    if (activeTab === 'review') {
      return backButtonManager.register('vocab-tab-review', 60, () => {
        setActiveTab('all');
        return true;
      });
    }
  }, [activeTab]);

  // 1. Initial Load of Vocabulary and User Progress
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      setLoading(true);
      try {
        const [vocabList, progress, goal] = await Promise.all([
          learningDatabase.getVocabulary(),
          learningDatabase.getUserVocabProgress(userId),
          learningDatabase.getDailyGoal(userId)
        ]);

        if (isMounted) {
          setAllVocab(vocabList);
          setKnownWordIds(progress.knownWordIds);
          setReviewWordIds(progress.reviewWordIds);
          setDailyGoal(goal);
          setLoading(false);
        }
      } catch (err) {
        console.error('Failed to load vocabulary system:', err);
        if (isMounted) setLoading(false);
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, [userId]);

  // 2. Filtered Vocabulary List
  const filteredVocab = useMemo(() => {
    return allVocab.filter((item) => {
      // If in review tab, only show words marked for practice again
      if (activeTab === 'review') {
        if (!reviewWordIds.includes(item.vocabularyId)) return false;
      }

      // Level filter
      if (selectedLevel !== 'All' && item.germanLevel !== selectedLevel) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }

      // Search query filter (matches German word or English meaning)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesGerman = item.germanWord.toLowerCase().includes(q);
        const matchesEnglish = item.englishMeaning.toLowerCase().includes(q);
        const matchesExample = item.exampleSentence?.toLowerCase().includes(q);
        if (!matchesGerman && !matchesEnglish && !matchesExample) {
          return false;
        }
      }

      return true;
    });
  }, [allVocab, activeTab, reviewWordIds, selectedLevel, selectedCategory, searchQuery]);

  // Reset card index & flip state when filters or tab change
  useEffect(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [activeTab, selectedLevel, selectedCategory, searchQuery]);

  // Safe current card
  const safeIndex = Math.min(currentIndex, Math.max(0, filteredVocab.length - 1));
  const currentCard: Vocabulary | undefined = filteredVocab[safeIndex];

  // Knowledge status of the current active card
  const isCardKnown = currentCard ? knownWordIds.includes(currentCard.vocabularyId) : false;
  const isCardInReview = currentCard ? reviewWordIds.includes(currentCard.vocabularyId) : false;

  // 3. User Progress Statistics
  const totalVocabCount = allVocab.length;
  const wordsLearnedCount = knownWordIds.length;
  const wordsRemainingCount = Math.max(0, totalVocabCount - wordsLearnedCount);
  const learningPercentage = totalVocabCount > 0 
    ? Math.round((wordsLearnedCount / totalVocabCount) * 100) 
    : 0;

  const dailyTarget = dailyGoal?.dailyTarget || 10;
  const dailyCompleted = dailyGoal?.completedAmount || 0;
  const dailyPercent = Math.min(100, Math.round((dailyCompleted / dailyTarget) * 100));

  // Cleanup speech on unmount
  useEffect(() => {
    return () => {
      stopGermanSpeech();
    };
  }, []);

  // Audio Pronunciation Handler
  const handlePronounce = async (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    if (playingAudio === text) {
      await stopGermanSpeech();
      setPlayingAudio(null);
      return;
    }
    setPlayingAudio(text);
    try {
      await speakGerman(text);
    } finally {
      setPlayingAudio(null);
    }
  };

  // Learning Action: "I know this"
  const handleKnowThis = async (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!currentCard || isMarkingRef.current) return;

    const vocabId = currentCard.vocabularyId;
    const isAlreadyKnown = knownWordIds.includes(vocabId);
    const isPremium = membershipService.isPremiumUser(currentUser);

    // 1. Before marking a NEW vocabulary word as learned, check membership & usage
    if (!isPremium && !isAlreadyKnown) {
      const todayUsage = await usageService.getTodayUsage(currentUser);
      const count = usageService.getUsageForFeature('vocabulary', todayUsage);
      if (count >= 20) {
        setDailyLimitReached(true);
        setXpToast({
          show: true,
          text: "You've reached your 20 free vocabulary words for today. Limit resets tomorrow."
        });
        setTimeout(() => setXpToast(null), 4000);
        return;
      }
    }

    isMarkingRef.current = true;
    setIsProcessing(true);

    try {
      const result = await learningDatabase.markWordKnown(userId, vocabId);

      // Update local state sets
      setKnownWordIds((prev) => Array.from(new Set([...prev, vocabId])));
      setReviewWordIds((prev) => prev.filter((id) => id !== vocabId));

      if (result.isNewWord) {
        // Awarded +5 XP notification
        setXpToast({ show: true, text: '+5 XP! Word Mastered' });
        setTimeout(() => setXpToast(null), 3200);

        // Increment daily goal completed amount locally
        setDailyGoal((prev) => prev ? { ...prev, completedAmount: prev.completedAmount + 1 } : null);

        // Usage increments ONLY when result.isNewWord is true and save succeeded
        try {
          const updated = await usageService.incrementUsage('vocabulary', currentUser);
          if (!membershipService.isPremiumUser(currentUser) && (updated.vocabularyWords || 0) >= 20) {
            setDailyLimitReached(true);
          }
        } catch (err) {
          console.warn('Silent usage tracking update:', err);
        }
      }

      // Advance to next card smoothly
      if (filteredVocab.length > 1) {
        setIsFlipped(false);
        if (activeTab === 'review') {
          // If reviewing, removing it will shrink the array, so safeIndex handles it
        } else {
          setCurrentIndex((prev) => (prev + 1) % filteredVocab.length);
        }
      }
    } catch (err) {
      console.error('Failed to mark word as known:', err);
      // If saving/marking the word fails, usage must NOT increment
    } finally {
      isMarkingRef.current = false;
      setIsProcessing(false);
    }
  };

  // Learning Action: "Practice again"
  const handlePracticeAgain = async (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!currentCard) return;

    const vocabId = currentCard.vocabularyId;
    await learningDatabase.markWordReview(userId, vocabId);

    // Update local state sets
    setReviewWordIds((prev) => Array.from(new Set([...prev, vocabId])));
    setKnownWordIds((prev) => prev.filter((id) => id !== vocabId));

    // Advance to next card
    if (filteredVocab.length > 1) {
      setIsFlipped(false);
      setCurrentIndex((prev) => (prev + 1) % filteredVocab.length);
    }
  };

  // Navigation handlers
  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (filteredVocab.length === 0) return;
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % filteredVocab.length);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (filteredVocab.length === 0) return;
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + filteredVocab.length) % filteredVocab.length);
  };

  // Article color styling helper
  const getArticleStyle = (article?: string) => {
    if (article === 'der') return 'bg-blue-100 text-blue-800 border-blue-300';
    if (article === 'die') return 'bg-red-100 text-red-800 border-red-300';
    if (article === 'das') return 'bg-emerald-100 text-emerald-800 border-emerald-300';
    return 'bg-slate-100 text-slate-700 border-slate-200';
  };

  return (
    <section id="vocabulary-learning-system" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Floating XP Toast Notification */}
        {xpToast?.show && (
          <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
            <div className="bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-amber-400/40 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center font-black">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  {xpToast.text.includes('reached') ? 'Daily Limit Notice' : 'Progress Saved'}
                </p>
                <p className="text-sm font-extrabold text-white">{xpToast.text}</p>
              </div>
            </div>
          </div>
        )}

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-bold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Interactive Vocabulary Learning System</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Outfit'] tracking-tight">
            Master German Vocabulary & Articles
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Practice German nouns with their essential grammatical genders (<span className="font-bold text-blue-600">der</span>, <span className="font-bold text-red-600">die</span>, <span className="font-bold text-emerald-600">das</span>), natural pronunciation, and practical real-life examples across 13 everyday categories.
          </p>

          {/* Feature Usage Indicator */}
          <div className="mt-4 flex justify-center">
            <FeatureUsageIndicator
              feature="vocabulary"
              user={currentUser}
              onUpgrade={onUpgrade}
              theme="light"
            />
          </div>
        </div>

        {/* ======================================================== */}
        {/* 7. USER PROGRESS DASHBOARD */}
        {/* ======================================================== */}
        <div id="vocabulary-progress-dashboard" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <span>Personal Learning Progress</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span className="text-emerald-600 font-semibold">Active Session</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit'] mt-1">
                {currentUser?.name ? `${currentUser.name}'s Vocab Mastery` : 'Your Vocabulary Progress'}
              </h3>
            </div>

            {/* Daily Goal Quick Tracker */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 w-full sm:w-auto sm:min-w-[240px] max-w-full">
              <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-2">
                <span className="flex items-center gap-1.5">
                  <Target className="w-4 h-4 text-red-600" />
                  Daily Goal: {dailyTarget} Words
                </span>
                <span className="text-slate-900 font-extrabold">
                  {dailyCompleted} / {dailyTarget} ({dailyPercent}%)
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-red-600 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${dailyPercent}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
            <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-100">
              <div className="text-xs font-bold text-slate-500 mb-1">Words Learned</div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-600 font-['Outfit'] flex items-baseline gap-1">
                {wordsLearnedCount}
                <span className="text-xs font-medium text-slate-400">words</span>
              </div>
              <div className="text-[11px] text-emerald-700 font-semibold mt-1 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>+5 XP per word</span>
              </div>
            </div>

            <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-100">
              <div className="text-xs font-bold text-slate-500 mb-1">Words Remaining</div>
              <div className="text-2xl sm:text-3xl font-black text-slate-800 font-['Outfit'] flex items-baseline gap-1">
                {wordsRemainingCount}
                <span className="text-xs font-medium text-slate-400">to learn</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-1">Ready for study</div>
            </div>

            <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-100">
              <div className="text-xs font-bold text-slate-500 mb-1">Learning Percentage</div>
              <div className="text-2xl sm:text-3xl font-black text-blue-600 font-['Outfit'] flex items-baseline gap-1">
                {learningPercentage}%
              </div>
              <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2 overflow-hidden">
                <div
                  className="bg-blue-600 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${learningPercentage}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-100">
              <div className="text-xs font-bold text-slate-500 mb-1">Total Vocabulary</div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 font-['Outfit'] flex items-baseline gap-1">
                {totalVocabCount}
                <span className="text-xs font-medium text-slate-400">in bank</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-1">Across 13 categories</div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* TABS: ALL WORDS VS REVIEW WORDS */}
        {/* ======================================================== */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 p-1.5 bg-slate-200/80 rounded-2xl">
            <button
              id="vocab-tab-all"
              onClick={() => setActiveTab('all')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === 'all'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>All Vocabulary</span>
              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
                {allVocab.length}
              </span>
            </button>

            <button
              id="vocab-tab-review"
              onClick={() => setActiveTab('review')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === 'review'
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <RefreshCw className="w-4 h-4" />
              <span>Review Words</span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                activeTab === 'review' ? 'bg-amber-600 text-white' : 'bg-amber-100 text-amber-800'
              }`}>
                {reviewWordIds.length}
              </span>
            </button>
          </div>

          {/* Fast search input (German or English) */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="vocab-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search German or English..."
              className="w-full pl-9 pr-8 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* ======================================================== */}
        {/* 6. FILTERS: LEVEL & 13 CATEGORIES */}
        {/* ======================================================== */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm mb-8 space-y-3">
          {/* Level Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar w-full max-w-full">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1 whitespace-nowrap flex items-center gap-1">
              <Filter className="w-3 h-3" /> Level:
            </span>
            {(['All', 'A1', 'A2', 'B1', 'B2'] as const).map((lvl) => (
              <button
                key={lvl}
                id={`filter-level-${lvl}`}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                  selectedLevel === lvl
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {lvl === 'All' ? 'All Levels' : `Level ${lvl}`}
              </button>
            ))}
          </div>

          {/* 13 Vocabulary Categories Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar border-t border-slate-100 pt-3 w-full max-w-full">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1 whitespace-nowrap">
              Category:
            </span>
            <button
              id="filter-cat-all"
              onClick={() => setSelectedCategory('All')}
              className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === 'All'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              All Categories
            </button>
            {VOCABULARY_CATEGORIES.map((cat) => (
              <button
                key={cat}
                id={`filter-cat-${cat.replace(/\s+/g, '-').toLowerCase()}`}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ======================================================== */}
        {/* 2 & 4. FLASHCARD DISPLAY & LEARNING CONTAINER */}
        {/* ======================================================== */}
        <div className="max-w-2xl mx-auto">
          {loading ? (
            <div className="py-24 text-center text-slate-400 bg-white rounded-3xl border border-slate-200">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto text-red-500 mb-2" />
              <p className="text-sm font-semibold">Loading vocabulary words...</p>
            </div>
          ) : filteredVocab.length === 0 ? (
            <div className="py-16 text-center bg-white rounded-3xl border border-slate-200 p-8 space-y-4 shadow-sm">
              <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <BookOpen className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-800">No words found</h4>
                <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
                  {activeTab === 'review'
                    ? 'You currently have no words in your Review list. When studying, mark tricky words with "Practice again" to review them here.'
                    : 'No vocabulary matches your search or selected filters. Try choosing a different category or clearing the search.'}
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedLevel('All');
                  setSelectedCategory('All');
                  setSearchQuery('');
                  setActiveTab('all');
                }}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Progress counter pill */}
              <div className="flex items-center justify-between px-2">
                <div className="text-xs font-bold text-slate-500 flex items-center gap-2">
                  <span>Card {safeIndex + 1} of {filteredVocab.length}</span>
                  {isCardKnown && (
                    <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1">
                      <Check className="w-3 h-3" /> Mastered
                    </span>
                  )}
                  {isCardInReview && (
                    <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[10px] font-bold flex items-center gap-1">
                      <RefreshCw className="w-3 h-3" /> In Review
                    </span>
                  )}
                </div>

                <div className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                  <RotateCw className="w-3.5 h-3.5 text-slate-400" />
                  <span>Tap card or button to flip</span>
                </div>
              </div>

              {/* Friendly Daily Limit Reached Banner */}
              {dailyLimitReached && !membershipService.isPremiumUser(currentUser) && (
                <div
                  id="vocabulary-limit-banner"
                  className="p-4 sm:p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm animate-in fade-in"
                >
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-amber-950 text-sm sm:text-base">
                        You&apos;ve reached your 20 free vocabulary words for today.
                      </h4>
                      <p className="text-amber-800 text-xs sm:text-sm mt-1 leading-relaxed">
                        Your 20 free vocabulary words reset tomorrow. You can still review known words, listen to pronunciation, and flip flashcards. Upgrade to German Master Premium for unlimited vocabulary words.
                      </p>
                    </div>
                  </div>
                  {onUpgrade && (
                    <button
                      type="button"
                      id="vocabulary-upgrade-btn"
                      onClick={onUpgrade}
                      className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs inline-flex items-center gap-1.5 transition-all shadow-xs flex-shrink-0 active:scale-95"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Upgrade to Premium</span>
                    </button>
                  )}
                </div>
              )}

              {/* ACTIVE FLASHCARD CARD */}
              <div
                id="active-vocabulary-flashcard"
                onClick={() => setIsFlipped(!isFlipped)}
                className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl min-h-[400px] flex flex-col justify-between cursor-pointer relative group transition-all duration-300 hover:shadow-2xl hover:border-slate-300"
              >
                {/* Card Top: Article Badge + Category + Pronunciation button */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex flex-wrap items-center gap-2">
                    {currentCard?.article && (
                      <span className={`px-3 py-1 rounded-xl text-xs font-extrabold border ${getArticleStyle(currentCard.article)}`}>
                        {currentCard.article}
                      </span>
                    )}
                    <span className="px-2.5 py-1 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold">
                      {currentCard?.category}
                    </span>
                    <span className="text-[11px] font-bold text-slate-400">
                      Level {currentCard?.germanLevel}
                    </span>
                  </div>

                  {/* 🔊 Play German pronunciation button */}
                  <button
                    id="vocab-pronounce-btn"
                    onClick={(e) => handlePronounce(e, currentCard?.germanWord || '')}
                    disabled={playingAudio !== null}
                    className="p-2.5 rounded-2xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors flex items-center gap-1.5 text-xs font-bold"
                    title="Play German Pronunciation"
                  >
                    <Volume2 className={`w-4 h-4 ${playingAudio === currentCard?.germanWord ? 'animate-bounce text-red-700' : ''}`} />
                    <span className="hidden sm:inline">Pronounce</span>
                  </button>
                </div>

                {/* Card Main Body */}
                <div className="py-6 text-center">
                  {!isFlipped ? (
                    /* 4. FRONT OF CARD: German Word + Pronunciation phonetic */
                    <div className="space-y-4 animate-in fade-in duration-200">
                      <div className="space-y-2">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                          German Word
                        </span>
                        <h3 className="text-3xl sm:text-4xl font-black text-slate-900 font-['Outfit'] tracking-tight">
                          {currentCard?.germanWord}
                        </h3>
                        {currentCard?.plural && (
                          <p className="text-xs text-slate-500 font-semibold">
                            Plural: <span className="font-bold text-slate-700">{currentCard.plural}</span>
                          </p>
                        )}
                      </div>

                      {/* Phonetic Pronunciation Guide */}
                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-mono font-medium border border-slate-200">
                        <span>/{currentCard?.pronunciation}/</span>
                      </div>

                      {/* Reveal Hint Button */}
                      <div className="pt-6">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 text-slate-600 border border-slate-200 text-xs font-bold hover:bg-slate-100 transition-colors">
                          <Eye className="w-3.5 h-3.5 text-red-600" />
                          Reveal English Meaning & Example
                        </span>
                      </div>
                    </div>
                  ) : (
                    /* 4. BACK OF CARD: English Meaning + Example Sentence + Translation */
                    <div className="space-y-5 animate-in fade-in duration-200 text-left">
                      <div className="text-center pb-2 border-b border-slate-100">
                        <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider">
                          English Meaning
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit'] mt-1">
                          {currentCard?.englishMeaning}
                        </h3>
                      </div>

                      {/* Example Sentence in German */}
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                            Example Sentence (Beispielsatz):
                          </span>
                          <button
                            onClick={(e) => handlePronounce(e, currentCard?.exampleSentence || '')}
                            className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-600"
                            title="Listen to example sentence"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                          {currentCard?.exampleSentence}
                        </p>
                        {currentCard?.exampleTranslation && (
                          <p className="text-xs sm:text-sm text-slate-600 italic pt-1 border-t border-slate-200/60">
                            "{currentCard.exampleTranslation}"
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. LEARNING ACTIONS FOOTER */}
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  
                  {/* Action Buttons: Practice again vs I know this */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      id="action-practice-again-btn"
                      onClick={handlePracticeAgain}
                      className="px-4 py-3 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                    >
                      <RefreshCw className="w-4 h-4 text-amber-600" />
                      <span>Practice again</span>
                    </button>

                    <button
                      id="action-know-this-btn"
                      onClick={handleKnowThis}
                      disabled={isProcessing || (dailyLimitReached && !membershipService.isPremiumUser(currentUser) && !isCardKnown)}
                      title={
                        dailyLimitReached && !membershipService.isPremiumUser(currentUser) && !isCardKnown
                          ? "You've reached your 20 free vocabulary words for today. Resets tomorrow."
                          : undefined
                      }
                      className={`px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
                        dailyLimitReached && !membershipService.isPremiumUser(currentUser) && !isCardKnown
                          ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                          : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-lg'
                      }`}
                    >
                      <Check className="w-4 h-4" />
                      <span>
                        {dailyLimitReached && !membershipService.isPremiumUser(currentUser) && !isCardKnown
                          ? 'Daily limit reached (20/20)'
                          : isCardKnown
                          ? 'Mastered (Already known)'
                          : 'I know this (+5 XP)'}
                      </span>
                    </button>
                  </div>

                  {/* Previous / Next navigation buttons */}
                  <div className="flex items-center justify-between pt-1 text-xs">
                    <button
                      id="vocab-prev-btn"
                      onClick={handlePrev}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center gap-1 transition-colors"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      <span>Previous word</span>
                    </button>

                    <span className="text-[11px] font-bold text-slate-400">
                      Word {safeIndex + 1} of {filteredVocab.length}
                    </span>

                    <button
                      id="vocab-next-btn"
                      onClick={handleNext}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold flex items-center gap-1 transition-colors"
                    >
                      <span>Next word</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>

              </div>

            </div>
          )}
        </div>

      </div>
    </section>
  );
};
