'use client';

import { useEffect, useRef, useState } from 'react';
import { Figure } from '@/components/site/Figure';
import { ScrollTrigger } from '@/lib/motion';
import type { HomeDict } from '@/content/content';

// Art. III — sticky stage; the year scrubs 1983 → 2026 and the timeline fills.
export function Heritage({ h, portrait }: { h: HomeDict; portrait?: string }) {
  const root = useRef<HTMLElement>(null);
  const year = useRef<HTMLSpanElement>(null);
  const line = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: root.current, start: 'top top', end: 'bottom bottom',
      onUpdate: (s) => {
        const p = s.progress;
        if (year.current) year.current.textContent = String(Math.round(1983 + p * 43));
        if (line.current) line.current.style.transform = 'scaleX(' + p + ')';
        const i = p < 0.34 ? 0 : p < 0.72 ? 1 : 2;
        setIdx((prev) => (prev === i ? prev : i));
      }
    });
    return () => st.kill();
  }, []);
  const active = h.timeline[idx];
  return (
    <section ref={root} id="heritage" className="heritage navy">
      <div className="heritage__stage g">
        <div className="heritage__top">
          <div className="stack-24">
            <span className="kicker slate">{h.art} III — {h.herLabel}</span>
            <h2 className="serif display-m2 balance measure-14">{h.herTitle}</h2>
          </div>
          <div className="heritage__portrait"><Figure src={portrait} label="Portrait (b/w)" sizes="240px" /></div>
        </div>
        <div className="heritage__mid">
          <span ref={year} className="heritage__year serif outline">1983</span>
          <div className="stack-16 measure-34">
            <span className="serif italic gold fs-24">{active.y}</span>
            <span className="serif heritage__text">{active.text}</span>
          </div>
        </div>
        <div className="heritage__track">
          <div className="heritage__rail" />
          <div ref={line} className="heritage__fill" />
          <div className="heritage__steps">
            {h.timeline.map((t, i) => (
              <div key={i} className={'heritage__step' + (i <= idx ? ' is-on' : '')}><span>{t.y}</span><span className="slate">{t.short}</span></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
