import { ExternalLink, LockKeyhole } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { ProjectStatus } from "@/components/projects/ProjectStatus";
import { ProjectTechnologyList } from "@/components/projects/ProjectTechnologyList";
import { additionalProjects } from "@/content/projects";
import type { ProjectLink } from "@/content/projects";

const getPrimaryExternalLink = (links: ProjectLink[] | undefined) =>
  links?.find(
    (link) => link.kind === "live" || link.kind === "repository" || link.kind === "external",
  );

export const AdditionalProjects = () => (
  <Section id="additional-work" className="pt-0">
    <Container>
      <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
        <SectionHeader
          eyebrow="More engineering work"
          title="Smaller builds, teaching tools, and client delivery."
          description="A selection of products, internal tools, educational platforms, and client work spanning e-commerce, coding education, and developer tooling."
          className="lg:self-start"
        />

        <div className="border-y border-border">
          {additionalProjects.map((project) => {
            const external = getPrimaryExternalLink(project.links);

            return (
              <article key={project.slug} className="border-t border-border py-5 first:border-t-0">
                <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_180px] md:items-start">
                  <div>
                    <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                      <ProjectStatus status={project.projectStatus} />
                      <span className="text-muted-foreground" aria-hidden="true">
                        /
                      </span>
                      <p className="text-metadata uppercase text-muted-foreground">
                        {project.metadata?.productCategory || project.category.join(" / ")}
                      </p>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                      {project.shortSummary}
                    </p>
                    <ProjectTechnologyList
                      technologies={project.technologies.slice(0, 4)}
                      className="mt-3"
                    />
                  </div>

                  <div className="space-y-3 md:text-right">
                    <p className="text-sm font-medium text-foreground">{project.role}</p>
                    {external ? (
                      <a
                        href={external.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-accent underline-offset-4 hover:underline"
                      >
                        <ExternalLink size={15} /> {external.label}
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                        <LockKeyhole size={15} /> Details on request
                      </span>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </Container>
  </Section>
);
