import type { CaseStudyStatusState } from "@/content/caseStudies";
import { caseStudyStatusLabels } from "@/lib/caseStudyStatus";
import { cn } from "@/lib/utils";

const statusClasses: Record<CaseStudyStatusState, string> = {
  implemented: "border-success/40 bg-success/10 text-success",
  "in-progress": "border-warning/50 bg-warning/10 text-warning-foreground dark:text-warning",
  planned: "border-border bg-muted text-muted-foreground",
  deferred: "border-border bg-muted text-muted-foreground",
  private: "border-border bg-muted text-muted-foreground",
  available: "border-accent/40 bg-accent/10 text-accent",
};

type CaseStudyStatusProps = {
  state: CaseStudyStatusState;
  className?: string;
};

export const CaseStudyStatus = ({ state, className }: CaseStudyStatusProps) => (
  <span
    className={cn(
      "inline-flex w-fit items-center rounded-md border px-2.5 py-1 text-xs font-medium",
      statusClasses[state],
      className,
    )}
  >
    {caseStudyStatusLabels[state]}
  </span>
);
