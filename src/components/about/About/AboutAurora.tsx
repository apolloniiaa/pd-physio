'use client';

import { MotionConfig, motion, type Transition } from 'motion/react';
import styles from './About.module.scss';

// ========================================
// Slow blue "aurora" behind the About content.
// Transform-only motion (x / y / scaleX / scaleY) so it stays on the GPU;
// every keyframe list starts and ends on the same value, so the loop is
// seamless. Decorative only: hidden from assistive tech, no pointer events.
// ========================================

const DRIFT: Transition = {
  duration: 18,
  ease: 'easeInOut',
  repeat: Infinity,
};

export default function AboutAurora() {
  return (
    // "user": transform animations are skipped for prefers-reduced-motion.
    <MotionConfig reducedMotion='user'>
      <div className={styles.aurora} aria-hidden='true'>
        {/* Main light field, behind the portrait. */}
        <motion.span
          className={`${styles.auroraBlob} ${styles.auroraPrimary}`}
          animate={{
            x: ['0%', '6%', '-3%', '0%'],
            y: ['0%', '-5%', '4%', '0%'],
            scaleX: [1, 1.12, 0.96, 1],
            scaleY: [1, 0.94, 1.08, 1],
          }}
          transition={DRIFT}
        />
        {/* Fainter counter-drift, behind the copy. */}
        <motion.span
          className={`${styles.auroraBlob} ${styles.auroraSecondary}`}
          animate={{
            x: ['0%', '-5%', '3%', '0%'],
            y: ['0%', '4%', '-4%', '0%'],
            scaleX: [1, 0.94, 1.1, 1],
            scaleY: [1, 1.1, 0.95, 1],
          }}
          transition={{ ...DRIFT, duration: 15 }}
        />
      </div>
    </MotionConfig>
  );
}
