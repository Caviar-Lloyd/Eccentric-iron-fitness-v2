# Story 4.3: Calculator Results & Coaching Upsell

## Status: Ready for Review

## Story

**As a** visitor,
**I want** to see my TDEE and macro results displayed clearly with a visual breakdown and coaching upsell,
**so that** I understand my targets and am encouraged to work with a coach.

## Acceptance Criteria

1. [x] Create `src/components/calculator/CalculatorResults.tsx` as `"use client"`
2. [x] TDEE displayed as large number (font-heading text-5xl on desktop, text-3xl mobile)
3. [x] Create `src/components/calculator/MacroBar.tsx` with animated horizontal bars
4. [x] Protein bar: bg-cyan, Carbs bar: bg-navy, Fat bar: bg-text-muted
5. [x] Each bar shows gram count + percentage label
6. [x] Animate width from 0% to target% (600ms staggered, ease-out) using framer-motion
7. [x] Respects `prefers-reduced-motion` via `useReducedMotion` from framer-motion
8. [x] "Cook -> Measure -> Eat" framework: 3-step explanation below macros
9. [x] Coaching upsell section: "WANT EXPERT GUIDANCE?" heading
10. [x] Link to /coaches: "BROWSE ALL COACHES ->"
11. [x] SectionDivider between form area and results

## Tasks

- [x] Task 1: Create `src/components/calculator/MacroBar.tsx` with animated bars
- [x] Task 2: Create `src/components/calculator/CalculatorResults.tsx` with TDEE display, macros, framework, upsell

## Dev Agent Record

### Agent Model Used
Claude Opus 4.6

### Completion Notes
- MacroBar uses framer-motion `motion.div` with `animate={{ width }}` for smooth bar animations
- `useReducedMotion()` hook disables animations when user prefers reduced motion
- Staggered delays (0s, 0.15s, 0.3s) for protein, carbs, fat bars
- TDEE shown as large cyan number (text-5xl/text-6xl/text-7xl responsive)
- Cook/Measure/Eat framework in 3-column grid with brutalist cards
- Coaching upsell with BrutalistLinkButton to /coaches and text link to /contact
- SectionDividers separate content sections

### Change Log
| File | Action | Description |
|------|--------|-------------|
| src/components/calculator/MacroBar.tsx | Created | Animated macro bar with framer-motion |
| src/components/calculator/CalculatorResults.tsx | Created | Results display with macros, framework, upsell |

### File List
- src/components/calculator/MacroBar.tsx
- src/components/calculator/CalculatorResults.tsx
