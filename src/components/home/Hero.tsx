'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { HeroGL } from './HeroGL';
import { Magnetic } from '@/components/site/Magnetic';
import { useSite } from '@/components/site/SiteProvider';
import { gsap, EASE, EASE_IO, D2, D3, onReady, reducedMotion, useIsoLayoutEffect } from '@/lib/motion';
import type { HomeDict } from '@/content/content';

export function Hero({ h, src }: { h: HomeDict; src?: string }) {
  const root = useRef<HTMLElement>(null);
  const { scrollTo } = useSite();

  useIsoLayoutEffect(() => {
    const el = root.current!;
    const q = gsap.utils.selector(el);
    if (reducedMotion()) { gsap.set(q('.hero__strip'), { display: 'none' }); return; }
    const ctx = gsap.context(() => {
      gsap.set(q('.hero__line > span'), { yPercent: 110 });
      gsap.set(q('.hero__fade'), { autoAlpha: 0, y: 28 });
      gsap.set(q('.hero__clip'), { clipPath: 'inset(18% 22% 18% 22%)' });
      gsap.set(q('.hero__zoom'), { scale: 1.35 });
    }, el);
    onReady(() => ctx.add(() => {
      gsap.timeline()
        .to(q('.hero__strip'), { yPercent: -101, duration: D2, ease: EASE_IO, stagger: 0.07 })
        .to(q('.hero__clip'), { clipPath: 'inset(0% 0% 0% 0%)', duration: D3, ease: EASE_IO }, 0.2)
        .to(q('.hero__zoom'), { scale: 1, duration: D3 * 1.5, ease: EASE }, 0.2)
        .to(q('.hero__fade'), { autoAlpha: 1, y: 0, duration: D2, ease: EASE, stagger: 0.1 }, 0.6)
        .to(q('.hero__line > span'), { yPercent: 0, duration: D2, ease: EASE, stagger: 0.14 }, 0.7);
    }));
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', e.clientX - r.left + 'px');
      el.style.setProperty('--my', e.clientY - r.top + 'px');
    };
    el.addEventListener('mousemove', move);
    return () => { el.removeEventListener('mousemove', move); ctx.revert(); };
  }, []);

  return (
    <section ref={root} id="top" className="hero g">
      <div className="hero__clip">
        <div className="hero__zoom">
          {src ? (
            <>
              <Image src={src} alt="" fill priority sizes="100vw" style={{ objectFit: 'cover' }} />
              <HeroGL src={src} />
            </>
          ) : (
            <span className="figure__ph">Hero photograph — /public/images/hero.jpg</span>
          )}
        </div>
      </div>
      <div className="hero__shade" aria-hidden="true" />
      <div className="hero__strips" aria-hidden="true">
        {[0, 1, 2, 3, 4, 5].map((i) => <div key={i} className="hero__strip" />)}
      </div>
      <div className="hero__main">
        <div className="hero__fade kicker kicker--para"><span className="para">§</span>{h.heroKicker}</div>
        <h1 className="serif hero__title">
          <span className="hero__line"><span>{h.heroA} {h.heroB}</span></span>
          <span className="hero__line"><span className="hero__l2">{h.heroC}</span></span>
        </h1>
      </div>
      <div className="hero__foot">
        <p className="hero__fade lede on-navy">{h.heroLede}</p>
        <div className="hero__fade hero__cta-wrap">
          <Magnetic>
            <a href="#expertise" className="hero__cta" onClick={(e) => { e.preventDefault(); scrollTo('#expertise'); }}>
              <span>{h.cta}<br />↓</span>
            </a>
          </Magnetic>
        </div>
        <div className="hero__fade hero__meta kicker on-navy"><span>{h.est}</span><span>{h.city}</span></div>
      </div>
    </section>
  );
}
