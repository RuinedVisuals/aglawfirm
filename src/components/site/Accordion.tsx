'use client';

import { useId, useState } from 'react';
import { TLink } from './TLink';

type Item = { title: string; body: string; cta?: { href: string; label: string } };

export function Accordion({ items, tone, markers, initial = null }: { items: Item[]; tone: 'navy' | 'ivory'; markers?: string[]; initial?: number | null }) {
  const [open, setOpen] = useState<number | null>(initial);
  const uid = useId();
  return (
    <div className={'acc acc--' + tone + (markers ? ' acc--marked' : '')}>
      {items.map((it, i) => {
        const o = open === i;
        const id = uid + '-' + i;
        return (
          <div key={i} className={'acc__item' + (o ? ' is-open' : '')}>
            <button className="acc__head" aria-expanded={o} aria-controls={id} onClick={() => setOpen(o ? null : i)}>
              {markers && <span className="acc__marker">{markers[i]}</span>}
              <span className="acc__title">{it.title}</span>
              <span className="acc__icon" aria-hidden="true">+</span>
            </button>
            <div id={id} role="region" className="acc__panel">
              <div className="acc__inner">
                <div className="acc__body">
                  <p>{it.body}</p>
                  {it.cta && <TLink href={it.cta.href} className="ulink ulink--gold">{it.cta.label} <span>→</span></TLink>}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
