# Portfolio — Md Zeeshan

A code-themed personal portfolio for **Md Zeeshan** (Full Stack LLM Analyst) — built with Angular 20, Tailwind CSS, and an aggressively config-driven content model so every section updates from one file.

> **Live site:** *deploy and add the URL here*
> **Crafted using** [Claude Code](https://claude.com/claude-code).

---

## Highlights

- **Single source of truth** — every section (profile, hero, skills, projects, experience, contact, footer) reads from [`src/app/config/portfolio.config.ts`](src/app/config/portfolio.config.ts). Edit one file → the whole site updates.
- **Modern Angular** — Angular 20, signals, `input.required`, `@for` / `@if` / `@switch` control flow, OnPush change detection throughout, standalone components.
- **Terminal / IDE aesthetic** — code-formatted hero card, blinking cursor brand, "$" prompt section headers, dark-mode architecture diagrams.
- **Dark / light theme** — signal-based theme service, persisted to `localStorage`, respects `prefers-color-scheme` on first load.
- **Featured + collapsible projects** — personal apps with live links on top; enterprise / internal projects tucked behind a `./show-more-projects` toggle.
- **Real tech logos** — orbiting badges around the hero avatar are clickable anchors served from [simpleicons.org](https://simpleicons.org).
- **Layered architecture cards** — each project shows a Client → API → Database → Infra stack diagram instead of a generic pipeline.

---

## Tech Stack

| Layer | Tech |
| --- | --- |
| Framework | Angular 20 (standalone components, signals) |
| Styling | Tailwind CSS 3 + custom palette / animations |
| Forms | `FormsModule` with signal-bound inputs |
| Tooling | Angular CLI, esbuild via `@angular/build`, PostCSS, Autoprefixer |
| Icons | Inline SVG + [Simple Icons CDN](https://simpleicons.org) |

---

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── header/            # sticky glass nav, theme toggle, mobile menu
│   │   ├── hero/              # terminal-style profile, avatar, orbit logos
│   │   ├── skills/            # specializations + categorized skill matrix
│   │   ├── projects/          # featured + "show more" enterprise section
│   │   ├── pipeline-card/     # layered full-stack architecture card
│   │   ├── experience/        # work history + certifications
│   │   ├── contact/           # direct contacts + signal-based form
│   │   └── footer/            # author, interests, socials, build credit
│   ├── config/
│   │   └── portfolio.config.ts   ← edit me to change every section
│   ├── services/
│   │   └── theme.ts           # light/dark mode (signal + effect + localStorage)
│   ├── app.ts / app.html      # composes the sections in render order
│   └── app.config.ts          # router + zone change detection providers
├── styles.scss                # Tailwind layers + globals + animations
└── index.html                 # title, meta description, theme color, favicon
public/
└── profile.jpg                # drop your photo here (referenced by avatarUrl)
```

---

## Quick Start

```bash
# install
npm install

# dev server (http://localhost:4200)
npm start

# production build → dist/portfolio/
npm run build
```

Requires **Node 20+** and **npm 10+**.

---

## Customising the Content

Almost everything is driven by [`portfolio.config.ts`](src/app/config/portfolio.config.ts). The interfaces at the top of the file describe the exact shape.

### Update your basics

```ts
profile: {
  name: 'Your Name',
  role: 'Your Role',
  tagline: 'Headline shown under your name',
  location: 'City, Country',
  summary: '...',
  about: ['...', '...'],
  avatarUrl: 'profile.jpg',     // drop a photo at public/profile.jpg
  focus: '...',
  expertise: '...',
  industries: ['...'],
},
contact: {
  email: '...', phone: '...', linkedin: '...', github: '...',
},
```

### Add a project

Append to the `projects` array:

```ts
{
  id: 'unique-slug',
  title: 'Project Name',
  role: 'Your role on the project',
  description: 'One paragraph.',
  impact: ['bullet 1', 'bullet 2', 'bullet 3'],
  stack: ['Angular', 'PostgreSQL', '…'],
  architecture: [
    { layer: 'Client',         tech: 'Angular',        icon: 'client' },
    { layer: 'API',            tech: 'Django',         icon: 'api' },
    { layer: 'Database',       tech: 'PostgreSQL',     icon: 'database' },
    { layer: 'Infrastructure', tech: 'Kubernetes',     icon: 'infra' },
  ],
  github: 'https://github.com/...',
  liveUrl: 'https://...',
  links: [                                    // optional extra resources
    { label: 'backend repo', url: '...' },
  ],
  collaborators: [                            // optional co-developers
    { name: '...', url: 'https://github.com/...' },
  ],
  featured: true,    // true = always visible, false/omitted = behind "show more"
}
```

Architecture icons supported: `client | api | database | engine | integration | infra` — defaults to a generic box.

### Add a hero orbit logo

```ts
orbitBadges: [
  // existing badges...
  {
    name: 'Redis',
    slug: 'redis',                            // simpleicons.org slug
    url: 'https://redis.io',
    color: '#FF4438',                         // brand hex
    position: 'right-4 bottom-4',             // Tailwind classes
  },
],
```

Look up slugs at [simpleicons.org](https://simpleicons.org) — the logo is fetched from `cdn.simpleicons.org/{slug}/ffffff`.

### Add a skill group / specialization / certification

Append to `skills`, `specializations`, or `certifications`. They render automatically.

### Add an experience

Append to `experiences` (most-recent first). Set `current: true` to surface the green **current** badge on a role.

### Reorder the page

Edit [`src/app/app.html`](src/app/app.html) — the sections render in the order they appear. The nav order is controlled separately by the `nav` array in the config.

---

## Theme & Styling

- Theme toggle lives in the header and is powered by [`Theme`](src/app/services/theme.ts) — a signal that toggles `.dark` on `<html>` and persists to `localStorage`.
- Custom palette / animations are defined in [`tailwind.config.js`](tailwind.config.js):
  - `ink` (slate-ish neutrals), `accent` (violet).
  - Animations: `float`, `blink`, `fade-up`, `pulse-slow`.
  - Shadows: `glow`, `card`.
- Global CSS (font imports, scrollbar, grid backdrop, glass utility) is in [`src/styles.scss`](src/styles.scss).

---

## Deployment

Any static host works since this is a pure SPA build.

```bash
npm run build
# upload dist/portfolio/browser/ to:
#  - Cloudflare Pages
#  - Vercel
#  - Netlify
#  - GitHub Pages
#  - any static file server
```

For Cloudflare Pages, point the deploy at `dist/portfolio/browser` as the output directory.

---

## Scripts

| Command | What it does |
| --- | --- |
| `npm start` | Dev server with hot reload on `http://localhost:4200` |
| `npm run build` | Production build to `dist/portfolio/browser/` |
| `npm run watch` | Development build in watch mode |
| `npm test` | Karma + Jasmine unit tests |

---

## Credits

- **Author:** [Md Zeeshan](https://linkedin.com/in/zeeshan4002911)
- **Crafted using:** [Claude Code](https://claude.com/claude-code)
- **Tech logos:** [Simple Icons](https://simpleicons.org) (CC0)
- **Fonts:** [Inter](https://rsms.me/inter/), [JetBrains Mono](https://www.jetbrains.com/lp/mono/)
