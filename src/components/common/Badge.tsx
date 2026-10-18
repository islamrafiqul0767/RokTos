import React from 'react';
import { useLanguage } from '../../context/LanguageContext.tsx';
import type { ReviewStatus, AvailabilityStatus } from '../../types/index.ts';
import { CheckCircle2, AlertCircle, Clock, ShieldCheck, UserCheck } from 'lucide-react';

interface ReviewBadgeProps {
  type: 'identity' | 'blood_group';
  status: ReviewStatus;
}

export const ReviewBadge: React.FC<ReviewBadgeProps> = ({ type, status }) => {
  const { t } = useLanguage();

  if (type === 'identity') {
    if (status === 'reviewed') {
      return (
        <span
          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200"
          title="জাতীয় পরিচয় বা পরিচয়পত্রের তথ্য পর্যালোচিত"
        >
          <UserCheck className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
          <span>{t.identityReviewed}</span>
        </span>
      );
    }
    return (
      <span
        className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md bg-stone-100 text-stone-700 border border-stone-200"
        title="স্বঘোষিত নাম ও তথ্য"
      >
        <Clock className="w-3.5 h-3.5 text-stone-500" aria-hidden="true" />
        <span>{t.identityNotReviewed}</span>
      </span>
    );
  }

  // Blood group review badge
  if (status === 'reviewed') {
    return (
      <span
        className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md bg-rose-50 text-rose-800 border border-rose-200"
        title="রক্তের গ্রুপের টেস্ট বা কার্ডের প্রমাণ পর্যালোচিত"
      >
        <ShieldCheck className="w-3.5 h-3.5 text-rose-700" aria-hidden="true" />
        <span>{t.bloodGroupReviewed}</span>
      </span>
    );
  }

  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md bg-stone-100 text-stone-600 border border-stone-200"
      title="ব্যবহারকারীর স্বঘোষিত রক্তের গ্রুপ"
    >
      <AlertCircle className="w-3.5 h-3.5 text-stone-500" aria-hidden="true" />
      <span>{t.bloodGroupSelfReported}</span>
    </span>
  );
};

export const AvailabilityBadge: React.FC<{ status: AvailabilityStatus }> = ({ status }) => {
  const { t } = useLanguage();

  switch (status) {
    case 'available':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-md bg-emerald-100 text-emerald-800 border border-emerald-300">
          <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
          {t.availableNow}
        </span>
      );
    case 'temporarily_unavailable':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-md bg-amber-100 text-amber-800 border border-amber-300">
          <span className="w-2 h-2 rounded-full bg-amber-600"></span>
          {t.temporarilyUnavailable}
        </span>
      );
    case 'paused':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-md bg-stone-100 text-stone-600 border border-stone-300">
          <span className="w-2 h-2 rounded-full bg-stone-500"></span>
          {t.paused}
        </span>
      );
  }
};
