import React from 'react';
import { BrandLogo } from './BrandLogo';
import { 
  Lock, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Flame, 
  BookOpen, 
  TrendingUp, 
  MessageSquare,
  Home
} from 'lucide-react';

interface ProtectedDashboardGateProps {
  onOpenLogin: () => void;
  onOpenSignup: () => void;
  onReturnHome: () => void;
}

export const ProtectedDashboardGate: React.FC<ProtectedDashboardGateProps> = ({
  onOpenLogin,
  onOpenSignup,
  onReturnHome
}) => {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        {/* Top German Tricolor Strip */}
        <div className="h-2 w-full flex">
          <div className="h-full w-1/3 bg-slate-900" />
          <div className="h-full w-1/3 bg-red-600" />
          <div className="h-full w-1/3 bg-amber-400" />
        </div>

        <div className="p-8 sm:p-12 text-center">
          {/* Centered Brand Logo & Lock Badge */}
          <div className="flex justify-center mb-6">
            <BrandLogo size="lg" />
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-bold uppercase tracking-wider mb-4">
            <Lock className="w-3.5 h-3.5" />
            <span>Protected Student Portal</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-['Outfit'] mb-3">
            Please Log In to Access Your Dashboard
          </h1>

          <p className="text-slate-600 max-w-xl mx-auto text-base sm:text-lg mb-8 leading-relaxed">
            Your personalized learning progress, daily streak, active lessons, and vocabulary drill history are securely saved to your German Teacher account.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto mb-10">
            <button
              id="gate-login-btn"
              onClick={onOpenLogin}
              className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <span>Log In to Account</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="gate-signup-btn"
              onClick={onOpenSignup}
              className="w-full sm:w-auto px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Create Free Account</span>
            </button>
          </div>

          {/* What unlocks when logged in */}
          <div className="border-t border-slate-100 pt-8 mt-2 text-left">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider text-center mb-6">
              Included with your free German Teacher student account:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Learning Streak & XP</h4>
                  <p className="text-xs text-slate-500">Track daily consistency and study minutes.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="w-8 h-8 rounded-xl bg-red-100 text-red-700 flex items-center justify-center shrink-0">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">A1–B2 CEFR Roadmap</h4>
                  <p className="text-xs text-slate-500">Resume practical German lessons right where you left off.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Vocabulary Spaced Review</h4>
                  <p className="text-xs text-slate-500">Master German articles (der/die/das) permanently.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">AI Teacher Practice Logs</h4>
                  <p className="text-xs text-slate-500">Review conversations for Anmeldung, Arzt & Supermarkt.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 flex justify-center">
            <button
              onClick={onReturnHome}
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>Back to German Teacher Homepage</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
