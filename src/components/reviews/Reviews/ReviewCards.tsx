'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type Variants,
} from 'motion/react';
import styles from './Reviews.module.scss';

// Scroll-driven review timeline.
// - Progress (0 → 1) runs while the list passes the middle of the viewport:
//   0 when its top reaches the centre line, 1 when its bottom does.
//   Framer Motion's useScroll batches reads per frame (no manual listener).
// - The blue line fills to that point and the marker sits on its tip, so
//   both follow the scroll in either direction.
// - The review whose centre is nearest the marker is the active one; reviews
//   the marker has passed get a filled node on the line.

const EASE_EDITORIAL = [0.22, 1, 0.36, 1] as const;

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: EASE_EDITORIAL },
  },
};

export function ReviewTimeline({ items }: { items: ReactNode[] }) {
  const listRef = useRef<HTMLOListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  // Item centres as fractions of the list height (kept fresh on resize).
  const centresRef = useRef<number[]>([]);
  const [active, setActive] = useState(0);
  const [passed, setPassed] = useState(-1);

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start center', 'end center'],
  });
  const fillScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const markerTop = useTransform(scrollYProgress, (v) => `${v * 100}%`);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const measure = () => {
      const height = list.offsetHeight || 1;
      centresRef.current = itemRefs.current.map((item) =>
        item ? (item.offsetTop + item.offsetHeight / 2) / height : 0,
      );
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    return () => observer.disconnect();
  }, []);

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const centres = centresRef.current;
    if (centres.length === 0) return;

    let nearest = 0;
    let lastPassed = -1;
    centres.forEach((centre, index) => {
      if (Math.abs(centre - value) < Math.abs(centres[nearest] - value)) {
        nearest = index;
      }
      if (centre <= value + 0.001) lastPassed = index;
    });
    setActive(nearest);
    setPassed(lastPassed);
  });

  return (
    <ol ref={listRef} className={styles.timeline}>
      {/* Base line, scroll progress and marker (decorative). */}
      <span className={styles.track} aria-hidden='true'>
        <motion.span className={styles.trackFill} style={{ scaleY: fillScale }} />
      </span>
      <motion.span
        className={styles.marker}
        style={{ top: markerTop }}
        aria-hidden='true'
      />

      {items.map((item, index) => (
        <li
          key={index}
          ref={(element) => {
            itemRefs.current[index] = element;
          }}
          className={[
            styles.timelineItem,
            index === active ? styles.timelineItemActive : '',
            index <= passed ? styles.timelineItemPassed : '',
          ].join(' ')}
        >
          <span className={styles.node} aria-hidden='true' />
          <motion.div
            className={styles.timelineCard}
            variants={cardVariants}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.2 }}
            data-reveal-item=''
          >
            {item}
          </motion.div>
        </li>
      ))}
    </ol>
  );
}
