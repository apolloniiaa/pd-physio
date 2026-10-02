import type { Metadata } from 'next';
import Contact from '@/components/contact/Contact/Contact';

export const metadata: Metadata = {
  title: 'Kapcsolat — PD Physio Studio',
};

// Contact page — Navbar (in layout) + contact details and map.
export default function ContactPage() {
  return (
    <main>
      <Contact />
    </main>
  );
}
