import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  Firestore
} from 'firebase/firestore';
import { getApps } from 'firebase/app';
import {
  GermanLevel,
  UserProfile,
  Lesson,
  Vocabulary,
  Quiz,
  UserProgress,
  DailyGoal
} from '../types';
import { COMPREHENSIVE_VOCABULARY_BANK } from '../data/vocabularyData';
import { authService } from './authService';

// Read runtime environment variables
const env = (import.meta as any).env || {};
const firebaseApiKey = env.VITE_FIREBASE_API_KEY;
const firebaseProjectId = env.VITE_FIREBASE_PROJECT_ID;

// Firestore instance (Active only when Firebase configuration is provided)
let firestoreDb: Firestore | null = null;

if (firebaseApiKey && firebaseProjectId && getApps().length > 0) {
  try {
    firestoreDb = getFirestore();
  } catch (err) {
    console.warn('Firestore initialization notice:', err);
  }
}

// Local storage persistent fallback keys
const STORAGE_PREFIX = 'germanteacher_db_';
const STORAGE_KEY_PROGRESS = `${STORAGE_PREFIX}user_progress`;
const STORAGE_KEY_DAILY_GOALS = `${STORAGE_PREFIX}daily_goals`;
const STORAGE_KEY_CUSTOM_LESSONS = `${STORAGE_PREFIX}lessons`;

