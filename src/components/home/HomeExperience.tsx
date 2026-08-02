import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { experience } from "@/content/experience";
import { fadeUp, inViewProps, slideFromLeft, staggerContainer } from "@/lib/animations";

const typeLabel: Record<"Consulting" | "Instruction" | "Employment", string> = {
  Consulting: "Consulting",
  Instruction: "Instruction",
  Employment: "Employment",
};

export const HomeExperience = () => (
  <Section id="experience">
    <Container>
      <div className="grid gap-10 lg:grid-cols-[320px_minmax(0,1fr)]">
        <motion.div
          variants={slideFromLeft}
          {...inViewProps}
          className="lg:sticky lg:top-28 lg:self-start"
        >
          <p className="text-metadata uppercase text-accent">Experience</p>
          <h2 className="mt-3 text-section-title font-semibold text-foreground">
            Ownership demonstrated through delivery.
          </h2>
          <div className="mt-4 h-px w-12 bg-accent" aria-hidden="true" />
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Engineering and product leadership roles where I was responsible for architecture,
            implementation, and production outcomes.
          </p>
        </motion.div>

        <motion.div variants={staggerContainer} {...inViewProps} className="space-y-8">
          {experience.map((entry) => (
            <motion.article
              key={`${entry.title}-${entry.organization}`}
              variants={fadeUp}
              className="border-t border-border pt-6"
            >
              <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_200px] sm:items-start">
                <div>
                  <h3 className="text-xl font-semibold text-foreground">{entry.title}</h3>
                  <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
                    <p className="text-sm font-medium text-accent">{entry.organization}</p>
                    <span className="text-muted-foreground" aria-hidden="true">
                      ·
                    </span>
                    <p className="rounded-sm bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                      {typeLabel[entry.type]}
                    </p>
                  </div>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                    {entry.summary}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground sm:text-right">{entry.period}</p>
              </div>

              {entry.highlights && entry.highlights.length > 0 && (
                <ul className="mt-5 space-y-2.5">
                  {entry.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2.5 text-sm leading-relaxed text-foreground/85"
                    >
                      <span
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              <ul className="mt-5 flex flex-wrap gap-2" role="list">
                {entry.evidence.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </Container>
  </Section>
);
