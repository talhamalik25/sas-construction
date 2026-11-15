# Website layout check

Reviewed the local production build across the complete homepage on 15 November 2026. Changes remain local; no push or deployment was performed.

## Issues fixed

- Mobile navigation link styles were missing. Restored the numbered flex rows, aligned arrows, separators, typography and hover state. Rows now measure 58px at 320px and 66px on the other tested mobile widths.
- The unavailable floating WhatsApp button covered page copy and form fields. It now stays hidden until a verified destination is configured. The Contact section continues to explain enquiry availability.

The approved palette and homepage section layouts were preserved.

## Files changed for this check

- `src/app/globals.css`: restored mobile navigation row styles.
- `src/components/layout/FloatingWhatsAppCTA.tsx`: hide the floating control when no destination exists.
- `scripts/check-layout.mjs`: repeatable viewport and clipping checks with screenshots.
- `scripts/verify-navigation-design.mjs`: configurable local server and artifact directory.

## Validation

- TypeScript (`npx tsc --noEmit`): passed.
- ESLint (`npm run lint`): passed.
- Production build (`npm run build`): passed.
- Layout checks at 320, 375, 390, 640, 768, 960, 1024, 1280, 1440 and 1920px: passed. No horizontal document overflow, clipped visible text, or sections outside the viewport were detected.
- Navigation interaction checks at 320, 375, 390, 768, 1024, 1440 and 1920px: passed. Checked menu opening/closing, keyboard focus, focus trapping, Escape, backdrop, scroll locking, breakpoint cleanup, anchor destinations and CTA touch targets.
- Automated axe accessibility checks: zero violations in the tested states. This is not a substitute for a complete manual accessibility audit.
- Reduced-motion checks: passed. No browser errors were recorded by the interaction suite.
- `git diff --check`: passed (Git reported only line-ending conversion warnings).

Evidence is saved in `before/`, `after/` and `interactions/` beside this report, including machine-readable results and screenshots.

## Remaining limitations

WhatsApp and enquiry delivery still require verified contact configuration. These checks cover the local production build; the deployed site has not been changed by this styling pass.
