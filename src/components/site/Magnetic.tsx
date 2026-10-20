'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { gsap, coarsePointer, reducedMotion } from '@/lib/motion';

export function Magnetic({ children, strength = 0.3, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion() || coarsePointer()) return;
    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' });
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2 - (gsap.getProperty(el, 'x') as number);
      const cy = r.top + r.height / 2 - (gsap.getProperty(el, 'y') as number);
      const dx = e.clientX - cx, dy = e.clientY - cy;
      const near = Math.hypot(dx, dy) < Math.max(r.width, r.height) / 2 + 60;
      xTo(near ? dx * strength : 0);
      yTo(near ? dy * strength : 0);
    };
    addEventListener('mousemove', move, { passive: true });
    return () => removeEventListener('mousemove', move);
  }, [strength]);
  return <span ref={ref} className={className} style={{ display: 'inline-flex' }}>{children}</span>;
}
