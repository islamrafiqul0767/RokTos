import React from 'react';
import { useAuth } from '../../context/AuthContext.tsx';
import { useLanguage } from '../../context/LanguageContext.tsx';
import { AlertCircle, ExternalLink, RefreshCw, X } from 'lucide-react';

interface GoogleSignInButtonProps {
  className?: string;
  onSuccess?: () => void;
  variant?: 'standard' | 'compact' | 'light' | 'navbar';
}

export const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({
  className = '',
  onSuccess,
  variant = 'standard',
}) => {
  const { isSigningIn, authError, signInWithGoogle, signInWithGoogleRedirect, clearAuthError } = useAuth();
  const { language } = useLanguage();

  const handleSignIn = async () => {
    const success = await signInWithGoogle();
    if (success && onSuccess) {
      onSuccess();
    }
  };

  const handleRedirectSignIn = async () => {
    await signInWithGoogleRedirect();
  };

  // Official Google 'G' SVG mark complying with Google Identity Brand Guidelines
  const GoogleGLogo = (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );

  if (variant === 'navbar') {
    return (
      <button
        onClick={handleSignIn}
        disabled={isSigningIn}
        className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-md bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 shadow-2xs hover:shadow-xs transition-all active:scale-98 disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
        aria-label="Sign in with Google"
      >
        {isSigningIn ? (
          <RefreshCw className="w-3.5 h-3.5 animate-spin text-slate-500" />
        ) : (
          GoogleGLogo
        )}
        <span>{isSigningIn ? (language === 'bn' ? 'প্রবেশ করা হচ্ছে...' : 'Signing in...') : (language === 'bn' ? 'গুগল দিয়ে প্রবেশ' : 'Sign in')}</span>
      </button>
    );
  }

  return (
    <div className="w-full space-y-3">
      <button
        onClick={handleSignIn}
        disabled={isSigningIn}
        className={`w-full flex items-center justify-center gap-3 px-4 py-3 text-xs sm:text-sm font-semibold rounded-lg bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 shadow-xs hover:shadow-md transition-all active:scale-99 disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
        aria-label="Sign in with Google"
      >
        {isSigningIn ? (
          <RefreshCw className="w-4 h-4 animate-spin text-slate-600" />
        ) : (
          GoogleGLogo
        )}
        <span className="font-sans font-medium">
          {isSigningIn
            ? (language === 'bn' ? 'নিরাপদে সংযোগ হচ্ছে...' : 'Connecting securely...')
            : (language === 'bn' ? 'গুগল অ্যাকাউন্ট দিয়ে প্রবেশ করুন' : 'Sign in with Google')}
        </span>
      </button>

      {/* Actionable Error Banner with Domain Authorization Troubleshooting */}
      {authError && (
        <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-900 space-y-2 text-left animate-in fade-in duration-200">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-700 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">
                  {language === 'bn' ? authError.messageBn : authError.messageEn}
                </strong>
                {authError.actionRequired && (
                  <p className="mt-1 text-[11px] text-rose-800 font-mono bg-rose-100/70 p-1.5 rounded border border-rose-200 break-all">
                    {authError.actionRequired}
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={clearAuthError}
              className="p-1 rounded text-rose-500 hover:text-rose-800"
              aria-label="Dismiss error"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Popup blocked fallback action */}
          {authError.code === 'auth/popup-blocked' && (
            <div className="pt-1">
              <button
                onClick={handleRedirectSignIn}
                className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-rose-700 hover:bg-rose-800 text-white font-bold rounded-md text-xs transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'রিডাইরেক্ট পদ্ধতিতে প্রবেশ করুন' : 'Continue with Redirect Flow'}</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
