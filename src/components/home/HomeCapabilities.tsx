import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { capabilities } from "@/content/capabilities";

export const HomeCapabilities = () => (
  <Section id="capabilities" tone="muted" className="border-y border-border">
    <Container>
      <SectionHeader
        eyebrow="Capabilities"
        title="Organised around systems, not tool lists."
        description="The tools matter, but the real value is knowing when and how to connect product needs, platform constraints, and long-term maintenance."
      />
      <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
        {capabilities.map((capability) => (
          <section key={capability.title} className="border-t border-border pt-5">
            <h3 className="text-xl font-semibold text-foreground">{capability.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{capability.summary}</p>
            <ul className="mt-5 space-y-2">
              {capability.evidence.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-foreground/85">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </Container>
  </Section>
);

