# Capra · Odle storefront

Published development snapshot on `feature/landing`. This repository contains the Odle storefront, its product concepts, images, and supporting documentation.

## Product vision

Odle begins in the Washington backcountry, with a vision for capable layers, freedom of movement, and a lifetime of shared adventure. Its core is the feeling of arriving somewhere demanding and being deeply glad the gear you invested in lets you enjoy being there. Material care, considered form, and quality through repeated use should earn a devoted community's trust.

The current references are the [core vision](docs/core-vision.md), [knowledge base](docs/knowledge-base.md), and [JN scenes and founder quotations](docs/jn-vision-references.md). These guide product and website decisions; performance remains an ambition until verified for each garment.

The **Vision** tab opens `/vision`, an editorial page pairing founder lines with five original JN archive scenes. The page retains the existing typography and visual identity. The environment-based shop concept is recorded for future development; it is not implemented by the Vision page.

## Current storefront

A minimal Next.js starting page with a centered, oversized Odle wordmark in dark bone-greige (`#6b655b`) with pale sage (`#e1eadf`) centerlines and a nested four-point star inside the O, on a plain white canvas.

A liquid-glass-inspired floating header reuses the O as its home mark. All corners are rounded, with a 12px inset from the top and sides (8px on narrow screens). Layered translucent highlights, rounded glass edges, background blur, and a soft shadow give the header and dropdowns a glass finish. Reduced-transparency preferences and browsers without backdrop filtering receive a solid surface. Clothing and Accessories link directly to `/clothing` and `/accessories`; hover menus provide collection shortcuts, also accessible with Arrow Down. Navigation uses locally hosted Archivo at regular weight and normal width, with restrained uppercase letter spacing. On narrow screens, navigation moves into its own centered row.

The active catalog is **Field Study 03**: 50 collection concepts, split into 29 clothing pieces and 21 accessories. Each has the approved design image, palette color, fit direction and five design features. Type and color filters combine, with live result counts and collection shortcuts in the header. The images are unchanged previews from the completed study; they show generated concepts, not manufactured products. Pricing and availability remain unset, so these concepts cannot be added to checkout. Earlier prototype product URLs and saved test bags remain supported.

The import source is the sibling `odle-field-study-03/data/design-book.json` plus its `previews/` folder. Run `python3 scripts/import-field-study.py` to refresh `src/data/field-study-03.json` and `public/images/field-study-03/` from that source. The import preserves all 50 designs and all 250 features. That original design-study workspace is not included in this repository; the checked-in data and images are sufficient to run the storefront.

## Work locally

Use Node 20.9 or later. Run `npm ci`, then `npm run dev` and open http://127.0.0.1:3001.

- Homepage: `src/app/page.tsx`
- Page styling: `src/app/globals.css`
- Document layout and metadata: `src/app/layout.tsx`
- Wordmark component: `src/components/odle-wordmark.tsx`
- Header component: `src/components/site-header.tsx`
- Menu labels and destinations: `src/config/navigation.ts`
- Vision page: `src/app/vision/page.tsx`
- Vision images and provenance: `public/images/vision/`, `docs/vision-media-sources.json`
- Product data: `src/data/products.ts`, `src/data/field-study-03.json`
- Catalog interface and filters: `src/components/product-catalog.tsx`, `src/lib/catalog.mjs`
- Product images: `public/images/field-study-03/` (current collection), `public/images/products/` (earlier prototypes)
- Letter outlines and centerlines: `src/assets/odle-wordmark.json`
- Typeface: Archivo by Omnibus-Type at weight 460 and width 115, exported as vector paths

Active font source: https://github.com/Omnibus-Type/Archivo. License: SIL Open Font License 1.1, included in `src/app/fonts/Archivo-OFL.txt`. The weight is a visual approximation of the requested modest thickening; numeric font weights do not measure stroke thickness across different typefaces. The lettering uses a dark bone-greige fill with thin pale sage centerlines. A fuller greige four-point star forms the base with a slimmer pointed pale sage star inlaid in the O counter; the header monogram uses the same shapes and palette. The O/D centerlines balance the distance to the inner and outer contours; L/E lines follow the midpoint of each straight stroke. The main wordmark inline width stays at 4 screen pixels across viewport sizes, with rounded ends; the header monogram uses 1.5 pixels to balance its smaller scale. Its width is 58.5 pixels on desktop and 49.5 pixels on narrow screens, 1.5 times the original mark. High-contrast mode uses solid system-colored lettering.

Earlier Panchang font files are retained for design comparison. Source: https://www.fontshare.com/fonts/panchang. License: ITF Free Font License, https://www.fontshare.com/licenses/itf-ffl.

The previous annotated storefront is preserved on the original local `release` branch. Its components and configuration are retained here but are not rendered by the homepage.

## Regenerate lettering

