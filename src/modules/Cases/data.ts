export type CaseCategory = 'design' | 'development' | 'designAndDevelopment';
export type DesignSubcategory = 'logo' | 'web' | 'brand';
export type DevelopmentSubcategory = 'web' | 'mobile';

export interface CaseItem {
  id: string;
  category: CaseCategory;
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
  designer?: {
    name: string;
    url: string;
  };
  fullDescription?: string;
}

export const cases: CaseItem[] = [
  {
    id: 'yachtmate',
    category: 'designAndDevelopment',
    designSubcategory: 'web',
    developmentSubcategory: 'web',
    title: 'YachtMate',
    challenge: 'Private network for yacht club members needed secure, real-time communication',
    solution: 'Built exclusive social platform with member verification and real-time messaging',
    stack: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
    isNDA: false,
    url: 'https://yachtmate.club',
    logo: '/images/ortvest.svg',
    preview: 'https://ucarecdn.com/361278ce-8995-4f66-8e9f-ea11618da3c4/yachtmate_preview.png',
    images: [
      'https://ucarecdn.com/2b919ef7-242a-4706-86d0-30b2821a5109/settings_yachtmate.png',
      'https://ucarecdn.com/3c6bc01d-e306-4ecd-9ffb-aa67728ca697/step3_yachtmate.png',
      'https://ucarecdn.com/4c704b8e-1c0a-496d-a034-8bb6b2e389ee/settings_yachtmate_2.png',
      'https://ucarecdn.com/b8dca1f2-0516-4ed6-8920-4735a56e8f9c/search_yachtmate2.png',
    ],
    fullDescription:
      "YachtMate is a private social network designed exclusively for yacht club members. The platform provides secure communication channels, event coordination, and member directory features. Built with React and Node.js, the application handles real-time messaging and ensures data privacy for high-profile members. Note: the live website mentions 'Powered by Almo' - that is still our team, now operating under the Ortvest name.",
  },
  {
    id: 'sharingground',
    category: 'designAndDevelopment',
    designSubcategory: 'web',
    developmentSubcategory: 'web',
    title: 'SharingGround',
    challenge: 'Peer-to-peer item sharing required trust system and logistics',
    solution: 'Platform with user verification, item tracking, and secure transactions',
    stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    isNDA: false,
    preview: 'https://ucarecdn.com/9e920cef-d491-48f4-a1c1-80f9630b25bd/sharing_preview.png',
    images: [
      'https://ucarecdn.com/20618798-ba64-4567-b778-4f0145705326/sharing_search.png',
      'https://ucarecdn.com/986cbb43-6000-41af-8b35-dbfe835ffd13/sharing_profile.png',
      'https://ucarecdn.com/9828f3e4-c11d-486c-8e91-4e3e2f7ffd8c/sharing_notifications.png',
      'https://ucarecdn.com/dba67919-32bb-4d05-ade5-f817341f83d1/sharing_upload.png',
    ],
    fullDescription:
      'A peer-to-peer sharing platform that enables users to lend and borrow items within their community. Features include user verification, item tracking, insurance integration, and secure payment processing.',
  },
  {
    id: 'profitcraft',
    category: 'designAndDevelopment',
    designSubcategory: 'web',
    developmentSubcategory: 'web',
    title: 'ProfitCraft',
    challenge:
      'US credit-building service needed a trustworthy, conversion-focused website for newcomers',
    solution:
      'Designed and developed a clear service website that explains credit growth paths and drives sign-ups',
    stack: ['Web Design', 'Frontend Development', 'Marketing Website'],
    isNDA: false,
    url: 'https://www.profitcraft.info/#services',
    preview:
      'https://ucarecdn.com/1027720b-01e0-4d7f-8ca9-2f192b622065/Screenshot20260223at221440.png',
    images: [
      'https://ucarecdn.com/1027720b-01e0-4d7f-8ca9-2f192b622065/Screenshot20260223at221440.png',
      'https://ucarecdn.com/3e14ee1d-8ac3-4de4-8f05-eef73b117178/Screenshot20260223at221543.png',
      'https://ucarecdn.com/ff2b29cb-2979-4d36-a4df-28e282826dc7/Screenshot20260223at221558.png',
      'https://ucarecdn.com/479beb9b-81d2-4893-b39d-785969768c01/Screenshot20260223at222111.png',
      'https://ucarecdn.com/2d571d89-d933-4b67-81b7-f26d4bd0216c/Screenshot20260223at222059.png',
    ],
    fullDescription:
      'ProfitCraft is a website for a US-based company that helps newcomers build strong credit history. We created a design and development solution focused on trust, clarity, and action: explaining how better credit opens access to loans, auto financing, home purchases, and business growth. The product message is direct and motivational, helping users start shaping their financial future with confidence.',
  },
  {
    id: 'skisailclub',
    category: 'development',
    developmentSubcategory: 'web',
    title: 'Ski&Sail Club',
    challenge: 'Build a digital platform for a yacht club that makes trip booking and community management seamless for both newcomers and experienced sailors.',
    solution: 'Developed a web platform where users can explore yacht routes, book trips, and stay connected with the club community — with a clean, immersive UI that reflects the spirit of sailing.',
    stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    isNDA: false,
    preview: 'https://ucarecdn.com/8d0eb2fe-a6c7-4a77-8f34-e31b33b30b1d/Screenshot20260223at224814.png',
    images: [
      'https://ucarecdn.com/8d0eb2fe-a6c7-4a77-8f34-e31b33b30b1d/Screenshot20260223at224814.png',
      'https://ucarecdn.com/c2305748-a891-413f-a377-d8efdbbaca06/Screenshot20260223at224830.png',
      'https://ucarecdn.com/aa1994d9-3cc7-472d-8625-704cbd63448a/Screenshot20260223at224846.png',
      "https://ucarecdn.com/da488fa3-7cd8-4358-8ae9-70d48984082b/Screenshot20260223at224858.png"
    ],
    fullDescription:
      'Ski&Sail Club is a platform for a Ukrainian yacht and ski travel club. The product brings together route discovery, trip booking, and a member community in one place. We focused on translating the emotional side of yachting — freedom, scenic landscapes, unforgettable sunsets — into a digital experience that feels just as inspiring. Built with Next.js and TypeScript on the frontend, the platform is fast, reliable, and ready to scale as the club grows.',
  },
  {
    id: 'navexa',
    category: 'development',
    developmentSubcategory: 'web',
    title: 'Navexa',
    challenge: 'Logistics company needed unified platform for fleet and shipment management',
    solution: 'Custom dashboard with real-time tracking, route optimization, and analytics',
    stack: ['React', 'TypeScript', 'Nest.js', 'PostgreSQL'],
    isNDA: true,
    inProgress: false,
    logo: '/images/navexa.svg',
    preview: '/images/cases/nda-placeholder.svg',
    images: [],
    fullDescription:
      'Comprehensive logistics management platform for fleet tracking, route optimization, and shipment monitoring. The system integrates with GPS devices and provides real-time analytics for operational efficiency.',
  },
  {
    id: 'mie',
    category: 'development',
    developmentSubcategory: 'mobile',
    title: 'Mie',
    challenge: 'Smart shopping list needed AI to track inventory and suggest purchases',
    solution: 'AI-powered app with inventory tracking, recipe suggestions, and smart reminders',
    stack: ['React Native', 'Typescript', 'Nest.js', 'MongoDB'],
    isNDA: true,
    inProgress: false,
    preview: '/images/cases/nda-placeholder.svg',
    images: [],
    fullDescription:
      'An intelligent shopping list application that uses AI to track your pantry inventory, suggest recipes based on available ingredients, and remind you when items are running low. The app learns from your shopping patterns to optimize grocery trips.',
  },
  {
    id: 'reskin',
    category: 'design',
    designSubcategory: 'brand',
    title: '[Re.] skin&hair',
    challenge: 'Beauty brand needed modern, clean identity for skin and hair care line',
    solution: 'Minimalist brand system with organic shapes and premium feel',
    stack: ['Brand Identity', 'Visual Design', 'Adobe Illustrator'],
    isNDA: false,
    url: 'https://www.behance.net/gallery/229836525/Re-skin-hair-brand-identity',
    preview: 'https://ucarecdn.com/50f9a6df-a052-46dc-89dd-cb9d0f47869b/Screenshot20260223at222740.png',
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
    fullDescription:
      'Complete brand identity for a modern beauty brand specializing in skin and hair care products. The design system features minimalist aesthetics, organic shapes, and a premium color palette that communicates quality and trust.',
  },
  {
    id: 'gambit',
    category: 'design',
    designSubcategory: 'web',
    title: 'Gambit',
    challenge: 'Website UI needed modern design with strong visual hierarchy',
    solution: 'Clean interface with bold typography and strategic use of whitespace',
    stack: ['UI Design', 'Web Design', 'Figma'],
    isNDA: false,
    preview: 'https://ucarecdn.com/ada61fb3-30e3-46ef-96b7-22a5731f49a2/Screenshot20260223at225704.png',
    images: [
      "https://ucarecdn.com/ada61fb3-30e3-46ef-96b7-22a5731f49a2/Screenshot20260223at225704.png",
      "https://ucarecdn.com/1a4812d2-2af6-4d1b-aaa5-a2e6b9218210/Screenshot20260223at225725.png",
      "https://ucarecdn.com/3e7085c5-b68b-4cc5-915e-c1100a63203b/Screenshot20260223at225714.png",
      "https://ucarecdn.com/b7ee05ac-d3fb-439c-9eda-15f3ccaa8d14/Screenshot20260223at225734.png"

    ],
    designer: {
      name: 'Valeriia Timanovska',
      url: 'https://www.behance.net/vt_doruda/projects',
    },
    fullDescription:
      'Modern website UI design featuring strong visual hierarchy, bold typography, and strategic use of whitespace. The design balances aesthetics with usability to create an engaging user experience.',
  },
  {
    id: 'navexa-logo',
    category: 'design',
    designSubcategory: 'logo',
    title: 'Navexa',
    challenge: 'Logistics company needed a professional logo that represents navigation and precision',
    solution: 'Created a modern, minimalist logo design with both light and dark variations',
    stack: ['Logo Design', 'Brand Identity', 'Adobe Illustrator'],
    isNDA: true,
    logo: '/images/navexa.svg',
    preview: 'https://ucarecdn.com/8d74090b-4f5b-4290-b5a5-059f13b6948e/compressed_navexa_preview.png',
    images: [
      'https://ucarecdn.com/8d74090b-4f5b-4290-b5a5-059f13b6948e/compressed_navexa_preview.png',
      "https://ucarecdn.com/e9d48e80-dba8-43c6-b059-de3926cf47cb/navexa_symbol.png",
      'https://ucarecdn.com/7f073d0f-f2d1-40c0-9d7a-397537119dd9/navexa_symbol_loght.png',
    ],
    fullDescription:
      'Professional logo design for Navexa, a logistics and fleet management company. The design emphasizes precision, navigation, and modern technology with clean lines and versatile color variations for different applications.',
  },
];
