import React from 'react';
import { useSEO } from './useSEO';
import { PublicSEOPageLayout } from './PublicSEOPageLayout';
import { SpeakButton } from './SpeakButton';
import { NavSection } from '../Navbar';
import { 
  Compass, 
  Home, 
  Stethoscope, 
  CreditCard, 
  ShoppingBag, 
  Train, 
  PhoneCall, 
  ShieldAlert, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';

interface PublicLivingPageProps {
  onNavigate: (section: NavSection) => void;
  onGetStarted: () => void;
  onLogin: () => void;
}

export const PublicLivingPage: React.FC<PublicLivingPageProps> = ({
  onNavigate,
  onGetStarted,
  onLogin
}) => {
  useSEO({
    title: 'German for Living in Germany – Everyday Life, Healthcare, Banking & Housing | German Teacher',
    description: 'Master practical German for living in Germany: housing and landlords, visiting doctors (Hausarzt), banking, supermarkets, public transportation, and emergency numbers.',
    canonicalUrl: 'https://germanteacher.store/german-for-living-in-germany',
    ogTitle: 'German for Living in Germany – Daily Survival Guide',
    ogDescription: 'Everyday German phrases and vocabulary for expats and newcomers: apartment viewings, doctor appointments, bank transfers, and public transit.'
  });

  const housingPhrases = [
    {
      de: 'Guten Tag, ist die Wohnung in der Lindenstraße noch verfügbar?',
      en: 'Good day, is the apartment on Lindenstraße still available?',
      audio: 'Guten Tag, ist die Wohnung in der Lindenstraße noch verfügbar?'
    },
    {
      de: 'Wie hoch ist die Warmmiete inklusive Heizung und Betriebskosten?',
      en: 'How much is the warm rent including heating and operating costs?',
      audio: 'Wie hoch ist die Warmmiete inklusive Heizung und Betriebskosten?'
    },
    {
      de: 'Könnten wir einen Termin für eine Besichtigung vereinbaren?',
      en: 'Could we arrange an appointment for a viewing?',
      audio: 'Könnten wir einen Termin für eine Besichtigung vereinbaren?'
    },
    {
      de: 'Die Heizung im Schlafzimmer wird leider nicht richtig warm.',
      en: 'Unfortunately the heater in the bedroom does not get properly warm.',
      audio: 'Die Heizung im Schlafzimmer wird leider nicht richtig warm.'
    }
  ];

  const medicalPhrases = [
    {
      de: 'Guten Tag, ich möchte gerne einen Termin vereinbaren. Ich habe starke Halsschmerzen.',
      en: 'Good day, I would like to make an appointment. I have severe throat pain.',
      audio: 'Guten Tag, ich möchte gerne einen Termin vereinbaren.'
    },
    {
      de: 'Hier ist meine elektronische Gesundheitskarte von der Krankenkasse.',
      en: 'Here is my electronic health insurance card from the health fund.',
      audio: 'Hier ist meine elektronische Gesundheitskarte.'
    },
    {
      de: 'Ich brauche eine Arbeitsunfähigkeitsbescheinigung (AU) für meinen Arbeitgeber.',
      en: 'I need a sick leave certificate (AU) for my employer.',
      audio: 'Ich brauche eine Arbeitsunfähigkeitsbescheinigung für meinen Arbeitgeber.'
    },
    {
      de: 'Muss ich dieses Medikament vor oder nach dem Essen einnehmen?',
      en: 'Must I take this medication before or after meals?',
      audio: 'Muss ich dieses Medikament vor oder nach dem Essen einnehmen?'
    }
  ];

  const bankingPhrases = [
    {
      de: 'Ich möchte gerne ein neues Girokonto eröffnen.',
      en: 'I would like to open a new checking account.',
      audio: 'Ich möchte gerne ein neues Girokonto eröffnen.'
    },
    {
      de: 'Ich möchte einen monatlichen Dauerauftrag für die Miete einrichten.',
      en: 'I would like to set up a monthly standing order for the rent.',
      audio: 'Ich möchte einen monatlichen Dauerauftrag für die Miete einrichten.'
    },
    {
      de: 'Wann wird meine neue Girocard / EC-Karte per Post zugestellt?',
      en: 'When will my new debit card be delivered by post?',
      audio: 'Wann wird meine neue Girocard per Post zugestellt?'
    },
    {
      de: 'Ich habe meine PIN-Nummer vergessen. Können Sie mir eine neue zusenden?',
      en: 'I have forgotten my PIN number. Could you send me a new one?',
      audio: 'Ich habe meine PIN-Nummer vergessen.'
    }
  ];

  const transitPhrases = [
    {
      de: 'Gilt das Deutschlandticket für alle Regionalzüge und Busse?',
      en: 'Does the Deutschlandticket apply to all regional trains and buses?',
      audio: 'Gilt das Deutschlandticket für alle Regionalzüge und Busse?'
    },
    {
      de: 'Entschuldigung, hält dieser Zug am Flughafen?',
      en: 'Excuse me, does this train stop at the airport?',
      audio: 'Entschuldigung, hält dieser Zug am Flughafen?'
    },
    {
      de: 'Auf welchem Gleis fährt der ICE nach Frankfurt ab?',
      en: 'On which track does the ICE train to Frankfurt depart?',
      audio: 'Auf welchem Gleis fährt der ICE nach Frankfurt ab?'
    },
    {
      de: 'Wegen einer Weichenstörung hat der Zug 20 Minuten Verspätung.',
      en: 'Due to a switch malfunction, the train has a 20-minute delay.',
      audio: 'Wegen einer Weichenstörung hat der Zug 20 Minuten Verspätung.'
    }
  ];

  const emergencyNumbers = [
    { number: '110', label: 'Polizei (Police)', desc: 'Immediate emergencies, crimes in progress, traffic accidents with danger.' },
    { number: '112', label: 'Feuerwehr & Notarzt (Fire & Ambulance)', desc: 'Life-threatening medical emergencies, chest pain, fires, severe trauma.' },
    { number: '116 117', label: 'Ärztlicher Bereitschaftsdienst (On-Call Doctor)', desc: 'Non-life-threatening illnesses at night, weekends, or public holidays when clinics are closed.' },
    { number: '116 116', label: 'Sperr-Notruf (Card Blocking Hotline)', desc: 'Immediately block lost or stolen bank cards (Girocard, Visa, Mastercard).' }
  ];

  return (
    <PublicSEOPageLayout
      title="German for Living in Germany: Daily Survival Phrases & Practical Guide"
      badge="Living in Germany"
      subtitle="Navigate the essential pillars of everyday life in Germany with confidence: finding an apartment, visiting doctors, opening a bank account, grocery shopping, public transit, and emergency protocols."
      currentPath="/german-for-living-in-germany"
      sampleGermanPhrase="Mit gutem Alltagsdeutsch meistere ich Wohnung, Arztbesuche und Behörden in Deutschland ohne Stress."
      samplePhraseTranslation="With good everyday German, I master housing, doctor visits, and authorities in Germany without stress."
      onNavigate={onNavigate}
      onGetStarted={onGetStarted}
      onLogin={onLogin}
    >
      {/* Intro */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <h2 className="text-xl sm:text-2xl font-bold text-[#0A1128] mb-3">
          Why "Real-Life" German Differs from Textbook German
        </h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-4">
          Many learners arrive in Germany after completing textbook courses only to feel frozen when a landlord asks for their <em>SCHUFA-Auskunft</em>, a doctor's receptionist asks for their <em>Gesundheitskarte</em>, or a train conductor announces a <em>Gleiswechsel</em> (track change).
        </p>
        <p className="text-sm text-slate-600 leading-relaxed">
          German Teacher focuses directly on the authentic, situational phrases you actually hear and speak every week across German cities.
        </p>
      </section>

      {/* Pillar 1: Housing */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <Home className="w-5 h-5 text-red-600" />
          <h2 className="text-xl sm:text-2xl font-bold text-[#0A1128]">
            1. Housing & Communicating with Landlords (Vermieter)
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 mb-4">
          Finding accommodation in German cities requires fast, polite communication. Learn these essential viewing and lease phrases:
        </p>
        <div className="space-y-3">
          {housingPhrases.map((phrase, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-3">
              <div className="flex-1">
                <span className="text-sm font-semibold text-slate-900 block mb-0.5">{phrase.de}</span>
                <span className="text-xs text-slate-500">{phrase.en}</span>
              </div>
              <SpeakButton text={phrase.audio} />
            </div>
          ))}
        </div>
      </section>

      {/* Pillar 2: Healthcare */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <Stethoscope className="w-5 h-5 text-emerald-600" />
          <h2 className="text-xl sm:text-2xl font-bold text-[#0A1128]">
            2. Healthcare, Doctors (Hausarzt) & Pharmacies (Apotheke)
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 mb-4">
          When ill in Germany, your primary contact is a registered general practitioner (<em>Hausarzt</em>). For paid sick leave from your job or university exam postponement, you must request an <em>Arbeitsunfähigkeitsbescheinigung (AU)</em>.
        </p>
        <div className="space-y-3">
          {medicalPhrases.map((phrase, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-3">
              <div className="flex-1">
                <span className="text-sm font-semibold text-slate-900 block mb-0.5">{phrase.de}</span>
                <span className="text-xs text-slate-500">{phrase.en}</span>
              </div>
              <SpeakButton text={phrase.audio} />
            </div>
          ))}
        </div>
      </section>

      {/* Pillar 3: Banking */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <CreditCard className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl sm:text-2xl font-bold text-[#0A1128]">
            3. Banking, Girokonto & Monthly Payments
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 mb-4">
          Virtually all rent and contracts in Germany operate through SEPA bank transfers and automated recurring standing orders (<em>Dauerauftrag</em>):
        </p>
        <div className="space-y-3">
          {bankingPhrases.map((phrase, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-3">
              <div className="flex-1">
                <span className="text-sm font-semibold text-slate-900 block mb-0.5">{phrase.de}</span>
                <span className="text-xs text-slate-500">{phrase.en}</span>
              </div>
              <SpeakButton text={phrase.audio} />
            </div>
          ))}
        </div>
      </section>

      {/* Pillar 4: Public Transport */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <Train className="w-5 h-5 text-amber-500" />
          <h2 className="text-xl sm:text-2xl font-bold text-[#0A1128]">
            4. Public Transportation (ÖPNV) & Deutsche Bahn
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 mb-4">
          Mastering train platform announcements, ticket inspections, and delays is a hallmark of real life in Germany:
        </p>
        <div className="space-y-3">
          {transitPhrases.map((phrase, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-3">
              <div className="flex-1">
                <span className="text-sm font-semibold text-slate-900 block mb-0.5">{phrase.de}</span>
                <span className="text-xs text-slate-500">{phrase.en}</span>
              </div>
              <SpeakButton text={phrase.audio} />
            </div>
          ))}
        </div>
      </section>

      {/* Pillar 5: Emergency Protocols & Numbers */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <ShieldAlert className="w-5 h-5 text-red-600" />
          <h2 className="text-xl sm:text-2xl font-bold text-[#0A1128]">
            5. Emergency Numbers & Protocols in Germany
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 mb-4">
          Save these 4 free nationwide telephone numbers directly into your phone:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {emergencyNumbers.map((em, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg font-black text-red-600 font-mono">{em.number}</span>
                <span className="text-xs font-bold text-slate-900">· {em.label}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{em.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-slate-900 to-[#0A1128] text-white p-6 sm:p-8 rounded-2xl shadow-md flex flex-col sm:flex-row items-center justify-between gap-6 border border-slate-800">
        <div>
          <h3 className="text-xl font-bold mb-1">
            Build Practical German Confidence Every Day
          </h3>
          <p className="text-sm text-slate-300 max-w-xl">
            Join thousands of newcomers practicing with German Teacher. Free audio lessons, speech evaluation, and 24/7 AI tutor guidance.
          </p>
        </div>
        <button
          onClick={onGetStarted}
          className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md transition-colors shrink-0 cursor-pointer"
        >
          Create Free Account
        </button>
      </section>
    </PublicSEOPageLayout>
  );
};
