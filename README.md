# MeridianAlgo

> Democratizing financial intelligence through transparent research and powerful open-source utilities.

MeridianAlgo is a student-led nonprofit building financial literacy tools, open-source projects, and educational content for everyday people — no jargon, no gatekeeping.

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript |
| Build | Vite |
| Styling | Tailwind CSS |
| Routing | React Router v6 |
| Forms | Formspree |
| Icons | Lucide React |

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
docs/                     # ARCHITECTURE.md, CONTRIBUTING.md
public/                   # Static assets served as-is (logo, legal PDFs, robots, sitemap)
src/
├── assets/images/        # Partner and brand logos (imported as ES modules)
├── components/
│   ├── AppLayout.tsx     # Page wrapper (navbar + footer)
│   ├── Navbar.tsx        # Fixed top nav with Learning dropdown
│   ├── Footer.tsx        # Site-wide footer with link sections
│   ├── Ledger.tsx        # Interactive compound-interest worksheet (home page)
│   ├── CollapsibleTool.tsx  # Accordion wrapper for the calculators
│   ├── ErrorBoundary.tsx
│   ├── LoadingSpinner.tsx
│   └── SkipToContent.tsx
├── pages/
│   ├── Home.tsx          # Landing page
│   ├── About.tsx         # Mission and values
│   ├── Contact.tsx       # Contact form (Formspree)
│   ├── Newsletters.tsx   # Newsletter archive (reads the newsletters repo)
│   ├── OpenSource.tsx    # GitHub project catalog
│   ├── Partnerships.tsx  # Partner showcase
│   ├── ToolsPage.tsx     # 37 interactive financial calculators
│   └── NotFound.tsx      # 404 page
├── types/calculator.ts
├── App.tsx               # Route definitions
└── index.css             # Tailwind entry + shared class vocabulary
```

See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) for a deeper breakdown.

## Newsletters

Newsletter PDFs are **not** in this repo. They live in
[MeridianAlgo/newsletters](https://github.com/MeridianAlgo/newsletters) along
with the `manifest.json` that describes them, and `/newsletters` fetches that
manifest at page load.

To publish an issue, push it to that repo — this site needs no change and no
redeploy. Instructions are in its README.

## Contributing

See [`docs/CONTRIBUTING.md`](docs/CONTRIBUTING.md).

## License

MIT — see [LICENSE](LICENSE) for details.

---

**Version:** v5.1.0 &nbsp;·&nbsp; [Changelog](CHANGELOG.md) &nbsp;·&nbsp; [Website](https://meridianalgo.org)
