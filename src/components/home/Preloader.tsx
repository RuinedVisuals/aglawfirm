'use client';

import { useRef, useState } from 'react';
import { gsap, EASE_IO, D2, markReady, reducedMotion, useIsoLayoutEffect } from '@/lib/motion';

// Year counter 1983 → 2026, then the five columns lift. Once per session.
export function Preloader({ note }: { note: string }) {
  const [show, setShow] = useState(true);
  const count = useRef<HTMLSpanElement>(null);
  const text = useRef<HTMLDivElement>(null);
  const cols = useRef<HTMLDivElement[]>([]);

  useIsoLayoutEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem('agLoaded') === '1'; sessionStorage.setItem('agLoaded', '1'); } catch {}
    if (seen || reducedMotion()) { setShow(false); markReady(); return; }
    document.documentElement.style.overflow = 'hidden';
    const o = { v: 1983 };
    const tl = gsap.timeline({ onComplete: () => { setShow(false); document.documentElement.style.overflow = ''; } });
    tl.to(o, { v: 2026, duration: 1.3, ease: 'power3.out', onUpdate: () => { if (count.current) count.current.textContent = String(Math.round(o.v)); } })
      .to(text.current, { autoAlpha: 0, duration: 0.5 }, 1.4)
      .add(markReady, 1.5)
      .to(cols.current, { yPercent: -101, duration: D2, ease: EASE_IO, stagger: 0.08 }, 1.5);
    return () => { tl.kill(); document.documentElement.style.overflow = ''; };
  }, []);

  if (!show) return null;
  return (
    <div className="preloader" aria-hidden="true">
      <div className="preloader__cols">
        {[0, 1, 2, 3, 4].map((i) => <div key={i} ref={(el) => { if (el) cols.current[i] = el; }} />)}
      </div>
      <div ref={text} className="preloader__text g">
        <span className="kicker slate">ALKIVIADIS S. GKANATSIOS &amp; ASSOCIATES</span>
        <div className="preloader__row">
          <span ref={count} className="preloader__count serif">1983</span>
          <span className="kicker gold">{note}</span>
        </div>
      </div>
    </div>
  );
}
