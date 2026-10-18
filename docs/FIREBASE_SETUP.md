# Firebase Setup & Google Authentication Troubleshooting Guide

## Connected Resources
- **Firebase Project ID**: `upheld-terra-fsmzh`
- **Firestore Database ID**: `ai-studio-roktobondhublood-da17804f-2ee9-449a-b6fa-ec331ab48efc`
- **Auth Domain**: `upheld-terra-fsmzh.firebaseapp.com`
- **Configuration File**: `firebase-applet-config.json`
- **Security Rules**: `firestore.rules` (deployed via `DeployRules` RPC)

---

## CRITICAL: Why Google Sign-In Fails on Vercel & Exact Fixes

When deploying a Firebase application to Vercel or any custom hosting domain, Google Sign-In typically fails due to three specific root causes. Here is the diagnostic breakdown and exact corrective action:

### 1. Root Cause: Unauthorized Domain (`auth/unauthorized-domain`)
Firebase Authentication blocks OAuth requests from any domain that has not been explicitly allowlisted in the Firebase project console.
- **Symptom**: Clicking "Sign in with Google" closes immediately or displays `auth/unauthorized-domain: This domain is not authorized for OAuth operations`.
- **Exact Action Required in Firebase Console**:
  1. Open [Firebase Console](https://console.firebase.google.com/) and select project **`upheld-terra-fsmzh`**.
  2. In the left navigation, click **Authentication** -> **Settings** tab (gear icon) -> **Authorized domains**.
  3. Click **Add domain**.
  4. Enter your exact Vercel production domain (e.g. `roktos.vercel.app` or your custom domain `roktos.org.bd`).
  5. If you use Vercel Preview Deployments, also add `*.vercel.app` or the specific preview domain URL.
  6. Click **Save**.

### 2. Root Cause: Missing Vercel Environment Variables
In development, the app reads credentials from `firebase-applet-config.json`. On Vercel, Vite environment variables prefixed with `VITE_` must be configured in project settings.
- **Symptom**: Firebase initializes with missing API keys or default dummy values.
- **Exact Action Required in Vercel Dashboard**:
  1. Go to your project on [Vercel Dashboard](https://vercel.com/) -> **Settings** -> **Environment Variables**.
  2. Add the following environment variables (values can be found in `firebase-applet-config.json`):
     - `VITE_FIREBASE_API_KEY`: `<Your Firebase API Key>`
     - `VITE_FIREBASE_AUTH_DOMAIN`: `upheld-terra-fsmzh.firebaseapp.com`
     - `VITE_FIREBASE_PROJECT_ID`: `upheld-terra-fsmzh`
     - `VITE_FIREBASE_STORAGE_BUCKET`: `upheld-terra-fsmzh.firebasestorage.app`
     - `VITE_FIREBASE_MESSAGING_SENDER_ID`: `363666552580`
     - `VITE_FIREBASE_APP_ID`: `1:363666552580:web:96e8103fa7d10e0811e9a2`
     - `VITE_FIREBASE_FIRESTORE_DATABASE_ID`: `ai-studio-roktobondhublood-da17804f-2ee9-449a-b6fa-ec331ab48efc`
  3. Redeploy the application on Vercel (**Deployments** -> **Redeploy**).

### 3. Root Cause: Google Cloud Console OAuth 2.0 Client Credentials
Google Sign-In uses a Google Cloud OAuth Client ID behind the scenes.
- **Symptom**: `redirect_uri_mismatch` error or generic OAuth 400 error.
- **Exact Action Required in Google Cloud Console**:
  1. Open [Google Cloud Console Credentials](https://console.cloud.google.com/apis/credentials) for project `upheld-terra-fsmzh`.
  2. Locate the **Web client (auto created by Google Service)** under **OAuth 2.0 Client IDs**.
  3. Under **Authorized JavaScript origins**, ensure:
     - `https://upheld-terra-fsmzh.firebaseapp.com`
     - `https://your-vercel-domain.vercel.app`
  4. Under **Authorized redirect URIs**, ensure:
     - `https://upheld-terra-fsmzh.firebaseapp.com/__/auth/handler`
  5. Click **Save**.

### 4. Root Cause: Mobile Popup Blocking (`auth/popup-blocked`)
Mobile Safari, Chrome on iOS, and in-app webviews (e.g. Facebook, Messenger, Telegram) frequently block popups.
- **ROKTOS Built-in Solution**:
  - `GoogleSignInButton.tsx` and `AuthContext.tsx` implement automatic fallback to `signInWithRedirect` via Firebase Auth.
  - If a popup is blocked, the user is immediately presented with a one-click **"Continue with Redirect Flow"** option, and `getRedirectResult(auth)` automatically completes the sign-in on return without losing state.

---

## Client-Side Authentication Architecture
- Initialized in `src/config/firebase.ts`.
- Session persistence is strictly set to `browserLocalPersistence` so users remain authenticated across page reloads and browser restarts.
- Errors are parsed into human-friendly bilingual (Bengali and English) diagnostics with exact recovery advice via `parseAuthError()`.
