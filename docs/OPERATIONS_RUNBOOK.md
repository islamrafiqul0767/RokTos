# Operations Runbook

## 1. Daily Operations
- Review `/admin` queue for pending abuse reports (`userReports`).
- Verify that fulfilled or cancelled blood requests are archived.
- Monitor Firestore usage metrics in Firebase Console to ensure Spark/Enterprise free quota is within healthy limits.

## 2. Managing Verifications
- Only authorized staff access `/admin` to evaluate verification evidence.
- Every review decision must record a valid reason code and reviewer UID.
