import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd/JsonLd';
import Reviews from '@/components/reviews/Reviews/Reviews';
import { createMetadata } from '@/lib/seo';
import { pageGraph } from '@/lib/structuredData';

const TITLE = 'Gyógytorna és Manuálterápia vélemények | Petró Dániel';
const DESCRIPTION =
  'Páciensek Google-értékelései Petró Dániel gyógytornász-manuálterapeuta munkájáról – tapasztalatok gyógytornáról, manuálterápiáról és rehabilitációról.';

export const metadata: Metadata = createMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: '/reviews',
});

// Reviews page — Navbar (in layout) + featured Google reviews.
export default function ReviewsPage() {
  return (
    <main>
      <Reviews />
      <JsonLd
        data={pageGraph({
          path: '/reviews',
          name: TITLE,
          description: DESCRIPTION,
          type: 'WebPage',
        })}
      />
    </main>
  );
}
