import Image from 'next/image';
import { Cormorant_Garamond } from 'next/font/google';
import { CalendarCheck, Clock, HeartHandshake, type LucideIcon } from 'lucide-react';
import AboutBackdrop from '@/components/about/About/AboutBackdrop';
import styles from './Booking.module.scss';

// Editorial serif for the headline (scoped to this component, so the global
// typography system is unchanged).
const editorialSerif = Cormorant_Garamond({
  variable: '--font-booking-serif',
  subsets: ['latin', 'latin-ext'],
  weight: ['500'],
  display: 'swap',
});

// External online booking (Borostyán Fizio). No therapist-specific URL or
// anchor is used on the external site.
const BOOKING_URL = 'https://borostyanfizio.com/';

const FEATURES: { label: [string, string]; Icon: LucideIcon }[] = [
  { label: ['Gyors', 'foglalás'], Icon: CalendarCheck },
  { label: ['Rugalmas', 'időpontok'], Icon: Clock },
  { label: ['Személyre szabott', 'kezelés'], Icon: HeartHandshake },
];

export default function Booking() {
  return (
    <div className={`${styles.page} ${editorialSerif.variable}`}>
      {/* Same drifting-particle atmosphere as Rólam / Árlista / Kapcsolat. */}
      <AboutBackdrop seed={303} />

      {/* Static, oversized hairline arcs (decorative). */}
      <svg
        className={styles.lines}
        viewBox='0 0 1440 1000'
        preserveAspectRatio='xMidYMid slice'
        aria-hidden='true'
        focusable='false'
      >
        <circle className={styles.lineMain} cx='1720' cy='1060' r='860' />
        <circle className={styles.lineSoft} cx='-260' cy='1060' r='560' />
      </svg>

      <section
        id='booking'
        className={styles.booking}
        aria-labelledby='booking-title'
      >
        <div className={styles.inner}>
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

            <div className={styles.action}>
              <a
                href={BOOKING_URL}
                target='_blank'
                rel='noopener noreferrer'
                className={styles.cta}
              >
                {/* Text only on this page's CTA (no arrow). */}
                <span>Időpontfoglalás</span>
                <span className={styles.srOnly}> (új lapon nyílik meg)</span>
              </a>
              <p className={styles.note}>
                A foglalás a Borostyán Fizio online felületén történik — új lapon
                nyílik meg.
              </p>
            </div>

            <ul className={styles.features}>
              {FEATURES.map(({ label, Icon }) => (
                <li key={label.join(' ')} className={styles.feature}>
                  <span className={styles.featureIcon} aria-hidden='true'>
                    <Icon size={22} strokeWidth={1.25} aria-hidden='true' focusable={false} />
                  </span>
                  <span className={styles.featureLabel}>
                    {label[0]}
                    <br />
                    {label[1]}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Transparent illustration on a soft blue glow — no box. */}
          <div className={styles.visual}>
            {/* Wrapper carries the entrance motion, so the image itself
                stays free for the global PageIntro settle. */}
            <div className={styles.figure}>
              <Image
                src='/images/booking/booking-illustration.png'
                alt='Gyógytornász segít egy páciensnek, aki fitneszlabdán ülve gumiszalaggal gyakorol'
                width={1053}
                height={1192}
                sizes='(min-width: 1024px) 560px, (min-width: 560px) 460px, 88vw'
                className={styles.illustration}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
