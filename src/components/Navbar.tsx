import React, { useState, useEffect, useRef } from 'react';
import { BrandLogo } from './BrandLogo';
import { PremiumBadge } from './PremiumBadge';
import { UserProfile } from '../types';
import { backButtonManager } from '../utils/backButtonHandler';
import { 
  Menu, 
  X, 
  User, 
  Flame, 
  Sparkles, 
  BookOpen, 
  Layers, 
  GraduationCap, 
  MessageSquare, 
  TrendingUp, 
  LogOut, 
  ChevronDown,
  Compass,
  MessageSquareText,
  Mic,
  Crown
} from 'lucide-react';

export type NavSection = 
  | 'home' 
  | 'learn' 
  | 'conversation' 
  | 'speaking' 
  | 'vocabulary' 
  | 'grammar' 
  | 'practice' 
  | 'ai-teacher' 
  | 'progress' 
  | 'premium' 
  | 'dashboard' 
  | 'login' 
  | 'signup'
  | 'public-a1'
  | 'public-vocabulary'
  | 'public-anmeldung'
  | 'public-students'
  | 'public-living'
  | 'public-conversation';

interface NavbarProps {
  currentSection: NavSection;
  onNavigate: (section: NavSection) => void;
  user: UserProfile | null;
  onOpenAuth: (mode: 'login' | 'signup') => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentSection,
  onNavigate,
  user,
  onOpenAuth,
  onLogout
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const profileButtonRef = useRef<HTMLButtonElement>(null);

