'use client';

import type { ReactNode } from 'react';
import { motion, type Variants } from 'motion/react';
import { MQ_MD, useMediaQuery } from '@/lib/useMediaQuery';
import styles from './Pricing.module.scss';

// Entrance reveal for the price cards (Framer Motion, via the `motion`
// package — the same setup as the Services section). Each card reveals as it
// scrolls into view: staggered across each row of the two-column grid (same
// 0.1s + 0.14s steps as before), and one by one as you reach them on phones.

/** Slow, settling ease-out — no spring, no overshoot. */
const EASE_EDITORIAL = [0.22, 1, 0.36, 1] as const;

const STAGGER_START = 0.1;
const STAGGER_STEP = 0.14;
const STACKED_DELAY = 0.05;

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: EASE_EDITORIAL, delay },
  }),
};

export function PricingGrid({ children }: { children: ReactNode }) {
  return <ul className={styles.grid}>{children}</ul>;
}

export function PricingCardItem({
  children,
  index,
}: {
  children: ReactNode;
  index: number;
}) {
  const twoColumns = useMediaQuery(MQ_MD);
  const delay = twoColumns
    ? STAGGER_START + (index % 2) * STAGGER_STEP
    : STACKED_DELAY;

  return (
    <motion.li
      className={styles.cardItem}
      variants={cardVariants}
      custom={delay}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.3 }}
      data-reveal-item=''
    >
      {children}
    </motion.li>
  );
}
