# SAS Construction — Final UI/UX audit and refinement

15 November 2026 · Asia/Karachi. Local baseline: `9400e44` (`main`), initially clean. No commit, push, deployment, new dependency or dedicated content page was created.

## Assessment

The local homepage is a cohesive Industrial Editorial presentation, with distinct hero, experience, interactive services, factual project register, workflow, strengths, inquiry and footer sections. The approved typography, container widths, section rhythm, imagery, logo asset and palette were retained. Refinements focused on verified interaction, accessibility, content and SEO issues rather than a new visual concept.

The current user decision explicitly establishes a **single-page site**, superseding the older multi-page sitemap. Existing approved hero copy and layouts also take precedence over earlier draft copy. No unfinished page routes were introduced.

## Findings and resolution

| Priority | Finding | Resolution |
|---|---|---|
| P0 | No critical local failure found. Live site still serves old Projects descriptions and coming-soon navigation. | Production synchronization remains outside authorization; not represented as deployed. |
| P1 | Sand-gold small text in project dialogs fails contrast on warm white. | Changed this text to existing forest green; open-dialog axe checks now pass at all eight sizes. |
| P1 | Project filters use incomplete tab semantics and do not support expected tab arrow navigation. | Converted to ordinary filter buttons with `aria-pressed`, a labeled group and a polite result-count status. Keyboard Tab/Enter now matches the announced control semantics. |
| P1 | Services/accordion controls reference absent panel IDs. | Stable shared service panel ID, labeled by the active tab; panel is keyboard focusable. Collapsed accordion/project controls omit absent references. |
| P1 | Repeated Tab from a native project dialog can leave the content for browser controls. | Explicit first/last focus wrapping, native cancel/Escape handling and background scroll locking with cleanup. All nine dialogs tested at every viewport, including focus return. |
| P1 | Service tags assert undocumented techniques/materials. | Removed engineered filling, foundation digging, masonry, heavy roller and base-course specificity; retained broad supplied service scopes. No project records or photographs changed. |
| P2 | Abrupt section navigation. | Native CSS smooth scrolling with target margin; reduced motion restores immediate scrolling. Header remains in normal flow and does not cover anchors. |
| P2 | Small project detail/close targets. | 44px minimum action heights and a 44px square close button, retaining hierarchy and brand styling. |
| P2 | Below-the-fold desktop service image preloaded even on phones. | Removed eager priority; image loading defaults to lazy. Header uses supported `preload` instead of deprecated `priority`. |
| P2 | Missing canonical/social metadata and crawler files. | Added canonical, Open Graph and Twitter metadata, robots and a one-URL sitemap. |
| P2 | Skip link can appear during tall screenshot capture. | Conventional clipped-until-focused styling, retaining keyboard visibility and the main-content destination. |

The known unnamed About credit and unused-import issue was already fixed before this audit. It was inspected and left intact. All nine project records continue to match the supplied broad scopes. M9 attribution, license and execution disclaimer are preserved; eight records retain text panels.

## Responsive and interaction verification

Real Chrome/Playwright tests against the production build passed at:

| Viewport | Page + open-dialog axe | Overflow / duplicate IDs / missing ARIA targets | Services, filters and all nine dialogs |
|---|---|---|---|
| 1920 × 1080 | 0 violations | None | Pass |
| 1440 × 900 | 0 violations | None | Pass |
| 1366 × 768 | 0 violations | None | Pass |
| 1024 × 768 | 0 violations | None | Pass |
| 768 × 1024 | 0 violations | None | Pass |
| 390 × 844 | 0 violations | None | Pass |
| 375 × 812 | 0 violations | None | Pass |
| 320 × 740 | 0 violations | None | Pass |

`scripts/audit-homepage.mjs` records before/after screenshots, accessibility scans, IDs, ARIA targets, image preloads and browser performance entries. The after run additionally asserts desktop service arrow/Home navigation, mobile service accordions, all five project filter counts, all nine dialogs, Tab wrapping, Escape/focus return, M9 license presence, reduced-motion scroll behavior and crawler endpoints. No browser console or page errors were recorded.

`scripts/verify-phase-5.mjs` also passed at 1440, 768, 390 and 320px against the final server. It verifies keyboard header anchors, quote/hero/CTA/footer links, mobile menu closure, focus destinations, field validation and correction, optional email handling, disabled submission, no POST requests and no browser storage. No success message or delivery simulation was added.

Visual review covered desktop and phone hero crops, full-page composition and open-dialog readability. Mobile retains stacked content and readable forms; desktop keeps asymmetric layouts. No image replacements or broad spacing redesign was justified by the evidence.

