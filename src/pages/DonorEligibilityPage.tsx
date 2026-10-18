import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { SEOHead } from '../components/common/SEOHead.tsx';
import { checkDonorEligibility, BLOOD_COMPATIBILITY, type EligibilityResult } from '../utils/eligibility.ts';
import { BLOOD_GROUPS } from '../config/bangladeshData.ts';
import type { BloodGroup } from '../types/index.ts';
import {
  Check,
  X,
  AlertCircle,
  Info,
  Calendar,
  Heart,
  ShieldAlert,
  ArrowRight,
  Clock,
  Sparkles,
  RefreshCw,
  Droplet,
} from 'lucide-react';

interface DonorEligibilityPageProps {
  onNavigate?: (path: string) => void;
}

export const DonorEligibilityPage: React.FC<DonorEligibilityPageProps> = ({ onNavigate }) => {
  const { language, t } = useLanguage();

  // Calculator State
  const [age, setAge] = useState<number>(24);
  const [weightKg, setWeightKg] = useState<number>(55);
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('male');
  const [donationHistory, setDonationHistory] = useState<'never' | 'recent' | 'sufficient'>('never');
  const [hasRecentFeverOrFlu, setHasRecentFever] = useState<boolean>(false);
  const [onAntibiotics, setOnAntibiotics] = useState<boolean>(false);
  const [hasRecentSurgery, setHasRecentSurgery] = useState<boolean>(false);
  const [hasRecentTattooOrPiercing, setHasRecentTattoo] = useState<boolean>(false);
  const [isPregnantOrNursing, setIsPregnant] = useState<boolean>(false);
  const [hasChronicCondition, setHasChronicCondition] = useState<boolean>(false);

  // Active compatibility group preview
  const [selectedGroup, setSelectedGroup] = useState<BloodGroup>('O+');

  // Compute eligibility dynamically
  const daysSinceLastDonation =
    donationHistory === 'never' ? null : donationHistory === 'recent' ? 45 : 120;

  const result: EligibilityResult = checkDonorEligibility({
    age,
    weightKg,
    gender,
    daysSinceLastDonation,
    hasRecentFeverOrFlu,
    onAntibiotics,
    hasRecentSurgery,
    hasRecentTattooOrPiercing,
    isPregnantOrNursing,
    hasChronicCondition,
  });

  const compatInfo = BLOOD_COMPATIBILITY[selectedGroup];

  return (
    <>
      <SEOHead
        title={language === 'bn' ? 'রক্তদানের যোগ্যতা ও সামঞ্জস্যতা ক্যালকুলেটর' : 'Blood Donor Eligibility & Compatibility Tool'}
        description="Check your personal blood donation eligibility in Bangladesh. Interactive clinical assessment, deferral rules, and blood group compatibility matrix."
        canonicalPath="/donor-eligibility"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-rose-800 bg-rose-50 px-3 py-1 rounded-md border border-rose-200">
            {language === 'bn' ? 'ক্লিনিক্যাল নির্দেশিকা ও স্বয়ংক্রিয় মূল্যায়ন' : 'Clinical Screening & Self-Check'}
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {language === 'bn' ? 'রক্তদানের যোগ্যতা যাচাই' : 'Blood Donor Eligibility'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {language === 'bn'
              ? 'কে রক্ত দিতে পারবেন, কখন বিরতি প্রয়োজন এবং আপনার রক্তের গ্রুপ কার কার সাথে সামঞ্জস্যপূর্ণ তা এক পলকে জানুন।'
              : 'Interactive health check based on Bangladesh National Safe Blood Transfusion criteria.'}
          </p>
        </div>

        {/* Clinical Disclaimer Banner */}
        <div className="p-4 bg-teal-50 border border-teal-200 rounded-lg flex items-start gap-3 text-xs sm:text-sm text-teal-950">
          <Info className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>{language === 'bn' ? 'চিকিৎসাগত চূড়ান্ত সিদ্ধান্ত:' : 'Clinical Notice:'}</strong>{' '}
            {language === 'bn'
              ? 'এই ক্যালকুলেটরটি কেবল সচেতনতা ও প্রাথমিক ধারণার জন্য। রক্ত দানের পূর্বে রক্ত কেন্দ্রের অনুমোদিত চিকিৎসক আপনার পালস, রক্তচাপ ও রক্তের ড্রপ থেকে হিমোগ্লোবিন পরীক্ষা করে চূড়ান্ত অনুমোদন দেবেন।'
              : 'This assessment is for informational screening only. On-site physical checkup (pulse, blood pressure, hemoglobin) by a licensed blood bank physician determines final clearance.'}
          </p>
        </div>

        {/* Interactive Eligibility Self-Assessment Calculator */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-rose-900 to-rose-800 text-white flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-rose-200 uppercase tracking-wider block mb-1">
                {language === 'bn' ? 'ইন্টারেক্টিভ টুল' : 'Interactive Assessment Tool'}
              </span>
              <h2 className="text-xl font-bold">
                {language === 'bn' ? 'আপনার রক্তদানের প্রাথমিক যোগ্যতা পরীক্ষা করুন' : 'Check Your Eligibility in 30 Seconds'}
              </h2>
            </div>
            <Sparkles className="w-7 h-7 text-rose-300 hidden sm:block" />
          </div>

          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Input Form Column (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Row 1: Age & Weight */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {language === 'bn' ? 'বয়স (বছর)' : 'Age (years)'} <span className="text-rose-600">*</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={15}
                      max={75}
                      value={age}
                      onChange={(e) => setAge(Number(e.target.value) || 0)}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-rose-600 focus:outline-hidden"
                    />
                    <span className="text-xs text-slate-500 font-medium">১৮-৬০ বছর</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {language === 'bn' ? 'শারীরিক ওজন (কেজি)' : 'Weight (kg)'} <span className="text-rose-600">*</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={30}
                      max={150}
                      value={weightKg}
                      onChange={(e) => setWeightKg(Number(e.target.value) || 0)}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-rose-600 focus:outline-hidden"
                    />
                    <span className="text-xs text-slate-500 font-medium">কমপক্ষে ৪৫ কেজি</span>
                  </div>
                </div>
              </div>

              {/* Row 2: Gender & History */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {language === 'bn' ? 'লিঙ্গ' : 'Gender'}
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md bg-white focus:ring-2 focus:ring-rose-600 focus:outline-hidden"
                  >
                    <option value="male">{language === 'bn' ? 'পুরুষ (৩ মাস বিরতি)' : 'Male (3-month interval)'}</option>
                    <option value="female">{language === 'bn' ? 'নারী (৪ মাস বিরতি)' : 'Female (4-month interval)'}</option>
                    <option value="other">{language === 'bn' ? 'অন্যান্য' : 'Other'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {language === 'bn' ? 'সর্বশেষ রক্তদানের সময়' : 'Last Blood Donation'}
                  </label>
                  <select
                    value={donationHistory}
                    onChange={(e) => setDonationHistory(e.target.value as any)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md bg-white focus:ring-2 focus:ring-rose-600 focus:outline-hidden"
                  >
                    <option value="never">{language === 'bn' ? 'প্রথমবার / পূর্বে কখনো দেইনি' : 'First-time / Never donated'}</option>
                    <option value="sufficient">{language === 'bn' ? '৪ মাসের বেশি সময় আগে' : 'Over 4 months ago'}</option>
                    <option value="recent">{language === 'bn' ? 'সাম্প্রতিক (১-২ মাস আগে)' : 'Recent (< 3 months ago)'}</option>
                  </select>
                </div>
              </div>

              {/* Health Conditions Checkboxes */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  {language === 'bn' ? 'সাময়িক বা স্থায়ী স্বাস্থ্য শর্তাবলী (প্রযোজ্য ক্ষেত্রে টিক দিন):' : 'Health Conditions (Check if applicable):'}
                </label>

                <div className="space-y-2.5 bg-slate-50 p-4 rounded-lg border border-slate-200 text-xs text-slate-700">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasRecentFeverOrFlu}
                      onChange={(e) => setHasRecentFever(e.target.checked)}
                      className="mt-0.5 rounded text-rose-700 focus:ring-rose-600"
                    />
                    <span>
                      {language === 'bn' ? 'গত ১৪ দিনে জ্বর, ঠাণ্ডা, কাশি বা ইনফেকশন হয়েছে' : 'Had fever, cold, flu, or infection within past 14 days'}
                    </span>
                  </label>

                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={onAntibiotics}
                      onChange={(e) => setOnAntibiotics(e.target.checked)}
                      className="mt-0.5 rounded text-rose-700 focus:ring-rose-600"
                    />
                    <span>
                      {language === 'bn' ? 'বর্তমানে অ্যান্টিবায়োটিক বা বিশেষ প্রেসক্রিপশনের ওষুধ খাচ্ছি' : 'Currently taking antibiotics or active prescription medication'}
                    </span>
                  </label>

                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasRecentSurgery}
                      onChange={(e) => setHasRecentSurgery(e.target.checked)}
                      className="mt-0.5 rounded text-rose-700 focus:ring-rose-600"
                    />
                    <span>
                      {language === 'bn' ? 'গত ৬ মাসের মধ্যে কোনো বড় অস্ত্রোপচার (মেজর সার্জারি) হয়েছে' : 'Undergone major surgery within the last 6 months'}
                    </span>
                  </label>

                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasRecentTattooOrPiercing}
                      onChange={(e) => setHasRecentTattoo(e.target.checked)}
                      className="mt-0.5 rounded text-rose-700 focus:ring-rose-600"
                    />
                    <span>
                      {language === 'bn' ? 'গত ৬ মাসের মধ্যে ট্যাটু, কান বা শরীরে ছিদ্র (পিয়ার্সিং) করেছি' : 'Received a tattoo or body piercing within past 6 months'}
                    </span>
                  </label>

                  {gender === 'female' && (
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isPregnantOrNursing}
                        onChange={(e) => setIsPregnant(e.target.checked)}
                        className="mt-0.5 rounded text-rose-700 focus:ring-rose-600"
                      />
                      <span>
                        {language === 'bn' ? 'বর্তমানে গর্ভবতী বা শিশুকে বুকের দুধ পান করাচ্ছি' : 'Currently pregnant or actively breastfeeding'}
                      </span>
                    </label>
                  )}

                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasChronicCondition}
                      onChange={(e) => setHasChronicCondition(e.target.checked)}
                      className="mt-0.5 rounded text-rose-700 focus:ring-rose-600"
                    />
                    <span className="text-rose-900 font-medium">
                      {language === 'bn'
                        ? 'হেপাটাইটিস বি/সি, এইচআইভি, কার্ডিয়াক বাইপাস বা ক্যান্সার ইতিহাস রয়েছে'
                        : 'History of Hepatitis B/C, HIV, cardiac disease, or oncology treatment'}
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Assessment Result Column (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div
                className={`p-6 rounded-xl border flex-1 flex flex-col justify-between ${
                  result.status === 'eligible'
                    ? 'bg-teal-50/70 border-teal-300'
                    : result.status === 'temporarily_deferred'
                    ? 'bg-amber-50/70 border-amber-300'
                    : 'bg-rose-50/70 border-rose-300'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    {result.status === 'eligible' ? (
                      <div className="w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center">
                        <Check className="w-6 h-6" />
                      </div>
                    ) : result.status === 'temporarily_deferred' ? (
                      <div className="w-10 h-10 rounded-full bg-amber-600 text-white flex items-center justify-center">
                        <Clock className="w-6 h-6" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-rose-700 text-white flex items-center justify-center">
                        <X className="w-6 h-6" />
                      </div>
                    )}

                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                        {language === 'bn' ? 'মূল্যায়ন ফলাফল' : 'Assessment Result'}
                      </span>
                      <h3 className="font-black text-lg text-slate-900">
                        {result.status === 'eligible'
                          ? language === 'bn' ? 'আপনি রক্তদানে প্রাথমিকভাবে যোগ্য!' : 'Preliminary Eligible!'
                          : result.status === 'temporarily_deferred'
                          ? language === 'bn' ? 'সাময়িকভাবে অপেক্ষা করতে হবে' : 'Temporarily Deferred'
                          : language === 'bn' ? 'রক্তদান চিকিৎসাগতভাবে স্থগিত' : 'Medical Deferral'}
                      </h3>
                    </div>
                  </div>

                  {result.status === 'eligible' && (
                    <div className="space-y-3 text-xs text-teal-900">
                      <p className="leading-relaxed">
                        {language === 'bn'
                          ? 'অভিনন্দন! আপনার বয়স, ওজন এবং সাধারণ স্বাস্থ্য তথ্যানুযায়ী আপনি রক্ত দেওয়ার জন্য প্রাথমিকভাবে উপযুক্ত।'
                          : 'Your self-reported criteria meet standard preliminary requirements for blood donation.'}
                      </p>
                      <div className="p-3 bg-white/80 rounded-md border border-teal-200 space-y-1">
                        <span className="font-bold block text-teal-950">
                          {language === 'bn' ? 'পরবর্তী করণীয়:' : 'Next Step:'}
                        </span>
                        <p>
                          {language === 'bn'
                            ? 'আমাদের সুরক্ষিত রক্তদাতা ডিরেক্টরিতে নিবন্ধন করে রাখুন। যাতে আপনার এলাকায় কারও জরুরি প্রয়োজন হলে আপনি জীবন বাঁচাতে পারেন।'
                            : 'Register as an opt-in community volunteer so local patients can request your support.'}
                        </p>
                      </div>
                    </div>
                  )}

                  {result.status === 'temporarily_deferred' && (
                    <div className="space-y-2.5 text-xs text-amber-950">
                      <p className="font-semibold">
                        {language === 'bn'
                          ? 'নিচের কারণগুলোর জন্য আপনাকে নির্দিষ্ট সময় পর্যন্ত অপেক্ষা করার পরামর্শ দেওয়া হচ্ছে:'
                          : 'Please defer donation for the following reason(s):'}
                      </p>
                      <ul className="space-y-1.5 list-disc pl-4 text-slate-700">
                        {(language === 'bn' ? result.reasonsBn : result.reasonsEn).map((reason, idx) => (
                          <li key={idx}>{reason}</li>
                        ))}
                      </ul>
                      {result.daysToWait > 0 && (
                        <div className="mt-3 p-3 bg-amber-100/70 rounded-md border border-amber-300 font-bold text-amber-900 text-xs">
                          {language === 'bn'
                            ? `আনুমানিক আর ${result.daysToWait} দিন পর আপনি পুনরায় রক্তদানে সক্ষম হবেন।`
                            : `Estimated wait time: ~${result.daysToWait} more day(s) before donating.`}
                        </div>
                      )}
                    </div>
                  )}

                  {result.status === 'ineligible' && (
                    <div className="space-y-2 text-xs text-rose-950">
                      <p className="font-semibold">
                        {language === 'bn'
                          ? 'আপনার নিজের এবং রোগীর শারীরিক নিরাপত্তার স্বার্থে স্থায়ীভাবে রক্তদান করা সম্ভব নয়:'
                          : 'For patient safety and your personal health, donation is not clinically recommended:'}
                      </p>
                      <ul className="space-y-1.5 list-disc pl-4 text-slate-700">
                        {(language === 'bn' ? result.reasonsBn : result.reasonsEn).map((reason, idx) => (
                          <li key={idx}>{reason}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Direct Action CTA */}
                <div className="pt-6">
                  {result.status === 'eligible' ? (
                    <button
                      onClick={() => onNavigate ? onNavigate('/donor/register') : (window.location.hash = '/donor/register')}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-md bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs shadow-md transition-colors"
                    >
                      <span>{language === 'bn' ? 'রক্তদাতা হিসেবে সক্রিয় হোন' : 'Register as a Volunteer Donor'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => onNavigate ? onNavigate('/donors') : (window.location.hash = '/donors')}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs shadow-xs transition-colors"
                    >
                      <span>{language === 'bn' ? 'রক্তদাতা অনুসন্ধান দেখুন' : 'Explore Donor Directory'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blood Group Compatibility Matrix Section */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-sm border border-teal-200 uppercase tracking-wider">
                {language === 'bn' ? 'রক্তের গ্রুপ বিজ্ঞান' : 'Hematology Reference'}
              </span>
              <h2 className="text-xl font-bold text-slate-900 mt-1">
                {language === 'bn' ? 'রক্তের গ্রুপ সামঞ্জস্যতা ম্যাট্রিক্স' : 'Blood Group Compatibility Matrix'}
              </h2>
            </div>
            <p className="text-xs text-slate-500 max-w-sm">
              {language === 'bn'
                ? 'যেকোনো গ্রুপ নির্বাচন করে দেখুন কে কাকে রক্ত দিতে বা কার থেকে নিতে পারেন।'
                : 'Click any blood group to highlight who can donate or receive.'}
            </p>
          </div>

          {/* Group Selector Pills */}
          <div className="flex flex-wrap gap-2">
            {(['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'] as BloodGroup[]).map((bg) => {
              const isSelected = selectedGroup === bg;
              return (
                <button
                  key={bg}
                  onClick={() => setSelectedGroup(bg)}
                  className={`px-4 py-2 rounded-md font-black text-sm transition-all border ${
                    isSelected
                      ? 'bg-rose-700 text-white border-rose-800 shadow-sm scale-105'
                      : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {bg}
                </button>
              );
            })}
          </div>

          {/* Compatibility Card for Selected Group */}
          {compatInfo && (
            <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-rose-700 text-white flex items-center justify-center font-black text-xl shadow-xs">
                    {selectedGroup}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-base text-slate-900">
                      {language === 'bn' ? `গ্রুপ ${selectedGroup} সামঞ্জস্যতা তথ্য` : `Group ${selectedGroup} Details`}
                    </h4>
                    <p className="text-xs text-slate-600">
                      {language === 'bn' ? compatInfo.noteBn : compatInfo.noteEn}
                    </p>
                  </div>
                </div>

                {compatInfo.isUniversalDonor && (
                  <span className="px-3 py-1 bg-amber-100 text-amber-900 font-bold rounded-md text-xs border border-amber-300">
                    {language === 'bn' ? 'সার্বজনীন দাতা (Universal Donor)' : 'Universal Red Cell Donor'}
                  </span>
                )}
                {compatInfo.isUniversalRecipient && (
                  <span className="px-3 py-1 bg-teal-100 text-teal-900 font-bold rounded-md text-xs border border-teal-300">
                    {language === 'bn' ? 'সার্বজনীন গ্রহীতা (Universal Recipient)' : 'Universal Red Cell Recipient'}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {/* Can Donate To */}
                <div className="bg-white p-4 rounded-md border border-slate-200 space-y-2">
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Droplet className="w-3.5 h-3.5 text-rose-700" />
                    <span>{language === 'bn' ? 'যাদের রক্ত দিতে পারেন (Can Donate To):' : 'Can Donate To:'}</span>
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {compatInfo.canDonateTo.map((target) => (
                      <span
                        key={target}
                        className="px-2.5 py-1 bg-rose-50 text-rose-800 font-black text-xs rounded-sm border border-rose-200"
                      >
                        {target}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Can Receive From */}
                <div className="bg-white p-4 rounded-md border border-slate-200 space-y-2">
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-teal-700" />
                    <span>{language === 'bn' ? 'যাদের থেকে রক্ত নিতে পারেন (Can Receive From):' : 'Can Receive From:'}</span>
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {compatInfo.canReceiveFrom.map((source) => (
                      <span
                        key={source}
                        className="px-2.5 py-1 bg-teal-50 text-teal-900 font-black text-xs rounded-sm border border-teal-200"
                      >
                        {source}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Pre & Post Donation Care Tips */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
              {language === 'bn' ? 'রক্তদানের পূর্বে প্রস্তুতি' : 'Pre-Donation Preparation'}
            </h3>
            <ul className="text-xs text-slate-700 space-y-2 list-disc pl-4">
              <li>রক্তদানের আগের রাতে অন্তত ৭-৮ ঘণ্টা পর্যাপ্ত ঘুমান।</li>
              <li>রক্তদানের ২-৩ ঘণ্টা পূর্বে পুষ্টিকর খাবার খান (কখনও খালি পেটে রক্ত দেবেন না)।</li>
              <li>রক্তদানের পূর্বে অন্তত ৫০০ মিলি বিশুদ্ধ পানি বা তরল পান করুন।</li>
              <li>রক্তদানের অন্তত ১ ঘণ্টা পূর্বে ধূমপান বা অ্যালকোহল পরিহার করুন।</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
              {language === 'bn' ? 'রক্তদানের পরবর্তী যত্ন' : 'Post-Donation Recovery'}
            </h3>
            <ul className="text-xs text-slate-700 space-y-2 list-disc pl-4">
              <li>রক্ত দেওয়ার পর বিছানায় ১০-১৫ মিনিট বিশ্রাম নিন।</li>
              <li>আগামী ২৪ ঘণ্টা প্রচুর পানি, ফলের জুস বা তরল খাবার গ্রহণ করুন।</li>
              <li>যে হাত থেকে রক্ত নেওয়া হয়েছে, সেই হাতে অন্তত ৫-৬ ঘণ্টা ভারী জিনিস ওঠাবেন না।</li>
              <li>মাথা ঘোরা বা দুর্বল লাগলে সঙ্গে সঙ্গে বসে পড়ুন এবং পা উঁচু করে শুয়ে থাকুন।</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
