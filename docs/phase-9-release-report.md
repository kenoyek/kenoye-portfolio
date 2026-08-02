# Phase 9 Release Report

Date: 2026-07-24
Branch: `phase-9-release`
Repository: `https://github.com/kenoyek/kenoye-portfolio.git`

## Final Status

Final release status: Release candidate only

The release branch has been assembled, validated locally, pushed, and opened as a GitHub pull request. It has not been merged into `main`, deployed to Vercel production, or submitted to Google Search Console from this environment because the updated Supabase contact function still requires privileged deployment and one real production email-delivery test before the release can be called complete.

## Release Assembly

`phase-9-release` was created from `main` and merged in roadmap order:

1. `refactor/portfolio-foundation`
2. `feature/homepage-editorial-redesign`
3. `feature/project-case-study-system`
4. `chore/production-readiness`
5. `content/asele-public-screenshots`
6. `phase-5-complete-project-visuals`
7. `phase-8-deployment-final-qa`, which includes Phase 6 and Phase 7
8. `fix/about-work-heading-wrap`

Release QA also added two small hardening fixes:

- Invalid blog-post routes now render their fallback content inside a `main` landmark.
- The 404 page no longer emits a console error for expected invalid-route QA checks.

## Git State

- Base production branch checked: `origin/main`
- `origin/main` SHA during release check: `90fd6eabc201b2ed96e798891265591d5f956508`
- Release candidate SHA before final report documentation: `2224fedd629898f5aa454967299b85ac9055138b`
- `origin/main` is an ancestor of `phase-9-release`.
- `phase-9-release` is not an ancestor of `origin/main`; the release is not merged.
- Pull request: `https://github.com/kenoyek/kenoye-portfolio/pull/1`
- PR target: `main`
- PR source: `phase-9-release`
- PR merge state: clean
- CI `validate` check: passed
- Vercel preview check: passed
- Vercel preview target: available from the latest PR checks; it changes per commit.
- No merge was performed because the updated Supabase contact function still needs privileged deployment and one production delivery test.
- A release-diff secret pattern scan did not find committed Resend, GitHub, Vercel, Supabase service-role, or private-key values.

## Validation

Final local validation completed on 2026-07-24:

- `npm install` completed with dependencies up to date.
- `npm run lint` passed.
- `npm run typecheck` passed.
- `npm run test` passed with 3 test files and 10 tests.
- `npm run build` passed and prerendered public routes.
- `npm audit` passed with zero vulnerabilities.

Known non-blocking warnings:

- Vitest prints the existing Vite React SWC recommendation.
- Build prints the existing Browserslist/caniuse-lite staleness warning.

Generated-output checks passed:

- All referenced case-study gallery image paths exist under `public/images/projects`.
- Prerendered Asele, TeachEasy, Reframe, and blog-index HTML contains route-specific canonical metadata, Open Graph image metadata, and `route-jsonld`.
- Generated `dist/sitemap.xml` includes all core public routes and `lastmod`.
- Generated `dist/robots.txt` disallows the admin surface.

Published blog-post detail routes are dynamic Supabase-backed routes, not build-time prerendered static HTML in the current architecture.

## Local Production Preview QA

Preview URL used: `http://127.0.0.1:4173/`

HTTP checks passed locally for:

- `/`
- `/projects/asele`
- `/projects/teacheasy`
- `/projects/reframe`
- `/blog`
- `/blog/5-cursor-shortcuts-that-changed-how-i-write-code`
- `/admin/login`
- `/projects/not-a-project`
- `/blog/not-a-real-post`
- `/unknown-route`
- `/sitemap.xml`
- `/robots.txt`
- representative Asele, TeachEasy, and Reframe WebP gallery assets

Headless browser QA passed for light and dark themes at `390x844`, `768x1024`, and `1440x900` across:

- `/`
- `/projects/asele`
- `/projects/teacheasy`
- `/projects/reframe`
- `/blog`
- `/blog/5-cursor-shortcuts-that-changed-how-i-write-code`
- `/admin/login`
- `/projects/not-a-project`
- `/blog/not-a-real-post`
- `/unknown-route`

Browser checks included nonblank content, page title, `h1`, main/article landmark, no horizontal overflow, visible images loaded, expected canonical/noindex metadata, Open Graph and Twitter metadata, valid JSON-LD, contact-form required-field validation, skip-link visibility, and dark-theme class handling.

## Lighthouse

Sequential local Lighthouse runs against production preview:

| Route             | Perf | A11y | Best Practices | SEO | LCP   | CLS | TBT   |
| ----------------- | ---: | ---: | -------------: | --: | ----- | --- | ----- |
| `/`               |   82 |   93 |            100 | 100 | 3.6 s | 0   | 0 ms  |
| `/projects/asele` |   82 |   96 |            100 | 100 | 3.6 s | 0   | 0 ms  |
| `/blog`           |   73 |   94 |            100 | 100 | 4.8 s | 0   | 30 ms |

