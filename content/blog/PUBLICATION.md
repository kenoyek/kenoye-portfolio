# Three replacement articles

The site owner explicitly requested that three new articles be created and published using the information available from the previous posts. These are newly written replacements. Original article bodies were not recovered.

## Contents

| Title                                                             | Approximate words | Source HTML                                                           |
| ----------------------------------------------------------------- | ----------------: | --------------------------------------------------------------------- |
| 5 Cursor Shortcuts That Changed How I Write Code                  |               669 | `5-cursor-shortcuts-that-changed-how-i-write-code.html`               |
| Cursor AI and the Cost of Starting                                |               696 | `cursor-ai-and-the-cost-of-starting.html`                             |
| I Let AI Write Most of My Code Last Month. Here's My Honest Take. |               672 | `i-let-ai-write-most-of-my-code-last-month-heres-my-honest-take.html` |

The titles and cover-image references come from saved portfolio QA reports. The first slug is preserved from historical documentation. The other two slugs are newly assigned because their original values were unavailable. The author is Okagua Kenoye, and publication dates are current rather than invented historical dates. The new text avoids fabricated project outcomes, numerical results or personal anecdotes.

The cover URLs remain on the original Cloudinary account. Current remote delivery has not been independently verified from the restricted cloud environment.

## Publish to the new project

1. Open the SQL Editor for Supabase project `koymddmxehwrpvvyhafh`.
2. Copy the complete file `scripts/supabase/publish-recreated-posts.sql` into a new query, clear any selection and run it.
3. Verify that the final result shows exactly three rows with `status = published`.
4. Refresh `/blog` and inspect each article. The records will also be editable in the existing blog admin.

The transaction inserts the three complete records and makes them publicly readable under the existing publication policy. Existing slugs are preserved without overwriting edits. A conflicting existing draft or future publication aborts the transaction for review rather than silently publishing it. Rerunning the script does not duplicate articles.

No database password, service-role key or personal access token belongs in this file. It is intended to be run by the owner in the SQL Editor because this cloud session has neither working project network access nor a database-management credential.

**Status:** article files and publication SQL prepared and locally verified. Live database publication is not yet verified. Committing these files alone does not insert records into Supabase.

## Regenerate and validate

Edit the three HTML source files, then run:

```bash
node scripts/prepare-recreated-posts.mjs
node scripts/transfer-blog.test.mjs
```

The generator synchronises `recreated-posts.json` and the publication SQL while preserving IDs and dates. The SQL was executed against an isolated PostgreSQL-compatible PGlite database. Checks verified all three full bodies, public visibility, exact slugs/covers, idempotent insertion, preservation of owner edits, and refusal to republish an existing draft automatically. This was a local test, not a live Supabase write.
