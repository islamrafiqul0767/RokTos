# Changelog

All notable changes to the RoktoBondhu platform will be documented in this file.

## [2.0.0] - 2026-10-18
### Added & Redesigned
- **ROKTOS Brand Identity System**: Implemented the complete official ROKTOS brand design system derived from the custom logo mark (`/public/logo.svg`, `/public/logo-symbol.svg`, `RoktosLogo.tsx`) combining ROKTOS Crimson (`#BE123C`), Deep Ruby (`#881337`), and Medical Deep Teal (`#0F766E`).
- **Interactive Donor Eligibility Self-Assessment Calculator**: Developed an interactive screening tool (`/donor-eligibility`) calculating clinical fitness based on age, weight, gender-specific intervals (90d for males, 120d for females), and 6 temporary/permanent deferral factors with countdown guidance and direct registration CTA.
- **Hematology Blood Compatibility Matrix**: Built an interactive blood group matrix providing instant Red Blood Cell and Plasma matching rules for all 8 groups, highlighting Universal Donor (O-) and Universal Recipient (AB+).
- **Direct Blood Request Response & Offer Workflow**: Created `OfferHelpModal` allowing authenticated community donors to directly respond to active blood requests ("I Can Donate") with hospital ward coordination notes and mandatory clinical cross-match acknowledgement.
- **In-App Verification Request Workflow**: Enhanced user dashboard and profile settings with separated Identity and Blood Group review tiers and in-app review requests, while preserving zero-trust safeguards against raw document harvesting.
- **Enhanced Admin Moderation & Quick-Review**: Added 1-click verification routing from the donors directory to the admin decision queue with reason-code audit logging.
- **Expanded Test Coverage**: Added 2 new unit test suites in `src/utils/rules.test.ts` covering the clinical eligibility calculator and compatibility matrix (all 8 tests passing).

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
