# Portfolio redesign

## Audit and direction

Vite 8, React 18, TypeScript, Tailwind and Motion remain in place. Existing routes include the homepage, blog, three data-driven case studies, and protected blog administration. Vercel routing, Supabase integrations and all project records are retained. Existing WebP screenshots provide authentic product evidence; no portrait, FarmStead material or testimonials are available. The agriculture dashboard remains in secondary work.

The previous homepage repeats small bordered layouts and gives tall screenshots more space than the narrative. Navigation has Escape dismissal but lacks modal focus containment. Theme initialization happens after paint. Entrance animations use transforms even with reduced motion. Existing SEO and prerendering are useful foundations.

Direction: an editorial engineering portfolio with deep ink surfaces, ivory type, antique gold detail, a serif counterpoint, generous alignment, and prominent real product screens. Light mode uses warm paper and dark ink. Product views provide keyboard-accessible exploration without pretending public marketing screenshots are authenticated dashboards.

## Implementation sequence

1. Establish shared tokens, typography, theme initialization and accessible navigation.
2. Recompose the hero and homepage around product delivery and selected work.
3. Add reusable, data-driven product feature tabs to homepage and case studies.
4. Refine About, expertise, experience and direct-email conversion while retaining secondary projects.
5. Validate both themes, mobile navigation, tabs, all routes and responsive layouts; measure a production build with Lighthouse.

## Content boundaries

Use repository project and experience content. TeachEasy assets show the public product site, feature overview and role overview, not private academy dashboards. Reframe store preparation is not represented as a completed store release. No new metrics, employers, testimonials or project claims. Direct email is the primary contact mechanism because delivery of the existing Edge Function cannot be verified. Supabase functions and admin functionality remain intact.

Production deployment and network configuration are unchanged. The requested external reference at asele.tech returned a proxy policy denial; existing approved Asele images and the supplied art direction informed the implementation.

## Delivered design and components

- Rebuilt `HomeHero` around an editorial three-line statement and real Asele screens, with short entrance motion and responsive phone framing.
- Replaced the repeated project list with three full-width editorial showcases. `ProjectFeatureTabs` uses Radix keyboard navigation, visible controls, scrollable mobile tab lists and genuine product images. `projectExperiences.ts` keeps view copy and media separate from presentation.
- Added the same product exploration to existing case studies, retaining all architecture, decisions, responsibilities, outcomes and galleries.
- Rebuilt expertise as native expandable capability rows; reshaped About with a typographic monogram rather than a fabricated portrait. Retained experience, teaching, engineering principles and every secondary project.
- Rebuilt shared navigation with a Radix modal for focus trapping, Escape dismissal and focus restoration. Added SPA anchor and route scroll handling.
- Designed ink-blue dark and warm-paper light themes. Theme initialization happens before rendering; explicit preference persists, and otherwise the system setting is followed. Self-hosted licensed Inter removes external font requests.
- Replaced the unverified public contact form with working mail links and existing professional profiles. The existing Supabase Edge Function remains unchanged. No message delivery claim or fake success state is presented.
- Updated homepage metadata consistently in static HTML, runtime metadata and production prerendering. Routes, canonical URLs, structured data and sitemap generation remain intact.
- Styled writing and missing-page experiences. The writing page now distinguishes an empty article list from a backend error and provides retry.
- Kept administrator authentication behind its existing guard and made that code lazy-loaded so visitors do not download Supabase administration code on the homepage.

## Validation

The production build, ESLint, TypeScript project check and all 16 existing tests (4 files) pass. `git diff --check` passes.

Browser verification uses installed Chromium, Node 24's WebSocket and the Chrome DevTools Protocol without new packages. Reproduce with:

```bash
npm run build
npm run preview -- --host 127.0.0.1 --port 4173 --strictPort
# In a second terminal:
QA_BASE_URL=http://127.0.0.1:4173 node scripts/verify-portfolio.mjs
```

The runner checks 360, 390, 430, 768, 1024, 1440 and 1920px in both themes; heading count, loaded images and horizontal overflow; mobile menu focus containment, Escape and focus restoration; mobile navigation; keyboard product tabs; persisted theme choice; and existing public, login and missing-page routes. It captures homepage and section screenshots. A separate measurement of every product view found identical showcase heights within each product at 390 and 1440px.

