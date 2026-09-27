import React, { useState, useRef, useEffect } from 'react';
import { AIMessage, UserProfile } from '../types';
import { sendChatMessageToAITeacher } from '../services/aiTeacherService';
import { usageService } from '../services/usageService';
import { membershipService } from '../services/membershipService';
import { FeatureUsageIndicator } from './FeatureUsageIndicator';
import { speakGerman, stopGermanSpeech } from '../utils/audio';
import { BrandLogo } from './BrandLogo';
import {
  Sparkles,
  Send,
  Volume2,
  RefreshCw,
  Lightbulb,
  Globe,
  AlertCircle,
  BookOpen,
  GraduationCap,
  ArrowRight
} from 'lucide-react';

interface AITeacherSectionProps {
  user?: UserProfile | null;
  onUpgrade?: () => void;
}

export const AITeacherSection: React.FC<AITeacherSectionProps> = ({ user, onUpgrade }) => {
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showEnglishTranslations, setShowEnglishTranslations] = useState(true);
  const [playingId, setPlayingId] = useState<string | null>(null);

  // Daily Usage limit state & click lock
  const [dailyLimitReached, setDailyLimitReached] = useState<boolean>(false);
  const isSendingRef = useRef<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Re-check daily limit status on mount and when user changes
  useEffect(() => {
    let isMounted = true;

    const checkLimit = async () => {
      const todayUsage = await usageService.getTodayUsage(user);
      const count = usageService.getUsageForFeature('aiTeacher', todayUsage);
      const limitInfo = membershipService.getFeatureLimit('aiTeacher', user);
      if (isMounted) {
        if (typeof limitInfo.limit === 'number' && count >= limitInfo.limit) {
          setDailyLimitReached(true);
        } else {
          setDailyLimitReached(false);
        }
      }
    };

    checkLimit();

    const unsubscribe = usageService.onDailyUsageChange((usage) => {
      if (isMounted) {
        const count = usageService.getUsageForFeature('aiTeacher', usage);
        const limitInfo = membershipService.getFeatureLimit('aiTeacher', user);
        if (typeof limitInfo.limit === 'number' && count >= limitInfo.limit) {
          setDailyLimitReached(true);
        } else {
          setDailyLimitReached(false);
        }
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
      stopGermanSpeech();
    };
  }, [user]);

  // Sample prompt categories for empty state
  const samplePromptCategories = [
    {
      title: 'Grammar & Cases',
      icon: <GraduationCap className="w-4 h-4 text-amber-400" />,
      questions: [
        'Explain der, die, das in simple terms',
        'What is the difference between Akkusativ and Dativ?'
      ]
    },
    {
      title: 'Translations',
      icon: <Globe className="w-4 h-4 text-blue-400" />,
      questions: [
        'How do I say "Where is the train station?" in German?',
        'How do I say "Thank you very much" politely?'
      ]
    },
    {
      title: 'Mistake Correction',
      icon: <AlertCircle className="w-4 h-4 text-red-400" />,
      questions: [
        'Correct my German: "Ich habe gegangen zu Schule"',
        'Correct my sentence: "Ich will lernen Deutsch"'
      ]
    },
    {
      title: 'Living & Studying in Germany',
      icon: <BookOpen className="w-4 h-4 text-emerald-400" />,
      questions: [
        'What is the difference between Kaltmiete and Warmmiete?',
        'How do I do my Anmeldung (address registration) at the Bürgeramt?'
      ]
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages.length, isLoading]);

  const handleClearChat = () => {
    setMessages([]);
    setInputText('');
    inputRef.current?.focus();
  };

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query || isLoading || isSendingRef.current) return;

    // Check daily usage allowance
    const todayUsage = await usageService.getTodayUsage(user);
    const count = usageService.getUsageForFeature('aiTeacher', todayUsage);
    const limitInfo = membershipService.getFeatureLimit('aiTeacher', user);
    if (typeof limitInfo.limit === 'number' && count >= limitInfo.limit) {
      setDailyLimitReached(true);
      return;
    }

    isSendingRef.current = true;
    setIsLoading(true);

    const userMsg: AIMessage = {
      id: `u_${Date.now()}`,
      sender: 'user',
      textGerman: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    try {
      // Record daily usage on send
      await usageService.incrementUsage('aiTeacher', user);

      const response = await sendChatMessageToAITeacher(query);

      const teacherMsg: AIMessage = {
        id: `t_${Date.now()}`,
        sender: 'teacher',
        textGerman: response.german,
        textEnglish: response.english,
        explanation: response.explanation,
        grammarTip: response.grammarTip,
        examples: response.examples,
        correction: response.correction,
        vocabularyHighlights: response.vocabularyHighlights,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, teacherMsg]);
    } catch (err) {
      console.error('[AI Teacher] Send error:', err);
    } finally {
      setIsLoading(false);
      isSendingRef.current = false;
      inputRef.current?.focus();
    }
  };

  const handlePlayAudio = async (id: string, text: string) => {
    if (playingId === id) {
      await stopGermanSpeech();
      setPlayingId(null);
      return;
    }
    setPlayingId(id);
    try {
      await speakGerman(text);
    } finally {
      setPlayingId(null);
    }
  };

  return (
    <section id="ai-teacher-section" className="py-16 sm:py-20 bg-[#0B132B] text-white relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 right-10 w-96 h-96 bg-red-600 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-500 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>AI German Teacher</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-['Outfit'] tracking-tight">
            Learn & Practice German with Your Personal AI Teacher
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-slate-300 leading-relaxed">
            Get clear explanations in simple English, German ↔ English translations, gentle sentence corrections, and practical advice for living and studying in Germany.
          </p>

          {/* Daily Usage Indicator */}
          <div className="mt-4 flex justify-center">
            <FeatureUsageIndicator
              feature="aiTeacher"
              user={user}
              onUpgrade={onUpgrade}
              theme="dark"
            />
          </div>
        </div>

        {/* AI Teacher Chat Interface Container */}
        <div className="bg-slate-950 rounded-3xl border border-slate-800/90 shadow-2xl overflow-hidden flex flex-col h-[680px] relative">
          
          {/* 1. Chat Header */}
          <div className="p-3.5 sm:p-4 bg-slate-900/95 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-1 rounded-xl bg-white/10 border border-white/10">
                <BrandLogo size="sm" variant="mark-only" inverted={true} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-sm text-white">AI German Teacher</h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wide">Online</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Beginner-friendly explanations & CEFR guidance
                </p>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-2">
              {messages.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearChat}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-700/60"
                  title="Clear conversation"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Clear Chat</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setShowEnglishTranslations(!showEnglishTranslations)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                  showEnglishTranslations 
                    ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40' 
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
                title="Toggle English translations"
              >
                <Globe className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">English:</span>
                <span>{showEnglishTranslations ? 'ON' : 'OFF'}</span>
              </button>
            </div>
          </div>

          {/* 2. Chat Message History & Empty State Area */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-950/70">
            
            {/* EMPTY STATE */}
            {messages.length === 0 ? (
              <div 
                id="ai-teacher-empty-state"
                className="h-full flex flex-col items-center justify-center text-center py-6 px-2 sm:px-6"
              >
                <div className="mb-4">
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 shadow-lg inline-block">
                    <BrandLogo size="md" inverted={true} />
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white font-['Outfit'] tracking-tight">
                  Ask me anything about German.
                </h3>
                
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mt-2 leading-relaxed">
                  I explain German grammar step by step in simple English, translate sentences, correct your mistakes, and help you navigate everyday life, studies, and bureaucracy in Germany.
                </p>

                {/* Starter topic cards */}
                <div className="w-full max-w-2xl mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-left">
                  {samplePromptCategories.map((cat, idx) => (
                    <div 
                      key={idx} 
                      className="bg-slate-900/90 border border-slate-800/90 rounded-2xl p-3 hover:border-slate-700 transition-all"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        {cat.icon}
                        <h4 className="text-xs font-bold text-slate-200">{cat.title}</h4>
                      </div>
                      <div className="space-y-1.5">
                        {cat.questions.map((q, qIdx) => (
                          <button
                            key={qIdx}
                            type="button"
                            onClick={() => handleSend(q)}
                            disabled={dailyLimitReached}
                            className="w-full text-left p-2 rounded-xl bg-slate-950/70 hover:bg-slate-800 text-xs text-slate-300 hover:text-white transition-colors border border-slate-800 flex items-center justify-between group disabled:opacity-50 disabled:pointer-events-none"
                          >
                            <span className="truncate pr-2">{q}</span>
                            <Send className="w-3 h-3 text-slate-500 group-hover:text-red-400 flex-shrink-0 transition-colors" />
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* CHAT MESSAGE HISTORY */
              messages.map((message) => {
                const isUser = message.sender === 'user';
                return (
                  <div
                    key={message.id}
                    className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} animate-in fade-in duration-200`}
                  >
                    {/* Avatar Icon */}
                    <div className="flex-shrink-0">
                      {isUser ? (
                        <div className="w-8 h-8 rounded-full bg-red-600/30 border border-red-500/50 flex items-center justify-center text-xs font-bold text-red-200">
                          You
                        </div>
                      ) : (
                        <div className="p-1 rounded-xl bg-white/10 border border-white/15">
                          <BrandLogo size="sm" variant="mark-only" inverted={true} />
                        </div>
                      )}
                    </div>

                    {/* Bubble Content */}
                    <div
                      className={`max-w-[85%] sm:max-w-xl rounded-2xl p-4 shadow-md ${
                        isUser
                          ? 'bg-red-600 text-white rounded-tr-none'
                          : 'bg-slate-900 border border-slate-800 text-slate-100 rounded-tl-none'
                      }`}
                    >
                      {/* User Message */}
                      {isUser && (
                        <div className="text-sm font-medium leading-relaxed whitespace-pre-wrap">
                          {message.textGerman}
                        </div>
                      )}

                      {/* AI Teacher Structured Response */}
                      {!isUser && (
                        <div className="space-y-3.5 text-xs sm:text-sm">
                          
                          {/* 1. Primary German Phrase with Listen Speaker Button */}
                          <div className="flex items-start justify-between gap-3">
                            <div className="font-semibold text-white text-sm sm:text-base leading-snug">
                              {message.textGerman}
                            </div>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePlayAudio(message.id, message.textGerman);
                              }}
                              className={`p-2 rounded-xl min-w-[40px] min-h-[40px] flex items-center justify-center flex-shrink-0 transition-all cursor-pointer active:scale-95 select-none ${
                                playingId === message.id 
                                  ? 'bg-amber-400 text-slate-950 ring-2 ring-amber-400/50' 
                                  : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
                              }`}
                              title="Listen to German pronunciation"
                              aria-label="Listen to German audio"
                            >
                              <Volume2 className={`w-4 h-4 pointer-events-none ${playingId === message.id ? 'animate-pulse' : ''}`} />
                            </button>
                          </div>

                          {/* 2. English Translation */}
                          {showEnglishTranslations && message.textEnglish && (
                            <div className="text-slate-300 text-xs sm:text-[13px] border-l-2 border-amber-400/80 pl-2.5 py-0.5 italic">
                              {message.textEnglish}
                            </div>
                          )}

                          {/* 3. Mistake Correction */}
                          {message.correction && (
                            <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/30 space-y-1">
                              <div className="flex items-center gap-1.5 text-red-400 font-bold text-[11px] uppercase tracking-wider">
                                <AlertCircle className="w-3.5 h-3.5" />
                                <span>Gentle Correction</span>
                              </div>
                              <div className="line-through text-red-300/80 text-xs">
                                {message.correction.original}
                              </div>
                              <div className="text-emerald-400 font-semibold text-xs">
                                ✓ {message.correction.corrected}
                              </div>
                              <p className="text-slate-300 text-[11px] mt-1 leading-relaxed">
                                {message.correction.reason}
                              </p>
                            </div>
                          )}

                          {/* 4. Grammatical Explanation */}
                          {message.explanation && (
                            <div className="text-slate-200 text-xs sm:text-[13px] leading-relaxed">
                              {message.explanation}
                            </div>
                          )}

                          {/* 5. Grammar Tip */}
                          {message.grammarTip && (
                            <div className="p-2.5 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-start gap-2 text-amber-200 text-xs">
                              <Lightbulb className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                              <div className="leading-relaxed">
                                {message.grammarTip}
                              </div>
                            </div>
                          )}

                          {/* 6. Everyday Usage Examples */}
                          {message.examples && message.examples.length > 0 && (
                            <div className="space-y-1.5 pt-1 border-t border-slate-800">
                              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                Everyday Examples:
                              </span>
                              <div className="space-y-1">
                                {message.examples.map((ex, exIdx) => (
                                  <div key={exIdx} className="bg-slate-950/60 p-2 rounded-lg border border-slate-800/80 flex items-start justify-between gap-2">
                                    <div>
                                      <p className="font-medium text-white text-xs">{ex.german}</p>
                                      {showEnglishTranslations && (
                                        <p className="text-slate-400 text-[11px]">{ex.english}</p>
                                      )}
                                    </div>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handlePlayAudio(`${message.id}-ex-${exIdx}`, ex.german);
                                      }}
                                      className="text-slate-400 hover:text-white p-2 min-w-[36px] min-h-[36px] flex items-center justify-center cursor-pointer active:scale-95"
                                      title="Listen to example"
                                      aria-label="Listen to example"
                                    >
                                      <Volume2 className="w-3.5 h-3.5 pointer-events-none" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* 7. Vocabulary Highlights */}
                          {message.vocabularyHighlights && message.vocabularyHighlights.length > 0 && (
                            <div className="pt-1 flex flex-wrap gap-1.5">
                              {message.vocabularyHighlights.map((vocab, vIdx) => (
                                <span
                                  key={vIdx}
                                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-[11px] text-slate-300"
                                >
                                  <span className="font-semibold text-white">{vocab.german}</span>
                                  <span className="text-slate-400">({vocab.meaning})</span>
                                </span>
                              ))}
                            </div>
                          )}

                        </div>
                      )}

                      {/* Timestamp */}
                      <div className={`text-[10px] mt-2 ${isUser ? 'text-red-200/80 text-right' : 'text-slate-400'}`}>
                        {message.timestamp}
                      </div>
                    </div>
                  </div>
                );
              })
            )}

            {/* Daily Limit Reached Card in Chat History */}
            {dailyLimitReached && (
              <div className="p-4 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-amber-200 text-center space-y-3">
                <div className="flex items-center justify-center gap-2 font-bold text-sm text-amber-300">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Daily Free Messages Used</span>
                </div>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  You have reached your daily free limit of messages for the AI German Teacher. Free limits reset every midnight. Upgrade to Premium for unlimited instant questions and feedback!
                </p>
                {onUpgrade && (
                  <button
                    type="button"
                    onClick={onUpgrade}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md active:scale-95"
                  >
                    <span>Upgrade to Premium</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}

            {/* Loading Indicator */}
            {isLoading && (
              <div 
                id="ai-teacher-loading"
                className="flex items-center gap-3 text-xs text-slate-300 pl-11 py-2"
              >
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-400 animate-bounce" />
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-bounce [animation-delay:0.15s]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-bounce [animation-delay:0.3s]" />
                </div>
                <span className="font-medium text-slate-400">German Teacher is typing and checking grammar...</span>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Starter Chips Ribbon */}
          <div className="px-3 sm:px-4 py-2 bg-slate-900/90 border-t border-slate-800 flex items-center gap-2 overflow-x-auto no-scrollbar w-full max-w-full">
            <span className="text-[11px] font-bold text-slate-400 whitespace-nowrap flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Ask:</span>
            </span>
            {[
              'Explain der, die, das',
              'What is Kaltmiete vs Warmmiete?',
              'Translate "Where is the station?"',
              'How to register at Bürgeramt?',
              'Correct: "Ich habe gegangen"'
            ].map((promptText, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(promptText)}
                disabled={dailyLimitReached || isLoading}
                className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 disabled:opacity-40 disabled:pointer-events-none whitespace-nowrap transition-colors border border-slate-700/60"
              >
                {promptText}
              </button>
            ))}
          </div>

          {/* 3. User Message Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 sm:p-4 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] bg-slate-900 border-t border-slate-800 flex items-center gap-2 sm:gap-3"
          >
            <input
              ref={inputRef}
              id="ai-teacher-input"
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                dailyLimitReached
                  ? "Daily message limit reached. Upgrade to Premium for unlimited questions!"
                  : "Ask anything about German grammar, vocabulary, translation, or living in Germany..."
              }
              className="flex-1 min-w-0 bg-slate-950 border border-slate-700 focus:border-red-500 focus:outline-hidden text-sm text-white px-4 py-3 rounded-2xl placeholder-slate-500 transition-colors shadow-inner disabled:opacity-50"
              disabled={isLoading || dailyLimitReached}
            />
            
            <button
              id="ai-teacher-send-btn"
              type="submit"
              disabled={!inputText.trim() || isLoading || dailyLimitReached}
              className="px-4 py-3 rounded-2xl bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold text-sm transition-all disabled:opacity-40 disabled:pointer-events-none flex items-center gap-2 shadow-md shadow-red-600/30 flex-shrink-0"
              aria-label="Send message"
            >
              <span>Send</span>
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>

      </div>
    </section>
  );
};
