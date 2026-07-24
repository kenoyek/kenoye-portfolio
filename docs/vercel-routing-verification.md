# Vercel Routing Verification

Date: 2026-07-24

## Configuration

`vercel.json` now includes:

- Permanent redirect from `https://kenoye.site/*` to `https://www.kenoye.site/*`.
- Security headers for all routes.
- `X-Robots-Tag: noindex, nofollow` for `/admin/*`.
- SPA fallback rewrite to `/index.html`.

## Production-Preview Results

The local production preview returned HTTP 200 for:

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

Invalid application routes render the app 404 experience after client routing.

## Static Route Snapshots

The build creates static HTML snapshots for:

- `/`
- `/projects/asele`
- `/projects/teacheasy`
- `/projects/reframe`
- `/blog`

These snapshots preserve client-side routing while improving crawler-visible metadata.

## Remaining Production Checks

- The apex-to-www redirect must be verified after Vercel deployment.
- Vercel static-file precedence over SPA rewrites should be checked on the deployed preview URL.

