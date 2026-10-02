import type { Metadata } from 'next';
import Services from '@/components/services/Services/Services';

export const metadata: Metadata = {
  title: 'Szolgáltatások — PD Physio Studio',
};

// Services page — Navbar (in layout) + one full-viewport Services section.
export default function ServicesPage() {
  return (
    <main>
      <Services />
    </main>
  );
}
