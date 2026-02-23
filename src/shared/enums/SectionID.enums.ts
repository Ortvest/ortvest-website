export const enum SectionID {
  HEADER = 'header',
  HERO = 'hero',
  SERVICES = 'services',
  TECHNOLOGIES = 'technologies',
  PROCESS = 'process',
  ABOUT = 'about',
  CASES = 'cases',
  FAQ = 'faq',
  CONTACT = 'contact',
}

export const sectionIds = {
  [SectionID.HEADER]: '#header',
  [SectionID.HERO]: '#hero',
  [SectionID.SERVICES]: '#services',
  [SectionID.TECHNOLOGIES]: '#technologies',
  [SectionID.PROCESS]: '#process',
  [SectionID.ABOUT]: '#about',
  [SectionID.CASES]: '#cases',
  [SectionID.FAQ]: '#faq',
  [SectionID.CONTACT]: '#contact',
} as const;
