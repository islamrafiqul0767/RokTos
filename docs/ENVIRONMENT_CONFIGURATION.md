# Environment Configuration

## Configuration Files
- **`firebase-applet-config.json`**:
  Stores client-safe Firebase project parameters (Project ID, Auth Domain, API Key, Database ID).
  *Note: API keys in Firebase identify the project and do not grant unauthorized data access; Firestore Security Rules enforce all permissions.*
- **`.env.example`**:
  Defines environment placeholders for secrets:
  - `GEMINI_API_KEY`: Server-side API key if generative features are enabled.
  - `APP_URL`: The Cloud Run host URL.
