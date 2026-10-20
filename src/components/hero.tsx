import { storefront } from '@/config/storefront';
import { SectionNote } from './section-note';

export function Hero() {
  return (
    <section className="hero section" aria-labelledby="hero-heading">
      <SectionNote section="hero" />
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">{storefront.hero.eyebrow}</p>
          <h1 id="hero-heading">{storefront.hero.title}</h1>
          <p className="description">{storefront.hero.description}</p>
          <a className="primary-link" href="#collection">{storefront.hero.cta}<span aria-hidden="true">↗</span></a>
        </div>
        <div className="image-placeholder hero-image" role="img" aria-label="Placeholder for a campaign photograph">
          <span className="placeholder-cross" aria-hidden="true">+</span><span>Campaign image</span>
        </div>
      </div>
    </section>
  );
}
