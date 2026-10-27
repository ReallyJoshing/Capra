'use client';

import type { Product } from '@/data/products';

export function ColorwaySwatches({ product, selected, onSelect }: {
  product: Product; selected: number; onSelect: (index: number) => void;
}) {
  if (!product.colorways) return null;
  return <div className="colorway-swatches" role="group" aria-label={`${product.name} colorways`}>
    {product.colorways.map(colorway => <button
      key={colorway.name} type="button" title={colorway.name}
      aria-label={colorway.name} aria-pressed={selected === colorway.imageIndex}
      onClick={() => onSelect(colorway.imageIndex)}
    >
      <span aria-hidden="true" style={{ background: `linear-gradient(135deg, ${colorway.colorHex} 0 65%, ${colorway.accentHex} 65% 100%)` }} />
    </button>)}
  </div>;
}
