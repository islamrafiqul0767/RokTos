import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../config/firebase.ts';
import { handleFirestoreError, OperationType } from '../utils/errors.ts';
import type { ContactRequest, ContactRequestStatus } from '../types/index.ts';

const CONTACT_REQUESTS_COLLECTION = 'contactRequests';

export async function createContactRequest(params: {
  requesterUid: string;
  requesterDisplayLabel: string;
  requesterEmail?: string;
  donorUid: string;
  donorDisplayLabel: string;
  message: string;
  requestId?: string;
}): Promise<string> {
  try {
    const id = `cr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const docRef = doc(db, CONTACT_REQUESTS_COLLECTION, id);

    const contactReq: ContactRequest = {
      id,
      requesterUid: params.requesterUid,
      requesterDisplayLabel: params.requesterDisplayLabel,
      requesterEmail: params.requesterEmail,
      donorUid: params.donorUid,
      donorDisplayLabel: params.donorDisplayLabel,
      message: params.message,
      requestId: params.requestId || '',
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await setDoc(docRef, contactReq);
    return id;
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, CONTACT_REQUESTS_COLLECTION);
  }
}

export async function fetchReceivedContactRequests(donorUid: string): Promise<ContactRequest[]> {
  try {
    const colRef = collection(db, CONTACT_REQUESTS_COLLECTION);
    const q = query(colRef, where('donorUid', '==', donorUid));
    const snapshot = await getDocs(q);
    const requests: ContactRequest[] = [];
    snapshot.forEach((d) => requests.push(d.data() as ContactRequest));
    return requests.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, CONTACT_REQUESTS_COLLECTION);
  }
}

export async function fetchSentContactRequests(requesterUid: string): Promise<ContactRequest[]> {
  try {
    const colRef = collection(db, CONTACT_REQUESTS_COLLECTION);
    const q = query(colRef, where('requesterUid', '==', requesterUid));
    const snapshot = await getDocs(q);
    const requests: ContactRequest[] = [];
    snapshot.forEach((d) => requests.push(d.data() as ContactRequest));
    return requests.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, CONTACT_REQUESTS_COLLECTION);
  }
}

export async function updateContactStatus(
  contactRequestId: string,
  status: ContactRequestStatus,
  revealedContact?: string
): Promise<void> {
  try {
    const docRef = doc(db, CONTACT_REQUESTS_COLLECTION, contactRequestId);
    const payload: Partial<ContactRequest> = {
      status,
      updatedAt: new Date().toISOString(),
    };
    if (revealedContact) {
      payload.donorContactRevealed = revealedContact;
    }
    await updateDoc(docRef, payload);
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, `${CONTACT_REQUESTS_COLLECTION}/${contactRequestId}`);
  }
}
