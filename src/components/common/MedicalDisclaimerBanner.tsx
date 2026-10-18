import React from 'react';
import { useLanguage } from '../../context/LanguageContext.tsx';
import { ShieldAlert, ArrowRight } from 'lucide-react';

export const MedicalDisclaimerBanner: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex items-start sm:items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5 sm:mt-0" aria-hidden="true" />
          <p className="leading-snug">
            <strong className="font-semibold">{language === 'bn' ? 'গুরুত্বপূর্ণ চিকিৎসা সতর্কতা:' : 'Medical Notice:'}</strong>{' '}
            {t.disclaimerShort}
          </p>
        </div>
        <a
          href="#/safety"
          className="inline-flex items-center gap-1 font-semibold text-amber-900 underline hover:text-amber-950 shrink-0 text-xs"
        >
          <span>{language === 'bn' ? 'নিরাপত্তা নীতিমালা পড়ুন' : 'Read Safety Guidelines'}</span>
          <ArrowRight className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};
