# Contact Form Verification

Date: 2026-07-24

## Client Path

Component: `src/components/home/ContactPanel.tsx`

Verified:

- Required name, email, project type, and message fields.
- Native email input validation.
- Loading state.
- Duplicate-submit guard.
- Honeypot field.
- User-facing success and failure toasts.
- Direct mailto fallback.

## Edge Function

Function: `supabase/functions/send-contact-email/index.ts`

Local source now includes:

- POST-only handling.
- CORS preflight handling.
- Required field validation.
- Email format validation before Resend.
- Maximum length validation.
- Honeypot short-circuit.
- HTML escaping.
- Header newline cleanup for subject.
- Resend integration using `RESEND_API_KEY`.

## Deployed Function Checks

Using the deployed Supabase function with non-email-sending payloads:

- Missing fields returned 400.
- Honeypot payload returned 200 with success and should not send email.
- Invalid email currently returned 500 from Resend with an invalid `reply_to` message.

This indicates the deployed Edge Function is reachable, but the deployed code likely predates the local invalid-email validation change. Deploy `send-contact-email` before claiming this fix is live.

Phase 8 deploy attempts:

- `supabase functions deploy send-contact-email` failed because the CLI did not consider the project linked.
- `supabase functions deploy send-contact-email --project-ref pciaegxpldyyvxllzexc` failed with a 403 privileges error.

## Not Fully Verified

- Successful email delivery was not tested to avoid unnecessary real email sends.
- Rate limiting is not implemented beyond the honeypot and client duplicate-submit guard.
- Resend sender-domain verification must be confirmed in Resend/Supabase.