One earlier Asele Lighthouse sample reported 61 performance with 6.5 s LCP, but an immediate sequential rerun returned 82 performance with 3.6 s LCP.

## Current Production Checks

These checks describe the currently deployed production site, not the unreleased `phase-9-release` branch.

- `https://kenoye.site/` returns `308` to `https://www.kenoye.site/`.
- `https://www.kenoye.site/` returns `200` and serves HTML.
- `https://www.kenoye.site/projects/asele` returns `200` and serves HTML.
- `https://www.kenoye.site/projects/teacheasy` returns `200` and serves HTML.
- `https://www.kenoye.site/projects/reframe` returns `200` and serves HTML.
- `https://www.kenoye.site/blog` returns `200` and serves HTML.
- `https://www.kenoye.site/robots.txt` returns `200` and serves text.
- `https://www.kenoye.site/sitemap.xml` currently returns HTML, so the local sitemap fix is not yet live.

## Vercel Deployment

Vercel production deployment was not completed from this environment.

Observed blockers:

- No `.vercel` project link exists in the repository.
- `vercel whoami` reports no existing credentials.
- The GitHub/Vercel integration created a successful pull-request preview, but the production deployment was not triggered because the PR was not merged.
- Production deployment URL and deployment ID are therefore not available.

Expected Vercel configuration for the existing production project:

- Production branch: `main`
- Framework preset: Vite
- Install command: `npm install`
- Build command: `npm run build`
- Output directory: `dist`
- Node version: match CI, Node 24
- Domain: `www.kenoye.site`
- Apex redirect: handled by `vercel.json` from `kenoye.site` to `www.kenoye.site`

Recommended Vercel environment variables:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

## Supabase And Contact Form

Local source for `supabase/functions/send-contact-email/index.ts` includes:

- CORS preflight handling.
- POST-only handling.
- Required field validation.
- Email format validation before Resend.
- Maximum length validation.
- Honeypot short-circuit.
- HTML escaping.
- Header newline cleanup for the subject.
- Resend integration through `RESEND_API_KEY`.

Safe source assertions passed for 10 expected function behaviors.

Runtime blockers:

- Deno is not installed locally.
- Supabase local runtime cannot start because Docker is not running.
- `supabase functions deploy send-contact-email --project-ref pciaegxpldyyvxllzexc` was blocked by a 403 privileges error in Phase 8.
- A deployed invalid-email probe returned the older Resend `reply_to` error, which indicates the deployed function likely predates the local validation fix.
- A real successful email delivery test was not run to avoid sending unapproved live email.

Required Supabase secrets:

- `RESEND_API_KEY`

Recommended Supabase secrets:

- `CONTACT_TO_EMAIL`
- `RESEND_FROM_EMAIL`

## Search Console

Google Search Console sitemap submission was not completed because it requires account access.

After production deployment, submit:

`https://www.kenoye.site/sitemap.xml`

## Required Release Actions

Complete these actions before calling the production release finished:

1. Review PR `https://github.com/kenoyek/kenoye-portfolio/pull/1`.
2. Confirm CI and Vercel preview remain green immediately before merge.
3. Deploy `send-contact-email` with an account that has Supabase Edge Function privileges.
4. Confirm deployed invalid email returns `400`.
5. Send one marked real contact-form test and confirm email delivery in the recipient inbox.
6. Merge `phase-9-release` into `main`.
7. Deploy the merged `main` commit to the existing Vercel production project.
8. Verify the live production deployment URL and deployed commit SHA.
9. Confirm live `/sitemap.xml` serves XML and `/robots.txt` serves text.
10. Confirm live refreshes work for home, project routes, blog routes, admin login, and invalid routes.
11. Confirm live case-study gallery assets load.
12. Confirm live metadata/social previews for home, Asele, TeachEasy, Reframe, and blog.
13. Submit `https://www.kenoye.site/sitemap.xml` in Google Search Console.

## Future Improvements

- Self-host fonts or revisit font loading to improve LCP consistency.
- Consider build-time or server-side blog sitemap generation if dynamic blog SEO becomes important.
- Add durable rate limiting to the contact function after email delivery is confirmed.
- Replace any temporary public website screenshots with approved native screenshots when publication approval exists.

## Post-Candidate Restoration

On branch `fix/restore-portfolio-projects`, valid projects unintentionally removed from homepage visibility during the editorial refactor were restored as secondary work without changing the flagship case-study hierarchy. See `docs/portfolio-project-restoration-audit.md`.
