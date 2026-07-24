export type Capability = {
  title: string;
  summary: string;
  evidence: string[];
};

export const capabilities = [
  {
    title: "Product architecture",
    summary: "Translating ambiguous product needs into durable full-stack systems.",
    evidence: ["Multi-tenant LMS architecture", "HealthTech product workflows", "CMS-driven mobile apps"],
  },
  {
    title: "Cross-platform mobile delivery",
    summary: "Shipping React and TypeScript products into native mobile release workflows.",
    evidence: ["Capacitor", "Android production delivery", "iOS deployment workflow", "Deep linking"],
  },
  {
    title: "Supabase and data security",
    summary: "Building tenant-aware systems with authentication, Postgres, RLS, realtime, and Edge Functions.",
    evidence: ["Row-level security", "Realtime collaboration", "Admin tooling", "Email infrastructure"],
  },
  {
    title: "Education and health technology",
    summary: "Designing products for sensitive, workflow-heavy domains where trust and clarity matter.",
    evidence: ["Asele", "TeachEasy", "LearnEasy Academy"],
  },
] satisfies Capability[];

