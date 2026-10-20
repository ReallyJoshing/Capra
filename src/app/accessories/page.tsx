import type { Metadata } from 'next';
import { ProductCatalog } from '@/components/product-catalog';
import { products } from '@/data/products';

export const metadata: Metadata = { title: 'Accessories — Capra' };

export default async function AccessoriesPage({ searchParams }: { searchParams: Promise<{ type?: string | string[] }> }) {
  const query = await searchParams;
  const type = typeof query.type === 'string' && products.some(product => product.category === 'accessories' && product.type === query.type) ? query.type : '';
  return (
    <main className="catalog-page" id="main-content">
      <h1 className="sr-only">Accessories</h1>
      <ProductCatalog category="accessories" initialType={type} key={type} />
    </main>
  );
}
