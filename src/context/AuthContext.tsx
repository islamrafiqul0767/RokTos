import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut as fbSignOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, googleProvider, db, parseAuthError, type AuthErrorInfo } from '../config/firebase.ts';
import type { UserPrivateProfile } from '../types/index.ts';

interface AuthContextType {
  user: User | null;
  profile: UserPrivateProfile | null;
  isAdmin: boolean;
  isDonor: boolean;
  loading: boolean;
  isSigningIn: boolean;
  authError: AuthErrorInfo | null;
  signInWithGoogle: () => Promise<boolean>;
  signInWithGoogleRedirect: () => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  clearAuthError: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  isAdmin: false,
  isDonor: false,
  loading: true,
  isSigningIn: false,
  authError: null,
  signInWithGoogle: async () => false,
  signInWithGoogleRedirect: async () => {},
  signOut: async () => {},
  refreshProfile: async () => {},
  clearAuthError: () => {},
});

const BOOTSTRAPPED_ADMIN_EMAIL = 'islamrafiqul0767@gmail.com';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserPrivateProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [authError, setAuthError] = useState<AuthErrorInfo | null>(null);

  const fetchProfile = async (currentUser: User) => {
    try {
      const userRef = doc(db, 'userPrivateProfiles', currentUser.uid);
      const snapshot = await getDoc(userRef);

      const isAdminEmail = currentUser.email === BOOTSTRAPPED_ADMIN_EMAIL;

      if (snapshot.exists()) {
        const data = snapshot.data() as UserPrivateProfile;
        if (isAdminEmail && data.role !== 'admin') {
          data.role = 'admin';
        }
        setProfile(data);
      } else {
        // Create initial private profile for new authenticated user
        const initialProfile: UserPrivateProfile = {
          uid: currentUser.uid,
          displayName: currentUser.displayName || 'Community Member',
          email: currentUser.email || '',
          preferredLanguage: 'bn',
          division: 'dhaka',
          district: 'dhaka_city',
          upazila: '',
          approximateArea: '',
          preferredContactChannel: 'in_app',
          role: isAdminEmail ? 'admin' : 'registered_user',
          isDonor: false,
          bloodGroup: 'Unknown',
          identityReviewStatus: 'not_started',
          bloodGroupReviewStatus: 'not_started',
          consentGiven: false,
          consentVersion: '2026-v1',
          ageConfirmed18: false,
          termsAccepted: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        try {
          await setDoc(userRef, initialProfile);
          setProfile(initialProfile);
        } catch (err) {
          console.warn('Could not persist initial profile to Firestore (using in-memory):', err);
          setProfile(initialProfile);
        }
      }
    } catch (err) {
      console.error('Error fetching user profile:', err);
    }
  };

  useEffect(() => {
    // 1. Process redirect result if returning from a Google redirect flow
    getRedirectResult(auth)
      .then(async (result) => {
        if (result && result.user) {
          setUser(result.user);
          await fetchProfile(result.user);
        }
      })
      .catch((err) => {
        console.warn('OAuth redirect result error:', err);
        const parsed = parseAuthError(err);
        setAuthError(parsed);
      });

    // 2. Listen to authenticated user state
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await fetchProfile(currentUser);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async (): Promise<boolean> => {
    if (isSigningIn) return false;
    setIsSigningIn(true);
    setAuthError(null);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      await fetchProfile(result.user);
      setIsSigningIn(false);
      return true;
    } catch (error: any) {
      console.error('Sign-in with popup error:', error);
      const parsed = parseAuthError(error);
      setAuthError(parsed);
      setIsSigningIn(false);

      // If popup blocked on mobile, inform the caller
      if (error?.code === 'auth/popup-blocked') {
        console.warn('Popup blocked, recommend signInWithGoogleRedirect.');
      }
      return false;
    }
  };

  const signInWithGoogleRedirect = async (): Promise<void> => {
    if (isSigningIn) return;
    setIsSigningIn(true);
    setAuthError(null);

    try {
      await signInWithRedirect(auth, googleProvider);
    } catch (error: any) {
      console.error('Sign-in with redirect error:', error);
      const parsed = parseAuthError(error);
      setAuthError(parsed);
      setIsSigningIn(false);
    }
  };

  const signOut = async () => {
    try {
      await fbSignOut(auth);
      setUser(null);
      setProfile(null);
      setAuthError(null);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user);
    }
  };

  const clearAuthError = () => {
    setAuthError(null);
  };

  const isAdmin = user?.email === BOOTSTRAPPED_ADMIN_EMAIL || profile?.role === 'admin';
  const isDonor = !!profile?.isDonor;

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isAdmin,
        isDonor,
        loading,
        isSigningIn,
        authError,
        signInWithGoogle,
        signInWithGoogleRedirect,
        signOut,
        refreshProfile,
        clearAuthError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
