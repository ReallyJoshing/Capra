# Odle clean starting page

Publication: this snapshot is shared at `ReallyJoshing/Capra` on `feature/landing`. The branch names in the local development notes below refer to the original source checkout.

The active experiment is `feat/clean-start`; `release` preserves the earlier annotated storefront.

- Read `docs/core-vision.md` and `docs/knowledge-base.md` before changing product direction, brand copy, imagery, or the shopping experience. The current vision centers on feeling at home outdoors, shared effort, comfort at the destination, and trust earned through use.
- The Vision tab at `/vision` pairs founder statements with real JN archive scenes. Source details live in `docs/jn-vision-references.md` and `docs/vision-media-sources.json`. Do not present these images as Odle performance tests or the founder's quotes as video transcripts.
- Environment-based shopping with selectable garments is a documented future direction. Preserve the existing homepage until that experience is explicitly requested.

- Keep the homepage minimal until the user requests a visual direction or features.
- Homepage: `src/app/page.tsx`. Styling: `src/app/globals.css`. Metadata: `src/app/layout.tsx`.
- Wordmark: `src/components/odle-wordmark.tsx`; geometry: `src/assets/odle-wordmark.json`; generator: `scripts/generate-wordmark.py`. The Archivo settings are baked into these vector paths.
- Shared header: `src/components/site-header.tsx`. Collection routes: `/clothing` and `/accessories`. Product data: `src/data/products.ts`; filters: `src/lib/catalog.mjs`.
- Keep the Archivo wordmark geometry and navigation typography on a plain white homepage. The wordmark uses dark bone-greige with pale sage inlays and nested four-point stars inside the O, shared by the header monogram. The experimental serif wordmark and landscape background were reverted.
- The active catalog is Field Study 03: 50 concepts in `src/data/field-study-03.json`, imported with `scripts/import-field-study.py`. Images are unchanged generated study previews in `public/images/field-study-03/`. Keep five features per design. Concepts have no price, sizes or purchase controls. The earlier five prototype items remain in `legacyProducts` for existing URLs and saved test bags; `allProducts` resolves both sets. Do not imply verified inventory or manufacturing facts.
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
