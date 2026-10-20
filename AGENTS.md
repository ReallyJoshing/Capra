# Capra — Greatness, through time

Current design branch: `capra-jc-1` in `ReallyJoshing/Capra`. Improve this design on this branch. Do not create a new branch for an iteration unless the user explicitly requests one. `main` is the repository baseline; do not merge this design to main without an explicit request.

## Homepage direction

The user explicitly requested an independent composition using Known.com as the homepage reference. Do not derive this homepage’s design from the earlier storefront. It has its own CSS module, header, footer, copy, and film controls.

- Homepage: `src/app/page.tsx` and `src/components/decades-home.tsx`.
- Isolated styles: `src/components/decades-home.module.css`.
- Supplied sketch: `public/images/brand/capra-sketch-transparent.png`, a genuine RGBA cutout displayed with white strokes. Keep the original paper sketch as the source asset. Never use a rectangular background or blend-mode workaround for the active mark.
- Browser icon: `src/app/icon.svg` uses only the goat from the supplied sketch, with transparent surroundings and ink that adapts to light/dark browser themes.
- Film: `public/videos/greatness-through-time.mp4` — 35 chronological half-second shots spanning 1924–2026, 17.5 seconds, silent, 1080p/30fps. It begins in a small centered rectangle and grows to fill the viewport over 7.5 seconds. Actual historical sources provide the progression from archival black-and-white to modern digital footage.
- Keep new footage focused on outdoor achievement: climbing, summit expeditions, highlining, surf, snow sports, and flight. Football and BMX clips have been removed. Preserve the verified source identity and event year of every clip; do not label another climb as a requested athlete or documentary.
- Preserve pause/play, a reduced-motion still, keyboard access, and visible source credits. Home and film are one experience: do not reintroduce a separate cinema mode or a back-to-film/home toggle. Sources and adaptation licenses are in `docs/video-sources.md` and `docs/decades-film-edit.json`; visible credit data is in `src/data/decades-film.json`.
- The edited film is CC BY-SA 4.0; source attribution and a downloadable film are required. Athlete imagery does not imply a Capra endorsement or product test.
- `src/components/site-chrome.tsx` gives interior routes shared chrome. Every route uses the same direct navigation from `src/components/site-actions.tsx`: Clothing, Accessories, Our story, Studio, Bag. Keep navigation visible on mobile too; the user rejected a hidden menu.
- Use Capra throughout source, docs, assets, package metadata and storage keys. Do not retain old-name compatibility fallbacks.

## Site-wide presentation

- Match the approved homepage: near-black `#090909`, warm white `#f4f2ea`, Helvetica Neue/Helvetica/Arial, regular weights and generous space. Muted text is for metadata and captions, not inconsistent navigation brightness.
- Interior layouts are in `src/app/globals.css`; the homepage retains its CSS module.
- The homepage CTA is **Explore**, links to `/clothing`, and has a 12px text-to-arrow gap. Keep button labels short and arrow gaps compact. The closing “This is Capra” line uses the actual handwritten CAPRA lettering from the transparent sketch, clipped through an SVG viewport.
- The frame expansion, copy reveal and dark-overlay fade finish independently with CSS animation fill. Do not force their final states at frame completion: that interrupts the longer overlay fade and causes a visible brightness jump.
- All homepage navigation links, including Explore and Bag, use the same short fade into the destination. The keyed React ViewTransition in SiteChrome follows the actual route commit; respect reduced motion and preserve ordinary navigation in browsers without support.
- Clothing, Accessories, product details, Our story, Studio, Bag, policy pages and 404 share the same styling.
- Studio expresses **Free-spirited by nature**, with three principles: independence (find your own way), resolve (one foothold at a time), and resourcefulness (at home on hard ground). These interpret the goat’s curiosity, climbing and adaptation as brand values; they are not garment performance claims.
- The large Studio illustration shows only the goat, without CAPRA lettering. Its SVG viewport clips the original transparent sketch while preserving the rear hoof.

## Shared application

Read `docs/core-vision.md` and `docs/knowledge-base.md` for product work. The homepage’s new creative brief takes precedence over older homepage presentation guidance in those documents.

The catalog is Field Study 03: 50 generated concepts with five features each. Keep catalog facts and prototype commerce disclosures accurate. Do not add real commerce or collect customer data without a request. Preserve Next.js App Router, TypeScript and Vercel compatibility.

Run `npm test`, `npm run typecheck`, and `npm run build` before a release checkpoint. Check desktop and narrow layouts and the film controls in a browser. The homepage preview uses port 3000: `npm run dev -- --port 3000`.

Keep private conversation details, downloaded source footage, and credentials out of source control. The finished film, poster, edit manifest and attribution belong in the repository.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
