import type { PortfolioProject } from "@/content/projects";
import { cn } from "@/lib/utils";

type ProjectEvidenceProps = {
  project: PortfolioProject;
  variant?: "compact" | "featured";
};

export const ProjectEvidence = ({ project, variant = "compact" }: ProjectEvidenceProps) => {
  const outcomes = project.outcomes?.slice(0, variant === "featured" ? 4 : 2) || [];

  return (
    <dl className={cn("grid gap-4", variant === "featured" ? "sm:grid-cols-2" : "sm:grid-cols-2")}>
      <div>
        <dt className="text-metadata uppercase text-muted-foreground">Role</dt>
        <dd className="mt-1 text-sm font-medium text-foreground">{project.role}</dd>
      </div>
      {project.platforms?.length ? (
        <div>
          <dt className="text-metadata uppercase text-muted-foreground">Platforms</dt>
          <dd className="mt-1 text-sm font-medium text-foreground">{project.platforms.join(" / ")}</dd>
        </div>
      ) : null}
      {outcomes.map((outcome) => (
        <div key={outcome.label} className={variant === "featured" ? "" : "sm:col-span-2"}>
          <dt className="text-metadata uppercase text-muted-foreground">Outcome</dt>
          <dd className="mt-1 text-sm font-medium text-foreground">{outcome.label}</dd>
        </div>
      ))}
    </dl>
  );
};

