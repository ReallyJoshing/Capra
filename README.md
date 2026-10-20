# Capra storefront

Development branch `capra-jc-1`, based on `feature/landing`. This repository contains the Capra storefront, its product concepts, images, and supporting documentation.

## Product vision

Capra begins in the Washington backcountry, with a vision for capable layers, freedom of movement, and a lifetime of shared adventure. Its core is the feeling of arriving somewhere demanding and being deeply glad the gear you invested in lets you enjoy being there. Material care, considered form, and quality through repeated use should earn a devoted community's trust.

The current references are the [core vision](docs/core-vision.md), [knowledge base](docs/knowledge-base.md), and [JN scenes and founder quotations](docs/jn-vision-references.md). These guide product and website decisions; performance remains an ambition until verified for each garment.

The **Vision** tab opens `/vision`, an editorial page pairing founder lines with five original JN archive scenes. The environment-based shop concept is recorded for future development; it is not implemented by the Vision page or homepage film.

## Current storefront

The homepage leads with the supplied hand-drawn mountain goat and CAPRA sketch. A short, silent montage moves through climbing, snowboarding, a hockey trophy lift, mountain bike jumps, a soccer medal celebration, cliff diving, and surfing. It starts in a small frame and expands across the viewport over about 6.5 seconds. It loops with a pause/play control; reduced-motion visitors see a still poster from the surf sequence. Opening copy centers on making the day you imagined real, and links lead to the Vision page and collection. The footage is illustrative stock, not Capra product testing or founder-trip documentation. Its sources and usage notes are in [video sources](docs/video-sources.md).

The floating header uses the sketch as its home mark. Clothing and Accessories link directly to `/clothing` and `/accessories`; hover menus provide collection shortcuts, also accessible with Arrow Down. Navigation uses locally hosted Archivo with restrained uppercase letter spacing. On narrow screens, navigation moves into its own centered row.

The active catalog is **Field Study 03**: 50 collection concepts, split into 29 clothing pieces and 21 accessories. Each has a design image, palette color, fit direction and five design features. Type and color filters combine, with live result counts and collection shortcuts in the header. The images show generated concepts, not manufactured products. Four previews have edited CAPRA headings: `hearth-beanie`, `trail-belt`, `ridgeline-cap`, and `talus-work-trouser`; the other study previews remain unchanged. Pricing and availability remain unset, so these concepts cannot be added to checkout. Earlier prototype product URLs and saved test bags remain supported.

The default import source is the sibling `capra-field-study-03/data/design-book.json` plus its `previews/` folder. Run `python3 scripts/import-field-study.py` to refresh `src/data/field-study-03.json` and `public/images/field-study-03/` from that source. If the study lives elsewhere, set `FIELD_STUDY_SOURCE=/path/to/study` for the command. The import preserves all 50 designs, all 250 features, and the four curated CAPRA previews using the Capra-branded source data. The original design-study workspace is not included in this repository; the checked-in data and images are sufficient to run the storefront.

## Work locally

Use Node 20.9 or later. Run `npm ci`, then `npm run dev` and open http://127.0.0.1:3001.

- Homepage: `src/app/page.tsx`
- Homepage film component: `src/components/capra-hero.tsx`
- Active sketch: `public/images/brand/capra-sketch.png`
- Film and poster: `public/videos/capra-reel.mp4`, `public/videos/capra-reel-poster.jpg`
- Page styling: `src/app/globals.css`
- Document layout and metadata: `src/app/layout.tsx`
- Header component: `src/components/site-header.tsx`
- Menu labels and destinations: `src/config/navigation.ts`
- Vision page: `src/app/vision/page.tsx`
- Vision images and provenance: `public/images/vision/`, `docs/vision-media-sources.json`
- Product data: `src/data/products.ts`, `src/data/field-study-03.json`
- Catalog interface and filters: `src/components/product-catalog.tsx`, `src/lib/catalog.mjs`
- Product images: `public/images/field-study-03/` (current collection), `public/images/products/` (earlier prototypes)
- Retained vector mark: `src/components/capra-wordmark.tsx`, `src/assets/capra-wordmark.json`
- Navigation typeface: Archivo by Omnibus-Type

Archivo source: https://github.com/Omnibus-Type/Archivo. License: SIL Open Font License 1.1, included in `src/app/fonts/Archivo-OFL.txt`. The previous vector CAPRA wordmark was drawn from Archivo at weight 460 and width 115, with greige outlines, pale sage centerlines, and nested four-point stars in the C. It is retained in source but the hand-drawn sketch is the active homepage and header mark.

