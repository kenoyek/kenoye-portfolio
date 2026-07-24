import { describe, expect, it } from "vitest";
import {
  caseStudies,
  getAdjacentCaseStudies,
  getCaseStudyBySlug,
  getCaseStudySectionLinks,
} from "@/content/caseStudies";

describe("case study content system", () => {
  it("publishes the required project case-study routes", () => {
    expect(getCaseStudyBySlug("asele")?.canonicalUrl).toBe("https://www.kenoye.site/projects/asele");
    expect(getCaseStudyBySlug("teacheasy")?.canonicalUrl).toBe("https://www.kenoye.site/projects/teacheasy");
    expect(getCaseStudyBySlug("reframe")?.canonicalUrl).toBe("https://www.kenoye.site/projects/reframe");
  });

  it("returns undefined for unavailable project slugs", () => {
    expect(getCaseStudyBySlug("learneasy-academy")).toBeUndefined();
    expect(getCaseStudyBySlug("not-a-project")).toBeUndefined();
  });

  it("keeps project metadata unique and canonical", () => {
    const urls = new Set(caseStudies.map((caseStudy) => caseStudy.seo.canonicalUrl));
    const titles = new Set(caseStudies.map((caseStudy) => caseStudy.seo.title));

    expect(urls.size).toBe(caseStudies.length);
    expect(titles.size).toBe(caseStudies.length);
    caseStudies.forEach((caseStudy) => {
      expect(caseStudy.seo.canonicalUrl).toBe(`https://www.kenoye.site/projects/${caseStudy.slug}`);
      expect(caseStudy.seo.description.length).toBeGreaterThan(80);
    });
  });

  it("filters optional sections without rendering empty anchors", () => {
    const reframe = getCaseStudyBySlug("reframe");
    expect(reframe).toBeDefined();

    const sectionLinks = getCaseStudySectionLinks(reframe!);
    expect(sectionLinks.map((section) => section.id)).toContain("architecture");
    expect(sectionLinks.map((section) => section.id)).toContain("current-status");
    expect(sectionLinks.map((section) => section.id)).not.toContain("privacy");
  });

  it("uses typed adjacent navigation in project order", () => {
    expect(getAdjacentCaseStudies("asele").previous).toBeUndefined();
    expect(getAdjacentCaseStudies("asele").next?.slug).toBe("teacheasy");
    expect(getAdjacentCaseStudies("teacheasy").previous?.slug).toBe("asele");
    expect(getAdjacentCaseStudies("teacheasy").next?.slug).toBe("reframe");
    expect(getAdjacentCaseStudies("reframe").next).toBeUndefined();
  });
});
