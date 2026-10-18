import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext.tsx';
import { useAuth } from '../../context/AuthContext.tsx';
import { submitReport } from '../../services/reportService.ts';
import type { ReportCategory } from '../../types/index.ts';
import { AlertTriangle, X, Check } from 'lucide-react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetType: 'donor' | 'blood_request' | 'contact_request' | 'other';
  targetId: string;
  targetTitleOrName: string;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  targetType,
  targetId,
  targetTitleOrName,
}) => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const [category, setCategory] = useState<ReportCategory>('scam');
  const [explanation, setExplanation] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError(language === 'bn' ? 'অভিযোগ জমা দিতে প্রথমে লগইন করুন।' : 'Please sign in to submit a report.');
      return;
    }
    if (!explanation.trim()) {
      setError(language === 'bn' ? 'অনুগ্রহ করে কারণটি সংক্ষেপে ব্যাখ্যা করুন।' : 'Please provide a short explanation.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await submitReport({
        reporterUid: user.uid,
        targetType,
        targetId,
        targetTitleOrName,
        category,
        explanation,
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setExplanation('');
        onClose();
      }, 2000);
    } catch (err: any) {
      setError(err?.message || 'Failed to submit report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl border border-stone-200">
        <div className="flex items-center justify-between pb-3 border-b border-stone-200">
          <div className="flex items-center gap-2 text-rose-700">
            <AlertTriangle className="w-5 h-5" />
            <h3 className="font-bold text-stone-900">
              {language === 'bn' ? 'অভিযোগ বা অপব্যবহার রিপোর্ট করুন' : 'Report Abuse or Problem'}
            </h3>
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
          <div className="py-8 text-center text-emerald-700">
            <Check className="w-12 h-12 mx-auto mb-2 bg-emerald-100 p-2 rounded-full" />
            <p className="font-semibold">
              {language === 'bn'
                ? 'আপনার অভিযোগটি সফলভাবে জমা হয়েছে। মডারেটর দল তা পর্যালোচনা করবে।'
                : 'Your report has been submitted for moderator review.'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div>
              <p className="text-xs text-stone-500 mb-2">
                {language === 'bn' ? 'লক্ষ্যবস্তু:' : 'Target:'}{' '}
                <strong className="text-stone-800">{targetTitleOrName}</strong>
              </p>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                {language === 'bn' ? 'অভিযোগের ধরন' : 'Report Category'}
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ReportCategory)}
                className="w-full text-sm border border-stone-300 rounded-md p-2 bg-stone-50 text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
              >
                <option value="scam">{language === 'bn' ? 'প্রতারণা / টাকার দাবি' : 'Scam / Money Request'}</option>
                <option value="false_request">{language === 'bn' ? 'ভুয়া বা অপ্রাসঙ্গিক তথ্য' : 'False or Inaccurate Request'}</option>
                <option value="harassment">{language === 'bn' ? 'হয়রানি বা অসদাচরণ' : 'Harassment / Abusive Behavior'}</option>
                <option value="privacy_violation">{language === 'bn' ? 'অনুমতি ছাড়া তথ্য প্রকাশ' : 'Privacy Violation'}</option>
                <option value="outdated_fulfilled">{language === 'bn' ? 'রক্ত পাওয়া গেছে / আর প্রয়োজন নেই' : 'Fulfilled / Outdated'}</option>
                <option value="other">{language === 'bn' ? 'অন্যান্য কারণ' : 'Other Reason'}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                {language === 'bn' ? 'বিস্তারিত বিবরণ' : 'Detailed Explanation'}
              </label>
              <textarea
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
                rows={3}
                placeholder={
                  language === 'bn'
                    ? 'ঘটনা বা সমস্যার বিস্তারিত লিখুন...'
                    : 'Provide factual details about the problem...'
                }
                className="w-full text-sm border border-stone-300 rounded-md p-2 bg-white text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
                maxLength={500}
                required
              />
            </div>

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
                {language === 'bn' ? 'বাতিল' : 'Cancel'}
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 text-xs font-medium text-white bg-rose-700 hover:bg-rose-800 rounded-md transition-colors disabled:opacity-50"
              >
                {loading
                  ? (language === 'bn' ? 'জমা হচ্ছে...' : 'Submitting...')
                  : (language === 'bn' ? 'রিপোর্ট জমা দিন' : 'Submit Report')}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
