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
    value: '>10.000',
    ctaLabel: 'оформить заявку',
    href: '/request/',
  },
  {
    title: 'мы на ati.su',
    value: '728 149',
    ctaLabel: 'открыть профиль',
    href: 'https://ati.su/',
    external: true,
  },
  {
    title: 'знаем своё дело',
    value: 'на 100%',
    ctaLabel: 'познакомиться',
    href: '#services',
  },
];

export type AtiDigitState = {
  char: string;
  locked: boolean;
  spinning: boolean;
};
