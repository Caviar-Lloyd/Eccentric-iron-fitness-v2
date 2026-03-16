# Story 2.3: Testimonials Section

## Status: Ready for Review

## Story

**As a** visitor,
**I want** to read testimonials from a coach's clients,
**so that** I can see real results and build trust before committing.

## Acceptance Criteria

1. Create `src/components/coach/TestimonialCard.tsx` with 3 variants (full, compact, placeholder)
2. Full: quote in Inter italic, client name + location in monospace uppercase, decorative `"`, 3px cyan left border
3. Compact: short quote with name only
4. Placeholder: dashed 2px border with "TESTIMONIAL COMING SOON"
5. Testimonials section on coach profile between approach and pricing
6. Fetch via `getTestimonialsByCoach(coachId)`, sorted by `sort_order`
7. Zero testimonials → show 1 placeholder card
8. Featured testimonials render first/larger
9. Mobile: stack vertically

## Tasks

- [x] Task 1: Create `src/components/coach/TestimonialCard.tsx`
- [x] Task 2: Add testimonials section to coach profile page
- [x] Task 3: Verify types and lint pass — tsc clean, eslint clean

## Dev Agent Record

### Agent Model Used
Claude Opus 4.6

### Completion Notes
- Full variant: decorative `"` in navy, italic quote, result_summary in cyan monospace, client name/location
- Compact variant: truncates quote to 120 chars, name only
- Placeholder: dashed 2px border with "TESTIMONIAL COMING SOON" message
- Testimonials section placed between approach and pricing on coach profile
- Uses coach.testimonials from CoachWithRelations (fetched via parallel Promise.all in DAL)
- Featured testimonials sorted first, rendered as 'full', others as 'compact'
- Zero testimonials shows single placeholder card
- 2-column grid on desktop, stacks vertically on mobile

### Change Log
| File | Action | Description |
|------|--------|-------------|
| src/components/coach/TestimonialCard.tsx | Created | 3 variants: full, compact, placeholder |
| src/app/coaches/[slug]/page.tsx | Modified | Added testimonials section between approach and pricing |

### File List
- src/components/coach/TestimonialCard.tsx
- src/app/coaches/[slug]/page.tsx
