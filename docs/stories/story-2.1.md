# Story 2.1: Coach Profile Page — Layout, Hero & Content

## Status: Ready for Review

## Story

**As a** visitor,
**I want** to view a coach's profile page with their photo, name, specialty, location, bio, approach, and credentials,
**so that** I can evaluate whether this coach is a good fit for my goals.

## Acceptance Criteria

1. Create `src/app/coaches/[slug]/page.tsx` as a server component using `getCoachWithRelations(slug)`
2. Implement `generateStaticParams()` to pre-render all active coach slugs
3. Implement `generateMetadata()` with coach-specific SEO title and description
4. Hero section: coach photo (or navy placeholder with initials), name, specialty tagline, location badge
5. About section: coach bio in paragraphs
6. Approach section: coach approach text with brutalist section header
7. Credentials section: certifications as `Tag` components
8. Specialties as `Tag` components (filled variant)
9. Return `notFound()` if coach slug doesn't exist or is inactive
10. Fully responsive — photo stacks above name on mobile

## Tasks

- [x] Task 1: Create `src/app/coaches/[slug]/page.tsx`
- [x] Task 2: Verify types and lint pass — tsc clean, eslint clean

## Dev Agent Record

### Agent Model Used
Claude Opus 4.6

### Completion Notes
- Server component using `getCoachWithRelations(slug)` for full data including tiers, testimonials, areas
- `generateStaticParams()` pre-renders all active coach slugs at build time
- `generateMetadata()` generates coach-specific SEO title and description
- Hero: navy placeholder with initials when no photo_url, Next.js `<Image>` when photo exists
- Online/in-person badges as Tag accent/filled variants
- Specialties as filled Tags, certifications as default Tags
- Bio and approach split by newlines into paragraphs
- Returns `notFound()` for missing/inactive coaches
- Added `id` prop to Container component to support section anchoring
- Responsive: photo stacks above name on mobile via flex-col/flex-row

### Change Log
| File | Action | Description |
|------|--------|-------------|
| src/app/coaches/[slug]/page.tsx | Created | Coach profile with hero, about, approach, credentials |
| src/components/layout/Container.tsx | Modified | Added `id` prop for section anchoring |

### File List
- src/app/coaches/[slug]/page.tsx
- src/components/layout/Container.tsx
