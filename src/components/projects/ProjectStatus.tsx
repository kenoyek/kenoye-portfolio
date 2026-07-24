import type { ProjectStatus as ProjectStatusValue } from "@/content/projects";

const labels: Record<ProjectStatusValue, string> = {
  live: "Live",
  private: "Private",
  "in-progress": "In progress",
  "case-study": "Case study",
  "available-on-request": "Available on request",
  experimental: "Experimental",
  archived: "Archived",
};

type ProjectStatusProps = {
  status: ProjectStatusValue;
};

export const ProjectStatus = ({ status }: ProjectStatusProps) => (
  <span className="text-xs uppercase tracking-wider text-muted-foreground">{labels[status]}</span>
);
