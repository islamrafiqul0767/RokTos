import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext.tsx';
import { useAuth } from '../../context/AuthContext.tsx';
import { createContactRequest } from '../../services/contactService.ts';
import type { PublicDonorProfile } from '../../types/index.ts';
import { MessageSquare, X, Check, Lock, AlertCircle } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  donor: PublicDonorProfile | null;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, donor }) => {
  const { language, t } = useLanguage();
  const { user, profile, signInWithGoogle } = useAuth();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen || !donor) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      try {
        await signInWithGoogle();
      } catch (err: any) {
        setError(language === 'bn' ? 'লগইন ব্যর্থ হয়েছে।' : 'Sign-in failed.');
        return;
      }
    }

    if (!message.trim()) {
      setError(language === 'bn' ? 'বার্তা লেখা আবশ্যক।' : 'Message cannot be empty.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await createContactRequest({
        requesterUid: user!.uid,
        requesterDisplayLabel: profile?.displayName || user!.displayName || 'Patient Relatives',
        requesterEmail: user!.email || undefined,
        donorUid: donor.uid,
        donorDisplayLabel: donor.displayLabel,
        message: message.trim(),
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setMessage('');
        onClose();
      }, 2500);
    } catch (err: any) {
      setError(err?.message || 'Failed to submit contact request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-lg w-full p-6 shadow-xl border border-stone-200">
        <div className="flex items-center justify-between pb-3 border-b border-stone-200">
          <div className="flex items-center gap-2 text-emerald-900">
            <MessageSquare className="w-5 h-5 text-emerald-700" />
            <h3 className="font-bold text-stone-900">{t.contactModalTitle}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-600 rounded-md p-1"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {success ? (
          <div className="py-8 text-center text-emerald-800">
            <Check className="w-12 h-12 mx-auto mb-3 bg-emerald-100 p-2 rounded-full text-emerald-700" />
            <h4 className="font-bold text-base mb-1">
              {language === 'bn' ? 'অনুরোধ সফলভাবে পাঠানো হয়েছে!' : 'Request Sent Successfully!'}
            </h4>
            <p className="text-xs text-stone-600">
              {language === 'bn'
                ? 'রক্তদাতা আপনার অনুরোধ পর্যালোচনা করে গ্রহণ করলে আপনার ড্যাশবোর্ডে যোগাযোগের তথ্য দৃশ্যমান হবে।'
                : 'Once the donor reviews and accepts, contact info will become visible in your Dashboard.'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div className="p-3 bg-emerald-50 rounded-md border border-emerald-200 flex items-start gap-2.5">
              <Lock className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
              <div className="text-xs text-emerald-950 leading-relaxed">
                <span className="font-semibold block mb-0.5">
                  {language === 'bn' ? 'গোপনীয়তা সুরক্ষা বার্তা:' : 'Privacy Safeguard:'}
                </span>
                {t.contactModalNotice}
              </div>
            </div>

            <div className="bg-stone-50 p-3 rounded-md border border-stone-200 text-xs">
              <div className="flex justify-between items-center mb-1">
                <span className="text-stone-600">{language === 'bn' ? 'রক্তদাতা:' : 'Donor:'}</span>
                <span className="font-bold text-stone-900">{donor.displayLabel}</span>
              </div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-stone-600">{language === 'bn' ? 'রক্তের গ্রুপ:' : 'Blood Group:'}</span>
                <span className="font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-sm border border-rose-200">
                  {donor.bloodGroup}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-stone-600">{language === 'bn' ? 'এলাকা:' : 'Area:'}</span>
                <span className="font-medium text-stone-800">{donor.approximateArea || donor.district}</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                {language === 'bn' ? 'বার্তা ও রোগীর অবস্থা' : 'Message & Patient Details'}
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                placeholder={t.contactMessagePlaceholder}
                className="w-full text-sm border border-stone-300 rounded-md p-2.5 bg-white text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
                maxLength={400}
                required
              />
              <span className="text-[11px] text-stone-400 block text-right mt-0.5">
                {message.length} / 400
              </span>
            </div>

            {!user && (
              <div className="flex items-center gap-2 p-2 bg-amber-50 border border-amber-200 rounded-md text-amber-900 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0 text-amber-700" />
                <span>
                  {language === 'bn'
                    ? 'অনুরোধ পাঠাতে আপনার গুগল অ্যাকাউন্ট দিয়ে সাইন ইন সম্পন্ন হবে।'
                    : 'Sending request will prompt Google sign-in to authenticate.'}
                </span>
              </div>
            )}

            {error && (
              <p className="text-xs text-rose-600 bg-rose-50 p-2 rounded-md border border-rose-200">
                {error}
              </p>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-md"
              >
                {t.cancel}
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 text-xs font-medium text-white bg-emerald-800 hover:bg-emerald-900 rounded-md transition-colors disabled:opacity-50"
              >
                {loading
                  ? (language === 'bn' ? 'পাঠানো হচ্ছে...' : 'Sending...')
                  : t.sendContactRequest}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
