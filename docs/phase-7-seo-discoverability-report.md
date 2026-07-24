# Phase 7 SEO and Discoverability Report

Date: 2026-07-24
Branch: `phase-7-seo-discoverability`

## Scope

Phase 7 reviewed public metadata, Open Graph and Twitter tags, structured data, sitemap output, robots rules, canonical URLs, internal linking, and blog SEO behavior.

## Audit Findings

- Core public routes already had route-specific titles, descriptions, canonicals, social images, sitemap entries, and robots coverage.
- Static route metadata had drifted from refined case-study copy for Asele.
- Static sitemap entries did not include `lastmod`.
- Runtime metadata was duplicated across case studies, the blog index, and blog posts.
- Case-study and blog-index JSON-LD was available after client hydration but not embedded in prerendered route snapshots.
- The Supabase sitemap Edge Function generated published blog-post URLs but did not include the core project case-study routes.

## Changes Made

- Added `src/lib/seo.ts` to centralize runtime title, description, robots, canonical, Open Graph, Twitter, and route JSON-LD updates.
- Updated homepage, case-study, blog index, and blog post routes to use the shared metadata helper.
- Added static route JSON-LD for project case studies and the blog index during prerendering.
- Added `og:site_name`, explicit `robots` metadata, and `lastmod` support to generated public route snapshots.
- Updated checked-in `public/sitemap.xml` with `lastmod` values.
- Expanded `public/robots.txt` and generated robots output to explicitly disallow `/admin`, `/admin/`, and `/admin/login`.
- Updated the Supabase sitemap Edge Function so dynamic sitemap output includes home, project case studies, blog index, and published blog posts.
- Added tests for `lastmod` and key case-study wording in public route metadata.
- Updated structured-data and production-environment documentation.

## Factual and Architecture Boundaries

- No screenshots, metrics, ratings, awards, app-store claims, product counts, review data, or unverified article counts were added.
- Product and SoftwareApplication schema remain intentionally omitted because verified app-store/product metadata is incomplete.
- Blog post metadata remains client-side and Supabase-driven; static `/sitemap.xml` cannot list dynamic blog posts without build-time fetching or a deployed sitemap Edge Function.

## External Preview Notes

- External social-preview validators are typically interactive or require deployed public URLs. This phase improved the generated metadata and documents that final deployed preview validation should occur in Phase 8 on Vercel.
- Local validation checks the generated `dist` HTML, sitemap, and robots output after build.
- Live `HEAD` checks confirmed `https://www.kenoye.site/` and `https://www.kenoye.site/robots.txt` respond with `200`.
- Live `HEAD` check confirmed `https://kenoye.site/` redirects to `https://www.kenoye.site/` with `308`.
- The currently deployed `https://www.kenoye.site/sitemap.xml` responded as HTML during this phase. The local generated `dist/sitemap.xml` is correct, so sitemap behavior must be rechecked on the Vercel preview/production deployment for this branch.

## Validation

Validation completed on 2026-07-24:

- `npm run lint` passed.
- `npm run typecheck` passed.
- `npm run test` passed with 3 test files and 10 tests.
- `npm run build` passed and prerendered public routes.

Additional generated-output checks:

- Prerendered project and blog HTML contains route-specific canonical, Open Graph image, `og:site_name`, and `route-jsonld`.
- Generated sitemap includes all public routes and `lastmod`.
- Generated robots file excludes the admin surface.

Notes:

- Vite reported that local Browserslist data is 13 months old during build. The build still completed successfully.
- The test command emitted the existing Vite React SWC performance recommendation. No test failures were reported.
