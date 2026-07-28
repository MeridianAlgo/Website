# Architecture

## Overview

meridianalgo.org is a static React SPA built with Vite and deployed as a CDN-hosted site. There is no backend — all dynamic behavior uses client-side state, the Formspree API for contact form submissions, and the [MeridianAlgo/newsletters](https://github.com/MeridianAlgo/newsletters) repo as the content store for the newsletter archive.

## Routing

Routes are defined in `src/App.tsx` using React Router v6 with `<BrowserRouter>`. All pages are lazy-loaded via `React.lazy` and wrapped in `<Suspense>` for code splitting.

| Route | Page | Notes |
|-------|------|-------|
| `/` | Home | Hero + project carousel + codestack |
| `/about` | About | Mission, values, CTA |
| `/tools` | ToolsPage | 20+ collapsible financial calculators |
| `/opensource` | OpenSource | GitHub project grid with category filter |
| `/newsletters` | Newsletters | PDF archive with search, filter, paginate |
| `/partnerships` | Partnerships | Partner cards |
| `/contact` | Contact | Formspree-powered contact form |
| `*` | NotFound | 404 fallback |

## Layout

Every page is wrapped in `AppLayout` which renders `<Navbar>` above and `<Footer>` below the page content. The navbar is fixed-position; `AppLayout` adds top padding to offset it.

## Navigation

`Navbar.tsx` has two link groups:

- **About** — direct link
- **Learning** (dropdown) — Financial Tools, Open Source, Newsletters

The navbar animates the brand name out of view on scroll and collapses to a hamburger on mobile (`lg:` breakpoint).

## Footer

`Footer.tsx` is organized into four sections:

- **Logo & bio** — brand mark, tagline, social icons
- **Platform** — About, Newsletters
- **Resources** — Financial Tools, Open Source
- **Community** — Partnerships, Contact, The Hack Foundation

The bottom bar holds Changelog, Privacy, and Terms links.

## Financial Calculators

Each calculator in `ToolsPage.tsx` is self-contained: local `useState` for inputs, `useMemo` for derived outputs. They are wrapped in `<CollapsibleTool>` (an accordion component) so only one tool's UI is expanded at a time by default.

## Newsletter Archive

Issues are **not** in this repo. They live in
[MeridianAlgo/newsletters](https://github.com/MeridianAlgo/newsletters), which
holds the PDFs and a `manifest.json` describing each one. Publishing an issue is
a push to that repo — this site does not need to be rebuilt or redeployed.

`Newsletters.tsx` fetches the manifest at runtime and builds two URLs per issue
from the `readBase` / `downloadBase` fields it carries:

| Purpose | Host | Why |
|---------|------|-----|
| Manifest | `raw.githubusercontent.com` | 5-minute cache, so new issues appear quickly |
| Read (`<iframe>`) | `cdn.jsdelivr.net` | Serves `application/pdf`, so the browser renders it inline |
| Download | `raw.githubusercontent.com` | Serves `application/octet-stream`, so the link downloads |

Both hosts send `Access-Control-Allow-Origin: *`. If the fetch fails the page
says so and links to the repo rather than showing an empty archive.

Adding a series or changing categories is a manifest edit — no code change here.

## Styling

Tailwind CSS handles all styling, on a ledger-paper palette defined in `tailwind.config.js`:
`paper` #eff1e9 (page), `sheet` #f8f9f4 (raised), `band` #dfe7d8 (the green bar on
columnar accounting pads), `rule` #c3c9ba (hairlines), `steel` #35494e (secondary text),
`ink` #171b14 (text), `stamp` #b5321f (margin rules, negatives, active state).

Type: Archivo for headings and labels, Newsreader for body copy, IBM Plex Mono for
figures and labels. Figures always use `.fig` so columns stay tabular.

Global CSS lives in `src/index.css`, which defines the component vocabulary the pages
compose from: `.sheet` (page column), `.lbl`, `.fig`, `.entry` + `.entry-fill` +
`.entry-fig` (a ledger row with leader dots), `.field` / `.field-boxed`, `.btn-primary` /
`.btn-secondary`, `.display-1` / `.display-2` / `.lede`. Prefer these over ad-hoc utility
strings so the sheet stays consistent.

`src/components/Ledger.tsx` is the signature element: an interactive compound-interest
worksheet used on the home page. It runs the same math as the Compound Interest tool.

## Static Assets

- `public/meridianalgo.png` — favicon and navbar logo
- `public/Social.png` — Open Graph / Twitter card image
- `public/legal/` — Privacy Policy and Terms of Service PDFs
- `src/assets/images/` — partner logos (imported as ES modules)

Newsletter PDFs are not static assets of this site; see Newsletter Archive above.
