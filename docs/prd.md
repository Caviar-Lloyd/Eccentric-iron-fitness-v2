# Eccentric Iron Fitness v2 — Product Requirements Document (PRD)

**Last Updated:** March 15, 2026
**Phase:** Planning
**Agent:** John (PM)

---

## 1. Goals and Background Context

### 1.1 Goals

- **Multi-coach platform:** Build a scalable fitness platform where multiple coaches have their own profiles, services, pricing, and SEO presence — not a single-trainer portfolio site
- **Geographic discovery:** Enable visitors to discover in-person coaches via an interactive BC map with service area polygons, linking to city pages and coach profiles
- **Lead generation engine:** Convert SEO traffic into leads via a TDEE/Macro calculator with email gate, nurturing visitors toward coaching services
- **SEO dominance:** Rank for "personal trainer [city] BC" across multiple cities by generating city pages, coach profiles, and blog content — each coach adds SEO surface area
- **Brutalist brand identity:** Establish a distinctive Raw Industrial Brutalist design that differentiates EIF from polished fitness industry competitors
- **Clean greenfield build:** Replace the legacy v1 codebase with a properly mapped, documented, and architecturally sound v2 using Next.js 16, Supabase, and Tailwind 4
- **Coach onboarding readiness:** Build the platform so new coaches can be added with just database inserts — pages, SEO, and map integration generate automatically

### 1.2 Background Context

Eccentric Iron Fitness is a BCRPA-certified personal training business based in Maple Ridge, BC, operated by Carver Lloyd. The v1 website was built iteratively during the learning process, resulting in a messy, unmaintainable codebase with legacy database tables and no clear architecture. Rather than patch the old site, the decision was made to start fresh with a greenfield v2 build — properly planned through the BMad agent sequence (UX → Architect → PM → Dev → QA → Analyst).

The v2 platform shifts from a single-trainer portfolio to a multi-coach marketplace model. Carver will onboard other trainers, each targeting different niches and geographies, which compounds SEO value while the platform handles discovery, lead capture, and CRM integration via GoHighLevel. The interactive BC map is a key differentiator — visitors find local coaches visually and are funneled into profiles and booking flows.

### 1.3 Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2026-03-15 | 1.0 | Initial PRD creation | John (PM) |
| 2026-03-15 | 1.1 | Added success metrics, out of scope, Carver online focus, GeoJSON boundaries | John (PM) |

### 1.4 Success Metrics

| Metric | Target | Timeframe |
|--------|--------|-----------|
| New client signups | 5 clients | Within 1 week of launch |
| Lead capture rate | Calculator email submissions | Ongoing — baseline established at launch |
| SEO rankings | Page 1 for "personal trainer [city] BC" (4 cities) | Within 3 months of launch |
| Organic traffic | Measurable growth from city pages + blog | Monthly tracking post-launch |

**MVP Validation:** The MVP succeeds if the site drives leads through SEO — visitors find EIF via search, land on city pages or blog posts, and convert through the calculator email gate or direct coach booking. 5 new clients within the first week of launch is the primary success indicator.

### 1.5 Out of Scope (Phase 2)

The following features are **deferred to Phase 2** and will follow the same BMad agent process (UX → Architect → PM → Dev → QA) to ensure proper mapping:

- **Coach Dashboard & Authentication** — Supabase Auth, coach self-service portal for managing profiles, availability, and content
- **Admin Dashboard** — Platform management, coach onboarding workflow, analytics
- **Payment Processing** — Stripe/payment integration for direct tier purchases
- **Coach Self-Service Onboarding** — Currently coaches are added via database insert; self-service registration is Phase 2
- **Native Mobile App** — Web responsive only for MVP
- **Analytics Dashboard** — Vercel Analytics for MVP; custom dashboard is Phase 2
- **Email Template Builder** — GHL handles nurture sequences; custom templates are Phase 2
- **Multi-Province Expansion** — BC only for MVP

### 1.6 Carver Lloyd — Launch Coach Profile

Carver's coaching is **focused on online coaching** with province-wide BC coverage. Seed data should reflect:
- `is_online: true` — primary offering, available across all of BC
- `is_in_person: false` — online-focused at launch (can be toggled later if in-person is added)
- Service areas (Maple Ridge, Langley, Coquitlam) remain in the database for city page SEO but are **not linked to Carver** as in-person areas
- Surrey remains in the database unlinked — available for future coaches

---

## 2. Requirements

### 2.1 Functional Requirements

