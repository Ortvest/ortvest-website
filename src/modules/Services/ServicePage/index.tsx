import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { rowsToCardModels } from '@lib/blog-model';
import { fetchCmsBlogPosts } from '@lib/cms-api';
import { cases } from '@modules/Cases/data';
import { FAQAccordion, type FaqItem } from '@modules/FAQ/FAQAccordion';
import { type ServicePageDefinition, servicePath } from '@modules/Services/servicePages';
import { IconArrowRight, IconCheck } from '@tabler/icons-react';

type IncludedItem = { title: string; body: string };
type ProcessStep = { title: string; body: string; duration: string };
type StackGroup = { title: string; items: string[] };

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="mb-4 text-xs uppercase tracking-widest text-accent">{children}</p>;
}

/**
 * Shared layout for every /services/<slug> page. Content comes from
 * `servicePages.<slug>` in the message files; proof cases and related posts
 * come from the page definition, so each page links out to the case studies and
 * articles that back up what it claims.
 */
export async function ServicePage({ locale, definition }: { locale: string; definition: ServicePageDefinition }) {
  const { slug } = definition;
  const [t, tHero, tNav, blogRows] = await Promise.all([
    getTranslations({ locale, namespace: `servicePages.${slug}` }),
    getTranslations({ locale, namespace: 'hero' }),
    getTranslations({ locale, namespace: 'nav' }),
    fetchCmsBlogPosts(locale),
  ]);

  const includedItems = t.raw('included.items') as IncludedItem[];
  const processSteps = t.raw('process.steps') as ProcessStep[];
  const stackGroups = t.raw('stack.groups') as StackGroup[];
  const problemParagraphs = t.raw('problem.paragraphs') as string[];
  const faqItems = t.raw('faq.items') as FaqItem[];

  const proofCases = definition.caseIds
    .map((id) => cases.find((item) => item.id === id && !item.isNDA))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const posts = rowsToCardModels(blogRows);
  const relatedPosts = definition.postSlugs
    .map((postSlug) => posts.find((post) => post.slug === postSlug))
    .filter((post): post is NonNullable<typeof post> => Boolean(post));

  const stats = [
    { value: tHero('stats.projectsValue'), label: tHero('stats.projectsLabel') },
    { value: tHero('stats.industriesValue'), label: tHero('stats.industriesLabel') },
    { value: tHero('stats.yearsValue'), label: tHero('stats.yearsLabel') },
  ];

  return (
    <main>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="bg-black py-20 sm:py-28" aria-labelledby="service-hero-heading">
        <div className="container-main">
          <nav aria-label="Breadcrumb" className="mb-8 text-body-sm text-zinc-500">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href={`/${locale}`} className="transition hover:text-accent">
                  {tNav('home')}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href={`/${locale}${servicePath(locale)}`} className="transition hover:text-accent">
                  {tNav('services')}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-zinc-300">{t('hero.eyebrow')}</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <Eyebrow>{t('hero.eyebrow')}</Eyebrow>
            <h1
              id="service-hero-heading"
              className="mb-6 text-[2.25rem] font-bold leading-[1.1] text-white sm:text-[3.25rem]">
              {t('hero.title')}
            </h1>
            <p className="mb-8 max-w-2xl text-body leading-relaxed text-zinc-400">{t('hero.subtitle')}</p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={`/${locale}#contact`}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold text-black transition hover:opacity-85">
                {t('hero.ctaPrimary')}
                <IconArrowRight size={14} aria-hidden />
              </Link>
              <Link
                href={`/${locale}/cases`}
                className="inline-flex items-center gap-2 rounded-full border border-zinc-700 px-6 py-3 text-sm font-medium text-zinc-300 transition hover:border-accent hover:text-accent">
                {t('hero.ctaSecondary')}
              </Link>
            </div>
          </div>

          <dl className="mt-14 grid max-w-xl grid-cols-3 gap-6 border-t border-zinc-800 pt-8">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block text-[2rem] font-bold leading-none text-accent">{stat.value}</span>
                  <span className="mt-2 block text-body-sm text-zinc-500">{stat.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── PROBLEM ──────────────────────────────────────────── */}
      <section className="bg-white py-20" aria-labelledby="service-problem-heading">
        <div className="container-main">
          <div className="mx-auto max-w-[760px]">
            <h2 id="service-problem-heading" className="mb-8 text-h2 font-bold text-black">
              {t('problem.title')}
            </h2>
            {problemParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="mb-5 text-body leading-relaxed text-black/70">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ──────────────────────────────────── */}
      <section className="bg-zinc-950 py-20" aria-labelledby="service-included-heading">
        <div className="container-main">
          <h2 id="service-included-heading" className="mb-3 text-h2 font-bold text-white">
            {t('included.title')}
          </h2>
          <p className="mb-12 max-w-2xl text-body text-zinc-400">{t('included.subtitle')}</p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {includedItems.map((item) => (
              <div
                key={item.title}
                className="flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition-colors hover:border-zinc-700">
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10">
                  <IconCheck size={16} className="text-accent" aria-hidden />
                </div>
                <h3 className="mb-2 text-body font-semibold text-white">{item.title}</h3>
                <p className="text-body-sm leading-relaxed text-zinc-400">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────────── */}
      <section className="bg-white py-20" aria-labelledby="service-process-heading">
        <div className="container-main">
          <h2 id="service-process-heading" className="mb-3 text-h2 font-bold text-black">
            {t('process.title')}
          </h2>
          <p className="mb-12 max-w-2xl text-body text-black/60">{t('process.subtitle')}</p>

          <ol className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <li key={step.title} className="border-t border-black/10 pt-5">
                <span className="text-xs font-semibold tabular-nums text-accent-dark">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mb-2 mt-2 text-body font-semibold text-black">{step.title}</h3>
                <p className="mb-3 text-body-sm leading-relaxed text-black/60">{step.body}</p>
                <span className="text-[11px] uppercase tracking-wider text-black/40">{step.duration}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── PROOF ────────────────────────────────────────────── */}
      {proofCases.length > 0 && (
        <section className="bg-zinc-950 py-20" aria-labelledby="service-proof-heading">
          <div className="container-main">
            <h2 id="service-proof-heading" className="mb-3 text-h2 font-bold text-white">
              {t('proof.title')}
            </h2>
            <p className="mb-12 max-w-2xl text-body text-zinc-400">{t('proof.subtitle')}</p>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {proofCases.map((caseItem) => {
                const cover = caseItem.coverImage ?? caseItem.preview ?? caseItem.images?.[0];
                return (
                  <Link
                    key={caseItem.id}
                    href={`/${locale}/cases/${caseItem.id}`}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 transition-colors hover:border-zinc-700">
                    {cover && (
                      <div className="relative aspect-video w-full overflow-hidden">
                        <Image
                          src={cover}
                          alt={caseItem.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 380px"
                          className="object-cover transition duration-200 group-hover:scale-[1.02]"
                        />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="mb-2 inline-flex items-center gap-1.5 text-body font-semibold text-white transition-colors group-hover:text-accent">
                        {caseItem.title}
                        <IconArrowRight size={14} aria-hidden />
                      </h3>
                      <p className="text-body-sm leading-relaxed text-zinc-400">{caseItem.challenge}</p>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="mt-10">
              <Link
                href={`/${locale}/cases`}
                className="inline-flex items-center gap-2 text-body-sm font-medium text-zinc-300 transition hover:text-accent">
                {t('proof.cta')}
                <IconArrowRight size={14} aria-hidden />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── STACK ────────────────────────────────────────────── */}
      <section className="bg-white py-20" aria-labelledby="service-stack-heading">
        <div className="container-main">
          <h2 id="service-stack-heading" className="mb-3 text-h2 font-bold text-black">
            {t('stack.title')}
          </h2>
          <p className="mb-10 max-w-2xl text-body text-black/60">{t('stack.subtitle')}</p>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {stackGroups.map((group) => (
              <div key={group.title}>
                <h3 className="mb-3 text-body-sm font-semibold uppercase tracking-wider text-black/50">
                  {group.title}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-black/10 px-3 py-1.5 text-body-sm text-black/70">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section id="service-faq" className="bg-black py-20" aria-labelledby="service-faq-heading">
        <div className="container-main">
          <h2 id="service-faq-heading" className="mb-10 text-center text-h2 font-bold text-white">
            {t('faq.title')}
          </h2>
          <FAQAccordion
            items={faqItems}
            ctaText={t('cta.title')}
            ctaSub={t('cta.body')}
            ctaBtn={t('cta.button')}
            ctaHref={`/${locale}#contact`}
          />
        </div>
      </section>

      {/* ── RELATED READING ──────────────────────────────────── */}
      {relatedPosts.length > 0 && (
        <section className="bg-white py-20" aria-labelledby="service-reading-heading">
          <div className="container-main">
            <h2 id="service-reading-heading" className="mb-3 text-h2 font-bold text-black">
              {t('reading.title')}
            </h2>
            <p className="mb-10 max-w-2xl text-body text-black/60">{t('reading.subtitle')}</p>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {relatedPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/${locale}/blog/${post.slug}`}
                  className="group flex flex-col rounded-2xl border border-black/[0.08] bg-white p-5 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover">
                  <h3 className="mb-2 text-body font-semibold text-black transition-colors group-hover:text-accent-dark">
                    {post.title}
                  </h3>
                  <p className="line-clamp-3 flex-1 text-body-sm leading-relaxed text-black/60">{post.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-body-sm font-medium text-accent-dark">
                    {post.readMinutes} min
                    <IconArrowRight size={14} aria-hidden />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
