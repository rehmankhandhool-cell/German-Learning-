import React, { useState } from 'react';
import { 
  ArrowRight, 
  Volume2, 
  CheckCircle2, 
  ChevronRight, 
  Sparkles, 
  ShieldCheck, 
  Home 
} from 'lucide-react';
import { NavSection } from '../Navbar';
import { PublicSEOCrossLinks } from './PublicSEOCrossLinks';
import { speakGerman } from '../../utils/audio';

interface PublicSEOPageLayoutProps {
  title: string;
  badge: string;
  subtitle: string;
  currentPath: string;
  sampleGermanPhrase?: string;
  samplePhraseTranslation?: string;
  onNavigate: (section: NavSection) => void;
  onGetStarted: () => void;
  onLogin: () => void;
  children: React.ReactNode;
}

export const PublicSEOPageLayout: React.FC<PublicSEOPageLayoutProps> = ({
  title,
  badge,
  subtitle,
  currentPath,
  sampleGermanPhrase,
  samplePhraseTranslation,
  onNavigate,
  onGetStarted,
  onLogin,
  children
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handlePlaySample = async (text: string) => {
    try {
      setIsPlayingAudio(true);
      await speakGerman(text);
    } finally {
      setIsPlayingAudio(false);
    }
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-medium text-slate-500 flex-wrap">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-1 hover:text-slate-900 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-600">Guides</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-red-700 font-semibold">{badge}</span>
        </nav>

        {/* Hero Header Card */}
        <header className="bg-[#0A1128] text-white rounded-2xl p-6 sm:p-10 shadow-lg mb-10 relative overflow-hidden">
          {/* Subtle Decorative Accents */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-20 w-60 h-60 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            {/* Tag / German Flag Accent */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/90 border border-slate-700 text-xs font-semibold text-slate-200 mb-4">
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2 rounded-xs bg-black" />
                <span className="w-2.5 h-2 rounded-xs bg-red-600" />
                <span className="w-2.5 h-2 rounded-xs bg-amber-400" />
              </div>
              <span className="text-amber-300 font-bold uppercase tracking-wider">{badge}</span>
              <span className="text-slate-500">·</span>
              <span>German Teacher Guide</span>
            </div>

            {/* Page Title */}
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
              {title}
            </h1>

            {/* Subtitle / Description */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
              {subtitle}
            </p>

            {/* Sample Audio Bar if provided */}
            {sampleGermanPhrase && (
              <div className="mb-8 p-3.5 sm:p-4 rounded-xl bg-slate-900/90 border border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handlePlaySample(sampleGermanPhrase)}
                    disabled={isPlayingAudio}
                    className="w-10 h-10 rounded-lg bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shrink-0 transition-colors shadow-sm disabled:opacity-50"
                    title="Listen to native German pronunciation"
                    aria-label="Listen to native German pronunciation"
                  >
                    <Volume2 className={`w-5 h-5 ${isPlayingAudio ? 'animate-pulse text-amber-300' : ''}`} />
                  </button>
                  <div>
                    <div className="text-sm font-bold text-white flex items-center gap-2">
                      <span>"{sampleGermanPhrase}"</span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700">
                        Native Audio
                      </span>
                    </div>
                    {samplePhraseTranslation && (
                      <p className="text-xs text-slate-400 mt-0.5">
                        {samplePhraseTranslation}
                      </p>
                    )}
                  </div>
                </div>

                <span className="text-[11px] text-slate-400 italic">
                  Tap to listen to real German
                </span>
              </div>
            )}

            {/* Action Buttons: Get Started Free & Log In */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={onGetStarted}
                className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={onLogin}
                className="px-6 py-3 rounded-xl bg-slate-800/90 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-sm border border-slate-700 transition-colors flex items-center justify-center cursor-pointer"
              >
                <span>Student Log In</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Body */}
        <main className="space-y-10">
          {children}
        </main>

        {/* Bottom Call to Action Card */}
        <section className="mt-14 p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-slate-900 via-[#0A1128] to-slate-900 text-white border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Interactive Learning Suite</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3">
              Master Practical German for Real Life in Germany
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              Create a free German Teacher account to practice pronunciation, roleplay conversations with 24/7 AI feedback, and progress systematically through CEFR A1–B2 levels.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={onGetStarted}
                className="px-7 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Start Learning Free</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={onLogin}
                className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 transition-colors flex items-center justify-center cursor-pointer"
              >
                <span>Log In to Your Account</span>
              </button>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Free forever account</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Aligned with Goethe & Telc</span>
              </div>
            </div>
          </div>
        </section>

        {/* Cross-linking to all other SEO pages */}
        <PublicSEOCrossLinks currentPath={currentPath} onNavigate={onNavigate} />

      </div>
    </div>
  );
};