// ==========================================
// 2. SEED CURRICULUM LESSONS (A1 - B2)
// ==========================================
export const SEED_LESSONS: Lesson[] = [
  // Level A1
  {
    lessonId: 'les_a1_01',
    title: 'Lesson 1: Greetings & Saying Where You Are From',
    germanLevel: 'A1',
    category: 'Greetings & Introduction',
    description: 'Learn polite greetings, basic introductions, and how to state your home country and language.',
    lessonOrder: 1,
    lessonContent: {
      dialogue: [
        { speaker: 'Frau Schmidt', german: 'Guten Tag! Mein Name ist Anna Schmidt. Wie heißen Sie?', english: 'Good day! My name is Anna Schmidt. What is your name?' },
        { speaker: 'Alex', german: 'Freut mich! Ich heiße Alex Müller. Ich komme aus Großbritannien.', english: 'Pleased to meet you! My name is Alex Müller. I come from the UK.' },
        { speaker: 'Frau Schmidt', german: 'Sprechen Sie Deutsch?', english: 'Do you speak German?' },
        { speaker: 'Alex', german: 'Ein bisschen! Ich lerne gerade Deutsch an der Sprachschule.', english: 'A little! I am currently learning German at language school.' }
      ],
      grammarNote: 'Verbs conjugate depending on the subject: Ich heiße, Du heißt, Er/Sie/Es heißt, Wir heißen, Sie heißen (formal).',
      keyPhrases: [
        { german: 'Guten Tag / Hallo', english: 'Good day / Hello' },
        { german: 'Ich heiße...', english: 'My name is...' },
        { german: 'Ich komme aus...', english: 'I come from...' },
        { german: 'Wie geht es Ihnen?', english: 'How are you? (formal)' }
      ],
      practicalTip: 'In Germany, formal address ("Sie") is standard when meeting people in professional, service, or administrative settings.'
    }
  },
  {
    lessonId: 'les_a1_02',
    title: 'Lesson 2: Numbers, Money & Supermarket Checkout',
    germanLevel: 'A1',
    category: 'Daily Shopping',
    description: 'Master German counting (einundzwanzig!), paying in euros, asking for a receipt, and returning bottles (Pfand).',
    lessonOrder: 2,
    lessonContent: {
      dialogue: [
        { speaker: 'Kassierer(in)', german: 'Guten Tag! Das macht zusammen 18 Euro und 45 Cent.', english: 'Good day! That comes to 18 euros and 45 cents altogether.' },
        { speaker: 'Alex', german: 'Kann ich mit Karte kontaktlos zahlen?', english: 'Can I pay with card contactless?' },
        { speaker: 'Kassierer(in)', german: 'Ja, natürlich. Bitte auflegen... Brauchen Sie den Kassenbon?', english: 'Yes, of course. Please tap... Do you need the receipt?' },
        { speaker: 'Alex', german: 'Ja bitte, vielen Dank. Einen schönen Tag noch!', english: 'Yes please, thank you very much. Have a nice day!' }
      ],
      grammarNote: 'German numbers between 21 and 99 state the units before the tens: 24 is "vierundzwanzig" (four-and-twenty).',
      keyPhrases: [
        { german: 'Wie viel kostet das?', english: 'How much does that cost?' },
        { german: 'Zusammen oder getrennt?', english: 'Together or separately? (standard restaurant bill question)' },
        { german: 'Ich zahle mit Karte / bar.', english: 'I pay by card / in cash.' },
        { german: 'Stimmt so, danke!', english: 'Keep the change, thanks!' }
      ],
      practicalTip: 'Almost every beverage bottle and can in Germany has a refundable deposit (Pfand, typically 0.25€). Return them at supermarket machines!'
    }
  },
  {
    lessonId: 'les_a1_03',
    title: 'Lesson 3: Apartment Hunting & The Anmeldung Process',
    germanLevel: 'A1',
    category: 'Housing & Bureaucracy',
    description: 'Learn the vital vocabulary for flat viewings, lease contracts, and registering your address within 14 days.',
    lessonOrder: 3,
    lessonContent: {
      dialogue: [
        { speaker: 'Beamter', german: 'Guten Tag. Haben Sie Ihren Termin und Ihre Dokumente dabei?', english: 'Good day. Do you have your appointment and documents with you?' },
        { speaker: 'Alex', german: 'Ja, hier ist mein Reisepass und die Wohnungsgeberbestätigung vom Vermieter.', english: 'Yes, here is my passport and the landlord confirmation from my landlord.' },
        { speaker: 'Beamter', german: 'Sehr gut. Hier ist Ihre Meldebestätigung. Bewahren Sie diese sorgfältig auf.', english: 'Very good. Here is your registration certificate. Keep this carefully.' }
      ],
      grammarNote: 'Compound nouns take the gender of the last word: die Wohnung + die Bestätigung = die Wohnungsbestätigung.',
      keyPhrases: [
        { german: 'Ich möchte mich anmelden.', english: 'I would like to register my residence.' },
        { german: 'Wie hoch ist die Warmmiete?', english: 'How high is the warm rent (including utilities)?' },
        { german: 'Hier ist die Mietkaution.', english: 'Here is the rental security deposit.' }
      ],
      practicalTip: 'Your Meldebestätigung is required to open a German bank account, obtain a tax ID (Steuer-ID), and sign a mobile contract.'
    }
  },
  {
    lessonId: 'les_a1_04',
    title: 'Lesson 4: Ordering at a German Bakery & Restaurant',
    germanLevel: 'A1',
    category: 'Food & Dining',
    description: 'Order fresh bread rolls, pretzels, ask for the daily special, and handle table service etiquette in German.',
    lessonOrder: 4,
    lessonContent: {
      dialogue: [
        { speaker: 'Bäcker(in)', german: 'Guten Morgen! Was darf es sein?', english: 'Good morning! What can I get for you?' },
        { speaker: 'Alex', german: 'Ich hätte gern zwei Brötchen und eine Laugenbrezel, bitte.', english: 'I would like two bread rolls and one pretzel, please.' },
        { speaker: 'Bäcker(in)', german: 'Darf es sonst noch etwas sein?', english: 'Can I get you anything else?' },
        { speaker: 'Alex', german: 'Nein danke, das ist alles.', english: 'No thank you, that is all.' }
      ],
      grammarNote: '"Ich hätte gern..." (I would like to have...) is the polite subjunctive expression for ordering food and drinks.',
      keyPhrases: [
        { german: 'Ich möchte bitte einen Kaffee.', english: 'I would like a coffee, please.' },
        { german: 'Haben Sie ein vegetarisches Gericht?', english: 'Do you have a vegetarian dish?' },
        { german: 'Wir möchten bitte zahlen.', english: 'We would like to pay, please.' }
      ],
      practicalTip: 'Tipping 5% to 10% by rounding up to the nearest euro is polite and customary in German cafés and restaurants.'
    }
  },

  // Level A2
  {
    lessonId: 'les_a2_01',
    title: 'Lesson 5: Visiting the Doctor & Pharmacy Essentials',
    germanLevel: 'A2',
    category: 'Health & Medical',
    description: 'Learn to describe health symptoms, make an appointment with a Hausarzt, and pick up medications.',
    lessonOrder: 5,
    lessonContent: {
      dialogue: [
        { speaker: 'Arzthelfer(in)', german: 'Praxis Dr. Weber, guten Tag. Wie kann ich Ihnen helfen?', english: 'Practice Dr. Weber, good day. How can I help you?' },
        { speaker: 'Alex', german: 'Guten Tag. Ich fühle mich seit zwei Tagen krank und habe hohes Fieber.', english: 'Good day. I have been feeling sick for two days and have a high fever.' },
        { speaker: 'Arzthelfer(in)', german: 'Kommen Sie bitte heute um elf Uhr in unsere Notfallsprechstunde.', english: 'Please come today at 11:00 AM to our acute emergency walk-in hour.' }
      ],
      grammarNote: 'Express physical pains using "Ich habe [Körperteil]schmerzen" or "Mein [Körperteil] tut weh".',
      keyPhrases: [
        { german: 'Ich brauche eine Krankschreibung für meinen Arbeitgeber.', english: 'I need a sick leave certificate (AU-Bescheinigung) for my employer.' },
        { german: 'Haben Sie meine Versichertenkarte?', english: 'Do you have my health insurance card?' },
        { german: 'Gibt es dieses Medikament rezeptfrei?', english: 'Is this medication available over-the-counter?' }
      ],
      practicalTip: 'In Germany, if you miss more than 3 days of work due to illness, you must present a medical sick note (Arbeitsunfähigkeitsbescheinigung).'
    }
  },
  {
    lessonId: 'les_a2_02',
    title: 'Lesson 6: Navigating Deutsche Bahn & Public Transport',
    germanLevel: 'A2',
    category: 'Travel & Mobility',
    description: 'Understand train announcements, ticket validation, track changes (Gleiswechsel), and delays (Verspätung).',
    lessonOrder: 6,
    lessonContent: {
      dialogue: [
        { speaker: 'Lautsprecher', german: 'Achtung an Gleis vier: ICE 518 nach Berlin Hauptbahnhof fährt ein.', english: 'Attention on platform four: ICE 518 to Berlin Central Station is arriving.' },
        { speaker: 'Alex', german: 'Entschuldigung, hält dieser Zug auch in Hannover?', english: 'Excuse me, does this train also stop in Hanover?' },
        { speaker: 'Zugbegleiter', german: 'Ja, Hannover ist der nächste Halt. Bitte steigen Sie ein.', english: 'Yes, Hanover is the next stop. Please step aboard.' }
      ],
      grammarNote: 'Separable verbs split in present tense: "einsteigen" -> "Ich steige in den Zug ein."',
      keyPhrases: [
        { german: 'Von welchem Gleis fährt der Zug ab?', english: 'From which platform does the train depart?' },
        { german: 'Der Zug hat zehn Minuten Verspätung.', english: 'The train has a 10-minute delay.' },
        { german: 'Muss ich umsteigen?', english: 'Do I need to transfer/change trains?' }
      ],
      practicalTip: 'Always check if regional train tickets require validation (Entwerten) in the red/yellow stamper boxes before stepping onto the platform.'
    }
  },

  // Level B1
  {
    lessonId: 'les_b1_01',
    title: 'Lesson 7: Job Interviews & Workplace Communication',
    germanLevel: 'B1',
    category: 'Career & Work',
    description: 'Navigate professional German interviews, talk about career qualifications, and understand employment terminology.',
    lessonOrder: 7,
    lessonContent: {
      dialogue: [
        { speaker: 'Interviewer', german: 'Können Sie uns Ihren bisherigen beruflichen Werdegang kurz zusammenfassen?', english: 'Could you briefly summarize your career background so far?' },
        { speaker: 'Alex', german: 'Sehr gerne. Nach meinem Studium habe ich drei Jahre im Bereich Softwareentwicklung gearbeitet.', english: 'With pleasure. After my studies, I worked for three years in software development.' },
        { speaker: 'Interviewer', german: 'Warum möchten Sie genau bei unserem Unternehmen arbeiten?', english: 'Why do you want to work at our company in particular?' }
      ],
      grammarNote: 'Use connectors like "obwohl" (although), "während" (while), and "deshalb" (therefore) to structure coherent professional arguments.',
      keyPhrases: [
        { german: 'Ich verfüge über mehrjährige Erfahrung in...', english: 'I possess several years of experience in...' },
        { german: 'Zu meinen Stärken gehört lösungsorientiertes Denken.', english: 'Among my strengths is solution-oriented thinking.' },
        { german: 'Wann kann ich mit einer Rückmeldung rechnen?', english: 'When can I expect feedback / a response?' }
      ],
      practicalTip: 'Punctuality is strictly expected in Germany; arriving 5 to 10 minutes prior to a scheduled meeting is considered on time.'
    }
  },
  {
    lessonId: 'les_b1_02',
    title: 'Lesson 8: Handling German Bureaucracy & Taxes',
    germanLevel: 'B1',
    category: 'Bureaucracy & Finances',
    description: 'Understand the tax class system (Steuerklasse), pension contributions, and dealing with official notifications.',
    lessonOrder: 8,
    lessonContent: {
      dialogue: [
        { speaker: 'Finanzbeamter', german: 'Sie haben einen Antrag auf Steuerklassenwechsel eingereicht.', english: 'You have submitted an application for changing tax bracket.' },
        { speaker: 'Alex', german: 'Richtig, da ich kürzlich geheiratet habe, möchten wir die Klassen drei und fünf wählen.', english: 'Correct, as I recently got married, we would like to choose brackets three and five.' },
        { speaker: 'Finanzbeamter', german: 'Das Formular ist vollständig. Der Bescheid geht Ihnen schriftlich zu.', english: 'The form is complete. The notice will be sent to you in writing.' }
      ],
      grammarNote: 'Passive voice with "werden": "Der Bescheid wird vom Amt zugestellt" (The assessment is delivered by the authority).',
      keyPhrases: [
        { german: 'Ich muss eine Steuererklärung einreichen.', english: 'I have to submit a tax return.' },
        { german: 'Gegen diesen Bescheid lege ich Einspruch ein.', english: 'I file an objection against this assessment.' },
        { german: 'Hier ist meine Steueridentifikationsnummer.', english: 'Here is my tax identification number.' }
      ],
      practicalTip: 'Keep all official written notices (Bescheide) from authorities in a physical file binder (Ordner)—this is standard German practice!'
    }
  },

  // Level B2
  {
    lessonId: 'les_b2_01',
    title: 'Lesson 9: Nuanced Discussion & Subjunctive II (Konjunktiv II)',
    germanLevel: 'B2',
    category: 'Advanced Fluency',
    description: 'Express hypothetical scenarios, tactful diplomatic suggestions, and evaluate competing arguments with precision.',
    lessonOrder: 9,
    lessonContent: {
      dialogue: [
        { speaker: 'Kollegin', german: 'Wenn wir das Budget erhöhen würden, könnten wir das Projekt schneller abschließen.', english: 'If we were to increase the budget, we could finalize the project faster.' },
        { speaker: 'Alex', german: 'Ich stimme Ihnen grundsätzlich zu, allerdings sollten wir die Risiken sorgfältig abwägen.', english: 'I agree with you in principle, however we ought to weigh the risks carefully.' },
        { speaker: 'Kollegin', german: 'Welche alternative Vorgehensweise würden Sie stattdessen vorschlagen?', english: 'What alternative course of action would you propose instead?' }
      ],
      grammarNote: 'Konjunktiv II expresses politeness, wishes, and unreal conditions: "hätte", "wäre", "würde + Infinitiv".',
      keyPhrases: [
        { german: 'Es wäre ratsam, wenn wir...', english: 'It would be advisable if we...' },
        { german: 'Ich vertrete den Standpunkt, dass...', english: 'I take the standpoint that...' },
        { german: 'Einerseits... andererseits...', english: 'On the one hand... on the other hand...' }
      ],
      practicalTip: 'In B2 meetings, direct disagreement is softened with "Ich sehe das etwas anders" rather than blunt negation.'
    }
  },
  {
    lessonId: 'les_b2_02',
    title: 'Lesson 10: Legal Contracts, Tenancy Rights & Formal Inquiries',
    germanLevel: 'B2',
    category: 'Legal & Advanced Professional',
    description: 'Interpret rental lease clauses, notice periods (Kündigungsfrist), and formulate binding formal written correspondence.',
    lessonOrder: 10,
    lessonContent: {
      dialogue: [
        { speaker: 'Rechtsberater', german: 'Gemäß § 573c BGB beträgt die Kündigungsfrist für Wohnraum drei Monate.', english: 'Pursuant to Section 573c BGB, the statutory notice period for living space is three months.' },
        { speaker: 'Alex', german: 'Ist eine Kündigung per E-Mail in diesem Fall rechtswirksam?', english: 'Is termination via email legally effective in this instance?' },
        { speaker: 'Rechtsberater', german: 'Nein, das Mietrecht verlangt ausnahmslos die strenge Schriftform mit Originalunterschrift.', english: 'No, tenancy law strictly requires written form with original handwritten signature without exception.' }
      ],
      grammarNote: 'Participle constructions: "Die von beiden Parteien unterzeichnete Vereinbarung..." (The agreement signed by both parties...).',
      keyPhrases: [
        { german: 'Hiermit kündige ich das bestehende Mietverhältnis fristgerecht zum...', english: 'I hereby terminate the existing tenancy agreement in due time as of...' },
        { german: 'Ich bitte um eine schriftliche Bestätigung.', english: 'I request written confirmation.' },
        { german: 'Die Betriebskostenabrechnung weist Unstimmigkeiten auf.', english: 'The utility cost calculation exhibits discrepancies.' }
      ],
      practicalTip: 'Important legal notices in Germany should always be sent via "Einwurf-Einschreiben" (registered mail with delivery certificate).'
    }
  }
];

