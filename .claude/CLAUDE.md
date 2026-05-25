# CLAUDE.md

Guidance for Claude when working in this repo. Read this first - it captures non-obvious decisions and conventions that aren't visible from the code alone.

## Project

Personal portfolio for **Md Zeeshan** (Full Stack Developer). Angular 20 SPA, Tailwind 3, deployed to GitHub Pages.

Live URL: `https://zeeshan4002911.github.io/Portfolio/`

## Tech stack

- Angular **20** - standalone components only (no NgModules), signals, `input.required`, `@for` / `@if` / `@switch` template syntax, OnPush change detection everywhere.
- Tailwind CSS **3** with custom palette (`ink` for neutrals, `accent` for violet) and animations defined in [tailwind.config.js](tailwind.config.js).
- Build: `@angular/build` (esbuild). No Webpack.
- Forms: `FormsModule` with signal-bound inputs (no Reactive Forms).
- Routing exists in `app.config.ts` but no routes are defined - the app is a single scrollable page with hash anchors.

## Core architectural decision: one config file drives the whole site

**[src/app/config/portfolio.config.ts](src/app/config/portfolio.config.ts) is the single source of truth.** Every section (hero, skills, projects, experience, contact, footer, header nav, orbit badges) reads from `PORTFOLIO` exported from that file. Each component just does `protected readonly x = PORTFOLIO.x`.

**Implications when adding features:**
- New content type? Extend the `PortfolioConfig` interface and add an entry under the `PORTFOLIO` const - don't hard-code in templates.
- Existing components should never grow ad-hoc data; route it through the config.
- Interfaces live at the top of the config file (`Project`, `Experience`, `StackLayer`, `OrbitBadge`, `SkillGroup`, `SocialLink`). Add fields to those, not to component classes.

## Project structure

```
src/app/
├── config/portfolio.config.ts   ← single source of truth (edit me)
├── services/theme.ts            ← signal-based dark/light, localStorage-persisted
├── components/
│   ├── header/                  sticky glass nav, theme toggle, mobile menu
│   ├── hero/                    terminal-style profile, avatar w/ animated frame, orbit logos
│   ├── skills/                  specializations card + categorized skill matrix
│   ├── projects/                featured + collapsible "show more" enterprise section
│   ├── architecture-card/       layered full-stack architecture diagram (used inside project cards)
│   ├── experience/              work history + certifications, current/past badge
│   ├── contact/                 direct contact cards + signal-based mailto form
│   ├── footer/                  author, interests, socials, build credit
│   └── back-to-top/             floating button shown after scrollY > 600
├── app.ts / app.html            composes sections - render order is set HERE
├── app.routes.ts                empty; the page uses hash anchors not router
└── app.config.ts                provideRouter + zone change detection
```

## Conventions

- **Component class names** are simple nouns: `Hero`, `Projects`, `Experience` (not `HeroComponent`). Match Angular 20 CLI defaults.
- **`changeDetection: ChangeDetectionStrategy.OnPush`** on every component.
- **Use signals** for any local mutable state. Use `input.required<T>()` for component inputs.
- **Templates use new control flow** (`@for`, `@if`, `@switch`) - never `*ngFor` / `*ngIf`.
- **Imports array** lists only the standalone deps each component actually uses (e.g. `[FormsModule]`, `[PipelineCard]`, `[NgTemplateOutlet]`).
- **SCSS files** stay empty unless a component needs custom keyframes / hover states beyond what Tailwind provides (see `hero.scss` for the orbit-badge hover and profile-frame animations as the canonical example).
- **Dark mode classes** use Tailwind's `dark:` variant. For SCSS-only rules use `:host-context(.dark)`.
- **Animations honor `prefers-reduced-motion: reduce`** - always gate keyframe animations behind that media query.

## Common operations

### Add a project
Append to `projects: []` in the config. Required fields: `id`, `title`, `role`, `description`, `impact[]`, `stack[]`, `architecture[]`. Optional: `github`, `liveUrl`, `links[]`, `collaborators[]`, `featured`.

`featured: true` → always-visible. `featured: false` or omitted → behind the show-more toggle.

