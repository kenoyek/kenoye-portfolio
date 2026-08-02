# Portfolio Revamp Roadmap

Date: 2026-07-24

## Milestone 0 — Audit and Baseline

Objective: establish evidence, remove uncertainty, and decide the design direction before visual implementation.

Tasks:

- Complete repository audit.
- Create route, component, content, and dependency inventory.
- Capture current screenshots for desktop and mobile.
- Capture Lighthouse baseline for homepage, project page, and blog page.
- Verify production domain and route behavior on Vercel.
- Verify project facts, roles, metrics, and current statuses.
- Identify which UI primitives and dependencies are actually used.
- Decide whether blog/admin stays in scope.

Files likely affected:

- `docs/portfolio-revamp-audit.md`
- `docs/portfolio-revamp-roadmap.md`
- `.gitignore`

Dependencies:

- Browser/Lighthouse tooling.
- User approval on design direction.
- User confirmation of project facts.

Risks:

- Acting before facts are verified may preserve or amplify weak claims.
- Screenshot and Lighthouse work requires local browser tooling.

Acceptance criteria:

- Audit and roadmap exist in `docs/`.
- Validation baseline is documented.
- Open questions are explicit.
- No full redesign has begun.

Estimated complexity: medium.

## Milestone 1 — Foundation

Objective: create a maintainable design/content foundation before rebuilding pages.

Status: implemented on `refactor/portfolio-foundation`; pending review and approval before Milestone 2.

Tasks:

- Add `npm run typecheck`.
- Fix lint errors and decide warning policy.
- Address high-risk dependency audit items in a controlled update branch.
- Remove or isolate Lovable remnants, especially `lovable-tagger`.
- Choose one lockfile strategy: npm or Bun.
- Create typed content modules:
  - `src/content/projects.ts`
  - `src/content/capabilities.ts`
  - `src/content/experience.ts`
  - `src/content/site.ts`
- Create layout primitives:
  - `PageShell`
  - `Container`
  - `Section`
  - `SectionHeading`
  - `MetadataList`
- Establish typography tokens and revise font loading.
- Add accessibility baseline:
  - skip link
  - visible focus review
  - reduced-motion utility
  - mobile nav ARIA/focus improvements
- Add route-level lazy loading for admin/blog editor.

Files likely affected:

- `package.json`
- `package-lock.json`
- `vite.config.ts`
- `tailwind.config.ts`
- `src/index.css`
- `src/App.tsx`
- `src/components/Navbar.tsx`
- `src/components/Footer.tsx`
- `src/content/*`
- `src/components/layout/*`

Dependencies:

- Agreement on type/content architecture.
- Dependency-update tolerance.

Risks:

- Dependency upgrades may affect React Router, Vite, Vitest, or Tiptap.
- Stricter TypeScript may reveal more issues than expected.

Acceptance criteria:

- `npm run lint` passes or documented warnings are intentionally allowed.
- `npm run typecheck` passes.
- `npm run test` passes.
- `npm run build` passes.
- Shared content data powers at least one existing section.
- No visible redesign regression.

Estimated complexity: medium-large.

## Milestone 2 — Homepage

Objective: rebuild the homepage into a senior-level portfolio experience using the approved design direction.

Status: implemented on `feature/homepage-editorial-redesign`; pending review and approval before Milestone 3.

Restoration note, 2026-07-24: the homepage keeps the flagship four-project hierarchy, then restores valid earlier portfolio work in a secondary "More engineering work" section. See `docs/portfolio-project-restoration-audit.md`.

Tasks:

- Redesign hero around precise senior positioning.
- Add proof anchors: domains, platforms delivered, selected systems, availability.
- Rebuild Selected Work around 3-4 flagship projects.
- Replace generic skills grid with engineering capability sections.
- Rewrite About into a concise professional positioning section.
- Refine Experience into verified scope and leadership evidence.
- Decide whether Teaching remains a full section or supporting proof.
- Add writing/insights preview if blog content is ready.
- Rebuild contact panel with clear project-fit language and direct fallback email.
- Remove unused or weak homepage sections.
- Apply mobile-first responsive polish.

Files likely affected:

- `src/pages/Index.tsx`
- `src/components/HeroSection.tsx`
- `src/components/PortfolioSection.tsx`
- `src/components/FeaturedCaseStudy.tsx`
- `src/components/AboutSection.tsx`
- `src/components/SkillsSection.tsx`
- `src/components/ExperienceSection.tsx`
- `src/components/TutoringSection.tsx`
- `src/components/ContactSection.tsx`
- `src/content/*`
- new homepage section components

Dependencies:

- Approved visual direction.
- Verified content and metrics.
- Real project screenshots or diagrams.

Risks:

- Too much redesign in one pass could break mobile layout.
- Weak assets will limit visual credibility.

Acceptance criteria:

- Homepage communicates identity, seniority, domains, and CTA within five seconds.
- Projects are above generic skill lists.
- No unverifiable metrics remain.
- Mobile nav and layout are tested.
- Reduced-motion behavior works.
- Build and lint pass.

Estimated complexity: large.

## Milestone 3 — Case Studies

Objective: make projects the strongest proof of technical credibility.

Status: implemented on `feature/project-case-study-system`; pending review and approval before Milestone 4.

Tasks:

