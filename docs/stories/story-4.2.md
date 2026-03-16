# Story 4.2: Email Gate & Lead Capture

## Status: Ready for Review

## Story

**As a** business owner,
**I want** visitors to provide their email before seeing calculator results,
**so that** I can capture leads and follow up with potential coaching clients.

## Acceptance Criteria

1. [x] Create `src/components/ui/EmailCapture.tsx` with 3 variants: modal, inline, banner
2. [x] Modal: dark overlay 80%, centered card, single email field + "UNLOCK YOUR RESULTS" button, NOT closable by clicking outside
3. [x] Inline: horizontal layout — email input + submit button side by side
4. [x] Banner: full-width cyan bg block with email field
5. [x] Create `src/app/calculator/actions.ts` with server action `captureCalculatorLead`
6. [x] Server action uses `createLead` from DAL
7. [x] Email gate modal appears after CALCULATE click, before results are shown
8. [x] On email submit success -> close modal, reveal results
9. [x] Client-side email format validation before submit
10. [x] Wire into CalculatorForm flow: calculate -> show modal -> on email success -> show results

## Tasks

- [x] Task 1: Create `src/components/ui/EmailCapture.tsx` with modal, inline, banner variants
- [x] Task 2: Create `src/app/calculator/actions.ts` with `captureCalculatorLead` server action
- [x] Task 3: Wire email gate flow into `CalculatorPageClient.tsx`

## Dev Agent Record

### Agent Model Used
Claude Opus 4.6

### Completion Notes
- EmailCapture supports 3 variants: modal (dark overlay, not closable by backdrop), inline (horizontal), banner (full-width cyan)
- Modal auto-focuses email input on mount
- Client-side email validation via regex before server submission
- CalculatorPageClient manages 3-state flow: form -> email-gate -> results
- Server action validates email server-side and creates lead via DAL
- On success, modal closes and results are revealed
- Optional `onClose` prop on modal renders "SKIP FOR NOW" button (not used in calculator flow)

### Change Log
| File | Action | Description |
|------|--------|-------------|
| src/components/ui/EmailCapture.tsx | Created | Email capture component with 3 variants |
| src/app/calculator/actions.ts | Created | Server action for calculator lead capture |
| src/app/calculator/CalculatorPageClient.tsx | Created | Client orchestrator with email gate flow |

### File List
- src/components/ui/EmailCapture.tsx
- src/app/calculator/actions.ts
- src/app/calculator/CalculatorPageClient.tsx
