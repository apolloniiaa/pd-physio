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
  /** Relative date as shown on Google at the time of capture. */
  date: string;
  /**
   * Approximate age in days, derived from the Google label (used for
   * ordering — the label itself is never sorted as text). Equal ages keep
   * the order listed below.
   */
  ageDays: number;
  /** One string per paragraph. */
  text: string[];
};

// Google reviews about Petró Dániel. Displayed newest → oldest (sorted by
// ageDays below). Google only shows relative dates; Csaba Kereszturi's and
// Nóra Bányai's are both "1 month ago", so Csaba is listed first by
// agreement. Texts as published; Nóra Bányai's review is shown in its
// Hungarian wording.
const REVIEWS: Review[] = [
  {
    name: 'Ferenc Antal',
    rating: 5,
    date: '4 weeks ago',
    ageDays: 28,
    text: [
      'Petro Danihoz járok gyógytornára a vállműtétem óta. Az operáló orvos ajánlotta. Onnan indultunk, hogy a műtét után meg sem bírtam mozdítani a karom. Az ő segítségével oda jutottunk, hogy a 20 kg-os unokámat simán emelgetem a műtött karommal.',
      'A rehabilitáció során nagy szakértelemmel tanította be a mozgásokat, rendszeresen konzultált az orvossal, és az adottságaim figyelembevételével felépítette a teljes mozgásterjedelmet. Emellett támogatott, amikor időnként elvesztettem a hitemet a teljes felépülésben, és nem hagyta, hogy a lendület alábbhagyjon.',
      'Szóval PROFI. Mellesleg kérlelhetetlenül őszinte, jó humorú, érdeklődő, gondoskodó és nyitott egyéniség, jó ember. Igazából az állapotom már nem indokolja, hogy hozzá járjak, de hiányoznának a beszélgetések, jópofaságok – ja, és persze a rendszeres mozgás is.',
    ],
  },
  {
    name: 'Csaba Kereszturi',
    rating: 5,
    date: '1 month ago',
    ageDays: 30,
    text: [
      'Több gyógytornásznál jártam életem során, de elég gyenge/közepes volt mind – kivéve Danit. A gyógytorna-feladatok nagyságrendekkel jobban átmozgatnak és erősítenek, mint korábban bárhol. A manuálterápia során rengeteg különféle fogást és technikát alkalmaz az aktuális problémám megoldására. És ami talán a legfontosabb: törekszik arra, hogy naprakész maradjon a tudásával, és új technikákban is jártas legyen.',
      'Annak ellenére, hogy számomra már kissé messze van, nem véletlenül követtem, amikor az új helyre jött dolgozni (mely új hely a kisebb, „családiasabb” mivoltában alapvetően szimpatikusabb is, mint a korábbi).',
    ],
  },
  {
    name: 'Nóra Bányai',
    rating: 5,
    date: '1 month ago',
    ageDays: 30,
    text: [
      'Jó ideje járok Petró Dánielhez. Hátpanaszokkal kerestem fel, és már nagyon hamar érezhető javulást tapasztaltam. Sok olyan gyakorlatot tanított, amelyeket otthon is tudok végezni, de a manuálterápiás tudására is mindenképpen szükség van ahhoz, hogy ne térjen vissza a korábbi fájdalmam. Csak ajánlani tudom!',
    ],
  },
  {
    name: 'Éva Mikó',
    rating: 5,
    date: '4 months ago',
    ageDays: 120,
    text: [
      'Gyógytornára járok Petró Dánielhez. Hozzáértése, tudása, figyelmessége, kedvessége, hozzájárult a gyógyulásomhoz. Szívből ajánlom mindenkinek. M. Évi',
    ],
  },
];

// Newest first; Array.prototype.sort is stable, so equal ages keep the
// listed order.
const REVIEWS_NEWEST_FIRST = [...REVIEWS].sort(
  (a, b) => a.ageDays - b.ageDays,
);

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

type ReviewsProps = {
  /** 1 on the stand-alone /reviews page, 2 inside the Home one-pager. */
  level?: 1 | 2;
};

export default function Reviews({ level = 1 }: ReviewsProps) {
  const Heading = level === 1 ? 'h1' : 'h2';

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
            <Heading id='reviews-title' className={styles.title}>
              Amit pácienseim mondanak.
            </Heading>
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
          items={REVIEWS_NEWEST_FIRST.map((review, index) => (
            <figure key={review.name} className={styles.card}>
              <div className={styles.cardTop}>
                <Stars count={review.rating} />
                <span className={styles.date}>{review.date}</span>
              </div>

              <blockquote className={styles.quote}>
                {review.text.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
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
