import { Hero } from "@/components/sections/Hero";
import { AboutExperience } from "@/components/sections/AboutExperience";
import { Services } from "@/components/sections/Services";
import { Projects } from "@/components/sections/Projects";
import { HowWeWork } from "@/components/sections/HowWeWork";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { ProjectInquiry } from "@/components/sections/ProjectInquiry";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutExperience />
      <Services />
      <Projects />
      <HowWeWork />
      <WhyChooseUs />
      <ProjectInquiry />
      <Contact />
    </>
  );
}
