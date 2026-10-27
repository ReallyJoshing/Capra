import Link from 'next/link';
import type { Product } from '@/data/products';

export function ConceptDetails({ product, concept }: { product: Product; concept: NonNullable<Product['concept']> }) {
  return <section className="product-info concept-info">
    <p className="eyebrow">{product.collection === 'v2' ? 'v2' : 'FIELD STUDY 03'} / {concept.code} / {concept.kind}</p>
    <h1>{product.name}</h1>
    <p className="concept-status">Collection concept · Not yet available</p>
    <p className="detail-description">{concept.intro}</p>
    {product.colorways ? <p className="detail-colorway-list">Two colorways: {product.colorways.map(colorway => colorway.name).join(' · ')}</p>
      : <div className="detail-color"><span className="product-swatch" style={{backgroundColor:product.colorHex}} role="img" aria-label={product.color}/><span>{product.color}</span></div>}
    <section className="concept-features" aria-labelledby="design-features">
      <h2 id="design-features">Five design features</h2>
      <ol>{concept.features.map(feature => <li key={feature.name}>
        <h3>{feature.name}</h3><p>{feature.text}</p>
      </li>)}</ol>
    </section>
    <div className="product-disclosures">
      <details open><summary>Fit & silhouette</summary><p>{concept.fit}</p></details>
      <details><summary>Development notes</summary><p>Materials, construction, sizing and performance are in development. Pricing and availability have not been set.</p><p>{concept.validation}</p></details>
    </div>
    <Link href={product.collection === 'v2' ? '/clothing/v2' : `/${product.category}`} className="outline-button">Back to {product.collection === 'v2' ? 'v2' : product.category} <span aria-hidden="true">↗</span></Link>
  </section>;
}
