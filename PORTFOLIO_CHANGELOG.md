# Portfolio Changelog

## 2026-07-24 — Senior Portfolio Redesign (Phase 1–4)

### Summary

Full audit and redesign of kenoye.site to position Okagua Kenoye as a senior full-stack and product engineer. Changes cover content, positioning, components, navigation, SEO, and structured data.

---

### Content Data Layer

#### `src/content/projects.ts`

- Set `learneasy-academy` to `featured: false` — coding tutor role was incorrectly appearing alongside engineering case studies in the Selected Work section.

#### `src/content/capabilities.ts`

- Expanded from 4 to 7 capability groups.
- Added: Backend and data engineering, Frontend engineering, Multi-tenant SaaS design, Cloud delivery and operations.
- Enriched evidence arrays for all existing capabilities with specific, project-linked proof points.

#### `src/content/experience.ts`

- Added `type` field (`"Consulting" | "Instruction" | "Employment"`) to `ExperienceEntry`.
- Added `highlights` field (optional string array) for bullet-point delivery evidence.
- Enriched Kasel Digital Solutions Limited entry with four specific highlights linked to Asele, TeachEasy, and Reframe.
- Enriched LearnEasy Academy entry with teaching tool highlights.
- Updated period format from "2022 - Present" to "2022 – Present" (en dash).

#### `src/content/site.ts`

- Updated title to "Senior Full-Stack and Product Engineer".
- Updated meta description to be outcome-focused and specific.
- Added `openToWork: boolean` field.
- Added `availabilityNote: string` field.
- Added `workPreference: string` field.
- Added inline comments flagging content gaps for easy future updates.

---

### New Components

#### `src/components/home/ImpactBar.tsx` (NEW)

- Credibility strip rendered between hero and selected work.
- Shows 4 verified scope indicators derived from real project data.
- Addresses the 5-second seniority test failure — a recruiter can now confirm engineering scope before scrolling.

#### `src/components/home/SenioritySignals.tsx` (NEW)

- Section with 5 cards surfacing specific engineering decisions and ownership evidence.
- Each card describes a real architectural or product decision and links to the relevant case study.
- Placed between EngineeringPrinciples and HomeCapabilities in the page order.

---

### Updated Components

#### `src/components/home/HomeHero.tsx`

- Added availability badge (driven by `siteConfig.openToWork`, hidden when false).
- Upgraded label from "Software architect / Product engineer" to "Senior Full-Stack & Product Engineer".
- Added résumé CTA button as a second primary action.
- Added "Discuss an opportunity" as a third CTA.
- Added MapPin icon + work preference to location row in aside.
- Changed "View credentials" to "View résumé" throughout.
- Improved focus-visible ring on all CTAs.

#### `src/components/Navbar.tsx`

- Simplified nav from 5 to 4 items: Work / About / Writing / Contact.
- Removed "Approach" (its section is now anchored via "About" → `#about`).
- Added Résumé as a distinct bordered link in desktop nav (not a pill nav item).
- Added Résumé to the mobile drawer.
- Improved logo aria-label to "Okagua Kenoye — home".

#### `src/components/home/ProfessionalPositioning.tsx`

- Expanded from 3 paragraphs to 4.
- Added: specific engineering approach description, domain experience detail, technical philosophy (security-first, maintainability, mobile-native), teaching/communication context.
- Added conditional availability call-to-action at the bottom (visible when `openToWork: true`).

#### `src/components/home/ContactPanel.tsx`

- Renamed h2 to "Let's work on something that deserves careful engineering."
- Added availability badge (driven by `siteConfig.openToWork`).
- Added "What I'm open to" list covering all 4 target role types.
- Added email address displayed inline in the left column.
- Expanded select options: added "Full-time engineering role" and "Recruitment enquiry".
- Renamed "Project type" label to "Enquiry type".
- Added `aria-required="true"` to all required fields.
- Changed success toast to include response time estimate ("within 48 hours").
- Full-width submit button on mobile, auto-width on desktop.

#### `src/components/home/SelectedWork.tsx`

- Updated section title to "Three production systems built end to end."
- Updated description to name engineering qualities (architecture, mobile delivery, multi-tenant design, privacy-sensitive data).
- First project now gets `emphasis="featured"`, second gets `emphasis="standard"`.

#### `src/components/home/ProjectPreview.tsx`

- Added "featured" emphasis variant with 3xl/4xl title, full summary (not shortSummary), and outcome badges as pills.
- Added multi-platform display (e.g., "Web + Android + iOS") as accent-coloured metadata tag.
- Improved aria-hidden on decorative icons.

#### `src/components/home/HomeCapabilities.tsx`

- Updated section title and description.
- Changed to 3-column grid on `lg` screens (was 2-column).
- Added `mt-12` spacing above the grid.

#### `src/components/home/HomeExperience.tsx`

- Updated section title to "Ownership demonstrated through delivery."
- Added company type badge (Consulting / Instruction) per entry.
- Added highlights rendering (bullet points with delivery evidence).
- Added evidence tag pills at the bottom of each entry.

#### `src/components/home/FeaturedAsele.tsx`

- **Critical fix:** Removed "replace with verified Asele product screenshots" from the DOM and accessible name.
- Replaced `ProjectMediaPlaceholder` with a properly structured case study preview card.
- Card now shows: product category, technology stack, outcomes list, and a link to the live site.
- Content gap comment moved to code only (not rendered in the browser).
- Improved h3 to "Engineering challenge" and "Production boundary" (clearer framing).

#### `src/components/Footer.tsx`

- Added "Writing" link (was missing despite being in the navbar).
- Added Résumé link with FileText icon.
- Added availability indicator below the tagline.
- Updated description to match new "Senior full-stack and product engineer" positioning.
- Improved aria-labels on social icon links (now descriptive, not just platform name).

#### `src/pages/Index.tsx`

- Inserted `ImpactBar` between `HomeHero` and `SelectedWork`.
- Inserted `SenioritySignals` between `EngineeringPrinciples` and `HomeCapabilities`.
- Reordered sections: Hero → ImpactBar → SelectedWork → AdditionalProjects → FeaturedAsele → ProfessionalPositioning → EngineeringPrinciples → SenioritySignals → HomeCapabilities → HomeExperience → ContactPanel.
- Added section-purpose comments for maintainability.

---

### SEO and Meta

#### `index.html`

- Updated `<title>` to "Okagua Kenoye — Senior Full-Stack and Product Engineer".
- Updated `<meta name="description">` to outcome-focused copy.
- Updated all OG/Twitter titles and descriptions to match new positioning.
- Added `<meta name="theme-color">` for both dark and light mobile browser chrome.
- Added `og:locale` (`en_GB`).
- Enriched JSON-LD `Person` schema with `hasOccupation`, `worksFor`, `address`, and expanded `knowsAbout` array.
- Added JSON-LD `WebSite` schema with `SearchAction` for blog.
- Added comment flagging SVG og:image as requiring PNG replacement.

---

### Audit Documents

- `PORTFOLIO_AUDIT.md` — full audit with all findings ranked by severity.
- `PORTFOLIO_CONTENT_GAPS.md` — all content gaps with specific instructions for each.
- `PORTFOLIO_CHANGELOG.md` — this document.

---

## Known Remaining Items

See `PORTFOLIO_CONTENT_GAPS.md` for all items requiring user input.

Priority items:

1. Replace `og:image` SVG with a PNG (1200×630)
2. Update résumé link to a direct PDF
3. Confirm availability status in `src/content/site.ts`
4. Provide Asele product screenshots for `FeaturedAsele.tsx`
