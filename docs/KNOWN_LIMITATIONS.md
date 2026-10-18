# Known Limitations & Architecture Boundaries

1. **Sensitive Document Uploads Disabled**:
   - In accordance with MVP safety requirements, raw National ID (NID) photos, medical certificates, prescriptions, and blood-test reports cannot be uploaded directly to Cloud Storage. This prevents accidental exposure of high-risk medical PII.
2. **Phone Verification (SMS OTP)**:
   - Phone verification via SMS OTP is not enabled because third-party SMS gateways and carrier routing in Bangladesh require external telco agreements and billing. Real Google Sign-In is used as the primary verified identity provider.
3. **No Automatic Full-Text Fuzzy Search**:
   - Cloud Firestore supports exact matching and prefix queries rather than arbitrary full-text inverted indexes. Donor searching uses composite multi-field structured filtering (division, district, blood group, availability).
4. **Independent Medical Responsibility**:
   - RoktoBondhu provides communication coordination; it does not dispatch ambulances or verify live bedside compatibility.