// ==========================================
// 3. SEED VOCABULARY BANK (A1 - B2)
// ==========================================
export const SEED_VOCABULARY: Vocabulary[] = COMPREHENSIVE_VOCABULARY_BANK;

// ==========================================
// 4. SEED PRACTICE QUIZZES (A1 - B2)
// ==========================================
export const SEED_QUIZZES: Quiz[] = [
  {
    quizId: 'quiz_a1_articles',
    title: 'A1 German Articles & Gender Practice',
    germanLevel: 'A1',
    category: 'Grammar & Articles',
    questions: [
      {
        id: 'q_a1_1',
        question: 'Which definite article is correct for "Wohnung" (apartment)?',
        prompt: 'Ich suche ___ günstige Wohnung in Köln.',
        options: ['der', 'die', 'das', 'den'],
        correctIndex: 1,
        explanation: 'All German nouns ending in the suffix "-ung" are feminine: "die Wohnung".'
      },
      {
        id: 'q_a1_2',
        question: 'What is the correct article for "Bürgeramt"?',
        prompt: 'Ich muss heute zum ___ Bürgeramt.',
        options: ['der', 'die', 'das', 'den'],
        correctIndex: 2,
        explanation: '"Das Amt" is neuter, so "das Bürgeramt" takes neuter article.'
      },
      {
        id: 'q_a1_3',
        question: 'Choose the correct form of "sein" for "Wir":',
        prompt: 'Wir ___ seit drei Monaten in Deutschland.',
        options: ['bin', 'bist', 'ist', 'sind'],
        correctIndex: 3,
        explanation: 'Conjugation of sein: ich bin, du bist, er ist, wir sind, ihr seid, sie sind.'
      }
    ],
    correctAnswers: [1, 2, 3]
  },
  {
    quizId: 'quiz_a2_everyday',
    title: 'A2 Everyday Situations & Modal Verbs',
    germanLevel: 'A2',
    category: 'Practical German',
    questions: [
      {
        id: 'q_a2_1',
        question: 'You are visiting the doctor with throat pain. What is the natural German expression?',
        prompt: 'Beim Hausarzt:',
        options: [
          'Ich habe Halsschmerzen.',
          'Mein Hals ist verboten.',
          'Ich mache Halsschmerzen.',
          'Ich will meinen Hals krank.'
        ],
        correctIndex: 0,
        explanation: '"Ich habe Halsschmerzen" is standard German for "I have a sore throat".'
      },
      {
        id: 'q_a2_2',
        question: 'How do you tell a restaurant waiter to keep the change when paying?',
        prompt: 'Rechnung ist 18,50€, du gibst 20€:',
        options: [
          'Stimmt so, vielen Dank!',
          'Geld ist weg!',
          'Nehmen Sie alles.',
          'Auf Wiedersehen bitte.'
        ],
        correctIndex: 0,
        explanation: '"Stimmt so!" (keep the change / that is correct) is the universal etiquette in Germany.'
      },
      {
        id: 'q_a2_3',
        question: 'Where does the separable prefix go in present tense: "anrufen" (to call)?',
        prompt: 'Ich ___ morgen bei der Bank ___.',
        options: [
          'anrufe / an',
          'rufe / an',
          'an / rufe',
          'gerufen / an'
        ],
        correctIndex: 1,
        explanation: 'Separable prefix "an-" detaches and moves to the very end: "Ich rufe [...] an".'
      }
    ],
    correctAnswers: [0, 0, 1]
  },
  {
    quizId: 'quiz_b1_clauses',
    title: 'B1 Subordinate Clauses & Conjunctions',
    germanLevel: 'B1',
    category: 'Sentence Structure',
    questions: [
      {
        id: 'q_b1_1',
        question: 'Where does the conjugated verb go after "weil" (because)?',
        prompt: 'Ich lerne Deutsch, weil ich in Deutschland ___ (leben).',
        options: [
          'Am Satzanfang (Position 1)',
          'Direkt nach weil (Position 2)',
          'Ganz am Ende des Nebensatzes (lebe)',
          'Frei wählbar'
        ],
        correctIndex: 2,
        explanation: '"Weil" is a subordinating conjunction (Kausalsatz) and sends the conjugated verb to the end.'
      },
      {
        id: 'q_b1_2',
        question: 'Choose the correct passive voice construction:',
        prompt: 'Der Vertrag ___ von beiden Parteien unterschrieben.',
        options: ['wird', 'macht', 'ist geworden', 'tut'],
        correctIndex: 0,
        explanation: 'Vorgangspassiv uses "werden + Partizip II": "Der Vertrag wird unterschrieben".'
      }
    ],
    correctAnswers: [2, 0]
  },
  {
    quizId: 'quiz_b2_advanced',
    title: 'B2 Nuanced Language & Konjunktiv II',
    germanLevel: 'B2',
    category: 'Advanced Grammar',
    questions: [
      {
        id: 'q_b2_1',
        question: 'Choose the polite subjunctive suggestion:',
        prompt: 'Wie formulieren Sie einen diplomatischen Vorschlag?',
        options: [
          'Es wäre ratsam, die Angelegenheit vorher zu prüfen.',
          'Sie müssen sofort prüfen.',
          'Ich befehle die Prüfung.',
          'Warum prüfen Sie nicht?'
        ],
        correctIndex: 0,
        explanation: '"Es wäre ratsam..." uses Konjunktiv II for sophisticated, polite diplomacy.'
      },
      {
        id: 'q_b2_2',
        question: 'Complete the correlative conjunction: "Einerseits haben wir Vorteile, ___ ..."',
        prompt: 'Zweiteilige Konnektoren:',
        options: ['andererseits', 'obwohl', 'weil', 'sondern'],
        correctIndex: 0,
        explanation: '"Einerseits... andererseits" is the classic two-part connector for weighing arguments.'
      }
    ],
    correctAnswers: [0, 0]
  }
];

