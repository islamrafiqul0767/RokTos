import React from 'react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { SEOHead } from '../components/common/SEOHead.tsx';
import { Search, UserCheck, Shield, PhoneCall, CheckCircle2, Lock, ArrowRight } from 'lucide-react';

interface HowItWorksPageProps {
  onNavigate: (path: string) => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ onNavigate }) => {
  const { language, t } = useLanguage();

  return (
    <>
      <SEOHead
        title={t.howItWorks}
        description="Learn how ROKTOS connects blood seekers with willing community donors with strict privacy safeguards."
        canonicalPath="/how-it-works"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-rose-800 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200">
            {language === 'bn' ? 'কার্যপ্রণালী গাইড' : 'Step-by-Step Guide'}
          </span>
          <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">
            {t.howItWorks}
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            {language === 'bn'
              ? 'রক্তস (ROKTOS) কোনো বাণিজ্যিক প্ল্যাটফর্ম বা রক্ত ব্যাংক নয়। এটি পারস্পরিক শ্রদ্ধাবোধ, গোপনীয়তা ও সম্মতির ভিত্তিতে রক্তদাতা ও রক্তপ্রার্থীদের সংযোগ করিয়ে দেয়।'
              : 'ROKTOS is an opt-in volunteer coordination tool built to protect privacy and respect donors while serving patients in need.'}
          </p>
        </div>

        {/* Workflow for Seekers */}
        <div className="bg-white p-6 sm:p-8 rounded-lg border border-stone-200 shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
            <div className="w-10 h-10 rounded-md bg-rose-50 text-rose-800 flex items-center justify-center font-bold">
              ১
            </div>
            <div>
              <h2 className="text-lg font-bold text-stone-900">
                {language === 'bn' ? 'যাদের রক্তের প্রয়োজন (রক্তসন্ধানী/রোগীর স্বজন)' : 'For People Who Need Blood'}
              </h2>
              <span className="text-xs text-stone-500">
                {language === 'bn' ? 'কীভাবে উপযুক্ত রক্তদাতা খুঁজে পাবেন' : 'How to search and request safely'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs text-stone-700">
            <div className="p-4 bg-stone-50 rounded-md space-y-2">
              <strong className="text-stone-900 block font-bold text-sm">১. অনুসন্ধান করুন</strong>
              <p>আপনার বিভাগ, জেলা এবং রোগীর প্রয়োজনীয় রক্তের গ্রুপ দিয়ে সক্রিয় রক্তদাতাদের তালিকা খুঁজুন।</p>
            </div>
            <div className="p-4 bg-stone-50 rounded-md space-y-2">
              <strong className="text-stone-900 block font-bold text-sm">২. যোগাযোগের অনুরোধ</strong>
              <p>দাতার প্রোফাইলে ক্লিক করে সংক্ষিপ্ত বার্তা সহ যোগাযোগের অনুরোধ পাঠান। রোগীর জরুরি হাসপাতালের তথ্য স্পষ্ট করুন।</p>
            </div>
            <div className="p-4 bg-stone-50 rounded-md space-y-2">
              <strong className="text-stone-900 block font-bold text-sm">৩. দাতার সম্মতি ও সাক্ষাৎ</strong>
              <p>রক্তদাতা অনুরোধ গ্রহণ করলে তার অনুমোদিত যোগাযোগের তথ্য আপনার ড্যাশবোর্ডে প্রকাশিত হবে। এরপর হাসপাতালে রক্তদানের সময় নির্ধারণ করুন।</p>
            </div>
          </div>
        </div>

        {/* Workflow for Donors */}
        <div className="bg-white p-6 sm:p-8 rounded-lg border border-stone-200 shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
            <div className="w-10 h-10 rounded-md bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
              ২
            </div>
            <div>
              <h2 className="text-lg font-bold text-stone-900">
                {language === 'bn' ? 'স্বেচ্ছাসেবী রক্তদাতাদের জন্য' : 'For Volunteer Donors'}
              </h2>
              <span className="text-xs text-stone-500">
                {language === 'bn' ? 'আপনার তথ্যের সম্পূর্ণ নিয়ন্ত্রণ আপনার হাতে' : 'You retain full control over your privacy and availability'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs text-stone-700">
            <div className="p-4 bg-stone-50 rounded-md space-y-2">
              <strong className="text-stone-900 block font-bold text-sm">১. নিরাপদ নিবন্ধন</strong>
              <p>১৮+ বছর বয়সে রক্তদাতা হিসেবে নিবন্ধন করুন। আপনার ফোন ও ইমেইল সুরক্ষিত ক্লাউড ডাটাবেজে এনক্রিপ্টেড থাকবে।</p>
            </div>
            <div className="p-4 bg-stone-50 rounded-md space-y-2">
              <strong className="text-stone-900 block font-bold text-sm">২. প্রাপ্যতা নিয়ন্ত্রণ</strong>
              <p>রক্তদানের পর ৩-৪ মাস আপনি নিজেকে ‘সাময়িকভাবে অনুপলব্ধ’ করতে পারেন বা প্রয়োজন অনুযায়ী অনুরোধ স্থগিত রাখতে পারেন।</p>
            </div>
            <div className="p-4 bg-stone-50 rounded-md space-y-2">
              <strong className="text-stone-900 block font-bold text-sm">৩. অনুরোধ পর্যালোচনা</strong>
              <p>কোনো অযাচিত কল আসবে না। ড্যাশবোর্ডে আবেদনকারীর অনুরোধটি দেখার পর সম্মতি দিলেই কেবল যোগাযোগ সম্ভব হবে।</p>
            </div>
          </div>
        </div>

        {/* Medical disclaimer reminder */}
        <div className="p-6 bg-amber-50/80 rounded-lg border border-amber-200 text-xs text-amber-950 space-y-2 leading-relaxed">
          <div className="flex items-center gap-2 font-bold text-amber-900 text-sm">
            <Shield className="w-4 h-4 text-amber-700" />
            <span>{language === 'bn' ? 'চিকিৎসা ও স্ক্রিনিং আবশ্যকতা' : 'Mandatory Clinical Screening'}</span>
          </div>
          <p>
            রক্তবন্ধু কোনো চিকিৎসাগত নিশ্চয়তা দেয় না। রক্ত পরিসঞ্চালন আইন অনুযায়ী রোগীর শরীরে রক্ত প্রবেশ করানোর পূর্বে হাসপাতালে চিকিৎসকের উপস্থিতিতে বাধ্যতামূলক স্ক্রিনিং (এইচআইভি, হেপাটাইটিস বি ও সি, সিফিলিস, ম্যালেরিয়া) এবং ক্রস-ম্যাচিং সম্পন্ন করতে হবে।
          </p>
        </div>

        <div className="text-center pt-4">
          <button
            onClick={() => onNavigate('/donors')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-xs"
          >
            <span>{t.searchDonors}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
};
