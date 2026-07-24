import { useEffect } from "react";
import type { CaseStudy } from "@/content/caseStudies";
import { buildBreadcrumbJsonLd, setPageMetadata } from "@/lib/seo";

export const CaseStudySeo = ({ caseStudy }: { caseStudy: CaseStudy }) => {
  useEffect(() => {
    setPageMetadata({
      title: caseStudy.seo.title,
      description: caseStudy.seo.description,
      canonicalUrl: caseStudy.seo.canonicalUrl,
      imageUrl: caseStudy.seo.socialImage,
      type: "article",
      ogTitle: caseStudy.seo.ogTitle,
      ogDescription: caseStudy.seo.ogDescription,
      jsonLd: [
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
        buildBreadcrumbJsonLd([
          { name: "Home", item: "https://www.kenoye.site/" },
          { name: "Projects", item: "https://www.kenoye.site/#work" },
          { name: caseStudy.title, item: caseStudy.seo.canonicalUrl },
        ]),
      ],
    });
  }, [caseStudy]);

  return null;
};
