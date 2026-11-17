# Premium transformation — visual audit and design contract

17 November 2026 · Asia/Karachi. Baseline: d5107b6, with an existing removal of visible Hero photo credit. Preserve that choice; remove the resulting empty link rather than restoring its visible text.

## Evidence and direction

Read all six root project documents, AGENTS.md, image research, final audit, navigation, layout, phase and premium redesign reports, current components/data/motion, and installed Next.js CSS, image and server/client guides. Dentora's local button, hero and entrance components informed restrained variant composition and responsive control spacing, not SAS's identity.

Surface: single-page contractor portfolio. Audience: site owners/developers assessing experience and work scopes. Main action: request a quote through the verified WhatsApp configuration. Visual direction: warm architectural editorial; strong aligned type, large honest photographs, open layouts, a single green inquiry moment and cohesive gold conversion buttons.

Latest decisions supersede older checkpoint-only rules: this request authorizes the full transformation without per-section approval. The user explicitly confirmed in this chat that the nine SAS project photos were supplied and approved for website use. Retain them; the M9 Commons image remains a separately attributed location reference. Do not infer new project methods, affiliations, dates or values from photographs.

## Rendered baseline findings

Eight viewport screenshots are in `before/`: 1920x1080, 1440x900, 1366x768, 1024x768, 768x1024, 390x844, 375x812, 320x740. Baseline uses local development rendering; the development indicator is visible.

| Area | Observed weakness | Implementation direction |
|---|---|---|
| Header | Logo extends outside its header band; no sticky behavior; mobile numbered labels lack spacing | Contain original logo, consistent 1024px breakpoint, sticky header, active section indication, generous numbered drawer rows |
| Hero | Large two-line title occupies most of first viewport; photo and caption pushed below fold; phone CTAs stack unevenly | Editorial headline/action composition above a contained panoramic image; clearer experience eyebrow; simpler caption and primary quote action |
| Buttons | Rounded split label/arrow construction, arbitrary secondary styles | Single cohesive surface, small geometric corners, shared primary/secondary/editorial/dark variants, 48–52px targets |
| About | Giant number, lengthy paragraph, three tiny boxed capabilities compete | Compact experience rail, concise story, offset portrait and unboxed capability list |
| Services | Rounded active row, several competing badges, framed panel | Open numbered index, simpler image presentation and larger mobile titles; preserve keyboard tab/accordion behavior |
| Projects | Scope repeated as subtitle, paragraph and tag; excess metadata; 32px photo arrows; stale photography disclaimer | Larger portfolio titles, concise scope, unboxed lead and paired photos, compact expandable register; retain all nine and dialogs |
| Process | Useful vertical sequence but repeated subtitles and phases add noise | Retain sticky timeline and scroll progression; simplify duplicated labels |
| Strengths | Repetitive 2x2 boxes with identical footer/corner decorations | Open horizontal editorial rows with one concise introductory column |
| Inquiry | Very long headline, dense technical wording | Short conversational heading, restrained rulework, unified gold button |
| Contact/footer | Form shadow/card competes with content; footer describes WhatsApp without an actual link | Flat form with disciplined spacing, clear manual-send explanation, usable verified contact link |
| Architecture | Already mostly Tailwind v4, but arbitrary heading scales, custom drawer CSS, undefined charcoal token | Central type tokens, shared variants and spacing; migrate eligible drawer styling; retain only essential global rules |

## Production comparison

Read-only Chrome request to https://sas-construction.vercel.app/ returned ERR_NETWORK_ACCESS_DENIED; web retrieval also failed. No reliable current deployment comparison is possible. Older reports are historical evidence, not proof of current live content. Error saved in `production/error.txt`.

## State contract

Images reserve geometry while loading. Missing photos use branded scope panels. Filters announce result counts. Dialog/menu open, Escape, focus return, focus wrap and scroll locking must work. Form invalid input focuses the first error; valid input opens a reviewable WhatsApp draft; blocked popups retain data and explain recovery. No sent/success claim. No authentication or permission workflow. Reduced motion removes movement; content remains visible without animation.

Validation: all eight sizes, before/after screenshots, full-page and dialog/menu axe, navigation, six services, five filters, nine dialogs, photo selection, form errors/draft/blocked popup, TypeScript, lint and production build. Chromium automation is not physical-device or manual screen-reader certification.
