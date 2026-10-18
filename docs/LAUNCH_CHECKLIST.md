# Production Launch Checklist

- [x] Cloud Firestore database provisioned and connected (`ai-studio-roktobondhublood-da17804f-2ee9-449a-b6fa-ec331ab48efc`)
- [x] Zero-Trust Firestore Security Rules deployed (`DeployRules` RPC completed)
- [x] Bootstrapped Admin recognized (`islamrafiqul0767@gmail.com`)
- [x] PII Isolation verified (no phone numbers in public donor projection)
- [x] Age confirmation (18+) and explicit consent enforced on onboarding
- [x] Text sanitization active to catch direct contact leaks in public descriptions
- [x] All 17 public routes, policies, and workflows implemented with working navigation
- [x] Bilingual coverage complete (Bengali default & English switcher)
- [x] Technical SEO: `robots.txt`, `sitemap.xml`, `<SEOHead />` meta tags & Schema.org JSON-LD configured
- [x] Logic & validation unit tests passing (`src/utils/rules.test.ts`)
- [ ] Custom domain DNS mapping (optional, requires owner domain)
- [ ] Google Search Console sitemap submission (manual step by project owner post-deployment)
