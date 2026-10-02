import type { Metadata } from 'next';
import Reviews from '@/components/reviews/Reviews/Reviews';

export const metadata: Metadata = {
  title: 'Visszajelzések — PD Physio Studio',
};

// Reviews page — Navbar (in layout) + featured Google reviews.
export default function ReviewsPage() {
  return (
    <main>
      <Reviews />
    </main>
  );
}
