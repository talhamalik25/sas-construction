import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PreviewAction } from "@/components/ui/PreviewAction";
import { HeroMotion } from "@/components/ui/HeroMotion";
import { heroImage } from "@/lib/constants";

export function Hero() {
  return (
    <HeroMotion>
      <section className="hero" aria-labelledby="hero-heading">
        <Container>
          <div className="hero-copy">
            <div className="hero-kicker" data-hero-reveal>
              <p className="eyebrow"><span aria-hidden="true" />Independent contractor. Hands-on execution.</p>
              <p className="hero-tenure">20+ years of field experience</p>
            </div>
            <h1 id="hero-heading" data-hero-reveal>
              <span className="headline-line">Building Strong</span>{" "}
              <span className="headline-line">Foundations <span className="headline-accent">for Tomorrow.</span></span>
            </h1>
            <div className="hero-intro" data-hero-reveal>
              <p className="hero-description">Over 20 years of experience in road construction, earthworks, infrastructure development and site preparation.</p>
              <div className="hero-actions">
                <PreviewAction destination="Projects" className="button button-primary">
                  Explore Our Projects <ArrowUpRight aria-hidden="true" />
                </PreviewAction>
                <PreviewAction destination="Contact" className="button button-text">
                  Get in Touch <ArrowRight aria-hidden="true" />
                </PreviewAction>
              </div>
            </div>
          </div>
        </Container>
        <figure className="hero-figure">
          <div className="hero-photo">
            <Image src={heroImage.src} alt={heroImage.alt} fill preload quality={90} sizes="100vw" />
            <div className="image-registration" aria-hidden="true" />
            <Container className="photo-caption-container">
              <div className="photo-title">
                <span className="photo-label">Earthwork &amp; site preparation</span>
                <span>Progress starts<br />at ground level.</span>
              </div>
              <p className="photo-scope">Machinery. Labour.<br />Site management. Execution.</p>
            </Container>
          </div>
          <Container className="image-credit">
            <span>Representative imagery &middot; Not a SAS project site</span>
            <a href={heroImage.source}>Photography: {heroImage.photographer} / Unsplash <ArrowUpRight size={13} aria-hidden="true" /></a>
          </Container>
        </figure>
      </section>
    </HeroMotion>
  );
}
