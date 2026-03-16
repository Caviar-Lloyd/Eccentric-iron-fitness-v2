# Story 5.1: Blog Landing Page & Components

## Status: Ready for Review

## Story

**As a** visitor,
**I want** to browse fitness and nutrition articles by category,
**so that** I can find educational content relevant to my goals.

## Acceptance Criteria

1. Create `src/app/blog/page.tsx` with `generateMetadata()`
2. Create `BlogCard.tsx` — image/placeholder, title, date, read time, category tag, excerpt
3. Create `CategoryFilter.tsx` as `"use client"` — scrollable tag bar
4. Category filter updates URL params, filters client-side
5. Featured post: first/newest with larger layout
6. Grid: 2-column desktop, 1-column mobile
7. "LOAD MORE" button (not infinite scroll)
8. Cards link to `/blog/[slug]`
9. Empty state: "CONTENT COMING SOON"

## Tasks

- [x] Task 1: Create BlogCard and CategoryFilter components
- [x] Task 2: Create blog landing page
- [x] Task 3: Verify types and lint pass

## Dev Agent Record

### Agent Model Used
Claude Opus 4.6

### Completion Notes
- BlogCard: category tag, title, date, read time, excerpt, "READ MORE →"
- Featured post gets larger image area and full-width (md:col-span-2)
- CategoryFilter is 'use client' — updates URL search params via router.push
- ARIA tablist/tab pattern on category buttons
- Pagination via LOAD MORE link with page param
- Empty state: "CONTENT COMING SOON" in monospace

### Change Log
| File | Action | Description |
|------|--------|-------------|
| src/components/blog/BlogCard.tsx | Created | Blog post card with placeholder, metadata, excerpt |
| src/components/blog/CategoryFilter.tsx | Created | Category filter with URL params |
| src/app/blog/page.tsx | Created | Blog landing with pagination, filtering, empty state |

### File List
- src/components/blog/BlogCard.tsx
- src/components/blog/CategoryFilter.tsx
- src/app/blog/page.tsx
