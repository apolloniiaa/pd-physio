import Image from 'next/image';
import AboutBackdrop from './AboutBackdrop';
import styles from './About.module.scss';

export default function About() {
  return (
    <section id='about' className={styles.about} aria-labelledby='about-title'>
      <AboutBackdrop />
      <div className={styles.inner}>
        <div className={styles.media}>
          <Image
            src='/images/about/about-portrait.jpg'
            alt='Gyógytornász kezelés közben a kezelőágy mellett'
            fill
            priority
            sizes='(min-width: 560px) 483px, 100vw'
            className={styles.image}
          />
        </div>

        <div className={styles.content}>
          <p className={styles.eyebrow}>Rólam</p>
          <h1 id='about-title' className={styles.title}>
            Hiszek a tudatos és tartós változásban.
          </h1>

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
              Szakterületeim közé tartoznak derék-, nyak-,gerincproblémák
              ízületi fájdalmak, valamint a sport révén közel állnak hozzám a
              sportsérülések és az azt követő rehabilitáció. Az elmúlt években
              kiemelten fontos terület lett a munkám során a vállsérülések -
              fájdalmak és azoknak a kezelése, valamint a vállműtétek utáni
              rehabilitáció.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
