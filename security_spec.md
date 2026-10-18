# RoktoBondhu Firestore Security Specification

## 1. Data Invariants
1. **PII Isolation**: `userPrivateProfiles` contains private personal identifying information (phone, real email, full settings) and MUST NEVER be readable or queryable by anyone other than the authenticated resource owner (`request.auth.uid == uid`) or verified administrators (`isAdmin()`).
2. **Public Projection Separation**: `publicDonorProfiles` contains strictly filtered, allowlisted non-identifying data. Only profiles where `publicVisibility == true` and `moderationStatus == 'approved'` can be read by public visitors.
3. **No Self-Assigned Privileges**: Normal users can NEVER set or update `role`, `identityReviewStatus`, `bloodGroupReviewStatus`, `moderationStatus`, or `reportCount` during create or update. Only admins or privileged server paths can alter review and moderation fields.
4. **Author Integrity**: For `bloodRequests` and `contactRequests`, the author/requester ID in the document must strictly equal `request.auth.uid`.
5. **Contact Request Privacy**: `contactRequests` documents can ONLY be read by either the `requesterUid` or the targeted `donorUid`. Random third parties cannot list or view contact requests.
6. **No Terminal State Overwriting**: Once a blood request or contact request reaches terminal states (`fulfilled`, `cancelled`, `expired`, `rejected`), ordinary users cannot revert the state back to active.
7. **Abuse Reports Secrecy**: `userReports` can be created by authenticated users, but only admins can read or update reports. The reported entity cannot inspect complaints filed against them.
8. **Sensitive Documents Disallowed**: Sensitive medical documents, NID images, and test reports are strictly disabled. No raw image references or file paths are accepted.

---

## 2. The Dirty Dozen Payloads (Targeting Exploits)

1. **Payload 1: Privilege Escalation via User Profile Registration**
   - Attempt: Normal user attempts to register their own profile with `role: "admin"` or `identityReviewStatus: "reviewed"`.
   - Result: `PERMISSION_DENIED`.

2. **Payload 2: PII Harvest on Private Profile Collection**
   - Attempt: Authenticated User B attempts to `get` or `list` `userPrivateProfiles/UserA`.
   - Result: `PERMISSION_DENIED`.

3. **Payload 3: Unapproved Public Donor Injection**
   - Attempt: User attempts to write directly into `publicDonorProfiles` setting `moderationStatus: "approved"` and `bloodGroupReviewStatus: "reviewed"`.
   - Result: `PERMISSION_DENIED`.

4. **Payload 4: Identity Spoofing in Blood Request**
   - Attempt: User A creates a blood request with `createdByUid: "UserB"`.
   - Result: `PERMISSION_DENIED`.

5. **Payload 5: Overwriting Approved Blood Request to Unmoderated State**
   - Attempt: Normal user modifies `moderationStatus` to `"approved"` on an updated request.
   - Result: `PERMISSION_DENIED`.

6. **Payload 6: Intercepting Third-Party Contact Requests**
   - Attempt: User C queries or reads `contactRequests/req_A_to_B` where they are neither requester nor donor.
   - Result: `PERMISSION_DENIED`.

7. **Payload 7: Forged Donor Acceptance**
   - Attempt: Requester attempts to update `status: "accepted"` on their own contact request.
   - Result: `PERMISSION_DENIED`.

8. **Payload 8: Report snooping**
   - Attempt: User attempts to list or read `userReports` collection without admin role.
   - Result: `PERMISSION_DENIED`.

9. **Payload 9: Ghost Field Injection in Blood Request (Shadow Update)**
   - Attempt: User sends an update payload containing extra unauthorized fields like `verifiedScore: 100` or `isAdmin: true`.
   - Result: `PERMISSION_DENIED`.

10. **Payload 10: Modifying Immutable `createdAt` or `id`**
    - Attempt: User updates an existing request attempting to modify the original `createdAt` timestamp.
    - Result: `PERMISSION_DENIED`.

11. **Payload 11: Document ID Poisoning with Oversized Key**
    - Attempt: Attacker sends write with 2KB junk character key path to exhaust wallet.
    - Result: `PERMISSION_DENIED` via `isValidId()`.

12. **Payload 12: Direct Modification of Site Configuration**
    - Attempt: Non-admin attempts to update `siteConfig/default` to enable sensitive document uploads.
    - Result: `PERMISSION_DENIED`.
