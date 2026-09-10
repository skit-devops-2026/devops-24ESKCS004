# Twinfin — Personal Finance Dashboard (UI)

A static HTML/CSS/JS recreation of the Twinfin app: Home, Dashboard, Goals,
Planner, Transactions, Reports, and a 4-tab Profile page.

No build step, no framework, no external chart library — everything runs
by opening `index.html` in a browser (or serving the folder statically).

## Folder structure

```
twinfin/
├── index.html          Home
├── dashboard.html       Dashboard (cash flow, financial health, spending)
├── goals.html            Savings goals
├── planner.html          Event planner / financial calendar
├── transactions.html     Ledger with search, filter, sort, CSV export
├── reports.html          Net worth, savings rate, category breakdown
├── profile.html          Personal Info / Financial Settings / Preferences / Security tabs
├── css/
│   └── style.css        Design tokens + shared layout + component styles
├── js/
│   ├── nav.js            Injects the shared top navigation on every page
│   ├── data.js            Shared mock data (transactions, goals, user, etc.)
│   └── charts.js          Dependency-free SVG line / bar / donut / ring charts
└── assets/               (reserved for icons/images if added later)
```

## How it works

- **Navigation**: each page includes `<script src="js/nav.js" data-active="PAGE">`
  which renders the top bar and highlights the current page — edit nav items
  in one place (`js/nav.js`) and every page updates.
- **Data**: `js/data.js` holds one shared `TWINFIN_DATA` object. Swap this
  for real API calls without touching page markup.
- **Charts**: `js/charts.js` exposes `Charts.line()`, `Charts.bar()`,
  `Charts.donut()`, and `Charts.ring()` — each returns an SVG string sized
  by a `viewBox`, so charts stay crisp and responsive with no dependency.
- **Interactivity**: Transactions has live search + category filter + sort;
  Profile has working tab switching and toggle switches; Planner/Goals/
  Reports render entirely from `data.js`.

## Running locally

Just open `index.html` directly, or serve the folder for cleanest relative
paths:

```bash
cd twinfin
python3 -m http.server 8000
# visit http://localhost:8000
```
