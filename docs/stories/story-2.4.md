# Story 2.4: Coach Profile Navigation & Booking CTA

## Status: Ready for Review

## Story

**As a** visitor,
**I want** a sticky sub-navigation on coach profiles and a clear booking section,
**so that** I can quickly jump to any section and always have a path to book.

## Acceptance Criteria

1. Sticky sub-nav: `About | Services | Pricing | Book` — fixed below main NavBar
2. Active section highlighted via Intersection Observer
3. Smooth-scroll on click with offset for sticky nav height
4. `"use client"` component with comment explaining why
5. Mobile: horizontal scroll, stays sticky
6. Booking section: "READY TO START?" with tier CTAs
7. Online/in-person availability badges
8. Breadcrumb: `Home > Coaches > [Coach Name]`

## Tasks

- [x] Task 1: Create `src/components/coach/CoachSubNav.tsx`
- [x] Task 2: Add booking section and breadcrumb to coach profile page
- [x] Task 3: Verify types and lint pass — tsc clean, eslint clean

## Dev Agent Record

### Agent Model Used
Claude Opus 4.6

### Completion Notes
- CoachSubNav is `'use client'` with comment — needs Intersection Observer and click handlers
- Sticky at `top-16` (below 64px NavBar), z-40 (below NavBar z-50)
- Active section detected via IntersectionObserver with rootMargin offset
- Smooth-scroll with 120px offset (NavBar + SubNav combined)
- Sections tracked: about, approach, testimonials, pricing, book
- Mobile: `overflow-x-auto` for horizontal scrolling, `shrink-0` on buttons
- Breadcrumb: `Home > Coaches > [Coach Name]` with monospace, links via next/link
- Booking section: "READY TO START?" with online/in-person badges and discovery call CTA

### Change Log
| File | Action | Description |
|------|--------|-------------|
| src/components/coach/CoachSubNav.tsx | Created | Sticky sub-nav with Intersection Observer, smooth scroll |
| src/app/coaches/[slug]/page.tsx | Modified | Added breadcrumb, CoachSubNav, and booking section |

### File List
- src/components/coach/CoachSubNav.tsx
- src/app/coaches/[slug]/page.tsx
