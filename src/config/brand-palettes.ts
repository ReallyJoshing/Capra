export const defaultBrandColors = { primary: '#6b655b', secondary: '#e1eadf' };

// Each column is a color family; each row moves from light to dark.
const families = [
  { name: 'Bone', shades: ['#f0ece4', '#d9d2c5', '#b6ad9d', '#8e8474', '#6b655b'] },
  { name: 'Stone', shades: ['#efefec', '#d3d4ce', '#a7aaa3', '#757970', '#454a43'] },
  { name: 'Sage', shades: ['#e1eadf', '#c3d0be', '#99af93', '#71896c', '#465e43'] },
  { name: 'Forest', shades: ['#e2e9e3', '#b9c9bf', '#8aa695', '#5d7e6a', '#304d3d'] },
  { name: 'Slate', shades: ['#e4e9ea', '#c3ced0', '#94a9ae', '#687f87', '#3d535d'] },
  { name: 'Ink', shades: ['#e4e8ed', '#bec9d5', '#8d9eaf', '#60738b', '#36485e'] },
  { name: 'Clay', shades: ['#f0e4dc', '#dfc3b1', '#c49d84', '#a2785e', '#755542'] },
  { name: 'Ochre', shades: ['#eee9d8', '#d9cda8', '#bfa96f', '#9b824d', '#6d603b'] },
  { name: 'Rose', shades: ['#eee4e4', '#d9c1c3', '#ba979c', '#956f77', '#694b56'] },
  { name: 'Plum', shades: ['#e9e5eb', '#cec3d4', '#ac99b5', '#846e92', '#5b476a'] },
];

export const brandPalette = Array.from({ length: 5 }, (_, row) =>
  families.map(family => ({ name: `${family.name} ${row + 1}`, hex: family.shades[row] }))
).flat();
