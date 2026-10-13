import {
  IconArrowsExchange,
  IconBuildingStore,
  IconCalendarEvent,
  IconDeviceMobile,
  type IconProps,
  IconRocket,
  IconStack2,
  IconUsersGroup,
} from '@tabler/icons-react';

/**
 * One icon per service page, shared by the header dropdown and the home-page
 * service list so the same service never shows two different marks.
 *
 * Kept out of `servicePages.ts` on purpose: that module is imported by
 * `middleware.ts`, and icon components have no business in the edge bundle.
 */
export type ServiceIcon = React.ComponentType<IconProps>;

const SERVICE_PAGE_ICONS: Record<string, ServiceIcon> = {
  'booking-website-development': IconCalendarEvent,
  'marketplace-development': IconBuildingStore,
  'p2p-platform-development': IconArrowsExchange,
  'community-platform-development': IconUsersGroup,
  'mvp-development': IconRocket,
  'mobile-app-development': IconDeviceMobile,
};

export function serviceIcon(slug: string): ServiceIcon {
  return SERVICE_PAGE_ICONS[slug] ?? IconStack2;
}
