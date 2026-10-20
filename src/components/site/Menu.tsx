'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useSite } from './SiteProvider';
import { TLink } from './TLink';
import { Magnetic } from './Magnetic';
import { gsap, EASE_IO, D1, D2, reducedMotion, useIsoLayoutEffect } from '@/lib/motion';
import { labelFor, pad, pageHref, pageKeyFromPath, ROMAN, type PageKey } from '@/lib/i18n';
import { site } from '@/content/content';
import s from './Menu.module.scss';

// Fullscreen "pillars" menu: five columns drop in; hovered column expands.
export function Menu() {
  const { dict, locale, menuOpen, setMenuOpen } = useSite();
  const pathname = usePathname();
  const cur = pageKeyFromPath(pathname);
  const [hover, setHover] = useState<number | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const cols = useRef<HTMLAnchorElement[]>([]);
  const chrome = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const first = useRef(true);

  useIsoLayoutEffect(() => {
    const narrow = matchMedia('(max-width: 820px)').matches;
    const axis = narrow ? 'xPercent' : 'yPercent';
    const other = narrow ? 'yPercent' : 'xPercent';
    if (first.current) {
      first.current = false;
      gsap.set(cols.current, { [axis]: -101, [other]: 0 });
      gsap.set(chrome.current, { autoAlpha: 0 });
      return;
    }
    if (reducedMotion()) {
      gsap.set(root.current, { visibility: menuOpen ? 'visible' : 'hidden' });
      gsap.set(cols.current, { [axis]: menuOpen ? 0 : -101 });
      gsap.set(chrome.current, { autoAlpha: menuOpen ? 1 : 0 });
      return;
    }
    const tl = gsap.timeline();
    if (menuOpen) {
      tl.set(root.current, { visibility: 'visible' })
        .set(cols.current, { [other]: 0 })
        .to(cols.current, { [axis]: 0, duration: D2, ease: EASE_IO, stagger: 0.07 })
        .to(chrome.current, { autoAlpha: 1, duration: D1 }, 0.7);
    } else {
      setHover(null);
      tl.to(chrome.current, { autoAlpha: 0, duration: 0.3 })
        .to([...cols.current].reverse(), { [axis]: -101, duration: D2, ease: EASE_IO, stagger: 0.05 }, 0)
        .set(root.current, { visibility: 'hidden' });
    }
    return () => { tl.kill(); };
  }, [menuOpen]);

  useEffect(() => { if (menuOpen) setTimeout(() => closeBtn.current?.focus(), 700); }, [menuOpen]);

  const isCurrent = (key: string) =>
    key === cur || (key === 'expertise' && (cur === 'commercial' || cur === 'real-estate')) || (key === 'insights' && cur === 'article');

  return (
    <div ref={root} className={s.menu} role="dialog" aria-modal="true" aria-label="Menu" aria-hidden={!menuOpen}>
      <nav className={s.cols} onMouseLeave={() => setHover(null)}>
        {dict.nav.map(([key, desc], i) => {
          const state = hover === null ? 'idle' : hover === i ? 'active' : 'dim';
          const label = labelFor(dict, key as PageKey);
          return (
            <TLink
              key={key}
              ref={(el) => { if (el) cols.current[i] = el; }}
              href={pageHref(locale, key as PageKey)}
              className={s.col}
              data-state={state}
              data-current={isCurrent(key) ? 'true' : undefined}
              onMouseEnter={() => setHover(i)}
              onFocus={() => setHover(i)}
              tabIndex={menuOpen ? 0 : -1}
            >
              <span className={s.bar} />
              <span className={s.numeral} aria-hidden="true">{ROMAN[i]}</span>
              <span className={s.num}>{pad(i + 1)}</span>
              <span className={s.vlabel} aria-hidden="true">{label}</span>
              <span className={s.hbox}>
                <span className={s.htitle}>{label} <em>→</em></span>
                <span className={s.desc}>{desc}</span>
              </span>
            </TLink>
          );
        })}
      </nav>
      <div ref={chrome} className={s.chrome}>
        <span className={s.logo}><img src="/images/logo.webp" alt="AG" /></span>
        <div className={s.chromeRight}>
          <a className={s.phone} href={site.phoneHref} tabIndex={menuOpen ? 0 : -1}>{site.phone}</a>
          <Magnetic>
            <button ref={closeBtn} className={s.close} onClick={() => setMenuOpen(false)} tabIndex={menuOpen ? 0 : -1}>
              {dict.ui.close} <span aria-hidden="true">✕</span>
            </button>
          </Magnetic>
        </div>
      </div>
    </div>
  );
}
