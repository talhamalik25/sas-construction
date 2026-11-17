import { projectsData } from "@/data/projects";

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

// Reuse the SAS photographs explicitly approved by the client on 17 November 2026.
// Project captions remain tied to their original records; no third-party service stock is needed.
function servicePhoto(projectId: string): Service["image"] {
  const photo = projectsData.find(project => project.id === projectId)!.image;
  return { src: photo.src, alt: photo.alt, caption: photo.caption };
}

export const servicesData: Service[] = [
  {
    id: "road-construction",
    numeral: "01",
    title: "Road Construction & Development",
    shortTitle: "Road Construction",
    description:
      "Construction and development of internal roads, access routes and road networks for construction and development projects.",
    scopes: ["Road Formation", "Road Preparation", "Road Development"],
    image: servicePhoto("fwo-m9"),
  },
  {
    id: "earthwork-backfilling",
    numeral: "02",
    title: "Earthwork & Backfilling",
    shortTitle: "Earthwork & Backfilling",
    description:
      "Site preparation, earth filling and backfilling operations supporting road construction and land development.",
    scopes: ["Earth Filling", "Backfilling", "Material Placement"],
    image: servicePhoto("japan-city"),
  },
  {
    id: "excavation-cutting",
    numeral: "03",
    title: "Excavation, Cutting & Filling",
    shortTitle: "Excavation & Cutting",
    description:
      "Excavation, hill cutting, land cutting and filling operations for preparing and developing construction sites.",
    scopes: ["Hill Cutting", "Excavation", "Land Preparation"],
    image: servicePhoto("asf-city"),
  },
  {
    id: "sewerage-water-lines",
    numeral: "04",
    title: "Sewerage & Water Lines",
    shortTitle: "Sewerage & Water Lines",
    description:
      "Construction and installation work related to sewerage networks and water supply lines.",
    scopes: ["Sewerage Line Trenching", "Underground Utility Infrastructure", "Water Supply Pipeline Networks"],
    image: servicePhoto("nlc-orangi"),
  },
  {
    id: "road-paving-compaction",
    numeral: "05",
    title: "Road Paving & Compaction",
    shortTitle: "Paving & Compaction",
    description:
      "Road paving, paver installation, surface preparation and ground compaction activities.",
    scopes: ["Ground Compaction", "Paver-related Work", "Surface Preparation"],
    image: servicePhoto("faizan-city"),
  },
  {
    id: "boundary-walls-development",
    numeral: "06",
    title: "Boundary Walls & Site Development",
    shortTitle: "Boundary Walls & Development",
    description:
      "Boundary wall construction and related development work for residential societies and other construction sites.",
    scopes: ["Boundary Wall Construction", "Site Preparation", "Site Development"],
    image: servicePhoto("gandhara-society"),
  },
];
