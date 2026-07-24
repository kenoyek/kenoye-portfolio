import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { absoluteUrl, canonicalOrigin, publicRoutes } from "./public-route-metadata.mjs";

const distDir = path.resolve("dist");
const indexPath = path.join(distDir, "index.html");
const baseHtml = await readFile(indexPath, "utf8");

const escapeHtml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const routeHead = (route) => {
  const canonical = absoluteUrl(route.path);
  const image = absoluteUrl(route.image);

  return `
    <title>${escapeHtml(route.title)}</title>
    <meta name="description" content="${escapeHtml(route.description)}">
    <link rel="canonical" href="${canonical}" />
    <meta property="og:type" content="${route.type}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:title" content="${escapeHtml(route.title)}" />
    <meta property="og:description" content="${escapeHtml(route.description)}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(route.title)}" />
    <meta name="twitter:description" content="${escapeHtml(route.description)}" />
    <meta name="twitter:image" content="${image}" />`;
};

const replaceHeadMetadata = (html, route) => {
  const withoutTitle = html.replace(/<title>[\s\S]*?<\/title>/, "");
  const withoutMeta = withoutTitle
    .replace(/\s*<meta name="description"[\s\S]*?>/g, "")
    .replace(/\s*<link rel="canonical"[\s\S]*?>/g, "")
    .replace(/\s*<meta property="og:[\s\S]*?>/g, "")
    .replace(/\s*<meta name="twitter:[\s\S]*?>/g, "");

  return withoutMeta.replace("</head>", `${routeHead(route)}\n  </head>`);
};

for (const route of publicRoutes) {
  const html = replaceHeadMetadata(baseHtml, route);

  if (route.path === "/") {
    await writeFile(indexPath, html);
    continue;
  }

  const routeDir = path.join(distDir, route.path.replace(/^\//, ""));
  await mkdir(routeDir, { recursive: true });
  await writeFile(path.join(routeDir, "index.html"), html);
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${publicRoutes
  .map(
    (route) => `  <url>
    <loc>${absoluteUrl(route.path)}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

await writeFile(path.join(distDir, "sitemap.xml"), sitemap);

const robots = `User-agent: *
Allow: /
Disallow: /admin/

Sitemap: ${canonicalOrigin}/sitemap.xml
`;

await writeFile(path.join(distDir, "robots.txt"), robots);
