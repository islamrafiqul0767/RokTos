import React from 'react';
import { useLanguage } from '../../context/LanguageContext.tsx';
import { SITE_CONFIG } from '../../config/siteConfig.ts';
import { RoktosLogo } from '../common/RoktosLogo.tsx';
import { PhoneCall, Mail, ShieldAlert, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { language, t } = useLanguage();

  return (
    <footer className="bg-slate-950 text-slate-300 pt-12 pb-8 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-slate-800">
          {/* Col 1: Brand & Identity */}
          <div className="lg:col-span-2 space-y-3">
            <button
              onClick={() => onNavigate('/')}
              className="text-left group transition-opacity hover:opacity-95"
              aria-label="ROKTOS Home"
            >
              <RoktosLogo variant="horizontal" theme="dark" size="md" />
            </button>
            <p className="text-stone-400 leading-relaxed text-xs max-w-sm">
              {language === 'bn' ? SITE_CONFIG.taglineBn : SITE_CONFIG.taglineEn}
            </p>
            <div className="p-3 bg-stone-800/80 rounded-md border border-stone-700/80 text-[11px] leading-relaxed text-stone-300">
              <span className="font-bold text-amber-400 block mb-1">
                {language === 'bn' ? 'জরুরি সেবা ও চিকিৎসা সতর্কীকরণ:' : 'Emergency & Clinical Notice:'}
              </span>
              {language === 'bn' ? SITE_CONFIG.authoritativeDisclaimerBn : SITE_CONFIG.authoritativeDisclaimerEn}
            </div>
          </div>

          {/* Col 2: Services & Actions */}
          <div className="space-y-2">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-2">
              {language === 'bn' ? 'সেবাসমূহ' : 'Platform Services'}
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('/donors')} className="hover:text-white transition-colors">
                  {t.searchDonors}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/blood-requests')} className="hover:text-white transition-colors">
                  {t.viewRequests}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/blood-requests/new')} className="hover:text-white transition-colors font-medium text-rose-400">
                  {t.createRequest}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/donor/register')} className="hover:text-white transition-colors">
                  {language === 'bn' ? 'রক্তদাতা নিবন্ধন' : 'Donor Onboarding'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/how-it-works')} className="hover:text-white transition-colors">
                  {t.howItWorks}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Guidelines & Education */}
          <div className="space-y-2">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-2">
              {language === 'bn' ? 'নির্দেশিকা ও তথ্য' : 'Guidelines & Health'}
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('/safety')} className="hover:text-white transition-colors">
                  {t.safety}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/donor-eligibility')} className="hover:text-white transition-colors">
                  {t.eligibility}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/verification-policy')} className="hover:text-white transition-colors">
                  {t.verificationPolicy}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/community-guidelines')} className="hover:text-white transition-colors">
                  {t.communityGuidelines}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/faq')} className="hover:text-white transition-colors">
                  {t.faq}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/about')} className="hover:text-white transition-colors">
                  {t.aboutUs}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & Policies */}
          <div className="space-y-2">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-2">
              {language === 'bn' ? 'নীতিমালা ও সহায়তা' : 'Policies & Support'}
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('/privacy')} className="hover:text-white transition-colors">
                  {t.privacyPolicy}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/terms')} className="hover:text-white transition-colors">
                  {t.termsOfUse}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/editorial-policy')} className="hover:text-white transition-colors">
                  {t.editorialPolicy}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/accessibility')} className="hover:text-white transition-colors">
                  {t.accessibility}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/contact')} className="hover:text-white transition-colors">
                  {t.contact}
                </button>
              </li>
            </ul>

            {/* Hotlines */}
            <div className="pt-2 text-[11px] text-stone-400 space-y-1">
              <div className="flex items-center gap-1.5 text-stone-300">
                <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                <span>জাতীয় জরুরি সেবা: ৯৯৯</span>
              </div>
              <div className="flex items-center gap-1.5 text-stone-300">
                <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                <span>স্বাস্থ্য বাতায়ন: ১৬২৬৩</span>
              </div>
              <div className="flex items-center gap-1.5 text-stone-300">
                <Mail className="w-3.5 h-3.5 text-stone-400" />
                <span>{SITE_CONFIG.supportEmail}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-stone-400 text-[11px]">
          <p>
            © {new Date().getFullYear()} {SITE_CONFIG.nameBn} / {SITE_CONFIG.nameEn}.
            {' '}
            {language === 'bn'
              ? 'একটি অবাণিজ্যিক ও মানবিক উন্মুক্ত প্ল্যাটফর্ম।'
              : 'A non-commercial community volunteer initiative.'}
          </p>
          <div className="flex items-center gap-2">
            <span>{language === 'bn' ? 'সংস্করণ:' : 'Version:'} {SITE_CONFIG.version}</span>
            <span>•</span>
            <span>{language === 'bn' ? 'নীতিমালা কোড:' : 'Policy:'} {SITE_CONFIG.policyVersion}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
