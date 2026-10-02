import Hero from '@/components/home/Hero/Hero';
import About from '@/components/about/About/About';
import Services from '@/components/services/Services/Services';
import Pricing from '@/components/pricing/Pricing/Pricing';
import Reviews from '@/components/reviews/Reviews/Reviews';
import Contact from '@/components/contact/Contact/Contact';
import SectionReveal from '@/components/home/SectionReveal/SectionReveal';
import styles from './page.module.scss';

// Home page — one-page structure: Hero → Rólam (#about) → Szolgáltatások
// (#services) → Árlista (#pricing) → Visszajelzések (#reviews) → Kapcsolat
// (#contact). Navbar and Footer come from the root layout. Each section is
// also available on its own route (/about, /services, …).
export default function Home() {
  return (
    <main className={styles.home}>
      {/* Hero is visible immediately; the sections below reveal on scroll. */}
      <Hero />
      <SectionReveal>
        <About />
      </SectionReveal>
      <SectionReveal>
        <Services />
      </SectionReveal>
      <SectionReveal>
        <Pricing />
      </SectionReveal>
      <SectionReveal>
        <Reviews />
      </SectionReveal>
      <SectionReveal>
        <Contact />
      </SectionReveal>
    </main>
  );
}
