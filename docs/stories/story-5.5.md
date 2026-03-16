# Story 5.5: E2E Tests & CI Pipeline

## Status: Ready for Review

## Story

**As a** developer,
**I want** automated tests and a CI pipeline,
**so that** regressions are caught before production.

## Acceptance Criteria

1. Install `vitest`, `@testing-library/react`, `playwright`, `prettier`
2. Configure `vitest.config.ts` and `playwright.config.ts`
3. E2E: Calculator flow (form → email gate → results)
4. E2E: Map discovery (load → click → coach cards → profile)
5. E2E: Coach profile (hero, pricing, testimonials, CTA)
6. E2E: Blog funnel (listing → post → CTA → calculator)
7. E2E: Contact form (fill → submit → success)
8. Create `.github/workflows/ci.yaml` — type-check, lint, test
9. Add `.prettierrc` config
10. Add `"test": "vitest"` to package.json

## Tasks

- [x] Task 1: Install dependencies and create config files (vitest.config.ts, playwright.config.ts, .prettierrc)
- [x] Task 2: Write E2E Playwright tests for 5 critical flows
- [x] Task 3: Create .github/workflows/ci.yaml
- [x] Task 4: Verify types and lint pass

## Dev Agent Record

### Agent Model Used
Claude Opus 4.6

### Completion Notes
- Installed vitest, @vitejs/plugin-react, jsdom, @testing-library/react, @testing-library/jest-dom, @playwright/test
- Prettier was already installed — added .prettierrc config
- vitest.config.ts: jsdom env, @/ alias, setup file for jest-dom matchers
- playwright.config.ts: chromium, baseURL localhost:3000, webServer auto-start
- 5 E2E test files covering all critical flows with graceful handling of empty DB states
- CI pipeline: tsc, eslint, vitest on push/PR to main
- Added "test" and "test:e2e" scripts to package.json

### Change Log
| File | Action | Description |
|------|--------|-------------|
| vitest.config.ts | Created | Vitest config with jsdom, React plugin, path alias |
| vitest.setup.ts | Created | Jest-DOM matcher setup |
| playwright.config.ts | Created | Playwright config with Chromium, webServer |
| .prettierrc | Created | Prettier formatting config |
| .github/workflows/ci.yaml | Created | CI pipeline: type-check, lint, test |
| e2e/calculator.spec.ts | Created | Calculator flow E2E (form → email gate → results) |
| e2e/map-discovery.spec.ts | Created | Map discovery E2E (load, filters, area links) |
| e2e/coach-profile.spec.ts | Created | Coach profile E2E (directory → profile sections) |
| e2e/blog-funnel.spec.ts | Created | Blog funnel E2E (listing → post → CTA → calculator) |
| e2e/contact-form.spec.ts | Created | Contact form E2E (fields, submit, validation) |
| package.json | Modified | Added test and test:e2e scripts |

### File List
- vitest.config.ts
- vitest.setup.ts
- playwright.config.ts
- .prettierrc
- .github/workflows/ci.yaml
- e2e/calculator.spec.ts
- e2e/map-discovery.spec.ts
- e2e/coach-profile.spec.ts
- e2e/blog-funnel.spec.ts
- e2e/contact-form.spec.ts
- package.json (modified)
