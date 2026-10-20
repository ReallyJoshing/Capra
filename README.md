# Capra — Greatness, through time

**Independent homepage design: `capra-jc-2`.** The earlier design remains on `capra-jc-1`; `main` remains a separate baseline. This homepage was composed from scratch around the supplied sketch and Known.com’s minimal film-led presentation.

## Homepage

A small film frame on a black canvas expands to fill the screen. A quiet, centered statement appears over the film, with white sketch branding and restrained navigation. **Watch the film** or **Feel it** switches to unobstructed viewing; **Back to Capra** or Escape returns to the statement. Pause/play and reduced-motion behavior are built in.

The 13.5-second film has **27 hard cuts at 0.5 seconds per shot**, ordered chronologically from 1924 to 2020. Real archival Olympic moments, Jesse Owens, Joseph Kittinger, Tokyo medal celebrations and a 1984 spacewalk give way to modern footage of Hannah Teter, Chris Sharma, Ashima Shiraishi, Janja Garnbret, wingsuit flight, giant surf and championship celebrations. The source texture progresses naturally across eras; modern footage has not been made artificially old.

Full provenance, exact edit ranges and source licenses are in [video sources](docs/video-sources.md) and the [edit manifest](docs/decades-film-edit.json). The film is distributed under CC BY-SA 4.0, with a visible credits dialog and download. The athletes shown are not affiliated with Capra.

The homepage has its own component and scoped CSS. Existing catalog and Vision routes remain available at their URLs but do not determine the homepage’s visual design. Product context remains documented in the [core vision](docs/core-vision.md) and [knowledge base](docs/knowledge-base.md).

## Compare versions

Open each branch in its own worktree and run a different port. This version uses `npm run dev -- --port 3002` at **http://localhost:3002**. Keep the versions separate until one is explicitly selected for release. A normal branch diff compares their source snapshots:

```sh
git diff capra-jc-1..capra-jc-2
```

## Work locally

Use Node 20.9 or later. Run `npm ci`, then `npm run dev -- --port 3002` and open http://localhost:3002.

- Homepage: `src/app/page.tsx`
- Homepage component: `src/components/decades-home.tsx`
- Active sketch: `public/images/brand/capra-sketch.png`
- Film and poster: `public/videos/greatness-through-time.mp4`, `public/videos/greatness-poster.jpg`
- Homepage styling: `src/components/decades-home.module.css` (independent of shared route styles)
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

See Hosting below for deployment configuration. The `capra-jc-2` redesign is a branch for review and is not described here as a production deployment. Keep `.vercel/` and credentials out of source control. Search indexing remains disabled in the page metadata.

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
