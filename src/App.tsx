import React, { useState, useEffect } from 'react';
import { Navbar, NavSection } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { RealLifeSection } from './components/RealLifeSection';
import { LearnLevelsSection } from './components/LearnLevelsSection';
import { AITeacherSection } from './components/AITeacherSection';
import { VocabularySection } from './components/VocabularySection';
import { GrammarSection } from './components/GrammarSection';
import { PracticeSection } from './components/PracticeSection';
import { ProgressSection } from './components/ProgressSection';
import { PricingSection } from './components/PricingSection';
import { PremiumSection } from './components/PremiumSection';
import { DashboardView } from './components/DashboardView';
import { A1CourseView } from './components/A1CourseView';
import { ConversationPracticeSection } from './components/ConversationPracticeSection';
import { SpeakingPracticeSection } from './components/SpeakingPracticeSection';
import { LoginPage } from './components/LoginPage';
import { SignUpPage } from './components/SignUpPage';
import { PublicHomePage } from './components/PublicHomePage';
import { PublicA1Page } from './components/seo/PublicA1Page';
import { PublicVocabularyPage } from './components/seo/PublicVocabularyPage';
import { PublicAnmeldungPage } from './components/seo/PublicAnmeldungPage';
import { PublicStudentsPage } from './components/seo/PublicStudentsPage';
import { PublicLivingPage } from './components/seo/PublicLivingPage';
import { PublicConversationPage } from './components/seo/PublicConversationPage';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';
import { UserProfile } from './types';
import { authService } from './services/authService';
import { App as CapApp } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';
import { backButtonManager } from './utils/backButtonHandler';
import { openExternalUrl, isExternalUrl } from './utils/browser';

