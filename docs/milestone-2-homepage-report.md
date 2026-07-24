# Milestone 2 Homepage Redesign Report

Date: 2026-07-24

## Branch

`feature/homepage-editorial-redesign`

## Previous Homepage Structure

Before Milestone 2, `src/pages/Index.tsx` rendered:

1. `Navbar`
2. `HeroSection`
3. `AboutSection`
4. `PortfolioSection`
5. `FeaturedCaseStudy`
6. `SkillsSection`
7. `ExperienceSection`
8. `TutoringSection`
9. `ContactSection`
10. `FinalCTA`
11. `Footer`
12. `BackToTop`

That structure was broad but template-like: repeated card grids, repeated scroll animations, broad service framing, and project content split across components.

## Implemented Homepage Structure

1. Header and navigation
2. `HomeHero`
3. `SelectedWork`
4. `FeaturedAsele`
5. `ProfessionalPositioning`
6. `HomeCapabilities`
7. `HomeExperience`
8. `EngineeringPrinciples`
9. `ContactPanel`
10. `Footer`
11. `BackToTop`

Writing was intentionally omitted from the homepage because the repository does not contain enough confirmed, publishable blog content to feature. The blog route remains available from navigation.

## Components Added

- `src/components/home/HomeHero.tsx`
- `src/components/home/SelectedWork.tsx`
- `src/components/home/FeaturedAsele.tsx`
- `src/components/home/ProjectPreview.tsx`
- `src/components/home/ProjectEvidence.tsx`
- `src/components/home/ProjectMediaPlaceholder.tsx`
- `src/components/home/ProfessionalPositioning.tsx`
- `src/components/home/HomeCapabilities.tsx`
- `src/components/home/HomeExperience.tsx`
- `src/components/home/EngineeringPrinciples.tsx`
- `src/components/home/ContactPanel.tsx`

## Components Retired

Removed confirmed-unused old homepage components:

- `AboutSection`
- `ContactSection`
- `ExperienceSection`
- `FeaturedCaseStudy`
- `FinalCTA`
- `HeroSection`
- `PortfolioSection`
- `ServicesSection`
- `SkillsSection`
- `StatsSection`
- `TestimonialsSection`
- `TutoringSection`
- `NavLink`

Removed unused asset:

- `src/assets/hero-bg.jpg`

## Content Changes

- Homepage now uses typed project content from `src/content/projects.ts`.
- Asele is the flagship project.
- TeachEasy, Reframe, and LearnEasy Academy follow the approved hierarchy.
- No public numeric metrics were introduced.
- Asele language avoids diagnosis, clinical approval, and regulatory claims.
- Reframe language uses Capacitor/cross-platform/native integration wording rather than overstating native implementation.

## Visual System Applied

- Editorial layout with stronger typographic hierarchy.
- Reduced card-grid repetition.
- Restrained borders and shadows.
- Fewer badges and technology pills.
- No decorative terminal window, animated blobs, typewriter effects, or fake app screenshots.
- Project placeholder media is intentionally neutral and documented for replacement.

## Accessibility Notes

- Maintains skip link and focus states from Milestone 1.
- Header keeps mobile `aria-expanded`, `aria-controls`, and dialog semantics.
- Homepage has one clear H1.
- Contact form labels remain explicit.
- External links use `rel="noopener noreferrer"`.
- Reduced-motion support remains global.

## Performance Notes

- Admin/blog route splitting from Milestone 1 is preserved.
- Old homepage sections and unused hero image were removed.
- New homepage components avoid additional large libraries.

## Known Limitations

- No real product screenshots are available in the repo.
- Lighthouse/browser responsive testing was not available in this environment.
- Blog homepage preview was omitted until real published technical/product writing exists.
- Detailed case-study routes for Asele and TeachEasy are intentionally deferred to Milestone 3.