// Helper to get local storage progress map
function getLocalProgressStore(): Record<string, UserProgress> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROGRESS);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveLocalProgressStore(store: Record<string, UserProgress>): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(store));
  } catch (err) {
    console.error('Failed to save progress locally:', err);
  }
}

// Helper to get local daily goals map
function getLocalGoalsStore(): Record<string, DailyGoal> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY_DAILY_GOALS);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveLocalGoalsStore(store: Record<string, DailyGoal>): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_DAILY_GOALS, JSON.stringify(store));
  } catch (err) {
    console.error('Failed to save daily goals locally:', err);
  }
}

// ==========================================
// LEARNING DATABASE SERVICE
// ==========================================
export const learningDatabase = {
  /**
   * Returns true if Firestore backend is actively initialized
   */
  isFirestoreAvailable(): boolean {
    return firestoreDb !== null;
  },

  // -------------------------------------------------------------
  // 1. USER PROFILE
  // -------------------------------------------------------------
  async getUserProfile(userId: string): Promise<UserProfile | null> {
    if (!userId) return null;

    if (firestoreDb) {
      try {
        const userDocRef = doc(firestoreDb, 'users', userId);
        const snapshot = await getDoc(userDocRef);
        if (snapshot.exists()) {
          return snapshot.data() as UserProfile;
        }
      } catch (err) {
        console.warn('Firestore getUserProfile error, falling back to local:', err);
      }
    }

    // Local persistent storage fallback
    const raw = localStorage.getItem('germanteacher_registered_accounts');
    if (raw) {
      try {
        const accounts = JSON.parse(raw);
        const acc = accounts.find((a: any) => a.id === userId || a.userId === userId);
        if (acc) {
          return {
            id: acc.id || acc.userId,
            userId: acc.id || acc.userId,
            name: acc.name,
            email: acc.email,
            level: acc.level || acc.germanLevel || 'A1',
            germanLevel: acc.level || acc.germanLevel || 'A1',
            streakDays: acc.streakDays || acc.learningStreak || 1,
            learningStreak: acc.streakDays || acc.learningStreak || 1,
            xp: acc.xp || acc.totalXp || 0,
            totalXp: acc.xp || acc.totalXp || 0,
            dailyGoal: acc.dailyGoal || acc.dailyGoalLessons || 5,
            dailyGoalLessons: acc.dailyGoalLessons || acc.dailyGoal || 5,
            dailyGoalMinutes: acc.dailyGoalMinutes || 20,
            completedLessonsToday: acc.completedLessonsToday || 0,
            studiedMinutesToday: acc.studiedMinutesToday || 0,
            wordsMasteredCount: acc.wordsMasteredCount || 0,
            wordsReviewCount: acc.wordsReviewCount || 0,
            averageQuizScore: acc.averageQuizScore || 90,
            isPremium: false,
            createdAt: acc.createdAt || acc.createdDate || new Date().toISOString(),
            createdDate: acc.createdAt || acc.createdDate || new Date().toISOString()
          };
        }
      } catch {}
    }
    return null;
  },

  async updateUserProfile(userId: string, partial: Partial<UserProfile>): Promise<boolean> {
    if (!userId) return false;

    if (firestoreDb) {
      try {
        const userDocRef = doc(firestoreDb, 'users', userId);
        await setDoc(userDocRef, partial, { merge: true });
        return true;
      } catch (err) {
        console.warn('Firestore updateUserProfile error, saving locally:', err);
      }
    }

    // Local fallback
    const raw = localStorage.getItem('germanteacher_registered_accounts');
    if (raw) {
      try {
        const accounts = JSON.parse(raw);
        const idx = accounts.findIndex((a: any) => a.id === userId || a.userId === userId);
        if (idx !== -1) {
          accounts[idx] = { ...accounts[idx], ...partial };
          localStorage.setItem('germanteacher_registered_accounts', JSON.stringify(accounts));
          return true;
        }
      } catch {}
    }
    return false;
  },

  // -------------------------------------------------------------
  // 2. LESSONS
  // -------------------------------------------------------------
  async getLessons(level?: GermanLevel): Promise<Lesson[]> {
    if (firestoreDb) {
      try {
        const lessonsRef = collection(firestoreDb, 'lessons');
        const q = level 
          ? query(lessonsRef, where('germanLevel', '==', level), orderBy('lessonOrder', 'asc'))
          : query(lessonsRef, orderBy('lessonOrder', 'asc'));
        
        const snap = await getDocs(q);
        if (!snap.empty) {
          return snap.docs.map(d => d.data() as Lesson);
        }
      } catch (err) {
        console.warn('Firestore getLessons error, falling back to seed lessons:', err);
      }
    }

    if (level) {
      return SEED_LESSONS.filter(l => l.germanLevel === level);
    }
    return SEED_LESSONS;
  },

  async getLessonById(lessonId: string): Promise<Lesson | null> {
    if (firestoreDb) {
      try {
        const ref = doc(firestoreDb, 'lessons', lessonId);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          return snap.data() as Lesson;
        }
      } catch (err) {
        console.warn('Firestore getLessonById fallback to seed:', err);
      }
    }

    return SEED_LESSONS.find(l => l.lessonId === lessonId) || null;
  },

  // -------------------------------------------------------------
  // 3. VOCABULARY
  // -------------------------------------------------------------
  async getVocabulary(level?: GermanLevel, category?: string): Promise<Vocabulary[]> {
    if (firestoreDb) {
      try {
        const vocabRef = collection(firestoreDb, 'vocabulary');
        let q = query(vocabRef);
        if (level && category) {
          q = query(vocabRef, where('germanLevel', '==', level), where('category', '==', category));
        } else if (level) {
          q = query(vocabRef, where('germanLevel', '==', level));
        } else if (category) {
          q = query(vocabRef, where('category', '==', category));
        }

        const snap = await getDocs(q);
        if (!snap.empty) {
          return snap.docs.map(d => d.data() as Vocabulary);
        }
      } catch (err) {
        console.warn('Firestore getVocabulary fallback to seed:', err);
      }
    }

    return SEED_VOCABULARY.filter(item => {
      if (level && item.germanLevel !== level) return false;
      if (category && item.category !== category) return false;
      return true;
    });
  },

  async getVocabularyById(vocabId: string): Promise<Vocabulary | null> {
    return SEED_VOCABULARY.find(v => v.vocabularyId === vocabId) || null;
  },

  /**
   * Get user's vocabulary learning records: known words and review words
   */
  async getUserVocabProgress(userId: string): Promise<{ knownWordIds: string[]; reviewWordIds: string[] }> {
    const defaultRes = { knownWordIds: [] as string[], reviewWordIds: [] as string[] };
    if (!userId) return defaultRes;

    if (firestoreDb) {
      try {
        const ref = doc(firestoreDb, 'users', userId, 'vocabProgress', 'status');
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = snap.data();
          return {
            knownWordIds: Array.isArray(data.knownWordIds) ? data.knownWordIds : [],
            reviewWordIds: Array.isArray(data.reviewWordIds) ? data.reviewWordIds : []
          };
        }
      } catch (err) {
        console.warn('Firestore getUserVocabProgress fallback:', err);
      }
    }

    try {
      const raw = localStorage.getItem(`germanteacher_vocab_progress_${userId}`);
      if (raw) {
        const parsed = JSON.parse(raw);
        return {
          knownWordIds: Array.isArray(parsed.knownWordIds) ? parsed.knownWordIds : [],
          reviewWordIds: Array.isArray(parsed.reviewWordIds) ? parsed.reviewWordIds : []
        };
      }
    } catch {}

    return defaultRes;
  },

  /**
   * Mark a vocabulary word as "I know this"
   * Awards +5 XP if newly learned, updates Daily Goal, and updates User Profile
   */
  async markWordKnown(
    userId: string,
    vocabId: string
  ): Promise<{ isNewWord: boolean; xpAwarded: number; knownCount: number; reviewCount: number }> {
    const current = await this.getUserVocabProgress(userId);
    const knownSet = new Set(current.knownWordIds);
    const reviewSet = new Set(current.reviewWordIds);

    const isNewWord = !knownSet.has(vocabId);
    knownSet.add(vocabId);
    reviewSet.delete(vocabId);

    const updated = {
      knownWordIds: Array.from(knownSet),
      reviewWordIds: Array.from(reviewSet)
    };

    // Save to Firestore if available
    if (firestoreDb && userId) {
      try {
        const ref = doc(firestoreDb, 'users', userId, 'vocabProgress', 'status');
        await setDoc(ref, {
          ...updated,
          lastUpdated: new Date().toISOString()
        }, { merge: true });
      } catch (err) {
        console.warn('Firestore markWordKnown warning:', err);
      }
    }

    // Save to LocalStorage
    if (userId) {
      try {
        localStorage.setItem(`germanteacher_vocab_progress_${userId}`, JSON.stringify(updated));
      } catch {}
    }

    // Award +5 XP if it was newly learned
    let xpAwarded = 0;
    if (isNewWord) {
      xpAwarded = 5;
      authService.addXp(5);

      // Update wordsMasteredCount in UserProfile
      authService.updateUserProfile({
        wordsMasteredCount: updated.knownWordIds.length,
        wordsReviewCount: updated.reviewWordIds.length
      });

      // Update Daily Goal (increment completedAmount)
      try {
        const todayGoal = await this.getDailyGoal(userId);
        await this.updateDailyGoal(userId, todayGoal.completedAmount + 1);
      } catch {}
    }

    return {
      isNewWord,
      xpAwarded,
      knownCount: updated.knownWordIds.length,
      reviewCount: updated.reviewWordIds.length
    };
  },

  /**
   * Mark a vocabulary word as "Practice again"
   */
  async markWordReview(
    userId: string,
    vocabId: string
  ): Promise<{ knownCount: number; reviewCount: number }> {
    const current = await this.getUserVocabProgress(userId);
    const knownSet = new Set(current.knownWordIds);
    const reviewSet = new Set(current.reviewWordIds);

    knownSet.delete(vocabId);
    reviewSet.add(vocabId);

    const updated = {
      knownWordIds: Array.from(knownSet),
      reviewWordIds: Array.from(reviewSet)
    };

    // Save to Firestore if available
    if (firestoreDb && userId) {
      try {
        const ref = doc(firestoreDb, 'users', userId, 'vocabProgress', 'status');
        await setDoc(ref, {
          ...updated,
          lastUpdated: new Date().toISOString()
        }, { merge: true });
      } catch (err) {
        console.warn('Firestore markWordReview warning:', err);
      }
    }

    // Save to LocalStorage
    if (userId) {
      try {
        localStorage.setItem(`germanteacher_vocab_progress_${userId}`, JSON.stringify(updated));
      } catch {}

      authService.updateUserProfile({
        wordsMasteredCount: updated.knownWordIds.length,
        wordsReviewCount: updated.reviewWordIds.length
      });
    }

    return {
      knownCount: updated.knownWordIds.length,
      reviewCount: updated.reviewWordIds.length
    };
  },

  // -------------------------------------------------------------
  // 4. QUIZZES
  // -------------------------------------------------------------
  async getQuizzes(level?: GermanLevel, category?: string): Promise<Quiz[]> {
    if (firestoreDb) {
      try {
        const quizzesRef = collection(firestoreDb, 'quizzes');
        let q = query(quizzesRef);
        if (level) {
          q = query(quizzesRef, where('germanLevel', '==', level));
        }
        const snap = await getDocs(q);
        if (!snap.empty) {
          return snap.docs.map(d => d.data() as Quiz);
        }
      } catch (err) {
        console.warn('Firestore getQuizzes fallback to seed:', err);
      }
    }

    return SEED_QUIZZES.filter(quiz => {
      if (level && quiz.germanLevel !== level) return false;
      if (category && quiz.category !== category) return false;
      return true;
    });
  },

  async getQuizById(quizId: string): Promise<Quiz | null> {
    return SEED_QUIZZES.find(q => q.quizId === quizId) || null;
  },

  // -------------------------------------------------------------
  // 5. USER PROGRESS (Private to each user)
  // -------------------------------------------------------------
  async getUserProgress(userId: string): Promise<Record<string, UserProgress>> {
    if (!userId) return {};

    if (firestoreDb) {
      try {
        const progressColRef = collection(firestoreDb, 'users', userId, 'progress');
        const snap = await getDocs(progressColRef);
        const map: Record<string, UserProgress> = {};
        snap.forEach(docSnap => {
          map[docSnap.id] = docSnap.data() as UserProgress;
        });
        if (Object.keys(map).length > 0) {
          return map;
        }
      } catch (err) {
        console.warn('Firestore getUserProgress fallback to local:', err);
      }
    }

    // Local storage fallback for this specific user
    const all = getLocalProgressStore();
    const userProgressMap: Record<string, UserProgress> = {};
    Object.keys(all).forEach(key => {
      if (all[key].userId === userId) {
        userProgressMap[all[key].lessonId] = all[key];
      }
    });

    // Provide default initial progress if empty so student sees active curriculum state
    if (Object.keys(userProgressMap).length === 0) {
      const defaultProgressList: UserProgress[] = [
        {
          userId,
          lessonId: 'les_a1_01',
          completionStatus: 'completed',
          quizScore: 100,
          vocabularyLearned: 15,
          xpEarned: 50,
          lastActivity: new Date().toISOString()
        },
        {
          userId,
          lessonId: 'les_a1_02',
          completionStatus: 'completed',
          quizScore: 90,
          vocabularyLearned: 18,
          xpEarned: 50,
          lastActivity: new Date().toISOString()
        },
        {
          userId,
          lessonId: 'les_a1_03',
          completionStatus: 'in_progress',
          quizScore: 0,
          vocabularyLearned: 8,
          xpEarned: 20,
          lastActivity: new Date().toISOString()
        }
      ];

      defaultProgressList.forEach(p => {
        userProgressMap[p.lessonId] = p;
        all[`${userId}_${p.lessonId}`] = p;
      });
      saveLocalProgressStore(all);
    }

    return userProgressMap;
  },

  async saveUserProgress(progress: UserProgress): Promise<boolean> {
    if (!progress.userId || !progress.lessonId) return false;

    // 1. Firebase Firestore write under private subcollection
    if (firestoreDb) {
      try {
        const docRef = doc(firestoreDb, 'users', progress.userId, 'progress', progress.lessonId);
        await setDoc(docRef, {
          ...progress,
          lastActivity: new Date().toISOString()
        }, { merge: true });
      } catch (err) {
        console.warn('Firestore saveUserProgress warning:', err);
      }
    }

    // 2. Local storage persistent storage
    const all = getLocalProgressStore();
    const key = `${progress.userId}_${progress.lessonId}`;
    all[key] = {
      ...progress,
      lastActivity: new Date().toISOString()
    };
    saveLocalProgressStore(all);
    return true;
  },

  // -------------------------------------------------------------
  // 6. DAILY GOALS (Private to each user)
  // -------------------------------------------------------------
  async getDailyGoal(userId: string, dateStr?: string): Promise<DailyGoal> {
    const today = dateStr || new Date().toISOString().split('T')[0];
    const defaultGoal: DailyGoal = {
      userId,
      dailyTarget: 5,
      completedAmount: 3,
      date: today
    };

    if (!userId) return defaultGoal;

    if (firestoreDb) {
      try {
        const goalRef = doc(firestoreDb, 'users', userId, 'dailyGoals', today);
        const snap = await getDoc(goalRef);
        if (snap.exists()) {
          return snap.data() as DailyGoal;
        }
      } catch (err) {
        console.warn('Firestore getDailyGoal fallback to local:', err);
      }
    }

    const all = getLocalGoalsStore();
    const key = `${userId}_${today}`;
    if (all[key]) {
      return all[key];
    }

    all[key] = defaultGoal;
    saveLocalGoalsStore(all);
    return defaultGoal;
  },

  async updateDailyGoal(
    userId: string,
    completedAmount: number,
    dailyTarget?: number,
    dateStr?: string
  ): Promise<boolean> {
    if (!userId) return false;
    const today = dateStr || new Date().toISOString().split('T')[0];

    const current = await this.getDailyGoal(userId, today);
    const updated: DailyGoal = {
      userId,
      date: today,
      dailyTarget: dailyTarget !== undefined ? dailyTarget : current.dailyTarget,
      completedAmount
    };

    if (firestoreDb) {
      try {
        const goalRef = doc(firestoreDb, 'users', userId, 'dailyGoals', today);
        await setDoc(goalRef, updated, { merge: true });
      } catch (err) {
        console.warn('Firestore updateDailyGoal warning:', err);
      }
    }

    const all = getLocalGoalsStore();
    all[`${userId}_${today}`] = updated;
    saveLocalGoalsStore(all);
    return true;
  }
};
