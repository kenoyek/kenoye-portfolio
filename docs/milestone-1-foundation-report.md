# Milestone 1 Foundation Report

Date: 2026-07-24

## Branch

`refactor/portfolio-foundation`

## Baseline Results

Before implementation:

- `npm run lint`: failed with 8 errors and 13 warnings.
- `npx tsc -b`: passed.
- `npm run test`: passed, 1 test.
- `npm run build`: passed. Main JS bundle was emitted as a single large asset around 1.2 MB uncompressed / 368 kB gzip.
- `npm audit --audit-level=moderate`: failed with 19 vulnerabilities.

## Dependency and Security Review

Safe remediation applied:

- Ran `npm audit fix` without `--force`.
- Removed `lovable-tagger` after removing it from Vite config.

Fixed by non-forced updates:

- `@remix-run/router` lockfile update.
- `@tootallnate/once`.
- `ajv`.
- `brace-expansion`.
- `flatted`.
- `form-data`.
- `glob`.
- `js-yaml`.
- `lodash`.
- `minimatch`.
- `postcss`.
- `rollup`.
- `vitest`.
- `ws`.
- `yaml`.

Remaining:

- `esbuild <=0.24.2` via Vite 5: moderate dev-server exposure. Audit recommends `vite@8.1.5`, a breaking change. Deferred to a reviewed Vite major migration.
- `react-router` / `react-router-dom`: audit still reports moderate advisories across the current major range. Deferred to a React Router upgrade/migration review.

Production exposure:

- The Vite/esbuild advisory affects development server behavior, not the static Vercel production bundle.
- React Router advisory should be handled, but current app does not intentionally navigate to untrusted backslash-controlled URLs. Still recommended for follow-up.

## Bundle Output

After route-level lazy loading:

- Main JS chunk: about 489 kB uncompressed / 147 kB gzip.
- Admin editor chunk: about 450 kB uncompressed / 142 kB gzip.
- Homepage route chunk: about 56 kB uncompressed / 15 kB gzip.
- Reframe route chunk: about 23 kB uncompressed / 6 kB gzip.

Result:

- Admin/Tiptap-heavy code is separated from the first public route load.
- The app still has a large shared vendor chunk and should receive deeper bundle analysis in Milestone 4.

## Implemented Foundations

- Typed site metadata constants.
- Typed project content model.
- Structured entries for Asele, TeachEasy, Reframe, and LearnEasy Academy.
- Layout primitives: `Container`, `Section`, `SectionHeader`.
- Project primitives: `ProjectTechnologyList`, `ProjectOutcomeList`, `ProjectStatus`.
- Semantic color tokens.
- Editorial typography scale.
- Radius and shadow scale.
- Reduced-motion CSS support.
- Global visible focus state.
- Skip-to-content link.
- Mobile navigation ARIA improvements.
- Route-level lazy loading.
- Canonical domain metadata set to `https://www.kenoye.site`.
- Robots sitemap URL updated to the canonical domain.

## Pattern Decisions

- Retain: restrained dark/green brand direction, responsive navigation, Supabase/blog foundation.
- Simplify: `glass-card`, glow utility, repeated technology pills.
- Consolidate: layout shells and project metadata rendering.
- Replace later: card-heavy homepage sections, placeholder gallery, repeated Framer Motion entrance animations.
- Remove later if confirmed unused: broad shadcn component inventory and any stale dependencies.

## Deferred

- Full homepage redesign.
- Asele and TeachEasy detail routes.
- Reframe case-study component-system refactor.
- Vite major upgrade.
- React Router migration.
- Lighthouse/browser baseline.
- Real responsive screenshot QA.
