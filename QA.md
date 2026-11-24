# Verification

Verified in headless Google Chrome on Windows, 15 November 2026.

- Responsive checks at **320, 375, 390, 430, 768, 1024, 1280, 1440 and 1920px**: no document-level horizontal overflow, no clipped H1/H2/H3, exactly one H1, all image assets load.
- Search for «красным луком» returns the matching red-onion shampoo and its correct anchor.
- Hair filter returns four shampoos; deodorant filter returns six variants. All-products starts with four featured items and expands to eleven. Every expanded product image is decoded successfully.
- Ashwagandha product quick view displays the matching green-label photograph and correct name. Escape dismisses it and restores focus to its trigger.
- Invalid newsletter input shows accessible validation feedback; valid input explicitly confirms that no address was stored.
- Search dialog Escape handling, mobile drawer focus containment, focus restoration, Escape dismissal and navigation dismissal pass.
- No browser JavaScript exceptions.
- Desktop/mobile screenshots reviewed: `qa/desktop-1440.png` and `qa/mobile-390.png`. These are development screenshots; the Next development indicator is absent in production.
- `npm run lint`, `npm run typecheck` and `npm run build` pass. `npm audit --omit=dev` reports zero vulnerabilities.
- Production export includes `/`, `robots.txt`, `sitemap.xml`, fonts, all SVG placeholders and the PNG social preview.

Run browser checks against `npm run dev` with `node scripts/browser-qa.mjs`. The script's Chrome executable path is Windows-specific; adjust it for another machine. Results are written to `qa/results.json`.

Full visual refinement: Lora + Manrope typography, larger body and product text, a mineral-deodorant hero with the matching name, separate KAERS campaign, photographic category gallery, eleven verified products, quick views, typographic iLashVeda/Golecha panels, full-width botanical landscape and reworked closing sections. Fourteen optimized WebP files supply all actual photographs; originals are preserved. All nine responsive widths and interaction checks pass. Product photography uses contain fitting where packaging must remain fully visible; the campaign caption is placed below its photograph to preserve the visible packaging.

Limits: no Lighthouse score claimed, no full screen-reader audit, no real-device/iOS Safari testing. iLashVeda/Golecha photography, approved English/Kazakh translations, legal documents, commerce and newsletter services remain integration work. Static hosting uses pre-optimized assets rather than the Next runtime image server.
