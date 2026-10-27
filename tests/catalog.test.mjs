import assert from 'node:assert/strict';
import test from 'node:test';
import { filterProducts } from '../src/lib/catalog.mjs';

const products = [
  { id: 'sweater', category: 'clothing', type: 'Sweaters', color: 'Charcoal' },
  { id: 'pants', category: 'clothing', type: 'Pants', color: 'Indigo' },
  { id: 'cap', category: 'accessories', type: 'Headwear', color: 'Indigo' },
];

test('category boundaries are respected even with the same color', () => {
  assert.deepEqual(filterProducts(products, 'clothing', { color: 'Indigo' }).map(p => p.id), ['pants']);
});

test('type and color combine instead of matching either filter', () => {
  assert.deepEqual(filterProducts(products, 'clothing', { type: 'Sweaters', color: 'Indigo' }), []);
  assert.deepEqual(filterProducts(products, 'clothing', { type: 'Pants', color: 'Indigo' }).map(p => p.id), ['pants']);
});

test('clearing filters restores the category without changing source data', () => {
  const frozen = Object.freeze(products.map(product => Object.freeze({ ...product })));
  filterProducts(frozen, 'clothing', { type: 'Pants' });
  assert.deepEqual(filterProducts(frozen, 'clothing', {}).map(p => p.id), ['sweater', 'pants']);
});

test('an empty collection and unmatched filters return an empty grid', () => {
  assert.deepEqual(filterProducts([], 'accessories', {}), []);
  assert.deepEqual(filterProducts(products, 'clothing', { type: 'Unknown' }), []);
});

test('alternate colorways are discoverable without duplicating a product or crossing categories', () => {
  const catalog = [
    { id: 'fleece', category: 'clothing', type: 'Fleece', color: 'Stone grey', colorways: [{ name: 'Stone grey / Ivory' }, { name: 'Mist / Graphite' }] },
    { id: 'hat', category: 'accessories', type: 'Headwear', color: 'Mist / Graphite' },
  ];
  assert.deepEqual(filterProducts(catalog, 'clothing', { color: 'Mist / Graphite' }).map(p => p.id), ['fleece']);
  assert.deepEqual(filterProducts(catalog, 'clothing', { type: 'Pants', color: 'Mist / Graphite' }), []);
  assert.deepEqual(filterProducts(catalog, 'clothing', { color: 'Stone grey' }).map(p => p.id), ['fleece']);
});
