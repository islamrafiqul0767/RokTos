# Accessibility Implementation Report (WCAG 2.2 AA)

## Implemented Practices
1. **Semantic HTML & Navigation**:
   - Proper `<header>`, `<nav>`, `<main>`, `<footer>` landmark structures.
   - Distinct heading hierarchy (`h1` -> `h2` -> `h3`) across all views.
2. **Accessible Controls & Inputs**:
   - Native `<button>` and `<input>` elements with explicit `<label>` bindings.
   - Icon-only buttons include `aria-label` or `title` attributes.
   - Minimum touch target size adheres to 44px on mobile viewports.
3. **Contrast & Color Safety**:
   - Dark forest green (`#14532d`) and neutral charcoal text against warm off-white background meet AA contrast criteria (>= 4.5:1).
   - Information (e.g. status) is never communicated through color alone; paired with explicit textual explanations and distinct icons.
4. **Reduced Motion**:
   - CSS rule `@media (prefers-reduced-motion: reduce)` zeroes out animations and transitions for sensitive users.
5. **Bengali Font Typography**:
   - Fallback font stack ensures proper ligatures and rendering across Android Chrome and desktop browsers.
