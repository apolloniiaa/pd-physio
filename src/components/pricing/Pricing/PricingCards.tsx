'use client';

import type { ReactNode } from 'react';
import { motion, type Variants } from 'motion/react';
import styles from './Pricing.module.scss';

// Entrance reveal for the price cards (Framer Motion, via the `motion`
// package — the same setup as the Services page). The grid staggers its
// children 01 → 04 once it scrolls into view.

/** Slow, settling ease-out — no spring, no overshoot. */
const EASE_EDITORIAL = [0.22, 1, 0.36, 1] as const;

const gridVariants: Variants = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.1, staggerChildren: 0.14 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: EASE_EDITORIAL },
  },
};

export function PricingGrid({ children }: { children: ReactNode }) {
  return (
    <motion.ul
      className={styles.grid}
      variants={gridVariants}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </motion.ul>
  );
}

export function PricingCardItem({ children }: { children: ReactNode }) {
  return (
    <motion.li className={styles.cardItem} variants={cardVariants}>
      {children}
    </motion.li>
  );
}
