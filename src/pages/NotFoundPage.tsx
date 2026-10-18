import React from 'react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { SEOHead } from '../components/common/SEOHead.tsx';
import { Search, Home, ArrowLeft } from 'lucide-react';

interface NotFoundPageProps {
  onNavigate: (path: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  const { language } = useLanguage();

  return (
    <>
      <SEOHead
        title="404 - পৃষ্ঠাটি পাওয়া যায়নি / Page Not Found"
        description="The requested page could not be located on ROKTOS."
        noindex={true}
      />

      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center mx-auto text-2xl font-black">
          ৪০৪
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-extrabold text-stone-900">
            {language === 'bn' ? 'পৃষ্ঠাটি পাওয়া যায়নি' : 'Page Not Found'}
          </h1>
          <p className="text-xs text-stone-600 leading-relaxed">
            {language === 'bn'
              ? 'আপনি যে পৃষ্ঠাটি খুঁজছেন তা হয়তো সরানো হয়েছে অথবা লিংকটি ভুল ছিল।'
              : 'The link you clicked may be broken or the page may have been relocated.'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => onNavigate('/')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold rounded-md text-white bg-emerald-800 hover:bg-emerald-900"
          >
            <Home className="w-4 h-4" />
            <span>{language === 'bn' ? 'নীড়পাতায় ফিরুন' : 'Back to Home'}</span>
          </button>
          <button
            onClick={() => onNavigate('/donors')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold rounded-md text-stone-700 bg-stone-100 hover:bg-stone-200"
          >
            <Search className="w-4 h-4" />
            <span>{language === 'bn' ? 'রক্তদাতা খুঁজুন' : 'Search Donors'}</span>
          </button>
        </div>
      </div>
    </>
  );
};
