# Aurindum Banerjee - Portfolio

A personal portfolio site with the information architecture of a conventional
professional portfolio and the visual language of a pixel-art adventure game.
It is not a game: there is no gameplay, no progression, and nothing to play.
The pixel-art world is purely a design language.

Built with Next.js 15 (App Router), TypeScript in strict mode, Tailwind CSS and
Framer Motion. All artwork is generated as inline SVG and CSS - there are no
image assets to download.

## Commands

```bash
npm install       # install dependencies
npm run dev       # development server on http://localhost:3000
npm run build     # production build
npm run start     # serve the production build
npm run lint      # eslint
npm run typecheck # tsc --noEmit
```

## Deploying to Vercel

The project is a stock Next.js app and needs no special configuration.

```bash
npm i -g vercel   # once
vercel            # preview deployment
vercel --prod     # production deployment
```

Alternatively, push the repository to GitHub and import it at
[vercel.com/new](https://vercel.com/new). Vercel detects Next.js and uses the
correct build command and output directory automatically. No environment
variables are required.

**After the first deploy**, update `SITE_URL` in `app/layout.tsx`,
`app/sitemap.ts` and `app/robots.ts` to the real domain so that canonical
URLs, Open Graph images and the sitemap point at the right host.

## Structure

```text
app/
  layout.tsx            fonts, metadata, Open Graph, JSON-LD
  page.tsx              composes the sections
  globals.css           the pixel design system: frames, dithering, CRT, focus
  opengraph-image.tsx   share card, generated at build time
  icon.svg              favicon
  sitemap.ts robots.ts  SEO routes
components/
  Hero.tsx HeroScene.tsx        parallax hero landscape
  Navbar.tsx Footer.tsx
  AboutSection.tsx
  ExperienceTimeline.tsx
  ProjectShowcase.tsx           editorial project layout
  ProjectModal.tsx              accessible case-study dialog
  SkillsSection.tsx
  ContactSection.tsx
  PixelEnvironment.tsx          procedural scene art, one per project theme
  PixelIcon.tsx                 icons authored as 16x16 pixel maps
  PixelCursor.tsx               desktop cursor and lantern light
  AmbientParticles.tsx          canvas dust motes
  ThemeToggle.tsx               the day/night switch in the navbar
  CelestialToggle.tsx           makes the hero's sun/moon clickable
  ParallaxLayer.tsx MagneticButton.tsx Typewriter.tsx Section.tsx
data/
  resume.ts             ALL content, strongly typed
lib/
  theme.tsx             theme state, persistence, pre-paint script
  hooks.ts              reduced motion, pointer capability, scroll, sections
  utils.ts              class names, clamp, deterministic PRNG
```

## Content

`data/resume.ts` is the single source of truth. Every string in it is
transcribed from the resumes (`main.tex` and the three PDFs in the parent
directory). Nothing is invented - where a repository link or a metric does not
exist in a resume, the field is omitted rather than filled in.

To update the site, edit `data/resume.ts`; no component needs to change.

## Themes

The world has two times of day, sharing one set of semantic colour names
(`lantern` is "the warm key light" - amber at night, deep blue by day).

Both palettes live in `app/globals.css` as CSS variables on `<html>`;
`tailwind.config.ts` points every colour at those variables, so a single
`data-theme` attribute repaints the whole site. The hero scene additionally
swaps artwork: the moon becomes a sun, stars give way to a daylit skyline,
and the lantern on the terrace goes unlit.

Two ways to switch:

- the pixel switch in the navbar, and
- clicking the sun or moon itself in the hero.

The choice is stored in `localStorage`. With nothing stored the site follows
`prefers-color-scheme`, and keeps following it until the visitor chooses. A
small script in `<head>` applies the theme before first paint so the page
never flashes the wrong palette.

Both themes were audited for WCAG contrast against the rendered DOM:
307 text elements each, zero failures.

## Accessibility and motion

- Semantic landmarks, one `h1`, no skipped heading levels.
- A skip link is the first tab stop; focus rings are a 3px amber outline.
- The project dialog traps focus, closes on Escape or backdrop click, locks
  background scroll, and returns focus to the card that opened it.
- `prefers-reduced-motion: reduce` disables every animation, the typewriter,
  the custom cursor, the particles and the theme cross-fade. No information
  depends on motion.
- Cursor effects, particles and tilt require a fine pointer, so touch devices
  never load or run them.
