import type { Metadata } from 'next';
import { IBM_Plex_Mono, IBM_Plex_Sans, Space_Grotesk } from 'next/font/google';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
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

export const metadata: Metadata = {
  title: 'PD Physio Studio — Személyre szabott gyógytorna & manuálterápia',
  description:
    'Személyre szabott gyógytorna és manuálterápia. Időpontfoglalás a PD Physio Studio rendelésére.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang='hu'
      className={`${fontSans.variable} ${fontDisplay.variable} ${fontMono.variable}`}
    >
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
