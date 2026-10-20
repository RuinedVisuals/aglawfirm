import { notFound } from 'next/navigation';
import { PageHero } from '@/components/site/PageHero';
import { Reveal } from '@/components/site/Reveal';
import { Figure } from '@/components/site/Figure';
import { TLink } from '@/components/site/TLink';
import { Accordion } from '@/components/site/Accordion';
import { Footer } from '@/components/site/Footer';
import { getDict, locales, pad, pageHref, PRACTICE_LABELS, PRACTICE_SLUGS, type PracticeKey, type PracticeSlug } from '@/lib/i18n';
import { IMAGES } from '@/lib/images';
import { pageMeta } from '@/lib/seo';
import type { Locale } from '@/content/content';

type Params = { locale: Locale; slug: string };

export function generateStaticParams() {
  return locales.flatMap((locale) => Object.keys(PRACTICE_SLUGS).map((slug) => ({ locale, slug })));
}

const keyOf = (slug: string) => PRACTICE_SLUGS[slug as PracticeSlug] as PracticeKey | undefined;

export function generateMetadata({ params }: { params: Params }) {
  const key = keyOf(params.slug);
  if (!key) return {};
  const p = getDict(params.locale).practices[key];
  return pageMeta(params.locale, '/expertise/' + params.slug, p.title, p.lede);
}

export default function Practice({ params }: { params: Params }) {
  const key = keyOf(params.slug);
  if (!key) notFound();
  const l = params.locale;
  const d = getDict(l);
  const u = d.ui;
  const p = d.practices[key];
  const next = d.practices[p.next as PracticeKey];
  const L = PRACTICE_LABELS[l];

  return (
    <main>
      <PageHero
        kicker=""
        title={p.title}
        lede={p.lede}
        size="l"
        top={
          <Reveal className="head-row kicker on-navy no-rule">
            <span className="crumbs"><TLink href={pageHref(l, 'expertise')} className="slate">{u.expertise}</TLink><span className="gold">/</span><span>{p.n}</span></span>
            <span className="serif italic gold fs-18 ls-0">§ {p.n} / 02</span>
          </Reveal>
        }
      />
      <Reveal type="clip" className="bleed bleed--84"><Figure src={IMAGES[key]} label={p.title} priority /></Reveal>

      <section className="ivory g section">
        <div className="grid12">
          <Reveal className="kicker col-1-3 pt-12">{u.art} I — {L.overview}</Reveal>
          <div className="col-4-12 stack-56">
            <Reveal as="h2" className="serif display-s pretty">{p.overviewH}</Reveal>
            <div className="auto-grid-280 gap-40">
              {p.overview.map((t, i) => <Reveal as="p" key={i} className="body-l ink-2">{t}</Reveal>)}
            </div>
          </div>
        </div>
      </section>

      <section className="ivory g section-bottom">
        <div className="head-row kicker"><span>{u.art} II — {L.services}</span><span className="ink-2">§ 1 — {p.services.length}</span></div>
        <div className="services">
          {p.services.map((s, i) => (
            <Reveal key={i} className="service">
              <span className="serif ink-3 fs-22">§ {i + 1}</span>
              <div className="stack-12"><span className="serif service__t">{s.t}</span><span className="body-s ink-2">{s.d}</span></div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="navy g section">
        <div className="head-split pb-72">
          <div className="stack-28">
            <Reveal className="kicker slate">{u.art} III — {L.cases}</Reveal>
            <Reveal as="h2" className="serif display-m">{L.casesTitle}</Reveal>
          </div>
          <Reveal className="kicker gold">{u.indicative}</Reveal>
        </div>
        <div className="auto-grid-260 gap-24">
          {p.cases.map((c, i) => (
            <Reveal key={i} className="case">
              <span className="serif italic gold fs-18">{pad(i + 1)}</span>
              <span className="serif fs-30">{c.t}</span>
              <span className="body-s on-navy measure-36">{c.d}</span>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="ivory g section">
        <div className="grid12">
          <div className="col-1-4 stack-28">
            <Reveal className="kicker">{u.art} IV — {L.faq}</Reveal>
            <Reveal as="h2" className="serif display-m3">{L.faqTitle}</Reveal>
          </div>
          <div className="col-6-12">
            <Accordion tone="ivory" initial={0} items={p.faq.map((f) => ({ title: f.q, body: f.a }))} />
          </div>
        </div>
      </section>

      <TLink href={pageHref(l, p.next as PracticeKey)} className="next-practice g">
        <Reveal className="kicker gold">{u.next} — {next.n}</Reveal>
        <Reveal className="serif next-practice__title">{next.title} <em>→</em></Reveal>
      </TLink>

      <Footer d={d} />
    </main>
  );
}
