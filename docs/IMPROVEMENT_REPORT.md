# UI/UX, Security, Performance & Code-Quality Report

Branch: `dev` · Date: 2026-11-03 · Stack: Next.js (App Router) + MongoDB/Mongoose + Cloudinary + Nodemailer

This pass improved the existing application without adding product features. Where an
existing behaviour was clearly broken (a control that did nothing, an endpoint the UI
called that did not exist), it was repaired and is listed under **Defects fixed** so it
can be reviewed explicitly.

All verification was run locally against an in-memory MongoDB with test data. Nothing
was run against production, and no real credentials were used.

---

## B. Security audit

The repo contains both the frontend and the backend (Next.js API routes), so backend
findings inside this repo were fixed; infrastructure-level items are listed as
recommendations.

### Findings

| ID | Severity | Finding | Where | Status |
|----|----------|---------|-------|--------|
| C1 | **Critical** | **No authentication on admin APIs.** Middleware only matched `/admin/*` pages. Anyone could `GET` all volunteers, assistance applications (name, CNIC, phone, address, document URLs), newsletter emails and donation records, and `POST/PATCH/PUT/DELETE` events, team, media, donations, volunteers and applications. | `middleware.ts`, `app/api/**` | **Fixed** — middleware now covers `/api/*` with an explicit allow-list of public method+path pairs; everything else requires a valid admin JWT. |
| C2 | **Critical** | Next.js 15.2.4: middleware authorization bypass via `x-middleware-subrequest` (CVE-2025-29927), React Server Components RCE, and several moderate issues. With C1 fixed via middleware, the bypass would have re-opened it. | `package.json` | **Fixed** — upgraded to 15.5.28 (same major). Bypass header verified to return 401. |
| C3 | **Critical** | JWT signed/verified with fallback secret `'changeme'` when `JWT_SECRET` is unset, allowing token forgery. | login/settings routes, middleware | **Fixed** — `lib/auth.ts` fails closed in production when `JWT_SECRET` is missing (dev keeps the fallback). Forged `changeme` token rejected; HS256 enforced (`alg:none` rejected). |
| H1 | High | Application documents (CNIC scans etc.) listable by anyone via `GET /api/media?folder=applications` or `GET /api/media` (no folder). | `app/api/media/route.ts` | **Fixed** — anonymous callers get 401 for private folders and the unfiltered listing excludes them. |
| H2 | High | Anonymous uploads to any media folder and anonymous "add video by URL" (gallery defacement, storage abuse). | `app/api/media/upload/route.ts` | **Fixed** — anonymous uploads only to `applications`, images/PDF only, ≤10 MB each, ≤10 files, rate-limited. Video URLs must be `http(s)`. |
| H3 | High | Logout did not log out: it removed an unused `localStorage` key while the httpOnly cookie stayed valid for 7 days. | `components/layout/admin-header.tsx` | **Fixed** — new `POST /api/admin/logout` clears the cookie; verified the session is rejected afterwards. |
| M1 | Medium | HTML injection in contact-form emails (admin inbox and the auto-reply sent to any address — a phishing relay). No input validation. | `lib/emailTemplates/contact.ts`, `app/api/contact/route.ts` | **Fixed** — HTML escaping, header-safe display names/subjects, field validation and length caps, 5 requests / 10 min per IP. |
| M2 | Medium | User search text passed raw into MongoDB `$regex` (regex injection / ReDoS); unbounded `limit`. | `lib/utils/crudHandlers.ts`, list routes | **Fixed** — regex escaped, `page`/`limit` clamped (max 100), search length capped. Donations `sortBy` restricted to field-name characters. |
| M3 | Medium | No brute-force protection on admin login. | `app/api/admin/login/route.ts` | **Partially fixed** — 10 attempts / 15 min per IP (in-memory, per instance). See remaining items. |
| M4 | Medium | No security headers. | `next.config.mjs` | **Fixed** — CSP, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, HSTS (production), `X-Powered-By` removed, `Cache-Control: no-store` on `/api`. |
| M5 | Medium | Internal error messages (`error.message`) returned to clients on 500s. | several routes | **Fixed** — generic messages to clients, details logged server-side. |
| M6 | Medium | PII written to server logs (`console.log` of volunteer and donation payloads). | volunteer/donations routes, volunteer page | **Fixed** — removed. |
| L1 | Low | Login compared email case-sensitively while the schema stores it lowercased, so mixed-case input could never log in. | login route | **Fixed** — normalised. |
| L2 | Low | Admin login page indexable by search engines. | `app/admin/login/layout.tsx` | **Fixed** — `noindex` (robots.txt already disallowed `/admin/`). |

