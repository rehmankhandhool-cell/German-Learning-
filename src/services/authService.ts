import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  Auth,
  User as FirebaseUser
} from 'firebase/auth';
import { UserProfile, GermanLevel, MembershipPlan } from '../types';

// Read runtime environment variables
const env = (import.meta as any).env || {};

// Firebase Authentication Configuration (Free Spark Tier)
const firebaseApiKey = env.VITE_FIREBASE_API_KEY;
const firebaseProjectId = env.VITE_FIREBASE_PROJECT_ID;

let firebaseApp: FirebaseApp | null = null;
export let firebaseAuth: Auth | null = null;

if (firebaseApiKey && firebaseProjectId) {
  try {
    firebaseApp = getApps().length > 0 ? getApp() : initializeApp({
      apiKey: firebaseApiKey,
      authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || `${firebaseProjectId}.firebaseapp.com`,
      projectId: firebaseProjectId,
      storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: env.VITE_FIREBASE_APP_ID
    });
    firebaseAuth = getAuth(firebaseApp);
    // Explicitly configure browser local persistence for session resilience across refreshes
    setPersistence(firebaseAuth, browserLocalPersistence).catch((err) => {
      console.warn('Firebase setPersistence notice:', err);
    });
  } catch (err) {
    console.warn('Firebase init warning:', err);
  }
}

// Local persistent authentication database keys
const STORAGE_KEY_AUTH_USER = 'germanteacher_auth_user';
const STORAGE_KEY_REGISTERED_ACCOUNTS = 'germanteacher_registered_accounts';
const STORAGE_KEY_RESET_TOKENS = 'germanteacher_reset_tokens';

interface StoredAccount {
  id: string;
  name: string;
  email: string;
  password?: string;
  authProvider?: 'firebase' | 'local';
  level: GermanLevel;
  streakDays: number;
  xp: number;
  dailyGoalLessons: number;
  dailyGoalMinutes: number;
  completedLessonsToday: number;
  studiedMinutesToday: number;
  wordsMasteredCount: number;
  wordsReviewCount: number;
  averageQuizScore: number;
  isPremium: boolean;
  plan?: MembershipPlan;
  premiumSince?: string | null;
  avatarUrl?: string;
  createdAt: string;
}

// Pre-seeded demo account for instant testing
const DEFAULT_ACCOUNTS: StoredAccount[] = [
  {
    id: 'usr_demo_101',
    name: 'Alex Müller',
    email: 'alex.mueller@example.com',
    password: 'password123',
    authProvider: 'local',
    level: 'A1',
    streakDays: 5,
    xp: 1450,
    dailyGoalLessons: 5,
    dailyGoalMinutes: 20,
    completedLessonsToday: 3,
    studiedMinutesToday: 16,
    wordsMasteredCount: 148,
    wordsReviewCount: 12,
    averageQuizScore: 92,
    isPremium: false,
    plan: 'free',
    premiumSince: null,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    createdAt: new Date().toISOString()
  }
];

function getAccounts(): StoredAccount[] {
  if (typeof window === 'undefined') return DEFAULT_ACCOUNTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_REGISTERED_ACCOUNTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_REGISTERED_ACCOUNTS, JSON.stringify(DEFAULT_ACCOUNTS));
      return DEFAULT_ACCOUNTS;
    }
    const accounts = JSON.parse(raw);
    return Array.isArray(accounts) && accounts.length > 0 ? accounts : DEFAULT_ACCOUNTS;
  } catch {
    return DEFAULT_ACCOUNTS;
  }
}

function saveAccounts(accounts: StoredAccount[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_REGISTERED_ACCOUNTS, JSON.stringify(accounts));
  } catch (err) {
    console.error('Failed to save accounts database:', err);
  }
}

function accountToUserProfile(account: StoredAccount): UserProfile {
  return {
    id: account.id,
    name: account.name,
    email: account.email,
    level: account.level,
    streakDays: account.streakDays,
    xp: account.xp,
    dailyGoalLessons: account.dailyGoalLessons,
    dailyGoalMinutes: account.dailyGoalMinutes,
    completedLessonsToday: account.completedLessonsToday,
    studiedMinutesToday: account.studiedMinutesToday,
    wordsMasteredCount: account.wordsMasteredCount,
    wordsReviewCount: account.wordsReviewCount,
    averageQuizScore: account.averageQuizScore,
    isPremium: account.isPremium ?? false,
    plan: account.plan || (account.isPremium ? 'premium' : 'free'),
    premiumSince: account.premiumSince || null,
    avatarUrl: account.avatarUrl
  };
}

