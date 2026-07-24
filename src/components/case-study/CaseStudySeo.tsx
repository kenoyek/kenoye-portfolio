import { useEffect } from "react";
import type { CaseStudy } from "@/content/caseStudies";

const setMeta = (selector: string, attributes: Record<string, string>) => {
  let element = document.head.querySelector(selector) as HTMLMetaElement | null;

  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element?.setAttribute(key, value);
  });
};

export const CaseStudySeo = ({ caseStudy }: { caseStudy: CaseStudy }) => {
  useEffect(() => {
    document.title = caseStudy.seo.title;

    setMeta('meta[name="description"]', {
      name: "description",
      content: caseStudy.seo.description,
    });
    setMeta('meta[property="og:title"]', {
      property: "og:title",
      content: caseStudy.seo.ogTitle,
    });
    setMeta('meta[property="og:description"]', {
      property: "og:description",
      content: caseStudy.seo.ogDescription,
    });
    setMeta('meta[property="og:url"]', {
      property: "og:url",
      content: caseStudy.seo.ogUrl,
    });
    setMeta('meta[property="og:type"]', {
      property: "og:type",
      content: "article",
    });
    setMeta('meta[property="og:image"]', {
      property: "og:image",
      content: caseStudy.seo.socialImage ?? "/favicon.png",
    });
    setMeta('meta[property="og:image:width"]', {
      property: "og:image:width",
      content: "1200",
    });
    setMeta('meta[property="og:image:height"]', {
      property: "og:image:height",
      content: "630",
    });
    setMeta('meta[name="twitter:title"]', {
      name: "twitter:title",
      content: caseStudy.seo.ogTitle,
    });
    setMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: caseStudy.seo.ogDescription,
    });
    setMeta('meta[name="twitter:image"]', {
      name: "twitter:image",
      content: caseStudy.seo.socialImage ?? "/favicon.png",
    });

    let canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", caseStudy.seo.canonicalUrl);

    let jsonLd = document.head.querySelector("#case-study-jsonld") as HTMLScriptElement | null;
    if (!jsonLd) {
      jsonLd = document.createElement("script");
      jsonLd.id = "case-study-jsonld";
      jsonLd.type = "application/ld+json";
      document.head.appendChild(jsonLd);
    }

    jsonLd.textContent = JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: caseStudy.seo.ogTitle,
        description: caseStudy.seo.description,
        url: caseStudy.seo.canonicalUrl,
        author: {
          "@type": "Person",
          name: "Okagua Kenoye",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: caseStudy.title,
        description: caseStudy.summary,
        url: caseStudy.seo.canonicalUrl,
        creator: {
          "@type": "Person",
          name: "Okagua Kenoye",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.kenoye.site/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Projects",
            item: "https://www.kenoye.site/#work",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: caseStudy.title,
            item: caseStudy.seo.canonicalUrl,
          },
        ],
      },
    ]);
  }, [caseStudy]);

  return null;
};
