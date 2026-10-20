'use client';

import { useEffect, useRef } from 'react';
import { Reveal } from '@/components/site/Reveal';
import { TLink } from '@/components/site/TLink';
import { ScrollTrigger, reducedMotion } from '@/lib/motion';
import { pageHref } from '@/lib/i18n';
import type { HomeDict, Locale } from '@/content/content';

// Art. I — the statement lights up word by word on scroll.
export function Intro({ h, l }: { h: HomeDict; l: Locale }) {
  const p = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    const el = p.current!;
    const words = Array.from(el.querySelectorAll<HTMLSpanElement>('.w'));
    if (reducedMotion()) { words.forEach((w) => (w.style.opacity = '1')); return; }
    const st = ScrollTrigger.create({
      trigger: el, start: 'top 85%', end: 'bottom 45%', scrub: true,
      onUpdate: (s) => {
        const n = words.length;
        words.forEach((w, i) => { w.style.opacity = String(0.16 + 0.84 * Math.min(1, Math.max(0, s.progress * (n + 3) - i))); });
      }
    });
    return () => st.kill();
  }, [h.introStatement]);

  return (
    <section id="firm" className="ivory g section">
      <div className="grid12">
        <div className="col-1-3 stack-20 pt-12">
          <Reveal className="kicker">{h.art} I</Reveal>
          <Reveal className="serif italic ink-2 fs-20">{h.firmLabel}</Reveal>
        </div>
        <div className="col-4-12 stack-64">
          <p ref={p} className="serif display-s pretty words">
            {h.introStatement.split(' ').map((w, i) => <span key={i} className="w">{w} </span>)}
            <sup className="fn">1</sup>
          </p>
          <div className="auto-grid-260 gap-40 align-end">
            <Reveal as="p" className="body-l ink-2 measure-46">{h.introBody}</Reveal>
            <Reveal className="stack-28">
              <span className="footnote">¹ {h.footnote}</span>
              <TLink href={pageHref(l, 'about')} className="ulink">{h.introLink} <span>→</span></TLink>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
