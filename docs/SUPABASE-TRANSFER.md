# Connect the new Supabase project and recover articles

Target project: `koymddmxehwrpvvyhafh` (`https://koymddmxehwrpvvyhafh.supabase.co`).
Old project: `pciaegxpldyyvxllzexc`.

## Current status

The new URL and browser-safe publishable key are configured in the local app and prepared as the application defaults. The CLI project binding targets the new project. The user reported that setup SQL completed successfully; remote schema verification is still blocked by the cloud network policy. A connection update is being prepared for `main`; live deployment has not been verified. No old articles have been recovered or imported. The known retired project is ignored if it remains in stale deployment variables.

The repository contains schema migrations, one historical article slug (`5-cursor-shortcuts-that-changed-how-i-write-code`), and QA screenshots. No database dump or complete article text was found. Those artifacts are not an article backup.

## Prepare the new database

Either configure `SUPABASE_MANAGEMENT_TOKEN` securely in the cloud environment settings and allow `api.supabase.com`, then run:

```bash
cd /workspace/kenoye-portfolio
node --use-env-proxy scripts/setup-supabase-blog.mjs --apply
```

Or open the new project's Supabase SQL Editor and run the complete file `scripts/supabase/bootstrap-blog.sql` in full, with no text selected. It creates articles, comments, likes, realtime publication membership, API grants and explicit admin membership in one transaction. It can be rerun after a partial setup: existing rows are preserved, known policies are refreshed and realtime publication membership is added only when missing. It does not change incompatible existing table definitions. It does not require the optional scheduling extensions in the historical migrations.

The management script targets only the new project, checks for existing blog tables and verifies the resulting four tables. Running it without `--apply` only prints its plan. A management token is private: do not commit or paste it into chat.

## Create your administrator

In the new project's Authentication settings, disable public account signup. Create your own email/password user through Authentication → Users. Keep the password private. Copy the resulting user UUID and run this in the SQL Editor:

```sql
INSERT INTO public.blog_admins(user_id) VALUES ('YOUR-AUTH-USER-UUID');
```

Only approved members can edit articles or moderate comments. An ordinary signed-in user cannot manage posts. The existing authenticated application client remains responsible for admin login.

## Recover old articles

The first recovery option is read-only access to the old project's public `blog_posts` API. It requires the old host to be reachable and its public API key to remain valid. This can recover only what its row-level security permits: normally published posts, not drafts, scheduled posts or authentication users. No old-project access or backup is currently available, so recovery is not guaranteed.

If source access becomes available, export into a new private file **outside the checkout**, using securely configured `BLOG_SOURCE_URL` and `BLOG_SOURCE_KEY`:

```bash
node --use-env-proxy scripts/transfer-blog.mjs export /workspace/shared/old-posts.local.json
node scripts/transfer-blog.mjs prepare /workspace/shared/old-posts.local.json /workspace/shared/blog-import.local.sql
```

The prepare command also accepts a JSON array exported from the Supabase table editor. It validates the required fields and writes one SQL transaction with original IDs, slugs, complete HTML, publication status, authors and dates. Existing files are not overwritten. Existing database ID/slug conflicts abort the import rather than overwriting rows. Run the generated private SQL in the **new** project's SQL Editor, or through an authorized management connection, and verify article count and representative content before cutover.

Private files are created with mode 0600. Do not commit exports, generated import files or credentials. Keep a source backup. Storage media is a separate concern: article and cover URLs remain unchanged and may still depend on the old project. Recover/copy any such files and update their references before retiring that project. Comments, likes, auth users and passwords are not exported by the article tool.

If the old project is unavailable, recover articles through the original Lovable project, an owner-provided backup or genuine saved copies. Never replace missing article text with invented content or screenshots presented as full posts.

## Connect and validate before release

Obtain the new project's browser-safe publishable key (or legacy anon key). The key must belong to the same project as the URL. Never use a service-role key in Vite variables.

Set these in Vercel's **Production** environment, and in local development configuration for validation:

```text
VITE_SUPABASE_URL=https://koymddmxehwrpvvyhafh.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<new-project-public-key>
```

Do not mix the old fallback key with the new URL. The CLI `supabase/config.toml` binding and application defaults have been prepared for the new project. Complete overrides take precedence except for the known retired project URL, which is ignored during this migration. Existing Vercel variables should still be updated to match the new project. An incomplete override uses the complete default pair rather than mixing projects. Vercel variables are compiled into the Vite build, so redeploy after changing them.

Verify anonymous article reads, article details, admin login, draft isolation, create/edit flows, migrated text and images. A successful empty article list is not proof that old posts have transferred. Confirm the expected record count and actual content. Only then switch production.

## Local validation of prepared tools

- `node scripts/transfer-blog.test.mjs`: export pagination, SQL quoting/transactions, input validation and failure handling.
- Fresh bootstrap, a repeat bootstrap with existing articles, and generated import were executed against an isolated PostgreSQL-compatible PGlite runtime under `/tmp`. Checks verified preserved text/IDs/slugs, rollback on conflicts, public draft/future-post isolation, denied anonymous/non-admin writes and successful approved-admin writes.
- These local checks do not establish access to either remote Supabase project or successful recovery.
