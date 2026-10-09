import { Cormorant_Garamond } from 'next/font/google';
import { PRICES } from '@/data/pricing';
import AboutBackdrop from '@/components/about/About/AboutBackdrop';
import { PricingCardItem, PricingGrid } from './PricingCards';
import styles from './Pricing.module.scss';

// Editorial serif for the page heading (scoped to this component, so the
// global typography system is unchanged).
const editorialSerif = Cormorant_Garamond({
  variable: '--font-pricing-serif',
  subsets: ['latin', 'latin-ext'],
  weight: ['500'],
  display: 'swap',
});

function ClockIcon() {
  return (
    <svg
      className={styles.clock}
      width='16'
      height='16'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.2'
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden='true'
      focusable='false'
    >
      <circle cx='12' cy='12' r='9' />
      <path d='M12 7.5V12l3 2' />
    </svg>
  );
}

type PricingProps = {
  /** 1 on the stand-alone /pricing page, 2 inside the Home one-pager. */
  level?: 1 | 2;
};

export default function Pricing({ level = 1 }: PricingProps) {
  const Heading = level === 1 ? 'h1' : 'h2';
  const Sub = level === 1 ? 'h2' : 'h3';
  const isPage = level === 1;

  return (
    <section
      id='pricing'
      className={`${styles.pricing} ${editorialSerif.variable}`}
      aria-labelledby='pricing-title'
    >
      {/* Same drifting-particle atmosphere as Rólam (own seed). */}
      <AboutBackdrop seed={101} />

      {/* Static, oversized line work behind the cards. */}
      <svg
        className={styles.lines}
        viewBox='0 0 1440 1000'
        preserveAspectRatio='xMidYMid slice'
        aria-hidden='true'
        focusable='false'
      >
        <ellipse className={styles.lineMain} cx='1180' cy='980' rx='860' ry='620' />
        <ellipse className={styles.lineSoft} cx='-120' cy='120' rx='520' ry='700' />
      </svg>

      <div className={styles.inner}>
        <header className={styles.intro}>
          <Heading id='pricing-title' className={styles.title}>
            {isPage && (
              <span className={styles.eyebrow}>Gyógytorna és manuálterápia{' '}</span>
            )}
            Árlista
          </Heading>
        </header>

        <PricingGrid>
          {PRICES.map((item, index) => (
            <PricingCardItem key={item.number} index={index}>
              <article className={styles.card}>
                <div className={styles.cardTop}>
                  <span className={styles.number}>{item.number}</span>
                  <span className={styles.rule} aria-hidden='true' />
                </div>

                <Sub className={styles.cardTitle}>{item.title}</Sub>

                <p className={styles.duration}>
                  <ClockIcon />
                  <span>{item.duration}</span>
                </p>

                <p className={styles.price}>
                  <span className={styles.priceRule} aria-hidden='true' />
                  <span className={styles.amount}>{item.amount}</span>
                  <span className={styles.currency}>{item.currency}</span>
                </p>
              </article>
            </PricingCardItem>
          ))}
        </PricingGrid>
      </div>
    </section>
  );
}
