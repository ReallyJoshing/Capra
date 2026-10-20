export const annotations = {
  header: {
    label: 'Header',
    purpose: 'Your identity and the main ways to move around the store.',
    change: 'Change the name to see it update in the header and footer.',
    file: 'src/config/storefront.ts', field: 'storefront.name', layout: 'src/components/storefront.tsx',
  },
  hero: {
    label: 'Hero',
    purpose: 'The first thing a visitor sees: a headline, a visual, and a next step.',
    change: 'Replace the headline and introduction; add a campaign image to set the mood.',
    file: 'src/config/storefront.ts', field: 'storefront.hero', layout: 'src/components/hero.tsx',
  },
  collection: {
    label: 'Product collection',
    purpose: 'The space where visitors will browse your products.',
    change: 'These are empty product slots. Real photos, names, and prices will turn them into a collection.',
    file: 'src/config/storefront.ts', field: 'storefront.collection', layout: 'src/components/collection.tsx',
  },
  story: {
    label: 'Brand story',
    purpose: 'A little more context for visitors who want to know the brand.',
    change: 'Replace this text to tell your story, or remove the section if you want a shorter page.',
    file: 'src/config/storefront.ts', field: 'storefront.story', layout: 'src/components/story.tsx',
  },
  footer: {
    label: 'Footer',
    purpose: 'A place for supporting information at the end of the page.',
    change: 'Add contact, delivery, and returns links when those details are ready.',
    file: 'src/config/storefront.ts', field: 'storefront.footer', layout: 'src/components/storefront.tsx',
  },
} as const;
export type SectionId = keyof typeof annotations;
