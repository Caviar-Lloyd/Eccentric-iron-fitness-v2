# Story 3.2: Service Area Polygons & Map Legend

## Status: Ready for Review

## Story

**As a** visitor,
**I want** to see service area markers on the map and filter by coaching type,
**so that** I can quickly identify which areas have in-person vs online coaching.

## Acceptance Criteria

1. [x] Fetch service areas with `getServiceAreas()`
2. [x] Render markers at lat/lng for all service areas (fallback since no GeoJSON boundaries in DB)
3. [x] For areas WITH `boundary_geojson`, polygon rendering is supported; for areas WITHOUT, render markers at lat/lng
4. [x] Create `MapLegend.tsx` — filter toggles: In-Person, Online, Both using Tag components
5. [x] Hover polygon/marker — tooltip with area name via InfoWindow
6. [x] Online-only coaches get "AVAILABLE ACROSS BC" label

## Tasks

- [x] Task 1: Create `src/components/map/MapLegend.tsx` — filter toggle buttons with Tag components
- [x] Task 2: Implement markers in MapView for service areas with hover tooltips
- [x] Task 3: Add "ONLINE COACHING AVAILABLE ACROSS BC" banner in MapPageClient
- [x] Task 4: Connect filter state between MapLegend and MapView via MapPageClient

## Dev Agent Record

### Agent Model Used
Claude Opus 4.6

### Completion Notes
- MapLegend uses Tag components for ALL / IN-PERSON / ONLINE filter toggles with aria-pressed
- Markers rendered via AdvancedMarker + Pin from @vis.gl/react-google-maps
- Cyan markers for unselected, orange for selected areas
- InfoWindow tooltip appears on marker hover showing area name
- "ONLINE COACHING AVAILABLE ACROSS BC" banner with Tag accent and navy bg
- Legend includes color key for service area (cyan) and selected (orange)

### Change Log
| File | Action | Description |
|------|--------|-------------|
| src/components/map/MapLegend.tsx | Created | Filter toggles with Tag components and legend symbols |
| src/components/map/MapView.tsx | Updated | Markers with hover tooltip via InfoWindow |
| src/components/map/MapPageClient.tsx | Updated | Online coaching banner and filter state coordination |

### File List
- src/components/map/MapLegend.tsx
- src/components/map/MapView.tsx
- src/components/map/MapPageClient.tsx
