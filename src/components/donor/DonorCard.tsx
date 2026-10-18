import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext.tsx';
import type { PublicDonorProfile } from '../../types/index.ts';
import { ReviewBadge, AvailabilityBadge } from '../common/Badge.tsx';
import { ContactModal } from './ContactModal.tsx';
import { ReportModal } from '../common/ReportModal.tsx';
import { MapPin, Calendar, Flag, MessageSquare } from 'lucide-react';

interface DonorCardProps {
  donor: PublicDonorProfile;
}

export const DonorCard: React.FC<DonorCardProps> = ({ donor }) => {
  const { language, t } = useLanguage();
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);

  const formattedDate = new Date(donor.availabilityLastUpdatedAt || donor.updatedAt).toLocaleDateString(
    language === 'bn' ? 'bn-BD' : 'en-US',
    { year: 'numeric', month: 'short', day: 'numeric' }
  );

  return (
    <>
      <div className="bg-white rounded-lg border border-stone-200 shadow-xs hover:shadow-md transition-shadow p-5 flex flex-col justify-between relative">
        {donor.isDemo && (
          <div className="mb-3 px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-md text-[11px] font-medium inline-block w-fit">
            {t.demoBadge}
          </div>
        )}

        <div>
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <h3 className="font-bold text-base text-stone-900 leading-tight">{donor.displayLabel}</h3>
              <div className="flex items-center gap-1.5 text-xs text-stone-500 mt-1">
                <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                <span>
                  {donor.approximateArea ? `${donor.approximateArea}, ` : ''}
                  {donor.district}
                </span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <span className="inline-block px-3 py-1 bg-rose-50 text-rose-800 border border-rose-300 rounded-md font-extrabold text-lg">
                {donor.bloodGroup}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 my-3">
            <AvailabilityBadge status={donor.selfReportedAvailability} />
            <ReviewBadge type="blood_group" status={donor.bloodGroupReviewStatus} />
            <ReviewBadge type="identity" status={donor.identityReviewStatus} />
          </div>

          <div className="text-xs text-stone-400 flex items-center gap-1 my-3">
            <Calendar className="w-3 h-3 text-stone-400" />
            <span>{t.lastUpdated} {formattedDate}</span>
          </div>
        </div>

        <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
          <button
            onClick={() => setIsReportOpen(true)}
            className="text-stone-400 hover:text-stone-600 p-2 rounded-md hover:bg-stone-50 transition-colors"
            title={language === 'bn' ? 'রিপোর্ট করুন' : 'Report'}
            aria-label="Report donor profile"
          >
            <Flag className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setIsContactOpen(true)}
            disabled={donor.selfReportedAvailability === 'paused'}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-md text-white bg-emerald-800 hover:bg-emerald-900 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-xs"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{t.requestContactBtn}</span>
          </button>
        </div>
      </div>

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        donor={donor}
      />

      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        targetType="donor"
        targetId={donor.uid}
        targetTitleOrName={donor.displayLabel}
      />
    </>
  );
};
