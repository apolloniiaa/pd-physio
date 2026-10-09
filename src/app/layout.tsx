import type { Metadata, Viewport } from 'next';
import { IBM_Plex_Mono, IBM_Plex_Sans, Space_Grotesk } from 'next/font/google';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import JsonLd from '@/components/JsonLd/JsonLd';
import PageIntro from '@/components/PageIntro/PageIntro';
import ScrollTopOnReload from '@/components/ScrollTopOnReload/ScrollTopOnReload';
import { siteGraph } from '@/lib/structuredData';
import {
  IS_INDEXABLE,
  OG_IMAGE,
  PRACTITIONER,
  SITE_LOCALE,
  SITE_NAME,
  SITE_URL,
} from '@/lib/site';
import './globals.scss';

// Project typography. Consumed through the $font-* tokens in
// src/styles/_typography.scss — do not import fonts elsewhere.
const fontSans = IBM_Plex_Sans({
  variable: '--font-sans',
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
});

const fontDisplay = Space_Grotesk({
  variable: '--font-display',
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
});

const fontMono = IBM_Plex_Mono({
  variable: '--font-mono',
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500'],
  display: 'swap',
  // Not used above the fold yet; don't preload it.
  preload: false,
});

// Site-wide defaults. Every route sets its own title, description, canonical
// URL and Open Graph data through createMetadata() (src/lib/seo.ts).
// Icons come from the file conventions in src/app (favicon.ico, icon.png,
// apple-icon.png) and the web manifest from src/app/manifest.ts.
const DEFAULT_TITLE = 'Gyógytorna és Manuálterápia Budapest | Petró Dániel';
const DEFAULT_DESCRIPTION =
  'Gyógytorna és manuálterápia Budapesten, Petró Dániel gyógytornász-manuálterapeutával. Személyre szabott kezelések fájdalomcsökkentéshez, rehabilitációhoz és tudatosabb mozgáshoz.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: PRACTITIONER.name }],
  creator: PRACTITIONER.name,
  publisher: SITE_NAME,
  category: 'health',
  formatDetection: { telephone: false, email: false, address: false },
  robots: IS_INDEXABLE
    ? {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-image-preview': 'large',
          'max-snippet': -1,
          'max-video-preview': -1,
        },
      }
    : { index: false, follow: false },
  openGraph: {
    type: 'website',
    locale: SITE_LOCALE,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [{ url: OG_IMAGE.url, alt: OG_IMAGE.alt }],
  },
};

export const viewport: Viewport = {
  themeColor: '#05060a',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang='hu'
      className={`${fontSans.variable} ${fontDisplay.variable} ${fontMono.variable}`}
    >
      <body>
        {/* Without JavaScript, scroll-reveal cards (rendered hidden until
            they animate in) are shown immediately. */}
        <noscript>
          <style>
            {
              '[data-reveal-item]{opacity:1!important;transform:none!important;clip-path:none!important}'
            }
          </style>
        </noscript>
        {/* Practice + practitioner + website entities (schema.org). */}
        <JsonLd data={siteGraph()} />
        <ScrollTopOnReload />
        <PageIntro />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
