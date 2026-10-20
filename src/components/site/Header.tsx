'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useSite } from './SiteProvider';
import { TLink } from './TLink';
import { Magnetic } from './Magnetic';
import { kickerFor, labelFor, pageHref, pageKeyFromPath } from '@/lib/i18n';
import s from './Header.module.scss';

export function Header() {
  const { dict, locale, setMenuOpen } = useSite();
  const pathname = usePathname();
  const key = pageKeyFromPath(pathname);
  const bar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const on = () => {
      const h = document.documentElement.scrollHeight - innerHeight;
      if (bar.current) bar.current.style.transform = 'scaleX(' + (h > 0 ? scrollY / h : 0) + ')';
    };
    on();
    addEventListener('scroll', on, { passive: true });
    return () => removeEventListener('scroll', on);
  }, [pathname]);

  const rest = pathname.slice(3);
  const rail = key === 'home' ? dict.ui.art + ' — · ' + labelFor(dict, 'home').toUpperCase() : kickerFor(dict, key) + ' · ' + labelFor(dict, key).toUpperCase();

  return (
    <header className={s.header}>
      <TLink href={pageHref(locale, 'home')} className={s.brand} aria-label="AG Law Firm — home">
        <span className={s.mark}><span className={s.markImg} /></span>
        <span className={s.brandText}>
          <span className={s.name}>AG LAW FIRM</span>
          <span className={s.sub}>{dict.ui.attorneys}</span>
        </span>
      </TLink>
      <div className={s.rail} aria-hidden="true">
        <span>{rail}</span>
        <span className={s.track}><span ref={bar} className={s.bar} /></span>
      </div>
      <div className={s.actions}>
        <nav className={s.lang} aria-label="Language">
          <Link href={'/en' + rest} scroll={false} aria-current={locale === 'en' ? 'true' : undefined}>EN</Link>
          <span aria-hidden="true">/</span>
          <Link href={'/el' + rest} scroll={false} aria-current={locale === 'el' ? 'true' : undefined}>EL</Link>
        </nav>
        <Magnetic>
          <button className={s.menuBtn} onClick={() => setMenuOpen(true)} aria-haspopup="dialog">
            <span>{dict.ui.menu}</span>
            <span className={s.lines} aria-hidden="true"><i /><i /><i /><i /><i /></span>
          </button>
        </Magnetic>
      </div>
    </header>
  );
}
