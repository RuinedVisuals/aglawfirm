import { Reveal } from '@/components/site/Reveal';
import { TLink } from '@/components/site/TLink';
import { pageHref } from '@/lib/i18n';
import type { HomeDict, Locale } from '@/content/content';

export function Approach({ h }: { h: HomeDict }) {
  return (
    <section className="navy g section">
      <div className="grid12">
        <div className="col-1-4 stack-32">
          <Reveal className="kicker slate">{h.art} V — {h.apLabel}</Reveal>
          <Reveal as="h2" className="serif display-m balance">{h.apTitle}</Reveal>
        </div>
        <div className="col-6-12">
          {h.steps.map((s, i) => (
            <Reveal key={i} className="clause rule-fade">
              <span className="serif gold fs-22">§ {i + 1}</span>
              <div className="stack-12">
                <span className="serif fs-30">{s.title}</span>
                <span className="body on-navy measure-52">{s.text}</span>
              </div>
            </Reveal>
          ))}
          <div className="sign">
            <Reveal type="wipe" className="sign__name serif italic">Alkiviadis S. Gkanatsios</Reveal>
            <Reveal className="kicker slate">{h.signRole}</Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export function InsightsTeaser({ h, l }: { h: HomeDict; l: Locale }) {
  return (
    <section id="insights" className="ivory g section">
      <div className="head-split">
        <div className="stack-28">
          <Reveal className="kicker">{h.art} VI — {h.inLabel}</Reveal>
          <Reveal as="h2" className="serif display-m">{h.inTitle}</Reveal>
        </div>
        <Reveal><TLink href={pageHref(l, 'insights')} className="ulink">{h.inAll} <span>→</span></TLink></Reveal>
      </div>
      <div className="list">
        {h.posts.map((p, i) => (
          <Reveal key={i}>
            <TLink href={pageHref(l, 'article')} className="list__row">
              <span className="kicker ink-3">{p.date}</span>
              <span className="kicker">{p.cat}</span>
              <span className="serif list__title">{p.title}</span>
              <span className="list__arrow" aria-hidden="true">↗</span>
            </TLink>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
