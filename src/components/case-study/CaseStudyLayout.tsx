import { ProjectFeatureTabs } from "@/components/projects/ProjectFeatureTabs";
import type { CaseStudy } from "@/content/caseStudies";
import { getCaseStudySectionLinks } from "@/content/caseStudies";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { CaseStudySeo } from "@/components/case-study/CaseStudySeo";
import {
  CaseStudyHero,
  CaseStudySection,
  CaseStudyTableOfContents,
} from "@/components/case-study/CaseStudyPrimitives";
import {
  ArchitectureDiagram,
  CaseStudyFooterNavigation,
  ChallengeResponse,
  DecisionList,
  ImplementationPhases,
  KeySystems,
  ProjectGallery,
  ProjectStatusSummary,
  RelatedProjects,
  ResponsibilityMatrix,
  TechnologySummary,
} from "@/components/case-study/CaseStudyDetailSections";

export const CaseStudyLayout = ({ caseStudy }: { caseStudy: CaseStudy }) => {
  const sectionLinks = getCaseStudySectionLinks(caseStudy);

  return (
    <main className="case-study-editorial overflow-x-clip bg-background">
      <CaseStudySeo caseStudy={caseStudy} />
      <Navbar />
      <CaseStudyHero caseStudy={caseStudy} />
      <div className="case-study-product">
        <h2 className="mb-6 text-2xl">Inside the product</h2>
        <ProjectFeatureTabs slug={caseStudy.slug} headingLevel="h3" />
      </div>
      <CaseStudyTableOfContents links={sectionLinks} />
      <TechnologySummary caseStudy={caseStudy} />
      <CaseStudySection section={caseStudy.overview} />
      <CaseStudySection section={caseStudy.productContext} tone="muted" />
      <CaseStudySection section={caseStudy.users} />
      <CaseStudySection section={caseStudy.inheritedContext} tone="muted" />
      <CaseStudySection section={caseStudy.teamContext} />
      <ResponsibilityMatrix caseStudy={caseStudy} />
      <CaseStudySection section={caseStudy.problem} tone="muted" />
      {caseStudy.constraints?.length ? (
        <CaseStudySection
          section={{
            id: "constraints",
            eyebrow: "Constraints",
            title: "Constraints that shaped the implementation",
            bullets: caseStudy.constraints,
          }}
        />
      ) : null}
      <ArchitectureDiagram architecture={caseStudy.architecture} />
      <KeySystems caseStudy={caseStudy} />
      <DecisionList caseStudy={caseStudy} />
      <ImplementationPhases caseStudy={caseStudy} />
      <ChallengeResponse caseStudy={caseStudy} />
      <CaseStudySection section={caseStudy.security} />
      <CaseStudySection section={caseStudy.privacy} tone="muted" />
      <CaseStudySection section={caseStudy.accessibility} />
      <CaseStudySection section={caseStudy.performance} tone="muted" />
      <CaseStudySection section={caseStudy.deployment} />
      <CaseStudySection section={caseStudy.outcomes} tone="muted" />
      <ProjectStatusSummary caseStudy={caseStudy} />
      <CaseStudySection section={caseStudy.lessons} />
      <ProjectGallery caseStudy={caseStudy} />
      <RelatedProjects caseStudy={caseStudy} />
      <CaseStudyFooterNavigation slug={caseStudy.slug} />
      <Footer />
      <BackToTop />
    </main>
  );
};
