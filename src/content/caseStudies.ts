import { getProjectBySlug, projects, type ProjectLink } from "@/content/projects";

export type CaseStudyStatusState =
  | "implemented"
  | "in-progress"
  | "planned"
  | "deferred"
  | "private"
  | "available";

export type CaseStudyTextSection = {
  id: string;
  eyebrow?: string;
  title: string;
  lead?: string;
  body?: string[];
  bullets?: string[];
};

export type CaseStudyOwnershipGroup = {
  label:
    | "Led"
    | "Implemented"
    | "Integrated"
    | "Refactored"
    | "Collaborated on"
    | "Inherited"
    | "In progress"
    | "Planned";
  items: string[];
};

export type CaseStudyStatusItem = {
  label: string;
  state: CaseStudyStatusState;
  detail?: string;
};

export type ArchitectureNode = {
  id: string;
  label: string;
  detail?: string;
  group?: string;
};

export type ArchitectureConnection = {
  from: string;
  to: string;
  label?: string;
};

export type CaseStudyArchitecture = {
  title: string;
  lead?: string;
  nodes: ArchitectureNode[];
  connections: ArchitectureConnection[];
  notes?: string[];
};

export type TechnicalDecisionEntry = {
  title: string;
  context: string;
  decision: string;
  alternatives?: string[];
  tradeoffs?: string[];
  result?: string;
  limitation?: string;
};

export type ChallengeResponseEntry = {
  title: string;
  whyItMattered: string;
  constraints?: string[];
  response: string;
  result?: string;
  remainingLimitation?: string;
};

export type CaseStudyPhase = {
  title: string;
  status?: CaseStudyStatusState;
  items: string[];
};

export type CaseStudySkillGroup = {
  title: string;
  items: string[];
};

export type CaseStudyMediaItem = {
  label: string;
  src?: string;
  alt?: string;
  caption?: string;
  kind: "screenshot" | "diagram" | "document";
  width?: number;
  height?: number;
};

export type RelatedProjectLink = {
  slug: string;
  reason?: string;
};

export type CaseStudySeo = {
  title: string;
  description: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogUrl: string;
  socialImage?: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  shortTitle: string;
  productCategory: string;
  summary: string;
  role: string;
  timeframe?: string;
  projectStatus: string;
  confidentiality?: string;
  platforms: string[];
  technologies: string[];
  skillGroups?: CaseStudySkillGroup[];
  canonicalUrl: string;
  liveUrl?: string;
  repositoryUrl?: string;
  caseStudyAvailable: boolean;
  hero: {
    eyebrow?: string;
    title: string;
    summary: string;
    primaryMediaNote?: string;
  };
  overview: CaseStudyTextSection;
  productContext?: CaseStudyTextSection;
  users?: CaseStudyTextSection;
  inheritedContext?: CaseStudyTextSection;
  teamContext?: CaseStudyTextSection;
  responsibilities?: CaseStudyOwnershipGroup[];
  problem?: CaseStudyTextSection;
  constraints?: string[];
  architecture?: CaseStudyArchitecture;
  keySystems?: CaseStudyTextSection[];
  technicalDecisions?: TechnicalDecisionEntry[];
  tradeoffs?: CaseStudyTextSection;
  implementationPhases?: CaseStudyPhase[];
  challenges?: ChallengeResponseEntry[];
  security?: CaseStudyTextSection;
  privacy?: CaseStudyTextSection;
  accessibility?: CaseStudyTextSection;
  performance?: CaseStudyTextSection;
  deployment?: CaseStudyTextSection;
  outcomes?: CaseStudyTextSection;
  currentStatus?: CaseStudyStatusItem[];
  lessons?: CaseStudyTextSection;
  gallery?: CaseStudyMediaItem[];
  mediaNote?: string;
  mediaRequirements?: string[];
  relatedProjects?: RelatedProjectLink[];
  links?: ProjectLink[];
  seo: CaseStudySeo;
  lastReviewed: string;
};

const project = (slug: string) => {
  const found = getProjectBySlug(slug);

  if (!found) {
    throw new Error(`Missing base project for case study: ${slug}`);
  }

  return found;
};

const asele = project("asele");
const teacheasy = project("teacheasy");
const reframe = project("reframe");

