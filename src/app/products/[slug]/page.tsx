import { notFound } from 'next/navigation';
import Link from 'next/link';
import { allProducts as products } from '@/data/products';
import { productDetails, money } from '@/data/commerce';
import { ProductGallery } from '@/components/product-gallery';
import { ProductPurchase } from '@/components/product-purchase';
import { ConceptDetails } from '@/components/concept-details';
export async function generateMetadata({params}:{params:Promise<{slug:string}>}) { const {slug}=await params;return {title:`${products.find(p=>p.id===slug)?.name??'Product'} — Capra`}; }
export default async function ProductPage({params}:{params:Promise<{slug:string}>}) {
  const {slug}=await params;const product=products.find(p=>p.id===slug);if(!product)notFound();const detail=productDetails[slug];
  if (product.concept) return <main className="product-page" id="main-content">
    <nav className="breadcrumb" aria-label="Breadcrumb"><Link href={`/${product.category}`}>{product.category}</Link><span>/</span><span>{product.name}</span></nav>
    <div className="product-detail-layout"><ProductGallery product={product}/><ConceptDetails product={product} concept={product.concept}/></div>
  </main>;
  return <main className="product-page" id="main-content">
    <nav className="breadcrumb" aria-label="Breadcrumb"><Link href={`/${product.category}`}>{product.category}</Link><span>/</span><span>{product.name}</span></nav>
    <div className="product-detail-layout"><ProductGallery product={product}/><section className="product-info">
      <p className="eyebrow">CAPRA / {product.type}</p><h1>{product.name}</h1><p className="detail-price">{money(detail.price)} <span>USD</span></p>
      <p className="detail-description">{detail.description}</p>
      <div className="detail-color"><span className="product-swatch" style={{backgroundColor:product.colorHex}} role="img" aria-label={product.color}/><span>One color</span></div>
      <ProductPurchase id={slug}/>
      <p className="shipping-note">$8 US shipping · Free on orders $150+<br/><Link href="/policies/shipping-returns">Shipping & returns</Link></p>
      <div className="product-disclosures">
        <details open><summary>Fit & sizing</summary><p>{detail.fit}</p><p>Prototype sizes. Final garment measurements will be added before launch.</p></details>
        <details><summary>Materials & care</summary><p>{detail.material}</p><p>{detail.care}</p><p>Sample specifications for this prototype; not verified manufacturing or care-label claims.</p></details>
        <details><summary>Origin & product information</summary><p>Country of manufacture: awaiting supplier confirmation.</p><p>Style: {product.id.toUpperCase()}</p><p>Prototype photography includes edited branding and generated views. Final images, labels, material content and safety documentation must be verified before retail sale.</p></details>
      </div>
    </section></div>
  </main>;
}
