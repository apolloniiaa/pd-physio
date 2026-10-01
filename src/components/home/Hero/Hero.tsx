import Image from 'next/image';
import styles from './Hero.module.scss';

const BOOKING_HREF = '#idopontfoglalas';
const TAGLINE = ['MOVEMENT', 'RECOVERY', 'BALANCE'];

export default function Hero() {
  return (
    <section className={styles.hero} aria-labelledby='hero-title'>
      <Image
        src='/images/home/hero.png'
        alt=''
        fill
        priority
        sizes='100vw'
        className={styles.background}
      />

      <div className={styles.inner}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>Gyógytorna · Manuálterápia</p>
          <h1 id='hero-title' className={styles.title}>
            Személyre szabott kezelések a teljesebb mozgásért
          </h1>
          <p className={styles.body}>
            Célom, hogy segítshessek a fájdalommentesebb szabadabb és
            kiegyensúlyozottabb mindennapokban.
          </p>
          <a href={BOOKING_HREF} className={styles.cta}>
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
          </a>
        </div>

        <div className={styles.tagline} aria-hidden='true'>
          <span className={styles.taglineRule} />
          {TAGLINE.map((word) => (
            <span key={word}>{word}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