  // Close profile dropdown when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        profileDropdownOpen &&
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node) &&
        profileButtonRef.current &&
        !profileButtonRef.current.contains(event.target as Node)
      ) {
        setProfileDropdownOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setProfileDropdownOpen(false);
      }
    };

    if (profileDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [profileDropdownOpen]);

  // Register Android hardware back-button handlers to close mobile menu drawer or profile dropdown first
  useEffect(() => {
    if (mobileMenuOpen) {
      const unregister = backButtonManager.register('navbar-mobile-menu', 90, () => {
        setMobileMenuOpen(false);
        return true; // handled
      });
      return unregister;
    }
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (profileDropdownOpen) {
      const unregister = backButtonManager.register('navbar-profile-dropdown', 90, () => {
        setProfileDropdownOpen(false);
        return true; // handled
      });
      return unregister;
    }
  }, [profileDropdownOpen]);

  const navItems: { id: NavSection; label: string; shortLabel?: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'home', label: 'Home', icon: <Compass className="w-4 h-4" /> },
    { id: 'learn', label: 'Learn', icon: <BookOpen className="w-4 h-4" />, badge: 'A1-B2' },
    { id: 'conversation', label: 'Conversation Practice', shortLabel: 'Conversation', icon: <MessageSquareText className="w-4 h-4" />, badge: 'New' },
    { id: 'speaking', label: 'Speaking Practice', shortLabel: 'Speaking', icon: <Mic className="w-4 h-4" />, badge: 'New' },
    { id: 'vocabulary', label: 'Vocabulary', icon: <Layers className="w-4 h-4" /> },
    { id: 'grammar', label: 'Grammar', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'practice', label: 'Practice', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'ai-teacher', label: 'AI German Teacher', shortLabel: 'AI Teacher', icon: <MessageSquare className="w-4 h-4" />, badge: 'AI' },
    { id: 'progress', label: 'My Progress', shortLabel: 'Progress', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'premium', label: 'Premium', icon: <Crown className="w-4 h-4" />, badge: 'Pro' }
  ];

  const handleItemClick = (section: NavSection) => {
    onNavigate(section);
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full max-w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between h-20 w-full">
          
          {/* Logo on the left */}
          <div className="flex items-center shrink-0">
            <BrandLogo 
              size="md" 
              onClick={() => handleItemClick('home')} 
              className="py-1"
            />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-0.5 2xl:gap-1" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = currentSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleItemClick(item.id)}
                  className={`relative flex items-center gap-1.5 px-2 2xl:px-3 py-2 rounded-xl text-xs 2xl:text-sm font-semibold transition-all duration-150 whitespace-nowrap ${
                    isActive
                      ? 'text-slate-900 bg-slate-100/90 shadow-xs'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                  }`}
                >
                  <span className={isActive ? 'text-red-600' : 'text-slate-400'}>{item.icon}</span>
                  <span className="hidden 2xl:inline">{item.label}</span>
                  <span className="inline 2xl:hidden">{item.shortLabel || item.label}</span>
                  {item.badge && (
                    item.id === 'premium' ? (
                      <PremiumBadge size="xs" variant="gold" />
                    ) : (
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                        item.badge === 'AI' 
                          ? 'bg-amber-100 text-amber-900 border border-amber-300' 
                          : 'bg-slate-200 text-slate-700'
                      }`}>
                        {item.badge}
                      </span>
                    )
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-red-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Side: Auth buttons or User Profile */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {user ? (
              /* Logged In State */
              <div className="relative">
                {/* Backdrop overlay for prominent foreground panel & click-outside */}
                {profileDropdownOpen && (
                  <div 
                    className="fixed inset-0 z-40 bg-slate-950/20 backdrop-blur-[1px] transition-opacity duration-200"
                    onClick={() => setProfileDropdownOpen(false)}
                    aria-hidden="true"
                  />
                )}

                <div className="flex items-center gap-2 sm:gap-3">
                  {/* Streak Badge - Shown on sm+ screens */}
                  <div 
                    title={`${user.streakDays} Day German Learning Streak!`}
                    className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold"
                  >
                    <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-bounce" />
                    <span>{user.streakDays} Days</span>
                  </div>

                  {/* Profile Menu Trigger */}
                  <button
                    ref={profileButtonRef}
                    id="user-profile-menu-button"
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    aria-expanded={profileDropdownOpen}
                    aria-haspopup="true"
                    aria-label="User profile and account menu"
                    className={`relative z-41 flex items-center gap-2 p-1.5 pl-2 rounded-full border transition-all ${
                      profileDropdownOpen
                        ? 'border-slate-400 bg-slate-100 ring-2 ring-slate-900/10 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-slate-900 text-amber-300 flex items-center justify-center font-bold text-xs uppercase shadow-xs shrink-0">
                      {user.name.slice(0, 2)}
                    </div>
                    <div className="hidden md:block text-left mr-1">
                      <div className="text-xs font-bold text-slate-800 leading-tight truncate max-w-[120px]">
                        {user.name}
                      </div>
                      <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                        Level {user.level}
                      </div>
                    </div>
                    <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-150 ${profileDropdownOpen ? 'rotate-180 text-slate-700' : ''}`} />
                  </button>
                </div>

                {/* Profile Dropdown Menu Panel */}
                {profileDropdownOpen && (
                  <div 
                    ref={profileMenuRef}
                    id="user-dropdown-menu"
                    role="menu"
                    aria-label="User Account Menu"
                    className="fixed sm:absolute top-20 sm:top-full right-3 sm:right-0 mt-2 sm:mt-2.5 w-[calc(100vw-1.5rem)] sm:w-80 max-w-[calc(100vw-1.5rem)] sm:max-w-sm bg-white rounded-2xl shadow-2xl border border-slate-200/90 py-2 z-50 animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-150 ring-1 ring-black/5"
                  >
                    {/* User Header Summary */}
                    <div className="px-4 py-3.5 border-b border-slate-100 bg-slate-50/70 rounded-t-2xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-900 text-amber-300 flex items-center justify-center font-bold text-sm uppercase shadow-xs shrink-0">
                          {user.name.slice(0, 2)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-bold text-slate-900 truncate">{user.name}</p>
                          <p className="text-xs text-slate-500 truncate">{user.email}</p>
                        </div>
                      </div>
                      <div className="mt-2.5 flex items-center gap-2 flex-wrap">
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                          Level {user.level}
                        </span>
                        <span className="text-[11px] font-medium text-slate-600">
                          {user.xp} XP Earned
                        </span>
                        <span className="text-[11px] font-semibold text-amber-700 ml-auto flex items-center gap-1">
                          <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                          {user.streakDays}d streak
                        </span>
                      </div>
                    </div>

                    {/* Navigation Items */}
                    <div className="py-1.5 px-1.5 space-y-0.5">
                      <button
                        id="menu-item-dashboard"
                        onClick={() => handleItemClick('dashboard')}
                        className="w-full text-left px-3.5 py-2.5 text-sm font-semibold text-slate-700 hover:text-slate-950 hover:bg-slate-100/80 rounded-xl flex items-center gap-3 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-white flex items-center justify-center text-slate-500 group-hover:text-slate-800 transition-colors">
                          <User className="w-4 h-4" />
                        </div>
                        <span className="flex-1">My Dashboard</span>
                      </button>

                      <button
                        id="menu-item-progress"
                        onClick={() => handleItemClick('progress')}
                        className="w-full text-left px-3.5 py-2.5 text-sm font-semibold text-slate-700 hover:text-slate-950 hover:bg-slate-100/80 rounded-xl flex items-center gap-3 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-blue-50 group-hover:bg-blue-100/80 flex items-center justify-center text-blue-600 transition-colors">
                          <TrendingUp className="w-4 h-4" />
                        </div>
                        <span className="flex-1">My Progress</span>
                      </button>

                      <button
                        id="menu-item-membership"
                        onClick={() => handleItemClick('premium')}
                        className="w-full text-left px-3.5 py-2.5 text-sm font-semibold text-slate-700 hover:text-slate-950 hover:bg-slate-100/80 rounded-xl flex items-center justify-between transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-amber-50 group-hover:bg-amber-100/80 flex items-center justify-center text-amber-600 transition-colors">
                            <Crown className="w-4 h-4 text-amber-500" />
                          </div>
                          <span>Membership</span>
                        </div>
                        {user.plan === 'premium' || user.isPremium ? (
                          <PremiumBadge size="xs" variant="gold" />
                        ) : (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                            Free
                          </span>
                        )}
                      </button>
                    </div>

                    {/* Log Out Action */}
                    <div className="border-t border-slate-100 pt-1.5 px-1.5">
                      <button
                        id="logout-button"
                        onClick={() => {
                          onLogout();
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-3.5 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 hover:text-red-700 rounded-xl flex items-center gap-3 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-red-50 group-hover:bg-red-100/80 flex items-center justify-center text-red-600 transition-colors">
                          <LogOut className="w-4 h-4" />
                        </div>
                        <span>Log Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Logged Out State */
              <div className="hidden sm:flex items-center gap-2.5">
                <button
                  id="nav-login-btn"
                  onClick={() => onOpenAuth('login')}
                  className="px-4 py-2 text-sm font-bold text-slate-700 hover:text-slate-950 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Log In
                </button>
                <button
                  id="nav-signup-btn"
                  onClick={() => onOpenAuth('signup')}
                  className="px-5 py-2.5 text-sm font-bold text-white bg-red-600 hover:bg-red-700 active:scale-98 rounded-xl shadow-xs shadow-red-200 transition-all flex items-center gap-1.5"
                >
                  <span>Sign Up Free</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile & Tablet menu hamburger button */}
          <div className="flex xl:hidden items-center gap-2">
            {user && (
              <div className="flex sm:hidden items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200">
                <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>{user.streakDays}d</span>
              </div>
            )}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile & Tablet Drawer Menu */}
      {mobileMenuOpen && (
        <div 
          id="mobile-nav-drawer" 
          className="xl:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-[max(1.5rem,env(safe-area-inset-bottom,0px))] space-y-2 shadow-xl max-w-full max-h-[calc(100vh-5rem)] overflow-y-auto overscroll-contain"
        >
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = currentSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-base font-semibold ${
                    isActive ? 'bg-slate-100 text-red-600' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={isActive ? 'text-red-600' : 'text-slate-400'}>{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    item.id === 'premium' ? (
                      <PremiumBadge size="xs" variant="gold" />
                    ) : (
                      <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-200">
                        {item.badge}
                      </span>
                    )
                  )}
                </button>
              );
            })}

            {user && (
              <button
                onClick={() => handleItemClick('dashboard')}
                className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-base font-semibold ${
                  currentSection === 'dashboard' ? 'bg-slate-100 text-red-600' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <User className="w-5 h-5 text-slate-400" />
                <span>My Dashboard</span>
              </button>
            )}
          </div>

          <div className="pt-4 border-t border-slate-200">
            {user ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 px-2">
                  <div className="w-10 h-10 rounded-full bg-slate-900 text-amber-300 flex items-center justify-center font-bold">
                    {user.name.slice(0, 2)}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">{user.name}</div>
                    <div className="text-xs text-slate-500">Level {user.level} · {user.xp} XP</div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl"
                >
                  <LogOut className="w-4 h-4" />
                  Log Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('login');
                  }}
                  className="w-full py-2.5 text-sm font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl text-center"
                >
                  Log In
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('signup');
                  }}
                  className="w-full py-2.5 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl text-center shadow-xs"
                >
                  Sign Up Free
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
