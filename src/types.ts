export type GermanLevel = 'A1' | 'A2' | 'B1' | 'B2';

// MEMBERSHIP & SUBSCRIPTION TYPES
export type MembershipPlan = 'free' | 'premium';

// PAYMENT ARCHITECTURE TYPES (Phase 12A Foundation)
export type PaymentStatus = 'idle' | 'not_configured' | 'pending' | 'succeeded' | 'failed' | 'canceled';
export type PaymentProvider = 'none' | 'stripe' | 'paypal';
export type SubscriptionStatus = 'none' | 'active' | 'past_due' | 'canceled' | 'trialing' | 'incomplete';

export interface PremiumSubscription {
  id?: string;
  userId: string;
  provider: PaymentProvider;
  status: SubscriptionStatus;
  planId: string;
  currentPeriodStart?: string;
  currentPeriodEnd?: string;
  cancelAtPeriodEnd?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CheckoutSessionOptions {
  planId?: string;
  billingInterval?: 'monthly' | 'annual';
  returnUrl?: string;
  cancelUrl?: string;
}

export interface CheckoutSessionResult {
  success: boolean;
  notConfigured: boolean;
  message: string;
  url?: string;
}

export interface SubscriptionStatusResult {
  subscription: PremiumSubscription | null;
  status: SubscriptionStatus;
  provider: PaymentProvider;
  isConfigured: boolean;
  message: string;
}

export interface CustomerPortalResult {
  success: boolean;
  notConfigured: boolean;
  message: string;
  url?: string;
}

export interface CancelSubscriptionResult {
  success: boolean;
  notConfigured: boolean;
  message: string;
}

// STRIPE PREPARATION TYPES (Phase 12B)
export interface StripeConfig {
  publishableKey?: string;
  isConfigured: boolean;
  currency?: string;
  mode?: 'test' | 'live';
}

export interface StripeCheckoutParams {
  userId: string;
  userEmail?: string;
  priceId?: string;
  successUrl?: string;
  cancelUrl?: string;
}

export interface PaymentProviderAdapter {
  readonly providerName: PaymentProvider;
  isConfigured(): boolean;
  getSubscriptionStatus(user?: UserProfile | null): Promise<SubscriptionStatusResult>;
  createCheckoutSession(user?: UserProfile | null, options?: CheckoutSessionOptions): Promise<CheckoutSessionResult>;
  cancelSubscription(user?: UserProfile | null): Promise<CancelSubscriptionResult>;
  openCustomerPortal(user?: UserProfile | null): Promise<CustomerPortalResult>;
}

export type LearningFeature = 'aiTeacher' | 'conversationPractice' | 'speakingPractice' | 'vocabulary';
export type UsageTrackableFeature = 'aiTeacher' | 'conversation' | 'speaking' | 'vocabulary';

export interface FeatureLimit {
  limit: number | 'unlimited';
  unit: string;
  description: string;
}

// DAILY USAGE TRACKING ENTITY
export interface DailyUsage {
  date: string; // YYYY-MM-DD
  aiTeacherMessages: number;
  conversationSessions: number;
  speakingPractices: number;
  vocabularyWords: number;
  userId?: string;
  updatedAt?: string;
}

// 1. USER PROFILE ENTITY
export interface UserProfile {
  id: string; // user ID
  userId?: string; // alias matching schema
  name: string;
  email: string;
  level: GermanLevel;
  germanLevel?: GermanLevel; // alias matching schema
  streakDays: number;
  learningStreak?: number; // alias matching schema
  xp: number;
  totalXp?: number; // alias matching schema
  dailyGoal?: number; // daily goal target
  dailyGoalLessons: number;
  dailyGoalMinutes: number;
  completedLessonsToday: number;
  studiedMinutesToday: number;
  wordsMasteredCount: number;
  wordsReviewCount: number;
  averageQuizScore: number;
  isPremium: boolean;
  plan?: MembershipPlan; // 'free' | 'premium'
  premiumSince?: string | null; // ISO date string when premium was activated
  avatarUrl?: string;
  createdAt?: string;
  createdDate?: string; // created date
}

// 2. LESSONS ENTITY
export interface Lesson {
  lessonId: string; // lesson ID
  id?: string; // alias for compatibility
  title: string;
  germanLevel: GermanLevel; // German level (A1, A2, B1, B2)
  level?: GermanLevel; // alias
  category: string;
  description: string;
  lessonContent: string | {
    dialogue?: { speaker: string; german: string; english: string }[];
    grammarNote?: string;
    keyPhrases?: { german: string; english: string }[];
    practicalTip?: string;
  };
  lessonOrder: number; // lesson order
}

// 3. VOCABULARY ENTITY
export interface Vocabulary {
  vocabularyId: string; // vocabulary ID
  id?: string; // alias
  germanWord: string; // German word
  englishMeaning: string; // English meaning
  exampleSentence: string; // example sentence
  exampleTranslation?: string; // English translation of example sentence
  germanLevel: GermanLevel; // German level (A1, A2, B1, B2)
  level?: GermanLevel; // alias
  category: string;
  pronunciation: string; // pronunciation phonetic guide
  article?: 'der' | 'die' | 'das';
  plural?: string;
}

// 4. QUIZZES ENTITY
export interface QuizQuestionItem {
  id: string;
  question: string;
  prompt?: string;
  contextGerman?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Quiz {
  quizId: string; // quiz ID
  id?: string; // alias
  title: string;
  germanLevel: GermanLevel; // German level (A1, A2, B1, B2)
  level?: GermanLevel; // alias
  questions: QuizQuestionItem[]; // questions
  correctAnswers: number[] | string[]; // correct answers (e.g. index array or values)
  category: string;
}

// 5. USER PROGRESS ENTITY
export type ProgressCompletionStatus = 'not_started' | 'in_progress' | 'completed';

export interface UserProgress {
  userId: string; // user ID
  lessonId: string; // lesson ID
  completionStatus: ProgressCompletionStatus; // completion status
  quizScore: number; // quiz score (0-100)
  vocabularyLearned: number | string[]; // vocabulary learned
  xpEarned: number; // XP earned
  lastActivity: string; // last activity ISO timestamp
}

// 6. DAILY GOALS ENTITY
export interface DailyGoal {
  userId: string; // user ID
  dailyTarget: number; // daily target (lessons or minutes)
  completedAmount: number; // completed amount
  date: string; // date 'YYYY-MM-DD'
}

// Existing UI Component Interfaces
export interface RealLifeCard {
  id: string;
  emoji: string;
  title: string;
  germanTitle: string;
  subtitle: string;
  level: GermanLevel;
  phrasesCount: number;
  keyPhrases: {
    german: string;
    english: string;
    phonetic?: string;
    usageNote?: string;
  }[];
  dialogue: {
    speaker: string;
    german: string;
    english: string;
  }[];
  cultureTip: string;
}

export interface VocabItem {
  id: string;
  article?: 'der' | 'die' | 'das';
  word: string;
  plural?: string;
  translation: string;
  category: 'Everyday' | 'Housing' | 'Bank' | 'Health' | 'Work' | 'Travel' | 'Food' | 'Bureaucracy';
  level: GermanLevel;
  exampleGerman: string;
  exampleEnglish: string;
  isMastered?: boolean;
}

export interface GrammarTopic {
  id: string;
  title: string;
  germanTitle: string;
  level: GermanLevel;
  summary: string;
  rules: {
    label: string;
    explanation: string;
    exampleGerman: string;
    exampleEnglish: string;
  }[];
  cheatSheetTable?: {
    headers: string[];
    rows: string[][];
  };
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  contextGerman?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: string;
}

export interface LessonUnit {
  id: string;
  level: GermanLevel;
  title: string;
  germanTitle: string;
  durationMinutes: number;
  completed: boolean;
  description: string;
  topics: string[];
}

export interface AIMessage {
  id: string;
  sender: 'user' | 'teacher';
  textGerman: string;
  textEnglish?: string;
  explanation?: string;
  grammarTip?: string;
  examples?: { german: string; english: string }[];
  correction?: {
    original: string;
    corrected: string;
    reason: string;
  };
  timestamp: string;
  vocabularyHighlights?: { german: string; meaning: string }[];
}

// Complete Beginner A1 German Course Types
export interface A1VocabularyItem {
  german: string;
  english: string;
  article?: 'der' | 'die' | 'das';
  pronunciation?: string;
  exampleSentence?: string;
  exampleTranslation?: string;
}

export interface A1DialogueLine {
  speaker: string;
  german: string;
  english: string;
}

export interface A1PracticeQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface A1UsefulPhrase {
  german: string;
  english: string;
  note?: string;
}

export interface A1Lesson {
  lessonNumber: number;
  id: string; // e.g. "a1_lesson_01"
  germanTitle: string;
  englishTitle: string;
  shortExplanation: string;
  vocabulary: A1VocabularyItem[];
  exampleSentences: { german: string; english: string }[];
  dialogue: A1DialogueLine[];
  grammarFocus: {
    title: string;
    explanation: string;
    rules?: { rule: string; example: string }[];
  };
  practiceQuestions: A1PracticeQuestion[]; // 5 practice questions
  usefulPhrases: A1UsefulPhrase[]; // 5 useful words/phrases
  xpReward: number;
}

// 12. CONVERSATION PRACTICE SCENARIOS
export interface ConversationPhrase {
  german: string;
  english: string;
}

export interface ConversationMessage {
  id: string;
  sender: 'partner' | 'user';
  germanText: string;
  englishHint?: string;
  correction?: string;
  timestamp: string;
}

export interface ConversationScenario {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  iconName: string;
  explanation: string;
  usefulPhrases: ConversationPhrase[];
  initialDialogue: {
    partnerName: string;
    partnerRole: string;
    partnerMessage: string;
    partnerEnglishHint: string;
  };
  sampleResponses: {
    partnerMessage: string;
    partnerEnglishHint: string;
  }[];
}

export interface SpeakingPhrase {
  id: string;
  german: string;
  english: string;
  phoneticHint?: string;
}

export interface SpeakingTopic {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  iconName: string;
  instruction: string;
  phrases: SpeakingPhrase[];
}

export interface SpeakingAIFeedback {
  understandable: string;
  grammarFeedback: string;
  wordOrderFeedback?: string;
  missingOrIncorrectWords?: string;
  correctedSentence: string;
  improvementTip: string;
  englishExplanation: string;
}
