import { ArrowUpRight, BookOpen, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import type { PortfolioProject } from "@/content/projects";
import { ProjectStatus } from "@/components/projects/ProjectStatus";
import { ProjectTechnologyList } from "@/components/projects/ProjectTechnologyList";

type ProjectPreviewProps = {
  project: PortfolioProject;
  emphasis?: "standard" | "quiet";
};

const getCaseStudyLink = (project: PortfolioProject) =>
  project.links?.find((link) => link.kind === "case-study");

const getLiveLink = (project: PortfolioProject) =>
  project.links?.find((link) => link.kind === "live" || link.kind === "external");

export const ProjectPreview = ({ project, emphasis = "standard" }: ProjectPreviewProps) => {
  const caseStudy = getCaseStudyLink(project);
  const live = getLiveLink(project);

  return (
    <article className="group border-t border-border py-7 first:border-t-0">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
        <div>
          <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2">
            <ProjectStatus status={project.projectStatus} />
            <span className="text-muted-foreground" aria-hidden="true">/</span>
            <p className="text-metadata uppercase text-muted-foreground">{project.metadata?.productCategory || project.category.join(" / ")}</p>
          </div>
          <h3 className={emphasis === "standard" ? "text-2xl font-semibold text-foreground" : "text-xl font-semibold text-foreground"}>
            {project.title}
          </h3>
          <p className="mt-3 max-w-2xl text-body-small text-muted-foreground">{project.shortSummary}</p>
          <ProjectTechnologyList technologies={project.technologies.slice(0, 5)} className="mt-4" />
        </div>
        <div className="space-y-4 lg:text-right">
          <p className="text-sm font-medium text-foreground">{project.role}</p>
          <p className="text-sm text-muted-foreground">{project.outcomes?.[0]?.label || project.platforms?.join(" / ")}</p>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            {caseStudy ? (
              <Link
                to={caseStudy.href}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-accent underline-offset-4 hover:underline"
              >
                <BookOpen size={15} /> {caseStudy.label}
              </Link>
            ) : null}
            {live ? (
              <a
                href={live.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-accent underline-offset-4 hover:underline"
              >
                <ExternalLink size={15} /> {live.label}
              </a>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                Details on request <ArrowUpRight size={15} />
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

