import type { Metadata } from 'next';
import { ProductCatalog } from '@/components/product-catalog';
import { products } from '@/data/products';

export const metadata: Metadata = { title: 'Clothing — Odle' };

export default async function ClothingPage({ searchParams }: { searchParams: Promise<{ type?: string | string[] }> }) {
  const query = await searchParams;
  const type = typeof query.type === 'string' && products.some(product => product.category === 'clothing' && product.type === query.type) ? query.type : '';

  return (
    <main className="catalog-page" id="main-content">
      <h1 className="sr-only">Clothing</h1>
      <ProductCatalog category="clothing" initialType={type} key={type} />
    </main>
  );
}
