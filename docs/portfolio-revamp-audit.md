# Portfolio Revamp Audit

Date: 2026-07-24

## 1. Executive Summary

The current portfolio is a functional Vite/React single-page application with useful raw material: real projects, a working blog/admin foundation, Supabase integration, a detailed Reframe case-study page, responsive navigation, and a restrained dark/green palette. It is not yet operating at the level of a premium senior engineering portfolio.

The biggest gap is not the stack. The gap is curation. The site still reads like a generated portfolio template in several places because content, layout, animation, and component boundaries are generic and repetitive. The strongest future direction is an editorial engineering portfolio: fewer repeated cards, stronger project storytelling, richer case studies, sharper technical positioning, and more evidence of ownership, constraints, trade-offs, and production delivery.

No full redesign should begin until the design direction, case-study priority order, and verified project facts are approved.

## 2. Current Technology Stack

- Framework: Vite 5, React 18, TypeScript.
- Routing: `react-router-dom` with browser routing and Vercel rewrites.
- Styling: Tailwind CSS, CSS custom properties, shadcn/ui-style Radix components.
- UI: many shadcn primitives in `src/components/ui`.
- Animation: Framer Motion across most homepage sections.
- Data/backend: Supabase client, generated database types, migrations, Edge Functions.
- Blog editor: Tiptap rich-text editor with HTML mode.
- Testing: Vitest and Testing Library setup with one placeholder test.
- Deployment: Vercel static deployment, `vercel.json` SPA rewrite.
- Package manager state: both `package-lock.json`, `bun.lock`, and `bun.lockb` exist.

## 3. Repository Architecture Assessment

The project is suitable for continued development, but the architecture should be tightened before a major visual revamp.

Strengths:
- Simple Vite app structure is easy to deploy and reason about.
- Routes are centralized in `src/App.tsx`.
- Supabase integration is isolated in `src/integrations/supabase`.
- There is already one detailed case-study route at `src/pages/projects/Reframe.tsx`.
- UI primitives are locally owned, which allows controlled styling.

Weaknesses:
- Homepage content is hardcoded inside section components rather than modeled as typed portfolio data.
- `PortfolioSection.tsx` is oversized and mixes project data, filtering, modal behavior, and rendering.
- `Reframe.tsx` is a 530-line route component with data, layout, metadata, animation, and presentation in one file.
- `AdminBlogEditor.tsx` is 305 lines and mixes editor configuration, persistence, toolbar UI, and publishing logic.
- `vite.config.ts` still imports `lovable-tagger`.
- TypeScript is permissive: `noImplicitAny`, `noUnusedLocals`, `noUnusedParameters`, and `strictNullChecks` are disabled.
- ESLint disables `no-unused-vars`, letting dead code accumulate.
- Many shadcn UI components appear unused and add maintenance surface.

Recommended architecture:
- Keep Vite/React for now.
- Add a typed content layer under `src/content` or `src/data`.
- Split project data from rendering.
- Create reusable case-study components.
- Lazy-load admin/editor/blog-heavy routes.
- Remove Lovable development remnants after confirming no dependency on component tagging.

## 4. Current UX Assessment

First five seconds:
- A visitor understands that Kenoye builds systems, teaches, and works with React/TypeScript/Python.
- Seniority is implied but not proven quickly enough.
- The hero communicates broad value, but it does not immediately name the highest-value positioning: full-stack/product architecture, mobile delivery, Supabase systems, EdTech/HealthTech, and leadership.
- The terminal visual is distinctive enough to avoid pure marketing-site feel, but the copy still resembles portfolio-template language.

Information architecture:
- Current order: hero, about, portfolio, featured case study, skills, experience, tutoring, contact, final CTA, footer.
- For senior audiences, selected work should come earlier and go deeper.
- Skills should not be a generic matrix; they should support the project stories.
- Services and Stats components exist but are not mounted, creating content drift.
- Resume access only appears near the final CTA, not in the header.
- Blog exists but is not yet positioned as thought leadership on the homepage.

Recommended IA:
1. Hero: name, positioning, proof anchors, CTA.
2. Selected Work: Asele, TeachEasy, Reframe, LearnEasy/TogaCode as applicable.
3. Case-study preview: one deep story, with technical decisions and ownership.
4. Professional positioning: what kind of engineer/product builder this is.
5. Capabilities: architecture, mobile, full-stack, Supabase, product strategy, EdTech/HealthTech.
6. Experience and leadership: concise evidence, no inflated metrics.
7. Writing/insights: optional but useful once blog content is real.
8. Contact: focused, low-friction, with direct email and project-fit cues.

