export function validateCart(items, catalog) {
  if (!Array.isArray(items) || !items.length || items.length > 30) throw new Error('Your bag must contain between 1 and 30 items.');
  const merged = new Map();
  for (const item of items) {
    const product = catalog[item?.id];
    if (!product || !product.sizes.includes(item.size) || !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 10) throw new Error('An item, size or quantity in your bag is invalid.');
    const key = `${item.id}:${item.size}`;
    const quantity = (merged.get(key)?.quantity || 0) + item.quantity;
    if (quantity > 10) throw new Error('Maximum 10 of each size per order.');
    merged.set(key, { id: item.id, size: item.size, quantity, unitAmount: product.price });
  }
  return [...merged.values()];
}
export function shippingAmount(subtotal) { return subtotal >= 15000 ? 0 : 800; }
