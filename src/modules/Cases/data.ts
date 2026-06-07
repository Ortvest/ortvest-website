export type CaseCategory = 'design' | 'development' | 'designAndDevelopment';
export type DesignSubcategory = 'logo' | 'web' | 'brand';
export type DevelopmentSubcategory = 'web' | 'mobile';
export type CaseIndustry = 'logistics' | 'community' | 'p2p' | 'agritech';
export type CaseServiceTag = 'marketing';

export interface CaseSection {
  id: string;
  images?: string[];
  isInternal?: boolean;
}

export interface CaseItem {
  id: string;
  category: CaseCategory;
  serviceTags?: CaseServiceTag[];
  industries?: CaseIndustry[];
  designSubcategory?: DesignSubcategory;
  developmentSubcategory?: DevelopmentSubcategory;
  title: string;
  challenge: string;
  solution: string;
  stack: string[];
  isNDA: boolean;
  inProgress?: boolean;
  url?: string;
  logo?: string;
  images?: string[];
  preview?: string;
  coverImage?: string;
  accentColor?: string;
  designer?: {
    name: string;
    url: string;
  };
  fullDescription?: string;
  portfolio?: boolean;
  sections?: CaseSection[];
  platforms?: string[];
  statKeys?: string[];
  /** Another case in the same product family (e.g. ProfitCraft + ProfitCraft Auto). */
  relatedCaseId?: string;
}

