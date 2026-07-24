# Production Environment

Date: 2026-07-24

Do not commit secret values. This document lists variable names only.

## Vercel Client Variables

| Variable | Purpose | Local | Vercel | Supabase | Client-safe | Missing behaviour |
| --- | --- | --- | --- | --- | --- | --- |
| `VITE_SUPABASE_URL` | Supabase project URL for browser client | Optional due fallback | Recommended | No | Yes | Browser client uses committed public fallback |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Supabase anon/publishable key | Optional due fallback | Recommended | No | Yes | Browser client uses committed public fallback |

## Supabase Edge Function Secrets

| Variable | Purpose | Local | Vercel | Supabase | Client-safe | Missing behaviour |
| --- | --- | --- | --- | --- | --- | --- |
| `RESEND_API_KEY` | Sends contact-form email through Resend | Optional for local frontend | No | Required for `send-contact-email` | No | Contact function returns 500 |
| `CONTACT_TO_EMAIL` | Destination inbox for contact submissions | Optional | No | Optional | No | Defaults to portfolio email |
| `RESEND_FROM_EMAIL` | Verified sender address for Resend | Optional | No | Recommended | No | Defaults to Resend onboarding sender |
| `SUPABASE_URL` | Supabase URL for sitemap Edge Function | No | No | Required for sitemap function | No | Sitemap function fails |
| `SUPABASE_SERVICE_ROLE_KEY` | Reads published blog posts in sitemap function | No | No | Required for sitemap function | No | Sitemap function fails |

## Notes

- The static `/sitemap.xml` now covers core public routes without requiring Edge Function secrets.
- Published blog-post sitemap entries still require either the existing sitemap Edge Function or future build-time Supabase fetching.

