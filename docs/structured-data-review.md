# Structured Data Review

Date: 2026-07-24

## Homepage

Location: `index.html`

Types:

- `Person`
- `WebSite`

Status: valid conservative schema. No fabricated ratings, offers, awards, employment relationships, user counts, or medical claims.

## Case Studies

Location: `src/components/case-study/CaseStudySeo.tsx`

Types:

- `WebPage`
- `CreativeWork`
- `BreadcrumbList`

Status: conservative and route-specific. The case-study schema uses canonical URLs from `src/content/caseStudies.ts`.

## Blog Posts

Location: `src/pages/BlogPost.tsx`

Type:

- `BlogPosting`

Status: generated from published Supabase blog post data. Uses post title, excerpt, slug, image, dates, author, and publisher.

## Notes

- Static route snapshots include homepage Person/WebSite JSON-LD. Client-side route hydration adds route-specific case-study or blog JSON-LD where applicable.
- Product schema is intentionally not used.
- SoftwareApplication schema is not used because the public case studies do not provide enough verified app-store/product metadata.

