import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd/JsonLd';
import Hero from '@/components/home/Hero/Hero';
import About from '@/components/about/About/About';
import Services from '@/components/services/Services/Services';
import Pricing from '@/components/pricing/Pricing/Pricing';
import Reviews from '@/components/reviews/Reviews/Reviews';
import Contact from '@/components/contact/Contact/Contact';
import SectionReveal from '@/components/home/SectionReveal/SectionReveal';
import { createMetadata } from '@/lib/seo';
import { pageGraph } from '@/lib/structuredData';
import styles from './page.module.scss';

const TITLE = 'Gyógytorna és Manuálterápia Budapest | Petró Dániel';
const DESCRIPTION =
  'Gyógytorna és manuálterápia Budapesten, Petró Dániel gyógytornász-manuálterapeutával. Személyre szabott kezelések fájdalomcsökkentéshez, rehabilitációhoz és tudatosabb mozgáshoz.';

export const metadata: Metadata = createMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: '/',
});

// Home page — one-page structure: Hero → Rólam (#about) → Szolgáltatások
// (#services) → Árlista (#pricing) → Visszajelzések (#reviews) → Kapcsolat
// (#contact). Navbar and Footer come from the root layout. Each section is
// also available on its own route (/about, /services, …), where it carries
// the page's H1; here the Hero owns the only H1 and sections use H2.
export default function Home() {
  return (
    <main className={styles.home}>
      {/* Hero is visible immediately; the sections below reveal on scroll. */}
      <Hero />
      <SectionReveal>
        <About level={2} />
      </SectionReveal>
      <SectionReveal>
        <Services level={2} />
      </SectionReveal>
      <SectionReveal>
        <Pricing level={2} />
      </SectionReveal>
      <SectionReveal>
        <Reviews level={2} />
      </SectionReveal>
      <SectionReveal>
        <Contact level={2} />
      </SectionReveal>
      <JsonLd
        data={pageGraph({ path: '/', name: TITLE, description: DESCRIPTION })}
      />
    </main>
  );
}
