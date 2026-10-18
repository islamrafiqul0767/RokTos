import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { fetchPublicDonors } from '../services/donorService.ts';
import type { PublicDonorProfile } from '../types/index.ts';
import { DonorCard } from '../components/donor/DonorCard.tsx';
import { DonorFilters } from '../components/donor/DonorFilters.tsx';
import { SEOHead } from '../components/common/SEOHead.tsx';
import { Search, AlertCircle, RefreshCw, Info } from 'lucide-react';

interface FindDonorsPageProps {
  initialBloodGroup?: string;
}

export const FindDonorsPage: React.FC<FindDonorsPageProps> = ({ initialBloodGroup = 'ALL' }) => {
  const { language, t } = useLanguage();
  const [donors, setDonors] = useState<PublicDonorProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [division, setDivision] = useState('ALL');
  const [district, setDistrict] = useState('ALL');
  const [bloodGroup, setBloodGroup] = useState(initialBloodGroup);
  const [availability, setAvailability] = useState('ALL');

  const loadDonors = async () => {
    setLoading(true);
    setError(null);
    try {
      const results = await fetchPublicDonors({
        bloodGroup,
        division,
        district,
        availability,
      });
      setDonors(results);
    } catch (err: any) {
      setError(err?.message || 'Failed to load donors');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDonors();
  }, [division, district, bloodGroup, availability]);

  const handleReset = () => {
    setDivision('ALL');
    setDistrict('ALL');
    setBloodGroup('ALL');
    setAvailability('ALL');
  };

  return (
    <>
      <SEOHead
        title={t.findDonorsTitle}
        description={t.findDonorsSubtitle}
        noindex={true} // Prompt guideline: directory searches with user-generated donor profiles are noindex
        canonicalPath="/donors"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            {t.findDonorsTitle}
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            {t.findDonorsSubtitle}
          </p>
        </div>

        {/* Informational Disclaimer on sorting and medical suitability */}
        <div className="p-3.5 bg-emerald-50/60 rounded-md border border-emerald-200 text-xs text-emerald-950 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>{language === 'bn' ? 'অনুসন্ধান ও ক্রমান্বয়ন সতর্কতা:' : 'Directory Guidance:'}</strong>{' '}
            {language === 'bn'
              ? 'তালিকায় প্রদর্শিত ক্রম কেবলমাত্র আপনার নির্বাচিত ফিল্টার ও তথ্য হালনাগাদের তারিখ অনুযায়ী সাজানো। এটি রোগীর জন্য দাতার শারীরিক বা চিকিৎসাগত উপযুক্ততার কোনো নিশ্চয়তা দেয় না।'
              : 'Sort ordering is based strictly on matching filters and recency of self-reported update. It implies no guarantee of clinical compatibility or current health qualification.'}
          </p>
        </div>

        {/* Filters */}
        <DonorFilters
          selectedDivision={division}
          onSelectDivision={setDivision}
          selectedDistrict={district}
          onSelectDistrict={setDistrict}
          selectedBloodGroup={bloodGroup}
          onSelectBloodGroup={setBloodGroup}
          selectedAvailability={availability}
          onSelectAvailability={setAvailability}
          onReset={handleReset}
        />

        {/* Results Info */}
        <div className="flex items-center justify-between text-xs text-stone-500 px-1">
          <span>
            {language === 'bn'
              ? `মোট ${donors.length} জন সক্রিয় দাতা পাওয়া গেছে`
              : `Found ${donors.length} available community donor(s)`}
          </span>
          <button
            onClick={loadDonors}
            className="inline-flex items-center gap-1 text-emerald-800 hover:text-emerald-950 font-semibold"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>{language === 'bn' ? 'রিফ্রেশ' : 'Refresh'}</span>
          </button>
        </div>

        {/* Content States */}
        {loading ? (
          <div className="py-20 text-center space-y-2">
            <div className="w-8 h-8 border-3 border-emerald-800 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-xs text-stone-500 font-medium">{t.loading}</p>
          </div>
        ) : error ? (
          <div className="p-6 bg-rose-50 border border-rose-200 rounded-lg text-center space-y-3">
            <AlertCircle className="w-8 h-8 text-rose-600 mx-auto" />
            <p className="text-xs text-rose-800 font-medium">{error}</p>
            <button
              onClick={loadDonors}
              className="px-4 py-2 text-xs font-semibold text-white bg-rose-700 hover:bg-rose-800 rounded-md"
            >
              {language === 'bn' ? 'আবার চেষ্টা করুন' : 'Retry'}
            </button>
          </div>
        ) : donors.length === 0 ? (
          <div className="bg-white border border-stone-200 rounded-lg p-12 text-center space-y-3">
            <Search className="w-10 h-10 text-stone-300 mx-auto" />
            <h3 className="font-bold text-stone-700 text-sm">{t.noDataFound}</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              {language === 'bn'
                ? 'আপনার নির্বাচিত ফিল্টারের সাথে কোনো দাতা পাওয়া যায়নি। অন্য রক্তের গ্রুপ বা বিভাগ পরিবর্তন করে চেষ্টা করুন।'
                : 'No donors match your selected criteria. Try adjusting the division or blood group filters.'}
            </p>
            <button
              onClick={handleReset}
              className="px-4 py-2 text-xs font-semibold text-emerald-900 bg-emerald-50 border border-emerald-200 rounded-md hover:bg-emerald-100"
            >
              {t.clearFilters}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {donors.map((donor) => (
              <DonorCard key={donor.uid} donor={donor} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};
