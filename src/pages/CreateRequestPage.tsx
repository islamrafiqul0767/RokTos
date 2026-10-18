import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { useAuth } from '../context/AuthContext.tsx';
import { createBloodRequest } from '../services/requestService.ts';
import { validateBloodRequest } from '../utils/validation.ts';
import { BANGLADESH_DIVISIONS, BLOOD_GROUPS } from '../config/bangladeshData.ts';
import { SEOHead } from '../components/common/SEOHead.tsx';
import type { BloodGroup, UrgencyLevel } from '../types/index.ts';
import { PlusCircle, ShieldAlert, Check, AlertCircle, LogIn } from 'lucide-react';

interface CreateRequestPageProps {
  onNavigate: (path: string) => void;
}

export const CreateRequestPage: React.FC<CreateRequestPageProps> = ({ onNavigate }) => {
  const { language, t } = useLanguage();
  const { user, profile, signInWithGoogle } = useAuth();

  const [patientDisplayNameOrInitials, setPatientName] = useState('');
  const [requestedBloodGroup, setBloodGroup] = useState<BloodGroup>('A+');
  const [unitsNeeded, setUnitsNeeded] = useState('১ ব্যাগ');
  const [hospitalName, setHospitalName] = useState('');
  const [hospitalArea, setHospitalArea] = useState('');
  const [division, setDivision] = useState('dhaka');
  const [district, setDistrict] = useState('dhaka_city');
  const [upazila, setUpazila] = useState('');
  const [neededByDate, setNeededByDate] = useState('');
  const [urgencyLevel, setUrgencyLevel] = useState<UrgencyLevel>('urgent');
  const [shortDescription, setDescription] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const currentDivData = BANGLADESH_DIVISIONS.find((d) => d.id === division);
  const districtList = currentDivData ? currentDivData.districts : [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setServerError(language === 'bn' ? 'অনুরোধ তৈরি করতে প্রথমে সাইন ইন করুন।' : 'Please sign in to submit a request.');
      return;
    }

    const validation = validateBloodRequest({
      patientDisplayNameOrInitials,
      requestedBloodGroup,
      division,
      district,
      hospitalName,
      neededByDate,
      unitsNeeded,
      termsAccepted,
    });

    if (!validation.isValid) {
      setFormErrors(validation.errors);
      return;
    }

    setFormErrors({});
    setSubmitting(true);
    setServerError(null);

    try {
      await createBloodRequest({
        createdByUid: user.uid,
        requesterDisplayLabel: profile?.displayName || user.displayName || 'Family Member',
        patientDisplayNameOrInitials: patientDisplayNameOrInitials.trim(),
        requestedBloodGroup,
        unitsNeeded,
        hospitalName: hospitalName.trim(),
        hospitalArea: hospitalArea.trim(),
        division,
        district,
        upazila,
        neededByDate,
        urgencyLevel,
        shortDescription: shortDescription.trim(),
        requesterContactPreference: 'in_app',
        status: 'approved',
        moderationStatus: 'approved',
        isPublic: true,
      });

      setSuccess(true);
      setTimeout(() => {
        onNavigate('/blood-requests');
      }, 2500);
    } catch (err: any) {
      setServerError(err?.message || 'Failed to submit request');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEOHead
        title={t.createRequestTitle}
        description={t.createRequestSubtitle}
        canonicalPath="/blood-requests/new"
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-lg border border-stone-200 shadow-sm p-6 sm:p-8">
          <div className="border-b border-stone-200 pb-5 mb-6">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-rose-50 text-rose-800 text-xs font-bold mb-2">
              <PlusCircle className="w-3.5 h-3.5" />
              {language === 'bn' ? 'মানবিক আবেদন' : 'Urgent Support'}
            </span>
            <h1 className="text-2xl font-extrabold text-stone-900">{t.createRequestTitle}</h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">{t.createRequestSubtitle}</p>
          </div>

          {!user ? (
            <div className="p-8 bg-stone-50 rounded-lg border border-stone-200 text-center space-y-4">
              <AlertCircle className="w-10 h-10 text-amber-600 mx-auto" />
              <h3 className="font-bold text-stone-800 text-base">
                {language === 'bn' ? 'লগইন আবশ্যক' : 'Authentication Required'}
              </h3>
              <p className="text-xs text-stone-600 max-w-md mx-auto">
                {language === 'bn'
                  ? 'স্প্যাম ও অপব্যবহার রোধে রক্তের অনুরোধ জমা দিতে গুগল অ্যাকাউন্ট দিয়ে দ্রুত সাইন ইন করুন।'
                  : 'To protect our community from spam and verify authentic requests, please sign in with Google.'}
              </p>
              <button
                onClick={signInWithGoogle}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-xs font-bold text-white bg-emerald-900 hover:bg-emerald-800 shadow-xs"
              >
                <LogIn className="w-4 h-4" />
                <span>{t.signInWithGoogle}</span>
              </button>
            </div>
          ) : success ? (
            <div className="py-12 text-center text-emerald-800 space-y-3">
              <Check className="w-16 h-16 mx-auto bg-emerald-100 p-3 rounded-full text-emerald-700" />
              <h2 className="text-xl font-extrabold text-stone-900">
                {language === 'bn' ? 'অনুরোধ সফলভাবে প্রকাশিত হয়েছে!' : 'Blood Request Published!'}
              </h2>
              <p className="text-xs text-stone-600 max-w-md mx-auto">
                {language === 'bn'
                  ? 'আপনার অনুরোধটি সক্রিয় তালিকায় যুক্ত হয়েছে। আগ্রহী রক্তদাতারা যোগাযোগ করতে পারলে আপনি ড্যাশবোর্ডে দেখতে পাবেন।'
                  : 'Your request is now live in the active requests directory.'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Patient Initials & Blood Group */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-1">
                    {t.patientNameLabel} *
                  </label>
                  <input
                    type="text"
                    value={patientDisplayNameOrInitials}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder={language === 'bn' ? 'যেমন: র. ইসলাম বা ফাতিমা (বয়স ৪৫)' : 'e.g. R. Islam (Age 45)'}
                    className="w-full text-sm border border-stone-300 rounded-md p-2.5 bg-white text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
                    maxLength={100}
                    required
                  />
                  {formErrors.patientDisplayNameOrInitials && (
                    <p className="text-xs text-rose-600 mt-1">{formErrors.patientDisplayNameOrInitials}</p>
                  )}
                  <span className="text-[11px] text-stone-400 block mt-1">
                    {language === 'bn' ? 'গোপনীয়তার স্বার্থে পূর্ণ নামের পরিবর্তে আদ্যক্ষর ব্যবহার শ্রেয়' : 'Use initials for patient privacy'}
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-1">
                    {t.bloodGroupLabel} *
                  </label>
                  <select
                    value={requestedBloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value as BloodGroup)}
                    className="w-full text-sm border border-stone-300 rounded-md p-2.5 bg-white text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-700 font-bold"
                  >
                    {BLOOD_GROUPS.map((bg) => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                    <option value="Unknown">{language === 'bn' ? 'অনিশ্চিত (হাসপাতালে রক্ত পরীক্ষা বাকি)' : 'Unknown (Testing pending)'}</option>
                  </select>
                </div>
              </div>

              {/* Units & Urgency */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-1">
                    {t.unitsNeededLabel} *
                  </label>
                  <input
                    type="text"
                    value={unitsNeeded}
                    onChange={(e) => setUnitsNeeded(e.target.value)}
                    placeholder={language === 'bn' ? 'যেমন: ২ ব্যাগ / ১ ইউনিট' : 'e.g. 2 bags'}
                    className="w-full text-sm border border-stone-300 rounded-md p-2.5 bg-white text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
                    maxLength={20}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-1">
                    {t.urgencyLabel} *
                  </label>
                  <select
                    value={urgencyLevel}
                    onChange={(e) => setUrgencyLevel(e.target.value as UrgencyLevel)}
                    className="w-full text-sm border border-stone-300 rounded-md p-2.5 bg-white text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
                  >
                    <option value="critical">{t.urgencyCritical}</option>
                    <option value="urgent">{t.urgencyUrgent}</option>
                    <option value="routine">{t.urgencyRoutine}</option>
                  </select>
                </div>
              </div>

              {/* Hospital & Area */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-1">
                    {t.hospitalNameLabel} *
                  </label>
                  <input
                    type="text"
                    value={hospitalName}
                    onChange={(e) => setHospitalName(e.target.value)}
                    placeholder={language === 'bn' ? 'যেমন: ঢাকা মেডিকেল / বারডেম' : 'e.g. Dhaka Medical College'}
                    className="w-full text-sm border border-stone-300 rounded-md p-2.5 bg-white text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
                    maxLength={100}
                    required
                  />
                  {formErrors.hospitalName && (
                    <p className="text-xs text-rose-600 mt-1">{formErrors.hospitalName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-1">
                    {t.hospitalAreaLabel}
                  </label>
                  <input
                    type="text"
                    value={hospitalArea}
                    onChange={(e) => setHospitalArea(e.target.value)}
                    placeholder={language === 'bn' ? 'যেমন: শাহবাগ / মিরপুর' : 'e.g. Shahbagh'}
                    className="w-full text-sm border border-stone-300 rounded-md p-2.5 bg-white text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
                    maxLength={100}
                  />
                </div>
              </div>

              {/* Division & District */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-1">
                    {language === 'bn' ? 'বিভাগ' : 'Division'} *
                  </label>
                  <select
                    value={division}
                    onChange={(e) => {
                      setDivision(e.target.value);
                      const d = BANGLADESH_DIVISIONS.find((x) => x.id === e.target.value);
                      if (d && d.districts.length > 0) setDistrict(d.districts[0].id);
                    }}
                    className="w-full text-sm border border-stone-300 rounded-md p-2.5 bg-white text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
                  >
                    {BANGLADESH_DIVISIONS.map((d) => (
                      <option key={d.id} value={d.id}>{language === 'bn' ? d.nameBn : d.nameEn}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-1">
                    {language === 'bn' ? 'জেলা' : 'District'} *
                  </label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full text-sm border border-stone-300 rounded-md p-2.5 bg-white text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
                  >
                    {districtList.map((dist) => (
                      <option key={dist.id} value={dist.id}>{language === 'bn' ? dist.nameBn : dist.nameEn}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Needed by date */}
              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">
                  {t.neededByDateLabel} *
                </label>
                <input
                  type="datetime-local"
                  value={neededByDate}
                  onChange={(e) => setNeededByDate(e.target.value)}
                  className="w-full text-sm border border-stone-300 rounded-md p-2.5 bg-white text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
                  required
                />
                {formErrors.neededByDate && (
                  <p className="text-xs text-rose-600 mt-1">{formErrors.neededByDate}</p>
                )}
              </div>

              {/* Short Description */}
              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">
                  {t.descriptionLabel}
                </label>
                <textarea
                  value={shortDescription}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  placeholder={
                    language === 'bn'
                      ? 'রোগীর সমস্যা বা নির্দেশিকা সংক্ষেপে লিখুন (কোনো ফোন নম্বর বা ইমেইল দেবেন না)...'
                      : 'Brief clinical context (do NOT include raw phone numbers)...'
                  }
                  className="w-full text-sm border border-stone-300 rounded-md p-2.5 bg-white text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
                  maxLength={400}
                />
                <span className="text-[11px] text-stone-400 block text-right mt-1">
                  {shortDescription.length} / 400
                </span>
              </div>

              {/* Mandatory Medical Disclaimer Checkbox */}
              <div className="p-4 bg-amber-50/80 rounded-md border border-amber-200">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded-sm border-stone-300 text-emerald-800 focus:ring-emerald-700"
                    required
                  />
                  <div className="text-xs text-amber-950 leading-relaxed">
                    <span className="font-bold block mb-1">
                      {language === 'bn' ? 'চিকিৎসা সম্মতি ও সত্যতা অঙ্গীকার:' : 'Medical Consent & Truth Declaration:'}
                    </span>
                    {t.disclaimerAgreeLabel}
                  </div>
                </label>
                {formErrors.termsAccepted && (
                  <p className="text-xs text-rose-600 mt-2 font-medium">{formErrors.termsAccepted}</p>
                )}
              </div>

              {serverError && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-md text-xs text-rose-700">
                  {serverError}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 px-4 rounded-md font-bold text-sm text-white bg-rose-700 hover:bg-rose-800 transition-colors shadow-sm disabled:opacity-50"
              >
                {submitting
                  ? (language === 'bn' ? 'অনুরোধ জমা হচ্ছে...' : 'Submitting Request...')
                  : t.submitRequestBtn}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};
