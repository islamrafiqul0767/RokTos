import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, signInWithPopup, signOut as fbSignOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from '../config/firebase.ts';
import type { UserPrivateProfile, UserRole } from '../types/index.ts';

interface AuthContextType {
  user: User | null;
  profile: UserPrivateProfile | null;
  isAdmin: boolean;
  isDonor: boolean;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  isAdmin: false,
  isDonor: false,
  loading: true,
  signInWithGoogle: async () => {},
  signOut: async () => {},
  refreshProfile: async () => {},
});

const BOOTSTRAPPED_ADMIN_EMAIL = 'islamrafiqul0767@gmail.com';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserPrivateProfile | null>(null);
  const [loading, setLoading] = useState(true);

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
          console.warn('Could not persist initial profile to Firestore:', err);
          setProfile(initialProfile);
        }
      }
    } catch (err) {
      console.error('Error fetching user profile:', err);
    }
  };

  useEffect(() => {
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

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      await fetchProfile(result.user);
    } catch (error) {
      console.error('Sign-in failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await fbSignOut(auth);
      setUser(null);
      setProfile(null);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user);
    }
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
        signInWithGoogle,
        signOut,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
