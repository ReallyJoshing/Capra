export const commerce = {
  mode: 'prototype' as const,
  businessName: 'Capra',
  addressLine: '1 South Market St, Apt 1717',
  shippingCents: 800,
  freeShippingCents: 15000,
  currency: 'usd',
};
export type ProductDetails = { price: number; sizes: string[]; description: string; material: string; care: string; fit: string };
export const productDetails: Record<string, ProductDetails> = {
  'waffle-sweater': { price: 9800, sizes: ['XS','S','M','L','XL'], description: 'A textured crewneck with an easy silhouette, raglan sleeves and ribbed cuffs. An everyday layer for cooler mornings.', material: '100% cotton', care: 'Machine wash cold with like colors. Reshape and lay flat to dry.', fit: 'Relaxed fit. Select your usual size for an easy silhouette.' },
  'denim-pants': { price: 12800, sizes: ['28','30','32','34','36'], description: 'Straight-leg utility denim with generous patch pockets and an integrated webbing belt.', material: '100% cotton denim', care: 'Wash inside out in cold water with similar colors. Line dry.', fit: 'Relaxed straight leg. Sizes shown in nominal waist inches.' },
  'technical-pants': { price: 14800, sizes: ['S','M','L','XL'], description: 'Lightweight utility trousers with zip pockets, an integrated belt and adjustable hems.', material: '100% nylon', care: 'Machine wash cold on gentle cycle. Line dry. Do not iron trims.', fit: 'Relaxed fit with an adjustable waist and hem.' },
  'contrast-cap': { price: 3800, sizes: ['One size'], description: 'A low-profile cap with contrast edging and an adjustable strap.', material: '100% nylon shell', care: 'Spot clean gently with cold water. Air dry.', fit: 'Adjustable back strap. One size.' },
  'ribbed-beanie': { price: 3200, sizes: ['One size'], description: 'A textured rib-knit beanie with a folded cuff.', material: '100% acrylic', care: 'Hand wash cold. Reshape and dry flat.', fit: 'Stretch rib knit. One size.' },
};
export const money = (cents: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(cents / 100);
