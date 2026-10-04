import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd/JsonLd';
import Services from '@/components/services/Services/Services';
import { createMetadata } from '@/lib/seo';
import { pageGraph } from '@/lib/structuredData';

const TITLE = 'Gyógytorna és Manuálterápia | Szolgáltatások';
const DESCRIPTION =
  'Manuálterápia, gyógytorna, fasciakezelés, tartáskorrekció, rehabilitáció, fájdalomcsökkentés, mozgáskontroll és prevenció – személyre szabott kezelések.';

export const metadata: Metadata = createMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: '/services',
});

// Services page — Navbar (in layout) + Services section with links to the patient-information pages.
export default function ServicesPage() {
  return (
    <main>
      <Services />
      <JsonLd
        data={pageGraph({
          path: '/services',
          name: TITLE,
          description: DESCRIPTION,
          type: 'CollectionPage',
        })}
      />
    </main>
  );
}
