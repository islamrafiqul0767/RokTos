# Firestore Security Rules Architecture

## 1. Zero-Trust Core Architecture
The deployed rules file (`firestore.rules`) enforces strict Attribute-Based Access Control (ABAC) adhering to the Eight Pillars of Hardened Rules:

1. **Global Default Deny**:
   ```javascript
   match /{document=**} {
     allow read, write: if false;
   }
   ```
2. **Path Variable Hardening**: Document IDs are validated via `isValidId()` to prevent resource poisoning attacks:
   ```javascript
   function isValidId(id) {
     return id is string && id.size() > 0 && id.size() <= 128 && id.matches('^[a-zA-Z0-9_\\-]+$');
   }
   ```
3. **No Blanket Reads**: Every `list` rule evaluates `resource.data` to prevent unauthorized query scraping.
4. **Bootstrapped Admin Authentication**:
   ```javascript
   function isAdmin() {
     return isSignedIn() && (
       (request.auth.token.email == 'islamrafiqul0767@gmail.com') ||
       exists(/databases/$(database)/documents/admins/$(request.auth.uid))
     );
   }
   ```
5. **PII Isolation**: `userPrivateProfiles` documents are never public readable.
6. **Immutable Key Safeguards**: Users are blocked from updating `uid`, `createdByUid`, or `createdAt` on existing records.
7. **Privilege Escalation Prevention**: Normal users cannot set or modify `role`, `identityReviewStatus`, `bloodGroupReviewStatus`, or `moderationStatus`.
