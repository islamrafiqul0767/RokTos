import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext.tsx';
import type { BloodRequest } from '../../types/index.ts';
import { ReportModal } from '../common/ReportModal.tsx';
import { OfferHelpModal } from './OfferHelpModal.tsx';
import { MapPin, Building2, Calendar, AlertOctagon, Clock, Flag, HeartHandshake } from 'lucide-react';

interface RequestCardProps {
  request: BloodRequest;
  onOfferHelp?: (request: BloodRequest) => void;
}

export const RequestCard: React.FC<RequestCardProps> = ({ request, onOfferHelp }) => {
  const { language, t } = useLanguage();
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isOfferHelpOpen, setIsOfferHelpOpen] = useState(false);
  const [helpOffered, setHelpOffered] = useState(false);

  const urgencyStyles: Record<string, { bg: string; text: string; border: string; label: string }> = {
    critical: {
      bg: 'bg-rose-50',
      text: 'text-rose-800',
      border: 'border-rose-300',
      label: language === 'bn' ? 'অতি-সংকটজনক' : 'Critical',
    },
    urgent: {
      bg: 'bg-amber-50',
      text: 'text-amber-800',
      border: 'border-amber-300',
      label: language === 'bn' ? 'জরুরি' : 'Urgent',
    },
    routine: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-800',
      border: 'border-emerald-300',
      label: language === 'bn' ? 'সাধারণ' : 'Routine',
    },
  };

  const urgency = urgencyStyles[request.urgencyLevel] || urgencyStyles.routine;

  const formattedDate = new Date(request.neededByDate).toLocaleString(
    language === 'bn' ? 'bn-BD' : 'en-US',
    { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }
  );

  return (
    <>
      <div className="bg-white rounded-lg border border-stone-200 shadow-xs hover:shadow-md transition-shadow p-5 flex flex-col justify-between">
        {request.isDemo && (
          <div className="mb-3 px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-md text-[11px] font-medium inline-block w-fit">
            {t.demoBadge}
          </div>
        )}

        <div>
          <div className="flex items-start justify-between gap-3 mb-2">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-sm border ${urgency.bg} ${urgency.text} ${urgency.border}`}>
                  <AlertOctagon className="w-3 h-3" />
                  {urgency.label}
                </span>
                <span className="text-xs text-stone-500">
                  {language === 'bn' ? 'আবেদনকারী:' : 'Requester:'} {request.requesterDisplayLabel}
                </span>
              </div>
              <h3 className="font-bold text-base text-stone-900">{request.patientDisplayNameOrInitials}</h3>
            </div>
            <div className="text-right shrink-0">
              <span className="inline-block px-3 py-1 bg-rose-50 text-rose-800 border border-rose-300 rounded-md font-extrabold text-xl">
                {request.requestedBloodGroup}
              </span>
              <span className="block text-[11px] text-stone-500 font-medium mt-0.5">
                {request.unitsNeeded || '১ ব্যাগ'}
              </span>
            </div>
          </div>

          <div className="space-y-1.5 my-3 text-xs text-stone-600 bg-stone-50 p-3 rounded-md border border-stone-100">
            <div className="flex items-start gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
              <span className="font-medium text-stone-800">{request.hospitalName}</span>
            </div>
            <div className="flex items-start gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
              <span>{request.hospitalArea ? `${request.hospitalArea}, ` : ''}{request.district}</span>
            </div>
            <div className="flex items-start gap-1.5">
              <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
              <span>
                <strong className="text-stone-700">{language === 'bn' ? 'প্রয়োজন:' : 'Needed By:'}</strong> {formattedDate}
              </span>
            </div>
          </div>

          {request.shortDescription && (
            <p className="text-xs text-stone-700 leading-relaxed mb-3 line-clamp-2">
              {request.shortDescription}
            </p>
          )}
        </div>

        <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
          <button
            onClick={() => setIsReportOpen(true)}
            className="text-stone-400 hover:text-stone-600 p-2 rounded-md hover:bg-stone-50 transition-colors"
            title={language === 'bn' ? 'রিপোর্ট করুন' : 'Report'}
            aria-label="Report request"
          >
            <Flag className="w-3.5 h-3.5" />
          </button>

          {helpOffered ? (
            <span className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-md text-teal-800 bg-teal-50 border border-teal-300">
              <HeartHandshake className="w-4 h-4 text-teal-700" />
              <span>{language === 'bn' ? 'আগ্রহ প্রকাশ করা হয়েছে' : 'Interest Recorded'}</span>
            </span>
          ) : (
            <button
              onClick={() => {
                setIsOfferHelpOpen(true);
                if (onOfferHelp) onOfferHelp(request);
              }}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-md text-white bg-rose-700 hover:bg-rose-800 transition-colors shadow-xs"
            >
              <HeartHandshake className="w-4 h-4" />
              <span>{language === 'bn' ? 'সাহায্য করতে আগ্রহী' : 'I Can Donate'}</span>
            </button>
          )}
        </div>
      </div>

      <OfferHelpModal
        isOpen={isOfferHelpOpen}
        onClose={() => setIsOfferHelpOpen(false)}
        request={request}
        onSuccess={() => setHelpOffered(true)}
      />

      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        targetType="blood_request"
        targetId={request.id}
        targetTitleOrName={`${request.patientDisplayNameOrInitials} (${request.requestedBloodGroup})`}
      />
    </>
  );
};
