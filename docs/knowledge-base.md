# Capra knowledge base

Updated October 20, 2026. Use this with the [core vision](core-vision.md) when developing products, copy, photography, and the storefront.

## Current decisions

| Area | Direction |
| --- | --- |
| Origin | The founder's experience in the Washington backcountry. |
| Core feeling | Arriving somewhere demanding and being deeply glad the gear you paid for lets you enjoy it in comfort. |
| Human purpose | Health, strength, wholehearted effort, friendship, exploration, and the pleasure of being alive outdoors. |
| Audience | People drawn to nature and shared adventure; speak specifically and welcome growing experience. |
| Product ambition | Capable layers with unrestricted mobility, carefully chosen materials, and durability through repeated use. |
| Aesthetic | Fashion-informed proportions and material choices, restrained presentation, visible product quality. |
| Business ambition | A devoted community with confidence earned through products and care over time. |
| Visual setting | Real landscapes and outdoor pursuits. Identify documented trip locations accurately; treat the homepage historical montage as an editorial celebration, with no athlete endorsement implied. |
| Website direction | Eventually explore and shop by environment, with selectable garments on the people in each scene. |
| Current website | Independent homepage `capra-jc-2`: a dark composition, white sketch, expanding chronological film and centered statement. `capra-jc-1` preserves the first design. Catalog and Vision pages remain at their existing routes. |
| Active catalog | 50 concepts: 29 clothing pieces and 21 accessories, each with five features. The original ROA-inspired proportions guide the form; technical references inform development beneath that form. |
| Catalog status | Generated concept imagery, including four previews with curated CAPRA heading edits. Materials, sizing, price and availability are unconfirmed. Concept products are browse-only; earlier prototype URLs retain their test commerce behavior. |

## Translating conditions into development questions

| Experience | What to investigate |
| --- | --- |
| Snow and creek crossings | Moisture handling, appropriate weather protection, layering, and comfort as effort changes. |
| Rock, scree, kneeling, and scrambling | Abrasion points, seams, reinforcement, articulation, and freedom of movement. |
| Sliding on snow | Suitability, wear, friction, and the limits of the garment in the intended activity. |
| The transition from climbing to camp | Layer fit, moisture retained after exertion, and comfort at rest. |
| Repeated seasons of use | Wear testing, repairability, care, construction failures, and support that can actually be delivered. |

These are questions for product development, not specifications or completed test results. Photography cannot establish temperature, weather ratings, fabric composition, or service life.

## Language and evidence

- Keep the founder's emotional direction distinct from a claim about a finished product.
- Use exact excerpts for quotation marks. Attribute them to the founder's vision; they are not customer reviews or transcripts from the footage.
- JN footage illustrates the life and terrain that inspired the brand. It does not show verified Capra field testing or prove that the pictured clothes are Capra products.
- The homepage reel uses attributed archival and Creative Commons footage of historical feats. It conveys aspiration, not identified athletes' endorsements, founder-trip records, or product performance evidence. See [video sources](video-sources.md).
- Keep Washington's role as the origin explicit. Identify Thousand Island Lake and Hetch Hetchy as California references when using them.
- Do not turn “any environment,” “roughest conditions,” “second skin,” or “years and years” into universal protection or lifespan guarantees.
- Preserve the existing sample-price, sample-material, prototype, and test-checkout disclosures until the underlying product and business facts are verified.
- Treat “foreign planets” as an expression of possibility. The agreed visual direction uses real landscapes.

## Product and website review questions

1. What situation outdoors does this decision serve?
2. How does it improve movement, comfort, durability, or the experience of wearing the garment?
3. What evidence supports the description, and what still needs testing?
4. Is the product easy to see, understand, and choose?
5. Does the presentation retain warmth, companionship, and the pleasure of the destination?
6. Would we be proud to have someone spend hard-earned money on this and rely on the stated performance?

## Working references

- Public story: `src/app/vision/page.tsx`.
- Navigation: `src/config/navigation.ts`.
- Shared description: `src/app/layout.tsx`.
- Copy retained for the earlier storefront: `src/config/storefront.ts`.
- [JN scenes and quotations](jn-vision-references.md).
- [Media provenance](vision-media-sources.json).
- [Launch readiness](launch-readiness.md).

The current catalog imports the approved Field Study 03 design book and its preview images. `src/data/field-study-03.json` contains the 50 concepts and 250 features; `scripts/import-field-study.py` refreshes them from the sibling study folder while preserving four checked-in CAPRA heading edits (`hearth-beanie`, `trail-belt`, `ridgeline-cap`, `talus-work-trouser`). The earlier five sample products remain accessible by their existing URLs but are outside the active collection. All design images and sample commerce data remain prototype material. This vision update does not select a first production garment or approve a manufacturer, material specification, warranty, or production run.
