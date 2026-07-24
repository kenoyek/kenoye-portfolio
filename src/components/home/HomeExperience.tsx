import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { experience } from "@/content/experience";

export const HomeExperience = () => (
  <Section id="experience">
    <Container>
      <div className="grid gap-10 lg:grid-cols-[320px_minmax(0,1fr)]">
        <SectionHeader
          eyebrow="Experience"
          title="Leadership shown through product responsibility."
          description="A concise view of the roles that connect engineering, education, product ownership, and technical delivery."
          className="lg:sticky lg:top-28 lg:self-start"
        />
        <div className="space-y-8">
          {experience.map((entry) => (
            <article key={`${entry.title}-${entry.organization}`} className="border-t border-border pt-6">
              <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_160px] sm:items-start">
                <div>
                  <h3 className="text-xl font-semibold text-foreground">{entry.title}</h3>
                  <p className="mt-1 text-sm font-medium text-accent">{entry.organization}</p>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">{entry.summary}</p>
                </div>
                <p className="text-sm text-muted-foreground sm:text-right">{entry.period}</p>
              </div>
              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {entry.evidence.map((item) => (
                  <li key={item} className="text-sm text-foreground/85">
                    <span className="mr-2 text-accent" aria-hidden="true">/</span>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </Container>
  </Section>
);

