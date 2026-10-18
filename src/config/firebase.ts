import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  browserLocalPersistence,
  setPersistence,
} from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import fallbackConfig from '../../firebase-applet-config.json';

// Support both Vercel/Vite environment variables and local JSON configuration
const env = import.meta.env;

export const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY || fallbackConfig.apiKey,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || fallbackConfig.authDomain,
  projectId: env.VITE_FIREBASE_PROJECT_ID || fallbackConfig.projectId,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || fallbackConfig.storageBucket,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || fallbackConfig.messagingSenderId,
  appId: env.VITE_FIREBASE_APP_ID || fallbackConfig.appId,
  firestoreDatabaseId:
    env.VITE_FIREBASE_FIRESTORE_DATABASE_ID || fallbackConfig.firestoreDatabaseId || '(default)',
};

// Initialize App singleton
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore with dedicated or default database ID
export const db =
  firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== '(default)'
    ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
    : getFirestore(app);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Ensure session persistence across browser reloads
try {
  setPersistence(auth, browserLocalPersistence).catch((err) => {
    console.warn('Could not enforce browserLocalPersistence for auth:', err);
  });
} catch (e) {
  // Ignore in SSR or non-browser environments
}

// Configure Google OAuth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

// Helper to provide clear, actionable diagnostics for auth error codes
export interface AuthErrorInfo {
  code: string;
  messageBn: string;
  messageEn: string;
  actionRequired?: string;
}

export function parseAuthError(error: any): AuthErrorInfo {
  const code = error?.code || 'unknown';

  switch (code) {
    case 'auth/unauthorized-domain': {
      const currentHost = typeof window !== 'undefined' ? window.location.hostname : 'your domain';
      return {
        code,
        messageBn: `এই ডোমেইনটি (${currentHost}) ফায়ারবেস অথেনটিকেশনে অনুমোদিত নয়।`,
        messageEn: `The domain "${currentHost}" is not authorized for OAuth operations in Firebase.`,
        actionRequired: `Firebase Console -> Authentication -> Settings -> Authorized Domains -> Add "${currentHost}".`,
      };
    }
    case 'auth/popup-blocked':
      return {
        code,
        messageBn: 'আপনার ব্রাউজার লগইন পপ-আপ উইন্ডোটি ব্লক করেছে। রিডাইরেক্ট অপশন ব্যবহার করুন।',
        messageEn: 'The sign-in popup was blocked by your browser. Please try signing in via redirect.',
        actionRequired: 'Allow popups in your browser settings or use the Redirect Sign-In button.',
      };
    case 'auth/popup-closed-by-user':
      return {
        code,
        messageBn: 'লগইন প্রক্রিয়া সম্পন্ন করার আগেই উইন্ডোটি বন্ধ করা হয়েছে।',
        messageEn: 'Sign-in window was closed before completion. Please try again.',
      };
    case 'auth/cancelled-popup-request':
      return {
        code,
        messageBn: 'পূর্ববর্তী লগইন অনুরোধের কারণে এই অনুরোধটি বাতিল করা হয়েছে।',
        messageEn: 'Previous popup request was cancelled by a newer request.',
      };
    case 'auth/network-request-failed':
      return {
        code,
        messageBn: 'ইন্টারনেট সংযোগে সমস্যা দেখা দিয়েছে। আপনার নেটওয়ার্ক চেক করুন।',
        messageEn: 'Network connection failed. Please check your internet connectivity.',
      };
    case 'auth/operation-not-allowed':
      return {
        code,
        messageBn: 'ফায়ারবেস কনসোলে গুগল সাইন-ইন প্রোভাইডার সক্রিয় করা নেই।',
        messageEn: 'Google sign-in provider is not enabled in Firebase Console.',
        actionRequired: 'Firebase Console -> Authentication -> Sign-in method -> Enable Google.',
      };
    case 'auth/user-disabled':
      return {
        code,
        messageBn: 'এই ব্যবহারকারী অ্যাকাউন্টটি সাময়িকভাবে নিষ্ক্রিয় করা হয়েছে।',
        messageEn: 'This user account has been disabled by administrators.',
      };
    default:
      return {
        code,
        messageBn: error?.message || 'লগইন সম্পন্ন করতে একটি ত্রুটি ঘটেছে। আবার চেষ্টা করুন।',
        messageEn: error?.message || 'An error occurred during authentication. Please retry.',
      };
  }
}

// Connection health test
export async function testFirestoreConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client is currently offline or unreachable.');
    }
    return false;
  }
}
