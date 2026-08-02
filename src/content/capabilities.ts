export type Capability = {
  title: string;
  summary: string;
  evidence: string[];
};

export const capabilities = [
  {
    title: "Product architecture",
    summary:
      "Translating ambiguous product requirements into durable, maintainable full-stack systems that can grow without constant rewrites.",
    evidence: [
      "Multi-tenant LMS with academy-scoped portals",
      "HealthTech wellness platform architecture",
      "CMS-driven mobile product systems",
      "Data model and permission design from the start",
    ],
  },
  {
    title: "Cross-platform mobile delivery",
    summary:
      "Shipping React and TypeScript products into native mobile release workflows to engineer platform-aware applications.",
    evidence: [
      "Asele Android production release",
      "Apple App Store release",
      "Firebase push notification workflows",
      "Safe-area, lifecycle, and WebView optimisation",
      "App Store and Google Play delivery",
    ],
  },
  {
    title: "Backend and data engineering",
    summary:
      "Building secure, tenant-aware backends with authentication, relational data design, real-time workflows, and server-side logic.",
    evidence: [
      "Supabase PostgreSQL with row-level security",
      "Authentication and session management",
      "Edge Functions and server-side logic",
      "Realtime collaboration infrastructure",
      "Email observability via Resend webhooks",
    ],
  },
  {
    title: "Frontend engineering",
    summary:
      "Building performant, accessible React and TypeScript interfaces, from component libraries to complex multi-state UI flows.",
    evidence: [
      "React and TypeScript across every project",
      "Component architecture and reusable design systems",
      "Accessibility and keyboard navigation",
      "Responsive layouts from mobile to large desktop",
      "Next.js for CMS-driven web platforms",
    ],
  },
  {
    title: "Multi-tenant SaaS design",
    summary:
      "Designing platforms where tenant isolation, role separation, and permission boundaries are structural rather than applied at the application layer.",
    evidence: [
      "Academy-based tenancy with PostgreSQL RLS",
      "Admin, tutor, student, and parent portals",
      "Recurring class series management",
      "Tenant branding and configuration",
      "Tenant-aware storage and document policies",
    ],
  },
  {
    title: "Education and health technology",
    summary:
      "Designing products for sensitive, workflow-heavy domains where trust, privacy, and user clarity are non-negotiable.",
    evidence: [
      "Privacy-sensitive health data boundaries in Asele",
      "Multi-role LMS workflows in TeachEasy",
      "K-12 learner and curriculum-aware product design",
      "AI-assisted health briefs with appropriate scope limits",
    ],
  },
  {
    title: "Cloud delivery and operations",
    summary:
      "Deploying production systems with confidence: environment configuration, CI/CD workflows, and post-release operations.",
    evidence: [
      "Vercel production deployment",
      "GitHub-based CI/CD workflows",
      "Environment variable management",
      "Supabase Edge Functions and managed infrastructure",
      "Pre-render and SPA routing configuration",
    ],
  },
] satisfies Capability[];
