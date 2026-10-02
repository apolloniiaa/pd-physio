import type { ReactNode } from 'react';
import Image from 'next/image';
import { Cormorant_Garamond } from 'next/font/google';
import styles from './Hero.module.scss';

// Editorial serif for the Home headline only (scoped to this component, so
// the global typography system is unchanged).
const heroSerif = Cormorant_Garamond({
  variable: '--font-hero-serif',
  subsets: ['latin', 'latin-ext'],
  weight: ['500'],
  display: 'swap',
});

const BOOKING_HREF = '/booking';
const DESCRIPTORS = ['Mozgás', 'Regeneráció', 'Egyensúly'];
const BADGE = ['Movement', 'Recovery', 'Balance'];

type Feature = {
  title: string;
  text: string;
  icon: 'spine' | 'strength' | 'leaf' | 'heart';
};

const FEATURES: Feature[] = [
  {
    title: 'Fájdalomcsillapítás',
    text: 'Célzott kezelések a mindennapi komfortért',
    icon: 'spine',
  },
  {
    title: 'Erősítés',
    text: 'Stabilabb, erősebb test a hétköznapokra',
    icon: 'strength',
  },
  {
    title: 'Prevenció',
    text: 'Sérülések megelőzése tudatos mozgással',
    icon: 'leaf',
  },
  {
    title: 'Teljes körű támogatás',
    text: 'Személyre szabott program és folyamatos kísérés',
    icon: 'heart',
  },
];

/** Minimal 1px line icons (24 × 24 grid, currentColor). */
function FeatureIcon({ name }: { name: Feature['icon'] }) {
  const paths: Record<Feature['icon'], ReactNode> = {
    spine: (
      <>
        <path d='M12 3v18' />
        <rect x='9' y='4.5' width='6' height='3' rx='1.2' />
        <rect x='8.5' y='9.5' width='7' height='3' rx='1.2' />
        <rect x='9' y='14.5' width='6' height='3' rx='1.2' />
      </>
    ),
    strength: (
      <>
        <path d='M7 12h10' />
        <rect x='4' y='8' width='3' height='8' rx='1' />
        <rect x='17' y='8' width='3' height='8' rx='1' />
        <path d='M2.5 10.5v3M21.5 10.5v3' />
      </>
    ),
    leaf: (
      <>
        <path d='M6 18c0-7 5-12 13-12 0 8-5 13-12 13' />
        <path d='M6 18l7-7' />
      </>
    ),
    heart: (
      <path d='M12 19s-7-4.4-7-9.5A3.8 3.8 0 0 1 12 7.6a3.8 3.8 0 0 1 7 1.9C19 14.6 12 19 12 19z' />
    ),
  };

  return (
    <span className={styles.featureIcon} aria-hidden='true'>
      <svg
        width='22'
        height='22'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1'
        strokeLinecap='round'
        strokeLinejoin='round'
        focusable='false'
      >
        {paths[name]}
      </svg>
    </span>
  );
}

function ArrowRight() {
  return (
    <svg
      className={styles.ctaArrow}
      width='16'
      height='10'
      viewBox='0 0 16 10'
      fill='none'
      aria-hidden='true'
      focusable='false'
    >
      <path
        d='M0 5h15M10.5.75 15 5l-4.5 4.25'
        stroke='currentColor'
        strokeWidth='1.2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

export default function Hero() {
  return (
    <section
      id='home'
      className={`${styles.hero} ${heroSerif.variable}`}
      aria-labelledby='hero-title'
    >
      <div className={styles.media}>
        <Image
          src='/images/home/hero.png'
          alt=''
          fill
          priority
          sizes='100vw'
          className={styles.background}
        />
      </div>

      {/* Static decorative line work (oversized, thin, low-contrast). */}
      <svg
        className={styles.arcs}
        viewBox='0 0 1440 900'
        preserveAspectRatio='xMidYMid slice'
        aria-hidden='true'
        focusable='false'
      >
        <circle cx='1500' cy='560' r='300' />
        <circle cx='170' cy='1180' r='430' />
      </svg>

      <div className={styles.badge} aria-hidden='true'>
        <span className={styles.badgeDot} />
        {BADGE.map((word) => (
          <span key={word}>{word}</span>
        ))}
        <span className={styles.badgeRule} />
      </div>

      <div className={styles.inner}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>Gyógytorna · Manuálterápia</p>
          <h1 id='hero-title' className={styles.title}>
            <span className={styles.titleLine}>Személyre szabott </span>
            <span className={styles.titleLine}>kezelések a teljesebb </span>
            <span className={styles.titleLine}>mozgásért</span>
          </h1>
          <p className={styles.body}>
            Célom, hogy segítshessek a fájdalommentesebb szabadabb és
            kiegyensúlyozottabb mindennapokban.
          </p>
          <a href={BOOKING_HREF} className={styles.cta}>
            <span>Időpontfoglalás</span>
            <ArrowRight />
          </a>
          <p className={styles.descriptor}>
            <span className={styles.descriptorRule} aria-hidden='true' />
            {DESCRIPTORS.map((word, index) => (
              <span key={word}>
                {index > 0 && (
                  <span className={styles.descriptorSlash} aria-hidden='true'>
                    /
                  </span>
                )}
                {word}
              </span>
            ))}
          </p>
        </div>

        <ul className={styles.features}>
          {FEATURES.map((feature) => (
            <li key={feature.title} className={styles.feature}>
              <FeatureIcon name={feature.icon} />
              <div>
                <h2 className={styles.featureTitle}>{feature.title}</h2>
                <p className={styles.featureText}>{feature.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
