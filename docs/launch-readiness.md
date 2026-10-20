# Capra launch readiness

Original readiness review: October 15, 2026. Brand name updated October 19, 2026.

Status: functional commerce prototype, **not cleared for live retail**. No legal certification is implied. Scope is US adult clothing/accessories sold online from California. Requirements depend on actual products, manufacturing, revenue, data practices and locations. Recheck with qualified California counsel and a tax adviser before launch.

## Implemented

- Product routes, image galleries and magnification; sample prices, sizes, materials and care statements clearly distinguished from verified facts.
- Persistent browser bag, server-authoritative pricing and quantity/variant validation.
- Hosted Stripe test checkout; live keys rejected. No card data touches the application.
- Signed, test-only webhooks; paid-session deduplication and local test-order records. No physical fulfillment.
- Draft shipping, returns, privacy, contact and terms pages. No advertising analytics added.
- Keyboard operability, visible focus states, semantic controls and responsive layout; not a full accessibility audit.

## Required before accepting real orders

1. **Business and contact:** verify the legal operating entity and authority to use the Capra name. Obtain full city/state/ZIP, actual support email, returns address and operating procedures. The user-supplied address is incomplete. Check applicable local business requirements; do not imply registration is complete.
2. **Truthful product information and labeling:** obtain supplier-confirmed fiber percentages, country of origin, responsible company identity/RN where appropriate, permanent care labels and accurate measurements. Website copy cannot substitute for physical labels. Do not publish sample materials or edited branding as evidence of real inventory. Verify image and brand rights. [FTC clothing/textiles](https://www.ftc.gov/business-guidance/industry/clothing-and-textiles), [Textile Fiber Rule](https://www.ftc.gov/legal-library/browse/rules/textile-fiber-rule).
3. **Product safety:** determine applicable 16 CFR 1610 flammability testing/exemptions and certificates for each garment. Children's products require a separate assessment before adding them. [CPSC apparel guide](https://www.cpsc.gov/s3fs-public/Guide-to-US-Apparel-and-Household-Textiles.pdf).
4. **California chemicals:** obtain supplier PFAS compliance documentation under AB 1817; assess product-specific Proposition 65 exposures and warnings. Do not add blanket warnings or claim compliance without evidence. When a warning is required, address both product/packaging and pre-purchase online presentation. [DTSC PFAS guidance](https://dtsc.ca.gov/wp-content/uploads/sites/31/2023/09/PFAS-Factsheet.pdf), [OEHHA warning guidance](https://www.p65warnings.ca.gov/contact-us-proposition-65-help-desk).
5. **Tax:** obtain required seller's permit, establish sales-tax registrations/nexus and tax treatment. Then configure and validate tax collection, including Stripe Tax registrations if used. The prototype intentionally collects no tax and blocks live keys. [CDTFA online sales](https://www.cdtfa.ca.gov/formspubs/pub109/), [Seller permits](https://www.cdtfa.ca.gov/taxes-and-fees/faqseller.htm).
6. **Shipping, refunds and price disclosure:** confirm inventory and a reasonable basis for promised shipment times; create delay-consent/cancellation/refund procedures. FTC's rule generally requires shipment within the stated time, or 30 days if none is stated. Publish actual return restrictions conspicuously before payment; preserve statutory remedies. Include mandatory fees in advertised prices except lawful exclusions such as qualifying shipping/taxes. Proposed $8/free-$150 shipping and 30-day returns require business approval. [FTC delivery rules](https://www.ftc.gov/business-guidance/resources/selling-internet-prompt-delivery-rules), [California refunds](https://oag.ca.gov/consumers/general/refunds), [California hidden fees](https://www.oag.ca.gov/hiddenfees).
7. **Privacy/security:** complete the privacy notice with real contact, categories, purposes, recipients, retention and rights procedures; assess CalOPPA and conditional CCPA/CPRA applicability. Implement applicable opt-outs/GPC before adding advertising or selling/sharing personal information. Do not claim the prototype's draft is a complete production notice. [California privacy guidance](https://oag.ca.gov/privacy), [CCPA](https://oag.ca.gov/privacy/ccpa).
8. **Accessibility:** audit complete browsing, size selection, zoom, cart, errors, checkout and policies with keyboard, screen readers, contrast and mobile zoom. WCAG 2.2 AA is a useful engineering target, not an automatic legal guarantee. [DOJ web guidance](https://www.ada.gov/resources/web-guidance/).
9. **California producer/manufacturing obligations:** assess textile stewardship/SB 707 producer scope and applicable deadlines; packaging EPR and garment manufacturing/labor obligations depend on supply chain and operations. [CalRecycle textiles](https://calrecycle.ca.gov/epr/textiles/), [EPR programs](https://calrecycle.ca.gov/epr/). These have not been satisfied by website changes.
10. **Payments and operations:** claim the temporary sandbox before October 22, 2026. Before live mode, complete Stripe account activation, deploy HTTPS and production webhooks, replace local file records with a durable transactional database, add stock reservation, refund/fulfillment tools, rate limits, monitoring, receipts/support and retention controls. Test decline, retries, duplicate events, delayed payment and canceled checkout. Never treat a success-page visit as fulfillment authorization.

## Prototype configuration

Sample prices: sweater $98; denim $128; technical pants $148; cap $38; beanie $32. Sample materials are centralized in `src/data/commerce.ts`.

Secrets reside only in ignored `.env.local`. The ephemeral sandbox claim link and Stripe CLI configuration are local temporary files and are not committed. Webhook events are written to ignored `.data/test-orders/` without card or customer address data. Local storage is not suitable as production order infrastructure, especially on Vercel's ephemeral filesystem.
