# Database Schema & Firestore Collections

## 1. Schema Architecture
RoktoBondhu utilizes a document-oriented Firestore structure designed to enforce Attribute-Based Access Control (ABAC) and complete PII isolation.

### Collections Summary
| Collection Name | Document ID Pattern | Purpose & Access Boundary |
|---|---|---|
| `userPrivateProfiles` | `{uid}` | Private user credentials, PII (phone, email), and consent records. Owner/Admin only. |
| `publicDonorProfiles` | `{uid}` | Sanitized public projection of opted-in donors. Public read for approved records. |
| `bloodRequests` | `req_{timestamp}_{rand}` | Structured blood donation requests. Public read when approved. Owner/Admin write. |
| `contactRequests` | `cr_{timestamp}_{rand}` | Private seeker-to-donor contact requests. Strictly limited to involved parties. |
| `userReports` | `rep_{timestamp}_{rand}` | Abuse and scam reports. Authenticated create; staff-only read/write. |
| `verificationReviews` | `vr_{timestamp}_{rand}` | Identity and blood-group verification records. Staff-only write; user can read own. |
| `moderationActions` | `act_{timestamp}_{rand}` | Append-only audit log of administrative actions. Staff-only. |
| `siteConfig` | `default` | Global editable settings and feature flags. Public read; admin write. |
| `admins` | `{uid}` | Explicit administrator registry document. |
