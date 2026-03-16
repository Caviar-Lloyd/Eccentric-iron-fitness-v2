# Story 1.1: Project Infrastructure & Database Schema

## Status: Ready for Review

## Story

**As a** developer,
**I want** the project dependencies installed, Tailwind configured for brutalist design, fonts loaded, and the database schema deployed to Supabase,
**so that** all subsequent stories have a working foundation to build on.

## Acceptance Criteria

1. Install missing dependencies: `@vis.gl/react-google-maps`, `prettier`
2. Create `tailwind.config.ts` extending Tailwind 4 with `borderRadius: { DEFAULT: '0' }`, brand color tokens (navy, cyan, orange, dark-bg, card-surface, border, border-hard), and font family tokens (space-grotesk, inter, jetbrains-mono)
3. Update `src/app/layout.tsx` to load Space Grotesk, Inter, and JetBrains Mono via `next/font/google` with CSS variables
4. Update `globals.css` with base dark background (`#111827`), default text color (`#FFFFFF`), and zero border-radius enforcement
5. Run the full SQL schema from `docs/architecture.md` Section 9 against the Supabase project — all 7 tables with RLS policies, indexes, triggers, and seed data. Note: Carver's seed data should have `is_in_person: false` (online-focused, province-wide BC). Service areas are seeded for city page SEO but NOT linked to Carver via coach_service_areas
6. Create `src/lib/types.ts` with all 7 TypeScript interfaces from architecture doc Section 4
7. Create `.env.example` with all required environment variable keys (no values)
8. Create `supabase/migrations/001_initial_schema.sql` with the full schema for version control
9. `npm run dev` starts without errors, shows a page with correct fonts and dark background

## Dev Notes

- Brand colors from front-end-spec.md Section 6:
  - Navy: `#455590`, Cyan: `#2DDBDB`, Orange: `#FF6B35`
  - Dark BG: `#111827`, Darker BG: `#0A0E1A`, Card Surface: `#1A2035`
  - Border: `#2A3050`, Border Hard: `#000000`
  - Text Primary: `#FFFFFF`, Text Secondary: `#9CA3AF`, Text Muted: `#6B7280`
  - Success: `#22C55E`, Warning: `#F7931E`, Error: `#EF4444`
- Fonts: Space Grotesk (headings), Inter (body), JetBrains Mono (monospace)
- Coding standards from architecture.md Section 17
- Supabase project URL: https://wejlwvfivaiyojxcfiwa.supabase.co
- Database schema: architecture.md Section 9

## Tasks

- [x] Task 1: Install dependencies (`@vis.gl/react-google-maps`, `prettier`)
- [x] Task 2: Configure Tailwind 4 with brutalist design tokens (via CSS `@theme` — Tailwind 4 convention)
- [x] Task 3: Update `layout.tsx` with `next/font/google` for all 3 font families
- [x] Task 4: Update `globals.css` with base styles and zero border-radius
- [x] Task 5: Create `src/lib/types.ts` with all 7 TypeScript interfaces
- [x] Task 6: Create `supabase/migrations/001_initial_schema.sql`
- [x] Task 7: Deploy schema to Supabase (verified via REST API)
- [x] Task 8: Create `.env.example` with all keys
- [x] Task 9: Verify `npm run dev` starts cleanly — tsc clean, lint clean, server ready in 968ms

## Dev Agent Record

### Agent Model Used
Claude Opus 4.6

### Completion Notes
- Tailwind 4 uses CSS-based config (`@theme` in globals.css) instead of `tailwind.config.ts`. All design tokens configured via `@theme inline` block.
- GeoJSON type changed from `GeoJSON.Polygon` to `Record<string, unknown>` to avoid needing `@types/geojson` dependency
- Homepage updated from Next.js starter to minimal brutalist placeholder using new fonts and colors
- Schema deployed and verified — Carver seeded as online-only (`is_in_person: false`), 4 service areas seeded, no coach_service_areas linked

### Change Log
| File | Action | Description |
|------|--------|-------------|
| package.json | Modified | Added @vis.gl/react-google-maps, prettier |
| src/app/globals.css | Modified | Replaced with Tailwind 4 @theme design tokens, brutalist base styles |
| src/app/layout.tsx | Modified | Replaced Geist fonts with Space Grotesk, Inter, JetBrains Mono |
| src/app/page.tsx | Modified | Replaced Next.js starter with brutalist placeholder |
| src/lib/types.ts | Created | 7 data model interfaces + 3 composite types |
| .env.example | Modified | Added Google Maps and REVALIDATION_SECRET keys |
| supabase/migrations/001_initial_schema.sql | Created | Full schema with RLS, indexes, triggers, seed data |
| docs/stories/story-1.1.md | Created | Story file for tracking |

### File List
- src/app/globals.css
- src/app/layout.tsx
- src/app/page.tsx
- src/lib/types.ts
- .env.example
- supabase/migrations/001_initial_schema.sql
- docs/stories/story-1.1.md
- package.json
- package-lock.json
