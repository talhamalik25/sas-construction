export interface Service {
  id: string;
  numeral: string;
  title: string;
  shortTitle: string;
  description: string;
  scopes: string[];
  image: {
    src: string;
    alt: string;
    caption: string;
  };
}

export const servicesData: Service[] = [
  {
    id: "road-construction",
    numeral: "01",
    title: "Road Construction & Development",
    shortTitle: "Road Construction",
    description:
      "Construction and development of internal roads, access routes and road networks for construction and development projects.",
    scopes: ["Internal Road Networks", "Access Routes & Grading", "Base & Sub-Base Preparation"],
    image: {
      src: "/images/services/road-construction.jpg",
      alt: "Road construction machinery and pavers laying a road network on a development site",
      caption: "Road network formation, grading and sub-base execution.",
    },
  },
  {
    id: "earthwork-backfilling",
    numeral: "02",
    title: "Earthwork & Backfilling",
    shortTitle: "Earthwork & Backfilling",
    description:
      "Site preparation, earth filling and backfilling operations supporting road construction and land development.",
    scopes: ["Engineered Earth Filling", "Site Leveling & Backfilling", "Compacted Material Placement"],
    image: {
      src: "/images/services/earthwork-backfilling.jpg",
      alt: "Earthmoving equipment and bulldozers leveling soil for site preparation",
      caption: "Engineered earth placement, backfilling and site leveling.",
    },
  },
  {
    id: "excavation-cutting",
    numeral: "03",
    title: "Excavation, Cutting & Filling",
    shortTitle: "Excavation & Cutting",
    description:
      "Excavation, hill cutting, land cutting and filling operations for preparing and developing construction sites.",
    scopes: ["Hill & Terrain Cutting", "Trench & Foundation Digging", "Mass Earth Movement"],
    image: {
      src: "/images/services/excavation-cutting.jpg",
      alt: "Tracked excavator cutting into an earthmoving slope on an active site",
      caption: "Heavy cutting, mass excavation and site topography preparation.",
    },
  },
  {
    id: "sewerage-water-lines",
    numeral: "04",
    title: "Sewerage & Water Lines",
    shortTitle: "Sewerage & Water Lines",
    description:
      "Construction and installation work related to sewerage networks and water supply lines.",
    scopes: ["Sewerage Line Trenching", "Underground Utility Infrastructure", "Water Supply Pipeline Networks"],
    image: {
      src: "/images/services/sewerage-water-lines.jpg",
      alt: "Excavation trench with pipeline infrastructure installation in progress",
      caption: "Trenching and installation for underground utility lines.",
    },
  },
  {
    id: "road-paving-compaction",
    numeral: "05",
    title: "Road Paving & Compaction",
    shortTitle: "Paving & Compaction",
    description:
      "Road paving, paver installation, surface preparation and ground compaction activities.",
    scopes: ["Heavy Roller Compaction", "Paver Installation & Surfacing", "Base Course Finishing"],
    image: {
      src: "/images/services/road-paving-compaction.jpg",
      alt: "Road roller compacting a newly laid base course layer on an infrastructure project",
      caption: "Vibratory compaction, surface finishing and paver installation.",
    },
  },
  {
    id: "boundary-walls-development",
    numeral: "06",
    title: "Boundary Walls & Site Development",
    shortTitle: "Boundary Walls & Development",
    description:
      "Boundary wall construction and related development work for residential societies and other construction sites.",
    scopes: ["Perimeter Masonry Walls", "Residential Society Enclosures", "Integrated Site Development"],
    image: {
      src: "/images/services/boundary-walls-development.jpg",
      alt: "Perimeter boundary wall construction along an expansive site boundary",
      caption: "Boundary wall structures and site perimeter development.",
    },
  },
];
