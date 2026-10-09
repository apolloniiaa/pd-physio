'use client';

import { useEffect, useState } from 'react';
import {
  onOpenConsentSettings,
  openConsentSettings,
  setConsent,
  useConsent,
} from '@/lib/consent';
import styles from './ConsentBanner.module.scss';

// Analytics-cookie consent (GDPR / ePrivacy). Shown until the visitor
// chooses; "Elfogadom" and "Elutasítom" are equally easy. Google Analytics is
// only loaded after "Elfogadom" (see components/Analytics). The footer's
// "Cookie-beállítások" re-opens it so the choice can be changed any time.
export default function ConsentBanner() {
  const consent = useConsent();
  const [reopened, setReopened] = useState(false);

  useEffect(() => onOpenConsentSettings(() => setReopened(true)), []);

  // 'unknown' = server render / hydration: render nothing (no flash).
  const visible = consent === null || (reopened && consent !== 'unknown');
  if (!visible) return null;

  const choose = (choice: 'granted' | 'denied') => {
    setConsent(choice);
    setReopened(false);
  };

  return (
    <section className={styles.banner} aria-label='Cookie-beállítások'>
      <p className={styles.text}>
        Az oldal a megfelelő működés és a jobb felhasználói élmény érdekében
        cookie-kat használ.
      </p>
      <div className={styles.actions}>
        <button
          type='button'
          className={`${styles.button} ${styles.accept}`}
          onClick={() => choose('granted')}
        >
          Elfogadom
        </button>
        <button
          type='button'
          className={styles.button}
          onClick={() => choose('denied')}
        >
          Elutasítom
        </button>
      </div>
    </section>
  );
}

/** Footer link that re-opens the consent banner. */
export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button type='button' className={className} onClick={openConsentSettings}>
      Cookie-beállítások
    </button>
  );
}
