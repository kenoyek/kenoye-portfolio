import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { absoluteUrl, canonicalOrigin, publicRoutes, siteName } from "./public-route-metadata.mjs";

const distDir = path.resolve("dist");
const indexPath = path.join(distDir, "index.html");
const baseHtml = await readFile(indexPath, "utf8");

const escapeHtml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const safeJson = (value) => JSON.stringify(value).replaceAll("<", "\\u003c");

const routeJsonLd = (route) => {
  const canonical = absoluteUrl(route.path);

  if (route.path === "/") {
    return null;
  }

  const breadcrumbItems = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: absoluteUrl("/"),
    },
  ];

  if (route.path.startsWith("/projects/")) {
    breadcrumbItems.push(
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: absoluteUrl("/#work"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: route.title.replace(" Case Study", ""),
        item: canonical,
      },
    );

    return [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: route.title,
        description: route.description,
        url: canonical,
        author: {
          "@type": "Person",
          name: siteName,
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: route.title,
        description: route.description,
        url: canonical,
        creator: {
          "@type": "Person",
          name: siteName,
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbItems,
      },
    ];
  }

  if (route.path === "/blog") {
    breadcrumbItems.push({
      "@type": "ListItem",
      position: 2,
      name: "Blog",
      item: canonical,
    });

    return [
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: route.title,
        description: route.description,
        url: canonical,
        isPartOf: {
          "@type": "WebSite",
          name: siteName,
          url: absoluteUrl("/"),
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbItems,
      },
    ];
  }

  return null;
};

const routeHead = (route) => {
  const canonical = absoluteUrl(route.path);
  const image = absoluteUrl(route.image);
  const jsonLd = routeJsonLd(route);

  return `
    <title>${escapeHtml(route.title)}</title>
    <meta name="description" content="${escapeHtml(route.description)}">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="${canonical}" />
    <meta property="og:site_name" content="${escapeHtml(siteName)}" />
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
    <meta name="twitter:image" content="${image}" />${jsonLd ? `
    <script id="route-jsonld" type="application/ld+json">${safeJson(jsonLd)}</script>` : ""}`;
};

const replaceHeadMetadata = (html, route) => {
  const withoutTitle = html.replace(/<title>[\s\S]*?<\/title>/, "");
  const withoutMeta = withoutTitle
    .replace(/\s*<meta name="description"[\s\S]*?>/g, "")
    .replace(/\s*<meta name="robots"[\s\S]*?>/g, "")
    .replace(/\s*<link rel="canonical"[\s\S]*?>/g, "")
    .replace(/\s*<meta property="og:[\s\S]*?>/g, "")
    .replace(/\s*<meta name="twitter:[\s\S]*?>/g, "")
    .replace(/\s*<script id="route-jsonld"[\s\S]*?<\/script>/g, "");

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
    <lastmod>${route.lastmod}</lastmod>
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
Disallow: /admin
Disallow: /admin/
Disallow: /admin/login

Sitemap: ${canonicalOrigin}/sitemap.xml
`;

await writeFile(path.join(distDir, "robots.txt"), robots);
