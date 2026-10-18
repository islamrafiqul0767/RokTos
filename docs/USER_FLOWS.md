# User Flows

## Flow 1: Blood Seeker Finding a Donor
1. Visitor lands on Home `/` or navigates to `/donors`.
2. Selects Division (e.g. Dhaka), District (Dhaka City), and Blood Group (e.g. O+).
3. Evaluates filtered list of active public donor profiles.
4. Clicks "Request Contact" on a matching donor card.
5. If unauthenticated, prompts Google Sign-In.
6. Fills in patient initials, hospital name, and short situation context in Contact Modal.
7. Submits request; receives confirmation that the request is pending donor review.
8. When donor accepts, contact details appear under "Sent Contact Requests" in Dashboard.

## Flow 2: Volunteer Donor Onboarding & Privacy Control
1. User clicks "Become a Donor" or navigates to `/donor/register`.
2. Completes display name, blood group, division, district, and optional private contact channel.
3. Confirms age 18+, acknowledges terms of use, and grants explicit consent for public directory projection.
4. Profile is saved to `userPrivateProfiles/{uid}` and allowlisted projection is published to `publicDonorProfiles/{uid}`.
5. In Dashboard, donor can toggle availability (`available`, `temporarily_unavailable`, `paused`) or hide profile.
6. When a contact request arrives, donor reviews the patient hospital details and clicks "Accept" or "Decline".
