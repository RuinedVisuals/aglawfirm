'use client';

import { useEffect, useRef, useState } from 'react';
import { Figure } from '@/components/site/Figure';
import { Reveal } from '@/components/site/Reveal';
import { TLink } from '@/components/site/TLink';
import { ScrollTrigger } from '@/lib/motion';
import { pad, pageHref } from '@/lib/i18n';
import type { HomeDict, Locale } from '@/content/content';

// Art. II — sticky image crossfades between the two pillars as the text scrolls.
export function ExpertiseSticky({ h, l, images }: { h: HomeDict; l: Locale; images: (string | undefined)[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<HTMLElement[]>([]);
  useEffect(() => {
    const sts = refs.current.map((el, i) =>
      ScrollTrigger.create({ trigger: el, start: 'top 50%', end: 'bottom 50%', onToggle: (s) => { if (s.isActive) setActive(i); } })
    );
    return () => sts.forEach((s) => s.kill());
  }, []);
  const hrefs = [pageHref(l, 'commercial'), pageHref(l, 'real-estate')];

  return (
    <section id="expertise" className="ivory g">
      <div className="head-row kicker"><span>{h.art} II — {h.expLabel}</span><span className="ink-2">{h.expHint}</span></div>
      <div className="exp">
        <div className="exp__sticky">
          <div className="exp__media">
            {h.pillars.map((p, i) => (
              <div key={i} className={'exp__img' + (active === i ? ' is-active' : '')}>
                <Figure src={images[i]} label={p.title} sizes="50vw" />
              </div>
            ))}
          </div>
          <div className="exp__count kicker"><span>{pad(active + 1)} / 02</span><span className="ink-2">{h.pillars[active].cap}</span></div>
        </div>
        <div>
          {h.pillars.map((p, i) => (
            <article key={i} ref={(el) => { if (el) refs.current[i] = el; }} className="exp__article">
              <Reveal className="serif italic ink-2 fs-22">{pad(i + 1)}</Reveal>
              <Reveal as="h2" className="serif display-l3 balance">{p.title}</Reveal>
              <Reveal as="p" className="body ink-2 measure-44">{p.desc}</Reveal>
              <ol className="clauses">
                {p.list.map((s, j) => (
                  <Reveal as="li" key={j}><span className="serif italic ink-3">§ {j + 1}</span>{s}</Reveal>
                ))}
              </ol>
              <Reveal><TLink href={hrefs[i]} className="btn btn--ink">{h.discover} <span>→</span></TLink></Reveal>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
