import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import type { PortfolioProject } from "@/content/projects";
import { ProjectStatus } from "@/components/projects/ProjectStatus";
import { ProjectTechnologyList } from "@/components/projects/ProjectTechnologyList";
import { fadeUp, inViewProps } from "@/lib/animations";

type Emphasis = "featured" | "standard" | "quiet";

type ProjectPreviewProps = {
  project: PortfolioProject;
  emphasis?: Emphasis;
};

const getCaseStudyLink = (project: PortfolioProject) =>
  project.links?.find((link) => link.kind === "case-study");

const getLiveLink = (project: PortfolioProject) =>
  project.links?.find((link) => link.kind === "live" || link.kind === "external");

const titleClass: Record<Emphasis, string> = {
  featured: "text-3xl font-semibold text-foreground sm:text-4xl",
  standard: "text-2xl font-semibold text-foreground",
  quiet: "text-xl font-semibold text-foreground",
};

export const ProjectPreview = ({ project, emphasis = "standard" }: ProjectPreviewProps) => {
  const caseStudy = getCaseStudyLink(project);
  const live = getLiveLink(project);
  const isFeatured = emphasis === "featured";
  const outcomeLimit = isFeatured ? 4 : 3;
  const visibleOutcomes = project.outcomes?.slice(0, outcomeLimit) ?? [];

  return (
    <motion.article
      variants={fadeUp}
      {...inViewProps}
      className={`group border-t border-border py-7 first:border-t-0 ${isFeatured ? "pb-10 pt-8" : ""}`}
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
        <div>
          <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2">
            <ProjectStatus status={project.projectStatus} />
            <span className="text-muted-foreground" aria-hidden="true">/</span>
            <p className="text-metadata uppercase text-muted-foreground">
              {project.metadata?.productCategory || project.category.join(" · ")}
            </p>
            {project.platforms && project.platforms.length > 1 && (
              <>
                <span className="text-muted-foreground" aria-hidden="true">/</span>
                <p className="text-metadata uppercase text-accent">
                  {project.platforms.join(" · ")}
                </p>
              </>
            )}
          </div>

          <h3 className={titleClass[emphasis]}>{project.title}</h3>

          <p className="mt-3 max-w-2xl text-body-small leading-relaxed text-muted-foreground">
            {project.summary}
          </p>

          {visibleOutcomes.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-2" role="list" aria-label={`${project.title} engineering outcomes`}>
              {visibleOutcomes.map((outcome) => (
                <li
                  key={outcome.label}
                  className="max-w-full rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium leading-relaxed text-foreground"
                >
                  {outcome.label}
                </li>
              ))}
            </ul>
          )}

          <ProjectTechnologyList technologies={project.technologies.slice(0, 5)} className="mt-4" />
        </div>

        <div className="space-y-4 lg:text-right">
          <p className="text-sm font-medium text-foreground">{project.role}</p>
          {project.timeframe && (
            <p className="text-sm text-muted-foreground">{project.timeframe}</p>
          )}
          <div className="flex flex-wrap gap-3 lg:justify-end">
            {caseStudy ? (
              <Link
                to={caseStudy.href}
                className="inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-accent underline-offset-4 transition-all hover:gap-2.5 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                <BookOpen size={15} aria-hidden="true" /> {caseStudy.label}
              </Link>
            ) : null}
            {live ? (
              <a
                href={live.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-accent underline-offset-4 transition-all hover:gap-2.5 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                <ExternalLink size={15} aria-hidden="true" /> {live.label}
              </a>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                Details on request <ArrowUpRight size={15} aria-hidden="true" />
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
};
