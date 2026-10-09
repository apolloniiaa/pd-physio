'use client';

import { useSyncExternalStore } from 'react';

/**
 * Live `window.matchMedia(query).matches`. Server render: false.
 * Used to size scroll-reveal staggers to the current grid column count.
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const list = window.matchMedia(query);
      list.addEventListener('change', onChange);
      return () => list.removeEventListener('change', onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** Must match $bp-md / $bp-xl in src/styles/_breakpoints.scss. */
export const MQ_MD = '(min-width: 820px)';
export const MQ_XL = '(min-width: 1200px)';
