# Moderation Policy

## 1. Moderation Objectives
- Protect community volunteers from commercial exploitation and telemarketing abuse.
- Identify and remove fraudulent requests or bad actors demanding money.
- Ensure all public requests respect patient dignity without exposing sensitive medical details.

## 2. Moderation Pipeline
1. **Automated Hygiene**:
   - `sanitizePublicText` detects and redacts phone numbers and email addresses in public request descriptions.
2. **Community Reporting**:
   - Every donor card and request card provides a Report flag.
   - Category options: Scam, False Request, Harassment, Privacy Violation, Outdated, Other.
3. **Staff Intervention**:
   - Moderators review reports in `/admin` console.
   - Actions: Approve, Reject, Dismiss Report, Resolve Report.
   - All actions log an entry in `moderationActions`.
