import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PreviewAction } from "@/components/ui/PreviewAction";
import { heroImage } from "@/lib/constants";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <Container>
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow"><span aria-hidden="true" />Built on hands-on experience</p>
            <h1 id="hero-heading"><span className="headline-line">Building Strong</span>{" "}<span className="headline-line">Foundations</span>{" "}<span className="headline-accent">for Tomorrow.</span></h1>
            <p className="hero-description">Over 20 years of experience in road construction, earthworks, infrastructure development and site preparation.</p>
            <div className="hero-actions">
              <PreviewAction destination="Projects" className="button button-primary">
                Explore Our Projects <ArrowUpRight aria-hidden="true" />
              </PreviewAction>
              <PreviewAction destination="Contact" className="button button-text">
                Get in Touch <ArrowRight aria-hidden="true" />
              </PreviewAction>
            </div>
            <div className="experience-note">
              <span className="experience-number">20<span>+</span></span>
              <p>Years of experience.<br /><span>A practical approach to every site.</span></p>
            </div>
          </div>
          <figure className="hero-figure">
            <div className="hero-photo">
              <Image src={heroImage.src} alt={heroImage.alt} fill priority sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 959px) calc(100vw - 80px), (max-width: 1399px) 46vw, 583px" />
              <div className="photo-title" aria-hidden="true"><span>From the ground up.</span><span>Preparation. Precision. Progress.</span></div>
            </div>
            <figcaption>
              <span>Representative imagery &middot; Not a SAS project site</span>
              <a href={heroImage.source}>Photo: {heroImage.photographer} / Unsplash &#8599;</a>
            </figcaption>
          </figure>
        </div>
        <div className="hero-baseline">
          <p>Independent contractor.<br /><strong>Direct involvement. From preparation to execution.</strong></p>
          <p>Machinery <span aria-hidden="true">/</span> Labour <span aria-hidden="true">/</span> Site management</p>
        </div>
      </Container>
    </section>
  );
}
