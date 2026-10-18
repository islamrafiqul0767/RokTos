import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { useAuth } from '../context/AuthContext.tsx';
import { togglePublicVisibility } from '../services/donorService.ts';
import { SEOHead } from '../components/common/SEOHead.tsx';
import { User, Shield, Eye, EyeOff, AlertTriangle, Download, Trash2, CheckCircle2 } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { language, t } = useLanguage();
  const { user, profile, isDonor, refreshProfile, signOut } = useAuth();
  const [downloadNotice, setDownloadNotice] = useState(false);
  const [deleteNotice, setDeleteNotice] = useState(false);

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-3">
        <User className="w-10 h-10 text-stone-400 mx-auto" />
        <h2 className="text-lg font-bold text-stone-800">{language === 'bn' ? 'সাইন ইন করুন' : 'Sign in Required'}</h2>
      </div>
    );
  }

  const handleExportData = () => {
    const exportData = {
      user: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      },
      profile: profile,
      exportedAt: new Date().toISOString(),
      note: 'ROKTOS GDPR/Privacy Data Export Package',
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `roktos_data_export_${user.uid}.json`;
    a.click();
    setDownloadNotice(true);
    setTimeout(() => setDownloadNotice(false), 4000);
  };

  const handleWithdrawConsent = async () => {
    if (window.confirm(language === 'bn' ? 'আপনি কি সর্বজনীন তালিকা থেকে নিজের নাম ও রক্তদাতার তথ্য প্রত্যাহার করতে চান?' : 'Withdraw your donor profile from public directory?')) {
      await togglePublicVisibility(user.uid, false);
      await refreshProfile();
    }
  };

  return (
    <>
      <SEOHead
        title={t.profile}
        description="User Profile & Privacy Controls"
        noindex={true}
        canonicalPath="/profile"
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-stone-900">{t.profile}</h1>
          <p className="text-xs text-stone-500 mt-0.5">
            {language === 'bn' ? 'আপনার ব্যক্তিগত তথ্য ও গোপনীয়তা নিয়ন্ত্রণ' : 'Manage your private account and privacy boundaries'}
          </p>
        </div>

        {/* Basic Info Card */}
        <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-stone-900 border-b border-stone-100 pb-2">
            {language === 'bn' ? 'ব্যবহারকারী তথ্য' : 'Account Details'}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-stone-500 block">{language === 'bn' ? 'পূর্ণ নাম' : 'Full Name'}</span>
              <strong className="text-stone-900 text-sm">{user.displayName || 'Member'}</strong>
            </div>
            <div>
              <span className="text-stone-500 block">{language === 'bn' ? 'ইমেইল (ব্যক্তিগত)' : 'Email (Private)'}</span>
              <strong className="text-stone-900 text-sm">{user.email}</strong>
            </div>
            <div>
              <span className="text-stone-500 block">{language === 'bn' ? 'ব্যবহারকারীর ভূমিকা' : 'System Role'}</span>
              <span className="inline-block mt-0.5 px-2 py-0.5 bg-stone-100 text-stone-700 font-bold rounded-sm border border-stone-200">
                {profile?.role || 'registered_user'}
              </span>
            </div>
            <div>
              <span className="text-stone-500 block">{language === 'bn' ? 'রক্তদাতা মর্যাদা' : 'Donor Status'}</span>
              <span className="text-stone-900 font-semibold">
                {isDonor ? (language === 'bn' ? 'নিবন্ধিত রক্তদাতা' : 'Registered Donor') : (language === 'bn' ? 'সাধারণ ব্যবহারকারী' : 'General User')}
              </span>
            </div>
          </div>
        </div>

        {/* Privacy & Consent Controls */}
        <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-stone-900 border-b border-stone-100 pb-2">
            {language === 'bn' ? 'সম্মতি ও দৃশ্যমানতা নিয়ন্ত্রণ' : 'Privacy & Consent Controls'}
          </h2>

          <p className="text-xs text-stone-600 leading-relaxed">
            {language === 'bn'
              ? 'আপনার রক্তদাতা প্রোফাইল উন্মুক্ত তালিকায় প্রদর্শন করার সম্মতি আপনি যেকোনো মুহূর্তে ফিরিয়ে নিতে পারেন। এতে আপনার তথ্য আর কাউকে দেখানো হবে না।'
              : 'You have full autonomy over your visibility. You may revoke consent or hide your public profile at any time.'}
          </p>

          {isDonor && (
            <div className="pt-2">
              <button
                onClick={handleWithdrawConsent}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-md border border-stone-300 text-stone-700 hover:bg-stone-50"
              >
                <EyeOff className="w-3.5 h-3.5 text-stone-500" />
                <span>{language === 'bn' ? 'সার্বজনীন তালিকা থেকে নিজেকে লুকান' : 'Hide from Public Search Directory'}</span>
              </button>
            </div>
          )}
        </div>

        {/* Data Portability & GDPR Export */}
        <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-xs space-y-3">
          <h2 className="text-sm font-bold text-stone-900 border-b border-stone-100 pb-2">
            {language === 'bn' ? 'তথ্য ডাউনলোড ও রপ্তানি' : 'Data Portability (Export)'}
          </h2>
          <p className="text-xs text-stone-600">
            {language === 'bn'
              ? 'আমাদের ডাটাবেজে আপনার অ্যাকাউন্টে রক্ষিত সকল ব্যক্তিগত তথ্যের একটি ডিজিটাল কপি ডাউনলোড করতে পারেন।'
              : 'Download a full machine-readable JSON archive of all your personal records stored in our database.'}
          </p>

          <button
            onClick={handleExportData}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-md bg-stone-100 hover:bg-stone-200 text-stone-800 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-stone-600" />
            <span>{language === 'bn' ? 'আমার সকল ডেটা ডাউনলোড করুন' : 'Export My Personal Data (JSON)'}</span>
          </button>

          {downloadNotice && (
            <p className="text-xs text-emerald-800 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              {language === 'bn' ? 'তথ্য ডাউনলোড শুরু হয়েছে।' : 'Data archive downloaded.'}
            </p>
          )}
        </div>

        {/* Account Deletion Notice */}
        <div className="bg-rose-50/60 p-6 rounded-lg border border-rose-200 space-y-3">
          <div className="flex items-center gap-2 text-rose-800 font-bold text-sm">
            <Trash2 className="w-4 h-4" />
            <span>{language === 'bn' ? 'অ্যাকাউন্ট ও ডেটা সম্পূর্ণ মুছে ফেলা' : 'Account & Data Deletion'}</span>
          </div>

          <p className="text-xs text-rose-950 leading-relaxed">
            {language === 'bn'
              ? 'আপনার অ্যাকাউন্ট মুছে ফেলতে চাইলে আমাদের সাপোর্ট ইমেইলে (islamrafiqul0767@gmail.com) অনুরোধ পাঠান। আপনার অনুরোধ পাওয়ার পর সর্বজনীন তালিকা ও ডাটাবেজ থেকে আপনার সকল প্রোফাইল ও রক্তের আবেদন অনতিবিলম্বে সরিয়ে ফেলা হবে।'
              : 'To permanently erase your profile and records from ROKTOS, submit a deletion request to islamrafiqul0767@gmail.com. All public listings are purged upon request.'}
          </p>
        </div>
      </div>
    </>
  );
};
