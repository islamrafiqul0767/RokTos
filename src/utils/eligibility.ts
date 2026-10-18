import type { BloodGroup } from '../types/index.ts';

export interface EligibilityInput {
  age: number;
  weightKg: number;
  gender: 'male' | 'female' | 'other';
  daysSinceLastDonation: number | null; // null if never donated
  hasRecentFeverOrFlu: boolean;
  onAntibiotics: boolean;
  hasRecentSurgery: boolean; // within 6 months
  hasRecentTattooOrPiercing: boolean; // within 6 months
  isPregnantOrNursing: boolean;
  hasChronicCondition: boolean; // HIV, Hepatitis B/C, Heart Disease
}

export interface EligibilityResult {
  isEligible: boolean;
  status: 'eligible' | 'temporarily_deferred' | 'ineligible';
  reasonsBn: string[];
  reasonsEn: string[];
  daysToWait: number;
}

/**
 * Evaluates donor eligibility based on Bangladesh National Blood Transfusion standards.
 */
export function checkDonorEligibility(input: EligibilityInput): EligibilityResult {
  const reasonsBn: string[] = [];
  const reasonsEn: string[] = [];
  let daysToWait = 0;
  let hasPermanentIneligibility = false;

  // 1. Age check (18 - 60 years)
  if (input.age < 18) {
    reasonsBn.push('রক্তদানের জন্য ন্যূনতম বয়স ১৮ বছর পূর্ণ হতে হবে।');
    reasonsEn.push('Minimum legal age for blood donation in Bangladesh is 18 years.');
  } else if (input.age > 60) {
    reasonsBn.push('৬০ বছরের অধিক বয়সে নতুন বা নিয়মিত রক্তদানের ক্ষেত্রে বিশেষজ্ঞ চিকিৎসকের অনুমতি প্রয়োজন।');
    reasonsEn.push('Donors over 60 require specialist clinical assessment before donating.');
  }

  // 2. Weight check (min 45 kg)
  if (input.weightKg < 45) {
    reasonsBn.push('রক্তদাতার শারীরিক ওজন কমপক্ষে ৪৫ কেজি (১০০ পাউন্ড) হতে হবে।');
    reasonsEn.push('Minimum required body weight is 45 kg (100 lbs).');
  }

  // 3. Chronic disease check
  if (input.hasChronicCondition) {
    hasPermanentIneligibility = true;
    reasonsBn.push('হেপাটাইটিস বি/সি, এইচআইভি বা জটিল হৃদরোগ থাকলে রক্তদান থেকে স্থায়ীভাবে বিরত থাকা আবশ্যক।');
    reasonsEn.push('Permanent deferral applies to individuals with Hepatitis B/C, HIV, or severe cardiac disease.');
  }

  // 4. Donation interval (Male: 90 days / 3 months; Female: 120 days / 4 months)
  if (input.daysSinceLastDonation !== null) {
    const requiredInterval = input.gender === 'female' ? 120 : 90;
    if (input.daysSinceLastDonation < requiredInterval) {
      const remaining = requiredInterval - input.daysSinceLastDonation;
      if (remaining > daysToWait) daysToWait = remaining;
      reasonsBn.push(
        `পূর্ববর্তী রক্তদানের পর প্রয়োজনীয় বিরতি সম্পন্ন হয়নি। আপনার ক্ষেত্রে আরও ${remaining} দিন পর রক্ত দেওয়া যাবে।`
      );
      reasonsEn.push(
        `Minimum interval not met. You must wait ${remaining} more day(s) before donating again.`
      );
    }
  }

  // 5. Temporary deferrals
  if (input.hasRecentFeverOrFlu) {
    if (daysToWait < 14) daysToWait = 14;
    reasonsBn.push('জ্বর, ঠাণ্ডা বা সংক্রমণের পর সম্পূর্ণ সুস্থ হয়ে অন্তত ১৪ দিন অপেক্ষা করতে হবে।');
    reasonsEn.push('Wait at least 14 days after full recovery from fever or acute viral illness.');
  }

  if (input.onAntibiotics) {
    if (daysToWait < 7) daysToWait = 7;
    reasonsBn.push('অ্যান্টিবায়োটিক বা বিশেষ ওষুধ সেবন শেষ করার পর অন্তত ৭ দিন বিরতি প্রয়োজন।');
    reasonsEn.push('Defer donation for 7 days after completing antibiotic course.');
  }

  if (input.hasRecentSurgery) {
    if (daysToWait < 180) daysToWait = 180;
    reasonsBn.push('বড় অস্ত্রোপচার (মেজর সার্জারি) সম্পন্ন হওয়ার পর অন্তত ৬ মাস রক্তদান স্থগিত রাখতে হবে।');
    reasonsEn.push('Defer donation for 6 months following major surgery.');
  }

  if (input.hasRecentTattooOrPiercing) {
    if (daysToWait < 180) daysToWait = 180;
    reasonsBn.push('ট্যাটু বা বডি পিয়ার্সিং সম্পন্ন করার পর হেপাটাইটিস স্ক্রিনিং উইন্ডো পিরিয়ড হিসেবে ৬ মাস অপেক্ষা করতে হবে।');
    reasonsEn.push('Defer donation for 6 months after receiving a tattoo or body piercing.');
  }

  if (input.isPregnantOrNursing) {
    reasonsBn.push('গর্ভাবস্থায় এবং শিশুকে বুকের দুধ পান করানোর সময়কালে রক্তদান থেকে বিরত থাকতে হবে।');
    reasonsEn.push('Defer donation throughout pregnancy and lactation period.');
  }

  if (hasPermanentIneligibility) {
    return {
      isEligible: false,
      status: 'ineligible',
      reasonsBn,
      reasonsEn,
      daysToWait: 0,
    };
  }

  if (reasonsBn.length > 0) {
    return {
      isEligible: false,
      status: 'temporarily_deferred',
      reasonsBn,
      reasonsEn,
      daysToWait,
    };
  }

  return {
    isEligible: true,
    status: 'eligible',
    reasonsBn: [],
    reasonsEn: [],
    daysToWait: 0,
  };
}

