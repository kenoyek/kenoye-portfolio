import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { fadeUp, inViewProps, staggerContainer } from "@/lib/animations";

type ImpactPoint = {
  value: string;
  label: string;
};

const impactPoints: ImpactPoint[] = [
  {
    value: "3",
    label: "Production case studies with full engineering ownership",
  },
  {
    value: "Android + iOS",
    label: "Cross-platform mobile delivery via Capacitor",
  },
  {
    value: "Multi-tenant",
    label: "SaaS platform with four role-based portals and row-level security",
  },
  {
    value: "React · TypeScript",
    label: "Consistent stack across every production project",
  },
];

export const ImpactBar = () => (
  <section
    className="border-b border-border bg-surface py-6"
    aria-label="Engineering scope summary"
  >
    <Container>
      <motion.ul
        variants={staggerContainer}
        {...inViewProps}
        className="grid grid-cols-2 gap-x-6 gap-y-5 lg:grid-cols-4"
        role="list"
      >
        {impactPoints.map((point) => (
          <motion.li key={point.value} variants={fadeUp} className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-foreground">{point.value}</span>
            <span className="text-xs leading-relaxed text-muted-foreground">{point.label}</span>
          </motion.li>
        ))}
      </motion.ul>
    </Container>
  </section>
);
