# Technical Architecture

## 1. System Overview
RoktoBondhu is structured as a client-side single page application (SPA) running React 19 on Vite, backed natively by Google Cloud Firestore and Firebase Authentication.

```
       [ Browser Client / Android Chrome / Mobile ]
                             │
                             ▼
     ┌───────────────────────────────────────────────┐
     │              React 19 SPA (Vite)              │
     │  - LanguageContext (bn / en)                  │
     │  - AuthContext (Google Sign-In)               │
     │  - Client Routing & View Dispatch             │
     │  - Input Sanitization & Privacy Projections   │
     └───────────────────────┬───────────────────────┘
                             │
            ┌────────────────┴────────────────┐
            ▼                                 ▼
┌─────────────────────────┐       ┌─────────────────────────┐
│   Firebase Auth         │       │  Cloud Firestore DB     │
│   (Google Sign-in)      │       │  - Zero-Trust ABAC      │
│                         │       │  - Split Collections    │
└─────────────────────────┘       └─────────────────────────┘
```

## 2. Privacy Split-Collection Pattern
To guarantee that personally identifiable information (PII) such as phone numbers, emails, and exact settings are never exposed via query scraping:

1. **`userPrivateProfiles/{uid}`**:
   - Contains raw contact numbers, email, settings, and timestamps.
   - Guarded by Firestore rule: only the authenticated owner (`request.auth.uid == uid`) or `isAdmin()` can read or write.
2. **`publicDonorProfiles/{uid}`**:
   - Contains strictly allowlisted projection fields: `displayLabel`, `bloodGroup`, `division`, `district`, `approximateArea`, `selfReportedAvailability`.
   - Written only when `consentGiven == true`.
   - Readable by public visitors only when `publicVisibility == true` and `moderationStatus == 'approved'`.

## 3. Contact Flow State Machine
```
[ Seeker ] ──> createContactRequest(status: 'pending')
                    │
                    ▼
[ Donor Dashboard ] ──> review request
                    │
           ┌────────┴────────┐
           ▼                 ▼
   [ Accept ]           [ Decline ]
(reveals contact)     (no contact revealed)
```
