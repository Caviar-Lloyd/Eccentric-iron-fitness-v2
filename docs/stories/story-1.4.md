# Story 1.4: NavBar & Footer

## Status: Ready for Review

## Story

**As a** visitor,
**I want** persistent navigation and a site footer,
**so that** I can navigate the site and find key information from any page.

## Acceptance Criteria

1. Create `src/components/layout/NavBar.tsx` — desktop: logo left, links center-right, "BOOK A CALL" CTA far right
2. NavBar mobile: hamburger + persistent "BOOK A CALL" CTA + full-screen overlay with stacked nav links
3. "ECCENTRIC IRON" wordmark in monospace, links to `/`
4. Create `src/components/layout/Footer.tsx` — 3-column grid, dark background, monospace type
5. Update `src/app/layout.tsx` to include NavBar and Footer wrapping `{children}`
6. NavBar is sticky on desktop, hamburger toggle works on mobile with Framer Motion
7. Active nav link indicated with cyan underline
8. All nav links use `next/link` for client-side navigation

## Dev Notes

- front-end-spec.md Section 5.9 (NavBar) and 5.10 (Footer) have full specs
- NavBar: "ECCENTRIC IRON" monospace, no icon. CTA always visible on mobile. Hamburger: three thick 3px lines
- Footer: 3-column grid desktop, stacked mobile. Dark bg (darker-bg), monospace, social links as text labels (not icons)
- Nav overlay: fade overlay + slide links from right, 250ms ease-out (Framer Motion)
- Mobile: hamburger below 1024px with full-screen overlay
- Active link: cyan underline indicator

## Tasks

- [x] Task 1: Create `src/components/layout/NavBar.tsx`
- [x] Task 2: Create `src/components/layout/Footer.tsx`
- [x] Task 3: Update `src/app/layout.tsx` with NavBar + Footer
- [x] Task 4: Verify types and lint pass — tsc clean, eslint clean

## Dev Agent Record

### Agent Model Used
Claude Opus 4.6

### Completion Notes
- NavBar is `'use client'` for pathname detection and hamburger state (Framer Motion AnimatePresence)
- Desktop nav shows at `lg:` breakpoint (1024px+), hamburger below that
- "BOOK A CALL" CTA visible on both desktop and mobile — never hidden behind hamburger
- Mobile overlay uses Framer Motion: fade bg + slide links from right, 250ms ease-out
- Active link detection uses `pathname === href || pathname.startsWith(href + '/')` for nested routes
- Footer is a Server Component — no client interactivity needed
- Social links use text labels (Instagram, TikTok, YouTube) per spec — no icons
- Layout body uses `flex min-h-screen flex-col` with `main.flex-1` for sticky footer pattern

### Change Log
| File | Action | Description |
|------|--------|-------------|
| src/components/layout/NavBar.tsx | Created | Sticky nav with desktop links, mobile hamburger overlay, Framer Motion |
| src/components/layout/Footer.tsx | Created | 3-column grid, brand + quick links + social/legal |
| src/app/layout.tsx | Modified | Added NavBar, Footer, flex-col min-h-screen layout |

### File List
- src/components/layout/NavBar.tsx
- src/components/layout/Footer.tsx
- src/app/layout.tsx
