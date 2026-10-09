// Google Analytics 4 for the PD Physio site.
// The measurement ID is public (it appears in every page that loads GA), not
// a secret. It can be overridden per environment with
// NEXT_PUBLIC_GA_MEASUREMENT_ID; this property is separate from any other
// (e.g. DIV.Studio) analytics.
export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-G7N2N75EWS';

/**
 * Track only real production traffic: production builds, never `next dev`
 * and never Vercel preview deployments.
 */
export const ANALYTICS_ENABLED =
  process.env.NODE_ENV === 'production' &&
  process.env.NEXT_PUBLIC_VERCEL_ENV !== 'preview' &&
  process.env.VERCEL_ENV !== 'preview';
