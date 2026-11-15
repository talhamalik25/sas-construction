# Phase 5 — Remaining homepage sections

Completed locally on 15 November 2026. No commit, push or deployment was performed.

## Implemented

- **How We Work**: four numbered stages on a vertical structural line. Asymmetric desktop introduction/timeline layout becomes a single column on smaller screens. GSAP progressively draws the line with scroll; the text stays visible throughout. The copy explicitly describes a proposed approach, not certified company procedures.
- **Why Choose SAS Construction**: large typographic rows with fine dividers, a compact numbered index and the four supplied strengths. No repeated oversized experience statistic or card grid.
- **Project Inquiry CTA**: forest green band, warm-white and gold type, restrained diagonal structural lines, and a functional Discuss Your Project anchor.
- **Contact & Project Inquiry**: six labeled fields, optional email, blur validation and correction feedback, required-value checks including whitespace, phone digit/character checks, and email-format validation. Visible notice explains that enquiries are unavailable and entered data is neither sent nor saved.
- **Footer**: original logo, supplied business description, working homepage navigation, contact anchor and browser-clock copyright year. No invented addresses, social accounts or contact channels.

## Integration and preservation

The existing Header, Hero, About, Services and Projects compositions are preserved. No project data, image sources, disclosures, global CSS or color tokens were changed during Phase 5. Earlier uncommitted image-research and audit work remains intact.

Contact, Request a Quote, Get in Touch and the new CTA now navigate to `/#contact`. The header quote action closes the mobile menu and focuses the contact section. This is the only behavior adjustment to the approved header. No standalone routes were added; the documented future multi-page architecture remains unchanged.

New sections reuse Container, ScrollReveal, the existing type scale, colors, border treatments and button proportions. SectionHeading extracts the established eyebrow/heading treatment for the new sections. The timeline animation is scoped, cleaned up on unmount and disabled for reduced motion. New content remains readable without animation.

## Files created

- `src/components/sections/HowWeWork.tsx`
- `src/components/sections/WhyChooseUs.tsx`
- `src/components/sections/ProjectInquiry.tsx`
- `src/components/sections/Contact.tsx`
- `src/components/layout/Footer.tsx`
- `src/components/ui/SectionHeading.tsx`
- `src/data/approach.ts`
- `scripts/verify-phase-5.mjs`
- `artifacts/phase-5/PHASE_5_REPORT.md`, `results.json`, and desktop/tablet/mobile section screenshots.

## Existing files modified in this phase

- `src/app/page.tsx`: append the four new main-content sections.
- `src/app/layout.tsx`: render the footer outside the main landmark.
- `src/lib/constants.ts`: add the contact section destination.
- `src/components/ui/NavigationAction.tsx`: use the available contact anchor instead of the previous disabled contact controls.
- `src/components/layout/Header.tsx`: close the mobile menu when Request a Quote is activated.
- `src/lib/contact.ts`: centralize the disabled delivery configuration and public explanation. Existing null contact details remain untouched.

NavigationAction and contact.ts were already untracked files from earlier work; this phase extends them rather than replacing unrelated changes. Other pre-existing Git differences do not belong to Phase 5.

## Validation

- `npx.cmd tsc --noEmit`: passed.
- `npm.cmd run lint`: passed, no warnings/errors.
- `npm.cmd run build`: passed with Next.js 16.4.6; homepage remains statically generated.
- `git diff --check`: passed (Git reports only line-ending normalization notices).
- `node scripts/verify-phase-5.mjs`: passed against the production server on port 3205 at **1440, 768, 390 and 320 px**.
- Keyboard header navigation, mobile menu closure, hero contact action, inquiry CTA, footer section destinations and target focus passed.
- Form tests covered empty required fields, whitespace-only name, invalid phone, invalid and empty optional email, correction of errors, populated fields and disabled submission. Enter and programmatic requestSubmit produced no POST requests or success messages; no local/session storage was used. Reload clears the test entries.
- Full-page axe WCAG A/AA scans reported zero violations at each tested width. This automated result is not a complete manual assistive-technology certification.
- No horizontal overflow, browser console errors, page exceptions or HTTP errors were detected.
- Reduced-motion checks confirmed removal of the timeline transform. The M9 license link and single Projects photo remain present. One H1 and all required new section headings were verified.
- Desktop and mobile screenshots inspected for hierarchy, spacing, form layout and footer legibility. Some tall element screenshots capture the existing fixed skip-link during browser screenshot scrolling; the skip link was not redesigned in this phase.
- No prohibited industry phrase found in `src`.

## Form readiness and remaining work

The form is a clearly labeled UI preview. It has no endpoint, delivery handler, storage, analytics payload or success state. Submission remains disabled even after valid data is entered. Adding a phone/email to contact configuration must not independently enable form submission.

Before accepting enquiries, obtain verified contact details, implement and test real delivery with server-side validation and failure handling, and only then enable submission. The present client-side validation is for UI feedback, not server-side security.

The footer year is populated after hydration and updates from the browser clock; without JavaScript the copyright line remains visible without a year. Contact fields intentionally omit submission names while delivery is unavailable.

Deployment remains separately authorized work. The earlier audit's production mismatch has not been resolved by these local builds. Review these sections for final design refinement before an authorized release.
