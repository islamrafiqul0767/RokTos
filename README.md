# RoktoBondhu (রক্তবন্ধু)
> **“রক্তের প্রয়োজনে, পাশে থাকুক মানুষ।”**  
> *Connecting people who need blood with willing community donors in Bangladesh.*

[![Status](https://img.shields.io/badge/Status-Functional_MVP-emerald.svg)](#)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](#)
[![Market](https://img.shields.io/badge/Market-Bangladesh_🇧🇩-rose.svg)](#)

RoktoBondhu is a community-driven, non-commercial blood donor discovery and request support platform tailored for Bangladesh. Built with React 19, TypeScript, Tailwind CSS, and backed natively by Google Cloud Firestore and Firebase Authentication.

---

## 🌟 Key Features

1. **Privacy-Preserving Public Directory**:
   - Explicit opt-in and consent required before any donor profile is projected.
   - PII Isolation: Mobile numbers and email addresses are NEVER published in open HTML or search engines.
   - Public projections use privacy-masked display labels (e.g. `Rafiqul I.`) and approximate areas.

2. **Consent-Based Contact Flow**:
   - Seekers submit structured contact requests with clinical context.
   - Donors retain full autonomy: phone/email channels are revealed ONLY after explicit acceptance.

3. **Two Distinct Verification States (Zero-Paid Badges)**:
   - `Identity Details Reviewed`: Evaluated against national identity parameters.
   - `Blood Group Evidence Reviewed`: Evaluated against certified lab/donor card records.
   - Paid verification or badge purchasing is strictly prohibited.

4. **Structured Blood Request Lifecycle**:
   - Create urgent, critical, or routine requests with hospital details.
   - Automated sanitization strips unauthorized contact information from public descriptions to deter harassment.

5. **Staff Moderation & Zero-Trust Security**:
   - Role-Based Access Control (RBAC) enforced via Attribute-Based Access Control (ABAC) Firestore Security Rules.
   - Bootstrapped admin detection for authorized management.
   - Abuse reporting queue with real-time resolution workflow and immutable audit logs.

6. **Bilingual (Bengali-First & English-Ready)**:
   - Complete interface translation for every form, label, policy, and button.

---

## 🏗️ Tech Stack

- **Frontend**: React 19, Vite 8, TypeScript 7, Tailwind CSS 4, Lucide Icons, Motion
- **Backend & Database**: Google Cloud Firestore (Database ID: `ai-studio-roktobondhublood-da17804f-2ee9-449a-b6fa-ec331ab48efc`)
- **Authentication**: Firebase Authentication (Google Sign-In)
- **Deployment Runtime**: Google AI Studio / Google Cloud Run

---

## 🚀 Getting Started

### Local Development
```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
```

### Unit Tests
```bash
# Run native Node 22 unit tests for logic & privacy rules
node --test src/utils/rules.test.ts
```

### Build & Compilation
```bash
npm run build
```

---

## 📚 Documentation Index

For complete operational, security, and technical specifications, explore the [`/docs`](/docs) directory:
- [Technical Architecture](/docs/TECHNICAL_ARCHITECTURE.md)
- [Database Schema & Collections](/docs/DATABASE_SCHEMA.md)
- [Data Dictionary](/docs/DATA_DICTIONARY.md)
- [Firestore Security Rules & ABAC](/docs/FIRESTORE_SECURITY_RULES.md)
- [Security Threat Model](/docs/SECURITY_THREAT_MODEL.md)
- [Verification Policy](/docs/VERIFICATION_POLICY.md)
- [SEO Strategy & Implementation](/docs/SEO_STRATEGY.md)
- [Search Console Setup](/docs/SEARCH_CONSOLE_SETUP.md)
- [Known Limitations](/docs/KNOWN_LIMITATIONS.md)

---

## ⚖️ Legal & Medical Disclaimer

RoktoBondhu is an opt-in volunteer coordination directory. It is not an ambulance service, clinic, blood bank, or diagnostic facility. Under the Bangladesh Safe Blood Transfusion regulatory framework, pre-transfusion infectious disease screening (HIV, HBV, HCV, Syphilis, Malaria) and clinical cross-matching conducted by licensed medical practitioners are strictly mandatory prior to any transfusion.
