import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd/JsonLd';
import Contact from '@/components/contact/Contact/Contact';
import { createMetadata } from '@/lib/seo';
import { pageGraph } from '@/lib/structuredData';

const TITLE = 'Gyógytornász és Manuálterapeuta Budapest | Kapcsolat';
const DESCRIPTION =
  'Petró Dániel gyógytornász-manuálterapeuta elérhetőségei: 1097 Budapest (IX. kerület, Ferencváros), Vágóhíd utca 12–18., 8. épület, 1. emelet · +36 20 234 0340.';

export const metadata: Metadata = createMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: '/contact',
});

// Contact page — Navbar (in layout) + contact details and map.
export default function ContactPage() {
  return (
    <main>
      <Contact />
      <JsonLd
        data={pageGraph({
          path: '/contact',
          name: TITLE,
          description: DESCRIPTION,
          type: 'ContactPage',
        })}
      />
    </main>
  );
}
