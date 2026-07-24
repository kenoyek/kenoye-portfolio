export type ProjectStatus = "live" | "private" | "in-progress" | "case-study" | "available-on-request";

export type ProjectLink = {
  label: string;
  href: string;
  kind: "live" | "case-study" | "repository" | "external";
};

export type ProjectGalleryItem = {
  label: string;
  src?: string;
  alt?: string;
  kind?: "screenshot" | "diagram" | "document" | "placeholder";
};

export type ProjectChallenge = {
  title: string;
  problem: string;
  solution?: string;
};

export type ProjectDecision = {
  title: string;
  rationale: string;
  tradeoff?: string;
};

export type ProjectOutcome = {
  label: string;
  detail?: string;
  verified?: boolean;
};

export type PortfolioProject = {
  slug: string;
  title: string;
  shortTitle?: string;
  category: string[];
  summary: string;
  shortSummary: string;
  role: string;
  projectStatus: ProjectStatus;
  featured?: boolean;
  priority: number;
  timeframe?: string;
  platforms?: string[];
  technologies: string[];
  responsibilities?: string[];
  problem?: string;
  context?: string;
  architecture?: string;
  challenges?: ProjectChallenge[];
  decisions?: ProjectDecision[];
  outcomes?: ProjectOutcome[];
  links?: ProjectLink[];
  gallery?: ProjectGalleryItem[];
  metadata?: {
    productCategory?: string;
    ownership?: string;
    visibility?: "public" | "private" | "client";
  };
  seo?: {
    title: string;
    description: string;
  };
};