- **FR1:** The platform shall display an interactive Google Maps view of British Columbia where visitors can click regions to discover coaches serving that area
- **FR2:** Each coach shall have a dedicated profile page (`/coaches/[slug]`) displaying their photo, bio, approach, certifications, specialties, testimonials, service tiers with pricing, and service areas
- **FR3:** The platform shall generate city/area pages (`/areas/[slug]`) automatically from the database, each showing coaches serving that area with city-specific SEO content
- **FR4:** The TDEE/Macro calculator shall compute results client-side and gate full results behind an email capture form that syncs the lead to Supabase and GoHighLevel
- **FR5:** Coach profile pages shall display service tiers with transparent pricing (no "contact for pricing"), feature lists, exclusions, and distinct CTAs per tier (purchase vs. book call)
- **FR6:** The platform shall support a blog with category filtering, SEO metadata, read time, and in-article CTAs that funnel readers to the calculator or coach directory
- **FR7:** All lead capture forms (calculator, contact, newsletter, waitlist) shall store leads in Supabase and asynchronously sync to GoHighLevel with appropriate tags
- **FR8:** The map shall distinguish between in-person and online coaches, showing service area polygons for in-person and province-wide availability for online coaches
- **FR9:** The coach directory page (`/coaches`) shall list all active coaches with filterable cards showing name, specialty, location, starting price, and photo/placeholder
- **FR10:** The contact form shall accept name, email, phone (optional), message, and optional coach association, submitting via server action to Supabase + GHL
- **FR11:** The platform shall generate a dynamic sitemap and robots.txt including all coach profiles, city pages, and published blog posts
- **FR12:** Coach profiles shall include a testimonials section with client quotes, attribution, and result summaries — with placeholder cards when no testimonials exist yet
- **FR13:** The navigation shall include a persistent "BOOK A CALL" CTA visible at all viewport sizes, including outside the mobile hamburger menu
- **FR14:** The platform shall support on-demand ISR revalidation via a secret-protected API route, allowing content updates to propagate within minutes
- **FR15:** New coaches shall be addable via database insert only — no code changes required. Profile pages, map presence, city page listings, and sitemap entries generate automatically

### 2.2 Non-Functional Requirements

