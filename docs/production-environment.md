# Production Environment

Date: 2026-07-24

Do not commit secret values. This document lists variable names only.

## Vercel Client Variables

| Variable                        | Purpose                                 | Local                 | Vercel      | Supabase | Client-safe | Missing behaviour                             |
| ------------------------------- | --------------------------------------- | --------------------- | ----------- | -------- | ----------- | --------------------------------------------- |
| `VITE_SUPABASE_URL`             | Supabase project URL for browser client | Optional due fallback | Recommended | No       | Yes         | Browser client uses committed public fallback |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Supabase anon/publishable key           | Optional due fallback | Recommended | No       | Yes         | Browser client uses committed public fallback |

## Supabase Edge Function Secrets

| Variable                    | Purpose                                        | Local                       | Vercel | Supabase                          | Client-safe | Missing behaviour                    |
| --------------------------- | ---------------------------------------------- | --------------------------- | ------ | --------------------------------- | ----------- | ------------------------------------ |
| `RESEND_API_KEY`            | Sends contact-form email through Resend        | Optional for local frontend | No     | Required for `send-contact-email` | No          | Contact function returns 500         |
| `CONTACT_TO_EMAIL`          | Destination inbox for contact submissions      | Optional                    | No     | Optional                          | No          | Defaults to portfolio email          |
| `RESEND_FROM_EMAIL`         | Verified sender address for Resend             | Optional                    | No     | Recommended                       | No          | Defaults to Resend onboarding sender |
| `SUPABASE_URL`              | Supabase URL for sitemap Edge Function         | No                          | No     | Required for sitemap function     | No          | Sitemap function fails               |
| `SUPABASE_SERVICE_ROLE_KEY` | Reads published blog posts in sitemap function | No                          | No     | Required for sitemap function     | No          | Sitemap function fails               |

## Notes

- The static `/sitemap.xml` covers core public routes without requiring Edge Function secrets.
- The sitemap Edge Function also includes the core public routes and adds published blog-post entries from Supabase when deployed with its required secrets.
- If `/sitemap.xml` remains static on Vercel, published blog-post sitemap entries still require either a deployed sitemap Edge Function URL or future build-time Supabase fetching.

## Public blog request isolation

Public article lists and article pages use a separate anonymous Supabase client. It does not read or persist admin sessions, refresh tokens, or consume OAuth tokens from the URL. Administrator login and management retain the authenticated client. Both use the same shared project configuration; neither changes database permissions or publication filters.

`VITE_SUPABASE_ANON_KEY` is accepted as an alternative to `VITE_SUPABASE_PUBLISHABLE_KEY`. The publishable-key variable takes precedence. Values are trimmed before use, and the existing public fallback is preserved when values are absent. Never put a service-role key in either browser variable.

Public reads time out after 15 seconds and offer retry. Article failures are no longer presented as missing posts. Regression tests cover rejected saved-admin tokens, unchanged admin storage, publication filters, backend errors, timeouts, successful rendering and retries. A production-browser check with an intercepted test response confirmed anonymous authorization and article rendering. Live service recovery remains unverified from the restricted cloud network.
