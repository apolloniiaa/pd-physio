import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd/JsonLd';
import Pricing from '@/components/pricing/Pricing/Pricing';
import { createMetadata } from '@/lib/seo';
import { pageGraph } from '@/lib/structuredData';

const TITLE = 'Gyógytorna és Manuálterápia árak Budapest | Petró Dániel';
const DESCRIPTION =
  'Gyógytorna és manuálterápia árai: állapotfelmérés 20.000 Ft, kezelés 18.000 Ft (55 perc), 6 és 10 alkalmas bérlet. Cím: 1097 Vágóhíd utca 12-18 1. emelet kapucsengő B0112.';

export const metadata: Metadata = createMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: '/pricing',
});

// Pricing page — Navbar (in layout) + one Pricing section.
export default function PricingPage() {
  return (
    <main>
      <Pricing />
      <JsonLd
        data={pageGraph({
          path: '/pricing',
          name: TITLE,
          description: DESCRIPTION,
          type: 'WebPage',
        })}
      />
    </main>
  );
}
