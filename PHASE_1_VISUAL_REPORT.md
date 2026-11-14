# SAS Construction - Industrial Editorial hero

## Delivered
The former split hero is replaced with an oversized editorial masthead, horizontal description/action rail, and full-width earthworks photograph. The approved navbar, logo, forest green, sand gold, warm white, and business positioning are preserved. No further homepage sections or routes were added.

Manrope variable headings and Inter body fonts are bundled locally. Desktop headlines use two broad lines; mobile introduces a deliberate third line. Fine rules and one registration mark reference construction drawings without adding decorative cards or fabricated credentials. The only experience claim remains the supplied 20+ years.

## Imagery
The locally hosted 2600px panorama is by Iain, sourced from https://unsplash.com/photos/construction-vehicles-on-sandy-site-HVGnISEUWQg under https://unsplash.com/license (verified November 14, 2026). A 658KB WebP master is served responsively through Next Image. Credit and the representative-image disclosure remain visible. This is not presented as a SAS project photograph.

The image has a restrained forest-green gradient for caption contrast. Caption bounds were checked at every tested viewport. Original and earlier assets remain preserved.

## Interactions
GSAP provides a short staggered text entrance and an image scale transition from 1.035 to 1 as the photograph enters the viewport. No scrub, pinning, parallax, or 3D is used. Animations are scoped to the hero, cleaned up on unmount, and reverted when reduced motion is requested. Content is never opacity-hidden awaiting JavaScript.

Explore Our Projects and Get in Touch open dismissible coming-soon dialogs, since those pages are outside Phase 1. Escape, close-button behavior, and focus return were tested. No contact submissions or fictional contact details are exposed. The visible homepage preview placeholder is removed.

## Engineering fixes
- Replaced invalid Fontsource latin.css imports with actual package entrypoints.
- Replaced the custom Tailwind Turbopack loader with the standard PostCSS integration after observing stale CSS in the dev server. Confirmed updated styles render.
- Fixed the former desktop-breakpoint image overflow and container class collision.
- Investigated hydration logs: webcrx and webcrx-bridged attributes were injected into html in the user's existing browser session. Clean Chrome did not reproduce the warning. Disable the injecting extension for localhost or use a clean browser profile; application hydration checks are not suppressed.

## Verification
- Final npm.cmd run lint: passed with no warnings.
- Final npm.cmd run build: passed, including TypeScript and static generation.
- Chrome browser checks at 1440x900, 1366x768, 960x900, 768x1024, 390x844, and 320x740 passed.
- No horizontal overflow, failed page resources, or clean-browser console errors.
- One H1; prohibited-copy check passed; local fonts and images loaded.
- Hero actions, mobile menu, keyboard skip link, Escape behavior, dialog focus return, light theme, and reduced motion passed.
- Axe WCAG A/AA checks reported zero violations for the base page, open mobile navigation, and hero dialogs. This does not replace manual screen-reader testing.
- Screenshots and browser-results.json are under artifacts/phase-1. Screenshots were taken on the development server, so its development indicator may appear. Captures follow keyboard checks and may show the skip-link focus state.
- The last change after the six-viewport browser suite only relaxed mobile headline tracking from -0.06em to -0.045em; lint/build passed afterward. A final screenshot refresh was blocked by the execution host reporting insufficient disk space.

## Files
Modified source: src/app/layout.tsx, src/app/globals.css, src/components/layout/Header.tsx, src/components/sections/Hero.tsx, src/components/ui/Container.tsx, src/components/ui/PreviewAction.tsx, src/lib/constants.ts, next.config.ts.

Added: src/components/ui/HeroMotion.tsx, postcss.config.mjs, scripts/verify-phase-1.mjs, public/images/representative-earthworks-panorama.webp, artifacts/phase-1/design-contract.md, browser screenshots/results, and this report. Supporting earlier photo assets are retained. package.json/package-lock.json contain the fonts, Lucide, GSAP, PostCSS, and browser QA tooling. Next dev also generated AGENTS.md.

## Remaining limitations
No Safari/Firefox or manual assistive-technology pass; no production performance benchmark or established visual-regression baseline. The existing browser extension warning is external to application markup. Projects/contact pages and actual project photography remain later-phase work. No additional section should be implemented until this direction is reviewed.

The frontend design-direction skill's separate evidence-checker command could not be executed after the host ran out of disk space. The actual six-viewport Playwright/axe checks completed before that failure; their results are recorded independently.
