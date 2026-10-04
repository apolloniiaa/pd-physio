// schema.org JSON-LD builders. Entities are linked by @id so Google can
// connect the practice, the practitioner, the website and each page:
//
//   WebSite ──publisher──▶ Physiotherapy (LocalBusiness / MedicalBusiness)
//                               │ founder / employee
//                               ▼
//                          Person: Petró Dániel ──worksFor──▶ (practice)
//
// Only verified facts are used: no opening hours, coordinates or ratings.
import { PRICES } from '@/data/pricing';
import {
  absoluteUrl,
  ADDRESS,
  CONTACT,
  MAP_URL,
  OG_IMAGE,
  PRACTITIONER,
  SITE_LANGUAGE,
  SITE_NAME,
  SITE_URL,
  SOCIAL,
} from './site';

export const SCHEMA_IDS = {
  practice: `${SITE_URL}/#practice`,
  person: `${SITE_URL}/#petro-daniel`,
  website: `${SITE_URL}/#website`,
} as const;

const SAME_AS = [SOCIAL.instagram, SOCIAL.facebook];

/** Topics the practice and practitioner work with (from the site content). */
const KNOWS_ABOUT = [
  'Gyógytorna',
  'Manuálterápia',
  'Fasciakezelés',
  'Tartáskorrekció',
  'Rehabilitáció',
  'Sportrehabilitáció',
  'Fájdalomcsökkentés',
  'Mozgáskontroll',
  'Prevenció',
  'Gerincproblémák',
  'Gerincsérv',
  'Nyakfájdalom',
  'Derékfájdalom',
  'Vállfájdalom',
  'Vállműtét utáni rehabilitáció',
  'Sportsérülések',
];

function postalAddress() {
  return {
    '@type': 'PostalAddress',
    streetAddress: ADDRESS.street,
    postalCode: ADDRESS.postalCode,
    addressLocality: ADDRESS.city,
    addressCountry: ADDRESS.country,
  };
}

/** Site-wide graph: practice + practitioner + website. Rendered in the root layout. */
export function siteGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Physiotherapy',
        '@id': SCHEMA_IDS.practice,
        name: SITE_NAME,
        alternateName: ['PD Physio Studio', 'Petró Dániel Physio'],
        description:
          'Gyógytorna, manuálterápia és rehabilitáció Petró Dániel gyógytornász-manuálterapeutával Budapesten, a IX. kerületben.',
        url: absoluteUrl('/'),
        logo: {
          '@type': 'ImageObject',
          url: absoluteUrl('/icons/icon-512.png'),
          width: 512,
          height: 512,
        },
        image: [absoluteUrl(OG_IMAGE.url), absoluteUrl(PRACTITIONER.image)],
        telephone: CONTACT.phoneE164,
        email: CONTACT.email,
        address: postalAddress(),
        areaServed: { '@type': 'City', name: 'Budapest' },
        hasMap: MAP_URL,
        sameAs: SAME_AS,
        priceRange: '18.000–165.000 Ft',
        currenciesAccepted: 'HUF',
        knowsAbout: KNOWS_ABOUT,
        founder: { '@id': SCHEMA_IDS.person },
        employee: { '@id': SCHEMA_IDS.person },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Árlista',
          url: absoluteUrl('/pricing'),
          itemListElement: PRICES.map((item) => ({
            '@type': 'Offer',
            name: `${item.title} (${item.duration})`,
            price: item.priceHuf,
            priceCurrency: 'HUF',
            itemOffered: {
              '@type': 'Service',
              name: item.title,
              provider: { '@id': SCHEMA_IDS.practice },
            },
          })),
        },
      },
      {
        '@type': 'Person',
        '@id': SCHEMA_IDS.person,
        name: PRACTITIONER.name,
        jobTitle: PRACTITIONER.jobTitle,
        description:
          'Gyógytornász-manuálterapeuta. Szakterületei a derék-, nyak- és gerincproblémák, az ízületi fájdalmak, a sportsérülések és az azt követő rehabilitáció, valamint a vállsérülések és a vállműtétek utáni rehabilitáció.',
        image: absoluteUrl(PRACTITIONER.image),
        url: absoluteUrl('/about'),
        worksFor: { '@id': SCHEMA_IDS.practice },
        workLocation: { '@id': SCHEMA_IDS.practice },
        knowsAbout: KNOWS_ABOUT,
        knowsLanguage: 'hu',
        hasCredential: PRACTITIONER.credentials.map((name) => ({
          '@type': 'EducationalOccupationalCredential',
          name,
        })),
        sameAs: SAME_AS,
      },
      {
        '@type': 'WebSite',
        '@id': SCHEMA_IDS.website,
        url: absoluteUrl('/'),
        name: `${SITE_NAME} – Petró Dániel gyógytornász-manuálterapeuta`,
        inLanguage: SITE_LANGUAGE,
        publisher: { '@id': SCHEMA_IDS.practice },
      },
    ],
  };
}

type Crumb = { name: string; path: string };

type WebPageOptions = {
  path: string;
  name: string;
  description: string;
  type?: 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage' | 'MedicalWebPage';
  /** Main subject of the page (defaults to the practice). */
  about?: Record<string, unknown>;
  breadcrumbs?: Crumb[];
  faqs?: { question: string; answer: string }[];
};

/** Page-level graph: WebPage (+ BreadcrumbList, + FAQPage when given). */
export function pageGraph({
  path,
  name,
  description,
  type = 'WebPage',
  about,
  breadcrumbs,
  faqs,
}: WebPageOptions) {
  const url = absoluteUrl(path);
  const graph: Record<string, unknown>[] = [];

  const page: Record<string, unknown> = {
    '@type': type,
    '@id': `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: SITE_LANGUAGE,
    isPartOf: { '@id': SCHEMA_IDS.website },
    about: about ?? { '@id': SCHEMA_IDS.practice },
    primaryImageOfPage: absoluteUrl(OG_IMAGE.url),
  };

  if (breadcrumbs?.length) {
    page.breadcrumb = { '@id': `${url}#breadcrumb` };
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: absoluteUrl(crumb.path),
      })),
    });
  }

  graph.unshift(page);

  if (faqs?.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      isPartOf: { '@id': `${url}#webpage` },
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}

