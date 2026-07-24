# Case Study Authoring Guide

Date: 2026-07-24

## Add a New Case Study

1. Add or confirm the project summary in `src/content/projects.ts`.
2. Add a detailed entry in `src/content/caseStudies.ts`.
3. Set `caseStudyAvailable: true`.
4. Add a `case-study` link to the base project if the homepage should link to it.
5. The route will be available at `/projects/:slug`.

## Required Fields

- `slug`
- `title`
- `shortTitle`
- `productCategory`
- `summary`
- `role`
- `projectStatus`
- `platforms`
- `technologies`
- `canonicalUrl`
- `hero`
- `overview`
- `seo`
- `lastReviewed`

## Optional Sections

Use optional fields only when the content is known:

- `productContext`
- `users`
- `inheritedContext`
- `teamContext`
- `responsibilities`
- `problem`
- `constraints`
- `architecture`
- `keySystems`
- `technicalDecisions`
- `implementationPhases`
- `challenges`
- `security`
- `privacy`
- `accessibility`
- `performance`
- `deployment`
- `outcomes`
- `currentStatus`
- `lessons`
- `gallery`
- `mediaRequirements`
- `relatedProjects`

Empty optional sections do not render.

## Media

- Use actual assets only.
- Add `gallery` items only when the file exists and has safe alt text.
- Use `mediaRequirements` when screenshots are missing.
- Do not add fake device mockups or generated product screenshots.
- Redact private data before committing media.

## Technical Decisions

Each decision should explain:

- Context
- Decision
- Trade-offs
- Result
- Current limitation, when relevant

Do not invent alternatives. If exact historical alternatives are unknown, omit `alternatives`.

## Ownership

Use `responsibilities` groups to separate:

- `Led`
- `Implemented`
- `Integrated`
- `Refactored`
- `Collaborated on`
- `Inherited`
- `In progress`
- `Planned`

Be specific without implying sole ownership of inherited or team-owned work.

## Outcomes

Prefer factual outcomes over metrics unless metrics are verified by production analytics, app-store records, deployment records, or explicit user confirmation.

Good:

- Android production delivery completed.
- Multi-tenant architecture implemented.
- CMS content synchronized across web and mobile.

Avoid:

- Inflated user counts.
- Percent improvements without evidence.
- Clinical, financial, or safety outcomes without verification.

## In-Progress Work

Use `currentStatus` and `implementationPhases` with `in-progress`, `planned`, or `deferred` states. Do not describe planned work as shipped.

## Metadata

Every case study needs unique:

- `seo.title`
- `seo.description`
- `seo.canonicalUrl`
- `seo.ogTitle`
- `seo.ogDescription`
- `seo.ogUrl`

Use canonical URLs under `https://www.kenoye.site/projects/:slug`.

## Verify Claims

Before publishing, add significant claims to `docs/case-study-content-verification.md` with:

- Claim
- Project
- Source
- Publication status
- Required confirmation
- Safer fallback wording

## Related Navigation

Use `relatedProjects` with slugs that already exist in `caseStudies`. The shared footer navigation is generated from typed case-study order.

