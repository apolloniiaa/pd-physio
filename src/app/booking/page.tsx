import type { Metadata } from 'next';
import Booking from '@/components/booking/Booking/Booking';

export const metadata: Metadata = {
  title: 'Időpontfoglalás — PD Physio Studio',
};

// Booking page — Navbar (in layout) + online booking section.
export default function BookingPage() {
  return (
    <main>
      <Booking />
    </main>
  );
}
