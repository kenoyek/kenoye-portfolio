# Case Study Content Verification

Date: 2026-07-24

Publication statuses:

- `published`: safe factual wording is used in the case study.
- `softened`: the underlying topic is mentioned, but claims are constrained.
- `not published`: the claim is omitted until confirmation exists.

| Claim | Project | Source | Publication status | Required confirmation | Safer fallback wording |
| --- | --- | --- | --- | --- | --- |
| Asele is a women cycle and wellness platform | Asele | `src/content/projects.ts`, Milestone 2 docs | published | None | Women wellness platform |
| Asele uses React, TypeScript, Supabase, and Capacitor | Asele | `src/content/projects.ts`, audit docs | published | None | React/TypeScript product with Supabase and Capacitor delivery |
| Android production delivery completed | Asele | `src/content/projects.ts` outcome | published | Store/deployment record for future precision | Android production delivery |
| iOS deployment workflow implemented | Asele | `src/content/projects.ts` outcome | softened | External store/review status | iOS deployment workflow |
| Asele includes diagnosis, treatment, or clinical accuracy | Asele | Not verified | not published | Legal/clinical review and product evidence | Wellness tracking and assistive summaries only |
| Asele includes AI-assisted health briefs and Corti-related integration | Asele | `src/content/projects.ts`, Milestone 3 brief | softened | Exact production scope | Assistive health-context brief workflow |
| TeachEasy is a multi-tenant education platform | TeachEasy | `src/content/projects.ts` | published | None | Multi-tenant learning-management platform |
| TeachEasy uses Supabase and Postgres RLS | TeachEasy | `src/content/projects.ts`, docs/content-model.md | published | None | Supabase and RLS-backed tenancy |
| TeachEasy includes role-based admin, tutor, student, and parent portals | TeachEasy | `src/content/projects.ts` | published | None | Role-specific portals |
| TeachEasy includes Jitsi classroom workflows | TeachEasy | `src/content/projects.ts`, Milestone 3 brief | softened | Production secret and QA status | Jitsi classroom integration patterns |
| TeachEasy Stripe workflows are completed | TeachEasy | Not verified | not published | Production payment implementation | Stripe planning |
| TeachEasy recordings and analytics are completed | TeachEasy | Not verified | not published | Production implementation evidence | Recordings and analytics planning |
| Reframe is a CMS-driven news/community platform | Reframe | Existing Reframe route, `src/content/projects.ts` | published | None | CMS-driven news and community platform |
| Reframe mobile work is fully native | Reframe | Not supported by current content | not published | Native codebase evidence | Capacitor-based cross-platform mobile implementation |
| Reframe uses React, TypeScript, Next.js, and Capacitor | Reframe | Existing Reframe route, `src/content/projects.ts` | published | None | React/TypeScript/Next.js product adapted with Capacitor |
| Reframe app-store readiness work was completed | Reframe | Existing Reframe route, `src/content/projects.ts` | softened | External store records | Store-readiness and release workflow work |
| Reframe has verified screenshots | Reframe | No assets in repository | not published | Sanitized screenshots | Media requirements documented |

No API keys, environment variables, internal URLs, user data, database credentials, private client information, private health information, or support credentials were added.

