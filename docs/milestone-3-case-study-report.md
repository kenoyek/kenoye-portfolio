# Milestone 3 Case Study Report

Date: 2026-07-24

## Objective

Create a reusable, typed, editorial case-study system and use it for Asele, TeachEasy, and Reframe.

## Branch

`feature/project-case-study-system`

## Content Model Changes

- Added `src/content/caseStudies.ts`.
- Added optional typed sections for ownership, architecture, status, decisions, phases, challenges, outcomes, media, related projects, and SEO.
- Kept homepage summaries in `src/content/projects.ts` and linked available case studies from the base project data.

## Shared Components

- `CaseStudyLayout`
- `CaseStudySeo`
- `CaseStudyHero`
- `CaseStudyBreadcrumbs`
- `CaseStudyMeta`
- `CaseStudyTableOfContents`
- `ResponsibilityMatrix`
- `ProjectStatusSummary`
- `ArchitectureDiagram`
- `KeySystems`
- `DecisionList`
- `ImplementationPhases`
- `ChallengeResponse`
- `ProjectGallery`
- `RelatedProjects`
- `CaseStudyFooterNavigation`

## Asele Implementation

Implemented sections for overview, product context, users, role and ownership, problem, constraints, architecture, cycle/reminder systems, mobile delivery, AI-assisted briefs, multilingual/admin tooling, technical decisions, implementation phases, engineering challenges, privacy, deployment, outcomes, current status, lessons, media requirements, and related work.

Health-product language avoids diagnosis, treatment, clinical accuracy, regulatory approval, medical-device status, clinician endorsement, and health outcomes.

## TeachEasy Implementation

Implemented sections for overview, business context, users and roles, role and ownership, problem, constraints, multi-tenant architecture, permissions/RLS, scheduling, Jitsi/classroom collaboration, communication and branding, technical decisions, implementation phases, engineering challenges, security, deployment, outcomes, current status, lessons, media requirements, and related work.

Planned Stripe, recordings, analytics, and Jitsi secret-dependent enforcement are status-labelled rather than described as completed.

## Reframe Migration

- Replaced `src/pages/projects/Reframe.tsx` with shared `/projects/:slug` route handling.
- Preserved `/projects/reframe`.
- Migrated reusable content into `src/content/caseStudies.ts`.
- Removed placeholder screenshot gallery.
- Softened "fully native" and store-status language.
- Added inherited-system ownership clarity.

## SEO

Each case-study route now has unique client-side title, description, canonical URL, Open Graph metadata, and conservative JSON-LD using WebPage, CreativeWork, and BreadcrumbList.

Canonical URLs:

- `https://www.kenoye.site/projects/asele`
- `https://www.kenoye.site/projects/teacheasy`
- `https://www.kenoye.site/projects/reframe`

## Accessibility

- One H1 per case-study page.
- Breadcrumbs use semantic nav and `aria-current`.
- Table of contents uses normal anchor links and works without JavaScript.
- Architecture diagrams are HTML, responsive, readable without animation, and include text connection lists.
- Status labels include text and do not rely only on color.
- Product media requires alt text before rendering.

## Responsive Behaviour

The layouts use stacked mobile sections, responsive metadata rails, wrapping link controls, and list-based architecture fallbacks. Browser screenshot tooling was not available in this environment; a manual QA checklist is required before approval.

## Performance

- Project routes remain route-level lazy loaded.
- No new dependencies were added.
- No media payloads were added.
- The homepage does not load project-route components until navigation.

Build output after Milestone 3:

- CSS: `80.02 kB / 13.80 kB gzip`
- Homepage route chunk: `23.86 kB / 6.69 kB gzip`
- Case-study route chunk: `58.32 kB / 14.30 kB gzip`
- Shared app chunk: `488.61 kB / 147.03 kB gzip`

Milestone 2 baseline:

- CSS: `80.46 kB / 13.90 kB gzip`
- Homepage route chunk: `33.53 kB / 9.16 kB gzip`

## Asset Gaps

See `docs/case-study-asset-needs.md`.

## Claim Verification

See `docs/case-study-content-verification.md`.

## Validation

- `npm install`: passed, dependencies already up to date.
- `npm run lint`: passed.
- `npm run typecheck`: passed.
- `npm run test`: passed, 2 files and 6 tests.
- `npm run build`: passed.
- Production preview smoke tests returned HTTP 200 SPA responses for `/`, `/projects/asele`, `/projects/teacheasy`, `/projects/reframe`, `/blog`, `/admin/login`, `/projects/not-a-project`, and `/unknown-route`.

## Risks

- Route-specific metadata is still client-side because this remains a Vite SPA.
- Product screenshots are missing.
- Exact external store status for mobile apps should be confirmed from store/deployment records.
- Browser console, visual responsive checks, and Lighthouse were not available here.

## Deferred Work

- LearnEasy full case study.
- Real screenshot insertion.
- Final performance, SEO, dependency-upgrade, and production-readiness hardening.

## Recommended Milestone 4 Scope

Run Lighthouse, add browser/screenshot QA, optimize final SEO/social assets, harden dependency advisories, confirm production secrets, add security headers, and verify deployed Vercel route refresh behavior.
