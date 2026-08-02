# Portfolio Project Restoration Audit

Date: 2026-07-24
Branch: `fix/restore-portfolio-projects`

## Summary

The pre-redesign homepage project inventory was recovered from `origin/main:src/components/PortfolioSection.tsx` and cross-checked against current typed content, routes, public assets, and available live URLs.

The current editorial hierarchy is preserved:

1. Asele
2. TeachEasy LMS
3. Reframe Mobile App
4. LearnEasy Academy

Seven secondary projects were restored into `src/content/projects.ts` and surfaced in a compact homepage section named "More engineering work."

## Prior Inventory

| Project                     | Previous route           | Previous description                                                                            | Technologies                                                                                              | Live link                                    | Repository link                                                                        | Screenshot or asset                                                 | Current status | Exists in repository         | Visible before restoration | Visible after restoration |
| --------------------------- | ------------------------ | ----------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | -------------------------------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------- | -------------- | ---------------------------- | -------------------------- | ------------------------- |
| Reframe Mobile App          | `/projects/reframe`      | CMS-driven web platform adapted into iOS and Android apps without duplicating the codebase.     | React, TypeScript, Next.js, Capacitor                                                                     | None in old card                             | None in old card                                                                       | No real screenshots in old route; current public web captures exist | Case study     | Yes, shared case-study route | Yes                        | Yes                       |
| Asele                       | Homepage modal/card only | Private cycle and wellness tracking product.                                                    | Old data said Flutter, Firebase, Dart; current verified model uses React, TypeScript, Supabase, Capacitor | `https://www.asele.health`                   | Private/none public                                                                    | Current public website captures exist                               | Case study     | Yes                          | Yes                        | Yes                       |
| TeachEasy LMS               | Homepage modal/card only | LMS for educators, classes, assignments, progress, and role-based dashboards.                   | React, TypeScript, Supabase                                                                               | `https://teacheasylms.com/`                  | None public verified                                                                   | Current public website captures exist                               | Case study     | Yes                          | Yes                        | Yes                       |
| TogaCode LMS                | Homepage modal/card only | LMS for coding tutors with classes, courses, invite-code enrollment, and live coding workflows. | React, TypeScript, Supabase                                                                               | `https://code-buddy-lms.vercel.app/`         | None public verified                                                                   | No asset found                                                      | Live           | Yes, typed content restored  | No                         | Yes                       |
| 1Vet Online Pet Store       | Homepage modal/card only | Pet-supplies storefront with catalog, cart, checkout, and inventory tooling.                    | React, Supabase, Tailwind                                                                                 | `https://1vet.store`                         | `ONEVET-MAIN` exists in owner GitHub account but is private; no public repo link added | No asset found                                                      | Live           | Yes, typed content restored  | No                         | Yes                       |
| Python Playground           | Homepage modal/card only | Beginner-friendly browser Python editor with live output and learning feedback.                 | React, TypeScript, Tailwind                                                                               | `https://python-playground-pals.vercel.app/` | None public verified                                                                   | No asset found                                                      | Experimental   | Yes, typed content restored  | No                         | Yes                       |
| CodeQuest Adventures        | Homepage modal/card only | Gamified coding-practice experience with progress loops and structured challenges.              | React, TypeScript, Tailwind                                                                               | `https://codequest-adventures.vercel.app/`   | None public verified                                                                   | No asset found                                                      | Experimental   | Yes, typed content restored  | No                         | Yes                       |
| Block-to-Code Bridge        | Homepage modal/card only | Visual-to-text programming bridge for learners moving from blocks to code.                      | React, TypeScript, Tailwind                                                                               | `https://block-to-code-bridge.vercel.app/`   | None public verified                                                                   | No asset found                                                      | Experimental   | Yes, typed content restored  | No                         | Yes                       |
| Queeneth Uti Portfolio      | Homepage modal/card only | Professional portfolio for a community-management profile and event experience.                 | React, TypeScript, Tailwind                                                                               | `https://queeneth-portfolio.vercel.app/`     | None public verified                                                                   | No asset found                                                      | Live           | Yes, typed content restored  | No                         | Yes                       |
| Agricultural Data Dashboard | Homepage modal/card only | Crop-yield and market-pricing dashboard with ingestion and chart-based reporting.               | Python, Flask, Chart.js                                                                                   | None in old card                             | None public verified                                                                   | No asset found                                                      | Private        | Yes, typed content restored  | No                         | Yes                       |

## Verification Notes

- Live URL checks returned HTTP `200` for TogaCode, 1Vet, Python Playground, CodeQuest Adventures, Block-to-Code Bridge, and Queeneth Uti Portfolio.
- The owner GitHub repo list shows `ONEVET-MAIN` exists but is private. No private repository URLs are displayed in the portfolio.
- Guessed public GitHub URLs for the restored Vercel projects returned `404`, so repository links were not added.
- No screenshots or image assets for the restored secondary projects were found in `public/` or git history.
- The earlier Agricultural Data Dashboard impact metric was not restored because it was not verifiable from local evidence.

## Implementation Decision

The restored projects are secondary work, not case studies. They are visible from the homepage, use the same typed project model as the flagship projects, and link only to verified public live URLs where available.

No detailed case-study routes were created for these projects because the repository does not contain approved case-study narratives or assets for them.
