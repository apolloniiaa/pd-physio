import { Cormorant_Garamond } from 'next/font/google';
import { Mail, MapPin, Phone } from 'lucide-react';
import AboutBackdrop from '@/components/about/About/AboutBackdrop';
import styles from './Contact.module.scss';

// Editorial serif for the heading (scoped to this component, so the global
// typography system is unchanged).
const editorialSerif = Cormorant_Garamond({
  variable: '--font-contact-serif',
  subsets: ['latin', 'latin-ext'],
  weight: ['500'],
  display: 'swap',
});

const CONTACT = {
  phoneDisplay: '+36 20 234 0340',
  phoneHref: 'tel:+36202340340',
  email: 'petrodaniel.manual@gmail.com',
  address: ['Budapest, 1097. Vágóhíd utca 12–18.', '8. épület, 1. emelet'],
};

// Shared Lucide settings: one size and stroke weight for all three icons.
const ICON_PROPS = {
  size: 20,
  strokeWidth: 1.5,
  'aria-hidden': true,
  focusable: false,
} as const;

const MAP_QUERY = 'Budapest, Vágóhíd utca 12-18, 1097';
const MAP_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&z=16&output=embed`;
const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`;

export default function Contact() {
  return (
    <section
      id='contact'
      className={`${styles.contact} ${editorialSerif.variable}`}
      aria-labelledby='contact-title'
    >
      {/* Same drifting-particle atmosphere as Rólam (own seed). */}
      <AboutBackdrop seed={202} />

      {/* Static oversized circles at both edges (as in the Figma section). */}
      <svg
        className={styles.lines}
        viewBox='0 0 1440 900'
        preserveAspectRatio='xMidYMid slice'
        aria-hidden='true'
        focusable='false'
      >
        <circle className={styles.lineMain} cx='-80' cy='250' r='190' />
        {/* Small booking-blue dot at the arc's visible apex. */}
        <circle className={styles.arcDot} cx='110' cy='250' r='3' />
        <circle className={styles.lineSoft} cx='1560' cy='240' r='200' />
        <circle className={styles.lineSoft} cx='1590' cy='250' r='230' />
      </svg>

      <div className={styles.inner}>
        <div className={styles.info}>
          <h1 id='contact-title' className={styles.title}>
            Keress bizalommal.
          </h1>
          <p className={styles.lead}>
            Amennyiben kérdése merül fel, időpontot szeretne egyeztetni, vagy
            további információra van szüksége, állok rendelkezésére.
          </p>

          {/* Three contact rows: location, phone, email (Lucide icons). */}
          <ul className={styles.details}>
            <li className={styles.detail}>
              <span className={styles.icon}>
                <MapPin {...ICON_PROPS} />
              </span>
              <address className={styles.detailText}>
                {CONTACT.address[0]}
                <br />
                {CONTACT.address[1]}
              </address>
            </li>
            <li className={styles.detail}>
              <span className={styles.icon}>
                <Phone {...ICON_PROPS} />
              </span>
              <span className={styles.detailText}>
                <a href={CONTACT.phoneHref} className={styles.link}>
                  {CONTACT.phoneDisplay}
                </a>
              </span>
            </li>
            <li className={styles.detail}>
              <span className={styles.icon}>
                <Mail {...ICON_PROPS} />
              </span>
              <span className={styles.detailText}>
                <a href={`mailto:${CONTACT.email}`} className={styles.link}>
                  {/* On narrow phones, wrap after the @ instead of mid-word. */}
                  <span>
                    {CONTACT.email.split('@')[0]}@<wbr />
                    {CONTACT.email.split('@')[1]}
                  </span>
                </a>
              </span>
            </li>
          </ul>
        </div>

        <div className={styles.mapBlock}>
          <div className={styles.map}>
            <iframe
              src={MAP_EMBED}
              title='Térkép: Budapest, 1097. Vágóhíd utca 12–18.'
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
              className={styles.mapFrame}
            />
          </div>
          <a
            href={MAP_LINK}
            target='_blank'
            rel='noopener noreferrer'
            className={styles.mapLink}
          >
            Megnyitás a Google Térképen
            <span className={styles.srOnly}> (új lapon nyílik meg)</span>
          </a>
        </div>
      </div>
    </section>
  );
}
