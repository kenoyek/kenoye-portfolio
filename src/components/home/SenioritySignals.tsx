import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, Shield, Layers, Server, Cpu } from "lucide-react";
import { Link } from "react-router-dom";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { fadeUp, inViewProps, staggerContainer } from "@/lib/animations";

type SignalEntry = {
  icon: React.ReactNode;
  title: string;
  body: string;
  project?: string;
  projectHref?: string;
};

const signals: SignalEntry[] = [
  {
    icon: <Layers size={18} aria-hidden="true" />,
    title: "Multi-tenant architecture",
    body: "Designed a Supabase-backed multi-tenant LMS where academy data is separated across organisations, roles, and users via PostgreSQL row-level security rather than application-level filtering.",
    project: "TeachEasy LMS",
    projectHref: "/projects/teacheasy",
  },
  {
    icon: <Shield size={18} aria-hidden="true" />,
    title: "Privacy-sensitive data design",
    body: "Built a women's health platform where product scope, RLS-backed data boundaries, notification flows, and feature framing were all shaped by the sensitivity of the data.",
    project: "Asele",
    projectHref: "/projects/asele",
  },
  {
    icon: <Cpu size={18} aria-hidden="true" />,
    title: "Cross-platform mobile engineering",
    body: "Took React and TypeScript products through Capacitor configuration, safe-area and lifecycle integration, push notifications, Android production release, and Apple App Store release.",
    project: "Asele / Reframe",
    projectHref: "/projects/reframe",
  },
  {
    icon: <Server size={18} aria-hidden="true" />,
    title: "Backend and API ownership",
    body: "Responsible for data models, Supabase schema migrations, Row Level Security policies, Edge Functions, email infrastructure, and realtime subscriptions across multiple production products.",
    project: "TeachEasy LMS",
    projectHref: "/projects/teacheasy",
  },
  {
    icon: <BookOpen size={18} aria-hidden="true" />,
    title: "Full lifecycle product ownership",
    body: "Delivered products from requirements through architecture, implementation, testing, mobile deployment workflows, and post-release operations. Not just feature implementation.",
    project: "Asele",
    projectHref: "/projects/asele",
  },
];

export const SenioritySignals = () => (
  <Section id="signals" tone="muted" className="border-y border-border">
    <Container>
      <SectionHeader
        eyebrow="Engineering evidence"
        title="Senior behaviour shown through real decisions."
        description="Seniority is demonstrated through ownership, constraints, trade-offs, and production delivery."
      />
      <motion.ul
        variants={staggerContainer}
        {...inViewProps}
        className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        role="list"
      >
        {signals.map((signal) => (
          <motion.li
            key={signal.title}
            variants={fadeUp}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="flex flex-col rounded-lg border border-border bg-card p-5 shadow-subtle"
          >
            <div className="mb-3 flex items-center gap-2.5 text-accent">
              {signal.icon}
              <h3 className="text-sm font-semibold text-foreground">{signal.title}</h3>
            </div>
            <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{signal.body}</p>
            {signal.project && signal.projectHref && (
              <Link
                to={signal.projectHref}
                className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-accent underline-offset-4 hover:underline"
                aria-label={`Read ${signal.project} case study`}
              >
                {signal.project} <ArrowUpRight size={13} aria-hidden="true" />
              </Link>
            )}
          </motion.li>
        ))}
      </motion.ul>
    </Container>
  </Section>
);
