import Image from 'next/image';
import {
  Activity,
  Dumbbell,
  HeartHandshake,
  Leaf,
  type LucideIcon,
} from 'lucide-react';
import { Cormorant_Garamond } from 'next/font/google';
import BookingButton from '@/components/BookingButton/BookingButton';
import styles from './Hero.module.scss';

// Editorial serif for the Home headline only (scoped to this component, so
// the global typography system is unchanged).
const heroSerif = Cormorant_Garamond({
  variable: '--font-hero-serif',
  subsets: ['latin', 'latin-ext'],
  weight: ['500'],
  display: 'swap',
});

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

// Feature icons from Lucide (same library as Contact / Footer), drawn as
// thin bone-white glyphs inside the existing electric-blue ring.
const FEATURE_ICONS: Record<Feature['icon'], LucideIcon> = {
  spine: Activity,
  strength: Dumbbell,
  leaf: Leaf,
  heart: HeartHandshake,
};

function FeatureIcon({ name }: { name: Feature['icon'] }) {
  const Icon = FEATURE_ICONS[name];
  return (
    <span className={styles.featureIcon} aria-hidden='true'>
      <Icon size={22} strokeWidth={1.25} aria-hidden='true' focusable={false} />
    </span>
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
          alt='Petró Dániel gyógytornász segít egy páciensnek, aki fitneszlabdán fekve kézisúlyzókkal gyakorol'
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
          {/* The H1 carries both the topic line (gyógytorna · manuálterápia)
              and the headline, so search engines read the full subject.
              Visually unchanged: the topic line keeps the eyebrow style. */}
          <h1 id='hero-title' className={styles.heading}>
            <span className={styles.eyebrow}>Gyógytorna · Manuálterápia</span>{' '}
            <span className={styles.title}>
              <span className={styles.titleLine}>Személyre szabott </span>
              <span className={styles.titleLine}>kezelések a teljesebb </span>
              <span className={styles.titleLine}>mozgásért</span>
            </span>
          </h1>
          <p className={styles.body}>
            Célom, hogy segíthessek a fájdalommentesebb, szabadabb és
            kiegyensúlyozottabb mindennapokban.
          </p>
          <BookingButton className={styles.cta} />
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
