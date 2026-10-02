'use client';

import Image from 'next/image';
import { motion, type Variants } from 'motion/react';
import styles from './Services.module.scss';

type Service = {
  number: string;
  title: string;
  description: string;
  /**
   * Card photo from /public, e.g. '/images/services/manualterapia.png'.
   * Leave undefined to show the empty image placeholder.
   * Shown at 16:10 across the full card width (object-fit: cover).
   */
  image?: string;
  /** Optional CSS object-position to fine-tune the crop, e.g. '50% 80%'. */
  imagePosition?: string;
};

const SERVICES: Service[] = [
  {
    number: '01',
    title: 'Manuálterápia',
    image: '/images/services/manualterapia.png',
    description:
      'Célzott manuális technikákkal segíti a mozgás beszűkülésének és a fájdalomnak a csökkentését.',
  },
  {
    number: '02',
    title: 'Gyógytorna',
    image: '/images/services/gyogytorna.png',
    description:
      'Egyénre szabott gyakorlatokkal fejlesztjük a mozgás minőségét, az erőt és a stabilitást.',
  },
  {
    number: '03',
    title: 'Fasciakezelés',
    image: '/images/services/fasciakezeles.png',
    description:
      'A kötőszöveti rendszer célzott kezelésével támogatjuk a szabadabb és harmonikusabb mozgást.',
  },
  {
    number: '04',
    title: 'Tartáskorrekció',
    image: '/images/services/tartaskorrekcio.png',
    imagePosition: '50% 62%',
    description:
      'A testtartás és a mozgásminták tudatos fejlesztésével segítünk hosszú távú változást elérni.',
  },
  {
    number: '05',
    title: 'Rehabilitáció',
    image: '/images/services/rehabilitacio.png',
    description:
      'Sérülések, műtétek vagy hosszabb kihagyás után fokozatosan építjük vissza a mozgásbiztonságot.',
  },
  {
    number: '06',
    title: 'Fájdalomcsökkentés',
    image: '/images/services/fajdalomcsokkentes.png',
    description:
      'A kiváltó okok feltárására és a panaszok hosszú távú enyhítésére helyezzük a hangsúlyt.',
  },
  {
    number: '07',
    title: 'Mozgáskontroll',
    image: '/images/services/mozgas-kontroll.png',
    imagePosition: '50% 78%',
    description:
      'A pontosabb testérzékelés és koordináció fejlesztésével hatékonyabbá és tudatosabbá válhat a mozgás.',
  },
  {
    number: '08',
    title: 'Prevenció',
    image: '/images/services/prevencio.png',
    description:
      'A rendszeres, tudatos mozgással megelőzhetők bizonyos túlterhelések és visszatérő panaszok.',
  },
];

// ========================================
// Entrance motion (Framer Motion, via the `motion` package)
// ========================================

/** Slow, settling ease-out — no spring, no overshoot. */
const EASE_EDITORIAL = [0.22, 1, 0.36, 1] as const;

/** Parent: reveals the cards one after another, 01 → 08. */
const gridVariants: Variants = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.15, staggerChildren: 0.17 },
  },
};

/** Card: rises 35px while a bottom mask opens; ends flat and unclipped. */
const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
    clipPath: 'inset(0% 0% 14% 0%)',
  },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: { duration: 1, ease: EASE_EDITORIAL },
    transitionEnd: { clipPath: 'none' },
  },
};

/** Photo: settles from a slight zoom and drifts up, a little faster. */
const imageVariants: Variants = {
  hidden: { scale: 1.06, y: 10 },
  visible: {
    scale: 1,
    y: 0,
    transition: { duration: 0.85, ease: EASE_EDITORIAL },
  },
};

export default function Services() {
  return (
    <section
      id='services'
      className={styles.services}
      aria-labelledby='services-title'
    >
      <div className={styles.inner}>
        <header className={styles.intro}>
          <div>
            <p className={styles.eyebrow}>Szolgáltatások</p>
            <h1 id='services-title' className={styles.title}>
              <span className={styles.titleLine}>Mozgásban rejlő</span>
              <span className={styles.titleLine}>lehetőségek.</span>
            </h1>
          </div>
          <p className={styles.lead}>
            Személyre szabott kezelésekkel és tudatos mozgással segítek abban,
            hogy tested újra szabadabban és magabiztosabban működjön.
          </p>
        </header>

        <motion.ul
          className={styles.grid}
          variants={gridVariants}
          initial='hidden'
          animate='visible'
        >
          {SERVICES.map((service) => (
            <motion.li
              key={service.number}
              className={styles.card}
              variants={cardVariants}
            >
              <article className={styles.cardInner}>
                <div className={styles.media}>
                  {service.image ? (
                    <motion.div
                      className={styles.imageMotion}
                      variants={imageVariants}
                    >
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        sizes='(min-width: 1200px) 300px, (min-width: 820px) 50vw, 100vw'
                        className={styles.image}
                        style={
                          service.imagePosition
                            ? { objectPosition: service.imagePosition }
                            : undefined
                        }
                      />
                    </motion.div>
                  ) : (
                    <span className={styles.placeholder} aria-hidden='true' />
                  )}
                </div>
                <div className={styles.cardTop}>
                  <span className={styles.number}>{service.number}</span>
                  <span className={styles.rule} aria-hidden='true' />
                </div>
                <h2 className={styles.cardTitle}>{service.title}</h2>
                <p className={styles.cardText}>{service.description}</p>
              </article>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
