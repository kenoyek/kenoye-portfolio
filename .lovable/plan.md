

# Premium Senior-Level Portfolio Redesign

A focused redesign that transforms the current portfolio into a calm, confident, product-grade experience inspired by Stripe / Linear / Vercel — while preserving everything that already works (blog, admin, contact form, Supabase backend).

## Design System Refresh

**Typography & spacing**
- Switch heading font from Space Grotesk to **Inter** (single-family system with Inter for both headings and body, tighter tracking on display sizes — closer to Linear/Vercel)
- Introduce display sizes: `text-5xl/tight` → `text-7xl/tight` for hero, `text-3xl/tight` for section titles
- Strict 8px spacing scale, max content width capped at **1120px** (`max-w-[1120px]`)

**Color & mode**
- Refine palette: keep deep navy + emerald, but lower saturation for a calmer feel
- Add **light/dark mode toggle** with system-preference auto-detection (using `class` strategy already enabled in Tailwind)
- New CSS variables for `--surface`, `--surface-elevated`, `--border-subtle`

**Micro-interactions**
- Hover elevation tokens (`hover:-translate-y-0.5`, soft shadow)
- Scroll-reveal via existing Framer Motion (already in use)
- Subtle animated grid/dot background in hero (no flash)

## Section-by-Section Changes

### 1. Hero — `HeroSection.tsx`
- New headline: **"I build scalable systems, train future engineers, and ship products that matter."**
- Subhead: short problem-statement sentence
- 2 primary CTAs only: `View My Work` · `Let's Talk` (cleaner than current 4)
- **Credibility strip** below CTAs: `20+ Projects · 500+ Students Taught · React · TypeScript · Python`
- Replace photo background overlay with subtle animated grid + soft gradient
- Optional small "terminal" code chip on the right (desktop only) showing a 3-line snippet

### 2. Navigation — `Navbar.tsx`
- Restructure to: **Work · Case Studies · About · Teaching · Contact** (keep Blog)
- Refine to a thin pill-style nav with backdrop blur
- Keep route-aware hash logic that already works

### 3. Work / Projects — `PortfolioSection.tsx`
- Convert to **case-study cards** with structured fields: Problem · Solution · Stack · Role · Impact
- Add **filter chips**: All · Frontend · Fullstack · EdTech · AI
- Click card → opens **Dialog modal** with full case study (uses existing `dialog` shadcn component)
- Replace gradient blocks with cleaner monochrome covers + tech-badge row
- Hover: lift + border-accent transition

### 4. Featured Case Study — **NEW** `FeaturedCaseStudy.tsx`
- Highlight **TogaCode** (LMS) as senior signal
- Sections: Problem breakdown · Architecture (ASCII/SVG diagram) · Key decisions · Trade-offs · Outcome
- Two-column layout: narrative left, architecture diagram right

### 5. About — `AboutSection.tsx`
- Rewrite to confident, concise narrative (no "passionate developer" language)
- Add **milestone timeline** (vertical, 4–5 entries: started coding → first client → tutoring program → 500 students → today)
- Remove three-card skill grid (skills move to dedicated section)

### 6. Teaching & Impact — `TutoringSection.tsx` → rename concept to **Teaching & Impact**
- Reframe as differentiator, not a service pitch
- Keep curriculum cards but add **student outcomes** strip (e.g., "92% complete capstone", "30+ kids coding independently")
- Short paragraph: *Why teaching sharpens engineering thinking*

### 7. Skills — **NEW** `SkillsSection.tsx`
- Categories: **Frontend · Backend · Data/AI · Tools**
- Each skill labeled `Advanced` / `Proficient` / `Familiar` (color-coded pill)
- Core stack (React, TypeScript, Python, Supabase) highlighted with accent border

### 8. Experience — **NEW** `ExperienceSection.tsx`
- Vertical timeline: role · org · dates · 2–3 measurable bullets
- Focus on outcomes ("Shipped X serving Y users") not duties

### 9. Final CTA — **NEW** `FinalCTA.tsx`
- Full-width band before footer
- Headline: *"I build scalable systems, teach the next generation, and solve real-world problems."*
- Buttons: `Work With Me` · `Download Resume`
- Inline contact links: Email · GitHub · LinkedIn

### 10. Remove
- `TestimonialsSection` — moved out of homepage flow (feels less senior); can return later if requested
- `StatsSection` as standalone — folded into Hero credibility strip and About metrics

### 11. Theme toggle — **NEW** `ThemeToggle.tsx`
- Sun/Moon icon in navbar
- Stores choice in `localStorage`, defaults to `prefers-color-scheme`
- Toggles `dark` class on `<html>`

## Files

**New**
- `src/components/FeaturedCaseStudy.tsx`
- `src/components/SkillsSection.tsx`
- `src/components/ExperienceSection.tsx`
- `src/components/FinalCTA.tsx`
- `src/components/ThemeToggle.tsx`
- `src/hooks/use-theme.tsx`

**Modified**
- `src/pages/Index.tsx` — new section order, remove Stats/Testimonials standalones
- `src/components/HeroSection.tsx` — new headline, 2 CTAs, credibility strip, grid bg
- `src/components/Navbar.tsx` — new labels, theme toggle, refined styling
- `src/components/AboutSection.tsx` — narrative + milestone timeline
- `src/components/PortfolioSection.tsx` — case-study cards + filters + modal
- `src/components/TutoringSection.tsx` — repositioned as Teaching & Impact
- `src/components/ContactSection.tsx` — minor polish to match new system
- `src/components/Footer.tsx` — updated links to match new sections
- `src/index.css` — Inter font, new tokens, refined utilities, dark mode polish
- `tailwind.config.ts` — Inter font family, max-width tokens

## New Index.tsx flow
```text
Navbar → Hero → About (with timeline) → Work (filters + modals)
  → Featured Case Study → Skills → Experience → Teaching & Impact
  → Contact → Final CTA → Footer
```

## Notes
- All existing backend (Supabase contact form, blog, admin, comments/likes, sitemap) untouched
- Performance: Framer Motion already in use; animations stay lightweight (transform/opacity only)
- Mobile: every new section designed mobile-first, tap targets ≥44px

