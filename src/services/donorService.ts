import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  query,
  where,
  limit,
} from 'firebase/firestore';
import { db } from '../config/firebase.ts';
import { handleFirestoreError, OperationType } from '../utils/errors.ts';
import { toPublicDonorProjection } from '../utils/privacy.ts';
import { SAMPLE_DEMO_DONORS } from './seedService.ts';
import type { PublicDonorProfile, UserPrivateProfile, AvailabilityStatus } from '../types/index.ts';

const PUBLIC_DONORS_COLLECTION = 'publicDonorProfiles';
const PRIVATE_PROFILES_COLLECTION = 'userPrivateProfiles';

export async function fetchPublicDonors(filters?: {
  bloodGroup?: string;
  division?: string;
  district?: string;
  availability?: string;
}): Promise<PublicDonorProfile[]> {
  try {
    const colRef = collection(db, PUBLIC_DONORS_COLLECTION);
    let q = query(
      colRef,
      where('publicVisibility', '==', true),
      where('moderationStatus', '==', 'approved'),
      limit(50)
    );

    const snapshot = await getDocs(q);
    let donors: PublicDonorProfile[] = [];

    snapshot.forEach((docSnap) => {
      donors.push(docSnap.data() as PublicDonorProfile);
    });

    if (donors.length === 0) {
      donors = [...SAMPLE_DEMO_DONORS];
    }

    // Client-side refinement for composite field queries to avoid complex manual index requirements
    if (filters) {
      if (filters.bloodGroup && filters.bloodGroup !== 'ALL') {
        donors = donors.filter((d) => d.bloodGroup === filters.bloodGroup);
      }
      if (filters.division && filters.division !== 'ALL') {
        donors = donors.filter((d) => d.division === filters.division);
      }
      if (filters.district && filters.district !== 'ALL') {
        donors = donors.filter((d) => d.district === filters.district);
      }
      if (filters.availability && filters.availability !== 'ALL') {
        donors = donors.filter((d) => d.selfReportedAvailability === filters.availability);
      }
    }

    return donors;
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, PUBLIC_DONORS_COLLECTION);
  }
}

export async function getPublicDonorById(uid: string): Promise<PublicDonorProfile | null> {
  try {
    const docRef = doc(db, PUBLIC_DONORS_COLLECTION, uid);
    const snap = await getDoc(docRef);
    if (!snap.exists()) return null;
    return snap.data() as PublicDonorProfile;
  } catch (err) {
    handleFirestoreError(err, OperationType.GET, `${PUBLIC_DONORS_COLLECTION}/${uid}`);
  }
}

export async function registerOrUpdateDonor(
  privateProfile: UserPrivateProfile,
  customDisplayLabel?: string
): Promise<void> {
  try {
    // 1. Save private profile
    const privateRef = doc(db, PRIVATE_PROFILES_COLLECTION, privateProfile.uid);
    await setDoc(privateRef, {
      ...privateProfile,
      isDonor: true,
      updatedAt: new Date().toISOString(),
    }, { merge: true });

    // 2. Project safe public profile
    if (privateProfile.consentGiven) {
      const publicRef = doc(db, PUBLIC_DONORS_COLLECTION, privateProfile.uid);
      const publicData = toPublicDonorProjection(privateProfile, customDisplayLabel);
      await setDoc(publicRef, publicData, { merge: true });
    }
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `${PUBLIC_DONORS_COLLECTION}/${privateProfile.uid}`);
  }
}

export async function updateAvailability(
  uid: string,
  availability: AvailabilityStatus
): Promise<void> {
  try {
    const publicRef = doc(db, PUBLIC_DONORS_COLLECTION, uid);
    await updateDoc(publicRef, {
      selfReportedAvailability: availability,
      availabilityLastUpdatedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, `${PUBLIC_DONORS_COLLECTION}/${uid}`);
  }
}

export async function togglePublicVisibility(
  uid: string,
  visibility: boolean
): Promise<void> {
  try {
    const publicRef = doc(db, PUBLIC_DONORS_COLLECTION, uid);
    await updateDoc(publicRef, {
      publicVisibility: visibility,
      updatedAt: new Date().toISOString(),
    });

    const privateRef = doc(db, PRIVATE_PROFILES_COLLECTION, uid);
    await updateDoc(privateRef, {
      consentGiven: visibility,
      updatedAt: new Date().toISOString(),
    });
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, `${PUBLIC_DONORS_COLLECTION}/${uid}`);
  }
}