export const caseStudies = [
  {
    slug: "asele",
    title: asele.title,
    shortTitle: "Asele",
    productCategory: "Case Study / Women’s HealthTech Platform / Web, Android and iOS",
    summary: asele.summary,
    role: asele.role,
    projectStatus: "Public case study with product access available",
    confidentiality: "Health and wellness data is described at a systems level only.",
    platforms: asele.platforms ?? [],
    technologies: asele.technologies,
    skillGroups: [
      {
        title: "Frontend Engineering",
        items: ["React", "TypeScript", "Vite", "component architecture", "responsive UI", "forms", "data visualisation", "accessibility-aware UI"],
      },
      {
        title: "Backend and Database Engineering",
        items: ["Supabase", "PostgreSQL", "SQL", "database migrations", "Edge Functions", "RLS", "realtime data", "secure API workflows"],
      },
      {
        title: "Mobile Engineering",
        items: ["Capacitor", "Android Studio", "Xcode", "safe areas", "app lifecycle", "app signing", "TestFlight workflow", "Google Play release", "Apple App Store release"],
      },
      {
        title: "Security and Authorization",
        items: ["Supabase Auth", "Google OAuth", "Sign in with Apple", "JWT sessions", "user data isolation", "environment secrets"],
      },
      {
        title: "Cloud and Integrations",
        items: ["Firebase Cloud Messaging", "device tokens", "notification permissions", "scheduled reminders", "notification preferences"],
      },
      {
        title: "AI and Localisation",
        items: ["AI-assisted health briefs", "structured health context", "prompt guardrails", "24-language localisation", "Arabic RTL"],
      },
    ],
    canonicalUrl: "https://www.kenoye.site/projects/asele",
    liveUrl: asele.links?.find((link) => link.kind === "live")?.href,
    caseStudyAvailable: true,
    hero: {
      eyebrow: "Case Study / Women’s HealthTech Platform",
      title: "Asele",
      summary:
        "Privacy-conscious women’s cycle and wellness platform delivered across web, Android and iOS with React, TypeScript, Supabase, PostgreSQL, Capacitor, Firebase Cloud Messaging, localisation, and AI-assisted health briefs.",
      primaryMediaNote:
        "Temporary public website screenshots are included below while approved native application screenshots remain pending.",
    },
    overview: {
      id: "overview",
      eyebrow: "Overview",
      title: "What the product is",
      lead:
        "Asele is a privacy-conscious women’s cycle and wellness platform delivered across web, Android, and iOS.",
      body: [
        "The product brings cycle tracking, fertility-related calculations, late-period handling, wellness logging, health trend visualisation, cycle-aware reminders, multilingual support, health-context summaries, authentication, administrative workflows, and mobile delivery into a shared React foundation.",
        "The important engineering constraint is product safety: the platform can support tracking and wellness context without presenting itself as diagnosis, treatment, clinical approval, or a medical device.",
      ],
    },
    productContext: {
      id: "product-context",
      eyebrow: "Context",
      title: "Why it exists and who it serves",
      body: [
        "Asele serves users who need a private, respectful way to record cycle and wellness context, review trends, and receive reminders around sensitive personal data.",
        "The product also needs secure data access, administrative visibility, notification orchestration, mobile release workflows, and communication infrastructure so the platform can be operated responsibly after release.",
      ],
    },
    users: {
      id: "users",
      title: "Primary users",
      bullets: [
        "People tracking menstrual-cycle and wellness context.",
        "Administrators managing product content, operational workflows, and user-support visibility.",
        "Mobile users who expect native delivery behavior such as safe areas, OAuth redirects, notifications, app lifecycle handling, and platform-specific release workflows.",
      ],
    },
    responsibilities: [
      {
        label: "Led",
        items: [
          "Full-stack product architecture across React, TypeScript, Vite, Supabase, PostgreSQL, and Capacitor.",
          "Secure health-data access patterns using Supabase Authentication, JWT sessions, and PostgreSQL Row Level Security.",
          "Product boundaries for cycle tracking, wellness insights, reminders, and AI-assisted health-context summaries.",
          "Android production release and Apple App Store release from the shared Capacitor mobile delivery workflow.",
        ],
      },
      {
        label: "Implemented",
        items: [
          "Cycle tracking, fertility-window calculations, late-period handling, historical health trends, reminder preferences, and administrative reporting workflows.",
          "Firebase Cloud Messaging push registration, device-token handling, notification-centre behavior, cycle-aware reminders, and recurring birth-control reminders.",
          "24-language localisation with locale-aware UI architecture, Arabic right-to-left layout handling, and mobile-safe responsive interfaces.",
          "Production administration features including user activity reporting and CSV export.",
        ],
      },
      {
        label: "Integrated",
        items: [
          "Google OAuth, Sign in with Apple deployment workflow, Supabase Edge Function boundaries, Firebase Cloud Messaging, and AI-assisted health brief workflows.",
        ],
      },
      {
        label: "In progress",
        items: [
          "Ongoing post-release monitoring and store-compliance maintenance after Android and iOS release.",
        ],
      },
    ],
    problem: {
      id: "problem",
      eyebrow: "Problem",
      title: "Private wellness context without overclaiming",
      body: [
        "The core problem was not only building features. It was shaping a product system that could support sensitive wellness use cases while avoiding unsupported medical claims.",
        "That meant designing around clear boundaries: tracking, reminders, support, and assistive briefs rather than diagnosis, treatment, or clinical guarantees.",
      ],
    },
    constraints: [
      "Sensitive health and wellness information requires conservative public language.",
      "Mobile delivery needed to preserve React product velocity while still respecting native signing, store, OAuth, safe-area, and notification requirements.",
      "AI-assisted briefs needed structured user context, prompt guardrails, and presentation boundaries so they remain assistive summaries, not clinical decisions.",
      "Public case-study content cannot include private user data or internal implementation secrets.",
    ],
    architecture: {
      title: "Asele platform architecture",
      lead:
        "A shared React and TypeScript product surface connects to Supabase Authentication, PostgreSQL, RLS policies, Edge Functions, administrative tooling, Firebase push workflows, and native app delivery through Capacitor.",
      nodes: [
        { id: "user", label: "Web and mobile users", detail: "Cycle, wellness, reminder, and brief workflows", group: "Experience" },
        { id: "react", label: "React + TypeScript + Vite app", detail: "Shared product interface, reusable UI system, forms, state, and visualisation", group: "Application" },
        { id: "capacitor", label: "Capacitor mobile layer", detail: "Android production delivery and Apple App Store release", group: "Mobile" },
        { id: "supabase", label: "Supabase", detail: "Auth, PostgreSQL, RLS, realtime data, and Edge Functions", group: "Backend" },
        { id: "notifications", label: "Firebase Cloud Messaging", detail: "Device tokens, permissions, notification centre, and cycle-aware reminders", group: "Integration" },
        { id: "oauth", label: "Platform authentication", detail: "Google OAuth, Apple sign-in workflow, redirects, and JWT sessions", group: "Security" },
        { id: "ai", label: "AI-assisted brief workflow", detail: "Structured health context, prompt guardrails, and response presentation", group: "AI" },
        { id: "admin", label: "Administrative tooling", detail: "User activity reporting, CSV export, and operational visibility", group: "Operations" },
      ],
      connections: [
        { from: "user", to: "react", label: "uses" },
        { from: "react", to: "capacitor", label: "ships through" },
        { from: "react", to: "supabase", label: "reads and writes" },
        { from: "supabase", to: "notifications", label: "triggers reminders" },
        { from: "react", to: "oauth", label: "authenticates through" },
        { from: "supabase", to: "ai", label: "supports summaries" },
        { from: "admin", to: "supabase", label: "operates data" },
      ],
      notes: [
        "The diagram intentionally avoids private schema details and secrets.",
        "Color is not required to understand the node groups; connections are listed in text for accessibility.",
      ],
    },
    keySystems: [
      {
        id: "cycle-health-systems",
        title: "Cycle, fertility, and wellness systems",
        body: [
          "Implemented cycle tracking, fertility-window calculations, late-period handling, historical cycle records, wellness logging, and health trend presentation as product-support workflows.",
          "The public case study avoids claims about diagnosis, treatment, clinical precision, or health outcomes.",
        ],
      },
      {
        id: "secure-data-access",
        title: "Secure health-data access",
        body: [
          "Supabase Authentication and PostgreSQL Row Level Security were used as the boundary for private user health data so authenticated users can access only their own records.",
          "Security-sensitive details remain described at a systems level; schemas, policy internals, credentials, and private data are not published.",
        ],
      },
      {
        id: "notification-engine",
        title: "Cycle-aware notification engine",
        body: [
          "Reminder workflows coordinate Firebase Cloud Messaging, notification permissions, device-token management, user preferences, recurring schedules, birth-control reminders, and cycle state.",
          "This work is status-labelled as notification and reminder orchestration, not as a guarantee of health outcomes.",
        ],
      },
      {
        id: "mobile-delivery",
        title: "Cross-platform mobile delivery",
        body: [
          "Capacitor carried the shared React codebase through Android production delivery and Apple App Store release while still requiring native-platform debugging.",
          "Platform-specific work included safe-area behavior, app lifecycle handling, authentication redirects, push registration, and release configuration.",
        ],
      },
      {
        id: "localisation-ai-admin",
        title: "Localisation, AI briefs, and administration",
        body: [
          "The application supports 24 languages, locale-aware content, Arabic right-to-left interfaces, AI-assisted health briefs, user activity reporting, and CSV export workflows.",
          "AI briefs combine structured user context with guarded output presentation and remain framed as assistive wellness summaries.",
        ],
      },
    ],
    technicalDecisions: [
      {
        title: "Use Supabase as the product backend",
        context:
          "The product needed authentication, database access, privacy controls, server-side functions, and operational tooling without a large custom backend surface.",
        decision:
          "Use Supabase-backed auth, PostgreSQL, RLS, realtime capabilities, and Edge Functions as the application backend foundation.",
        tradeoffs: [
          "The architecture benefits from managed infrastructure but still requires careful RLS policy design and production secret management.",
        ],
        result:
          "The frontend, mobile workflow, administrative tooling, and integrations can share one backend foundation.",
      },
      {
        title: "Enforce private health data at the database layer",
        context:
          "Cycle and wellness records are sensitive and should not rely on UI filtering as the primary access boundary.",
        decision:
          "Use authenticated Supabase sessions with PostgreSQL Row Level Security policies for user-data isolation.",
        tradeoffs: [
          "RLS adds policy and migration discipline, but it makes private-data access a database-level concern instead of only a frontend convention.",
        ],
        result:
          "The public case study can describe secure data isolation without exposing private schemas or policy internals.",
      },
      {
        title: "Use Capacitor for mobile delivery",
        context:
          "The product needed mobile distribution without splitting the product into unrelated web and native implementations.",
        decision:
          "Use Capacitor to carry the React product into Android and iOS delivery workflows.",
        tradeoffs: [
          "Capacitor preserves shared velocity, but native details like deep links, notifications, safe areas, and store readiness still need platform-specific work.",
        ],
        result:
          "Android and iOS production delivery became possible from the shared application foundation.",
      },
      {
        title: "Keep localisation inside the component system",
        context:
          "Supporting 24 languages, including Arabic right-to-left layouts, can fragment UI components if localisation is bolted on late.",
        decision:
          "Treat locale-aware strings and RTL layout requirements as part of the reusable React interface architecture.",
        tradeoffs: [
          "Internationalisation increases QA surface area, especially on narrow mobile screens, but avoids separate per-locale UI forks.",
        ],
      },
    ],
    implementationPhases: [
      { title: "Product and data foundation", status: "implemented", items: ["React and TypeScript product surface", "Supabase Authentication", "PostgreSQL data model", "Row Level Security access boundaries", "Privacy-sensitive product boundaries"] },
      { title: "Domain workflows", status: "implemented", items: ["Cycle tracking", "Fertility-window calculations", "Late-period handling", "Historical trends", "AI-assisted health briefs"] },
      { title: "Mobile and notifications", status: "implemented", items: ["Capacitor workflow", "Android production release", "Apple App Store release", "Firebase Cloud Messaging", "Cycle-aware reminders"] },
      { title: "Localisation and operations", status: "implemented", items: ["24-language localisation", "Arabic RTL layout support", "User activity reporting", "CSV export"] },
    ],
    challenges: [
      {
        title: "Secure health-data access",
        whyItMattered:
          "Cycle and wellness records are private by nature, so authenticated access needs to be enforced beyond screen-level checks.",
        constraints: ["Public case-study content cannot expose schemas, private policies, credentials, or user data."],
        response:
          "Supabase Authentication, JWT-backed sessions, and PostgreSQL Row Level Security patterns were used to isolate private records at the data layer.",
        result: "The case study can communicate security depth without publishing sensitive implementation details.",
      },
      {
        title: "Cross-platform mobile delivery",
        whyItMattered:
          "The product needed web development velocity while still meeting Android and iOS requirements for signing, safe areas, app lifecycle, notifications, and store submission.",
        response:
          "Capacitor was used as the mobile bridge while preserving React and TypeScript as the core product implementation and adding native-platform debugging where needed.",
        result:
          "Android production release and Apple App Store release are represented as completed production delivery.",
      },
      {
        title: "Notification orchestration",
        whyItMattered:
          "Health-adjacent reminders depend on user preferences, cycle state, recurring schedules, notification permissions, and device-token reliability.",
        response:
          "Firebase Cloud Messaging, notification preference controls, device-token handling, scheduled reminders, cycle-aware triggers, and recurring birth-control reminders were implemented as coordinated workflows.",
        result: "The notification system is described as implemented without claiming guaranteed user behavior or health outcomes.",
      },
      {
        title: "Internationalisation across 24 languages",
        whyItMattered:
          "Localised wellness interfaces need readable copy, stable responsive layouts, and right-to-left support without creating a separate component system.",
        constraints: ["Arabic RTL layouts and narrow mobile screens create the highest risk for overflow and layout drift."],
        response:
          "Locale-aware content and right-to-left layout handling were integrated into the React interface patterns so translated UI could remain part of the shared product system.",
        result: "The platform can represent 24-language support and Arabic RTL handling as implemented product architecture.",
      },
      {
        title: "Mobile authentication",
        whyItMattered:
          "OAuth and Sign in with Apple behave differently across web, Android, iOS, redirect flows, and app lifecycle transitions.",
        response:
          "Google OAuth, the Sign in with Apple deployment workflow, JWT session handling, redirect debugging, and native lifecycle behavior were handled as part of mobile release readiness.",
        result:
          "The authentication workflow supported the completed iOS App Store release.",
      },
    ],
    security: {
      id: "security",
      eyebrow: "Security",
      title: "Authentication, authorization, and private data boundaries",
      body: [
        "Asele uses Supabase Authentication, JWT-backed sessions, OAuth workflows, and PostgreSQL Row Level Security patterns to keep private health records isolated by authenticated user context.",
        "The portfolio intentionally describes security at the architectural level only. It does not publish policy internals, secrets, database schemas, private user data, or operational credentials.",
      ],
    },
    privacy: {
      id: "privacy",
      eyebrow: "Privacy",
      title: "Health-data modelling and privacy",
      body: [
        "Asele is framed as a cycle and wellness product, not a diagnostic or treatment tool. AI-assisted briefs are presented as structured wellness summaries with guardrails, not clinical decisions.",
        "Public documentation should describe privacy-sensitive architecture at a high level only. The case study does not expose schemas, private policies, user data, credentials, or operational secrets.",
      ],
    },
    deployment: {
      id: "deployment",
      eyebrow: "Deployment",
      title: "Deployment and store readiness",
      body: [
        "Asele is represented with Android production release and Apple App Store release completed. The release work included iOS build, signing, TestFlight, export-compliance, App Store submission, and platform-specific debugging.",
      ],
    },
    outcomes: {
      id: "outcomes",
      title: "Outcomes",
      bullets: asele.outcomes?.map((outcome) => outcome.label),
    },
    currentStatus: [
      { label: "Android production delivery", state: "implemented", detail: "Completed according to existing portfolio content." },
      { label: "Apple App Store release", state: "implemented", detail: "Completed after iOS build, signing, TestFlight, export-compliance, and App Store submission work." },
      { label: "Secure health-data access with PostgreSQL RLS", state: "implemented" },
      { label: "Cycle-aware notification engine", state: "implemented" },
      { label: "24-language localisation with Arabic RTL", state: "implemented" },
      { label: "AI-assisted health briefs", state: "implemented", detail: "Presented as assistive wellness summaries, not diagnosis or treatment." },
      { label: "Administrative reporting and CSV export", state: "implemented" },
    ],
    lessons: {
      id: "lessons",
      title: "Lessons",
      bullets: [
        "Health-adjacent product work needs as much care in language and boundaries as it needs in implementation.",
        "Capacitor can preserve shared product velocity, but mobile release quality still depends on native-platform discipline.",
        "Privacy-sensitive features are easier to maintain when authentication, RLS, notification permissions, and data-minimising public communication are modelled as first-class product constraints.",
      ],
    },
    gallery: [
      {
        label: "Asele public homepage desktop",
        src: "/images/projects/asele/asele-public-home-desktop.webp",
        alt: "Asele public website showing the cycle and wellness product overview.",
        caption: "Public website introducing Asele's women's health platform.",
        kind: "screenshot",
        width: 1440,
        height: 900,
      },
      {
        label: "Asele public homepage mobile",
        src: "/images/projects/asele/asele-public-home-mobile.webp",
        alt: "Mobile viewport of the Asele public website hero for cycle and wellness tracking.",
        caption: "Responsive public experience across desktop and mobile web.",
        kind: "screenshot",
        width: 390,
        height: 844,
      },
      {
        label: "Asele public feature section",
        src: "/images/projects/asele/asele-public-features.webp",
        alt: "Asele public website feature section listing cycle tracking, reminders, mood logging, and wellness tips.",
        caption: "Public product experience supporting the platform discussed in this case study.",
        kind: "screenshot",
        width: 1440,
        height: 900,
      },
      {
        label: "Asele public health brief overview",
        src: "/images/projects/asele/asele-public-health-brief.webp",
        alt: "Asele public app page describing cycle logging, private guidance, and the Asele Health Brief.",
        caption: "Public overview of Asele's AI-assisted health brief feature.",
        kind: "screenshot",
        width: 1440,
        height: 900,
      },
      {
        label: "Asele public privacy and wellness section",
        src: "/images/projects/asele/asele-public-wellness.webp",
        alt: "Asele public website section describing period logging, mood tracking, reminders, and private encrypted data.",
        caption: "Public privacy and wellness messaging aligned with the product boundaries in this case study.",
        kind: "screenshot",
        width: 1440,
        height: 560,
      },
    ],
    mediaNote:
      "These images are from Asele's public website. Native mobile screenshots will replace them once approved for publication.",
    mediaRequirements: [
      "Approved native mobile cycle or wellness workflow screenshot with private data removed.",
      "Approved health-brief or reminder workflow screenshot using synthetic or redacted data.",
      "Administrative workflow screenshot with private data removed.",
      "Replace temporary public website captures when approved native application screenshots are available.",
    ],
    relatedProjects: [{ slug: "teacheasy", reason: "Another Supabase-backed platform with permissions and product operations as core architecture." }],
    links: asele.links,
    seo: {
      title: "Asele Case Study | HealthTech, Supabase and Capacitor Engineering",
      description:
        "Asele case study covering senior full-stack engineering for a women's HealthTech platform built with React, TypeScript, Supabase, PostgreSQL Row Level Security, Capacitor, Firebase push notifications, AI integration, Google Play deployment, and Apple App Store release.",
      canonicalUrl: "https://www.kenoye.site/projects/asele",
      ogTitle: "Asele HealthTech Case Study",
      ogDescription:
        "A senior engineering case study on Asele's wellness workflows, mobile delivery, Supabase RLS, notifications, AI briefs, and privacy-sensitive product architecture.",
      ogUrl: "https://www.kenoye.site/projects/asele",
      socialImage: "https://www.kenoye.site/og-asele.svg",
    },
    lastReviewed: "2026-07-25",
  },
  {
    slug: "teacheasy",
    title: teacheasy.title,
    shortTitle: "TeachEasy",
    productCategory: "Case Study / Multi-Tenant Education SaaS / Learning Management System",
    summary: teacheasy.summary,
    role: teacheasy.role,
    projectStatus: "Public case study with live product link",
    platforms: teacheasy.platforms ?? [],
    technologies: teacheasy.technologies,
    skillGroups: [
      {
        title: "SaaS and Multi-Tenant Architecture",
        items: ["tenant-scoped routing", "academy portals", "tenant-aware queries", "secure tenant isolation", "academy branding", "tenant settings"],
      },
      {
        title: "Frontend Engineering",
        items: ["React", "TypeScript", "Vite", "dashboard components", "role-specific interfaces", "complex forms", "scheduling UI", "permission-aware rendering"],
      },
      {
        title: "Backend and Database Engineering",
        items: ["Supabase", "PostgreSQL", "migrations", "SQL functions", "triggers", "RLS", "Realtime", "file-storage policies", "reporting queries"],
      },
      {
        title: "Security and Authorization",
        items: ["multi-role auth", "admins", "tutors", "students", "parents", "super admins", "permission matrices", "participant-level access"],
      },
      {
        title: "Learning Systems",
        items: ["recurring scheduling", "attendance", "Jitsi Meet", "Yjs", "tldraw", "shared PDFs", "shared notes", "quizzes", "scoring"],
      },
      {
        title: "Cloud and Integrations",
        items: ["Supabase Edge Functions", "Resend", "webhooks", "email delivery events", "automated reminders", "CSV export", "GitHub"],
      },
    ],
    canonicalUrl: "https://www.kenoye.site/projects/teacheasy",
    liveUrl: teacheasy.links?.find((link) => link.kind === "live")?.href,
    caseStudyAvailable: true,
    hero: {
      eyebrow: "Case Study / Multi-Tenant Education SaaS",
      title: "TeachEasy LMS",
      summary:
        "Multi-tenant learning management platform for academies, tutors, students, and parents with tenant-specific portals, PostgreSQL RLS, recurring scheduling, Jitsi classrooms, real-time collaboration, assessments, attendance, messaging, and email delivery tracking.",
      primaryMediaNote:
        "Verified TeachEasy product screenshots are not stored in this repository. The page uses architecture and written evidence until sanitized product media is available.",
    },
    overview: {
      id: "overview",
      title: "What the product is",
      lead:
        "TeachEasy is a multi-tenant learning-management platform for academies, tutors, students, and parents.",
      body: [
        "The platform is built around academy operations: tenant-specific portals, role-based dashboards, tutor and student management, class scheduling, recurring lessons, live classrooms, collaborative learning tools, assessments, attendance, messaging, reporting, and academy-level administration.",
        "The engineering focus is less about a single feature and more about coordinating roles, permissions, tenant boundaries, and learning workflows so each user sees the right work at the right time.",
      ],
    },
    productContext: {
      id: "business-context",
      eyebrow: "Context",
      title: "Product and business context",
      body: [
        "Academies often coordinate learning across disconnected scheduling, video, notes, document sharing, student management, parent communication, assessment, attendance, and tutor workflows.",
        "TeachEasy brings those workflows into a shared platform while keeping tenant separation, role-specific access, and database-enforced authorization at the center of the architecture.",
      ],
    },
    users: {
      id: "users",
      title: "Users and roles",
      bullets: [
        "Academy administrators managing tenants, users, schedules, branding, and operational visibility.",
        "Tutors managing classes, materials, notes, live sessions, and assessments.",
        "Students joining classes, using collaborative materials, and completing assessments.",
        "Parents following learner context and communication where the product permits it.",
      ],
    },
    responsibilities: [
      {
        label: "Led",
        items: [
          "Multi-tenant platform architecture and role-based product modelling.",
          "Admin, tutor, student, and parent portal structure.",
          "Tenant-scoped routing, academy settings, class management, tenant branding, and communication-system architecture.",
        ],
      },
      {
        label: "Implemented",
        items: [
          "Supabase and PostgreSQL RLS patterns for academy tenancy, role scoping, participant-level access, storage authorization, and reporting queries.",
          "Recurring class scheduling with occurrence-level, current-and-future, and full-series management options.",
          "Tutor permission controls at both academy and individual tutor levels.",
          "Jitsi classroom integration, shared PDFs, notes, whiteboard, quizzes, attendance, parent-visible assessment results, and collaborative state persistence.",
          "Academy messaging, automated reminders, Resend webhook tracking, user metrics, active-user reporting, and CSV export.",
        ],
      },
      {
        label: "Integrated",
        items: [
          "Yjs and Supabase Realtime for collaborative lesson state, Jitsi academy meeting domains, Resend transactional email, and webhook event history for sent, delivered, bounced, opened, and clicked messages.",
        ],
      },
      {
        label: "Planned",
        items: [
          "Jitsi JWT authentication is represented as JWT-ready infrastructure until production secret configuration and QA are externally confirmed.",
        ],
      },
    ],
    problem: {
      id: "problem",
      title: "A single platform for academy work",
      body: [
        "The product needed to support multiple academies and roles without turning every workflow into a custom one-off implementation.",
        "Permissions and tenancy had to be structural, not only visual, because administrators, tutors, students, and parents each need different access boundaries.",
      ],
    },
    constraints: [
      "Tenant data must be isolated across academies.",
      "Tutor, student, parent, and admin access needs to be explicit and role-aware.",
      "Some classroom authentication paths require production secrets and should be represented as ready for activation until configuration evidence is confirmed.",
      "Public screenshots cannot expose real academy, student, parent, tutor, payment, or assessment data.",
    ],
    architecture: {
      title: "TeachEasy multi-tenant architecture",
      lead:
        "A React and TypeScript application uses Supabase, PostgreSQL RLS, Realtime, Edge Functions, Jitsi, Yjs, and Resend integration boundaries to support tenant-specific academy operations.",
      nodes: [
        { id: "academy", label: "Academy tenant", detail: "Tenant identity, branding, users, and operations", group: "Tenant" },
        { id: "admin", label: "Admin portal", detail: "Academy setup, users, scheduling, communications", group: "Portal" },
        { id: "tutor", label: "Tutor portal", detail: "Classes, materials, live sessions, assessments", group: "Portal" },
        { id: "student", label: "Student portal", detail: "Class access, collaboration, quizzes", group: "Portal" },
        { id: "parent", label: "Parent portal", detail: "Learner context and permitted communication", group: "Portal" },
        { id: "supabase", label: "Supabase + PostgreSQL RLS", detail: "Tenant-aware auth, role access, storage policies, and reporting", group: "Backend" },
        { id: "scheduler", label: "Recurring scheduler", detail: "Series identifiers, occurrences, future changes, and completed lesson history", group: "Learning" },
        { id: "jitsi", label: "Jitsi Meet integration", detail: "Academy domains, classroom routes, moderators, participant context, JWT-ready auth", group: "Integration" },
        { id: "collab", label: "Collaborative workspace", detail: "Yjs, Supabase Realtime, shared PDFs, whiteboard, notes, and persistence", group: "Learning" },
        { id: "assessments", label: "Assessments", detail: "Quiz creation, submissions, scoring, parent visibility, and RLS", group: "Learning" },
        { id: "email", label: "Resend email infrastructure", detail: "Transactional email, newsletters, webhooks, and delivery event history", group: "Integration" },
      ],
      connections: [
        { from: "academy", to: "admin", label: "configures" },
        { from: "admin", to: "supabase", label: "manages" },
        { from: "tutor", to: "supabase", label: "reads and writes" },
        { from: "student", to: "supabase", label: "accesses permitted data" },
        { from: "parent", to: "supabase", label: "accesses permitted data" },
        { from: "admin", to: "scheduler", label: "plans classes" },
        { from: "scheduler", to: "supabase", label: "persists lessons" },
        { from: "tutor", to: "jitsi", label: "starts class" },
        { from: "student", to: "jitsi", label: "joins class" },
        { from: "jitsi", to: "collab", label: "supports lesson workflow" },
        { from: "collab", to: "assessments", label: "supports assessment context" },
        { from: "supabase", to: "email", label: "sends communications" },
      ],
      notes: [
        "Jitsi classroom integration is represented as implemented; JWT authentication remains described as JWT-ready infrastructure until production secret configuration and QA are confirmed.",
        "The diagram shows product boundaries without exposing tenant policies or private implementation details.",
      ],
    },
    keySystems: [
      {
        id: "tenant-rls",
        title: "Multi-tenant data isolation",
        body: [
          "Academy tenancy, tenant-aware queries, academy-specific routes, configurable branding, and PostgreSQL Row Level Security shape access boundaries across administrators, tutors, students, parents, and super administrators.",
          "The database model treats tenant and role context as a structural concern rather than relying only on client-side filtering.",
        ],
      },
      {
        id: "scheduling",
        title: "Scheduling, recurrence, and attendance",
        body: [
          "Scheduling connects academies, tutors, students, lesson series, attendance, automated reminders, and completed lesson history so operational work has a single source of coordination.",
          "Recurring lessons support occurrence-level changes, current-and-future changes, full-series deletion, and preservation of completed lesson state.",
        ],
      },
      {
        id: "classroom",
        title: "Live classroom and collaborative workspace",
        body: [
          "Jitsi Meet supports live lessons through academy-aware domains, classroom route generation, participant-context resolution, moderator role handling, recording permissions, and parent access rules.",
          "The collaborative lesson workspace combines shared PDF viewing, shared notes, tldraw-style whiteboarding, live coding workspace concepts, Yjs document synchronisation, Supabase Realtime, and persistence of collaborative state.",
        ],
      },
      {
        id: "assessments-documents",
        title: "Assessments and document security",
        body: [
          "Quiz creation, question management, student submissions, answer capture, scoring workflows, parent-visible results, and assessment-specific Row Level Security support the learning loop.",
          "Document-sharing rules cover assignment-specific uploads, student and parent documents, tutor upload restrictions, academy-scoped storage policies, secure file access, and PDF classroom workflows.",
        ],
      },
      {
        id: "communications-reporting",
        title: "Messaging, email observability, and reporting",
        body: [
          "Resend-backed transactional email, academy newsletters, tenant-specific messaging, automated reminders, webhook event tracking, and email delivery history support academy communication.",
          "Administration and reporting include dashboards, tutor/student/parent management, attendance reports, active-user reporting, configurable currencies, policy management, super-admin metrics, and CSV export.",
        ],
      },
    ],
    technicalDecisions: [
      {
        title: "Make tenancy part of the data model",
        context:
          "Academies need separate users, schedules, materials, communications, and operational settings.",
        decision:
          "Use academy tenancy with Supabase and PostgreSQL RLS rather than relying only on UI-level filtering.",
        tradeoffs: [
          "RLS increases policy complexity, but it makes authorization a structural property of the system.",
        ],
        result:
          "The platform can support admin, tutor, student, and parent access around tenant-aware boundaries.",
      },
      {
        title: "Enforce permissions in both UI and database",
        context:
          "Academy administrators, tutors, students, parents, and super administrators have overlapping but different capabilities.",
        decision:
          "Model role and participant context explicitly, render permission-aware interfaces, and back those interfaces with PostgreSQL RLS and storage policies.",
        tradeoffs: [
          "The permission model requires more regression testing, but it reduces the chance that a UI-only check becomes the true authorization boundary.",
        ],
        result:
          "Tutor-specific permissions, parent visibility, assessment access, and document-sharing workflows can be reasoned about from both product and database perspectives.",
      },
      {
        title: "Represent recurring lessons as series and occurrences",
        context:
          "Academies need to change one lesson, future lessons, or a full recurring series without corrupting completed lesson history.",
        decision:
          "Use recurring-series management concepts with occurrence-level, current-and-future, and full-series operations.",
        tradeoffs: [
          "Series management adds data-model and UI complexity, but it makes scheduling behavior predictable for academy operators.",
        ],
      },
      {
        title: "Integrate classroom workflows instead of only linking video calls",
        context:
          "Live instruction needs more than a meeting URL; tutors and students need materials, notes, collaboration, and assessments around the class.",
        decision:
          "Use Jitsi Meet integration alongside shared PDFs, notes, whiteboard, quizzes, Yjs, and Supabase Realtime so the live lesson has surrounding learning context.",
        limitation:
          "Jitsi JWT authentication remains described as JWT-ready infrastructure until production secret configuration and QA are confirmed.",
      },
      {
        title: "Capture email delivery events",
        context:
          "Academy communications need more observability than a send button can provide.",
        decision:
          "Use Resend webhook events to record sent, delivered, bounced, opened, and clicked states in delivery history.",
        result:
          "Academy administrators can reason about communication outcomes without unsupported claims about guaranteed engagement.",
      },
    ],
    implementationPhases: [
      { title: "Tenant and portal foundation", status: "implemented", items: ["Academy tenancy", "Tenant-scoped routing", "Academy-specific portals", "Role-specific dashboards", "Supabase and PostgreSQL RLS architecture"] },
      { title: "Learning workflow systems", status: "implemented", items: ["Class scheduling", "Recurring lesson management", "Tutor permissions", "Student assignment", "Attendance", "Automated reminders"] },
      { title: "Classroom and collaboration", status: "implemented", items: ["Jitsi live classroom integration", "Shared PDFs", "Shared notes", "Whiteboard", "Yjs collaboration", "Supabase Realtime persistence"] },
      { title: "Assessment, communication, and reporting", status: "implemented", items: ["Quiz workflows", "Parent-visible assessment results", "Secure document sharing", "Academy messaging", "Resend webhook event history", "CSV export"] },
      { title: "Classroom authentication hardening", status: "in-progress", items: ["JWT-ready Jitsi authentication", "Production secret configuration", "Moderation and edge-case QA"] },
    ],
    challenges: [
      {
        title: "Multi-tenant data isolation",
        whyItMattered:
          "A multi-tenant education product loses trust quickly if tenant boundaries are only implied by interface state.",
        constraints: ["Each academy needs separate routes, settings, users, documents, lessons, assessments, communications, and reports."],
        response:
          "Tenant-scoped routing, tenant-aware queries, academy-specific settings, and PostgreSQL Row Level Security patterns were used as the foundation for the platform.",
        result: "Role-specific portals can be built around explicit tenant boundaries rather than informal UI conventions.",
      },
      {
        title: "Role and permission complexity",
        whyItMattered:
          "Academy administrators, tutors, students, parents, and super administrators need different capabilities across scheduling, documents, lessons, assessments, attendance, and reporting.",
        constraints: ["Tutor-specific permissions and parent visibility rules require more nuance than broad role checks."],
        response:
          "Permission-aware UI rendering was paired with database-enforced role, tenant, participant, and storage policies.",
        result: "Authorization can be communicated as both product behaviour and backend architecture.",
      },
      {
        title: "Recurring scheduling",
        whyItMattered:
          "Recurring lessons are easy to create but difficult to edit safely once students, tutors, attendance, and completed sessions are attached.",
        constraints: ["Completed lessons should not be casually destroyed by a future schedule change."],
        response:
          "Recurring-series identifiers and occurrence-level workflows support deleting one occurrence, deleting current and future occurrences, deleting an entire series, and preserving completed lesson history.",
        result: "Academies get flexible scheduling controls without flattening every recurring class into unrelated events.",
      },
      {
        title: "Real-time collaboration",
        whyItMattered:
          "A live classroom needs shared state for whiteboards, documents, notes, and lesson context, not only a meeting room.",
        response:
          "Yjs and Supabase Realtime were used for collaborative document state synchronisation and persistence around shared PDFs, notes, whiteboard, and workspace flows.",
        result: "Lesson participants can share learning context inside the platform rather than juggling disconnected tools.",
      },
      {
        title: "Video classroom ownership",
        whyItMattered:
          "Video meetings need to respect academy tenancy, classroom routes, tutor moderation, parent access, participant context, and recording permissions.",
        response:
          "Jitsi Meet was integrated with academy-aware meeting domains, classroom route generation, participant-context resolution, moderator-role handling, and JWT-ready authentication boundaries.",
        remainingLimitation:
          "JWT authentication and production moderation behaviour should continue to be verified around secrets and edge-case QA before being described as fully enforced.",
      },
      {
        title: "Email observability",
        whyItMattered:
          "Academy messaging needs a reliable delivery history for operational support and communication follow-up.",
        response:
          "Resend webhooks record sent, delivered, bounced, opened, and clicked events for transactional email and academy communication workflows.",
        result: "The case study can describe email delivery tracking without claiming engagement or delivery guarantees.",
      },
    ],
    security: {
      id: "security",
      title: "Security and tenant privacy",
      body: [
        "TeachEasy uses tenant-aware routing, role-based access control, permission-aware UI rendering, PostgreSQL Row Level Security, and storage policies to separate academy, role, participant, assessment, and document access.",
        "The case study describes RLS and tenancy at a systems level only. It does not publish policy internals, credentials, private tenant data, real student records, parent records, payment details, or implementation details that would create operational risk.",
      ],
    },
    deployment: {
      id: "deployment",
      title: "Current implementation status",
      body: [
        "Implemented work includes multi-tenant academy architecture, role-specific portals, PostgreSQL RLS, recurring scheduling, collaborative lesson workflows, assessments, attendance, messaging, reporting, CSV export, and Resend delivery tracking.",
        "Infrastructure that depends on production secrets, such as JWT-ready Jitsi authentication, remains labelled as prepared for activation until configuration and QA are confirmed.",
      ],
    },
    outcomes: {
      id: "outcomes",
      title: "Outcomes",
      bullets: teacheasy.outcomes?.map((outcome) => outcome.label),
    },
    currentStatus: [
      { label: "Multi-tenant academy architecture", state: "implemented" },
      { label: "Admin, tutor, student, parent, and super-admin portals", state: "implemented" },
      { label: "Role-based access and PostgreSQL RLS", state: "implemented" },
      { label: "Recurring class series management", state: "implemented" },
      { label: "Jitsi live classroom integration", state: "implemented", detail: "Classroom routes, academy domains, participant context, and moderator-role handling are represented as implemented integration work." },
      { label: "JWT-ready Jitsi authentication", state: "in-progress", detail: "Prepared infrastructure; production secret configuration and QA should be confirmed before claiming full enforcement." },
      { label: "Real-time collaborative lesson workspace", state: "implemented" },
      { label: "Quiz and assessment workflows", state: "implemented" },
      { label: "Secure document sharing", state: "implemented" },
      { label: "Email delivery tracking with Resend", state: "implemented" },
      { label: "Attendance, reporting, and CSV export", state: "implemented" },
    ],
    lessons: {
      id: "lessons",
      title: "Lessons",
      bullets: [
        "Multi-tenant platforms become easier to reason about when permissions are modelled before UI polish.",
        "Education products need operational workflows and teaching workflows to share the same data reality.",
        "Real-time collaboration and video classrooms work best when meeting ownership, participant roles, and persisted lesson state are designed together.",
        "Infrastructure prepared for activation should be labelled separately from fully verified production enforcement.",
      ],
    },
    gallery: [
      {
        label: "TeachEasy public homepage",
        src: "/images/projects/teacheasy/teacheasy-public-home-desktop.webp",
        alt: "TeachEasy public homepage introducing the tutoring academy management platform.",
        caption: "Public website introducing TeachEasy's tutoring academy management platform.",
        kind: "screenshot",
        width: 720,
        height: 900,
      },
      {
        label: "TeachEasy public homepage mobile",
        src: "/images/projects/teacheasy/teacheasy-public-home-mobile.webp",
        alt: "Mobile viewport of the TeachEasy public website hero.",
        caption: "Responsive public website experience for TeachEasy on mobile web.",
        kind: "screenshot",
        width: 390,
        height: 844,
      },
      {
        label: "TeachEasy public setup flow",
        src: "/images/projects/teacheasy/teacheasy-public-how-it-works.webp",
        alt: "TeachEasy public website section showing setup steps for students, tutors, scheduling, billing, and growth.",
        caption: "Public setup flow explaining how academy operations move through TeachEasy.",
        kind: "screenshot",
        width: 1440,
        height: 900,
      },
      {
        label: "TeachEasy public feature overview",
        src: "/images/projects/teacheasy/teacheasy-public-feature-overview.webp",
        alt: "TeachEasy public website feature cards for scheduling lessons, billing clients, and growing the business.",
        caption: "Public feature overview supporting the scheduling and billing systems discussed in this case study.",
        kind: "screenshot",
        width: 720,
        height: 900,
      },
      {
        label: "TeachEasy public role overview",
        src: "/images/projects/teacheasy/teacheasy-public-role-overview.webp",
        alt: "TeachEasy public website section describing admin, tutor, parent, and student portals.",
        caption: "Public role overview for the admin, tutor, parent, and student portal model.",
        kind: "screenshot",
        width: 1440,
        height: 900,
      },
      {
        label: "TeachEasy public login helper",
        src: "/images/projects/teacheasy/teacheasy-public-login-helper.webp",
        alt: "TeachEasy public login helper explaining academy-specific login URLs with an example academy slug.",
        caption: "Public academy-login helper showing the tenant-specific access pattern.",
        kind: "screenshot",
        width: 1440,
        height: 900,
      },
    ],
    mediaNote:
      "These images are from TeachEasy's public website. Authenticated dashboard and classroom screenshots still require a dedicated synthetic demo account or explicit publication approval.",
    mediaRequirements: [
      "Synthetic demo academy dashboard screenshot with no real student, parent, tutor, payment, or academy data.",
      "Synthetic tutor classroom workflow screenshot.",
      "Synthetic student or parent workspace screenshot.",
      "Architecture diagram or tenant-role matrix suitable for public viewing.",
    ],
    relatedProjects: [{ slug: "asele", reason: "Another product where Supabase, privacy boundaries, and product operations shape architecture." }],
    links: teacheasy.links,
    seo: {
      title: "TeachEasy LMS Case Study | Multi-Tenant SaaS and Supabase Engineering",
      description:
        "TeachEasy LMS case study covering senior full-stack engineering for a multi-tenant SaaS platform with React, TypeScript, Supabase, PostgreSQL Row Level Security, recurring scheduling, Jitsi classrooms, Yjs collaboration, assessments, and Resend email tracking.",
      canonicalUrl: "https://www.kenoye.site/projects/teacheasy",
      ogTitle: "TeachEasy EdTech Platform Case Study",
      ogDescription:
        "A senior engineering case study on TeachEasy's multi-tenant LMS architecture, permissions, portals, scheduling, classroom collaboration, assessments, and email observability.",
      ogUrl: "https://www.kenoye.site/projects/teacheasy",
      socialImage: "https://www.kenoye.site/og-teacheasy.svg",
    },
    lastReviewed: "2026-07-25",
  },
  {
    slug: "reframe",
    title: reframe.title,
    shortTitle: "Reframe",
    productCategory: "CMS-driven news and community platform",
    summary: reframe.summary,
    role: reframe.role,
    projectStatus: "Public case study",
    platforms: reframe.platforms ?? [],
    technologies: reframe.technologies,
    canonicalUrl: "https://www.kenoye.site/projects/reframe",
    caseStudyAvailable: true,
    hero: {
      eyebrow: "Mobile Engineering Case Study",
      title: "Adapting a CMS-driven web product into a cross-platform mobile experience.",
      summary:
        "Reframe is a CMS-driven news and community platform adapted for iOS and Android delivery with React, TypeScript, Next.js, shared APIs, native integration through Capacitor, and store-readiness work.",
      primaryMediaNote:
        "Public web screenshots are included below while native mobile screenshots remain withheld until the mobile application is approved for public release.",
    },
    overview: {
      id: "overview",
      title: "What the product is",
      lead:
        "Reframe publishes news, articles, images, likes, comments, and community content from a CMS-backed platform.",
      body: [
        "The existing web platform remained the product foundation. The mobile work focused on adapting that shared product into Android and iOS delivery workflows without representing it as a fully native rebuild.",
        "Content synchronization remained central: editorial updates should flow through the shared backend and CMS-backed APIs rather than requiring a new app release for ordinary content changes.",
      ],
    },
    productContext: {
      id: "product-context",
      title: "Existing web platform and mobile adaptation",
      body: [
        "The case study distinguishes inherited web product capabilities from mobile-specific work. The CMS, article system, community content, likes, comments, and shared APIs belong to the wider product platform.",
        "The mobile engineering work focused on Capacitor architecture, native configuration, safe areas, lifecycle behavior, deep linking, push-notification infrastructure, production builds, and store-readiness preparation.",
      ],
    },
    inheritedContext: {
      id: "inherited-context",
      title: "What was inherited",
      bullets: [
        "CMS-driven news and article publishing.",
        "Community content, likes, comments, and shared backend APIs.",
        "Existing Next.js web platform foundations.",
      ],
    },
    responsibilities: [
      {
        label: "Led",
        items: [
          "Capacitor mobile architecture for iOS and Android delivery.",
          "Native configuration, release build preparation, and release workflow support.",
        ],
      },
      {
        label: "Implemented",
        items: [
          "Safe-area handling, status bar and splash behavior, lifecycle integration, deep-link support, and mobile responsiveness improvements.",
          "Push-notification infrastructure and store-readiness preparation work.",
        ],
      },
      {
        label: "Inherited",
        items: [
          "The CMS-backed editorial system, existing web platform, shared APIs, article reader, community feed, likes, and comments.",
        ],
      },
    ],
    problem: {
      id: "problem",
      title: "Mobile apps without fragmenting the product",
      body: [
        "The product needed native mobile distribution while keeping the CMS and shared APIs as the source of truth.",
        "The mobile layer had to avoid feeling like a generic wrapped website while remaining accurate about its Capacitor-based implementation.",
      ],
    },
    constraints: [
      "The existing Next.js web product and shared APIs were the foundation.",
      "Mobile platform behavior needed targeted native integration.",
      "Store-readiness work must be separated from final public store status unless verified by store records.",
      "Native mobile screenshots are not available in the repository and should not be fabricated.",
    ],
    architecture: {
      title: "Reframe web-to-mobile architecture",
      lead:
        "The CMS and shared APIs remain the source of truth. Capacitor adds mobile distribution and native integration around the existing React/Next.js product surface.",
      nodes: [
        { id: "cms", label: "CMS", detail: "Editorial publishing source", group: "Content" },
        { id: "api", label: "Shared backend APIs", detail: "News, images, community data, likes, comments", group: "Backend" },
        { id: "web", label: "Next.js web platform", detail: "Existing product surface", group: "Web" },
        { id: "capacitor", label: "Capacitor shell", detail: "Mobile bridge and native project configuration", group: "Mobile" },
        { id: "ios", label: "iOS app workflow", detail: "Safe areas, lifecycle, deep links, build prep", group: "Mobile" },
        { id: "android", label: "Android app workflow", detail: "Native configuration, notifications, build prep", group: "Mobile" },
        { id: "stores", label: "Store readiness", detail: "Signing, QA, release preparation", group: "Delivery" },
      ],
      connections: [
        { from: "cms", to: "api", label: "publishes through" },
        { from: "api", to: "web", label: "serves" },
        { from: "web", to: "capacitor", label: "adapts into" },
        { from: "capacitor", to: "ios", label: "configures" },
        { from: "capacitor", to: "android", label: "configures" },
        { from: "ios", to: "stores", label: "prepares for" },
        { from: "android", to: "stores", label: "prepares for" },
      ],
      notes: [
        "This is a cross-platform Capacitor architecture, not a fully native rewrite.",
        "Connections are repeated in text so the diagram remains accessible without relying on color or layout.",
      ],
    },
    keySystems: [
      {
        id: "sync",
        title: "Content synchronization",
        body: [
          "CMS-backed content, images, articles, likes, comments, and community updates continue to flow through the shared platform APIs.",
        ],
      },
      {
        id: "native-integration",
        title: "Native integration",
        body: [
          "The mobile layer covers safe-area handling, native status bar and splash behavior, app lifecycle support, deep links, push-notification infrastructure, and platform-specific configuration.",
        ],
      },
      {
        id: "store-readiness",
        title: "Production deployment workflow",
        body: [
          "The case study preserves store-readiness language while avoiding claims that require external store records.",
        ],
      },
    ],
    technicalDecisions: [
      {
        title: "Keep the CMS as the shared source of truth",
        context:
          "Editorial content needed to update across web and mobile without duplicating publishing workflows.",
        decision:
          "Have the mobile apps consume the same backend APIs and CMS-backed content model as the web product.",
        tradeoffs: [
          "Content velocity improves, but mobile quality still depends on careful WebView behavior, caching, and platform integration.",
        ],
        result:
          "Ordinary editorial updates can propagate through the shared platform instead of requiring native code changes.",
      },
      {
        title: "Use Capacitor rather than a separate native rebuild",
        context:
          "The goal was mobile distribution and native integration without splitting the product into multiple independent implementations.",
        decision:
          "Use Capacitor as the bridge around the existing React/Next.js product surface.",
        tradeoffs: [
          "The approach preserves shared product logic but needs targeted native work for safe areas, lifecycle, deep links, notifications, and store builds.",
        ],
        result:
          "The product can serve web, iOS, and Android from a coordinated code and content model.",
      },
    ],
    implementationPhases: [
      { title: "Assessment and mobile foundation", status: "implemented", items: ["Reviewed existing web architecture", "Evaluated CMS integration", "Planned Capacitor architecture"] },
      { title: "Native project setup", status: "implemented", items: ["Capacitor integration", "Android setup", "iOS setup", "Platform configuration"] },
      { title: "Mobile enhancement", status: "implemented", items: ["Safe-area improvements", "Lifecycle handling", "Deep links", "Push-notification infrastructure"] },
      { title: "Release workflow", status: "implemented", items: ["Build optimization", "Cross-platform testing", "Store preparation and troubleshooting"] },
    ],
    challenges: [
      {
        title: "Keeping CMS content in sync across surfaces",
        whyItMattered:
          "The mobile apps needed to reflect editorial publishing without requiring a native app release for every content update.",
        response:
          "The mobile architecture continued to consume the same shared APIs and CMS-backed source of truth.",
        result: "Web and mobile content can stay aligned through the shared platform.",
      },
      {
        title: "Making a web core behave responsibly on mobile",
        whyItMattered:
          "A simple WebView wrapper would not address safe areas, lifecycle behavior, push infrastructure, deep links, or platform release requirements.",
        response:
          "Native integrations and platform-specific configuration were added around the shared product surface.",
        result: "The route now describes the work as cross-platform mobile engineering rather than a fully native rebuild.",
      },
    ],
    performance: {
      id: "performance",
      title: "Performance and platform concerns",
      body: [
        "The migrated case study keeps the useful performance language from the original page but avoids unsupported numeric claims. It focuses on mobile responsiveness, navigation behavior, reload reduction, and platform-specific QA.",
      ],
    },
    deployment: {
      id: "deployment",
      title: "Store readiness and production workflow",
      body: [
        "The work included native project configuration, release build preparation, signing workflow support, testing, and build troubleshooting. Final external store status should remain tied to store records.",
      ],
    },
    outcomes: {
      id: "outcomes",
      title: "Outcomes",
      bullets: reframe.outcomes?.map((outcome) => outcome.label),
    },
    currentStatus: [
      { label: "Existing web product and CMS", state: "implemented", detail: "Inherited platform foundation." },
      { label: "Capacitor mobile architecture", state: "implemented" },
      { label: "Deep links and push-notification infrastructure", state: "implemented" },
      { label: "Store-readiness work", state: "implemented", detail: "Final store status should be confirmed from external records." },
      { label: "Public web screenshots", state: "implemented", detail: "Native mobile screenshots remain withheld pending approval." },
    ],
    lessons: {
      id: "lessons",
      title: "Lessons",
      bullets: [
        "Capacitor work should be described honestly as cross-platform mobile engineering, not as a native rewrite.",
        "A strong mobile adaptation depends on integration details that users notice immediately: safe areas, lifecycle, deep links, notifications, and loading behavior.",
        "Case studies need to distinguish inherited product surfaces from the engineering work personally owned.",
      ],
    },
    gallery: [
      {
        label: "Reframe public web feed desktop",
        src: "/images/projects/reframe/reframe-public-feed-desktop.webp",
        alt: "Reframe public website homepage showing the web feed and organisation discovery entry point.",
        caption: "Reframe.network public web feed and organisation discovery entry point.",
        kind: "screenshot",
        width: 1440,
        height: 900,
      },
      {
        label: "Reframe public feed mobile web",
        src: "/images/projects/reframe/reframe-public-feed-mobile-web.webp",
        alt: "Mobile web viewport of the Reframe.network public homepage.",
        caption: "Responsive mobile-web presentation of the Reframe public web platform.",
        kind: "screenshot",
        width: 390,
        height: 844,
      },
      {
        label: "Reframe public Voices overview",
        src: "/images/projects/reframe/reframe-public-voices-overview.webp",
        alt: "Reframe Voices public web page introducing editorial perspectives and submission context.",
        caption: "Public Reframe Voices web experience for CMS-driven editorial publishing.",
        kind: "screenshot",
        width: 1440,
        height: 900,
      },
      {
        label: "Reframe public resource repository",
        src: "/images/projects/reframe/reframe-public-repository.webp",
        alt: "Reframe public resource repository showing searchable video and document resources.",
        caption: "Public web interface for resource discovery on Reframe.network.",
        kind: "screenshot",
        width: 1440,
        height: 900,
      },
      {
        label: "Reframe public discovery page",
        src: "/images/projects/reframe/reframe-public-discovery.webp",
        alt: "Reframe public Collective Change page showing campaign discovery cards on the web platform.",
        caption: "Public web interface for collective-change and campaign discovery.",
        kind: "screenshot",
        width: 1440,
        height: 900,
      },
    ],
    mediaNote:
      "The visuals shown here are from Reframe's public web platform. Native mobile screenshots are withheld until the mobile application is approved for public release.",
    mediaRequirements: [
      "Approved native news feed screenshot after public mobile release.",
      "Approved native article reader screenshot after public mobile release.",
      "Approved native community feed screenshot after public mobile release.",
      "Push-notification or deep-link flow screenshot only when safe and approved for public viewing.",
    ],
    relatedProjects: [{ slug: "asele", reason: "Another Capacitor-backed mobile delivery story with notification and deep-link concerns." }],
    links: reframe.links,
    seo: {
      title: "Reframe Case Study | Cross-platform Mobile Engineering",
      description:
        "Reframe case study covering a CMS-driven news and community platform adapted into iOS and Android apps with React, TypeScript, Next.js, Capacitor, deep links, and push infrastructure.",
      canonicalUrl: "https://www.kenoye.site/projects/reframe",
      ogTitle: "Reframe Mobile Engineering Case Study",
      ogDescription:
        "A senior engineering case study on adapting Reframe's CMS-driven web platform into cross-platform mobile apps.",
      ogUrl: "https://www.kenoye.site/projects/reframe",
      socialImage: "https://www.kenoye.site/og-reframe.svg",
    },
    lastReviewed: "2026-07-24",
  },
] satisfies CaseStudy[];

