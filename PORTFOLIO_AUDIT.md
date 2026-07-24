# Portfolio Audit

**Site:** kenoye.site  
**Stack:** Vite 8 · React 18 · TypeScript · Tailwind CSS · Supabase · Framer Motion  
**Audit Date:** 2026-07-24  
**Auditor:** Senior Engineering Portfolio Review

---

## Executive Summary

The portfolio is a well-constructed Vite/React SPA with a clean, restrained visual style and a sound content data model. It has dark/light mode, lazy-loaded routes, a working Supabase-backed contact form, a blog with admin backend, accessible navigation, OG metadata, JSON-LD structured data, a sitemap, and detailed case study content in `caseStudies.ts`.

The gap is not the stack. The gap is **curation and seniority signal**. The site reads as competent but not yet senior-competitive because:

1. LearnEasy Academy (a coding tutor role) appears as a featured peer to engineering case studies.
2. There is no credibility strip between hero and projects — the 5-second seniority test fails.
3. The capabilities section is sparse (4 items, 2 columns) and misses critical engineering categories.
4. The About section lacks engineering philosophy, preferred roles, and team context.
5. Placeholder text is exposed in an accessible name in production.
6. No résumé in primary navbar.
7. SVG og:image will not render in LinkedIn/Twitter/WhatsApp previews.

---

## Audit Findings

### Critical Priority

| ID | Finding | Component |
|----|---------|-----------|
| C1 | "View credentials" is a weak, ambiguous résumé CTA | `HomeHero.tsx` |
| C2 | No credibility strip between hero and projects — seniority not visible in 5 seconds | `Index.tsx` (missing component) |
| C3 | "replace with verified Asele product screenshots" exposed in `aria-label` in production | `FeaturedAsele.tsx` |
| C4 | LearnEasy Academy (tutoring role) is `featured: true` alongside engineering case studies | `projects.ts` |
| C5 | No résumé link in primary desktop navbar | `Navbar.tsx` |
| C6 | `og:image` is an SVG — will not render in LinkedIn, Twitter, WhatsApp, iMessage previews | `index.html` |

### High Priority

| ID | Finding | Component |
|----|---------|-----------|
| H1 | All featured projects at equal visual weight — first project should dominate | `SelectedWork.tsx`, `ProjectPreview.tsx` |
| H2 | AdditionalProjects shows 7 items including 3 experimental tools — dilutes senior signal | `AdditionalProjects.tsx` |
| H3 | About section: only 3 short paragraphs, no philosophy, no preferred roles | `ProfessionalPositioning.tsx` |
| H4 | HomeCapabilities: 4 items, 2 columns — missing Backend, Cloud, Frontend, Leadership | `HomeCapabilities.tsx`, `capabilities.ts` |
| H5 | Experience: only 2 entries, no highlights, no type label | `HomeExperience.tsx`, `experience.ts` |
| H6 | No seniority evidence section — no architecture decisions, ownership scope | Missing component |
| H7 | EngineeringPrinciples buried after capabilities and experience | `Index.tsx` |
| H8 | Contact form missing "Full-time opportunity" and "Recruitment enquiry" options | `ContactPanel.tsx` |
| H9 | No availability signal anywhere on site | Multiple |
| H10 | No résumé button in hero CTAs | `HomeHero.tsx` |

### Medium Priority

| ID | Finding | Component |
|----|---------|-----------|
| M1 | Both `bun.lock` and `package-lock.json` exist | Root |
| M2 | Footer missing "Writing" link that exists in the navbar | `Footer.tsx` |
| M3 | Footer missing résumé link | `Footer.tsx` |
| M4 | `siteConfig` title outdated for the redesigned positioning | `site.ts` |
| M5 | Contact form success message does not include response time estimate | `ContactPanel.tsx` |
| M6 | No `<meta name="theme-color">` for mobile browser chrome | `index.html` |
| M7 | JSON-LD missing `hasOccupation` and `worksFor` fields | `index.html` |
| M8 | Hero aria-label on logo link unhelpful ("Okagua.") | `Navbar.tsx` |

### Low Priority

| ID | Finding | Component |
|----|---------|-----------|
| L1 | `src/App.css` is effectively empty (30 bytes) | Root |
| L2 | `tsconfig.app.json` does not enable `strictNullChecks` | `tsconfig.app.json` |
| L3 | No `theme-color` meta for mobile browser chrome | `index.html` |
| L4 | Many unused Radix UI components add bundle weight | `package.json` |

---

## What Works Well (Preserve)

- Vite + React 18 + TypeScript with lazy-loaded routes
- Class-based dark/light theme with CSS custom properties
- Supabase-backed contact form with spam honeypot field
- Detailed case studies in `caseStudies.ts` with rich structured data
- Working blog with admin backend (Tiptap, Supabase auth)
- Accessible skip-link, semantic HTML landmarks, focus-visible ring
- Reduced-motion CSS block in `index.css`
- JSON-LD Person + WebSite structured data
- OG / Twitter card metadata present
- Sitemap and robots.txt in public/
- Framer Motion for accessible, purposeful nav animations
- Content data model in `src/content/` (typed, centralized)
- Mobile drawer with `aria-modal` and `aria-expanded`
- `BackToTop` component
- Error boundary wrapping all routes

---

## Positioning Assessment

**Before redesign:** Competent generalist with unclear seniority signal. The four "featured" projects include a tutoring role, and the hero communicates breadth but not depth.

**After redesign:** Senior full-stack and product engineer with explicit evidence of architecture decisions, mobile delivery ownership, multi-tenant SaaS design, and privacy-aware data modelling across three real production case studies.

---

## Changes Made

See `PORTFOLIO_CHANGELOG.md` for the complete list of files changed and what was updated.

---

## Remaining Recommendations

1. **OG image** — generate a PNG (1200×630) OG image to replace the SVG. Most social platforms do not render SVG in previews.
2. **Asele screenshots** — replace the case study preview card with real product screenshots when available. This would be the highest-impact visual upgrade.
3. **Résumé** — update the Google Drive folder link to a direct PDF for a better download experience.
4. **Testimonials** — add a genuine testimonials or recommendations section if any are available.
5. **Lighthouse audit** — run a full Lighthouse audit on the deployed site after these changes and address any LCP or CLS issues that surface.
6. **Blog content** — if there are engineering blog posts to write, a well-written technical post would significantly strengthen the thought-leadership signal.
7. **TypeScript strictness** — enable `strictNullChecks` in `tsconfig.app.json` for better type safety.
