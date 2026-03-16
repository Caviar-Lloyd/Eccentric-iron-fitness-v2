# Story 5.2: Blog Post Pages & In-Article CTAs

## Status: Ready for Review

## Story

**As a** visitor reading a blog post,
**I want** the full article with clear next-step CTAs,
**so that** I'm guided toward the calculator or a coach.

## Acceptance Criteria

1. Create `src/app/blog/[slug]/page.tsx` with `generateStaticParams()` and `generateMetadata()`
2. Header: title, author linking to profile, date, read time, category tag
3. Content rendered with paragraph formatting
4. Create `BlogCTA.tsx` — mid-article (compact) and end-of-article (full-width)
5. Mid-article CTA after 3rd paragraph
6. End-of-article: Calculator, Find a Coach, Book a Call
7. Breadcrumb: `Home > Blog > [Title]`
8. `notFound()` for invalid/unpublished slugs
9. Author section: `CoachCard` minimal variant

## Tasks

- [x] Task 1: Create BlogCTA component
- [x] Task 2: Create blog post page
- [x] Task 3: Verify types and lint pass

## Dev Agent Record

### Agent Model Used
Claude Opus 4.6

### Completion Notes
- BlogCTA compact: single calculator CTA card, inserted after 3rd paragraph
- BlogCTA full: 3-column grid with Calculator, Find a Coach, Book a Call buttons
- Blog post uses generateStaticParams for all published posts
- Author card via CoachCard minimal variant
- Content split by newlines into paragraphs

### Change Log
| File | Action | Description |
|------|--------|-------------|
| src/components/blog/BlogCTA.tsx | Created | Compact and full-width CTA variants |
| src/app/blog/[slug]/page.tsx | Created | Blog post with breadcrumb, CTAs, author card |

### File List
- src/components/blog/BlogCTA.tsx
- src/app/blog/[slug]/page.tsx
