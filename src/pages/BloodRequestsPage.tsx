import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { fetchPublicBloodRequests } from '../services/requestService.ts';
import type { BloodRequest } from '../types/index.ts';
import { RequestCard } from '../components/request/RequestCard.tsx';
import { SEOHead } from '../components/common/SEOHead.tsx';
import { BANGLADESH_DIVISIONS, BLOOD_GROUPS } from '../config/bangladeshData.ts';
import { ClipboardList, PlusCircle, RefreshCw, AlertCircle, Filter } from 'lucide-react';

interface BloodRequestsPageProps {
  onNavigate: (path: string) => void;
}

export const BloodRequestsPage: React.FC<BloodRequestsPageProps> = ({ onNavigate }) => {
  const { language, t } = useLanguage();
  const [requests, setRequests] = useState<BloodRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [division, setDivision] = useState('ALL');
  const [district, setDistrict] = useState('ALL');
  const [bloodGroup, setBloodGroup] = useState('ALL');

  const loadRequests = async () => {
    setLoading(true);
    setError(null);
    try {
      const results = await fetchPublicBloodRequests({
        bloodGroup,
        division,
        district,
      });
      setRequests(results);
    } catch (err: any) {
      setError(err?.message || 'Failed to load blood requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, [division, district, bloodGroup]);

  const currentDivData = BANGLADESH_DIVISIONS.find((d) => d.id === division);
  const districtList = currentDivData ? currentDivData.districts : [];

  return (
    <>
      <SEOHead
        title={t.requestsDirectoryTitle}
        description={t.requestsDirectorySubtitle}
        canonicalPath="/blood-requests"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              {t.requestsDirectoryTitle}
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              {t.requestsDirectorySubtitle}
            </p>
          </div>
          <button
            onClick={() => onNavigate('/blood-requests/new')}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-md text-white bg-rose-700 hover:bg-rose-800 transition-colors shadow-xs"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{t.createRequest}</span>
          </button>
        </div>

        {/* Filter bar */}
        <div className="bg-white p-4 rounded-lg border border-stone-200 shadow-xs">
          <div className="flex items-center gap-2 text-stone-800 font-semibold text-xs mb-3">
            <Filter className="w-3.5 h-3.5 text-emerald-800" />
            <span>{language === 'bn' ? 'আবেদন ফিল্টার করুন' : 'Filter Requests'}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-stone-600 mb-1">
                {language === 'bn' ? 'রক্তের গ্রুপ' : 'Blood Group'}
              </label>
              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="w-full text-xs sm:text-sm border border-stone-300 rounded-md p-2 bg-stone-50 text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
              >
                <option value="ALL">{t.allBloodGroups}</option>
                {BLOOD_GROUPS.map((bg) => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-600 mb-1">
                {language === 'bn' ? 'বিভাগ' : 'Division'}
              </label>
              <select
                value={division}
                onChange={(e) => {
                  setDivision(e.target.value);
                  setDistrict('ALL');
                }}
                className="w-full text-xs sm:text-sm border border-stone-300 rounded-md p-2 bg-stone-50 text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
              >
                <option value="ALL">{t.allDivisions}</option>
                {BANGLADESH_DIVISIONS.map((div) => (
                  <option key={div.id} value={div.id}>
                    {language === 'bn' ? div.nameBn : div.nameEn}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-600 mb-1">
                {language === 'bn' ? 'জেলা' : 'District'}
              </label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                disabled={division === 'ALL'}
                className="w-full text-xs sm:text-sm border border-stone-300 rounded-md p-2 bg-stone-50 text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-700 disabled:opacity-50"
              >
                <option value="ALL">{t.allDistricts}</option>
                {districtList.map((dist) => (
                  <option key={dist.id} value={dist.id}>
                    {language === 'bn' ? dist.nameBn : dist.nameEn}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Requests Count & Refresh */}
        <div className="flex items-center justify-between text-xs text-stone-500 px-1">
          <span>
            {language === 'bn'
              ? `মোট ${requests.length} টি রক্তের আবেদন সক্রিয় রয়েছে`
              : `Showing ${requests.length} active blood request(s)`}
          </span>
          <button
            onClick={loadRequests}
            className="inline-flex items-center gap-1 text-emerald-800 hover:text-emerald-950 font-semibold"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>{language === 'bn' ? 'রিফ্রেশ' : 'Refresh'}</span>
          </button>
        </div>

        {/* States */}
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
              onClick={loadRequests}
              className="px-4 py-2 text-xs font-semibold text-white bg-rose-700 hover:bg-rose-800 rounded-md"
            >
              {language === 'bn' ? 'আবার চেষ্টা করুন' : 'Retry'}
            </button>
          </div>
        ) : requests.length === 0 ? (
          <div className="bg-white border border-stone-200 rounded-lg p-12 text-center space-y-3">
            <ClipboardList className="w-10 h-10 text-stone-300 mx-auto" />
            <h3 className="font-bold text-stone-700 text-sm">{t.noDataFound}</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              {language === 'bn'
                ? 'বর্তমানে কোনো সক্রিয় অনুরোধ নেই। আপনি নতুন রক্তের অনুরোধ তৈরি করতে পারেন।'
                : 'No active blood requests currently found matching filters.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {requests.map((req) => (
              <RequestCard key={req.id} request={req} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};
