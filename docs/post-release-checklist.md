# Post-Release Checklist

Date: 2026-07-24

Use this checklist after `phase-9-release` is merged into `main` and deployed to the existing Vercel production project.

## Before Merge

- Confirm the pull request targets `main` from `phase-9-release`.
- Confirm CI passes:
  - `npm run lint`
  - `npm run typecheck`
  - `npm run test`
  - `npm run build`
- Review the final diff for accidental secrets, placeholder claims, or unapproved screenshots.
- Confirm `docs/phase-9-release-report.md` still matches the actual release state.

## Supabase Contact Function

- Deploy `send-contact-email` to project `pciaegxpldyyvxllzexc`.
- Confirm these Supabase secrets exist:
  - `RESEND_API_KEY`
  - `CONTACT_TO_EMAIL`
  - `RESEND_FROM_EMAIL`
- Send a non-emailing missing-field request and confirm `400`.
- Send a non-emailing invalid-email request and confirm `400`.
- Send one marked real contact-form test.
- Confirm the email arrives in the destination inbox.
- Confirm Resend logs show a successful send.
- Confirm Supabase function logs show no secret values and no unexpected stack traces.

## Vercel Deployment

- Deploy the merged `main` commit to the existing production Vercel project.
- Confirm the deployed commit SHA matches the merge commit.
- Confirm `www.kenoye.site` is assigned to the deployment.
- Confirm `kenoye.site` redirects to `https://www.kenoye.site/`.
- Confirm Vercel build logs show no build errors.
- Confirm no unexpected environment-variable warnings appear in Vercel logs.

## Live Route QA

- Visit and hard-refresh:
  - `https://www.kenoye.site/`
  - `https://www.kenoye.site/projects/asele`
  - `https://www.kenoye.site/projects/teacheasy`
  - `https://www.kenoye.site/projects/reframe`
  - `https://www.kenoye.site/blog`
  - a published blog-post route
  - `https://www.kenoye.site/admin/login`
  - an invalid project route
  - an invalid blog route
  - an unknown route
- Confirm no route refreshes show a Vercel 404.
- Confirm invalid public routes render a noindex page.
- Confirm the admin route remains noindex.
- Confirm no browser console errors appear during normal navigation.

## Responsive And Accessibility QA

- Review home, Asele, TeachEasy, Reframe, and blog at:
  - 320px
  - 375px
  - 430px
  - 768px
  - 1024px
  - 1280px
  - 1440px
  - 1920px
- Confirm there is no horizontal overflow.
- Confirm no headings split words in the middle.
- Confirm visible focus states work for keyboard navigation.
- Confirm skip link works.
- Confirm light and dark themes remain legible.
- Confirm all visible images have meaningful alt text.

## SEO And Sharing

- Confirm `https://www.kenoye.site/sitemap.xml` serves XML.
- Confirm `https://www.kenoye.site/robots.txt` serves text.
- Confirm canonical URLs use `https://www.kenoye.site`.
- Confirm Open Graph title, description, and image are present for:
  - home
  - Asele
  - TeachEasy
  - Reframe
  - blog
  - a published blog post
- Confirm JSON-LD parses on prerendered public routes.
- Submit `https://www.kenoye.site/sitemap.xml` in Google Search Console.
- Request indexing for the home page and the three project pages.

## Content And Assets

- Confirm Asele, TeachEasy, and Reframe galleries load their optimized WebP assets.
- Confirm public website screenshots are captioned accurately.
- Confirm no PHI, private product screens, browser chrome, or unapproved mobile screenshots appear.
- Confirm project links open successfully.
- Confirm GitHub, LinkedIn, and resume links work.
- Confirm the public screenshot documentation remains accurate.

## First Week Monitoring

- Check Vercel analytics and logs for route errors.
- Check Supabase function logs for contact-form failures.
- Check Resend delivery logs for bounces or sender-domain issues.
- Check Google Search Console coverage after sitemap submission.
- Review Core Web Vitals once field data starts updating.
- Capture any follow-up issues as separate scoped tickets rather than reopening the release branch.
