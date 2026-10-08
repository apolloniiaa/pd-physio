import type { MetadataRoute } from 'next';
import { TOPIC_LIST } from '@/data/topics';
import { absoluteUrl } from '@/lib/site';

// Every indexable route. Submit `${SITE_URL}/sitemap.xml` in Google Search
// Console. lastModified is intentionally omitted (no reliable per-page date).
const STATIC_ROUTES: { path: string; priority: number }[] = [
  { path: '/', priority: 1 },
  { path: '/services', priority: 0.9 },
  { path: '/about', priority: 0.8 },
  { path: '/pricing', priority: 0.8 },
  { path: '/contact', priority: 0.8 },
  { path: '/reviews', priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...STATIC_ROUTES.map(({ path, priority }) => ({
      url: absoluteUrl(path),
      changeFrequency: 'monthly' as const,
      priority,
    })),
    ...TOPIC_LIST.map((topic) => ({
      url: absoluteUrl(topic.path),
      changeFrequency: 'monthly' as const,
      priority: topic.path.split('/').length > 2 ? 0.7 : 0.9,
    })),
  ];
}
