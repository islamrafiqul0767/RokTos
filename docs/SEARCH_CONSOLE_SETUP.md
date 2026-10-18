# Google Search Console Setup Guide

Follow these steps once deployed to the production URL:

1. **Verify Property Ownership**:
   - Access Google Search Console (https://search.google.com/search-console).
   - Add property via URL prefix (e.g. `https://ais-pre-me4lxl52u5ytjzbof64jux-363666552580.asia-southeast1.run.app` or custom domain).
   - Verification method: HTML tag added to `<head>` in `index.html` or DNS TXT record if custom domain.

2. **Submit XML Sitemap**:
   - Navigate to **Sitemaps** in the left sidebar.
   - Enter `sitemap.xml` and submit.
   - Inspect status to ensure the 14 indexable static routes are parsed without crawl errors.

3. **URL Inspection & Core Web Vitals**:
   - Run URL Inspection on the homepage `/` and `/blood-requests`.
   - Review mobile-friendliness report and ensure text size, touch targets, and viewport settings pass.

4. **Security & Manual Actions**:
   - Review the **Security & Manual Actions** tab regularly.
   - Monitor for crawl traps or accidental inclusion of noindex pages.
