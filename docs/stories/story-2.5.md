# Story 2.5: Coach Directory Page

## Status: Ready for Review

## Story

**As a** visitor,
**I want** to browse all available coaches in one place,
**so that** I can compare coaches and find one that matches my goals and location.

## Acceptance Criteria

1. Create `src/app/coaches/page.tsx` fetching all active coaches with service areas and starting price
2. `generateMetadata()` for SEO
3. Page header: "OUR COACHES" in brutalist H1
4. `CoachCard` compact variant: photo/placeholder, name, specialty, location(s), "FROM $X", "VIEW PROFILE →"
5. Responsive grid: 2-column desktop, 1-column mobile
6. Each card links to `/coaches/[slug]`
7. Empty state fallback
8. Online/in-person badges on cards
9. First coach uses `featured` variant

## Tasks

- [x] Task 1: Create `src/components/coach/CoachCard.tsx`
- [x] Task 2: Create `src/app/coaches/page.tsx`
- [x] Task 3: Verify types and lint pass — tsc clean, eslint clean

## Dev Agent Record

### Agent Model Used
Claude Opus 4.6

### Completion Notes
- CoachCard has 3 variants: featured (horizontal layout with bio), compact (vertical), minimal (name + specialty)
- Featured variant: `md:flex-row` for horizontal photo + details layout
- Starting prices fetched from service_tiers, ordered by price_cents ascending, first per coach_id used
- Empty state shows "No coaches available" message
- First coach renders with 'featured' variant, rest with 'compact'
- Online/in-person badges via Tag accent/filled variants
- "FROM $X" pricing and "VIEW PROFILE →" on every card
- Next.js Image component used for coach photos (avoids ESLint no-img-element warning)

### Change Log
| File | Action | Description |
|------|--------|-------------|
| src/components/coach/CoachCard.tsx | Created | 3 variants: featured, compact, minimal with pricing |
| src/app/coaches/page.tsx | Created | Coach directory with grid layout, starting prices, empty state |

### File List
- src/components/coach/CoachCard.tsx
- src/app/coaches/page.tsx
