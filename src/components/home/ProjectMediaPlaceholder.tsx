import type { PortfolioProject } from "@/content/projects";
import { cn } from "@/lib/utils";

type ProjectMediaPlaceholderProps = {
  project: PortfolioProject;
  className?: string;
  label?: string;
};

export const ProjectMediaPlaceholder = ({ project, className, label = "Product evidence placeholder" }: ProjectMediaPlaceholderProps) => (
  <div
    className={cn(
      "relative overflow-hidden border border-border bg-surface text-foreground shadow-subtle",
      className,
    )}
    aria-label={`${project.title}: ${label}`}
  >
    <div className="absolute inset-x-0 top-0 h-px bg-border-strong" />
    <div className="grid h-full min-h-[280px] grid-rows-[auto_1fr_auto] p-5 sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <p className="text-metadata uppercase text-muted-foreground">{project.metadata?.productCategory || project.category[0]}</p>
        <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
      </div>
      <div className="flex flex-col justify-center py-10">
        <p className="max-w-sm text-section-title font-semibold leading-tight">{project.shortTitle || project.title}</p>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">{project.shortSummary}</p>
      </div>
      <div className="grid gap-2 border-t border-border pt-4 text-xs font-mono text-muted-foreground sm:grid-cols-2">
        {project.technologies.slice(0, 4).map((tech) => (
          <span key={tech}>{tech}</span>
        ))}
      </div>
    </div>
  </div>
);

