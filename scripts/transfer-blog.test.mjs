import { test } from "node:test";
import assert from "node:assert/strict";
import { exportPosts, prepareImport, validatePosts } from "./transfer-blog.mjs";

const post = (n = 1) => ({
  id: `00000000-0000-4000-8000-${String(n).padStart(12, "0")}`,
  title: "Kenoye's guide",
  slug: `guide-${n}`,
  content: "<p>It’s useful. \\ ✓</p>",
  excerpt: null,
  cover_image_url: null,
  status: "published",
  published_at: "2026-01-01T00:00:00Z",
  author_name: "Kenoye",
  created_at: "2026-01-01T00:00:00Z",
  updated_at: "2026-01-02T00:00:00Z",
});
test("import is one transaction, preserves complete fields, and never replaces conflicting rows", () => {
  const sql = prepareImport([post()]);
  assert.match(sql, /BEGIN;/);
  assert.match(sql, /COMMIT;/);
  assert.ok(sql.includes("'Kenoye''s guide'"));
  assert.ok(sql.includes(post().content));
  assert.ok(!/ON CONFLICT|DROP TABLE|DELETE FROM|UPDATE public/i.test(sql));
});
test("rejects incomplete data, duplicate slugs, and invalid timestamps before writing SQL", () => {
  assert.throws(() => validatePosts([{ ...post(), content: undefined }]), /content/);
  assert.throws(() => validatePosts([post(), { ...post(2), slug: post().slug }]), /Duplicate/);
  assert.throws(() => validatePosts([{ ...post(), published_at: "not a date" }]), /published_at/);
});
test("source pagination follows actual row counts even when the server returns less than requested", async () => {
  const offsets = [];
  const exported = await exportPosts(
    "https://source-test.supabase.co",
    "public-test-key",
    async (url, options) => {
      assert.equal(options.redirect, "error");
      const offset = Number(url.searchParams.get("offset"));
      offsets.push(offset);
      return new Response(
        JSON.stringify(offset === 0 ? [post(1), post(2)] : offset === 2 ? [post(3)] : []),
        { status: 200 },
      );
    },
  );
  assert.deepEqual(offsets, [0, 2, 3]);
  assert.equal(exported.posts.length, 3);
});
test("failed source access stops export without target writes or exposing credential values", async () => {
  await assert.rejects(
    exportPosts(
      "https://source-test.supabase.co",
      "do-not-log-this-test-key",
      async () => new Response("Unauthorized", { status: 401 }),
    ),
    (error) => error.message.includes("HTTP 401") && !error.message.includes("do-not-log"),
  );
});