The application uses the checked-in vector paths and needs no font-processing runtime. To regenerate after changing the typeface settings, install `fonttools` in an isolated Python environment and run `python scripts/generate-wordmark.py`. Straight L/E centerlines are tuned to the current font settings and must be updated if those change. The generator validates O/D centerline spacing against both contours.

## Verify

Run `npm test`, `npm run typecheck`, and `npm run build`. If Turbopack is unavailable in the local sandbox, use `npm run build -- --webpack`. Filter tests cover combined filters, category isolation, reset, empty results, and immutable input.

## Vercel

This is a standard Next.js project. Use the Next.js framework preset, the repository root as the root directory, and the default build/output settings. No environment variables are required for the current page.

The existing hosted prototype is linked to Vercel; see Hosted prototype below. Keep `.vercel/` and credentials out of source control. Search indexing remains disabled in the page metadata.

## Experimental color lab

`/experimental` previews the existing ODLE title and header logo with two independent 50-color grids. Primary changes the lettering and outer star; secondary changes the inset lines and inner star. Selections apply to every live O / ODLE SVG across the app, persist in this browser, and sync across same-origin tabs. Embedded marks in product photographs are static image pixels. Arrow keys navigate the grids, selected hex values are displayed, and Reset restores the brand colors. Palette: `src/config/brand-palettes.ts`; interface: `src/components/brand-color-lab.tsx`.

Catalog introductions are hidden visually. Type and Color filters use glass bubbles with hover dropdowns, click/touch toggles, keyboard controls, and Escape dismissal.

Glass surfaces use directional edge highlights, restrained translucent fills, and backdrop blur. Product captions overlap the photograph by 32px. This is a CSS approximation informed by Apple’s material guidance (https://developer.apple.com/design/human-interface-guidelines/materials) and MDN backdrop-filter documentation (https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/backdrop-filter), not native Apple Liquid Glass. Technical pants front photography uses an AI-assisted background replacement; detail photography is the supplied original.

Catalog layout uses four columns at 1024px and above, and two below. Header glass and the small “dle” suffix reveal on hover or keyboard focus. Clothing front images use AI-assisted ODLE monogram edits saved as separate `-odle.png` assets, with originals retained. Alternate views reveal on hover; tap/keyboard activation cycles photos without visible view buttons.

Product cards open a native modal viewer with full-source photos and a click-toggle 2.5× rounded-square magnifier. Pointer movement, touch dragging and arrow keys move the lens; a second click or Escape disables it. Photo dots reflect hover views and select images. Card colors use bordered swatches with accessible names. Accessory wordmarks are ODLE edits; the sweater reverse is a generated concept, labeled in the viewer. Header glass now strictly follows hover, even when a navigation link retains focus.

Development preview: `npm run dev` uses Next.js development mode on port 3001 with Fast Refresh. Use `next start` only for production checks, not iterative design work. Experimental includes a homepage background picker: six distinct supplied images plus plain white; duplicate attachments are consolidated. Selection persists locally and syncs across same-origin tabs, not across users.

## Commerce prototype

Run `npm run dev` for React Fast Refresh at http://127.0.0.1:3001. Product cards lead to `/products/[slug]`; the bag is at `/cart`. Prices, sizes and sample specifications live in `src/data/commerce.ts`.

Checkout uses an isolated Stripe sandbox, with secrets in ignored `.env.local`. Only test keys are accepted. Test with card **4242 4242 4242 4242**, any future expiration, any three-digit CVC, and fictitious test contact/address information. No physical goods ship. The original temporary sandbox expires **October 22, 2026** unless claimed. Configure your own Stripe test environment using `.env.example`; credentials are not included.

The webhook listener must remain running during local testing:

```sh
npx stripe listen --events checkout.session.completed,checkout.session.async_payment_succeeded,checkout.session.async_payment_failed --forward-to http://127.0.0.1:3001/api/stripe/webhook
```

Set the listener's signing secret as `STRIPE_WEBHOOK_SECRET` in `.env.local`. Never commit it. Use `.env.example` as the configuration template. On deployment, set `APP_URL` to the exact trusted origin and configure an HTTPS webhook. Local paid-order records are test-only and must be replaced by durable storage before production.

See [launch readiness](docs/launch-readiness.md) for researched legal/operational requirements and unresolved launch gates. This prototype is not certified compliant or ready for live sales.

## Hosted prototype

Public URL: https://odle-storefront.vercel.app

Vercel project: `joshingnaturepnw-8394s-projects/odle-storefront`. Deploy the current checkout with `vercel deploy --prod` from this folder. Deployment uses the checked-in webpack build setting. The production Vercel environment still uses **Stripe test credentials**; production hosting does not enable real charges. Checkout derives the trusted public origin from Vercel's production-domain environment variable.

On Vercel, signed paid test events are marked on the Stripe Checkout Session (`prototype_payment_recorded`) rather than written to the read-only deployment filesystem. Stripe remains the prototype payment record; a real order/stock/fulfillment database is still required before live retail. The local listener and local test-order files remain available for local development.
