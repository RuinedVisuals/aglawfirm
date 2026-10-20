'use client';

import { useEffect, useRef, useState } from 'react';
import { useSite } from './SiteProvider';
import { site } from '@/content/content';
import s from './QuickContact.module.scss';

const Icon = {
  phone: <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z" />,
  mail: <path d="M3 5h18v14H3zM3 6l9 7 9-7" />,
  insta: <><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r="0.8" /></>
};

// Floating quick-contact: logo button with rotating label, three actions fan out.
export function QuickContact() {
  const { locale, dict, menuOpen } = useSite();
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const el = locale === 'el';

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onDown = (e: MouseEvent) => { if (!box.current?.contains(e.target as Node)) setOpen(false); };
    addEventListener('keydown', onKey);
    addEventListener('mousedown', onDown);
    return () => { removeEventListener('keydown', onKey); removeEventListener('mousedown', onDown); };
  }, [open]);

  useEffect(() => { if (menuOpen) setOpen(false); }, [menuOpen]);

  const items = [
    { icon: Icon.insta, label: 'INSTAGRAM', value: '@alkis_gkanatsios', href: site.instagram, external: true },
    { icon: Icon.mail, label: dict.ui.email, value: site.email, href: 'mailto:' + site.email },
    { icon: Icon.phone, label: dict.ui.phone, value: site.phone, href: site.phoneHref }
  ];

  return (
    <div ref={box} className={s.wrap} data-open={open ? 'true' : undefined} data-hidden={menuOpen ? 'true' : undefined}>
      <div id="quick-contact" className={s.card} role="region" aria-label={el ? 'Γρήγορη επικοινωνία' : 'Quick contact'}>
        {items.map((it, i) => (
          <a
            key={it.label}
            href={it.href}
            className={s.item}
            style={{ ['--i' as string]: i }}
            tabIndex={open ? 0 : -1}
            {...(it.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            <span className={s.icon}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true">{it.icon}</svg>
            </span>
            <span className={s.text}>
              <span className={s.k}>{it.label}</span>
              <span className={s.v}>{it.value}</span>
            </span>
            <span className={s.arrow} aria-hidden="true">↗</span>
          </a>
        ))}
      </div>
      <button className={s.btn} onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="quick-contact">
        <span className={s.dot} aria-hidden="true" />
        <span>{open ? (el ? 'Κλείσιμο' : 'Close') : el ? 'Επικοινωνία' : 'Get in touch'}</span>
        <span className={s.plus} aria-hidden="true" />
      </button>
    </div>
  );
}
