import React from 'react';
import { useSEO } from './useSEO';
import { PublicSEOPageLayout } from './PublicSEOPageLayout';
import { SpeakButton } from './SpeakButton';
import { NavSection } from '../Navbar';
import { 
  GraduationCap, 
  BookOpen, 
  Mail, 
  Home, 
  Briefcase, 
  Users, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';

interface PublicStudentsPageProps {
  onNavigate: (section: NavSection) => void;
  onGetStarted: () => void;
  onLogin: () => void;
}

export const PublicStudentsPage: React.FC<PublicStudentsPageProps> = ({
  onNavigate,
  onGetStarted,
  onLogin
}) => {
  useSEO({
    title: 'German for International Students in Germany – University & Campus Guide | German Teacher',
    description: 'Essential German phrases, university vocabulary, and campus communication for international students in Germany: enrolling, professors, Mensa, WG living, and student jobs.',
    canonicalUrl: 'https://germanteacher.store/german-for-international-students',
    ogTitle: 'German for International Students in Germany',
    ogDescription: 'Comprehensive guide for international students in Germany: university vocabulary, emailing professors, finding a WG, and applying for Werkstudent jobs.'
  });

  const universityVocab = [
    { de: 'die Immatrikulation', en: 'official university enrollment', audio: 'die Immatrikulation' },
    { de: 'der Semesterbeitrag', en: 'semester fee (includes public transit ticket)', audio: 'der Semesterbeitrag' },
    { de: 'die Vorlesung / das Seminar', en: 'lecture / interactive seminar', audio: 'die Vorlesung und das Seminar' },
    { de: 'die Klausur / die Prüfung', en: 'written exam / final examination', audio: 'die Klausur und die Prüfung' },
    { de: 'die Mensa / das Studentenwerk', en: 'student cafeteria / student union organization', audio: 'die Mensa und das Studentenwerk' },
    { de: 'die Universitätsbibliothek (UB)', en: 'university library', audio: 'die Universitätsbibliothek' },
    { de: 'das Prüfungsamt', en: 'examination board / examination office', audio: 'das Prüfungsamt' },
    { de: 'die Sprechstunde', en: 'office hours (professor consultation time)', audio: 'die Sprechstunde' }
  ];

  const emailPhrases = [
    {
      title: '1. Formal Salutation',
      de: 'Sehr geehrte Frau Professor Dr. Müller, / Sehr geehrter Herr Dr. Weber,',
      en: 'Dear Professor Dr. Müller, / Dear Dr. Weber,',
      audio: 'Sehr geehrte Frau Professor Dr. Müller,'
    },
    {
      title: '2. Stating Your Course & Matriculation Number',
      de: 'Ich besuche Ihre Vorlesung "Einführung in die Informatik" (Matrikelnummer: 1234567).',
      en: 'I attend your lecture "Introduction to Computer Science" (Matriculation No.: 1234567).',
      audio: 'Ich besuche Ihre Vorlesung'
    },
    {
      title: '3. Requesting an Office Hour Appointment',
      de: 'Wäre es möglich, einen kurzen Termin während Ihrer Sprechstunde zu vereinbaren?',
      en: 'Would it be possible to arrange a brief appointment during your office hours?',
      audio: 'Wäre es möglich, einen kurzen Termin während Ihrer Sprechstunde zu vereinbaren?'
    },
    {
      title: '4. Asking about Exam Registration',
      de: 'Könnten Sie mir bitte mitteilen, bis wann die Anmeldung zur Klausur im Prüfungsamt erfolgen muss?',
      en: 'Could you please inform me by when exam registration must be submitted at the examination office?',
      audio: 'Könnten Sie mir bitte mitteilen, bis wann die Anmeldung zur Klausur erfolgen muss?'
    },
    {
      title: '5. Formal Sign-off',
      de: 'Vielen Dank für Ihre Zeit und Unterstützung. Mit freundlichen Grüßen, [Dein Name]',
      en: 'Thank you very much for your time and assistance. Kind regards, [Your Name]',
      audio: 'Mit freundlichen Grüßen'
    }
  ];

  const wgPhrases = [
    {
      context: 'Viewing a WG room',
      de: 'Hallo zusammen! Vielen Dank für die Einladung zur WG-Besichtigung.',
      en: 'Hello everyone! Thank you very much for the invitation to the flatshare viewing.',
      audio: 'Hallo zusammen! Vielen Dank für die Einladung zur WG-Besichtigung.'
    },
    {
      context: 'Asking about rent & bills',
      de: 'Sind in der Warmmiete Strom, Heizung und Internet bereits enthalten?',
      en: 'Are electricity, heating, and internet already included in the warm rent?',
      audio: 'Sind in der Warmmiete Strom, Heizung und Internet bereits enthalten?'
    },
    {
      context: 'Household cleaning routines',
      de: 'Wie organisiert ihr den Putzplan und das Einkaufen für die WG?',
      en: 'How do you organize the cleaning schedule and shopping for the flatshare?',
      audio: 'Wie organisiert ihr den Putzplan und das Einkaufen für die WG?'
    },
    {
      context: 'Expressing genuine interest',
      de: 'Mir gefällt die Wohnung und die entspannte Atmosphäre bei euch wirklich sehr gut!',
      en: 'I really like the apartment and the relaxed atmosphere with you all!',
      audio: 'Mir gefällt die Wohnung und die entspannte Atmosphäre bei euch wirklich sehr gut!'
    }
  ];

  const jobTerms = [
    {
      term: 'der Werkstudent (Working Student)',
      desc: 'Allows students enrolled at German universities to work up to 20 hours per week during term time and full-time during semester breaks, exempt from health and unemployment insurance contributions.',
      vocab: 'die 20-Stunden-Regel, die Immatrikulationsbescheinigung'
    },
    {
      term: 'der Minijob (538€ Basis)',
      desc: 'A marginal employment contract where you earn up to 538 Euros per month tax-free without income deductions, perfect for supplementary campus or hospitality work.',
      vocab: 'die geringfügige Beschäftigung, die Rentenversicherungspflicht'
    },
    {
      term: 'Bewerbungsunterlagen (Application Documents)',
      desc: 'German employers expect three core documents: Anschreiben (cover letter in German), tabellarischer Lebenslauf (chronological CV with photo and language levels), and Zeugnisse (academic certificates).',
      vocab: 'das Anschreiben, der tabellarische Lebenslauf, das Arbeitszeugnis'
    }
  ];

  return (
    <PublicSEOPageLayout
      title="German for International Students: University, Campus & Student Jobs Guide"
      badge="Student Guide"
      subtitle="The ultimate survival German resource for international students in Germany: academic vocabulary, emailing professors politely, passing WG interviews, and applying for Werkstudent positions."
      currentPath="/german-for-international-students"
      sampleGermanPhrase="Ich studiere an einer deutschen Hochschule und lerne Deutsch für mein Studium und meinen Werkstudentenjob."
      samplePhraseTranslation="I study at a German university and am learning German for my studies and working student job."
      onNavigate={onNavigate}
      onGetStarted={onGetStarted}
      onLogin={onLogin}
    >
      {/* Intro Section */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <h2 className="text-xl sm:text-2xl font-bold text-[#0A1128] mb-3">
          Succeeding as an International Student in Germany
        </h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-4">
          Germany is one of the top destinations worldwide for international students, with hundreds of thousands studying across renowned universities and technical universities (TU9). While many Master's degrees are taught in English, daily life, university bureaucracy, student housing (WGs), and competitive student jobs (<strong className="text-slate-900">Werkstudentenstellen</strong>) require solid German communication skills.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-200">
            <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider block mb-1">Campus Life</span>
            <span className="text-sm font-bold text-indigo-950 block mb-1">Lectures & Administration</span>
            <p className="text-xs text-indigo-900/80">Understand exam protocols, email etiquette, and academic deadlines.</p>
          </div>
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block mb-1">Living</span>
            <span className="text-sm font-bold text-amber-950 block mb-1">WG Flatshares</span>
            <p className="text-xs text-amber-900/80">Stand out in competitive WG castings on WG-Gesucht and make local friends.</p>
          </div>
          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">Career</span>
            <span className="text-sm font-bold text-emerald-950 block mb-1">Werkstudent Jobs</span>
            <p className="text-xs text-emerald-900/80">Earn money, gain German industry experience, and build your resume.</p>
          </div>
        </div>
      </section>

      {/* University & Campus Vocabulary */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <h2 className="text-xl sm:text-2xl font-bold text-[#0A1128] mb-4">
          Core German University & Campus Vocabulary
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {universityVocab.map((item, idx) => (
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

      {/* Professor Email Etiquette */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <Mail className="w-5 h-5 text-red-600" />
          <h2 className="text-xl sm:text-2xl font-bold text-[#0A1128]">
            Writing Formal German Emails to Professors & Administration
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
          German academic communication is formal and respectful. Always include the correct academic title (<em>Prof. Dr.</em>), your degree program, your student ID (<strong className="text-slate-900">Matrikelnummer</strong>), and the formal polite "Sie".
        </p>

        <div className="space-y-3">
          {emailPhrases.map((phrase, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-bold text-red-700 block mb-1">{phrase.title}</span>
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-sm font-semibold text-slate-900">{phrase.de}</span>
                <SpeakButton text={phrase.audio} />
              </div>
              <span className="text-xs text-slate-500 block">{phrase.en}</span>
            </div>
          ))}
        </div>
      </section>

      {/* WG Wohngemeinschaft Guide */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <Home className="w-5 h-5 text-amber-500" />
          <h2 className="text-xl sm:text-2xl font-bold text-[#0A1128]">
            Finding a WG (Flatshare) & Passing the Casting
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
          Over 60% of international students in Germany live in a <strong className="text-slate-900">Wohngemeinschaft (WG)</strong>. When interviewing on WG-Gesucht or visiting a shared flat, demonstrating conversational German shows you are committed to engaging with your housemates.
        </p>

        <div className="space-y-3">
          {wgPhrases.map((phrase, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 block mb-0.5">{phrase.context}</span>
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-sm font-semibold text-slate-900">{phrase.de}</span>
                <SpeakButton text={phrase.audio} />
              </div>
              <span className="text-xs text-slate-500 block">{phrase.en}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Working Student (Werkstudent) Guide */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <Briefcase className="w-5 h-5 text-emerald-600" />
          <h2 className="text-xl sm:text-2xl font-bold text-[#0A1128]">
            Working as a Student in Germany: Werkstudent & Minijob
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
          Non-EU international students with a student visa are permitted to work up to <strong>140 full days or 280 half days</strong> per calendar year. Here are the most popular working formats:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {jobTerms.map((job, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-2">{job.term}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">{job.desc}</p>
              </div>
              <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500">
                <span className="font-semibold text-slate-700">Key Vocab: </span>
                {job.vocab}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Student CTA */}
      <section className="bg-gradient-to-r from-indigo-700 to-indigo-800 text-white p-6 sm:p-8 rounded-2xl shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold mb-1">
            Practice Real Student Conversations with German Teacher
          </h3>
          <p className="text-sm text-indigo-100 max-w-xl">
            Simulate realistic dialogues: asking university peers for notes, speaking with professors during office hours, and rehearsing job interviews.
          </p>
        </div>
        <button
          onClick={onGetStarted}
          className="px-6 py-3 rounded-xl bg-white text-indigo-900 hover:bg-slate-100 font-bold text-sm shadow-md transition-colors shrink-0 cursor-pointer"
        >
          Start Student Practice Free
        </button>
      </section>
    </PublicSEOPageLayout>
  );
};
