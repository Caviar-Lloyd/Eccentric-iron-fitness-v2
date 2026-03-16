# Story 1.5: Homepage

## Status: Ready for Review

## Story

**As a** visitor,
**I want** to land on a homepage that immediately tells me what Eccentric Iron Fitness is and routes me to find a coach or calculate my macros,
**so that** I understand the platform's value and take action within 5 seconds.

## Acceptance Criteria

1. Create `src/app/page.tsx` replacing the placeholder — server component fetching coaches
2. Hero section: massive brutalist typography with tagline, two primary CTAs (Find a Coach → `/map`, Calculate Macros → `/calculator`)
3. "How It Works" section: 3-step numbered process strip
4. Coach preview section: featured coach cards with photo placeholder, name, specialty, starting price
5. Full-width calculator CTA banner — cyan background block
6. All sections use `SectionDivider` between them
7. Page uses `generateMetadata()` for SEO title/description
8. Fully responsive across all 5 breakpoints
9. Page loads with correct brutalist styling

## Dev Notes

- front-end-spec.md Section 4.1 has the wireframe for homepage
- Hero CTAs: hover state fills solid cyan, text inverts to dark
- Coach cards: thick black border, offset shadow on hover
- Calculator banner: full-bleed color block breaking page rhythm
- Use `getCoaches()` from DAL to fetch coach data
- Use existing components: BrutalistButton, Container, SectionDivider, Tag

## Tasks

- [x] Task 1: Create `src/app/page.tsx` with all homepage sections
- [x] Task 2: Verify types and lint pass — tsc clean, eslint clean

## Dev Agent Record

### Agent Model Used
Claude Opus 4.6

### Completion Notes
- Homepage is an async Server Component — fetches coaches via `getCoaches()` DAL at request time
- Hero: "FIND YOUR STRENGTH" with cyan accent, two CTAs using Link with brutalist button styling
- How It Works: 3 numbered cards (01/02/03) in responsive grid
- Coach preview: cards with navy initials placeholder, specialties as Tags, bio excerpt, "VIEW PROFILE →"
- Calculator CTA: full-width cyan background section with inverted dark CTA button
- Uses `generateMetadata()` for SEO title/description
- Sections separated by `SectionDivider variant="heavy"` (3px rule)
- Coach section conditionally renders only when coaches exist

### Change Log
| File | Action | Description |
|------|--------|-------------|
| src/app/page.tsx | Modified | Full homepage: hero, how it works, coach preview, calculator CTA |

### File List
- src/app/page.tsx
