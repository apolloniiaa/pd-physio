'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import styles from './SectionReveal.module.scss';

type RevealState = 'static' | 'pending' | 'revealed';

// Calm editorial reveal for a Home section: the whole section fades in and
// rises ~28px once, the first time it scrolls into view — on desktop, tablet
// and mobile alike. Elements inside keep their own (existing) animations.
//
// Progressive enhancement: the server renders the section fully visible
// ('static'). Only after JavaScript runs is a section that is still below the
// viewport switched to 'pending' (hidden off-screen, so nothing flashes) and
// revealed by an IntersectionObserver. Sections already on screen, a missing
// IntersectionObserver or JavaScript being unavailable all leave the content
// visible. Reduced motion: no movement (see the stylesheet).
export default function SectionReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<RevealState>('static');

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === 'undefined') return;

    // Already (nearly) in view on mount — e.g. a #contact link — stays as is.
    const belowFold =
      element.getBoundingClientRect().top > window.innerHeight * 0.88;
    if (!belowFold) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setState('revealed');
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0 },
    );
    // Hide only once the observer is in place, so it can always reveal.
    const frame = requestAnimationFrame(() => {
      setState('pending');
      observer.observe(element);
    });
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className={styles.reveal} data-reveal={state}>
      {children}
    </div>
  );
}
