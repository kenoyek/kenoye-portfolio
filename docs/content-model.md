# Content Model

Date: 2026-07-24

## Location

Structured content now lives in:

- `src/content/site.ts`
- `src/content/projects.ts`
- `src/content/capabilities.ts`
- `src/content/experience.ts`

## Project Type

The main project model is `PortfolioProject` in `src/content/projects.ts`.

Core fields:
- `slug`
- `title`
- `shortTitle`
- `category`
- `summary`
- `shortSummary`
- `role`
- `projectStatus`
- `featured`
- `priority`
- `timeframe`
- `platforms`
- `technologies`
- `responsibilities`
- `problem`
- `context`
- `architecture`
- `challenges`
- `decisions`
- `outcomes`
- `links`
- `gallery`
- `metadata`
- `seo`

Required for every project:
- `slug`
- `title`
- `category`
- `summary`
- `shortSummary`
- `role`
- `projectStatus`
- `priority`
- `technologies`

Optional fields should be used when the detail is known and verified.

## Status Values

- `live`: public product or page is live.
- `private`: private/client/internal work.
- `in-progress`: active or incomplete work.
- `case-study`: selected project intended for detailed case-study treatment.
- `available-on-request`: details can be discussed but should not be fully published yet.

## Initial Project Entries

Current structured entries:
- Asele
- TeachEasy LMS
- Reframe Mobile App
- LearnEasy Academy

Project order:
1. Asele
2. TeachEasy
3. Reframe
4. LearnEasy Academy

## Content Ownership Rules

- Project facts should be updated in `src/content/projects.ts`, then rendered by components.
- Avoid adding new project facts directly inside JSX.
- If a section needs content, add a typed field rather than a one-off hardcoded paragraph.
- Route-specific pages can add narrative detail, but facts should match the shared project entry.

## Verification Rules

Do not publish numeric metrics unless verified through:
- production analytics
- app-store records
- repository history
- database records
- deployment records
- documented project reports
- explicit user confirmation

When metrics are unavailable, prefer factual outcomes:
- Android production release completed
- iOS deployment workflow implemented
- one shared React codebase across platforms
- multi-tenant architecture implemented
- real-time collaboration introduced
- CMS content synchronized across web and mobile
- row-level security implemented
- multiple user portals delivered
- multilingual support implemented
- production build and deployment pipeline established

## HealthTech Language Rules

For Asele:
- Do not present wellness or AI-assisted features as medical diagnosis.
- Use language such as tracking, wellness context, cycle-aware notifications, and health briefs.
- Avoid clinical claims unless confirmed and legally reviewed.

## Adding a Future Project

1. Add a new object to `projects` in `src/content/projects.ts`.
2. Choose a unique `slug`.
3. Set a clear `projectStatus`.
4. Add only verified responsibilities and outcomes.
5. Add links only if public.
6. Add `seo` metadata if the project will have a route.
7. Add gallery items only when real assets exist.
8. If a detailed route is created, reuse the shared project entry and project components.

## Completed, Live, Private, and In-Progress Work

- Completed public work may use `live` or `case-study`.
- Private work should use `private` and avoid public client details.
- Work suitable for discussion but not publication should use `available-on-request`.
- Planned or incomplete functionality must be labeled in progress and not described as shipped.

## Current Caveats

- Asele and TeachEasy are structured for case-study expansion, but detailed routes are not yet implemented.
- Reframe has an existing route that should be refactored into the shared case-study system during Milestone 3.
- LearnEasy Academy is currently a supporting project and should be expanded only after public/private boundaries are confirmed.