## 5. Visual-Design Assessment

What works:
- The palette is restrained: dark primary, green accent, neutral backgrounds.
- Typography is readable and mostly consistent.
- Section spacing is decent on mobile and desktop.
- The site avoids extreme gradients and heavy 3D.

What weakens credibility:
- Too many rounded cards and repeated two-column/card-grid layouts.
- Excessive small badges/pills make important metadata feel decorative.
- Framer Motion is applied nearly everywhere; motion stops feeling intentional.
- `glass-card`, glow utilities, radial backgrounds, dotted overlays, and rounded cards are familiar generated-site tropes.
- The Reframe gallery contains placeholders, which directly harms credibility.
- The site uses one typeface, Inter, everywhere; competent, but not distinctive.
- No strong visual artifact proves real production work: screenshots, architecture diagrams, app-store assets, product UI, repository/process snapshots, or technical diagrams.

## 6. Content Assessment

Strong content:
- Reframe has concrete platform/architecture details.
- TogaCode has real technical decisions: RLS, Edge Functions, invite codes, code execution.
- The portfolio names project problems, roles, solutions, and impact.
- The teaching narrative gives personality and differentiation.

Content risks:
- Some claims need verification or softer phrasing: `500+ students`, `92% capstone completion`, `course creation time dropped ~70%`, `thousands of end users`, `3 countries`, `60%+ manual workflow reduction`.
- "Products that matter", "measurable impact", "turn vague problems into shipped software" are usable but generic unless grounded by examples.
- Asele and TeachEasy are underrepresented compared with their real importance from the brief.
- The portfolio still positions design/tutoring/software as equal services; the senior positioning should lead with architecture/product engineering, then include education/design as context.
- The homepage says "Flutter" for Asele while the brief says Asele uses React, TypeScript, Supabase, and Capacitor. This conflict needs correction before redesign.

## 7. Accessibility Assessment

Good:
- Forms have visible labels.
- Icon-only footer and nav buttons generally have `aria-label`.
- Mobile menu locks body scroll.
- Color tokens support light/dark themes.

Issues:
- No skip link.
- No explicit reduced-motion strategy despite heavy Framer Motion usage.
- Mobile drawer lacks `aria-expanded`, `aria-controls`, dialog semantics, and focus management.
- Active section navigation is visual only.
- Repeated icon cards may create noisy screen-reader output if icons are not hidden.
- Some link text is generic: "View Live", "Get Started", "Read more".
- Blog content allows raw HTML from admin editor and uses `dangerouslySetInnerHTML`; this needs a sanitization policy.
- Heading hierarchy should be checked once the homepage is restructured.

Target: WCAG 2.2 AA where practical.

## 8. Performance Assessment

Observed build:
- Production build passes.
- Generated JS bundle is about 1.2 MB uncompressed and 368 kB gzip.
- Vite warns that chunks exceed 500 kB.

Risks:
- Admin/editor dependencies such as Tiptap likely contribute to the main bundle if not route-split.
- Framer Motion is imported across many sections.
- Google Fonts are loaded via CSS `@import`, which is less controllable than `<link rel="preconnect">` and stylesheet links in `index.html`.
- `hero-bg.jpg` exists but is not used; public assets should be audited.
- No responsive image system or image metadata layer exists.
- No Lighthouse baseline was captured during this audit because the local environment exposes no browser/Lighthouse workflow in the repo. Add this in Milestone 0.

## 9. SEO Assessment

Good:
- `index.html` has baseline title/description/OG/Twitter tags.
- Blog post route sets dynamic metadata and JSON-LD client-side.
- Sitemap Edge Function exists.
- `public/robots.txt` exists.

Issues:
- Homepage metadata still includes generated-platform social image URL from `gpt-engineer-file-uploads`.
- `SITE_URL` in `BlogPost.tsx` and `supabase/functions/sitemap/index.ts` is still `https://kenoye.lovable.app`.
- SPA metadata is client-side, so crawlers may not always see route-specific metadata.
- No Person schema on homepage.
- No project-specific metadata pattern exists for case studies.
- Sitemap route/function deployment strategy is unclear.
- Need canonical production domain before final SEO work.

## 10. Maintainability Assessment

Critical maintainability issues:
- Hardcoded content spread across components.
- Weak TypeScript compiler settings.
- Lint currently fails.
- Security audit currently fails.
- shadcn component dump makes it unclear which primitives are owned/used.
- Two lockfile ecosystems are present.