export default function App() {
  const [user, setUser] = useState<UserProfile | null>(() => authService.getCurrentUser());
  const [currentSection, setCurrentSection] = useState<NavSection>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.replace(/\/+$/, '') || '/';
      if (path === '/learn-german-a1') return 'public-a1';
      if (path === '/german-vocabulary') return 'public-vocabulary';
      if (path === '/german-for-anmeldung') return 'public-anmeldung';
      if (path === '/german-for-international-students') return 'public-students';
      if (path === '/german-for-living-in-germany') return 'public-living';
      if (path === '/german-conversation-practice') return 'public-conversation';
      if (path === '/login') return 'login';
      if (path === '/signup') return 'signup';

      const params = new URLSearchParams(window.location.search);
      if (params.get('mode') === 'signup' || params.get('auth') === 'signup') {
        return 'signup';
      }
      if (params.get('mode') === 'login' || params.get('auth') === 'login') {
        return 'login';
      }
    }
    const existingUser = authService.getCurrentUser();
    if (existingUser) return 'dashboard';
    return 'home';
  });
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  // In-app navigation history stack for native back-button & deep transitions
  const [navHistory, setNavHistory] = useState<NavSection[]>([]);
  const navHistoryRef = React.useRef<NavSection[]>([]);
  navHistoryRef.current = navHistory;
  const lastBackPressRef = React.useRef<number>(0);

  // Initialize native BackButtonManager and intercept external links on native platforms
  useEffect(() => {
    backButtonManager.init();

    if (!Capacitor.isNativePlatform()) return;

    const handleGlobalLinkClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a');
      if (!target) return;
      const href = target.getAttribute('href');
      if (href && isExternalUrl(href)) {
        e.preventDefault();
        openExternalUrl(href);
      }
    };

    document.addEventListener('click', handleGlobalLinkClick, true);
    return () => document.removeEventListener('click', handleGlobalLinkClick, true);
  }, []);

  // Priority 100: If AuthModal is open, hardware back closes modal first
  useEffect(() => {
    if (authModalOpen) {
      const unregister = backButtonManager.register('app-auth-modal', 100, () => {
        setAuthModalOpen(false);
        return true; // Handled modal close
      });
      return unregister;
    }
  }, [authModalOpen]);

  // Priority 50: In-app section navigation history back handling
  useEffect(() => {
    const unregister = backButtonManager.register('app-section-navigation', 50, () => {
      // 1. Pop previous section if history exists
      if (navHistoryRef.current.length > 0) {
        const prevSection = navHistoryRef.current[navHistoryRef.current.length - 1];
        setNavHistory((prev) => prev.slice(0, -1));
        handleNavigate(prevSection, false);
        return true; // Handled
      }

      // 2. If no history stack, but user is on an inner screen, navigate to root (home or dashboard)
      const rootSection: NavSection = user ? 'dashboard' : 'home';
      if (currentSection !== rootSection) {
        handleNavigate(rootSection, false);
        return true; // Handled
      }

      // 3. Fall through to priority 10 exit guard
      return false;
    });
    return unregister;
  }, [currentSection, user]);

  // Priority 10: Root screen double-back guard to prevent accidental app exits
  useEffect(() => {
    const unregister = backButtonManager.register('app-exit-guard', 10, () => {
      const now = Date.now();
      if (now - lastBackPressRef.current < 2000) {
        CapApp.exitApp();
        return true;
      }
      lastBackPressRef.current = now;
      showToast('Press back again to exit German Teacher');
      return true; // Handled: prompted user, avoided accidental exit
    });
    return unregister;
  }, []);

  // Synchronize with auth service on mount & auth changes
  useEffect(() => {
    const unsubscribe = authService.onAuthStateChange((activeUser) => {
      setUser(activeUser);
      // Unauthenticated users keep current public page, login, or signup
      if (!activeUser) {
        setCurrentSection((prev) => {
          if (
            prev === 'signup' || 
            prev === 'login' || 
            prev === 'public-a1' ||
            prev === 'public-vocabulary' ||
            prev === 'public-anmeldung' ||
            prev === 'public-students' ||
            prev === 'public-living' ||
            prev === 'public-conversation'
          ) {
            return prev;
          }
          return 'home';
        });
      }
    });
    return () => unsubscribe();
  }, []);

  // Listen for browser Back/Forward navigation (popstate)
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace(/\/+$/, '') || '/';
      if (path === '/learn-german-a1') setCurrentSection('public-a1');
      else if (path === '/german-vocabulary') setCurrentSection('public-vocabulary');
      else if (path === '/german-for-anmeldung') setCurrentSection('public-anmeldung');
      else if (path === '/german-for-international-students') setCurrentSection('public-students');
      else if (path === '/german-for-living-in-germany') setCurrentSection('public-living');
      else if (path === '/german-conversation-practice') setCurrentSection('public-conversation');
      else if (path === '/login') setCurrentSection('login');
      else if (path === '/signup') setCurrentSection('signup');
      else if (path === '/' || path === '') {
        const active = authService.getCurrentUser();
        setCurrentSection(active ? 'dashboard' : 'home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Check for Stripe Test Mode redirect return parameters (Phase 12C)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const urlParams = new URLSearchParams(window.location.search);
    const payment = urlParams.get('payment') || urlParams.get('payment_status');

    if (payment === 'success') {
      showToast('Stripe Test Mode checkout completed! Server subscription verification in progress.');
      // Clean query params from URL without page reload (DO NOT grant Premium from URL)
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (payment === 'canceled') {
      setCurrentSection('premium');
      showToast('Stripe checkout was canceled. No charges were made.');
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // Auth event handlers
  const handleLoginSuccess = (loggedInUser: UserProfile) => {
    setUser(loggedInUser);
    setAuthModalOpen(false);
    setNavHistory([]);
    setCurrentSection('dashboard');
    if (typeof window !== 'undefined' && window.location.pathname !== '/') {
      window.history.pushState({}, '', '/');
    }
    showToast(`Willkommen, ${loggedInUser.name}!`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = async () => {
    await authService.logout();
    setUser(null);
    setNavHistory([]);
    setCurrentSection('home');
    if (typeof window !== 'undefined' && window.location.pathname !== '/') {
      window.history.pushState({}, '', '/');
    }
    showToast('You have been logged out successfully.');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAuth = (mode: 'login' | 'signup' | 'forgot' = 'login') => {
    if (mode === 'signup') {
      handleNavigate('signup');
    } else {
      handleNavigate('login');
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleNavigate = (section: NavSection, addToHistory = true) => {
    // Track in-app navigation stack for Android back button and deep navigation
    if (addToHistory && section !== currentSection) {
      setNavHistory((prev) => [...prev.slice(-15), currentSection]);
    }

    // Sync browser URL for public SEO pages and auth screens
    const routePaths: Partial<Record<NavSection, string>> = {
      'home': '/',
      'login': '/login',
      'signup': '/signup',
      'public-a1': '/learn-german-a1',
      'public-vocabulary': '/german-vocabulary',
      'public-anmeldung': '/german-for-anmeldung',
      'public-students': '/german-for-international-students',
      'public-living': '/german-for-living-in-germany',
      'public-conversation': '/german-conversation-practice',
    };

    const targetUrl = routePaths[section];
    if (typeof window !== 'undefined') {
      if (targetUrl && window.location.pathname !== targetUrl) {
        window.history.pushState({}, '', targetUrl);
      } else if (!targetUrl && window.location.pathname !== '/') {
        window.history.pushState({}, '', '/');
      }
    }

    // Unauthenticated visitors can view public Home, Login, Sign Up, or any Public SEO guides
    if (!user) {
      if (
        section === 'home' ||
        section === 'signup' ||
        section === 'login' ||
        section === 'public-a1' ||
        section === 'public-vocabulary' ||
        section === 'public-anmeldung' ||
        section === 'public-students' ||
        section === 'public-living' ||
        section === 'public-conversation'
      ) {
        setCurrentSection(section);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      // For protected student learning sections, guide to sign up
      setCurrentSection('signup');
      if (typeof window !== 'undefined' && window.location.pathname !== '/signup') {
        window.history.pushState({}, '', '/signup');
      }
      showToast('Create a free account or log in to access this learning section.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setCurrentSection(section);
    // Smooth scroll to top of window
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-amber-400 selection:text-slate-950 overflow-x-hidden w-full max-w-full">
      
      {/* Sticky Top Navigation Bar */}
      <Navbar
        currentSection={currentSection}
        onNavigate={handleNavigate}
        user={user}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-full">
        {/* 1. Public SEO Pages (Accessible to both unauthenticated visitors and authenticated students) */}
        {currentSection === 'public-a1' ? (
          <div className="animate-in fade-in duration-200">
            <PublicA1Page
              onNavigate={handleNavigate}
              onGetStarted={() => handleOpenAuth('signup')}
              onLogin={() => handleOpenAuth('login')}
            />
          </div>
        ) : currentSection === 'public-vocabulary' ? (
          <div className="animate-in fade-in duration-200">
            <PublicVocabularyPage
              onNavigate={handleNavigate}
              onGetStarted={() => handleOpenAuth('signup')}
              onLogin={() => handleOpenAuth('login')}
            />
          </div>
        ) : currentSection === 'public-anmeldung' ? (
          <div className="animate-in fade-in duration-200">
            <PublicAnmeldungPage
              onNavigate={handleNavigate}
              onGetStarted={() => handleOpenAuth('signup')}
              onLogin={() => handleOpenAuth('login')}
            />
          </div>
        ) : currentSection === 'public-students' ? (
          <div className="animate-in fade-in duration-200">
            <PublicStudentsPage
              onNavigate={handleNavigate}
              onGetStarted={() => handleOpenAuth('signup')}
              onLogin={() => handleOpenAuth('login')}
            />
          </div>
        ) : currentSection === 'public-living' ? (
          <div className="animate-in fade-in duration-200">
            <PublicLivingPage
              onNavigate={handleNavigate}
              onGetStarted={() => handleOpenAuth('signup')}
              onLogin={() => handleOpenAuth('login')}
            />
          </div>
        ) : currentSection === 'public-conversation' ? (
          <div className="animate-in fade-in duration-200">
            <PublicConversationPage
              onNavigate={handleNavigate}
              onGetStarted={() => handleOpenAuth('signup')}
              onLogin={() => handleOpenAuth('login')}
            />
          </div>
        ) : !user ? (
          /* Unauthenticated Views: Public Homepage or Login/Sign Up screens */
          currentSection === 'signup' ? (
            <div className="animate-in fade-in duration-200">
              <SignUpPage
                onSignUpSuccess={handleLoginSuccess}
                onNavigateToLogin={() => handleNavigate('login')}
                onNavigateHome={() => handleNavigate('home')}
              />
            </div>
          ) : currentSection === 'login' ? (
            <div className="animate-in fade-in duration-200">
              <LoginPage
                onLoginSuccess={handleLoginSuccess}
                onNavigateToSignUp={() => handleNavigate('signup')}
                onNavigateHome={() => handleNavigate('home')}
              />
            </div>
          ) : (
            /* Polished Public Homepage for Unauthenticated Visitors */
            <div className="animate-in fade-in duration-200">
              <PublicHomePage
                onGetStarted={() => handleNavigate('signup')}
                onLogin={() => handleNavigate('login')}
              />
            </div>
          )
        ) : (
          /* Authenticated User Views */
          currentSection === 'login' ? (
            <div className="animate-in fade-in duration-200">
              <LoginPage
                onLoginSuccess={handleLoginSuccess}
                onNavigateToSignUp={() => handleNavigate('signup')}
                onNavigateHome={() => handleNavigate('dashboard')}
              />
            </div>
          ) : currentSection === 'signup' ? (
            <div className="animate-in fade-in duration-200">
              <SignUpPage
                onSignUpSuccess={handleLoginSuccess}
                onNavigateToLogin={() => handleNavigate('login')}
                onNavigateHome={() => handleNavigate('dashboard')}
              />
            </div>
          ) : currentSection === 'dashboard' ? (
          user ? (
            /* 4. Protected User Dashboard for Authenticated Students */
            <div className="animate-in fade-in duration-200">
              <DashboardView
                user={user}
                onContinueLearning={() => handleNavigate('learn')}
                onLaunchAITeacher={() => handleNavigate('ai-teacher')}
                onOpenVocabulary={() => handleNavigate('vocabulary')}
                onOpenQuizzes={() => handleNavigate('practice')}
              />
            </div>
          ) : (
            /* If accessed without auth, render Login page */
            <div className="animate-in fade-in duration-200">
              <LoginPage
                onLoginSuccess={handleLoginSuccess}
                onNavigateToSignUp={() => handleNavigate('signup')}
                onNavigateHome={() => handleNavigate('home')}
              />
            </div>
          )
        ) : currentSection === 'learn' ? (
          <div className="animate-in fade-in duration-200">
            <A1CourseView
              user={user}
              onNavigateToQuiz={() => handleNavigate('practice')}
              onNavigateToVocab={() => handleNavigate('vocabulary')}
            />
            <LearnLevelsSection onStartLesson={() => handleNavigate('practice')} />
            <RealLifeSection />
            <PricingSection onSelectPlan={() => handleOpenAuth('signup')} />
          </div>
        ) : currentSection === 'conversation' ? (
          <div className="animate-in fade-in duration-200">
            <ConversationPracticeSection
              user={user}
              onUpgrade={() => handleNavigate('premium')}
            />
          </div>
        ) : currentSection === 'speaking' ? (
          <div className="animate-in fade-in duration-200">
            <SpeakingPracticeSection
              user={user}
              onUpgrade={() => handleNavigate('premium')}
            />
          </div>
        ) : currentSection === 'vocabulary' ? (
          <div className="animate-in fade-in duration-200">
            <VocabularySection
              user={user}
              onUpgrade={() => handleNavigate('premium')}
            />
            <PracticeSection />
          </div>
        ) : currentSection === 'grammar' ? (
          <div className="animate-in fade-in duration-200">
            <GrammarSection />
            <PracticeSection />
          </div>
        ) : currentSection === 'practice' ? (
          <div className="animate-in fade-in duration-200">
            <PracticeSection />
            <AITeacherSection
              user={user}
              onUpgrade={() => handleNavigate('premium')}
            />
          </div>
        ) : currentSection === 'ai-teacher' ? (
          <div className="animate-in fade-in duration-200">
            <AITeacherSection
              user={user}
              onUpgrade={() => handleNavigate('premium')}
            />
            <RealLifeSection />
          </div>
        ) : currentSection === 'progress' ? (
          <div className="animate-in fade-in duration-200">
            <ProgressSection user={user} onOpenAuth={() => handleOpenAuth('signup')} />
          </div>
        ) : currentSection === 'premium' ? (
          <div className="animate-in fade-in duration-200">
            <PremiumSection user={user} onOpenAuth={handleOpenAuth} />
          </div>
        ) : (
          /* Default: Full Complete Homepage Experience */
          <div className="animate-in fade-in duration-200">
            {/* Hero Section */}
            <HeroSection
              onStartLearning={() => handleNavigate('learn')}
              onTryAITeacher={() => handleNavigate('ai-teacher')}
            />

            {/* 1. Learn German from A1 to B2 */}
            <LearnLevelsSection onStartLesson={() => handleNavigate('practice')} />

            {/* 2. Practical German for everyday life (10 Real-Life cards) */}
            <RealLifeSection />

            {/* 3. AI German Teacher */}
            <AITeacherSection
              user={user}
              onUpgrade={() => handleNavigate('premium')}
            />

            {/* Conversation Practice (8 Scenarios) */}
            <ConversationPracticeSection
              user={user}
              onUpgrade={() => handleNavigate('premium')}
            />

            {/* Speaking Practice (8 Topics with Web Speech API) */}
            <SpeakingPracticeSection
              user={user}
              onUpgrade={() => handleNavigate('premium')}
            />

            {/* 4. Vocabulary practice */}
            <VocabularySection
              user={user}
              onUpgrade={() => handleNavigate('premium')}
            />

            {/* 5. Grammar lessons */}
            <GrammarSection />

            {/* 6. Quizzes and exercises & 7. Speaking practice */}
            <PracticeSection />

            {/* 8. Track your learning progress */}
            <ProgressSection user={user} onOpenAuth={() => handleOpenAuth('signup')} />

            {/* Pricing Section */}
            <PricingSection onSelectPlan={() => handleOpenAuth('signup')} />
          </div>
        ))}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenAuth={handleOpenAuth}
      />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        initialMode={authMode}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div 
          id="toast-notification"
          className="fixed bottom-6 right-6 z-50 px-4 py-3 bg-slate-900 text-white rounded-2xl shadow-xl border border-slate-700 text-xs sm:text-sm font-semibold flex items-center gap-2.5 animate-in slide-in-from-bottom-5 duration-200"
        >
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