- Create reusable case-study data model.
- Create reusable case-study components:
  - `CaseStudyHero`
  - `CaseStudyNav`
  - `ProjectMetadata`
  - `ArchitectureDiagram`
  - `TechnicalDecision`
  - `ChallengeSolution`
  - `ProjectGallery`
- Refactor Reframe into the shared system.
- Build Asele case study if facts/assets are confirmed.
- Build TeachEasy case study if facts/assets are confirmed.
- Add authoring guide for future case studies.
- Clearly label personal ownership, inherited systems, team work, in-progress items, and production status.
- Remove screenshot placeholders and document verified media requirements.

Files likely affected:

- `src/pages/projects/CaseStudyPage.tsx`
- `src/components/case-study/*`
- `src/content/caseStudies.ts`
- `src/content/projects.ts`
- `src/App.tsx`
- `docs/case-study-*.md`

Dependencies:

- Project facts in the typed content layer and repository documentation.
- Screenshots/product artifacts for later visual replacement.
- User approval before moving into Milestone 4.

Risks:

- Case studies can become too long if not structured for scanning.
- App/product screenshots may expose private data if not cleaned.

Acceptance criteria:

- A reusable case-study route system exists.
- Asele, TeachEasy, and Reframe have published pages.
- Reframe no longer contains placeholder gallery.
- Project summaries and detail pages share one content model.
- Metadata is route-specific.

Estimated complexity: large.

## Milestone 4 — Quality

Objective: harden the site for performance, accessibility, SEO, security, and reliability.

Status: implemented on `chore/production-readiness`; pending review, merge, deployment, and production verification.

Tasks:

- Run Lighthouse and address Core Web Vitals issues.
- Split admin/blog/editor chunks.
- Optimize font loading.
- Add image sizing, lazy loading, and responsive sources.
- Replace generated OG image with branded local social preview.
- Confirm and update canonical domain.
- Add Person schema and project/article schema where appropriate.
- Deploy or replace sitemap function.
- Add security headers in `vercel.json`.
- Add ErrorBoundary.
- Sanitize or constrain blog HTML rendering.
- Add spam protection/rate limiting for contact form.
- Add meaningful tests:
  - homepage renders core sections
  - navigation works
  - project cards render from content data
  - contact form handles success/error
  - blog empty/error states

Files likely affected:

- `vercel.json`
- `index.html`
- `src/App.tsx`
- `src/pages/BlogPost.tsx`
- `src/components/BlogComments.tsx`
- `src/components/BlogLikeButton.tsx`
- `src/components/ContactSection.tsx`
- `supabase/functions/*`
- test files

Dependencies:

- Production domain.
- Supabase/Resend access.
- Final route structure.

Risks:

- Security headers can break external assets if CSP is too strict.
- Sanitization may alter existing blog content.

Acceptance criteria:

- Lighthouse baseline improves or documented exceptions exist.
- `npm run lint`, `npm run typecheck`, `npm run test`, and `npm run build` pass.
- `npm audit` has no critical/high runtime issues, or accepted exceptions are documented.
- Contact form works in deployed environment.
- SEO metadata uses final domain.

Estimated complexity: medium-large.

## Milestone 5 — Production

Objective: ship the polished portfolio with deployment confidence and clear maintenance practices.

Tasks:

- Final content review.
- Final visual QA on desktop/tablet/mobile.
- Cross-browser checks: Chrome, Safari, Firefox.
- Validate Vercel deployment, environment variables, and redirects.
- Deploy Supabase Edge Functions from an account with project privileges.
- Configure Resend sender domain.
- Decide analytics/privacy approach.
- Add error monitoring if desired.
- Create maintenance docs for adding projects/case studies/blog posts.
- Tag a release in GitHub.

Files likely affected:

- `README.md`
- `docs/*`
- `vercel.json`
- Supabase function configuration
- Vercel environment settings

Dependencies:

- Access to Vercel/Supabase/Resend.
- Final domain.
- Final assets.

Risks:

- Environment mismatches between local, Vercel, and Supabase.
- DNS/domain changes can delay validation.

Acceptance criteria:

- Production deploy is verified manually.
- Contact form sends to the correct inbox.
- Direct routes work on refresh.
- No placeholder content remains.
- README reflects real setup and deployment process.

Estimated complexity: medium.

## Prioritization

Critical:

- Fix lint failures.
- Resolve or document security audit findings.
- Confirm production domain and remove Lovable/generated URLs.
- Verify project facts/metrics.
- Deploy and configure contact email function.

High value:

- Content/data layer.
- Homepage IA redesign.
- Case-study architecture.
- Route-level code splitting.
- Real screenshots/visual evidence.
- Accessibility baseline.

Refinement:

- Typography polish.
- Social preview design.
- Micro-interactions.
- Blog/writing strategy.
- Advanced diagrams/galleries.

## First Implementation Milestone

Start with Milestone 1 after approval. It is the best first build phase because it improves reliability and maintainability without locking the site into a visual direction too early.

Recommended first task sequence:

1. Add `typecheck` script.
2. Fix lint errors in app-owned code.
3. Remove Lovable tagger dependency if safe.
4. Decide lockfile strategy.
5. Create typed project content data.
6. Refactor `PortfolioSection` to consume typed project data without changing the visual design yet.
