# Design System Foundation

Date: 2026-07-24

## Design Principles

- Editorial before decorative: hierarchy, spacing, and writing should carry the experience.
- Technical proof over spectacle: project decisions, constraints, architecture, and outcomes matter more than animated surfaces.
- Restrained premium feel: use neutral surfaces, one primary accent, calm borders, and limited shadows.
- Human-authored tone: avoid generic SaaS phrasing, inflated claims, and repeated badge grids.
- Accessibility is part of the visual system: focus states, reduced motion, contrast, and semantic structure are baseline requirements.

## Colour Tokens

Defined in `src/index.css` and exposed through `tailwind.config.ts`.

Core semantic tokens:
- `background`
- `surface`
- `surface-elevated`
- `foreground`
- `muted`
- `muted-foreground`
- `border`
- `border-subtle`
- `border-strong`
- `accent`
- `accent-foreground`
- `success`
- `success-foreground`
- `warning`
- `warning-foreground`
- `destructive`
- `destructive-foreground`
- `ring`

Rules:
- Use semantic tokens rather than hardcoded hues in new components.
- Use `accent` for action, status emphasis, and technical highlights only.
- Avoid additional accent colors unless they are project-specific and documented.
- Avoid glow-heavy treatments; use border and spacing first.

## Typography Scale

Defined in `tailwind.config.ts`.

- `text-display`: first-screen editorial headline.
- `text-page-title`: route-level page title.
- `text-section-title`: section heading.
- `text-subheading`: supporting heading.
- `text-body-large`: lead paragraph or section summary.
- `text-body`: default body copy.
- `text-body-small`: secondary copy.
- `text-caption`: captions and helper text.
- `text-metadata`: uppercase metadata labels.

Rules:
- Letter spacing is set to `0` for headings to avoid compressed generated-site styling.
- Use metadata text sparingly.
- Prefer readable line lengths and stronger hierarchy over decorative font changes.
- Font loading now happens in `index.html` with Google Fonts preconnect and `display=swap`.

## Spacing Scale

Current shared spacing:
- `.section-padding`: standard responsive vertical rhythm.
- `Container`: standard horizontal gutters and max widths.
- `Section`: consistent section shell.
- `SectionHeader`: consistent section title, eyebrow, divider, and summary treatment.

Rules:
- Prefer shared layout primitives before adding one-off `max-w-[1120px] mx-auto px-5` strings.
- Use tighter spacing in metadata rails and larger spacing in narrative sections.
- Avoid wrapping every section in a card.

## Radius Scale

Defined in `src/index.css`:
- `--radius-sm`: small controls.
- `--radius-md`: compact UI.
- `--radius-lg`: standard contained surfaces.
- `--radius-xl`: large surfaces used sparingly.
- `--radius`: compatibility alias for existing shadcn primitives.

Rules:
- Buttons and inputs should remain compact.
- Repeated project cards should use restrained radius.
- Large rounded containers are reserved for major visual surfaces, not every section.

## Shadow Usage

Defined in `src/index.css`:
- `shadow-subtle`: restrained elevation.
- `shadow-overlay`: drawers, dialogs, popovers.
- `shadow-media`: product screenshots or featured media.

Rules:
- Do not use glow as a default emphasis mechanism.
- Prefer visible borders and spatial hierarchy.
- Use overlay shadow only for actual overlays.

## Motion Rules

Foundation:
- Global `prefers-reduced-motion: reduce` support exists.
- Motion should not delay reading.
- No continuous decorative motion by default.
- Prefer short transitions for state changes and navigation feedback.

Rules:
- Keep Framer Motion where it adds meaningful route/section polish.
- Remove repeated entrance animations during homepage redesign if they make sections feel identical.
- Avoid cursor effects, heavy parallax, and animated background blobs.

## Component Rules

New primitives:
- `Container`
- `Section`
- `SectionHeader`
- `ProjectTechnologyList`
- `ProjectOutcomeList`
- `ProjectStatus`

Rules:
- Components should consume structured content where practical.
- Do not duplicate project facts inside JSX.
- Technology lists should be typographic or restrained, not dominant colorful pills.
- Use icon-only controls only when labels or accessible names are present.

## Accessibility Rules

Implemented foundation:
- Skip-to-content link.
- Global visible `:focus-visible` outline.
- Mobile nav now exposes `aria-expanded`, `aria-controls`, dialog role, and modal state.
- Reduced-motion CSS support.

Rules:
- Use native HTML semantics before ARIA.
- Every icon-only button needs an accessible name.
- Project screenshots need meaningful alt text or should be marked decorative.
- Heading order must be reviewed during the homepage redesign.
- Blog HTML must remain trusted/admin-controlled or be sanitized before broader author access.

## Patterns to Avoid

- Large rounded cards everywhere.
- Repetitive badge groups.
- Gradient headings for emphasis.
- Glowing borders as default interaction.
- Decorative icon-card grids without technical content.
- Every section fading upward on scroll.
- Placeholder screenshots in production.
- Unsupported metrics.

## Migration Notes

- Existing homepage sections still use many old utility patterns. Milestone 1 only introduced shared foundations; Milestone 2 should migrate sections incrementally.
- `PortfolioSection` now consumes typed project content from `src/content/projects.ts`.
- Existing shadcn primitives remain, but new revamp components should use the smaller layout/project primitives first.
- Existing `glass-card` remains for compatibility but now maps to a restrained border/radius treatment.

