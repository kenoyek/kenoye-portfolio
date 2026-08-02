export type ProjectStatus =
  | "live"
  | "private"
  | "in-progress"
  | "case-study"
  | "available-on-request"
  | "experimental"
  | "archived";

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
    category: ["Women's HealthTech", "Mobile", "Full-stack"],
    summary:
      "Privacy-conscious women’s cycle and wellness platform delivered across web, Android, and iOS with secure Supabase data access, cycle-aware reminders, localisation, and AI-assisted briefs.",
    shortSummary:
      "Privacy-conscious cycle and wellness platform with secure full-stack architecture and cross-platform mobile delivery.",
    role: "Product architect and lead engineer",
    projectStatus: "case-study",
    featured: true,
    priority: 1,
    platforms: ["Web", "Android", "iOS"],
    technologies: [
      "React",
      "TypeScript",
      "Vite",
      "Supabase",
      "PostgreSQL",
      "Capacitor",
      "Firebase Cloud Messaging",
      "Supabase Edge Functions",
      "Google OAuth",
      "Sign in with Apple",
      "i18n",
      "Xcode",
      "Android Studio",
      "GitHub",
    ],
    responsibilities: [
      "React and TypeScript application architecture",
      "Supabase and PostgreSQL backend design with Row Level Security",
      "Capacitor mobile delivery for Android and iOS production releases",
      "Authentication, push notifications, and native app lifecycle debugging",
      "Internationalisation, AI-assisted briefs, and privacy-conscious health-data workflows",
    ],
    problem:
      "Women need a private and intuitive way to track cycle and wellness context without the product overstepping into diagnosis.",
    context:
      "Asele combines cycle tracking, wellness logging, cycle-aware notifications, mobile delivery, multilingual support, and AI-assisted briefs in a health-data context where clarity and privacy matter.",
    architecture:
      "A React and TypeScript application connects to Supabase Authentication, PostgreSQL, Row Level Security, Edge Functions, Firebase Cloud Messaging, and native mobile workflows through Capacitor.",
    challenges: [
      {
        title: "Privacy-sensitive health data",
        problem: "Wellness data requires careful product boundaries and thoughtful handling.",
        solution:
          "Used authenticated Supabase access and PostgreSQL Row Level Security patterns while positioning features around tracking, support, and briefs rather than medical diagnosis.",
      },
      {
        title: "Cross-platform mobile delivery",
        problem: "The product needed web velocity with native mobile distribution paths.",
        solution:
          "Used Capacitor to support Android and iOS production delivery from a shared React codebase.",
      },
      {
        title: "Notification orchestration",
        problem:
          "Reminder workflows needed to account for user preferences, device permissions, cycle state, and recurring schedules.",
        solution:
          "Built cycle-aware notification and reminder workflows around Firebase Cloud Messaging, device-token handling, and preference controls.",
      },
    ],
    outcomes: [
      { label: "Android production release completed", verified: true },
      { label: "Apple App Store release completed", verified: true },
      { label: "Secure health-data access with PostgreSQL RLS", verified: true },
      { label: "Cycle-aware notification engine implemented", verified: true },
      { label: "24-language localisation with RTL support", verified: true },
      { label: "AI-assisted health briefs integrated", verified: true },
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
      title: "Asele HealthTech Case Study | Senior Full-Stack Engineer",
      description:
        "Asele is a women’s cycle and wellness platform covering senior full-stack engineering with React, TypeScript, Supabase, PostgreSQL Row Level Security, Capacitor, Firebase push notifications, AI integration, Google Play deployment, and Apple App Store release.",
    },
  },
  {
    slug: "teacheasy",
    title: "TeachEasy LMS",
    shortTitle: "TeachEasy",
    category: ["EdTech", "SaaS", "Full-stack"],
    summary:
      "Multi-tenant learning management platform for academies, tutors, students, and parents with tenant-scoped portals, PostgreSQL RLS, recurring class scheduling, Jitsi classrooms, collaborative workspaces, assessments, and email observability.",
    shortSummary:
      "Multi-tenant LMS with secure academy tenancy, role-based portals, scheduling, live classrooms, and collaborative learning workflows.",
    role: "Lead engineer",
    projectStatus: "case-study",
    featured: true,
    priority: 2,
    platforms: ["Web"],
    technologies: [
      "React",
      "TypeScript",
      "Vite",
      "Supabase",
      "PostgreSQL",
      "Supabase Realtime",
      "Supabase Edge Functions",
      "Jitsi Meet",
      "Yjs",
      "tldraw",
      "Resend",
      "PDF tooling",
      "GitHub",
    ],
    responsibilities: [
      "Multi-tenant SaaS architecture and tenant-scoped routing",
      "Admin, tutor, student, parent, and super-admin role modelling",
      "PostgreSQL schema, migrations, RLS, SQL functions, and reporting queries",
      "Recurring scheduling, tutor permissions, attendance, assessments, and messaging",
      "Jitsi classrooms, real-time collaboration, file access rules, and Resend delivery tracking",
    ],
    problem:
      "Academies need one system for classes, scheduling, permissions, students, parents, tutors, and learning materials instead of disconnected tools.",
    context:
      "TeachEasy supports operational education workflows where tenancy, permissions, and collaboration are core product concerns.",
    architecture:
      "React and TypeScript power role-specific portals while Supabase, PostgreSQL, RLS, Realtime, Edge Functions, Jitsi, Yjs, and Resend support tenant-aware backend, collaboration, classroom, and communication workflows.",
    challenges: [
      {
        title: "Tenant separation",
        problem: "Academy data needs to remain isolated across roles and organizations.",
        solution: "Modeled academy-based tenancy with Supabase and row-level security.",
      },
      {
        title: "Recurring scheduling",
        problem:
          "Academies need series-level class planning without losing control over individual lessons or completed history.",
        solution:
          "Implemented recurring lesson workflows with occurrence-level, future-series, and full-series management patterns.",
      },
      {
        title: "Classroom collaboration",
        problem:
          "Tutors and students need shared learning spaces, materials, notes, live sessions, and assessment context.",
        solution:
          "Integrated Jitsi classroom workflows with shared PDFs, notes, whiteboard, quizzes, Yjs, and Supabase Realtime.",
      },
    ],
    outcomes: [
      { label: "Multi-tenant academy architecture implemented", verified: true },
      { label: "Role-based portals and PostgreSQL RLS", verified: true },
      { label: "Recurring class series management", verified: true },
      { label: "Jitsi live classroom integration", verified: true },
      { label: "Real-time collaborative lesson workspace", verified: true },
      { label: "Quiz and assessment workflows", verified: true },
      { label: "Email delivery tracking with Resend", verified: true },
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
      title: "TeachEasy LMS Case Study | Multi-Tenant SaaS Engineer",
      description:
        "TeachEasy is a multi-tenant Learning Management System case study for a senior full-stack, React, TypeScript, Supabase, and PostgreSQL engineer covering tenant isolation, Row Level Security, scheduling, Jitsi classrooms, AI-assisted development workflows, and Resend email tracking.",
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
    technologies: [
      "React",
      "TypeScript",
      "Next.js",
      "Capacitor",
      "Push Notifications",
      "Deep Linking",
    ],
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
        problem:
          "Editorial updates needed to appear across web and mobile without native app releases.",
        solution: "Kept CMS APIs as the shared source of truth for web, iOS, and Android surfaces.",
      },
      {
        title: "Native feel from a web core",
        problem: "The mobile apps needed to avoid feeling like a generic wrapped website.",
        solution:
          "Implemented safe-area handling, lifecycle support, status bar/splash behavior, deep links, and native configuration.",
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
      "An education tutoring context that demonstrates coding instruction, curriculum support, K-12 learning support, and education technology workflows.",
    shortSummary:
      "Coding tutoring work showing curriculum support, learner guidance, and education technology workflows.",
    role: "Coding tutor",
    projectStatus: "available-on-request",
    featured: false,
    priority: 4,
    platforms: ["Operations", "Learning workflows"],
    technologies: [
      "Curriculum Design",
      "Education Technology",
      "Content Strategy",
      "Tutor Workflows",
    ],
    responsibilities: [
      "Coding instruction",
      "Curriculum support",
      "Tutor, student, and parent workflow design",
      "Learning support and content guidance",
    ],
    problem:
      "K-12 learners and families need structured tutoring experiences with clear curriculum, workflow, and progress support.",
    context:
      "LearnEasy Academy connects Kenoye’s engineering and education work through coding instruction, curriculum support, and learning-system awareness.",
    outcomes: [
      { label: "K-12 coding tutoring delivered", verified: true },
      { label: "Curriculum support provided", verified: true },
      { label: "Learner guidance and education workflows supported", verified: true },
    ],
    metadata: {
      productCategory: "Coding tutoring and education support",
      ownership: "Coding tutor",
      visibility: "private",
    },
    seo: {
      title: "LearnEasy Academy Coding Tutoring Work",
      description:
        "LearnEasy Academy demonstrates coding tutoring, K-12 learning support, curriculum support, tutor workflows, and education technology awareness.",
    },
  },
  {
    slug: "togacode-lms",
    title: "TogaCode LMS",
    shortTitle: "TogaCode",
    category: ["EdTech", "SaaS", "Full-stack"],
    summary:
      "A coding-tutor LMS for managing classes, courses, live coding workflows, invite-code enrollment, and tenant-safe learning operations.",
    shortSummary:
      "Coding-tutor LMS with course management, invite-code enrollment, embedded code workflows, and tenant-aware structure.",
    role: "Founder and lead engineer",
    projectStatus: "live",
    priority: 10,
    platforms: ["Web"],
    technologies: ["React", "TypeScript", "Supabase", "PostgreSQL RLS", "Edge Functions"],
    responsibilities: [
      "Product concept and full-stack implementation",
      "Tutor and learner workflow design",
      "Tenant-aware enrollment patterns",
      "Code-learning tooling and deployment",
    ],
    problem:
      "Coding tutors needed a more unified way to manage classes, courses, enrollment, and live coding work.",
    context:
      "TogaCode sits in the education-product lane and overlaps with the LearnEasy teaching ecosystem, but remains a separate LMS product experiment.",
    architecture:
      "React and TypeScript power the web interface, with Supabase supporting authentication, data workflows, and tenant-aware persistence.",
    outcomes: [
      { label: "Live LMS demo remains publicly reachable", verified: true },
      { label: "Tenant-aware course and enrollment concepts implemented", verified: true },
    ],
    links: [{ label: "View live", href: "https://code-buddy-lms.vercel.app/", kind: "live" }],
    metadata: {
      productCategory: "Coding education LMS",
      ownership: "Founder-led product build",
      visibility: "public",
    },
  },
  {
    slug: "onevet-online-pet-store",
    title: "1Vet Online Pet Store",
    shortTitle: "1Vet",
    category: ["E-commerce", "Full-stack"],
    summary:
      "A focused pet-supplies storefront with catalog, cart, checkout, and inventory-oriented e-commerce workflows.",
    shortSummary:
      "Pet-supplies e-commerce storefront with catalog, cart, checkout, and operational store workflows.",
    role: "Lead developer",
    projectStatus: "live",
    priority: 11,
    platforms: ["Web"],
    technologies: ["React", "Supabase", "Tailwind CSS"],
    responsibilities: [
      "Frontend implementation",
      "Backend integration",
      "Storefront workflow delivery",
      "Deployment support",
    ],
    problem:
      "Pet owners and vet shops needed a focused storefront for browsing and buying pet supplies.",
    context:
      "1Vet was part of the earlier portfolio as a full-stack e-commerce project and has a live public site.",
    outcomes: [{ label: "Live storefront remains publicly reachable", verified: true }],
    links: [{ label: "View live", href: "https://1vet.store", kind: "live" }],
    metadata: {
      productCategory: "E-commerce storefront",
      ownership: "Lead development",
      visibility: "public",
    },
  },
  {
    slug: "python-playground",
    title: "Python Playground",
    category: ["EdTech", "Learning Tool", "Frontend"],
    summary:
      "A browser-based Python learning environment for younger beginners, focused on approachable code practice and immediate feedback.",
    shortSummary:
      "Beginner-friendly Python practice tool with live output and a low-friction browser learning flow.",
    role: "Sole engineer",
    projectStatus: "experimental",
    priority: 12,
    platforms: ["Web"],
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    responsibilities: [
      "Product concept",
      "Interface design",
      "Frontend implementation",
      "Deployment",
    ],
    problem:
      "Young learners needed a friendlier entry point for writing Python and seeing output quickly.",
    context:
      "Python Playground is a teaching-support experiment from the education work, kept intentionally lighter than the flagship case studies.",
    outcomes: [{ label: "Live learning experiment remains publicly reachable", verified: true }],
    links: [
      { label: "View live", href: "https://python-playground-pals.vercel.app/", kind: "live" },
    ],
    metadata: {
      productCategory: "Coding education experiment",
      ownership: "Solo product and engineering",
      visibility: "public",
    },
  },
  {
    slug: "codequest-adventures",
    title: "CodeQuest Adventures",
    category: ["EdTech", "Learning Game", "Frontend"],
    summary:
      "A gamified coding-practice experience using quests, progress feedback, and structured challenges to support beginner consistency.",
    shortSummary:
      "Gamified coding-practice experiment with quests, levels, feedback loops, and structured challenges.",
    role: "Sole engineer",
    projectStatus: "experimental",
    priority: 13,
    platforms: ["Web"],
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    responsibilities: [
      "Product concept",
      "Game-like learning flow",
      "Frontend implementation",
      "Deployment",
    ],
    problem:
      "Beginner coders often need more motivation and visible progress than a plain practice environment provides.",
    context:
      "CodeQuest Adventures explores engagement loops for coding education without being presented as a production LMS.",
    outcomes: [{ label: "Live learning experiment remains publicly reachable", verified: true }],
    links: [{ label: "View live", href: "https://codequest-adventures.vercel.app/", kind: "live" }],
    metadata: {
      productCategory: "Coding education experiment",
      ownership: "Solo product and engineering",
      visibility: "public",
    },
  },
  {
    slug: "block-to-code-bridge",
    title: "Block-to-Code Bridge",
    category: ["EdTech", "Learning Tool", "Frontend"],
    summary:
      "A visual-to-text programming bridge that helps learners connect block-based logic with equivalent Python-style code.",
    shortSummary:
      "Visual programming bridge that maps block-based thinking into readable code for new learners.",
    role: "Sole engineer",
    projectStatus: "experimental",
    priority: 14,
    platforms: ["Web"],
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    responsibilities: [
      "Product concept",
      "Learning interaction design",
      "Frontend implementation",
      "Deployment",
    ],
    problem:
      "Moving from Scratch-style blocks to text programming can be a steep jump for younger beginners.",
    context:
      "Block-to-Code Bridge is a compact education experiment that supports the transition from visual logic to written code.",
    outcomes: [{ label: "Live learning experiment remains publicly reachable", verified: true }],
    links: [{ label: "View live", href: "https://block-to-code-bridge.vercel.app/", kind: "live" }],
    metadata: {
      productCategory: "Coding education experiment",
      ownership: "Solo product and engineering",
      visibility: "public",
    },
  },
  {
    slug: "queeneth-uti-portfolio",
    title: "Queeneth Uti Portfolio",
    shortTitle: "Queeneth Portfolio",
    category: ["Portfolio", "Frontend"],
    summary:
      "A custom portfolio website for a community-management professional, designed to present events, milestones, and professional narrative clearly.",
    shortSummary:
      "Custom professional portfolio for a community manager, focused on clear narrative and event experience.",
    role: "Designer and developer",
    projectStatus: "live",
    priority: 15,
    platforms: ["Web"],
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    responsibilities: [
      "Visual design",
      "Frontend implementation",
      "Responsive polish",
      "Deployment",
    ],
    problem:
      "A community-management professional needed a polished portfolio that made event experience and career narrative easy to scan.",
    context:
      "This project represents client-style frontend delivery rather than a platform architecture case study.",
    outcomes: [{ label: "Live portfolio remains publicly reachable", verified: true }],
    links: [{ label: "View live", href: "https://queeneth-portfolio.vercel.app/", kind: "live" }],
    metadata: {
      productCategory: "Professional portfolio",
      ownership: "End-to-end design and development",
      visibility: "public",
    },
  },
  {
    slug: "agricultural-data-dashboard",
    title: "Agricultural Data Dashboard",
    shortTitle: "Agricultural Dashboard",
    category: ["Data", "AI", "Full-stack"],
    summary:
      "A data-dashboard project exploring crop-yield and market-pricing insight workflows with backend ingestion and chart-based reporting.",
    shortSummary:
      "Private data-dashboard project for crop-yield and market-pricing insight workflows.",
    role: "Engineer",
    projectStatus: "private",
    priority: 16,
    platforms: ["Web"],
    technologies: ["Python", "Flask", "Chart.js"],
    responsibilities: [
      "Backend implementation",
      "Data workflow exploration",
      "Dashboard interface",
      "Visualization",
    ],
    problem:
      "Agricultural stakeholders needed clearer ways to inspect crop-yield and market-pricing trends.",
    context:
      "The earlier portfolio listed this as a data-dashboard project, but no public route, repository, or asset exists in the current repository history.",
    outcomes: [{ label: "Private project details available on request", verified: true }],
    metadata: {
      productCategory: "Private data dashboard",
      ownership: "Engineering implementation",
      visibility: "private",
    },
  },
] satisfies PortfolioProject[];

export const primaryProjects = projects
  .filter((project) => project.featured)
  .sort((a, b) => a.priority - b.priority);

export const featuredProjects = primaryProjects;

export const additionalProjects = projects
  .filter((project) => !project.featured)
  .sort((a, b) => a.priority - b.priority);

export const getProjectBySlug = (slug: string) => projects.find((project) => project.slug === slug);
