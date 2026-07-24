import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { capabilities } from "@/content/capabilities";
import { fadeUp, inViewProps, staggerContainer } from "@/lib/animations";

export const HomeCapabilities = () => (
  <Section id="capabilities" tone="muted" className="border-y border-border">
    <Container>
      <SectionHeader
        eyebrow="Capabilities"
        title="Organised around engineering function, not tool lists."
        description="The tools matter, but the value is in knowing when and how to connect product requirements, platform constraints, security considerations, and long-term maintainability."
      />
      <motion.div
        variants={staggerContainer}
        {...inViewProps}
        className="mt-12 grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3"
      >
        {capabilities.map((capability) => (
          <motion.section
            key={capability.title}
            variants={fadeUp}
            className="border-t border-border pt-5"
          >
            <h3 className="text-lg font-semibold text-foreground">{capability.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{capability.summary}</p>
            <ul className="mt-5 space-y-2" role="list">
              {capability.evidence.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm text-foreground/85">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.section>
        ))}
      </motion.div>
    </Container>
  </Section>
);
