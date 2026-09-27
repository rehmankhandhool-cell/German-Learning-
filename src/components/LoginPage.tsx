import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { authService } from '../services/authService';
import { UserProfile } from '../types';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  AlertCircle, 
  CheckCircle2, 
  KeyRound, 
  ShieldCheck, 
  Sparkles,
  ArrowLeft
} from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess: (user: UserProfile) => void;
  onNavigateToSignUp: () => void;
  onNavigateHome: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLoginSuccess,
  onNavigateToSignUp,
  onNavigateHome
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Forgot password flow state
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSuccessMessage, setResetSuccessMessage] = useState<string | null>(null);
  const [resetErrorMessage, setResetErrorMessage] = useState<string | null>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [resetStep, setResetStep] = useState<'request' | 'confirm'>('request');

  const providerName = authService.getProviderName();
  const isFirebase = authService.isFirebaseAvailable();

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim()) {
      setErrorMessage('Please enter your email address.');
      return;
    }
    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    setIsLoading(true);
    try {
      const { user, error } = await authService.login(email, password);
      if (error || !user) {
        setErrorMessage(error || 'Invalid email or password.');
      } else {
        onLoginSuccess(user);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoStudentLogin = async () => {
    setEmail('alex.mueller@example.com');
    setPassword('password123');
    setErrorMessage(null);
    setIsLoading(true);
    try {
      const { user, error } = await authService.login('alex.mueller@example.com', 'password123');
      if (user) {
        onLoginSuccess(user);
      } else {
        setErrorMessage(error || 'Could not log into demo account.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetErrorMessage(null);
    setResetSuccessMessage(null);

    if (!resetEmail.trim() || !resetEmail.includes('@')) {
      setResetErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsResetting(true);
    try {
      const res = await authService.requestPasswordReset(resetEmail);
      if (res.error) {
        setResetErrorMessage(res.error);
      } else {
        setResetSuccessMessage(res.message);
        if (!isFirebase) {
          setResetStep('confirm');
        }
      }
    } catch (err: any) {
      setResetErrorMessage(err.message || 'Failed to request password reset.');
    } finally {
      setIsResetting(false);
    }
  };

  const handleConfirmReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetErrorMessage(null);

    if (newPassword.length < 6) {
      setResetErrorMessage('New password must be at least 6 characters long.');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setResetErrorMessage('Passwords do not match.');
      return;
    }

    setIsResetting(true);
    try {
      const res = await authService.confirmPasswordReset(resetEmail, newPassword, confirmNewPassword);
      if (res.error) {
        setResetErrorMessage(res.error);
      } else {
        setResetSuccessMessage('Password successfully updated! You can now log in.');
        setTimeout(() => {
          setIsForgotPassword(false);
          setResetStep('request');
          setPassword(newPassword);
          setEmail(resetEmail);
        }, 1200);
      }
    } catch (err: any) {
      setResetErrorMessage(err.message || 'Failed to update password.');
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50/70">
      <div className="w-full max-w-md">
        
        {/* Back navigation */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Homepage</span>
          </button>

          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-white px-2.5 py-1 rounded-full border border-slate-200 shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>{providerName}</span>
          </span>
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/50 p-6 sm:p-8">
          
          {/* Logo & Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-3">
              <BrandLogo size="md" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {isForgotPassword ? 'Reset Your Password' : 'Log In to German Teacher'}
            </h1>
            <p className="mt-1.5 text-sm text-slate-500 max-w-xs mx-auto">
              {isForgotPassword
                ? 'Enter your registered email to receive recovery instructions.'
                : 'Access your lessons, vocabulary lists, and learning streak.'}
            </p>
          </div>

          {!isForgotPassword ? (
            /* Login Form */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {/* Error Callout */}
              {errorMessage && (
                <div 
                  id="login-error-alert"
                  className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm font-medium flex items-start gap-2.5 animate-in fade-in duration-150"
                >
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Email field */}
              <div>
                <label 
                  htmlFor="login-email" 
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    id="login-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@example.com"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm font-medium focus:outline-hidden focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all bg-slate-50/50 hover:bg-white"
                  />
                </div>
              </div>

              {/* Password field */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label 
                    htmlFor="login-password" 
                    className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    id="forgot-password-link"
                    onClick={() => {
                      setIsForgotPassword(true);
                      setResetEmail(email);
                      setErrorMessage(null);
                    }}
                    className="text-xs font-semibold text-red-600 hover:text-red-700 hover:underline transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm font-medium focus:outline-hidden focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all bg-slate-50/50 hover:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Login Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  id="login-button"
                  disabled={isLoading}
                  className="w-full py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 active:scale-98 text-white font-bold text-sm shadow-md shadow-red-200 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Log In</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              {/* Demo Account Fast-Track */}
              <div className="pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleDemoStudentLogin}
                  disabled={isLoading}
                  className="w-full py-2.5 px-3 rounded-xl bg-amber-50 hover:bg-amber-100/80 border border-amber-200 text-amber-900 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Use Demo Student Account (Alex Müller · Level A1)</span>
                </button>
              </div>
            </form>
          ) : (
            /* Forgot Password Form */
            <div className="space-y-4">
              {resetErrorMessage && (
                <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm font-medium flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>{resetErrorMessage}</span>
                </div>
              )}

              {resetSuccessMessage && (
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-medium flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{resetSuccessMessage}</span>
                </div>
              )}

              {resetStep === 'request' ? (
                <form onSubmit={handleResetRequest} className="space-y-4">
                  <div>
                    <label 
                      htmlFor="reset-email" 
                      className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
                    >
                      Registered Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        id="reset-email"
                        type="email"
                        required
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        placeholder="student@example.com"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm font-medium focus:outline-hidden focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all bg-slate-50/50 hover:bg-white"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isResetting}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-xs transition-all flex items-center justify-center gap-2"
                  >
                    {isResetting ? (
                      <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <KeyRound className="w-4 h-4 text-amber-400" />
                        <span>Send Password Reset Instructions</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleConfirmReset} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="At least 6 characters"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm font-medium focus:border-red-500 focus:ring-2 focus:ring-red-100"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      required
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      placeholder="Repeat new password"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm font-medium focus:border-red-500 focus:ring-2 focus:ring-red-100"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isResetting}
                    className="w-full py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-xs transition-all"
                  >
                    Save New Password
                  </button>
                </form>
              )}

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setIsForgotPassword(false);
                    setResetErrorMessage(null);
                    setResetSuccessMessage(null);
                  }}
                  className="text-xs font-bold text-slate-600 hover:text-slate-900"
                >
                  ← Back to Login
                </button>
              </div>
            </div>
          )}

          {/* Footer switch to Sign Up */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-600">
              Don't have an account?{' '}
              <button
                type="button"
                id="switch-to-signup-link"
                onClick={onNavigateToSignUp}
                className="font-bold text-red-600 hover:text-red-700 hover:underline transition-colors ml-1"
              >
                Sign Up Free
              </button>
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
