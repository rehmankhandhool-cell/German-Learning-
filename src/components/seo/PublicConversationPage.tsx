import React from 'react';
import { useSEO } from './useSEO';
import { PublicSEOPageLayout } from './PublicSEOPageLayout';
import { SpeakButton } from './SpeakButton';
import { NavSection } from '../Navbar';
import { 
  MessageSquareText, 
  Mic, 
  Sparkles, 
  CheckCircle2, 
  Building2, 
  Home, 
  Stethoscope, 
  Briefcase, 
  ShoppingBag, 
  GraduationCap, 
  UtensilsCrossed, 
  Train, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface PublicConversationPageProps {
  onNavigate: (section: NavSection) => void;
  onGetStarted: () => void;
  onLogin: () => void;
}

export const PublicConversationPage: React.FC<PublicConversationPageProps> = ({
  onNavigate,
  onGetStarted,
  onLogin
}) => {
  useSEO({
    title: 'German Conversation Practice – Real-Life Dialogues & Scenarios | German Teacher',
    description: 'Practice authentic German conversations for everyday situations in Germany. Interactive scenarios with landlords, Bürgeramt, doctors, job interviews, shopping, and campus.',
    canonicalUrl: 'https://germanteacher.store/german-conversation-practice',
    ogTitle: 'German Conversation Practice – Realistic Scenarios',
    ogDescription: 'Interactive German conversation practice with simulated dialogues for landlords, Bürgeramt, doctors, job interviews, and everyday situations in Germany.'
  });

  const conversationScenarios = [
    {
      id: 'wohnung',
      title: 'Wohnung / Landlord (Herr Weber)',
      category: 'Housing & Living',
      icon: <Home className="w-5 h-5 text-amber-500" />,
      desc: 'Inquire about available apartments, clarify warm rent and utilities, schedule viewings, and report repair issues politely.',
      samplePhrase: 'Wie hoch ist die Warmmiete inklusive Nebenkosten und Heizung?',
      sampleTranslation: 'How much is the warm rent including utilities and heating?'
    },
    {
      id: 'anmeldung',
      title: 'Anmeldung / Bürgeramt (Frau Schneider)',
      category: 'Official Bureaucracy',
      icon: <Building2 className="w-5 h-5 text-red-600" />,
      desc: 'Present your appointment ticket, hand over your landlord confirmation certificate, and confirm address registration details.',
      samplePhrase: 'Hier sind mein Reisepass und die Wohnungsgeberbestätigung von meinem Vermieter.',
      sampleTranslation: 'Here is my passport and the landlord confirmation from my landlord.'
    },
    {
      id: 'arzt',
      title: 'Hausarzt / Doctor (Dr. Becker)',
      category: 'Healthcare & Medical',
      icon: <Stethoscope className="w-5 h-5 text-emerald-600" />,
      desc: 'Schedule an urgent consultation, explain fever or pain symptoms clearly, ask about prescriptions, and obtain a sick note (AU).',
      samplePhrase: 'Ich fühle mich seit zwei Tagen schwach und habe Fieber und Halsschmerzen.',
      sampleTranslation: 'I have felt weak for two days and have a fever and sore throat.'
    },
    {
      id: 'interview',
      title: 'Vorstellungsgespräch / Job Interview (Herr Wagner)',
      category: 'Career & Workplace',
      icon: <Briefcase className="w-5 h-5 text-blue-600" />,
      desc: 'Introduce your career background, present your qualifications, answer behavioral questions, and explain your motivation in German.',
      samplePhrase: 'Ich verfüge über mehrjährige Erfahrung in der Softwareentwicklung und lerne intensiv Deutsch.',
      sampleTranslation: 'I have several years of experience in software development and am learning German intensively.'
    },
    {
      id: 'shopping',
      title: 'Supermarkt / Checkout (Frau Meyer)',
      category: 'Daily Shopping',
      icon: <ShoppingBag className="w-5 h-5 text-amber-500" />,
      desc: 'Ask store staff where to find organic ingredients, return deposit bottles at the Pfandautomat, and choose payment methods.',
      samplePhrase: 'Entschuldigung, wo finde ich die Hafermilch und das glutenfreie Brot?',
      sampleTranslation: 'Excuse me, where do I find oat milk and gluten-free bread?'
    },
    {
      id: 'uni',
      title: 'Universität & Campus (Elena)',
      category: 'University Life',
      icon: <GraduationCap className="w-5 h-5 text-indigo-600" />,
      desc: 'Ask fellow students about lecture slides, organize study sessions in the library, and navigate examination deadlines.',
      samplePhrase: 'Könntest du mir bitte die Notizen aus der gestrigen Mathe-Vorlesung schicken?',
      sampleTranslation: 'Could you please send me the notes from yesterday\'s math lecture?'
    },
    {
      id: 'restaurant',
      title: 'Restaurant & Cafe (Kellner Markus)',
      category: 'Dining & Food',
      icon: <UtensilsCrossed className="w-5 h-5 text-rose-600" />,
      desc: 'Reserve a table, ask for dietary advice, order typical German dishes, and request separate bills with appropriate tip.',
      samplePhrase: 'Wir möchten bitte bezahlen. Können wir die Rechnung getrennt machen?',
      sampleTranslation: 'We would like to pay, please. Could we split the bill?'
    },
    {
      id: 'bahn',
      title: 'Bahnhof / Deutsche Bahn (Herr Fischer)',
      category: 'Transport & Travel',
      icon: <Train className="w-5 h-5 text-slate-700" />,
      desc: 'Ask about track changes, delayed connecting trains, seat reservations, and valid ticket zones.',
      samplePhrase: 'Erreiche ich in Hannover meinen Anschlusszug nach Hamburg trotz Verspätung?',
      sampleTranslation: 'Will I catch my connecting train to Hamburg in Hannover despite the delay?'
    }
  ];

  const dialogueSample = [
    {
      speaker: 'Herr Weber (Vermieter / Landlord)',
      de: 'Guten Tag! Schön, dass Sie sich für die 2-Zimmer-Wohnung interessieren. Haben Sie Fragen vorab zur Warmmiete?',
      en: 'Good day! Nice that you are interested in the 2-room apartment. Do you have questions in advance regarding the warm rent?',
      audio: 'Guten Tag! Schön, dass Sie sich für die Wohnung interessieren.'
    },
    {
      speaker: 'Du (Learner)',
      de: 'Guten Tag, Herr Weber! Ja, wie hoch ist die Kaution und wann wäre ein Besichtigungstermin möglich?',
      en: 'Good day, Mr. Weber! Yes, how high is the deposit and when would a viewing appointment be possible?',
      audio: 'Wie hoch ist die Kaution und wann wäre ein Besichtigungstermin möglich?'
    },
    {
      speaker: 'Herr Weber (Vermieter / Landlord)',
      de: 'Die Kaution beträgt drei Monatskaltmieten. Passt Ihnen Donnerstag um 17:30 Uhr für eine Besichtigung?',
      en: 'The security deposit is three months of cold rent. Does Thursday at 5:30 PM suit you for a viewing?',
      audio: 'Passt Ihnen Donnerstag um 17:30 Uhr für eine Besichtigung?'
    },
    {
      speaker: 'Du (Learner)',
      de: 'Donnerstag um 17:30 Uhr passt mir ausgezeichnet. Ich bringe alle Unterlagen mit. Vielen Dank!',
      en: 'Thursday at 5:30 PM suits me excellently. I will bring all documents. Thank you very much!',
      audio: 'Donnerstag um 17:30 Uhr passt mir ausgezeichnet. Vielen Dank!'
    }
  ];

  return (
    <PublicSEOPageLayout
      title="German Conversation Practice: Real-Life Scenarios for Daily Living in Germany"
      badge="Speaking & Roleplay Guide"
      subtitle="Overcome speaking anxiety and master authentic situational dialogues in German. Practice apartment viewings, Bürgeramt appointments, doctor visits, job interviews, and campus chats with instant AI feedback."
      currentPath="/german-conversation-practice"
      sampleGermanPhrase="Regelmäßige Gesprächsübungen geben mir die Sicherheit, im deutschen Alltag fließend zu sprechen."
      samplePhraseTranslation="Regular conversation practice gives me the confidence to speak fluently in daily German life."
      onNavigate={onNavigate}
      onGetStarted={onGetStarted}
      onLogin={onLogin}
    >
      {/* How Conversation Practice Works */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <h2 className="text-xl sm:text-2xl font-bold text-[#0A1128] mb-3">
          How the German Teacher Conversation System Works
        </h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
          Traditional language apps test passive multiple-choice recall. In real life, however, you have to formulate complete thoughts under pressure. German Teacher provides realistic, interactive conversational scenarios where you interact naturally through voice or text with simulated native speakers.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center font-bold text-sm mb-2">
              1
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">Authentic Personas</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Interact with realistic characters: a German landlord, a municipal clerk, a family doctor, or an HR manager.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-sm mb-2">
              2
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">Voice or Text Input</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Speak into your microphone or type your responses. Practice speech recognition with natural German pronunciation tuning.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm mb-2">
              3
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">Instant Gentle Coaching</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Get immediate feedback on grammar, word order, and more natural phrasing without interrupting your conversational flow.
            </p>
          </div>
        </div>
      </section>

      {/* Practical Scenarios Grid */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0A1128]">
            Practical Scenarios Available in German Teacher
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Each scenario is tailored to the exact communication demands of living and working in Germany.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {conversationScenarios.map((sc) => (
            <div key={sc.id} className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                    {sc.icon}
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    {sc.category}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">
                  {sc.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  {sc.desc}
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <span className="font-semibold text-slate-900">"{sc.samplePhrase}"</span>
                  <SpeakButton text={sc.samplePhrase} size="sm" />
                </div>
                <span className="text-slate-500 text-[11px] block">{sc.sampleTranslation}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sample Dialogue Transcript */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="mb-4">
          <span className="text-xs font-bold text-red-600 uppercase tracking-wider block mb-1">
            Interactive Dialogue Transcript
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0A1128]">
            Sample Apartment Search Roleplay: Landlord Viewing
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Listen to the realistic pacing and polite tone required when corresponding with German landlords.
          </p>
        </div>

        <div className="space-y-3">
          {dialogueSample.map((line, idx) => {
            const isLandlord = line.speaker.includes('Weber');
            return (
              <div 
                key={idx}
                className={`p-3.5 rounded-xl border flex items-start gap-3 ${
                  isLandlord 
                    ? 'bg-slate-50 border-slate-200 text-slate-900' 
                    : 'bg-amber-50/50 border-amber-200 text-slate-900'
                }`}
              >
                <SpeakButton text={line.audio} />
                <div className="flex-1">
                  <span className={`text-[11px] font-bold block mb-0.5 ${isLandlord ? 'text-slate-600' : 'text-amber-800'}`}>
                    {line.speaker}
                  </span>
                  <span className="text-sm font-semibold text-slate-900 block">{line.de}</span>
                  <span className="text-xs text-slate-500 mt-0.5 block">{line.en}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Overcoming Speaking Anxiety */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <h2 className="text-xl sm:text-2xl font-bold text-[#0A1128] mb-3">
          How to Overcome Speaking Anxiety in Germany
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-sm font-bold text-slate-900 block mb-1">1. Perfection is Not Required</span>
            <p className="text-xs text-slate-600 leading-relaxed">
              Native German speakers appreciate when international residents make an effort. Minor case or gender mistakes rarely impede mutual comprehension.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-sm font-bold text-slate-900 block mb-1">2. Keep Fixed Chunks Ready</span>
            <p className="text-xs text-slate-600 leading-relaxed">
              Memorize ready-made polite formulas (<em>"Könnten Sie bitte...", "Ich hätte gerne..."</em>). These automatic phrases give your brain time to think.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-sm font-bold text-slate-900 block mb-1">3. Practice in Low Stakes</span>
            <p className="text-xs text-slate-600 leading-relaxed">
              Rehearsing with German Teacher's AI Tutor eliminates fear of judgment, building the muscle memory needed before real high-stakes appointments.
            </p>
          </div>
        </div>
      </section>

      {/* Conversation Practice CTA */}
      <section className="bg-gradient-to-r from-purple-700 to-purple-800 text-white p-6 sm:p-8 rounded-2xl shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold mb-1">
            Start Your First Free Conversation Practice Session
          </h3>
          <p className="text-sm text-purple-100 max-w-xl">
            Choose from 8 real-life scenarios. Speak freely, receive immediate feedback, and build genuine fluency for living in Germany.
          </p>
        </div>
        <button
          onClick={onGetStarted}
          className="px-6 py-3 rounded-xl bg-white text-purple-900 hover:bg-slate-100 font-bold text-sm shadow-md transition-colors shrink-0 cursor-pointer"
        >
          Open Practice Scenarios Free
        </button>
      </section>
    </PublicSEOPageLayout>
  );
};
