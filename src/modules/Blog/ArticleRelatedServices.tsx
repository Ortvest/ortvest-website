import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { servicePagesForPost, servicePath } from '@modules/Services/servicePages';
import { IconArrowRight } from '@tabler/icons-react';

const MAX_SERVICES = 3;

/**
 * Links from an article into the service pages it is relevant to.
 *
 * Articles used to link only to other articles, so the blog passed no weight to
 * the commercial pages and gave a reader with intent nowhere to go. The mapping
 * is derived from each service page's own `postSlugs`, so a post and the page
 * that cites it always point at each other.
 */
export async function ArticleRelatedServices({ slug, locale }: { slug: string; locale: string }) {
  const services = servicePagesForPost(slug, locale).slice(0, MAX_SERVICES);
  if (services.length === 0) return null;

  const [t, tNav] = await Promise.all([
    getTranslations({ locale, namespace: 'blogPage.relatedServices' }),
    getTranslations({ locale, namespace: 'nav' }),
  ]);

  return (
    <aside className="mt-10 rounded-2xl border border-black/[0.08] p-6 sm:p-8" aria-labelledby="related-services-title">
      <h2 id="related-services-title" className="text-h3 font-bold text-black">
        {t('title')}
      </h2>
      <p className="mt-2 text-body-sm leading-relaxed text-black/55">{t('subtitle')}</p>

      <ul className="mt-5 flex flex-col gap-2">
        {services.map((service) => (
          <li key={service.slug}>
            <Link
              href={`/${locale}${servicePath(locale, service.slug)}`}
              className="group flex items-baseline gap-2 py-1.5 text-body font-medium text-black transition-colors hover:text-accent-dark">
              {tNav(`servicePages.${service.slug}.label`)}
              <IconArrowRight
                size={14}
                aria-hidden
                className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
              />
              <span className="text-body-sm font-normal text-black/45">
                {tNav(`servicePages.${service.slug}.sublabel`)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
