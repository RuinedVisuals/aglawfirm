# AG Law Firm — Next.js site

Bilingual (EL / EN) website for **Alkiviadis S. Gkanatsios & Associates**, Volos.
Stack: **Next.js 14 App Router · TypeScript · SCSS · GSAP + ScrollTrigger · Lenis · WebGL**.

## Run

```bash
npm install
npm run dev        # http://localhost:3000  → redirects to /el or /en
npm run build && npm start
```

## Structure

```
src/
├── app/
│   ├── [locale]/                 root layout (fonts, providers, header, menu)
│   │   ├── page.tsx              Home
│   │   ├── about/                The Firm
│   │   ├── expertise/            index + [slug] (commercial-corporate-law, real-estate)
│   │   ├── insights/             listing + [slug] article
│   │   └── contact/
│   ├── api/contact/route.ts      form endpoint (validation, honeypot, rate limit)
│   ├── sitemap.ts · robots.ts
├── components/
│   ├── site/                     SiteProvider (Lenis + page transitions + menu state),
│   │                             Header, Menu (pillars), TLink, Reveal, Magnetic,
│   │                             Figure, PageHero, Accordion, ClosingCta, Footer
│   ├── home/                     Preloader, Hero, HeroGL (WebGL), Intro, ExpertiseSticky,
│   │                             Interlude, Heritage, PracticeAreas, Sections (Approach, InsightsTeaser)
│   └── pages/                    InsightsView, ArticleToc, ContactForm
├── content/content.ts            all copy, EN + EL (seed data for a CMS)
├── lib/                          i18n, motion tokens, images map, seo helper
├── styles/globals.scss           tokens + layout system
└── middleware.ts                 locale redirect
```

## Images

Put photographs in `public/images/` and set the paths in `src/lib/images.ts`. Any image left `undefined` shows a labelled placeholder.
- `hero` drives the WebGL hover effect. Use a same-origin file in `/public`.
- The two About photos and the media screenshots load from the firm's current WordPress (allowed in `next.config.mjs`). Move them into `/public` before launch.

## Motion system

All values live in `src/lib/motion.ts` and in the CSS variables in `globals.scss`.
- Easing: `expo.out` for reveals, `power4.inOut` for curtains.
- Durations: 0.6s / 1.1s / 1.6s.
- With `prefers-reduced-motion`, everything is switched off: Lenis, the preloader, reveals, transitions, WebGL and the magnetic buttons.

## Next steps
- **Sanity**: replace `content.ts` with GROQ queries. The data shapes map 1:1 to the schemas `practiceArea`, `article`, `aboutPage` and `siteSettings`.
- **Contact**: email delivery is not wired up yet. Add it in `api/contact/route.ts` (SMTP or Resend → `CONTACT_TO`) and use a durable rate limiter.
- **Logo**: swap the typographic "AG" mark in `Header`/`Menu` for the real monogram SVG.
- **Content to confirm with the firm**:
  - The email address. `info@aglawfirm.co` is assumed; the current site still shows a temporary domain.
  - The postcode (382 21).
  - The sample articles, practice scenarios and FAQs (`sample: true`).
