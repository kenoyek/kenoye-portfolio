import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SITE_URL = "https://www.kenoye.site";
const STATIC_LASTMOD = "2026-07-24";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data: posts } = await supabase
    .from("blog_posts")
    .select("slug, updated_at")
    .eq("status", "published")
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false });

  type SitemapUrl = {
    loc: string;
    priority: string;
    changefreq: string;
    lastmod?: string;
  };

  const escapeXml = (value: string) =>
    value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&apos;");

  const urls: SitemapUrl[] = [
    { loc: SITE_URL + "/", priority: "1.0", changefreq: "weekly", lastmod: STATIC_LASTMOD },
    {
      loc: SITE_URL + "/projects/asele",
      priority: "0.8",
      changefreq: "monthly",
      lastmod: STATIC_LASTMOD,
    },
    {
      loc: SITE_URL + "/projects/teacheasy",
      priority: "0.8",
      changefreq: "monthly",
      lastmod: STATIC_LASTMOD,
    },
    {
      loc: SITE_URL + "/projects/reframe",
      priority: "0.8",
      changefreq: "monthly",
      lastmod: STATIC_LASTMOD,
    },
    { loc: SITE_URL + "/blog", priority: "0.7", changefreq: "weekly", lastmod: STATIC_LASTMOD },
    ...(posts || []).map((p) => ({
      loc: `${SITE_URL}/blog/${p.slug}`,
      lastmod: p.updated_at?.split("T")[0],
      priority: "0.7",
      changefreq: "weekly",
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${escapeXml(u.loc)}</loc>
    ${u.lastmod ? `<lastmod>${escapeXml(u.lastmod)}</lastmod>` : ""}
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: { ...corsHeaders, "Content-Type": "application/xml" },
  });
});
