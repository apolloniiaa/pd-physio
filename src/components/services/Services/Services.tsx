'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, type Variants } from 'motion/react';
import { TOPIC_LIST } from '@/data/topics';
import { MQ_MD, MQ_XL, useMediaQuery } from '@/lib/useMediaQuery';
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
  /** Descriptive alt text: what the photo actually shows. */
  alt?: string;
  /** Optional CSS object-position to fine-tune the crop, e.g. '50% 80%'. */
  imagePosition?: string;
};

const SERVICES: Service[] = [
  {
    number: '01',
    title: 'Manuálterápia',
    image: '/images/services/manualterapia.png',
    alt: 'Manuálterápiás kezelés: a gyógytornász a kezelőágyon fekvő páciens törzsét mobilizálja',
    description:
      'Célzott manuális technikákkal segíti a mozgás beszűkülésének és a fájdalomnak a csökkentését.',
  },
  {
    number: '02',
    title: 'Gyógytorna',
    image: '/images/services/gyogytorna.png',
    alt: 'Páciens fitneszlabdára támaszkodva stabilizáló gyakorlatot végez',
    description:
      'Egyénre szabott gyakorlatokkal fejlesztjük a mozgás minőségét, az erőt és a stabilitást.',
  },
  {
    number: '03',
    title: 'Fasciakezelés',
    image: '/images/services/fasciakezeles.png',
    alt: 'A nyak és a koponyaalap kézi kezelése hanyatt fekvő páciensnél',
    description:
      'A kötőszöveti rendszer feszességét és az abban kialakult diszfunkciókat különböző manuális technikákkal kezeljük a szabad érzés és mozgás érdekében.',
  },
  {
    number: '04',
    title: 'Tartáskorrekció',
    image: '/images/services/tartaskorrekcios.png',
    alt: 'Páciens kinyújtott karral hengert tart, a gyógytornász a lapocka mozgását irányítja',
    imagePosition: '50% 62%',
    description:
      'A testtartás és a mozgásminták tudatos fejlesztésével segítünk hosszú távú változást elérni.',
  },
  {
    number: '05',
    title: 'Rehabilitáció',
    image: '/images/services/rehabilitacio.png',
    alt: 'Hanyatt fekvő páciens gumiszalaggal végzett vállerősítő gyakorlata',
    description:
      'Sérülések, műtétek vagy hosszabb kihagyás után fokozatosan építjük vissza a mozgásbiztonságot.',
  },
  {
    number: '06',
    title: 'Fájdalomcsökkentés',
    image: '/images/services/fajdalomcsokkentes.png',
    alt: 'A gyógytornász a kezelőágyon fekvő páciens hasát és törzsét kezeli kézzel',
    description:
      'A kiváltó okok feltárására és a panaszok hosszú távú enyhítésére helyezzük a hangsúlyt.',
  },
  {
    number: '07',
    title: 'Mozgáskontroll',
    image: '/images/services/mozgas-kontroll.png',
    alt: 'Páciens fitneszlabdán fekve, kézisúlyzókkal egyensúlyozó gyakorlatot végez gyógytornászi irányítással',
    imagePosition: '50% 25%',
    description:
      'A pontosabb testérzékelés és koordináció fejlesztésével hatékonyabbá és tudatosabbá válhat a mozgás.',
  },
  {
    number: '08',
    title: 'Prevenció',
    image: '/images/services/prevencio.png',
    alt: 'Hason fekvő páciens hátizom-aktiváló gyakorlata gyógytornászi irányítással',
    description:
      'A rendszeres, tudatos mozgással megelőzhetők bizonyos túlterhelések és visszatérő panaszok.',
  },
];

// ========================================
// Entrance motion (Framer Motion, via the `motion` package)
// ========================================

/** Slow, settling ease-out — no spring, no overshoot. */
const EASE_EDITORIAL = [0.22, 1, 0.36, 1] as const;

/**
 * Each card reveals as it scrolls into view (desktop, tablet and mobile).
 * `custom` is the card's delay: within each grid row the cards follow one
 * another with the same 0.15s + 0.17s stagger as before; when the cards are
 * stacked on phones each one rises as you reach it.
 */
const STAGGER_START = 0.15;
const STAGGER_STEP = 0.17;
const STACKED_DELAY = 0.05;

/** Card: rises 35px while a bottom mask opens; ends flat and unclipped. */
const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
    clipPath: 'inset(0% 0% 14% 0%)',
  },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: { duration: 1, ease: EASE_EDITORIAL, delay },
    transitionEnd: { clipPath: 'none' },
  }),
};

/** Photo: settles from a slight zoom and drifts up, a little faster. */
const imageVariants: Variants = {
  hidden: { scale: 1.06, y: 10 },
  visible: (delay: number) => ({
    scale: 1,
    y: 0,
    transition: { duration: 0.85, ease: EASE_EDITORIAL, delay },
  }),
};

type ServicesProps = {
  /** 1 on the stand-alone /services page, 2 inside the Home one-pager. */
  level?: 1 | 2;
};

export default function Services({ level = 1 }: ServicesProps) {
  const Heading = level === 1 ? 'h1' : 'h2';
  const Sub = level === 1 ? 'h2' : 'h3';
  const isPage = level === 1;
  const isMd = useMediaQuery(MQ_MD);
  const isXl = useMediaQuery(MQ_XL);
  const columns = isXl ? 4 : isMd ? 2 : 1;

  return (
    <section
      id='services'
      className={styles.services}
      aria-labelledby='services-title'
    >
      <div className={styles.inner}>
        <header className={styles.intro}>
          <div>
            <Heading id='services-title' className={styles.title}>
              {isPage && (
                <span className={styles.eyebrow}>
                  Gyógytorna · Manuálterápia · Rehabilitáció
                {' '}</span>
              )}
              <span className={styles.titleLine}>Mozgásban rejlő </span>
              <span className={styles.titleLine}>lehetőségek.</span>
            </Heading>
          </div>
          <p className={styles.lead}>
            Személyre szabott kezelésekkel és tudatos mozgással segítek abban,
            hogy tested újra szabadabban és magabiztosabban működjön.
          </p>
        </header>

        <ul className={styles.grid}>
          {SERVICES.map((service, index) => {
            const delay =
              columns === 1
                ? STACKED_DELAY
                : STAGGER_START + (index % columns) * STAGGER_STEP;
            return (
            <motion.li
              key={service.number}
              className={styles.card}
              variants={cardVariants}
              custom={delay}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, amount: 0.2 }}
              data-reveal-item=''
            >
              <article className={styles.cardInner}>
                <div className={styles.media}>
                  {service.image ? (
                    <motion.div
                      className={styles.imageMotion}
                      variants={imageVariants}
                      custom={delay}
                    >
                      <Image
                        src={service.image}
                        alt={service.alt ?? service.title}
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
                <Sub className={styles.cardTitle}>{service.title}</Sub>
                <p className={styles.cardText}>{service.description}</p>
              </article>
            </motion.li>
            );
          })}
        </ul>

        {/* Links to the patient-information pages (crawlable on Home too). */}
        <nav className={styles.topics} aria-labelledby='services-topics-title'>
          <Sub id='services-topics-title' className={styles.topicsTitle}>
            Gyakori panaszok és kezelések
          </Sub>
          <ul className={styles.topicList}>
            {TOPIC_LIST.map((topic) => (
              <li key={topic.slug}>
                <Link href={topic.path} className={styles.topicLink}>
                  {topic.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
