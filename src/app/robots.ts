import type { MetadataRoute } from 'next';
import { IS_INDEXABLE, SITE_URL } from '@/lib/site';

// Production: everything is crawlable. Vercel preview deployments: blocked,
// so previews never compete with the live site.
export default function robots(): MetadataRoute.Robots {
  if (!IS_INDEXABLE) {
    return { rules: { userAgent: '*', disallow: '/' } };
  }
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
