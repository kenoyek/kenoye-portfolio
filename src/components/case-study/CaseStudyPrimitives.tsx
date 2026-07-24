import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { CaseStudy, CaseStudyTextSection } from "@/content/caseStudies";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { cn } from "@/lib/utils";

type CaseStudyBreadcrumbsProps = {
  title: string;
};

export const CaseStudyBreadcrumbs = ({ title }: CaseStudyBreadcrumbsProps) => (
  <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground">
    <ol className="flex flex-wrap items-center gap-2">
      <li>
        <Link to="/" className="hover:text-foreground">
          Home
        </Link>
      </li>
      <li aria-hidden="true">/</li>
      <li>
        <Link to="/#work" className="hover:text-foreground">
          Work
        </Link>
      </li>
      <li aria-hidden="true">/</li>
      <li aria-current="page" className="text-foreground">
        {title}
      </li>
    </ol>
  </nav>
);

export const CaseStudyHero = ({ caseStudy }: { caseStudy: CaseStudy }) => (
  <Section className="pt-28 sm:pt-32">
    <Container>
      <CaseStudyBreadcrumbs title={caseStudy.shortTitle} />
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
        <div>
          {caseStudy.hero.eyebrow && (
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              {caseStudy.hero.eyebrow}
            </p>
          )}
          <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-normal text-foreground sm:text-5xl lg:text-6xl">
            {caseStudy.hero.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {caseStudy.hero.summary}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {caseStudy.liveUrl && (
              <a
                href={caseStudy.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
              >
                Visit product
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            )}
            <Link
              to="/#work"
              className="inline-flex items-center rounded-md border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-accent/50 hover:text-accent"
            >
              Back to selected work
            </Link>
          </div>
        </div>
        <CaseStudyMeta caseStudy={caseStudy} />
      </div>
      {caseStudy.hero.primaryMediaNote && (
        <p className="mt-10 max-w-3xl border-l-2 border-accent/50 pl-4 text-sm leading-relaxed text-muted-foreground">
          {caseStudy.hero.primaryMediaNote}
        </p>
      )}
    </Container>
  </Section>
);

export const CaseStudyMeta = ({ caseStudy }: { caseStudy: CaseStudy }) => {
  const rows = [
    ["Project", caseStudy.title],
    ["Category", caseStudy.productCategory],
    ["Role", caseStudy.role],
    ["Status", caseStudy.projectStatus],
    ["Platforms", caseStudy.platforms.join(", ")],
    ["Reviewed", caseStudy.lastReviewed],
  ].filter(([, value]) => Boolean(value));

  return (
    <aside className="border-y border-border py-5 lg:border-l lg:border-y-0 lg:py-0 lg:pl-6" aria-label="Project metadata">
      <dl className="space-y-4">
        {rows.map(([label, value]) => (
          <div key={label}>
            <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{label}</dt>
            <dd className="mt-1 text-sm leading-relaxed text-foreground">{value}</dd>
          </div>
        ))}
      </dl>
      {caseStudy.confidentiality && (
        <p className="mt-5 rounded-md border border-border bg-muted/50 p-3 text-xs leading-relaxed text-muted-foreground">
          {caseStudy.confidentiality}
        </p>
      )}
    </aside>
  );
};

type CaseStudySectionProps = {
  section?: CaseStudyTextSection;
  children?: ReactNode;
  tone?: "default" | "muted";
  className?: string;
};

export const CaseStudySection = ({ section, children, tone = "default", className }: CaseStudySectionProps) => {
  if (!section && !children) return null;

  return (
    <Section id={section?.id} tone={tone} className={className}>
      <Container>
        {section && (
          <div className="max-w-3xl">
            {section.eyebrow && (
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent">{section.eyebrow}</p>
            )}
            <h2 className="text-2xl font-bold tracking-normal text-foreground sm:text-3xl">{section.title}</h2>
            {section.lead && <p className="mt-4 text-lg leading-relaxed text-foreground/85">{section.lead}</p>}
            {section.body?.map((paragraph) => (
              <p key={paragraph} className="mt-4 leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
            {section.bullets?.length ? (
              <ul className="mt-5 space-y-2 text-muted-foreground">
                {section.bullets.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        )}
        {children}
      </Container>
    </Section>
  );
};

export const CaseStudyLead = ({ children, className }: { children: ReactNode; className?: string }) => (
  <p className={cn("max-w-3xl text-lg leading-relaxed text-foreground/85", className)}>{children}</p>
);

export const CaseStudyTableOfContents = ({ links }: { links: Array<{ id: string; title: string }> }) => {
  if (!links.length) return null;

  return (
    <Section className="py-8 sm:py-10" tone="muted">
      <Container>
        <nav aria-label="Case study sections" className="flex flex-col gap-3 sm:flex-row sm:items-start">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground sm:w-40">
            Contents
          </p>
          <ol className="grid flex-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {links.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className="inline-flex rounded-md px-1 py-1 text-sm text-foreground hover:text-accent focus-visible:outline-offset-2"
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </Container>
    </Section>
  );
};

export const PillList = ({ items, label }: { items?: string[]; label: string }) => {
  if (!items?.length) return null;

  return (
    <div aria-label={label} className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span key={item} className="rounded-md border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground">
          {item}
        </span>
      ))}
    </div>
  );
};
