import type { CaseStudyStatusState } from "@/content/caseStudies";

export const caseStudyStatusLabels: Record<CaseStudyStatusState, string> = {
  implemented: "Implemented",
  "in-progress": "In progress",
  planned: "Planned",
  deferred: "Deferred",
  private: "Private",
  available: "Available",
};

export const caseStudyStatusLabel = (state: CaseStudyStatusState) => caseStudyStatusLabels[state];
