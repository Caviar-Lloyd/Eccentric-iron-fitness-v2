# Story 4.1: TDEE/Macro Calculator Engine & Form

## Status: Ready for Review

## Story

**As a** visitor,
**I want** to enter my stats (age, weight, height, gender, activity level, goal) into a TDEE/macro calculator,
**so that** I can get a personalized calorie and macro breakdown based on the Mifflin-St Jeor equation.

## Acceptance Criteria

1. [x] Create `src/app/calculator/page.tsx` with `generateMetadata()`
2. [x] Create `src/components/calculator/CalculatorForm.tsx` as `"use client"`
3. [x] Inputs: age, weight, height, gender toggle, activity level select (5 options), goal select (3 options)
4. [x] Unit toggle (Metric/Imperial) using `ToggleField`
5. [x] All inputs use `FormField`/`SelectField`/`ToggleField` from existing components
6. [x] Create `src/lib/calculator.ts` with `calculateTDEE()` and `calculateMacros()` using Mifflin-St Jeor
7. [x] Zod already installed — created `calculatorSchema` for validation
8. [x] Inline validation errors in monospace red
9. [x] "CALCULATE" CTA — full-width, cyan `BrutalistButton`
10. [x] Form calls `onSubmit` callback with calculated results + form data

## Tasks

- [x] Task 1: Create `src/lib/calculator.ts` with types, Zod schema, TDEE/macro functions
- [x] Task 2: Create `src/components/calculator/CalculatorForm.tsx` with all inputs and validation
- [x] Task 3: Create `src/app/calculator/page.tsx` with metadata and layout

## Dev Agent Record

### Agent Model Used
Claude Opus 4.6

### Completion Notes
- Mifflin-St Jeor equation implemented with proper unit conversion (Imperial to Metric)
- Activity multipliers: 1.2, 1.375, 1.55, 1.725, 1.9
- Goal multipliers: Fat Loss 0.8, Maintenance 1.0, Lean Bulk 1.1
- Protein always 1g/lb bodyweight, fat 25% of adjusted calories, carbs remainder
- Zod schema validates age (13-120), weight (positive), height (positive)
- CalculatorForm is a controlled `"use client"` component with inline error display
- Unit toggle dynamically updates weight/height labels (lbs/kg, inches/cm)
- Page is a server component with metadata; client logic handled by CalculatorPageClient

### Change Log
| File | Action | Description |
|------|--------|-------------|
| src/lib/calculator.ts | Created | TDEE/macro calculator engine with Zod schema |
| src/components/calculator/CalculatorForm.tsx | Created | Client-side calculator form with validation |
| src/app/calculator/page.tsx | Created | Calculator page with SEO metadata |
| src/app/calculator/CalculatorPageClient.tsx | Created | Client orchestrator for form/email/results flow |

### File List
- src/lib/calculator.ts
- src/components/calculator/CalculatorForm.tsx
- src/app/calculator/page.tsx
- src/app/calculator/CalculatorPageClient.tsx
