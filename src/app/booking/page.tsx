import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd/JsonLd';
import Booking from '@/components/booking/Booking/Booking';
import { createMetadata } from '@/lib/seo';
import { pageGraph } from '@/lib/structuredData';

const TITLE = 'Gyógytorna időpontfoglalás Budapest | Petró Dániel';
const DESCRIPTION =
  'Foglalj időpontot gyógytornára vagy manuálterápiára online. Rendelő: 1097 Budapest, Vágóhíd utca 12–18., 8. épület – Petró Dániel gyógytornász-manuálterapeuta.';

export const metadata: Metadata = createMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: '/booking',
});

// Booking page — Navbar (in layout) + online booking section.
export default function BookingPage() {
  return (
    <main>
      <Booking />
      <JsonLd
        data={pageGraph({
          path: '/booking',
          name: TITLE,
          description: DESCRIPTION,
          type: 'WebPage',
        })}
      />
    </main>
  );
}
