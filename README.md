# KristaVeda Naturals

Russian-first botanical luxury homepage built with Next.js App Router, React, TypeScript, Tailwind CSS 4, and Lucide. Editorial Lora headings and Manrope body text support Cyrillic. Only `/` is implemented; Next.js also emits its standard 404 and technical SEO files.

## Run

Requires Node.js 20.9+ and npm. In PowerShell use `npm.cmd` if script execution policy blocks `npm`.

```sh
npm install
npm run dev
```

Open http://127.0.0.1:3000. For production run `npm run build`; static output is in `out/`. Deploy `out/` with a static host. `npm start` is not compatible with static-export mode; use a static server for the production output.

```sh
npm run lint
npm run typecheck
npm run build
```

## Content and photographs

All image sources and alt text are in `src/lib/images.ts`. Replace an entry's `src` with the new local photograph path, supply accurate Russian alt text, and set `placeholder: false` to remove the sketch label. The botanical SVGs are intentional placeholders, not product illustrations or recreated packaging. Supply photographs in WebP/AVIF, approximately 1600px wide for hero/campaign and 800px wide for cards. Preserve aspect ratios. Do not overwrite an SVG with raster content; update the extension in the configuration.

Current owner-supplied photography:

| Folder | Files |
|---|---|
| `public/images/hero/` | `kaers-black-seed-red-onion.webp` (KAERS campaign, hair category and KAERS brand) |
| `public/images/products/` | Four KAERS shampoo variants, black seed soap, and six KRISTAVEDA mineral deodorant variants; see `src/lib/images.ts` for the full mapping |
| `public/images/brands/` | `kristaveda-black-seed-deodorant.webp` (main hero and KRISTAVEDA brand) |
| `public/images/ingredients/` | `botanical-landscape.webp` |

Beauty/makeup, henna, iLashVeda and Golecha now use deliberate typographic editorial panels because no matching photographs were supplied. The visible homepage no longer repeats generic botanical placeholders. Original hashed uploads remain untouched in `public/images/`. Run `node scripts/prepare-uploaded-images.mjs` to regenerate the fourteen optimized WebP assets; no upscaling, packaging recreation or label alteration is performed. Source/output mappings and dimensions are in `qa/image-assets.json`.

`public/images/og-preview.png` is the social preview. Regenerate it with `node scripts/create-og.mjs` or replace it with a final 1200×630 brand asset. `node scripts/create-placeholders.mjs` restores botanical placeholders and overwrites those SVG files.

Images use Next Image with static-export compatibility. Runtime image optimization is disabled because static hosts have no Next image server. Export production photography in modern, pre-optimized formats; change deployment mode if a runtime image optimizer is required. Fonts are self-hosted through next/font after the build downloads them.

Editable verified product data: `src/data/products.ts`. Brands: `src/data/brands.ts`. Categories: `src/data/categories.ts`. Business contacts and future routes: `src/data/site-config.ts`. Product inquiries and partnership links open the visitor's email client; no email is sent by the application.

## Scope and integrations

- Search covers all eleven verified products. Category filters show four shampoos, one soap or six deodorant variants. Four featured products appear initially; the collection button expands all eleven. Hash navigation reveals a linked product even when its filter was previously hidden.
- Product quick views show the matching photograph, type, variant, verified size when available and an email availability inquiry. They support Escape dismissal and focus restoration.
- Native modal dialogs provide keyboard focus containment, Escape dismissal, focus restoration and mobile navigation.
- Account/cart explain their future availability. No checkout or account pages are fabricated.
- Newsletter validation is local; submission explicitly says no address was saved. Replace the handler with a real, consent-aware subscription service before launch.
- Future routes are centrally configured but are intentionally not linked to missing pages. Privacy/terms require approved documents before commerce launches.
- Brand names are typeset text, not recreated official logos. Replace them with provided brand assets when available.

## Languages and SEO

Russian is the only published language. `src/locales/en.json` and `kk.json` are deliberately unpublished translation manifests. The language control explains availability rather than generating automatic translations. Add reviewed dictionaries, localize components, and create localized routes before enabling EN/KZ. Then add reciprocal `ru-KZ`, `en-KZ`, `kk-KZ` and `x-default` hreflang entries in layout metadata and sitemap. Do not advertise nonexistent localized pages. Current metadata declares only the real Russian homepage.

Canonical and Organization/WebSite structured data use the real brand domain, https://kristaveda.com. For staging, configure the host's crawler restrictions; point canonical/robots/sitemap to the intended final domain before public launch. No Product schema is emitted because complete commercial product data is unavailable.

## Source verification

Verified on 15 November 2026 against https://kristaveda.com/ and its KRISTAVEDA and KAERS brand pages: brand portfolio, black seed/red onion shampoo, black seed soap, mineral deodorant, Almaty address and email. The owner subsequently supplied product photographs, including clearly labeled aloe vera mineral deodorant packaging. That variant is now the fourth featured product; its source is recorded in the product data. No prices, reviews, certifications, discounts or medical claims are supplied.

## Validation

See `QA.md` for checks performed and limits. A Lighthouse score is a deployment measurement, not a guaranteed result.
