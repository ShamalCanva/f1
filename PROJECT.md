# F1 Live Dashboard — Project Reference

**This document is the single source of truth for the project’s intent and universal truths. Use it to align decisions and to onboard contributors.**

---

## Intent

- **What we’re building**: An F1 live dashboard for die-hard fans: immersive, data-rich, and intuitive. Every nuance of the race should be visible and actionable.
- **Audience**: Die-hard F1 fans who care about timing, strategy, and context.
- **Design north star**: Modern, Jony Ive–inspired aesthetic — sleek minimalism, fine craftsmanship, subtle detail. Data should feel beautiful and purposeful, not decorative.

---

## Universal Truths

### Design

- **Colour discipline**: 80–90% of the UI is black/grey. The remaining 10–20% is text and minimal colour accents. Colour always communicates data state; avoid decorative colour.
- **Surfaces**: Three near-black layers — canvas `#050607`, cards `#0A0C0E`, raised `#0F1215`. Hairlines `rgba(255,255,255,0.08)`, stronger strokes `rgba(255,255,255,0.14)`.
- **Primary accent**: `#e26033` — highlights, selected items, CTAs, primary gauge arcs only.
- **Semantic colours**: Green `#3BE37A` (positive), Yellow `#F6C945` (warnings), Red `#FF4D4D` (errors/penalties). Use sparingly and only for meaning.
- **Typography**: Neutral sans-serif (e.g. Inter or SF Pro), tabular numerals, clear hierarchy. Display numerals 48–72px/600; headings 24–28px/600; body 13–14px/500; meta 11–12px/500.
- **Motion**: Short, smooth (200ms hover/press, 300–450ms page/panel). Card hover: 1px lift and slightly brighter stroke. Data changes: cross-fade, not hard jumps.

### Product

- **Weekend hub**: Each race has one hub. Content adapts by **state** (upcoming / live / completed) and **session type** (Qualifying, Sprint Quali, Sprint, Race).
- **Dates and times**: All dates and times respect the user’s locale and timezone. Auto-detect by default; provide a timezone (and optional format) selector. Persist preference (e.g. localStorage). Use one central formatting module and `Intl` APIs everywhere.

### Tech

- **Stack**: Next.js (App Router), TypeScript, TailwindCSS with custom design tokens. OpenF1 API for data; Redis for caching; optional Ably/Pusher for live push.
- **Layout**: 12-column fluid grid. On small screens, collapse into tabs (e.g. Timing, Track, Strategy, Feed).
- **Data**: Normalise API data into shared types. Server components / API routes for fetch; client components only where needed (live updates, interactivity).

### Accessibility and inclusivity

- Alt text for images and charts; high-contrast option; full keyboard navigation.
- Never rely on colour alone for key cues — use icons/labels so the experience is colour-blind friendly.

---

## Feature Overview (for reference)

- **Navigation**: Collapsible left sidebar — season races (with icons/flags), Constructors Standings, Drivers Standings. Selected item in accent.
- **Home**: Upcoming / live / past sessions, statuses, global stats, headlines or records.
- **Standings**: Sortable, filterable constructors and drivers tables; hover for form and reliability.
- **Weekend hub — Upcoming**: Track profile and map, stats/records, predictions, weather.
- **Weekend hub — Live**: Live timing board, track map and battle radar, strategy/undercut, weather and control feed, insights (and optional AI summaries).
- **Weekend hub — Qualifying / Sprint Quali**: Cut-line, sector/lap charts, tyre and run management, traffic/tow.
- **Weekend hub — Post-session**: Results, position and stint charts, driver head-to-head, narrative and replay (AI + scrubber as enhancement).

---

## Out of scope (until explicitly added)

- AI narrative generation (can be stubbed).
- Telemetry replay backend (scrubber can be UI-only first).
- Real weather/predictions APIs (placeholders OK).
- Ably/Pusher required (polling is enough to start).

---

*When in doubt, favour clarity and the understated aesthetic. Make data actionable and beautiful.*
