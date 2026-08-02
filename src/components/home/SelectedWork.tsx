import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { primaryProjects } from "@/content/projects";
import { ProjectPreview } from "@/components/home/ProjectPreview";
import { fadeUp, inViewProps } from "@/lib/animations";

const selected = primaryProjects;

export const SelectedWork = () => (
  <Section id="work">
    <Container>
      <div className="grid gap-10 lg:grid-cols-[320px_minmax(0,1fr)]">
        <motion.div
          variants={fadeUp}
          {...inViewProps}
          className="lg:sticky lg:top-28 lg:self-start"
        >
          <p className="text-metadata uppercase text-accent">Selected work</p>
          <h2 className="mt-3 text-section-title font-semibold text-foreground">
            Three production systems built end to end.
          </h2>
          <div className="mt-4 h-px w-12 bg-accent" aria-hidden="true" />
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            A focused view of the projects that best represent my engineering, each with real
            architecture decisions, mobile delivery, multi-tenant design, or privacy-sensitive data
            requirements.
          </p>
        </motion.div>

        <div className="border-y border-border">
          {selected.map((project, index) => (
            <ProjectPreview
              key={project.slug}
              project={project}
              emphasis={index === 0 ? "featured" : index === 1 ? "standard" : "quiet"}
            />
          ))}
        </div>
      </div>
    </Container>
  </Section>
);
