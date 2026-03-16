# Story 1.2: Data Access Layer

## Status: Ready for Review

## Story

**As a** developer,
**I want** a centralized data access layer for all Supabase queries,
**so that** no component ever calls Supabase directly and all queries are type-safe and reusable.

## Acceptance Criteria

1. Create `src/lib/db/coaches.ts` with: `getCoaches()`, `getCoachBySlug(slug)`, `getCoachWithRelations(slug)`
2. Create `src/lib/db/areas.ts` with: `getServiceAreas()`, `getServiceAreaBySlug(slug)`, `getCoachesByArea(areaId)`
3. Create `src/lib/db/testimonials.ts` with: `getFeaturedTestimonials()`, `getTestimonialsByCoach(coachId)`
4. Create `src/lib/db/blog.ts` with: `getBlogPosts(options?)`, `getBlogPostBySlug(slug)`
5. Create `src/lib/db/leads.ts` with: `createLead(data)`, `getLeadByEmail(email)`
6. All functions use the server-side Supabase client from `src/lib/supabase.ts`
7. All functions return typed results using interfaces from `src/lib/types.ts`
8. All functions handle errors gracefully — return `null` or empty array, never throw

## Tasks

- [x] Task 1: Create `src/lib/db/coaches.ts`
- [x] Task 2: Create `src/lib/db/areas.ts`
- [x] Task 3: Create `src/lib/db/testimonials.ts`
- [x] Task 4: Create `src/lib/db/blog.ts`
- [x] Task 5: Create `src/lib/db/leads.ts`
- [x] Task 6: Verify types and lint pass — tsc clean, eslint clean

## Dev Agent Record

### Agent Model Used
Claude Opus 4.6

### Completion Notes
- All DAL functions use server-side Supabase client (service_role key)
- `getCoachWithRelations` fetches tiers, testimonials, and service areas via parallel Promise.all
- `createLead` handles upsert logic — updates existing lead if email exists, inserts new otherwise
- `getBlogPosts` supports pagination via limit/offset and category filtering, returns total count
- `getFeaturedTestimonials` uses Supabase join syntax `coach:coaches(*)` to include coach data
- Removed unused `Coach` import from blog.ts to fix lint warning

### Change Log
| File | Action | Description |
|------|--------|-------------|
| src/lib/db/coaches.ts | Created | getCoaches, getCoachBySlug, getCoachWithRelations |
| src/lib/db/areas.ts | Created | getServiceAreas, getServiceAreaBySlug, getCoachesByArea |
| src/lib/db/testimonials.ts | Created | getFeaturedTestimonials, getTestimonialsByCoach |
| src/lib/db/blog.ts | Created | getBlogPosts, getBlogPostBySlug |
| src/lib/db/leads.ts | Created | createLead, getLeadByEmail |

### File List
- src/lib/db/coaches.ts
- src/lib/db/areas.ts
- src/lib/db/testimonials.ts
- src/lib/db/blog.ts
- src/lib/db/leads.ts