GSAP uses existing scoped contexts and matchMedia cleanup. Reveals translate visible content instead of hiding it, and reduced-motion removes timeline transforms. No scroll-jacking was introduced. Tests use Chromium, not physical iOS/Android devices; automated axe is not a full manual screen-reader certification.

## Performance and SEO

Only two initial image preloads remain (logo and hero), down from three. Service imagery now loads lazily. Existing responsive Next Image sizes, local variable fonts, and static page generation remain. Two Latin WOFF2 fonts were observed; no external font service was introduced.

Resource timings and cumulative layout shift observations are recorded in `after/results.json`. These are local browser observations, not Lighthouse scores, throttled mobile benchmarks or field Core Web Vitals. No unsupported speed-score claims are made. Remaining JavaScript includes React/Next, interactive services/projects, form validation and GSAP; no speculative rewrite was made to remove justified interactions.

Canonical/social metadata and crawler files use the actual public origin `https://sas-construction.vercel.app`, centralized in `src/lib/site.ts`. Sitemap lists only `/`, with no invented last-modified date. The social preview uses the existing logo. No address, phone, reviews, certifications or speculative business structured data were added. Update the centralized origin when a verified custom domain is supplied.

## Files changed by this audit

- `src/app/globals.css`: native smooth scrolling, target margin, clipped skip-link treatment.
- `src/app/layout.tsx`: canonical/social metadata and skip-link classes.
- `src/app/robots.ts`, `src/app/sitemap.ts`, `src/lib/site.ts`: new crawler metadata and centralized public origin/description.
- `src/components/layout/Header.tsx`: migrate logo priority to preload.
- `src/components/sections/Projects.tsx`: filter semantics/result announcement, ARIA references, contrast, touch targets, dialog focus wrapping and scroll lock.
- `src/components/sections/Services.tsx`: stable tab-panel relationship, panel focusability, collapsed accordion references and lazy media.
- `src/data/services.ts`: conservative documented service tags.
- `scripts/audit-homepage.mjs`: repeatable baseline/after browser audit.
- `artifacts/final-audit/`: findings, this report, eight before/after viewport captures and JSON results.
- Existing `artifacts/live-audit/` production evidence and `artifacts/phase-5/` screenshots/results refreshed by their existing scripts.

Concurrent edits appeared during the audit: Header logo width/height changed to 1426×924 and the Hero primary button radius changed to 12px. Those edits were preserved and are not attributed to this audit. The logo file itself remains 1536×1024; its current CSS uses auto height. The radius now differs from other buttons; retained as a concurrent design edit rather than silently normalized.

Historical `verify-project-images.mjs` and `verify-live-audit.mjs` still target older tab/disabled-contact semantics; they were not run as current acceptance suites. Use the new audit plus Phase 5 suite for the current single-page behavior.

## Final checks

- `npm.cmd run lint`: passed, no errors/warnings.
- `npx.cmd tsc --noEmit`: passed.
- `npm.cmd run build`: passed; static homepage, robots and sitemap generated.
- `git diff --check`: passed; only Windows line-ending notices.
- No prohibited industry phrase found in `src`.

## Remaining release blockers and client information

1. **No deployment authorized.** Fresh live inspection still shows the old homepage and preview dialogs. The M9 replacement WebP returned 200 during this run but the source JSON returned 404 and rendered Projects still used generic images. Asset availability alone is not deployment verification. Production must be checked again after an explicitly authorized release.
2. **Enquiry delivery remains unavailable.** Verified destination details and a real delivery integration with server-side validation/failure handling are required before enabling the form. The local preview correctly stays disabled.
3. **Project confirmations remain open:** site spellings, locations, roles, paver types and permission for genuine SAS photographs. No actual SAS execution photo has been established.
4. **Services imagery rights/provenance:** existing representative service images were preserved; the project image audit does not establish licenses for those separate assets. Confirm their provenance before release. No new image license claims were made here.
5. Final visual acceptance and the concurrent button-radius decision remain review items. No dedicated pages are planned under the latest single-page instruction.

## Screenshots

- Desktop: `after/homepage-1440.png`, `after/hero-1440.png`.
- Phone: `after/homepage-390.png`, `after/hero-390.png`.
- Small phone: `after/hero-320.png`, `after/dialog-320.png`.
- Direct contrast comparison: `before/dialog-390.png` and `after/dialog-390.png`.
- Full baseline and final evidence exists for every requested size in `before/` and `after/`.
