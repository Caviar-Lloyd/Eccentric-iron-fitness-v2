# Story 4.4: Contact Form

## Status: Ready for Review

## Story

**As a** visitor,
**I want** to submit a contact form with my name, email, optional phone, message, and optional coach preference,
**so that** I can reach out to Eccentric Iron Fitness with questions or coaching inquiries.

## Acceptance Criteria

1. [x] Create `src/app/contact/page.tsx` with `generateMetadata()`
2. [x] Header: "GET IN TOUCH" in H1
3. [x] Fields: name, email, phone (optional), message (textarea), coach dropdown (optional, from `getCoaches()`)
4. [x] Create `src/app/contact/actions.ts` with server action `submitContactForm`
5. [x] Validate with Zod `contactFormSchema`
6. [x] Create lead with source `'contact_form'` via `createLead`
7. [x] `"use client"` form component for state management
8. [x] Success: form replaced with "MESSAGE SENT" confirmation in brutalist style
9. [x] Error: inline error messages per field
10. [x] Textarea uses native element with brutalist styling matching FormField

## Tasks

- [x] Task 1: Create `src/app/contact/actions.ts` with Zod validation and server action
- [x] Task 2: Create `src/app/contact/ContactFormClient.tsx` with form UI and state management
- [x] Task 3: Create `src/app/contact/page.tsx` as server component with metadata and coach data

## Dev Agent Record

### Agent Model Used
Claude Opus 4.6

### Completion Notes
- Contact page is a server component that fetches coaches via `getCoaches()` and passes simplified list to client
- ContactFormClient manages form state, submission, success/error display
- Zod schema validates name (required), email (valid format), phone (optional, max 30), message (required, max 5000), coach_id (optional)
- Server action uses FormData for submission, returns field-level errors
- Success state replaces form with brutalist "MESSAGE SENT" card with success color
- Textarea styled to match FormField: border-b-3, font-body, placeholder styling

### Change Log
| File | Action | Description |
|------|--------|-------------|
| src/app/contact/page.tsx | Created | Contact page with metadata and coach data fetching |
| src/app/contact/ContactFormClient.tsx | Created | Client-side contact form with validation and state |
| src/app/contact/actions.ts | Created | Server action with Zod validation and lead creation |

### File List
- src/app/contact/page.tsx
- src/app/contact/ContactFormClient.tsx
- src/app/contact/actions.ts
