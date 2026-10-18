# Verification Policy

## 1. Principles
- **Zero Paid Badges**: Verification cannot be purchased, sponsored, or obtained via donations.
- **Segregated States**:
  - `Identity Details Reviewed`: Confirms personal identity authenticity without verifying medical fitness.
  - `Blood Group Evidence Reviewed`: Confirms documentation of blood group from licensed laboratory cards without guaranteeing current health qualification.
- **Clinical Humility**: Verification NEVER implies that a donor is medically safe, currently available, or immunologically compatible with a specific recipient. Mandatory hospital screening remains strictly enforceable.

## 2. Review Workflow
1. User requests verification or provides external evidence in a controlled, non-retained procedure.
2. Authorized reviewer examines credentials.
3. Reviewer submits decision through the Staff Console (`adminService.submitVerificationDecision`).
4. An immutable audit record is saved in `moderationActions` with reviewer UID, timestamp, and reason code.
5. Users can view their verification status in their profile and dashboard.
