import type { Metadata } from 'next';
import TopicPage from '@/components/topic/TopicPage/TopicPage';
import { TOPICS } from '@/data/topics';
import { createMetadata } from '@/lib/seo';

const topic = TOPICS.manualterapia;

export const metadata: Metadata = createMetadata({
  title: topic.title,
  description: topic.description,
  path: topic.path,
});

// Manuálterápia hub: what manual therapy is, when it can help, and its limits.
export default function ManualterapiaPage() {
  return <TopicPage topic={topic} />;
}
