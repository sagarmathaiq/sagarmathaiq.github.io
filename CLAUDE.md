# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

SagarmathaIQ is a static HTML site published to GitHub Pages (`sagarmathaiq.github.io`). There is no build process, no npm, no bundler — every file is plain HTML/CSS/JS served directly. Deployment happens automatically on push to `main`.

## Local development

Serve the site with any static HTTP server from the repo root (required because `site.js` fetches partials via `fetch()`, which fails on `file://`):

```bash
python3 -m http.server 8080
# or
npx serve .
```

Then open `http://localhost:8080`.

## Architecture

### Partials system

`assets/js/site.js` runs on every page and injects the shared header and footer at runtime by fetching `assets/partials/header.html` and `assets/partials/footer.html`. Every page must include:

```html
<div id="site-header"></div>   <!-- top of <body> -->
<div id="site-footer"></div>   <!-- bottom of <body> -->
<script src="./assets/js/site.js"></script>
```

`site.js` computes the correct relative `BASE` path from the URL depth, so subdirectory pages resolve partials correctly. The partials themselves use `./`-prefixed paths (always relative to root).

Active nav highlighting is driven by `data-navpage` attributes on `<a>` tags in `header.html`; the script matches against the current page filename.

### Shared stylesheet

`assets/styles/sagarmathaiq.css` is the base stylesheet. All pages link it. It defines:
- Layout: `.container` (max-width 1100px, centered)
- Index-page components: `.project-card`, `.project-card-header`, `.project-label`, `.project-title`, `.project-desc`, `.project-stats`, `.stat-item`, `.stat-value`, `.stat-value-neg`, `.status-badge`, `.status-complete`, `.status-published`, `.category-heading`
- Content-page components: `.mission`, `.provenance`, `.prov-item`
- Site nav: `.site-header`, `.site-nav`, `.site-nav-link`
- Fonts: Inter (loaded via Google Fonts — add the preconnect + link tags before the stylesheet)

Page-specific styles go in a `<style>` block in `<head>`, after the shared CSS link. Dashboard pages frequently add their own CSS custom properties and may load additional Google Fonts (IBM Plex Sans, Crimson Pro).

### Page types

| Type | Examples | Pattern |
|------|----------|---------|
| Index | `index.html` | Project cards grouped by category, stats strip, hero header |
| Long-form article | `pradesh-fiscal-analysis.html`, `sukumbasi-factcheck.html`, `budget-7-percent.html` | Shared CSS + page-level `<style>` block for article design tokens |
| Election dashboard | `national_dashboard.html`, `jhapa-5_dashboard.html` | Heavy inline/page styles, Monte Carlo simulation results |
| Institutional | `about.html`, `methodology.html` | Shared CSS, minimal page-specific styles |

### SEO checklist for every page

Each page must include all of the following:

```html
<title>Page Title — SagarmathaIQ</title>
<meta name="description" content="...">
<link rel="canonical" href="https://sagarmathaiq.github.io/page-name.html">
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:url" content="https://sagarmathaiq.github.io/page-name.html">
<meta property="og:type" content="article">  <!-- or "website" for index -->
<meta property="og:image" content="https://sagarmathaiq.github.io/assets/hero-banner.png">
<meta property="og:image:alt" content="SagarmathaIQ — Data Analytics for Nepal">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="...">
<meta name="twitter:description" content="...">
<meta name="twitter:image" content="https://sagarmathaiq.github.io/assets/hero-banner.png">
<meta name="twitter:image:alt" content="SagarmathaIQ — Data Analytics for Nepal">
<link rel="icon" type="image/jpeg" href="./assets/sagarmathaiq-logo.jpeg">
```

Plus JSON-LD structured data: `Organization` schema for the index, `Article` schema for content pages (with `datePublished`, `author`, and `publisher`).

New pages must also be added to `sitemap.xml`.

### Brand palette

- Crimson: `#DC143C` / dark `#7F1D1D` / `#9B1C1C`
- Blue: `#003893` / `#1E3A8A`
- Neutral background: `#FAFAF9`
- Body text: `#1F2937`
- Project card header gradient: `linear-gradient(135deg, #7F1D1D 0%, #1E3A8A 100%)`
