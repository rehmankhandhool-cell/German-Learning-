import React, { useState, useRef, useEffect } from 'react';
import { 
  Home, 
  Building2, 
  Stethoscope, 
  Briefcase, 
  ShoppingBag, 
  Train, 
  GraduationCap, 
  Utensils, 
  Send, 
  RotateCcw, 
  ChevronRight, 
  Sparkles, 
  MessageSquareText, 
  ArrowLeft,
  CheckCircle,
  HelpCircle,
  Clock,
  BookOpen,
  Volume2
} from 'lucide-react';
import { CONVERSATION_SCENARIOS } from '../data/conversationScenarios';
import { ConversationScenario, ConversationMessage, UserProfile } from '../types';
import { usageService } from '../services/usageService';
import { membershipService } from '../services/membershipService';
import { BrandLogo } from './BrandLogo';
import { FeatureUsageIndicator } from './FeatureUsageIndicator';
import { getApiUrl } from '../utils/apiConfig';
import { backButtonManager } from '../utils/backButtonHandler';
import { speakGerman, stopGermanSpeech } from '../utils/audio';

interface ConversationPracticeSectionProps {
  user?: UserProfile | null;
  onUpgrade?: () => void;
  onExploreOther?: () => void;
}

export const ConversationPracticeSection: React.FC<ConversationPracticeSectionProps> = ({
  user,
  onUpgrade
}) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('wohnung');
  const [isPracticing, setIsPracticing] = useState<boolean>(false);
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [responseIndex, setResponseIndex] = useState<number>(0);
  const [showEnglishHints, setShowEnglishHints] = useState<boolean>(true);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  // Daily Usage limit state & click lock
  const [dailyLimitReached, setDailyLimitReached] = useState<boolean>(false);
  const isStartingRef = useRef<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Cleanup speech on unmount
  useEffect(() => {
    return () => {
      stopGermanSpeech();
    };
  }, []);

  // Check today's Conversation Practice usage on mount and reactively subscribe to usage updates
  useEffect(() => {
    let isMounted = true;

    const checkLimitStatus = async () => {
      const isPremium = membershipService.isPremiumUser(user);
      if (isPremium) {
        if (isMounted) setDailyLimitReached(false);
        return;
      }
      const todayUsage = await usageService.getTodayUsage(user);
      const count = usageService.getUsageForFeature('conversation', todayUsage);
      if (isMounted) {
        setDailyLimitReached(count >= 3);
      }
    };

    checkLimitStatus();

    const unsubscribe = usageService.onDailyUsageChange((usage) => {
      if (!isMounted) return;
      const isPremium = membershipService.isPremiumUser(user);
      if (isPremium) {
        setDailyLimitReached(false);
      } else {
        const count = usageService.getUsageForFeature('conversation', usage);
        setDailyLimitReached(count >= 3);
      }
    });

    const handleCustomUsageEvent = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (isMounted && customEvent.detail) {
        const isPremium = membershipService.isPremiumUser(user);
        if (isPremium) {
          setDailyLimitReached(false);
        } else {
          const count = usageService.getUsageForFeature('conversation', customEvent.detail);
          setDailyLimitReached(count >= 3);
        }
      }
    };

    window.addEventListener('germanteacher-usage-updated', handleCustomUsageEvent);

    return () => {
      isMounted = false;
      unsubscribe();
      window.removeEventListener('germanteacher-usage-updated', handleCustomUsageEvent);
    };
  }, [user]);

  // Handle hardware back button when inside an active conversation session
  useEffect(() => {
    if (isPracticing) {
      return backButtonManager.register('conversation-practicing', 70, () => {
        setIsPracticing(false);
        return true;
      });
    }
  }, [isPracticing]);

  const selectedScenario = CONVERSATION_SCENARIOS.find(s => s.id === selectedScenarioId) || CONVERSATION_SCENARIOS[0];

  // Helper to map icon name to Lucide icon component
  const getScenarioIcon = (iconName: string, className = 'w-6 h-6') => {
    switch (iconName) {
      case 'Home': return <Home className={className} />;
      case 'Building2': return <Building2 className={className} />;
      case 'Stethoscope': return <Stethoscope className={className} />;
      case 'Briefcase': return <Briefcase className={className} />;
      case 'ShoppingBag': return <ShoppingBag className={className} />;
      case 'Train': return <Train className={className} />;
      case 'GraduationCap': return <GraduationCap className={className} />;
      case 'Utensils': return <Utensils className={className} />;
      default: return <MessageSquareText className={className} />;
    }
  };

  // Start practicing a selected scenario with real Gemini AI partner
  const handleStartPractice = async (scenario: ConversationScenario) => {
    if (isStartingRef.current) return;

    // 1. Membership plan & usage pre-check
    const isPremium = membershipService.isPremiumUser(user);
    if (!isPremium) {
      const todayUsage = await usageService.getTodayUsage(user);
      const count = usageService.getUsageForFeature('conversation', todayUsage);
      if (count >= 3) {
        setDailyLimitReached(true);
        return;
      }
    }

    isStartingRef.current = true;
    setSelectedScenarioId(scenario.id);
    setIsPracticing(true);
    setResponseIndex(0);
    setInputText('');
    setIsLoading(true);

    const fallbackMsg: ConversationMessage = {
      id: `msg-${Date.now()}-partner`,
      sender: 'partner',
      germanText: scenario.initialDialogue.partnerMessage,
      englishHint: scenario.initialDialogue.partnerEnglishHint,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([]);

    try {
      const response = await fetch(getApiUrl('/api/conversation-practice'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scenarioId: scenario.id,
          scenarioTitle: scenario.title,
          scenarioCategory: scenario.category,
          scenarioExplanation: scenario.explanation,
          partnerName: scenario.initialDialogue.partnerName,
          partnerRole: scenario.initialDialogue.partnerRole,
          action: 'start'
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const data = await response.json();
      const initialMsg: ConversationMessage = {
        id: `msg-${Date.now()}-partner`,
        sender: 'partner',
        germanText: data.germanText || scenario.initialDialogue.partnerMessage,
        englishHint: data.englishHint || scenario.initialDialogue.partnerEnglishHint,
        correction: data.correction || undefined,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([initialMsg]);

      // Increment usage when conversation practice session successfully starts
      try {
        const updated = await usageService.incrementUsage('conversation', user);
        if (!membershipService.isPremiumUser(user) && (updated.conversationSessions || 0) >= 3) {
          setDailyLimitReached(true);
        }
      } catch (err) {
        console.warn('Silent usage tracking update:', err);
      }
    } catch (_err) {
      setMessages([fallbackMsg]);
    } finally {
      setIsLoading(false);
      isStartingRef.current = false;
      setTimeout(() => {
        inputRef.current?.focus();
      }, 200);
    }
  };

  // Reset conversation and re-trigger greeting
  const handleResetConversation = () => {
    if (!selectedScenario) return;
    handleStartPractice(selectedScenario);
  };

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (isPracticing) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isPracticing]);

  // Handle message sending to real Gemini AI
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = inputText.trim();
    if (!trimmed || isLoading) return;

    const userMsg: ConversationMessage = {
      id: `msg-${Date.now()}-user`,
      sender: 'user',
      germanText: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch(getApiUrl('/api/conversation-practice'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scenarioId: selectedScenario.id,
          scenarioTitle: selectedScenario.title,
          scenarioCategory: selectedScenario.category,
          scenarioExplanation: selectedScenario.explanation,
          partnerName: selectedScenario.initialDialogue.partnerName,
          partnerRole: selectedScenario.initialDialogue.partnerRole,
          message: trimmed,
          history: updatedMessages.map(m => ({ sender: m.sender, text: m.germanText }))
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const data = await response.json();
      const partnerMsg: ConversationMessage = {
        id: `msg-${Date.now()}-partner`,
        sender: 'partner',
        germanText: data.germanText || 'Sehr gerne! Wie kann ich Ihnen noch helfen?',
        englishHint: data.englishHint || 'With pleasure! How else can I help you?',
        correction: data.correction || undefined,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, partnerMsg]);
    } catch (_err) {
      // Graceful conversational fallback
      const replies = selectedScenario.sampleResponses;
      const currentReply = replies[responseIndex % replies.length];
      setResponseIndex(prev => prev + 1);

      const fallbackPartnerMsg: ConversationMessage = {
        id: `msg-${Date.now()}-partner`,
        sender: 'partner',
        germanText: currentReply.partnerMessage,
        englishHint: currentReply.partnerEnglishHint,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, fallbackPartnerMsg]);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  // Insert a useful phrase into input
  const handleInsertPhrase = (phrase: string) => {
    setInputText(phrase);
    inputRef.current?.focus();
  };

  // Play German dialogue phrase or message audio
  const handlePlayGerman = async (id: string, text: string) => {
    if (playingAudioId === id) {
      await stopGermanSpeech();
      setPlayingAudioId(null);
      return;
    }
    setPlayingAudioId(id);
    try {
      await speakGerman(text);
    } finally {
      setPlayingAudioId(null);
    }
  };

  return (
    <section id="conversation-practice-section" className="py-10 sm:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Official Logo & Badges */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100 text-red-700 text-xs font-bold mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-red-600" />
            <span>Real-Life German Immersion</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-['Outfit']">
            Conversation Practice
          </h1>
          <p className="mt-3.5 text-base sm:text-lg text-slate-600 leading-relaxed">
            Practice authentic German dialogues for everyday life, official appointments, housing, healthcare, and career situations.
          </p>

          {/* Feature Usage Indicator */}
          <div className="mt-4 flex justify-center">
            <FeatureUsageIndicator
              feature="conversationPractice"
              user={user}
              onUpgrade={onUpgrade}
              theme="light"
            />
          </div>

          <div className="mt-4 flex items-center justify-center gap-4 text-xs font-semibold text-slate-500">
            <span className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-emerald-600" /> 8 Realistic Scenarios
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-emerald-600" /> Everyday German
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-emerald-600" /> Interactive Dialogues
            </span>
          </div>
        </div>

        {/* View Switch: Scenario Browser vs. Active Practice Screen */}
        {!isPracticing ? (
          /* ========================================================= */
          /* 1. SCENARIO SELECTOR & DETAILS VIEW                        */
          /* ========================================================= */
          <div className="space-y-8">
            
            {/* Scenarios Grid: 8 Selectable Cards */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-red-600" />
                  Select a Conversation Scenario
                </h2>
                <span className="text-xs text-slate-500 font-medium">
                  Click any card to review useful phrases and start
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {CONVERSATION_SCENARIOS.map((scenario) => {
                  const isSelected = scenario.id === selectedScenarioId;
                  return (
                    <div
                      key={scenario.id}
                      id={`scenario-card-${scenario.id}`}
                      onClick={() => setSelectedScenarioId(scenario.id)}
                      className={`cursor-pointer text-left p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                        isSelected
                          ? 'bg-white border-red-600 shadow-md ring-2 ring-red-500/20'
                          : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <div className={`p-2.5 rounded-xl ${
                            isSelected ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-700'
                          }`}>
                            {getScenarioIcon(scenario.iconName, 'w-5 h-5')}
                          </div>
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 uppercase tracking-wider">
                            {scenario.category}
                          </span>
                        </div>

                        <h3 className="font-bold text-slate-900 text-base group-hover:text-red-600 transition-colors">
                          {scenario.title}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                          {scenario.subtitle}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                        <span className={isSelected ? 'text-red-600' : 'text-slate-500'}>
                          {isSelected ? 'Selected' : 'Select'}
                        </span>
                        <ChevronRight className={`w-4 h-4 transition-transform ${
                          isSelected ? 'text-red-600 translate-x-1' : 'text-slate-400'
                        }`} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Friendly Daily Limit Reached Banner */}
            {dailyLimitReached && !membershipService.isPremiumUser(user) && (
              <div
                id="conversation-limit-banner"
                className="p-4 sm:p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm animate-in fade-in"
              >
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-amber-950 text-sm sm:text-base">
                      You&apos;ve reached your 3 free conversation sessions for today.
                    </h4>
                    <p className="text-amber-800 text-xs sm:text-sm mt-1 leading-relaxed">
                      Your 3 free conversation sessions reset tomorrow. You can still review useful phrases and explore scenario vocabulary. Upgrade to German Master Premium for unlimited conversation practice.
                    </p>
                  </div>
                </div>
                {onUpgrade && (
                  <button
                    type="button"
                    id="conversation-upgrade-btn"
                    onClick={onUpgrade}
                    className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs inline-flex items-center gap-1.5 transition-all shadow-xs flex-shrink-0 active:scale-95"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Upgrade to Premium</span>
                  </button>
                )}
              </div>
            )}

            {/* Selected Scenario Detail Panel */}
            {selectedScenario && (
              <div 
                id="selected-scenario-detail-panel"
                className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm transition-all animate-in fade-in duration-200"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-slate-200">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                        {selectedScenario.category}
                      </span>
                      <span className="text-xs font-medium text-slate-500">
                        Partner: <strong className="text-slate-800">{selectedScenario.initialDialogue.partnerName}</strong> ({selectedScenario.initialDialogue.partnerRole})
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit'] flex items-center gap-3">
                      {getScenarioIcon(selectedScenario.iconName, 'w-7 h-7 text-red-600')}
                      {selectedScenario.title}
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl">
                      {selectedScenario.explanation}
                    </p>
                  </div>

                  {/* Start Practice Primary Button */}
                  <div className="flex-shrink-0">
                    <button
                      id="start-practice-btn"
                      onClick={() => handleStartPractice(selectedScenario)}
                      disabled={dailyLimitReached && !membershipService.isPremiumUser(user)}
                      title={
                        dailyLimitReached && !membershipService.isPremiumUser(user)
                          ? "You've reached your 3 free conversation sessions for today. Resets tomorrow."
                          : undefined
                      }
                      className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm sm:text-base transition-all active:scale-[0.99] ${
                        dailyLimitReached && !membershipService.isPremiumUser(user)
                          ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                          : 'bg-red-600 hover:bg-red-700 text-white shadow-sm hover:shadow-md'
                      }`}
                    >
                      <MessageSquareText className="w-5 h-5" />
                      <span>
                        {dailyLimitReached && !membershipService.isPremiumUser(user)
                          ? 'Daily limit reached (3/3)'
                          : 'Start Practice'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Useful German Phrases Section */}
                <div className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      Useful German Phrases for this Scenario
                    </h4>
                    <span className="text-xs text-slate-500">
                      Essential vocabulary & questions
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedScenario.usefulPhrases.map((phrase, idx) => (
                      <div 
                        key={idx}
                        className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-slate-100/80 transition-colors flex items-start justify-between gap-2"
                      >
                        <div>
                          <div className="font-semibold text-slate-900 text-xs sm:text-sm">
                            {phrase.german}
                          </div>
                          <div className="text-xs text-slate-500 mt-1">
                            {phrase.english}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePlayGerman(`phrase_${idx}`, phrase.german);
                          }}
                          className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors flex-shrink-0"
                          title="Listen to German pronunciation"
                          aria-label="Listen to German pronunciation"
                        >
                          <Volume2
                            className={`w-3.5 h-3.5 ${
                              playingAudioId === `phrase_${idx}` ? 'text-red-600 animate-pulse' : ''
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

          </div>
        ) : (
          /* ========================================================= */
          /* 2. CONVERSATION PRACTICE CHAT INTERFACE                   */
          /* ========================================================= */
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col min-h-[600px] max-w-4xl mx-auto">
            
            {/* Top Practice Bar */}
            <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <button
                  id="conversation-back-button"
                  onClick={() => setIsPracticing(false)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-semibold"
                  title="Back to all scenarios"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Scenarios</span>
                </button>

                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-xs shadow-xs flex-shrink-0">
                    {getScenarioIcon(selectedScenario.iconName, 'w-5 h-5 text-white')}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white flex items-center gap-2">
                      <span>{selectedScenario.title}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-amber-300 font-semibold border border-slate-700">
                        {selectedScenario.category}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400">
                      Partner: {selectedScenario.initialDialogue.partnerName} ({selectedScenario.initialDialogue.partnerRole})
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Hints Toggle & Restart */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowEnglishHints(!showEnglishHints)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors flex items-center gap-1 ${
                    showEnglishHints 
                      ? 'bg-amber-400/20 text-amber-300 border-amber-400/30' 
                      : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                  }`}
                  title="Toggle English helper translations"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">English Hints</span>
                </button>

                <button
                  id="restart-conversation-button"
                  onClick={handleResetConversation}
                  className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors flex items-center gap-1.5 text-xs font-semibold"
                  title="Restart this dialogue"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Restart</span>
                </button>
              </div>
            </div>

            {/* Quick Useful Phrases Drawer / Suggestion Chips */}
            <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 overflow-x-auto w-full max-w-full">
              <div className="flex items-center gap-2 text-xs w-max max-w-none">
                <span className="text-slate-500 font-bold flex items-center gap-1 pl-1 shrink-0">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Suggested Phrases:
                </span>
                {selectedScenario.usefulPhrases.slice(0, 3).map((phrase, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleInsertPhrase(phrase.german)}
                    className="px-2.5 py-1 rounded-lg bg-white border border-slate-300 hover:border-red-500 hover:bg-red-50/50 text-slate-700 hover:text-red-700 transition-colors text-left shrink-0"
                    title={phrase.english}
                  >
                    &ldquo;{phrase.german.slice(0, 32)}...&rdquo;
                  </button>
                ))}
              </div>
            </div>

            {/* Message Area & Conversation History */}
            <div 
              id="conversation-history-container"
              className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 max-h-[460px] min-h-[320px] bg-white"
            >
              {messages.map((msg) => {
                const isUser = msg.sender === 'user';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-end gap-2 max-w-[85%] sm:max-w-[75%]">
                      {!isUser && (
                        <div className="w-8 h-8 rounded-full bg-slate-900 text-amber-300 flex items-center justify-center text-xs font-bold flex-shrink-0 shadow-xs">
                          {selectedScenario.initialDialogue.partnerName.slice(0, 2)}
                        </div>
                      )}

                      <div
                        className={`p-4 rounded-2xl shadow-xs text-sm ${
                          isUser
                            ? 'bg-red-600 text-white rounded-br-none'
                            : 'bg-slate-100 text-slate-900 border border-slate-200 rounded-bl-none'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="font-medium leading-relaxed break-words">
                            {msg.germanText}
                          </div>
                          {!isUser && (
                            <button
                              type="button"
                              onClick={() => handlePlayGerman(msg.id, msg.germanText)}
                              className="p-1 rounded-lg hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors flex-shrink-0 mt-0.5"
                              title="Listen to German pronunciation"
                              aria-label="Listen to German pronunciation"
                            >
                              <Volume2
                                className={`w-3.5 h-3.5 ${
                                  playingAudioId === msg.id ? 'text-red-600 animate-pulse' : ''
                                }`}
                              />
                            </button>
                          )}
                        </div>

                        {/* Gentle German Correction or Tip */}
                        {!isUser && msg.correction && (
                          <div className="mt-2.5 pt-2 border-t border-slate-200 text-xs text-amber-900 bg-amber-50/80 p-2.5 rounded-xl flex items-start gap-1.5 font-normal">
                            <span className="font-bold flex-shrink-0 text-amber-700">💡 Feedback:</span>
                            <span>{msg.correction}</span>
                          </div>
                        )}

                        {/* English Hint / Translation */}
                        {!isUser && msg.englishHint && showEnglishHints && (
                          <div className="mt-2 pt-2 border-t border-slate-200 text-xs text-slate-500 italic">
                            💡 {msg.englishHint}
                          </div>
                        )}

                        <div className={`text-[10px] mt-1 text-right ${
                          isUser ? 'text-red-200' : 'text-slate-400'
                        }`}>
                          {msg.timestamp}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Loading indicator when partner is typing */}
              {isLoading && (
                <div className="flex items-end gap-2">
                  <div className="w-8 h-8 rounded-full bg-slate-900 text-amber-300 flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {selectedScenario.initialDialogue.partnerName.slice(0, 2)}
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-100 border border-slate-200 rounded-bl-none flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]" />
                    <span className="text-xs text-slate-500 ml-1.5">
                      {selectedScenario.initialDialogue.partnerName} tippt...
                    </span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* User Response Input & Send Form */}
            <form 
              onSubmit={handleSendMessage}
              className="p-3 sm:p-4 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] bg-slate-50 border-t border-slate-200 flex items-center gap-2.5"
            >
              <input
                ref={inputRef}
                type="text"
                id="conversation-user-input"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Schreibe deine Antwort auf Deutsch (z. B. Guten Tag...)"
                disabled={isLoading}
                className="flex-1 min-w-0 px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 bg-white text-sm text-slate-900 placeholder:text-slate-400"
              />

              <button
                type="submit"
                id="conversation-send-button"
                disabled={!inputText.trim() || isLoading}
                className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-40 disabled:hover:bg-red-600 text-white font-bold text-sm flex items-center gap-2 transition-all shadow-xs cursor-pointer disabled:cursor-not-allowed"
              >
                <span>Send</span>
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>
        )}

      </div>
    </section>
  );
};
