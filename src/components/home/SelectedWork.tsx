import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { primaryProjects } from "@/content/projects";
import { ProjectPreview } from "@/components/home/ProjectPreview";

const selected = primaryProjects;

export const SelectedWork = () => (
  <Section id="work">
    <Container>
      <div className="grid gap-10 lg:grid-cols-[320px_minmax(0,1fr)]">
        <SectionHeader
          eyebrow="Selected work"
          title="Products with architecture, platform, and delivery weight."
          description="A focused view of the projects that best represent my work across health technology, education technology, mobile delivery, and product operations."
          className="lg:sticky lg:top-28 lg:self-start"
        />
        <div className="border-y border-border">
          {selected.map((project, index) => (
            <ProjectPreview key={project.slug} project={project} emphasis={index === 0 ? "standard" : "quiet"} />
          ))}
        </div>
      </div>
    </Container>
  </Section>
);
