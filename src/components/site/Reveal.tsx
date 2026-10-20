'use client';

import { useRef, type CSSProperties, type ReactNode } from 'react';
import { gsap, EASE, EASE_IO, D2, D3, reducedMotion, useIsoLayoutEffect } from '@/lib/motion';

type RevealType = 'fade' | 'line' | 'clip' | 'wipe';
type Props = {
  as?: keyof JSX.IntrinsicElements;
  type?: RevealType;
  delay?: number; // ms
  className?: string;
  style?: CSSProperties;
  id?: string;
  children?: ReactNode;
};

const FROM: Record<RevealType, gsap.TweenVars> = {
  fade: { autoAlpha: 0, y: 28 },
  line: { yPercent: 110 },
  clip: { clipPath: 'inset(14% 10% 14% 10%)' },
  wipe: { clipPath: 'inset(0% 100% 0% 0%)' }
};
const TO: Record<RevealType, gsap.TweenVars> = {
  fade: { autoAlpha: 1, y: 0 },
  line: { yPercent: 0 },
  clip: { clipPath: 'inset(0% 0% 0% 0%)' },
  wipe: { clipPath: 'inset(0% 0% 0% 0%)' }
};

// Scroll-triggered reveal. Content is visible without JS / with reduced motion.
export function Reveal({ as = 'div', type = 'fade', delay = 0, className, style, id, children }: Props) {
  const ref = useRef<HTMLElement>(null);
  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion()) return;
    const target = type === 'line' ? (el.firstElementChild as HTMLElement) : el;
    const ctx = gsap.context(() => {
      gsap.fromTo(target, FROM[type], {
        ...TO[type],
        duration: type === 'clip' || type === 'wipe' ? D3 : D2,
        delay: delay / 1000,
        ease: type === 'clip' ? EASE_IO : EASE,
        scrollTrigger: { trigger: el, start: 'top 92%', once: true }
      });
    }, el);
    return () => ctx.revert();
  }, [type, delay]);

  const Tag = (type === 'line' && as === 'div' ? 'span' : as) as any;
  if (type === 'line') {
    return (
      <Tag ref={ref} id={id} className={'mask ' + (className ?? '')} style={style}>
        <span style={{ display: 'block' }}>{children}</span>
      </Tag>
    );
  }
  return <Tag ref={ref} id={id} className={className} style={style}>{children}</Tag>;
}
