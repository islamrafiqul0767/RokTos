# Quality Assurance Plan

## Automated Validation
1. **Unit Testing**: Native Node 22 test suite (`node --test src/utils/rules.test.ts`) covering 8 critical test suites (100% pass rate):
   - Display name masking
   - Phone and email sanitization
   - BD mobile number validation
   - Donor registration validation
   - Privacy projection data isolation (zero phone/email leakage)
   - Clinical donor eligibility assessment and deferral calculator
   - Hematological blood group compatibility matrix (universal donor O- and universal recipient AB+)
2. **Type Checking & Bundling**:
   - `npm run lint` (`tsc --noEmit`) passes with 0 errors.
   - `npm run build` compiles clean production bundle in `dist/`.
3. **Browser Testing (Playwright CLI)**:
   - First paint desktop capture (`r3-desktop.png`).
   - Mobile capture (`r2-mobile.png`).
   - Search directory and filter capture (`r3-donors.png`).
   - Interactive Contact Modal capture (`r3-contact-modal.png`).
   - Request creation form capture (`r3-create-request.png`).
   - Active blood requests capture (`r3-blood-requests.png`).
   - Language toggle verification (`r3-english.png`).
