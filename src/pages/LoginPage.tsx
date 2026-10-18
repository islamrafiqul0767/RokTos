import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import { useLanguage } from '../context/LanguageContext.tsx';
import { SEOHead } from '../components/common/SEOHead.tsx';
import { RoktosLogo } from '../components/common/RoktosLogo.tsx';
import { GoogleSignInButton } from '../components/auth/GoogleSignInButton.tsx';
import { SITE_CONFIG } from '../config/siteConfig.ts';
import {
  ShieldCheck,
  Lock,
  Heart,
  ArrowLeft,
  CheckCircle2,
  Info,
  Globe,
} from 'lucide-react';

interface LoginPageProps {
  onNavigate: (path: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const { language } = useLanguage();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      onNavigate('/dashboard');
    }
  }, [user, onNavigate]);

  const currentHost = typeof window !== 'undefined' ? window.location.hostname : 'localhost';

  return (
    <>
      <SEOHead
        title={language === 'bn' ? 'প্রবেশ করুন — রক্তস (ROKTOS)' : 'Sign In — ROKTOS'}
        description="Secure Google Authentication for ROKTOS Blood Donor Network Bangladesh."
        noindex={true}
        canonicalPath="/login"
      />

      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full space-y-6">
          {/* Back button */}
          <button
            onClick={() => onNavigate('/')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{language === 'bn' ? 'হোমে ফিরে যান' : 'Back to Home'}</span>
          </button>

          {/* Main Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6 text-center">
            {/* Logo */}
            <div className="flex justify-center">
              <RoktosLogo variant="full" size="lg" />
            </div>

            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {language === 'bn' ? 'রক্তস নেটওয়ার্কে প্রবেশ করুন' : 'Sign in to ROKTOS'}
              </h1>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                {language === 'bn'
                  ? 'স্বেচ্ছাসেবী রক্তদাতা হতে বা জরুরি রক্তের আবেদন জমা দিতে নিরাপদ গুগল অ্যাকাউন্টের মাধ্যমে সাইন ইন করুন।'
                  : 'Authenticate securely using your Google account to register as a donor or coordinate blood requests.'}
              </p>
            </div>

            {/* Google Sign In Component */}
            <div className="pt-2">
              <GoogleSignInButton onSuccess={() => onNavigate('/dashboard')} />
            </div>

            {/* Privacy & Safety Assurances */}
            <div className="pt-4 border-t border-slate-100 text-left space-y-2.5 text-xs text-slate-600">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                <span>
                  {language === 'bn'
                    ? 'কোনো প্রকার পাসওয়ার্ড প্রয়োজন নেই। গুগল অথেনটিকেশনের মাধ্যমে আপনার অ্যাকাউন্ট সুরক্ষিত।'
                    : 'No separate passwords needed. Secured via Google Identity infrastructure.'}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Lock className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                <span>
                  {language === 'bn'
                    ? 'আপনার মোবাইল নম্বর বা ব্যক্তিগত ইমেইল কখনোই অনুমতি ছাড়া উন্মুক্ত করা হবে না।'
                    : 'Zero phone/email scraping: personal contact is only shared with mutual consent.'}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Heart className="w-4 h-4 text-rose-700 shrink-0 mt-0.5" />
                <span>
                  {language === 'bn'
                    ? '১০০% অবাণিজ্যিক ও উন্মুক্ত মানবিক প্ল্যাটফর্ম।'
                    : '100% free, non-commercial community initiative for Bangladesh.'}
                </span>
              </div>
            </div>

            {/* Production Host Diagnostic Notice */}
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-[11px] text-slate-500 text-left space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-slate-700">
                <Info className="w-3.5 h-3.5 text-slate-600" />
                <span>{language === 'bn' ? 'হোস্টিং ও ডোমেইন ডায়াগনস্টিক:' : 'Deployment Diagnostic:'}</span>
              </div>
              <p>
                {language === 'bn'
                  ? `বর্তমান হোস্টিং ডোমেইন: ${currentHost}। ভেরসেল বা লাইভ সাইটে লগইন ব্যর্থ হলে ফায়ারবেস অথেনটিকেশনের অনুমোদিত ডোমেইন তালিকায় এই হোস্টটি যুক্ত করা আবশ্যক।`
                  : `Active host: "${currentHost}". If sign-in fails on Vercel, ensure this domain is added to Firebase Authentication Authorized Domains.`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
