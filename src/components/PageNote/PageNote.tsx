import type { ReactNode } from 'react';
import styles from './PageNote.module.scss';

// A short line of contextual internal links under a section on its own page
// ("Időpontot online foglalhatsz…"). Plain text with underlined links — no
// extra buttons — so it sits quietly inside the existing design.
export default function PageNote({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <p className={`${styles.note} ${className ?? ''}`}>{children}</p>;
}
