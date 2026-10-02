'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import styles from './SectionReveal.module.scss';

// Calm editorial reveal for a Home section: the whole section fades in and
// rises ~28px once, the first time it enters the viewport. Elements inside
// keep their own (existing) animations. Reduced motion: shown immediately.
export default function SectionReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={styles.reveal}
      data-revealed={revealed ? 'true' : 'false'}
    >
      {children}
    </div>
  );
}
