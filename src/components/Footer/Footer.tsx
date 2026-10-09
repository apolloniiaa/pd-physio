import { Fragment } from 'react';
import Link from 'next/link';
import {
  createLucideIcon,
  Mail,
  Phone,
  type LucideIcon,
} from 'lucide-react';
import { ADDRESS } from '@/lib/site';
import styles from './Footer.module.scss';

type FooterLink = {
  label: string;
  href: `/${string}`;
};

// Home page sections (same anchors as the navbar). From any other route the
// link opens the Home page and scrolls to the section.
const PAGES: FooterLink[] = [
  { label: 'FŐOLDAL', href: '/' },
  { label: 'RÓLAM', href: '/#about' },
  { label: 'SZOLGÁLTATÁSOK', href: '/#services' },
  { label: 'ÁRLISTA', href: '/#pricing' },
  { label: 'VISSZAJELZÉSEK', href: '/#reviews' },
  { label: 'KAPCSOLAT', href: '/#contact' },
];

const CONTACT = {
  phone: '+36 20 234 0340',
  phoneHref: 'tel:+36202340340',
  email: 'petrodaniel.manual@gmail.com',
};

// Lucide icon settings shared by every contact icon (same as Contact page).
const ICON_PROPS = {
  size: 20,
  strokeWidth: 1.5,
  'aria-hidden': true,
  focusable: false,
} as const;

// lucide-react 1.x no longer ships brand icons, so Instagram and Facebook
// are registered through Lucide's own createLucideIcon API using Lucide's
// original (ISC-licensed) outline geometry — they render as regular Lucide
// icons with identical sizing and stroke behaviour.
const Instagram = createLucideIcon('instagram', [
  ['rect', { width: '20', height: '20', x: '2', y: '2', rx: '5', ry: '5', key: 'ig-frame' }],
  ['path', { d: 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z', key: 'ig-lens' }],
  ['line', { x1: '17.5', x2: '17.51', y1: '6.5', y2: '6.5', key: 'ig-dot' }],
]);
const Facebook = createLucideIcon('facebook', [
  ['path', { d: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z', key: 'fb' }],
]);

// Icon-only row: Instagram → Facebook → Email → Phone.
const ICON_LINKS: {
  label: string;
  href: string;
  Icon: LucideIcon;
  external?: boolean;
}[] = [
  {
    label: 'Instagram (új lapon nyílik meg)',
    href: 'https://www.instagram.com/petrodaniel_/?hl=hu',
    Icon: Instagram,
    external: true,
  },
  {
    label: 'Facebook (új lapon nyílik meg)',
    href: 'https://www.facebook.com/danielptr2016',
    Icon: Facebook,
    external: true,
  },
  {
    label: `E-mail: ${CONTACT.email}`,
    href: `mailto:${CONTACT.email}`,
    Icon: Mail,
  },
  {
    label: `Telefon: ${CONTACT.phone}`,
    href: CONTACT.phoneHref,
    Icon: Phone,
  },
];

// Global footer — rendered once in the root layout, closes every page.
// Full-width background; content sits in the centred .inner container.
export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Static, oversized line work behind the content. */}
      <svg
        className={styles.lines}
        viewBox='0 0 1440 900'
        preserveAspectRatio='xMidYMid slice'
        aria-hidden='true'
        focusable='false'
      >
        {/* Two quiet arcs: one sweeping around the brand mark, one from the
            top-right corner — they frame the content rather than cross it. */}
        <circle className={styles.lineMain} cx='-120' cy='860' r='620' />
        <circle className={styles.lineSoft} cx='1480' cy='-80' r='520' />
      </svg>

      <div className={styles.inner}>
        <div className={styles.grid}>
          {/* Brand: the PD monogram, painted in the site blues through the
              logo PNG used as an alpha mask (see .mark). */}
          <div className={styles.brand}>
            <Link
              href='/'
              className={styles.brandLink}
              aria-label='PD Physio Studio – főoldal'
            >
              <span className={styles.mark} aria-hidden='true' />
            </Link>

            {/* Practitioner + practice address (consistent NAP on every page). */}
            <p className={styles.identity}>
              Petró Dániel
              <span className={styles.identityRole}>
                Gyógytornász-manuálterapeuta
              </span>
            </p>
            <address className={styles.address}>
              {ADDRESS.lines.map((line, index) => (
                <Fragment key={line}>
                  {index > 0 && <br />}
                  {line}
                </Fragment>
              ))}
            </address>
          </div>

          <nav className={styles.column} aria-labelledby='footer-pages'>
            <p id='footer-pages' className={styles.heading}>
              OLDALAK
            </p>
            <ul className={styles.list}>
              {PAGES.map((page) => (
                <li key={page.href}>
                  <Link href={page.href} className={styles.navLink}>
                    {page.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact column: one row of icon-only links (no visible text). */}
          <div className={`${styles.column} ${styles.social}`}>
            <ul className={styles.iconRow}>
              {ICON_LINKS.map(({ label, href, Icon, external }) => (
                <li key={href}>
                  <a
                    href={href}
                    className={styles.iconLink}
                    aria-label={label}
                    {...(external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                  >
                    <Icon {...ICON_PROPS} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© 2026 Petró Dániel Physio. Minden jog fenntartva</p>
          <p className={styles.credit}>Crafted by DIV.Studio</p>
        </div>
      </div>
    </footer>
  );
}
