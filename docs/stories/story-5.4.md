# Story 5.4: Static Pages & Error Handling

## Status: Ready for Review

## Story

**As a** visitor,
**I want** the site to handle all edge cases with proper pages,
**so that** I never hit a dead end.

## Acceptance Criteria

1. Create `/services` page — platform overview, linking to coach profiles
2. Create `/privacy` page — placeholder privacy policy
3. Create `/terms` page — placeholder terms of service
4. Create `not-found.tsx` — custom 404 with brutalist styling and navigation links
5. Create `error.tsx` — `"use client"` error boundary with retry button
6. All pages responsive and brutalist

## Tasks

- [x] Task 1: Create /services, /privacy, /terms pages
- [x] Task 2: Create not-found.tsx and error.tsx
- [x] Task 3: Create /api/revalidate route
- [x] Task 4: Verify types and lint pass

## Dev Agent Record

### Agent Model Used
Claude Opus 4.6

### Completion Notes
- Services page: 3-column grid with DIY Programs, 1-on-1 Coaching, Online Training
- Privacy and Terms pages: placeholder content with brutalist styling
- 404: large cyan "404" with GO HOME and FIND A COACH CTAs
- Error boundary: "use client" with TRY AGAIN button calling reset()
- Revalidate API: POST /api/revalidate with secret header validation

### Change Log
| File | Action | Description |
|------|--------|-------------|
| src/app/services/page.tsx | Created | Platform overview with 3 service categories |
| src/app/privacy/page.tsx | Created | Placeholder privacy policy |
| src/app/terms/page.tsx | Created | Placeholder terms of service |
| src/app/not-found.tsx | Created | Custom 404 with brutalist styling |
| src/app/error.tsx | Created | Client error boundary with retry |
| src/app/api/revalidate/route.ts | Created | Secret-protected ISR revalidation endpoint |

### File List
- src/app/services/page.tsx
- src/app/privacy/page.tsx
- src/app/terms/page.tsx
- src/app/not-found.tsx
- src/app/error.tsx
- src/app/api/revalidate/route.ts
