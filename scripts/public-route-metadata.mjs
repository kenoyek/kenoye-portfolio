export const canonicalOrigin = "https://www.kenoye.site";

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
  },
  {
    path: "/projects/asele",
    title: "Asele Case Study | HealthTech Product Architecture",
    description:
      "Asele case study covering a women wellness platform built with React, TypeScript, Supabase, Capacitor, reminders, multilingual support, and privacy-sensitive architecture.",
    image: "/og-asele.svg",
    type: "article",
    priority: "0.8",
    changefreq: "monthly",
  },
  {
    path: "/projects/teacheasy",
    title: "TeachEasy Case Study | Multi-tenant EdTech Platform",
    description:
      "TeachEasy case study covering a multi-tenant education platform with React, TypeScript, Supabase, RLS, role-based portals, scheduling, and classroom workflows.",
    image: "/og-teacheasy.svg",
    type: "article",
    priority: "0.8",
    changefreq: "monthly",
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
  },
];

export const absoluteUrl = (path) => new URL(path, canonicalOrigin).toString();
