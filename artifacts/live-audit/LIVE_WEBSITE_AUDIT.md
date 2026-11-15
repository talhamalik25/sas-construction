# SAS Construction — live website audit and local synchronization readiness

Audit date: **15 November 2026, Asia/Karachi**. Production evidence refreshed at 12:32 Asia/Karachi (07:32 UTC). No commit, push, deployment, alias change or remote configuration change was performed.

## 1. Local and deployed revisions

| Item | Finding |
|---|---|
| Local branch | `main` |
| Local HEAD | `31d1e3d48e497351839abf148a5a65b250938593` — `services` |
| Remote repository | [talhamalik25/sas-construction](https://github.com/talhamalik25/sas-construction) |
| Remote main observed through GitHub | `31d1e3d48e497351839abf148a5a65b250938593` |
| Commit reported as successfully deployed by Vercel's GitHub status | `31d1e3d48e497351839abf148a5a65b250938593`, status created 14 November 2026, 21:50:34 Asia/Karachi |
| Deployment linked by that status | [8UC1KWb6CG8fNMUfszbDZyqcGjto](https://vercel.com/talhamalik25s-projects/sas-construction/8UC1KWb6CG8fNMUfszbDZyqcGjto) |
| Exact commit currently assigned to production alias | **Not independently authenticated.** Live content matches the old implementation in the above commit. The Vercel API returned 403 (authentication token required), and the dashboard redirected to login. Do not treat the inferred alias-to-commit mapping as authenticated metadata. |
| Image-research work | Still local: modified tracked files plus untracked component, WebP, license metadata, audit and tests; not part of HEAD or remote main. |

Revalidation note: implementation fixes and this report already existed in the working tree when this audit run began. This run reviewed the required documents and all nine records, refreshed production evidence and reran validation; it did not author the pre-existing application changes. The file list below describes the cumulative uncommitted changes. No application source edits were needed in this revalidation.

Evidence: `deployment-metadata.json`, `production-before.json`, `production-before.html`. Public GitHub deployments returned an empty array; Vercel reported deployment through commit status instead. Vercel plugin discovery found an available but uninstalled integration. No existing local Vercel project linkage or CLI was found. GitHub's connected tools and public endpoints supplied the available deployment status.

## 2. Root cause and production comparison

The production site is missing the local image-research update. **The local working tree and deployed source are different**: the researched replacements were never committed/pushed in this session. A successful local build did not publish them.

Direct inspection of [production](https://sas-construction.vercel.app/) confirmed:

| Check | Production | Current local implementation |
|---|---|---|
| Featured project media | Generic Orangi, M9 and ASF photographs | Orangi/ASF text panels; licensed M9 locality photo |
| Remaining six records | Generic images in expandable details | Text panels and source-limited scopes |
| M9 replacement WebP | `/images/projects/m9-jamshoro-location.webp`: **404** | Local optimized asset, 1600×900, 78,684 bytes |
| M9 source/license JSON | `/images/projects/m9-jamshoro-location.json`: **404** | Present locally |
| Old Orangi JPEG | `/images/projects/nlc-orangi.jpg`: **200** | Legacy file remains on disk but no current source references it |
| Technical claims | Old detailed claims remain in featured and expanded records | Replaced with client-supplied scope wording |
| Navigation | Buttons open generic preview dialogs | Actual homepage anchors; contact-dependent controls disabled |

The live response was a Vercel cache HIT, but that alone is normal CDN behavior and does not establish a caching defect. Missing replacement assets and old rendered content establish that production lacks the update; clearing a browser cache cannot deploy uncommitted source. Legacy JPEG/WebP files remain in `public/images/projects` and would still be directly addressable in a subsequent deployment unless separately removed; they are not rendered or referenced by current Projects code.

## 3. Project integrity review — all nine records

All names retained. No completion badges, contract values, quantities, dates of SAS work or direct NLC/FWO contractual relationships were added. The M9 photograph's 2016 date is a photograph date, not a SAS project date.

| Project | Unsupported detail observed in production / committed source | Local result |
|---|---|---|
| NLC Orangi | Deep excavation; reinforced-concrete pipes; utility bedding/backfilling; municipal scale. Orangi shown as confirmed though documentation calls it inferred. | Sewerage line work only. Location explicitly marked inferred; `locationConfirmed: false`. NLC role/site unconfirmed. |
| FWO M9 Motorway | Large-scale earthwork, embankments, heavy earthmoving, sub-base compaction; bulldozers/rollers in image claims. | Road construction-related backfilling. FWO package/role unconfirmed. M9 photo clearly marked category B locality reference, no SAS execution evidence. |
| ASF City | Mass excavation, engineered fill, ridge cutting, terrace leveling, hydraulic excavator; guessed Karachi corridor. | Hill cutting and filling. Exact location/site boundaries pending confirmation. |
| Sassi Garden | Sub-base placement, vibratory/tandem roller, subgrade stabilization. | Road filling and compaction. Site/name confirmation retained. |
| Faizan City | Interlocking blocks, heavy-duty/manual placement, sand screeding, edge restraints. | Road paver work; type/location unconfirmed. Summary label changed from installation to the register's broader work wording. |
| Gandhara Society | Masonry/concrete wall material, grading and perimeter leveling details. | Road cutting, filling and boundary wall; spelling and site boundary pending. |
| Gazian Society | Interlocking blocks, curb stones and subgrade compaction. | Road paver work; society spelling/type unconfirmed. Summary label aligned with register. |
| Gulshan-e-Maymar | Specific trenching/installation techniques, dual pipeline imagery, preparation/backfilling beyond the broad record. | Road, sewerage and water line work. Note explicitly leaves direct SAS components and sector unconfirmed. |
| Japan City, Tando Allahyar | Bulk material quantities by implication, internal road formation, park land-preparation method and machinery claims. | Backfilling, road and park-related work. City identified as client-supplied; project name and park scope still require confirmation. |

The prior image-research edits had already removed most unsupported descriptions locally. This audit completed the location/summary/provenance refinements and verified the old claims are still live. No numerical excavation depths or construction quantities were found; the problem was unsupported qualitative specificity. All nine records remain client-supplied experience, not independently verified contracts.

## 4. Navigation and architecture

Production `/about`, `/services`, `/projects` and `/contact` each returned **404**. Their navbar controls were buttons with dialogs, not implemented destination pages. Hero Explore Our Projects and Get in Touch shared the same placeholder component.

Local decisions:

- About → `/#about-experience`; Services → `/#services`; Projects and hero Explore Our Projects → `/#projects`. Mobile menu closes on navigation, and section focus follows keyboard activation.
- Home and logo retain `/`.
- Removed the generic `PreviewAction` dialogs entirely; replaced their use with `NavigationAction`.
- Contact, Request a Quote and Get in Touch remain styled and responsive, but disabled because verified contact details are not supplied in the project documentation or local configuration. Visible explanation: “Contact details pending.” Screen-reader description explains that enquiries are unavailable until verified details are provided. No dummy links, form, submission or success message.
- Centralized phone, WhatsApp, email, address and social-link values in `src/lib/contact.ts`; all are null/empty. A verified WhatsApp, email or phone value can activate existing controls without component edits. WhatsApp and phone require international format. Configuration is for verified public information only.
- No new page, Contact section or next homepage section created. The documented future multi-page architecture remains planned; current sections are navigable now.

An empty About photo-credit link and its removed disclosure were present at the start of this task. Restored the committed attribution/disclosure text, correcting the unnamed link and unused import warning. About's image, grid, typography and layout were not redesigned; the file now matches HEAD again.

## 5. Visual preservation

Forest green `#254E43`, sand gold `#D6B27A`, warm white `#FAF9F6`, existing fonts and logo retained. No global CSS changes. Hero layout/classes and Services implementation retained; Hero changes only replace action behavior. Projects preserves the approved featured composition, register, filters and dialogs. The M9 source/license/disclosure remains visible in the card and modal. Text panels retain existing brand tokens and mobile sizing.

## 6. Files changed

Cumulative local changes already present at the start of this revalidation:

- `src/components/layout/Header.tsx`: functional section navigation and mobile close callback.
- `src/components/sections/Hero.tsx`: actual Projects link and safely disabled contact action; layout preserved.
- `src/components/ui/NavigationAction.tsx` (new): shared anchor/disabled-state behavior and accessible explanation.
- `src/components/ui/PreviewAction.tsx` (removed): generic coming-soon dialogs.
- `src/lib/constants.ts`: centralized existing-section destinations.
- `src/lib/contact.ts` (new): centralized unavailable contact details and destination resolution.
- `src/data/projects.ts`: inferred location, conservative scope labels and role/provenance clarification.
- `src/components/sections/Projects.tsx`: client-supplied wording and record labels.
- `src/components/sections/AboutExperience.tsx`: restored missing photo credit/disclosure to HEAD; no net Git diff.
- `scripts/capture-production-audit.mjs`, `scripts/inspect-deployment-metadata.mjs`, `scripts/verify-live-audit.mjs` (new): reproducible read-only production inspection and local UI validation.
- `artifacts/live-audit/` (new): detailed report, production evidence, metadata, screenshots and local test results.

Prior image-research work remains uncommitted too: `ProjectMedia.tsx`, Projects/data edits, M9 WebP/JSON, `artifacts/image-research/` and `scripts/verify-project-images.mjs`. Any eventual release must include those files together; deploying only the navigation edits would not deliver the image replacement.

## 7. Validation

- TypeScript: `npx.cmd tsc --noEmit` — exit 0.
- ESLint: `npm.cmd run lint` — exit 0, no warnings/errors after restoring About attribution.
- Production build: `npm.cmd run build` — exit 0; TypeScript and static page generation passed.
- UI suite: `node scripts/verify-live-audit.mjs` against `next start` on port 3200 (production build, not merely a dev server) — **passed at all five widths**, zero full-page axe violations, no horizontal overflow and no console/network errors. Results recorded in `local-results.json`.
- Tested widths: 1440, 960, 768, 390, 320 px; keyboard section navigation, mobile open/close/Escape/focus, Home navigation, hero link, disabled contact explanations, all nine project dialogs, six expandable text panels, all filters, M9 loading/attribution, full-page axe, palette, reduced motion and horizontal overflow.
- Production read-only checks captured desktop/mobile Projects screenshots, all expanded scope text, the actual About preview dialog, absent routes and asset HTTP status codes.
- `git diff --check` passed. No push/deployment was performed, so no post-deployment claim is made.

## 8. Remaining blockers and release readiness

1. **Production synchronization is awaiting explicit authorization.** Source remains local and uncommitted. No automatic approval request or deployment was initiated. After an authorized release, verify the alias's deployed SHA and repeat live content, asset and navigation checks.
2. **Authenticated Vercel metadata is unavailable.** GitHub confirms the deployment-associated SHA, but exact alias assignment requires Vercel access; do not substitute a build ID, request ID or inferred SHA for that fact.
3. **Verified contact details are missing from supplied documentation and configuration.** Controls intentionally stay disabled until configuration is populated with approved information. No contact form backend exists.
4. **Project identity and role questions remain open** as listed in `04_PROJECTS_DATA.md` and the image research audit. Eight records still lack an eligible photograph; no actual SAS execution photograph has been independently established.
5. Standalone About, Services, Projects and Contact pages remain planned, not implemented. Functional homepage anchors do not claim those routes exist.
