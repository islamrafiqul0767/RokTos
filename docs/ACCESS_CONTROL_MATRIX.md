# Access Control Matrix (RBAC / ABAC)

| Resource / Collection | Operation | Visitor (Unauthenticated) | Registered User | Opt-in Donor | Moderator | Administrator |
|---|---|---|---|---|---|---|
| `publicDonorProfiles` | List / Get | ✅ (Only `approved` & `publicVisibility`) | ✅ | ✅ | ✅ | ✅ (All records) |
| `publicDonorProfiles` | Create | ❌ | ❌ | ✅ (Own UID only) | ❌ | ✅ |
| `publicDonorProfiles` | Update | ❌ | ❌ | ✅ (Self-managed availability/visibility) | ❌ | ✅ (Full moderation) |
| `userPrivateProfiles` | Get | ❌ | ✅ (Own UID only) | ✅ (Own UID only) | ❌ | ✅ |
| `userPrivateProfiles` | Update | ❌ | ✅ (Safe fields only) | ✅ (Safe fields only) | ❌ | ✅ |
| `bloodRequests` | List / Get | ✅ (`approved` only) | ✅ | ✅ | ✅ | ✅ (All records) |
| `bloodRequests` | Create | ❌ | ✅ (Author UID = auth.uid) | ✅ | ❌ | ✅ |
| `bloodRequests` | Update | ❌ | ✅ (Own requests only) | ✅ (Own requests only) | ❌ | ✅ (Full moderation) |
| `contactRequests` | Get / List | ❌ | ✅ (If requester or donor) | ✅ (If requester or donor) | ❌ | ✅ |
| `contactRequests` | Create | ❌ | ✅ (Requester UID = auth.uid) | ✅ | ❌ | ✅ |
| `contactRequests` | Update | ❌ | ❌ | ✅ (Status response only) | ❌ | ✅ |
| `userReports` | Create | ❌ | ✅ (reporterUid = auth.uid) | ✅ | ❌ | ✅ |
| `userReports` | Read / Resolve | ❌ | ❌ | ❌ | ✅ | ✅ |
| `verificationReviews` | Read / Write | ❌ | ❌ (Can view own review result) | ❌ | ✅ | ✅ |
| `moderationActions` | Read / Write | ❌ | ❌ | ❌ | ❌ | ✅ (Append-only) |
| `siteConfig` | Read / Write | ✅ (Read-only) | ✅ (Read-only) | ✅ (Read-only) | ✅ (Read-only) | ✅ (Read & Write) |
