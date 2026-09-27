import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { speakGerman } from '../utils/audio';
import { 
  ArrowRight, 
  Sparkles, 
  Volume2, 
  CheckCircle2, 
  ShieldCheck, 
  BookOpen, 
  Layers, 
  MessageSquareText, 
  Mic, 
  MessageSquare, 
  TrendingUp, 
  Home, 
  Building2, 
  Stethoscope, 
  CreditCard, 
  ShoppingBag, 
  Briefcase, 
  GraduationCap, 
  Users, 
  ChevronDown, 
  Play, 
  Award,
  Compass,
  FileText
} from 'lucide-react';

interface PublicHomePageProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

export const PublicHomePage: React.FC<PublicHomePageProps> = ({
  onGetStarted,
  onLogin
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handlePlaySample = async () => {
    try {
      setIsPlayingAudio(true);
      await speakGerman('Guten Tag! Willkommen bei German Teacher. Wir lernen praktisches Deutsch für den Alltag in Deutschland.');
    } finally {
      setIsPlayingAudio(false);
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(prev => (prev === index ? null : index));
  };

  const features = [
    {
      id: 'german-teacher',
      title: 'German Teacher Guidance',
      tag: 'Core Method',
      icon: <Compass className="w-6 h-6 text-red-600" />,
      description: 'A focused, learner-first German learning environment created specifically for newcomers, students, and professionals adapting to life in Germany.'
    },
    {
      id: 'real-life-germany',
      title: 'Real Life in Germany',
      tag: 'Practical Scenarios',
      icon: <Building2 className="w-6 h-6 text-amber-500" />,
      description: 'Practical situational modules covering city registration (Anmeldung), opening a bank account (Girokonto), doctor appointments, supermarkets, and German workplace communication.'
    },
    {
      id: 'a1-b2-learning',
      title: 'A1–B2 CEFR Learning',
      tag: 'Structured Roadmap',
      icon: <BookOpen className="w-6 h-6 text-blue-600" />,
      description: 'Step-by-step modular lessons aligned with CEFR standards (Goethe / Telc framework) taking you from beginner survival German to confident independent fluency.'
    },
    {
      id: 'vocabulary',
      title: 'Vocabulary with Articles',
      tag: 'Gender Color-Coded',
      icon: <Layers className="w-6 h-6 text-emerald-600" />,
      description: 'Master German nouns with strict grammatical gender associations (der masculine, die feminine, das neutral), plural forms, clear audio pronunciation, and real context sentences.'
    },
    {
      id: 'conversation-practice',
      title: 'Conversation Practice',
      tag: 'Interactive Dialogue',
      icon: <MessageSquareText className="w-6 h-6 text-purple-600" />,
      description: 'Interactive realistic dialogue scenarios across Germany with instant comprehension checks, colloquial phrasing, and situational cultural context.'
    },
    {
      id: 'speaking-practice',
      title: 'Speaking Practice',
      tag: 'Speech Recognition',
      icon: <Mic className="w-6 h-6 text-rose-600" />,
      description: 'Interactive voice recognition in your browser that lets you speak German aloud, receive instant feedback, and build pronunciation confidence without anxiety.'
    },
    {
      id: 'ai-german-teacher',
      title: 'AI German Teacher',
      tag: '24/7 Assistant',
      icon: <MessageSquare className="w-6 h-6 text-indigo-600" />,
      description: 'Your intelligent language partner available round-the-clock to deconstruct complex German grammar cases, explain sentence structure, and assist with official German letters.'
    },
    {
      id: 'progress-tracking',
      title: 'Progress Tracking',
      tag: 'Daily Milestones',
      icon: <TrendingUp className="w-6 h-6 text-amber-600" />,
      description: 'A personal learning dashboard tracking your XP points, daily learning streaks, lesson mastery, and level milestones to ensure steady, measurable advancement.'
    }
  ];

  const practicalTopics = [
    {
      title: 'Wohnung & Anmeldung',
      subtitle: 'Apartment & City Registration',
      icon: <Home className="w-5 h-5 text-red-600" />,
      items: ['Bürgeramt Anmeldung appointment', 'Landlord confirmation (Wohnungsgeberbestätigung)', 'Rental contract & deposit (Mietvertrag & Kaution)', 'Subletting & flatshares (WG-Zimmer)']
    },
    {
      title: 'Bank & Finanzen',
      subtitle: 'Banking & Money in Germany',
      icon: <CreditCard className="w-5 h-5 text-amber-500" />,
      items: ['Opening a checking account (Girokonto)', 'Direct debit & transfers (SEPA-Lastschrift & Überweisung)', 'Understanding the Tax ID (Steuer-ID)', 'Cash vs. Girocard customs']
    },
    {
      title: 'Arzt & Gesundheit',
      subtitle: 'Healthcare & Pharmacies',
      icon: <Stethoscope className="w-5 h-5 text-emerald-600" />,
      items: ['Booking an appointment with a GP (Hausarzt)', 'Health insurance card (Gesundheitskarte)', 'Prescription medicine at the pharmacy (Apotheke)', 'Sick leave certificate (Arbeitsunfähigkeitsbescheinigung)']
    },
    {
      title: 'Einkaufen & Alltag',
      subtitle: 'Shopping & Daily Life',
      icon: <ShoppingBag className="w-5 h-5 text-blue-600" />,
      items: ['Supermarket checkout conversations', 'Ordering bread & rolls at the bakery (Bäckerei)', 'Public transportation tickets (DB, S-Bahn, U-Bahn)', 'Waste separation guidelines (Mülltrennung)']
    },
    {
      title: 'Arbeit & Karriere',
      subtitle: 'Work & Professional German',
      icon: <Briefcase className="w-5 h-5 text-purple-600" />,
      items: ['German CV format (Lebenslauf)', 'Job interview questions & answers', 'Formal vs. informal address (Sie vs. Du)', 'Workplace culture & the concept of Feierabend']
    },
    {
      title: 'Studium & Hochschule',
      subtitle: 'University & Student Life',
      icon: <GraduationCap className="w-5 h-5 text-indigo-600" />,
      items: ['University enrollment (Immatrikulation)', 'Campus cafeteria (Mensa) vocabulary', 'Course registration & exams (Klausuren)', 'Interacting with professors & student secretariats']
    },
    {
      title: 'Behörden & Formulare',
      subtitle: 'Immigration & Official Letters',
      icon: <FileText className="w-5 h-5 text-teal-600" />,
      items: ['Residence permit at Ausländerbehörde', 'Understanding formal German bureaucratic letters', 'Replying to official notices with deadlines', 'Essential administrative vocabulary']
    },
    {
      title: 'Soziales & Freizeit',
      subtitle: 'Social Life & Community',
      icon: <Users className="w-5 h-5 text-rose-600" />,
      items: ['Small talk with neighbors & colleagues', 'Ordering food & drinks at restaurants & cafés', 'Joining local clubs & sports associations (Vereine)', 'Cultural customs & punctuality in Germany']
    }
  ];

  const howItWorksSteps = [
    {
      step: '01',
      title: 'Choose Your CEFR Level',
      desc: 'Start as an absolute beginner in A1 with greetings and the alphabet, or pick up at A2, B1, or B2 to sharpen specific grammar and vocabulary.'
    },
    {
      step: '02',
      title: 'Learn Real-Life German',
      desc: 'Study interactive vocabulary paired with gender articles, listen to native audio, and walk through authentic German everyday scenarios.'
    },
    {
      step: '03',
      title: 'Practice Speaking & Conversing',
      desc: 'Engage with speech-enabled pronunciation drills and interactive conversation modules that simulate authentic German interactions.'
    },
    {
      step: '04',
      title: 'Ask the AI Teacher 24/7',
      desc: 'Get immediate clarifications on complex German grammar, tricky cases, or formal bureaucratic letters anytime you need help.'
    }
  ];

  const faqs = [
    {
      question: 'What CEFR levels does German Teacher cover?',
      answer: 'German Teacher covers CEFR levels from A1 (complete beginner) through A2 (elementary), B1 (intermediate), and B2 (upper intermediate). The curriculum is structured around the standards utilized by Goethe-Institut and telc certifications.'
    },
    {
      question: 'How does German Teacher prepare me for everyday life in Germany?',
      answer: 'Unlike generic language apps that teach abstract sentences, German Teacher focuses directly on the real situations you encounter living in Germany: registering your address at the Bürgeramt, opening a bank account, visiting a doctor, dealing with health insurance, renting an apartment, and communicating at work.'
    },
    {
      question: 'What is the AI German Teacher and how does it assist me?',
      answer: 'The AI German Teacher is a 24/7 language assistant powered by intelligent language models. It helps answer grammar questions, explains the differences between German cases (Nominativ, Akkusativ, Dativ, Genitiv), translates and deconstructs idioms, and helps you formulate letters or emails for German bureaucracy.'
    },
    {
      question: 'How does the Speaking Practice feature work?',
      answer: 'Speaking Practice uses modern in-browser speech recognition combined with authentic German speech synthesis. You can listen to native German models at comfortable learning speeds, speak the phrases aloud into your microphone, and verify your pronunciation with instant visual feedback.'
    },
    {
      question: 'Is German Teacher free to use?',
      answer: 'Yes! You can create a free account to access foundational A1 courses, vocabulary decks, practice quizzes, and daily AI Teacher messages. An optional Premium plan is also available for learners who want unlimited AI Teacher interactions and extended conversation scenarios.'
    },
    {
      question: 'Do I need any previous German knowledge to get started?',
      answer: 'No prior knowledge is required. Beginners can start immediately with Lesson 1 in Level A1, which introduces German pronunciation, essential greetings, numbers, and basic survival phrases with English translations.'
    }
  ];

  return (
    <div className="w-full max-w-full overflow-x-hidden bg-white text-slate-900">
      
      {/* ======================================================== */}
      {/* 1. HERO SECTION */}
      {/* ======================================================== */}
      <section 
        id="hero" 
        aria-labelledby="hero-heading"
        className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-[#0A1128] text-white pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-800"
      >
        {/* Ambient Glows */}
        <div className="absolute inset-0 pointer-events-none opacity-20" aria-hidden="true">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-red-600 blur-3xl" />
          <div className="absolute top-1/2 -left-40 w-96 h-96 rounded-full bg-amber-500 blur-3xl" />
          <div className="absolute -bottom-20 right-1/4 w-80 h-80 rounded-full bg-blue-600 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Category Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/90 border border-slate-700/80 text-amber-300 text-xs font-semibold backdrop-blur-md shadow-xs">
                <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                <span>The German Platform for Real Life in Germany</span>
              </div>

              {/* Brand Logo Display */}
              <div className="flex justify-center lg:justify-start">
                <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 shadow-lg inline-block">
                  <BrandLogo size="lg" inverted={true} />
                </div>
              </div>

              {/* Clear Main Headline */}
              <h1 
                id="hero-heading"
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-['Outfit'] text-white leading-[1.15]"
              >
                Learn German.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-amber-300">
                  Live Confidently
                </span>{' '}
                in Germany.
              </h1>

              {/* Short Descriptive Paragraph */}
              <p className="text-base sm:text-lg lg:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Your personal German teacher for everyday conversations, vocabulary, grammar, and practical life in Germany — guiding you step-by-step from beginner A1 to independent B2.
              </p>

              {/* Primary Call-to-Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  id="public-hero-get-started-btn"
                  onClick={onGetStarted}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-base shadow-lg shadow-red-600/30 hover:shadow-red-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 group"
                >
                  <span>Get Started Free</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  id="public-hero-login-btn"
                  onClick={onLogin}
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-base border border-white/20 backdrop-blur-md shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5"
                >
                  <span>Log In to Your Account</span>
                </button>
              </div>

              {/* Key Value Assurances */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6 text-xs font-semibold text-slate-300 border-t border-slate-800">
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>CEFR A1–B2 Standard</span>
                </div>
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Practical Germany Scenarios</span>
                </div>
                <div className="flex items-center gap-2 justify-center lg:justify-start col-span-2 sm:col-span-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Free to Get Started</span>
                </div>
              </div>

            </div>

            {/* Right Interactive Preview Card */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md bg-white rounded-3xl p-6 text-slate-900 shadow-2xl border border-slate-200">
                
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center font-bold text-lg">
                      🇩🇪
                    </div>
                    <div>
                      <h2 className="font-extrabold text-sm text-slate-900">Real Life in Germany Preview</h2>
                      <p className="text-[11px] text-slate-500">Citizen Office · Bürgeramt Anmeldung</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-200">
                    A1 Practical
                  </span>
                </div>

                {/* Dialog Simulation */}
                <div className="py-4 space-y-3">
                  <div className="p-3 rounded-2xl bg-slate-100/90 text-xs space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
                      <span>Beamter (City Official)</span>
                      <span>10:15</span>
                    </div>
                    <p className="font-semibold text-slate-900">
                      &quot;Guten Tag! Haben Sie Ihre Wohnungsgeberbestätigung dabei?&quot;
                    </p>
                    <p className="text-[11px] text-slate-500 italic">
                      (Good day! Do you have your landlord confirmation with you?)
                    </p>
                  </div>

                  <div className="p-3 rounded-2xl bg-red-50 border border-red-100 text-xs space-y-1 ml-4">
                    <div className="flex items-center justify-between text-[11px] font-bold text-red-700">
                      <span>Du (You)</span>
                      <span className="text-emerald-700 font-bold">Learned with German Teacher</span>
                    </div>
                    <p className="font-bold text-slate-900">
                      &quot;Ja, hier bitte! Alles ist vom Vermieter ausgefüllt und unterschrieben.&quot;
                    </p>
                    <p className="text-[11px] text-slate-600 italic">
                      (Yes, here please! Everything is filled out and signed by the landlord.)
                    </p>
                  </div>
                </div>

                {/* Audio Sample Button */}
                <div className="p-3.5 rounded-2xl bg-slate-900 text-white flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <button
                      id="public-hero-audio-sample-btn"
                      onClick={handlePlaySample}
                      disabled={isPlayingAudio}
                      className="w-10 h-10 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 flex items-center justify-center shadow-sm transition-transform active:scale-95 disabled:opacity-50"
                      aria-label="Listen to authentic German audio greeting"
                    >
                      {isPlayingAudio ? (
                        <Volume2 className="w-5 h-5 animate-pulse" />
                      ) : (
                        <Play className="w-4 h-4 ml-0.5 fill-current" />
                      )}
                    </button>
                    <div>
                      <div className="text-xs font-bold">Hear Authentic German</div>
                      <div className="text-[11px] text-slate-400">Native pronunciation audio player</div>
                    </div>
                  </div>
                  <div className="text-[10px] font-mono text-amber-300 bg-white/10 px-2 py-1 rounded-md">
                    0.88x Speed
                  </div>
                </div>

                {/* Situational Tags */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-1.5 text-[11px]">
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium">
                    🏠 Anmeldung
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium">
                    🏦 Girokonto
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium">
                    🏥 Krankenkasse
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium">
                    💼 Lebenslauf
                  </span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. FEATURES SECTION */}
      {/* ======================================================== */}
      <section 
        id="features" 
        aria-labelledby="features-heading"
        className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Complete Learning Platform
            </div>
            <h2 
              id="features-heading"
              className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Outfit']"
            >
              Everything You Need to Master Practical German
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Engineered specifically to bridge the gap between academic textbooks and real life in Germany.
            </p>
          </div>

          {/* 8 Core Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat) => (
              <article
                key={feat.id}
                id={`feature-card-${feat.id}`}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      {feat.icon}
                    </div>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                      {feat.tag}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2 font-['Outfit']">
                    {feat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. HOW IT WORKS SECTION */}
      {/* ======================================================== */}
      <section 
        id="how-it-works" 
        aria-labelledby="how-it-works-heading"
        className="py-16 lg:py-24 bg-white border-b border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              Proven Study Method
            </div>
            <h2 
              id="how-it-works-heading"
              className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Outfit']"
            >
              How German Teacher Works
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              A clear, four-step learning loop designed to build practical confidence in reading, writing, and speaking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorksSteps.map((item, index) => (
              <div 
                key={item.step}
                id={`how-it-works-step-${index + 1}`}
                className="relative bg-slate-50 rounded-2xl p-6 border border-slate-200/80 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-red-600 font-mono">
                    {item.step}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-amber-400" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Quick CTA beneath How it Works */}
          <div className="mt-12 text-center">
            <button
              onClick={onGetStarted}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-all shadow-md active:scale-98"
            >
              <span>Start Your First Lesson Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. GERMAN LEARNING TOPICS SECTION */}
      {/* ======================================================== */}
      <section 
        id="topics" 
        aria-labelledby="topics-heading"
        className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5" />
              Life in Germany Curriculum
            </div>
            <h2 
              id="topics-heading"
              className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Outfit']"
            >
              Real-Life German Topics You Will Master
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Every topic is grounded in the actual paperwork, interactions, and daily errands required when living in Germany.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {practicalTopics.map((topic, idx) => (
              <article
                key={topic.title}
                id={`topic-card-${idx + 1}`}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="p-2 rounded-xl bg-slate-100">
                      {topic.icon}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 leading-tight">
                        {topic.title}
                      </h3>
                      <p className="text-[11px] text-slate-500">
                        {topic.subtitle}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-2 mt-4 text-xs text-slate-600">
                    {topic.items.map((it, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-600 mt-1.5 shrink-0" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. FAQ SECTION */}
      {/* ======================================================== */}
      <section 
        id="faq" 
        aria-labelledby="faq-heading"
        className="py-16 lg:py-24 bg-white border-b border-slate-200"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Frequently Asked Questions
            </div>
            <h2 
              id="faq-heading"
              className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Outfit']"
            >
              Everything You Need to Know
            </h2>
            <p className="text-base text-slate-600">
              Clear answers to help you start learning German today with complete confidence.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div 
                  key={index}
                  id={`faq-item-${index + 1}`}
                  className="rounded-2xl border border-slate-200 overflow-hidden transition-all bg-white shadow-xs"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    className="w-full text-left px-5 py-4 sm:py-5 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:bg-slate-50 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-red-600' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. CALL TO ACTION BANNER */}
      {/* ======================================================== */}
      <section 
        id="get-started-cta" 
        aria-labelledby="cta-heading"
        className="py-16 lg:py-20 bg-gradient-to-br from-slate-900 via-[#0A1128] to-slate-950 text-white relative overflow-hidden"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/20 border border-red-500/30 text-amber-300 text-xs font-semibold">
            <span>Ready for Life in Germany?</span>
          </div>

          <h2 
            id="cta-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-['Outfit'] max-w-2xl mx-auto"
          >
            Start Speaking Practical German Today.
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
            Create your free account in seconds. Master A1–B2 vocabulary, real-life conversation, and get answers from your personal AI German Teacher.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              id="cta-signup-btn"
              onClick={onGetStarted}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-base shadow-xl shadow-red-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              id="cta-login-btn"
              onClick={onLogin}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-base border border-white/20 transition-all flex items-center justify-center"
            >
              <span>Log In</span>
            </button>
          </div>

          <p className="text-xs text-slate-400 pt-2">
            No credit card required to start · Instant access to A1 curriculum
          </p>

        </div>
      </section>

    </div>
  );
};
