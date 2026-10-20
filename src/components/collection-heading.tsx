import Link from 'next/link';
import type { Category } from '@/data/products';
import { products } from '@/data/products';

export function CollectionHeading({ category }: { category: Category }) {
  return (
    <header className="collection-heading">
      <p className="eyebrow">Capra / Field Study 03</p>
      <div className="collection-intro">
        <h1>{category === 'clothing' ? 'Clothing.' : 'Accessories.'}</h1>
        <p>{category === 'clothing'
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
    </header>
  );
}
