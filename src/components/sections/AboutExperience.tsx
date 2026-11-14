import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import styles from "./AboutExperience.module.css";

const capabilities = [
  "Machinery & Equipment",
  "Skilled Workforce",
  "Complete Site Execution",
] as const;

export function AboutExperience() {
  return (
    <section id="about-experience" className={styles.section} aria-labelledby="experience-heading">
      <Container>
        <ScrollReveal>
          <div className={styles.sectionLabel} data-scroll-reveal>
            <span>About &amp; Experience</span>
            <span className={styles.labelRule} aria-hidden="true" />
            <span className={styles.labelDetail}>Built through doing.</span>
          </div>
          <div className={styles.composition}>
            <div className={styles.tenure} data-scroll-reveal>
              <p className={styles.numeral}>
                <span className="sr-only">Over 20 years of practical experience</span>
                <span aria-hidden="true">20<span className={styles.plus}>+</span></span>
              </p>
              <p className={styles.tenureLabel} aria-hidden="true">Years of practical experience</p>
            </div>
            <h2 id="experience-heading" className={styles.heading} data-scroll-reveal>
              20 Years on the Ground.{" "}<span>Experience That Builds Confidence.</span>
            </h2>
            <p className={styles.description} data-scroll-reveal>
              SAS Construction brings over two decades of practical construction experience to road development, earthworks, infrastructure improvement and site preparation. From machinery and workforce coordination to on-site execution, every stage is managed with a hands-on approach.
            </p>
            <figure className={styles.figure} data-scroll-reveal>
              <div className={styles.imageFrame}>
                <Image
                  src="/images/representative-earthworks.webp"
                  alt="Excavator bucket and tracked machinery on an earthmoving site"
                  fill
                  sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 959px) 42vw, 400px"
                />
              </div>
              <figcaption className={styles.caption}>
                <span>Representative imagery. Not a SAS project site.</span>
                <a href="https://unsplash.com/photos/a-yellow-excavator-digging-in-dirt-at-a-construction-site-jPsmNCgLghU">
                  Defrino Maasy / Unsplash <ArrowUpRight size={12} aria-hidden="true" />
                </a>
              </figcaption>
            </figure>
            <ul className={styles.capabilities} aria-label="Construction capabilities">
              {capabilities.map((capability) => (
                <li key={capability} data-scroll-reveal>
                  <span className={styles.capabilityMark} aria-hidden="true" />
                  <span>{capability}</span>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
