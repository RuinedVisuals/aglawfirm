'use client';

import { useEffect, useRef } from 'react';
import { Figure } from '@/components/site/Figure';
import { Reveal } from '@/components/site/Reveal';
import { gsap, reducedMotion } from '@/lib/motion';
import type { HomeDict } from '@/content/content';

// Full-bleed photograph that opens from a centred frame as you scroll.
export function Interlude({ h, src }: { h: HomeDict; src?: string }) {
  const root = useRef<HTMLElement>(null);
  const clip = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (reducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(clip.current, { clipPath: 'inset(12% 18% 12% 18%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'top top', scrub: true } });
      gsap.fromTo(img.current, { yPercent: 7, scale: 1.2 }, { yPercent: -7, scale: 1.08, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={root} className="interlude">
      <div ref={clip} className="interlude__clip">
        <div ref={img} className="interlude__img"><Figure src={src} label="Interlude — office, archive, books, stone" /></div>
      </div>
      <div className="interlude__shade" aria-hidden="true" />
      <div className="interlude__text g">
        <Reveal className="kicker kicker--para on-navy"><span className="para">§</span>{h.fsKicker}</Reveal>
        <h2 className="serif display-l">
          <Reveal type="line">{h.fsL1}</Reveal>
          <Reveal type="line" delay={120}><span className="italic gold indent">{h.fsL2}</span></Reveal>
        </h2>
      </div>
    </section>
  );
}
