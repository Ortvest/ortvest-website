import { TechnologiesData } from '@shared/interfaces/TechnologiesData.interfaces';

import GraphIcon from '@public/icons/GraphIcon.svg';
import LevelFiveIcon from '@public/icons/LevelFiveIcon.svg';
import LevelFourIcon from '@public/icons/LevelFourIcon.svg';
import NextIcon from '@public/icons/NextIcon.svg';
import ReactIcon from '@public/icons/ReactIcon.svg';
import ReduxIcon from '@public/icons/ReduxIcon.svg';
import TSIcon from '@public/icons/TSIcon.svg';
import WebpackIcon from '@public/icons/WebpackIcon.svg';

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
    icon: GraphIcon,
    levelIcon: LevelFiveIcon,
    fieldOfUsage: 'backend',
  },
  {
    title: 'Go',
    icon: GraphIcon,
    levelIcon: LevelFiveIcon,
    fieldOfUsage: 'backend',
  },
  {
    title: 'Node.js',
    icon: GraphIcon,
    levelIcon: LevelFiveIcon,
    fieldOfUsage: 'backend',
  },
  {
    title: 'PostgreSQL',
    icon: GraphIcon,
    levelIcon: LevelFiveIcon,
    fieldOfUsage: 'database',
  },
  {
    title: 'MongoDB',
    icon: GraphIcon,
    levelIcon: LevelFiveIcon,
    fieldOfUsage: 'database',
  },
  {
    title: 'Wordpress',
    icon: GraphIcon,
    levelIcon: LevelFiveIcon,
    fieldOfUsage: 'cms',
  },
  {
    title: 'Shopyfi',
    icon: GraphIcon,
    levelIcon: LevelFiveIcon,
    fieldOfUsage: 'cms',
  },
];
