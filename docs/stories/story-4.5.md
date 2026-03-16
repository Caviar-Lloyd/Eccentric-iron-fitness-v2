# Story 4.5: GoHighLevel CRM Integration

## Status: Ready for Review

## Story

**As a** business owner,
**I want** leads from the calculator and contact form to be synced to GoHighLevel CRM,
**so that** I can manage follow-ups and nurture sequences from a single platform.

## Acceptance Criteria

1. [x] Create `src/lib/integrations/ghl.ts` with `createOrUpdateGHLContact` function
2. [x] Uses `GHL_API_KEY` and `GHL_LOCATION_ID` from `process.env`
3. [x] POST to GHL API: `https://services.leadconnectorhq.com/contacts/`
4. [x] Fire-and-forget pattern: never throws, logs errors
5. [x] Returns `contactId` or `null` on failure
6. [x] Create `addTagToContact(contactId, tag)` function
7. [x] Wire into calculator actions: after lead created, GHL sync with tags ["calculator", "website-lead", goal]
8. [x] Wire into contact actions: after lead created, GHL sync with tags ["contact-form", "website-lead"]
9. [x] GHL failure -> `console.error` only, user sees success
10. [x] Update leads table `ghl_contact_id` after successful GHL creation

## Tasks

- [x] Task 1: Create `src/lib/integrations/ghl.ts` with `createOrUpdateGHLContact` and `addTagToContact`
- [x] Task 2: Wire GHL sync into `src/app/calculator/actions.ts`
- [x] Task 3: Wire GHL sync into `src/app/contact/actions.ts`

## Dev Agent Record

### Agent Model Used
Claude Opus 4.6

### Completion Notes
- GHL integration uses fire-and-forget pattern: `.then()` chain after lead creation, never blocks response
- Missing env vars (GHL_API_KEY, GHL_LOCATION_ID) result in `console.error` + `null` return, not thrown errors
- Calculator action tags: ["calculator", "website-lead", goal-slug]
- Contact action tags: ["contact-form", "website-lead"]
- After successful GHL contact creation, `ghl_contact_id` is updated on the lead record via supabase
- Name is split into firstName/lastName for GHL API compatibility
- API version header set to "2021-07-28" per GHL docs

### Change Log
| File | Action | Description |
|------|--------|-------------|
| src/lib/integrations/ghl.ts | Created | GHL CRM integration with contact creation and tagging |
| src/app/calculator/actions.ts | Modified | Added GHL sync after lead capture |
| src/app/contact/actions.ts | Modified | Added GHL sync after contact form submission |

### File List
- src/lib/integrations/ghl.ts
- src/app/calculator/actions.ts
- src/app/contact/actions.ts
