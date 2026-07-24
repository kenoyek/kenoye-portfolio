import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/layout/SectionHeader";

const principles = [
  {
    title: "Start with product reality",
    body: "Architecture should answer a real operating problem: who uses the system, what changes often, what must stay reliable, and what data deserves extra care.",
  },
  {
    title: "Design shared systems",
    body: "When web, mobile, admin, and operations need the same concepts, I prefer shared models and APIs over duplicated feature logic.",
  },
  {
    title: "Make permissions structural",
    body: "Authentication, authorization, tenancy, and privacy are not afterthoughts. They belong in the data model, policies, and product workflows.",
  },
  {
    title: "Treat mobile as a platform",
    body: "Capacitor delivery still requires native platform thinking: safe areas, app lifecycle, notifications, deep links, builds, and release workflows.",
  },
  {
    title: "Use AI as product infrastructure",
    body: "AI features should clarify or accelerate a workflow, not sit on top as decoration. The product still needs boundaries, trust, and operational fallback.",
  },
];

export const EngineeringPrinciples = () => (
  <Section id="approach" tone="primary">
    <Container>
      <SectionHeader
        eyebrow="Approach"
        title="How I think about product engineering."
        description="A few working principles that show up repeatedly in the projects I take on."
        className="[&_h2]:text-primary-foreground [&_p]:text-primary-foreground/65 [&_div]:bg-primary-foreground/20"
      />
      <div className="grid gap-6 md:grid-cols-5">
        {principles.map((principle, index) => (
          <article key={principle.title} className="border-t border-primary-foreground/20 pt-5 md:col-span-1">
            <p className="mb-4 font-mono text-xs text-accent">{String(index + 1).padStart(2, "0")}</p>
            <h3 className="text-base font-semibold text-primary-foreground">{principle.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-primary-foreground/60">{principle.body}</p>
          </article>
        ))}
      </div>
    </Container>
  </Section>
);

