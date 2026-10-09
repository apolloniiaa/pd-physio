'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { ANALYTICS_ENABLED, GA_MEASUREMENT_ID } from '@/lib/analytics';
import { useConsent } from '@/lib/consent';

// GA4 (gtag.js), loaded ONLY after the visitor accepts analytics cookies.
//
// Page views: gtag is configured with send_page_view: false and this
// component sends exactly one page_view per route (initial load + every
// client-side navigation; #section jumps on the Home page are not counted).
// In GA4 → Admin → Data streams → Enhanced measurement → Page views →
// "Page changes based on browser history events" must be OFF, otherwise GA
// would count client-side navigations a second time.

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

let initialised = false;

function ensureGtag(): Gtag {
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function gtag() {
      // gtag.js expects the `arguments` object, not an array.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
  }
  return window.gtag;
}

function initialise() {
  if (initialised) return;
  initialised = true;
  const gtag = ensureGtag();
  // Consent Mode v2: analytics only; no advertising storage or signals.
  gtag('consent', 'default', {
    analytics_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: false,
    anonymize_ip: true,
  });
}

/** Google's documented opt-out switch: stops all GA hits for this ID. */
function gaDisable(disabled: boolean) {
  (window as unknown as Record<string, boolean>)[`ga-disable-${GA_MEASUREMENT_ID}`] =
    disabled;
}

/** Remove GA cookies when consent is withdrawn. */
function clearGaCookies() {
  const host = window.location.hostname;
  const domains = ['', host, `.${host.replace(/^www\./, '')}`];
  document.cookie.split(';').forEach((cookie) => {
    const name = cookie.split('=')[0]?.trim();
    if (!name || !name.startsWith('_ga')) return;
    domains.forEach((domain) => {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ''}`;
    });
  });
}

export default function Analytics() {
  const consent = useConsent();
  const pathname = usePathname();
  const granted = ANALYTICS_ENABLED && consent === 'granted';

  // One page_view per route (and on the first load after consent).
  useEffect(() => {
    if (!granted) return;
    gaDisable(false);
    initialise();
    window.gtag?.('event', 'page_view', {
      page_path: pathname,
      page_location: `${window.location.origin}${pathname}${window.location.search}`,
    });
  }, [granted, pathname]);

  // Consent withdrawn after being granted: stop storage and drop cookies.
  useEffect(() => {
    if (!ANALYTICS_ENABLED || consent !== 'denied' || !initialised) return;
    window.gtag?.('consent', 'update', { analytics_storage: 'denied' });
    gaDisable(true);
    clearGaCookies();
  }, [consent]);

  if (!granted) return null;

  return (
    <Script
      id='ga4'
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      strategy='afterInteractive'
    />
  );
}
