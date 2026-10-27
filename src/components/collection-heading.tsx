import Link from 'next/link';
import type { Category } from '@/data/products';
import { products, v2Products } from '@/data/products';

export function CollectionHeading({ category, collection }: { category: Category; collection?: 'v2' }) {
  return (
    <header className="collection-heading">
      <p className="eyebrow">Capra / {collection === 'v2' ? 'Clothing / v2' : 'Field Study 03'}</p>
      <div className="collection-intro">
        <h1>{collection === 'v2' ? 'v2.' : category === 'clothing' ? 'Clothing.' : 'Accessories.'}</h1>
        <p>{collection === 'v2' ? 'Quiet lines. Room to move. A signature of our own.' : category === 'clothing'
          ? 'Ideas for the climb. The long way round. The feeling when you get there.'
          : 'The smaller things. Considered for every step of the way.'}</p>
      </div>
      <div className="collection-meta">
        <nav aria-label="Collections">
          {(['clothing', 'accessories'] as const).map(value => (
            <Link key={value} href={`/${value}`} aria-current={value === category ? 'page' : undefined}>
              {value === 'clothing' ? 'Clothing' : 'Accessories'}
              <sup>{products.filter(product => product.category === value).length}</sup>
            </Link>
          ))}
        </nav>
        <p>Collection concepts. A work in progress.</p>
      </div>
      {category === 'clothing' && <nav className="collection-versions" aria-label="Clothing collections">
        <Link href="/clothing" aria-current={!collection ? 'page' : undefined}>Field Study 03</Link>
        <Link href="/clothing/v2" aria-current={collection === 'v2' ? 'page' : undefined}>v2 <span>{v2Products.length} pieces</span></Link>
      </nav>}
    </header>
  );
}
