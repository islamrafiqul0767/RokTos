# Production Deployment & Hosting Guide

## 1. Hosting Architecture
ROKTOS is designed as a high-performance React + TypeScript single-page web application optimized for Vite and compatible with Vercel, Cloud Run, and Firebase Hosting.

- **Vercel Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`
- **Node.js Runtime**: v20.x or v22.x

---

## 2. Vercel Deployment Checklist

### Step 1: Push Source Code to GitHub
Ensure the latest changes with ROKTOS branding, interactive eligibility calculator, privacy projection safeguards, and updated translations are pushed to your default repository branch (`main`).

### Step 2: Configure Vercel Project
1. Log in to [Vercel](https://vercel.com/) and click **Add New...** -> **Project**.
2. Select your ROKTOS GitHub repository.
3. Keep Framework Preset as **Vite**.
4. Set Build Command: `npm run build`.
5. Set Output Directory: `dist`.

### Step 3: Configure Environment Variables in Vercel
Go to **Project Settings** -> **Environment Variables** and enter the following:

| Variable Name | Required Value |
|---|---|
| `VITE_FIREBASE_API_KEY` | Your Firebase API Key from `firebase-applet-config.json` |
| `VITE_FIREBASE_AUTH_DOMAIN` | `upheld-terra-fsmzh.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | `upheld-terra-fsmzh` |
| `VITE_FIREBASE_STORAGE_BUCKET` | `upheld-terra-fsmzh.firebasestorage.app` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | `363666552580` |
| `VITE_FIREBASE_APP_ID` | `1:363666552580:web:96e8103fa7d10e0811e9a2` |
| `VITE_FIREBASE_FIRESTORE_DATABASE_ID` | `ai-studio-roktobondhublood-da17804f-2ee9-449a-b6fa-ec331ab48efc` |

### Step 4: Authorize Vercel Domain in Firebase Console
This is the **#1 reason Google Sign-In fails on live Vercel deployments**.
1. Open [Firebase Console](https://console.firebase.google.com/) -> Select **`upheld-terra-fsmzh`**.
2. Go to **Authentication** -> **Settings** tab -> **Authorized domains**.
3. Click **Add domain**.
4. Add your deployed Vercel domain (e.g. `your-app.vercel.app`).
5. Also add any custom production domain (e.g. `roktos.org.bd`).

### Step 5: Verify SPA Routing Rewrites
To prevent 404 errors when reloading client-side routes like `/donors`, `/blood-requests`, or `/dashboard`, verify that `vercel.json` exists in root with rewrite rules:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## 3. Post-Deployment Verification
- [ ] Visit home page at your live Vercel domain.
- [ ] Check console for clean initialization (no auth errors, no unhandled rejections).
- [ ] Test Google Sign-In with both desktop popup and mobile redirect flows.
- [ ] Test donor eligibility calculator at `/donor-eligibility`.
- [ ] Test donor search filters (Division, District, Blood Group) at `/donors`.
- [ ] Test mutual consent contact request modal.
