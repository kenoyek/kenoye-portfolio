import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ProjectEvidence } from "@/components/home/ProjectEvidence";
import { ProjectMediaPlaceholder } from "@/components/home/ProjectMediaPlaceholder";
import { getProjectBySlug } from "@/content/projects";

const asele = getProjectBySlug("asele");

export const FeaturedAsele = () => {
  if (!asele) return null;

  return (
    <Section className="border-y border-border bg-surface">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)] lg:items-center">
          <div>
            <p className="mb-3 text-metadata uppercase text-accent">Flagship project</p>
            <h2 className="text-page-title font-semibold text-foreground">{asele.title}</h2>
            <p className="mt-5 max-w-2xl text-body-large text-muted-foreground">{asele.summary}</p>

            <div className="mt-8 border-y border-border py-6">
              <ProjectEvidence project={asele} variant="featured" />
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold text-foreground">Engineering challenge</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Build a wellness platform around sensitive personal context while supporting mobile delivery, notifications, authentication, multilingual flows, AI-assisted briefs, and administrative operations.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">Production boundary</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  The product supports wellness tracking and briefs; it is not positioned as medical diagnosis or clinical approval.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {asele.links?.filter((link) => link.kind !== "case-study").map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center rounded-md bg-accent px-5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
                >
                  {link.label} <ArrowRight className="ml-2" size={16} />
                </a>
              ))}
              <Link
                to="/projects/asele"
                className="inline-flex min-h-11 items-center rounded-md border border-border px-5 text-sm font-medium text-foreground transition-colors hover:border-accent/60 hover:text-accent"
              >
                Read case study <ArrowRight className="ml-2" size={16} />
              </Link>
            </div>
          </div>

          <ProjectMediaPlaceholder
            project={asele}
            className="min-h-[420px] rounded-lg"
            label="replace with verified Asele product screenshots"
          />
        </div>
      </Container>
    </Section>
  );
};
