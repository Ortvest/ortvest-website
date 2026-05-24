import type { TablerIcon } from '@shared/types/icon.types';

import {
  IconBell,
  IconBolt,
  IconBook,
  IconBox,
  IconCalendar,
  IconChartBar,
  IconCircleCheck,
  IconCreditCard,
  IconFileText,
  IconLayersIntersect,
  IconLayout,
  IconLock,
  IconMapPin,
  IconMessageCircle,
  IconPalette,
  IconShoppingCart,
  IconStar,
  IconTruck,
  IconUsers,
  IconWand,
  IconWorld,
} from '@tabler/icons-react';

export type CaseStudyCtaTemplate = 'p2p' | 'community' | 'logistics' | 'conversion' | 'brand' | 'product';

export type CaseStudyGalleryType = 'screens' | 'work' | 'brand';

export type FeatureIconKey =
  | 'shield-check'
  | 'map-pin'
  | 'credit-card'
  | 'star'
  | 'receipt'
  | 'message'
  | 'users'
  | 'lock'
  | 'calendar'
  | 'bell'
  | 'layout'
  | 'globe'
  | 'zap'
  | 'bar-chart'
  | 'truck'
  | 'package'
  | 'palette'
  | 'sparkles'
  | 'book-open'
  | 'shopping-cart'
  | 'layers';

export const FEATURE_ICONS: Record<FeatureIconKey, TablerIcon> = {
  'shield-check': IconCircleCheck,
  'map-pin': IconMapPin,
  'credit-card': IconCreditCard,
  star: IconStar,
  receipt: IconFileText,
  message: IconMessageCircle,
  users: IconUsers,
  lock: IconLock,
  calendar: IconCalendar,
  bell: IconBell,
  layout: IconLayout,
  globe: IconWorld,
  zap: IconBolt,
  'bar-chart': IconChartBar,
  truck: IconTruck,
  package: IconBox,
  palette: IconPalette,
  sparkles: IconWand,
  'book-open': IconBook,
  'shopping-cart': IconShoppingCart,
  layers: IconLayersIntersect,
};

export interface CaseStudyFeatureConfig {
  key: string;
  icon: FeatureIconKey;
}

export interface CaseStudyConfig {
  featureKeys: CaseStudyFeatureConfig[];
  ctaTemplate: CaseStudyCtaTemplate;
  galleryType: CaseStudyGalleryType;
}

/** Display order for portfolio + brand cases (used for “next case” navigation). */
export const CASE_STUDY_ORDER = [
  'yachtmate',
  'sharingground',
  'profitcraft',
  'skisailclub',
  'navexa',
  'teya',
  'pachaca',
  'gambit',
  'reskin',
];

export function getNextCaseSlug(currentId: string): string {
  const idx = CASE_STUDY_ORDER.indexOf(currentId);
  if (idx === -1) return CASE_STUDY_ORDER[0] ?? 'yachtmate';
  return CASE_STUDY_ORDER[(idx + 1) % CASE_STUDY_ORDER.length] ?? 'yachtmate';
}

const DEFAULT_PROCESS_KEYS = ['discovery', 'design', 'build', 'launch'] as const;
export const CASE_STUDY_PROCESS_KEYS = DEFAULT_PROCESS_KEYS;

