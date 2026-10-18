export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-' | 'Unknown';

export type UserRole = 'visitor' | 'registered_user' | 'donor' | 'moderator' | 'verification_reviewer' | 'admin';

export type ReviewStatus = 'not_started' | 'pending' | 'reviewed' | 'rejected' | 'needs_recheck';

export type AvailabilityStatus = 'available' | 'temporarily_unavailable' | 'paused';

export type ModerationStatus = 'approved' | 'pending' | 'rejected';

export type RequestStatus = 'draft' | 'pending_moderation' | 'approved' | 'fulfilled' | 'cancelled' | 'expired' | 'rejected';

export type UrgencyLevel = 'routine' | 'urgent' | 'critical';

export type ContactRequestStatus = 'pending' | 'accepted' | 'declined' | 'cancelled';

export type ReportCategory = 'scam' | 'false_request' | 'harassment' | 'privacy_violation' | 'impersonation' | 'abusive_content' | 'outdated_fulfilled' | 'other';

export interface UserPrivateProfile {
  uid: string;
  displayName: string;
  email: string;
  phone?: string;
  preferredLanguage: 'bn' | 'en';
  division: string;
  district: string;
  upazila: string;
  approximateArea: string;
  preferredContactChannel: 'phone' | 'email' | 'in_app';
  role: UserRole;
  isDonor: boolean;
  bloodGroup: BloodGroup;
  identityReviewStatus: ReviewStatus;
  bloodGroupReviewStatus: ReviewStatus;
  consentGiven: boolean;
  consentVersion: string;
  ageConfirmed18: boolean;
  termsAccepted: boolean;
  createdAt: string;
  updatedAt: string;
  deletionRequestedAt?: string;
}

export interface PublicDonorProfile {
  uid: string;
  displayLabel: string;
  bloodGroup: BloodGroup;
  bloodGroupReviewStatus: ReviewStatus;
  identityReviewStatus: ReviewStatus;
  division: string;
  district: string;
  upazila: string;
  approximateArea: string;
  selfReportedAvailability: AvailabilityStatus;
  availabilityLastUpdatedAt: string;
  publicVisibility: boolean;
  moderationStatus: ModerationStatus;
  isDemo?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BloodRequest {
  id: string;
  createdByUid: string;
  requesterDisplayLabel: string;
  patientDisplayNameOrInitials: string;
  requestedBloodGroup: BloodGroup;
  unitsNeeded: string;
  hospitalName: string;
  hospitalArea: string;
  division: string;
  district: string;
  upazila: string;
  neededByDate: string;
  urgencyLevel: UrgencyLevel;
  shortDescription: string;
  requesterContactPreference: 'in_app' | 'phone_on_approval';
  status: RequestStatus;
  moderationStatus: ModerationStatus;
  isPublic: boolean;
  reportCount: string;
  isDemo?: boolean;
  createdAt: string;
  updatedAt: string;
  expiresAt?: string;
}

export interface ContactRequest {
  id: string;
  requesterUid: string;
  requesterDisplayLabel: string;
  requesterEmail?: string;
  donorUid: string;
  donorDisplayLabel: string;
  requestId?: string;
  message: string;
  status: ContactRequestStatus;
  donorContactRevealed?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserReport {
  id: string;
  reporterUid: string;
  targetType: 'donor' | 'blood_request' | 'contact_request' | 'other';
  targetId: string;
  targetTitleOrName: string;
  category: ReportCategory;
  explanation: string;
  status: 'pending' | 'reviewed' | 'resolved' | 'dismissed';
  reviewerNotes?: string;
  createdAt: string;
  reviewedAt?: string;
}

export interface VerificationReview {
  id: string;
  uid: string;
  userDisplayLabel: string;
  type: 'identity' | 'blood_group';
  status: ReviewStatus;
  reviewerUid: string;
  policyVersion: string;
  reasonCode: string;
  reviewerNotes: string;
  createdAt: string;
  reviewedAt?: string;
}

export interface ModerationAction {
  id: string;
  actorUid: string;
  targetType: 'donor' | 'blood_request' | 'user_report' | 'verification';
  targetId: string;
  action: string;
  reasonCode: string;
  policyVersion: string;
  createdAt: string;
}

export interface SiteConfig {
  id: string;
  siteNameBn: string;
  siteNameEn: string;
  taglineBn: string;
  taglineEn: string;
  allowPublicRegistration: boolean;
  sensitiveDocumentUploadsEnabled: boolean;
  defaultContactEmail: string;
  updatedAt: string;
}
