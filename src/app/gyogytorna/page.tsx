import type { Metadata } from 'next';
import TopicPage from '@/components/topic/TopicPage/TopicPage';
import { TOPICS } from '@/data/topics';
import { createMetadata } from '@/lib/seo';

const topic = TOPICS.gyogytorna;

export const metadata: Metadata = createMetadata({
  title: topic.title,
  description: topic.description,
  path: topic.path,
});

// Gyógytorna hub: what physiotherapy is, how it works, links to every
// condition page.
export default function GyogytornaPage() {
  return <TopicPage topic={topic} />;
}
