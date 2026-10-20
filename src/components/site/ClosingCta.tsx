import { Reveal } from './Reveal';
import { TLink } from './TLink';
import { pageHref } from '@/lib/i18n';
import { site, type Dict, type Locale } from '@/content/content';

export function ClosingCta({ d, l, label }: { d: Dict; l: Locale; label?: string }) {
  const u = d.ui;
  return (
    <section className="cta g">
      <div className="stack-48">
        <Reveal className="kicker slate">{label ?? u.ctK}</Reveal>
        <TLink href={pageHref(l, 'contact')} className="cta__title serif">
          <Reveal type="line">{u.ctL1} <em>{u.ctL2}</em></Reveal>
        </TLink>
        <div className="auto-grid-200 gap-40 align-start">
          <Reveal as="p" className="body on-navy measure-38">{u.ctText}</Reveal>
          <Reveal className="info"><span className="info__k">{u.phone}</span><a href={site.phoneHref}>{site.phone}</a></Reveal>
          <Reveal className="info"><span className="info__k">{u.office}</span><span>{u.address}</span></Reveal>
          <Reveal><TLink href={pageHref(l, 'contact')} className="btn btn--gold">{u.ctCta} <span>→</span></TLink></Reveal>
        </div>
      </div>
    </section>
  );
}
