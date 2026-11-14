# SAS Construction — Client-Supplied Project Register

**Important:** These are user-provided project titles and rough scopes, **not independently verified public records**. Do not add project dates, contract values, named end-clients, exact geolocations, or documentary photos without confirmation. Verify spellings with the contractor.

| ID | Working display title | Scope supplied | Location / context | Confirmation needed |
|---|---|---|---|---|
| 01 | NLC — Orangi Sewerage Line | Sewerage line work | Orangi, Karachi (area inferred from title) | Was NLC the awarding party, prime contractor or project reference? Exact site and role? |
| 02 | FWO — M9 Motorway Roadwork | Road construction-related backfilling | M9 Motorway corridor | Exact package, scope and contractual relationship to FWO? |
| 03 | ASF City | Hill cutting and filling | Site not confirmed | Exact site name, city and scope? |
| 04 | Sassi Garden | Road filling and compaction | Site not confirmed | Confirm name and location |
| 05 | Faizan City | Road paver work | Site not confirmed | Does 'paver' mean interlocking blocks, paving, or asphalt paver work? |
| 06 | Gandhara Society | Road cutting, filling and boundary wall | Site not confirmed | Confirm name and work boundaries |
| 07 | Gazian Society | Road paver work | Site not confirmed | Verify society spelling and paver type |
| 08 | Gulshan-e-Maymar | Road, sewerage and water line work | Gulshan-e-Maymar, Karachi | Confirm which components were directly performed |
| 09 | Japan City, Tando Allahyar | Backfilling, road and park-related work | Tando Allahyar, Sindh | Confirm 'Japan City' name and whether park work was preparation/development |

## Proposed simple data schema
```ts
export type ConstructionProject = {
  id: string;
  title: string;
  scopes: string[];
  location?: string;
  image?: string;
  imageKind?: 'actual' | 'representative';
  clientConfirmed: boolean;
  description?: string;
};
```

## Recommended publishing rules
- Show the nine projects as **project experience**, subject to client's confirmation of titles and scopes.
- NLC/FWO should appear only within the project titles until the specific contracting arrangement is confirmed; do not feature their logos under `Trusted By`.
- If using stock imagery, add a global note near the gallery: `Some images are illustrative and do not depict the listed project sites.`
- No `Completed` or `Ongoing` badges unless verified.
- Keep source wording recorded privately so the owner can correct it.

## Original notes (retain for reconciliation)
```text
NLC orangi sewerage line
FWO moter way M9 Road construction back filling
Asf city hill cutting and filling
Sassi garden road filling and compection
Faizan city road pewar
Gandhara society road cutting fillin boundary wall
Gazian society road pywar
Gulshan e maymar road sewerage water line
Tando alayar Japan city back filling road park
```
