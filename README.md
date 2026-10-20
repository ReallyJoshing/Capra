# Capra

Outdoor layers and shared adventure, born in the Washington backcountry. This storefront is published on `feature/landing` in [ReallyJoshing/Capra](https://github.com/ReallyJoshing/Capra/tree/feature/landing).

## Current identity

The latest October 20, 2026 horizontal Capra reference replaces the earlier Odle identity across the homepage, navigation, footer, page titles, browser icon, share metadata, Vision copy and test-checkout display name.

- Original supplied artwork: `public/brand/capra-horn-source.png` (second reference) and `public/brand/capra-lettering-source.png` (first reference), both preserved unchanged. The current mark combines the exact horn and letter shapes through SVG clipping and uniform placement.
- Shared logo: `src/components/capra-logo.tsx`. SVG presentation masks expose independent horn and lettering colors without redrawing either part. Rebuild `capra-logo.svg`, `capra-icon.svg` and the share PNG `capra-reference.png` with `node scripts/build-capra-assets.mjs`. See [artwork sources](docs/brand-artwork.md).
- Typography: self-hosted Archivo sans-serif for all interface text. The rounded logo lettering belongs only in the artwork, as requested. License: `src/app/fonts/Archivo-OFL.txt`.
- Brand styles: `src/app/capra.css`; layout styles: `src/app/globals.css`.
- Defaults: charcoal `#20201e` for both parts on white. `/experimental` changes horn/lettering colors and the homepage background.

The original proposed operating entity, Odle Gear LLC, is retained in the prototype company information. Historic product images can still carry ODLE embroidery; those pixels have not been relabeled as Capra photography. Original image files, product URLs and saved bags remain compatible.

## Run locally

Use Node 20.9 or later:

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:3001. The app uses Next.js App Router, React, TypeScript and Tailwind 4. Fonts and images are hosted with the application.

## Storefront

- `/`: minimal Capra mark with an optional saved landscape background.
- `/clothing` and `/accessories`: 50 Field Study 03 concepts, split into 29 clothing pieces and 21 accessories, with type/color filters.
- `/products/[slug]`: product views, fit direction, five design features and development notes.
- `/vision`: founder statements and real JN archive scenes.
- `/experimental`: brand colors and homepage backgrounds.
- `/cart`, `/checkout/success`, `/policies/[slug]`: prototype commerce and store information.

Concept images are generated studies. Materials, sizing, prices and availability are unconfirmed, and concepts cannot enter checkout. Five earlier prototype products remain available through their existing URLs and saved test bags.

The catalog is in `src/data/field-study-03.json`, with images in `public/images/field-study-03/`. `scripts/import-field-study.py` imports the original sibling `odle-field-study-03/data/design-book.json` and preview images. That source workspace is separate; all data required to run the storefront is checked in here.

See [core vision](docs/core-vision.md), [knowledge base](docs/knowledge-base.md), [JN references](docs/jn-vision-references.md), and [media provenance](docs/vision-media-sources.json).

## Verify

```sh
npm test
npm run typecheck
npm run build -- --webpack
```

Tests cover filters, catalog completeness, concept checkout exclusion, legacy product links, prices and cart validation. Check desktop and narrow layouts after visual changes.

## Hosting and test checkout

Existing hosted prototype: https://odle-storefront.vercel.app. The Vercel project remains `joshingnaturepnw-8394s-projects/odle-storefront`; the hosting identifier has not been renamed. Deploy this source with the standard Next.js preset and checked-in webpack build configuration.

Use `.env.example` to configure your own Stripe test environment. Only test credentials are accepted. The original temporary sandbox expires October 22, 2026 unless claimed. Test payments create no physical order or real charge. Local order files are not durable production storage; the hosted prototype records signed paid test events on the Stripe Checkout Session. See [launch readiness](docs/launch-readiness.md) before any live-commerce work.

Credentials, local orders, dependencies, deployment state and generated working artifacts remain excluded from Git. Original Odle lettering assets and scripts are retained only as historical development material.
