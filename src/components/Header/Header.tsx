'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
  { label: 'RÓLUNK', href: '/about' },
  { label: 'SZOLGÁLTATÁSOK', href: '/services' },
  { label: 'ÁRLISTA', href: '/pricing' },
  { label: 'VISSZAJELZÉSEK', href: '/reviews' },
  { label: 'KAPCSOLAT', href: '/contact' },
];

const BOOKING_ITEM: NavItem = {
  label: 'IDŐPONTFOGLALÁS',
  href: '/booking',
};

/** Must match $bp-lg in src/styles/_breakpoints.scss */
const DESKTOP_QUERY = '(min-width: 1024px)';

const MENU_ID = 'header-mobile-menu';

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

  const closeMenu = useCallback(() => setIsOpen(false), []);
  const toggleMenu = useCallback(() => setIsOpen((open) => !open), []);

  // Lock background scroll and listen for Escape while the menu is open.
  useEffect(() => {
    if (!isOpen) return;

    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

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
      <header className={styles.header}>
        <div className={styles.inner}>
          <Link
            href='/'
            className={styles.logo}
            aria-label='PD Physio Studio – főoldal'
            onClick={closeMenu}
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
                  <a href={item.href} className={styles.navLink}>
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
                      className={styles.mobileLink}
                      onClick={closeMenu}
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
