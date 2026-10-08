import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './not-found.module.scss';
import { BOOKING_URL } from '@/lib/site';

// 404 — Next.js serves it with a 404 status and a noindex robots tag.
export const metadata: Metadata = {
  title: { absolute: 'Az oldal nem található | PD Physio' },
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main>
      <section className={styles.notFound} aria-labelledby='not-found-title'>
        <p className={styles.code}>404</p>
        <h1 id='not-found-title' className={styles.title}>
          Ez az oldal nem található.
        </h1>
        <p className={styles.text}>
          Lehet, hogy elírás történt, vagy az oldal már nem létezik. Innen
          folytathatod:
        </p>
        <ul className={styles.links}>
          <li>
            <Link href='/'>Főoldal</Link>
          </li>
          <li>
            <Link href='/services'>Szolgáltatások</Link>
          </li>
          <li>
            <Link href='/gyogytorna'>Gyógytorna</Link>
          </li>
          <li>
            <a href={BOOKING_URL} target='_blank' rel='noopener noreferrer'>Időpontfoglalás</a>
          </li>
          <li>
            <Link href='/contact'>Kapcsolat</Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