Screenshots and browser results are in `/tmp/kenoye-redesign-qa`. Reviewed desktop and mobile captures include both heroes, product views, expertise, About, contact and case-study headers. The final run passed 90 browser assertions, including identical heights across all product views at 390 and 1440px, both-theme route checks, and zero uncaught browser exceptions. Details are recorded in `results.json`.

### Measured mobile Lighthouse results

Lighthouse 13.4.1 against the local production preview, 6 November 2026. Simulated mobile: 412×823, 4× CPU slowdown, 150ms RTT and approximately 1.6Mbps throughput. This is a local lab measurement, not production field data.

| Category       | Score |
| -------------- | ----: |
| Performance    |    93 |
| Accessibility  |   100 |
| Best practices |   100 |
| SEO            |   100 |

FCP: 2.1s. LCP: 2.8s. Total blocking time: 80ms. CLS: 0. The 2.5s LCP target is not yet met in this simulated run. INP requires interaction/field measurement and is not established by these results. A Lighthouse accessibility score does not constitute a full WCAG conformance audit.

Initial results were 89/97/100/100; improving contrast, removing the headline opacity reveal and changing the initial loading path produced the scores above. Reports: `/tmp/kenoye-lighthouse-mobile-final.report.html` and `.json`.

## Files changed

| Files                                                                                         | Purpose                                                                                  |
| --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `src/index.css`                                                                               | Shared design tokens, typography, layouts, product frames, motion and responsive styling |
| `src/components/Navbar.tsx`, `Footer.tsx`                                                     | Accessible navigation and consistent footer contrast                                     |
| `src/components/home/HomeHero.tsx`, `SelectedWork.tsx`                                        | Product-led homepage and flagship work                                                   |
| `src/components/home/HomeCapabilities.tsx`, `ProfessionalPositioning.tsx`, `ContactPanel.tsx` | Expertise, About and direct contact                                                      |
| `src/components/projects/ProjectFeatureTabs.tsx` (new)                                        | Reusable accessible product exploration                                                  |
| `src/content/projectExperiences.ts` (new)                                                     | Verified view copy and screenshot references                                             |
| `src/components/case-study/CaseStudyLayout.tsx`                                               | Integrates product exploration into existing case studies                                |
| `src/App.tsx`, `src/pages/Index.tsx`                                                          | Reduced motion, route/anchor scrolling, lazy admin code and homepage composition         |
| `src/hooks/use-theme.tsx`                                                                     | Safe persistent theme preferences and system changes                                     |
| `src/pages/Blog.tsx`, `NotFound.tsx`                                                          | Writing/error presentation and backend retry state                                       |
| `src/content/site.ts`, `index.html`, `scripts/public-route-metadata.mjs`                      | Positioning, SEO, first-paint theme and font loading                                     |
| `public/fonts/inter-latin-variable.woff2`, `INTER-LICENSE.txt` (new)                          | Self-hosted Inter and license                                                            |
| `scripts/verify-portfolio.mjs` (new)                                                          | Repeatable browser regression and screenshots                                            |
| `docs/REDESIGN.md` (new)                                                                      | Audit, implementation decisions and delivery evidence                                    |

## Remaining limitations and release

- No deployment was performed; deployment configuration and lockfiles are unchanged. The generated `dist/` is ready for deployment review, subject to the limitations below.
- Supabase article data, authenticated admin operations and contact email delivery were not verified against the remote service. The browser checks verify page rendering and public interactions, not backend authorization. Direct email is the public contact path.
- External product, profile and résumé URLs were preserved from the repository; their current remote responses could not all be verified under the environment's restricted networking. Internal navigation and existing routes were tested.
- The requested external reference at `asele.tech` was blocked by network policy. No allowlist or production configuration was changed.
- No authentic portrait, FarmStead project material, testimonials or additional private dashboard screenshots were available. None were invented. TeachEasy previews explicitly identify the public website imagery; implemented engineering capabilities remain grounded in repository content.
- Existing long-form case-study records, project facts, secondary work and Supabase server code are preserved. Private-source links were not added.
