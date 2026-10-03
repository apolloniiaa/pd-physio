import Link from 'next/link';
import {
  createLucideIcon,
  Mail,
  MapPin,
  Phone,
  type LucideIcon,
} from 'lucide-react';
import styles from './Footer.module.scss';

type FooterLink = {
  label: string;
  href: `/${string}`;
};

const PAGES: FooterLink[] = [
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
  addressLines: ['Budapest, 1097. Vágóhíd utca 12–18.', '8. épület, 1. emelet'],
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

// Same Google Maps destination as the Contact page link.
const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  'Budapest, Vágóhíd utca 12-18, 1097',
)}`;

// Icon-only row: Location → Instagram → Facebook → Email → Phone.
const ICON_LINKS: {
  label: string;
  href: string;
  Icon: LucideIcon;
  external?: boolean;
}[] = [
  {
    label: `Térkép: ${CONTACT.addressLines.join(', ')} (új lapon nyílik meg)`,
    href: MAP_LINK,
    Icon: MapPin,
    external: true,
  },
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

function ArrowIcon() {
  return (
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
  );
}

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
        <circle className={styles.lineMain} cx='1320' cy='-40' r='560' />
        <circle className={styles.lineSoft} cx='1320' cy='-40' r='700' />
      </svg>

      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.intro}>
            <Link href='/booking' className={styles.cta}>
              <span>IDŐPONTFOGLALÁS</span>
              <ArrowIcon />
            </Link>
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
          <div className={styles.column}>
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
          <p>© 2026 PD Physio</p>
          <p className={styles.credit}>Crafted by DIV.Studio</p>
        </div>
      </div>
    </footer>
  );
}
