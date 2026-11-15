export type ProjectCategory =
  | "all"
  | "roads-paving"
  | "earthwork-preparation"
  | "utilities-drainage"
  | "site-development";

export interface ProjectImage {
  src: string;
  alt: string;
  caption: string;
  classification: "A" | "B";
  sourceUrl?: string;
  author?: string;
  license?: string;
  licenseUrl?: string;
  changes?: string;
}

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
  image: ProjectImage;
  images?: ProjectImage[];
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
    locationConfirmed: false,
    featured: true,
    description:
      "Sewerage line trenching and pipe installation work, as supplied in the SAS Construction project register.",
    scopes: ["Sewerage Line Work"],
    image: {
      src: "/images/projects/nlc-orangi.webp",
      alt: "Excavation and trenching for sewerage pipeline installation at NLC Orangi project",
      caption: "Sewerage pipeline trenching and infrastructure execution at Orangi, Karachi.",
      classification: "A",
      author: "SAS Construction",
    },
    clientNote: "Title and scope based on client project register. NLC is a project reference label; exact site and contractual role are unconfirmed.",
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
      "Road construction-related backfilling along the M9 Motorway corridor, as supplied in the project register.",
    scopes: ["Road Construction Backfilling"],
    image: {
      src: "/images/projects/fwo-m9.webp",
      alt: "Road construction backfilling and earthwork machinery on the M9 Motorway project",
      caption: "Road formation backfilling along the M9 Motorway corridor.",
      classification: "A",
      author: "SAS Construction",
    },
    images: [
      {
        src: "/images/projects/fwo-m9.webp",
        alt: "Road construction backfilling and earthwork machinery on the M9 Motorway project",
        caption: "Road formation backfilling along the M9 Motorway corridor.",
        classification: "A",
        author: "SAS Construction",
      },
      {
        src: "/images/projects/m9-jamshoro-location.webp",
        alt: "Road junction viewed from the M9 Jamshoro toll-plaza flyover, photographed in 2016",
        caption: "M9 corridor at Jamshoro, 2016. Location reference.",
        classification: "B",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:National_highway_(M-9)_Jamsshoro_Toll_Plaza_Overfly.jpg",
        author: "Jogi don",
        license: "CC BY-SA 4.0",
        licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
        changes: "Resized and converted to WebP; no crop.",
      },
    ],
    clientNote: "Title and scope based on client project register. FWO is a project reference label; work package and contractual role are unconfirmed.",
  },
  {
    id: "asf-city",
    numeral: "03",
    title: "ASF City",
    scopeSupplied: "Hill Cutting and Filling",
    category: "Earthwork / Site Preparation",
    categoryKey: "earthwork-preparation",
    location: "ASF City, Karachi",
    locationConfirmed: false,
    featured: true,
    description:
      "Hill cutting and filling, as supplied in the project register. Exact site boundaries remain to be confirmed.",
    scopes: ["Hill Cutting", "Filling"],
    image: {
      src: "/images/projects/asf-city.webp",
      alt: "Hill cutting and mass excavation machinery leveling terrain at ASF City site",
      caption: "Hill cutting and terrain leveling operations at ASF City.",
      classification: "A",
      author: "SAS Construction",
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
    location: "Scheme 45, Karachi",
    locationConfirmed: false,
    featured: false,
    description:
      "Road filling and compaction, as supplied in the project register.",
    scopes: ["Road Filling", "Compaction"],
    image: {
      src: "/images/projects/sassi-garden.webp",
      alt: "Earthmoving machinery performing road filling and ground compaction at Sassi Garden",
      caption: "Road filling and soil compaction activities at Sassi Garden.",
      classification: "A",
      author: "SAS Construction",
    },
    clientNote: "Location and society name to be verified with client.",
  },
  {
    id: "faizan-city",
    numeral: "05",
    title: "Faizan City",
    scopeSupplied: "Road Paver Work",
    category: "Road Paving",
    categoryKey: "roads-paving",
    location: "Scheme 45, Karachi",
    locationConfirmed: false,
    featured: false,
    description:
      "Road paver work, as supplied in the project register. Paver type remains to be confirmed.",
    scopes: ["Road Paver Work"],
    image: {
      src: "/images/projects/faizan-city.webp",
      alt: "Interlocking paver installation and road surface finishing at Faizan City",
      caption: "Road paver installation and surface paving at Faizan City.",
      classification: "A",
      author: "SAS Construction",
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
    location: "Scheme 33, Karachi",
    locationConfirmed: false,
    featured: false,
    description:
      "Road cutting, filling and boundary wall work, as supplied in the project register.",
    scopes: ["Road Cutting", "Filling", "Boundary Wall"],
    image: {
      src: "/images/projects/gandhara-society.webp",
      alt: "Site excavation, cutting, filling, and boundary wall construction at Gandhara Society",
      caption: "Road cutting, filling, and perimeter boundary wall construction at Gandhara Society.",
      classification: "A",
      author: "SAS Construction",
    },
    clientNote: "Exact society spelling and site boundary to be confirmed with client.",
  },
  {
    id: "gazian-society",
    numeral: "07",
    title: "Gazian Society",
    scopeSupplied: "Road Paver Work",
    category: "Road Paving",
    categoryKey: "roads-paving",
    location: "Location pending confirmation",
    locationConfirmed: false,
    featured: false,
    description:
      "Road paver work, as supplied in the project register. Society spelling and paver type remain to be confirmed.",
    scopes: ["Road Paver Work"],
    image: {
      src: "/images/projects/gazian-society.webp",
      alt: "Road paving and ground leveling execution at Gazian Society",
      caption: "Road paver execution and surface preparation at Gazian Society.",
      classification: "A",
      author: "SAS Construction",
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
      "Road, sewerage and water line work, as supplied in the project register.",
    scopes: ["Road Work", "Sewerage Work", "Water Line Work"],
    image: {
      src: "/images/projects/gulshan-maymar.webp",
      alt: "Road formation and infrastructure development at Gulshan-e-Maymar",
      caption: "Road development and surface preparation in Gulshan-e-Maymar, Karachi.",
      classification: "A",
      author: "SAS Construction",
    },
    clientNote: "Sector and components directly performed by SAS remain to be confirmed.",
  },
  {
    id: "japan-city",
    numeral: "09",
    title: "Japan City, Tando Allahyar",
    scopeSupplied: "Backfilling, Road and Park-related Work",
    category: "Site Development",
    categoryKey: "site-development",
    location: "Tando Allahyar, Sindh",
    locationConfirmed: true,
    featured: false,
    description:
      "Backfilling, road and park-related work in Tando Allahyar, as supplied in the project register.",
    scopes: ["Backfilling", "Road Work", "Park-related Work"],
    image: {
      src: "/images/projects/tando-alayar.jpg",
      alt: "Earthmoving machinery performing backfilling and road development at Japan City, Tando Allahyar",
      caption: "Mass backfilling and internal road development in Tando Allahyar, Sindh.",
      classification: "A",
      author: "SAS Construction",
    },
    clientNote: "Client-supplied city: Tando Allahyar, Sindh. Project name to be reconciled with owner.",
  },
];
