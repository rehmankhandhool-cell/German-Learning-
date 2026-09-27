import React from 'react';
import { BrandLogo } from './BrandLogo';
import { NavSection } from './Navbar';
import { Heart, Globe, Shield, Sparkles } from 'lucide-react';

interface FooterProps {
  onNavigate: (section: NavSection) => void;
  onOpenAuth: (mode: 'login' | 'signup') => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenAuth
}) => {
  return (
    <footer className="bg-[#0A1128] text-slate-400 border-t border-slate-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo size="md" inverted={true} onClick={() => onNavigate('home')} />
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Empowering international students, skilled immigrants, workers, and newcomers to master practical German for real life, bureaucracy, and careers in Germany.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-800 text-slate-300">
                A1 · A2 · B1 · B2
              </span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-800 text-slate-300">
                Goethe / Telc Aligned
              </span>
            </div>
          </div>

          {/* Col 3: Curriculum */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Learning Modules
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button onClick={() => onNavigate('learn')} className="hover:text-white transition-colors">
                  CEFR A1-B2 Roadmap
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('vocabulary')} className="hover:text-white transition-colors">
                  Vocabulary with Articles
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('grammar')} className="hover:text-white transition-colors">
                  German Cases & Word Order
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('practice')} className="hover:text-white transition-colors">
                  Quizzes & Speaking Drills
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('ai-teacher')} className="hover:text-white transition-colors">
                  AI German Teacher
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('conversation')} className="hover:text-white transition-colors">
                  Conversation Practice
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('speaking')} className="hover:text-white transition-colors">
                  Speaking Practice
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Real-Life Germany Guides */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Public German Guides
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <a
                  href="/learn-german-a1"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('public-a1');
                  }}
                  className="text-slate-400 hover:text-white transition-colors block"
                >
                  📖 Learn German A1
                </a>
              </li>
              <li>
                <a
                  href="/german-vocabulary"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('public-vocabulary');
                  }}
                  className="text-slate-400 hover:text-white transition-colors block"
                >
                  📚 German Vocabulary & Articles
                </a>
              </li>
              <li>
                <a
                  href="/german-for-anmeldung"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('public-anmeldung');
                  }}
                  className="text-slate-400 hover:text-white transition-colors block"
                >
                  🏛️ Anmeldung & Bürgeramt German
                </a>
              </li>
              <li>
                <a
                  href="/german-for-international-students"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('public-students');
                  }}
                  className="text-slate-400 hover:text-white transition-colors block"
                >
                  🎓 International Students Guide
                </a>
              </li>
              <li>
                <a
                  href="/german-for-living-in-germany"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('public-living');
                  }}
                  className="text-slate-400 hover:text-white transition-colors block"
                >
                  🏠 Living in Germany Guide
                </a>
              </li>
              <li>
                <a
                  href="/german-conversation-practice"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('public-conversation');
                  }}
                  className="text-slate-400 hover:text-white transition-colors block"
                >
                  💬 German Conversation Practice
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Account & Community */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Student Portal
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button onClick={() => onOpenAuth('signup')} className="hover:text-white transition-colors text-amber-400 font-bold">
                  Create Free Account
                </button>
              </li>
              <li>
                <button onClick={() => onOpenAuth('login')} className="hover:text-white transition-colors">
                  Student Log In
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('progress')} className="hover:text-white transition-colors">
                  Progress Tracker
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('premium')} className="hover:text-white transition-colors text-amber-300 font-semibold flex items-center gap-1.5">
                  <span>Premium Membership</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
                    Pro
                  </span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} German Teacher. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Designed for international newcomers in Germany</span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2 rounded-xs bg-slate-900 border border-slate-700" />
              <span className="w-2.5 h-2 rounded-xs bg-red-600" />
              <span className="w-2.5 h-2 rounded-xs bg-amber-400" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
