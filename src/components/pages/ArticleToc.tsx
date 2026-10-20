'use client';

import { useSite } from '@/components/site/SiteProvider';

export function ArticleToc({ title, items }: { title: string; items: { h: string; id: string }[] }) {
  const { scrollTo } = useSite();
  return (
    <nav className="toc" aria-label={title}>
      <span className="kicker toc__title">{title}</span>
      {items.map((it, i) => (
        <a key={it.id} href={'#' + it.id} onClick={(e) => { e.preventDefault(); scrollTo('#' + it.id); }}>
          <span className="serif italic ink-3">{i + 1}</span>{it.h}
        </a>
      ))}
    </nav>
  );
}
