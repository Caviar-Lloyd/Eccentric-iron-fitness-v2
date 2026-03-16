# Story 3.5: Coach Profile Mini Map

## Status: Ready for Review

## Story

**As a** visitor viewing a coach's profile,
**I want** to see a small map showing their service areas,
**so that** I can understand where they offer in-person training.

## Acceptance Criteria

1. [x] Create `src/components/map/MiniMap.tsx` — `"use client"`, 300px height, non-interactive display
2. [x] Shows markers for coach's service areas
3. [x] Online-only — "AVAILABLE ONLINE PROVINCE-WIDE" text block instead of map
4. [x] Click — links to `/map`
5. [x] Dynamic import with `next/dynamic` `ssr: false`
6. [x] Do NOT modify `src/app/coaches/[slug]/page.tsx` — just create the MiniMap component

## Tasks

- [x] Task 1: Create `src/components/map/MiniMap.tsx` with Google Maps display and markers
- [x] Task 2: Implement online-only fallback text block
- [x] Task 3: Make entire component clickable linking to /map
- [x] Task 4: Add API key missing fallback UI

## Dev Agent Record

### Agent Model Used
Claude Opus 4.6

### Completion Notes
- Client component using `@vis.gl/react-google-maps` with dark brutalist styling
- 300px height, `gestureHandling: "none"` and `disableDefaultUI: true` for non-interactive display
- `pointer-events-none` on map container prevents map interaction
- Service area markers shown with cyan Pin markers
- Auto-centers on average lat/lng of service areas, zoom 10 for single area, 7 for multiple
- Online-only or empty areas: navy background with "AVAILABLE ONLINE PROVINCE-WIDE" heading
- Entire component wrapped in Next.js Link to /map
- "VIEW FULL MAP" CTA at bottom of map display
- Fallback when no API key: simple text link to map
- Designed for integration via `next/dynamic` with `ssr: false` in coach profile page

### Change Log
| File | Action | Description |
|------|--------|-------------|
| src/components/map/MiniMap.tsx | Created | Non-interactive mini map for coach profiles |

### File List
- src/components/map/MiniMap.tsx
