# Protocol Zero v3 — Architecture Guide

Minimal professional redesign. Static, no build. GitHub Pages serves repo root directly.

## Information architecture (4 + 2)

- **Home (`index.html`)** — hero, stats, selected work, toolbox, about teaser, contact CTA
- **Work (`work.html`)** — projects, HTB labs + live badge, capabilities, competition record, archive
- **About (`about.html`)** — bio, at-a-glance, HTB live badge, credentials
- **Résumé (`resume.html`)** — printable: education, certs, comps, skills, projects + PDF button
- **Playground (`terminal.html`)** — interactive demo in the same chrome
- **Log (`changelog.html`)** — v3.0 → v1.0 release notes
- **Contact (`contact.html`)**, **404 (`404.html`)**

Retired → redirect stubs to `work.html`:
`projects.html`, `skills and conquests.html`, `graveyard.html`

## File tree

```
index.html / work.html / about.html / resume.html / contact.html
terminal.html / changelog.html / 404.html
main.css      — one design system (tokens, header, hero, cards, panels, htb-card, term, print)
main.js       — mobile nav, scroll reveal, active nav, footer year
assets/       — fpr.png, THEO_KUFIGWA_resumedocx.pdf  (must be git-tracked!)
style.css / animations.css / animations.js — legacy v2, unused, safe to delete
```

## Shared chrome (every page)

Header: `TK Theo Kufigwa | Home Work About Résumé Contact | GitHub` + mobile hamburger.
Footer: `© <year> Theo Kufigwa | Home Work About Résumé Contact`.
Tokens: paper `#fafaf9`, ink `#1c1917`, accent teal `#0f766e`, radius 12px, system fonts.

## External integrations

- HTB badge: `https://www.hackthebox.com/badge/image/2663698` → links to
  `https://app.hackthebox.com/users/2663698` (About + Work). Stats shown:
  24 user / 21 system / No. 2 Botswana.
- GitHub: `https://github.com/0XClumzzy`, zzyutil at `github.com/0xClumzzy/zzyutil.git`
- Contact: `mailto:clumzzysec@gmail.com`, Discord `https://discord.gg/bQFPFmtFe`

## Deploy notes

- Static hosting, no build step. Push to deploy.
- `assets/` must be committed or `fpr.png` / resume PDF 404 on live (works locally).
- Print stylesheet hides nav/footer/CTA for clean résumé printing.

## Future: Astro path

Header / hero / cards / footer map 1:1 to Astro components if migrated later.
Suggested: `src/components/{Header,Footer,HtbCard,ProjectCard}.astro`
+ `src/layouts/Base.astro` + content collections for labs.
