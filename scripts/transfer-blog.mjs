/** Prepare a private export and a transactional import; never writes to a target database.
 * Node 24: node --use-env-proxy scripts/transfer-blog.mjs export /private/path/posts.json
 *          node scripts/transfer-blog.mjs prepare /private/path/posts.json /private/path/import.sql
 * Export reads BLOG_SOURCE_URL and BLOG_SOURCE_KEY from the environment; never prints them.
 * An anon/publishable source key recovers only publicly readable posts. A source admin
 * export is required to recover drafts and scheduled articles hidden by RLS.
 */
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

export const columns = [
  "id",
  "title",
  "slug",
  "content",
  "excerpt",
  "cover_image_url",
  "status",
  "published_at",
  "author_name",
  "created_at",
  "updated_at",
];
const uuid = /^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/i;
export function validatePosts(value) {
  // Supabase table JSON exports can be supplied as an array; the tool also accepts its own envelope.
  const posts = Array.isArray(value) ? value : value?.posts;
  if (!Array.isArray(posts)) throw Error("Expected an article array or a { posts: [...] } export.");
  const ids = new Set();
  const slugs = new Set();
  for (const [index, post] of posts.entries()) {
    if (!post || typeof post !== "object") throw Error(`Invalid article at row ${index + 1}.`);
    for (const column of columns) {
      const cell = post[column];
      if (cell !== null && typeof cell !== "string")
        throw Error(`Missing or invalid ${column} at row ${index + 1}.`);
      if (typeof cell === "string" && cell.includes("\0"))
        throw Error(`Unsupported NUL character at row ${index + 1}.`);
    }
    if (
      !uuid.test(post.id) ||
      !post.slug ||
      !post.title ||
      post.content === null ||
      !post.author_name
    )
      throw Error(`Invalid required fields at row ${index + 1}.`);
    if (!["draft", "scheduled", "published"].includes(post.status))
      throw Error(`Invalid publication status at row ${index + 1}.`);
    for (const date of ["created_at", "updated_at", "published_at"]) {
      if (
        (post[date] === null && date !== "published_at") ||
        (post[date] !== null && Number.isNaN(Date.parse(post[date])))
      )
        throw Error(`Invalid ${date} at row ${index + 1}.`);
    }
    if (ids.has(post.id) || slugs.has(post.slug))
      throw Error(`Duplicate article ID or slug at row ${index + 1}.`);
    ids.add(post.id);
    slugs.add(post.slug);
  }
  return posts;
}

export function prepareImport(value) {
  const posts = validatePosts(value);
  // Standard SQL strings preserve apostrophes, backslashes, Unicode, and HTML.
  const sql = (value) => (value === null ? "NULL" : `'${value.replaceAll("'", "''")}'`);
  const statements = posts.map(
    (post) =>
      `INSERT INTO public.blog_posts (${columns.join(", ")}) VALUES (${columns.map((column) => sql(post[column])).join(", ")});`,
  );
  return `-- Article transfer: ${posts.length} rows. No existing rows will be overwritten.\nBEGIN;\nSET LOCAL standard_conforming_strings = on;\n${statements.join("\n")}\nCOMMIT;\n`;
}

export async function exportPosts(projectUrl, key, fetcher = fetch) {
  if (!projectUrl || !key)
    throw Error("Set BLOG_SOURCE_URL and BLOG_SOURCE_KEY securely in your environment.");
  const base = new URL(projectUrl);
  if (
    base.protocol !== "https:" ||
    base.username ||
    base.password ||
    base.pathname !== "/" ||
    base.search ||
    base.hash
  )
    throw Error("BLOG_SOURCE_URL must be an HTTPS project origin without credentials or a path.");
  const posts = [];
  for (let offset = 0; ;) {
    const url = new URL("/rest/v1/blog_posts", base);
    url.search = new URLSearchParams({
      select: columns.join(","),
      order: "id.asc",
      limit: "500",
      offset: String(offset),
    }).toString();
    const response = await fetcher(url, {
      redirect: "error",
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      signal: AbortSignal.timeout(30_000),
    });
    if (!response.ok)
      throw Error(
        `Source article export failed with HTTP ${response.status}. No target data was changed.`,
      );
    const page = await response.json();
    if (!Array.isArray(page)) throw Error("The source did not return an article array.");
    posts.push(...page);
    if (page.length === 0) break;
    offset += page.length;
  }
  validatePosts(posts);
  return { version: 1, exported_at: new Date().toISOString(), posts };
}

async function main() {
  const [command, input, output] = process.argv.slice(2);
  if (command === "export" && input && !output) {
    const data = await exportPosts(process.env.BLOG_SOURCE_URL, process.env.BLOG_SOURCE_KEY);
    await writeFile(resolve(input), JSON.stringify(data, null, 2), { flag: "wx", mode: 0o600 });
    console.log(
      `Exported ${data.posts.length} readable articles. Existing files were not overwritten. Drafts require source administrator access.`,
    );
  } else if (command === "prepare" && input && output) {
    const data = JSON.parse(await readFile(resolve(input), "utf8"));
    const posts = validatePosts(data);
    const sourceImages = new Set(
      posts
        .flatMap((post) => [
          post.cover_image_url,
          ...[...post.content.matchAll(/(?:src|href)=["'](https?:\/\/[^"']+)["']/g)].map(
            (match) => match[1],
          ),
        ])
        .filter(Boolean),
    );
    await writeFile(resolve(output), prepareImport(data), { flag: "wx", mode: 0o600 });
    console.log(
      `Prepared ${posts.length} articles for one SQL transaction. Conflicts will abort the transaction; no rows will be replaced.`,
    );
    console.log(
      `${sourceImages.size} external media/link URLs remain referenced. Storage files and authentication users are not transferred by this SQL.`,
    );
  } else {
    throw Error(
      "Usage: transfer-blog.mjs export <new-private-json-file> | prepare <json-export> <new-private-sql-file>",
    );
  }
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
