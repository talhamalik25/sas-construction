import { Hero } from "@/components/sections/Hero";
import { AboutExperience } from "@/components/sections/AboutExperience";
import { Services } from "@/components/sections/Services";
import { Projects } from "@/components/sections/Projects";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutExperience />
      <Services />
      <Projects />
    </>
  );
}
