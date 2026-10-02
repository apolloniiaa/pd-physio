import type { ReactNode } from 'react';
import { Cormorant_Garamond } from 'next/font/google';
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
  hours: 'H–P 8:00 – 18:00',
  email: 'apgyogytorna@gmail.com',
  address: ['Budapest, 1097. Vágóhíd utca 12–18.', '8. épület, 1. emelet'],
};

const MAP_QUERY = 'Budapest, Vágóhíd utca 12-18, 1097';
const MAP_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&z=16&output=embed`;
const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`;

type IconName = 'phone' | 'mail' | 'pin';

const ICONS: Record<IconName, ReactNode> = {
  phone: (
    <path d='M7.2 4.5h2.6l1.2 3.4-1.7 1.2a10.6 10.6 0 0 0 5.6 5.6l1.2-1.7 3.4 1.2v2.6a1.8 1.8 0 0 1-1.9 1.8C11 18.2 5.8 13 5.4 6.4a1.8 1.8 0 0 1 1.8-1.9z' />
  ),
  mail: (
    <>
      <rect x='3.5' y='6' width='17' height='12' rx='1.5' />
      <path d='M4 7l8 6 8-6' />
    </>
  ),
  pin: (
    <>
      <path d='M12 20.5s6-5.6 6-10.5a6 6 0 0 0-12 0c0 4.9 6 10.5 6 10.5z' />
      <circle cx='12' cy='10' r='2.2' />
    </>
  ),
};

function LineIcon({ name }: { name: IconName }) {
  return (
    <svg
      width='18'
      height='18'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.1'
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden='true'
      focusable='false'
    >
      {ICONS[name]}
    </svg>
  );
}

export default function Contact() {
  return (
    <section
      id='kapcsolat'
      className={`${styles.contact} ${editorialSerif.variable}`}
      aria-labelledby='contact-title'
    >
      {/* Static oversized circles at both edges (as in the Figma section). */}
      <svg
        className={styles.lines}
        viewBox='0 0 1440 900'
        preserveAspectRatio='xMidYMid slice'
        aria-hidden='true'
        focusable='false'
      >
        <circle className={styles.lineMain} cx='-80' cy='250' r='190' />
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

          <ul className={styles.details}>
            <li className={styles.detail}>
              <span className={styles.icon}>
                <LineIcon name='phone' />
              </span>
              <span className={styles.detailText}>
                <a href={CONTACT.phoneHref} className={styles.link}>
                  {CONTACT.phoneDisplay}
                </a>
                <span className={styles.meta}>{CONTACT.hours}</span>
              </span>
            </li>
            <li className={styles.detail}>
              <span className={styles.icon}>
                <LineIcon name='mail' />
              </span>
              <span className={styles.detailText}>
                <a href={`mailto:${CONTACT.email}`} className={styles.link}>
                  {CONTACT.email}
                </a>
              </span>
            </li>
            <li className={styles.detail}>
              <span className={styles.icon}>
                <LineIcon name='pin' />
              </span>
              <address className={styles.detailText}>
                {CONTACT.address[0]}
                <br />
                {CONTACT.address[1]}
              </address>
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
            {/* Blue grade over the (greyscale, inverted) map. */}
            <span className={styles.mapTint} aria-hidden='true' />
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
