/** Generate the one-transaction publication script. Does not contact a database. */
import { readFile, writeFile } from "node:fs/promises";
import { prepareImport, validatePosts } from "./transfer-blog.mjs";
const source = JSON.parse(
  await readFile(new URL("../content/blog/recreated-posts.json", import.meta.url), "utf8"),
);
const posts = validatePosts(source);
for (const post of posts) {
  if (!/^[a-z0-9-]+$/.test(post.slug)) throw Error("Invalid article source filename.");
  post.content = await readFile(
    new URL(`../content/blog/${post.slug}.html`, import.meta.url),
    "utf8",
  );
}
await writeFile(
  new URL("../content/blog/recreated-posts.json", import.meta.url),
  JSON.stringify(source, null, 2) + "\n",
);
if (
  posts.length !== 3 ||
  posts.some(
    (post) =>
      post.status !== "published" || !post.content.includes("<h2>") || post.content.length < 2500,
  )
)
  throw Error("Expected three complete replacement articles ready for publication.");
const slugs = posts.map((post) => `'${post.slug.replaceAll("'", "''")}'`).join(", ");
const readyCheck = `DO $$ BEGIN
  IF to_regclass('public.blog_posts') IS NULL THEN
    RAISE EXCEPTION 'Create the blog schema first using bootstrap-blog.sql.';
  END IF;
END $$;`;
const countCheck = `DO $$ DECLARE published_count integer; BEGIN
  SELECT count(*) INTO published_count FROM public.blog_posts
  WHERE slug IN (${slugs}) AND status = 'published' AND published_at <= now();
  IF published_count <> 3 THEN
    RAISE EXCEPTION 'Expected three published articles. An existing draft or scheduled article may conflict; review it in admin. No existing articles were overwritten.';
  END IF;
END $$;`;
let sql = prepareImport(source, { skipExistingSlugs: true });
sql = sql.replace(
  "SET LOCAL standard_conforming_strings = on;",
  () => `SET LOCAL standard_conforming_strings = on;\n${readyCheck}`,
);
sql = sql.replace("\nCOMMIT;", () => `\n${countCheck}\nCOMMIT;`);
sql = `-- Target: koymddmxehwrpvvyhafh. Run this COMPLETE query in that project's SQL Editor.\n-- New replacement articles authorized by the site owner, not recovered original bodies.\n-- Existing matching slugs are preserved. The entire transaction rolls back on a publication conflict.\n${sql}\nSELECT title, slug, status, published_at FROM public.blog_posts\nWHERE slug IN (${slugs}) ORDER BY title;\n`;
await writeFile(new URL("./supabase/publish-recreated-posts.sql", import.meta.url), sql);
console.log(
  "Prepared three complete articles. No database changes made. Running the generated SQL publishes them and returns three rows.",
);
