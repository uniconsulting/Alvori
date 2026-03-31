import { homeAnchorHrefs } from '@/config/anchors';
import { ctaRoutes, externalRoutes } from '@/config/routes';

export type HeroSlide = {
  title: string;
  value: string;
  ctaLabel: string;
  href: string;
  external?: boolean;
};

export const heroSlides: HeroSlide[] = [
  {
    title: 'успешных перевозок',
    value: '> 10.000',
    ctaLabel: 'оформить заявку',
    href: ctaRoutes.heroPrimary,
  },
  {
    title: 'мы на ati.su',
    value: '1005',
    ctaLabel: 'открыть профиль',
    href: externalRoutes.ati,
    external: true,
  },
  {
    title: 'знаем своё дело',
    value: 'на 100%',
    ctaLabel: 'познакомиться',
    href: homeAnchorHrefs.services,
  },
];

export type AtiDigitState = {
  char: string;
  locked: boolean;
  spinning: boolean;
};
