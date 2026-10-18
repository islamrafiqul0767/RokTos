import React from 'react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { SEOHead } from '../components/common/SEOHead.tsx';
import { SITE_CONFIG } from '../config/siteConfig.ts';
import { Heart, ShieldCheck, Lock, Globe, Users, CheckCircle2 } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <>
      <SEOHead
        title={t.aboutUs}
        description="ROKTOS is an open, non-commercial blood donor discovery and request support platform for Bangladesh."
        canonicalPath="/about"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-rose-800 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200">
            {language === 'bn' ? 'আমাদের লক্ষ্য ও দর্শন' : 'Our Mission & Philosophy'}
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {language === 'bn' ? 'রক্তস (ROKTOS) সম্পর্কে' : 'About ROKTOS'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {language === 'bn' ? SITE_CONFIG.taglineBn : SITE_CONFIG.taglineEn}
          </p>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-lg border border-slate-200 shadow-xs space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
            {language === 'bn' ? 'আমাদের মূল অঙ্গীকার' : 'Core Principles'}
          </h2>

          <p>
            {language === 'bn'
              ? 'বাংলাদেশে জরুরি রক্তের প্রয়োজনে প্রায়শই রোগীর স্বজনরা ফেসবুকের উন্মুক্ত গ্রুপ বা মেসেঞ্জারে ব্যক্তিগত মোবাইল নম্বর ছড়িয়ে দেন। এর ফলে নারীরা ও সাধারণ রক্তদাতারা তীব্র সাইবার বুলিং, প্রতারণা ও অযাচিত ফোন কলের শিকার হন। রক্তস (ROKTOS) তৈরি করা হয়েছে এই সমস্যার একটি সম্মানজনক, নিরাপদ ও তথ্যসুরক্ষিত সমাধান হিসেবে।'
              : 'In Bangladesh, blood emergencies often lead families to post raw mobile numbers on social media, exposing volunteers and patients to spam, scams, and harassment. ROKTOS was engineered to provide a privacy-preserving, consent-first community discovery platform.'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-emerald-50/50 rounded-md border border-emerald-100 space-y-1">
              <strong className="text-emerald-950 font-bold block text-sm">১০০% অবাণিজ্যিক ও উন্মুক্ত</strong>
              <p className="text-xs text-stone-600">
                এখানে কোনো পেইড ভেরিফিকেশন, বিজ্ঞাপনী অগ্রাধিকার বা অর্থ লেনদেন নেই। এটি নিঃস্বার্থ মানবিক সেবা।
              </p>
            </div>

            <div className="p-4 bg-emerald-50/50 rounded-md border border-emerald-100 space-y-1">
              <strong className="text-emerald-950 font-bold block text-sm">সম্মতি-ভিত্তিক যোগাযোগ</strong>
              <p className="text-xs text-stone-600">
                রক্তদাতার অনুমতি ছাড়া তার যোগাযোগের মাধ্যম উন্মুক্ত করা হয় না। রক্তদাতা আবেদন দেখে সম্মতি দিলেই কেবল যোগাযোগ সম্ভব।
              </p>
            </div>

            <div className="p-4 bg-emerald-50/50 rounded-md border border-emerald-100 space-y-1">
              <strong className="text-emerald-950 font-bold block text-sm">স্বচ্ছ যাচাইকরণ নীতি</strong>
              <p className="text-xs text-stone-600">
                স্বঘোষিত তথ্য এবং পর্যালোচিত প্রমাণের মধ্যে আমরা সুস্পষ্ট বিভাজন বজায় রাখি। কোনো ভুয়া দাবি প্রকাশ করা হয় না।
              </p>
            </div>

            <div className="p-4 bg-emerald-50/50 rounded-md border border-emerald-100 space-y-1">
              <strong className="text-emerald-950 font-bold block text-sm">সংবেদনশীল তথ্যের নিরাপত্তা</strong>
              <p className="text-xs text-stone-600">
                আমরা জাতীয় পরিচয়পত্র, প্রেসক্রিপশন বা ব্যক্তিগত মেডিকেল রিপোর্ট পাবলিক সার্ভারে আপলোড গ্রহণ করি না।
              </p>
            </div>
          </div>
        </div>

        {/* Accountability */}
        <div className="bg-stone-50 p-6 rounded-lg border border-stone-200 text-xs text-stone-700 space-y-2">
          <h3 className="font-bold text-stone-900 text-sm">{language === 'bn' ? 'দায়বদ্ধতা ও সীমাবদ্ধতা' : 'Accountability & Scope'}</h3>
          <p>
            রক্তবন্ধু কোনো সরকারি বা বেসরকারি হাসপাতাল, ডায়াগনস্টিক সেন্টার বা রক্ত পরিসঞ্চালন কেন্দ্র নয়। আমাদের কাজ কেবল সচেতন স্বেচ্ছাসেবী দাতা এবং রোগীর পরিবারের মাঝে সেতুবন্ধন তৈরি করা। রক্ত সংক্রান্ত সকল চিকিৎসাগত সিদ্ধান্ত ও স্ক্রিনিং টেস্ট হাসপাতালে অনুমোদিত চিকিৎসকের দায়িত্ব।
          </p>
        </div>
      </div>
    </>
  );
};