### Security test results (production build, local)

`45 / 45` automated checks passed (script: anonymous vs. admin access to every admin
endpoint, forged / `alg:none` tokens, CVE-2025-29927 header, public flows still working,
upload restrictions, regex input, limit clamping, login/logout, headers). Rate limits
verified: 11th failed login → `429`; 6th contact submission → `429`.

### Remaining risks (not changed — need a decision or infrastructure)

| Severity | Item | Recommendation |
|----------|------|----------------|
| High | **Admin bootstrap:** if the `Admin` collection is empty, the first login *creates* an admin with whatever credentials are submitted. Every login also deletes all but one admin. This is existing business logic and was preserved. | Seed the admin from env/CLI once, then remove the auto-create path. |
| Medium | `POST /api/donations` is public and stores whatever is submitted (no payment verification), so donation records can be fabricated. | Create donation records from a payment-provider webhook, or mark client-submitted records as unverified. |
| Medium | Stateless 7-day JWT: changing the password does not revoke existing sessions. | Add a token version/`passwordChangedAt` check, or shorten lifetime. |
| Medium | Rate limiting is in-memory per server instance and keys on `X-Forwarded-For`. On serverless it is best-effort; a client that can set XFF directly can rotate it. | Add an edge/WAF rate limit (e.g. Vercel Firewall, Upstash). |
| Medium | Application documents are stored as public Cloudinary assets (unguessable URLs, but public). | Use Cloudinary `authenticated`/`private` delivery with signed URLs. |
| Low | CSP allows `'unsafe-inline'` scripts (required by Next.js without a nonce setup). | Move to nonce-based CSP in middleware. |
| Low | No CSRF token. Mitigated by `SameSite=Lax` cookies and JSON request bodies. | Optional: double-submit token or `Origin` check on mutating routes. |
| Info | Admin `PATCH` routes pass the body to `findByIdAndUpdate` (schema-strict, admin-only now). | Whitelist updatable fields per model. |

### Dependency audit (SCA)

| | Before | After |
|---|---|---|
| `npm audit` total | 25 | 16 |
| Critical | 2 | 0 |
| High | 17 | 2 |

Remaining: `nodemailer` (fix requires a new major, v8+; affected features — envelope size,
List-* headers, transport name — are not used here), Next's *build-time* bundled
`postcss`, and ESLint tooling (`minimatch`/`glob`, dev-only). `recharts` and `next-themes`
were pinned from `"latest"` to their installed majors to avoid surprise breaking upgrades.

---

## A. UI/UX improvements

**Design system** (`app/globals.css`, `tailwind.config.ts`)
- Tokens rebuilt for WCAG AA: primary teal darkened (white-on-primary contrast 3.06 → 4.89:1); dark-mode primary now uses dark text (was 2.66:1 white-on-teal, now 10.3:1); muted text 5.15:1.
- Dark theme gets real elevation (cards/popovers lighter than the page), semantic `success / warning / info` tokens, 10 px base radius, global `:focus-visible` ring, `prefers-reduced-motion` support, responsive container padding (1 rem on phones instead of 2 rem).
- Removed ~15 unused component classes and the duplicate `styles/globals.css`.

**Shared components**
- Button, Input, Select, Textarea, Checkbox, Card, Badge, Dialog, AlertDialog, Sheet, Table refreshed with consistent heights, radii, borders and focus states.
- New: `StatusBadge` (one status → colour mapping), `TablePagination`, `SearchInput` (labelled search with icon), `admin-nav.ts` (single source for nav + page titles).
- Dialogs now fit phones (`calc(100% - 2rem)`, max height + scroll); side sheets cap at viewport width.
- Toasts (`AlertMessage`) are solid, announced to screen readers, and no longer reset their dismiss timer on every parent render.
- Empty states and form errors redesigned; form errors linked to inputs (`aria-invalid`, `aria-describedby`, `role="alert"`).

