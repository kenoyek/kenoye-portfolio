/** Bootstrap only the new project explicitly selected for this migration.
 * Default: print the plan. Apply with:
 * node --use-env-proxy scripts/setup-supabase-blog.mjs --apply
 * SUPABASE_MANAGEMENT_TOKEN must be supplied securely through environment settings.
 */
import { readFile } from "node:fs/promises";
const projectRef = "koymddmxehwrpvvyhafh";
const api = `https://api.supabase.com/v1/projects/${projectRef}/database/query`;

async function main() {
  const sql = await readFile(new URL("./supabase/bootstrap-blog.sql", import.meta.url), "utf8");
  if (!process.argv.includes("--apply")) {
    console.log(
      `Prepared schema for new project ${projectRef}. No remote changes made. Use --apply after configuring SUPABASE_MANAGEMENT_TOKEN.`,
    );
    return;
  }
  const token = process.env.SUPABASE_MANAGEMENT_TOKEN;
  if (!token)
    throw Error(
      "SUPABASE_MANAGEMENT_TOKEN is not configured. Supply it securely in environment settings, not in command arguments.",
    );
  const query = async (sql) => {
    const response = await fetch(api, {
      method: "POST",
      redirect: "error",
      signal: AbortSignal.timeout(60_000),
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ query: sql }),
    });
    if (!response.ok)
      throw Error(
        `Supabase management request returned HTTP ${response.status}. Response contents are omitted to protect configuration and data.`,
      );
    return response.json();
  };
  const existing = await query(
    "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name IN ('blog_posts', 'blog_comments', 'blog_likes', 'blog_admins')",
  );
  if (!Array.isArray(existing))
    throw Error("Could not verify that the target blog schema is empty. Stopping without changes.");
  if (existing.length)
    throw Error(
      "Target already contains blog tables. Stopping to preserve existing data; inspect the schema before proceeding.",
    );
  await query(sql);
  const tables = await query(
    "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name IN ('blog_posts', 'blog_comments', 'blog_likes', 'blog_admins') ORDER BY table_name",
  );
  if (!Array.isArray(tables) || tables.length !== 4)
    throw Error(
      "Schema creation was sent, but verification did not confirm all four tables. Inspect the target before retrying.",
    );
  console.log(
    `Verified four blog tables in ${projectRef}. Existing articles, storage files and admin users have not been transferred.`,
  );
}
main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
