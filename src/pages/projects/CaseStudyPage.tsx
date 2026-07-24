import { useParams } from "react-router-dom";
import { getCaseStudyBySlug } from "@/content/caseStudies";
import { CaseStudyLayout } from "@/components/case-study/CaseStudyLayout";
import NotFound from "@/pages/NotFound";

const CaseStudyPage = () => {
  const { slug } = useParams();
  const caseStudy = slug ? getCaseStudyBySlug(slug) : undefined;

  if (!caseStudy) {
    return <NotFound />;
  }

  return <CaseStudyLayout caseStudy={caseStudy} />;
};

export default CaseStudyPage;
