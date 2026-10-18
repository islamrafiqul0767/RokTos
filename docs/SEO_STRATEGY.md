# Technical SEO Strategy

## 1. Principles & Objectives
- **Foundations Over Ranking Promises**: Build clean, fast, crawlable technical foundations without making fabricated claims about guaranteed rankings.
- **Privacy-Safe Indexing Boundaries**:
  - Indexable: Useful, educational, and static public pages (`/`, `/blood-requests`, `/how-it-works`, `/safety`, `/donor-eligibility`, `/faq`, `/about`, `/contact`, `/privacy`, `/terms`).
  - Noindex / Disallowed: Search result pages exposing user-generated donor listings (`/donors`), user accounts (`/dashboard`, `/profile`), onboarding (`/donor/register`), and staff management (`/admin`).
- **Structured Data (JSON-LD)**: Accurate `WebSite` Schema with search action. No fake star ratings, false hospital accreditations, or review manipulation.

## 2. Meta Tags & Canonicals
- Unique titles and descriptive meta tags dynamically managed by `<SEOHead />`.
- Canonical links pointing to the authoritative origin.
- Proper language declaration (`lang="bn"` or `lang="en"`).
