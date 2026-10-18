import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { useAuth } from '../context/AuthContext.tsx';
import { fetchReceivedContactRequests, fetchSentContactRequests, updateContactStatus } from '../services/contactService.ts';
import { fetchUserBloodRequests, updateRequestStatus, deleteBloodRequest } from '../services/requestService.ts';
import { updateAvailability, togglePublicVisibility } from '../services/donorService.ts';
import type { ContactRequest, BloodRequest, AvailabilityStatus } from '../types/index.ts';
import { SEOHead } from '../components/common/SEOHead.tsx';
import {
  LayoutDashboard,
  Check,
  X,
  Clock,
  MessageSquare,
  ClipboardList,
  UserCheck,
  Eye,
  EyeOff,
  Trash2,
  CheckCircle,
  Phone,
  AlertCircle,
} from 'lucide-react';

interface DashboardPageProps {
  onNavigate: (path: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  const { language, t } = useLanguage();
  const { user, profile, isDonor, refreshProfile } = useAuth();

  const [receivedRequests, setReceivedRequests] = useState<ContactRequest[]>([]);
  const [sentRequests, setSentRequests] = useState<ContactRequest[]>([]);
  const [myBloodRequests, setMyBloodRequests] = useState<BloodRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const [availability, setAvailabilityState] = useState<AvailabilityStatus>('available');
  const [visibility, setVisibilityState] = useState(true);

  const loadDashboardData = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const [received, sent, myReqs] = await Promise.all([
        fetchReceivedContactRequests(user.uid),
        fetchSentContactRequests(user.uid),
        fetchUserBloodRequests(user.uid),
      ]);
      setReceivedRequests(received);
      setSentRequests(sent);
      setMyBloodRequests(myReqs);
      if (profile) {
        setVisibilityState(profile.consentGiven);
      }
    } catch (err) {
      console.warn('Dashboard data fetch warning:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, [user]);

  const handleAvailabilityChange = async (newStatus: AvailabilityStatus) => {
    if (!user) return;
    setAvailabilityState(newStatus);
    await updateAvailability(user.uid, newStatus);
  };

  const handleToggleVisibility = async () => {
    if (!user) return;
    const nextVal = !visibility;
    setVisibilityState(nextVal);
    await togglePublicVisibility(user.uid, nextVal);
    await refreshProfile();
  };

  const handleRespondContact = async (reqId: string, status: 'accepted' | 'declined') => {
    const contactInfoToShare = status === 'accepted' ? (profile?.phone || user?.email || 'In-app accepted') : undefined;
    await updateContactStatus(reqId, status, contactInfoToShare);
    await loadDashboardData();
  };

  const handleUpdateRequestStatus = async (id: string, newStatus: any) => {
    await updateRequestStatus(id, newStatus);
    await loadDashboardData();
  };

  const handleDeleteRequest = async (id: string) => {
    if (window.confirm(language === 'bn' ? 'আপনি কি নিশ্চিতভাবে এই রক্তের আবেদনটি মুছে ফেলতে চান?' : 'Delete this blood request?')) {
      await deleteBloodRequest(id);
      await loadDashboardData();
    }
  };

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-amber-600 mx-auto" />
        <h2 className="text-xl font-bold text-stone-900">{language === 'bn' ? 'সাইন ইন করুন' : 'Sign in Required'}</h2>
        <p className="text-xs text-stone-600">
          {language === 'bn' ? 'ড্যাশবোর্ড দেখতে অনুগ্রহ করে প্রথমে লগইন করুন।' : 'Please sign in to access your dashboard.'}
        </p>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title={t.dashboard}
        description="RoktoBondhu User Dashboard"
        noindex={true}
        canonicalPath="/dashboard"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
          <div>
            <span className="text-xs text-emerald-800 font-semibold flex items-center gap-1.5">
              <LayoutDashboard className="w-3.5 h-3.5" />
              {language === 'bn' ? 'স্বাগতম' : 'Welcome back'}, {user.displayName}
            </span>
            <h1 className="text-2xl font-extrabold text-stone-900 tracking-tight mt-0.5">
              {t.dashboard}
            </h1>
          </div>

          {!isDonor ? (
            <button
              onClick={() => onNavigate('/donor/register')}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-md text-white bg-emerald-800 hover:bg-emerald-900 shadow-xs"
            >
              <UserCheck className="w-4 h-4" />
              <span>{language === 'bn' ? 'রক্তদাতা হিসেবে সক্রিয় হোন' : 'Become a Donor'}</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleVisibility}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border ${
                  visibility
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    : 'bg-stone-100 text-stone-600 border-stone-300'
                }`}
              >
                {visibility ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span>
                  {visibility
                    ? (language === 'bn' ? 'তালিকায় প্রদর্শিত' : 'Visible in Directory')
                    : (language === 'bn' ? 'প্রোফাইল লুকানো' : 'Profile Hidden')}
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Donor Status Controls (If donor) */}
        {isDonor && (
          <div className="bg-white p-5 rounded-lg border border-stone-200 shadow-xs">
            <h2 className="text-sm font-bold text-stone-900 mb-2">
              {language === 'bn' ? 'রক্তদানের প্রাপ্যতা অবস্থা' : 'Self-Reported Donor Availability'}
            </h2>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleAvailabilityChange('available')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md border transition-colors ${
                  availability === 'available'
                    ? 'bg-emerald-800 text-white border-emerald-800'
                    : 'bg-stone-50 text-stone-700 border-stone-300 hover:bg-stone-100'
                }`}
              >
                {t.availableNow}
              </button>
              <button
                onClick={() => handleAvailabilityChange('temporarily_unavailable')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md border transition-colors ${
                  availability === 'temporarily_unavailable'
                    ? 'bg-amber-600 text-white border-amber-600'
                    : 'bg-stone-50 text-stone-700 border-stone-300 hover:bg-stone-100'
                }`}
              >
                {t.temporarilyUnavailable}
              </button>
              <button
                onClick={() => handleAvailabilityChange('paused')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md border transition-colors ${
                  availability === 'paused'
                    ? 'bg-stone-700 text-white border-stone-700'
                    : 'bg-stone-50 text-stone-700 border-stone-300 hover:bg-stone-100'
                }`}
              >
                {t.paused}
              </button>
            </div>
          </div>
        )}