`architecture` items use `icon: 'client' | 'api' | 'database' | 'engine' | 'integration' | 'infra'` - these map to SVGs hard-coded in [pipeline-card.html](src/app/components/pipeline-card/pipeline-card.html). Add a new `@case` there if you need a new icon kind.

### Add an experience
Append to `experiences: []` (most-recent first). Set `current: true` for a green "current" badge; omit for a neutral "past" badge.

### Add a hero orbit logo
Append to `orbitBadges: []`. `devicon` is the path `<folder>/<file>` from devicon.dev catalog (e.g. `'redis/redis-original'`). The URL is built as `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/{devicon}.svg`. `color` is the brand hex used for the hover ring.

### Reorder page sections
Edit [src/app/app.html](src/app/app.html). The nav order is controlled independently by `nav: []` in the config.

### Change theme palette
Edit the `colors` block in [tailwind.config.js](tailwind.config.js). The accent CSS variable is also referenced in raw SCSS via `rgba(124, 58, 237, …)` - keep those in sync if you change the accent hex.

## Build & deploy

- Local dev: `npm start` → `http://localhost:4200`.
- Production build: `npm run build` (outputs to `dist/portfolio/browser/`).
- Pages dry-run: `npm run build:gh-pages` (same as build but with `--base-href ./` for testing).
- Auto-deploy: push to `master` (note: `master`, not `main` - see [.github/workflows/deploy.yml](.github/workflows/deploy.yml)). The workflow auto-detects whether the repo is `<user>.github.io` (apex base) or a project repo (subpath base) and sets `--base-href` accordingly. It also copies `index.html → 404.html` for SPA deep links and writes `.nojekyll`.
- Pages **Source** in repo settings must be **"GitHub Actions"**, not "Deploy from a branch" - otherwise GitHub renders `README.md` as the homepage.

## External services this project relies on

- **devicon.dev** (via jsDelivr CDN) - hero orbit-badge SVGs. Cached well; widely reliable.
- **Google Fonts** - Inter + JetBrains Mono. Loaded async via `<link rel="preload" as="style" onload="this.rel='stylesheet'">` in [index.html](src/index.html). Do NOT re-add `@import url(...)` in [styles.scss](src/styles.scss) - it negates the optimization.
- **Cloudflare Pages / Render** - host the three featured personal projects' deployed apps. Just outbound links from the portfolio.

## User preferences (durable)

- **Don't auto-run builds.** The user runs their own dev server and build cycle. After edits, stop - do not chain `ng build` / `npm test` / etc. unless explicitly asked. (See [memory/feedback_no_auto_build.md](../../.claude/projects/c--New-Volume-Portfolio/memory/feedback_no_auto_build.md).)
- **Match scope.** The user prefers tight edits over speculative additions. Don't add hypothetical config fields, future-proofing layers, or unrequested sections.
- **No emoji in code/files unless asked.**

## Known gaps / pending follow-ups

- **Production budget unverified** - `angular.json` has `maximumError: 1MB` on the initial bundle. We haven't run a fresh production build to confirm it passes. If it trips, either trim or bump the budget.
- **OG image is the square `profile.jpg`** - fine, but a dedicated 1200×630 `og.png` would render better social previews. Drop into `public/`, update two URLs in [index.html](src/index.html).
- **No scroll-spy** on the header nav - links jump but don't highlight the active section.
- **No analytics** (Plausible/Umami/GA) yet.
- **No JSON-LD `Person` schema** for SEO/AI lookups.
- **`pipeline-card` should be renamed** to `architecture-card` for clarity; the rename is invasive (import paths, selector) and was deferred.

## Things to avoid

- **Don't re-add the Google Fonts `@import` to [styles.scss](src/styles.scss).** It's loaded asynchronously from `index.html`. Adding the `@import` back re-fetches the same CSS over HTTP and undoes the preload.
- **Don't hard-code project / experience / skill data inside templates.** Route everything through the config.
- **Don't add `*ngFor` / `*ngIf`.** Use Angular 20 control flow.
- **Don't fabricate metrics** in `impact[]` bullets (e.g. "reduced load times by 65%"). Keep them qualitative unless the user provides real numbers.
- **Don't switch back to simpleicons.org** for the orbit badges - the user explicitly chose devicon for the full-color brand look.
- **Don't run a build after edits** unless explicitly requested.
