'use client';

import Image from 'next/image';
import { useState } from 'react';
import { TLink } from '@/components/site/TLink';
import { pageHref } from '@/lib/i18n';
import type { Dict, Locale } from '@/content/content';

type Item = Dict['insights']['items'][number] & { img?: string; sample?: boolean };

function Thumb({ img, big }: { img?: string; big?: boolean }) {
  return (
    <span className={big ? 'thumb thumb--big' : 'thumb'}>
      {img ? <Image src={img} alt="" fill sizes={big ? '50vw' : '88px'} style={{ objectFit: 'cover', filter: 'grayscale(1) contrast(1.05)' }} /> : <span className="thumb__para serif italic">§</span>}
    </span>
  );
}

export function InsightsView({ d, l }: { d: Dict; l: Locale }) {
  const [filter, setFilter] = useState(0);
  const u = d.ui;
  const items = d.insights.items as Item[];
  const list = items.filter((it) => filter === 0 || it.type === filter);
  const [featured, ...rest] = list;
  const href = (it: Item) => (it.type === 1 ? pageHref(l, 'article') : undefined);

  return (
    <section className="ivory g section-sm">
      <div className="filters" role="tablist" aria-label="Filter">
        {d.insights.filters.map((f, i) => (
          <button key={f} role="tab" aria-selected={filter === i} className={'filter' + (filter === i ? ' is-on' : '')} onClick={() => setFilter(i)}>{f}</button>
        ))}
      </div>

      {featured && (
        <Row it={featured} href={href(featured)} className="featured">
          <Thumb img={featured.img} big />
          <div className="stack-24">
            <div className="meta kicker"><span>{featured.cat}</span><span className="ink-3">{featured.date}</span><span className="ink-3">{featured.read} {u.min}</span></div>
            <span className="serif featured__title pretty">{featured.title}</span>
            {href(featured) && <span className="kicker">{u.readMore} →</span>}
          </div>
        </Row>
      )}

      <div className="list">
        {rest.map((it, i) => (
          <Row key={it.title + i} it={it} href={href(it)} className="list__row list__row--thumb">
            <span className="kicker ink-3">{it.date}</span>
            <span className="kicker">{it.cat}</span>
            <span className="serif list__title">{it.title}</span>
            <Thumb img={it.img} />
          </Row>
        ))}
      </div>
    </section>
  );
}

function Row({ it, href, className, children }: { it: Item; href?: string; className: string; children: React.ReactNode }) {
  return href ? <TLink href={href} className={className}>{children}</TLink> : <div className={className + ' is-static'}>{children}</div>;
}
