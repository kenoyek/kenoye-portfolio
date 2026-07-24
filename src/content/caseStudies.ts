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
    productCategory: "Women wellness platform",
    summary: asele.summary,
    role: asele.role,
    projectStatus: "Public case study with product access available",
    confidentiality: "Health and wellness data is described at a systems level only.",
    platforms: asele.platforms ?? [],
    technologies: asele.technologies,
    canonicalUrl: "https://www.kenoye.site/projects/asele",
    liveUrl: asele.links?.find((link) => link.kind === "live")?.href,
    caseStudyAvailable: true,
    hero: {
      eyebrow: "Flagship HealthTech Case Study",
      title: "A cycle and wellness platform shaped around privacy, mobile delivery, and product boundaries.",
      summary:
        "Asele combines cycle tracking, wellness logging, cycle-aware reminders, multilingual product support, and assistive health briefs across a React, TypeScript, Supabase, and Capacitor architecture.",
      primaryMediaNote:
        "Verified Asele product screenshots are not stored in this repository, so the case study uses narrative and architecture diagrams rather than simulated product screens.",
    },
    overview: {
      id: "overview",
      eyebrow: "Overview",
      title: "What the product is",
      lead:
        "Asele is a women cycle and wellness platform delivered across web and mobile surfaces.",
      body: [
        "The product brings together wellness logging, cycle-aware reminders, health-context summaries, authentication, administrative workflows, and mobile delivery from a shared web foundation.",
        "The important engineering constraint is product safety: the platform can support tracking and wellness context without presenting itself as diagnosis, treatment, clinical approval, or a medical device.",
      ],
    },
    productContext: {
      id: "product-context",
      eyebrow: "Context",
      title: "Why it exists and who it serves",
      body: [
        "Asele serves users who need a private way to record cycle and wellness context and receive reminders that respect sensitive personal data.",
        "The product also needs administrative visibility and communication infrastructure so the platform can be operated responsibly after release.",
      ],
    },
    users: {
      id: "users",
      title: "Primary users",
      bullets: [
        "People tracking menstrual-cycle and wellness context.",
        "Administrators managing product content, operational workflows, and user-support visibility.",
        "Mobile users who expect native delivery behavior such as deep links, notifications, and platform-specific release workflows.",
      ],
    },
    responsibilities: [
      {
        label: "Led",
        items: [
          "Full-stack product architecture across React, TypeScript, Supabase, and Capacitor.",
          "Product boundaries for wellness tracking and assistive health-context summaries.",
          "Android production delivery and the iOS deployment workflow.",
        ],
      },
      {
        label: "Implemented",
        items: [
          "Authentication, cycle-aware notifications, deep-link flows, multilingual support, and administrative tooling patterns.",
          "Privacy-sensitive data modelling using Supabase-backed application architecture.",
        ],
      },
      {
        label: "Integrated",
        items: [
          "Push notification workflows, Resend email infrastructure, Corti-related assistive brief workflows, and Edge Function boundaries where supported by the project architecture.",
        ],
      },
      {
        label: "In progress",
        items: [
          "Ongoing administrative and analytics refinement should remain status-labelled until production scope is confirmed.",
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
      "Mobile delivery needed to share product velocity with the web application while still respecting native app release requirements.",
      "AI-assisted briefs needed to be framed as assistive summaries, not clinical decisions.",
      "Public case-study content cannot include private user data or internal implementation secrets.",
    ],
    architecture: {
      title: "Asele platform architecture",
      lead:
        "A shared React and TypeScript product surface connects to Supabase-backed data, authentication, administrative tooling, and mobile app workflows through Capacitor.",
      nodes: [
        { id: "user", label: "Web and mobile users", detail: "Cycle, wellness, reminder, and brief workflows", group: "Experience" },
        { id: "react", label: "React + TypeScript app", detail: "Shared product interface and application logic", group: "Application" },
        { id: "capacitor", label: "Capacitor mobile layer", detail: "Android delivery and iOS workflow", group: "Mobile" },
        { id: "supabase", label: "Supabase", detail: "Auth, Postgres, RLS, realtime, and Edge Functions", group: "Backend" },
        { id: "notifications", label: "Notification services", detail: "Cycle-aware reminders and mobile notification flows", group: "Integration" },
        { id: "email", label: "Resend email infrastructure", detail: "Transactional communication support", group: "Integration" },
        { id: "ai", label: "Assistive brief workflow", detail: "Corti-related AI health-context summaries where supported", group: "Integration" },
        { id: "admin", label: "Administrative tooling", detail: "Operational visibility and product management workflows", group: "Operations" },
      ],
      connections: [
        { from: "user", to: "react", label: "uses" },
        { from: "react", to: "capacitor", label: "ships through" },
        { from: "react", to: "supabase", label: "reads and writes" },
        { from: "supabase", to: "notifications", label: "triggers reminders" },
        { from: "supabase", to: "email", label: "supports email" },
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
        id: "cycle-reminders",
        title: "Cycle and reminder systems",
        body: [
          "Cycle-aware reminders are treated as product-support workflows. The public case study avoids claims about medical precision or health outcomes.",
        ],
      },
      {
        id: "mobile-delivery",
        title: "Mobile delivery architecture",
        body: [
          "Capacitor allowed a shared React codebase to move through Android production delivery and an iOS deployment workflow while still requiring native-platform attention.",
        ],
      },
      {
        id: "health-briefs",
        title: "AI-assisted health briefs",
        body: [
          "AI-assisted briefs are described as assistive health-context summaries. They are not presented as diagnosis, treatment, or a substitute for professional medical care.",
        ],
      },
      {
        id: "multilingual-admin",
        title: "Multilingual and administrative tooling",
        body: [
          "The product includes multilingual support and administrative tooling patterns for operational use after deployment.",
        ],
      },
    ],
    technicalDecisions: [
      {
        title: "Use Supabase as the product backend",
        context:
          "The product needed authentication, database access, privacy controls, server-side functions, and operational tooling without a large custom backend surface.",
        decision:
          "Use Supabase-backed auth, Postgres, RLS, realtime capabilities, and Edge Functions as the application backend foundation.",
        tradeoffs: [
          "The architecture benefits from managed infrastructure but still requires careful RLS policy design and production secret management.",
        ],
        result:
          "The frontend, mobile workflow, administrative tooling, and integrations can share one backend foundation.",
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
          "Android production delivery and an iOS deployment workflow became possible from the shared application foundation.",
      },
    ],
    implementationPhases: [
      { title: "Product and data foundation", status: "implemented", items: ["React and TypeScript product surface", "Supabase-backed authentication and data access", "Privacy-sensitive product boundaries"] },
      { title: "Mobile delivery", status: "implemented", items: ["Capacitor workflow", "Android production delivery", "iOS deployment workflow"] },
      { title: "Operations and communication", status: "in-progress", items: ["Administrative tooling", "Email infrastructure", "Analytics and operational refinement"] },
    ],
    challenges: [
      {
        title: "Handling health context without medical claims",
        whyItMattered:
          "Sensitive health-adjacent products can quickly become misleading if public language implies diagnosis, treatment, or clinical accuracy.",
        constraints: ["No clinical, regulatory, or health-outcome claims are verified in the repository."],
        response:
          "The case study frames the system around wellness tracking, reminders, summaries, and privacy-sensitive data handling.",
        result: "The public narrative stays factual without weakening the engineering work.",
      },
      {
        title: "Bringing mobile delivery into a web-led product system",
        whyItMattered:
          "Mobile release workflows introduce signing, store-readiness, deep links, and notifications that do not exist in ordinary web delivery.",
        response:
          "Capacitor was used as the mobile bridge while preserving React and TypeScript as the core product implementation.",
        remainingLimitation:
          "Exact store-review and live-feature statuses should continue to be updated from production records.",
      },
    ],
    privacy: {
      id: "privacy",
      eyebrow: "Privacy",
      title: "Health-data modelling and privacy",
      body: [
        "Public documentation should describe privacy-sensitive architecture at a high level only. The case study does not expose schemas, private policies, user data, credentials, or operational secrets.",
      ],
    },
    deployment: {
      id: "deployment",
      eyebrow: "Deployment",
      title: "Deployment and store readiness",
      body: [
        "Asele is represented with Android production delivery completed and an iOS deployment workflow implemented. Individual features remain status-labelled instead of flattened into a single completed state.",
      ],
    },
    outcomes: {
      id: "outcomes",
      title: "Outcomes",
      bullets: asele.outcomes?.map((outcome) => outcome.label),
    },
    currentStatus: [
      { label: "Android production delivery", state: "implemented", detail: "Completed according to existing portfolio content." },
      { label: "iOS delivery workflow", state: "implemented", detail: "Implementation workflow exists; final public store status should be updated from store records." },
      { label: "Cycle-aware reminders", state: "implemented" },
      { label: "Multilingual support", state: "implemented" },
      { label: "Administrative and analytics refinement", state: "in-progress" },
    ],
    lessons: {
      id: "lessons",
      title: "Lessons",
      bullets: [
        "Health-adjacent product work needs as much care in language and boundaries as it needs in implementation.",
        "Capacitor can preserve shared product velocity, but mobile release quality still depends on native-platform discipline.",
        "Privacy-sensitive features are easier to maintain when they are modelled as first-class product constraints.",
      ],
    },
    mediaRequirements: [
      "Sanitized wellness dashboard screenshot.",
      "Mobile reminder or notification workflow screenshot.",
      "Administrative workflow screenshot with private data removed.",
    ],
    relatedProjects: [{ slug: "teacheasy", reason: "Another Supabase-backed platform with permissions and product operations as core architecture." }],
    links: asele.links,
    seo: {
      title: "Asele Case Study | HealthTech Product Architecture",
      description:
        "Asele case study covering a women wellness platform built with React, TypeScript, Supabase, Capacitor, reminders, multilingual support, and privacy-sensitive architecture.",
      canonicalUrl: "https://www.kenoye.site/projects/asele",
      ogTitle: "Asele HealthTech Case Study",
      ogDescription:
        "A senior engineering case study on Asele's wellness, mobile delivery, Supabase, and privacy-sensitive product architecture.",
      ogUrl: "https://www.kenoye.site/projects/asele",
      socialImage: "https://www.kenoye.site/og-asele.svg",
    },
    lastReviewed: "2026-07-24",
  },
  {
    slug: "teacheasy",
    title: teacheasy.title,
    shortTitle: "TeachEasy",
    productCategory: "Multi-tenant education platform",
    summary: teacheasy.summary,
    role: teacheasy.role,
    projectStatus: "Public case study with live product link",
    platforms: teacheasy.platforms ?? [],
    technologies: teacheasy.technologies,
    canonicalUrl: "https://www.kenoye.site/projects/teacheasy",
    liveUrl: teacheasy.links?.find((link) => link.kind === "live")?.href,
    caseStudyAvailable: true,
    hero: {
      eyebrow: "EdTech Platform Case Study",
      title: "A multi-tenant academy platform for operations, permissions, and live instruction.",
      summary:
        "TeachEasy centralizes academy tenancy, role-based portals, scheduling, tutor permissions, classroom workflows, realtime collaboration, and communication infrastructure.",
      primaryMediaNote:
        "Verified TeachEasy product screenshots are not stored in this repository. The page uses architecture and written evidence until sanitized product media is available.",
    },
    overview: {
      id: "overview",
      title: "What the product is",
      lead:
        "TeachEasy is a multi-tenant learning-management platform for academies, tutors, students, and parents.",
      body: [
        "The platform is built around academy operations: tenancy, scheduling, permissions, live instruction, learning materials, assessments, and communication.",
        "The engineering story is less about a single feature and more about coordinating roles and tenant boundaries so each user sees the right work at the right time.",
      ],
    },
    productContext: {
      id: "business-context",
      eyebrow: "Context",
      title: "Product and business context",
      body: [
        "Academies often coordinate learning across disconnected scheduling, video, notes, student management, parent communication, and tutor workflows.",
        "TeachEasy brings those workflows into a shared platform while keeping tenant separation and role-specific access at the center of the architecture.",
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
          "Scheduling, class management, tenant branding, and communication-system architecture.",
        ],
      },
      {
        label: "Implemented",
        items: [
          "Supabase and Postgres RLS patterns for academy tenancy.",
          "Collaborative classroom concepts including Jitsi, shared PDFs, notes, whiteboard, and quizzes where supported by current implementation.",
        ],
      },
      {
        label: "Planned",
        items: [
          "Stripe-related commercial workflows, recordings architecture, and deeper analytics should remain planned until production implementation is confirmed.",
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
      "Some integrations require production secrets and should not be represented as fully active without configuration evidence.",
      "Planned commercial and analytics features must not be described as shipped.",
    ],
    architecture: {
      title: "TeachEasy multi-tenant architecture",
      lead:
        "A React and TypeScript application uses Supabase, Postgres RLS, realtime workflows, and integration boundaries to support role-specific academy operations.",
      nodes: [
        { id: "academy", label: "Academy tenant", detail: "Tenant identity, branding, users, and operations", group: "Tenant" },
        { id: "admin", label: "Admin portal", detail: "Academy setup, users, scheduling, communications", group: "Portal" },
        { id: "tutor", label: "Tutor portal", detail: "Classes, materials, live sessions, assessments", group: "Portal" },
        { id: "student", label: "Student portal", detail: "Class access, collaboration, quizzes", group: "Portal" },
        { id: "parent", label: "Parent portal", detail: "Learner context and permitted communication", group: "Portal" },
        { id: "supabase", label: "Supabase + Postgres RLS", detail: "Tenant-aware auth and data access", group: "Backend" },
        { id: "jitsi", label: "Jitsi classroom", detail: "Live instruction integration", group: "Integration" },
        { id: "collab", label: "Collaborative workspace", detail: "Shared PDFs, notes, whiteboard, quizzes", group: "Learning" },
        { id: "email", label: "Resend email infrastructure", detail: "Transactional communication support", group: "Integration" },
      ],
      connections: [
        { from: "academy", to: "admin", label: "configures" },
        { from: "admin", to: "supabase", label: "manages" },
        { from: "tutor", to: "supabase", label: "reads and writes" },
        { from: "student", to: "supabase", label: "accesses permitted data" },
        { from: "parent", to: "supabase", label: "accesses permitted data" },
        { from: "tutor", to: "jitsi", label: "starts class" },
        { from: "student", to: "jitsi", label: "joins class" },
        { from: "jitsi", to: "collab", label: "supports lesson workflow" },
        { from: "supabase", to: "email", label: "sends communications" },
      ],
      notes: [
        "Jitsi moderation and JWT-related enforcement should be described according to the actual production secret configuration.",
        "The diagram shows product boundaries without exposing tenant policies or private implementation details.",
      ],
    },
    keySystems: [
      {
        id: "tenant-rls",
        title: "Permission and RLS model",
        body: [
          "Academy tenancy and row-level security shape access boundaries across admin, tutor, student, and parent workflows.",
        ],
      },
      {
        id: "scheduling",
        title: "Scheduling and class management",
        body: [
          "Scheduling connects academies, tutors, students, and class sessions so operational work has a single source of coordination.",
        ],
      },
      {
        id: "classroom",
        title: "Jitsi classroom and collaboration",
        body: [
          "The platform introduces live instruction and collaborative lesson workspace concepts including shared PDFs, notes, whiteboard, and quizzes.",
        ],
      },
      {
        id: "communications",
        title: "Communication and tenant branding",
        body: [
          "Resend-backed email infrastructure and tenant branding support academy-specific communication and product presentation.",
        ],
      },
    ],
    technicalDecisions: [
      {
        title: "Make tenancy part of the data model",
        context:
          "Academies need separate users, schedules, materials, communications, and operational settings.",
        decision:
          "Use academy tenancy with Supabase and Postgres RLS rather than relying only on UI-level filtering.",
        tradeoffs: [
          "RLS increases policy complexity, but it makes authorization a structural property of the system.",
        ],
        result:
          "The platform can support admin, tutor, student, and parent access around tenant-aware boundaries.",
      },
      {
        title: "Integrate classroom workflows instead of only linking video calls",
        context:
          "Live instruction needs more than a meeting URL; tutors and students need materials, notes, collaboration, and assessments around the class.",
        decision:
          "Use Jitsi and collaborative workspace concepts alongside shared PDFs, notes, whiteboard, and quizzes.",
        limitation:
          "Moderator enforcement and production behavior should be labelled according to configured secrets and confirmed QA.",
      },
    ],
    implementationPhases: [
      { title: "Tenant and portal foundation", status: "implemented", items: ["Academy tenancy", "Role-specific portals", "Supabase and RLS architecture"] },
      { title: "Learning workflow systems", status: "implemented", items: ["Scheduling", "Tutor permissions", "Student assignment", "Collaborative lesson workspace concepts"] },
      { title: "Commercial and analytics systems", status: "planned", items: ["Stripe planning", "Recordings architecture", "Administrative analytics planning"] },
    ],
    challenges: [
      {
        title: "Keeping academy data separated across every role",
        whyItMattered:
          "A multi-tenant education product loses trust quickly if tenant boundaries are only implied by interface state.",
        constraints: ["Each portal has different permissions and different operational needs."],
        response:
          "Tenant-aware data access and RLS patterns were used as the foundation for the platform.",
        result: "Role-specific portals can be built around explicit data boundaries.",
      },
      {
        title: "Turning live classes into a complete learning workflow",
        whyItMattered:
          "Video alone does not manage materials, notes, quizzes, scheduling, and follow-through.",
        response:
          "The platform connects live instruction with collaborative workspace and assessment concepts.",
        remainingLimitation:
          "Production classroom behavior should continue to be verified around secrets, moderation, recordings, and edge cases.",
      },
    ],
    security: {
      id: "security",
      title: "Security and tenant privacy",
      body: [
        "The case study describes RLS and tenancy at a systems level only. It does not publish policy internals, credentials, private tenant data, or implementation details that would create operational risk.",
      ],
    },
    deployment: {
      id: "deployment",
      title: "Current implementation status",
      body: [
        "Implemented and planned work are separated so the public case study does not present future commercial, recordings, or analytics systems as completed.",
      ],
    },
    outcomes: {
      id: "outcomes",
      title: "Outcomes",
      bullets: teacheasy.outcomes?.map((outcome) => outcome.label),
    },
    currentStatus: [
      { label: "Multi-tenant architecture", state: "implemented" },
      { label: "Admin, tutor, student, and parent portals", state: "implemented" },
      { label: "Row-level security model", state: "implemented" },
      { label: "Realtime collaboration", state: "implemented", detail: "Introduced according to existing portfolio content." },
      { label: "Stripe commercial workflows", state: "planned" },
      { label: "Recordings and analytics architecture", state: "planned" },
      { label: "Jitsi moderation enforcement", state: "in-progress", detail: "Depends on production secret configuration and QA." },
    ],
    lessons: {
      id: "lessons",
      title: "Lessons",
      bullets: [
        "Multi-tenant platforms become easier to reason about when permissions are modelled before UI polish.",
        "Education products need operational workflows and teaching workflows to share the same data reality.",
        "Planned integrations should be named carefully so a roadmap does not read like a shipped feature list.",
      ],
    },
    mediaRequirements: [
      "Sanitized academy dashboard screenshot.",
      "Tutor classroom workflow screenshot.",
      "Architecture diagram or tenant-role matrix suitable for public viewing.",
    ],
    relatedProjects: [{ slug: "asele", reason: "Another product where Supabase, privacy boundaries, and product operations shape architecture." }],
    links: teacheasy.links,
    seo: {
      title: "TeachEasy Case Study | Multi-tenant EdTech Platform",
      description:
        "TeachEasy case study covering a multi-tenant education platform with React, TypeScript, Supabase, RLS, role-based portals, scheduling, and classroom workflows.",
      canonicalUrl: "https://www.kenoye.site/projects/teacheasy",
      ogTitle: "TeachEasy EdTech Platform Case Study",
      ogDescription:
        "A senior engineering case study on TeachEasy's multi-tenant platform, permissions, portals, scheduling, and classroom architecture.",
      ogUrl: "https://www.kenoye.site/projects/teacheasy",
      socialImage: "https://www.kenoye.site/og-teacheasy.svg",
    },
    lastReviewed: "2026-07-24",
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
        "Reframe is a CMS-driven news and community platform adapted for iOS and Android delivery with React, TypeScript, Next.js, Capacitor, shared APIs, native integration, and store-readiness work.",
      primaryMediaNote:
        "The previous route used placeholder gallery tiles. They have been removed until verified Reframe screenshots are available.",
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
          "Native configuration, release build preparation, and production deployment workflow.",
        ],
      },
      {
        label: "Implemented",
        items: [
          "Safe-area handling, status bar and splash behavior, lifecycle integration, deep-link support, and mobile responsiveness improvements.",
          "Push-notification infrastructure and app-store preparation work.",
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
        "The mobile layer had to avoid feeling like a generic wrapped website, but it also should not be misrepresented as a fully native implementation.",
      ],
    },
    constraints: [
      "The existing Next.js web product and shared APIs were the foundation.",
      "Mobile platform behavior needed targeted native integration.",
      "Store-readiness work must be separated from final public store status unless verified by store records.",
      "Screenshots are not available in the repository and should not be fabricated.",
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
          "The route preserves store-readiness language while avoiding claims that require external store records.",
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
      { label: "Verified public screenshots", state: "planned", detail: "No screenshots are stored in this repository." },
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
    mediaRequirements: [
      "News feed mobile screenshot.",
      "Article reader screenshot.",
      "Community feed screenshot.",
      "Push-notification or deep-link flow screenshot where safe to show.",
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