export const getCaseStudyBySlug = (slug: string) =>
  caseStudies.find((caseStudy) => caseStudy.slug === slug);

export const getCaseStudyProject = (slug: string) => projects.find((item) => item.slug === slug);

export const caseStudyNavigation = caseStudies.map(({ slug, shortTitle, title }) => ({
  slug,
  label: shortTitle || title,
  href: `/projects/${slug}`,
}));

export const getAdjacentCaseStudies = (slug: string) => {
  const index = caseStudies.findIndex((caseStudy) => caseStudy.slug === slug);

  if (index === -1) {
    return { previous: undefined, next: undefined };
  }

  return {
    previous: caseStudies[index - 1],
    next: caseStudies[index + 1],
  };
};

export const getCaseStudySectionLinks = (caseStudy: CaseStudy) =>
  [
    caseStudy.overview,
    caseStudy.productContext,
    caseStudy.users,
    caseStudy.inheritedContext,
    caseStudy.teamContext,
    caseStudy.problem,
    caseStudy.architecture && { id: "architecture", title: caseStudy.architecture.title },
    caseStudy.keySystems?.length && { id: "key-systems", title: "Key systems" },
    caseStudy.technicalDecisions?.length && { id: "technical-decisions", title: "Technical decisions" },
    caseStudy.implementationPhases?.length && { id: "implementation", title: "Implementation phases" },
    caseStudy.challenges?.length && { id: "challenges", title: "Engineering challenges" },
    caseStudy.security,
    caseStudy.privacy,
    caseStudy.accessibility,
    caseStudy.performance,
    caseStudy.deployment,
    caseStudy.outcomes,
    caseStudy.currentStatus?.length && { id: "current-status", title: "Current status" },
    caseStudy.lessons,
    caseStudy.mediaRequirements?.length && { id: "media", title: "Media and gallery" },
  ].filter(Boolean) as Array<{ id: string; title: string }>;
