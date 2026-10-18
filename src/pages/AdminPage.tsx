import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { useAuth } from '../context/AuthContext.tsx';
import {
  fetchVerificationReviews,
  submitVerificationDecision,
  setDonorModeration,
  setRequestModeration,
  fetchModerationActions,
} from '../services/adminService.ts';
import { fetchAllReports, resolveReport } from '../services/reportService.ts';
import { fetchPublicDonors } from '../services/donorService.ts';
import { fetchPublicBloodRequests } from '../services/requestService.ts';
import { seedDemoDataIfEmpty } from '../services/seedService.ts';
import type {
  PublicDonorProfile,
  BloodRequest,
  UserReport,
  VerificationReview,
  ModerationAction,
  ReviewStatus,
  ModerationStatus,
} from '../types/index.ts';
import { SEOHead } from '../components/common/SEOHead.tsx';
import {
  ShieldAlert,
  Users,
  ClipboardList,
  AlertOctagon,
  FileText,
  Database,
  Check,
  X,
  RefreshCw,
  ShieldCheck,
  UserCheck,
  Lock,
} from 'lucide-react';

export const AdminPage: React.FC = () => {
  const { language, t } = useLanguage();
  const { user, isAdmin } = useAuth();

  const [activeTab, setActiveTab] = useState<'donors' | 'requests' | 'verifications' | 'reports' | 'audit' | 'seed'>('donors');
  const [loading, setLoading] = useState(true);

  const [donors, setDonors] = useState<PublicDonorProfile[]>([]);
  const [requests, setRequests] = useState<BloodRequest[]>([]);
  const [reports, setReports] = useState<UserReport[]>([]);
  const [reviews, setReviews] = useState<VerificationReview[]>([]);
  const [auditLogs, setAuditLogs] = useState<ModerationAction[]>([]);

  // Verification modal / input states
  const [targetUid, setTargetUid] = useState('');
  const [targetLabel, setTargetLabel] = useState('');
  const [verType, setVerType] = useState<'identity' | 'blood_group'>('identity');
  const [verDecision, setVerDecision] = useState<ReviewStatus>('reviewed');
  const [verReason, setVerReason] = useState('MANUAL_REVIEW_VERIFIED');
  const [verNotes, setVerNotes] = useState('');
  const [verSuccessMsg, setVerSuccessMsg] = useState<string | null>(null);

  const loadAdminData = async () => {
    if (!isAdmin) return;
    setLoading(true);
    try {
      const [d, r, rep, rev, logs] = await Promise.all([
        fetchPublicDonors(),
        fetchPublicBloodRequests(),
        fetchAllReports(),
        fetchVerificationReviews(),
        fetchModerationActions(),
      ]);
      setDonors(d);
      setRequests(r);
      setReports(rep);
      setReviews(rev);
      setAuditLogs(logs);
    } catch (err) {
      console.warn('Admin load error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      loadAdminData();
    }
  }, [isAdmin]);

  const handleModerationDonor = async (uid: string, status: ModerationStatus) => {
    if (!user) return;
    await setDonorModeration(uid, status, user.uid, `STAFF_DECISION_${status}`);
    await loadAdminData();
  };

  const handleModerationRequest = async (requestId: string, status: ModerationStatus) => {
    if (!user) return;
    await setRequestModeration(requestId, status, user.uid, `STAFF_DECISION_${status}`);
    await loadAdminData();
  };

  const handleResolveReport = async (reportId: string, resolution: 'resolved' | 'dismissed') => {
    await resolveReport(reportId, resolution, 'Staff reviewed and resolved.');
    await loadAdminData();
  };

  const handleSubmitVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !targetUid.trim()) return;

    await submitVerificationDecision({
      targetUid: targetUid.trim(),
      userDisplayLabel: targetLabel.trim() || 'User',
      type: verType,
      status: verDecision,
      reviewerUid: user.uid,
      reasonCode: verReason,
      notes: verNotes,
    });

    setVerSuccessMsg('Verification decision recorded and applied.');
    setTimeout(() => setVerSuccessMsg(null), 3000);
    setTargetUid('');
    setTargetLabel('');
    setVerNotes('');
    await loadAdminData();
  };

  const handleSeed = async () => {
    setLoading(true);
    await seedDemoDataIfEmpty();
    await loadAdminData();
  };

  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-white border border-stone-200 rounded-lg text-center shadow-xs">
        <Lock className="w-12 h-12 text-rose-700 mx-auto mb-3" />
        <h2 className="text-lg font-bold text-stone-900 mb-1">
          {language === 'bn' ? 'অননুমোদিত প্রবেশাধিকার' : 'Unauthorized Access'}
        </h2>
        <p className="text-xs text-stone-600 leading-relaxed">
          {language === 'bn'
            ? 'এই পৃষ্ঠাটি কেবল রক্তবন্ধুর অনুমোদিত পর্যালোচক ও অ্যাডমিনের জন্য সংরক্ষিত।'
            : 'This page is restricted strictly to authorized moderators and platform administrators.'}
        </p>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title={t.adminConsole}
        description="RoktoBondhu Staff Console"
        noindex={true}
        canonicalPath="/admin"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
          <div>
            <span className="text-xs font-bold text-rose-700 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4" />
              {language === 'bn' ? 'নিরাপত্তা ও প্রশাসন' : 'Staff Security Console'}
            </span>
            <h1 className="text-2xl font-black text-stone-900 tracking-tight mt-0.5">
              {t.adminTitle}
            </h1>
          </div>

          <button
            onClick={loadAdminData}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md border border-stone-300 text-stone-700 hover:bg-stone-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>{language === 'bn' ? 'রিফ্রেশ ডেটা' : 'Refresh Data'}</span>
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-stone-200 pb-2">
          <button
            onClick={() => setActiveTab('donors')}
            className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors ${
              activeTab === 'donors'
                ? 'bg-emerald-900 text-white'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            {t.tabDonors} ({donors.length})
          </button>
          <button
            onClick={() => setActiveTab('requests')}
            className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors ${
              activeTab === 'requests'
                ? 'bg-emerald-900 text-white'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            {t.tabRequests} ({requests.length})
          </button>
          <button
            onClick={() => setActiveTab('verifications')}
            className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors ${
              activeTab === 'verifications'
                ? 'bg-emerald-900 text-white'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            {t.tabVerifications} ({reviews.length})
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors ${
              activeTab === 'reports'
                ? 'bg-emerald-900 text-white'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            {t.tabReports} ({reports.length})
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors ${
              activeTab === 'audit'
                ? 'bg-emerald-900 text-white'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            {t.tabAudit} ({auditLogs.length})
          </button>
          <button
            onClick={() => setActiveTab('seed')}
            className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors ${
              activeTab === 'seed'
                ? 'bg-emerald-900 text-white'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            {t.tabSeed}
          </button>
        </div>

        {/* Tab 1: Donors Queue */}
        {activeTab === 'donors' && (
          <div className="bg-white rounded-lg border border-stone-200 shadow-xs overflow-x-auto">
            <table className="w-full text-left text-xs text-stone-800">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold uppercase text-[11px]">
                <tr>
                  <th className="p-3">দাতার নাম / Label</th>
                  <th className="p-3">গ্রুপ</th>
                  <th className="p-3">এলাকা</th>
                  <th className="p-3">যাচাই অবস্থা</th>
                  <th className="p-3">মডারেশন</th>
                  <th className="p-3">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {donors.map((d) => (
                  <tr key={d.uid} className="hover:bg-stone-50">
                    <td className="p-3 font-semibold text-stone-900">{d.displayLabel}</td>
                    <td className="p-3 font-extrabold text-rose-700">{d.bloodGroup}</td>
                    <td className="p-3 text-stone-500">{d.district}</td>
                    <td className="p-3">
                      <span className="block text-[11px]">ID: {d.identityReviewStatus}</span>
                      <span className="block text-[11px]">BG: {d.bloodGroupReviewStatus}</span>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-sm font-bold text-[10px] ${
                        d.moderationStatus === 'approved' ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'
                      }`}>
                        {d.moderationStatus}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleModerationDonor(d.uid, 'approved')}
                          className="px-2 py-1 text-[11px] font-semibold bg-emerald-800 hover:bg-emerald-900 text-white rounded-sm"
                        >
                          {t.approveBtn}
                        </button>
                        <button
                          onClick={() => handleModerationDonor(d.uid, 'rejected')}
                          className="px-2 py-1 text-[11px] font-semibold bg-rose-700 hover:bg-rose-800 text-white rounded-sm"
                        >
                          {t.rejectBtn}
                        </button>
                        <button
                          onClick={() => {
                            setTargetUid(d.uid);
                            setTargetLabel(d.displayLabel);
                            setActiveTab('verifications');
                          }}
                          className="px-2 py-1 text-[11px] font-semibold bg-teal-800 hover:bg-teal-900 text-white rounded-sm"
                        >
                          {language === 'bn' ? 'যাচাই করুন' : 'Verify'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 2: Requests Queue */}
        {activeTab === 'requests' && (
          <div className="bg-white rounded-lg border border-stone-200 shadow-xs overflow-x-auto">
            <table className="w-full text-left text-xs text-stone-800">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold uppercase text-[11px]">
                <tr>
                  <th className="p-3">রোগী / আদ্যক্ষর</th>
                  <th className="p-3">গ্রুপ ও ব্যাগ</th>
                  <th className="p-3">হাসপাতাল ও এলাকা</th>
                  <th className="p-3">জরুরিতা</th>
                  <th className="p-3">অবস্থা</th>
                  <th className="p-3">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {requests.map((r) => (
                  <tr key={r.id} className="hover:bg-stone-50">
                    <td className="p-3 font-semibold text-stone-900">{r.patientDisplayNameOrInitials}</td>
                    <td className="p-3 font-extrabold text-rose-700">{r.requestedBloodGroup} ({r.unitsNeeded})</td>
                    <td className="p-3 text-stone-600">{r.hospitalName}, {r.district}</td>
                    <td className="p-3 font-bold text-stone-700 uppercase text-[10px]">{r.urgencyLevel}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-sm font-bold text-[10px] ${
                        r.status === 'approved' ? 'bg-emerald-50 text-emerald-800' : 'bg-stone-100 text-stone-700'
                      }`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleModerationRequest(r.id, 'approved')}
                          className="px-2 py-1 text-[11px] font-semibold bg-emerald-800 hover:bg-emerald-900 text-white rounded-sm"
                        >
                          {t.approveBtn}
                        </button>
                        <button
                          onClick={() => handleModerationRequest(r.id, 'rejected')}
                          className="px-2 py-1 text-[11px] font-semibold bg-rose-700 hover:bg-rose-800 text-white rounded-sm"
                        >
                          {t.rejectBtn}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 3: Verification Review Form & Records */}
        {activeTab === 'verifications' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-lg border border-stone-200 shadow-xs lg:col-span-1">
              <h2 className="text-sm font-bold text-stone-900 mb-3 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-800" />
                <span>{language === 'bn' ? 'যাচাইকরণ সিদ্ধান্ত প্রয়োগ' : 'Record Verification Decision'}</span>
              </h2>

              <form onSubmit={handleSubmitVerification} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                    দাতার UID / Target UID *
                  </label>
                  <input
                    type="text"
                    value={targetUid}
                    onChange={(e) => setTargetUid(e.target.value)}
                    placeholder="e.g. demo_donor_1"
                    className="w-full text-xs border border-stone-300 rounded-md p-2 bg-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                    দাতার নাম / Label
                  </label>
                  <input
                    type="text"
                    value={targetLabel}
                    onChange={(e) => setTargetLabel(e.target.value)}
                    placeholder="e.g. Asif Mahmud"
                    className="w-full text-xs border border-stone-300 rounded-md p-2 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                    যাচাইকরণের ধরন
                  </label>
                  <select
                    value={verType}
                    onChange={(e) => setVerType(e.target.value as any)}
                    className="w-full text-xs border border-stone-300 rounded-md p-2 bg-white"
                  >
                    <option value="identity">{language === 'bn' ? 'জাতীয় পরিচয় / Identity' : 'Identity'}</option>
                    <option value="blood_group">{language === 'bn' ? 'রক্তের গ্রুপ প্রমাণ / Blood Group' : 'Blood Group Evidence'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                    সিদ্ধান্ত / Decision
                  </label>
                  <select
                    value={verDecision}
                    onChange={(e) => setVerDecision(e.target.value as any)}
                    className="w-full text-xs border border-stone-300 rounded-md p-2 bg-white font-bold"
                  >
                    <option value="reviewed">{language === 'bn' ? 'পর্যালোচিত (Reviewed)' : 'Reviewed'}</option>
                    <option value="rejected">{language === 'bn' ? 'প্রত্যাখ্যাত (Rejected)' : 'Rejected'}</option>
                    <option value="needs_recheck">{language === 'bn' ? 'পুনঃপরীক্ষা আবশ্যক' : 'Needs Recheck'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                    পর্যালোচকের মন্তব্য
                  </label>
                  <textarea
                    value={verNotes}
                    onChange={(e) => setVerNotes(e.target.value)}
                    rows={2}
                    className="w-full text-xs border border-stone-300 rounded-md p-2 bg-white"
                    placeholder="Audit reason notes..."
                  />
                </div>

                {verSuccessMsg && (
                  <p className="text-xs text-emerald-800 bg-emerald-50 p-2 rounded-md font-semibold">
                    {verSuccessMsg}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full py-2 px-3 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-md"
                >
                  {language === 'bn' ? 'সিদ্ধান্ত সংরক্ষণ করুন' : 'Apply Decision'}
                </button>
              </form>
            </div>

            <div className="bg-white rounded-lg border border-stone-200 shadow-xs lg:col-span-2 overflow-x-auto">
              <div className="p-3 border-b border-stone-200 font-bold text-xs text-stone-900">
                {language === 'bn' ? 'পূর্বে গৃহীত যাচাই সিদ্ধান্তসমূহ' : 'Audit Trail of Verification Reviews'}
              </div>
              <table className="w-full text-left text-xs text-stone-800">
                <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="p-3">দাতার নাম / UID</th>
                    <th className="p-3">ধরন</th>
                    <th className="p-3">অবস্থা</th>
                    <th className="p-3">মন্তব্য</th>
                    <th className="p-3">তারিখ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {reviews.map((rev) => (
                    <tr key={rev.id} className="hover:bg-stone-50">
                      <td className="p-3 font-semibold text-stone-900">{rev.userDisplayLabel || rev.uid}</td>
                      <td className="p-3 font-medium text-stone-700">{rev.type}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded-sm bg-emerald-50 text-emerald-800 font-bold text-[10px]">
                          {rev.status}
                        </span>
                      </td>
                      <td className="p-3 text-stone-500">{rev.reviewerNotes || rev.reasonCode}</td>
                      <td className="p-3 text-stone-400 text-[11px]">{new Date(rev.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: Reports */}
        {activeTab === 'reports' && (
          <div className="bg-white rounded-lg border border-stone-200 shadow-xs overflow-x-auto">
            <table className="w-full text-left text-xs text-stone-800">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold uppercase text-[11px]">
                <tr>
                  <th className="p-3">লক্ষ্যবস্তু</th>
                  <th className="p-3">ক্যাটেগরি</th>
                  <th className="p-3">অভিযোগের বিবরণ</th>
                  <th className="p-3">অবস্থা</th>
                  <th className="p-3">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {reports.map((rep) => (
                  <tr key={rep.id} className="hover:bg-stone-50">
                    <td className="p-3 font-semibold text-stone-900">{rep.targetTitleOrName} ({rep.targetType})</td>
                    <td className="p-3 font-bold text-rose-700 uppercase text-[10px]">{rep.category}</td>
                    <td className="p-3 text-stone-700 max-w-xs">{rep.explanation}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-sm font-bold text-[10px] ${
                        rep.status === 'resolved' ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800'
                      }`}>
                        {rep.status}
                      </span>
                    </td>
                    <td className="p-3">
                      {rep.status === 'pending' && (
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleResolveReport(rep.id, 'resolved')}
                            className="px-2 py-1 text-[11px] font-semibold bg-emerald-800 hover:bg-emerald-900 text-white rounded-sm"
                          >
                            {t.resolveBtn}
                          </button>
                          <button
                            onClick={() => handleResolveReport(rep.id, 'dismissed')}
                            className="px-2 py-1 text-[11px] font-semibold bg-stone-200 text-stone-700 rounded-sm"
                          >
                            Dismiss
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 5: Audit Log */}
        {activeTab === 'audit' && (
          <div className="bg-white rounded-lg border border-stone-200 shadow-xs overflow-x-auto">
            <table className="w-full text-left text-xs text-stone-800">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold uppercase text-[11px]">
                <tr>
                  <th className="p-3">অ্যাকশন</th>
                  <th className="p-3">টার্গেট</th>
                  <th className="p-3">কারণ / কোড</th>
                  <th className="p-3">অ্যাক্টর UID</th>
                  <th className="p-3">তারিখ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-stone-50">
                    <td className="p-3 font-mono font-bold text-emerald-900">{log.action}</td>
                    <td className="p-3 text-stone-700">{log.targetType} ({log.targetId})</td>
                    <td className="p-3 text-stone-500">{log.reasonCode}</td>
                    <td className="p-3 text-stone-400 font-mono text-[11px]">{log.actorUid}</td>
                    <td className="p-3 text-stone-400 text-[11px]">{new Date(log.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 6: Seed Demo Data */}
        {activeTab === 'seed' && (
          <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-xs max-w-xl space-y-4">
            <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
              <Database className="w-5 h-5 text-emerald-800" />
              <span>{language === 'bn' ? 'কাল্পনিক ডেমো ডেটা সিডার' : 'Populate Clearly-Labelled Demo Records'}</span>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed">
              {language === 'bn'
                ? 'ডাটাবেজে যদি রক্তদাতা বা রক্তের অনুরোধ খালি থাকে, তবে এই বাটনে ক্লিক করে সুস্পষ্টভাবে চিহ্নিত কাল্পনিক নমুনা ডেটা যুক্ত করতে পারেন। এতে অনুসন্ধান, ফিল্টার এবং যোগাযোগের টেস্ট অবিলম্বে যাচাই করা যায়।'
                : 'Inserts clearly-labelled demo donors and blood requests into Cloud Firestore to test search filters and contact workflows without exposing real people.'}
            </p>

            <button
              onClick={handleSeed}
              className="px-4 py-2 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-md transition-colors"
            >
              {language === 'bn' ? 'ডেমো ডেটা ইনিশিয়ালাইজ করুন' : 'Seed Labeled Demo Data'}
            </button>
          </div>
        )}
      </div>
    </>
  );
};
