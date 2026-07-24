import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export const ProfessionalPositioning = () => (
  <Section id="about">
    <Container>
      <div className="grid gap-8 lg:grid-cols-[380px_minmax(0,1fr)]">
        <div>
          <p className="text-metadata uppercase text-accent">About the work</p>
          <h2 className="mt-3 text-section-title font-semibold text-foreground">Architecture, implementation, and product judgment in one loop.</h2>
        </div>
        <div className="max-w-3xl space-y-5 text-body-large text-muted-foreground">
          <p>
            I work closest to the place where product decisions become technical systems: data models, permissions, platform constraints, mobile release workflows, operational tooling, and the interface people actually use.
          </p>
          <p>
            My strongest work sits across health technology, education technology, SaaS platforms, and content-driven products where architecture has to support real users, sensitive data, and changing product requirements.
          </p>
          <p>
            Teaching and consulting keep the work practical. I care about systems that can be explained, maintained, shipped, and improved without turning every future change into a rewrite.
          </p>
        </div>
      </div>
    </Container>
  </Section>
);
