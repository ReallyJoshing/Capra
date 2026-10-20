'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useId, useRef, useState } from 'react';
import { products, type Category, type Product } from '@/data/products';
import { money, productDetails } from '@/data/commerce';
import { filterProducts } from '@/lib/catalog.mjs';

function GlassFilter({ label, value, options, onChange }: {
  label: string; value: string; options: string[]; onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const trigger = useRef<HTMLButtonElement>(null);
  return (
    <div className="glass-filter"
      onPointerEnter={event => { if (event.pointerType === 'mouse') setOpen(true); }}
      onPointerLeave={event => { if (event.pointerType === 'mouse' && !event.currentTarget.contains(document.activeElement)) setOpen(false); }}
      onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}
      onKeyDown={event => {
        if (event.key === 'Escape') { setOpen(false); trigger.current?.focus(); }
      }}>
      <button ref={trigger} type="button" className="glass-filter-trigger"
        aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}
        onKeyDown={event => {
          if (event.key === 'ArrowDown') { event.preventDefault(); setOpen(true); }
        }}>
        <span>{label}{value && `: ${value}`}</span>
        <svg className="glass-filter-caret" viewBox="0 0 12 12" aria-hidden="true" focusable="false">
          <path d="m2 4 4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div className="glass-filter-dropdown" id={id} hidden={!open}>
        <div className="glass-filter-options" role="group" aria-label={label}>
          {['', ...options].map(option => (
            <button type="button" key={option} aria-pressed={value === option}
              onClick={() => { onChange(option); setOpen(false); trigger.current?.focus(); }}>
              {option || `All ${label.toLowerCase()}s`}
              {value === option && <span aria-hidden="true">✓</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const [selected, setSelected] = useState(0);
  const [hovered, setHovered] = useState(false);
  const alternate = product.hoverImageIndex ?? 1;
  const index = hovered && product.images.length > 1 ? (selected === alternate ? 0 : alternate) : selected;

  return (
    <article className={`product-card${product.concept ? ' concept-card' : ''}`}>
      <div className="product-visual">
        <Link href={`/products/${product.id}`} className="product-image-stage" aria-label={`View ${product.name}`}
          onPointerEnter={event => { if (event.pointerType === 'mouse') setHovered(true); }}
          onPointerLeave={() => setHovered(false)}>
          {product.images.map((image, i) => (
            <span className="product-photo-layer" key={image.src} style={{ visibility: index === i ? 'visible' : 'hidden' }} aria-hidden={index !== i}>
              <Image src={image.src} alt={image.alt} fill
                sizes="(max-width: 639px) calc((100vw - 50px) / 2), (max-width: 1023px) 45vw, (max-width: 1260px) 22vw, 280px"
                className={image.lifestyle ? 'product-image product-image-lifestyle' : `product-image ${product.imageClass ?? ''}`} />
            </span>
          ))}
        </Link>
        {product.images.length > 1 && <div className="view-dots card-view-dots" role="group" aria-label={`Photos of ${product.name}`} onClick={event => event.stopPropagation()}>
          {product.images.map((image, i) => <button key={image.src} type="button" aria-label={`Show ${image.label.toLowerCase()} view (${i + 1} of ${product.images.length})`} aria-pressed={index === i}
            onClick={() => { setSelected(i); setHovered(false); }}><span /></button>)}
        </div>}
      </div>
      <div className="product-caption">
        <div><h2><Link href={`/products/${product.id}`}>{product.name}</Link></h2><p className="card-price">{product.concept ? `${product.color} / Concept ${product.concept.code}` : money(productDetails[product.id].price)}</p></div>
        <span className="product-swatch" style={{ backgroundColor: product.colorHex }} role="img" aria-label={`Color: ${product.color}`} title={product.color} />
      </div>
    </article>
  );
}

export function ProductCatalog({ category, initialType = '' }: { category: Category; initialType?: string }) {
  const collection = products.filter(product => product.category === category);
  const [type, setType] = useState(initialType);
  const [color, setColor] = useState('');
  const types = [...new Set(collection.map(product => product.type))];
  const colors = [...new Set(collection.map(product => product.color))];
  const results = filterProducts(products, category, { type, color });
  const hasFilters = Boolean(type || color);

  function clearFilters() {
    setType('');
    setColor('');
  }

  return (
    <>
      <div className="catalog-toolbar">
        <div className="catalog-filters" role="group" aria-label="Filter products">
          <GlassFilter label="Type" value={type} options={types} onChange={setType} />
          <GlassFilter label="Color" value={color} options={colors} onChange={setColor} />
          {hasFilters && <button className="clear-filters" type="button" onClick={clearFilters}>Clear filters</button>}
        </div>
        <p className="catalog-count" role="status" aria-live="polite">{results.length} {results.length === 1 ? 'piece' : 'pieces'}</p>
      </div>
      <p className="catalog-study-note">Field Study 03 · Collection concepts</p>
      {results.length ? (
        <div className="product-grid">
          {results.map(product => <ProductCard key={product.id} product={product} />)}
        </div>
      ) : (
        <div className="catalog-empty">
          <h2>{collection.length ? 'Nothing in this combination.' : 'The next additions.'}</h2>
          <p>{collection.length ? 'Try another type or color to see more pieces.' : 'Our accessories collection is taking shape.'}</p>
          {collection.length ? (
            <button className="text-link" type="button" onClick={clearFilters}>Clear filters</button>
          ) : (
            <Link className="text-link" href="/clothing">Explore clothing</Link>
          )}
        </div>
      )}
    </>
  );
}
