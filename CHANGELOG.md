# Changelog

All notable changes to meridianalgo.org are documented here.

---

## [v5.1.0] - 2026-07-28

Newsletters moved out of this repo.

### Changed
- Issues now live in [MeridianAlgo/newsletters](https://github.com/MeridianAlgo/newsletters),
  which holds the PDFs plus a `manifest.json` describing each one. `/newsletters`
  fetches that manifest at page load, so publishing an issue is a push to that
  repo — no site rebuild, no redeploy
- PDFs render from jsDelivr (correct `application/pdf` content type) and download
  from raw.githubusercontent (forced attachment)
- Issue rows now show the series name alongside the date and category
- Filenames normalized to `<series>-week-NN.pdf`, dropping the `(1)` / `(2)`
  duplicate-download suffixes

### Fixed
- Week 9 was unopenable — the manifest pointed at `Smart Cents Weekly Newsletter
  Week 9.pdf` but the file on disk was `Smart Cents Weekly - Newsletter Week 9.pdf`.
  The new repo has a `validate.mjs` that fails CI on this class of mismatch
- A failed archive load now says so and links to the repo, instead of rendering
  as an empty archive

### Removed
- `public/newsletters/` — 19 PDFs and their thumbnails, ~all of the repo's weight
- `public/mountain.jpg` — unreferenced, 572 KB

---

## [v5.0.0] - 2026-07-27

Ground-up redesign. The dark/orange/glass-card treatment is gone; the site is now
a ledger sheet.

### Added
- `Ledger` component — an interactive compound-interest worksheet on the home page,
  running the same math as the Compound Interest tool
- Ledger-paper design tokens (`paper`, `sheet`, `band`, `rule`, `steel`, `ink`, `stamp`)
  and a shared class vocabulary in `index.css` (`.sheet`, `.lbl`, `.fig`, `.entry`,
  `.field`, `.btn-*`, `.display-*`)
- Section index with per-section counts on the calculators page, and anchors for
  all nine tool sections
- Eight calculators: Rent Affordability, Cost of a Habit, Refinance Break-Even,
  Expense Ratio Drag, Return After Inflation, Unit Price Compare, Finance It or
  Save Up, Freelance Hourly Rate — 37 in total

### Changed
- Typography: Archivo (headings) + Newsreader (body) + IBM Plex Mono (figures),
  replacing Google Sans Flex / JetBrains Mono. No uppercase headings, no gradient text
- Every page rewritten: full-viewport hero sections, glass cards, eyebrow pills and
  architectural line motifs replaced with ruled rows, banded tables and plain columns
- Copy rewritten across the site in plain language
- `CollapsibleTool` opens to its real content height instead of a `max-h` guess
- Contact and Partnerships now both point at meridianalgo@gmail.com
- Repository list rebuilt from the live GitHub org: 16 public repos, with
  Interlink, UniGroth and LiteLayer added
- Tab titles standardised on `MeridianAlgo | Page`
- Navigation and footer links dropped the mono uppercase label styling

### Fixed
- Removed dead links to AstryxChain and LuminaChain, which no longer exist on GitHub

### Removed
- `ScrollToTopButton`, `AnimatedSection`, `assets/styles/animations.css`
- Mountain hero image and its preload

---

## [v4.5.0] - 2026-06-21

### Added
- Financial Tools: Rule of 72, CAGR Calculator, Capital Gains Tax estimator
- CHANGELOG.md

### Changed
- Footer: `bg-neutral-950` background makes it visually distinct on every page
- Footer: full-opacity orange divider + architectural lines
- Footer: all text white; version bumped to v4.5.0
- About page "What Sets Us Apart" cards now sit above architectural lines

### Removed
- Unused AI/ML page and route
- Unused SEO component

---

## [v4.4.0] - 2026-06-21

### Changed
- Navbar: replaced "Learning" dropdown with flat inline links
- Global accent refresh: orange-300 → orange-400 across all pages and components

---

## [v4.3.0] - 2026-06-14

### Changed
- Nav cleanup and muted orange accent
- Docs update

---

## [v4.2.0] - 2026-06-10

### Changed
- UI polish, performance improvements, and general cleanup

---

## [v4.1.0] - 2026-06-07

### Added
- Font improvements
- Nav animation
- New financial calculators
- Open source page redesign

---

## [v4.0.0] - 2026-06-01

### Added
- Full v4 redesign: dark aesthetic, orange accent, architectural line motif
- Vite + React + TypeScript + Tailwind stack
- Cloudflare Pages deployment via Wrangler
