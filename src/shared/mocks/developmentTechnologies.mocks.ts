import { TechnologiesData } from '@shared/interfaces/TechnologiesData.interfaces';

import GoIcon from '@public/icons/GoIcon.svg';
import GraphIcon from '@public/icons/GraphIcon.svg';
import LevelFiveIcon from '@public/icons/LevelFiveIcon.svg';
import LevelFourIcon from '@public/icons/LevelFourIcon.svg';
import MongoIcon from '@public/icons/MongoIcon.svg';
import NestIcon from '@public/icons/NestIcon.svg';
import NextIcon from '@public/icons/NextIcon.svg';
import NodeIcon from '@public/icons/NodeIcon.svg';
import PostgreIcon from '@public/icons/PostgreIcon.svg';
import ReactIcon from '@public/icons/ReactIcon.svg';
import ReduxIcon from '@public/icons/ReduxIcon.svg';
import ShopifyIcon from '@public/icons/ShopifyIcon.svg';
import TildaIcon from '@public/icons/TildaIcon.svg';
import TSIcon from '@public/icons/TSIcon.svg';
import WebflowIcon from '@public/icons/WebflowIcon.svg';
import WebpackIcon from '@public/icons/WebpackIcon.svg';
import WordPressIcon from '@public/icons/WordPressIcon.svg';

export const developmentTechnologies: TechnologiesData[] = [
  {
    title: 'React.js',
    icon: ReactIcon,
    levelIcon: LevelFiveIcon,
    fieldOfUsage: 'frontend',
  },
  {
    title: 'Next.js',
    icon: NextIcon,
    levelIcon: LevelFiveIcon,
    fieldOfUsage: 'frontend',
  },
  {
    title: 'TypeScript',
    icon: TSIcon,
    levelIcon: LevelFourIcon,
    fieldOfUsage: 'frontend' || 'backend',
  },
  {
    title: 'Redux',
    icon: ReduxIcon,
    levelIcon: LevelFourIcon,
    fieldOfUsage: 'frontend',
  },
  {
    title: 'Webpack',
    icon: WebpackIcon,
    levelIcon: LevelFiveIcon,
    fieldOfUsage: 'frontend',
  },
  {
    title: 'GraphQL',
    icon: GraphIcon,
    levelIcon: LevelFiveIcon,
    fieldOfUsage: 'frontend' || 'backend',
  },
  {
    title: 'Nest',
    icon: NestIcon,
    levelIcon: LevelFiveIcon,
    fieldOfUsage: 'backend',
  },
  {
    title: 'Go',
    icon: GoIcon,
    levelIcon: LevelFiveIcon,
    fieldOfUsage: 'backend',
  },
  {
    title: 'Node.js',
    icon: NodeIcon,
    levelIcon: LevelFiveIcon,
    fieldOfUsage: 'backend',
  },
  {
    title: 'PostgreSQL',
    icon: PostgreIcon,
    levelIcon: LevelFiveIcon,
    fieldOfUsage: 'database',
  },
  {
    title: 'MongoDB',
    icon: MongoIcon,
    levelIcon: LevelFiveIcon,
    fieldOfUsage: 'database',
  },
  {
    title: 'Wordpress',
    icon: WordPressIcon,
    levelIcon: LevelFiveIcon,
    fieldOfUsage: 'cms',
  },
  {
    title: 'Shopyfi',
    icon: ShopifyIcon,
    levelIcon: LevelFiveIcon,
    fieldOfUsage: 'cms',
  },
  {
    title: 'Tilda',
    icon: TildaIcon,
    levelIcon: LevelFiveIcon,
    fieldOfUsage: 'cms',
  },
  {
    title: 'Webflow',
    icon: WebflowIcon,
    levelIcon: LevelFiveIcon,
    fieldOfUsage: 'cms',
  },
];
