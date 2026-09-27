import React, { useState, useEffect } from 'react';
import { BrandLogo } from './BrandLogo';
import { UserProfile, GermanLevel } from '../types';
import { authService } from '../services/authService';
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  KeyRound,
  AlertCircle
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  initialMode: 'login' | 'signup' | 'forgot';
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode,
  onClose,
  onLoginSuccess
}) => {
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [targetLevel, setTargetLevel] = useState<GermanLevel>('A1');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Forgot password reset flow state
  const [forgotStep, setForgotStep] = useState<'request' | 'reset'>('request');
  const [newPassword, setNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [forgotMessage, setForgotMessage] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);

  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync mode with prop change
  useEffect(() => {
    setMode(initialMode);
    setErrorMsg('');
    setForgotStep('request');
    setForgotMessage('');
    setResetSuccess(false);
    setShowPassword(false);
  }, [initialMode, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Handle Forgot Password flow
    if (mode === 'forgot') {
      if (forgotStep === 'request') {
        if (!email || !email.includes('@')) {
          setErrorMsg('Please enter a valid email address.');
          return;
        }
        setIsSubmitting(true);
        try {
          const res = await authService.requestPasswordReset(email);
          if (res.error) {
            setErrorMsg(res.error);
          } else {
            setForgotMessage(res.message);
            setForgotStep('reset');
          }
        } catch (err: any) {
          setErrorMsg(err.message || 'Failed to request password reset.');
        } finally {
          setIsSubmitting(false);
        }
        return;
      }

      // If in reset phase
      if (!newPassword || newPassword.length < 6) {
        setErrorMsg('New password must be at least 6 characters long.');
        return;
      }
      setIsSubmitting(true);
      try {
        const res = await authService.confirmPasswordReset(email, newPassword);
        if (res.error) {
          setErrorMsg(res.error);
        } else {
          setResetSuccess(true);
        }
      } catch (err: any) {
        setErrorMsg(err.message || 'Failed to update password.');
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    // Validation for Login and Signup
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    if (mode === 'signup' && !name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }

    if (mode === 'signup' && password !== confirmPassword) {
      setErrorMsg('Passwords do not match. Please ensure both passwords are identical.');
      return;
    }

    setIsSubmitting(true);

    try {
      if (mode === 'signup') {
        const result = await authService.signUp(cleanEmail, password, name.trim(), confirmPassword, targetLevel);
        if (result.error || !result.user) {
          setErrorMsg(result.error || 'Failed to create account.');
        } else {
          onLoginSuccess(result.user);
          onClose();
        }
      } else {
        const result = await authService.login(cleanEmail, password);
        if (result.error || !result.user) {
          setErrorMsg(result.error || 'Failed to log in.');
        } else {
          onLoginSuccess(result.user);
          onClose();
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected authentication error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickDemoLogin = async () => {
    setIsSubmitting(true);
    setErrorMsg('');
    try {
      const result = await authService.login('alex.mueller@example.com', 'password123');
      if (result.user) {
        onLoginSuccess(result.user);
        onClose();
      } else {
        // If demo account missing, recreate it
        const demoSignup = await authService.signUp('alex.mueller@example.com', 'password123', 'Alex Müller', 'A1');
        if (demoSignup.user) {
          onLoginSuccess(demoSignup.user);
          onClose();
        } else {
          setErrorMsg(demoSignup.error || 'Demo login failed.');
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed demo sign in.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      id="auth-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        id="auth-modal-card"
        className="relative w-full max-w-md my-auto max-h-[calc(100vh-2rem)] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-slate-200"
      >
        {/* Top Decorative German Tricolor Accent */}
        <div className="h-1.5 w-full flex">
          <div className="h-full w-1/3 bg-slate-900" />
          <div className="h-full w-1/3 bg-red-600" />
          <div className="h-full w-1/3 bg-amber-400" />
        </div>

        {/* Close Button */}
        <button
          id="auth-modal-close"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          {/* Header with Logo */}
          <div className="text-center mb-6">
            <div className="flex justify-center mb-3">
              <BrandLogo size="md" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 font-['Outfit']">
              {mode === 'login' && 'Welcome Back'}
              {mode === 'signup' && 'Start Learning German'}
              {mode === 'forgot' && (resetSuccess ? 'Password Updated' : 'Reset Your Password')}
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              {mode === 'login' && 'Log in to continue your practical German lessons.'}
              {mode === 'signup' && 'Join thousands of newcomers mastering real life in Germany.'}
              {mode === 'forgot' && (
                resetSuccess
                  ? 'Your password has been changed. You can now log in.'
                  : forgotStep === 'request'
                  ? 'Enter your email to receive a password reset token.'
                  : 'Set your new account password below.'
              )}
            </p>
          </div>

          {/* Quick Demo Student Access Button */}
          {mode !== 'forgot' && (
            <div className="mb-5">
              <button
                id="quick-demo-login-btn"
                type="button"
                disabled={isSubmitting}
                onClick={handleQuickDemoLogin}
                className="w-full py-2.5 px-4 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 font-bold text-xs flex items-center justify-center gap-2 transition-all group shadow-xs disabled:opacity-60"
              >
                <Sparkles className="w-4 h-4 text-amber-600 fill-amber-500 group-hover:rotate-12 transition-transform" />
                <span>One-Click Demo Access (Alex Müller · A1.2)</span>
              </button>
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-slate-400 font-semibold">Or with your email & password</span>
                </div>
              </div>
            </div>
          )}

          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-start gap-2 animate-in fade-in duration-150">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Reset Password Completed View */}
          {mode === 'forgot' && resetSuccess ? (
            <div className="text-center py-6 space-y-4 animate-in fade-in duration-150">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Password Changed Successfully</h3>
              <p className="text-sm text-slate-600">
                Your password for <span className="font-semibold text-slate-900">{email}</span> has been securely updated.
              </p>
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setResetSuccess(false);
                  setPassword('');
                }}
                className="w-full py-3 font-bold text-sm text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-md transition-all"
              >
                Continue to Log In
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        id="auth-input-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Maya Lin"
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-slate-900 focus:bg-white rounded-xl text-sm outline-hidden transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Current German Level
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {(['A1', 'A2', 'B1', 'B2'] as GermanLevel[]).map((lvl) => (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => setTargetLevel(lvl)}
                          className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                            targetLevel === lvl
                              ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Email Field */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    id="auth-input-email"
                    type="email"
                    required
                    disabled={mode === 'forgot' && forgotStep === 'reset'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@example.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-slate-900 focus:bg-white rounded-xl text-sm outline-hidden transition-all disabled:opacity-75"
                  />
                </div>
              </div>

              {/* Login / Signup Password */}
              {mode !== 'forgot' && (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Password
                    </label>
                    {mode === 'login' && (
                      <button
                        type="button"
                        onClick={() => {
                          setMode('forgot');
                          setErrorMsg('');
                        }}
                        className="text-xs font-semibold text-red-600 hover:text-red-700"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      id="auth-input-password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="At least 6 characters"
                      className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 focus:border-slate-900 focus:bg-white rounded-xl text-sm outline-hidden transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}

              {/* Signup Confirm Password */}
              {mode === 'signup' && (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Confirm Password
                    </label>
                    {confirmPassword.length > 0 && (
                      <span className={`text-[11px] font-semibold ${password === confirmPassword ? 'text-emerald-600' : 'text-red-500'}`}>
                        {password === confirmPassword ? '✓ Passwords match' : 'Passwords do not match'}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      id="auth-input-confirm-password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repeat your password"
                      className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 focus:border-slate-900 focus:bg-white rounded-xl text-sm outline-hidden transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                      tabIndex={-1}
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}

              {/* Forgot Step 2: New Password Input */}
              {mode === 'forgot' && forgotStep === 'reset' && (
                <div className="space-y-3 animate-in fade-in duration-150">
                  {forgotMessage && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-medium">
                      {forgotMessage}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      New Password
                    </label>
                    <div className="relative">
                      <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        id="auth-input-new-password"
                        type={showNewPassword ? 'text' : 'password'}
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="At least 6 characters"
                        className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 focus:border-slate-900 focus:bg-white rounded-xl text-sm outline-hidden transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                        tabIndex={-1}
                      >
                        {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                id="auth-submit-btn"
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60"
              >
                <span>
                  {isSubmitting
                    ? 'Processing...'
                    : mode === 'login'
                    ? 'Log In'
                    : mode === 'signup'
                    ? 'Create Account'
                    : forgotStep === 'request'
                    ? 'Send Reset Token'
                    : 'Confirm New Password'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Toggle between Login, Signup, Forgot */}
          <div className="mt-6 text-center text-xs text-slate-500">
            {mode === 'login' ? (
              <p>
                Don&apos;t have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('signup');
                    setErrorMsg('');
                  }}
                  className="font-bold text-red-600 hover:text-red-700 underline underline-offset-2 ml-1"
                >
                  Create account for free
                </button>
              </p>
            ) : mode === 'signup' ? (
              <p>
                Already registered?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setErrorMsg('');
                  }}
                  className="font-bold text-red-600 hover:text-red-700 underline underline-offset-2 ml-1"
                >
                  Log in to your account
                </button>
              </p>
            ) : (
              <p>
                Remembered your password?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setErrorMsg('');
                  }}
                  className="font-bold text-red-600 hover:text-red-700 underline underline-offset-2 ml-1"
                >
                  Back to login
                </button>
              </p>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>{authService.getProviderName()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