Recommended content architecture:
- Start with typed TypeScript objects, not MDX or CMS, because the portfolio needs strong structure and the content volume is modest.
- Use `src/content/projects.ts`, `src/content/capabilities.ts`, `src/content/experience.ts`.
- Consider MDX later only for long-form case studies if the writing cadence increases.
- Keep Supabase for blog/admin if publishing is truly needed; otherwise consider static content for reliability and SEO.

## 11. Problems Ranked by Severity

Critical:
- Lint fails with 8 errors and 13 warnings.
- `npm audit` reports 19 vulnerabilities, including one critical.
- Supabase/contact function deployment depends on project privileges and secrets outside the repo.
- Production metadata still references Lovable/generated URLs.
- Project claims and technologies have factual conflicts or unsupported metrics.

High value:
- Bundle is too large for a portfolio due to non-split editor/admin dependencies.
- Case-study system is not reusable.
- Homepage overuses repeated cards/pills/scroll animations.
- Asele and TeachEasy are not represented with sufficient technical depth.
- Accessibility gaps in motion, mobile navigation, and skip/focus behavior.

Refinement:
- Upgrade typography from one-size Inter to a more editorial hierarchy.
- Replace placeholder gallery with real screenshots or diagrams.
- Improve footer/header labels and CTA language.
- Add social preview image generated from the final identity.

## 12. Quick Wins

Safe in isolation:
- Add `*.tsbuildinfo` to `.gitignore`.
- Remove or isolate `lovable-tagger` once confirmed unnecessary.
- Fix lint errors in app-owned files.
- Add skip link and reduced-motion support.
- Update `SITE_URL` constants after confirming production domain.
- Replace generated social image URL with local branded image.
- Add route-level lazy loading for admin/blog editor.
- Add `npm run typecheck`.

Needs approval/content:
- New hero positioning.
- Visual direction.
- Case-study prioritization.
- Removal of stats or claims that cannot be verified.
- Real screenshots/galleries.

## 13. Recommended Design Directions

### Direction A: Editorial Engineering Portfolio

Visual philosophy: magazine-like composition for technical work. Fewer boxes, stronger typography, restrained dividers, dense but readable case-study metadata.

Typography: pair Inter or a similar UI sans with a more distinctive editorial display face, or use Inter with larger contrast in weight/size and tighter content widths.

Colour: neutral light/dark base, one green accent, occasional project-specific accent colors.

Layout: long-form sections, asymmetric grids, metadata rails, narrative blocks, architecture diagrams.

Navigation: compact sticky header with Work, Case Studies, Writing, Contact, Resume.

Hero: direct positioning with a narrow proof strip and one strong visual artifact, not a decorative terminal only.

Project presentation: 3-4 flagship projects with role, scope, constraints, decisions, and status.

Motion: subtle reveals for sections and project visuals only.

Image treatment: real product screenshots, diagrams, app-store artifacts, blurred placeholders only while loading.

Mobile behavior: editorial stack with sticky section anchors only where useful.

Advantages: best matches senior engineer/consultant positioning and avoids SaaS-template feel.

Risks: needs strong writing and real screenshots to shine.

Suitability: highest.

### Direction B: Technical Product-Builder Portfolio

Visual philosophy: product operating-system feel. More structured, dashboard-like, with architecture and delivery evidence.

Typography: clean sans, compact labels, strong metadata tables.

Colour: dark-neutral foundation with project-specific status/accent treatments.

Layout: system maps, project matrices, delivery timelines, technical decision logs.

Navigation: workbench-style nav with project filters.

Hero: "I design and ship full-stack and mobile products" plus capability matrix.

Project presentation: interactive project index and deep technical detail pages.

Motion: functional hover states, tab transitions, no ornamental motion.

Image treatment: screenshots framed as product evidence.

Mobile behavior: compact cards, collapsible metadata, simple project nav.

Advantages: strongly technical and differentiated.

Risks: can feel like an internal dashboard if not softened with human narrative.

Suitability: high.

### Direction C: Minimal Consultancy and Case-Study Portfolio

Visual philosophy: quiet consulting credibility. Sparse sections, high trust, minimal decoration.

Typography: refined sans, generous white space, low visual noise.

Colour: mostly neutral with accent used sparingly.

Layout: concise homepage, long case-study pages, clear contact path.

Navigation: simple header with resume and contact.

Hero: positioning plus 2-3 proof bullets.

Project presentation: fewer projects, deeper summaries.

Motion: near-zero, only state changes.

Image treatment: limited but high-quality.

Mobile behavior: fast, readable, low interaction cost.

Advantages: polished and credible.

Risks: may underplay the breadth across EdTech, HealthTech, mobile, and product leadership.

Suitability: medium-high.

