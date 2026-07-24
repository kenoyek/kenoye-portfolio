# Phase 8 Deployment and Final QA Report

Date: 2026-07-24
Branch: `phase-8-deployment-final-qa`

## Scope

Phase 8 verified production-readiness behavior for deployment, direct route refreshes, responsive layouts, accessibility landmarks, static SEO files, contact-form safety paths, Lighthouse performance, local CI-equivalent commands, and dependency vulnerabilities.

## Fixes Made

- Narrowed the Vercel SPA fallback rewrite from `/(.*)` to `/((?!.*\\.).*)` so extension-bearing static files such as `/sitemap.xml`, `/robots.txt`, Open Graph SVGs, favicons, and built assets are not caught by the app-shell fallback.
- Added semantic `main` landmarks to the admin login route and 404 route after browser QA flagged missing landmarks.

## Local Production Preview Checks

Preview URL: `http://127.0.0.1:4173/`

HTTP checks passed:

- `/`
- `/projects/asele`
- `/projects/teacheasy`
- `/projects/reframe`
- `/blog`
- `/admin/login`
- `/projects/not-a-project`
- `/sitemap.xml`
- `/robots.txt`
- `/og-home.svg`

Static file checks:

- `/sitemap.xml` returned XML from the built output.
- `/robots.txt` returned plain text from the built output.
- `/og-home.svg` returned SVG from the built output.

Generated metadata checks passed for:

- `dist/projects/asele/index.html`
- `dist/projects/teacheasy/index.html`
- `dist/projects/reframe/index.html`
- `dist/blog/index.html`

Each checked route contains route-specific canonical metadata, Open Graph image metadata, and `route-jsonld`.

## Browser QA

Temporary script: `/private/tmp/phase8-browser-qa.mjs`

Checks included:

- Nonblank rendered content.
- Document title present.
- At least one `h1`.
- Main/article landmark present.
- No horizontal overflow.
- Images loaded.
- Route-specific canonical or noindex robots metadata.
- Contact form starts invalid because required fields are enforced.

Breakpoints:

- Home: 320x568, 375x812, 430x932, 768x1024, 1024x768, 1280x800, 1440x900, 1920x1080.
- Other routes: 375x812 and 1440x900.

Routes:

- `/`
- `/projects/asele`
- `/projects/teacheasy`
- `/projects/reframe`
- `/blog`
- `/admin/login`
- `/projects/not-a-project`
- `/unknown-route`

Result: passed after adding the missing `main` landmarks.

## Lighthouse

Sequential local Lighthouse runs against production preview:

| Route | Perf | A11y | Best Practices | SEO | LCP | CLS | TBT |
| --- | ---: | ---: | ---: | ---: | --- | --- | --- |
| `/` | 82 | 93 | 100 | 100 | 3.5 s | 0 | 0 ms |
| `/projects/asele` | 84 | 96 | 100 | 100 | 3.5 s | 0 | 0 ms |
| `/blog` | 76 | 94 | 100 | 100 | 4.5 s | 0 | 20 ms |

## Contact Form QA

Deployed Supabase function checks using non-email-sending payloads:

- Missing fields: returned `400`.
- Honeypot payload: returned `200` with success and should not send email.
- Invalid email: returned `500` from Resend, which indicates the deployed function still predates the local invalid-email validation fix.

Deployment attempts:

- `supabase functions deploy send-contact-email` failed because the CLI did not consider the project linked.
- `supabase functions deploy send-contact-email --project-ref pciaegxpldyyvxllzexc` failed with `403` account privileges.

Status: local source is fixed, but production contact-form invalid-email behavior remains blocked until someone with Supabase deploy privileges deploys `send-contact-email`.

Successful real email delivery was not tested to avoid sending unnecessary email during QA.

## Live Production Checks

Current deployed site checks:

- `https://www.kenoye.site/` returned `200`.
- `https://www.kenoye.site/robots.txt` returned `200`.
- `https://kenoye.site/` redirected to `https://www.kenoye.site/` with `308`.
- `https://www.kenoye.site/sitemap.xml` returned HTML before this Phase 8 branch was deployed.

The local built output serves `sitemap.xml` correctly after the Vercel rewrite fix. Recheck `/sitemap.xml` on the Vercel preview and production deployment for this branch.

## Validation

Validation completed on 2026-07-24:

- `npm run lint` passed.
- `npm run typecheck` passed.
- `npm run test` passed with 3 test files and 10 tests.
- `npm run build` passed and prerendered public routes.
- `npm audit` passed with zero vulnerabilities.

CI status:

- Local CI-equivalent commands passed.
- Remote GitHub Actions status should be confirmed after opening the PR because this environment does not have a successful remote CI result to inspect.

Notes:

- Vite reported that local Browserslist data is 13 months old during build. The build still completed successfully.
- Test and preview commands emitted the existing Vite React SWC performance recommendation. No test failures were reported.

## Remaining Manual Checks Before Release

- Deploy the fixed Supabase `send-contact-email` function with an account that has the required privileges.
- Confirm invalid email returns `400` from the deployed function after deployment.
- Send one marked real contact-form test and confirm email delivery.
- Open the Vercel preview for this branch and recheck `/sitemap.xml`, `/robots.txt`, direct route refreshes, security headers, and social preview tags.
- Confirm remote GitHub Actions passes on the PR.
- Run a final production smoke test after merge/deployment in Phase 9.
