# Privacy & Data Retention Policy

## 1. Data Minimization Principles
- No collection of National ID card scans, passports, or biometrics.
- No collection of medical test documents, diagnostic files, or prescriptions.
- Exact residential addresses and GPS coordinates are never stored.

## 2. Retention Schedules
| Data Category | Purpose | Retention Duration |
|---|---|---|
| User Private Profile | Account identity & contact channels | Active duration; purged upon deletion request. |
| Public Donor Projection | Discovery directory | Active duration; revokable immediately by donor. |
| Blood Requests | Transfusion coordination | Retained until marked fulfilled/cancelled or 30 days after needed date. |
| Contact Requests | Consent-based messaging | Retained for 90 days for audit and abuse investigation, then pruned. |
| User Reports & Abuse Logs | Safety & moderation | Retained for 180 days in restricted staff collection. |
| Audit Logs | Accountability | Append-only audit record kept for 12 months. |

## 3. Account Deletion Workflow
1. User submits deletion request via Settings or email (`islamrafiqul0767@gmail.com`).
2. Immediate revocation: Public donor projection is toggled off (`publicVisibility: false`) within seconds.
3. Purge: Associated private profile and active blood requests are removed from Cloud Firestore.
