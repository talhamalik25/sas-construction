export type ProjectCategory =
  | "all"
  | "roads-paving"
  | "earthwork-preparation"
  | "utilities-drainage"
  | "site-development";

export interface ProjectRecord {
  id: string;
  numeral: string;
  title: string;
  scopeSupplied: string;
  category: string;
  categoryKey: Exclude<ProjectCategory, "all">;
  location: string;
  locationConfirmed: boolean;
  featured: boolean;
  description: string;
  scopes: string[];
  image: {
    src: string;
    alt: string;
    caption: string;
  };
  clientNote?: string;
}

export const projectCategories: { key: ProjectCategory; label: string }[] = [
  { key: "all", label: "All Projects" },
  { key: "roads-paving", label: "Roads & Paving" },
  { key: "earthwork-preparation", label: "Earthwork & Preparation" },
  { key: "utilities-drainage", label: "Utilities & Drainage" },
  { key: "site-development", label: "Site Development" },
];

export const projectsData: ProjectRecord[] = [
  {
    id: "nlc-orangi",
    numeral: "01",
    title: "NLC Orangi",
    scopeSupplied: "Sewerage Line Work",
    category: "Sewerage Infrastructure",
    categoryKey: "utilities-drainage",
    location: "Orangi, Karachi",
    locationConfirmed: true,
    featured: true,
    description:
      "Trenching, deep excavation and underground pipeline installation for major municipal sewerage line work.",
    scopes: [
      "Deep Trench Excavation",
      "Reinforced Concrete Pipeline Installation",
      "Utility Bedding & Backfilling",
    ],
    image: {
      src: "/images/projects/nlc-orangi.jpg",
      alt: "Excavator and crew installing reinforced concrete sewerage pipes into a prepared trench",
      caption: "Representative imagery · Trenching and municipal drainage pipeline installation.",
    },
    clientNote: "Title and scope based on client project register. NLC is a project reference label.",
  },
  {
    id: "fwo-m9",
    numeral: "02",
    title: "FWO Motorway M9",
    scopeSupplied: "Road Construction Backfilling",
    category: "Road Development / Earthwork",
    categoryKey: "roads-paving",
    location: "M9 Motorway Corridor",
    locationConfirmed: true,
    featured: true,
    description:
      "Large-scale earthwork, fill placement and compaction operations along the M9 Motorway road development corridor.",
    scopes: [
      "Highway Embankment Backfilling",
      "Heavy Earthmoving & Spreading",
      "Sub-Base Compaction",
    ],
    image: {
      src: "/images/projects/fwo-m9.jpg",
      alt: "Heavy bulldozers and rollers backfilling and leveling earth along a motorway corridor",
      caption: "Representative imagery · Large-scale motorway backfilling and ground stabilization.",
    },
    clientNote: "Title and scope based on client project register. FWO is a project reference label.",
  },
  {
    id: "asf-city",
    numeral: "03",
    title: "ASF City",
    scopeSupplied: "Hill Cutting and Filling",
    category: "Earthwork / Site Preparation",
    categoryKey: "earthwork-preparation",
    location: "Karachi Corridor (Location pending confirmation)",
    locationConfirmed: false,
    featured: true,
    description:
      "Mass excavation, hill and terrain cutting, and engineered fill placement to prepare raw topography for site development.",
    scopes: [
      "Hill & Ridge Cutting",
      "Mass Terrain Excavation",
      "Engineered Fill & Terrace Leveling",
    ],
    image: {
      src: "/images/projects/asf-city.jpg",
      alt: "Hydraulic excavator cutting into rugged terrain and terracing a hillside slope",
      caption: "Representative imagery · Hill excavation, terrain cutting and bulk material movement.",
    },
    clientNote: "Exact project boundary and sector to be confirmed with client.",
  },
  {
    id: "sassi-garden",
    numeral: "04",
    title: "Sassi Garden",
    scopeSupplied: "Road Filling and Compaction",
    category: "Road Development",
    categoryKey: "roads-paving",
    location: "Location pending confirmation",
    locationConfirmed: false,
    featured: false,
    description:
      "Sub-base material placement, road formation filling and heavy vibratory roller compaction for internal access roads.",
    scopes: [
      "Road Base Filling",
      "Vibratory Roller Compaction",
      "Subgrade Stabilization",
    ],
    image: {
      src: "/images/projects/sassi-garden.jpg",
      alt: "Heavy tandem steel roller compacting road base course on a residential scheme road",
      caption: "Representative imagery · Road filling and compaction execution.",
    },
    clientNote: "Location and society name to be verified with client.",
  },
  {
    id: "faizan-city",
    numeral: "05",
    title: "Faizan City",
    scopeSupplied: "Road Paver Installation",
    category: "Road Paving",
    categoryKey: "roads-paving",
    location: "Location pending confirmation",
    locationConfirmed: false,
    featured: false,
    description:
      "Base preparation, sand screeding and manual placement of heavy-duty interlocking paving blocks for internal streets.",
    scopes: [
      "Interlocking Paver Laying",
      "Sand Bedding & Edge Restraints",
      "Surface Leveling & Compaction",
    ],
    image: {
      src: "/images/projects/faizan-city.jpg",
      alt: "Construction crew laying interlocking concrete pavers on a new road roadway",
      caption: "Representative imagery · Interlocking paver installation and surface finishing.",
    },
    clientNote: "Paver specifications and society location to be confirmed with client.",
  },
  {
    id: "gandhara-society",
    numeral: "06",
    title: "Gandhara Society",
    scopeSupplied: "Road Cutting, Filling and Boundary Wall",
    category: "Construction / Site Development",
    categoryKey: "site-development",
    location: "Location pending confirmation",
    locationConfirmed: false,
    featured: false,
    description:
      "Perimeter masonry boundary wall construction combined with internal road cutting and site leveling operations.",
    scopes: [
      "Masonry Boundary Wall Construction",
      "Internal Road Cutting & Grading",
      "Perimeter Earthwork Leveling",
    ],
    image: {
      src: "/images/projects/gandhara-society.jpg",
      alt: "Concrete masonry boundary wall along site perimeter with earthmoving grading nearby",
      caption: "Representative imagery · Boundary wall construction and integrated road cutting.",
    },
    clientNote: "Exact society spelling and site boundary to be confirmed with client.",
  },
  {
    id: "gazian-society",
    numeral: "07",
    title: "Gazian Society",
    scopeSupplied: "Road Paver Installation",
    category: "Road Paving",
    categoryKey: "roads-paving",
    location: "Location pending confirmation",
    locationConfirmed: false,
    featured: false,
    description:
      "Surface leveling, curb-stone laying and interlocking paver block installation across residential society road routes.",
    scopes: [
      "Paver Block Surfacing",
      "Curb Stone Installation",
      "Subgrade Compaction",
    ],
    image: {
      src: "/images/projects/gazian-society.webp",
      alt: "Interlocking paver road construction and curb stones along a residential scheme route",
      caption: "Representative imagery · Paver block surfacing and road alignment.",
    },
    clientNote: "Society spelling to be confirmed with client.",
  },
  {
    id: "gulshan-e-maymar",
    numeral: "08",
    title: "Gulshan-e-Maymar",
    scopeSupplied: "Road, Sewerage and Water Line Work",
    category: "Infrastructure Development",
    categoryKey: "utilities-drainage",
    location: "Gulshan-e-Maymar, Karachi",
    locationConfirmed: true,
    featured: false,
    description:
      "Integrated site infrastructure execution including utility trenching, water supply line laying, sewerage and road preparation.",
    scopes: [
      "Water Supply Pipeline Installation",
      "Sewerage Network Trenching",
      "Roadway Preparation & Backfilling",
    ],
    image: {
      src: "/images/projects/gulshan-maymar.webp",
      alt: "Underground utility trenching and dual pipeline installation on an infrastructure site",
      caption: "Representative imagery · Integrated water, sewerage and road infrastructure.",
    },
    clientNote: "Specific sector details to be confirmed with client.",
  },
  {
    id: "japan-city",
    numeral: "09",
    title: "Japan City, Tando Allahyar",
    scopeSupplied: "Backfilling, Road and Park Development",
    category: "Site Development",
    categoryKey: "site-development",
    location: "Tando Allahyar, Sindh",
    locationConfirmed: true,
    featured: false,
    description:
      "Bulk earth backfilling, site leveling, internal road formation and ground development for community park areas.",
    scopes: [
      "Bulk Material Backfilling",
      "Internal Road Formation",
      "Park Area Land Preparation",
    ],
    image: {
      src: "/images/projects/japan-city.jpg",
      alt: "Bulldozer and heavy trucks backfilling and spreading earth for master-planned site development",
      caption: "Representative imagery · Land backfilling and development preparation in Sindh.",
    },
    clientNote: "Confirmed city: Tando Allahyar, Sindh. Project name to be reconciled with owner.",
  },
];
