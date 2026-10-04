import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import TopicPage from '@/components/topic/TopicPage/TopicPage';
import { CONDITION_SLUGS, isConditionSlug, TOPICS } from '@/data/topics';
import { createMetadata } from '@/lib/seo';

type Props = {
  params: Promise<{ slug: string }>;
};

// Condition pages (/gyogytorna/gerincserv, …) are fully static; any other
// slug is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return CONDITION_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!isConditionSlug(slug)) return {};
  const topic = TOPICS[slug];
  return createMetadata({
    title: topic.title,
    description: topic.description,
    path: topic.path,
  });
}

export default async function ConditionPage({ params }: Props) {
  const { slug } = await params;
  if (!isConditionSlug(slug)) notFound();
  return <TopicPage topic={TOPICS[slug]} />;
}
