import Image from "next/image";
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
            <h1 id="hero-heading">Building Strong Foundations <span>for Tomorrow.</span></h1>
            <p className="hero-description">Over 20 years of experience in road construction, earthworks, infrastructure development and site preparation.</p>
            <div className="hero-actions">
              <PreviewAction destination="Projects" className="button button-primary">
                Explore Our Projects <span aria-hidden="true">&#8599;</span>
              </PreviewAction>
              <PreviewAction destination="Contact" className="button button-text">
                Get in Touch <span aria-hidden="true">&#8594;</span>
              </PreviewAction>
            </div>
            <p className="action-note">Homepage preview. Projects and contact pages coming soon.</p>
            <div className="experience-note">
              <span className="experience-number">20<span>+</span></span>
              <p>Years of experience.<br /><span>A practical approach to every site.</span></p>
            </div>
          </div>
          <figure className="hero-figure">
            <div className="hero-photo">
              <Image src={heroImage.src} alt={heroImage.alt} fill priority sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 959px) calc(100vw - 80px), 46vw" />
              <span className="photo-index" aria-hidden="true">SAS / 01</span>
              <div className="photo-title" aria-hidden="true"><span>From the ground up.</span><span>Experience in every detail.</span></div>
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
