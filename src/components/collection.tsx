import { storefront } from '@/config/storefront';
import { SectionNote } from './section-note';

export function Collection() {
  return (
    <section id="collection" className="collection section" aria-labelledby="collection-heading">
      <SectionNote section="collection" />
      <h2 id="collection-heading">{storefront.collection.title}</h2>
      <ul className="product-grid">
        {storefront.collection.slots.map((label, index) => (
          <li key={`${label}-${index}`}>
            <div className="image-placeholder product-image" role="img" aria-label={`Image placeholder for ${label}`}><span className="placeholder-cross" aria-hidden="true">+</span><span>Product image</span></div>
            <div className="product-caption"><h3>{label}</h3><span>Placeholder</span></div>
          </li>
        ))}
      </ul>
    </section>
  );
}
