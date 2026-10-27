import type { Metadata } from 'next';
import { ProductCatalog } from '@/components/product-catalog';
import { CollectionHeading } from '@/components/collection-heading';
import { v2Products } from '@/data/products';

export const metadata: Metadata = {
  title: 'v2 — Clothing — Capra',
  description: 'The refined Capra collection: considered movement, inverse neutral tones and the original goat signature.',
};

export default async function V2CollectionPage({ searchParams }: { searchParams: Promise<{ type?: string | string[] }> }) {
  const query = await searchParams;
  const type = typeof query.type === 'string' && v2Products.some(product => product.type === query.type) ? query.type : '';

  return <main className="catalog-page" id="main-content">
    <CollectionHeading category="clothing" collection="v2" />
    <ProductCatalog category="clothing" catalog={v2Products} initialType={type} key={type} />
  </main>;
}
