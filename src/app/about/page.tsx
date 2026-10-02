import type { Metadata } from 'next';
import About from '@/components/about/About/About';

export const metadata: Metadata = {
  title: 'Rólam — PD Physio Studio',
};

// About page — Navbar (in layout) + one full-viewport About section.
export default function AboutPage() {
  return (
    <main>
      <About />
    </main>
  );
}
