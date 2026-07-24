# Phase 9 Release Report

Date: 2026-07-24
Branch: `phase-9-release`

## Release Assembly

The release candidate was created from `main` and merged in roadmap order:

1. `refactor/portfolio-foundation`
2. `feature/homepage-editorial-redesign`
3. `feature/project-case-study-system`
4. `chore/production-readiness`
5. `content/asele-public-screenshots`
6. `phase-5-complete-project-visuals`
7. `phase-8-deployment-final-qa`, which includes Phase 6 and Phase 7
8. `fix/about-work-heading-wrap`

During release assembly, Reframe case-study media copy was corrected so public web screenshots are described as available while native mobile screenshots remain withheld pending approval.

## Validation

Validation completed on 2026-07-24:

- `npm run lint` passed.
- `npm run typecheck` passed.
- `npm run test` passed with 3 test files and 10 tests.
- `npm run build` passed and prerendered public routes.
- `npm audit` passed with zero vulnerabilities.

Generated-output checks passed:

- All referenced case-study gallery image paths exist under `public/images/projects`.
- Prerendered Asele, TeachEasy, Reframe, and blog HTML contains route-specific canonical metadata, Open Graph image metadata, and `route-jsonld`.
- Generated `dist/sitemap.xml` includes all core public routes and `lastmod`.
- Generated `dist/robots.txt` disallows the admin surface.

## Local Production Preview QA

Preview URL: `http://127.0.0.1:4173/`

HTTP checks passed for:

- `/`
- `/projects/asele`
- `/projects/teacheasy`
- `/projects/reframe`
- `/blog`
- `/sitemap.xml`
- `/robots.txt`
- `/og-home.svg`
- representative Asele, TeachEasy, and Reframe WebP gallery assets

Headless browser QA passed for:

- `/`
- `/projects/asele`
- `/projects/teacheasy`
- `/projects/reframe`
- `/blog`
- `/admin/login`
- `/projects/not-a-project`
- `/unknown-route`

Responsive QA covered:

- Home: 320x568, 375x812, 430x932, 768x1024, 1024x768, 1280x800, 1440x900, 1920x1080.
- Other routes: 375x812 and 1440x900.

Browser checks included nonblank content, page title, `h1`, main/article landmark, no horizontal overflow, visible images loaded, expected canonical/noindex metadata, and contact-form required-field validation.

## Lighthouse

Sequential local Lighthouse runs against production preview:

| Route | Perf | A11y | Best Practices | SEO | LCP | CLS | TBT |
| --- | ---: | ---: | ---: | ---: | --- | --- | --- |
| `/` | 82 | 93 | 100 | 100 | 3.6 s | 0 | 0 ms |
| `/projects/asele` | 82 | 96 | 100 | 100 | 3.6 s | 0 | 0 ms |
| `/blog` | 73 | 94 | 100 | 100 | 4.8 s | 0 | 30 ms |

One earlier Asele Lighthouse sample reported 61 performance with 6.5 s LCP, but an immediate sequential rerun returned 82 performance with 3.6 s LCP.

## Production Release Status

Production deployment is not complete yet.

Blocked items:

- Supabase deployment: deploying `send-contact-email` failed with a 403 privileges error in Phase 8. The deployed function still returns a Resend `reply_to` error for invalid email instead of the local fixed 400 response.
- Vercel production deployment: this release branch needs either a Vercel CLI project link/auth context or merge/push to the production branch after approval.
- Google Search Console sitemap submission: requires Search Console access and cannot be completed from this environment.

Current live checks from Phase 8:

- `https://www.kenoye.site/` returned `200`.
- `https://www.kenoye.site/robots.txt` returned `200`.
- `https://kenoye.site/` redirected to `https://www.kenoye.site/` with `308`.
- `https://www.kenoye.site/sitemap.xml` returned HTML before the Phase 8 Vercel rewrite fix was deployed.

## Required Release Actions

Before production can be called complete:

1. Deploy the fixed `send-contact-email` Supabase function with an account that has function deploy privileges.
2. Confirm invalid email returns `400` from the deployed function.
3. Send one marked real contact-form test and confirm email delivery.
4. Deploy the `phase-9-release` code to Vercel production.
5. Verify live `/sitemap.xml` serves XML, `/robots.txt` serves text, and project/blog routes refresh correctly.
6. Verify live case-study gallery assets load.
7. Confirm live metadata/social previews for home, Asele, TeachEasy, Reframe, and blog.
8. Submit `https://www.kenoye.site/sitemap.xml` in Google Search Console.

## Future Improvements

- Self-host fonts or revisit font loading to improve LCP consistency.
- Consider build-time or server-side blog sitemap generation if dynamic blog SEO becomes important.
- Add rate limiting to the contact function after email delivery is confirmed.