const portfolioCases: CaseItem[] = [
  {
    id: 'yachtmate',
    category: 'designAndDevelopment',
    designSubcategory: 'web',
    developmentSubcategory: 'web',
    title: 'YachtMate',
    industries: ['community'],
    challenge: 'Private network for yacht club members needed secure, real-time communication',
    solution: 'Built exclusive social platform with member verification and real-time messaging',
    stack: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
    isNDA: false,
    url: 'https://yachtmate.club',
    coverImage: 'https://ucarecdn.com/c5024823-5eff-42e1-81f1-d48d74f1017f/yachtmate10.jpg',
    preview: 'https://ucarecdn.com/c5024823-5eff-42e1-81f1-d48d74f1017f/yachtmate10.jpg',
    accentColor: '#0a4f7a',
    portfolio: true,
    images: [
      'https://ucarecdn.com/6fd9e852-a71c-45ea-9cdc-a8e3612d1387/yachtmate12.jpg',
      'https://ucarecdn.com/da2fe23f-711a-4afe-a2a1-64cf69b97366/yachtmate13.jpg',
      'https://ucarecdn.com/a526dfbe-0323-4c20-b23d-a1981ccb32d6/yachtmate11.jpg',
    ],
    fullDescription:
      'YachtMate is a private social network designed exclusively for yacht club members. The platform provides secure communication channels, event coordination, and member directory features.',
    sections: [
      {
        id: 'brand',
        images: [],
      },
      {
        id: 'design',
        images: ['https://ucarecdn.com/6fd9e852-a71c-45ea-9cdc-a8e3612d1387/yachtmate12.jpg'],
      },
      {
        id: 'development',
        images: [
          'https://ucarecdn.com/da2fe23f-711a-4afe-a2a1-64cf69b97366/yachtmate13.jpg',
          'https://ucarecdn.com/a526dfbe-0323-4c20-b23d-a1981ccb32d6/yachtmate11.jpg',
        ],
      },
    ],
  },
  {
    id: 'sharingground',
    category: 'designAndDevelopment',
    designSubcategory: 'web',
    developmentSubcategory: 'web',
    title: 'SharingGround',
    industries: ['p2p'],
    challenge: 'Peer-to-peer item sharing required trust system and logistics',
    solution: 'Platform with user verification, item tracking, and secure transactions',
    stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    isNDA: false,
    coverImage: 'https://ucarecdn.com/2a9c6d18-0248-47df-a11d-fa9d07d2d18c/sharingground18.jpg',
    preview: 'https://ucarecdn.com/2a9c6d18-0248-47df-a11d-fa9d07d2d18c/sharingground18.jpg',
    accentColor: '#2d6a4f',
    portfolio: true,
    images: [
      'https://ucarecdn.com/a88f7a48-2776-4fb4-bbbf-8ec496c2f8b9/sharingground21.jpg',
      'https://ucarecdn.com/f7be96c3-5e3a-4c81-b808-392cc910af40/sharingground20.jpg',
      'https://ucarecdn.com/e28c3f30-8f39-48ce-8346-5cef114291c0/sharingground19.jpg',
    ],
    fullDescription:
      'A peer-to-peer sharing platform that enables users to lend and borrow items within their community. Features include user verification, item tracking, insurance integration, and secure payment processing.',
    sections: [
      {
        id: 'design',
        images: [
          'https://ucarecdn.com/a88f7a48-2776-4fb4-bbbf-8ec496c2f8b9/sharingground21.jpg',
          'https://ucarecdn.com/f7be96c3-5e3a-4c81-b808-392cc910af40/sharingground20.jpg',
        ],
      },
      {
        id: 'development',
        images: ['https://ucarecdn.com/e28c3f30-8f39-48ce-8346-5cef114291c0/sharingground19.jpg'],
      },
    ],
  },
  {
    id: 'profitcraft',
    category: 'designAndDevelopment',
    designSubcategory: 'web',
    developmentSubcategory: 'web',
    title: 'ProfitCraft',
    industries: ['community'],
    challenge:
      'ProfitCraft (credit-building) and ProfitCraft Auto (auto broker) are one US ecosystem — separate public sites, shared operations. The credit site had to build trust and explain paths simply while matching the Auto product family',
    solution:
      'Designed the credit-building site as part of the unified ProfitCraft system alongside Auto — consistent trust patterns, service paths, and CTAs. We also built an internal CMS for the team; it cannot be shown publicly',
    relatedCaseId: 'profitcraftauto',
    stack: ['Web Design', 'Frontend Development', 'Marketing Website'],
    isNDA: false,
    url: 'https://www.profitcraft.info',
    coverImage: 'https://ucarecdn.com/ecf8871d-5e76-43c4-991a-cc3e0adc3a85/profitcraft14.jpg',
    preview: 'https://ucarecdn.com/ecf8871d-5e76-43c4-991a-cc3e0adc3a85/profitcraft14.jpg',
    accentColor: '#1a3a5c',
    portfolio: true,
    images: [
      'https://ucarecdn.com/b975f592-d922-4526-9591-650b4cb13369/profitcraft15.jpg',
      'https://ucarecdn.com/ec1106ec-5655-4bfb-98b0-dd001e3a0562/profitcraft16.jpg',
      'https://ucarecdn.com/c906a981-c19d-457f-9e06-c07c2e9e4709/profitcraft17.jpg',
    ],
    fullDescription:
      'ProfitCraft is the credit-building site in a unified US ecosystem together with ProfitCraft Auto. We also developed an internal CMS that is not available for public showcase.',
    sections: [
      {
        id: 'strategy',
        images: [],
      },
      {
        id: 'design',
        images: [
          'https://ucarecdn.com/b975f592-d922-4526-9591-650b4cb13369/profitcraft15.jpg',
          'https://ucarecdn.com/ec1106ec-5655-4bfb-98b0-dd001e3a0562/profitcraft16.jpg',
        ],
      },
      {
        id: 'development',
        images: ['https://ucarecdn.com/c906a981-c19d-457f-9e06-c07c2e9e4709/profitcraft17.jpg'],
      },
      { id: 'cms', images: [], isInternal: true },
    ],
  },
  {
    id: 'profitcraftauto',
    category: 'designAndDevelopment',
    designSubcategory: 'web',
    developmentSubcategory: 'web',
    title: 'ProfitCraft Auto',
    industries: ['community'],
    challenge:
      'ProfitCraft Auto is the auto-broker arm of the same ProfitCraft ecosystem as the credit-building site. Buyers with any credit history needed a marketing website that fits the family brand and drives applications',
    solution:
      'Built the Auto landing as the second public surface of the unified ProfitCraft system — trust-first flows, applications, and mobile UI aligned with the credit site. Internal CMS was delivered for operations but cannot be published',
    relatedCaseId: 'profitcraft',
    stack: ['Web Design', 'Frontend Development', 'Marketing Website'],
    isNDA: false,
    coverImage: 'https://ucarecdn.com/b2afe98c-95ab-44af-be27-584e9dd5a79a/pachcaca07.png',
    preview: 'https://ucarecdn.com/b2afe98c-95ab-44af-be27-584e9dd5a79a/pachcaca07.png',
    accentColor: '#1a4d3e',
    portfolio: true,
    images: [
      'https://ucarecdn.com/4c111d5d-0e42-4cd4-a311-726f341a65ed/pachcaca.png',
      'https://ucarecdn.com/1af223b4-68c9-4a51-b2cc-61cf52d5d6a7/pachcaca10.png',
      'https://ucarecdn.com/b57afd5f-c6ac-4f47-bb8f-8d66712b8e7a/pachcaca12.png',
      'https://ucarecdn.com/e7b8636f-6fe0-4f01-afda-945972c6ba93/1mplll.png',
    ],
    fullDescription:
      'ProfitCraft Auto is the auto-broker marketing site in the unified ProfitCraft ecosystem together with the credit-building product. An internal CMS was also built but is not shown publicly.',
    sections: [
      {
        id: 'design',
        images: [
          'https://ucarecdn.com/4c111d5d-0e42-4cd4-a311-726f341a65ed/pachcaca.png',
          'https://ucarecdn.com/1af223b4-68c9-4a51-b2cc-61cf52d5d6a7/pachcaca10.png',
        ],
      },
      {
        id: 'development',
        images: [
          'https://ucarecdn.com/b57afd5f-c6ac-4f47-bb8f-8d66712b8e7a/pachcaca12.png',
          'https://ucarecdn.com/e7b8636f-6fe0-4f01-afda-945972c6ba93/1mplll.png',
        ],
      },
      { id: 'cms', images: [], isInternal: true },
    ],
  },
  {
    id: 'skisailclub',
    category: 'development',
    developmentSubcategory: 'web',
    title: 'Ski&Sail Club',
    industries: ['community'],
    challenge:
      'Build a digital platform for a yacht club that makes trip booking and community management seamless for both newcomers and experienced sailors.',
    solution:
      'Developed a web platform where users can explore yacht routes, book trips, and stay connected with the club community.',
    stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    isNDA: false,
    coverImage: 'https://ucarecdn.com/8d0eb2fe-a6c7-4a77-8f34-e31b33b30b1d/Screenshot20260223at224814.png',
    preview: 'https://ucarecdn.com/8d0eb2fe-a6c7-4a77-8f34-e31b33b30b1d/Screenshot20260223at224814.png',
    accentColor: '#0e3460',
    portfolio: true,
    images: [
      'https://ucarecdn.com/8d0eb2fe-a6c7-4a77-8f34-e31b33b30b1d/Screenshot20260223at224814.png',
      'https://ucarecdn.com/c2305748-a891-413f-a377-d8efdbbaca06/Screenshot20260223at224830.png',
      'https://ucarecdn.com/aa1994d9-3cc7-472d-8625-704cbd63448a/Screenshot20260223at224846.png',
      'https://ucarecdn.com/da488fa3-7cd8-4358-8ae9-70d48984082b/Screenshot20260223at224858.png',
    ],
    fullDescription: 'Ski&Sail Club is a platform for a Ukrainian yacht and ski travel club.',
    sections: [
      {
        id: 'design',
        images: [
          'https://ucarecdn.com/8d0eb2fe-a6c7-4a77-8f34-e31b33b30b1d/Screenshot20260223at224814.png',
          'https://ucarecdn.com/c2305748-a891-413f-a377-d8efdbbaca06/Screenshot20260223at224830.png',
        ],
      },
      {
        id: 'development',
        images: [
          'https://ucarecdn.com/aa1994d9-3cc7-472d-8625-704cbd63448a/Screenshot20260223at224846.png',
          'https://ucarecdn.com/da488fa3-7cd8-4358-8ae9-70d48984082b/Screenshot20260223at224858.png',
        ],
      },
    ],
  },
  {
    id: 'navexa',
    category: 'development',
    developmentSubcategory: 'web',
    serviceTags: ['marketing'],
    title: 'Navexa',
    industries: ['logistics'],
    challenge: 'Logistics company needed unified platform for fleet and shipment management',
    solution: 'Custom dashboard with real-time tracking, route optimization, and analytics',
    stack: ['React', 'TypeScript', 'Nest.js', 'PostgreSQL', 'Marketing'],
    isNDA: true,
    inProgress: false,
    accentColor: '#3a3a3a',
    portfolio: true,
    preview: 'https://ucarecdn.com/4ef50121-8b70-41ef-980e-a18b9b43c35f/navexa03.jpg',
    images: [],
    fullDescription:
      'Comprehensive logistics management platform for fleet tracking, route optimization, and shipment monitoring.',
    sections: [
      {
        id: 'development',
        images: [],
      },
    ],
  },
  {
    id: 'teya',
    category: 'designAndDevelopment',
    developmentSubcategory: 'web',
    title: 'Teya Logistics',
    industries: ['logistics'],
    challenge:
      'Logistics company needed a modern landing page to clearly present their services and attract new clients',
    solution:
      'Designed and developed a responsive landing page focused on clear service presentation, strong branding, and lead generation',
    stack: ['Web Design', 'Frontend Development', 'Marketing Website'],
    isNDA: false,
    inProgress: false,
    url: 'https://www.teya-logistic.com/',
    coverImage: 'https://ucarecdn.com/bc9d9e0e-14bc-4452-be3a-3cab11e8bbb0/Teya22.jpg',
    preview: 'https://ucarecdn.com/bc9d9e0e-14bc-4452-be3a-3cab11e8bbb0/Teya22.jpg',
    accentColor: '#1a1a2e',
    portfolio: true,
    images: [
      'https://ucarecdn.com/eec0be67-5f20-43dd-bff6-7835d2dd52e8/Teya23.jpg',
      'https://ucarecdn.com/a4f2f266-069f-448e-b844-c3274c5d8380/Teya24.jpg',
    ],
    fullDescription:
      'We created a modern landing page for a logistics company focused on presenting transportation services.',
    sections: [
      {
        id: 'design',
        images: ['https://ucarecdn.com/eec0be67-5f20-43dd-bff6-7835d2dd52e8/Teya23.jpg'],
      },
      {
        id: 'development',
        images: ['https://ucarecdn.com/a4f2f266-069f-448e-b844-c3274c5d8380/Teya24.jpg'],
      },
    ],
  },
  {
    id: 'pachaca',
    category: 'designAndDevelopment',
    developmentSubcategory: 'mobile',
    title: 'Pachaca',
    industries: ['p2p'],
    challenge:
      'An on-demand cleaning service needed a complete digital ecosystem across mobile, web, and internal operations.',
    solution:
      'Built native iOS and Android apps, a web booking service, and a custom internal CMS for order and team management.',
    stack: ['React Native', 'iOS', 'Android', 'React', 'Node.js', 'PostgreSQL'],
    isNDA: false,
    coverImage: 'https://ucarecdn.com/7da2223d-3a35-48f7-9706-9189a658e32e/PACHACA01.jpg',
    preview: 'https://ucarecdn.com/7da2223d-3a35-48f7-9706-9189a658e32e/PACHACA01.jpg',
    accentColor: '#1a1a2e',
    portfolio: true,
    platforms: ['iOS', 'Android', 'Web'],
    statKeys: ['platforms', 'type', 'geo'],
    images: [
      'https://ucarecdn.com/ffc84efa-9502-4dd6-9f12-905d3c129af9/PACHACA02.jpg',
      'https://ucarecdn.com/7da2223d-3a35-48f7-9706-9189a658e32e/PACHACA01.jpg',
      'https://ucarecdn.com/1c4ec832-b792-47cb-a274-706b7cb6028b/PACHACA03.jpg',
      'https://ucarecdn.com/2de0d329-4b74-4c6e-9d75-d9ee2b50b328/PACHACA04.jpg',
    ],
    sections: [
      {
        id: 'overview',
        images: [
          'https://ucarecdn.com/ffc84efa-9502-4dd6-9f12-905d3c129af9/PACHACA02.jpg',
          'https://ucarecdn.com/7da2223d-3a35-48f7-9706-9189a658e32e/PACHACA01.jpg',
        ],
      },
      {
        id: 'mobile',
        images: [
          'https://ucarecdn.com/2e8bd6c5-01c6-407d-918b-7f173588b6f4/pachcaca06.jpg',
          'https://ucarecdn.com/2de0d329-4b74-4c6e-9d75-d9ee2b50b328/PACHACA04.jpg',
        ],
      },
      {
        id: 'web',
        images: [
          'https://ucarecdn.com/abb9960d-5741-49db-9f83-ef365446daac/pachcaca05.jpg',
          'https://ucarecdn.com/1c4ec832-b792-47cb-a274-706b7cb6028b/PACHACA03.jpg',
        ],
      },
      { id: 'cms', images: [], isInternal: true },
    ],
  },
  {
    id: 'gambit',
    category: 'design',
    designSubcategory: 'web',
    title: 'Gambit',
    industries: ['community'],
    challenge: 'Website UI needed modern design with strong visual hierarchy',
    solution: 'Clean interface with bold typography and strategic use of whitespace',
    stack: ['UI Design', 'Web Design', 'Figma'],
    isNDA: false,
    coverImage: 'https://ucarecdn.com/ada61fb3-30e3-46ef-96b7-22a5731f49a2/Screenshot20260223at225704.png',
    preview: 'https://ucarecdn.com/ada61fb3-30e3-46ef-96b7-22a5731f49a2/Screenshot20260223at225704.png',
    accentColor: '#1a1a1a',
    portfolio: true,
    images: [
      'https://ucarecdn.com/ada61fb3-30e3-46ef-96b7-22a5731f49a2/Screenshot20260223at225704.png',
      'https://ucarecdn.com/1a4812d2-2af6-4d1b-aaa5-a2e6b9218210/Screenshot20260223at225725.png',
      'https://ucarecdn.com/3e7085c5-b68b-4cc5-915e-c1100a63203b/Screenshot20260223at225714.png',
      'https://ucarecdn.com/b7ee05ac-d3fb-439c-9eda-15f3ccaa8d14/Screenshot20260223at225734.png',
    ],
    designer: {
      name: 'Valeriia Timanovska',
      url: 'https://www.behance.net/vt_doruda/projects',
    },
    fullDescription:
      'Modern website UI design featuring strong visual hierarchy, bold typography, and strategic use of whitespace.',
    sections: [
      {
        id: 'design',
        images: [
          'https://ucarecdn.com/ada61fb3-30e3-46ef-96b7-22a5731f49a2/Screenshot20260223at225704.png',
          'https://ucarecdn.com/1a4812d2-2af6-4d1b-aaa5-a2e6b9218210/Screenshot20260223at225725.png',
          'https://ucarecdn.com/3e7085c5-b68b-4cc5-915e-c1100a63203b/Screenshot20260223at225714.png',
          'https://ucarecdn.com/b7ee05ac-d3fb-439c-9eda-15f3ccaa8d14/Screenshot20260223at225734.png',
        ],
      },
      {
        id: 'development',
        images: [],
      },
    ],
  },
  {
    id: 'reskin',
    category: 'design',
    designSubcategory: 'brand',
    title: '[Re.] skin&hair',
    industries: ['community'],
    challenge: 'Beauty brand needed modern, clean identity for skin and hair care line',
    solution: 'Minimalist brand system with organic shapes and premium feel',
    stack: ['Brand Identity', 'Visual Design', 'Adobe Illustrator'],
    isNDA: false,
    url: 'https://www.behance.net/gallery/229836525/Re-skin-hair-brand-identity',
    coverImage: 'https://ucarecdn.com/50f9a6df-a052-46dc-89dd-cb9d0f47869b/Screenshot20260223at222740.png',
    preview: 'https://ucarecdn.com/50f9a6df-a052-46dc-89dd-cb9d0f47869b/Screenshot20260223at222740.png',
    accentColor: '#c9a96e',
    portfolio: true,
    images: [
      'https://ucarecdn.com/50f9a6df-a052-46dc-89dd-cb9d0f47869b/Screenshot20260223at222740.png',
      'https://ucarecdn.com/fb9b8ffd-cf8d-479d-860b-ac49113454e7/Screenshot20260223at222650.png',
      'https://ucarecdn.com/1407fa4b-af09-457d-a039-00b581a959ea/Screenshot20260223at222700.png',
      'https://ucarecdn.com/c856a62d-4671-461a-a9c6-f41c8427eaf5/Screenshot20260223at222715.png',
    ],
    designer: {
      name: 'Valeriia Timanovska',
      url: 'https://www.behance.net/vt_doruda/projects',
    },
    fullDescription: 'Complete brand identity for a modern beauty brand specializing in skin and hair care products.',
    sections: [
      {
        id: 'brand',
        images: [
          'https://ucarecdn.com/50f9a6df-a052-46dc-89dd-cb9d0f47869b/Screenshot20260223at222740.png',
          'https://ucarecdn.com/fb9b8ffd-cf8d-479d-860b-ac49113454e7/Screenshot20260223at222650.png',
          'https://ucarecdn.com/1407fa4b-af09-457d-a039-00b581a959ea/Screenshot20260223at222700.png',
          'https://ucarecdn.com/c856a62d-4671-461a-a9c6-f41c8427eaf5/Screenshot20260223at222715.png',
        ],
      },
    ],
  },
];