export interface CompatibilityInfo {
  canDonateTo: BloodGroup[];
  canReceiveFrom: BloodGroup[];
  isUniversalDonor: boolean;
  isUniversalRecipient: boolean;
  noteBn: string;
  noteEn: string;
}

export const BLOOD_COMPATIBILITY: Record<BloodGroup, CompatibilityInfo> = {
  'O-': {
    canDonateTo: ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
    canReceiveFrom: ['O-'],
    isUniversalDonor: true,
    isUniversalRecipient: false,
    noteBn: 'O নেগেটিভ হলো লোহিত রক্তকণিকার সার্বজনীন দাতা (Universal Red Cell Donor)। যে কাউকে রক্ত দিতে পারেন।',
    noteEn: 'O Negative is the universal red blood cell donor, compatible with all recipients.',
  },
  'O+': {
    canDonateTo: ['O+', 'A+', 'B+', 'AB+'],
    canReceiveFrom: ['O+', 'O-'],
    isUniversalDonor: false,
    isUniversalRecipient: false,
    noteBn: 'O পজিটিভ সকল পজিটিভ রক্তের গ্রুপকে রক্ত দিতে পারেন।',
    noteEn: 'O Positive can donate to all Rh-positive blood groups.',
  },
  'A-': {
    canDonateTo: ['A-', 'A+', 'AB-', 'AB+'],
    canReceiveFrom: ['A-', 'O-'],
    isUniversalDonor: false,
    isUniversalRecipient: false,
    noteBn: 'A নেগেটিভ গ্রুপ A এবং AB গ্রুপে রক্ত প্রদান করতে পারেন।',
    noteEn: 'A Negative can donate red cells to A and AB recipients.',
  },
  'A+': {
    canDonateTo: ['A+', 'AB+'],
    canReceiveFrom: ['A+', 'A-', 'O+', 'O-'],
    isUniversalDonor: false,
    isUniversalRecipient: false,
    noteBn: 'A পজিটিভ গ্রুপ A+ এবং AB+ রোগীদের রক্ত দিতে পারেন।',
    noteEn: 'A Positive can donate to A+ and AB+ recipients.',
  },
  'B-': {
    canDonateTo: ['B-', 'B+', 'AB-', 'AB+'],
    canReceiveFrom: ['B-', 'O-'],
    isUniversalDonor: false,
    isUniversalRecipient: false,
    noteBn: 'B নেগেটিভ গ্রুপ B এবং AB গ্রুপে রক্ত দিতে পারেন।',
    noteEn: 'B Negative can donate red cells to B and AB recipients.',
  },
  'B+': {
    canDonateTo: ['B+', 'AB+'],
    canReceiveFrom: ['B+', 'B-', 'O+', 'O-'],
    isUniversalDonor: false,
    isUniversalRecipient: false,
    noteBn: 'B পজিটিভ গ্রুপ B+ এবং AB+ রোগীদের রক্ত দিতে পারেন।',
    noteEn: 'B Positive can donate to B+ and AB+ recipients.',
  },
  'AB-': {
    canDonateTo: ['AB-', 'AB+'],
    canReceiveFrom: ['AB-', 'A-', 'B-', 'O-'],
    isUniversalDonor: false,
    isUniversalRecipient: false,
    noteBn: 'AB নেগেটিভ সকল নেগেটিভ রক্তের গ্রুপ থেকে রক্ত গ্রহণ করতে পারেন।',
    noteEn: 'AB Negative can receive from all Rh-negative blood groups.',
  },
  'AB+': {
    canDonateTo: ['AB+'],
    canReceiveFrom: ['AB+', 'AB-', 'A+', 'A-', 'B+', 'B-', 'O+', 'O-'],
    isUniversalDonor: false,
    isUniversalRecipient: true,
    noteBn: 'AB পজিটিভ হলো সার্বজনীন গ্রহীতা (Universal Recipient)। যেকোনো গ্রুপের রক্ত গ্রহণ করতে পারেন।',
    noteEn: 'AB Positive is the universal recipient for red blood cells.',
  },
  'Unknown': {
    canDonateTo: [],
    canReceiveFrom: [],
    isUniversalDonor: false,
    isUniversalRecipient: false,
    noteBn: 'রক্তের গ্রুপ এখনও ল্যাবরেটরিতে নির্ধারিত হয়নি।',
    noteEn: 'Blood group not yet clinically determined.',
  },
};
