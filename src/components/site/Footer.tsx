'use client';

import { useSite } from './SiteProvider';
import { ClosingCta } from './ClosingCta';
import type { Dict } from '@/content/content';

function TopButton({ label }: { label: string }) {
  const { scrollTo } = useSite();
  return <button className="footer__top" onClick={() => scrollTo(0)}>{label} ↑</button>;
}

export function Footer({ d, cta = true, label }: { d: Dict; cta?: boolean; label?: string }) {
  const { locale } = useSite();
  return (
    <footer className="footer g">
      {cta && <ClosingCta d={d} l={locale} label={label} />}
      <div className="footer__row">
        <span>© {new Date().getFullYear()} ALKIVIADIS S. GKANATSIOS &amp; ASSOCIATES</span>
        <div className="footer__links">
          <a href="#">{d.ui.privacy}</a>
          <a href="#">{d.ui.legal}</a>
          <TopButton label={d.ui.top} />
        </div>
      </div>
      <div className="footer__word serif" aria-hidden="true">{d.ui.wordmark}</div>
    </footer>
  );
}
