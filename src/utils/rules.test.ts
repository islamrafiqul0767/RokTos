import test from 'node:test';
import assert from 'node:assert/strict';
import { maskDisplayName, sanitizePublicText, toPublicDonorProjection } from './privacy.ts';
import { isValidBDPhone, validateDonorRegistration, isValidBloodGroup } from './validation.ts';
import type { UserPrivateProfile } from '../types/index.ts';

test('maskDisplayName privacy transformation', () => {
  assert.equal(maskDisplayName('Md. Rafiqul Islam'), 'Md. Rafiqul I.');
  assert.equal(maskDisplayName('Kabir'), 'Kabir');
  assert.equal(maskDisplayName('Syeda Fatima Zahra'), 'Syeda Fatima Z.');
});

test('sanitizePublicText strips phone numbers and emails', () => {
  const textWithPhone = 'Emergency contact me at 01712345678 immediately.';
  const sanitizedPhone = sanitizePublicText(textWithPhone);
  assert.equal(sanitizedPhone.hasContactLeak, true);
  assert.match(sanitizedPhone.cleanText, /Phone hidden/);

  const textWithEmail = 'Email me at donor@example.com for info.';
  const sanitizedEmail = sanitizePublicText(textWithEmail);
  assert.equal(sanitizedEmail.hasContactLeak, true);
  assert.match(sanitizedEmail.cleanText, /Email hidden/);

  const cleanText = 'Available for donation at BSMMU hospital.';
  const sanitizedClean = sanitizePublicText(cleanText);
  assert.equal(sanitizedClean.hasContactLeak, false);
  assert.equal(sanitizedClean.cleanText, cleanText);
});

test('isValidBDPhone detects valid Bangladesh mobile numbers', () => {
  assert.equal(isValidBDPhone('01712345678'), true);
  assert.equal(isValidBDPhone('+8801812345678'), true);
  assert.equal(isValidBDPhone('01300000000'), true);
  assert.equal(isValidBDPhone('01212345678'), false); // 012 is invalid in BD
  assert.equal(isValidBDPhone('12345'), false);
});

test('isValidBloodGroup validates correct blood groups', () => {
  assert.equal(isValidBloodGroup('O+'), true);
  assert.equal(isValidBloodGroup('AB-'), true);
  assert.equal(isValidBloodGroup('Unknown'), true);
  assert.equal(isValidBloodGroup('C+'), false);
});

test('toPublicDonorProjection never leaks private phone or email', () => {
  const privateProfile: UserPrivateProfile = {
    uid: 'user_123',
    displayName: 'Tanvir Hossain',
    email: 'private_tanvir@example.com',
    phone: '01912345678',
    preferredLanguage: 'bn',
    division: 'dhaka',
    district: 'dhaka_city',
    upazila: 'mirpur',
    approximateArea: 'Section 10',
    preferredContactChannel: 'phone',
    role: 'donor',
    isDonor: true,
    bloodGroup: 'B+',
    identityReviewStatus: 'not_started',
    bloodGroupReviewStatus: 'not_started',
    consentGiven: true,
    consentVersion: '2026-v1',
    ageConfirmed18: true,
    termsAccepted: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const projection = toPublicDonorProjection(privateProfile);

  assert.equal(projection.uid, 'user_123');
  assert.equal(projection.bloodGroup, 'B+');
  assert.equal(projection.displayLabel, 'Tanvir H.');
  // Ensure private properties do not exist on projection
  assert.equal((projection as any).phone, undefined);
  assert.equal((projection as any).email, undefined);
  assert.equal((projection as any).preferredContactChannel, undefined);
});

test('validateDonorRegistration enforces age 18+ and mandatory consent', () => {
  const underageResult = validateDonorRegistration({
    displayName: 'Rahim Khan',
    bloodGroup: 'A+',
    division: 'dhaka',
    district: 'dhaka_city',
    ageConfirmed18: false,
    termsAccepted: true,
    consentGiven: true,
  });
  assert.equal(underageResult.isValid, false);
  assert.ok(underageResult.errors.ageConfirmed18);

  const validResult = validateDonorRegistration({
    displayName: 'Rahim Khan',
    bloodGroup: 'A+',
    division: 'dhaka',
    district: 'dhaka_city',
    ageConfirmed18: true,
    termsAccepted: true,
    consentGiven: true,
  });
  assert.equal(validResult.isValid, true);
});

test('checkDonorEligibility correctly evaluates clinical deferral and eligibility', async () => {
  const { checkDonorEligibility } = await import('./eligibility.ts');

  // Case 1: Healthy eligible donor
  const eligible = checkDonorEligibility({
    age: 25,
    weightKg: 65,
    gender: 'male',
    daysSinceLastDonation: 110,
    hasRecentFeverOrFlu: false,
    onAntibiotics: false,
    hasRecentSurgery: false,
    hasRecentTattooOrPiercing: false,
    isPregnantOrNursing: false,
    hasChronicCondition: false,
  });
  assert.equal(eligible.isEligible, true);
  assert.equal(eligible.status, 'eligible');
  assert.equal(eligible.reasonsBn.length, 0);

  // Case 2: Underweight donor
  const underweight = checkDonorEligibility({
    age: 22,
    weightKg: 42,
    gender: 'female',
    daysSinceLastDonation: null,
    hasRecentFeverOrFlu: false,
    onAntibiotics: false,
    hasRecentSurgery: false,
    hasRecentTattooOrPiercing: false,
    isPregnantOrNursing: false,
    hasChronicCondition: false,
  });
  assert.equal(underweight.isEligible, false);
  assert.equal(underweight.status, 'temporarily_deferred');
  assert.ok(underweight.reasonsBn[0].includes('৪৫ কেজি'));

  // Case 3: Insufficient interval for male (< 90 days)
  const tooSoon = checkDonorEligibility({
    age: 30,
    weightKg: 70,
    gender: 'male',
    daysSinceLastDonation: 45,
    hasRecentFeverOrFlu: false,
    onAntibiotics: false,
    hasRecentSurgery: false,
    hasRecentTattooOrPiercing: false,
    isPregnantOrNursing: false,
    hasChronicCondition: false,
  });
  assert.equal(tooSoon.isEligible, false);
  assert.equal(tooSoon.status, 'temporarily_deferred');
  assert.equal(tooSoon.daysToWait, 45); // 90 - 45 = 45 days
});

test('BLOOD_COMPATIBILITY accurately identifies universal donor and recipient', async () => {
  const { BLOOD_COMPATIBILITY } = await import('./eligibility.ts');
  assert.equal(BLOOD_COMPATIBILITY['O-'].isUniversalDonor, true);
  assert.equal(BLOOD_COMPATIBILITY['O-'].canDonateTo.length, 8);
  assert.equal(BLOOD_COMPATIBILITY['AB+'].isUniversalRecipient, true);
  assert.equal(BLOOD_COMPATIBILITY['AB+'].canReceiveFrom.length, 8);
});
