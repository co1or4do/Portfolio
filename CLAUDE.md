# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static HTML/CSS/JavaScript portfolio for José Manuel Diaz Herrera (josediazherrera.site). No frontend framework — pure vanilla JS with file-based routing. Deployed on Vercel.

## Commands

```bash
# Image optimization pipeline (run in order)
node scripts/optimize-images.mjs    # Compress images + generate WebP variants
node scripts/update-html.mjs        # Wrap <img> in <picture>, inject WebP sources + dimensions

# No dev server — open HTML files directly or use any static server
# No test suite configured
# No build step — files are served as-is via Vercel
```

## Architecture

### Pages (file-based routing)
- Root: `index.html`, `about.html`, `projects.html`, `contact.html`, `play.html`, `link-in-bio.html`
- Project details: `projects/savia.html`, `projects/plexa.html`, `projects/patagon.html`, `projects/herbario.html`, `projects/ccr.html`

### CSS (loaded in order on every page)
1. `css/reset.css` — Modern reset
2. `css/variables.css` — Design tokens (colors, fonts, spacing, breakpoints)
3. `css/style.css` — All component styles (~2950 lines), BEM naming
4. `css/animations.css` — Keyframes + `prefers-reduced-motion` support

### JavaScript (no modules, global scope with IIFEs)
- `js/main.js` — Core: navbar glitch effect, custom cursor (lerp-based), asterisk grid (interactive ripple cells), scroll reveal (IntersectionObserver), carousel (infinite loop, momentum physics, typewriter)
- `js/i18n.js` — EN/ES translations via `data-i18n` attributes
- `js/hero-animations.js` — Simple hero reveal
- `js/play.js` — 6 mini-games (Snake, Memory, Runner, Pong, Breakout, TicTacToe)

### Image Pipeline (`scripts/`)
- `optimize-images.mjs` — Sharp-based compression + WebP generation → outputs `dimensions.json`
- `update-html.mjs` — Post-processes all HTML files: wraps `<img>` in `<picture>`, adds WebP `<source>`, injects width/height, adds `defer` to scripts

## Key Conventions

- **Responsive breakpoints:** Desktop ≥1200px, Tablet 744–1199px, Mobile <744px
- **CSS variables prefix:** `--color-*`, `--font-*`, `--text-*`, `--space-*`, `--transition-*`, `--radius-*`
- **Fonts:** Syne (headings), Roboto Mono (body), Space Grotesk (UI)
- **Scroll reveal:** Add `data-reveal` attribute to elements; `data-reveal="slow"` for subtler animation; delay via `--reveal-delay` CSS variable
- **i18n:** Add `data-i18n="key"` to elements, define translations in `js/i18n.js`
- **BEM naming:** `.block__element--modifier` pattern throughout CSS
- **Animations use `requestAnimationFrame`** and lerp patterns; all respect `prefers-reduced-motion`
- **Scripts use `defer`** attribute (injected by update-html.mjs)
- **No npm runtime deps** — only `sharp` as a dev tool for image optimization
