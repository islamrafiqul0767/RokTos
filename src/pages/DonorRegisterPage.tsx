import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { useAuth } from '../context/AuthContext.tsx';
import { registerOrUpdateDonor } from '../services/donorService.ts';
import { validateDonorRegistration } from '../utils/validation.ts';
import { BANGLADESH_DIVISIONS, BLOOD_GROUPS } from '../config/bangladeshData.ts';
import { SEOHead } from '../components/common/SEOHead.tsx';
import type { BloodGroup, UserPrivateProfile } from '../types/index.ts';
import { UserCheck, ShieldCheck, Check, AlertCircle, LogIn } from 'lucide-react';

interface DonorRegisterPageProps {
  onNavigate: (path: string) => void;
}

export const DonorRegisterPage: React.FC<DonorRegisterPageProps> = ({ onNavigate }) => {
  const { language, t } = useLanguage();
  const { user, profile, signInWithGoogle, refreshProfile } = useAuth();

  const [displayName, setDisplayName] = useState('');
  const [bloodGroup, setBloodGroup] = useState<BloodGroup>('O+');
  const [phone, setPhone] = useState('');
  const [division, setDivision] = useState('dhaka');
  const [district, setDistrict] = useState('dhaka_city');
  const [upazila, setUpazila] = useState('');
  const [approximateArea, setApproximateArea] = useState('');
  const [preferredContactChannel, setContactChannel] = useState<'in_app' | 'phone' | 'email'>('in_app');

  const [ageConfirmed18, setAgeConfirmed] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.displayName || '');
      setPhone(profile.phone || '');
      if (profile.bloodGroup && profile.bloodGroup !== 'Unknown') setBloodGroup(profile.bloodGroup);
      if (profile.division) setDivision(profile.division);
      if (profile.district) setDistrict(profile.district);
      if (profile.approximateArea) setApproximateArea(profile.approximateArea);
      if (profile.consentGiven) setConsentGiven(true);
      if (profile.ageConfirmed18) setAgeConfirmed(true);
    } else if (user) {
      setDisplayName(user.displayName || '');
    }
  }, [profile, user]);

  const currentDivData = BANGLADESH_DIVISIONS.find((d) => d.id === division);
  const districtList = currentDivData ? currentDivData.districts : [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setServerError(language === 'bn' ? 'নিবন্ধন করতে অনুগ্রহ করে সাইন ইন করুন।' : 'Please sign in to register.');
      return;
    }

    const validation = validateDonorRegistration({
      displayName,
      bloodGroup,
      division,
      district,
      ageConfirmed18,
      termsAccepted,
      consentGiven,
    });

    if (!validation.isValid) {
      setFormErrors(validation.errors);
      return;
    }

    setFormErrors({});
    setSubmitting(true);
    setServerError(null);

    try {
      const privateDoc: UserPrivateProfile = {
        uid: user.uid,
        displayName: displayName.trim(),
        email: user.email || '',
        phone: phone.trim() || undefined,
        preferredLanguage: language,
        division,
        district,
        upazila,
        approximateArea: approximateArea.trim(),
        preferredContactChannel,
        role: profile?.role || 'donor',
        isDonor: true,
        bloodGroup,
        identityReviewStatus: profile?.identityReviewStatus || 'not_started',
        bloodGroupReviewStatus: profile?.bloodGroupReviewStatus || 'not_started',
        consentGiven,
        consentVersion: '2026-v1',
        ageConfirmed18,
        termsAccepted,
        createdAt: profile?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await registerOrUpdateDonor(privateDoc);
      await refreshProfile();
      setSuccess(true);
      setTimeout(() => {
        onNavigate('/dashboard');
      }, 2500);
    } catch (err: any) {
      setServerError(err?.message || 'Failed to complete registration');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEOHead
        title={t.donorRegistrationTitle}
        description={t.donorRegistrationSubtitle}
        noindex={true}
        canonicalPath="/donor/register"
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-lg border border-stone-200 shadow-sm p-6 sm:p-8">
          <div className="border-b border-stone-200 pb-5 mb-6">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 text-xs font-bold mb-2">
              <UserCheck className="w-3.5 h-3.5" />
              {language === 'bn' ? 'স্বেচ্ছাসেবী রক্তদাতা নিবন্ধন' : 'Volunteer Donor Onboarding'}
            </span>
            <h1 className="text-2xl font-extrabold text-stone-900">{t.donorRegistrationTitle}</h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">{t.donorRegistrationSubtitle}</p>
          </div>

          {!user ? (
            <div className="p-8 bg-stone-50 rounded-lg border border-stone-200 text-center space-y-4">
              <AlertCircle className="w-10 h-10 text-amber-600 mx-auto" />
              <h3 className="font-bold text-stone-800 text-base">
                {language === 'bn' ? 'নিবন্ধনের পূর্বে সাইন ইন আবশ্যক' : 'Sign in Required'}
              </h3>
              <p className="text-xs text-stone-600 max-w-md mx-auto">
                {language === 'bn'
                  ? 'আপনার প্রোফাইল সুরক্ষিত রাখতে এবং ভুয়া তথ্য প্রতিরোধ করতে গুগল অ্যাকাউন্ট দিয়ে লগইন করুন।'
                  : 'Please authenticate with Google to link and manage your donor profile.'}
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
                {language === 'bn' ? 'রক্তদাতা হিসেবে নিবন্ধন সম্পন্ন হয়েছে!' : 'Donor Registration Complete!'}
              </h2>
              <p className="text-xs text-stone-600 max-w-md mx-auto">
                {language === 'bn'
                  ? 'আপনার অবদানকে আমরা শ্রদ্ধা জানাই। ড্যাশবোর্ড থেকে আপনি যেকোনো সময় আপনার প্রাপ্যতা বা প্রদর্শন নিয়ন্ত্রণ করতে পারেন।'
                  : 'Thank you for your volunteer readiness. You can manage your availability or pause contact anytime from your dashboard.'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name & Blood Group */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-1">
                    {t.displayNameLabel} *
                  </label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full text-sm border border-stone-300 rounded-md p-2.5 bg-white text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
                    maxLength={100}
                    required
                  />
                  {formErrors.displayName && (
                    <p className="text-xs text-rose-600 mt-1">{formErrors.displayName}</p>
                  )}
                  <span className="text-[11px] text-stone-400 block mt-1">
                    {language === 'bn' ? 'সর্বজনীন তালিকায় আপনার নামের শেষের অংশ সংক্ষেপ করা হবে (যেমন: রফিক ই.)' : 'Public display name will be privacy-masked (e.g. Rafiq I.)'}
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-1">
                    {language === 'bn' ? 'আপনার রক্তের গ্রুপ' : 'Your Blood Group'} *
                  </label>
                  <select
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value as BloodGroup)}
                    className="w-full text-sm border border-stone-300 rounded-md p-2.5 bg-white text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-700 font-bold"
                  >
                    {BLOOD_GROUPS.map((bg) => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                    <option value="Unknown">{language === 'bn' ? 'অনিশ্চিত' : 'Unknown'}</option>
                  </select>
                </div>
              </div>

              {/* Private Phone & Preferred Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-1">
                    {t.phoneLabel}
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="01XXXXXXXXX"
                    className="w-full text-sm border border-stone-300 rounded-md p-2.5 bg-white text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
                    maxLength={20}
                  />
                  <span className="text-[11px] text-emerald-800 block mt-1 font-medium">
                    {language === 'bn'
                      ? '🔒 এই নম্বরটি কোনো সাধারণ পাবলিক পেজে দৃশ্যমান হবে না।'
                      : '🔒 This number will NEVER be displayed on open public search pages.'}
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-1">
                    {t.preferredContactLabel}
                  </label>
                  <select
                    value={preferredContactChannel}
                    onChange={(e) => setContactChannel(e.target.value as any)}
                    className="w-full text-sm border border-stone-300 rounded-md p-2.5 bg-white text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
                  >
                    <option value="in_app">{language === 'bn' ? 'ইন-অ্যাপ বার্তা (সর্বাধিক নিরাপদ)' : 'In-App Request (Recommended)'}</option>
                    <option value="phone">{language === 'bn' ? 'অনুরোধ গ্রহণের পর ফোন নম্বর' : 'Phone Call (Only after acceptance)'}</option>
                    <option value="email">{language === 'bn' ? 'ইমেইল যোগাযোগ' : 'Email Only'}</option>
                  </select>
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

              {/* Approximate area */}
              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">
                  {t.areaLabel}
                </label>
                <input
                  type="text"
                  value={approximateArea}
                  onChange={(e) => setApproximateArea(e.target.value)}
                  placeholder={language === 'bn' ? 'যেমন: ধানমন্ডি / মিরপুর ১০' : 'e.g. Dhanmondi, Mirpur 10'}
                  className="w-full text-sm border border-stone-300 rounded-md p-2.5 bg-white text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
                  maxLength={100}
                />
                <span className="text-[11px] text-stone-400 block mt-1">
                  {language === 'bn'
                    ? 'আপনার বাসা বা বাড়ির নির্দিষ্ট ঠিকানা দেবেন না। শুধুমাত্র এলাকা উল্লেখ করুন।'
                    : 'Do not provide exact house or flat numbers. State only the general neighborhood.'}
                </span>
              </div>

              {/* Explicit Consents & Eligibility Confirmations */}
              <div className="space-y-3 pt-3 border-t border-stone-200">
                {/* 18+ Check */}
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={ageConfirmed18}
                    onChange={(e) => setAgeConfirmed(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded-sm border-stone-300 text-emerald-800 focus:ring-emerald-700"
                    required
                  />
                  <div className="text-xs text-stone-800 leading-relaxed">
                    <span className="font-semibold block">{t.ageConfirmationLabel}</span>
                    <span className="text-stone-500 text-[11px]">
                      {language === 'bn'
                        ? 'আমরা অপ্রাপ্তবয়স্কদের রক্তদানে নিরুৎসাহিত করি। বয়স ছাড়াও রক্তের স্ক্রিনিং অনুযায়ী শারীরিক সুস্থতা আবশ্যক।'
                        : 'We do not encourage minors to donate. Blood-centre clinical screening determines final eligibility.'}
                    </span>
                  </div>
                </label>
                {formErrors.ageConfirmed18 && (
                  <p className="text-xs text-rose-600 pl-7">{formErrors.ageConfirmed18}</p>
                )}

                {/* Terms Acceptance */}
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded-sm border-stone-300 text-emerald-800 focus:ring-emerald-700"
                    required
                  />
                  <div className="text-xs text-stone-800 leading-relaxed">
                    <span className="font-semibold block">{t.termsAgreementLabel}</span>
                  </div>
                </label>
                {formErrors.termsAccepted && (
                  <p className="text-xs text-rose-600 pl-7">{formErrors.termsAccepted}</p>
                )}

                {/* Explicit Privacy Consent for Public Directory */}
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consentGiven}
                    onChange={(e) => setConsentGiven(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded-sm border-stone-300 text-emerald-800 focus:ring-emerald-700"
                    required
                  />
                  <div className="text-xs text-stone-800 leading-relaxed">
                    <span className="font-semibold block">{t.consentAgreementLabel}</span>
                    <span className="text-stone-500 text-[11px]">
                      {language === 'bn'
                        ? 'আপনি যেকোনো সময় আপনার ড্যাশবোর্ড থেকে এই সম্মতি প্রত্যাহার বা তালিকা থেকে নিজেকে গোপন করতে পারবেন।'
                        : 'You can withdraw consent or hide your public profile anytime in Settings.'}
                    </span>
                  </div>
                </label>
                {formErrors.consentGiven && (
                  <p className="text-xs text-rose-600 pl-7">{formErrors.consentGiven}</p>
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
                className="w-full py-3.5 px-4 rounded-md font-bold text-sm text-white bg-emerald-800 hover:bg-emerald-900 transition-colors shadow-sm disabled:opacity-50"
              >
                {submitting
                  ? (language === 'bn' ? 'সংরক্ষণ হচ্ছে...' : 'Saving Profile...')
                  : t.registerAsDonorBtn}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};
