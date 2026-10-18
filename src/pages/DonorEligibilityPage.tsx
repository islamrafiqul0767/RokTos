import React from 'react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { SEOHead } from '../components/common/SEOHead.tsx';
import { Check, X, AlertCircle, Info, Calendar } from 'lucide-react';

export const DonorEligibilityPage: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <>
      <SEOHead
        title={t.eligibility}
        description="General blood donor eligibility criteria, deferral periods, and clinical screening guidelines in Bangladesh."
        canonicalPath="/donor-eligibility"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
            {language === 'bn' ? 'স্বাস্থ্য ও ফিটনেস গাইড' : 'Health & Eligibility'}
          </span>
          <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">
            {t.eligibility}
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            {language === 'bn'
              ? 'কে রক্ত দিতে পারবেন এবং কখন সাময়িকভাবে অপেক্ষা করতে হবে তার প্রমিত নির্দেশিকা।'
              : 'Standard medical criteria and temporary deferral periods for blood donation.'}
          </p>
        </div>

        {/* Screening Reminder Banner */}
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-start gap-3 text-xs sm:text-sm text-emerald-950">
          <Info className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>{language === 'bn' ? 'চিকিৎসাগত চূড়ান্ত সিদ্ধান্ত:' : 'Clinical Evaluation:'}</strong>{' '}
            {language === 'bn'
              ? 'নিচের মাপকাঠিগুলো কেবল সাধারণ তথ্যের জন্য। রক্ত দেওয়ার দিনে রক্ত ব্যাংকের চিকিৎসক আপনার পালস, রক্তচাপ ও হিমোগ্লোবিন পরিমাপ করে চূড়ান্ত সিদ্ধান্ত দেবেন।'
              : 'These guidelines are for educational awareness. On-site physical evaluation by blood-centre clinical staff determines final eligibility on donation day.'}
          </p>
        </div>

        {/* General Eligibility Checklist */}
        <div className="bg-white p-6 sm:p-8 rounded-lg border border-stone-200 shadow-xs space-y-6 text-xs sm:text-sm text-stone-700">
          <h2 className="text-lg font-bold text-stone-900 border-b border-stone-100 pb-3">
            {language === 'bn' ? 'সাধারণ রক্তদানের প্রাথমিক শর্তাবলি' : 'General Donor Eligibility'}
          </h2>

          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-stone-50 rounded-md">
              <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900 block text-xs">বয়স: ১৮ থেকে ৬০ বছর</strong>
                <span className="text-[11px] text-stone-500">১৮ বছরের নিচে কারও রক্তদান অনুমোদিত নয়। প্রথমবার রক্তদানের ক্ষেত্রে বয়স ১৮-৫৫ বছর হওয়া শ্রেয়।</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-stone-50 rounded-md">
              <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900 block text-xs">শারীরিক ওজন: কমপক্ষে ৪৫ কেজি</strong>
                <span className="text-[11px] text-stone-500">পুরুষ ও নারী উভয়ের ক্ষেত্রে ন্যূনতম ওজন ৪৫ কেজি (১০০ পাউন্ড) হতে হবে।</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-stone-50 rounded-md">
              <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900 block text-xs">রক্তদানের বিরতি: কমপক্ষে ১২০ দিন (৪ মাস)</strong>
                <span className="text-[11px] text-stone-500">পূর্ববর্তী রক্তদানের পর পুরুষের ক্ষেত্রে ৩-৪ মাস এবং নারীর ক্ষেত্রে ৪ মাস বিরতি থাকা আবশ্যক।</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-stone-50 rounded-md">
              <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900 block text-xs">হিমোগ্লোবিন স্তর: ১২.৫ গ্রাম/ডেসিলিটার বা তার বেশি</strong>
                <span className="text-[11px] text-stone-500">রক্তদানের পূর্বে ল্যাবরেটরিতে আঙুলের ডগা থেকে রক্তের ছোট ফোঁটায় হিমোগ্লোবিন নিশ্চিত করা হয়।</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-stone-50 rounded-md">
              <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900 block text-xs">রক্তচাপ ও তাপমাত্রা: স্বাভাবিক</strong>
                <span className="text-[11px] text-stone-500">শরীরের তাপমাত্রা স্বাভাবিক এবং রক্তচাপ নিয়ন্ত্রিত (সিস্টোলিক ১০০-১৪০, ডায়াস্টোলিক ৬০-৯০) থাকতে হবে।</span>
              </div>
            </div>
          </div>
        </div>

        {/* Temporary Deferrals */}
        <div className="bg-white p-6 sm:p-8 rounded-lg border border-stone-200 shadow-xs space-y-5 text-xs sm:text-sm text-stone-700">
          <h2 className="text-lg font-bold text-stone-900 border-b border-stone-100 pb-3 flex items-center gap-2">
            <X className="w-5 h-5 text-rose-700" />
            <span>{language === 'bn' ? 'কখন রক্তদান থেকে সাময়িকভাবে বিরত থাকবেন?' : 'Temporary Deferrals'}</span>
          </h2>

          <ul className="space-y-2.5 list-disc pl-5">
            <li>জ্বর, ঠাণ্ডা বা কাশি থাকলে সুস্থ হওয়ার পর অন্তত ২ সপ্তাহ পর্যন্ত।</li>
            <li>অ্যান্টিবায়োটিক বা রক্ত পাতলা করার ওষুধ সেবনরত থাকলে ওষুধ শেষ হওয়ার ৭ দিন পর।</li>
            <li>সাম্প্রতিক কোনো বড় অস্ত্রোপচার (মেজর সার্জারি) হয়ে থাকলে ৬ মাস পর্যন্ত।</li>
            <li>ট্যাটু বা আকুপাংচার সম্পন্ন করার পর অন্তত ৬ মাস।</li>
            <li>গর্ভবতী বা শিশুকে বুকের দুধ পান করাচ্ছেন এমন মায়েদের জন্য রক্তদান স্থগিত রাখতে হবে।</li>
          </ul>
        </div>
      </div>
    </>
  );
};