export const CASE_STUDY_CONFIG: Record<string, CaseStudyConfig> = {
  yachtmate: {
    ctaTemplate: 'community',
    galleryType: 'screens',
    featureKeys: [
      { key: 'verification', icon: 'shield-check' },
      { key: 'messaging', icon: 'message' },
      { key: 'events', icon: 'calendar' },
      { key: 'directory', icon: 'users' },
      { key: 'privacy', icon: 'lock' },
      { key: 'roles', icon: 'layers' },
    ],
  },
  sharingground: {
    ctaTemplate: 'p2p',
    galleryType: 'screens',
    featureKeys: [
      { key: 'verification', icon: 'shield-check' },
      { key: 'tracking', icon: 'map-pin' },
      { key: 'escrow', icon: 'credit-card' },
      { key: 'reviews', icon: 'star' },
      { key: 'insurance', icon: 'receipt' },
      { key: 'messaging', icon: 'message' },
    ],
  },
  profitcraft: {
    ctaTemplate: 'conversion',
    galleryType: 'work',
    featureKeys: [
      { key: 'valueProp', icon: 'sparkles' },
      { key: 'trust', icon: 'shield-check' },
      { key: 'paths', icon: 'book-open' },
      { key: 'leads', icon: 'zap' },
      { key: 'responsive', icon: 'layout' },
      { key: 'seo', icon: 'globe' },
    ],
  },
  skisailclub: {
    ctaTemplate: 'community',
    galleryType: 'screens',
    featureKeys: [
      { key: 'routes', icon: 'map-pin' },
      { key: 'booking', icon: 'calendar' },
      { key: 'community', icon: 'users' },
      { key: 'profiles', icon: 'shield-check' },
      { key: 'content', icon: 'layout' },
      { key: 'performance', icon: 'zap' },
    ],
  },
  navexa: {
    ctaTemplate: 'logistics',
    galleryType: 'screens',
    featureKeys: [
      { key: 'fleet', icon: 'truck' },
      { key: 'tracking', icon: 'map-pin' },
      { key: 'routes', icon: 'layers' },
      { key: 'analytics', icon: 'bar-chart' },
      { key: 'shipments', icon: 'package' },
      { key: 'integrations', icon: 'zap' },
    ],
  },
  teya: {
    ctaTemplate: 'logistics',
    galleryType: 'work',
    featureKeys: [
      { key: 'services', icon: 'truck' },
      { key: 'branding', icon: 'palette' },
      { key: 'leads', icon: 'zap' },
      { key: 'responsive', icon: 'layout' },
      { key: 'trust', icon: 'shield-check' },
      { key: 'contact', icon: 'message' },
    ],
  },
  pachaca: {
    ctaTemplate: 'conversion',
    galleryType: 'screens',
    featureKeys: [
      { key: 'booking', icon: 'calendar' },
      { key: 'mobile', icon: 'layout' },
      { key: 'web', icon: 'globe' },
      { key: 'cms', icon: 'layers' },
      { key: 'notifications', icon: 'bell' },
      { key: 'payments', icon: 'credit-card' },
    ],
  },
  mie: {
    ctaTemplate: 'product',
    galleryType: 'screens',
    featureKeys: [
      { key: 'inventory', icon: 'package' },
      { key: 'ai', icon: 'sparkles' },
      { key: 'recipes', icon: 'book-open' },
      { key: 'reminders', icon: 'bell' },
      { key: 'patterns', icon: 'bar-chart' },
      { key: 'lists', icon: 'shopping-cart' },
    ],
  },
  reskin: {
    ctaTemplate: 'brand',
    galleryType: 'brand',
    featureKeys: [
      { key: 'logo', icon: 'sparkles' },
      { key: 'palette', icon: 'palette' },
      { key: 'typography', icon: 'layout' },
      { key: 'packaging', icon: 'package' },
      { key: 'guidelines', icon: 'book-open' },
      { key: 'applications', icon: 'layers' },
    ],
  },
  gambit: {
    ctaTemplate: 'conversion',
    galleryType: 'work',
    featureKeys: [
      { key: 'hierarchy', icon: 'layout' },
      { key: 'typography', icon: 'book-open' },
      { key: 'whitespace', icon: 'layers' },
      { key: 'components', icon: 'palette' },
      { key: 'responsive', icon: 'globe' },
      { key: 'handoff', icon: 'zap' },
    ],
  },
  'navexa-logo': {
    ctaTemplate: 'brand',
    galleryType: 'brand',
    featureKeys: [
      { key: 'mark', icon: 'sparkles' },
      { key: 'variations', icon: 'layers' },
      { key: 'color', icon: 'palette' },
      { key: 'typography', icon: 'book-open' },
      { key: 'applications', icon: 'layout' },
      { key: 'guidelines', icon: 'shield-check' },
    ],
  },
  'ortvest-logo': {
    ctaTemplate: 'brand',
    galleryType: 'brand',
    featureKeys: [
      { key: 'mark', icon: 'sparkles' },
      { key: 'geometry', icon: 'layers' },
      { key: 'color', icon: 'palette' },
      { key: 'darkLight', icon: 'layout' },
      { key: 'product', icon: 'globe' },
      { key: 'guidelines', icon: 'book-open' },
    ],
  },
};

export function getCaseStudyConfig(caseId: string): CaseStudyConfig {
  return (
    CASE_STUDY_CONFIG[caseId] ?? {
      ctaTemplate: 'product',
      galleryType: 'work',
      featureKeys: [
        { key: 'discovery', icon: 'sparkles' },
        { key: 'design', icon: 'palette' },
        { key: 'build', icon: 'zap' },
        { key: 'launch', icon: 'globe' },
        { key: 'quality', icon: 'shield-check' },
        { key: 'support', icon: 'message' },
      ],
    }
  );
}
