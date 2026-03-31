export const homeAnchorIds = {
  services: 'services',
  about: 'about',
  geography: 'geography',
  fleet: 'fleet',
  contacts: 'contacts',
} as const;

export const homeAnchorHrefs = {
  services: `#${homeAnchorIds.services}`,
  about: `#${homeAnchorIds.about}`,
  geography: `#${homeAnchorIds.geography}`,
  fleet: `#${homeAnchorIds.fleet}`,
  contacts: `#${homeAnchorIds.contacts}`,
} as const;

export const homeNavigation = [
  { label: 'услуги', href: homeAnchorHrefs.services },
  { label: 'о компании', href: homeAnchorHrefs.about },
  { label: 'география', href: homeAnchorHrefs.geography },
  { label: 'автопарк', href: homeAnchorHrefs.fleet },
  { label: 'контакты', href: homeAnchorHrefs.contacts },
] as const;
