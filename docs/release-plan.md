# Release and Rollback Plan

Date: 2026-07-24

## Branch to Merge

`chore/production-readiness`

## Pull Request Order

1. Merge `feature/homepage-editorial-redesign`.
2. Merge `feature/project-case-study-system`.
3. Merge `chore/production-readiness`.

## Required Environment Variables

See `docs/production-environment.md`.

## Pre-Deployment Checks

- `npm ci`
- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run build`
- `npm audit`
- Review screenshots in `docs/qa/screenshots/`
- Review Lighthouse summary in `docs/lighthouse-report.md`

## Deployment Steps

1. Open a PR for `chore/production-readiness`.
2. Confirm CI passes.
3. Confirm required Vercel variables.
4. Deploy a Vercel preview.
5. Smoke test preview routes.
6. Deploy to production only after approval.

No production deployment is performed by this milestone.

Phase 8 note: before production release, deploy the fixed `send-contact-email` Supabase function with an account that has function deploy privileges. The local source is fixed, but the currently deployed invalid-email path still returns a Resend `reply_to` error.

## Post-Deployment Smoke Tests

- `/`
- `/projects/asele`
- `/projects/teacheasy`
- `/projects/reframe`
- `/blog`
- One published blog detail route.
- `/admin/login`
- `/sitemap.xml`
- `/robots.txt`
- `/og-home.svg`
- Unknown route.

## Domain Checks

- `https://www.kenoye.site` loads.
- `https://kenoye.site` permanently redirects to `https://www.kenoye.site`.
- Static assets are not rewritten to app HTML.
- `/sitemap.xml` serves XML, not the SPA shell.

## Rollback Procedure

1. In Vercel, promote the previous known-good deployment.
2. If needed, revert the merge commit for `chore/production-readiness`.
3. Keep Supabase Edge Function changes independent and redeploy the previous function version if email regressions occur.

Previous known-good starting commit: `510ea95`.

## Monitoring Period

Monitor the first 24 hours after production deployment for:

- Blank screens.
- Route refresh failures.
- Contact-form failures.
- Blog image regressions.
- Admin login failures.
- SEO/social preview issues.

## High-Risk Areas

- Static route snapshots with Vercel rewrites.
- Supabase contact function deployment drift.
- Supabase function deploy privileges for `send-contact-email`.
- Remote blog images.
- Client-side blog post metadata.

## Required Human Confirmations

- Product screenshots and app-store status.
- Resend sender-domain status.
- Successful contact email delivery.
- Deployed invalid-email contact validation returns 400.
- Vercel preview `/sitemap.xml` returns XML after the Phase 8 rewrite change.
- Final production domain redirect after deploy.
