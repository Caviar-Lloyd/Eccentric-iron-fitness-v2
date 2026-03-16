# Story 3.3: Map Interaction & Coach Discovery Panel

## Status: Ready for Review

## Story

**As a** visitor,
**I want** to click on a map area and see the coaches available there,
**so that** I can discover and select a coach near me.

## Acceptance Criteria

1. [x] Click marker — zoom to region and select area
2. [x] Create `MapCoachPanel.tsx` — CoachCard compact variants for selected area
3. [x] Desktop: panel below map
4. [x] Mobile: slide-up panel (Framer Motion, 300ms)
5. [x] Create `MapSearch.tsx` — city search input (simple text filter against service areas)
6. [x] No coaches — fallback messaging + online coaching redirect
7. [x] Cards link to `/coaches/[slug]`

## Tasks

- [x] Task 1: Create `src/components/map/MapCoachPanel.tsx` — desktop panel + mobile slide-up with Framer Motion
- [x] Task 2: Create `src/components/map/MapSearch.tsx` — city search with text filter and dropdown
- [x] Task 3: Implement coach fetching via Supabase client in MapCoachPanel
- [x] Task 4: Add fallback messaging and online coaching redirect for empty areas
- [x] Task 5: Wire area selection from map markers and search to coach panel

## Dev Agent Record

### Agent Model Used
Claude Opus 4.6

### Completion Notes
- MapCoachPanel fetches coaches client-side via supabase for the selected area
- Desktop: static panel below map with brutalist card styling
- Mobile: Framer Motion slide-up panel from bottom (300ms easeOut) with fixed positioning
- Close button (X) in both layouts with proper aria-label
- MapSearch: text input filters service areas by name/province, dropdown results
- Click outside closes search dropdown (mousedown event listener)
- No coaches fallback shows message and "BROWSE ONLINE COACHES" link
- Link to area page at bottom of panel
- CoachCard compact variant used for all coach listings

### Change Log
| File | Action | Description |
|------|--------|-------------|
| src/components/map/MapCoachPanel.tsx | Created | Coach discovery panel with desktop/mobile layouts |
| src/components/map/MapSearch.tsx | Created | City search with text filtering and dropdown results |
| src/components/map/MapPageClient.tsx | Updated | Connected search and panel to map selection state |

### File List
- src/components/map/MapCoachPanel.tsx
- src/components/map/MapSearch.tsx
- src/components/map/MapPageClient.tsx
