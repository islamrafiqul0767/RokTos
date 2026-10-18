import type { BloodGroup } from '../types/index.ts';

export function isValidBDPhone(phone: string): boolean {
  if (!phone) return false;
  // Matches 01XXXXXXXXX or +8801XXXXXXXXX
  const cleaned = phone.replace(/[\s\-]/g, '');
  return /^(?:\+?880|0)1[3-9]\d{8}$/.test(cleaned);
}

export function isValidBloodGroup(bg: string): bg is BloodGroup {
  return ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown'].includes(bg);
}

export function validateDonorRegistration(data: {
  displayName: string;
  bloodGroup: string;
  division: string;
  district: string;
  ageConfirmed18: boolean;
  termsAccepted: boolean;
  consentGiven: boolean;
}): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!data.displayName || data.displayName.trim().length < 3) {
    errors.displayName = 'নাম কমপক্ষে ৩ অক্ষরের হতে হবে / Name must be at least 3 characters.';
  }

  if (!data.bloodGroup || !isValidBloodGroup(data.bloodGroup)) {
    errors.bloodGroup = 'অনুগ্রহ করে সঠিক রক্তের গ্রুপ নির্বাচন করুন / Please select a valid blood group.';
  }

  if (!data.division) {
    errors.division = 'বিভাগ নির্বাচন আবশ্যক / Division selection is required.';
  }

  if (!data.district) {
    errors.district = 'জেলা নির্বাচন আবশ্যক / District selection is required.';
  }

  if (!data.ageConfirmed18) {
    errors.ageConfirmed18 = 'রক্তদানের জন্য আপনার বয়স ১৮ বছর বা তার বেশি হতে হবে / You must confirm you are 18 or older.';
  }

  if (!data.termsAccepted) {
    errors.termsAccepted = 'শর্তাবলী মেনে নেওয়া আবশ্যক / You must accept the terms of use.';
  }

  if (!data.consentGiven) {
    errors.consentGiven = 'সার্বজনীন তালিকায় তথ্য প্রদর্শনের সম্মতি আবশ্যক / Explicit privacy consent is required.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateBloodRequest(data: {
  patientDisplayNameOrInitials: string;
  requestedBloodGroup: string;
  division: string;
  district: string;
  hospitalName: string;
  neededByDate: string;
  unitsNeeded: string;
  termsAccepted: boolean;
}): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!data.patientDisplayNameOrInitials || data.patientDisplayNameOrInitials.trim().length < 2) {
    errors.patientDisplayNameOrInitials = 'রোগীর নাম বা আদ্যক্ষর আবশ্যক / Patient name or initials required.';
  }

  if (!data.requestedBloodGroup || !isValidBloodGroup(data.requestedBloodGroup)) {
    errors.requestedBloodGroup = 'রক্তের গ্রুপ নির্বাচন আবশ্যক / Blood group selection is required.';
  }

  if (!data.division) {
    errors.division = 'বিভাগ আবশ্যক / Division is required.';
  }

  if (!data.district) {
    errors.district = 'জেলা আবশ্যক / District is required.';
  }

  if (!data.hospitalName || data.hospitalName.trim().length < 3) {
    errors.hospitalName = 'হাসপাতাল বা রক্ত কেন্দ্রের নাম আবশ্যক / Hospital or blood centre name is required.';
  }

  if (!data.neededByDate) {
    errors.neededByDate = 'রক্তের প্রয়োজনীয়তার তারিখ আবশ্যক / Needed-by date is required.';
  }

  if (!data.termsAccepted) {
    errors.termsAccepted = 'দাবিত্যাগ ও শর্তাবলী মেনে নেওয়া আবশ্যক / You must accept medical disclaimer.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