export const projects = [
  {
    slug: "asele",
    title: "Asele",
    shortTitle: "Asele",
    category: ["HealthTech", "Mobile", "Full-stack"],
    summary:
      "A women’s cycle and wellness platform spanning React, TypeScript, Supabase, Capacitor mobile delivery, notifications, multilingual support, AI-assisted health briefs, and privacy-sensitive product architecture.",
    shortSummary:
      "Women’s cycle and wellness platform with full-stack product architecture and cross-platform mobile delivery.",
    role: "Product architect and lead engineer",
    projectStatus: "case-study",
    featured: true,
    priority: 1,
    platforms: ["Web", "Android", "iOS workflow"],
    technologies: ["React", "TypeScript", "Supabase", "Capacitor", "Push Notifications", "Deep Linking", "Corti"],
    responsibilities: [
      "Full-stack product architecture",
      "Capacitor mobile application workflow",
      "Authentication, notifications, and deep linking",
      "Privacy-sensitive health data architecture",
      "Administrative tooling and multilingual product support",
    ],
    problem:
      "Women need a private and intuitive way to track cycle and wellness context without the product overstepping into diagnosis.",
    context:
      "Asele combines wellness tracking, cycle-aware notifications, mobile delivery, and AI-assisted briefs in a health-data context where clarity and privacy matter.",
    architecture:
      "React and TypeScript frontends connect to Supabase-backed authentication, data storage, administrative tooling, and mobile workflows through Capacitor.",
    challenges: [
      {
        title: "Privacy-sensitive health data",
        problem: "Wellness data requires careful product boundaries and thoughtful handling.",
        solution: "Positioned features around tracking, support, and briefs rather than medical diagnosis.",
      },
      {
        title: "Cross-platform mobile delivery",
        problem: "The product needed web velocity with native mobile distribution paths.",
        solution: "Used Capacitor to support Android production delivery and an iOS deployment workflow from a shared React codebase.",
      },
    ],
    outcomes: [
      { label: "Android production release completed", verified: true },
      { label: "iOS deployment workflow implemented", verified: true },
      { label: "Cycle-aware notifications implemented", verified: true },
      { label: "Multilingual support implemented", verified: true },
    ],
    links: [
      { label: "Read case study", href: "/projects/asele", kind: "case-study" },
      { label: "Visit Asele", href: "https://www.asele.health", kind: "live" },
    ],
    metadata: {
      productCategory: "Women’s wellness platform",
      ownership: "Lead product and engineering ownership",
      visibility: "public",
    },
    seo: {
      title: "Asele HealthTech Case Study",
      description:
        "Asele is a women’s cycle and wellness platform covering React, TypeScript, Supabase, Capacitor, notifications, multilingual support, and privacy-sensitive product architecture.",
    },
  },
  {
    slug: "teacheasy",
    title: "TeachEasy LMS",
    shortTitle: "TeachEasy",
    category: ["EdTech", "SaaS", "Full-stack"],
    summary:
      "A multi-tenant learning-management platform for academies with role-based portals, scheduling, tutor permissions, collaborative classrooms, Supabase, RLS, realtime workflows, and tenant branding.",
    shortSummary:
      "Multi-tenant LMS with academy tenancy, role-based portals, scheduling, and collaborative learning workflows.",
    role: "Lead engineer",
    projectStatus: "case-study",
    featured: true,
    priority: 2,
    platforms: ["Web"],
    technologies: ["React", "TypeScript", "Supabase", "Postgres RLS", "Realtime", "Jitsi", "Resend"],
    responsibilities: [
      "Multi-tenant architecture",
      "Admin, tutor, student, and parent portals",
      "Scheduling and tutor permissions",
      "Collaborative workspace and classroom integration",
      "Tenant branding and communications infrastructure",
    ],
    problem:
      "Academies need one system for classes, scheduling, permissions, students, parents, tutors, and learning materials instead of disconnected tools.",
    context:
      "TeachEasy supports operational education workflows where tenancy, permissions, and collaboration are core product concerns.",
    architecture:
      "Supabase and Postgres RLS support tenant-aware data access, with React and TypeScript powering role-specific portals and classroom workflows.",
    challenges: [
      {
        title: "Tenant separation",
        problem: "Academy data needs to remain isolated across roles and organizations.",
        solution: "Modeled academy-based tenancy with Supabase and row-level security.",
      },
      {
        title: "Classroom collaboration",
        problem: "Tutors and students need shared learning spaces, materials, notes, and live sessions.",
        solution: "Introduced collaborative workspace concepts with Jitsi, shared PDFs, notes, whiteboard, and quizzes.",
      },
    ],
    outcomes: [
      { label: "Multi-tenant architecture implemented", verified: true },
      { label: "Multiple user portals delivered", verified: true },
      { label: "Row-level security implemented", verified: true },
      { label: "Realtime collaboration introduced", verified: true },
    ],
    links: [
      { label: "Read case study", href: "/projects/teacheasy", kind: "case-study" },
      { label: "Visit TeachEasy", href: "https://teacheasylms.com/", kind: "live" },
    ],
    metadata: {
      productCategory: "Learning-management platform",
      ownership: "Lead engineering ownership",
      visibility: "public",
    },
    seo: {
      title: "TeachEasy Multi-tenant LMS Case Study",
      description:
        "TeachEasy is a multi-tenant EdTech platform with role-based portals, scheduling, tutor permissions, collaboration, Supabase, RLS, and tenant branding.",
    },
  },
  {
    slug: "reframe",
    title: "Reframe Mobile App",
    shortTitle: "Reframe",
    category: ["Mobile", "CMS", "Full-stack"],
    summary:
      "A CMS-driven news and community platform converted into cross-platform iOS and Android apps with React, TypeScript, Next.js, Capacitor, shared APIs, safe-area handling, push infrastructure, deep links, and deployment workflows.",
    shortSummary:
      "CMS-driven news/community platform adapted into cross-platform mobile apps with Capacitor.",
    role: "Lead mobile and full-stack engineer",
    projectStatus: "case-study",
    featured: true,
    priority: 3,
    platforms: ["Web", "iOS", "Android"],
    technologies: ["React", "TypeScript", "Next.js", "Capacitor", "Push Notifications", "Deep Linking"],
    responsibilities: [
      "Capacitor mobile architecture",
      "Native safe-area and lifecycle integration",
      "CMS content synchronization",
      "Push-notification infrastructure",
      "Store preparation and deployment workflows",
    ],
    problem:
      "A CMS-driven web platform needed mobile apps without duplicating the codebase or requiring app resubmission for editorial updates.",
    context:
      "Reframe publishes news, articles, images, likes, comments, and community content from a CMS-backed platform.",
    architecture:
      "A shared React/Next.js platform is wrapped with Capacitor and native configuration so mobile apps consume the same backend APIs as the web product.",
    challenges: [
      {
        title: "Live CMS and mobile sync",
        problem: "Editorial updates needed to appear across web and mobile without native app releases.",
        solution: "Kept CMS APIs as the shared source of truth for web, iOS, and Android surfaces.",
      },
      {
        title: "Native feel from a web core",
        problem: "The mobile apps needed to avoid feeling like a generic wrapped website.",
        solution: "Implemented safe-area handling, lifecycle support, status bar/splash behavior, deep links, and native configuration.",
      },
    ],
    outcomes: [
      { label: "One shared React codebase across platforms", verified: true },
      { label: "CMS content synchronized across web and mobile", verified: true },
      { label: "Push-notification infrastructure implemented", verified: true },
      { label: "App Store and Google Play preparation completed", verified: true },
    ],
    links: [{ label: "Read case study", href: "/projects/reframe", kind: "case-study" }],
    metadata: {
      productCategory: "News and community mobile platform",
      ownership: "Lead mobile engineering ownership",
      visibility: "public",
    },
    seo: {
      title: "Reframe Mobile Engineering Case Study",
      description:
        "Reframe is a CMS-driven news and community platform converted into iOS and Android apps with React, TypeScript, Next.js, and Capacitor.",
    },
  },
  {
    slug: "learneasy-academy",
    title: "LearnEasy Academy",
    shortTitle: "LearnEasy",
    category: ["Education", "Product", "Operations"],
    summary:
      "An education company and tutoring platform that demonstrates product ownership, operational leadership, curriculum development, K-12 learning support, and education technology workflows.",
    shortSummary:
      "Education company and tutoring platform showing product ownership, curriculum design, and operational leadership.",
    role: "Founder and product lead",
    projectStatus: "available-on-request",
    priority: 4,
    platforms: ["Operations", "Learning workflows"],
    technologies: ["Curriculum Design", "Education Technology", "Content Strategy", "Tutor Workflows"],
    responsibilities: [
      "Education product ownership",
      "Curriculum development",
      "Tutor, student, and parent workflow design",
      "Operational leadership and content strategy",
    ],
    problem:
      "K-12 learners and families need structured tutoring experiences with clear curriculum, workflow, and progress support.",
    context:
      "LearnEasy Academy connects Kenoye’s engineering and education work through product ownership, operations, and learning-system design.",
    outcomes: [
      { label: "K-12 tutoring workflows established", verified: true },
      { label: "Curriculum development led", verified: true },
      { label: "Education operations managed", verified: true },
    ],
    metadata: {
      productCategory: "Education company and tutoring platform",
      ownership: "Founder and operator",
      visibility: "private",
    },
    seo: {
      title: "LearnEasy Academy Education Product Case Study",
      description:
        "LearnEasy Academy demonstrates education product ownership, K-12 tutoring, curriculum development, tutor workflows, and operational leadership.",
    },
  },
] satisfies PortfolioProject[];

export const featuredProjects = projects
  .filter((project) => project.featured)
  .sort((a, b) => a.priority - b.priority);

export const getProjectBySlug = (slug: string) => projects.find((project) => project.slug === slug);
