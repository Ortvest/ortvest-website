import { TechnologiesData } from '@shared/interfaces/TechnologiesData.interfaces';

import AppDesignIcon from '@public/icons/AppDesignIcon.svg';
import BrandingIcon from '@public/icons/BrandingIcon.svg';
import LevelFiveIcon from '@public/icons/LevelFiveIcon.svg';
import LevelFourIcon from '@public/icons/LevelFourIcon.svg';
import UIUXIcon from '@public/icons/UIUXIcon.svg';
import VideoIcon from '@public/icons/VideoIcon.svg';
import WebDesignIcon from '@public/icons/WebDesignIcon.svg';

export const DesingTechnologies: TechnologiesData[] = [
  {
    title: 'UI/UX Design',
    icon: UIUXIcon,
    levelIcon: LevelFiveIcon,
  },
  {
    title: 'Web Design',
    icon: WebDesignIcon,
    levelIcon: LevelFiveIcon,
  },
  {
    title: 'App Design',
    icon: AppDesignIcon,
    levelIcon: LevelFiveIcon,
  },
  {
    title: 'Branding',
    icon: BrandingIcon,
    levelIcon: LevelFourIcon,
  },
  {
    title: 'Video',
    icon: VideoIcon,
    levelIcon: LevelFourIcon,
  },
];
