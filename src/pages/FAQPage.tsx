import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { SEOHead } from '../components/common/SEOHead.tsx';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  qBn: string;
  qEn: string;
  aBn: string;
  aEn: string;
}

const FAQS: FAQItem[] = [
  {
    qBn: 'রক্তস (ROKTOS) কি কোনো অর্থ লেনদেন বা চার্জ নেয়?',
    qEn: 'Does ROKTOS charge any money or service fees?',
    aBn: 'না। রক্তস সম্পূর্ণ অবাণিজ্যিক এবং বিনামূল্যে পরিচালিত একটি মানবিক প্ল্যাটফর্ম। রক্তদানের বিনিময়ে অর্থ লেনদেন করা আইনত দণ্ডনীয় অপরাধ।',
    aEn: 'No. ROKTOS is strictly non-commercial and 100% free. Selling or purchasing blood is strictly illegal in Bangladesh.',
  },
  {
    qBn: 'আমার মোবাইল নম্বর কি সবার কাছে দৃশ্যমান হবে?',
    qEn: 'Will my mobile phone number be visible to anyone on the internet?',
    aBn: 'না। সাধারণ সার্চ তালিকায় কারও ব্যক্তিগত ফোন নম্বর প্রকাশ করা হয় না। রক্তপ্রার্থী যোগাযোগের অনুরোধ পাঠানোর পর আপনি সেটি দেখে অনুমোদন দিলেই কেবল যোগাযোগ সম্ভব।',
    aEn: 'No. Phone numbers are isolated in private profile collections. Contact requires mutual consent-based approval.',
  },
  {
    qBn: 'রক্ত দেওয়ার পর কত দিন বিরতি নিতে হয়?',
    qEn: 'How long should I wait between blood donations?',
    aBn: 'সাধারণত পুরুষদের জন্য অন্তত ৩ থেকে ৪ মাস (১২০ দিন) এবং নারীদের জন্য ৪ মাস বিরতি রাখা চিকিৎসাগতভাবে আবশ্যক।',
    aEn: 'The medically recommended donation interval in Bangladesh is at least 3 to 4 months (120 days).',
  },
  {
    qBn: 'রক্তদাতার নামের পাশে "যাচাইকৃত" স্ট্যাটাসের অর্থ কী?',
    qEn: 'What do the verification statuses mean?',
    aBn: 'আমাদের এখানে দুটি পৃথক স্ট্যাটাস রয়েছে: (১) জাতীয় পরিচয় তথ্য পর্যালোচনা এবং (২) রক্তের গ্রুপ টেস্ট কার্ডের প্রমাণ পর্যালোচনা। কোনো যাচাইকরণই তাৎক্ষণিক চিকিৎসা উপযুক্ততার নিশ্চয়তা দেয় না; এটি কেবল তথ্যের সত্যতা নির্দেশ করে।',
    aEn: 'We support two distinct non-paid statuses: Identity review and Blood Group evidence review. Neither claims clinical eligibility; screening at the hospital remains mandatory.',
  },
  {
    qBn: 'আমি কীভাবে আমার প্রোফাইল মুছে ফেলতে পারি?',
    qEn: 'How can I delete or hide my donor profile?',
    aBn: 'আপনার প্রোফাইল সেটিংস থেকে "তালিকায় লুকান" বাটনে ক্লিক করে তাৎক্ষণিকভাবে পাবলিক সার্চ থেকে নিজেকে সরিয়ে নিতে পারেন। সম্পূর্ণ তথ্য মোছার জন্য প্রোফাইল পেজে নির্দেশিত সহায়তা ঠিকানায় আবেদন করা যাবে।',
    aEn: 'You can toggle your profile to hidden anytime from Settings, or request complete account erasure via the designated support email.',
  },
];

export const FAQPage: React.FC = () => {
  const { language, t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      <SEOHead
        title={t.faq}
        description="Frequently asked questions about finding donors, privacy protection, and blood donation in Bangladesh."
        canonicalPath="/faq"
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
            {language === 'bn' ? 'সাধারণ প্রশ্নোত্তর' : 'FAQ Help Center'}
          </span>
          <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">
            {t.faq}
          </h1>
          <p className="text-xs sm:text-sm text-stone-600">
            {language === 'bn'
              ? 'প্ল্যাটফর্মের নিয়মাবলি ও নিরাপত্তা সম্পর্কিত বহুল জিজ্ঞাসিত উত্তরসমূহ।'
              : 'Answers regarding safety, privacy boundaries, and volunteer coordination.'}
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-lg border border-stone-200 shadow-xs overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full text-left p-4.5 flex items-center justify-between gap-4 font-bold text-sm text-stone-900 hover:bg-stone-50 transition-colors"
                >
                  <span>{language === 'bn' ? item.qBn : item.qEn}</span>
                  <ChevronDown className={`w-4 h-4 text-stone-500 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-4.5 pb-4.5 pt-1 text-xs text-stone-600 leading-relaxed border-t border-stone-100 bg-stone-50/50">
                    {language === 'bn' ? item.aBn : item.aEn}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
