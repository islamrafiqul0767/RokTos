# Changelog

All notable changes to the RoktoBondhu platform will be documented in this file.

## [1.0.0] - 2026-10-17
### Added
- **Native Firebase Provisioning**: Connected Google Cloud project `upheld-terra-fsmzh` with dedicated Cloud Firestore instance and Firebase Authentication.
- **ABAC Security Rules**: Authored and deployed zero-trust `firestore.rules` with default deny, PII separation, immutable field protection, and admin override.
- **Privacy Architecture**: Implemented split-collection projection (`userPrivateProfiles` vs `publicDonorProfiles`) and text sanitization against contact leaks.
- **Public Directory & Filtering**: Implemented multi-parameter search for blood groups (A+, A-, B+, B-, AB+, AB-, O+, O-), divisions, and districts of Bangladesh.
- **Consent-Based Contact System**: Built end-to-end seeker-donor request messaging flow with mutual consent revelation.
- **Blood Request Lifecycle**: Created request submission with urgency rating, hospital area, and patient privacy initials.
- **Staff Moderation Console**: Implemented admin dashboard for donor moderation, request approval, verification reviews, abuse report resolution, and audit logs.
- **Labeled Demo Seeder**: Integrated safe sample data seeder for local testing without leaking real personal info.
- **Bilingual Bengali/English**: Built full translation coverage with immediate language switcher.
- **Technical SEO & Structured Data**: Configured dynamic meta tags, Schema.org WebSite JSON-LD, `robots.txt`, and canonical XML sitemap.
- **Unit Test Suite**: Created automated Node 22 test runner for pure validation and privacy transformations.
