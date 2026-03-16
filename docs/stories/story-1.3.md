# Story 1.3: Core UI Components — Buttons, Fields & Layout Primitives

## Status: Ready for Review

## Story

**As a** visitor,
**I want** the site's interactive elements to have a consistent brutalist look and feel,
**so that** every page feels cohesive and reinforces the raw industrial brand.

## Acceptance Criteria

1. Create `src/components/ui/BrutalistButton.tsx` with 4 variants (primary, secondary, inverse, ghost)
2. Create `src/components/ui/FormField.tsx` with 4 variants (standard, select, toggle, search)
3. Create `src/components/ui/SectionDivider.tsx` with 4 variants (line, heavy, titled, color-break)
4. Create `src/components/ui/Tag.tsx` with 3 variants (default, filled, accent)
5. Create `src/components/layout/Container.tsx` — max-width 1280px centered wrapper
6. All components use Tailwind utilities only — no inline styles except dynamic values
7. All components are accessible — proper `role`, `aria-*`, focus indicators (3px cyan outline)
8. All components are responsive — work at all 5 breakpoints

## Dev Notes

- front-end-spec.md Section 5 has full component specifications
- BrutalistButton: uppercase monospace, min 48px height, arrow (→) on nav CTAs, states: hover (-2px Y + shadow grows), active (shadow collapses), disabled (grayscale), focus (3px cyan outline offset 2px)
- FormField: thick bottom border, labels uppercase monospace above, focus = cyan border, error = red border + monospace message
- SectionDivider: line (1px), heavy (3px), titled (section title + ═══), color-break (full-bleed bg)
- Tag: default (2px border, transparent), filled (navy bg, white text), accent (cyan bg, dark text)
- Container: max-width 1280px, centered, gutter 24px desktop, 16px mobile
- All components Server Components unless interactivity required (button hover handled via CSS)

## Tasks

- [x] Task 1: Create `src/components/ui/BrutalistButton.tsx`
- [x] Task 2: Create `src/components/ui/FormField.tsx`
- [x] Task 3: Create `src/components/ui/SectionDivider.tsx`
- [x] Task 4: Create `src/components/ui/Tag.tsx`
- [x] Task 5: Create `src/components/layout/Container.tsx`
- [x] Task 6: Verify types and lint pass — tsc clean, eslint clean

## Dev Agent Record

### Agent Model Used
Claude Opus 4.6

### Completion Notes
- BrutalistButton has both `<button>` and `<a>` exports (BrutalistButton + BrutalistLinkButton) for nav CTAs
- All 4 button variants use CSS-only hover/active states — no client JS needed for button itself
- FormField is `'use client'` because ToggleField uses onClick and SearchField uses onSubmit
- FormField exports 4 named components: FormField (standard), SelectField, ToggleField, SearchField
- ToggleField uses `role="radiogroup"` and `role="radio"` with `aria-checked` for accessibility
- SectionDivider's color-break variant accepts dynamic `bgColor` prop (only inline style in component set)
- Container supports polymorphic `as` prop for semantic HTML (div/section/main/article)
- All interactive components have `focus-visible:outline-3 focus-visible:outline-cyan focus-visible:outline-offset-2`

### Change Log
| File | Action | Description |
|------|--------|-------------|
| src/components/ui/BrutalistButton.tsx | Created | BrutalistButton + BrutalistLinkButton, 4 variants |
| src/components/ui/FormField.tsx | Created | FormField, SelectField, ToggleField, SearchField |
| src/components/ui/SectionDivider.tsx | Created | 4 variants: line, heavy, titled, color-break |
| src/components/ui/Tag.tsx | Created | 3 variants: default, filled, accent |
| src/components/layout/Container.tsx | Created | max-w-1280 centered wrapper with responsive gutters |

### File List
- src/components/ui/BrutalistButton.tsx
- src/components/ui/FormField.tsx
- src/components/ui/SectionDivider.tsx
- src/components/ui/Tag.tsx
- src/components/layout/Container.tsx
