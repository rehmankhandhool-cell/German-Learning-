import React, { useState } from 'react';
import { useSEO } from './useSEO';
import { PublicSEOPageLayout } from './PublicSEOPageLayout';
import { SpeakButton } from './SpeakButton';
import { NavSection } from '../Navbar';
import { 
  Layers, 
  Sparkles, 
  Search, 
  CheckCircle2, 
  Volume2, 
  Filter 
} from 'lucide-react';

interface PublicVocabularyPageProps {
  onNavigate: (section: NavSection) => void;
  onGetStarted: () => void;
  onLogin: () => void;
}

interface VocabItem {
  article: 'der' | 'die' | 'das' | '';
  word: string;
  plural?: string;
  meaning: string;
  pronunciation: string;
  exampleDe: string;
  exampleEn: string;
  category: string;
}

export const PublicVocabularyPage: React.FC<PublicVocabularyPageProps> = ({
  onNavigate,
  onGetStarted,
  onLogin
}) => {
  useSEO({
    title: 'German Vocabulary – Practical Words, Gender Articles & Examples | German Teacher',
    description: 'Learn essential German vocabulary with der, die, das gender articles, English translations, native audio pronunciations, and real-life everyday example sentences.',
    canonicalUrl: 'https://germanteacher.store/german-vocabulary',
    ogTitle: 'German Vocabulary – Words with Articles & Examples',
    ogDescription: 'Comprehensive German vocabulary guide with gender articles, pronunciation, and practical examples for living and working in Germany.'
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const vocabularyList: VocabItem[] = [
    // Housing & Living
    {
      article: 'die',
      word: 'Wohnung',
      plural: 'die Wohnungen',
      meaning: 'apartment / flat',
      pronunciation: 'VOH-noong',
      exampleDe: 'Ich suche eine 2-Zimmer-Wohnung in Berlin.',
      exampleEn: 'I am looking for a 2-room apartment in Berlin.',
      category: 'housing'
    },
    {
      article: 'der',
      word: 'Mietvertrag',
      plural: 'die Mietverträge',
      meaning: 'rental lease / contract',
      pronunciation: 'MEET-fer-trahk',
      exampleDe: 'Haben Sie den Mietvertrag schon unterschrieben?',
      exampleEn: 'Have you already signed the rental lease?',
      category: 'housing'
    },
    {
      article: 'die',
      word: 'Warmmiete',
      plural: 'die Warmmieten',
      meaning: 'total rent including heating and utilities',
      pronunciation: 'VARM-mee-tuh',
      exampleDe: 'Die Warmmiete beträgt 850 Euro im Monat.',
      exampleEn: 'The warm rent is 850 euros per month.',
      category: 'housing'
    },
    {
      article: 'die',
      word: 'Kaution',
      plural: 'die Kautionen',
      meaning: 'rental security deposit',
      pronunciation: 'kow-tsee-OHN',
      exampleDe: 'Die Kaution beträgt drei Monatskaltmieten.',
      exampleEn: 'The deposit is three months of cold rent.',
      category: 'housing'
    },
    {
      article: 'der',
      word: 'Vermieter',
      plural: 'die Vermieter',
      meaning: 'landlord',
      pronunciation: 'fer-MEE-ter',
      exampleDe: 'Der Vermieter antwortet schnell auf meine E-Mails.',
      exampleEn: 'The landlord replies quickly to my emails.',
      category: 'housing'
    },

    // Bureaucracy & Anmeldung
    {
      article: 'die',
      word: 'Anmeldung',
      plural: 'die Anmeldungen',
      meaning: 'city address registration',
      pronunciation: 'AHN-mel-doong',
      exampleDe: 'Die Anmeldung muss innerhalb von 14 Tagen erfolgen.',
      exampleEn: 'Address registration must be done within 14 days.',
      category: 'bureaucracy'
    },
    {
      article: 'die',
      word: 'Meldebescheinigung',
      plural: 'die Meldebescheinigungen',
      meaning: 'registration certificate document',
      pronunciation: 'MEL-duh-buh-shy-nee-goong',
      exampleDe: 'Die Bank verlangt die Meldebescheinigung.',
      exampleEn: 'The bank requires the registration certificate.',
      category: 'bureaucracy'
    },
    {
      article: 'die',
      word: 'Steuer-ID',
      plural: 'die Steuer-IDs',
      meaning: 'tax identification number',
      pronunciation: 'SHTOY-er ee-day',
      exampleDe: 'Ihre Steuer-ID erhalten Sie automatisch per Post.',
      exampleEn: 'You receive your tax ID automatically by mail.',
      category: 'bureaucracy'
    },
    {
      article: 'der',
      word: 'Termin',
      plural: 'die Termine',
      meaning: 'appointment',
      pronunciation: 'ter-MEEN',
      exampleDe: 'Ich habe morgen früh einen Termin beim Bürgeramt.',
      exampleEn: 'I have an appointment at the Bürgeramt tomorrow morning.',
      category: 'bureaucracy'
    },
    {
      article: 'der',
      word: 'Reisepass',
      plural: 'die Reisepässe',
      meaning: 'passport',
      pronunciation: 'RY-zuh-pahs',
      exampleDe: 'Bitte bringen Sie Ihren gültigen Reisepass mit.',
      exampleEn: 'Please bring your valid passport with you.',
      category: 'bureaucracy'
    },

    // Bank & Finance
    {
      article: 'das',
      word: 'Girokonto',
      plural: 'die Girokonten',
      meaning: 'checking account',
      pronunciation: 'ZHEE-roh-kon-toh',
      exampleDe: 'Ich möchte gerne ein Girokonto eröffnen.',
      exampleEn: 'I would like to open a checking account.',
      category: 'banking'
    },
    {
      article: 'die',
      word: 'Überweisung',
      plural: 'die Überweisungen',
      meaning: 'bank transfer',
      pronunciation: 'oo-ber-VY-zoong',
      exampleDe: 'Ich habe die Miete per Überweisung bezahlt.',
      exampleEn: 'I paid the rent via bank transfer.',
      category: 'banking'
    },
    {
      article: 'der',
      word: 'Dauerauftrag',
      plural: 'die Daueraufträge',
      meaning: 'standing order (automated recurring payment)',
      pronunciation: 'DOW-er-owf-trahk',
      exampleDe: 'Für die Miete richte ich einen Dauerauftrag ein.',
      exampleEn: 'For the rent I am setting up a standing order.',
      category: 'banking'
    },
    {
      article: 'die',
      word: 'Kartenzahlung',
      plural: 'die Kartenzahlungen',
      meaning: 'payment by card',
      pronunciation: 'KAR-ten-tsah-loong',
      exampleDe: 'Ist Kartenzahlung hier möglich?',
      exampleEn: 'Is card payment possible here?',
      category: 'banking'
    },

    // Health & Doctor
    {
      article: 'der',
      word: 'Hausarzt',
      plural: 'die Hausärzte',
      meaning: 'general practitioner / family doctor',
      pronunciation: 'HOWS-artst',
      exampleDe: 'Mein Hausarzt hat heute bis 18 Uhr Sprechstunde.',
      exampleEn: 'My general doctor has consultation hours until 6 PM today.',
      category: 'health'
    },
    {
      article: 'die',
      word: 'Krankenkasse',
      plural: 'die Krankenkassen',
      meaning: 'health insurance fund',
      pronunciation: 'KRAHN-ken-kah-suh',
      exampleDe: 'Sind Sie bei einer gesetzlichen Krankenkasse versichert?',
      exampleEn: 'Are you insured with a public health insurance fund?',
      category: 'health'
    },
    {
      article: 'das',
      word: 'Rezept',
      plural: 'die Rezepte',
      meaning: 'medical prescription',
      pronunciation: 'reh-TSEPT',
      exampleDe: 'Der Arzt hat mir ein Rezept für Antibiotika ausgestellt.',
      exampleEn: 'The doctor issued me a prescription for antibiotics.',
      category: 'health'
    },
    {
      article: 'die',
      word: 'Apotheke',
      plural: 'die Apotheken',
      meaning: 'pharmacy',
      pronunciation: 'ah-poh-TAY-kuh',
      exampleDe: 'Die Notdienst-Apotheke hat die ganze Nacht geöffnet.',
      exampleEn: 'The on-duty pharmacy is open all night.',
      category: 'health'
    },

    // University & Work
    {
      article: 'die',
      word: 'Vorlesung',
      plural: 'die Vorlesungen',
      meaning: 'university lecture',
      pronunciation: 'FOR-lay-zoong',
      exampleDe: 'Die Vorlesung findet im Hörsaal 3 statt.',
      exampleEn: 'The lecture takes place in Lecture Hall 3.',
      category: 'education'
    },
    {
      article: 'die',
      word: 'Klausur',
      plural: 'die Klausuren',
      meaning: 'written exam',
      pronunciation: 'klow-ZOOR',
      exampleDe: 'Ich bereite mich auf die Mathe-Klausur vor.',
      exampleEn: 'I am preparing for the math exam.',
      category: 'education'
    },
    {
      article: 'der',
      word: 'Werkstudent',
      plural: 'die Werkstudenten',
      meaning: 'working student (working up to 20h/week)',
      pronunciation: 'VAIRK-shtoo-dent',
      exampleDe: 'Ich arbeite als Werkstudent in einem IT-Unternehmen.',
      exampleEn: 'I work as a working student at an IT company.',
      category: 'education'
    },
    {
      article: 'der',
      word: 'Lebenslauf',
      plural: 'die Lebensläufe',
      meaning: 'CV / curriculum vitae',
      pronunciation: 'LAY-bens-lowf',
      exampleDe: 'Bitte senden Sie uns Ihren tabellarischen Lebenslauf.',
      exampleEn: 'Please send us your tabular CV.',
      category: 'education'
    },

    // Food & Everyday Life
    {
      article: 'das',
      word: 'Pfand',
      plural: 'die Pfänder',
      meaning: 'bottle deposit refund',
      pronunciation: 'PFAHNT',
      exampleDe: 'Auf diese Glasflasche gibt es 15 Cent Pfand.',
      exampleEn: 'There is a 15-cent deposit on this glass bottle.',
      category: 'everyday'
    },
    {
      article: 'die',
      word: 'Kasse',
      plural: 'die Kassen',
      meaning: 'cash register / checkout counter',
      pronunciation: 'KAH-suh',
      exampleDe: 'Bitte zahlen Sie an Kasse zwei.',
      exampleEn: 'Please pay at cash register two.',
      category: 'everyday'
    },
    {
      article: 'die',
      word: 'Rechnung',
      plural: 'die Rechnungen',
      meaning: 'invoice / restaurant bill',
      pronunciation: 'REKH-noong',
      exampleDe: 'Können wir bitte die Rechnung haben?',
      exampleEn: 'Could we please have the bill?',
      category: 'everyday'
    },
    {
      article: 'das',
      word: 'Trinkgeld',
      plural: 'die Trinkgelder',
      meaning: 'tip / gratuity',
      pronunciation: 'TRINK-gelt',
      exampleDe: 'In Deutschland gibt man üblicherweise 5 bis 10 Prozent Trinkgeld.',
      exampleEn: 'In Germany one usually gives 5 to 10 percent tip.',
      category: 'everyday'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'housing', label: '🏠 Housing & Rent' },
    { id: 'bureaucracy', label: '🏛️ Anmeldung & City' },
    { id: 'banking', label: '🏦 Bank & Money' },
    { id: 'health', label: '🏥 Doctor & Health' },
    { id: 'education', label: '🎓 University & Jobs' },
    { id: 'everyday', label: '🛒 Everyday Life' }
  ];

  const filteredVocab = vocabularyList.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesQuery = searchQuery.trim() === '' || 
      item.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.exampleDe.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const getArticleColor = (article: string) => {
    switch (article) {
      case 'der':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'die':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'das':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <PublicSEOPageLayout
      title="Practical German Vocabulary with Gender Articles (der, die, das)"
      badge="Vocabulary Guide"
      subtitle="Master high-frequency German words for life in Germany. Always learn nouns with their correct gender article, plural form, native pronunciation, and authentic sentence context."
      currentPath="/german-vocabulary"
      sampleGermanPhrase="Übung macht den Meister: Wir lernen jedes deutsche Nomen mit seinem richtigen Artikel."
      samplePhraseTranslation="Practice makes perfect: We learn every German noun with its correct article."
      onNavigate={onNavigate}
      onGetStarted={onGetStarted}
      onLogin={onLogin}
    >
      {/* The Article Principle Section */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <h2 className="text-xl sm:text-2xl font-bold text-[#0A1128] mb-3">
          The Golden Rule of German Vocabulary: The 3 Articles
        </h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
          In German, grammatical gender is not random—it determines how adjectives, pronouns, and case endings decline throughout the entire sentence. Never memorize a German noun in isolation (like "Tisch"). Always memorize it with its article: <strong className="text-blue-700 font-bold">der Tisch</strong>.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl bg-blue-50/70 border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-800">Masculine</span>
              <span className="text-sm font-extrabold px-2 py-0.5 rounded bg-blue-600 text-white">der</span>
            </div>
            <p className="text-xs text-blue-900/80 mb-2">Common endings: <em>-er, -en, -ling, -or, -ist</em></p>
            <div className="text-xs font-semibold text-blue-950 bg-white p-2 rounded border border-blue-100">
              der Mietvertrag, der Hausarzt, der Termin
            </div>
          </div>

          <div className="p-5 rounded-xl bg-red-50/70 border border-red-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-red-800">Feminine</span>
              <span className="text-sm font-extrabold px-2 py-0.5 rounded bg-red-600 text-white">die</span>
            </div>
            <p className="text-xs text-red-900/80 mb-2">Common endings: <em>-ung, -heit, -keit, -tion, -tät, -e</em></p>
            <div className="text-xs font-semibold text-red-950 bg-white p-2 rounded border border-red-100">
              die Wohnung, die Anmeldung, die Kaution
            </div>
          </div>

          <div className="p-5 rounded-xl bg-emerald-50/70 border border-emerald-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Neuter</span>
              <span className="text-sm font-extrabold px-2 py-0.5 rounded bg-emerald-600 text-white">das</span>
            </div>
            <p className="text-xs text-emerald-900/80 mb-2">Common endings: <em>-um, -ment, -chen, -lein</em></p>
            <div className="text-xs font-semibold text-emerald-950 bg-white p-2 rounded border border-emerald-100">
              das Girokonto, das Rezept, das Pfand
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Vocabulary Explorer */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0A1128]">
              High-Frequency Practical German Vocabulary Bank
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Explore essential words with native audio, phonetic guides, and example sentences.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search words..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-red-500 text-slate-900"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Vocabulary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredVocab.map((item, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-baseline gap-2">
                    {item.article && (
                      <span className={`text-xs font-extrabold px-2 py-0.5 rounded-md border ${getArticleColor(item.article)}`}>
                        {item.article}
                      </span>
                    )}
                    <h3 className="text-base font-bold text-slate-950">
                      {item.word}
                    </h3>
                  </div>

                  <SpeakButton text={`${item.article} ${item.word}`} />
                </div>

                <div className="text-xs font-semibold text-slate-700 mb-1">
                  Meaning: <span className="text-slate-900">{item.meaning}</span>
                </div>

                <div className="text-[11px] text-slate-400 font-mono mb-3">
                  Pronunciation: <span className="text-slate-600 font-sans">[{item.pronunciation}]</span>
                  {item.plural && <span className="ml-2 text-slate-500">· Plural: {item.plural}</span>}
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <span className="font-semibold text-slate-900">{item.exampleDe}</span>
                  <SpeakButton text={item.exampleDe} size="sm" />
                </div>
                <span className="text-slate-500 text-[11px] block">{item.exampleEn}</span>
              </div>
            </div>
          ))}
        </div>

        {filteredVocab.length === 0 && (
          <div className="bg-white p-8 rounded-xl text-center border border-slate-200 text-slate-500 text-sm">
            No vocabulary matches your search query. Try clearing your search or switching categories.
          </div>
        )}
      </section>

      {/* Vocabulary Retention Strategy */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <h2 className="text-xl sm:text-2xl font-bold text-[#0A1128] mb-3">
          How to Memorize 1,000+ German Words Permanently
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-base font-bold text-slate-900 block mb-1">1. Color Coding</span>
            <p className="text-xs text-slate-600 leading-relaxed">
              Always associate blue with <em>der</em>, red with <em>die</em>, and green with <em>das</em>. Visual color cues trigger faster recall than text alone.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-base font-bold text-slate-900 block mb-1">2. Spaced Repetition</span>
            <p className="text-xs text-slate-600 leading-relaxed">
              Review words at expanding intervals: Day 1, Day 3, Day 7, and Day 21. German Teacher's built-in flashcard engine tracks this automatically.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-base font-bold text-slate-900 block mb-1">3. Whole Sentences</span>
            <p className="text-xs text-slate-600 leading-relaxed">
              Never learn isolated words. Always place nouns into practical sentences so your brain encodes preposition and case usage instinctively.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive App CTA */}
      <section className="bg-gradient-to-r from-amber-500 to-amber-600 text-white p-6 sm:p-8 rounded-2xl shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold mb-1">
            Practice 500+ Words with German Teacher Flashcards
          </h3>
          <p className="text-sm text-amber-100 max-w-xl">
            Create a free account to unlock interactive audio quizzes, gender training drills, and vocabulary streak tracking.
          </p>
        </div>
        <button
          onClick={onGetStarted}
          className="px-6 py-3 rounded-xl bg-slate-950 text-amber-300 hover:bg-slate-900 font-bold text-sm shadow-md transition-colors shrink-0 cursor-pointer"
        >
          Open Free Vocabulary Drills
        </button>
      </section>
    </PublicSEOPageLayout>
  );
};
