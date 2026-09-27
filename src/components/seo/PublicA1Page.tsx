import React from 'react';
import { useSEO } from './useSEO';
import { PublicSEOPageLayout } from './PublicSEOPageLayout';
import { SpeakButton } from './SpeakButton';
import { NavSection } from '../Navbar';
import { 
  BookOpen, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  HelpCircle, 
  ArrowRight,
  MessageSquare
} from 'lucide-react';

interface PublicA1PageProps {
  onNavigate: (section: NavSection) => void;
  onGetStarted: () => void;
  onLogin: () => void;
}

export const PublicA1Page: React.FC<PublicA1PageProps> = ({
  onNavigate,
  onGetStarted,
  onLogin
}) => {
  useSEO({
    title: 'Learn German A1 – Beginner Course, Grammar & Vocabulary | German Teacher',
    description: 'Learn German A1 from scratch. Master essential greetings, numbers, family, shopping, restaurants, public transport, university, and everyday life in Germany.',
    canonicalUrl: 'https://germanteacher.store/learn-german-a1',
    ogTitle: 'Learn German A1 – Beginner Course, Grammar & Vocabulary',
    ogDescription: 'Practical German A1 guide covering core beginner vocabulary, daily dialogues, essential grammar rules, and audio pronunciation.'
  });

  const a1Modules = [
    {
      id: 'greetings',
      number: '01',
      title: 'Begrüßung & Kennenlernen',
      subtitle: 'Greetings, Introductions & Politeness',
      desc: 'Learn how to introduce yourself respectfully, ask for names, and distinguish formal "Sie" from casual "du".',
      items: [
        { german: 'Guten Tag!', english: 'Good day / Hello (polite)', audio: 'Guten Tag!' },
        { german: 'Wie heißen Sie?', english: 'What is your name? (formal)', audio: 'Wie heißen Sie?' },
        { german: 'Mein Name ist Alex.', english: 'My name is Alex.', audio: 'Mein Name ist Alex.' },
        { german: 'Freut mich, Sie kennenzulernen!', english: 'Pleased to meet you!', audio: 'Freut mich, Sie kennenzulernen!' },
        { german: 'Auf Wiedersehen!', english: 'Goodbye! (formal)', audio: 'Auf Wiedersehen!' }
      ]
    },
    {
      id: 'numbers',
      number: '02',
      title: 'Zahlen, Uhrzeit & Wochentage',
      subtitle: 'Numbers, Time, Calendar & Appointments',
      desc: 'Master German counting from 0 to 100, telling time, and arranging appointments for apartments or doctors.',
      items: [
        { german: 'eins, zwei, drei, vier, fünf', english: '1, 2, 3, 4, 5', audio: 'eins, zwei, drei, vier, fünf' },
        { german: 'Wie viel Uhr ist es?', english: 'What time is it?', audio: 'Wie viel Uhr ist es?' },
        { german: 'Der Termin ist um zehn Uhr.', english: 'The appointment is at 10:00.', audio: 'Der Termin ist um zehn Uhr.' },
        { german: 'Montag, Dienstag, Mittwoch', english: 'Monday, Tuesday, Wednesday', audio: 'Montag, Dienstag, Mittwoch' },
        { german: 'Am Wochenende habe ich frei.', english: 'On the weekend I have free time.', audio: 'Am Wochenende habe ich frei.' }
      ]
    },
    {
      id: 'family',
      number: '03',
      title: 'Familie & Persönliche Angaben',
      subtitle: 'Family Members & Personal Information',
      desc: 'Talk about your family, origin, current address, and complete basic registration forms.',
      items: [
        { german: 'Ich komme aus Indien / Brasilien / Spanien.', english: 'I come from India / Brazil / Spain.', audio: 'Ich komme aus Indien.' },
        { german: 'Ich wohne in Berlin.', english: 'I live in Berlin.', audio: 'Ich wohne in Berlin.' },
        { german: 'die Familie (die Familien)', english: 'the family (families)', audio: 'die Familie' },
        { german: 'meine Eltern und meine Geschwister', english: 'my parents and my siblings', audio: 'meine Eltern und meine Geschwister' },
        { german: 'Ich lerne seit zwei Monaten Deutsch.', english: 'I have been learning German for two months.', audio: 'Ich lerne seit zwei Monaten Deutsch.' }
      ]
    },
    {
      id: 'shopping',
      number: '04',
      title: 'Einkaufen & Supermarkt',
      subtitle: 'Shopping, Groceries, Prices & Cashier',
      desc: 'Navigate German supermarkets (Rewe, Edeka, Aldi, Lidl), ask for prices, return bottles for Pfand, and pay.',
      items: [
        { german: 'Wie viel kostet das, bitte?', english: 'How much does that cost, please?', audio: 'Wie viel kostet das, bitte?' },
        { german: 'Ich möchte ein Kilo Äpfel.', english: 'I would like one kilo of apples.', audio: 'Ich möchte ein Kilo Äpfel.' },
        { german: 'Wo finde ich Milch und Brot?', english: 'Where do I find milk and bread?', audio: 'Wo finde ich Milch und Brot?' },
        { german: 'Mit Karte oder bar bezahlen?', english: 'Pay by card or cash?', audio: 'Mit Karte oder bar bezahlen?' },
        { german: 'Ich bezahle mit Karte, bitte.', english: 'I will pay by card, please.', audio: 'Ich bezahle mit Karte, bitte.' }
      ]
    },
    {
      id: 'restaurant',
      number: '05',
      title: 'Essen, Trinken & Restaurant',
      subtitle: 'Ordering at Cafes, Mensa & Restaurants',
      desc: 'Order food politely, ask about vegetarian/halal options, and handle the bill (Rechnung).',
      items: [
        { german: 'Einen Tisch für zwei Personen, bitte.', english: 'A table for two people, please.', audio: 'Einen Tisch für zwei Personen, bitte.' },
        { german: 'Die Speisekarte, bitte.', english: 'The menu, please.', audio: 'Die Speisekarte, bitte.' },
        { german: 'Ich hätte gerne ein Mineralwasser.', english: 'I would like a mineral water.', audio: 'Ich hätte gerne ein Mineralwasser.' },
        { german: 'Haben Sie vegetarische Gerichte?', english: 'Do you have vegetarian dishes?', audio: 'Haben Sie vegetarische Gerichte?' },
        { german: 'Wir möchten bitte zahlen. Getrennt, bitte.', english: 'We would like to pay. Separately, please.', audio: 'Wir möchten bitte zahlen. Getrennt, bitte.' }
      ]
    },
    {
      id: 'transport',
      number: '06',
      title: 'Verkehrsmittel & Wegbeschreibung',
      subtitle: 'Public Transport (ÖPNV), Trains & Directions',
      desc: 'Use buses, U-Bahn, S-Bahn, and Deutsche Bahn trains with confidence throughout Germany.',
      items: [
        { german: 'Wo ist der nächste Bahnhof?', english: 'Where is the nearest train station?', audio: 'Wo ist der nächste Bahnhof?' },
        { german: 'Fährt diese U-Bahn zum Hauptbahnhof?', english: 'Does this subway go to the central station?', audio: 'Fährt diese U-Bahn zum Hauptbahnhof?' },
        { german: 'Ein Ticket nach München, bitte.', english: 'A ticket to Munich, please.', audio: 'Ein Ticket nach München, bitte.' },
        { german: 'Von welchem Gleis fährt der Zug ab?', english: 'From which track does the train depart?', audio: 'Von welchem Gleis fährt der Zug ab?' },
        { german: 'Der Zug hat zehn Minuten Verspätung.', english: 'The train has a 10-minute delay.', audio: 'Der Zug hat zehn Minuten Verspätung.' }
      ]
    },
    {
      id: 'university',
      number: '07',
      title: 'Hochschule & Alltag in Deutschland',
      subtitle: 'University Campus, Administration & Daily Life',
      desc: 'Essential student German for lectures, cafeteria, university library, and student services.',
      items: [
        { german: 'Ich studiere Informatik an der Universität.', english: 'I study Computer Science at the university.', audio: 'Ich studiere Informatik an der Universität.' },
        { german: 'Wo ist das Studierendensekretariat?', english: 'Where is the student registration office?', audio: 'Wo ist das Studierendensekretariat?' },
        { german: 'Treffen wir uns heute in der Mensa?', english: 'Shall we meet today in the cafeteria?', audio: 'Treffen wir uns heute in der Mensa?' },
        { german: 'Wann beginnt die Vorlesung?', english: 'When does the lecture begin?', audio: 'Wann beginnt die Vorlesung?' },
        { german: 'Ich lerne in der Universitätsbibliothek.', english: 'I am studying in the university library.', audio: 'Ich lerne in der Universitätsbibliothek.' }
      ]
    }
  ];

  const grammarRules = [
    {
      title: 'Rule 1: The Three Genders (der, die, das)',
      desc: 'Every German noun has a fixed grammatical gender. Always learn nouns together with their article!',
      examples: [
        { de: 'der Tisch (masculine / blue)', en: 'the table' },
        { de: 'die Wohnung (feminine / red)', en: 'the apartment' },
        { de: 'das Buch (neuter / green)', en: 'the book' }
      ]
    },
    {
      title: 'Rule 2: Verb in Position 2',
      desc: 'In a standard German declarative statement, the conjugated verb is ALWAYS the second element in the sentence.',
      examples: [
        { de: 'Ich lerne heute Deutsch.', en: 'I am learning German today.' },
        { de: 'Heute lerne ich Deutsch.', en: 'Today I am learning German. (Verb "lerne" remains 2nd!)' }
      ]
    },
    {
      title: 'Rule 3: Regular Present Tense Conjugation (lernen)',
      desc: 'German verbs change endings according to the subject pronoun:',
      examples: [
        { de: 'ich lerne (I learn)', en: 'du lernst (you learn - informal)' },
        { de: 'er/sie/es lernt (he/she/it learns)', en: 'wir lernen (we learn)' },
        { de: 'ihr lernt (you all learn)', en: 'Sie / sie lernen (you polite / they learn)' }
      ]
    },
    {
      title: 'Rule 4: Accusative Direct Object (der -> den)',
      desc: 'When a masculine noun is the direct receiver of an action, "der" changes to "den" (and "ein" becomes "einen"). Feminine and neuter nouns remain unchanged.',
      examples: [
        { de: 'Ich habe einen Termin. (der Termin -> einen Termin)', en: 'I have an appointment.' },
        { de: 'Ich miete eine Wohnung. (die Wohnung -> eine Wohnung)', en: 'I rent an apartment.' },
        { de: 'Ich kaufe ein Ticket. (das Ticket -> ein Ticket)', en: 'I buy a ticket.' }
      ]
    }
  ];

  return (
    <PublicSEOPageLayout
      title="Learn German A1: The Complete Beginner Course for Real Life in Germany"
      badge="CEFR A1 Course Guide"
      subtitle="Start your German journey with structured lessons, practical vocabulary, numbers, family, food, transport, and real-life everyday German. Designed specifically for newcomers, students, and workers moving to Germany."
      currentPath="/learn-german-a1"
      sampleGermanPhrase="Guten Tag! Ich lerne Deutsch für mein Leben und mein Studium in Deutschland."
      samplePhraseTranslation="Good day! I am learning German for my life and studies in Germany."
      onNavigate={onNavigate}
      onGetStarted={onGetStarted}
      onLogin={onLogin}
    >
      {/* Overview Section */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <h2 className="text-xl sm:text-2xl font-bold text-[#0A1128] mb-3">
          What is German A1 (Beginner Level)?
        </h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-4">
          According to the Common European Framework of Reference for Languages (CEFR), Level A1 is the foundational breakthrough level. Reaching A1 proficiency means you can understand and use familiar everyday expressions, introduce yourself and others, ask and answer personal questions (where you live, people you know, things you have), and interact in a simple way if the other person talks slowly and clearly.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-xs font-bold text-red-600 uppercase tracking-wider block mb-1">Vocabulary Target</span>
            <span className="text-lg font-extrabold text-slate-900">500 – 800 Words</span>
            <p className="text-xs text-slate-500 mt-1">High-frequency daily German nouns, verbs, and phrases.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-xs font-bold text-amber-500 uppercase tracking-wider block mb-1">Grammar Focus</span>
            <span className="text-lg font-extrabold text-slate-900">Present Tense & Articles</span>
            <p className="text-xs text-slate-500 mt-1">der/die/das, basic cases, and standard sentence order.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">Practical Outcome</span>
            <span className="text-lg font-extrabold text-slate-900">Survival German</span>
            <p className="text-xs text-slate-500 mt-1">Supermarket, trains, cafe orders, and simple doctor visits.</p>
          </div>
        </div>
      </section>

      {/* Structured Modules */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0A1128]">
              Essential A1 German Topics & Vocabulary
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Listen to native pronunciation by tapping the audio button next to each German phrase.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {a1Modules.map((mod) => (
            <div key={mod.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-red-100 text-red-700">
                      Module {mod.number}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">A1 Level</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#0A1128]">
                    {mod.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-slate-500">
                    {mod.subtitle}
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 mb-4">
                {mod.desc}
              </p>

              <div className="space-y-2">
                {mod.items.map((item, idx) => (
                  <div 
                    key={idx}
                    className="p-2.5 sm:p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3 hover:bg-slate-100/70 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <SpeakButton text={item.audio} />
                      <div>
                        <span className="text-sm font-bold text-slate-900 block">
                          {item.german}
                        </span>
                        <span className="text-xs text-slate-500">
                          {item.english}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono hidden sm:inline-block">
                      German phrase
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Essential A1 Grammar Section */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="mb-6">
          <span className="text-xs font-bold text-red-600 uppercase tracking-wider block mb-1">
            Grammar Foundation
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0A1128]">
            Core German Grammar for A1 Beginners
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            German grammar has a reputation for being strict, but once you learn these four foundational patterns, forming sentences becomes predictable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {grammarRules.map((rule, idx) => (
            <div key={idx} className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5">
                  {rule.title}
                </h3>
                <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                  {rule.desc}
                </p>
              </div>
              <div className="space-y-1.5 pt-3 border-t border-slate-200 text-xs">
                {rule.examples.map((ex, exIdx) => (
                  <div key={exIdx} className="bg-white p-2 rounded-lg border border-slate-200/80">
                    <span className="font-semibold text-slate-900 block">{ex.de}</span>
                    <span className="text-slate-500 text-[11px]">{ex.en}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Next Step CTA */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 sm:p-8 rounded-2xl shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold mb-1">
            Ready to Practice A1 German with Interactive Quizzes?
          </h3>
          <p className="text-sm text-red-100 max-w-xl">
            Create a free German Teacher account to access all 24 interactive A1 course lessons, flashcards, pronunciation tests, and grammar drills.
          </p>
        </div>
        <button
          onClick={onGetStarted}
          className="px-6 py-3 rounded-xl bg-white text-red-700 hover:bg-slate-100 font-bold text-sm shadow-md transition-colors shrink-0 cursor-pointer"
        >
          Start A1 Lesson 1 Free
        </button>
      </section>
    </PublicSEOPageLayout>
  );
};
