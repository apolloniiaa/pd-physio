import type { Metadata } from 'next';
import Pricing from '@/components/pricing/Pricing/Pricing';

export const metadata: Metadata = {
  title: 'Árlista — PD Physio Studio',
};

// Pricing page — Navbar (in layout) + one Pricing section.
export default function PricingPage() {
  return (
    <main>
      <Pricing />
    </main>
  );
}
