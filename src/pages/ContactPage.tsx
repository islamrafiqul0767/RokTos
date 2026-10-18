import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { SITE_CONFIG } from '../config/siteConfig.ts';
import { SEOHead } from '../components/common/SEOHead.tsx';
import { Mail, PhoneCall, ShieldAlert, Check, Send } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { language, t } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setName('');
      setEmail('');
      setMessage('');
    }, 4000);
  };

  return (
    <>
      <SEOHead
        title={t.contact}
        description="Contact the RoktoBondhu volunteer support team for inquiries, bug reports, and assistance in Bangladesh."
        canonicalPath="/contact"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
            {language === 'bn' ? 'সহায়তা ও যোগাযোগ' : 'Support & Inquiries'}
          </span>
          <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">
            {t.contact}
          </h1>
          <p className="text-xs sm:text-sm text-stone-600">
            {language === 'bn'
              ? 'প্ল্যাটফর্ম সম্পর্কিত পরামর্শ, কারিগরি ত্রুটি বা নীতিমালার বিষয়ে আমাদের সাথে যোগাযোগ করুন।'
              : 'Reach out to the RoktoBondhu technical and moderation team.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Direct Channels */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-xs space-y-4">
              <h2 className="text-base font-bold text-stone-900 border-b border-stone-100 pb-2">
                {language === 'bn' ? 'অফিসিয়াল যোগাযোগ চ্যানেল' : 'Direct Support Channels'}
              </h2>

              <div className="space-y-3 text-xs text-stone-700">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-stone-900">{language === 'bn' ? 'সাপোর্ট ও যোগাযোগ ইমেইল' : 'Support Email'}</span>
                    <a href={`mailto:${SITE_CONFIG.supportEmail}`} className="text-emerald-900 underline font-medium">
                      {SITE_CONFIG.supportEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <PhoneCall className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-stone-900">{language === 'bn' ? 'জাতীয় জরুরি হটলাইন' : 'National Emergency Call'}</span>
                    <span>৯৯৯ (তাৎক্ষণিক পুলিশ, অ্যাম্বুলেন্স ও জরুরি সেবা)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <PhoneCall className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-stone-900">{language === 'bn' ? 'স্বাস্থ্য বাতায়ন (সরকারি ২৪/৭)' : 'National Health Hotline'}</span>
                    <span>১৬২৬৩ (সরকারি স্বাস্থ্য পরামর্শ ও ব্লাড ব্যাংক নির্দেশনা)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-950 space-y-1">
              <span className="font-bold block text-amber-900">{language === 'bn' ? 'জরুরি বিজ্ঞপ্তি:' : 'Emergency Notice:'}</span>
              <p>
                রক্তবন্ধু কোনো জরুরি রক্ত ডেলিভারি প্রদান করে না। কোনো মুমূর্ষু রোগীর দ্রুত রক্তের প্রয়োজন হলে সরাসরি সরকারি হাসপাতাল বা ব্লাড ব্যাংকে যোগাযোগ করুন।
              </p>
            </div>
          </div>

          {/* Feedback & Inquiries Form */}
          <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-xs">
            <h2 className="text-base font-bold text-stone-900 mb-4">
              {language === 'bn' ? 'বার্তা পাঠান' : 'Send a Message'}
            </h2>

            {sent ? (
              <div className="py-8 text-center text-emerald-800 space-y-2">
                <Check className="w-10 h-10 mx-auto bg-emerald-100 p-2 rounded-full text-emerald-700" />
                <h4 className="font-bold text-sm">
                  {language === 'bn' ? 'আপনার বার্তা গৃহীত হয়েছে!' : 'Message Received!'}
                </h4>
                <p className="text-xs text-stone-600">
                  {language === 'bn' ? 'আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।' : 'We will review your message shortly.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {language === 'bn' ? 'আপনার নাম' : 'Your Name'} *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-sm border border-stone-300 rounded-md p-2 bg-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {language === 'bn' ? 'ইমেইল অ্যাড্রেস' : 'Your Email'} *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-sm border border-stone-300 rounded-md p-2 bg-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {language === 'bn' ? 'বার্তা বা অভিযোগ' : 'Message or Feedback'} *
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="w-full text-sm border border-stone-300 rounded-md p-2 bg-white"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-md flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'বার্তা প্রেরণ করুন' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
