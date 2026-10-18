import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  limit,
} from 'firebase/firestore';
import { db } from '../config/firebase.ts';
import { handleFirestoreError, OperationType } from '../utils/errors.ts';
import { sanitizePublicText } from '../utils/privacy.ts';
import { SAMPLE_DEMO_REQUESTS } from './seedService.ts';
import type { BloodRequest, RequestStatus } from '../types/index.ts';

const REQUESTS_COLLECTION = 'bloodRequests';

export async function fetchPublicBloodRequests(filters?: {
  bloodGroup?: string;
  division?: string;
  district?: string;
}): Promise<BloodRequest[]> {
  try {
    const colRef = collection(db, REQUESTS_COLLECTION);
    const q = query(
      colRef,
      where('status', '==', 'approved'),
      limit(50)
    );

    const snapshot = await getDocs(q);
    let requests: BloodRequest[] = [];

    snapshot.forEach((docSnap) => {
      requests.push(docSnap.data() as BloodRequest);
    });

    if (requests.length === 0) {
      requests = [...SAMPLE_DEMO_REQUESTS];
    }

    if (filters) {
      if (filters.bloodGroup && filters.bloodGroup !== 'ALL') {
        requests = requests.filter((r) => r.requestedBloodGroup === filters.bloodGroup);
      }
      if (filters.division && filters.division !== 'ALL') {
        requests = requests.filter((r) => r.division === filters.division);
      }
      if (filters.district && filters.district !== 'ALL') {
        requests = requests.filter((r) => r.district === filters.district);
      }
    }

    // Sort by urgent first, then date
    return requests.sort((a, b) => {
      const urgencyRank: Record<string, number> = { critical: 3, urgent: 2, routine: 1 };
      const diff = (urgencyRank[b.urgencyLevel] || 0) - (urgencyRank[a.urgencyLevel] || 0);
      if (diff !== 0) return diff;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, REQUESTS_COLLECTION);
  }
}

export async function fetchUserBloodRequests(uid: string): Promise<BloodRequest[]> {
  try {
    const colRef = collection(db, REQUESTS_COLLECTION);
    const q = query(colRef, where('createdByUid', '==', uid));
    const snapshot = await getDocs(q);
    const requests: BloodRequest[] = [];
    snapshot.forEach((docSnap) => {
      requests.push(docSnap.data() as BloodRequest);
    });
    return requests;
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, REQUESTS_COLLECTION);
  }
}

export async function createBloodRequest(requestData: Omit<BloodRequest, 'id' | 'createdAt' | 'updatedAt' | 'reportCount'>): Promise<string> {
  try {
    const id = `req_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const docRef = doc(db, REQUESTS_COLLECTION, id);

    const { cleanText } = sanitizePublicText(requestData.shortDescription);

    const newRequest: BloodRequest = {
      ...requestData,
      id,
      shortDescription: cleanText,
      status: 'approved', // Auto-approved for frictionless discovery in MVP, or 'pending_moderation'
      moderationStatus: 'approved',
      isPublic: true,
      reportCount: '0',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await setDoc(docRef, newRequest);
    return id;
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, REQUESTS_COLLECTION);
  }
}

export async function updateRequestStatus(id: string, status: RequestStatus): Promise<void> {
  try {
    const docRef = doc(db, REQUESTS_COLLECTION, id);
    await updateDoc(docRef, {
      status,
      updatedAt: new Date().toISOString(),
    });
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, `${REQUESTS_COLLECTION}/${id}`);
  }
}

export async function deleteBloodRequest(id: string): Promise<void> {
  try {
    const docRef = doc(db, REQUESTS_COLLECTION, id);
    await deleteDoc(docRef);
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, `${REQUESTS_COLLECTION}/${id}`);
  }
}
