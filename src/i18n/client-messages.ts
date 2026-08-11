/** Matches next-intl / use-intl message trees without importing the transitive package. */
type IntlMessages = {
  [key: string]: string | IntlMessages;
};

/** Shared across all routes — Header, Footer, Modals, not-found. */
export const LAYOUT_CLIENT_NAMESPACES = ['nav', 'footer', 'modals', 'notFound'] as const;

export const HOME_CLIENT_NAMESPACES = [
  'hero',
  'team',
  'servicesSection',
  'reviews',
  'blog',
  'blogSection',
  'contact',
  'faq',
  'cases',
  'consultation',
] as const;

export const BLOG_CLIENT_NAMESPACES = ['blogPage', 'blog', 'contact'] as const;

export const CASES_CLIENT_NAMESPACES = ['cases', 'contact', 'hero'] as const;

export const CASE_DETAIL_CLIENT_NAMESPACES = ['caseStudies', 'caseDetail', 'hero', 'cases'] as const;

export const PARTNERSHIP_CLIENT_NAMESPACES = ['partnership'] as const;

export const REVIEWS_CLIENT_NAMESPACES = ['reviews'] as const;

type PickClientMessagesOptions = {
  /** When picking `caseStudies`, include only this study plus `shared`. */
  caseStudyId?: string;
};

export function pickClientMessages(
  messages: IntlMessages,
  namespaces: readonly string[],
  options?: PickClientMessagesOptions
): IntlMessages {
  const picked: IntlMessages = {};

  for (const ns of namespaces) {
    if (ns === 'caseStudies') {
      const caseStudies = messages.caseStudies;
      if (!caseStudies || typeof caseStudies === 'string') continue;

      if (options?.caseStudyId) {
        picked.caseStudies = {
          shared: caseStudies.shared,
          [options.caseStudyId]: caseStudies[options.caseStudyId],
        };
      }
      continue;
    }

    const value = messages[ns];
    if (value !== undefined) {
      picked[ns] = value;
    }
  }

  return picked;
}
