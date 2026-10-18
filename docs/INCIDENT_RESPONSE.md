# Incident Response Plan

## 1. Incident Classification
- **Level 1 (Critical)**: Unauthorized PII leak (e.g. phone numbers exposed via query breach).
- **Level 2 (High)**: Spam campaign or malicious requests flooding public listings.
- **Level 3 (Medium)**: Database quota limits reached or UI component rendering failure.

## 2. Immediate Response Actions
1. **PII Breach**:
   - Immediately tighten `firestore.rules` to restrict collection reads.
   - Deploy via `fax.DeployRules` or Firebase Console.
   - Notify affected donors in compliance with privacy commitments.
2. **Abuse / Scam Influx**:
   - Authorized admins can review and reject pending requests in `/admin`.
   - Toggle feature flag `allowPublicRegistration: false` in `siteConfig/default` if massive bot attacks occur.
