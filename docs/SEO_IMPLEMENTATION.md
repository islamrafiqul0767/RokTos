# SEO Implementation Details

## Dynamic Metadata Management
Implemented via `<SEOHead />` component:
- Syncs `document.title` with localized site branding.
- Updates `<meta name="description">` per route.
- Sets `<meta name="robots">` to `index, follow` on public editorial pages and `noindex, nofollow` on user-generated directories or private accounts.
- Generates canonical `<link rel="canonical">` to avoid duplicate parameter crawl traps.
- Injects Schema.org `WebSite` JSON-LD structured data with SearchAction on the homepage.

## Crawl Configuration
- `public/robots.txt`: Disallows `/admin`, `/dashboard`, `/profile`, `/donor/register`, `/donors`.
- `public/sitemap.xml`: Declares 14 indexable static routes with daily/weekly change frequencies.
