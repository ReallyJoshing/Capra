/**
 * @template {{ category: string, type: string, color: string, colorways?: { name: string }[] }} T
 * @param {readonly T[]} products
 * @param {string} category
 * @param {{ type?: string, color?: string }} filters
 * @returns {T[]}
 */
export function filterProducts(products, category, filters) {
  return products.filter(product =>
    product.category === category &&
    (!filters.type || product.type === filters.type) &&
    (!filters.color || product.color === filters.color || product.colorways?.some(colorway => colorway.name === filters.color))
  );
}
