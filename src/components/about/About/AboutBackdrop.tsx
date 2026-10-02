import type { CSSProperties } from 'react';
import styles from './About.module.scss';

// ========================================
// Deep-space atmosphere behind the About content:
//   1. distant — tiny, very dim cool-grey / bone points
//   2. mid     — a few slightly larger points with a muted blue tint
//   3. air     — two huge, faint light fields at the edges
//
// Each point wanders on its own: horizontal and vertical drift run as two
// separate CSS animations with unrelated periods (plus an independent
// opacity breath, and on a few points a slow colour shift), so the path is
// a smooth, never-quite-repeating curve and nothing moves in sync.
// Positions come from a seeded generator, so server and client markup are
// identical. Pure CSS — no JavaScript runs for the animation.
// ========================================

/** Small deterministic PRNG (mulberry32) — same output on server and client. */
function createRandom(seed: number) {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const round = (value: number, digits = 2) => Number(value.toFixed(digits));

type Range = [number, number];

type LayerOptions = {
  size: Range; // px
  opacity: Range;
  drift: Range; // px of travel on each axis
  period: Range; // seconds per axis
  tones: string[]; // class names, picked at random
  shiftShare: number; // share of points that slowly change colour
};

type Particle = {
  tone: string;
  shifts: boolean;
  outer: CSSProperties; // position + horizontal drift
  inner: CSSProperties; // size, vertical drift, opacity, colour
};

function createLayer(seed: number, count: number, options: LayerOptions): Particle[] {
  const random = createRandom(seed);
  const between = ([min, max]: Range) => min + random() * (max - min);
  const signed = (range: Range) => between(range) * (random() < 0.5 ? -1 : 1);
  const seconds = (value: number) => `${round(value, 1)}s`;

  return Array.from({ length: count }, () => {
    const periodX = between(options.period);
    const periodY = between(options.period) * 1.27; // keep the axes out of step
    const breath = between([16, 34]);
    const shiftPeriod = between([60, 110]);
    const size = round(between(options.size));

    return {
      tone: options.tones[Math.floor(random() * options.tones.length)],
      shifts: random() < options.shiftShare,
      outer: {
        left: `${round(random() * 100)}%`,
        top: `${round(random() * 100)}%`,
        '--dx': `${round(signed(options.drift))}px`,
        '--dur-x': seconds(periodX),
        // Negative delays start every point mid-journey, out of phase.
        '--delay-x': seconds(-random() * periodX),
      } as CSSProperties,
      inner: {
        width: `${size}px`,
        height: `${size}px`,
        '--o': round(between(options.opacity)),
        '--dy': `${round(signed(options.drift))}px`,
        '--dur-y': seconds(periodY),
        '--delay-y': seconds(-random() * periodY),
        '--dur-o': seconds(breath),
        '--delay-o': seconds(-random() * breath),
        '--dur-c': seconds(shiftPeriod),
        '--delay-c': seconds(-random() * shiftPeriod),
      } as CSSProperties,
    };
  });
}

const DISTANT = createLayer(7, 64, {
  size: [1, 1.6],
  opacity: [0.1, 0.32],
  drift: [3, 9],
  period: [38, 72],
  tones: [styles.toneGrey, styles.toneGrey, styles.toneBone],
  shiftShare: 0.06,
});

const MID = createLayer(23, 12, {
  size: [1.8, 2.8],
  opacity: [0.14, 0.28],
  drift: [10, 22],
  period: [30, 56],
  tones: [styles.toneBlue, styles.toneBlue, styles.toneGrey],
  shiftShare: 0.35,
});

function Points({ items, layer = '' }: { items: Particle[]; layer?: string }) {
  return (
    <>
      {items.map((particle, index) => (
        <span key={index} className={styles.pointTrack} style={particle.outer}>
          <span
            className={[
              styles.point,
              layer,
              particle.tone,
              particle.shifts ? styles.toneShift : '',
            ]
              .filter(Boolean)
              .join(' ')}
            style={particle.inner}
          />
        </span>
      ))}
    </>
  );
}

export default function AboutBackdrop() {
  return (
    <div className={styles.backdrop} aria-hidden='true'>
      {/* Layer 3 — atmosphere (behind the points). */}
      <span className={`${styles.air} ${styles.airTop}`} />
      <span className={`${styles.air} ${styles.airBottom}`} />

      <div className={styles.points}>
        <Points items={DISTANT} />
        <Points items={MID} layer={styles.mid} />
      </div>
    </div>
  );
}
