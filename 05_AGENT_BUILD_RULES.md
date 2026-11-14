# SAS Construction — Agent Implementation Rules

## Technology baseline
- Next.js App Router + TypeScript + Tailwind CSS.
- GSAP only for selective, accessible motion.
- `lucide-react` for small utility icons (avoid icon overload).
- No CMS, backend, database, dashboards, payments or authentication in the first phase.
- Build accessible, maintainable components and keep content in structured data.

## Suggested structure
```text
src/
  app/
    page.tsx
    about/page.tsx
    services/page.tsx
    projects/page.tsx
    contact/page.tsx
    layout.tsx
    globals.css
  components/
    layout/Header.tsx
    layout/Footer.tsx
    sections/Hero.tsx
    ui/
  data/
    services.ts
    projects.ts
  lib/
    constants.ts
public/
  images/
  branding/
```

## Mandatory behavior
1. Preserve the approved company name exactly: `SAS Construction`.
2. Never use the rejected construction-industry subtitle anywhere (including SEO text and image alt text).
3. Never make up project statuses, dates, facts, company achievements, certifications, partner logos, staff counts, or contact information.
4. Use the supplied brand palette. Light background is the default on all pages.
5. Do not generate a different logo or add/tag a secondary business descriptor to it.
6. Do not claim Google Image Search photos are original project imagery. Use licensed illustrative assets if needed, with attribution where required.
7. Use responsive `<Image>` or optimized image components; avoid huge uncompressed assets.
8. Preserve SEO accessibility: one H1 per page, meaningful heading order, alt text, contrast, focus, reduced-motion support.
9. Ask for approval after each design checkpoint; do not redesign approved sections without reason.
10. For a contact form, do not claim success unless enquiries are truly delivered. Hide unverified phone/WhatsApp/address until confirmed.

## Phase sequence
- **Phase 1:** font setup, color tokens, header/footer, logo presentation, homepage hero. Deliver screenshots and concise file summary for approval.
- **Phase 2:** homepage About, Services, Projects preview, experience and contact CTA.
- **Phase 3:** About, Services, Projects and Contact pages, using approved structured content.
- **Phase 4:** actual project imagery integration after permission, functional enquiry channel, metadata, performance and QA.

## Acceptance checks
- Desktop 1440px, tablet 768px, phone 390px; no horizontal overflow.
- Navigation and mobile menu keyboard/touch usable.
- Light-theme color consistency and good text contrast.
- Project data matches `04_PROJECTS_DATA.md` with no invented details.
- Reduced-motion option supported; no layout jumps.
- `npm run lint` and `npm run build` pass.
- All links and CTAs lead to real routes or explicitly nonfunctional demo states.
- Agent provides a list of changed files and unresolved client-info questions.

## First prompt for the agent
Read every Markdown file in this project kit and inspect the supplied logo image first. Treat these documents as the source of truth. Build **only Phase 1** of the SAS Construction website. Do not change the business positioning, introduce unverified content, or implement extra pages yet. Report what was built, any assumptions, and which decisions need approval.
