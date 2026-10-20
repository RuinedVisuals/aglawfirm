'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, EASE, EASE_IO, D2, reducedMotion, coarsePointer } from '@/lib/motion';
import { kickerFor, labelFor, pageKeyFromPath } from '@/lib/i18n';
import type { Dict, Locale } from '@/content/content';
import s from './Curtain.module.scss';

type Ctx = {
  locale: Locale;
  dict: Dict;
  lenis: Lenis | null;
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
  navigate: (href: string) => void;
  scrollTo: (target: number | string | HTMLElement, immediate?: boolean) => void;
};

const SiteCtx = createContext<Ctx | null>(null);
export const useSite = () => {
  const c = useContext(SiteCtx);
  if (!c) throw new Error('useSite must be used inside <SiteProvider>');
  return c;
};

export function SiteProvider({ locale, dict, children }: { locale: Locale; dict: Dict; children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const [menuOpen, setMenuState] = useState(false);
  const [label, setLabel] = useState({ k: '', t: '' });
  const overlay = useRef<HTMLDivElement>(null);
  const cols = useRef<HTMLDivElement[]>([]);
  const texts = useRef<HTMLSpanElement[]>([]);
  const pending = useRef(false);
  const busy = useRef(false);

  // Smooth scroll (desktop only), synced with ScrollTrigger.
  useEffect(() => {
    if (reducedMotion() || coarsePointer()) return;
    const l = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9 });
    l.on('scroll', ScrollTrigger.update);
    const tick = (t: number) => l.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    setLenis(l);
    return () => { gsap.ticker.remove(tick); l.destroy(); };
  }, []);

  useEffect(() => {
    gsap.set(cols.current, { y: 0, yPercent: 101 });
    gsap.set(texts.current, { y: 0, yPercent: 110 });
  }, []);

  const setMenuOpen = useCallback((v: boolean) => {
    setMenuState(v);
    if (lenis) (v ? lenis.stop() : lenis.start());
    else document.documentElement.style.overflow = v ? 'hidden' : '';
  }, [lenis]);

  useEffect(() => {
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false); };
    addEventListener('keydown', k);
    return () => removeEventListener('keydown', k);
  }, [setMenuOpen]);

  const scrollTo = useCallback((target: number | string | HTMLElement, immediate = false) => {
    if (lenis) lenis.scrollTo(target as any, immediate ? { immediate: true, force: true } : { duration: 1.4, offset: typeof target === 'number' ? 0 : -100 });
    else if (typeof target === 'number') window.scrollTo({ top: target, behavior: immediate ? 'auto' : 'smooth' });
    else {
      const el = typeof target === 'string' ? document.querySelector(target) : target;
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + scrollY - 100, behavior: immediate ? 'auto' : 'smooth' });
    }
  }, [lenis]);

  // Column-curtain page transition: cover → route swap → reveal.
  const navigate = useCallback((href: string) => {
    if (busy.current) return;
    if (href === pathname) { setMenuOpen(false); scrollTo(0); return; }
    if (reducedMotion()) { setMenuOpen(false); router.push(href); return; }
    const key = pageKeyFromPath(href);
    setLabel({ k: kickerFor(dict, key), t: labelFor(dict, key) });
    busy.current = true;
    pending.current = true;
    router.prefetch(href);
    gsap.timeline()
      .set(overlay.current, { pointerEvents: 'auto' })
      .fromTo(cols.current, { yPercent: 101 }, { yPercent: 0, duration: D2, ease: EASE_IO, stagger: 0.06 })
      .fromTo(texts.current, { yPercent: 110 }, { yPercent: 0, duration: D2, ease: EASE }, 0.38)
      .add(() => { setMenuOpen(false); router.push(href, { scroll: false }); }, 1.4);
  }, [pathname, router, dict, setMenuOpen, scrollTo]);

  useEffect(() => {
    if (!pending.current) return;
    pending.current = false;
    scrollTo(0, true);
    const id = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      gsap.timeline({ onComplete: () => { busy.current = false; } })
        .to(texts.current, { yPercent: -110, duration: D2, ease: EASE })
        .to(cols.current, { yPercent: -101, duration: D2, ease: EASE_IO, stagger: 0.06 }, 0.1)
        .set(overlay.current, { pointerEvents: 'none' })
        .set(cols.current, { yPercent: 101 })
        .set(texts.current, { yPercent: 110 });
    });
    return () => cancelAnimationFrame(id);
  }, [pathname, scrollTo]);

  return (
    <SiteCtx.Provider value={{ locale, dict, lenis, menuOpen, setMenuOpen, navigate, scrollTo }}>
      {children}
      <div ref={overlay} className={s.curtain} aria-hidden="true">
        <div className={s.cols}>
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} ref={(el) => { if (el) cols.current[i] = el; }} className={s.col} />
          ))}
        </div>
        <div className={s.text}>
          <div className={s.mask}><span ref={(el) => { if (el) texts.current[0] = el; }} className={s.kicker}>{label.k}</span></div>
          <div className={s.mask}><span ref={(el) => { if (el) texts.current[1] = el; }} className={s.title}>{label.t}</span></div>
        </div>
      </div>
    </SiteCtx.Provider>
  );
}
