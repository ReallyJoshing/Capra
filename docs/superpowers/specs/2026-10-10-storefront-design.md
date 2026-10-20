# Storefront framework

Historical scaffold specification from October 10, 2026. Current product direction is documented in [Capra core vision](../../core-vision.md) and the [knowledge base](../../knowledge-base.md). The current site also includes the `/vision` route described in the repository README. The original scaffold description is preserved below.

A simple wireframe for an outdoor athleisure store, ready for iteration in v0.

The default page shows a header, hero, product slots, brand story, and footer. Each section has a small named disclosure. Opening it reveals its purpose and the visible result of changing it. A second disclosure reveals relevant files and editable fields. All explanations start closed.

Copy lives in one config file, sections are separate components, and shared style tokens live in CSS. No invented product catalog, theme switcher, guide rail, or checkout is included.

The local `release` branch is the baseline. Upload/import into v0 requires the user's authenticated session. No deployment is assumed.
