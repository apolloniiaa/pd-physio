import { BOOKING_URL } from '@/lib/site';
import styles from './BookingButton.module.scss';

// The site's primary "IDŐPONTFOGLALÁS" button (filled electric-blue pill with
// arrow), shared by the Home hero and the Contact section. Placement
// (margins) is passed in by the parent through `className`.
export default function BookingButton({ className }: { className?: string }) {
  return (
    <a
      href={BOOKING_URL}
      target='_blank'
      rel='noopener noreferrer'
      className={className ? `${styles.button} ${className}` : styles.button}
    >
      <span>Időpontfoglalás</span>
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
          d='M0 5h15M10.5.75 15 5l-4.5 4.25'
          stroke='currentColor'
          strokeWidth='1.2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
      <span className={styles.srOnly}> (új lapon nyílik meg)</span>
    </a>
  );
}
