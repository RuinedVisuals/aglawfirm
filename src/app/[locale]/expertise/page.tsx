import { PageHero } from '@/components/site/PageHero';
import { Reveal } from '@/components/site/Reveal';
import { Figure } from '@/components/site/Figure';
import { TLink } from '@/components/site/TLink';
import { Accordion } from '@/components/site/Accordion';
import { Footer } from '@/components/site/Footer';
import { getDict, pageHref, ROMAN } from '@/lib/i18n';
import { IMAGES } from '@/lib/images';
import { pageMeta } from '@/lib/seo';
import type { Locale } from '@/content/content';

export function generateMetadata({ params }: { params: { locale: Locale } }) {
  const d = getDict(params.locale);
  return pageMeta(params.locale, '/expertise', d.labels.expertise, d.expertise.lede);
}

export default function Expertise({ params }: { params: { locale: Locale } }) {
  const l = params.locale;
  const d = getDict(l);
  const x = d.expertise;
  const u = d.ui;
  const pillars = [
    { ...d.practices.commercial, href: pageHref(l, 'commercial'), img: IMAGES.commercial },
    { ...d.practices['real-estate'], href: pageHref(l, 'real-estate'), img: IMAGES['real-estate'] }
  ];
  return (
    <main>
      <PageHero kicker={x.kicker} title={x.title} lede={x.lede} size="xxl" lineTitle />

      <section className="ivory g section-sm">
        <div className="head-row kicker no-rule"><span>{u.art} I — {x.pillarsK}</span><span className="ink-2">01 — 02</span></div>
        <div className="auto-grid-420 gap-24">
          {pillars.map((p, i) => (
            <Reveal key={p.n} style={{ marginTop: i ? 'clamp(0px,8vw,140px)' : 0 }}>
              <TLink href={p.href} className="pillar">
                <div className="pillar__media ratio-4-5"><Figure src={p.img} label={p.title} sizes="50vw" /></div>
                <div className="pillar__row"><span className="serif italic ink-2 fs-22">{p.n}</span><span className="kicker">{u.discover} →</span></div>
                <h2 className="serif display-xs2 balance">{p.title}</h2>
                <p className="body ink-2 measure-40">{p.short}</p>
              </TLink>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="navy g section">
        <div className="grid12 pb-64">
          <Reveal className="kicker slate col-1-4 pt-14">{u.art} II — {x.othersK}</Reveal>
          <Reveal as="h2" className="serif display-m col-5-12">{x.othersTitle}</Reveal>
        </div>
        <Accordion
          tone="navy"
          markers={x.others.map((_, i) => ROMAN[i + 2] + '.')}
          items={x.others.map((o) => ({ title: o.title, body: o.desc, cta: { href: pageHref(l, 'contact'), label: u.enquire } }))}
        />
      </section>

      <Footer d={d} />
    </main>
  );
}
