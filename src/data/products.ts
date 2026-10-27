import fieldStudyCatalog from './field-study-03.json' with { type: 'json' };
import v2Catalog from './v2.json' with { type: 'json' };

export type Category = 'clothing' | 'accessories';

export type Product = {
  id: string;
  category: Category;
  collection?: 'v2';
  name: string;
  type: string;
  color: string;
  colorHex: string;
  colorways?: { name: string; colorHex: string; accentHex: string; imageIndex: number }[];
  images: { src: string; alt: string; label: string; lifestyle?: boolean; generated?: boolean }[];
  hoverImageIndex?: number;
  imageClass?: string;
  concept?: {
    code: string;
    kind: string;
    intro: string;
    description: string;
    fit: string;
    validation: string;
    features: { name: string; text: string; sources: string[] }[];
  };
};

// Preview products supplied by the user. Prices, sizing, and inventory are not yet defined.
export const legacyProducts: Product[] = [
  {
    id: 'waffle-sweater',
    category: 'clothing',
    name: 'Waffle-knit sweater',
    type: 'Sweaters',
    color: 'Charcoal',
    colorHex: '#4d4e48',
    imageClass: 'product-image-sweater',
    images: [{
      src: '/images/products/waffle-sweater.png',
      alt: 'Charcoal waffle-knit crewneck sweater with ribbed cuffs',
      label: 'Front',
    }, { src: '/images/products/waffle-sweater-back.png', alt: 'Generated back view of the charcoal waffle-knit sweater', label: 'Back', generated: true }],
  },
  {
    id: 'denim-pants',
    category: 'clothing',
    name: 'Utility denim pants',
    type: 'Pants',
    color: 'Indigo',
    colorHex: '#343d46',
    images: [
      {
        src: '/images/products/denim-pants-front.png',
        alt: 'Front of indigo utility denim pants with a webbing belt and side pockets',
        label: 'Front',
      },
      {
        src: '/images/products/denim-pants-back.png',
        alt: 'Back of indigo utility denim pants showing large patch pockets',
        label: 'Back',
      },
    ],
  },
  {
    id: 'contrast-cap',
    category: 'accessories',
    name: 'Contrast-trim cap',
    type: 'Caps',
    color: 'Black / Bone',
    colorHex: '#363638',
    imageClass: 'product-image-cap',
    images: [
      { src: '/images/products/cap-front-neutral.png', alt: 'Black cap with bone trim and a plain front panel', label: 'Front' },
      { src: '/images/products/cap-back-neutral.png', alt: 'Back of the black cap with an adjustable strap and bone trim', label: 'Back' },
    ],
  },
  {
    id: 'ribbed-beanie',
    category: 'accessories',
    name: 'Ribbed beanie',
    type: 'Beanies',
    color: 'Charcoal',
    colorHex: '#4d4e48',
    imageClass: 'product-image-beanie',
    images: [{ src: '/images/products/ribbed-beanie-neutral.png', alt: 'Charcoal and grey ribbed cuffed beanie with a plain fold', label: 'Front' }],
  },
  {
    id: 'technical-pants',
    category: 'clothing',
    name: 'Technical utility pants',
    type: 'Pants',
    color: 'Black',
    colorHex: '#292d34',
    imageClass: 'product-image-technical',
    hoverImageIndex: 2,
    images: [
      { src: '/images/products/technical-pants-front.png', alt: 'Dark technical utility pants with an integrated belt and zip pockets', label: 'Front' },
      { src: '/images/products/technical-pants-detail.png', alt: 'Close view of the technical pants adjustable drawcord hem', label: 'Detail' },
      { src: '/images/products/technical-pants-lifestyle.png', alt: 'Lifestyle view of pants worn on lakeside rocks with mountains in the distance', label: 'Lifestyle', lifestyle: true },
    ],
  },
];

export const products = fieldStudyCatalog as Product[];
export const v2Products = v2Catalog as Product[];
// Keep earlier prototype links and saved bags working after the catalog changes.
export const allProducts: Product[] = [...products, ...v2Products, ...legacyProducts];
