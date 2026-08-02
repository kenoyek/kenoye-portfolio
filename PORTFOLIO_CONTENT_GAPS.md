# Portfolio Content Gaps

This file lists all content items that could not be completed without verified information from you.
None of these block the implementation — placeholders or graceful defaults are in place for each one.
Update each item when you have the information, then update the corresponding content file or component.

---

## HIGH PRIORITY — Update Before Launch

### 1. OG Image (PNG)

**Why it matters:** `og:image` is currently an SVG (`/og-home.svg`). LinkedIn, Twitter/X, WhatsApp, iMessage, and most Slack integrations do not render SVG open-graph images. Your site preview will appear as a blank card or show a fallback icon on all social shares.

**What to do:**

- Generate a 1200×630 PNG image for the homepage OG image.
- Place it at `/public/og-home.png`.
- Update `index.html` line with `og:image` to point to `/og-home.png`.
- Also update the `imageUrl` in `src/pages/Index.tsx` → `setPageMetadata`.

**Template content for the OG image:**

> Name: Okagua Kenoye  
> Title: Senior Full-Stack and Product Engineer  
> Domains: HealthTech · EdTech · Mobile · SaaS  
> Background: dark (use `hsl(213, 35%, 7%)`) with accent green (`hsl(152, 55%, 48%)`) highlights.

---

### 2. Résumé Link

**Current value:** `https://drive.google.com/drive/folders/18QK8VnGCzIs0w01PqOqxK0rtuXB0PCK2?usp=sharing`

**Problem:** This is a Google Drive _folder_ link, not a direct file link. Visitors click and land in a folder browser rather than downloading/viewing the CV immediately.

**What to do:**

- Upload a current PDF résumé to Google Drive (or any hosting provider).
- Get a direct shareable link (File → Share → Anyone with the link → Copy link).
- Update `siteConfig.social.resume` in `src/content/site.ts`.

---

### 3. Availability Status

**Current placeholder value:** `openToWork: true`, `availabilityNote: "Open to full-time and consulting opportunities"`, `workPreference: "Remote"`

**What to do:** Update `src/content/site.ts` with your actual status:

```ts
openToWork: true | false,
availabilityNote: "Open to full-time and consulting opportunities", // or "Not currently seeking new roles"
workPreference: "Remote", // "Remote or Lagos", "Open to relocation", etc.
```

If `openToWork` is set to `false`, the availability badge in the hero and the green indicator in the contact and footer sections will be hidden automatically.

---

## MEDIUM PRIORITY — Improve After Launch

### 4. Asele Product Screenshots

**Where it shows:** `FeaturedAsele.tsx` — the right-hand card in the flagship project section currently renders a structured text card. Real screenshots would be significantly more persuasive.

**What to do:**

- Take screenshots of the Asele app (web or mobile).
- Recommended: 2–3 mobile screen captures, or 1 desktop + 1 mobile view.
- Place images in `/public/images/asele/`.
- Update `FeaturedAsele.tsx` to render an `<img>` tag instead of the text card.

---

### 5. Testimonials / Recommendations

**Current state:** No testimonials section is implemented. The content gap is acknowledged.

**What to do:** If any of the following exist, send them through and a testimonials section can be added:

- Written LinkedIn recommendations from clients, colleagues, or students
- Email or message-based feedback from a client or founder
- Student testimonials from coding instruction work

Only genuine, verifiable testimonials should be added. Do not use invented or approximated quotes.

---

### 6. Year You Started Engineering Professionally

**Where it would be used:** The About section and the experience timeline.

**What to do:** Provide the year you began working professionally as an engineer (not the year you first learned to code, but the year you began taking on professional or client work).

This can be used to add a "X years of professional engineering experience" line to the hero or About section.

---

### 7. Kasel Digital Solutions Limited — Additional Context

**Current state:** Experience entry shows Kasel Digital Solutions Limited as "Consulting" from 2022–Present with project highlights derived from Asele, TeachEasy, and Reframe.

**What to do (optional):** If there are additional client engagements you can describe (without naming confidential clients), these can be added as additional bullets in the experience highlights. Even scope descriptions like "e-commerce platform for a Nigerian retail brand" without naming the client are useful.

---

### 8. LinkedIn Profile Status

**URL:** `https://www.linkedin.com/in/okagua/`

**What to check:**

- Is your LinkedIn headline updated to match the new positioning? ("Senior Full-Stack and Product Engineer" or similar)
- Do your featured projects on LinkedIn include Asele and TeachEasy?
- Are there any written recommendations visible to public viewers?

---

## LOW PRIORITY

### 9. Twitter/X Handle

**Current state:** No `twitter:creator` meta tag is set in `index.html`.

**What to do:** If you have a public Twitter/X account you use professionally, add `<meta name="twitter:creator" content="@yourhandle">` to `index.html`.

---

### 10. Blog Content

**Current state:** The blog section is functional (admin backend, Tiptap editor, Supabase), but the homepage does not actively promote blog content.

**What to do:** Writing and publishing 2–3 technical articles would significantly strengthen the thought-leadership signal. Good topics based on your actual work:

- "Multi-tenant LMS architecture with Supabase and RLS"
- "From React to Android: Capacitor mobile delivery in practice"
- "Designing a privacy-first wellness app: product and engineering decisions"

---

_Last updated: 2026-07-24_
