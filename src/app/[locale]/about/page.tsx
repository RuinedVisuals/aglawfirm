import { PageHero } from '@/components/site/PageHero';
import { Reveal } from '@/components/site/Reveal';
import { Figure } from '@/components/site/Figure';
import { ClosingCta } from '@/components/site/ClosingCta';
import { Footer } from '@/components/site/Footer';
import { getDict } from '@/lib/i18n';
import { IMAGES } from '@/lib/images';
import { pageMeta } from '@/lib/seo';
import { site, type Locale } from '@/content/content';

export function generateMetadata({ params }: { params: { locale: Locale } }) {
  const a = getDict(params.locale).about;
  return pageMeta(params.locale, '/about', getDict(params.locale).labels.about, a.lede);
}

export default function About({ params }: { params: { locale: Locale } }) {
  const l = params.locale;
  const d = getDict(l);
  const a = d.about;
  const u = d.ui;
  return (
    <main>
      <PageHero kicker={a.kicker} title={a.title} size="l2">
        <div className="split-end">
          <Reveal className="kicker gold">{a.meta}</Reveal>
          <Reveal as="p" className="lede on-navy">{a.lede}</Reveal>
        </div>
      </PageHero>

      <Reveal type="clip" className="bleed"><Figure src={IMAGES.about1} alt="AG Law Firm" priority /></Reveal>

      <section className="ivory g section">
        <div className="grid12">
          <Reveal className="kicker col-1-3 pt-12">{u.art} I — {a.introK}</Reveal>
          <div className="col-4-12 stack-64">
            <Reveal as="h2" className="serif display-s pretty">{a.introH}</Reveal>
            <div className="auto-grid-280 gap-48 align-start">
              <div className="stack-24">
                {a.introP.map((p, i) => <Reveal as="p" key={i} className="body-l ink-2">{p}</Reveal>)}
              </div>
              <Reveal type="clip" className="ratio-4-3"><Figure src={IMAGES.about2} sizes="40vw" /></Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="navy g section">
        <div className="stack-32 pb-72">
          <Reveal className="kicker slate">{u.art} II — {a.gensK}</Reveal>
          <Reveal as="h2" className="serif display-m">{a.gensTitle}</Reveal>
        </div>
        <div className="auto-grid-380 gap-xl">
          {a.gens.map((g, i) => (
            <article key={g.n} className="gen" style={{ paddingTop: i ? 'clamp(0px,10vw,160px)' : 0 }}>
              <Reveal type="clip" className="ratio-4-5">
                <Figure src={IMAGES.gens[i]} label={g.name + ' — portrait'} sizes="45vw" />
                <span className="gen__numeral serif outline" aria-hidden="true">{g.n}</span>
              </Reveal>
              <Reveal className="gen__meta kicker rule-fade"><span className="gold">{g.year}</span><span className="slate">{g.role}</span></Reveal>
              <Reveal as="h3" className="serif display-xs">{g.name}</Reveal>
              <Reveal as="p" className="body on-navy measure-42">{g.text}</Reveal>
            </article>
          ))}
        </div>
      </section>

      <section className="ivory g section">
        <div className="grid12 pb-64">
          <Reveal className="kicker col-1-4 pt-14">{u.art} III — {a.valuesK}</Reveal>
          <Reveal as="h2" className="serif display-m col-5-12">{a.valuesTitle}</Reveal>
        </div>
        <div className="rows">
          {a.values.map((v, i) => (
            <Reveal key={i} className="row">
              <span className="serif italic ink-3 fs-20">§ {i + 1}</span>
              <span className="serif row__title">{v.t}</span>
              <span className="row__desc">{v.d}</span>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="navy g section pb-0">
        <div className="auto-grid-400 gap-xl align-end">
          <Reveal type="clip" className="ratio-5-4"><Figure src={IMAGES.office} label="The office in Volos" sizes="50vw" /></Reveal>
          <div className="stack-28">
            <Reveal className="kicker slate">{u.art} IV — {a.officeK}</Reveal>
            <Reveal as="h2" className="serif display-m">{a.officeTitle}</Reveal>
            <Reveal as="p" className="body on-navy measure-38">{a.officeText}</Reveal>
            <Reveal className="stack-6 fs-15"><span>{u.address}</span><a className="gold" href={site.phoneHref}>{site.phone}</a></Reveal>
          </div>
        </div>
      </section>

      <ClosingCta d={d} l={l} />
      <Footer d={d} />
    </main>
  );
}
