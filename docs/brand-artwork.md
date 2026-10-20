# Capra artwork sources

Updated October 20, 2026.

The user requested a specific blend: the exact horn from their second image, and the “apra” lettering from their first. The second image also governs the proportions and placement. Earlier requests to enlarge or restyle the horn are superseded by this exact reference selection.

- `public/brand/capra-horn-source.png`: the second supplied image, 1089 × 541, preserved unchanged. Its original lettering is excluded by an SVG clip path; a presentation mask makes the white background transparent.
- `public/brand/capra-lettering-source.png`: the first supplied image, 1983 × 793, preserved unchanged, including its alpha channel. Its C is excluded; “apra” is uniformly scaled by 0.475 and positioned at the corresponding location in the second image.
- `src/components/capra-logo.tsx`: the shared live composition and independent color controls. No letter or horn contours are redrawn.
- `public/brand/capra-logo.svg`: standalone transparent composition with embedded source assets.
- `public/brand/capra-icon.svg`: the exact selected horn only, with a transparent background and theme-aware foreground.
- `public/brand/capra-reference.png`: transparent PNG export for sharing.

Run `node scripts/build-capra-assets.mjs` to rebuild the standalone assets. This uses the same clipping and placement as the live component and Sharp, installed with Next.js, for the PNG export. Keep geometry changes synchronized with `CapraLogo`.

Site text remains Archivo sans-serif. These logo updates add no customer-facing explanation or instruction text.
