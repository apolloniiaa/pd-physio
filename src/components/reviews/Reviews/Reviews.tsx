import { Cormorant_Garamond } from 'next/font/google';
import { ReviewTimeline } from './ReviewCards';
import styles from './Reviews.module.scss';

// Editorial serif for the heading and rating (scoped to this component, so
// the global typography system is unchanged).
const editorialSerif = Cormorant_Garamond({
  variable: '--font-reviews-serif',
  subsets: ['latin', 'latin-ext'],
  weight: ['500'],
  display: 'swap',
});

type Review = {
  name: string;
  rating: number;
  date: string;
  text: string;
};

// Real Google reviews about Petró Dániel — wording kept exactly as published.
// Do not edit the text.
const REVIEWS: Review[] = [
  {
    name: 'Nóra Bányai',
    rating: 5,
    date: '1 month ago',
    text: "I have been working with Dani Petró for quite some time now, I visited him with back complaints and my initial condition improved very quickly. He taught me many exercises that I can use at home, but the knowledge of the manual is definitely necessary so that I don't have the pain I used to. I can only recommend him.",
  },
  {
    name: 'Éva Mikó',
    rating: 5,
    date: '4 months ago',
    text: 'Gyógytornára járok Petró Dánielhez. Hozzáértése, tudása, figyelmessége, kedvessége, hozzájárult a gyógyulásomhoz. Szívből ajánlom mindenkinek. M. Évi',
  },
  {
    name: 'Istvan Nagy',
    rating: 5,
    date: '8 months ago',
    text: 'A hely ahol a kedvesség találkozik a profizmussal!',
  },
  {
    name: 'Edit Decsi',
    rating: 5,
    date: '8 months ago',
    text: 'Profi, kedves, figyelmes, jól képzett terapeuta. Részletes érthető tájékoztatást kapok mindig az állapotomról. Tiszta, jól felszerelt helyiség.',
  },
];

// "View all 58 Google reviews" link published on the official Borostyán Fizio
// website (https://borostyanfizio.com/). Set to null to hide the CTA.
const GOOGLE_REVIEWS_URL: string | null = 'https://share.google/Do8l7DAoEjCZDGZR4';

function Stars({ count, className }: { count: number; className?: string }) {
  return (
    <span className={`${styles.stars} ${className ?? ''}`} role='img' aria-label={`${count} / 5 csillag`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={i < count ? styles.starOn : styles.starOff}
          viewBox='0 0 24 24'
          aria-hidden='true'
          focusable='false'
        >
          <path d='M12 2.8l2.7 5.9 6.4.7-4.8 4.3 1.3 6.3L12 16.8 6.4 20l1.3-6.3L2.9 9.4l6.4-.7L12 2.8z' />
        </svg>
      ))}
    </span>
  );
}

export default function Reviews() {
  return (
    <section
      id='reviews'
      className={`${styles.reviews} ${editorialSerif.variable}`}
      aria-labelledby='reviews-title'
    >
      {/* Static, oversized line work behind the content. */}
      <svg
        className={styles.lines}
        viewBox='0 0 1440 1000'
        preserveAspectRatio='xMidYMid slice'
        aria-hidden='true'
        focusable='false'
      >
        <circle className={styles.lineMain} cx='1260' cy='120' r='520' />
        <circle className={styles.lineSoft} cx='1260' cy='120' r='640' />
        <ellipse className={styles.lineSoft} cx='-80' cy='1040' rx='620' ry='520' />
      </svg>

      <div className={styles.inner}>
        <header className={styles.head}>
          <div className={styles.intro}>
            <p className={styles.eyebrow}>Visszajelzések</p>
            <h1 id='reviews-title' className={styles.title}>
              Amit pácienseim mondanak.
            </h1>
          </div>

          <div className={styles.rating}>
            <p className={styles.score}>5.0</p>
            <div className={styles.ratingMeta}>
              <Stars count={5} />
              <p className={styles.source}>Google</p>
              <p className={styles.count}>4 kiemelt értékelés</p>
            </div>
          </div>
        </header>

        {/* Vertical scroll-driven timeline: 01 left, 02 right, … on desktop. */}
        <ReviewTimeline
          items={REVIEWS.map((review, index) => (
            <figure key={review.name} className={styles.card}>
              <div className={styles.cardTop}>
                <Stars count={review.rating} />
                <span className={styles.date}>{review.date}</span>
              </div>

              <blockquote className={styles.quote}>
                <p>{review.text}</p>
              </blockquote>

              <figcaption className={styles.author}>
                <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
                <span className={styles.authorText}>
                  <span className={styles.name}>{review.name}</span>
                  <span className={styles.attribution}>Google · Petró Dániel</span>
                </span>
              </figcaption>
            </figure>
          ))}
        />

        {GOOGLE_REVIEWS_URL && (
          <div className={styles.ctaWrap}>
            <a
              className={styles.cta}
              href={GOOGLE_REVIEWS_URL}
              target='_blank'
              rel='noopener noreferrer'
            >
              <span>Összes Google-vélemény megtekintése</span>
              <span className={styles.ctaArrow} aria-hidden='true'>
                ↗
              </span>
              <span className={styles.srOnly}>(új lapon nyílik meg)</span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
