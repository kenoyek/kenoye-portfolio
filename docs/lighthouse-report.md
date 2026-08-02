# Lighthouse Report

Date: 2026-07-24

Tooling: Lighthouse 13.4.1, local production preview, headless Google Chrome.

## Baseline

Before Milestone 4 hardening, core public routes were already strong except the blog listing.

| Route     | Perf | A11y | Best Practices | SEO | LCP   | CLS   | TBT  | Speed Index | FCP  |
| --------- | ---: | ---: | -------------: | --: | ----- | ----- | ---- | ----------- | ---- |
| Home      |   85 |   93 |            100 | 100 | 3.5s  | 0.002 | 0ms  | 3.2s        | 3.2s |
| Asele     |   83 |   96 |            100 | 100 | 3.5s  | 0     | 0ms  | 3.9s        | 3.1s |
| TeachEasy |   84 |   96 |            100 | 100 | 3.5s  | 0     | 0ms  | 3.7s        | 3.1s |
| Reframe   |   85 |   96 |            100 | 100 | 3.4s  | 0     | 0ms  | 3.3s        | 3.2s |
| Blog      |   42 |   94 |            100 | 100 | 33.9s | 0.529 | 60ms | 6.3s        | 3.2s |

## Fixes Applied

- Upgraded Vite and React Router dependencies.
- Added static public-route HTML snapshots for route metadata.
- Added route-specific social preview images.
- Optimized Cloudinary blog cover images with `f_auto`, `q_auto`, and width transforms.
- Added intrinsic image dimensions, responsive `sizes`, and fetch priority for above-the-fold blog images.
- Prevented the blog footer from shifting during async post loading.
- Fixed dark-theme 404 link contrast.

## After

| Route      | Perf | A11y | Best Practices | SEO | LCP  | CLS | TBT  | Speed Index | FCP  |
| ---------- | ---: | ---: | -------------: | --: | ---- | --- | ---- | ----------- | ---- |
| Blog final |   75 |   94 |            100 | 100 | 4.3s | 0   | 20ms | 5.3s        | 3.2s |

The other route scores remained in the 83-85 performance range with 93-96 accessibility, 100 best-practices, and 100 SEO.

Raw Lighthouse artifacts are stored under `docs/qa/lighthouse/`.

## Remaining Performance Notes

- Blog performance still depends on remote image delivery and live Supabase data.
- Fonts are loaded from Google Fonts and remain a render-blocking consideration for a later pass.
- The admin editor remains large but route-lazy and outside the public initial route.
