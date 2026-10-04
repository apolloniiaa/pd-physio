import type { MetadataRoute } from 'next';

// Web app manifest: name, colours and icons for "Add to Home Screen".
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'PD Physio – Petró Dániel gyógytornász-manuálterapeuta',
    short_name: 'PD Physio',
    description:
      'Gyógytorna és manuálterápia Budapesten, Petró Dániel gyógytornász-manuálterapeutával.',
    lang: 'hu',
    start_url: '/',
    display: 'browser',
    background_color: '#05060a',
    theme_color: '#05060a',
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