Earlier Panchang font files are retained for design comparison. Source: https://www.fontshare.com/fonts/panchang. License: ITF Free Font License, https://www.fontshare.com/licenses/itf-ffl.

The previous annotated storefront is preserved on the original local `release` branch. Its components and configuration are retained here but are not rendered by the homepage.

## Retained vector lettering

The checked-in vector paths need no font-processing runtime. To regenerate them for reference after changing the typeface settings, install `fonttools` in an isolated Python environment and run `python scripts/generate-wordmark.py`. The generated paths do not replace the supplied sketch image.

## Verify

Run `npm test`, `npm run typecheck`, and `npm run build`. If Turbopack is unavailable in the local sandbox, use `npm run build -- --webpack`. Filter tests cover combined filters, category isolation, reset, empty results, and immutable input.

## Vercel

This is a standard Next.js project. Use the Next.js framework preset, the repository root as the root directory, and the default build/output settings. No environment variables are required for the current page.

See Hosting below for deployment configuration. The `capra-jc-1` redesign is a branch for review and is not described here as a production deployment. Keep `.vercel/` and credentials out of source control. Search indexing remains disabled in the page metadata.

## Studio and catalog details

`/experimental` is now a simple Studio page displaying the hand-drawn goat and CAPRA sketch. The previous vector color lab and homepage background picker remain in source for reference; neither appears on the current Studio page or homepage.

Catalog introductions are hidden visually. Type and Color filters use glass bubbles with hover dropdowns, click/touch toggles, keyboard controls, and Escape dismissal.

Glass surfaces use directional edge highlights, restrained translucent fills, and backdrop blur. Product captions overlap the photograph by 32px. This is a CSS approximation informed by Apple’s material guidance (https://developer.apple.com/design/human-interface-guidelines/materials) and MDN backdrop-filter documentation (https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/backdrop-filter), not native Apple Liquid Glass. Technical pants front photography uses an AI-assisted background replacement; detail photography is the supplied original.

Catalog layout uses four columns at 1024px and above, and two below. Alternate views reveal on hover; tap/keyboard activation cycles photos without visible view buttons.

Product cards open a native modal viewer with full-source photos and a click-toggle 2.5× rounded-square magnifier. Pointer movement, touch dragging and arrow keys move the lens; a second click or Escape disables it. Photo dots reflect hover views and select images. Card colors use bordered swatches with accessible names. The sweater reverse is a generated concept, labeled in the viewer.

Development preview: `npm run dev` uses Next.js development mode on port 3001 with Fast Refresh. Use `next start` only for production checks, not iterative design work.

## Commerce prototype

Run `npm run dev` for React Fast Refresh at http://127.0.0.1:3001. Product cards lead to `/products/[slug]`; the bag is at `/cart`. Prices, sizes and sample specifications live in `src/data/commerce.ts`.

Checkout uses an isolated Stripe sandbox, with secrets in ignored `.env.local`. Only test keys are accepted. Test with card **4242 4242 4242 4242**, any future expiration, any three-digit CVC, and fictitious test contact/address information. No physical goods ship. The original temporary sandbox expires **October 22, 2026** unless claimed. Configure your own Stripe test environment using `.env.example`; credentials are not included.

The webhook listener must remain running during local testing:

```sh
npx stripe listen --events checkout.session.completed,checkout.session.async_payment_succeeded,checkout.session.async_payment_failed --forward-to http://127.0.0.1:3001/api/stripe/webhook
```

Set the listener's signing secret as `STRIPE_WEBHOOK_SECRET` in `.env.local`. Never commit it. Use `.env.example` as the configuration template. On deployment, set `APP_URL` to the exact trusted origin and configure an HTTPS webhook. Local paid-order records are test-only and must be replaced by durable storage before production.

See [launch readiness](docs/launch-readiness.md) for researched legal/operational requirements and unresolved launch gates. This prototype is not certified compliant or ready for live sales.

## Hosting

Link this checkout to a Capra-named Vercel project before deploying. Keep hosting project identifiers in ignored local configuration. The prototype uses **Stripe test credentials**; production hosting does not enable real charges. Checkout derives the trusted public origin from Vercel's production-domain environment variable.

On Vercel, signed paid test events are marked on the Stripe Checkout Session (`prototype_payment_recorded`) rather than written to the read-only deployment filesystem. Stripe remains the prototype payment record; a real order/stock/fulfillment database is still required before live retail. The local listener and local test-order files remain available for local development.
