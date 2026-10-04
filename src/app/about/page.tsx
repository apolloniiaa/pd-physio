import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd/JsonLd';
import About from '@/components/about/About/About';
import { createMetadata } from '@/lib/seo';
import { pageGraph, SCHEMA_IDS } from '@/lib/structuredData';

const TITLE = 'Petró Dániel gyógytornász-manuálterapeuta | Bemutatkozás';
const DESCRIPTION =
  'Petró Dániel gyógytornász-manuálterapeuta: Barvicsenko (Lewit) manuálterápiás és sportrehabilitációs képzés; gerinc-, nyak-, derék- és vállpanaszok kezelése.';

export const metadata: Metadata = createMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: '/about',
});

// About page — Navbar (in layout) + one full-viewport About section.
export default function AboutPage() {
  return (
    <main>
      <About />
      <JsonLd
        data={pageGraph({
          path: '/about',
          name: TITLE,
          description: DESCRIPTION,
          type: 'AboutPage',
          about: { '@id': SCHEMA_IDS.person },
        })}
      />
    </main>
  );
}
