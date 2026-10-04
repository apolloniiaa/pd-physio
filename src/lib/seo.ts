import type { Metadata } from 'next';
import { OG_IMAGE, SITE_LOCALE, SITE_NAME } from './site';

type PageSeo = {
  /** Full <title> (no template is applied). */
  title: string;
  /** Meta description — aim for ~140–160 characters. */
  description: string;
  /** Route path, e.g. '/about'. Used for the canonical URL and og:url. */
  path: string;
  /** Optional shorter title for social cards. */
  socialTitle?: string;
  type?: 'website' | 'article';
};

/**
 * Complete per-page metadata. Next.js merges `openGraph` / `twitter`
 * shallowly, so every page returns the full objects (title, description,
 * url, image) rather than relying on the root layout.
 */
export function createMetadata({
  title,
  description,
  path,
  socialTitle,
  type = 'website',
}: PageSeo): Metadata {
  const shareTitle = socialTitle ?? title;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      locale: SITE_LOCALE,
      siteName: SITE_NAME,
      url: path,
      title: shareTitle,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: shareTitle,
      description,
      images: [{ url: OG_IMAGE.url, alt: OG_IMAGE.alt }],
    },
  };
}
