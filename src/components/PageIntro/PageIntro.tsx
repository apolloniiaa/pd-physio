'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import styles from './PageIntro.module.scss';

// Cinematic entrance, pure CSS (selectors live in PageIntro.module.scss).
//
// 1. Initial page load — the overlay is rendered by the server, so the
//    sequence starts with the very first paint: a dark navy veil fades away,
//    the navbar settles in, then the first section of <main> follows
//    (imagery eases from scale(1.03) → 1, heading and text rise, CTA last).
//    `data-done` is set once it has finished.
//
// 2. Client-side navigation to another route — the root layout (and this
//    component) stays mounted, so nothing is reloaded or reset. Only the
//    destination page's first section replays a lighter version of the same
//    reveal (no veil, no navbar), once per route change, via `data-route`.
//    Hash-only changes on Home (/#about → /#services) keep the same pathname
//    and therefore never trigger it.
//
// This component never navigates, never touches the URL / history and never
// remounts the page: it only toggles attributes on its own element, so it
// cannot interfere with Next.js routing or back / forward navigation.
// Only opacity / transform animate (no layout shift); nothing blocks input.
const INTRO_MS = 1600;
const ROUTE_REVEAL_MS = 1300;

export default function PageIntro() {
  const pathname = usePathname();
  const [done, setDone] = useState(false);

  // Route changes are detected during render (React's "adjust state when a
  // prop changes" pattern), so `data-route` is already present in the same
  // commit that renders the new page — its first frame is the animation's
  // starting state, with no flash of the final state.
  const [lastPathname, setLastPathname] = useState(pathname);
  const [navCount, setNavCount] = useState(0);
  const [settledCount, setSettledCount] = useState(0);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setNavCount((count) => count + 1);
  }

  useEffect(() => {
    const timer = window.setTimeout(() => setDone(true), INTRO_MS);
    return () => window.clearTimeout(timer);
  }, []);

  // End the route reveal; restarted by every further route change.
  useEffect(() => {
    if (navCount === 0) return;
    const timer = window.setTimeout(
      () => setSettledCount(navCount),
      ROUTE_REVEAL_MS,
    );
    return () => window.clearTimeout(timer);
  }, [navCount]);

  // While the initial intro is still running it already covers the new page.
  const routeReveal = done && navCount > 0 && settledCount !== navCount;

  return (
    <div
      className={styles.intro}
      data-done={done ? '' : undefined}
      data-route={routeReveal ? navCount : undefined}
      aria-hidden='true'
    />
  );
}
