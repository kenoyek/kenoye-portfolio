# Structured Data Review

Date: 2026-07-24

## Homepage

Location: `index.html`

Types:

- `Person`
- `WebSite`

Status: valid conservative schema. No fabricated ratings, offers, awards, employment relationships, user counts, or medical claims.

## Case Studies

Locations:

- `src/components/case-study/CaseStudySeo.tsx`
- `scripts/prerender-public-routes.mjs`

Types:

- `WebPage`
- `CreativeWork`
- `BreadcrumbList`

Status: conservative and route-specific. Static route snapshots now include crawler-visible case-study JSON-LD before client hydration, and runtime route navigation updates the same schema through the shared SEO helper.

## Blog Posts

Location: `src/pages/BlogPost.tsx`

Type:

- `BlogPosting`

Status: generated from published Supabase blog post data. Uses post title, excerpt, slug, image, dates, author, and publisher.

## Blog Index

Locations:

- `src/pages/Blog.tsx`
- `scripts/prerender-public-routes.mjs`

Type:

- `CollectionPage`
- `BreadcrumbList`

Status: static route snapshots and runtime navigation identify the blog index as a collection page without fabricating article counts or publishing metrics.

## Notes

- Static route snapshots include homepage Person/WebSite JSON-LD. Public project and blog index snapshots also include route-specific JSON-LD under `route-jsonld`.
- Runtime metadata is centralized in `src/lib/seo.ts` so SPA navigation updates titles, descriptions, canonicals, Open Graph, Twitter, robots, and route JSON-LD consistently.
- Product schema is intentionally not used.
- SoftwareApplication schema is not used because the public case studies do not provide enough verified app-store/product metadata.