- **NFR1:** All pages shall achieve Lighthouse performance score ≥ 90 with LCP < 2.5s, CLS < 0.1, and INP < 200ms
- **NFR2:** The client-side JavaScript bundle shall not exceed 200KB gzipped
- **NFR3:** The platform shall meet WCAG 2.1 AA accessibility standards including 4.5:1 contrast, keyboard navigation, and screen reader support
- **NFR4:** All database queries shall use Supabase Row Level Security — public reads for active content, service_role writes only
- **NFR5:** The site shall be fully responsive across 5 breakpoints (mobile 0-639px, mobile landscape 640-767px, tablet 768-1023px, desktop 1024-1279px, wide 1280px+)
- **NFR6:** The design shall enforce the Raw Industrial Brutalist aesthetic: zero border-radius, 3px thick borders, offset shadows (4px 4px 0px #000), monospace accents, uppercase headings, no gradients
- **NFR7:** Static pages shall use ISR with 1-hour revalidation for content pages and 15-minute revalidation for coach profiles
- **NFR8:** Server actions shall never throw — all return `{ success: boolean; error?: string }` for consistent error handling
- **NFR9:** Google Maps shall load via dynamic import (`ssr: false`) to avoid blocking initial page render
- **NFR10:** All sensitive API keys (Supabase service role, GHL) shall remain server-side only — never exposed to the client bundle
- **NFR11:** The platform shall support N coaches without code changes or performance degradation (multi-tenant by design)
- **NFR12:** Font loading shall use `next/font` with `font-display: swap` to prevent FOUT and CLS

---

## 3. User Interface Design Goals

### 3.1 Overall UX Vision

The platform should feel like walking into a raw industrial gym — concrete, steel, no fluff. Every design choice prioritizes honesty, directness, and strength. Visitors understand what EIF is within 5 seconds of landing. The UI communicates "we're serious about results" through its brutalist aesthetic while remaining fully functional and accessible. This is a platform, not a portfolio — the design scales to N coaches without becoming cluttered.

### 3.2 Key Interaction Paradigms

- **Two-click discovery:** Homepage → Map or Coach Directory → Individual Coach Profile (maximum 2 clicks to reach any coach)
- **Email-gated value exchange:** Calculator delivers genuine value (TDEE/macro results) in exchange for an email — not a bait-and-switch
- **Transparent pricing:** Every tier's price, features, and exclusions visible without expanding, scrolling sideways, or clicking "contact for pricing"
- **Map-first geographic discovery:** Interactive map is the primary discovery mechanism for in-person coaching, not a filtered list
- **Deliberate navigation:** No infinite scroll, no auto-play, no parallax. Every action is intentional — click to load more, click to navigate, click to book

### 3.3 Core Screens and Views

| Screen | Purpose | Key Conversion |
|--------|---------|----------------|
| **Homepage** | Brand identity + routing to conversion paths | Map CTA, Calculator CTA |
| **Interactive Map (`/map`)** | Geographic coach discovery across BC | Click region → coach card → profile |
| **Coach Profile (`/coaches/[slug]`)** | Showcase individual coach, convert to booking | Book Discovery Call, Buy DIY Program |
| **TDEE/Macro Calculator (`/calculator`)** | Lead magnet — deliver value, capture email | Email capture → coaching upsell |
| **Blog Landing (`/blog`)** | SEO content hub, funnel to calculator/coaches | In-article and end-of-article CTAs |
| **City Page (`/areas/[slug]`)** | Local SEO landing, list coaches in area | Coach card → profile → booking |
| **Coach Directory (`/coaches`)** | Browse all coaches with filters | Coach card → profile |
| **Contact (`/contact`)** | Direct inquiry / booking form | Form submission → GHL |

### 3.4 Accessibility: WCAG 2.1 AA

- 4.5:1 contrast for body text, 3:1 for large text — all palette combinations verified
- Full keyboard navigation with 3px cyan focus indicators
- Screen reader support: `aria-label` on map regions, `aria-live` on dynamic content, semantic heading hierarchy
- 48x48px minimum touch targets with 8px gaps
- `prefers-reduced-motion` respected via Framer Motion's `useReducedMotion()`
- Map keyboard controls: arrow keys to pan, +/- to zoom, Enter to select

### 3.5 Branding

- **Design Direction:** Raw Industrial Brutalist
- **Primary Colors:** Navy `#455590` (structure), Cyan `#2DDBDB` (action), Orange `#FF6B35` (scarcity only)
- **Typography:** Space Grotesk (headings), Inter (body), JetBrains Mono (monospace accents)
- **Core Rules:** Zero border-radius, 3px borders, `4px 4px 0px #000` offset shadows, all headings uppercase, no gradients, dark backgrounds default
- **Full style guide:** See `docs/front-end-spec.md` Section 6

### 3.6 Target Devices and Platforms: Web Responsive

- Mobile-first responsive design across 5 breakpoints (0px → 1280px+)
- No native mobile app — web responsive only
- Optimized for Chrome, Safari, Firefox, Edge (latest 2 versions)
- Mobile: hamburger nav with full-screen overlay, persistent "BOOK A CALL" CTA, bottom sheet for map results
- Tablet: 4-column grid, side-by-side pricing tiers
- Desktop: 12-column grid, full map experience, hover interactions

---

## 4. Technical Assumptions

### 4.1 Repository Structure: Monorepo (Single App)

Single Next.js App Router application. No monorepo tooling (no Turborepo, no Nx). Frontend and backend co-located — server components, server actions, and API routes live in the same `src/app/` directory.

### 4.2 Service Architecture

- **Pattern:** Jamstack + Serverless (ISR + Server Actions + API Routes)
- **Hosting:** Vercel (auto-deploy from `main`, preview per PR)
- **Database:** Supabase PostgreSQL (project `wejlwvfivaiyojxcfiwa`) — clean v2 instance, no legacy tables
- **File Storage:** Supabase Storage (coach photos, blog images)
- **CRM:** GoHighLevel via webhook integration (fire-and-forget async)
- **Maps:** Google Maps JavaScript API via `@vis.gl/react-google-maps`
- **Auth:** None at launch. All pages public. Writes use service_role key. Future: Supabase Auth for `/dashboard/*`
- **No separate backend server** — Next.js handles everything

### 4.3 Testing Requirements

| Layer | Tool | Scope |
|-------|------|-------|
| Unit | Vitest | Calculator math, Zod schemas, data access layer functions |
| Component | Vitest + React Testing Library | Core UI components (CoachCard, BrutalistButton, FormField) |
| E2E | Playwright | 5 critical user flows (calculator, map, coach profile, blog funnel, contact form) |
| Type Safety | `tsc --noEmit` | Full project type check on every PR |
| Lint | ESLint 9 + eslint-config-next | Code quality on every PR |

### 4.4 Additional Technical Assumptions

- **TypeScript strict mode** — no `any`, use `unknown` and type narrow
- **Server Components by default** — only add `"use client"` when interactivity is required
- **Repository pattern** — all Supabase queries go through `src/lib/db/`
- **Server actions return objects** — `{ success: boolean; error?: string }`, never throw
- **Tailwind CSS 4** with custom config enforcing `borderRadius: 0` globally
- **`next/font`** for self-hosted fonts — no external font requests
- **`@/` path alias** for all imports
- **No UI component libraries** — all components custom-built for brutalist aesthetic
- **Zod 4** for both client and server validation
- **ISR revalidation** — 1hr static pages, 15min coach profiles, on-demand via `/api/revalidate`
- **Google Maps loaded client-side only** via `next/dynamic` with `ssr: false`
- **GHL integration is non-blocking** — if GHL API fails, lead saved to Supabase
- **Node 20+** required
- **No ORM** — Supabase client is the query layer
- **Dependencies to install:** `@vis.gl/react-google-maps`, `vitest`, `@testing-library/react`, `playwright`, `prettier`

---

## 5. Epic List

| Epic | Title | Goal |
|------|-------|------|
| 1 | Foundation, Design System & Homepage | Establish infrastructure, build brutalist components, deliver working homepage |
| 2 | Coach Platform Core | Build coach profiles, pricing, testimonials, and directory |
| 3 | Interactive Map & Geographic Discovery | Google Maps integration, service areas, city pages |
| 4 | Calculator, Lead Capture & CRM Integration | TDEE calculator, email gate, contact form, GHL sync |
| 5 | Blog, SEO & Launch Readiness | Blog system, comprehensive SEO, tests, performance, Vercel prep |

---

## 6. Epic 1: Foundation, Design System & Homepage

**Goal:** Establish the complete project foundation — database schema deployed to Supabase, Tailwind configured for brutalist design, fonts loaded, core UI components built, and a working homepage rendered on localhost. After this epic, running `npm run dev` shows the real Eccentric Iron Fitness homepage with the brutalist aesthetic, not the Next.js starter page.

### Story 1.1: Project Infrastructure & Database Schema

**As a** developer,
**I want** the project dependencies installed, Tailwind configured for brutalist design, fonts loaded, and the database schema deployed to Supabase,
**so that** all subsequent stories have a working foundation to build on.

**Acceptance Criteria:**
1. Install missing dependencies: `@vis.gl/react-google-maps`, `prettier`
2. Create `tailwind.config.ts` extending Tailwind 4 with `borderRadius: { DEFAULT: '0' }`, brand color tokens, and font family tokens
3. Update `src/app/layout.tsx` to load Space Grotesk, Inter, and JetBrains Mono via `next/font/google` with CSS variables
4. Update `globals.css` with base dark background (`#111827`), default text color (`#FFFFFF`), and zero border-radius enforcement
5. Run the full SQL schema from `docs/architecture.md` Section 9 against the Supabase project — all 7 tables with RLS policies, indexes, triggers, and seed data. Note: Carver's seed data should have `is_in_person: false` (online-focused, province-wide BC). Service areas are seeded for city page SEO but NOT linked to Carver via coach_service_areas
6. Create `src/lib/types.ts` with all 7 TypeScript interfaces from architecture doc Section 4
7. Create `.env.example` with all required environment variable keys (no values)
8. Create `supabase/migrations/001_initial_schema.sql` with the full schema for version control
9. `npm run dev` starts without errors, shows a page with correct fonts and dark background

### Story 1.2: Data Access Layer

**As a** developer,
**I want** a centralized data access layer for all Supabase queries,
**so that** no component ever calls Supabase directly and all queries are type-safe and reusable.

**Acceptance Criteria:**
1. Create `src/lib/db/coaches.ts` with: `getCoaches()`, `getCoachBySlug(slug)`, `getCoachWithRelations(slug)`
2. Create `src/lib/db/areas.ts` with: `getServiceAreas()`, `getServiceAreaBySlug(slug)`, `getCoachesByArea(areaId)`
3. Create `src/lib/db/testimonials.ts` with: `getFeaturedTestimonials()`, `getTestimonialsByCoach(coachId)`
4. Create `src/lib/db/blog.ts` with: `getBlogPosts(options?)`, `getBlogPostBySlug(slug)`
5. Create `src/lib/db/leads.ts` with: `createLead(data)`, `getLeadByEmail(email)`
6. All functions use the server-side Supabase client from `src/lib/supabase.ts`
7. All functions return typed results using interfaces from `src/lib/types.ts`
8. All functions handle errors gracefully — return `null` or empty array, never throw

### Story 1.3: Core UI Components — Buttons, Fields & Layout Primitives

**As a** visitor,
**I want** the site's interactive elements to have a consistent brutalist look and feel,
**so that** every page feels cohesive and reinforces the raw industrial brand.

**Acceptance Criteria:**
1. Create `src/components/ui/BrutalistButton.tsx` with 4 variants (primary, secondary, inverse, ghost)
2. Create `src/components/ui/FormField.tsx` with 4 variants (standard, select, toggle, search)
3. Create `src/components/ui/SectionDivider.tsx` with 4 variants (line, heavy, titled, color-break)
4. Create `src/components/ui/Tag.tsx` with 3 variants (default, filled, accent)
5. Create `src/components/layout/Container.tsx` — max-width 1280px centered wrapper
6. All components use Tailwind utilities only — no inline styles except dynamic values
7. All components are accessible — proper `role`, `aria-*`, focus indicators (3px cyan outline)
8. All components are responsive — work at all 5 breakpoints

### Story 1.4: NavBar & Footer

**As a** visitor,
**I want** persistent navigation and a site footer,
**so that** I can navigate the site and find key information from any page.

**Acceptance Criteria:**
1. Create `src/components/layout/NavBar.tsx` — desktop: logo left, links center-right, "BOOK A CALL" CTA far right
2. NavBar mobile: hamburger + persistent "BOOK A CALL" CTA + full-screen overlay with stacked nav links
3. "ECCENTRIC IRON" wordmark in monospace, links to `/`
4. Create `src/components/layout/Footer.tsx` — 3-column grid, dark background, monospace type
5. Update `src/app/layout.tsx` to include NavBar and Footer wrapping `{children}`
6. NavBar is sticky on desktop, hamburger toggle works on mobile with Framer Motion
7. Active nav link indicated with cyan underline
8. All nav links use `next/link` for client-side navigation

### Story 1.5: Homepage

**As a** visitor,
**I want** to land on a homepage that immediately tells me what Eccentric Iron Fitness is and routes me to find a coach or calculate my macros,
**so that** I understand the platform's value and take action within 5 seconds.

**Acceptance Criteria:**
1. Create `src/app/page.tsx` replacing the Next.js starter — server component fetching coaches
2. Hero section: massive brutalist typography with tagline, two primary CTAs (Find a Coach → `/map`, Calculate Macros → `/calculator`)
3. "How It Works" section: 3-step numbered process strip
4. Coach preview section: featured coach cards with photo placeholder, name, specialty, starting price
5. Full-width calculator CTA banner — cyan background block
6. All sections use `SectionDivider` between them
7. Page uses `generateMetadata()` for SEO title/description
8. Fully responsive across all 5 breakpoints
9. Page loads with correct brutalist styling

---

## 7. Epic 2: Coach Platform Core

**Goal:** Build the complete coach experience — profile pages with full details, pricing tiers, testimonials, and a coach directory. After this epic, visitors can browse all coaches, view any coach's profile with transparent pricing and testimonials, and see clear CTAs to book or purchase.

### Story 2.1: Coach Profile Page — Layout, Hero & Content

**As a** visitor,
**I want** to view a coach's profile page with their photo, name, specialty, location, bio, approach, and credentials,
**so that** I can evaluate whether this coach is a good fit for my goals.

**Acceptance Criteria:**
1. Create `src/app/coaches/[slug]/page.tsx` as a server component using `getCoachWithRelations(slug)`
2. Implement `generateStaticParams()` to pre-render all active coach slugs
3. Implement `generateMetadata()` with coach-specific SEO title and description
4. Hero section: coach photo (or navy placeholder with initials), name, specialty tagline, location badge
5. About section: coach bio in paragraphs
6. Approach section: coach approach text with brutalist section header
7. Credentials section: certifications as `Tag` components
8. Specialties as `Tag` components (filled variant)
9. Return `notFound()` if coach slug doesn't exist or is inactive
10. Fully responsive — photo stacks above name on mobile

### Story 2.2: Pricing Tiers

**As a** visitor,
**I want** to see a coach's service tiers with transparent pricing, feature lists, and clear CTAs,
**so that** I can compare options and choose the right plan without guessing at costs.

**Acceptance Criteria:**
1. Create `src/components/coach/PricingTier.tsx` with 3 variants (standard, highlighted, standalone)
2. Price formatted from `price_cents` (15000 → "$150")
3. Price type label: "one-time", "/month", or "/session"
4. Features list using `▪`, exclusions using `✗` (muted text)
5. `is_featured` tier gets highlighted variant — thicker border + cyan accent bar
6. CTA button with tier's `cta_label` and `cta_url`
7. Side-by-side desktop, stacked mobile (featured first on mobile)
8. Scarcity badge: "ONLY X FOUNDING SPOTS LEFT" if `founding_rate_remaining > 0`
9. Never hide pricing

### Story 2.3: Testimonials Section

**As a** visitor,
**I want** to read testimonials from a coach's clients,
**so that** I can see real results and build trust before committing.

**Acceptance Criteria:**
1. Create `src/components/coach/TestimonialCard.tsx` with 3 variants (full, compact, placeholder)
2. Full: quote in Inter italic, client name + location in monospace uppercase, decorative `"`, 3px cyan left border
3. Compact: short quote with name only
4. Placeholder: dashed 2px border with "TESTIMONIAL COMING SOON"
5. Testimonials section on coach profile between approach and pricing
6. Fetch via `getTestimonialsByCoach(coachId)`, sorted by `sort_order`
7. Zero testimonials → show 1 placeholder card
8. Featured testimonials render first/larger
9. Mobile: stack vertically

### Story 2.4: Coach Profile Navigation & Booking CTA

**As a** visitor,
**I want** a sticky sub-navigation on coach profiles and a clear booking section,
**so that** I can quickly jump to any section and always have a path to book.

**Acceptance Criteria:**
1. Sticky sub-nav: `About | Services | Pricing | Book` — fixed below main NavBar
2. Active section highlighted via Intersection Observer
3. Smooth-scroll on click with offset for sticky nav height
4. `"use client"` component with comment explaining why
5. Mobile: horizontal scroll, stays sticky
6. Booking section: "READY TO START?" with tier CTAs
7. Online/in-person availability badges
8. Breadcrumb: `Home > Coaches > [Coach Name]`

### Story 2.5: Coach Directory Page

**As a** visitor,
**I want** to browse all available coaches in one place,
**so that** I can compare coaches and find one that matches my goals and location.

**Acceptance Criteria:**
1. Create `src/app/coaches/page.tsx` fetching all active coaches with service areas and starting price
2. `generateMetadata()` for SEO
3. Page header: "OUR COACHES" in brutalist H1
4. `CoachCard` compact variant: photo/placeholder, name, specialty, location(s), "FROM $X", "VIEW PROFILE →"
5. Responsive grid: 2-column desktop, 1-column mobile
6. Each card links to `/coaches/[slug]`
7. Empty state fallback
8. Online/in-person badges on cards
9. First coach uses `featured` variant

---

## 8. Epic 3: Interactive Map & Geographic Discovery

**Goal:** Build the interactive Google Maps experience for BC, render service area polygons, connect map clicks to coach discovery, create city pages for local SEO, and add a mini map to coach profiles.

### Story 3.1: Google Maps Setup & BC Map View

**As a** visitor,
**I want** to see an interactive map of British Columbia on the map page,
**so that** I can visually explore where coaches are available.

**Acceptance Criteria:**
1. Install `@vis.gl/react-google-maps` dependency
2. Create `src/app/map/page.tsx` with `generateMetadata()`
3. Create `src/components/map/MapView.tsx` as `"use client"` — document why
4. Load via `next/dynamic` with `ssr: false`
5. Center on BC (lat: 53.7, lng: -127.6, zoom: 5)
6. Dark/brutalist map styling
7. Page header: "FIND A COACH" in H1
8. Full-width desktop, 50% viewport mobile
9. Graceful load failure → fallback link to `/coaches`
10. Uses `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`

### Story 3.2: Service Area Polygons & Map Legend

**As a** visitor,
**I want** to see highlighted regions showing where coaches offer in-person training,
**so that** I can quickly identify if a coach is available near me.

**Acceptance Criteria:**
1. Research actual municipal boundary GeoJSON data for BC cities (Maple Ridge, Langley, Coquitlam, Surrey) from open data sources (BC Data Catalogue, Statistics Canada census boundaries, OpenStreetMap) and populate `boundary_geojson` in the service_areas table
2. Fetch service areas with `boundary_geojson` via `getServiceAreas()`
3. Render GeoJSON polygons on the map using the real municipal boundary lines — cyan fill 30% opacity, 2px cyan border
4. For service areas without GeoJSON boundaries yet, fall back to square markers at lat/lng
5. Create `MapLegend.tsx` — filter toggles: In-Person, Online, Both
6. Legend uses `Tag` components with toggle behavior
7. Hover polygon → 50% opacity + area name tooltip
8. Polygons associated with service area data for click handling
9. Online-only coaches (like Carver) get province-wide "AVAILABLE ACROSS BC" label, not a polygon

### Story 3.3: Map Interaction & Coach Discovery Panel

**As a** visitor,
**I want** to click a region and see which coaches serve that area,
**so that** I can quickly find and choose a local trainer.

**Acceptance Criteria:**
1. Click polygon/marker → zoom to region (500ms ease-in-out)
2. Create `MapCoachPanel.tsx` — `CoachCard` compact variants for selected area
3. Desktop: panel below map
4. Mobile: slide-up bottom sheet (Framer Motion, 300ms)
5. Create `MapSearch.tsx` — city search with Google Places Autocomplete
6. Search selects matching service area
7. No coaches → fallback messaging + online coaching redirect
8. Cards link to `/coaches/[slug]`
9. Clicking different region resets panel
10. "Apply to Coach" CTA at bottom

### Story 3.4: City/Area Pages with Local SEO

**As a** visitor arriving from Google,
**I want** a dedicated city page showing coaches in my area,
**so that** I immediately see relevant local options.

**Acceptance Criteria:**
1. Create `src/app/areas/[slug]/page.tsx`
2. `generateStaticParams()` for all active service area slugs
3. `generateMetadata()` using service area's `seo_title` and `seo_description`
4. Fetch via `getServiceAreaBySlug(slug)`
5. Header: "PERSONAL TRAINING IN [CITY]"
6. City content from `content` field
7. Coach cards for the area
8. No in-person → show online coaches with messaging
9. Map snippet showing city location
10. "VIEW FULL MAP →" link
11. Breadcrumb: `Home > Areas > [City]`
12. `notFound()` for invalid slugs
13. JSON-LD `LocalBusiness` structured data

### Story 3.5: Coach Profile Mini Map

**As a** visitor viewing a coach's profile,
**I want** a small map showing the areas they serve,
**so that** I can confirm they're available in my location.

**Acceptance Criteria:**
1. `MapContainer` snippet variant — 300px height, non-interactive
2. Render coach's service area polygons/markers
3. Auto-zoom to fit all service areas
4. Online-only → "AVAILABLE ONLINE PROVINCE-WIDE" text block instead
5. Click → links to `/map`
6. Add to coach profile between testimonials and pricing
7. Dynamic import — no performance impact
8. Mobile: full width, 200px height

---

## 9. Epic 4: Calculator, Lead Capture & CRM Integration

**Goal:** Build the TDEE/Macro calculator, email capture system, contact form, and GoHighLevel CRM sync. This is the conversion and revenue engine.

### Story 4.1: TDEE/Macro Calculator Engine & Form

**As a** visitor,
**I want** to enter my stats and calculate my TDEE and macro targets,
**so that** I get actionable nutrition numbers for my goals.

**Acceptance Criteria:**
1. Create `src/app/calculator/page.tsx` with `generateMetadata()`
2. Create `src/components/calculator/CalculatorForm.tsx` as `"use client"`
3. Inputs: age, weight, height, gender toggle, activity level (5 options), goal (fat loss/maintenance/lean bulk)
4. Unit toggle (metric/imperial) using `FormField` toggle variant
5. All inputs use `FormField` with brutalist styling
6. Create `src/lib/calculator.ts`: `calculateTDEE(stats)`, `calculateMacros(tdee, goal)`
7. TDEE: Mifflin-St Jeor × activity multiplier
8. Macros: protein 1g/lb bodyweight, fat 25% calories, carbs remainder
9. Zod schema `calculatorSchema` for validation
10. Inline validation errors in monospace red
11. "CALCULATE" CTA — full-width, cyan

### Story 4.2: Email Gate & Lead Capture

**As a** site owner,
**I want** visitors to provide their email before seeing full results,
**so that** I capture leads while delivering genuine value.

**Acceptance Criteria:**
1. Create `src/components/ui/EmailCapture.tsx` with 3 variants (modal, inline, banner)
2. Modal: dark overlay 80%, single email field, "UNLOCK YOUR RESULTS", not closable by clicking outside
3. Inline: horizontal email + submit for blog/footer
4. Banner: full-width cyan block with email field
5. Email gate modal appears after "CALCULATE" click
6. Server action `captureCalculatorLead(data)` — validate, insert/update lead in Supabase
7. Success → close modal, reveal results
8. Skip path: partial results with blur + "UNLOCK FULL RESULTS WITH EMAIL"
9. Existing email → update, don't duplicate
10. Client-side email format validation

### Story 4.3: Calculator Results & Coaching Upsell

**As a** visitor who calculated their macros,
**I want** clear results with a coaching recommendation,
**so that** I understand my numbers and know the next step.

**Acceptance Criteria:**
1. Create `src/components/calculator/CalculatorResults.tsx` as `"use client"`
2. TDEE as large number (3rem desktop, 2rem mobile)
3. Create `MacroBar.tsx` — horizontal bars for protein/carbs/fat with gram + percentage labels
4. Macro bars animate 0% → target% (600ms staggered ease-out)
5. Color: protein = cyan, carbs = navy, fat = muted
6. "Cook → Measure → Eat" framework explanation below
7. Coaching upsell: "WANT EXPERT GUIDANCE?" with two `PricingTier` standalone variants
8. "Browse All Coaches →" link to `/coaches`
9. `SectionDivider` color-break between form and results
10. Respect `prefers-reduced-motion`

### Story 4.4: Contact Form

**As a** visitor,
**I want** to submit a contact inquiry,
**so that** I can ask questions or request a discovery call.

**Acceptance Criteria:**
1. Create `src/app/contact/page.tsx` with `generateMetadata()`
2. Header: "GET IN TOUCH" in H1
3. Fields: name, email, phone (optional), message, coach dropdown (optional)
4. All fields use `FormField` component
5. Zod `contactFormSchema` for validation
6. Server action `submitContactForm(data)` — validate, create lead with source `'contact_form'`
7. Success: form replaced with "MESSAGE SENT" confirmation
8. Error: inline error, form preserved
9. Contact info block from `siteConfig`
10. Fully responsive

### Story 4.5: GoHighLevel CRM Integration

**As a** site owner,
**I want** all leads to sync to GoHighLevel automatically,
**so that** leads enter my CRM and nurture sequences.

**Acceptance Criteria:**
1. Create `src/lib/integrations/ghl.ts`: `createOrUpdateContact(data)`, `addTagToContact(contactId, tag)`
2. Server-side only — `GHL_API_KEY` and `GHL_LOCATION_ID` from env
3. Calculator leads → GHL with tags: `["calculator", "website-lead", goal]`
4. Contact form → GHL with tags: `["contact-form", "website-lead"]`
5. Fire-and-forget: never block user response
6. GHL failure → `console.error`, user sees success, lead safe in Supabase
7. Existing contact → update with new tags, don't duplicate
8. Store `ghl_contact_id` in leads table
9. Webhook URL prepared but not actively called
10. Structured for future rate limit handling

---

## 10. Epic 5: Blog, SEO & Launch Readiness

**Goal:** Build the blog system, implement SEO infrastructure, add remaining pages, write E2E tests, audit performance, and prepare for Vercel deployment. After this epic, the site is complete and ready to go live.

### Story 5.1: Blog Landing Page & Components

**As a** visitor,
**I want** to browse fitness and nutrition articles by category,
**so that** I can find educational content relevant to my goals.

**Acceptance Criteria:**
1. Create `src/app/blog/page.tsx` with `generateMetadata()`
2. Create `BlogCard.tsx` — image/placeholder, title, date, read time, category tag, excerpt
3. Create `CategoryFilter.tsx` as `"use client"` — scrollable tag bar: All, Fat Loss, Nutrition, Training, Lifestyle
4. Category filter updates URL params, filters client-side
5. Featured post: first/newest with larger layout
6. Grid: 2-column desktop, 1-column mobile
7. "LOAD MORE" button (not infinite scroll)
8. Cards link to `/blog/[slug]`
9. Empty state: "CONTENT COMING SOON"

### Story 5.2: Blog Post Pages & In-Article CTAs

**As a** visitor reading a blog post,
**I want** the full article with clear next-step CTAs,
**so that** I'm guided toward the calculator or a coach.

**Acceptance Criteria:**
1. Create `src/app/blog/[slug]/page.tsx` with `generateStaticParams()` and `generateMetadata()`
2. Header: title, author linking to profile, date, read time, category tag
3. Content rendered with markdown formatting support
4. Create `BlogCTA.tsx` — mid-article (compact) and end-of-article (full-width block with 3 CTAs)
5. Mid-article CTA after 3rd paragraph
6. End-of-article: Calculator, Find a Coach, Book a Call
7. Breadcrumb: `Home > Blog > [Title]`
8. `notFound()` for invalid/unpublished slugs
9. Author section: `CoachCard` minimal variant

### Story 5.3: SEO Infrastructure

**As a** site owner,
**I want** comprehensive SEO across every page,
**so that** search engines properly index and rank all content.

**Acceptance Criteria:**
1. Create `src/app/sitemap.ts` — static pages, coach profiles, city pages, blog posts
2. Create `src/app/robots.ts` — allow all, reference sitemap, disallow `/api/`
3. Create `JsonLd.tsx` — renders structured data in `<head>`
4. `Organization` JSON-LD on root layout
5. `LocalBusiness` JSON-LD on city pages
6. `Person` JSON-LD on coach profiles
7. `BlogPosting` JSON-LD on blog posts
8. All pages have unique `<title>` and `<meta description>`
9. Open Graph meta tags on all page types
10. Canonical URLs to prevent duplicate content

### Story 5.4: Static Pages & Error Handling

**As a** visitor,
**I want** the site to handle all edge cases with proper pages,
**so that** I never hit a dead end.

**Acceptance Criteria:**
1. Create `/services` page — platform overview, linking to coach profiles
2. Create `/privacy` page — placeholder privacy policy
3. Create `/terms` page — placeholder terms of service
4. Create `not-found.tsx` — custom 404 with brutalist styling and navigation links
5. Create `error.tsx` — `"use client"` error boundary with retry button
6. Remove default Next.js starter files
7. Update `siteConfig.ts` nav with final routes
8. Verify all Footer links point to live pages
9. All pages responsive and brutalist

### Story 5.5: E2E Tests & CI Pipeline

**As a** developer,
**I want** automated tests and a CI pipeline,
**so that** regressions are caught before production.

**Acceptance Criteria:**
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

### Story 5.6: Performance Audit & Vercel Deployment

**As a** site owner,
**I want** the site to meet performance targets and be ready for Vercel,
**so that** it loads fast and ranks well.

**Acceptance Criteria:**
1. Bundle audit — client JS < 200KB gzipped
2. Verify `next/font` — no external requests, no FOUT
3. Verify `next/image` usage — srcset, dimensions, lazy loading
4. Verify Google Maps dynamic import
5. Create `/api/revalidate` route — secret-protected ISR revalidation
6. Add `REVALIDATION_SECRET` to `.env.example`
7. Lighthouse ≥ 90 on homepage, coach profile, calculator, map
8. Fix any Lighthouse issues
9. Final `.env.example` with documented variables
10. Document Vercel deployment steps
11. `npm run build` completes without errors
