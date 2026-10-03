'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  AnimatePresence,
  MotionConfig,
  motion,
  stagger,
  type Transition,
  type Variants,
} from 'motion/react';
import styles from './Header.module.scss';

type NavItem = {
  label: string;
  href: `/${string}`;
};

const NAV_ITEMS: NavItem[] = [
  { label: 'FŐOLDAL', href: '/' },
  { label: 'RÓLAM', href: '/#about' },
  { label: 'SZOLGÁLTATÁSOK', href: '/#services' },
  { label: 'ÁRLISTA', href: '/#pricing' },
  { label: 'VISSZAJELZÉSEK', href: '/#reviews' },
  { label: 'KAPCSOLAT', href: '/#contact' },
];

const BOOKING_ITEM: NavItem = {
  label: 'IDŐPONTFOGLALÁS',
  href: '/booking',
};

/** Must match $bp-lg in src/styles/_breakpoints.scss */
const DESKTOP_QUERY = '(min-width: 1024px)';

const MENU_ID = 'header-mobile-menu';

// Home one-page sections in page order. 'home' is the Hero.
const HOME_SECTION_IDS = ['home', 'about', 'services', 'pricing', 'reviews', 'contact'];

// Stand-alone routes → the nav item that stays active on them.
const ROUTE_ACTIVE_HREF: Record<string, NavItem['href']> = {
  '/about': '/#about',
  '/services': '/#services',
  '/pricing': '/#pricing',
  '/reviews': '/#reviews',
  '/contact': '/#contact',
};

// ========================================
// Motion
// ========================================

const EASE_EDITORIAL = [0.65, 0, 0.35, 1] as const;
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** Critically damped spring: physical, but never overshoots. */
const SETTLE: Transition = { type: 'spring', bounce: 0, duration: 0.45 };

/** Distance of each hamburger line from the centre, in px. */
const LINE_OFFSET = 4;

const topLineVariants: Variants = {
  closed: {
    y: -LINE_OFFSET,
    rotate: 0,
    // Closing: un-cross first, then separate.
    transition: {
      rotate: { duration: 0.22, ease: EASE_EDITORIAL },
      y: { ...SETTLE, delay: 0.16 },
    },
  },
  open: {
    y: 0,
    rotate: 45,
    // Opening: meet in the centre first, then cross into an X.
    transition: {
      y: { duration: 0.2, ease: EASE_EDITORIAL },
      rotate: { ...SETTLE, delay: 0.16 },
    },
  },
};

const bottomLineVariants: Variants = {
  closed: { ...topLineVariants.closed, y: LINE_OFFSET },
  open: { ...topLineVariants.open, rotate: -45 },
};

const backdropVariants: Variants = {
  closed: { opacity: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  open: { opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } },
};

const panelVariants: Variants = {
  closed: {
    opacity: 0,
    y: -8,
    clipPath: 'inset(0% 0% 100% 0%)',
    transition: {
      when: 'afterChildren',
      duration: 0.36,
      ease: EASE_EDITORIAL,
    },
  },
  open: {
    opacity: 1,
    y: 0,
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: {
      duration: 0.55,
      ease: EASE_OUT,
    },
  },
};

const listVariants: Variants = {
  closed: {
    transition: { delayChildren: stagger(0.03, { from: 'last' }) },
  },
  open: {
    transition: { delayChildren: stagger(0.05, { startDelay: 0.14 }) },
  },
};

const itemVariants: Variants = {
  closed: {
    opacity: 0,
    y: 10,
    transition: { duration: 0.18, ease: 'easeIn' },
  },
  open: {
    opacity: 1,
    y: 0,
    transition: { ...SETTLE, duration: 0.5 },
  },
};

// ========================================
// Component
// ========================================