**Admin console**
- New shell: fixed grouped sidebar (Overview / Content / Records), accessible mobile drawer (focus-trapped Radix sheet), sticky header with breadcrumb, theme toggle, keyboard-accessible account menu, skip-link.
- Consistent page headers across Dashboard, Volunteers, Applications, Donations, Team, Events, Media, Newsletter and Settings.
- Tables: muted header row, tighter rows, keyboard-operable sort buttons with icons, tinted status badges, unified pagination with page count.
- Dashboard re-laid out (stats row, trends + top donors, breakdowns + activity); charts load lazily.
- Login and Settings redesigned (accessible show/hide password, autocomplete hints, left-aligned settings form).

**Public site**
- Header: full navigation from `lg` (it was cramped at 768–1023 px), active-link state, no staggered entrance animation, "Donate" visible on tablets, mobile menu with active state and real organisation name (was "Your Organization").
- Hardcoded `text-white` on primary and `from-primary to-secondary` gradients replaced with tokens (unreadable in dark mode / on the light end of the gradient).
- Floating Zakat button smaller on phones.

**Responsive** — automated overflow audit of 30 routes at 320/360/375/390/430/768/1024/1280/1440/1920 px: 0 overflow cases after fixes (see section E).

**Accessibility** — skip link, landmark labels, `aria-current` on nav, labelled icon buttons and search fields, keyboard-operable sort headers and tooltips, unique checkbox ids on the volunteer form, single `<h1>` per page (the home page embedded the Departments page's `<h1>`; the brand mark in the header was also an `<h1>`), form errors announced, reduced-motion support.

---

## C. Performance

Measured with `next build` on the original commit (with only the one-line fix needed for it to compile) vs. this branch:

| Route | First-load JS before | After |
|---|---|---|
| `/admin/dashboard` | 229 kB | **117 kB** (−49%, charts lazy-loaded) |
| Other routes | 101–180 kB | +1–4 kB each (Next 15.2 → 15.5 framework chunk: shared JS 101 → 103 kB) |

- `/services` hero image: 3.5 MB PNG → 396 KB JPEG (same 1600 px display size).
- Donations admin search debounced (previously one request per keystroke).
- Removed 25 unused dependencies. They were already tree-shaken out of the client bundles, so this reduces install size and attack surface rather than bundle size.
- Lighthouse was not available in this environment; no Lighthouse scores are claimed.

---

## D. Codebase cleanup

- Deleted 37 unused source files: 21 unused UI primitives (incl. the custom sidebar context), 5 legacy section components, 5 unused feature/shared components, 3 unused service modules, 2 unused constants files and the duplicate `styles/globals.css`.
- Removed unused dependencies: 13 Radix packages, `cmdk`, `input-otp`, `vaul`, `react-datepicker`, `react-resizable-panels`, `jspdf`, `jspdf-autotable`, `jsonwebtoken` (auth now uses `jose` only) and their `@types`. Declared the previously-implicit `@radix-ui/react-visually-hidden`.
- Unreachable `GET_TOP_DONORS` / `GET_ANALYTICS` exports removed from the donations route (not valid route handlers; they also blocked type-checked builds).
- Centralised auth (`lib/auth.ts`), rate limiting (`lib/rate-limit.ts`), pagination parsing (`parsePagination`).
- TypeScript: 8 errors → 0; **production builds now type-check** (`ignoreBuildErrors` turned off). Next 15 async route `params` adopted.
- ESLint: config now ignores `.next/` (baseline reported 4,368 errors, mostly build output); source errors 157 → 72. Remaining: 68 `no-explicit-any`, 4 unused drag-and-drop symbols (see outstanding).
- Silent `catch` blocks in API routes now log server-side.

### Defects fixed (existing behaviour that was broken)

1. Production build failed: `events/page.tsx` exported `metadata` above `"use client"`.
2. All `page.metadata.ts` files were ignored by Next.js, so page titles/descriptions never applied; now wired through route layouts (and the duplicated title suffix avoided).
3. Applications bulk delete called a non-existent `/api/application/:id` and still showed "deleted successfully".
4. Donations bulk delete called `DELETE /api/donations`, which did not exist (405).
5. Donation search queried the `donor` sub-document as a string and never matched names.
6. Newsletter admin list was always empty (hook read `data` instead of `emails`).
7. Column sorting in admin tables was unreachable (`handleSort` only set when a sort already existed).
8. Admin Events and Team only ever showed the first 10 items (no pagination UI).
9. Team grid/list toggle did nothing.
10. Theme toggle needed two clicks for users whose OS is in dark mode (`theme` vs `resolvedTheme`).
11. Team create/reorder and event `PUT` queried MongoDB outside the connection helper.
12. Search did not reset to page 1.
13. Broken images: mobile hero (`welfare-work-mobile.jpg`), Open Graph/JSON-LD logo (`smw-logo-transparent.png`), `education-program.webp`.
14. "Join Our Mission" was a `<button>` with no action; it now links to `/volunteer`.
15. `RadioGroupItem` ignored its `className` prop.
16. Volunteer-form interest checkboxes all shared one DOM id, so only the first label was clickable.
17. Committed `package-lock.json` was out of sync with `package.json` (`npm ci` failed).

---

## E. Regression testing

| Test | Result |
|---|---|
| TypeScript (`tsc --noEmit`) | **Pass** (0 errors; baseline 8) |
| ESLint | **Fail** — 72 errors (baseline 157 in source): 68 `no-explicit-any`, 4 unused |
| Unit tests | **N/A** — the project has no test suite |
| Integration tests | **N/A** — none exist; replaced by the scripted API checks below |
| E2E tests | **N/A** — none exist; key flows exercised manually in the browser |
| Production build (type-checked) | **Pass** (baseline: **Fail**) |
| Security checks (scripted, 45) | **Pass** — 45/45 on the production build |
| Responsive (30 routes × 10 widths) | **Pass** — 0 horizontal-overflow cases in 300 checks (before fixes: `/services` tabs and `/admin/media` toolbar overflowed at 320–430 px) |
| Accessibility (automated structural scan) | **Pass** — 0 issues on 30 routes (one `<h1>` per page, image alts, named controls, labelled inputs, unique ids). Before fixes: 7 issues on 6 routes. Colour contrast checked by calculation for the token pairs. Not a full WCAG audit — screen-reader and keyboard walkthroughs still recommended. |
| Performance | Dashboard JS −49%; other routes +1–4 kB (framework upgrade) |

Manually exercised: admin login (incl. mixed-case email), logout, all admin pages at
375 / 800 / 1280 / 1440 px, dark mode, public home / donate / services, newsletter
subscribe, volunteer and application submission (API), donor search.

---

## F. Outstanding issues

- **Dashboard figures are placeholders.** Summary stats, Top Donors and Recent Activity are hardcoded in `app/admin/dashboard/page.tsx` (pre-existing). They are now labelled "Sample data" so they are not mistaken for real records. The Donation Trends chart reads fields that donation records do not have, so it shows "No data". Wiring real analytics is a feature decision.
- Team drag-and-drop reordering is implemented (`handleDragEnd`) but never rendered.
- Admin Events has an edit handler but no edit control in the UI.
- Missing image assets still referenced: `garden-project.jpg`, `youth-mentorship.jpg`, `senior-services.jpg`, `health-services.jpg`, `our-story.jpg`, `placeholder-image.svg`, `placeholder-video.svg`.
- Cloudinary clean-up: team/event deletes pass the image URL instead of the `public_id`, and media bulk delete never removes Cloudinary files, so assets are orphaned.
- `images.unoptimized: true` — enabling Next image optimisation needs `remotePatterns` for every image host in use.
- 68 `any` types remain (mostly form and Mongoose handler typing).
- No automated test suite; adding API tests around `middleware.ts` access rules is the highest-value next step.
- Security items listed under "Remaining risks" above.

**Manual verification still needed:** real SMTP delivery for the contact form, real Cloudinary uploads (local tests used a dummy account), and the deployed security headers on the hosting platform.

---

## H. Public website redesign (second pass)

**Design language**
- Display typeface for headings (Plus Jakarta Sans, self-hosted via `next/font`, 3 weights) with Inter for body text.
- Brand teal kept; added a deep "ink" tone for feature bands (Gaza appeal, footer, contact card, stories) and a warm gold accent for key calls to action. Contrast: gold/ink 6.1:1 (light) and 9.4:1 (dark); muted text on ink 8.2:1.
- Shared building blocks: `components/site/section.tsx` (`Section`, `SectionHeader` with eyebrow/title/description) and a new `PageHeader` hero used on every inner page; large rounded cards, consistent spacing, CSS-only fade-in (respects reduced motion).

**Pages redesigned**: Home (hero, departments, Gaza appeal, goal tracker, events, stories, impact, get-involved paths, newsletter), header, footer, Donate, Bank Details, Volunteer, Apply, About, Services, Media, Events, Contact, FAQ, Zakat calculator, Privacy/Terms/Accessibility, and the four program pages.

**Content changes requested by the owner**
- Gaza section: all price lists (survival packages, community support, "how your donation helps" amounts) removed. The section is now a Gaza donation appeal whose button opens `/donate?fund=gaza-relief` with the Gaza Relief Fund preselected.

**Fixes found during the redesign**
- Donate page now honours `?fund=`/`?type=` and `?amount=` — the Zakat calculator's "Pay Zakat Now" link already sent these but they were ignored.
- Donation receipt showed a random transaction ID instead of the one actually saved; it now shows the submitted ID.
- "More ways to support" on Donate linked to `/support/*` pages that do not exist; now link to Bank Details, Contact and Volunteer. "Credit/Debit Card" option renamed "Donate online" (the form does not take card payments).
- About page: "Learn more", "Donate Now" and "Contact Us" buttons had no links; the missing `our-story.jpg` replaced with an existing photo.
- Services: "Service highlights" carousel used three images that do not exist (now text cards); Health tab image was missing (now the medical-camp photo).
- Footer linked to a non-existent `/projects` page and four `#` social links; now lists real pages and the Facebook page already referenced in the site's structured data.
- Volunteer form fields were intended to sit in two columns but never did (missing `grid`).
- Privacy/Terms/Accessibility used Tailwind `prose` classes without the typography plugin, so they were unstyled.
- FAQ placed `<h2>` elements inside accordion buttons (invalid HTML).
- Media gallery pagination could render a "page 0" button.
- Home page showed the Departments page's `<h1>`; testimonials used placeholder avatar images.

**Performance** (first-load JS, production build)

| Route | Original | Now |
|---|---|---|
| `/` | 170 kB | **137 kB** |
| `/about` | 165 kB | **126 kB** |
| `/media` | 180 kB | **142 kB** |
| `/departments` | 149 kB | **106 kB** |
| `/services` | 133 kB | **124 kB** |
| Other public pages | 101–156 kB | within ±5 kB |

Removed `framer-motion` and `embla-carousel-react` entirely; home, about, services and departments sections are now server-rendered. Images use responsive `sizes`.

**Still to provide (content, not code)**: real phone numbers (Contact shows +1 (123) 456-7890, footer +92 123 456 7890, Bank Details +92 300 1234567 — all look like placeholders), real bank/EasyPaisa details if the shown ones are samples, and photos for the Services highlights and team members.

---

## G. Changed files

**New:** `lib/auth.ts`, `lib/rate-limit.ts`, `app/api/admin/logout/route.ts`, `components/layout/admin-nav.ts`, `components/shared/{StatusBadge,TablePagination,SearchInput}.tsx`, `components/departments/DepartmentsSection.tsx`, 13 route `layout.tsx` files under `app/(website)/*`, `public/images/community.jpg`, this report.

**Configuration:** `middleware.ts` (API protection), `next.config.mjs` (security headers, type-checked builds, no `X-Powered-By`), `eslint.config.mjs` (ignore build output, Node globals for config files), `tailwind.config.ts` (tokens, container padding, `lib/` in content), `package.json` / lockfile (upgrades, removals, `lint`/`typecheck` scripts).

**Deleted:** 37 unused source files (listed in section D) and `public/images/community.png` (replaced by the JPEG).

**Modified:** all API routes; admin layout, header, sidebar and every admin page; shared UI primitives; public header, home, services, about and page-header usages; hooks `useNewsletter`.
