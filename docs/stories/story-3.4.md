# Story 3.4: City/Area Pages with Local SEO

## Status: Ready for Review

## Story

**As a** visitor searching for personal training in a specific city,
**I want** to land on a dedicated city page with local information and available coaches,
**so that** I can find relevant training options in my area.

## Acceptance Criteria

1. [x] Create `src/app/areas/[slug]/page.tsx`
2. [x] `generateStaticParams()` for all active service area slugs
3. [x] `generateMetadata()` using service area's `seo_title` and `seo_description`
4. [x] Fetch via `getServiceAreaBySlug(slug)`
5. [x] Header: "PERSONAL TRAINING IN [CITY]" (uppercase)
6. [x] City content from `content` field
7. [x] Coach cards for the area (CoachCard compact)
8. [x] No in-person — show online coaches with messaging (fetch all coaches, filter is_online)
9. [x] Breadcrumb: Home > Areas > [City]
10. [x] `notFound()` for invalid slugs

## Tasks

- [x] Task 1: Create `src/app/areas/[slug]/page.tsx` with generateStaticParams and generateMetadata
- [x] Task 2: Implement breadcrumb navigation (Home > Areas > City)
- [x] Task 3: Render city content, in-person coaches with CoachCard compact
- [x] Task 4: Add fallback for no in-person coaches — fetch and show online coaches
- [x] Task 5: Return notFound() for invalid slugs

## Dev Agent Record

### Agent Model Used
Claude Opus 4.6

### Completion Notes
- Server component using `getServiceAreaBySlug(slug)` for area data with coaches
- `generateStaticParams()` pre-renders all active service area slugs at build time
- `generateMetadata()` uses `seo_title` and `seo_description` from DB with fallbacks
- Next.js 16 async params pattern: `params: Promise<Params>` with `await params`
- Breadcrumb: HOME / AREAS / [CITY] with links to / and /map
- City content rendered as paragraphs split by newline
- In-person coaches shown with CoachCard compact variant in 2-column grid
- No in-person fallback: info box + online coaches fetched via getCoaches() filtered by is_online
- "BACK TO MAP" button at bottom
- `notFound()` called when area slug doesn't exist or is inactive

### Change Log
| File | Action | Description |
|------|--------|-------------|
| src/app/areas/[slug]/page.tsx | Created | City/area page with SEO, breadcrumbs, coaches, online fallback |

### File List
- src/app/areas/[slug]/page.tsx
