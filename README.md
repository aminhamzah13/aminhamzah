# Amin Hamzah — QA Engineer Portfolio

> Portfolio website of Amin Hamzah, QA Engineer with 2+ years experience in Banking & Fintech (Bank Raya, Bank Mandiri, BCA).

🌐 **Live:** [aminhamzah.com](https://aminhamzah.com/)

## Two modes, one page
| Mode | What it shows | Direct link |
|---|---|---|
| **Full** (default) | Hero, services, journey, project cards with detail modal, sample work, skills, contact | [`?mode=full`](https://aminhamzah.com/?mode=full) |
| **Lite** | Single-column résumé view for a quick read | [`?mode=lite`](https://aminhamzah.com/?mode=lite) |

Visitors switch with the toggle in the top bar. The choice is remembered only when they click it; a `?mode=` link opens that mode without saving it.

## Stack
HTML · CSS · Vanilla JavaScript · GitHub Pages — no build step, no dependencies.

## Highlights
- Dark UI built from design tokens (`--bg`, `--accent`, …) at the top of `styles.css`
- Responsive: desktop ≥ 1280 px, tablet 768–1279 px (menu overlay), mobile < 768 px
- Accessible project modal (focus trap, Esc to close, focus returns to the card)
- Phosphor icons inlined as an SVG sprite — no icon CDN
- SEO: Open Graph, Twitter Card, Schema.org, sitemap
- PWA manifest · Google Analytics (GA4)
- Respects `prefers-reduced-motion`

## Project structure
```
index.html        Markup for both modes (Full + Lite), icon sprite, Schema.org
styles.css        Tokens, components, breakpoints
script.js         Mode toggle, menu, project modal data (projectData), animations
assets/           CV (cv-amin-hamzah.pdf)
images/           Avatar, favicons, OG image
```

## Design source
The v3 design was made in [pen.dev](https://pen.dev). The design file and the AI agent guide (`design/`, `CLAUDE.md`) are kept locally and listed in `.gitignore`, so the repo only contains what the site serves. The design tokens are mirrored at the top of `styles.css`.

## Run locally
```bash
git clone https://github.com/aminhamzah13/aminhamzah.git
cd aminhamzah
python -m http.server 5500
```
Then open http://localhost:5500 (or use Live Server in VS Code).

## Updating content
- Page text is in `index.html`; project detail text for the modal is in `projectData` in `script.js`.
- Placeholder copy is marked `TODO(dummy)` — find it with `grep -n "TODO(dummy)" index.html script.js`.
- After changing CSS or JS, bump the version in `index.html` (`styles.css?v=…`, `script.js?v=…`) so returning visitors don't get a stale cache.

## Deploy
GitHub Pages serves the `main` branch. Work on a branch, open a pull request, and merge — the site updates a minute or two after the merge.

---
📧 aminhamzah.it@gmail.com · [LinkedIn](https://linkedin.com/in/aminhamzah13)