// Active listeners for auth changes
type AuthCallback = (user: UserProfile | null) => void;
const authListeners: Set<AuthCallback> = new Set();

function notifyListeners(user: UserProfile | null) {
  authListeners.forEach((callback) => {
    try {
      callback(user);
    } catch (e) {
      console.error('Error in auth listener:', e);
    }
  });
}

function formatFirebaseError(code: string, defaultMessage: string): string {
  switch (code) {
    case 'auth/email-already-in-use':
      return 'An account with this email address already exists. Please log in instead.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters long.';
    case 'auth/user-not-found':
      return 'No account found with this email. Please check your spelling or sign up.';
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Incorrect email or password. Please try again or click "Forgot password?".';
    case 'auth/too-many-requests':
      return 'Access temporarily disabled due to too many failed attempts. Please try again in a few minutes.';
    case 'auth/operation-not-allowed':
      return 'Email/Password sign-in is currently not enabled in the Firebase console.';
    default:
      return defaultMessage || 'Authentication failed. Please verify your details and try again.';
  }
}

export const authService = {
  /**
   * Check if Firebase is currently active and configured
   */
  isFirebaseAvailable(): boolean {
    return firebaseAuth !== null;
  },

  /**
   * Get the current authentication provider name
   */
  getProviderName(): string {
    if (firebaseAuth) return 'Firebase Authentication';
    return 'Secure Local Auth';
  },

  /**
   * Get the currently authenticated user from session storage
   */
  getCurrentUser(): UserProfile | null {
    if (typeof window === 'undefined') return null;
    try {
      const data = localStorage.getItem(STORAGE_KEY_AUTH_USER);
      return data ? (JSON.parse(data) as UserProfile) : null;
    } catch {
      return null;
    }
  },

  /**
   * Update active user profile fields and persist
   */
  updateUserProfile(partial: Partial<UserProfile>): UserProfile | null {
    const current = this.getCurrentUser();
    if (!current) return null;
    const updated: UserProfile = { ...current, ...partial };
    try {
      localStorage.setItem(STORAGE_KEY_AUTH_USER, JSON.stringify(updated));
      const accounts = getAccounts();
      const idx = accounts.findIndex((a) => a.id === current.id || a.email === current.email);
      if (idx !== -1) {
        accounts[idx] = { ...accounts[idx], ...partial };
        saveAccounts(accounts);
      }
      notifyListeners(updated);
    } catch (err) {
      console.error('Failed to update user profile in authService:', err);
    }
    return updated;
  },

  /**
   * Add XP to active user profile or guest session
   */
  addXp(amount: number): UserProfile | null {
    const current = this.getCurrentUser();
    if (!current) {
      if (typeof window !== 'undefined') {
        try {
          const raw = localStorage.getItem('germanteacher_guest_xp');
          const currentXp = raw ? parseInt(raw, 10) || 0 : 0;
          const newXp = currentXp + amount;
          localStorage.setItem('germanteacher_guest_xp', String(newXp));
          notifyListeners(null);
        } catch {}
      }
      return null;
    }
    const currentXp = current.xp || 0;
    return this.updateUserProfile({ xp: currentXp + amount });
  },

  /**
   * Get guest XP accumulated during guest session
   */
  getGuestXp(): number {
    if (typeof window === 'undefined') return 0;
    try {
      const raw = localStorage.getItem('germanteacher_guest_xp');
      return raw ? parseInt(raw, 10) || 0 : 0;
    } catch {
      return 0;
    }
  },

  /**
   * Sign up with email, password, confirm password, full name, and level (default A1)
   */
  async signUp(
    email: string,
    password: string,
    name: string,
    confirmPassword?: string,
    level: GermanLevel = 'A1'
  ): Promise<{ user: UserProfile | null; error: string | null }> {
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();

    if (!cleanEmail || !cleanEmail.includes('@')) {
      return { user: null, error: 'Please enter a valid email address.' };
    }
    if (password.length < 6) {
      return { user: null, error: 'Password must be at least 6 characters long.' };
    }
    if (confirmPassword !== undefined && password !== confirmPassword) {
      return { user: null, error: 'Passwords do not match. Please ensure both passwords are identical.' };
    }
    if (!cleanName) {
      return { user: null, error: 'Please enter your full name.' };
    }

    // 1. Firebase Authentication if configured
    if (firebaseAuth) {
      try {
        const userCredential = await createUserWithEmailAndPassword(firebaseAuth, cleanEmail, password);
        if (userCredential.user) {
          try {
            await updateProfile(userCredential.user, { displayName: cleanName });
          } catch (profileErr) {
            console.warn('Could not update Firebase displayName:', profileErr);
          }

          const userProfile: UserProfile = {
            id: userCredential.user.uid,
            name: cleanName,
            email: cleanEmail,
            level: level || 'A1',
            streakDays: 1,
            xp: 50,
            dailyGoalLessons: 5,
            dailyGoalMinutes: 20,
            completedLessonsToday: 1,
            studiedMinutesToday: 5,
            wordsMasteredCount: 20,
            wordsReviewCount: 5,
            averageQuizScore: 100,
            isPremium: false,
            plan: 'free',
            premiumSince: null
          };

          // Register a local shadow record marked with authProvider: 'firebase'.
          // SECURITY: We NEVER store the password in the shadow record.
          const accounts = getAccounts();
          const existingIdx = accounts.findIndex((acc) => acc.email.toLowerCase() === cleanEmail);
          const shadowRecord: StoredAccount = {
            id: userCredential.user.uid,
            name: cleanName,
            email: cleanEmail,
            authProvider: 'firebase',
            level: level || 'A1',
            streakDays: 1,
            xp: 50,
            dailyGoalLessons: 5,
            dailyGoalMinutes: 20,
            completedLessonsToday: 1,
            studiedMinutesToday: 5,
            wordsMasteredCount: 20,
            wordsReviewCount: 5,
            averageQuizScore: 100,
            isPremium: false,
            plan: 'free',
            premiumSince: null,
            createdAt: new Date().toISOString()
          };

          if (existingIdx !== -1) {
            accounts[existingIdx] = { ...accounts[existingIdx], ...shadowRecord };
          } else {
            accounts.push(shadowRecord);
          }
          saveAccounts(accounts);

          localStorage.setItem(STORAGE_KEY_AUTH_USER, JSON.stringify(userProfile));
          notifyListeners(userProfile);
          return { user: userProfile, error: null };
        }
      } catch (err: any) {
        return { user: null, error: formatFirebaseError(err.code, err.message) };
      }
    }

    // 2. High-fidelity Persistent Local Auth (when Firebase env vars not configured yet)
    const accounts = getAccounts();
    const existing = accounts.find((acc) => acc.email.toLowerCase() === cleanEmail);

    if (existing) {
      return {
        user: null,
        error: 'An account with this email address already exists. Please log in instead.'
      };
    }

    const newAccount: StoredAccount = {
      id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: cleanName,
      email: cleanEmail,
      password,
      authProvider: 'local',
      level: level || 'A1',
      streakDays: 1,
      xp: 50,
      dailyGoalLessons: 5,
      dailyGoalMinutes: 20,
      completedLessonsToday: 1,
      studiedMinutesToday: 5,
      wordsMasteredCount: 20,
      wordsReviewCount: 5,
      averageQuizScore: 100,
      isPremium: false,
      plan: 'free',
      premiumSince: null,
      createdAt: new Date().toISOString()
    };

    accounts.push(newAccount);
    saveAccounts(accounts);

    const userProfile = accountToUserProfile(newAccount);
    localStorage.setItem(STORAGE_KEY_AUTH_USER, JSON.stringify(userProfile));
    notifyListeners(userProfile);

    return { user: userProfile, error: null };
  },

  /**
   * Log in with email and password
   */
  async login(
    email: string,
    password: string
  ): Promise<{ user: UserProfile | null; error: string | null }> {
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !cleanEmail.includes('@')) {
      return { user: null, error: 'Please enter a valid email address.' };
    }
    if (!password) {
      return { user: null, error: 'Please enter your password.' };
    }

    // 1. Firebase Authentication if configured
    if (firebaseAuth) {
      try {
        const userCredential = await signInWithEmailAndPassword(firebaseAuth, cleanEmail, password);
        if (userCredential.user) {
          const u = userCredential.user;
          const existingAccounts = getAccounts();
          let localAcc = existingAccounts.find((a) => a.email.toLowerCase() === cleanEmail);

          // Update or create local shadow record so profile and local DB are in sync
          if (!localAcc) {
            const shadowRecord: StoredAccount = {
              id: u.uid,
              name: u.displayName || cleanEmail.split('@')[0],
              email: cleanEmail,
              authProvider: 'firebase',
              level: 'A1',
              streakDays: 3,
              xp: 350,
              dailyGoalLessons: 5,
              dailyGoalMinutes: 20,
              completedLessonsToday: 2,
              studiedMinutesToday: 12,
              wordsMasteredCount: 45,
              wordsReviewCount: 8,
              averageQuizScore: 94,
              isPremium: false,
              plan: 'free',
              createdAt: new Date().toISOString()
            };
            existingAccounts.push(shadowRecord);
            saveAccounts(existingAccounts);
            localAcc = shadowRecord;
          } else if (localAcc.authProvider !== 'firebase') {
            localAcc.authProvider = 'firebase';
            saveAccounts(existingAccounts);
          }

          const userProfile: UserProfile = accountToUserProfile(localAcc);
          localStorage.setItem(STORAGE_KEY_AUTH_USER, JSON.stringify(userProfile));
          notifyListeners(userProfile);
          return { user: userProfile, error: null };
        }
      } catch (err: any) {
        // If Firebase threw an authentication error, check if a local-only password account exists as fallback
        const existingAccounts = getAccounts();
        const localCandidate = existingAccounts.find((a) => a.email.toLowerCase() === cleanEmail);

        // If local record is explicitly marked as Firebase-backed, do NOT fall back to local password verification
        if (localCandidate && localCandidate.authProvider === 'firebase') {
          return { user: null, error: formatFirebaseError(err.code, err.message) };
        }

        // If a genuine local account exists with a local password, authenticate via local password
        if (localCandidate && localCandidate.password) {
          if (localCandidate.password === password) {
            const userProfile = accountToUserProfile(localCandidate);
            localStorage.setItem(STORAGE_KEY_AUTH_USER, JSON.stringify(userProfile));
            notifyListeners(userProfile);
            return { user: userProfile, error: null };
          } else {
            return {
              user: null,
              error: 'Incorrect password. Please try again or use "Forgot password?".'
            };
          }
        }

        return { user: null, error: formatFirebaseError(err.code, err.message) };
      }
    }

    // 2. High-fidelity Persistent Local Auth (when Firebase is uninitialized or unavailable)
    const accounts = getAccounts();
    const account = accounts.find((acc) => acc.email.toLowerCase() === cleanEmail);

    if (!account) {
      return {
        user: null,
        error: 'No account found with this email address. Please check your spelling or sign up.'
      };
    }

    // If this account was created with Firebase, inform the user that Firebase authentication is required
    // rather than saying "account not found" or allowing a password bypass
    if (account.authProvider === 'firebase') {
      return {
        user: null,
        error: 'This account is registered via Firebase Authentication, but cloud authentication is currently unreachable. Please check your internet connection or try again in a few moments.'
      };
    }

    // Genuine local account: verify local password
    if (account.password !== password) {
      return {
        user: null,
        error: 'Incorrect password. Please try again or use "Forgot password?".'
      };
    }

    const userProfile = accountToUserProfile(account);
    localStorage.setItem(STORAGE_KEY_AUTH_USER, JSON.stringify(userProfile));
    notifyListeners(userProfile);

    return { user: userProfile, error: null };
  },

  /**
   * Log out active session
   */
  async logout(): Promise<void> {
    if (firebaseAuth) {
      try {
        await firebaseSignOut(firebaseAuth);
      } catch (err) {
        console.error('Firebase sign out error:', err);
      }
    }
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY_AUTH_USER);
    }
    notifyListeners(null);
  },

  /**
   * Send or generate password reset token
   */
  async requestPasswordReset(email: string): Promise<{ success: boolean; message: string; error: string | null }> {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      return { success: false, message: '', error: 'Please provide a valid email address.' };
    }

    if (firebaseAuth) {
      try {
        await sendPasswordResetEmail(firebaseAuth, cleanEmail);
        return {
          success: true,
          message: `Password reset instructions dispatched to ${cleanEmail}. Please check your inbox.`,
          error: null
        };
      } catch (err: any) {
        return { success: false, message: '', error: formatFirebaseError(err.code, err.message) };
      }
    }

    const accounts = getAccounts();
    const account = accounts.find((acc) => acc.email.toLowerCase() === cleanEmail);

    if (!account) {
      return {
        success: true,
        message: `If an account exists for ${cleanEmail}, you will receive password reset instructions.`,
        error: null
      };
    }

    // Generate reset token stored locally
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    try {
      const existingTokens = JSON.parse(localStorage.getItem(STORAGE_KEY_RESET_TOKENS) || '{}');
      existingTokens[cleanEmail] = {
        code: resetCode,
        expires: Date.now() + 15 * 60 * 1000 // 15 mins
      };
      localStorage.setItem(STORAGE_KEY_RESET_TOKENS, JSON.stringify(existingTokens));
    } catch {}

    return {
      success: true,
      message: `Password reset token generated for ${cleanEmail}. Use code: ${resetCode}`,
      error: null
    };
  },

  /**
   * Set new password for user after reset request
   */
  async confirmPasswordReset(
    email: string,
    newPassword: string,
    confirmPassword?: string
  ): Promise<{ success: boolean; error: string | null }> {
    const cleanEmail = email.trim().toLowerCase();
    if (newPassword.length < 6) {
      return { success: false, error: 'New password must be at least 6 characters long.' };
    }
    if (confirmPassword !== undefined && newPassword !== confirmPassword) {
      return { success: false, error: 'Passwords do not match. Please ensure both passwords are identical.' };
    }

    const accounts = getAccounts();
    const accountIndex = accounts.findIndex((acc) => acc.email.toLowerCase() === cleanEmail);

    if (accountIndex === -1) {
      return { success: false, error: 'No account matching this email was found.' };
    }

    accounts[accountIndex].password = newPassword;
    saveAccounts(accounts);

    return { success: true, error: null };
  },

  /**
   * Listen for login/logout changes
   */
  onAuthStateChange(callback: AuthCallback): () => void {
    authListeners.add(callback);

    // Initial trigger with current stored session
    const current = this.getCurrentUser();
    callback(current);

    // Firebase Auth listener
    let unsubscribeFirebase: (() => void) | null = null;
    if (firebaseAuth) {
      unsubscribeFirebase = onAuthStateChanged(firebaseAuth, (user: FirebaseUser | null) => {
        if (user) {
          // Firebase confirmed an authenticated user session
          const existingAccounts = getAccounts();
          const localAcc = existingAccounts.find(
            (a) => a.id === user.uid || (user.email && a.email.toLowerCase() === user.email.toLowerCase())
          );
          const userProfile: UserProfile = localAcc
            ? accountToUserProfile(localAcc)
            : {
                id: user.uid,
                name: user.displayName || (user.email ? user.email.split('@')[0] : 'Learner'),
                email: user.email || '',
                level: 'A1',
                streakDays: 1,
                xp: 50,
                dailyGoalLessons: 5,
                dailyGoalMinutes: 20,
                completedLessonsToday: 1,
                studiedMinutesToday: 5,
                wordsMasteredCount: 20,
                wordsReviewCount: 5,
                averageQuizScore: 100,
                isPremium: false,
                plan: 'free',
                premiumSince: null
              };

          localStorage.setItem(STORAGE_KEY_AUTH_USER, JSON.stringify(userProfile));
          callback(userProfile);
        } else {
          // When Firebase returns user === null (e.g. during async startup/offline),
          // check if there is an active session in local storage.
          // CRITICAL: Do NOT purge STORAGE_KEY_AUTH_USER during initialization.
          // Explicit logout (authService.logout()) will explicitly clear the session.
          const existingSession = this.getCurrentUser();
          if (existingSession) {
            callback(existingSession);
          } else {
            callback(null);
          }
        }
      });
    }

    return () => {
      authListeners.delete(callback);
      if (unsubscribeFirebase) unsubscribeFirebase();
    };
  }
};
