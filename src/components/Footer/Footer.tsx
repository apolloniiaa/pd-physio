import Link from 'next/link';
import styles from './Footer.module.scss';

type FooterLink = {
  label: string;
  href: `/${string}`;
};

const PAGES: FooterLink[] = [
  { label: 'RÓLUNK', href: '/about' },
  { label: 'SZOLGÁLTATÁSOK', href: '/services' },
  { label: 'ÁRLISTA', href: '/pricing' },
  { label: 'VISSZAJELZÉSEK', href: '/reviews' },
  { label: 'KAPCSOLAT', href: '/contact' },
];

const CONTACT = {
  phone: '+36 20 234 0340',
  phoneHref: 'tel:+36202340340',
  email: 'apgyogytorna@gmail.com',
  addressLines: ['Budapest, 1097. Vágóhíd utca 12–18.', '8. épület, 1. emelet'],
};

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

          <div className={styles.column}>
            <p className={styles.heading}>KAPCSOLAT</p>
            <ul className={styles.list}>
              <li>
                <a href={CONTACT.phoneHref} className={styles.detailLink}>
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`} className={styles.detailLink}>
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <address className={styles.address}>
                  {CONTACT.addressLines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </address>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© 2026 PD Physio</p>
          <p>GYÓGYTORNA · MANUÁLTERÁPIA</p>
        </div>
      </div>
    </footer>
  );
}
