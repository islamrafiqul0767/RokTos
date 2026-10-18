# Change Management Protocol

1. **Rule Changes**:
   - Any edit to `firestore.rules` must be validated against `security_spec.md` and tested with the unit tests.
   - Deployed using `fax.DeployRules` RPC or Firebase CLI.
2. **Schema Evolution**:
   - Additions to data models must be documented in `firebase-blueprint.json` and `docs/DATA_DICTIONARY.md`.
3. **Rollback Procedure**:
   - In the event of a breaking change, re-deploy the last known stable commit.
