'use client';

import { useEffect } from 'react';

// A browser refresh always starts at the top of the page.
// - Before the page is unloaded, automatic scroll restoration is switched
//   off, so the reloaded page is not put back where it was.
// - After a reload, any #section hash is dropped and the page is scrolled to
//   the top instantly (bypassing the global smooth scroll).
// Normal link / anchor navigation is not touched.
export default function ScrollTopOnReload() {
  useEffect(() => {
    const disableRestoration = () => {
      window.history.scrollRestoration = 'manual';
    };
    window.addEventListener('pagehide', disableRestoration);

    const [navigation] = performance.getEntriesByType(
      'navigation',
    ) as PerformanceNavigationTiming[];

    if (navigation?.type === 'reload') {
      if (window.location.hash) {
        window.history.replaceState(
          window.history.state,
          '',
          window.location.pathname + window.location.search,
        );
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    } else {
      window.history.scrollRestoration = 'auto';
    }

    return () => window.removeEventListener('pagehide', disableRestoration);
  }, []);

  return null;
}
