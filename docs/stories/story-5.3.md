# Story 5.3: SEO Infrastructure

## Status: Ready for Review

## Story

**As a** site owner,
**I want** comprehensive SEO across every page,
**so that** search engines properly index and rank all content.

## Acceptance Criteria

1. Create `src/app/sitemap.ts` — static pages, coach profiles, city pages, blog posts
2. Create `src/app/robots.ts` — allow all, reference sitemap, disallow `/api/`
3. Create `JsonLd.tsx` — renders structured data in `<head>`
4. All pages have unique `<title>` and `<meta description>`

## Tasks

- [x] Task 1: Create sitemap.ts
- [x] Task 2: Create robots.ts
- [x] Task 3: Create JsonLd component
- [x] Task 4: Verify types and lint pass

## Dev Agent Record

### Agent Model Used
Claude Opus 4.6

### Completion Notes
- Sitemap dynamically generates URLs for all coaches, areas, blog posts + static pages
- Robots.ts allows all crawlers, disallows /api/, references sitemap.xml
- JsonLd component renders script type="application/ld+json" with dangerouslySetInnerHTML

### Change Log
| File | Action | Description |
|------|--------|-------------|
| src/app/sitemap.ts | Created | Dynamic sitemap with all page types |
| src/app/robots.ts | Created | Robots.txt configuration |
| src/components/seo/JsonLd.tsx | Created | JSON-LD structured data component |

### File List
- src/app/sitemap.ts
- src/app/robots.ts
- src/components/seo/JsonLd.tsx
