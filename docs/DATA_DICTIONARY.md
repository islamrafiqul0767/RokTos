# Data Dictionary

## 1. `userPrivateProfiles`
- **`uid`** (string, required): Firebase Auth unique user identifier.
- **`displayName`** (string, required): Full real name provided by user or OAuth.
- **`email`** (string, required): Private user email address. Never exposed publicly.
- **`phone`** (string, optional): Private Bangladeshi phone number (e.g. `017XXXXXXXX`).
- **`preferredLanguage`** ('bn' | 'en'): User language preference.
- **`division`** (string): Selected administrative division.
- **`district`** (string): Selected district.
- **`approximateArea`** (string): Neighborhood or general locality (no exact flat/house).
- **`preferredContactChannel`** ('in_app' | 'phone' | 'email'): Preference for seeker contact.
- **`role`** (string): User role (`registered_user`, `donor`, `moderator`, `admin`).
- **`isDonor`** (boolean): Whether user has registered as an opt-in donor.
- **`bloodGroup`** (string): Self-reported or reviewed blood group.
- **`identityReviewStatus`** ('not_started' | 'pending' | 'reviewed' | 'rejected' | 'needs_recheck').
- **`bloodGroupReviewStatus`** ('not_started' | 'pending' | 'reviewed' | 'rejected' | 'needs_recheck').
- **`consentGiven`** (boolean): Explicit consent to list public projection.
- **`ageConfirmed18`** (boolean): Mandatory age 18+ confirmation flag.
- **`termsAccepted`** (boolean): Mandatory legal disclaimer acknowledgement.

## 2. `publicDonorProfiles`
- **`uid`** (string, required): Links to user document.
- **`displayLabel`** (string, required): Privacy-preserving public name (e.g. `Tanvir H.`).
- **`bloodGroup`** (string, required): Blood group (A+, A-, B+, B-, AB+, AB-, O+, O-, Unknown).
- **`bloodGroupReviewStatus`** (string): Public review badge state.
- **`identityReviewStatus`** (string): Public identity badge state.
- **`division`** (string): Division name.
- **`district`** (string): District name.
- **`approximateArea`** (string): General locality.
- **`selfReportedAvailability`** ('available' | 'temporarily_unavailable' | 'paused').
- **`availabilityLastUpdatedAt`** (ISO string): Timestamp of last self-report update.
- **`publicVisibility`** (boolean): Controls public search eligibility.
- **`moderationStatus`** ('approved' | 'pending' | 'rejected').

## 3. `bloodRequests`
- **`id`** (string, required): Unique request ID.
- **`createdByUid`** (string, required): Requester Firebase UID.
- **`patientDisplayNameOrInitials`** (string, required): Privacy-safe patient identifier.
- **`requestedBloodGroup`** (string, required): Blood group needed.
- **`unitsNeeded`** (string): Units/bags required.
- **`hospitalName`** (string, required): Medical facility.
- **`hospitalArea`** (string): Locality of facility.
- **`division`** / **`district`** (string): Geographic location.
- **`neededByDate`** (ISO string): Needed by deadline.
- **`urgencyLevel`** ('routine' | 'urgent' | 'critical').
- **`shortDescription`** (string): Sanitized public clinical context.
- **`status`** ('draft' | 'pending_moderation' | 'approved' | 'fulfilled' | 'cancelled' | 'expired').
