# Story 3.1: Google Maps Setup & BC Map View

## Status: Ready for Review

## Story

**As a** visitor,
**I want** to see an interactive map of British Columbia centered on the province,
**so that** I can visually discover where coaches and training options are located.

## Acceptance Criteria

1. [x] Create `src/app/map/page.tsx` with `generateMetadata()`
2. [x] Create `src/components/map/MapView.tsx` as `"use client"` using `@vis.gl/react-google-maps`
3. [x] Load MapView via `next/dynamic` with `ssr: false`
4. [x] Center on BC (lat: 53.7, lng: -127.6, zoom: 5)
5. [x] Dark/brutalist map styling (dark mode style array)
6. [x] Page header: "FIND A COACH" in H1
7. [x] Full-width desktop, 50vh mobile
8. [x] Graceful load failure — fallback link to /coaches
9. [x] Uses `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` from env
10. [x] Env key: `process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`

## Tasks

- [x] Task 1: Create `src/app/map/page.tsx` — server component with metadata, H1, and dynamic MapView import
- [x] Task 2: Create `src/components/map/MapView.tsx` — client component with Google Maps, dark styling, BC center
- [x] Task 3: Create `src/components/map/MapPageClient.tsx` — client orchestrator for all interactive map components
- [x] Task 4: Implement fallback UI when API key is missing or map fails to load

## Dev Agent Record

### Agent Model Used
Claude Opus 4.6

### Completion Notes
- Server component `map/page.tsx` fetches service areas and passes to client orchestrator
- `MapView.tsx` uses `@vis.gl/react-google-maps` with `APIProvider`, `Map`, `AdvancedMarker`, `Pin`, `InfoWindow`
- Dark brutalist map styles applied via Google Maps style array (navy roads, dark water, muted labels)
- `MapPageClient.tsx` coordinates MapView, MapSearch, MapLegend, and MapCoachPanel via shared state
- Dynamic import with `ssr: false` and loading placeholder
- Fallback component with "MAP UNAVAILABLE" message and link to /coaches when no API key

### Change Log
| File | Action | Description |
|------|--------|-------------|
| src/app/map/page.tsx | Created | Map page with metadata, header, and client orchestrator |
| src/components/map/MapView.tsx | Created | Google Maps client component with dark styling and markers |
| src/components/map/MapPageClient.tsx | Created | Client-side orchestrator coordinating all map interactions |

### File List
- src/app/map/page.tsx
- src/components/map/MapView.tsx
- src/components/map/MapPageClient.tsx