export const brandCases: CaseItem[] = [
  {
    id: 'navexa-logo',
    category: 'design',
    designSubcategory: 'logo',
    title: 'Navexa - Logo',
    challenge: 'Logistics company needed a professional logo that represents navigation and precision',
    solution: 'Created a modern, minimalist logo design with both light and dark variations',
    stack: ['Logo Design', 'Brand Identity', 'Adobe Illustrator'],
    isNDA: true,
    coverImage: 'https://ucarecdn.com/5a9b542a-01c2-448c-b396-64adba6b9796/navexa01.jpg',
    preview: 'https://ucarecdn.com/5a9b542a-01c2-448c-b396-64adba6b9796/navexa01.jpg',
    accentColor: '#3a3a3a',
    portfolio: false,
    images: [
      'https://ucarecdn.com/932799ad-9cce-4744-abe8-d1d319a44054/navexa02.jpg',
      'https://ucarecdn.com/e344a61d-ab05-4880-ac43-731962f0adb1/navexa04.jpg',
      'https://ucarecdn.com/5a9b542a-01c2-448c-b396-64adba6b9796/navexa01.jpg',
    ],
    fullDescription: 'Professional logo design for Navexa, a logistics and fleet management company.',
  },
  {
    id: 'ortvest-logo',
    category: 'design',
    designSubcategory: 'logo',
    title: 'Ortvest',
    challenge:
      'IT company needed a professional logo that reflects innovation, technology, and a modern digital identity',
    solution:
      'Created a sleek, minimalist logo design with both light and dark variations, tailored for digital and product environments',
    stack: ['Logo Design', 'Brand Identity', 'Adobe Illustrator'],
    isNDA: false,
    coverImage: 'https://ucarecdn.com/77da2930-dcad-426e-a258-d7130dff00e9/ortvest05.jpg',
    preview: 'https://ucarecdn.com/77da2930-dcad-426e-a258-d7130dff00e9/ortvest05.jpg',
    accentColor: '#1a1a1a',
    portfolio: false,
    images: [
      'https://ucarecdn.com/1498237f-9629-4a8a-a987-c738bd7efbc0/ortvest06.jpg',
      'https://ucarecdn.com/ab291b35-619f-49ae-b19d-11e83621a187/ortvest07.jpg',
      'https://ucarecdn.com/f3eb0800-332f-47b1-adfa-39b21f924c0d/ortvest22.jpg',
      'https://ucarecdn.com/2d095524-3c27-44ce-9782-fc6cf86b7f3f/ortvest08.jpg',
    ],
    fullDescription: 'Professional logo design for Ortvest, an IT company focused on modern software solutions.',
  },
];

/** All cases — used by case detail pages and static generation */
export const cases: CaseItem[] = [...portfolioCases, ...brandCases];

/** Homepage portfolio grid */
export const portfolioGridCases = portfolioCases;

/** Featured on homepage Cases section (order preserved) */
export const featuredHomeCaseIds = ['yachtmate', 'sharingground', 'pachaca'] as const;

export const featuredHomeCases = featuredHomeCaseIds
  .map((id) => portfolioCases.find((c) => c.id === id))
  .filter((c): c is CaseItem => c != null);
