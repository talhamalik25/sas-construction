# Audit-first findings — 15 November 2026

Baseline: clean local main at 9400e44. Current user instruction confirms single-page architecture, superseding the older multi-page sitemap. Preserve approved hero copy/composition rather than reverting to the older draft headline.

## P0

No critical local failure identified. Production still renders older generic Projects content and coming-soon navigation; release synchronization is blocked by the explicit no-deploy restriction. The fresh live capture is in artifacts/live-audit/production-before.json (07:48 UTC). This time the replacement WebP returned 200 but its provenance JSON returned 404; asset presence alone does not establish that the homepage uses the updated implementation.

## P1 — verified, to fix

- Open project dialogs fail axe color contrast: small sand-gold category text on warm white.
- Project filters claim tab semantics but have no associated tabpanels, roving focus or arrow-key behavior. Browser ArrowRight test confirms focus does not move. Use ordinary pressed filter buttons with a result announcement; their action is filtering, not switching tabpanels.
- Services and collapsed project rows expose aria-controls references to absent elements. Keep service tab relationships stable and omit collapsed accordion references until panels exist.
- Services scope tags include undocumented techniques/materials (engineered fill, foundation digging, heavy roller, masonry, base course). Reduce those tags to the documented broad service scopes, preserving imagery and layout.

## P2 — safe refinements

- Native anchor scrolling is abrupt; enable CSS smooth scrolling only when reduced motion is not requested, with modest target margin. Header is currently in normal flow, not fixed; do not invent a sticky redesign.
- Project detail/close buttons have small hit areas. Increase to 44px without changing hierarchy.
- Services preloads below-the-fold media, including desktop media on phones. Remove priority there; replace deprecated priority with preload for header logo only.
- Missing canonical/Open Graph/Twitter metadata, robots and sitemap. Add using the known public deployment origin, with a single homepage sitemap entry and supplied logo; no invented business structured data.
- Skip link is correctly offscreen initially but can appear in tall section captures. Use conventional clipped-until-focused styling for reliable focus visibility.

## Verified preserved behavior

About credit link already has a meaningful accessible name and the ArrowUpRight import is used; no restoration needed. All nine local project records have conservative scopes, one disclosed M9 location photograph and eight text panels. Contact delivery is explicitly disabled. Existing colors, fonts, asymmetric layouts and GSAP cleanup/reduced-motion design are retained. No new dependencies or dedicated pages are required.
