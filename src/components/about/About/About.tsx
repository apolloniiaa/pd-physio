import Image from 'next/image';
import Link from 'next/link';
import PageNote from '@/components/PageNote/PageNote';
import AboutBackdrop from './AboutBackdrop';
import styles from './About.module.scss';
import { BOOKING_URL } from '@/lib/site';

type AboutProps = {
  /** 1 on the stand-alone /about page, 2 inside the Home one-pager. */
  level?: 1 | 2;
};

export default function About({ level = 1 }: AboutProps) {
  const Heading = level === 1 ? 'h1' : 'h2';
  const isPage = level === 1;

  return (
    <section id='about' className={styles.about} aria-labelledby='about-title'>
      {/* Static background arcs (decorative): only portions are visible. */}
      <svg
        className={styles.arcs}
        viewBox='0 0 1440 900'
        preserveAspectRatio='xMidYMid slice'
        aria-hidden='true'
        focusable='false'
      >
        <circle className={styles.arcMain} cx='-300' cy='1100' r='1000' />
        <ellipse className={styles.arcSoft} cx='-120' cy='1180' rx='1080' ry='640' />
      </svg>
      <AboutBackdrop />
      <div className={styles.inner}>
        <div className={styles.media}>
          <Image
            src='/images/about/about-portrait.jpg'
            alt='Petró Dániel gyógytornász-manuálterapeuta portréja'
            fill
            // Above the fold only on /about; lazy inside the Home one-pager.
            priority={isPage}
            sizes='(min-width: 1600px) 480px, (min-width: 560px) 455px, 100vw'
            className={styles.image}
          />
        </div>

        <div className={styles.content}>
          <Heading id='about-title' className={styles.title}>
            {isPage && (
              <span className={styles.eyebrow}>
                Petró Dániel · Gyógytornász-manuálterapeuta
              {' '}</span>
            )}
            Hiszek a tudatos és tartós változásban.
          </Heading>

          {/* Body copy exactly as in the Figma About section. */}
          <div className={styles.body}>
            <p>
              Petró Dániel vagyok, Gyógytornász-Manuálterapeuta. Egész
              életemben a mozgás közelében voltam, sportoltam, emellett szüleim
              révén harcművészettel foglalkozom, a mozgás mindig is az életem
              része volt.
            </p>
            <p>
              Hiszek abban, hogy amivel foglalkoznak az fejlődik, legyen az akár
              fizikai akár mentális probléma, vagy csak egy cél amit el akarunk
              érni. Alap gyógytornász diplomám mellé Barvicsenko (Lewit)
              manuálterapeuta végzettséget is sikerült szereznem amivel még
              szélesebb skálán tudok pácienseimnek segíteni, emellett pedig a
              sport iránti érdeklődésemet is egy nagyobb sportrehabilitációs
              képzéssel bővítettem.
            </p>
            <p>
              Szakterületeim közé tartoznak derék-, nyak-, gerincproblémák,
              ízületi fájdalmak, valamint a sport révén közel állnak hozzám a
              sportsérülések és az azt követő rehabilitáció. Az elmúlt években
              kiemelten fontos terület lett a munkám során a vállsérülések -
              fájdalmak és azoknak a kezelése, valamint a vállműtétek utáni
              rehabilitáció.
            </p>
          </div>

          {isPage && (
            <PageNote>
              Ismerd meg a <Link href='/services'>kezeléseket és szolgáltatásokat</Link>,
              olvass a <Link href='/gyogytorna'>gyógytornáról</Link> és a{' '}
              <Link href='/manualterapia'>manuálterápiáról</Link>, vagy{' '}
              <a href={BOOKING_URL} target='_blank' rel='noopener noreferrer'>foglalj időpontot online</a>.
            </PageNote>
          )}
        </div>
      </div>
    </section>
  );
}
