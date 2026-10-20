export const navigation = [
  {
    id: 'clothing',
    label: 'Clothing',
    href: '/clothing',
    items: [
      { label: 'All clothing', href: '/clothing' },
      { label: 'Jackets', href: '/clothing?type=Jackets' },
      { label: 'Fleece & knits', href: '/clothing?type=Fleece%20%26%20knits' },
      { label: 'Hoodies', href: '/clothing?type=Hoodies' },
      { label: 'Pants', href: '/clothing?type=Pants' },
    ],
  },
  {
    id: 'accessories',
    label: 'Accessories',
    href: '/accessories',
    items: [
      { label: 'All accessories', href: '/accessories' },
      { label: 'Headwear', href: '/accessories?type=Headwear' },
      { label: 'Gloves & mitts', href: '/accessories?type=Gloves%20%26%20mitts' },
      { label: 'Belts & suspenders', href: '/accessories?type=Belts%20%26%20suspenders' },
    ],
  },
  {
    id: 'vision',
    label: 'Vision',
    href: '/vision',
    items: [],
  },
];
