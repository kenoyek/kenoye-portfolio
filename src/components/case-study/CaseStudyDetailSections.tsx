import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import {
  caseStudyNavigation,
  getAdjacentCaseStudies,
  getCaseStudyBySlug,
  type CaseStudy,
  type CaseStudyArchitecture,
  type CaseStudyMediaItem,
} from "@/content/caseStudies";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { CaseStudyStatus } from "@/components/case-study/CaseStudyStatus";
import { PillList } from "@/components/case-study/CaseStudyPrimitives";
import { caseStudyStatusLabel } from "@/lib/caseStudyStatus";

export const ResponsibilityMatrix = ({ caseStudy }: { caseStudy: CaseStudy }) => {
  if (!caseStudy.responsibilities?.length) return null;

  return (
    <Section id="ownership">
      <Container>
        <div className="max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent">Scope</p>
          <h2 className="text-2xl font-bold tracking-normal text-foreground sm:text-3xl">Role and ownership</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            This section separates personal ownership from inherited systems, team context, integrations, planned work,
            and in-progress work.
          </p>
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {caseStudy.responsibilities.map((group) => (
            <section key={group.label} aria-labelledby={`${caseStudy.slug}-${group.label}`}>
              <h3 id={`${caseStudy.slug}-${group.label}`} className="text-sm font-semibold uppercase tracking-[0.16em] text-foreground">
                {group.label}
              </h3>
              <ul className="mt-4 space-y-3 border-l border-border pl-4 text-sm leading-relaxed text-muted-foreground">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export const ProjectStatusSummary = ({ caseStudy }: { caseStudy: CaseStudy }) => {
  if (!caseStudy.currentStatus?.length) return null;

  return (
    <Section id="current-status" tone="muted">
      <Container>
        <div className="max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent">Status</p>
          <h2 className="text-2xl font-bold tracking-normal text-foreground sm:text-3xl">Current status</h2>
        </div>
        <div className="mt-8 divide-y divide-border border-y border-border">
          {caseStudy.currentStatus.map((item) => (
            <div key={item.label} className="grid gap-3 py-4 sm:grid-cols-[180px_minmax(0,1fr)] sm:items-start">
              <CaseStudyStatus state={item.state} />
              <div>
                <h3 className="font-semibold text-foreground">{item.label}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.detail ?? caseStudyStatusLabel(item.state)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export const ArchitectureDiagram = ({ architecture }: { architecture?: CaseStudyArchitecture }) => {
  if (!architecture) return null;

  return (
    <Section id="architecture" tone="muted">
      <Container>
        <div className="max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent">Architecture</p>
          <h2 className="text-2xl font-bold tracking-normal text-foreground sm:text-3xl">{architecture.title}</h2>
          {architecture.lead && <p className="mt-4 leading-relaxed text-muted-foreground">{architecture.lead}</p>}
        </div>
        <figure className="mt-8">
          <div
            role="img"
            aria-label={`${architecture.title}. Connections are listed after the diagram.`}
            className="grid gap-4 rounded-md border border-border bg-background p-4 sm:p-6 lg:grid-cols-3"
          >
            {architecture.nodes.map((node) => (
              <div key={node.id} className="border-l-2 border-accent/60 bg-muted/35 p-4">
                {node.group && (
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    {node.group}
                  </p>
                )}
                <h3 className="text-base font-semibold text-foreground">{node.label}</h3>
                {node.detail && <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{node.detail}</p>}
              </div>
            ))}
          </div>
          <figcaption className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Lightweight HTML architecture diagram. It is readable in print, works without animation, and includes the
            connection list below for screen readers and narrow screens.
          </figcaption>
        </figure>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <section>
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-foreground">Connections</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {architecture.connections.map((connection) => (
                <li key={`${connection.from}-${connection.to}-${connection.label}`}>
                  <span className="font-medium text-foreground">{connection.from}</span>
                  {" -> "}
                  <span className="font-medium text-foreground">{connection.to}</span>
                  {connection.label && <span> - {connection.label}</span>}
                </li>
              ))}
            </ul>
          </section>
          {architecture.notes?.length ? (
            <section>
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-foreground">Notes</h3>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {architecture.notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      </Container>
    </Section>
  );
};

export const KeySystems = ({ caseStudy }: { caseStudy: CaseStudy }) => {
  if (!caseStudy.keySystems?.length) return null;

  return (
    <Section id="key-systems">
      <Container>
        <div className="max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent">Systems</p>
          <h2 className="text-2xl font-bold tracking-normal text-foreground sm:text-3xl">Key systems delivered</h2>
        </div>
        <div className="mt-8 grid gap-7 md:grid-cols-2">
          {caseStudy.keySystems.map((system) => (
            <section key={system.id} id={system.id} className="border-t border-border pt-5">
              <h3 className="text-lg font-semibold text-foreground">{system.title}</h3>
              {system.body?.map((paragraph) => (
                <p key={paragraph} className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              ))}
              {system.bullets?.length ? (
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {system.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export const DecisionList = ({ caseStudy }: { caseStudy: CaseStudy }) => {
  if (!caseStudy.technicalDecisions?.length) return null;

  return (
    <Section id="technical-decisions" tone="muted">
      <Container>
        <div className="max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent">Decisions</p>
          <h2 className="text-2xl font-bold tracking-normal text-foreground sm:text-3xl">Technical decisions and trade-offs</h2>
        </div>
        <div className="mt-8 space-y-8">
          {caseStudy.technicalDecisions.map((decision) => (
            <article key={decision.title} className="border-t border-border pt-6">
              <h3 className="text-xl font-semibold text-foreground">{decision.title}</h3>
              <dl className="mt-4 grid gap-4 text-sm leading-relaxed text-muted-foreground lg:grid-cols-2">
                <div>
                  <dt className="font-semibold text-foreground">Context</dt>
                  <dd className="mt-1">{decision.context}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-foreground">Decision</dt>
                  <dd className="mt-1">{decision.decision}</dd>
                </div>
                {decision.alternatives?.length ? (
                  <div>
                    <dt className="font-semibold text-foreground">Alternatives considered</dt>
                    <dd className="mt-1">{decision.alternatives.join(", ")}</dd>
                  </div>
                ) : null}
                {decision.result && (
                  <div>
                    <dt className="font-semibold text-foreground">Result</dt>
                    <dd className="mt-1">{decision.result}</dd>
                  </div>
                )}
                {decision.limitation && (
                  <div>
                    <dt className="font-semibold text-foreground">Current limitation</dt>
                    <dd className="mt-1">{decision.limitation}</dd>
                  </div>
                )}
              </dl>
              {decision.tradeoffs?.length ? (
                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-foreground">Trade-offs</h4>
                  <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                    {decision.tradeoffs.map((tradeoff) => (
                      <li key={tradeoff}>{tradeoff}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export const ImplementationPhases = ({ caseStudy }: { caseStudy: CaseStudy }) => {
  if (!caseStudy.implementationPhases?.length) return null;

  return (
    <Section id="implementation">
      <Container>
        <div className="max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent">Process</p>
          <h2 className="text-2xl font-bold tracking-normal text-foreground sm:text-3xl">Implementation phases</h2>
        </div>
        <div className="mt-8 divide-y divide-border border-y border-border">
          {caseStudy.implementationPhases.map((phase) => (
            <section key={phase.title} className="grid gap-4 py-5 lg:grid-cols-[220px_minmax(0,1fr)]">
              <div>
                <h3 className="font-semibold text-foreground">{phase.title}</h3>
                {phase.status && <CaseStudyStatus state={phase.status} className="mt-3" />}
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {phase.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export const ChallengeResponse = ({ caseStudy }: { caseStudy: CaseStudy }) => {
  if (!caseStudy.challenges?.length) return null;

  return (
    <Section id="challenges" tone="muted">
      <Container>
        <div className="max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent">Challenges</p>
          <h2 className="text-2xl font-bold tracking-normal text-foreground sm:text-3xl">Engineering challenges</h2>
        </div>
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          {caseStudy.challenges.map((challenge) => (
            <article key={challenge.title} className="border-t border-border pt-5">
              <h3 className="text-lg font-semibold text-foreground">{challenge.title}</h3>
              <dl className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
                <div>
                  <dt className="font-semibold text-foreground">Why it mattered</dt>
                  <dd className="mt-1">{challenge.whyItMattered}</dd>
                </div>
                {challenge.constraints?.length ? (
                  <div>
                    <dt className="font-semibold text-foreground">Constraints</dt>
                    <dd className="mt-1">{challenge.constraints.join(" ")}</dd>
                  </div>
                ) : null}
                <div>
                  <dt className="font-semibold text-foreground">Response</dt>
                  <dd className="mt-1">{challenge.response}</dd>
                </div>
                {challenge.result && (
                  <div>
                    <dt className="font-semibold text-foreground">Result</dt>
                    <dd className="mt-1">{challenge.result}</dd>
                  </div>
                )}
                {challenge.remainingLimitation && (
                  <div>
                    <dt className="font-semibold text-foreground">Remaining limitation</dt>
                    <dd className="mt-1">{challenge.remainingLimitation}</dd>
                  </div>
                )}
              </dl>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
};

const MediaFigure = ({ item }: { item: CaseStudyMediaItem }) => {
  if (!item.src) return null;

  return (
    <figure className="border-t border-border pt-4">
      <img
        src={item.src}
        alt={item.alt ?? item.label}
        width={item.width}
        height={item.height}
        loading="lazy"
        className="w-full rounded-md border border-border object-cover"
      />
      {item.caption && <figcaption className="mt-2 text-sm text-muted-foreground">{item.caption}</figcaption>}
    </figure>
  );
};

export const ProjectGallery = ({ caseStudy }: { caseStudy: CaseStudy }) => {
  const media = caseStudy.gallery?.filter((item) => item.src) ?? [];

  if (!media.length && !caseStudy.mediaRequirements?.length) return null;

  return (
    <Section id="media">
      <Container>
        <div className="max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent">Media</p>
          <h2 className="text-2xl font-bold tracking-normal text-foreground sm:text-3xl">Gallery and product media</h2>
          {!media.length && (
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Verified product media is not available in this repository yet, so this page does not render simulated
              screenshots. The required assets are documented below for later insertion.
            </p>
          )}
        </div>
        {media.length ? (
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {media.map((item) => (
              <MediaFigure key={item.label} item={item} />
            ))}
          </div>
        ) : null}
        {caseStudy.mediaRequirements?.length ? (
          <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
            {caseStudy.mediaRequirements.map((requirement) => (
              <li key={requirement}>{requirement}</li>
            ))}
          </ul>
        ) : null}
      </Container>
    </Section>
  );
};

export const RelatedProjects = ({ caseStudy }: { caseStudy: CaseStudy }) => {
  const related = caseStudy.relatedProjects
    ?.map((item) => {
      const project = getCaseStudyBySlug(item.slug);
      return project ? { ...item, project } : null;
    })
    .filter(Boolean);

  if (!related?.length) return null;

  return (
    <Section id="related-work" tone="muted" className="py-12 sm:py-16">
      <Container>
        <h2 className="text-xl font-semibold text-foreground">Related work</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {related.map((item) => (
            <Link
              key={item!.slug}
              to={`/projects/${item!.slug}`}
              className="group border-t border-border pt-4 text-sm transition-colors hover:border-accent"
            >
              <span className="font-semibold text-foreground group-hover:text-accent">{item!.project.title}</span>
              {item!.reason && <p className="mt-2 leading-relaxed text-muted-foreground">{item!.reason}</p>}
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export const CaseStudyFooterNavigation = ({ slug }: { slug: string }) => {
  const { previous, next } = getAdjacentCaseStudies(slug);

  return (
    <Section className="py-10 sm:py-12">
      <Container>
        <nav aria-label="Project navigation" className="grid gap-3 sm:grid-cols-3">
          <Link
            to="/#work"
            className="inline-flex items-center justify-center rounded-md border border-border px-4 py-3 text-sm font-semibold text-foreground hover:border-accent/60 hover:text-accent"
          >
            Back to selected work
          </Link>
          {previous ? (
            <Link
              to={`/projects/${previous.slug}`}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-border px-4 py-3 text-sm font-semibold text-foreground hover:border-accent/60 hover:text-accent"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              Previous: {previous.shortTitle}
            </Link>
          ) : (
            <span aria-hidden="true" />
          )}
          {next ? (
            <Link
              to={`/projects/${next.slug}`}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-border px-4 py-3 text-sm font-semibold text-foreground hover:border-accent/60 hover:text-accent"
            >
              Next: {next.shortTitle}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          ) : (
            <span aria-hidden="true" />
          )}
        </nav>
        <div className="mt-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Available case studies</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {caseStudyNavigation.map((item) => (
              <Link
                key={item.slug}
                to={item.href}
                className="rounded-md border border-border px-3 py-1.5 text-sm text-muted-foreground hover:border-accent/60 hover:text-accent"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};

export const ProjectLinks = ({ caseStudy }: { caseStudy: CaseStudy }) => {
  if (!caseStudy.links?.length) return null;

  return (
    <div className="mt-6">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Project links</p>
      <div className="flex flex-wrap gap-2">
        {caseStudy.links.map((link) => {
          const isExternal = link.href.startsWith("http");
          const classes =
            "inline-flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-sm text-foreground hover:border-accent/60 hover:text-accent";

          return isExternal ? (
            <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className={classes}>
              {link.label}
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          ) : (
            <Link key={link.href} to={link.href} className={classes}>
              {link.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export const TechnologySummary = ({ caseStudy }: { caseStudy: CaseStudy }) => (
  <Section className="py-10 sm:py-12" tone="muted">
    <Container>
      <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Technology</p>
          <h2 className="mt-2 text-xl font-semibold text-foreground">Stack and platforms</h2>
        </div>
        <div className="space-y-4">
          <PillList items={caseStudy.platforms} label="Platforms" />
          <PillList items={caseStudy.technologies} label="Technologies" />
          <ProjectLinks caseStudy={caseStudy} />
        </div>
      </div>
    </Container>
  </Section>
);
