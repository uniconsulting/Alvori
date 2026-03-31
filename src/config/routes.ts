import { homeAnchorHrefs } from '@/config/anchors';

export const appRoutes = {
  home: '/',
  calculator: '/calculator',
  request: '/request',
  contacts: '/contacts',
  faq: '/faq',
  legal: {
    offer: '/offer',
    privacy: '/privacy',
    terms: '/terms',
    dataProcessing: '/data-processing',
  },
  services: {
    intercity: '/services/intercity',
    interterminal: '/services/interterminal',
    expedition: '/services/expedition',
    project: '/services/project',
    adr: '/services/adr',
  },
} as const;

export const externalRoutes = {
  ati: 'https://ati.su/',
} as const;

export const ctaRoutes = {
  heroPrimary: appRoutes.request,
  heroProfile: externalRoutes.ati,
  heroAbout: homeAnchorHrefs.about,
  headerCalculator: appRoutes.calculator,
  headerRequest: appRoutes.request,
  footerMaxFallback: appRoutes.contacts,
  footerTelegramFallback: appRoutes.contacts,
  geographyCalculator: appRoutes.calculator,
  contactsExtendedForm: appRoutes.request,
} as const;
