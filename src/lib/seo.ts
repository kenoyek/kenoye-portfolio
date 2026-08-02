import { siteConfig } from "@/content/site";

type JsonLd = Record<string, unknown> | Array<Record<string, unknown>>;

type PageMetadata = {
  title: string;
  description: string;
  canonicalUrl: string;
  imageUrl?: string;
  imageAlt?: string;
  type?: "website" | "article";
  ogTitle?: string;
  ogDescription?: string;
  robots?: string;
  jsonLd?: JsonLd;
};

const routeJsonLdId = "route-jsonld";

const absoluteSeoUrl = (url: string) => new URL(url, siteConfig.canonicalOrigin).toString();

const upsertMeta = (attribute: "name" | "property", key: string, content: string) => {
  let element = document.head.querySelector(
    `meta[${attribute}="${key}"]`,
  ) as HTMLMetaElement | null;

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
};

const upsertCanonical = (href: string) => {
  let element = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
};

const setRouteJsonLd = (jsonLd?: JsonLd) => {
  const existing = document.head.querySelector(`#${routeJsonLdId}`) as HTMLScriptElement | null;

  if (!jsonLd) {
    existing?.remove();
    return;
  }

  const element = existing ?? document.createElement("script");
  element.id = routeJsonLdId;
  element.type = "application/ld+json";
  element.textContent = JSON.stringify(jsonLd);

  if (!existing) {
    document.head.appendChild(element);
  }
};

export const setPageMetadata = ({
  title,
  description,
  canonicalUrl,
  imageUrl = "/og-home.svg",
  imageAlt,
  type = "website",
  ogTitle = title,
  ogDescription = description,
  robots = "index, follow",
  jsonLd,
}: PageMetadata) => {
  if (typeof document === "undefined") return;

  const image = absoluteSeoUrl(imageUrl);
  const socialImageAlt = imageAlt || `${ogTitle} social preview image`;

  document.title = title;
  upsertMeta("name", "description", description);
  upsertMeta("name", "robots", robots);
  upsertCanonical(canonicalUrl);

  upsertMeta("property", "og:site_name", siteConfig.name);
  upsertMeta("property", "og:type", type);
  upsertMeta("property", "og:url", canonicalUrl);
  upsertMeta("property", "og:title", ogTitle);
  upsertMeta("property", "og:description", ogDescription);
  upsertMeta("property", "og:image", image);
  upsertMeta("property", "og:image:width", "1200");
  upsertMeta("property", "og:image:height", "630");
  upsertMeta("property", "og:image:alt", socialImageAlt);

  upsertMeta("name", "twitter:card", "summary_large_image");
  upsertMeta("name", "twitter:title", ogTitle);
  upsertMeta("name", "twitter:description", ogDescription);
  upsertMeta("name", "twitter:image", image);
  upsertMeta("name", "twitter:image:alt", socialImageAlt);

  setRouteJsonLd(jsonLd);
};

export const buildBreadcrumbJsonLd = (items: Array<{ name: string; item: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.item,
  })),
});

export const buildBlogIndexJsonLd = () => [
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Blog | Okagua Kenoye",
    description:
      "Software architecture, product engineering, education technology, health technology, and full-stack development notes from Okagua Kenoye.",
    url: `${siteConfig.canonicalOrigin}/blog`,
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: `${siteConfig.canonicalOrigin}/`,
    },
  },
  buildBreadcrumbJsonLd([
    { name: "Home", item: `${siteConfig.canonicalOrigin}/` },
    { name: "Blog", item: `${siteConfig.canonicalOrigin}/blog` },
  ]),
];

export const buildBlogPostJsonLd = (post: {
  title: string;
  description: string;
  url: string;
  image?: string | null;
  publishedAt: string;
  updatedAt: string;
  authorName: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: post.title,
  description: post.description,
  url: post.url,
  image: post.image ? absoluteSeoUrl(post.image) : undefined,
  datePublished: post.publishedAt,
  dateModified: post.updatedAt,
  author: { "@type": "Person", name: post.authorName },
  publisher: {
    "@type": "Person",
    name: siteConfig.name,
    url: `${siteConfig.canonicalOrigin}/`,
  },
});
