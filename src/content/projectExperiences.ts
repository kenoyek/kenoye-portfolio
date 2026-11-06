export type ProductView = {
  id: string;
  label: string;
  title: string;
  description: string;
  engineering: string;
  src: string;
  alt: string;
  format: "phone" | "browser";
};

export const projectExperiences: Record<string, ProductView[]> = {
  asele: [
    {
      id: "cycle",
      label: "Cycle tracking",
      title: "A little more understanding. Every day.",
      description:
        "A cycle-aware home experience brings daily context, logging and wellness support into one calm interface.",
      engineering: "Shared React application · Capacitor for iOS & Android",
      src: "/images/projects/asele/asele-native-cycle-home.webp",
      alt: "Asele native app showing cycle phase, next period and logging actions",
      format: "phone",
    },
    {
      id: "insights",
      label: "Insights",
      title: "Health context, thoughtfully presented.",
      description:
        "Cycle insights help users explore their own patterns, with clear boundaries between wellness support and medical diagnosis.",
      engineering: "Supabase authentication · PostgreSQL row-level security",
      src: "/images/projects/asele/asele-native-cycle-insights.webp",
      alt: "Asele native cycle insights screen",
      format: "phone",
    },
    {
      id: "journal",
      label: "Journal",
      title: "Space for the human side of health.",
      description:
        "A private journaling experience sits alongside cycle tracking and daily wellness check-ins.",
      engineering: "Authenticated data access · Privacy-conscious workflows",
      src: "/images/projects/asele/asele-native-journal.webp",
      alt: "Asele native journal interface",
      format: "phone",
    },
  ],
  teacheasy: [
    {
      id: "overview",
      label: "Overview",
      title: "One connected home for learning.",
      description:
        "Academy operations, scheduling and learning workflows come together in a tenant-aware platform for tutors, students and parents.",
      engineering: "React & TypeScript · Supabase · Academy-scoped tenancy",
      src: "/images/projects/teacheasy/teacheasy-public-home-desktop.webp",
      alt: "TeachEasy public website introducing its academy management platform",
      format: "browser",
    },
    {
      id: "features",
      label: "Learning workflows",
      title: "Less administration. More teaching.",
      description:
        "Recurring lessons, Jitsi classrooms and collaborative workspaces support the everyday rhythm of an academy.",
      engineering: "Jitsi Meet · Yjs · Supabase Realtime",
      src: "/images/projects/teacheasy/teacheasy-public-feature-overview.webp",
      alt: "TeachEasy public feature overview describing its learning platform capabilities",
      format: "browser",
    },
    {
      id: "roles",
      label: "Role-based portals",
      title: "Different roles. Shared understanding.",
      description:
        "Admin, tutor, student and parent experiences are structured around explicit permissions and academy data boundaries.",
      engineering: "PostgreSQL RLS · Role modelling · Tenant-scoped routing",
      src: "/images/projects/teacheasy/teacheasy-public-role-overview.webp",
      alt: "TeachEasy public role overview explaining platform portals, not a private dashboard",
      format: "browser",
    },
  ],
  reframe: [
    {
      id: "native",
      label: "Mobile feed",
      title: "The conversation, wherever you are.",
      description:
        "A CMS-driven community experience brought to mobile, with a shared content source across web, iOS and Android.",
      engineering: "React · Next.js · Capacitor · Shared APIs",
      src: "/images/projects/reframe/reframe-native-feed.webp",
      alt: "Reframe native community feed with posts, comments and bottom navigation",
      format: "phone",
    },
    {
      id: "discovery",
      label: "Discovery",
      title: "A shared platform for new perspectives.",
      description:
        "Editorial updates flow from the CMS into the product without requiring a new native release for each content change.",
      engineering: "CMS synchronisation · Deep linking · Native lifecycle",
      src: "/images/projects/reframe/reframe-public-discovery.webp",
      alt: "Reframe public discovery website",
      format: "browser",
    },
  ],
};
