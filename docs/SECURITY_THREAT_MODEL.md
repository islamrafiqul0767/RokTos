# Security Threat Model

## 1. Threat Actors & Attack Vectors

### Actor A: Commercial Data Harvesters / Telemarketers
- **Objective**: Scrape phone numbers and names of blood donors for spamming or marketing.
- **Mitigation**: Split collection projection architecture. Phone numbers and emails are never present in public documents or list queries. Access to private phone requires mutual consent-based approval.

### Actor B: Malicious Requester / Fraudsters
- **Objective**: Fabricate urgent blood emergencies to solicit donations or cash payments.
- **Mitigation**:
  - Medical disclaimers prominently remind users that cash transactions for blood are illegal.
  - Automated sanitization strips raw phone numbers from public descriptions.
  - Abuse reporting pipeline (`userReports`) with moderator intervention.

### Actor C: Privileged Account Impersonator
- **Objective**: Escalate user role to `admin` or mark personal profile as `reviewed`.
- **Mitigation**:
  - ABAC security rules reject client updates targeting `role`, `identityReviewStatus`, or `bloodGroupReviewStatus`.
  - Admin access requires email verification or existence in restricted `/admins` collection.

### Actor D: Denial of Wallet / Resource Poisoning
- **Objective**: Send gigabyte-scale payloads or multi-kilobyte document IDs to inflate Firestore bill.
- **Mitigation**: Document IDs are capped at 128 bytes with regex guards. String lengths are strictly bounded.
