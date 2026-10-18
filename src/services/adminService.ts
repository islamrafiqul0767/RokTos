import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../config/firebase.ts';
import { handleFirestoreError, OperationType } from '../utils/errors.ts';
import type {
  VerificationReview,
  ModerationAction,
  ReviewStatus,
  ModerationStatus,
} from '../types/index.ts';

const VERIFICATION_COLLECTION = 'verificationReviews';
const MODERATION_ACTIONS_COLLECTION = 'moderationActions';
const PUBLIC_DONORS_COLLECTION = 'publicDonorProfiles';
const BLOOD_REQUESTS_COLLECTION = 'bloodRequests';
const USER_PROFILES_COLLECTION = 'userPrivateProfiles';

export async function fetchVerificationReviews(): Promise<VerificationReview[]> {
  try {
    const colRef = collection(db, VERIFICATION_COLLECTION);
    const snap = await getDocs(colRef);
    const list: VerificationReview[] = [];
    snap.forEach((d) => list.push(d.data() as VerificationReview));
    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, VERIFICATION_COLLECTION);
  }
}

export async function submitVerificationDecision(params: {
  targetUid: string;
  userDisplayLabel: string;
  type: 'identity' | 'blood_group';
  status: ReviewStatus;
  reviewerUid: string;
  reasonCode: string;
  notes: string;
}): Promise<void> {
  try {
    const reviewId = `vr_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const reviewRef = doc(db, VERIFICATION_COLLECTION, reviewId);

    const reviewDoc: VerificationReview = {
      id: reviewId,
      uid: params.targetUid,
      userDisplayLabel: params.userDisplayLabel,
      type: params.type,
      status: params.status,
      reviewerUid: params.reviewerUid,
      policyVersion: '2026-v1',
      reasonCode: params.reasonCode,
      reviewerNotes: params.notes,
      createdAt: new Date().toISOString(),
      reviewedAt: new Date().toISOString(),
    };

    await setDoc(reviewRef, reviewDoc);

    // Update public donor profile if exists
    const publicRef = doc(db, PUBLIC_DONORS_COLLECTION, params.targetUid);
    const publicSnap = await getDoc(publicRef);

    if (publicSnap.exists()) {
      const updateData: Record<string, any> = { updatedAt: new Date().toISOString() };
      if (params.type === 'blood_group') {
        updateData.bloodGroupReviewStatus = params.status;
      } else {
        updateData.identityReviewStatus = params.status;
      }
      await updateDoc(publicRef, updateData);
    }

    // Update private user profile if exists
    const privateRef = doc(db, USER_PROFILES_COLLECTION, params.targetUid);
    const privateSnap = await getDoc(privateRef);
    if (privateSnap.exists()) {
      const privateUpdate: Record<string, any> = { updatedAt: new Date().toISOString() };
      if (params.type === 'blood_group') {
        privateUpdate.bloodGroupReviewStatus = params.status;
      } else {
        privateUpdate.identityReviewStatus = params.status;
      }
      await updateDoc(privateRef, privateUpdate);
    }

    // Record audit action
    await recordModerationAction({
      actorUid: params.reviewerUid,
      targetType: 'verification',
      targetId: params.targetUid,
      action: `VERIFICATION_${params.type.toUpperCase()}_${params.status.toUpperCase()}`,
      reasonCode: params.reasonCode,
    });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, VERIFICATION_COLLECTION);
  }
}

export async function setDonorModeration(
  uid: string,
  status: ModerationStatus,
  reviewerUid: string,
  reason: string
): Promise<void> {
  try {
    const docRef = doc(db, PUBLIC_DONORS_COLLECTION, uid);
    await updateDoc(docRef, {
      moderationStatus: status,
      updatedAt: new Date().toISOString(),
    });

    await recordModerationAction({
      actorUid: reviewerUid,
      targetType: 'donor',
      targetId: uid,
      action: `DONOR_MODERATION_${status.toUpperCase()}`,
      reasonCode: reason,
    });
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, `${PUBLIC_DONORS_COLLECTION}/${uid}`);
  }
}

export async function setRequestModeration(
  requestId: string,
  status: ModerationStatus,
  reviewerUid: string,
  reason: string
): Promise<void> {
  try {
    const docRef = doc(db, BLOOD_REQUESTS_COLLECTION, requestId);
    await updateDoc(docRef, {
      status: status === 'approved' ? 'approved' : 'rejected',
      moderationStatus: status,
      updatedAt: new Date().toISOString(),
    });

    await recordModerationAction({
      actorUid: reviewerUid,
      targetType: 'blood_request',
      targetId: requestId,
      action: `REQUEST_MODERATION_${status.toUpperCase()}`,
      reasonCode: reason,
    });
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, `${BLOOD_REQUESTS_COLLECTION}/${requestId}`);
  }
}

export async function recordModerationAction(params: {
  actorUid: string;
  targetType: 'donor' | 'blood_request' | 'user_report' | 'verification';
  targetId: string;
  action: string;
  reasonCode: string;
}): Promise<void> {
  try {
    const id = `act_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const docRef = doc(db, MODERATION_ACTIONS_COLLECTION, id);
    const actionDoc: ModerationAction = {
      id,
      actorUid: params.actorUid,
      targetType: params.targetType,
      targetId: params.targetId,
      action: params.action,
      reasonCode: params.reasonCode,
      policyVersion: '2026-v1',
      createdAt: new Date().toISOString(),
    };
    await setDoc(docRef, actionDoc);
  } catch (err) {
    console.warn('Failed to record moderation action:', err);
  }
}

export async function fetchModerationActions(): Promise<ModerationAction[]> {
  try {
    const colRef = collection(db, MODERATION_ACTIONS_COLLECTION);
    const snap = await getDocs(colRef);
    const list: ModerationAction[] = [];
    snap.forEach((d) => list.push(d.data() as ModerationAction));
    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, MODERATION_ACTIONS_COLLECTION);
  }
}
