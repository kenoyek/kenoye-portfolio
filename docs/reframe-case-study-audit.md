# Reframe Case Study Audit

Date: 2026-07-24

## Existing Route

Before Milestone 3, Reframe lived at `src/pages/projects/Reframe.tsx` and was mounted at `/projects/reframe`.

The route contained:

- Route-specific arrays for stack, responsibilities, challenges, features, timeline, metrics, and gallery.
- Route-specific metadata in `useEffect`.
- A custom hero, overview, responsibilities, architecture, challenges, features, timeline, results, gallery, skills, and CTA.
- Framer Motion animation inside the route.
- Placeholder gallery tiles instead of verified product screenshots.

## Retain

- The `/projects/reframe` inbound route.
- CMS-driven news/community positioning.
- React, TypeScript, Next.js, and Capacitor platform context.
- Cross-platform iOS and Android mobile adaptation.
- Shared API and CMS synchronization language.
- Safe-area, lifecycle, deep-link, push-notification, and store-readiness work.
- Distinction between web platform, mobile adaptation, native integrations, and deployment workflow.

## Rewrite

- The old "native iOS and Android experience" wording now reads as cross-platform Capacitor mobile delivery.
- "Zero app resubmissions" language was softened to ordinary editorial updates flowing through shared CMS-backed APIs.
- Store-readiness language is separated from final public store status unless external store records confirm it.
- The route now distinguishes inherited web/CMS systems from mobile-specific ownership.

## Migrate

- Stack, responsibilities, challenges, timeline, outcomes, and SEO moved into `src/content/caseStudies.ts`.
- Page composition moved into shared components under `src/components/case-study/*`.
- Route handling moved to the generic `src/pages/projects/CaseStudyPage.tsx`.

## Remove

- Placeholder screenshot gallery.
- Route-specific Framer Motion usage.
- Hardcoded metrics-style result tiles.
- Duplicated one-off section layout.

## Missing

- Verified Reframe screenshots.
- External store-status confirmation.
- Final QA evidence for live app-store links, if those become public later.

