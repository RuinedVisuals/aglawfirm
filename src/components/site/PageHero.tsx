import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

type Props = { kicker: string; title: string; lede?: string; size?: 'xxl' | 'xl' | 'l' | 'l2'; lineTitle?: boolean; children?: ReactNode; top?: ReactNode };

export function PageHero({ kicker, title, lede, size = 'l', lineTitle, children, top }: Props) {
  return (
    <section className="page-hero navy g">
      {top ?? (
        <Reveal className="kicker kicker--para"><span className="para">§</span>{kicker}</Reveal>
      )}
      {lineTitle ? (
        <h1 className={'serif display-' + size}><Reveal type="line">{title}</Reveal></h1>
      ) : (
        <Reveal as="h1" className={'serif balance display-' + size}>{title}</Reveal>
      )}
      {children}
      {lede && <Reveal as="p" className="lede on-navy page-hero__lede">{lede}</Reveal>}
    </section>
  );
}
