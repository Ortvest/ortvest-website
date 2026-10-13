import type { CaseItem } from './data';

export type CaseTabKey = 'websites' | 'webServices' | 'mobileApps' | 'design';

/**
 * Tab membership is derived from real case fields (not hand-tagged) so it can't drift from the data:
 * - `webServices`  – the case targets a two-sided industry (p2p/community/logistics)
 * - `websites`     – a plain web/design build with no industry (marketing site, not a platform)
 * - `mobileApps`   – shipped a native mobile app
 * - `design`       – had dedicated brand/design work
 */
export function deriveCaseTabKeys(item: CaseItem): CaseTabKey[] {
  const keys: CaseTabKey[] = [];
  const hasIndustry = Boolean(item.industries?.length);
  const isWebSubcategory = item.developmentSubcategory === 'web' || item.designSubcategory === 'web';

  if (hasIndustry) keys.push('webServices');
  if (!hasIndustry && isWebSubcategory) keys.push('websites');
  if (item.developmentSubcategory === 'mobile') keys.push('mobileApps');
  if (item.serviceTags?.includes('brand')) keys.push('design');

  return keys;
}

/** Display order for the homepage case explorer (matches the design mockup). */
export const EXPLORER_CASE_ORDER = [
  'pachaca',
  'yachtmate',
  'sharingground',
  'skisailclub',
  'teya',
  'gambit',
  'reskin',
  'navexa',
] as const;

/** Which `nicheCta.*` i18n key to use per case (cases without an `industries` tag fall back to `brand`). */
export const CASE_NICHE_KEYS: Record<string, string> = {
  pachaca: 'p2p',
  yachtmate: 'community',
  sharingground: 'p2p',
  skisailclub: 'community',
  teya: 'brand',
  gambit: 'brand',
  reskin: 'brand',
  navexa: 'logistics',
};
