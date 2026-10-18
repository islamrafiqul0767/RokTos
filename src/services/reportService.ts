import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../config/firebase.ts';
import { handleFirestoreError, OperationType } from '../utils/errors.ts';
import type { UserReport, ReportCategory } from '../types/index.ts';

const REPORTS_COLLECTION = 'userReports';

export async function submitReport(params: {
  reporterUid: string;
  targetType: 'donor' | 'blood_request' | 'contact_request' | 'other';
  targetId: string;
  targetTitleOrName: string;
  category: ReportCategory;
  explanation: string;
}): Promise<string> {
  try {
    const id = `rep_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const docRef = doc(db, REPORTS_COLLECTION, id);

    const report: UserReport = {
      id,
      reporterUid: params.reporterUid,
      targetType: params.targetType,
      targetId: params.targetId,
      targetTitleOrName: params.targetTitleOrName,
      category: params.category,
      explanation: params.explanation,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    await setDoc(docRef, report);
    return id;
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, REPORTS_COLLECTION);
  }
}

export async function fetchAllReports(): Promise<UserReport[]> {
  try {
    const colRef = collection(db, REPORTS_COLLECTION);
    const snap = await getDocs(colRef);
    const reports: UserReport[] = [];
    snap.forEach((d) => reports.push(d.data() as UserReport));
    return reports.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, REPORTS_COLLECTION);
  }
}

export async function resolveReport(
  reportId: string,
  resolution: 'resolved' | 'dismissed',
  notes: string
): Promise<void> {
  try {
    const docRef = doc(db, REPORTS_COLLECTION, reportId);
    await updateDoc(docRef, {
      status: resolution,
      reviewerNotes: notes,
      reviewedAt: new Date().toISOString(),
    });
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, `${REPORTS_COLLECTION}/${reportId}`);
  }
}
