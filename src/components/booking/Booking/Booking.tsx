import type { ReactNode } from 'react';
import Image from 'next/image';
import { Cormorant_Garamond } from 'next/font/google';
import styles from './Booking.module.scss';

// Editorial serif for the headings (scoped to this component, so the global
// typography system is unchanged).
const editorialSerif = Cormorant_Garamond({
  variable: '--font-booking-serif',
  subsets: ['latin', 'latin-ext'],
  weight: ['500'],
  display: 'swap',
});

// External online booking (Borostyán Fizio). The site has no dedicated
// Petró Dániel URL/anchor yet — update here when one exists.
const BOOKING_URL = 'https://borostyanfizio.com/';

type IconName = 'calendar' | 'clock' | 'lotus';

const ICONS: Record<IconName, ReactNode> = {
  calendar: (
    <>
      <rect x='4' y='5.5' width='16' height='14' rx='1.5' />
      <path d='M4 10h16M8.5 3.5v4M15.5 3.5v4M10.5 14.5h3' />
    </>
  ),
  clock: (
    <>
      <circle cx='12' cy='12' r='8.5' />
      <path d='M12 7.5V12l3 2' />
    </>
  ),
  lotus: (
    <>
      <path d='M12 18.5c-3.2-1.4-5-4-5-7.2 2.4.3 4.1 1.5 5 3.4.9-1.9 2.6-3.1 5-3.4 0 3.2-1.8 5.8-5 7.2z' />
      <path d='M12 14.7c-1.3-1.7-1.5-4.2 0-6.7 1.5 2.5 1.3 5 0 6.7z' />
      <path d='M5 18.5h14' />
    </>
  ),
};

function LineIcon({ name, size = 22 }: { name: IconName; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.1'
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden='true'
      focusable='false'
    >
      {ICONS[name]}
    </svg>
  );
}

const FEATURES: { label: [string, string]; icon: IconName }[] = [
  { label: ['Gyors', 'foglalás'], icon: 'calendar' },
  { label: ['Rugalmas', 'időpontok'], icon: 'clock' },
  { label: ['Személyre szabott', 'kezelés'], icon: 'lotus' },
];

export default function Booking() {
  return (
    <div className={`${styles.page} ${editorialSerif.variable}`}>
      {/* Static, oversized line work (as in the Figma section). */}
      <svg
        className={styles.lines}
        viewBox='0 0 1440 1000'
        preserveAspectRatio='xMidYMid slice'
        aria-hidden='true'
        focusable='false'
      >
        <circle className={styles.lineMain} cx='1560' cy='-40' r='540' />
        <circle className={styles.lineSoft} cx='-260' cy='1060' r='560' />
      </svg>

      {/* ---------- Online booking ---------- */}
      <section
        id='idopontfoglalas'
        className={styles.booking}
        aria-labelledby='booking-title'
      >
        <div className={styles.bookingInner}>
          <div className={styles.content}>
            <p className={styles.eyebrow}>Időpontfoglalás</p>
            <h1 id='booking-title' className={styles.title}>
              <span className={styles.titleLine}>Foglalj időpontot </span>
              <span className={styles.titleLine}>online.</span>
            </h1>
            <p className={styles.body}>
              Válaszd ki a számodra megfelelő időpontot, és kezdd el a gyógyulás
              felé vezető utat kényelmesen, online.
            </p>

            <a
              href={BOOKING_URL}
              target='_blank'
              rel='noopener noreferrer'
              className={styles.cta}
            >
              <span>Időpontfoglalás</span>
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
              <span className={styles.srOnly}> (új lapon nyílik meg)</span>
            </a>

            <ul className={styles.features}>
              {FEATURES.map((feature) => (
                <li key={feature.label.join(' ')} className={styles.feature}>
                  <span className={styles.featureIcon}>
                    <LineIcon name={feature.icon} />
                  </span>
                  <span className={styles.featureLabel}>
                    {feature.label[0]}
                    <br />
                    {feature.label[1]}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.media}>
            <Image
              src='/images/services/gyogytorna.png'
              alt='Gyógytornász kezelés közben a páciens vállánál'
              fill
              sizes='(min-width: 1024px) 440px, (min-width: 560px) 70vw, 100vw'
              className={styles.image}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
