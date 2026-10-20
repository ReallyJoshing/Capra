# Capra sketch and film storefront

Publication: this work is on `capra-jc-1` in `ReallyJoshing/Capra`. `feature/landing` is the parent branch; `release` preserved an earlier annotated storefront in the original source checkout.

- Read `docs/core-vision.md` and `docs/knowledge-base.md` before changing product direction, brand copy, imagery, or the shopping experience. The current vision centers on feeling at home outdoors, shared effort, comfort at the destination, and trust earned through use.
- The Vision tab at `/vision` pairs founder statements with real JN archive scenes. Source details live in `docs/jn-vision-references.md` and `docs/vision-media-sources.json`. Do not present these images as Capra performance tests or the founder's quotes as video transcripts.
- The homepage uses the supplied hand-drawn goat and CAPRA sketch at `public/images/brand/capra-sketch.png`. Its film at `public/videos/capra-reel.mp4` mixes outdoor feats with brief victory and celebration moments. It starts automatically in a small frame and expands across the viewport over about 6.5 seconds. Preserve its pause/play control, still poster, and reduced-motion equivalent. The montage is illustrative stock footage, not Capra product testing, founder-trip footage, or an endorsement by the people shown; see `docs/video-sources.md`.
- Environment-based shopping with selectable garments is a documented future direction. Preserve the sketch-and-film homepage until that experience is explicitly requested.

- Homepage: `src/app/page.tsx`. Styling: `src/app/globals.css`. Metadata: `src/app/layout.tsx`.
- Active brand art: `public/images/brand/capra-sketch.png` on the homepage and shared header; `/experimental` is a simple Studio page showing the sketch. The earlier Archivo vector wordmark remains in `src/components/capra-wordmark.tsx`, `src/assets/capra-wordmark.json`, and `scripts/generate-wordmark.py` for reference, but is no longer the primary site mark or an interactive color lab.
- Homepage film: `public/videos/capra-reel.mp4`, with `public/videos/capra-reel-poster.jpg` as its still. The source and usage notes are in `docs/video-sources.md`.
- Shared header: `src/components/site-header.tsx`. Collection routes: `/clothing` and `/accessories`. Product data: `src/data/products.ts`; filters: `src/lib/catalog.mjs`.
- Keep Archivo navigation typography and the hand-drawn sketch as the active identity. The old mist-forest/background picker and two-color vector lab are retained code, not current homepage or `/experimental` features.
- The active catalog is Field Study 03: 50 concepts in `src/data/field-study-03.json`, imported with `scripts/import-field-study.py`. Images in `public/images/field-study-03/` are generated study previews; four have curated CAPRA heading edits (`hearth-beanie`, `trail-belt`, `ridgeline-cap`, `talus-work-trouser`) that the importer preserves. Keep five features per design. Concepts have no price, sizes or purchase controls. The earlier five prototype items remain in `legacyProducts` for existing URLs and saved test bags; `allProducts` resolves both sets. Do not imply verified inventory or manufacturing facts.
- Existing components and configuration from the previous storefront are retained but not rendered by the homepage.
- Use Next.js App Router, TypeScript, and Tailwind v4 / CSS; preserve Vercel compatibility.
- Add real commerce, customer data collection, or additional features only when requested.
- Run `npm test`, `npm run typecheck`, and `npm run build` before a release checkpoint. Check the page at desktop and narrow widths when browser access is available.
- Keep private conversation details and credentials out of source control.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