        {/* Received Contact Requests (If Donor) */}
        {isDonor && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-800" />
                <span>{language === 'bn' ? 'রক্তপ্রার্থীদের কাছ থেকে আগত যোগাযোগের অনুরোধ' : 'Incoming Contact Requests'}</span>
              </h2>
              <span className="text-xs text-stone-500 font-medium">
                {receivedRequests.length} {language === 'bn' ? 'টি অনুরোধ' : 'request(s)'}
              </span>
            </div>

            {loading ? (
              <p className="text-xs text-stone-500">{t.loading}</p>
            ) : receivedRequests.length === 0 ? (
              <div className="bg-white p-6 rounded-lg border border-stone-200 text-center text-xs text-stone-500">
                {language === 'bn' ? 'কোনো অমীমাংসিত যোগাযোগের অনুরোধ নেই।' : 'No pending contact requests received.'}
              </div>
            ) : (
              <div className="space-y-3">
                {receivedRequests.map((req) => (
                  <div key={req.id} className="bg-white p-4 rounded-lg border border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-stone-900">{req.requesterDisplayLabel}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm border ${
                          req.status === 'accepted' ? 'bg-emerald-50 text-emerald-800 border-emerald-300' :
                          req.status === 'declined' ? 'bg-stone-100 text-stone-600 border-stone-300' :
                          'bg-amber-50 text-amber-800 border-amber-300'
                        }`}>
                          {req.status}
                        </span>
                      </div>
                      <p className="text-xs text-stone-700 bg-stone-50 p-2.5 rounded-md border border-stone-100">
                        {req.message}
                      </p>
                      <span className="text-[11px] text-stone-400 block">
                        {new Date(req.createdAt).toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US')}
                      </span>
                    </div>

                    {req.status === 'pending' ? (
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleRespondContact(req.id, 'accepted')}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-md text-white bg-emerald-800 hover:bg-emerald-900 shadow-xs"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>{language === 'bn' ? 'গ্রহণ করুন' : 'Accept & Share Contact'}</span>
                        </button>
                        <button
                          onClick={() => handleRespondContact(req.id, 'declined')}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-md text-stone-700 bg-stone-100 hover:bg-stone-200"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>{language === 'bn' ? 'প্রত্যাখ্যান' : 'Decline'}</span>
                        </button>
                      </div>
                    ) : (
                      <div className="text-xs text-stone-500 font-medium shrink-0">
                        {req.status === 'accepted' ? (
                          <span className="text-emerald-800 font-semibold flex items-center gap-1">
                            <CheckCircle className="w-3.5 h-3.5" />
                            {language === 'bn' ? 'যোগাযোগ অনুমোদিত' : 'Contact Shared'}
                          </span>
                        ) : (
                          <span className="text-stone-500">{language === 'bn' ? 'প্রত্যাখ্যাত' : 'Declined'}</span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Sent Contact Requests (Seeker View) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-800" />
              <span>{language === 'bn' ? 'রক্তদাতাদের প্রেরিত যোগাযোগের অনুরোধ' : 'Sent Contact Requests'}</span>
            </h2>
            <span className="text-xs text-stone-500 font-medium">
              {sentRequests.length} {language === 'bn' ? 'টি প্রেরিত' : 'sent'}
            </span>
          </div>

          {sentRequests.length === 0 ? (
            <div className="bg-white p-6 rounded-lg border border-stone-200 text-center text-xs text-stone-500">
              {language === 'bn' ? 'আপনি এখনো কোনো রক্তদাতাকে যোগাযোগের অনুরোধ পাঠাননি।' : 'You have not sent any donor contact requests yet.'}
            </div>
          ) : (
            <div className="space-y-3">
              {sentRequests.map((req) => (
                <div key={req.id} className="bg-white p-4 rounded-lg border border-stone-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-stone-500">{language === 'bn' ? 'রক্তদাতা:' : 'Donor:'}</span>
                      <strong className="text-sm text-stone-900 ml-1.5">{req.donorDisplayLabel}</strong>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm border ${
                      req.status === 'accepted' ? 'bg-emerald-50 text-emerald-800 border-emerald-300' :
                      req.status === 'declined' ? 'bg-stone-100 text-stone-600 border-stone-300' :
                      'bg-amber-50 text-amber-800 border-amber-300'
                    }`}>
                      {req.status}
                    </span>
                  </div>

                  <p className="text-xs text-stone-600 bg-stone-50 p-2.5 rounded-md border border-stone-100">
                    {req.message}
                  </p>

                  {req.status === 'accepted' && req.donorContactRevealed && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-md text-xs text-emerald-950 font-medium flex items-center justify-between">
                      <span>{language === 'bn' ? 'দাতার অনুমোদিত যোগাযোগের তথ্য:' : 'Donor Contact Details:'}</span>
                      <strong className="text-sm font-bold text-emerald-900">{req.donorContactRevealed}</strong>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* My Blood Requests */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <ClipboardList className="w-4 h-4 text-rose-700" />
              <span>{language === 'bn' ? 'আমার রক্তের আবেদনসমূহ' : 'My Blood Requests'}</span>
            </h2>
            <button
              onClick={() => onNavigate('/blood-requests/new')}
              className="text-xs text-rose-700 font-bold hover:underline"
            >
              + {t.createRequest}
            </button>
          </div>

          {myBloodRequests.length === 0 ? (
            <div className="bg-white p-6 rounded-lg border border-stone-200 text-center text-xs text-stone-500">
              {language === 'bn' ? 'আপনার কোনো সক্রিয় রক্তের আবেদন নেই।' : 'You have not submitted any blood requests.'}
            </div>
          ) : (
            <div className="space-y-3">
              {myBloodRequests.map((req) => (
                <div key={req.id} className="bg-white p-4 rounded-lg border border-stone-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <strong className="text-sm text-stone-900">{req.patientDisplayNameOrInitials}</strong>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-sm bg-rose-50 text-rose-800 border border-rose-200">
                        {req.requestedBloodGroup}
                      </span>
                      <span className="text-xs text-stone-500">({req.unitsNeeded})</span>
                    </div>
                    <p className="text-xs text-stone-600">{req.hospitalName}, {req.district}</p>
                    <span className="text-[11px] text-stone-400 block">
                      {language === 'bn' ? 'অবস্থা:' : 'Status:'} <strong className="text-stone-700">{req.status}</strong>
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {req.status === 'approved' && (
                      <button
                        onClick={() => handleUpdateRequestStatus(req.id, 'fulfilled')}
                        className="px-3 py-1.5 text-xs font-semibold rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100"
                      >
                        {language === 'bn' ? 'রক্ত পাওয়া গেছে (সম্পন্ন)' : 'Mark Fulfilled'}
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteRequest(req.id)}
                      className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                      title={language === 'bn' ? 'মুছে ফেলুন' : 'Delete'}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
