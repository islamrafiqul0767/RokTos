# Deployment Guide

## 1. Connected Cloud Resources
- **Google Cloud / Firebase Project**: `upheld-terra-fsmzh`
- **Cloud Firestore Database**: `ai-studio-roktobondhublood-da17804f-2ee9-449a-b6fa-ec331ab48efc`
- **Rules Deployed**: `firestore.rules` deployed via `fax.DeployRules` RPC.
- **Hosting / Runtime**: Google AI Studio Preview & Cloud Run Service.

## 2. Publish Flow in AI Studio
1. Click the **Publish** button in Google AI Studio to deploy the current build to Cloud Run.
2. Confirm the assigned URL matches the authorized origins in Firebase Authentication.

## 3. Custom Domain Configuration (Optional)
1. Map custom domain in Cloud Run or Firebase Hosting console.
2. Add DNS A/CNAME records provided by the console.
3. Update `public/sitemap.xml` and `public/robots.txt` with your custom domain.