Preferred direction: Direction A, Editorial Engineering Portfolio, with selected elements from Direction B for technical diagrams and metadata.

## 14. Recommended Information Architecture

1. Hero
- Purpose: establish identity, senior positioning, domains, and next action.
- Content: Okagua Kenoye; software architect/product engineer; full-stack, mobile, Supabase, EdTech/HealthTech.
- Layout: editorial text block plus one real artifact or concise systems panel.
- Reuse: some current hero copy, but rewrite.

2. Selected Work
- Purpose: make projects the proof.
- Content: Asele, TeachEasy, Reframe, LearnEasy/TogaCode.
- Layout: one featured project plus two or three editorial summaries.
- Reuse: project data, but reorganize and correct.

3. Case Study Preview
- Purpose: show depth without requiring a click.
- Content: architecture, constraints, decisions, results from strongest project.
- Layout: narrative plus metadata rail.
- Reuse: Reframe/TogaCode sections.

4. Professional Positioning
- Purpose: explain the combination of engineering, product, leadership, education.
- Layout: short prose plus capability principles.
- Reuse: About section, rewritten.

5. Capabilities
- Purpose: replace generic skills grid with contextual strengths.
- Content: product architecture, mobile delivery, Supabase/RLS, SaaS/multi-tenant, AI integrations, technical leadership.
- Layout: grouped capability list with evidence links.
- Reuse: Skills data, rewritten.

6. Experience and Leadership
- Purpose: provide career credibility.
- Layout: timeline/list with verifiable scope.
- Reuse: Experience section with fact checks.

7. Writing or Insights
- Purpose: show thinking if blog content is active.
- Layout: latest posts or featured essay.
- Reuse: Blog route if content exists.

8. Contact
- Purpose: clear next step.
- Layout: concise form plus direct email and fit statements.
- Reuse: ContactSection, with better errors/spam handling.

Remove or merge:
- Current `StatsSection` and `TestimonialsSection` unless real, verified content is supplied.
- Current generic `ServicesSection` unless reframed into capabilities/engagement types.

## 15. Recommended Component Architecture

Shared components:
- `SiteHeader`
- `MobileNavigation`
- `SiteFooter`
- `SectionHeading`
- `TextBlock`
- `MetadataList`
- `CapabilityList`
- `ProjectSummary`
- `FeaturedProject`
- `ProjectMetadata`
- `CaseStudyHero`
- `CaseStudySection`
- `CaseStudyNavigation`
- `ArchitectureDiagram`
- `TechnicalDecision`
- `ChallengeSolution`
- `ProjectGallery`
- `ContactPanel`

Data-driven:
- Projects, capabilities, experience, navigation links, social links.

Route-specific:
- Admin dashboard/editor, blog listing, blog post, each case-study route.

Lazy-loaded:
- Blog pages, admin pages, Tiptap editor, heavy case-study galleries.

## 16. Case-Study Strategy

Reusable project summary fields:
- Project name
- Product category
- Problem
- Context
- Role
- Scope of ownership
- Users/stakeholders
- Constraints
- Architecture
- Major features
- Engineering challenges
- Decisions and trade-offs
- Security considerations
- Performance considerations
- Platform considerations
- Outcome
- Current status
- Technologies

Detailed case-study sections:
1. Overview
2. Challenge
3. Context and constraints
4. Responsibilities
5. Architecture
6. Key decisions
7. Implementation
8. Technical challenges
9. Results
10. Lessons
11. Gallery

Project-specific notes:
- Asele should become a flagship HealthTech/mobile case study if the React/TypeScript/Supabase/Capacitor facts are confirmed.
- TeachEasy should become the flagship multi-tenant EdTech/SaaS architecture story.
- Reframe can remain a mobile delivery case study but needs real screenshots and exact status.
- LearnEasy Academy can show coding tutoring and education support; distinguish tutoring/curriculum support from founder, product ownership, or software implementation claims.
- TogaCode can remain only if it is a distinct project and its metrics are verified.

## 17. Content Recommendations

Hero:
- Replace generic "I build scalable systems..." with a more specific positioning line.
- Example direction: "I design and ship full-stack and mobile products for education, health, and content-driven platforms."

Supporting statement:
- Add stack/domain specificity: React, TypeScript, Supabase, Capacitor, multi-tenant systems, mobile release workflows.

Primary CTA:
- "View selected work" should lead to projects.
- Secondary CTA: "Discuss a project" or "Download resume".

About:
- Keep teaching as differentiator, but connect it to leadership, clarity, and systems thinking.

Experience:
- Use verifiable scope and avoid unsupported metrics until confirmed.