function ArrowIcon() {
  return (
    <svg
      className={styles.arrow}
      width='16'
      height='10'
      viewBox='0 0 16 10'
      fill='none'
      aria-hidden='true'
      focusable='false'
    >
      <path
        d='M0 5h15M10.5 0.75 15 5l-4.5 4.25'
        stroke='currentColor'
        strokeWidth='1.2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLElement>(null);
  const [activeSection, setActiveSection] = useState('home');

  const pathname = usePathname();
  const closeMenu = useCallback(() => setIsOpen(false), []);

  // Logo + HOME: on the Home page itself, return to the very top (and drop
  // any #section hash) instead of reloading; on other routes, navigate to /.
  const handleHomeClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      setIsOpen(false);
      if (pathname !== '/') return;
      event.preventDefault();
      if (window.location.hash) {
        window.history.replaceState(window.history.state, '', '/');
      }
      window.scrollTo({ top: 0 });
    },
    [pathname],
  );
  const toggleMenu = useCallback(() => setIsOpen((open) => !open), []);

  // Lock background scroll and listen for Escape while the menu is open.
  // overflow: hidden on <html> (the viewport) stops wheel/keyboard scrolling;
  // the touchmove/wheel guard below also stops touch scrolling on mobile
  // browsers that ignore it. <body> is left alone on purpose: hiding its
  // overflow too would turn it into its own scroll container and break the
  // sticky header (and the menu positioned under it) on a scrolled page. Only the menu panel itself may scroll (when its
  // content is taller than the viewport). The page position is never moved,
  // so nothing jumps when the menu closes.
  useEffect(() => {
    if (!isOpen) return;

    const html = document.documentElement;
    const previousHtmlOverflow = html.style.overflow;
    html.style.overflow = 'hidden';

    const blockBackgroundScroll = (event: Event) => {
      const menu = menuRef.current;
      const target = event.target;
      const insideScrollableMenu =
        menu !== null &&
        target instanceof Node &&
        menu.contains(target) &&
        menu.scrollHeight > menu.clientHeight;
      if (!insideScrollableMenu && event.cancelable) event.preventDefault();
    };
    const guardOptions: AddEventListenerOptions = { passive: false };
    document.addEventListener('touchmove', blockBackgroundScroll, guardOptions);
    document.addEventListener('wheel', blockBackgroundScroll, guardOptions);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      html.style.overflow = previousHtmlOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('touchmove', blockBackgroundScroll);
      document.removeEventListener('wheel', blockBackgroundScroll);
    };
  }, [isOpen]);

  // Home scroll spy: the section crossing a thin band just above the middle
  // of the viewport is the active one (IntersectionObserver, no scroll
  // listener). Below the last section (footer) the last match stays active.
  useEffect(() => {
    if (pathname !== '/') return;

    const sections = HOME_SECTION_IDS.map((id) =>
      document.getElementById(id),
    ).filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  const activeHref: NavItem['href'] | null =
    pathname === '/'
      ? activeSection === 'home'
        ? '/'
        : `/#${activeSection}`
      : (ROUTE_ACTIVE_HREF[pathname] ?? null);

  // Close the menu if the viewport grows into the desktop layout.
  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_QUERY);
    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) setIsOpen(false);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const menuState = isOpen ? 'open' : 'closed';

  return (
    // reducedMotion="user": transform animations are skipped for users who
    // prefer reduced motion; opacity fades remain so state changes stay clear.
    <MotionConfig reducedMotion='user'>
      <header
        className={`${styles.header} ${isOpen ? styles.headerMenuOpen : ''}`}
      >
        <div className={styles.inner}>
          <Link
            href='/'
            className={styles.logo}
            aria-label='PD Physio Studio – főoldal'
            onClick={handleHomeClick}
          >
            <Image
              src='/images/logo-mark.png'
              alt=''
              width={311}
              height={285}
              className={styles.logoMark}
              priority
            />
          </Link>

          <nav className={styles.desktopNav} aria-label='Fő navigáció'>
            <ul className={styles.navList}>
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={`${styles.navLink} ${item.href === activeHref ? styles.navLinkActive : ''}`}
                    aria-current={item.href === activeHref ? 'true' : undefined}
                    onClick={item.href === '/' ? handleHomeClick : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <a href={BOOKING_ITEM.href} className={styles.cta}>
            <span className={styles.ctaLabel}>{BOOKING_ITEM.label}</span>
            <ArrowIcon />
          </a>

          <button
            ref={toggleRef}
            type='button'
            className={styles.toggle}
            aria-expanded={isOpen}
            aria-controls={MENU_ID}
            aria-label={isOpen ? 'Menü bezárása' : 'Menü megnyitása'}
            onClick={toggleMenu}
          >
            <motion.span
              className={styles.toggleLine}
              aria-hidden='true'
              variants={topLineVariants}
              initial={false}
              animate={menuState}
            />
            <motion.span
              className={styles.toggleLine}
              aria-hidden='true'
              variants={bottomLineVariants}
              initial={false}
              animate={menuState}
            />
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              key='backdrop'
              className={styles.backdrop}
              aria-hidden='true'
              variants={backdropVariants}
              initial='closed'
              animate='open'
              exit='closed'
              onClick={closeMenu}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isOpen && (
            <motion.nav
              ref={menuRef}
              key='menu'
              id={MENU_ID}
              className={styles.mobileMenu}
              aria-label='Mobil navigáció'
              variants={panelVariants}
              initial='closed'
              animate='open'
              exit='closed'
            >
              <motion.ul className={styles.mobileList} variants={listVariants}>
                {NAV_ITEMS.map((item) => (
                  <motion.li key={item.href} variants={itemVariants}>
                    <a
                      href={item.href}
                      className={`${styles.mobileLink} ${item.href === activeHref ? styles.mobileLinkActive : ''}`}
                      aria-current={item.href === activeHref ? 'true' : undefined}
                      onClick={item.href === '/' ? handleHomeClick : closeMenu}
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
                <motion.li
                  className={styles.mobileCtaItem}
                  variants={itemVariants}
                >
                  <a
                    href={BOOKING_ITEM.href}
                    className={`${styles.mobileLink} ${styles.mobileCta}`}
                    onClick={closeMenu}
                  >
                    <span>{BOOKING_ITEM.label}</span>
                    <ArrowIcon />
                  </a>
                </motion.li>
              </motion.ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </MotionConfig>
  );
}
