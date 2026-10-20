# Capra — Greatness, through time

Current design branch: `capra-jc-1` in `ReallyJoshing/Capra`. Improve this design on this branch. Do not create a new branch for an iteration unless the user explicitly requests one. `main` is the repository baseline; do not merge this design to main without an explicit request.

## Homepage direction

The user explicitly requested an independent composition using Known.com as the homepage reference. Do not derive this homepage’s design from the earlier storefront. It has its own CSS module, header, footer, copy, and film controls.

- Homepage: `src/app/page.tsx` and `src/components/decades-home.tsx`.
- Isolated styles: `src/components/decades-home.module.css`.
- Supplied sketch: `public/images/brand/capra-sketch.png`, displayed with white strokes on the dark homepage.
- Film: `public/videos/greatness-through-time.mp4` — 27 chronological half-second shots, 13.5 seconds, silent, 1080p/30fps. It begins in a small centered rectangle and grows to fill the viewport over 7.5 seconds. Actual historical sources provide the progression from archival black-and-white to modern digital footage.
- Preserve pause/play, a reduced-motion still, film-only viewing, keyboard access, and visible source credits. Sources and adaptation licenses are in `docs/video-sources.md` and `docs/decades-film-edit.json`; visible credit data is in `src/data/decades-film.json`.
- The edited film is CC BY-SA 4.0; source attribution and a downloadable film are required. Athlete imagery does not imply a Capra endorsement or product test.
- `src/components/site-chrome.tsx` excludes the earlier storefront header/footer from `/`. Collection routes retain their existing interface; the homepage does not render it.
- Use Capra throughout source, docs, assets, package metadata and storage keys. Do not retain old-name compatibility fallbacks.

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