Skills:
- Reframe as capabilities with evidence, not proficiency labels.

Contact:
- State the types of work Kenoye is best suited for.
- Improve error messages and fallback direct email.

## 18. Technical Recommendations

Performance:
- Route-split admin/blog editor.
- Lazy-load Framer Motion-heavy case-study modules or reduce motion use.
- Move fonts to `index.html` with preconnect and stylesheet links.
- Add responsive images and real screenshots.
- Remove unused UI components/dependencies once usage is audited.

SEO:
- Confirm production domain.
- Replace `kenoye.lovable.app` constants.
- Add homepage Person schema.
- Add project metadata config.
- Add local OG image.
- Ensure sitemap function is deployed or replace with static generated sitemap.

Accessibility:
- Add skip link.
- Add reduced-motion CSS and animation guards.
- Improve mobile drawer semantics/focus.
- Audit heading order after redesign.
- Sanitize blog HTML or restrict trusted admin-only paths.

Security:
- Run `npm audit fix` in a controlled dependency-update branch.
- Review exposed publishable key strategy; anon key is expected public, service keys must never enter client code.
- Add contact spam protection: Turnstile/hCaptcha, honeypot, rate limiting, or Supabase function throttling.
- Sanitize rich-text output before rendering.
- Add security headers in `vercel.json`.

Reliability:
- Add ErrorBoundary.
- Add route-level loading/error states.
- Add real tests for navigation, contact form, project rendering, and blog fallbacks.
- Add CI validation commands.

## 19. Implementation Roadmap

See `docs/portfolio-revamp-roadmap.md`.

## 20. Risks and Dependencies

Dependencies:
- Production domain confirmation.
- Real screenshots/product artifacts for Asele, TeachEasy, Reframe.
- Verified role/scope/outcome facts.
- Supabase project privileges for Edge Function deployment.
- Resend verified sender domain.

Risks:
- A full redesign before content modeling will produce another polished but shallow template.
- Upgrading dependencies may cause routing/admin/editor regressions.
- Embedding project-specific metrics without evidence will harm credibility.
- Keeping admin/editor in main bundle will hurt performance.

## 21. Open Questions Requiring Decision

1. Which project should be the flagship homepage story: Asele, TeachEasy, Reframe, or another?
2. What is the final production domain?
3. Which numeric claims are verified and safe to publish?
4. Do you want the blog/admin system to remain part of the portfolio long term?
5. Can you provide screenshots, app-store assets, architecture diagrams, or product walkthrough captures?
6. Should the portfolio emphasize consulting/client delivery, employment/recruiting, or founder/product credibility first?
7. Should graphic design remain a visible service, or become supporting context?

## Research Notes

Patterns referenced during audit:
- Nielsen Norman Group guidance on first impressions and credibility: https://www.nngroup.com/articles/first-impressions-human-automaticity/
- Nielsen Norman Group guidance on scanning and content hierarchy: https://www.nngroup.com/articles/how-users-read-on-the-web/
- Google web.dev Core Web Vitals and performance guidance: https://web.dev/vitals/
- W3C WCAG 2.2 accessibility standard: https://www.w3.org/TR/WCAG22/
- MDN guidance on prefers-reduced-motion: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion

The research takeaway: high-quality senior portfolios are not won by novelty effects. They succeed when the first screen establishes positioning, the work section provides proof, and case studies show judgment through constraints, trade-offs, and outcomes.

## Validation Baseline

Executed on 2026-07-24:

- `npm install`: passed, dependencies already up to date.
- `npm run lint`: failed with 8 errors and 13 warnings.
- `npm run test`: passed, 1 test.
- `npm audit --audit-level=moderate`: failed, 19 vulnerabilities reported: 1 low, 3 moderate, 14 high, 1 critical.
- `npx tsc -b`: passed.
- `npm run build`: passed. Warning: large bundle, JS about 1.2 MB uncompressed / 368 kB gzip.

## Milestone 1 Update

Implemented on branch `refactor/portfolio-foundation`:

- Lint baseline fixed to zero errors.
- Typed content layer introduced under `src/content`.
- Asele, TeachEasy, Reframe, and LearnEasy Academy entries created.
- Layout and project primitives introduced.
- Canonical domain updated to `https://www.kenoye.site`.
- `lovable-tagger` removed from Vite and dependencies.
- Route-level lazy loading added; admin editor code is now isolated into a separate chunk.
- Non-forced dependency security fixes reduced audit findings from 19 to 4.

See `docs/design-system-foundation.md`, `docs/content-model.md`, and `docs/milestone-1-foundation-report.md`.
