'use client';

import { useEffect, useRef, useState } from 'react';
import { Figure } from '@/components/site/Figure';
import { Reveal } from '@/components/site/Reveal';
import { TLink } from '@/components/site/TLink';
import { gsap, coarsePointer, reducedMotion } from '@/lib/motion';
import { pageHref, ROMAN } from '@/lib/i18n';
import type { HomeDict, Locale } from '@/content/content';

// Art. IV — focus list with a cursor-following image trail.
export function PracticeAreas({ h, l, images }: { h: HomeDict; l: Locale; images: (string | undefined)[] }) {
  const [hover, setHover] = useState<number | null>(null);
  const trail = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = trail.current;
    if (!el || reducedMotion() || coarsePointer()) return;
    const xTo = gsap.quickTo(el, 'x', { duration: 0.9, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.9, ease: 'power3.out' });
    const rTo = gsap.quickTo(el, 'rotation', { duration: 1.1, ease: 'power3.out' });
    let lx = 0;
    const move = (e: MouseEvent) => {
      xTo(e.clientX - el.offsetWidth / 2);
      yTo(e.clientY - el.offsetHeight / 2);
      rTo(Math.max(-9, Math.min(9, (e.clientX - lx) * 0.3)));
      lx = e.clientX;
    };
    addEventListener('mousemove', move, { passive: true });
    return () => removeEventListener('mousemove', move);
  }, []);

  return (
    <section className="ivory g section">
      <div className="grid12 pb-64">
        <Reveal className="kicker col-1-4 pt-14">{h.art} IV — {h.paLabel}</Reveal>
        <Reveal as="h2" className="serif display-m col-5-12">{h.paTitle}</Reveal>
      </div>
      <div className="areas" onMouseLeave={() => setHover(null)}>
        {h.areas.map((a, i) => (
          <Reveal key={i}>
            <TLink
              href={pageHref(l, 'expertise')}
              className="areas__row"
              data-state={hover === null ? 'idle' : hover === i ? 'active' : 'dim'}
              onMouseEnter={() => setHover(i)}
            >
              <span className="serif italic ink-3 fs-20">{ROMAN[i + 2]}.</span>
              <span className="serif areas__title">{a.title}</span>
              <span className="areas__desc">{a.desc}</span>
              <span className="areas__arrow" aria-hidden="true">→</span>
            </TLink>
          </Reveal>
        ))}
      </div>
      <div ref={trail} className={'trail' + (hover !== null ? ' is-on' : '')} aria-hidden="true">
        <div className="trail__inner">
          {h.areas.map((a, i) => (
            <div key={i} className={'trail__img' + (hover === i ? ' is-active' : '')}><Figure src={images[i]} label={a.title} sizes="300px" /></div>
          ))}
        </div>
      </div>
    </section>
  );
}
