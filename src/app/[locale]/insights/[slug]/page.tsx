import { notFound } from 'next/navigation';
import { Reveal } from '@/components/site/Reveal';
import { Figure } from '@/components/site/Figure';
import { TLink } from '@/components/site/TLink';
import { ClosingCta } from '@/components/site/ClosingCta';
import { Footer } from '@/components/site/Footer';
import { ArticleToc } from '@/components/pages/ArticleToc';
import { ARTICLE_SLUG, getDict, locales, pageHref } from '@/lib/i18n';
import { IMAGES } from '@/lib/images';
import { pageMeta } from '@/lib/seo';
import type { Locale } from '@/content/content';

type Params = { locale: Locale; slug: string };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale, slug: ARTICLE_SLUG }));
}

export function generateMetadata({ params }: { params: Params }) {
  const a = getDict(params.locale).article;
  return pageMeta(params.locale, '/insights/' + ARTICLE_SLUG, a.title, a.lede);
}

export default function Article({ params }: { params: Params }) {
  if (params.slug !== ARTICLE_SLUG) notFound();
  const l = params.locale;
  const d = getDict(l);
  const a = d.article;
  const u = d.ui;
  const sections = a.body.map((b, i) => ({ ...b, id: 'sec-' + (i + 1) }));
  const related = d.insights.items.filter((it) => it.type === 1).slice(1, 3);

  return (
    <main>
      <article>
        <header className="page-hero navy g">
          <Reveal className="head-row kicker on-navy no-rule">
            <TLink href={pageHref(l, 'insights')} className="back">← {u.insights}</TLink>
            <span className="gold">{u.sample}</span>
          </Reveal>
          <Reveal className="meta kicker"><span className="gold">{a.cat}</span><span className="slate">{a.date}</span><span className="slate">{a.read} {u.min}</span></Reveal>
          <Reveal as="h1" className="serif display-l2 balance measure-16">{a.title}</Reveal>
          <div className="auto-grid-260 gap-40 align-end">
            <Reveal className="byline">{u.author} <span>{a.author}</span></Reveal>
            <Reveal as="p" className="serif article__lede">{a.lede}</Reveal>
          </div>
        </header>
        <Reveal type="clip" className="bleed bleed--72"><Figure src={IMAGES.article} label="Article image" /></Reveal>

        <div className="ivory g section-sm">
          <div className="grid12">
            <aside className="col-1-3 article__aside"><ArticleToc title={u.contents} items={sections} /></aside>
            <div className="col-5-11 stack-56 article__body">
              {sections.map((b, i) => (
                <section key={b.id} id={b.id} className="stack-20">
                  <Reveal as="h2" className="article__h"><span className="serif italic ink-3">§ {i + 1}</span>{b.h}</Reveal>
                  {b.p.map((t, j) => <Reveal as="p" key={j}>{t}</Reveal>)}
                  {i === 2 && <Reveal as="blockquote" type="wipe" className="article__quote serif italic">“{a.quote}”</Reveal>}
                </section>
              ))}
              <Reveal className="sources">
                <span className="kicker">{u.sources}</span>
                {a.sources.map((s, i) => <span key={i} className="sources__item"><sup>{i + 1}</sup>{s}</span>)}
              </Reveal>
            </div>
          </div>
        </div>

        <section className="ivory g section-bottom">
          <div className="head-row align-end">
            <span className="serif display-xs">{u.related}</span>
            <TLink href={pageHref(l, 'insights')} className="ulink">{u.all} <span>→</span></TLink>
          </div>
          <div className="auto-grid-280 gap-24">
            {related.map((r) => (
              <TLink key={r.title} href={pageHref(l, 'article')} className="related">
                <div className="meta kicker space-between"><span>{r.cat}</span><span className="ink-3">{r.date}</span></div>
                <span className="serif related__title pretty">{r.title}</span>
              </TLink>
            ))}
          </div>
        </section>
      </article>
      <ClosingCta d={d} l={l} />
      <Footer d={d} />
    </main>
  );
}
