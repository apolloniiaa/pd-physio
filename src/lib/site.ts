// Single source of truth for the practice's public identity, used by the
// metadata helpers, the JSON-LD structured data, the sitemap and robots.txt.
// Only real, verified information belongs here — no invented opening hours,
// coordinates, credentials or ratings.

/**
 * Production domain — set later in Vercel (Project → Settings →
 * Environment Variables → Production):
 *
 *   NEXT_PUBLIC_SITE_URL=https://www.your-domain.hu
 *
 * No domain is hardcoded. Until the variable is set:
 * - absolute URLs (canonical, sitemap, Open Graph, JSON-LD) use the current
 *   Vercel deployment URL, or http://localhost:3000 in local development;
 * - the site is NOT indexable (noindex + robots.txt disallow), so no
 *   temporary or *.vercel.app URL can end up in Google as the canonical.
 */
const PRODUCTION_URL = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, '') || null;

function resolveSiteUrl(): string {
  if (PRODUCTION_URL) return PRODUCTION_URL;

  // Vercel system variable (deployment host, e.g. pd-physio-abc123.vercel.app).
  const deploymentHost = process.env.VERCEL_URL;
  if (deploymentHost) return `https://${deploymentHost}`;

  return 'http://localhost:3000';
}

export const SITE_URL = resolveSiteUrl();

/** True once a production domain is configured. */
export const HAS_PRODUCTION_URL = PRODUCTION_URL !== null;

/**
 * Indexable only with a real domain, and only on the production deployment
 * (Vercel previews and local builds stay noindex).
 */
export const IS_INDEXABLE =
  HAS_PRODUCTION_URL &&
  (process.env.VERCEL_ENV === undefined || process.env.VERCEL_ENV === 'production');

export const SITE_NAME = 'PD Physio';
export const SITE_LOCALE = 'hu_HU';
export const SITE_LANGUAGE = 'hu';

export const PRACTITIONER = {
  name: 'Petró Dániel',
  jobTitle: 'Gyógytornász-manuálterapeuta',
  image: '/images/about/about-portrait.jpg',
  /** Qualifications exactly as stated by Petró Dániel on the About page. */
  credentials: [
    'Gyógytornász diploma',
    'Barvicsenko (Lewit) manuálterapeuta végzettség',
    'Sportrehabilitációs képzés',
  ],
} as const;

export const CONTACT = {
  phoneDisplay: '+36 20 234 0340',
  phoneE164: '+36202340340',
  email: 'petrodaniel.manual@gmail.com',
} as const;

export const ADDRESS = {
  street: 'Vágóhíd utca 12-18 1. emelet kapucsengő B0112',
  postalCode: '1097',
  city: 'Budapest',
  district: 'IX. kerület (Ferencváros)',
  country: 'HU',
  /** The address exactly as displayed everywhere on the site. */
  oneLine: 'Cím: 1097 Vágóhíd utca 12-18 1. emelet kapucsengő B0112',
  /**
   * Displayed address (Kapcsolat, footer, info pages): street on the first
   * line, floor + doorbell on the second.
   */
  lines: ['Cím: 1097 Vágóhíd utca 12–18.', '1. emelet, kapucsengő B0112'],
} as const;

export const MAP_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  'Budapest, Vágóhíd utca 12-18, 1097',
)}`;

export const SOCIAL = {
  instagram: 'https://www.instagram.com/petrodaniel_/?hl=hu',
  facebook: 'https://www.facebook.com/danielptr2016',
} as const;

/**
 * Online appointment booking (Salonic) — the destination of every
 * IDŐPONTFOGLALÁS button and booking link. Always opens in a new tab.
 */
export const BOOKING_URL =
  'https://borostyan-fizio.salonic.hu/employees/30887/?placeId=12731';

export const OG_IMAGE = {
  url: '/images/og/pd-physio-og.jpg',
  width: 1200,
  height: 630,
  alt: 'Petró Dániel gyógytornász egy páciensnek segít fitneszlabdán végzett gyakorlat közben',
} as const;

/** Absolute URL for a site path ('/about' → 'https://…/about'). */
export function absoluteUrl(path = '/'): string {
  return path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}
