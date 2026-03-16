# Story 2.2: Pricing Tiers

## Status: Ready for Review

## Story

**As a** visitor,
**I want** to see a coach's service tiers with transparent pricing, feature lists, and clear CTAs,
**so that** I can compare options and choose the right plan without guessing at costs.

## Acceptance Criteria

1. Create `src/components/coach/PricingTier.tsx` with 3 variants (standard, highlighted, standalone)
2. Price formatted from `price_cents` (15000 → "$150")
3. Price type label: "one-time", "/month", or "/session"
4. Features list using `▪`, exclusions using `✗` (muted text)
5. `is_featured` tier gets highlighted variant — thicker border + cyan accent bar
6. CTA button with tier's `cta_label` and `cta_url`
7. Side-by-side desktop, stacked mobile (featured first on mobile)
8. Scarcity badge: "ONLY X FOUNDING SPOTS LEFT" if `founding_rate_remaining > 0`
9. Never hide pricing

## Tasks

- [x] Task 1: Create `src/components/coach/PricingTier.tsx`
- [x] Task 2: Add pricing section to coach profile page
- [x] Task 3: Verify types and lint pass — tsc clean, eslint clean

## Dev Agent Record

### Agent Model Used
Claude Opus 4.6

### Completion Notes
- `formatPrice` converts cents to dollars with clean formatting (15000 → "$150")
- Featured tiers get thicker border (4px), larger shadow, and cyan accent bar at top
- Scarcity badge uses orange background per spec — only shows when `founding_rate_remaining > 0`
- Features use cyan `▪` bullet, exclusions use `✗` with muted text
- CTA: highlighted tiers get cyan bg, standard tiers get transparent bg
- Coach profile sorts tiers: featured first, then by sort_order
- Side-by-side on desktop (md:grid-cols-2), stacked on mobile

### Change Log
| File | Action | Description |
|------|--------|-------------|
| src/components/coach/PricingTier.tsx | Created | 3 variants with price formatting, features/exclusions, scarcity badge |
| src/app/coaches/[slug]/page.tsx | Modified | Added pricing section with sorted tiers |

### File List
- src/components/coach/PricingTier.tsx
- src/app/coaches/[slug]/page.tsx
