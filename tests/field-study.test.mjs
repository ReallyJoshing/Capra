import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';
import { validateCart } from '../src/lib/cart-validation.mjs';

// Compile the actual data modules so this suite also runs on supported Node 20.
function loadData(path) {
  const url = new URL(path, import.meta.url);
  const source = ts.transpileModule(readFileSync(url, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true },
  }).outputText;
  const module = {exports: {}};
  runInNewContext(source, {module, exports: module.exports, require: createRequire(url)});
  return module.exports;
}
const { products, allProducts, legacyProducts } = loadData('../src/data/products.ts');
const { productDetails } = loadData('../src/data/commerce.ts');

test('the storefront carries every Field Study 03 design exactly once', () => {
  assert.equal(products.length, 50);
  assert.equal(new Set(products.map(product => product.id)).size, 50);
  assert.deepEqual(products.map(product => product.concept.code).sort(), Array.from({length: 50}, (_, i) => String(i + 1).padStart(2, '0')));
  assert.equal(products.filter(product => product.category === 'clothing').length, 29);
  assert.equal(products.filter(product => product.category === 'accessories').length, 21);
  for (const product of products) {
    assert.equal(product.concept.features.length, 5, product.name);
    assert.ok(product.concept.description.length > 100, product.name);
    assert.ok(product.concept.fit, product.name);
    for (const image of product.images) assert.ok(existsSync(new URL(`../public${image.src}`, import.meta.url)), image.src);
  }
});

test('earlier prototype product links and saved bags still resolve', () => {
  for (const product of legacyProducts) {
    assert.ok(allProducts.find(item => item.id === product.id));
    assert.doesNotThrow(() => validateCart([{id: product.id, size: productDetails[product.id].sizes[0], quantity: 1}], productDetails));
  }
});

test('concepts have no invented prices and cannot enter test checkout', () => {
  for (const product of products) {
    assert.equal(productDetails[product.id], undefined);
    assert.throws(() => validateCart([{id: product.id, size: 'M', quantity: 1}], productDetails));
  }
});
