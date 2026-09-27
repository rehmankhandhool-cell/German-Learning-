import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  ArrowLeft,
  ChevronRight,
  UserCheck,
  UtensilsCrossed,
  Stethoscope,
  Building2,
  Briefcase,
  ShoppingBag,
  GraduationCap,
  MessagesSquare,
  Info,
  Loader2,
  Lightbulb
} from 'lucide-react';
import { SPEAKING_TOPICS_DATA } from '../data/speakingTopicsData';
import { SpeakingTopic, SpeakingPhrase, SpeakingAIFeedback, UserProfile } from '../types';
import { usageService } from '../services/usageService';
import { membershipService } from '../services/membershipService';
import { FeatureUsageIndicator } from './FeatureUsageIndicator';
import { getApiUrl } from '../utils/apiConfig';
import { backButtonManager } from '../utils/backButtonHandler';
import { speakGerman, stopGermanSpeech } from '../utils/audio';

interface SpeakingPracticeSectionProps {
  user?: UserProfile | null;
  onUpgrade?: () => void;
  onNavigateHome?: () => void;
}

export const SpeakingPracticeSection: React.FC<SpeakingPracticeSectionProps> = ({
  user,
  onUpgrade
}) => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>('introduce-yourself');
  const [activePhraseIndex, setActivePhraseIndex] = useState<number>(0);
  const [isListeningAudio, setIsListeningAudio] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [liveTranscript, setLiveTranscript] = useState<string>('');
  const [recognizedText, setRecognizedText] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{
    score: number;
    title: string;
    description: string;
    type: 'success' | 'good' | 'retry';
  } | null>(null);
  const [isSpeechRecognitionSupported, setIsSpeechRecognitionSupported] = useState<boolean>(true);
  const [micErrorMessage, setMicErrorMessage] = useState<string | null>(null);
  const [showPhonetic, setShowPhonetic] = useState<boolean>(true);

  // Gemini AI Feedback States
  const [isLoadingAI, setIsLoadingAI] = useState<boolean>(false);
  const [aiFeedback, setAiFeedback] = useState<SpeakingAIFeedback | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);
  const [dailyLimitReached, setDailyLimitReached] = useState<boolean>(false);
  const hasDispatchedRef = useRef<boolean>(false);

  const recognitionRef = useRef<any>(null);

  // Check today's Speaking Practice usage on mount and reactively subscribe to usage updates
  useEffect(() => {
    let isMounted = true;

    const checkLimitStatus = async () => {
      const isPremium = membershipService.isPremiumUser(user);
      if (isPremium) {
        if (isMounted) setDailyLimitReached(false);
        return;
      }
      const todayUsage = await usageService.getTodayUsage(user);
      const count = usageService.getUsageForFeature('speaking', todayUsage);
      if (isMounted) {
        setDailyLimitReached(count >= 5);
      }
    };

    checkLimitStatus();

    const unsubscribe = usageService.onDailyUsageChange((usage) => {
      if (!isMounted) return;
      const isPremium = membershipService.isPremiumUser(user);
      if (isPremium) {
        setDailyLimitReached(false);
      } else {
        const count = usageService.getUsageForFeature('speaking', usage);
        setDailyLimitReached(count >= 5);
      }
    });

    const handleCustomUsageEvent = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (isMounted && customEvent.detail) {
        const isPremium = membershipService.isPremiumUser(user);
        if (isPremium) {
          setDailyLimitReached(false);
        } else {
          const count = usageService.getUsageForFeature('speaking', customEvent.detail);
          setDailyLimitReached(count >= 5);
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

  // Handle hardware back button inside SpeakingPracticeSection
  useEffect(() => {
    if (isRecording) {
      return backButtonManager.register('speaking-recording', 80, () => {
        if (recognitionRef.current) {
          try {
            recognitionRef.current.stop();
          } catch {
            // ignore
          }
        }
        setIsRecording(false);
        return true;
      });
    }
  }, [isRecording]);

  useEffect(() => {
    if (aiFeedback) {
      return backButtonManager.register('speaking-feedback', 65, () => {
        setAiFeedback(null);
        setFeedback(null);
        return true;
      });
    }
  }, [aiFeedback]);

  // Find active topic & active phrase
  const activeTopic: SpeakingTopic = 
    SPEAKING_TOPICS_DATA.find(t => t.id === selectedTopicId) || SPEAKING_TOPICS_DATA[0];
  const activePhrase: SpeakingPhrase = 
    activeTopic.phrases[activePhraseIndex] || activeTopic.phrases[0];

  // Detect SpeechRecognition support on mount
  useEffect(() => {
    const SpeechRecognitionAPI = 
      typeof window !== 'undefined' && 
      ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);
    setIsSpeechRecognitionSupported(Boolean(SpeechRecognitionAPI));
  }, []);

  // Cleanup speech synthesis and recognition on unmount
  useEffect(() => {
    return () => {
      stopGermanSpeech();
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (_e) {
          // ignore cleanup errors
        }
      }
    };
  }, []);

  // When changing topic or phrase, reset speech result states
  const handleSelectTopic = (topicId: string) => {
    setSelectedTopicId(topicId);
    setActivePhraseIndex(0);
    resetPracticeState();
  };

  const handleSelectPhrase = (index: number) => {
    setActivePhraseIndex(index);
    resetPracticeState();
  };

  const resetPracticeState = () => {
    stopGermanSpeech();
    if (recognitionRef.current && isRecording) {
      try {
        recognitionRef.current.stop();
      } catch (_e) {
        // ignore
      }
    }
    setIsListeningAudio(false);
    setIsRecording(false);
    setLiveTranscript('');
    setRecognizedText(null);
    setFeedback(null);
    setMicErrorMessage(null);
    setIsLoadingAI(false);
    setAiFeedback(null);
    setAiError(null);
    hasDispatchedRef.current = false;
  };

  // Call server-side Gemini AI to evaluate spoken German
  const fetchAIFeedback = async (topicTitle: string, targetSentence: string, spokenText: string) => {
    setIsLoadingAI(true);
    setAiError(null);
    setAiFeedback(null);

    try {
      const res = await fetch(getApiUrl('/api/speaking-feedback'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          topic: topicTitle,
          targetSentence,
          userSpeech: spokenText
        })
      });

      if (!res.ok) {
        throw new Error(`Server status ${res.status}`);
      }

      const data: SpeakingAIFeedback = await res.json();
      setAiFeedback(data);

      // Requirement 3: Usage increments ONLY after a successful evaluation
      try {
        const updated = await usageService.incrementUsage('speaking', user);
        if (!membershipService.isPremiumUser(user) && (updated.speakingPractices || 0) >= 5) {
          setDailyLimitReached(true);
        }
      } catch (err) {
        console.warn('Silent usage tracking update:', err);
      }
    } catch (_err) {
      // Failed evaluations do NOT consume usage
      setAiError('AI evaluation took longer than usual. Your basic pronunciation score and spoken transcript above remain active!');
    } finally {
      setIsLoadingAI(false);
    }
  };

  // Trigger evaluation safely once per speech recognition attempt
  const triggerEvaluation = async (spoken: string) => {
    if (hasDispatchedRef.current || !spoken.trim()) return;
    hasDispatchedRef.current = true;

    // Requirement 1 & 2: Before submitting a completed speech attempt for AI evaluation, check:
    // - user's membership plan
    // - today's Speaking Practice usage
    const isPremium = membershipService.isPremiumUser(user);
    if (!isPremium) {
      const todayUsage = await usageService.getTodayUsage(user);
      const count = usageService.getUsageForFeature('speaking', todayUsage);
      if (count >= 5) {
        // Free user at 5/5: Do NOT send AI evaluation request, do NOT increment usage
        setDailyLimitReached(true);
        setRecognizedText(spoken);
        const evalResult = evaluateSpeech(spoken, activePhrase.german);
        setFeedback(evalResult);
        return;
      }
    }

    setRecognizedText(spoken);
    const evalResult = evaluateSpeech(spoken, activePhrase.german);
    setFeedback(evalResult);
    fetchAIFeedback(activeTopic.title, activePhrase.german, spoken);
  };

  // Text-to-Speech: Listen to German Sentence
  const handleListenGerman = async () => {
    if (isListeningAudio) {
      await stopGermanSpeech();
      setIsListeningAudio(false);
      return;
    }

    setIsListeningAudio(true);
    try {
      await speakGerman(activePhrase.german, 0.85);
    } catch (_err) {
      setMicErrorMessage('Text-to-speech could not be played on this device.');
    } finally {
      setIsListeningAudio(false);
    }
  };

  // Evaluate user speech against target sentence
  const evaluateSpeech = (spoken: string, target: string) => {
    const cleanSpoken = spoken.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()?"']/g, '').trim();
    const cleanTarget = target.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()?"']/g, '').trim();

    const targetWords = cleanTarget.split(/\s+/).filter(Boolean);
    const spokenWords = cleanSpoken.split(/\s+/).filter(Boolean);

    if (targetWords.length === 0 || spokenWords.length === 0) {
      return {
        score: 0,
        title: 'Nicht erkannt (Not recognized)',
        description: 'Bitte versuche es noch einmal und sprich laut und deutlich.',
        type: 'retry' as const
      };
    }

    // Calculate word-level overlap
    let matchCount = 0;
    targetWords.forEach(word => {
      if (spokenWords.includes(word)) {
        matchCount++;
      }
    });

    const score = Math.round((matchCount / targetWords.length) * 100);

    if (score >= 80) {
      return {
        score,
        title: 'Ausgezeichnet! (Excellent!)',
        description: 'Wunderbare Aussprache! Deine Worte wurden klar und flüssig verstanden.',
        type: 'success' as const
      };
    } else if (score >= 50) {
      return {
        score,
        title: 'Guter Versuch! (Good attempt!)',
        description: 'Der Großteil war verständlich. Achte besonders auf Wortendungen und schwierige Umlaute (ä, ö, ü).',
        type: 'good' as const
      };
    } else {
      return {
        score,
        title: 'Noch einmal üben (Practice once more)',
        description: 'Höre dir den Satz noch einmal mit "Listen" an und wiederhole ihn in normalem Sprechtempo.',
        type: 'retry' as const
      };
    }
  };

  // Speech Recognition: User Spoken German
  const handleStartSpeaking = async () => {
    setMicErrorMessage(null);
    await stopGermanSpeech();
    setIsListeningAudio(false);

    // Pre-check membership plan and usage
    const isPremium = membershipService.isPremiumUser(user);
    if (!isPremium) {
      const todayUsage = await usageService.getTodayUsage(user);
      const count = usageService.getUsageForFeature('speaking', todayUsage);
      if (count >= 5) {
        setDailyLimitReached(true);
        return;
      }
    }

    if (isRecording) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsRecording(false);
      return;
    }

    const SpeechRecognitionAPI = 
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) {
      setIsSpeechRecognitionSupported(false);
      return;
    }

    try {
      const recognition = new SpeechRecognitionAPI();
      recognition.lang = 'de-DE';
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;
      recognition.continuous = false;

      recognition.onstart = () => {
        setIsRecording(true);
        setLiveTranscript('');
        setRecognizedText(null);
        setFeedback(null);
        setMicErrorMessage(null);
        setIsLoadingAI(false);
        setAiFeedback(null);
        setAiError(null);
        hasDispatchedRef.current = false;
      };

      recognition.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        const currentSpeech = finalTranscript || interimTranscript;
        setLiveTranscript(currentSpeech);

        if (finalTranscript) {
          triggerEvaluation(finalTranscript);
        }
      };

      recognition.onerror = (event: any) => {
        setIsRecording(false);
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          setMicErrorMessage('Mikrofon-Zugriff wurde verweigert. Bitte erlaube das Mikrofon in deinen Browser-Einstellungen.');
        } else if (event.error === 'no-speech') {
          setMicErrorMessage('Keine Sprache erkannt. Bitte sprich direkt ins Mikrofon und versuche es erneut.');
        } else {
          setMicErrorMessage(`Audiohinweis (${event.error}). Klicke erneut auf "Start Speaking".`);
        }
      };

      recognition.onend = () => {
        setIsRecording(false);
        // If final transcript was captured in liveTranscript but not finalized
        if (!hasDispatchedRef.current && liveTranscript) {
          triggerEvaluation(liveTranscript);
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (_err) {
      setIsRecording(false);
      setMicErrorMessage('Das Mikrofon konnte nicht gestartet werden. Bitte überprüfe deine Browsereinstellungen.');
    }
  };

  // Helper icon renderer
  const renderTopicIcon = (iconName: string, className: string = "w-5 h-5") => {
    switch (iconName) {
      case 'UserCheck': return <UserCheck className={className} />;
      case 'UtensilsCrossed': return <UtensilsCrossed className={className} />;
      case 'Stethoscope': return <Stethoscope className={className} />;
      case 'Building2': return <Building2 className={className} />;
      case 'Briefcase': return <Briefcase className={className} />;
      case 'ShoppingBag': return <ShoppingBag className={className} />;
      case 'GraduationCap': return <GraduationCap className={className} />;
      case 'MessagesSquare': return <MessagesSquare className={className} />;
      default: return <Mic className={className} />;
    }
  };

  return (
    <section id="speaking-practice-section" className="py-10 sm:py-14 bg-slate-50 min-h-[calc(100vh-80px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Mic className="w-3.5 h-3.5" />
            <span>Interactive Speaking Lab</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Speaking Practice
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Train authentic German pronunciation for everyday situations in Germany with instant speech evaluation.
          </p>

          {/* Feature Usage Indicator */}
          <div className="mt-4 flex justify-center">
            <FeatureUsageIndicator
              feature="speakingPractice"
              user={user}
              onUpgrade={onUpgrade}
              theme="light"
            />
          </div>
        </div>

        {/* Unsupported Browser Warning (if Web Speech API is absent) */}
        {!isSpeechRecognitionSupported && (
          <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3.5 max-w-4xl mx-auto">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-bold text-amber-950">Hinweis zur Spracherkennung (Browser Note)</p>
              <p className="mt-1 text-amber-800 leading-relaxed">
                Your current browser does not support the Web Speech Recognition API. We recommend using <strong>Google Chrome</strong>, <strong>Microsoft Edge</strong>, or <strong>Safari</strong> for voice input. You can still use the <strong>Listen</strong> button to hear authentic native German pronunciation!
              </p>
            </div>
          </div>
        )}

        {/* Main Grid: Topic Selector on left/top + Interactive Practice Card on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Topics List (lg: 4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Practice Topics ({SPEAKING_TOPICS_DATA.length})
              </h2>
              <span className="text-xs text-slate-400 font-medium">Select a topic</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
              {SPEAKING_TOPICS_DATA.map((topic) => {
                const isSelected = topic.id === selectedTopicId;
                return (
                  <button
                    key={topic.id}
                    id={`speaking-topic-${topic.id}`}
                    onClick={() => handleSelectTopic(topic.id)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-150 flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-slate-900 border-slate-900 text-white shadow-md shadow-slate-900/10'
                        : 'bg-white border-slate-200 text-slate-800 hover:border-slate-300 hover:bg-slate-50/80 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        isSelected ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {renderTopicIcon(topic.iconName)}
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-sm truncate">
                          {topic.title}
                        </div>
                        <div className={`text-xs truncate ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                          {topic.subtitle}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 flex-shrink-0 ${isSelected ? 'text-amber-400' : 'text-slate-400'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Selected Topic Speaking Stage (lg: 8 cols) */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
              
              {/* Card Header with Topic info */}
              <div className="p-6 sm:p-7 border-b border-slate-100 bg-linear-to-r from-slate-50 via-white to-amber-50/20">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center shadow-xs">
                      {renderTopicIcon(activeTopic.iconName, "w-6 h-6")}
                    </div>
                    <div>
                      <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {activeTopic.category}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                        {activeTopic.title}
                      </h2>
                    </div>
                  </div>

                  {/* Phrase Switcher Buttons if topic has multiple phrases */}
                  <div className="flex items-center gap-1.5 bg-slate-100/90 p-1 rounded-xl">
                    {activeTopic.phrases.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSelectPhrase(idx)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                          activePhraseIndex === idx
                            ? 'bg-white text-slate-900 shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                        title={`Sentence ${idx + 1}`}
                      >
                        Satz {idx + 1}
                      </button>
                    ))}
                  </div>
                </div>

                {/* English Instruction */}
                <div className="mt-4 p-3.5 rounded-xl bg-blue-50/80 border border-blue-100 text-blue-900 text-xs sm:text-sm flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Speaking Goal: </span>
                    <span>{activeTopic.instruction}</span>
                  </div>
                </div>
              </div>

              {/* Main Speaking Practice Area */}
              <div className="p-6 sm:p-8 space-y-6">
                
                {/* Target Sentence Card */}
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 sm:p-6 text-center relative overflow-hidden">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                    German Sentence to Speak
                  </div>

                  {/* The German Sentence */}
                  <p className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 leading-snug">
                    "{activePhrase.german}"
                  </p>

                  {/* English Translation */}
                  <p className="mt-3 text-sm sm:text-base text-slate-600 font-medium">
                    {activePhrase.english}
                  </p>

                  {/* Phonetic Pronunciation Guide */}
                  {activePhrase.phoneticHint && (
                    <div className="mt-3">
                      {showPhonetic ? (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 text-amber-900 text-xs font-mono">
                          <span className="font-sans font-semibold text-amber-800">Aussprache:</span>
                          <span>{activePhrase.phoneticHint}</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => setShowPhonetic(true)}
                          className="text-xs text-slate-400 hover:text-slate-600 underline font-medium"
                        >
                          Show phonetic guide
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Microphone Error Message */}
                {micErrorMessage && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{micErrorMessage}</span>
                  </div>
                )}

                {/* Friendly Limit Reached Banner */}
                {dailyLimitReached && !membershipService.isPremiumUser(user) && (
                  <div
                    id="speaking-practice-limit-banner"
                    className="p-4 sm:p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm animate-in fade-in"
                  >
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-amber-950 text-sm sm:text-base">
                          You&apos;ve reached your 5 free Speaking Practice attempts for today.
                        </h4>
                        <p className="text-amber-800 text-xs sm:text-sm mt-1 leading-relaxed">
                          Your 5 free Speaking Practice attempts reset tomorrow. Upgrade to German Master Premium for unlimited speaking evaluations, instant grammar feedback, and natural phrasing tips.
                        </p>
                      </div>
                    </div>
                    {onUpgrade && (
                      <button
                        type="button"
                        onClick={onUpgrade}
                        className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs inline-flex items-center gap-1.5 transition-all shadow-xs flex-shrink-0 active:scale-95"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Upgrade to Premium</span>
                      </button>
                    )}
                  </div>
                )}

                {/* Primary Action Buttons: Listen & Start Speaking */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
                  
                  {/* "Listen" Button */}
                  <button
                    id="listen-german-button"
                    onClick={handleListenGerman}
                    className={`w-full sm:w-auto px-6 py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2.5 transition-all shadow-xs ${
                      isListeningAudio
                        ? 'bg-blue-600 text-white shadow-blue-500/20'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                    }`}
                  >
                    {isListeningAudio ? (
                      <>
                        <VolumeX className="w-4 h-4 text-white animate-pulse" />
                        <span>Listening... (Stop)</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-4 h-4 text-slate-600" />
                        <span>Listen (Native German)</span>
                      </>
                    )}
                  </button>

                  {/* "Start Speaking" Button */}
                  <button
                    id="start-speaking-button"
                    onClick={handleStartSpeaking}
                    disabled={dailyLimitReached && !membershipService.isPremiumUser(user)}
                    title={dailyLimitReached && !membershipService.isPremiumUser(user) ? "You've reached your 5 free Speaking Practice attempts for today." : undefined}
                    className={`w-full sm:w-auto px-7 py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2.5 transition-all shadow-md ${
                      dailyLimitReached && !membershipService.isPremiumUser(user)
                        ? 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none'
                        : isRecording
                        ? 'bg-red-600 hover:bg-red-700 text-white shadow-red-500/30 animate-pulse'
                        : 'bg-slate-900 hover:bg-slate-800 text-amber-300 shadow-slate-900/20'
                    }`}
                  >
                    {isRecording ? (
                      <>
                        <MicOff className="w-4 h-4 text-white" />
                        <span>Listening to you... (Click to Stop)</span>
                      </>
                    ) : (
                      <>
                        <Mic className="w-4 h-4 text-amber-400" />
                        <span>Start Speaking</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Live Recording Indicator */}
                {isRecording && (
                  <div className="p-4 rounded-2xl bg-red-50/80 border border-red-100 text-center animate-in fade-in duration-200">
                    <div className="flex items-center justify-center gap-2 text-xs font-bold text-red-700 uppercase tracking-wider mb-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
                      <span>Speak German now — microphone active</span>
                    </div>
                    <p className="text-sm font-semibold text-slate-800 italic min-h-[24px]">
                      {liveTranscript ? `"${liveTranscript}"` : 'Listening for your voice...'}
                    </p>
                  </div>
                )}

                {/* Result Area (What you said, Basic feedback, Try Again) */}
                {(recognizedText || feedback) && (
                  <div id="speaking-result-area" className="p-5 sm:p-6 rounded-2xl border bg-slate-50/80 space-y-4 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-600" />
                        <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                          Speaking Result
                        </span>
                      </div>
                      {feedback && (
                        <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                          feedback.type === 'success'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : feedback.type === 'good'
                            ? 'bg-blue-100 text-blue-800 border border-blue-200'
                            : 'bg-amber-100 text-amber-800 border border-amber-200'
                        }`}>
                          {feedback.score}% Match
                        </span>
                      )}
                    </div>

                    {/* What You Said */}
                    <div>
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                        What you said:
                      </div>
                      <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-slate-900 font-medium text-base">
                        "{recognizedText || liveTranscript || '—'}"
                      </div>
                    </div>

                    {/* Basic Feedback */}
                    {feedback && (
                      <div className={`p-4 rounded-xl border flex items-start gap-3 ${
                        feedback.type === 'success'
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                          : feedback.type === 'good'
                          ? 'bg-blue-50 border-blue-200 text-blue-950'
                          : 'bg-amber-50 border-amber-200 text-amber-950'
                      }`}>
                        {feedback.type === 'success' ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        )}
                        <div>
                          <div className="font-bold text-sm">
                            {feedback.title}
                          </div>
                          <div className="text-xs sm:text-sm mt-0.5 opacity-90 leading-relaxed">
                            {feedback.description}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Gemini AI Teacher Feedback Card */}
                    <div id="speaking-ai-feedback" className="border-t border-slate-200/90 pt-4 mt-2">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-md bg-red-600 text-white flex items-center justify-center shadow-xs">
                            <Sparkles className="w-3 h-3" />
                          </div>
                          <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                            AI Teacher Feedback
                          </span>
                        </div>
                        {aiFeedback && (
                          <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                            aiFeedback.understandable?.toLowerCase().includes('yes')
                              ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                              : aiFeedback.understandable?.toLowerCase().includes('mostly')
                              ? 'bg-blue-100 text-blue-800 border-blue-200'
                              : 'bg-amber-100 text-amber-800 border-amber-200'
                          }`}>
                            Understandable: {aiFeedback.understandable}
                          </span>
                        )}
                      </div>

                      {/* Loading State */}
                      {isLoadingAI && (
                        <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-center gap-3 text-slate-600">
                          <Loader2 className="w-5 h-5 text-red-600 animate-spin flex-shrink-0" />
                          <div className="text-xs sm:text-sm">
                            <p className="font-semibold text-slate-900">Evaluating your spoken German with Gemini...</p>
                            <p className="text-slate-500 text-xs">Checking grammar, word order, and phrasing.</p>
                          </div>
                        </div>
                      )}

                      {/* AI Feedback Content */}
                      {aiFeedback && !isLoadingAI && (
                        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3.5">
                          {/* Corrected / Ideal Sentence */}
                          <div>
                            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                              Correction / Ideal German Phrasing:
                            </div>
                            <p className="text-sm sm:text-base font-bold text-slate-900 bg-slate-50 border border-slate-200/80 p-3 rounded-xl leading-snug">
                              "{aiFeedback.correctedSentence}"
                            </p>
                          </div>

                          {/* Improvement Tip */}
                          {aiFeedback.improvementTip && (
                            <div className="p-3 rounded-xl bg-amber-50/90 border border-amber-200/80 text-amber-950 flex items-start gap-2.5 text-xs sm:text-sm">
                              <Lightbulb className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                              <div>
                                <span className="font-bold text-amber-900">Teacher Tip: </span>
                                <span>{aiFeedback.improvementTip}</span>
                              </div>
                            </div>
                          )}

                          {/* English Explanation */}
                          {aiFeedback.englishExplanation && (
                            <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                              <span className="font-bold text-slate-900">English Explanation: </span>
                              <span>{aiFeedback.englishExplanation}</span>
                            </div>
                          )}

                          {/* Detailed Grammar, Word Order & Vocabulary Notes */}
                          <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-2 text-xs">
                            {aiFeedback.grammarFeedback && (
                              <div className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200/50">
                                <span className="font-bold text-slate-900">Grammar: </span>
                                <span>{aiFeedback.grammarFeedback}</span>
                              </div>
                            )}
                            {aiFeedback.wordOrderFeedback && aiFeedback.wordOrderFeedback !== 'Word order is correct.' && (
                              <div className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200/50">
                                <span className="font-bold text-slate-900">Word Order: </span>
                                <span>{aiFeedback.wordOrderFeedback}</span>
                              </div>
                            )}
                            {aiFeedback.missingOrIncorrectWords && aiFeedback.missingOrIncorrectWords !== 'None' && aiFeedback.missingOrIncorrectWords !== 'None - all words matched' && (
                              <div className="px-2.5 py-1 rounded-lg bg-red-50 text-red-700 border border-red-100">
                                <span className="font-bold text-red-900">Words note: </span>
                                <span>{aiFeedback.missingOrIncorrectWords}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* AI Error Fallback Notice */}
                      {aiError && !isLoadingAI && (
                        <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 text-xs flex items-center gap-2">
                          <Info className="w-4 h-4 text-slate-500 flex-shrink-0" />
                          <span>{aiError}</span>
                        </div>
                      )}

                      {/* Free Plan Limit Notice in AI Evaluation Card */}
                      {dailyLimitReached && !membershipService.isPremiumUser(user) && !aiFeedback && !isLoadingAI && (
                        <div
                          id="speaking-ai-limit-notice"
                          className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 space-y-2 text-xs sm:text-sm"
                        >
                          <div className="font-bold text-amber-900 flex items-center gap-1.5">
                            <Sparkles className="w-4 h-4 text-amber-600" />
                            <span>You&apos;ve reached your 5 free Speaking Practice attempts for today.</span>
                          </div>
                          <p className="text-amber-800 text-xs leading-relaxed">
                            Your basic speech match score was computed above. Detailed AI grammar, word order, and phrasing evaluations reset tomorrow. Upgrade to German Master Premium for unlimited AI evaluations.
                          </p>
                          {onUpgrade && (
                            <button
                              type="button"
                              onClick={onUpgrade}
                              className="font-bold text-red-600 hover:text-red-700 underline inline-flex items-center gap-1 text-xs"
                            >
                              <span>Upgrade to Premium</span>
                            </button>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Action Row with Try Again Button */}
                    <div className="flex items-center justify-between pt-2">
                      <button
                        id="try-again-button"
                        onClick={resetPracticeState}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 transition-colors shadow-2xs"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Try Again</span>
                      </button>

                      {/* Next Phrase in Topic */}
                      {activePhraseIndex < activeTopic.phrases.length - 1 && (
                        <button
                          onClick={() => handleSelectPhrase(activePhraseIndex + 1)}
                          className="inline-flex items-center gap-1 text-xs font-bold text-red-600 hover:text-red-700"
                        >
                          <span>Next sentence</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
