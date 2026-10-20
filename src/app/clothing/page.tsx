import type { Metadata } from 'next';
import { ProductCatalog } from '@/components/product-catalog';
import { CollectionHeading } from '@/components/collection-heading';
import { products } from '@/data/products';

export const metadata: Metadata = { title: 'Clothing — Capra' };

export default async function ClothingPage({ searchParams }: { searchParams: Promise<{ type?: string | string[] }> }) {
  const query = await searchParams;
  const type = typeof query.type === 'string' && products.some(product => product.category === 'clothing' && product.type === query.type) ? query.type : '';

  return (
    <main className="catalog-page" id="main-content">
      <CollectionHeading category="clothing" />
      <ProductCatalog category="clothing" initialType={type} key={type} />
    </main>
  );
}
