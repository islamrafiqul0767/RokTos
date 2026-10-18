import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { fetchPublicBloodRequests } from '../services/requestService.ts';
import { fetchPublicDonors } from '../services/donorService.ts';
import { seedDemoDataIfEmpty } from '../services/seedService.ts';
import type { BloodRequest, PublicDonorProfile } from '../types/index.ts';
import { SEOHead } from '../components/common/SEOHead.tsx';
import { RequestCard } from '../components/request/RequestCard.tsx';
import { DonorCard } from '../components/donor/DonorCard.tsx';
import { BLOOD_GROUPS } from '../config/bangladeshData.ts';
import { SITE_CONFIG } from '../config/siteConfig.ts';
import {
  Search,
  PlusCircle,
  ShieldCheck,
  Lock,
  HeartHandshake,
  CheckCircle,
  ArrowRight,
  AlertTriangle,
  HelpCircle,
  MapPin,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onFilterBloodGroup?: (bg: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onFilterBloodGroup }) => {
  const { language, t } = useLanguage();
  const [urgentRequests, setUrgentRequests] = useState<BloodRequest[]>([]);
  const [recentDonors, setRecentDonors] = useState<PublicDonorProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        await seedDemoDataIfEmpty();
        const [reqs, donors] = await Promise.all([
          fetchPublicBloodRequests(),
          fetchPublicDonors(),
        ]);
        setUrgentRequests(reqs.slice(0, 3));
        setRecentDonors(donors.slice(0, 3));
      } catch (err) {
        console.warn('Home page data load warning:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleBloodGroupClick = (bg: string) => {
    if (onFilterBloodGroup) onFilterBloodGroup(bg);
    onNavigate('/donors');
  };

  const schemaJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'RoktoBondhu',
    alternateName: 'রক্তবন্ধু',
    url: window.location.origin,
    description: language === 'bn' ? SITE_CONFIG.taglineBn : SITE_CONFIG.taglineEn,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${window.location.origin}/#/donors?bloodGroup={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <SEOHead
        title={language === 'bn' ? 'স্বেচ্ছাসেবী রক্তদাতা অনুসন্ধান ও রক্তের অনুরোধ' : 'Blood Donor Discovery Platform'}
        description={language === 'bn' ? SITE_CONFIG.taglineBn : SITE_CONFIG.taglineEn}
        canonicalPath="/"
        jsonLd={schemaJsonLd}
      />

      <div className="space-y-16 pb-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950 text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-800/80 border border-emerald-700 text-emerald-200 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              {language === 'bn' ? 'অবাণিজ্যিক ও গোপনীয়তা-সুরক্ষিত রক্ত সেবা' : 'Non-Commercial & Privacy-First'}
            </span>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              {t.heroTitle}
            </h1>

            <p className="text-base sm:text-lg text-emerald-100/90 max-w-2xl mx-auto leading-relaxed font-normal">
              {t.heroSubtitle}
            </p>

            {/* Main Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('/donors')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-colors"
              >
                <Search className="w-4 h-4" />
                <span>{t.searchDonors}</span>
              </button>

              <button
                onClick={() => onNavigate('/blood-requests/new')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md bg-rose-700 hover:bg-rose-600 text-white font-bold text-sm shadow-md transition-colors"
              >
                <PlusCircle className="w-4 h-4" />
                <span>{t.createRequest}</span>
              </button>
            </div>

            {/* Blood Group Quick Select Shortcuts */}
            <div className="pt-6 border-t border-emerald-800/80">
              <p className="text-xs text-emerald-300 font-semibold mb-3 uppercase tracking-wider">
                {language === 'bn' ? 'রক্তের গ্রুপ অনুযায়ী সরাসরি অনুসন্ধান করুন:' : 'Quick Filter by Blood Group:'}
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {BLOOD_GROUPS.map((bg) => (
                  <button
                    key={bg}
                    onClick={() => handleBloodGroupClick(bg)}
                    className="px-3.5 py-1.5 rounded-md bg-emerald-800/90 hover:bg-rose-700 text-white font-black text-sm border border-emerald-700 transition-colors shadow-xs"
                    aria-label={`Find donors for blood group ${bg}`}
                  >
                    {bg}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pillars / Principles */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
              {t.whyRoktoBondhu}
            </h2>
            <p className="text-sm text-stone-600 mt-2">
              {language === 'bn'
                ? 'আমরা তথ্যের অপব্যবহার, অযাচিত স্প্যাম ও বাণিজ্যিক প্রতারণা রোধে নিবেদিত।'
                : 'Built to prevent commercial exploitation, spam, and privacy violations.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-xs">
              <div className="w-10 h-10 rounded-md bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-stone-900 mb-2">{t.pillar1Title}</h3>
              <p className="text-xs text-stone-600 leading-relaxed">{t.pillar1Desc}</p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-xs">
              <div className="w-10 h-10 rounded-md bg-rose-100 text-rose-800 flex items-center justify-center mb-4">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-stone-900 mb-2">{t.pillar2Title}</h3>
              <p className="text-xs text-stone-600 leading-relaxed">{t.pillar2Desc}</p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-xs">
              <div className="w-10 h-10 rounded-md bg-stone-100 text-stone-800 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-stone-900 mb-2">{t.pillar3Title}</h3>
              <p className="text-xs text-stone-600 leading-relaxed">{t.pillar3Desc}</p>
            </div>
          </div>
        </section>

        {/* Active Urgent Requests Preview */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900">
                {t.urgentRequestsTitle}
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                {language === 'bn' ? 'হাসপাতালে চিকিৎসাধীন রোগীদের জন্য চলমান রক্তের প্রয়োজন' : 'Active requests for hospital patients'}
              </p>
            </div>
            <button
              onClick={() => onNavigate('/blood-requests')}
              className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 hover:text-emerald-950"
            >
              <span>{language === 'bn' ? 'সকল অনুরোধ দেখুন' : 'View All Requests'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {loading ? (
            <div className="p-8 text-center text-xs text-stone-500">{t.loading}</div>
          ) : urgentRequests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {urgentRequests.map((req) => (
                <RequestCard key={req.id} request={req} />
              ))}
            </div>
          ) : (
            <div className="bg-stone-50 p-8 rounded-lg text-center text-xs text-stone-500 border border-stone-200">
              {t.noDataFound}
            </div>
          )}
        </section>

        {/* Available Donors Preview */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900">
                {t.recentDonorsTitle}
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                {language === 'bn' ? 'সম্মতি প্রদানকারী সক্রিয় রক্তদাতাদের নমুনা তালিকা' : 'Sample directory of opted-in donors'}
              </p>
            </div>
            <button
              onClick={() => onNavigate('/donors')}
              className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 hover:text-emerald-950"
            >
              <span>{language === 'bn' ? 'সকল রক্তদাতা খুঁজুন' : 'Search All Donors'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {loading ? (
            <div className="p-8 text-center text-xs text-stone-500">{t.loading}</div>
          ) : recentDonors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {recentDonors.map((donor) => (
                <DonorCard key={donor.uid} donor={donor} />
              ))}
            </div>
          ) : (
            <div className="bg-stone-50 p-8 rounded-lg text-center text-xs text-stone-500 border border-stone-200">
              {t.noDataFound}
            </div>
          )}
        </section>

        {/* How it Works Summary */}
        <section className="bg-stone-100 py-12 px-4 sm:px-6 lg:px-8 border-y border-stone-200">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-2xl font-extrabold text-stone-900">{t.howItWorks}</h2>
              <p className="text-xs text-stone-600 mt-1">
                {language === 'bn' ? 'সহজ ৩টি ধাপে যোগাযোগ সম্পন্ন করুন' : 'Simple 3-step privacy workflow'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-5 rounded-lg border border-stone-200">
                <span className="w-7 h-7 rounded-md bg-emerald-900 text-white font-bold text-xs flex items-center justify-center mb-3">
                  ১
                </span>
                <h3 className="font-bold text-sm text-stone-900 mb-1">
                  {language === 'bn' ? '১. অনুসন্ধান বা আবেদন' : '1. Search or Request'}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {language === 'bn'
                    ? 'প্রয়োজনীয় রক্তের গ্রুপ ও এলাকা বাছাই করে দাতা খুঁজুন অথবা হাসপাতালে রোগীর সঠিক তথ্য দিয়ে আবেদন প্রকাশ করুন।'
                    : 'Search donors by blood group and division or submit hospital patient requirements.'}
                </p>
              </div>

              <div className="bg-white p-5 rounded-lg border border-stone-200">
                <span className="w-7 h-7 rounded-md bg-emerald-900 text-white font-bold text-xs flex items-center justify-center mb-3">
                  ২
                </span>
                <h3 className="font-bold text-sm text-stone-900 mb-1">
                  {language === 'bn' ? '২. সম্মতির অনুরোধ' : '2. Consent-Based Request'}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {language === 'bn'
                    ? 'রক্তদাতাকে সরাসরি বার্তা পাঠিয়ে যোগাযোগের অনুরোধ করুন। অনুমতি ছাড়া কারও ব্যক্তিগত ফোন নম্বর প্রকাশ পায় না।'
                    : 'Send a contact request. Private phone numbers are never published openly without mutual consent.'}
                </p>
              </div>

              <div className="bg-white p-5 rounded-lg border border-stone-200">
                <span className="w-7 h-7 rounded-md bg-emerald-900 text-white font-bold text-xs flex items-center justify-center mb-3">
                  ৩
                </span>
                <h3 className="font-bold text-sm text-stone-900 mb-1">
                  {language === 'bn' ? '৩. চিকিৎসকের অধীনে পরীক্ষা' : '3. Clinical Screening'}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {language === 'bn'
                    ? 'হাসপাতালে গিয়ে চিকিৎসকের তত্ত্বাবধানে বাধ্যতামূলক ক্রস-ম্যাচিং ও স্বাস্থ্য পরীক্ষা সম্পন্ন করে নিরাপদ রক্তদান সম্পন্ন করুন।'
                    : 'Visit the blood centre for mandatory medical cross-matching and screening before donation.'}
                </p>
              </div>
            </div>

            <div className="text-center mt-8">
              <button
                onClick={() => onNavigate('/how-it-works')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-900 underline hover:text-emerald-950"
              >
                <span>{language === 'bn' ? 'বিস্তারিত কাজের প্রক্রিয়া ও নিয়মাবলি পড়ুন' : 'Read Full Operational Guidelines'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
