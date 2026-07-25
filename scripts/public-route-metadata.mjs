export const canonicalOrigin = "https://www.kenoye.site";
export const siteName = "Okagua Kenoye";
export const routeLastmod = "2026-07-25";

export const publicRoutes = [
  {
    path: "/",
    title: "Okagua Kenoye - Software Architect and Product Engineer",
    description:
      "Okagua Kenoye designs and ships full-stack, mobile, and product systems across health technology, education technology, CMS-driven platforms, and technical consulting.",
    image: "/og-home.svg",
    type: "website",
    priority: "1.0",
    changefreq: "weekly",
    lastmod: routeLastmod,
  },
  {
    path: "/projects/asele",
    title: "Asele Case Study | HealthTech, Supabase and Capacitor Engineering",
    description:
      "Asele case study covering a women's wellness platform built with React, TypeScript, Supabase, PostgreSQL Row Level Security, Capacitor, Firebase push notifications, AI integration, Google Play deployment, and Apple App Store release.",
    image: "/og-asele.svg",
    type: "article",
    priority: "0.8",
    changefreq: "monthly",
    lastmod: routeLastmod,
  },
  {
    path: "/projects/teacheasy",
    title: "TeachEasy LMS Case Study | Multi-Tenant SaaS and Supabase Engineering",
    description:
      "TeachEasy LMS case study covering a multi-tenant education platform with React, TypeScript, Supabase, PostgreSQL Row Level Security, recurring scheduling, Jitsi classrooms, Yjs collaboration, assessments, and Resend email tracking.",
    image: "/og-teacheasy.svg",
    type: "article",
    priority: "0.8",
    changefreq: "monthly",
    lastmod: routeLastmod,
  },
  {
    path: "/projects/reframe",
    title: "Reframe Case Study | Cross-platform Mobile Engineering",
    description:
      "Reframe case study covering a CMS-driven news and community platform adapted into iOS and Android apps with React, TypeScript, Next.js, Capacitor, deep links, and push infrastructure.",
    image: "/og-reframe.svg",
    type: "article",
    priority: "0.8",
    changefreq: "monthly",
    lastmod: routeLastmod,
  },
  {
    path: "/blog",
    title: "Blog | Okagua Kenoye",
    description:
      "Read software architecture, product engineering, education technology, health technology, and full-stack development notes from Okagua Kenoye.",
    image: "/og-blog.svg",
    type: "website",
    priority: "0.7",
    changefreq: "weekly",
    lastmod: routeLastmod,
  },
];

export const absoluteUrl = (path) => new URL(path, canonicalOrigin).toString();
