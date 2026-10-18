import type { UserPrivateProfile, PublicDonorProfile } from '../types/index.ts';

/**
 * Ensures strict privacy boundary by projecting only allowlisted, safe fields
 * for public donor directory. Absolutely NO email, phone, or private audit data.
 */
export function toPublicDonorProjection(
  privateProfile: UserPrivateProfile,
  displayLabelOverride?: string
): PublicDonorProfile {
  const label = displayLabelOverride || maskDisplayName(privateProfile.displayName);

  return {
    uid: privateProfile.uid,
    displayLabel: label,
    bloodGroup: privateProfile.bloodGroup,
    bloodGroupReviewStatus: privateProfile.bloodGroupReviewStatus || 'not_started',
    identityReviewStatus: privateProfile.identityReviewStatus || 'not_started',
    division: privateProfile.division,
    district: privateProfile.district,
    upazila: privateProfile.upazila || '',
    approximateArea: privateProfile.approximateArea || '',
    selfReportedAvailability: 'available',
    availabilityLastUpdatedAt: new Date().toISOString(),
    publicVisibility: privateProfile.consentGiven,
    moderationStatus: 'approved',
    createdAt: privateProfile.createdAt,
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Creates privacy-conscious public display name (e.g. "Rafiqul I.")
 */
export function maskDisplayName(fullName: string): string {
  if (!fullName) return 'Anonymous Donor';
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return parts[0];
  const lastInitial = parts[parts.length - 1][0]?.toUpperCase() + '.';
  return `${parts.slice(0, parts.length - 1).join(' ')} ${lastInitial}`;
}

/**
 * Detects and strips potential direct phone numbers, email addresses, or links
 * from user-supplied public text to enforce the consent-based contact workflow.
 */
export function sanitizePublicText(text: string): { cleanText: string; hasContactLeak: boolean } {
  if (!text) return { cleanText: '', hasContactLeak: false };

  // Detect BD phone numbers: 013, 014, 015, 016, 017, 018, 019 + 8 digits or +8801...
  const phoneRegex = /(?:\+?880|0)1[3-9]\d{8}/g;
  // Detect email
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

  let hasContactLeak = false;
  let cleanText = text;

  if (phoneRegex.test(cleanText)) {
    hasContactLeak = true;
    cleanText = cleanText.replace(phoneRegex, '[ফোন নম্বর গোপন করা হয়েছে / Phone hidden]');
  }

  if (emailRegex.test(cleanText)) {
    hasContactLeak = true;
    cleanText = cleanText.replace(emailRegex, '[ইমেইল গোপন করা হয়েছে / Email hidden]');
  }

  return { cleanText, hasContactLeak };
}
