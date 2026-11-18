# SAS Construction — Brand & UI Design System

## Brand personality
Dependable, practical, established, field-experienced, clean, quietly premium. Avoid skyscraper/luxury-condominium branding, overly corporate language, unrealistic 3D effects, and template-like grids of repetitive cards.

## Logo
- Source image: `assets/sas-logo-reference.png`, approved logo concept.
- Features: green SAS lettering with road motif, machinery silhouettes and gold details; word `CONSTRUCTION` only beneath the monogram.
- Keep proportions; do not stretch, distort, add another tagline, or overprint copy.
- Original provided asset has a white background; avoid claiming it is a transparent SVG. For production favicon and transparent versions, recreate only after approval or when a clean editable master is supplied.
- Maintain sufficient whitespace on white/light surfaces. For a compact header, test legibility carefully; the detailed machinery icon may be too fine at mobile size.

## Palette
| Role | Hex | Usage |
|---|---|---|
| Main background | `#FAF9F6` | warm off-white pages |
| Surface | `#FFFFFF` | cards / menu backgrounds |
| Secondary background | `#EDE9DF` | section differentiation |
| Primary | `#254E43` | headings, CTAs, accent panels |
| Accent | `#D6B27A` | restrained dividers, highlights, small visual details |
| Main text | `#242A29` | readable copy |
| Muted text | `#5C6862` | secondary copy; verify contrast |

## Typography
- Headings: `Manrope` or `Plus Jakarta Sans`, weight 600–800.
- Body: `Inter` or `DM Sans`, weight 400–500.
- Use system fallbacks and optimize webfont loading. Large editorial headings, clean line-height, no all-caps paragraphs.

## Layout
- Max content width: approximately 1200–1320px.
- Desktop: generous spacing, split hero layouts, large project imagery, editorial rhythm.
- Mobile: content-first, single column, comfortable tap targets, no hover-only interaction.
- Prefer natural full-width imagery, large captions, fine borders and restrained gold detailing over floating glossy cards.

## Imagery
- Reference subjects: graders, excavators, compaction equipment, road preparation, sewerage trenches, paver installation, practical construction-site textures.
- Choose visually real, daylight and documentary-feeling imagery; avoid glossy skyscraper renders.
- Prefer client-owned site photos when supplied with usage permission.
- Stock/licensed imagery is decorative or illustrative and must **never** be passed off as an image of a specific named client project.
- Do not pull arbitrary Google Images into the public site without checking rights.

## Animation and usability
- Subtle GSAP scroll reveals, 200–500ms transitions where meaningful; respect `prefers-reduced-motion`.
- No unnecessary 3D hero, heavy parallax, or animation that causes content to disappear.
- Maintain readable text/contrast, visible keyboard focus, responsive images and predictable navigation.

## Recommended hero direction
Light editorial presentation; large headline left, strong relevant road/earthwork photo right or in a full-bleed image band. Use one gold micro-accent, primary green CTA, and an understated 20+ years line. Do not claim project counts beyond the nine client-supplied examples.

## Current refinement — 18 November 2026

The premium transformation request and subsequent explicit request for rounded buttons supersede earlier CTA geometry/colour suggestions. Use pill-shaped gold primary CTAs with forest-green text and a cohesive directional arrow; outlined rounded secondary actions; the same gold surface on the green inquiry section. Menu, gallery and dialog icon buttons are circular. Service/project row controls use rounded corners. Do not reintroduce divided arrow blocks.

Retain local Manrope headings and Inter body. Tailwind theme tokens `text-display`, `text-section`, `text-title`, and `text-eyebrow` define the shared hierarchy. The Container has a 1400px outer maximum, with 20/40/64px responsive gutters. The sticky header switches to desktop at 1024px; section anchors reserve clearance. Body content stays predominantly warm white, with restrained sand service/process/footer surfaces and one forest-green inquiry band.

The user confirmed that the nine SAS project photographs were supplied and approved for website use. Services reuse these approved photographs. The separate M9 Commons photograph remains a location reference with its credit, CC BY-SA link and conversion disclosure; it must not be treated as proof of SAS execution. The representative Hero/About photographs retain their non-project disclosures. Project role/location questions are not resolved by photo approval.

Implementation and verification details: `artifacts/premium-transformation/FINAL_TRANSFORMATION_REPORT.md`.
