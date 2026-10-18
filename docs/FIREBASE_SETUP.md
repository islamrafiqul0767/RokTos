# Firebase Setup & Configuration

## Connected Resources
- **Firebase Project ID**: `upheld-terra-fsmzh`
- **Firestore Database ID**: `ai-studio-roktobondhublood-da17804f-2ee9-449a-b6fa-ec331ab48efc`
- **Auth Domain**: `upheld-terra-fsmzh.firebaseapp.com`
- **Config File**: `firebase-applet-config.json`
- **Rules File**: `firestore.rules` (deployed via `DeployRules` RPC)

## Authentication Configuration
1. **Google Sign-In**:
   - Provisioned via Google AI Studio Firebase flow.
   - Initialized in `src/config/firebase.ts` with `GoogleAuthProvider` and `signInWithPopup`.
2. **Authorized Domains**:
   - The production domain (`ais-pre-me4lxl52u5ytjzbof64jux-363666552580.asia-southeast1.run.app`) and development domain are automatically authorized by the environment.

## Database Initialization
- Initialized with `getFirestore(app, firebaseConfig.firestoreDatabaseId)`.
- Verified at application startup via `testFirestoreConnection()` to detect offline or missing instance states.
