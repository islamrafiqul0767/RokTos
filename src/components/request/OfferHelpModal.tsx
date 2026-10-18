import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext.tsx';
import { useAuth } from '../../context/AuthContext.tsx';
import { createContactRequest } from '../../services/contactService.ts';
import type { BloodRequest } from '../../types/index.ts';
import {
  X,
  HeartHandshake,
  Check,
  AlertCircle,
  Building2,
  Clock,
  ShieldAlert,
  LogIn,
} from 'lucide-react';

interface OfferHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: BloodRequest;
  onSuccess?: () => void;
}

export const OfferHelpModal: React.FC<OfferHelpModalProps> = ({
  isOpen,
  onClose,
  request,
  onSuccess,
}) => {
  const { language, t } = useLanguage();
  const { user, profile, signInWithGoogle } = useAuth();

  const [message, setMessage] = useState('');
  const [crossMatchAgreed, setCrossMatchAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (!crossMatchAgreed) {
      setError(
        language === 'bn'
          ? 'হাসপাতালে বাধ্যতামূলক স্ক্রিনিং ও ক্রস-ম্যাচিংয়ের শর্তে সম্মতি দিন।'
          : 'Please acknowledge the mandatory hospital cross-matching requirement.'
      );
      return;
    }

    if (!message.trim()) {
      setError(
        language === 'bn'
          ? 'অনুরোধকারীর জন্য একটি সংক্ষিপ্ত বার্তা লিখুন।'
          : 'Please include a brief message for the patient family.'
      );
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      await createContactRequest({
        requesterUid: user.uid,
        requesterDisplayLabel: profile?.displayName || user.displayName || 'Volunteer Donor',
        requesterEmail: user.email || '',
        donorUid: request.createdByUid,
        donorDisplayLabel: request.requesterDisplayLabel,
        message: message.trim(),
        requestId: request.id,
      });

      setSuccess(true);
      if (onSuccess) onSuccess();
      setTimeout(() => {
        setSuccess(false);
        setMessage('');
        onClose();
      }, 2500);
    } catch (err: any) {
      setError(err?.message || 'Failed to submit response');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-lg w-full border border-slate-200 shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-900 to-rose-800 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-md bg-white/10 flex items-center justify-center">
              <HeartHandshake className="w-5 h-5 text-rose-300" />
            </div>
            <div>
              <h3 className="font-extrabold text-base leading-tight">
                {language === 'bn' ? 'রক্ত সহায়তার আগ্রহ প্রকাশ' : 'Offer Blood Donation'}
              </h3>
              <span className="text-[11px] text-rose-200 block">
                {request.patientDisplayNameOrInitials} — {request.requestedBloodGroup}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-rose-200 hover:text-white hover:bg-white/10"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!user ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-700 flex items-center justify-center mx-auto">
                <LogIn className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-base">
                  {language === 'bn' ? 'লগইন আবশ্যক' : 'Sign in Required'}
                </h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto mt-1 leading-relaxed">
                  {language === 'bn'
                    ? 'রোগী ও তার স্বজনদের প্রতারণা ও অপব্যবহার থেকে সুরক্ষিত রাখতে রক্ত সহায়তা দিতে গুগল দিয়ে লগইন করুন।'
                    : 'To protect patient families from abuse and coordinate securely, please sign in with Google.'}
                </p>
              </div>
              <button
                onClick={signInWithGoogle}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs shadow-md transition-colors"
              >
                <LogIn className="w-4 h-4" />
                <span>{t.signInWithGoogle}</span>
              </button>
            </div>
          ) : success ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-14 h-14 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mx-auto">
                <Check className="w-8 h-8" />
              </div>
              <h4 className="font-extrabold text-lg text-slate-900">
                {language === 'bn' ? 'আপনার আগ্রহ সফলভাবে পৌঁছানো হয়েছে!' : 'Offer Recorded Successfully!'}
              </h4>
              <p className="text-xs text-slate-600 max-w-xs mx-auto">
                {language === 'bn'
                  ? 'রোগীর আবেদনকারী তার ড্যাশবোর্ডে আপনার বার্তা দেখতে পাবেন এবং আপনার সাথে যোগাযোগ করবেন।'
                  : 'The requester has received your willingness note and will coordinate directly.'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Request Summary Preview */}
              <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 text-xs text-slate-700 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{request.hospitalName}</span>
                  <span className="px-2 py-0.5 rounded-sm bg-rose-100 text-rose-800 font-extrabold text-xs">
                    {request.requestedBloodGroup} ({request.unitsNeeded || '১ ব্যাগ'})
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>{request.hospitalArea ? `${request.hospitalArea}, ` : ''}{request.district}</span>
                </div>
              </div>

              {/* Message Input */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  {language === 'bn' ? 'আপনার প্রাপ্যতা ও সংক্ষিপ্ত বার্তা' : 'Your Availability & Note'} *
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={
                    language === 'bn'
                      ? 'যেমন: আমি আজ বিকাল ৪টার পর ঢাকা মেডিকেলে এসে রক্ত দিতে পারব। অনুগ্রহ করে যোগাযোগ করুন।'
                      : 'e.g., I am eligible and available to donate today at the hospital after 4 PM.'
                  }
                  className="w-full text-xs sm:text-sm p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-600 focus:outline-hidden"
                  required
                />
              </div>

              {/* Mandatory Clinical Agreement */}
              <div className="p-3 bg-amber-50/80 rounded-lg border border-amber-200 space-y-2">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-amber-950">
                  <input
                    type="checkbox"
                    checked={crossMatchAgreed}
                    onChange={(e) => setCrossMatchAgreed(e.target.checked)}
                    className="mt-0.5 rounded text-rose-700 focus:ring-rose-600"
                    required
                  />
                  <span className="leading-relaxed">
                    {language === 'bn'
                      ? 'আমি অবগত যে রক্ত দেওয়ার পূর্বে হাসপাতালে চিকিৎসকের উপস্থিতিতে বাধ্যতামূলক ৫টি সংক্রামক রোগ স্ক্রিনিং ও ক্রস-ম্যাচিং সম্পন্ন করতে হবে।'
                      : 'I acknowledge that mandatory infectious disease screening (TTIs) and laboratory cross-matching are compulsory before transfusion.'}
                  </span>
                </label>
              </div>

              {error && (
                <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-md text-xs text-rose-800 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Buttons */}
              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold rounded-md text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  {language === 'bn' ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  disabled={submitting || !crossMatchAgreed}
                  className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold rounded-md text-white bg-rose-700 hover:bg-rose-800 disabled:opacity-50 transition-colors shadow-xs"
                >
                  <HeartHandshake className="w-4 h-4" />
                  <span>{submitting ? t.loading : (language === 'bn' ? 'অনুরোধ নিশ্চিত করুন' : 'Confirm Offer')}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
