import React from 'react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { SEOHead } from '../components/common/SEOHead.tsx';
import { ShieldAlert, AlertTriangle, CheckCircle, FileCheck, PhoneCall } from 'lucide-react';

export const SafetyPage: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <>
      <SEOHead
        title={t.safety}
        description="Comprehensive medical safety, pre-transfusion mandatory screening, and clinical guidance for blood recipients and donors."
        canonicalPath="/safety"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-rose-800 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200">
            {language === 'bn' ? 'চিকিৎসা ও জীবন সুরক্ষা নির্দেশিকা' : 'Clinical Safety Protocol'}
          </span>
          <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">
            {t.safety}
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            {language === 'bn'
              ? 'নিরাপদ রক্ত পরিসঞ্চালন এবং রোগীর জীবন বাঁচাতে সরকারি বিধি মোতাবেক গৃহীতব্য সতর্কতা।'
              : 'Mandatory clinical standards and precautions to safeguard recipients and donors.'}
          </p>
        </div>

        {/* Primary Disclaimer Box */}
        <div className="p-6 bg-amber-50 border border-amber-300 rounded-lg space-y-3 text-xs sm:text-sm text-amber-950">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-base">
            <ShieldAlert className="w-5 h-5 text-amber-700" />
            <span>{language === 'bn' ? 'সার্বজনীন চিকিৎসা দাবিত্যাগ (Medical Disclaimer)' : 'Medical Disclaimer'}</span>
          </div>
          <p className="leading-relaxed">
            রক্তবন্ধু কোনো চিকিৎসা প্রতিষ্ঠান, রক্ত ব্যাংক বা জরুরি স্বাস্থ্যসেবা প্রদানকারী সংস্থা নয়। এই প্ল্যাটফর্মে কোনো ব্যক্তির তালিকাভুক্ত থাকা এটি নিশ্চিত করে না যে তিনি রোগীর জন্য শতভাগ সামঞ্জস্যপূর্ণ (compatible) বা বর্তমানে চিকিৎসাগতভাবে সুস্থ। রক্ত গ্রহণের চূড়ান্ত সিদ্ধান্ত এবং উপযুক্ততা নির্ধারণের দায়িত্ব সম্পূর্ণভাবে নিবন্ধিত চিকিৎসক ও রক্ত কেন্দ্রের ল্যাবরেটরি বিশেষজ্ঞদের।
          </p>
        </div>

        {/* 5 Mandatory Screening Tests */}
        <div className="bg-white p-6 sm:p-8 rounded-lg border border-stone-200 shadow-xs space-y-5 text-xs sm:text-sm text-stone-700">
          <h2 className="text-lg font-bold text-stone-900 border-b border-stone-100 pb-3">
            {language === 'bn' ? 'বাধ্যতামূলক ৫টি সংক্রামক রোগ স্ক্রিনিং টেস্ট (Mandatory TTIs)' : 'Mandatory 5 Transfusion-Transmissible Infection Tests'}
          </h2>

          <p className="leading-relaxed">
            বাংলাদেশ নিরাপদ রক্ত পরিসঞ্চালন আইন অনুযায়ী, রক্তদাতার শরীর থেকে রক্ত নেওয়ার পর রোগীর শরীরে প্রবেশ করানোর পূর্বে হাসপাতালে অবশ্যই নিচের ৫টি প্রাণঘাতী রোগের স্ক্রিনিং পরীক্ষা নিশ্চিত করতে হবে:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3 bg-stone-50 rounded-md border border-stone-200 flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900 block text-xs">১. এইচআইভি (HIV 1 & 2)</strong>
                <span className="text-[11px] text-stone-500">এইডস ভাইরাস প্রতিরোধে বাধ্যতামূলক অ্যান্টিবডি স্ক্রিনিং</span>
              </div>
            </div>

            <div className="p-3 bg-stone-50 rounded-md border border-stone-200 flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900 block text-xs">২. হেপাটাইটিস বি (HBsAg)</strong>
                <span className="text-[11px] text-stone-500">যকৃতের মারাত্মক সংক্রমণ প্রতিরোধে হেপাটাইটিস বি সারফেস অ্যান্টিজেন টেস্ট</span>
              </div>
            </div>

            <div className="p-3 bg-stone-50 rounded-md border border-stone-200 flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900 block text-xs">৩. হেপাটাইটিস সি (Anti-HCV)</strong>
                <span className="text-[11px] text-stone-500">ক্রনিক লিভার রোগ ও হেপাটাইটিস সি ভাইরাস স্ক্রিনিং</span>
              </div>
            </div>

            <div className="p-3 bg-stone-50 rounded-md border border-stone-200 flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900 block text-xs">৪. সিফিলিস (VDRL / TPHA)</strong>
                <span className="text-[11px] text-stone-500">যৌন সংক্রামক ব্যাকটেরিয়াজনিত রোগ স্ক্রিনিং</span>
              </div>
            </div>

            <div className="p-3 bg-stone-50 rounded-md border border-stone-200 flex items-start gap-2 sm:col-span-2">
              <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900 block text-xs">৫. ম্যালেরিয়া (Malaria Parasite - MP)</strong>
                <span className="text-[11px] text-stone-500">রক্তে ম্যালেরিয়া পরজীবীর উপস্থিতি নির্ণয় পরীক্ষা</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cross Matching Guidance */}
        <div className="bg-white p-6 sm:p-8 rounded-lg border border-stone-200 shadow-xs space-y-4 text-xs sm:text-sm text-stone-700">
          <h2 className="text-lg font-bold text-stone-900 border-b border-stone-100 pb-3">
            {language === 'bn' ? 'ক্রস-ম্যাচিং (Cross-Matching) এর অপরিহার্যতা' : 'Importance of Cross-Matching'}
          </h2>
          <p className="leading-relaxed">
            একই রক্তের গ্রুপ (যেমন A+ থেকে A+) হলেও রক্তদাতা এবং রোগীর রক্তের প্লাজমায় অনাকাঙ্ক্ষিত অ্যান্টিবডি থাকতে পারে, যা রোগীর কিডনি বিকল বা আকস্মিক মৃত্যুর কারণ হতে পারে। তাই রক্তের ব্যাগ দেওয়ার আগে ল্যাবরেটরিতে মেজর ও মাইনর ক্রস-ম্যাচিং করা আইনি ও চিকিৎসাগতভাবে বাধ্যতামূলক। কোনো অবস্থাতেই ক্রস-ম্যাচিং ছাড়া রক্ত গ্রহণ করবেন না।
          </p>
        </div>

        {/* Emergency Contacts */}
        <div className="p-6 bg-stone-900 text-stone-200 rounded-lg space-y-3 text-xs">
          <h3 className="text-sm font-bold text-white">{language === 'bn' ? 'জরুরি চিকিৎসা সহায়তা হটলাইন' : 'National Emergency Contacts'}</h3>
          <p className="text-stone-400">
            সঙ্কটাপন্ন অবস্থায় রক্ত খোঁজার পাশাপাশি তাৎক্ষণিক সরকারি পরামর্শের জন্য নিচের নম্বরগুলোতে ডায়াল করুন:
          </p>
          <div className="flex flex-wrap gap-4 text-white font-bold pt-1">
            <span className="bg-stone-800 px-3 py-1.5 rounded-md border border-stone-700">জাতীয় জরুরি সেবা: ৯৯৯</span>
            <span className="bg-stone-800 px-3 py-1.5 rounded-md border border-stone-700">স্বাস্থ্য বাতায়ন: ১৬২৬৩</span>
            <span className="bg-stone-800 px-3 py-1.5 rounded-md border border-stone-700">রেড ক্রিসেন্ট রক্ত কেন্দ্র: ০২-৯৩৫৩১৮৫</span>
          </div>
        </div>
      </div>
    </>
  );
};
