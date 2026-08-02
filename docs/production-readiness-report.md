# Production Readiness Report

Date: 2026-07-24

Branch: `chore/production-readiness`

Starting commit: `510ea95`

## Summary

Milestone 4 hardened routing, metadata, social previews, browser QA, Lighthouse, dependencies, headers, contact-form validation, error handling, CI, and release documentation. No production deployment was performed.

## Key Changes

- Upgraded Vite to `8.1.5`, `@vitejs/plugin-react-swc` to `4.3.2`, and React Router DOM to `7.18.1`.
- Added static public-route metadata snapshots after build.
- Added static `/sitemap.xml` and updated `/robots.txt`.
- Added typographic social-preview SVGs.
- Added Vercel security headers and apex-to-www redirect.
- Added application error boundary.
- Hardened blog image delivery and contact form validation.
- Added GitHub Actions CI.
- Added browser QA and Lighthouse artifacts.

## Validation

- `npm install`: passed.
- `npm run lint`: passed.
- `npm run typecheck`: passed.
- `npm run test`: passed, 3 files and 9 tests.
- `npm run build`: passed.
- `npm audit`: passed, zero vulnerabilities.

## Bundle Sizes

Baseline from Milestone 3:

- Main shared bundle: `488.61 kB / 147.03 kB gzip`
- Homepage route: `23.86 kB / 6.69 kB gzip`
- Case-study route: `58.32 kB / 14.30 kB gzip`
- CSS: `80.02 kB / 13.80 kB gzip`

After Milestone 4:

- Main shared bundle: `441.30 kB / 131.56 kB gzip`
- Homepage route: `24.16 kB / 6.64 kB gzip`
- Case-study route: `58.85 kB / 14.14 kB gzip`
- CSS: `77.88 kB / 13.75 kB gzip`

## Browser QA

Screenshots are stored under `docs/qa/screenshots/`.

Routes covered:

- `/`
- `/projects/asele`
- `/projects/teacheasy`
- `/projects/reframe`
- `/blog`
- `/admin/login`
- `/projects/not-a-project`
- `/unknown-route`

Breakpoints covered:

- Home: 320x568, 375x812, 430x932, 768x1024, 1024x768, 1280x800, 1440x900, 1920x1080.
- Other routes: 375x812 and 1440x900.
- Dark and light themes were captured.

## Lighthouse

See `docs/lighthouse-report.md`.

## Remaining Blockers

- Deploy the updated `send-contact-email` Supabase function.
- Confirm successful email delivery with one marked test submission.
- Verify apex-to-www redirect on deployed Vercel production.
- Provide real product screenshots and confirmed app-store status.
