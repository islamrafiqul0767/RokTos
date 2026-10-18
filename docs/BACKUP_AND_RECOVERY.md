# Backup & Recovery Runbook

## 1. Cloud Firestore Managed Backups
Google Cloud Firestore provides point-in-time recovery (PITR) and scheduled exports.
- **Scheduled Backups**: In the Google Cloud Console, schedule daily backups of all collections to a multi-region Google Cloud Storage bucket (`gs://upheld-terra-fsmzh-backups`).
- **Retention**: Keep daily backups for 30 days and weekly backups for 90 days.

## 2. Disaster Recovery Protocol
1. **Accidental Collection Deletion**:
   - Restore using `gcloud firestore import gs://[BUCKET_NAME]/[EXPORT_PREFIX]`.
2. **Corrupted Security Rules**:
   - Re-deploy the audited `firestore.rules` file stored in version control via AI Studio or `firebase deploy --only firestore:rules`.
