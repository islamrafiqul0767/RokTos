import React from 'react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { SEOHead } from '../components/common/SEOHead.tsx';
import { SITE_CONFIG } from '../config/siteConfig.ts';
import { Shield, FileText, CheckCircle, AlertTriangle } from 'lucide-react';

interface PolicyPageProps {
  slug: 'privacy' | 'terms' | 'verification-policy' | 'community-guidelines' | 'accessibility' | 'editorial-policy';
}

export const PolicyPage: React.FC<PolicyPageProps> = ({ slug }) => {
  const { language } = useLanguage();

  const policyContent = {
    privacy: {
      titleBn: 'গোপনীয়তা ও ডেটা সুরক্ষা নীতি',
      titleEn: 'Privacy & Data Protection Policy',
      updated: '2026-10-15',
      contentBn: (
        <>
          <p>
            রক্তবন্ধু (RoktoBondhu) ব্যবহারকারীদের গোপনীয়তা ও মানবাধিকার রক্ষায় সর্বোচ্চ অগ্রাধিকার দেয়। আমাদের লক্ষ্য হলো কাউকে অযাচিত সাইবার বুলিং বা স্প্যামিংয়ের সম্মুখীন না করে মানবিক রক্ত অনুসন্ধান সহজতর করা।
          </p>
          <h3 className="text-base font-bold text-stone-900 mt-4 mb-2">১. কী কী তথ্য আমরা সংগ্রহ করি?</h3>
          <p>
            আমরা শুধুমাত্র প্রয়োজনীয় তথ্য সংগ্রহ করি: আপনার নাম, ইমেইল, রক্তের গ্রুপ, বিভাগ, জেলা এবং আনুমানিক এলাকা। আমরা কখনোই আপনার জাতীয় পরিচয়পত্র নম্বর, পাসপোর্ট, প্রেসক্রিপশন বা সুনির্দিষ্ট বাড়ির ঠিকানা সংগ্রহ করি না।
          </p>
          <h3 className="text-base font-bold text-stone-900 mt-4 mb-2">২. সর্বজনীন তালিকায় কী প্রদর্শিত হয়?</h3>
          <p>
            সার্বজনীন তালিকায় আপনার কেবল আদ্যক্ষরসহ নাম, রক্তের গ্রুপ এবং জেলা প্রদর্শিত হয়। আপনার ফোন নম্বর এবং ইমেইল কখনোই উন্মুক্ত সার্চ তালিকায় প্রদর্শিত হয় না।
          </p>
          <h3 className="text-base font-bold text-stone-900 mt-4 mb-2">৩. সম্মতি প্রত্যাহার ও তথ্য মোছা</h3>
          <p>
            আপনি যেকোনো সময় ড্যাশবোর্ড থেকে আপনার প্রোফাইল লুকানোর বা ডেটা রপ্তানি করার অধিকার রাখেন। স্থায়ীভাবে অ্যাকাউন্ট মোছার জন্য সাপোর্ট ইমেইলে অনুরোধ পাঠালে ২৪-৪৮ ঘণ্টার মধ্যে তা ডাটাবেজ থেকে মুছে দেওয়া হয়।
          </p>
        </>
      ),
      contentEn: (
        <>
          <p>
            RoktoBondhu is engineered from the ground up to protect user privacy and eradicate unsolicited phone spam and cyber harassment.
          </p>
          <h3 className="text-base font-bold text-stone-900 mt-4 mb-2">1. Data Minimization</h3>
          <p>
            We strictly limit collection to non-sensitive essentials: display label, blood group, division, district, and approximate area. We never collect NID numbers, national ID photos, prescriptions, or exact home addresses.
          </p>
          <h3 className="text-base font-bold text-stone-900 mt-4 mb-2">2. Strict Isolation of Public & Private Projections</h3>
          <p>
            Phone numbers and real emails reside in isolated private collections accessible only to the authenticated owner. Public searches access safe projection models populated exclusively upon explicit consent.
          </p>
          <h3 className="text-base font-bold text-stone-900 mt-4 mb-2">3. Consent Withdrawal & Deletion</h3>
          <p>
            Users possess absolute autonomy to revoke public visibility, export personal records in JSON format, or request complete account erasure.
          </p>
        </>
      ),
    },
    terms: {
      titleBn: 'ব্যবহারের সাধারণ শর্তাবলী',
      titleEn: 'Terms of Service',
      updated: '2026-10-15',
      contentBn: (
        <>
          <p>
            রক্তবন্ধু প্ল্যাটফর্মটি ব্যবহারের মাধ্যমে আপনি এই শর্তাবলি মেনে নিতে সম্মতি জ্ঞাপন করছেন।
          </p>
          <h3 className="text-base font-bold text-stone-900 mt-4 mb-2">১. অবাণিজ্যিক অঙ্গীকার</h3>
          <p>
            রক্তদান একটি নিঃস্বার্থ দান। রক্ত বা রক্তদাতার তথ্যের বিনিময়ে কোনো আর্থিক লেনদেন বা পারিশ্রমিক দাবি করা আইনত সম্পূর্ণ নিষিদ্ধ। কোনো ব্যক্তি টাকার দাবি করলে তাকে তৎক্ষণাৎ রিপোর্ট করুন।
          </p>
          <h3 className="text-base font-bold text-stone-900 mt-4 mb-2">২. তথ্যের সত্যতা</h3>
          <p>
            রক্তের আবেদন ও নিবন্ধনে সঠিক তথ্য প্রদান করতে হবে। কোনো ভুয়া বা বিভ্রান্তিকর অনুরোধ করা আইনানুগ ব্যবস্থার আওতাভুক্ত হতে পারে।
          </p>
        </>
      ),
      contentEn: (
        <>
          <p>
            By accessing or registering with RoktoBondhu, you agree to comply with our Terms of Service.
          </p>
          <h3 className="text-base font-bold text-stone-900 mt-4 mb-2">1. Prohibition of Commercialization</h3>
          <p>
            Blood donation is voluntary. Requesting or paying money in exchange for blood or donor contact is strictly prohibited under Bangladesh law.
          </p>
          <h3 className="text-base font-bold text-stone-900 mt-4 mb-2">2. Authentic Intent</h3>
          <p>
            Users must submit authentic patient information checked with hospital authorities. Fabricating emergencies or harassing volunteers results in immediate suspension.
          </p>
        </>
      ),
    },
    'verification-policy': {
      titleBn: 'যাচাইকরণ ও ব্যাজ নীতিমালা',
      titleEn: 'Verification & Badge Policy',
      updated: '2026-10-15',
      contentBn: (
        <>
          <p>
            রক্তবন্ধুতে কোনো প্রকার ‘পেইড ভেরিফিকেশন’ বা টাকার বিনিময়ে ব্যাজ বিক্রয় করা হয় না।
          </p>
          <h3 className="text-base font-bold text-stone-900 mt-4 mb-2">১. দুটি পৃথক পর্যায়</h3>
          <p>
            (ক) জাতীয় পরিচয় তথ্য পর্যালোচনা: রক্তদাতার নামের সত্যতা পর্যালোচনা।<br />
            (খ) রক্তের গ্রুপ প্রমাণ পর্যালোচনা: ল্যাবরেটরি বা রেড ক্রিসেন্ট ব্লাড ডোনার কার্ডের তথ্য পর্যালোচনা।
          </p>
          <h3 className="text-base font-bold text-stone-900 mt-4 mb-2">২. চিকিৎসাগত সতর্কতা</h3>
          <p>
            যাচাইকৃত ব্যাজ কখনো রোগীর জন্য দাতার তাৎক্ষণিক শারীরিক সুস্থতা বা সামঞ্জস্যতা নির্দেশ করে না। রক্ত দেওয়ার পূর্বে হাসপাতালে চিকিৎসকের তত্ত্বাবধানে পূর্ণাঙ্গ স্ক্রিনিং পরীক্ষা বাধ্যতামূলক।
          </p>
        </>
      ),
      contentEn: (
        <>
          <p>
            Verification on RoktoBondhu is transparent, merit-based, non-commercial, and never purchasable.
          </p>
          <h3 className="text-base font-bold text-stone-900 mt-4 mb-2">1. Two Distinct Review States</h3>
          <p>
            Identity Review and Blood-Group Review are strictly segregated states verified independently by trained reviewers.
          </p>
          <h3 className="text-base font-bold text-stone-900 mt-4 mb-2">2. Clinical Limitation</h3>
          <p>
            Verification confirms document authenticity only; it does NOT establish current medical eligibility or immunological compatibility.
          </p>
        </>
      ),
    },
    'community-guidelines': {
      titleBn: 'কমিউনিটি মানদণ্ড ও আচরণবিধি',
      titleEn: 'Community Guidelines',
      updated: '2026-10-15',
      contentBn: (
        <>
          <p>
            আমরা একটি শ্রদ্ধাশীল, মার্জিত ও মানবিক সমাজ গঠনে দায়বদ্ধ। রক্তদাতা এবং রোগীর পরিবার উভয়ের প্রতি সহানুভূতিশীল আচরণ কাম্য।
          </p>
          <h3 className="text-base font-bold text-stone-900 mt-4 mb-2">নিষিদ্ধ আচরণ</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>অযাচিত ফোন কল বা মধ্যরাতে অযৌক্তিক মেসেজ পাঠানো।</li>
            <li>রক্তদাতার অসম্মতিতে তার ব্যক্তিগত তথ্য সামাজিক যোগাযোগ মাধ্যমে প্রচার।</li>
            <li>রক্তের জন্য কোনো প্রকার দালালি বা কমিশনের প্রস্তাব।</li>
          </ul>
        </>
      ),
      contentEn: (
        <>
          <p>
            Our community standards enforce mutual dignity, courtesy, and respect between patients and volunteer donors.
          </p>
          <h3 className="text-base font-bold text-stone-900 mt-4 mb-2">Prohibited Actions</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Spamming, harassment, or abusive messages to community donors.</li>
            <li>Sharing or broadcasting private donor contact numbers on public forums.</li>
            <li>Soliciting commercial intermediary fees or paid donor arrangements.</li>
          </ul>
        </>
      ),
    },
    accessibility: {
      titleBn: 'অ্যাক্সেসিবিলিটি বিবৃতি',
      titleEn: 'Accessibility Statement',
      updated: '2026-10-15',
      contentBn: (
        <>
          <p>
            রক্তবন্ধু সকল ব্যবহারকারীর জন্য সহজে ব্যবহারযোগ্য হওয়ার লক্ষ্যে WCAG 2.2 AA মানদণ্ড অনুসরণ করে নির্মিত হয়েছে।
          </p>
          <h3 className="text-base font-bold text-stone-900 mt-4 mb-2">আমাদের গৃহীত পদক্ষেপ</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>কীবোর্ড নেভিগেশন এবং স্পষ্ট ফোকাস ইন্ডিকেটর।</li>
            <li>পর্দা পাঠকদের (Screen Readers) জন্য পর্যাপ্ত সিম্যান্টিক ল্যান্ডমার্ক ও লেবেল।</li>
            <li>উচ্চ বৈসাদৃশ্য (High Contrast) টেক্সট এবং সুস্পষ্ট বাংলা ফন্ট সাপোর্ট।</li>
            <li>মোবাইল স্ক্রিনে স্বাচ্ছন্দ্যে ট্যাপ করার উপযোগী বোতামের মাপ।</li>
          </ul>
        </>
      ),
      contentEn: (
        <>
          <p>
            RoktoBondhu is committed to digital inclusivity, adhering to WCAG 2.2 AA accessibility best practices.
          </p>
          <h3 className="text-base font-bold text-stone-900 mt-4 mb-2">Implemented Features</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Full keyboard navigable workflows with distinct visual focus rings.</li>
            <li>Accessible semantic HTML elements, ARIA labels, and live region announcements.</li>
            <li>High-contrast palette compliant with contrast thresholds.</li>
            <li>Comfortable minimum 44px touch targets optimized for mobile users.</li>
          </ul>
        </>
      ),
    },
    'editorial-policy': {
      titleBn: 'সম্পাদকীয় ও তথ্যসূত্র নীতি',
      titleEn: 'Editorial & Sourcing Policy',
      updated: '2026-10-15',
      contentBn: (
        <>
          <p>
            রক্তবন্ধুর সকল স্বাস্থ্য ও রক্তদান সংক্রান্ত তথ্য বিশ্ব স্বাস্থ্য সংস্থা (WHO), বাংলাদেশ রক্ত পরিসঞ্চালন আইন এবং স্বাস্থ্য অধিদপ্তরের নির্ভরযোগ্য চিকিৎসা নির্দেশিকা অবলম্বনে রচিত।
          </p>
          <h3 className="text-base font-bold text-stone-900 mt-4 mb-2">তথ্য যাচাইয়ের নীতি</h3>
          <p>
            আমরা কোনো কৃত্রিম বুদ্ধিমত্তা চালিত অযাচাইকৃত স্বাস্থ্য পরামর্শ প্রকাশ করি না। প্রতিটি নির্দেশনা প্রকাশিত হওয়ার আগে চিকিৎসাগত সত্যতা নিশ্চিত করা হয়।
          </p>
        </>
      ),
      contentEn: (
        <>
          <p>
            All educational materials on RoktoBondhu are sourced directly from peer-reviewed public health guidelines, the WHO, and Bangladesh National Blood Transfusion regulations.
          </p>
          <h3 className="text-base font-bold text-stone-900 mt-4 mb-2">Review Standards</h3>
          <p>
            We do not publish unverified or fabricated clinical guidance. Content undergoes rigorous editorial review before public distribution.
          </p>
        </>
      ),
    },
  };

  const current = policyContent[slug];

  return (
    <>
      <SEOHead
        title={language === 'bn' ? current.titleBn : current.titleEn}
        description={`RoktoBondhu official policy: ${current.titleEn}`}
        canonicalPath={`/${slug}`}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="border-b border-stone-200 pb-5">
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
            {language === 'bn' ? 'অফিসিয়াল নীতিমালা' : 'Official Policy'}
          </span>
          <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight mt-2">
            {language === 'bn' ? current.titleBn : current.titleEn}
          </h1>
          <p className="text-xs text-stone-400 mt-1">
            {language === 'bn' ? 'সর্বশেষ পর্যালোচনা:' : 'Last Reviewed:'} {current.updated} (সংস্করণ: {SITE_CONFIG.policyVersion})
          </p>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-lg border border-stone-200 shadow-xs space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed">
          {language === 'bn' ? current.contentBn : current.contentEn}
        </div>
      </div>
    </>
  );
};
