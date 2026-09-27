import React from 'react';
import { useSEO } from './useSEO';
import { PublicSEOPageLayout } from './PublicSEOPageLayout';
import { SpeakButton } from './SpeakButton';
import { NavSection } from '../Navbar';
import { 
  Building2, 
  CheckCircle2, 
  FileText, 
  AlertCircle, 
  Calendar, 
  ArrowRight,
  MessageSquare,
  ShieldCheck
} from 'lucide-react';

interface PublicAnmeldungPageProps {
  onNavigate: (section: NavSection) => void;
  onGetStarted: () => void;
  onLogin: () => void;
}

export const PublicAnmeldungPage: React.FC<PublicAnmeldungPageProps> = ({
  onNavigate,
  onGetStarted,
  onLogin
}) => {
  useSEO({
    title: 'German for Anmeldung & Bürgeramt – Registration Guide & Phrases | German Teacher',
    description: 'Complete German guide for Anmeldung (city registration) at the Bürgeramt. Key vocabulary, essential documents, step-by-step phrases, and appointment dialogues.',
    canonicalUrl: 'https://germanteacher.store/german-for-anmeldung',
    ogTitle: 'German for Anmeldung & Bürgeramt Guide',
    ogDescription: 'Master the German phrases, documents, and dialogue needed for your city registration (Anmeldung) at the Bürgeramt.'
  });

  const documentChecklist = [
    {
      de: 'Gültiger Reisepass oder Personalausweis',
      en: 'Valid Passport or National ID card (for each person registering)',
      required: true,
      note: 'Must be physically presented in original form.'
    },
    {
      de: 'Die Wohnungsgeberbestätigung',
      en: 'Landlord Confirmation Certificate',
      required: true,
      note: 'Legally required document signed by your landlord confirming your move-in date.'
    },
    {
      de: 'Das ausgefüllte Anmeldeformular',
      en: 'Completed Registration Form (Anmeldung)',
      required: true,
      note: 'Downloaded from your city service portal or filled out at the desk.'
    },
    {
      de: 'Heiratsurkunde / Geburtsurkunden (falls zutreffend)',
      en: 'Marriage or Birth Certificates (if registering with family)',
      required: false,
      note: 'Must often be officially translated into German by a certified translator.'
    }
  ];

  const keyVocab = [
    { de: 'die Wohnsitzanmeldung', en: 'address registration', audio: 'die Wohnsitzanmeldung' },
    { de: 'die Meldebescheinigung', en: 'registration certificate (official proof of address)', audio: 'die Meldebescheinigung' },
    { de: 'die Steuer-Identifikationsnummer (Steuer-ID)', en: 'tax identification number', audio: 'die Steuer-Identifikationsnummer' },
    { de: 'die Wohnungsgeberbestätigung', en: 'landlord move-in confirmation form', audio: 'die Wohnungsgeberbestätigung' },
    { de: 'der Termin / die Wartenummer', en: 'appointment / waiting ticket number', audio: 'der Termin' },
    { de: 'das Einwohnermeldeamt / Bürgeramt', en: 'residents registration office', audio: 'das Bürgeramt' }
  ];

  const stepPhrases = [
    {
      step: '1. Arriving & Checking In',
      de: 'Guten Tag, ich habe einen Termin um 10:15 Uhr für die Wohnsitzanmeldung.',
      en: 'Good day, I have an appointment at 10:15 AM for address registration.',
      tip: 'Show your confirmation email or printout with your appointment number (Vorgangsnummer).'
    },
    {
      step: '2. Handing Over Documents',
      de: 'Hier sind mein Reisepass und die Wohnungsgeberbestätigung von meinem Vermieter.',
      en: 'Here is my passport and the landlord confirmation from my landlord.',
      tip: 'The clerk will inspect both documents and verify your move-in date.'
    },
    {
      step: '3. Confirming Address Details',
      de: 'Die neue Adresse lautet Hauptstraße 12, 10115 Berlin, 2. Stock links.',
      en: 'The new address is Hauptstraße 12, 10115 Berlin, 2nd floor on the left.',
      tip: 'Ensure postal address and apartment floor match your rental contract exactly.'
    },
    {
      step: '4. Religious Denomination (Kirchensteuer)',
      de: 'Ich gehöre keiner Religionsgemeinschaft an. / Ohne Religionszugehörigkeit.',
      en: 'I do not belong to any religious community. / No religion.',
      tip: 'If you register as Roman Catholic or Protestant, German tax authorities automatically withhold Church Tax (8-9% of income tax).'
    },
    {
      step: '5. Asking for Tax ID & Meldebescheinigung',
      de: 'Wann erhalte ich die Meldebescheinigung und meine Steuer-ID?',
      en: 'When will I receive the registration certificate and my tax ID?',
      tip: 'You receive the stamped Meldebescheinigung immediately. Your Tax ID arrives by letter within 2 to 4 weeks.'
    }
  ];

  const dialogueSample = [
    {
      speaker: 'Bürgeramt-Sachbearbeiterin',
      de: 'Guten Tag! Haben Sie eine Wartenummer oder einen Termin?',
      en: 'Good day! Do you have a waiting ticket or an appointment?',
      audio: 'Guten Tag! Haben Sie eine Wartenummer oder einen Termin?'
    },
    {
      speaker: 'Du (Learner)',
      de: 'Guten Tag! Ja, ich habe einen Termin um 10:15 Uhr unter dem Namen Sharma.',
      en: 'Good day! Yes, I have an appointment at 10:15 AM under the name Sharma.',
      audio: 'Guten Tag! Ja, ich habe einen Termin um zehn Uhr fünfzehn.'
    },
    {
      speaker: 'Bürgeramt-Sachbearbeiterin',
      de: 'Sehr schön. Bitte geben Sie mir Ihren Reisepass und das Bestätigungsformular vom Vermieter.',
      en: 'Very good. Please hand me your passport and the confirmation form from the landlord.',
      audio: 'Bitte geben Sie mir Ihren Reisepass und das Bestätigungsformular vom Vermieter.'
    },
    {
      speaker: 'Du (Learner)',
      de: 'Gerne, hier sind alle Dokumente vollständig.',
      en: 'Gladly, here are all the documents in full.',
      audio: 'Gerne, hier sind alle Dokumente vollständig.'
    },
    {
      speaker: 'Bürgeramt-Sachbearbeiterin',
      de: 'Wunderbar. Bitte prüfen Sie die Angaben auf dem Ausdruck und unterschreiben Sie hier unten rechts.',
      en: 'Wonderful. Please check the information on the printout and sign here at the bottom right.',
      audio: 'Bitte prüfen Sie die Angaben und unterschreiben Sie hier unten rechts.'
    },
    {
      speaker: 'Du (Learner)',
      de: 'Alles stimmt. Vielen Dank für Ihre Hilfe und auf Wiedersehen!',
      en: 'Everything is correct. Thank you very much for your help and goodbye!',
      audio: 'Alles stimmt. Vielen Dank für Ihre Hilfe und auf Wiedersehen!'
    }
  ];

  return (
    <PublicSEOPageLayout
      title="German for Anmeldung & Bürgeramt: Complete Guide, Phrases & Vocabulary"
      badge="Bureaucracy Guide"
      subtitle="Everything you need to successfully register your address (Wohnsitzanmeldung) in Germany: required documents, step-by-step counter German phrases, tax ID insights, and interactive dialogue simulation."
      currentPath="/german-for-anmeldung"
      sampleGermanPhrase="Guten Tag! Ich habe einen Termin für die Wohnsitzanmeldung und habe alle Dokumente dabei."
      samplePhraseTranslation="Good day! I have an appointment for address registration and have all documents with me."
      onNavigate={onNavigate}
      onGetStarted={onGetStarted}
      onLogin={onLogin}
    >
      {/* What is Anmeldung Explainer */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-bold text-red-600 uppercase tracking-wider mb-2">
          <span>Legal Requirement</span>
          <span>·</span>
          <span>§ 17 Federal Registration Act (BMG)</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-[#0A1128] mb-3">
          What is the Anmeldung in Germany?
        </h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-4">
          In Germany, every individual who moves into an apartment or room—whether as an international student, expat worker, or EU citizen—is legally required to register their address at the local resident's registration office (<em>Bürgeramt</em> or <em>Einwohnermeldeamt</em>) within <strong>14 days of moving in</strong>.
        </p>
        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          Without the official registration certificate (<strong className="text-slate-900">Meldebescheinigung</strong>), you cannot open a traditional German bank account, receive your German Tax ID (<strong className="text-slate-900">Steuer-ID</strong>), sign a mobile contract, or finalize your university enrollment.
        </p>

        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-900 leading-relaxed">
            <strong className="font-bold text-amber-950">Crucial Rule: </strong>
            You cannot complete your Anmeldung with a rental contract alone. You <strong className="underline">must</strong> obtain the signed <em>Wohnungsgeberbestätigung</em> (landlord certificate) from your landlord or primary tenant.
          </div>
        </div>
      </section>

      {/* Mandatory Document Checklist */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <h2 className="text-xl sm:text-2xl font-bold text-[#0A1128] mb-4">
          Mandatory Document Checklist for Your Appointment
        </h2>
        <div className="space-y-3">
          {documentChecklist.map((doc, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-bold text-slate-900">{doc.de}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${doc.required ? 'bg-red-100 text-red-700' : 'bg-slate-200 text-slate-700'}`}>
                    {doc.required ? 'Mandatory' : 'If applicable'}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-0.5">{doc.en}</p>
                <p className="text-[11px] text-slate-500 italic mt-1">{doc.note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Key Bürgeramt Vocabulary */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <h2 className="text-xl sm:text-2xl font-bold text-[#0A1128] mb-4">
          Essential Bürgeramt Vocabulary with Audio
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {keyVocab.map((item, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
              <div>
                <span className="text-sm font-bold text-slate-900 block">{item.de}</span>
                <span className="text-xs text-slate-500">{item.en}</span>
              </div>
              <SpeakButton text={item.audio} />
            </div>
          ))}
        </div>
      </section>

      {/* Step-by-Step German Phrases at the Counter */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <h2 className="text-xl sm:text-2xl font-bold text-[#0A1128] mb-4">
          Step-by-Step Counter Phrases You Will Need
        </h2>
        <div className="space-y-4">
          {stepPhrases.map((phrase, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-bold text-red-600 block mb-1">{phrase.step}</span>
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-sm font-bold text-slate-900">{phrase.de}</span>
                <SpeakButton text={phrase.de} />
              </div>
              <p className="text-xs text-slate-600 mb-2">{phrase.en}</p>
              <div className="text-[11px] text-slate-500 bg-white p-2 rounded border border-slate-200/80">
                💡 <strong className="text-slate-700">Practical Tip: </strong>{phrase.tip}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Real-Life Dialogue Simulation */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="mb-4">
          <span className="text-xs font-bold text-red-600 uppercase tracking-wider block mb-1">
            Realistic Dialogue Simulation
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0A1128]">
            Sample Appointment at the Bürgeramt
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Listen to native German speech for both the registration officer and learner responses.
          </p>
        </div>

        <div className="space-y-3">
          {dialogueSample.map((line, idx) => {
            const isOfficer = line.speaker.includes('Bürgeramt');
            return (
              <div 
                key={idx}
                className={`p-3.5 rounded-xl border flex items-start gap-3 ${
                  isOfficer 
                    ? 'bg-slate-50 border-slate-200 text-slate-900' 
                    : 'bg-red-50/50 border-red-200/80 text-slate-900'
                }`}
              >
                <SpeakButton text={line.audio} />
                <div className="flex-1">
                  <span className={`text-[11px] font-bold block mb-0.5 ${isOfficer ? 'text-slate-600' : 'text-red-700'}`}>
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

      {/* Booking Tips */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <h2 className="text-xl sm:text-2xl font-bold text-[#0A1128] mb-3">
          How to Secure an Appointment in Crowded German Cities
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-sm font-bold text-slate-900 block mb-1">Check at 8:00 AM</span>
            <p className="text-xs text-slate-600 leading-relaxed">
              Most city booking portals (like service.berlin.de) release same-day cancellation slots every weekday between 7:45 and 8:15 AM.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-sm font-bold text-slate-900 block mb-1">Any Office in City</span>
            <p className="text-xs text-slate-600 leading-relaxed">
              You can register at <em>any</em> Bürgeramt in your city, not just the one in your immediate neighborhood. Check outer districts for faster dates.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-sm font-bold text-slate-900 block mb-1">Dial 115</span>
            <p className="text-xs text-slate-600 leading-relaxed">
              The public authorities hotline <strong className="text-slate-900">115</strong> can often view citywide emergency cancellation slots over the telephone.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Conversation Practice CTA */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 sm:p-8 rounded-2xl shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold mb-1">
            Roleplay the Bürgeramt Scenario with AI German Teacher
          </h3>
          <p className="text-sm text-red-100 max-w-xl">
            Practice speaking with Frau Schneider, our simulated Bürgeramt clerk. Speak through your microphone, get instant pronunciation correction, and overcome appointment nerves.
          </p>
        </div>
        <button
          onClick={onGetStarted}
          className="px-6 py-3 rounded-xl bg-white text-red-700 hover:bg-slate-100 font-bold text-sm shadow-md transition-colors shrink-0 cursor-pointer"
        >
          Try Free Roleplay Session
        </button>
      </section>
    </PublicSEOPageLayout>
  );
};
