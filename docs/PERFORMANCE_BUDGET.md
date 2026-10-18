# Performance Budget & Core Web Vitals Targets

## 1. Threshold Goals
- **Largest Contentful Paint (LCP)**: <= 2.5s on mobile 4G network.
- **Interaction to Next Paint (INP)**: <= 200ms across all touch and click interactions.
- **Cumulative Layout Shift (CLS)**: <= 0.1 at 75th percentile of real visits.

## 2. Implemented Optimizations
- Lean dependency footprint: standard Lucide icons, native Tailwind CSS without heavy UI runtimes.
- Bounded Firestore queries (`limit(50)`) avoiding unbounded reads and wallet exhaustion.
- Static SVG icons and WebFonts preconnect for typography rendering.
- Layout stability: Card dimensions and containers have reserved minimum heights to eliminate shift.
