import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { speakGerman } from '../utils/audio';
import { 
  ArrowRight, 
  Sparkles, 
  Volume2, 
  CheckCircle2, 
  ShieldCheck, 
  MapPin, 
  GraduationCap, 
  Languages, 
  Briefcase,
  Play
} from 'lucide-react';

interface HeroSectionProps {
  onStartLearning: () => void;
  onTryAITeacher: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartLearning,
  onTryAITeacher
}) => {
  const [isPlayingSample, setIsPlayingSample] = useState(false);

  const handlePlaySample = async () => {
    setIsPlayingSample(true);
    await speakGerman('Guten Tag! Willkommen bei German Teacher. Wir lernen Deutsch für den Alltag!');
    setIsPlayingSample(false);
  };

  return (
    <section id="hero-section" className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-[#0A1128] text-white pt-12 pb-20 lg:pt-16 lg:pb-28">
      {/* Subtle Background Pattern & German Tricolor Glow */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-red-600 blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-96 h-96 rounded-full bg-amber-500 blur-3xl" />
        <div className="absolute -bottom-20 right-1/4 w-80 h-80 rounded-full bg-blue-600 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Official Brand & Core Copy */}
          <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
            
            {/* Target Audience Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/90 border border-slate-700/80 text-amber-300 text-xs font-semibold backdrop-blur-md shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-ping" />
              <span>For International Students, Workers & Newcomers in Germany</span>
            </div>

            {/* Official Logo Display */}
            <div className="flex justify-center lg:justify-start">
              <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 shadow-lg">
                <BrandLogo size="lg" inverted={true} />
              </div>
            </div>

            {/* Required Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-['Outfit'] text-white leading-tight">
              Learn German.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-amber-300">
                Live Confidently
              </span>{' '}
              in Germany.
            </h1>

            {/* Required Subheadline */}
            <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Your personal German teacher for everyday conversations, vocabulary, grammar and life in Germany.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              {/* Primary Button */}
              <button
                id="hero-start-learning-btn"
                onClick={onStartLearning}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-base shadow-lg shadow-red-600/30 hover:shadow-red-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 group"
              >
                <span>Start Learning</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Secondary Button */}
              <button
                id="hero-try-ai-teacher-btn"
                onClick={onTryAITeacher}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-base border border-white/20 backdrop-blur-md shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5"
              >
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>Try AI German Teacher</span>
              </button>
            </div>

            {/* Key Assurance Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 text-xs font-semibold text-slate-300 border-t border-slate-800">
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>A1 to B2 CEFR Standard</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Real Life Germany Scenarios</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Native German Audio Drills</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Real-Life German Simulation Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md bg-white rounded-3xl p-6 text-slate-900 shadow-2xl border border-slate-200">
              
              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center font-bold text-lg">
                    🇩🇪
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900">Real-Life German Preview</h3>
                    <p className="text-[11px] text-slate-500">Citizen Office · Bürgeramt Anmeldung</p>
                  </div>
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Level A1
                </span>
              </div>

              {/* Sample Dialog Preview */}
              <div className="py-4 space-y-3">
                {/* Official */}
                <div className="p-3 rounded-2xl bg-slate-100/90 text-xs space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
                    <span>Beamter (Official)</span>
                    <span>14:30</span>
                  </div>
                  <p className="font-semibold text-slate-900">
                    &quot;Guten Tag! Haben Sie Ihre Wohnungsgeberbestätigung dabei?&quot;
                  </p>
                  <p className="text-[11px] text-slate-500 italic">
                    (Good day! Do you have your landlord confirmation with you?)
                  </p>
                </div>

                {/* Learner */}
                <div className="p-3 rounded-2xl bg-red-50 border border-red-100 text-xs space-y-1 ml-4">
                  <div className="flex items-center justify-between text-[11px] font-bold text-red-700">
                    <span>Du (You)</span>
                    <span className="text-emerald-700 font-bold">A1 Mastered</span>
                  </div>
                  <p className="font-bold text-slate-900">
                    &quot;Ja, hier bitte! Alles ist vom Vermieter unterschrieben.&quot;
                  </p>
                  <p className="text-[11px] text-slate-600 italic">
                    (Yes, here you go! Everything is signed by the landlord.)
                  </p>
                </div>
              </div>

              {/* Audio Listen Bar */}
              <div className="p-3.5 rounded-2xl bg-slate-900 text-white flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <button
                    id="hero-audio-sample-btn"
                    onClick={handlePlaySample}
                    disabled={isPlayingSample}
                    className="w-9 h-9 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 flex items-center justify-center shadow-sm transition-transform active:scale-95 disabled:opacity-50"
                    aria-label="Listen to German greeting"
                  >
                    {isPlayingSample ? <Volume2 className="w-5 h-5 animate-pulse" /> : <Play className="w-4 h-4 ml-0.5 fill-current" />}
                  </button>
                  <div>
                    <div className="text-xs font-bold">Hear Authentic German</div>
                    <div className="text-[11px] text-slate-400">Click to listen with clear pronunciation</div>
                  </div>
                </div>
                <div className="text-[10px] font-mono text-amber-300 bg-white/10 px-2 py-1 rounded-md">
                  0.88x Speed
                </div>
              </div>

              {/* Real Life Quick Tags */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                  🏠 Anmeldung
                </span>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                  🏦 Girokonto
                </span>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                  🏥 Krankenkasse
                </span>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                  💼 Lebenslauf
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
