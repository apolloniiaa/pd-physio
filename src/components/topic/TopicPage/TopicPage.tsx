import { Fragment, type ReactNode } from 'react';
import Link from 'next/link';
import { Cormorant_Garamond } from 'next/font/google';
import JsonLd from '@/components/JsonLd/JsonLd';
import { TOPICS, type Topic, type TopicSection } from '@/data/topics';
import { ADDRESS, BOOKING_URL, CONTACT, PRACTITIONER } from '@/lib/site';
import { pageGraph } from '@/lib/structuredData';
import styles from './TopicPage.module.scss';

// Editorial serif for the page heading (scoped, like the other pages).
const editorialSerif = Cormorant_Garamond({
  variable: '--font-topic-serif',
  subsets: ['latin', 'latin-ext'],
  weight: ['500'],
  display: 'swap',
});

// ---------- Inline links: "[anchor](/path)" → <Link> ----------

const LINK_PATTERN = /\[([^\]]+)\]\((\/[^)\s]*)\)/g;

function RichText({ text }: { text: string }) {
  const nodes: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(LINK_PATTERN)) {
    const index = match.index ?? 0;
    if (index > last) nodes.push(text.slice(last, index));
    nodes.push(
      <Link key={index} href={match[2]} className={styles.inlineLink}>
        {match[1]}
      </Link>,
    );
    last = index + match[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return <>{nodes}</>;
}

// ---------- Pieces ----------

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width='16'
      height='10'
      viewBox='0 0 16 10'
      fill='none'
      aria-hidden='true'
      focusable='false'
    >
      <path
        d='M0 5h15M10.5.75 15 5l-4.5 4.25'
        stroke='currentColor'
        strokeWidth='1.2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

type Crumb = { name: string; path: string };

function breadcrumbsFor(topic: Topic): Crumb[] {
  const crumbs: Crumb[] = [{ name: 'Főoldal', path: '/' }];
  if (topic.path.startsWith('/gyogytorna/')) {
    crumbs.push({ name: TOPICS.gyogytorna.name, path: TOPICS.gyogytorna.path });
  }
  crumbs.push({ name: topic.name, path: topic.path });
  return crumbs;
}

function Section({ section, index }: { section: TopicSection; index: number }) {
  const List = section.ordered ? 'ol' : 'ul';
  return (
    <section
      className={`${styles.section} ${section.caution ? styles.caution : ''}`}
    >
      <div className={styles.sectionTop} aria-hidden='true'>
        <span className={styles.number}>{String(index + 1).padStart(2, '0')}</span>
        <span className={styles.rule} />
      </div>
      <h2 className={styles.sectionTitle}>{section.heading}</h2>
      {section.list && (
        <List className={section.ordered ? styles.steps : styles.list}>
          {section.list.map((item) => (
            <li key={item}>
              <RichText text={item} />
            </li>
          ))}
        </List>
      )}
      {section.paragraphs?.map((paragraph) => (
        <p key={paragraph} className={styles.paragraph}>
          <RichText text={paragraph} />
        </p>
      ))}
    </section>
  );
}

// ---------- Page ----------

export default function TopicPage({ topic }: { topic: Topic }) {
  const crumbs = breadcrumbsFor(topic);
  const related = topic.related.map((slug) => TOPICS[slug]);

  return (
    <main className={editorialSerif.variable}>
      <div className={styles.page}>
        <svg
          className={styles.lines}
          viewBox='0 0 1440 900'
          preserveAspectRatio='xMidYMid slice'
          aria-hidden='true'
          focusable='false'
        >
          <circle className={styles.lineMain} cx='1500' cy='-60' r='560' />
          <circle className={styles.lineSoft} cx='-180' cy='980' r='520' />
        </svg>

        <header className={styles.hero}>
          <nav aria-label='Morzsamenü' className={styles.breadcrumbs}>
            <ol>
              {crumbs.map((crumb, index) => (
                <li key={crumb.path}>
                  {index < crumbs.length - 1 ? (
                    <Link href={crumb.path}>{crumb.name}</Link>
                  ) : (
                    <span aria-current='page'>{crumb.name}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <p className={styles.eyebrow}>{topic.eyebrow}</p>
          <h1 className={styles.title}>{topic.h1}</h1>
          <p className={styles.lead}>{topic.lead}</p>

          <div className={styles.actions}>
            <a
              href={BOOKING_URL}
              target='_blank'
              rel='noopener noreferrer'
              className={styles.cta}
            >
              <span>Időpontfoglalás</span>
              <ArrowIcon className={styles.ctaArrow} />
            </a>
            <Link href='/pricing' className={styles.secondary}>
              Kezelési díjak
            </Link>
          </div>
        </header>

        <div className={styles.body}>
          <article className={styles.content}>
            {topic.sections.map((section, index) => (
              <Section key={section.heading} section={section} index={index} />
            ))}

            {topic.faqs.length > 0 && (
              <section className={styles.faq} aria-labelledby='faq-title'>
                <h2 id='faq-title' className={styles.sectionTitle}>
                  Gyakori kérdések
                </h2>
                <div className={styles.faqList}>
                  {topic.faqs.map((faq) => (
                    <details key={faq.question} className={styles.faqItem}>
                      <summary className={styles.faqQuestion}>
                        <h3 className={styles.faqQuestionText}>{faq.question}</h3>
                        <span className={styles.faqIcon} aria-hidden='true' />
                      </summary>
                      <p className={styles.faqAnswer}>{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}
          </article>

          {/* Practitioner + location card: who treats, and where. */}
          <aside className={styles.aside} aria-label='Rendelés'>
            <div className={styles.asideCard}>
              <p className={styles.asideLabel}>Kezelést végzi</p>
              <p className={styles.asideName}>
                <Link href='/about'>{PRACTITIONER.name}</Link>
              </p>
              <p className={styles.asideText}>{PRACTITIONER.jobTitle}</p>

              <p className={styles.asideLabel}>Rendelő</p>
              <address className={styles.asideText}>
                {ADDRESS.lines.map((line, index) => (
                  <Fragment key={line}>
                    {index > 0 && <br />}
                    {line}
                  </Fragment>
                ))}
              </address>

              <p className={styles.asideLabel}>Telefon</p>
              <p className={styles.asideText}>
                <a href={`tel:${CONTACT.phoneE164}`}>{CONTACT.phoneDisplay}</a>
              </p>

              <div className={styles.asideLinks}>
                <a
              href={BOOKING_URL}
              target='_blank'
              rel='noopener noreferrer'
              className={styles.asideCta}
            >
                  Online időpontfoglalás
                  <ArrowIcon className={styles.ctaArrow} />
                </a>
                <Link href='/contact' className={styles.inlineLink}>
                  Elérhetőség és térkép
                </Link>
              </div>
            </div>
          </aside>
        </div>

        <section className={styles.related} aria-labelledby='related-title'>
          <h2 id='related-title' className={styles.sectionTitle}>
            Kapcsolódó témák
          </h2>
          <ul className={styles.relatedGrid}>
            {related.map((item) => (
              <li key={item.slug}>
                <Link href={item.path} className={styles.relatedCard}>
                  <span className={styles.relatedName}>{item.name}</span>
                  <span className={styles.relatedText}>{item.summary}</span>
                  <ArrowIcon className={styles.relatedArrow} />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.closing} aria-labelledby='closing-title'>
          <h2 id='closing-title' className={styles.closingTitle}>
            Beszéljük át a panaszaidat.
          </h2>
          <p className={styles.closingText}>
            A kezelés egy alapos állapotfelméréssel indul. Időpontot online
            foglalhatsz; a rendelő Budapest IX. kerületében, a Vágóhíd utcában
            található.
          </p>
          <div className={styles.actions}>
            <a
              href={BOOKING_URL}
              target='_blank'
              rel='noopener noreferrer'
              className={styles.cta}
            >
              <span>Időpontfoglalás</span>
              <ArrowIcon className={styles.ctaArrow} />
            </a>
            <Link href='/services' className={styles.secondary}>
              Összes szolgáltatás
            </Link>
          </div>
        </section>
      </div>

      <JsonLd
        data={pageGraph({
          path: topic.path,
          name: topic.title,
          description: topic.description,
          type: 'MedicalWebPage',
          about: topic.condition
            ? { '@type': 'MedicalCondition', name: topic.condition }
            : { '@type': 'MedicalTherapy', name: topic.name },
          breadcrumbs: crumbs,
          faqs: topic.faqs,
        })}
      />
    </main>
  );
}

