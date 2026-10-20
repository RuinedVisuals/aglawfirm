import { useEffect, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

// Motion system — two curves, three durations.
// EASE ≈ cubic-bezier(.16,1,.3,1)  (reveals, hovers)
// EASE_IO ≈ cubic-bezier(.76,0,.24,1)  (curtains, clips, columns)
export const EASE = 'expo.out';
export const EASE_IO = 'power4.inOut';
export const D1 = 0.6;
export const D2 = 1.1;
export const D3 = 1.6;

export const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const coarsePointer = () =>
  typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

export const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

// Fires once the preloader hands over (or immediately when there is none).
export function onReady(cb: () => void) {
  if (typeof window === 'undefined') return;
  if ((window as any).__agReady) cb();
  else window.addEventListener('ag:ready', cb, { once: true });
}
export function markReady() {
  (window as any).__agReady = true;
  window.dispatchEvent(new Event('ag:ready'));
}
