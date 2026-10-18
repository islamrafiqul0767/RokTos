import { doc, setDoc, getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '../config/firebase.ts';
import type { PublicDonorProfile, BloodRequest } from '../types/index.ts';

export const SAMPLE_DEMO_DONORS: PublicDonorProfile[] = [
  {
    uid: 'demo_donor_1',
    displayLabel: 'আসিফ মাহমুদ (ডেমো)',
    bloodGroup: 'O+',
    bloodGroupReviewStatus: 'reviewed',
    identityReviewStatus: 'reviewed',
    division: 'dhaka',
    district: 'dhaka_city',
    upazila: 'dhanmondi',
    approximateArea: 'ধানমন্ডি ২৭',
    selfReportedAvailability: 'available',
    availabilityLastUpdatedAt: new Date().toISOString(),
    publicVisibility: true,
    moderationStatus: 'approved',
    isDemo: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    uid: 'demo_donor_2',
    displayLabel: 'সাদিয়া পারভীন (ডেমো)',
    bloodGroup: 'A+',
    bloodGroupReviewStatus: 'not_started',
    identityReviewStatus: 'reviewed',
    division: 'dhaka',
    district: 'dhaka_city',
    upazila: 'mirpur',
    approximateArea: 'মিরপুর ১০',
    selfReportedAvailability: 'available',
    availabilityLastUpdatedAt: new Date().toISOString(),
    publicVisibility: true,
    moderationStatus: 'approved',
    isDemo: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    uid: 'demo_donor_3',
    displayLabel: 'তানভীর আহমেদ (ডেমো)',
    bloodGroup: 'B+',
    bloodGroupReviewStatus: 'reviewed',
    identityReviewStatus: 'not_started',
    division: 'chattogram',
    district: 'chattogram_city',
    upazila: 'panchlaish',
    approximateArea: 'পাঁচলাইশ মোড়',
    selfReportedAvailability: 'available',
    availabilityLastUpdatedAt: new Date().toISOString(),
    publicVisibility: true,
    moderationStatus: 'approved',
    isDemo: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    uid: 'demo_donor_4',
    displayLabel: 'ফারহানা ইসলাম (ডেমো)',
    bloodGroup: 'AB+',
    bloodGroupReviewStatus: 'reviewed',
    identityReviewStatus: 'reviewed',
    division: 'rajshahi',
    district: 'rajshahi_sadar',
    upazila: 'boalia',
    approximateArea: 'বোয়ালিয়া রামেক সংলগ্ন',
    selfReportedAvailability: 'available',
    availabilityLastUpdatedAt: new Date().toISOString(),
    publicVisibility: true,
    moderationStatus: 'approved',
    isDemo: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    uid: 'demo_donor_5',
    displayLabel: 'রাকিবুল হাসান (ডেমো)',
    bloodGroup: 'O-',
    bloodGroupReviewStatus: 'not_started',
    identityReviewStatus: 'not_started',
    division: 'sylhet',
    district: 'sylhet_sadar',
    upazila: 'sylhet_kotwali',
    approximateArea: 'ওসমানী মেডিকেল এলাকা',
    selfReportedAvailability: 'temporarily_unavailable',
    availabilityLastUpdatedAt: new Date().toISOString(),
    publicVisibility: true,
    moderationStatus: 'approved',
    isDemo: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const SAMPLE_DEMO_REQUESTS: BloodRequest[] = [
  {
    id: 'demo_req_1',
    createdByUid: 'system_demo',
    requesterDisplayLabel: 'হাসানুর রহমান (ডেমো আবেদন)',
    patientDisplayNameOrInitials: 'রোগী র. ক. (৬৫ বছর)',
    requestedBloodGroup: 'O+',
    unitsNeeded: '২ ব্যাগ',
    hospitalName: 'ঢাকা মেডিকেল কলেজ হাসপাতাল (DMCH)',
    hospitalArea: 'জরুরি বিভাগ, ঢাকা',
    division: 'dhaka',
    district: 'dhaka_city',
    upazila: 'old_dhaka',
    neededByDate: new Date(Date.now() + 86400000).toISOString(),
    urgencyLevel: 'critical',
    shortDescription: 'জরুরি হার্ট সার্জারির জন্য ও পজিটিভ রক্তের প্রয়োজন। ক্রস-ম্যাচিং সম্পন্ন হয়েছে।',
    requesterContactPreference: 'in_app',
    status: 'approved',
    moderationStatus: 'approved',
    isPublic: true,
    reportCount: '0',
    isDemo: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'demo_req_2',
    createdByUid: 'system_demo',
    requesterDisplayLabel: 'ফাহমিদা আক্তার (ডেমো আবেদন)',
    patientDisplayNameOrInitials: 'শিশু ম. ই. (৮ বছর)',
    requestedBloodGroup: 'B+',
    unitsNeeded: '১ ব্যাগ',
    hospitalName: 'বঙ্গবন্ধু শেখ মুজিব মেডিকেল বিশ্ববিদ্যালয় (BSMMU)',
    hospitalArea: 'শাহবাগ, ঢাকা',
    division: 'dhaka',
    district: 'dhaka_city',
    upazila: 'shahbagh',
    neededByDate: new Date(Date.now() + 172800000).toISOString(),
    urgencyLevel: 'urgent',
    shortDescription: 'থ্যালাসেমিয়া রোগীর রুটিন রক্ত পরিসঞ্চালন প্রয়োজন। রক্তের গ্রুপ বি পজিটিভ।',
    requesterContactPreference: 'in_app',
    status: 'approved',
    moderationStatus: 'approved',
    isPublic: true,
    reportCount: '0',
    isDemo: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'demo_req_3',
    createdByUid: 'system_demo',
    requesterDisplayLabel: 'মো. শাহেদ (ডেমো আবেদন)',
    patientDisplayNameOrInitials: 'রোগী স. আ. (৩৫ বছর)',
    requestedBloodGroup: 'A+',
    unitsNeeded: '২ ব্যাগ',
    hospitalName: 'চট্টগ্রাম মেডিকেল কলেজ হাসপাতাল (CMCH)',
    hospitalArea: 'পাঁচলাইশ, চট্টগ্রাম',
    division: 'chattogram',
    district: 'chattogram_city',
    upazila: 'kotwali_ctg',
    neededByDate: new Date(Date.now() + 259200000).toISOString(),
    urgencyLevel: 'routine',
    shortDescription: 'পরিকল্পিত গাইনি অপারেশনের জন্য রক্ত প্রয়োজন। স্বেচ্ছাসেবী দাতার সন্ধান করছি।',
    requesterContactPreference: 'in_app',
    status: 'approved',
    moderationStatus: 'approved',
    isPublic: true,
    reportCount: '0',
    isDemo: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export async function seedDemoDataIfEmpty(): Promise<boolean> {
  try {
    const donorsSnap = await getDocs(query(collection(db, 'publicDonorProfiles'), where('publicVisibility', '==', true)));
    if (donorsSnap.size === 0) {
      console.log('Seeding initial clearly-labelled demo donors into Firestore...');
      for (const donor of SAMPLE_DEMO_DONORS) {
        await setDoc(doc(db, 'publicDonorProfiles', donor.uid), donor);
      }
    }

    const requestsSnap = await getDocs(query(collection(db, 'bloodRequests'), where('status', '==', 'approved')));
    if (requestsSnap.size === 0) {
      console.log('Seeding initial clearly-labelled demo blood requests into Firestore...');
      for (const req of SAMPLE_DEMO_REQUESTS) {
        await setDoc(doc(db, 'bloodRequests', req.id), req);
      }
    }
    return true;
  } catch (err) {
    console.warn('Seeding skipped or permission denied:', err);
    return false;
  }
}
