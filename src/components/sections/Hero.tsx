'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { cn } from '@/lib/cn';
import { sitePath } from '@/lib/site-path';
import { Container } from '@/components/layout/Container';

type ThemeMode = 'light' | 'dark';

type HeroSlide = {
  title: string;
  value: string;
  ctaLabel: string;
  href: string;
  external?: boolean;
};

const slides: HeroSlide[] = [
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

export function Hero() {
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const root = document.documentElement;

    const syncTheme = () => {
      setTheme(root.dataset.theme === 'dark' ? 'dark' : 'light');
    };

    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] });

    return () => observer.disconnect();
  }, []);

  const assets = useMemo(
    () => ({
      trailer:
        theme === 'light'
          ? `${sitePath}/hero/trailer/light.svg`
          : `${sitePath}/hero/trailer/dark.svg`,
      request: `${sitePath}/hero/cards/request.webp`,
      calc: `${sitePath}/hero/cards/calc.webp`,
      principles: `${sitePath}/hero/cards/principles.webp`,
    }),
    [theme],
  );

  const slide = slides[activeSlide];

  const goPrev = () => {
    setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goNext = () => {
    setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="pt-8 md:pt-10 xl:pt-12">
      <Container>
        <div className="grid gap-10 xl:grid-cols-[780px_540px] xl:items-start">
          <div className="relative xl:-ml-[60px]">
            <div className="relative h-auto w-full xl:h-[550px] xl:w-[840px]">
              <img
                src={assets.trailer}
                alt="Полуприцеп"
                className="h-full w-full object-contain object-left-top"
              />

              <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-[42%] top-[15%] w-[380px] max-w-[43%]">
                  <div className="pointer-events-auto flex flex-col gap-11">
                    <div className="font-heading text-[24px] leading-[1] tracking-[-0.03em] text-[var(--text)] md:text-[30px]">
                      {slide.title}
                    </div>

                    <div
                      className="text-[88px] font-semibold leading-[0.9] tracking-[-0.06em] text-[var(--text)] md:text-[88px]"
                      style={{ fontFamily: 'var(--font-body-text)' }}
                    >
                      {slide.value}
                    </div>

                    <div className="flex items-center gap-3">
                      <HeroActionButton
                        label={slide.ctaLabel}
                        href={slide.href}
                        external={slide.external}
                      />

                      <ArrowSquareButton
                        ariaLabel="предыдущая характеристика"
                        onClick={goPrev}
                      >
                        <ArrowLeft size={24} strokeWidth={2.1} />
                      </ArrowSquareButton>

                      <ArrowSquareButton
                        ariaLabel="следующая характеристика"
                        onClick={goNext}
                      >
                        <ArrowRight size={24} strokeWidth={2.1} />
                      </ArrowSquareButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 grid w-full max-w-[540px] justify-self-end self-center gap-6 md:grid-cols-[258px_258px] xl:mt-0">
            <BentoCard
              title={
                <>
                  единая форма
                  <br />
                  запроса и отправки кп
                </>
              }
              href="/request/"
              imageSrc={assets.request}
              theme={theme}
              variant="accent"
              heightClassName="h-[236px]"
            />

            <BentoCard
              title={
                <>
                  ознакомиться
                  <br />
                  с нашими принципами
                </>
              }
              href="#about"
              imageSrc={assets.principles}
              theme={theme}
              variant="dark"
              heightClassName="h-[496px]"
              tall
            />

            <BentoCard
              title={
                <>
                  сделать расчёт
                  <br />
                  вашей грузоперевозки
                </>
              }
              href="#pricing"
              imageSrc={assets.calc}
              theme={theme}
              variant="light"
              heightClassName="h-[236px]"
              specialButton
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

function HeroActionButton({
  label,
  href,
  external = false,
}: {
  label: string;
  href: string;
  external?: boolean;
}) {
  const className =
    'inline-flex h-[48px] w-[284px] items-center justify-center rounded-[20px] bg-[var(--accent-1)] px-8 text-[17px] font-medium lowercase text-[var(--accent-1-text)] transition hover:opacity-90';

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}

function ArrowSquareButton({
  children,
  ariaLabel,
  onClick,
}: {
  children: React.ReactNode;
  ariaLabel: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className="inline-flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[18px] bg-[var(--surface)] text-[var(--text)] shadow-[0_4px_12px_rgba(38,41,46,0.05)] transition hover:opacity-90"
    >
      {children}
    </button>
  );
}

function BentoCard({
  title,
  href,
  imageSrc,
  theme,
  variant,
  heightClassName,
  tall = false,
  specialButton = false,
}: {
  title: React.ReactNode;
  href: string;
  imageSrc: string;
  theme: ThemeMode;
  variant: 'accent' | 'light' | 'dark';
  heightClassName: string;
  tall?: boolean;
  specialButton?: boolean;
}) {
  const localShadowClass =
    variant === 'light'
      ? theme === 'light'
        ? 'bg-[radial-gradient(circle_at_24%_82%,rgba(246,246,246,0.92)_0%,rgba(246,246,246,0.72)_26%,rgba(246,246,246,0.24)_56%,transparent_82%)]'
        : 'bg-[radial-gradient(circle_at_24%_82%,rgba(38,41,46,0.90)_0%,rgba(38,41,46,0.72)_28%,rgba(38,41,46,0.24)_58%,transparent_82%)]'
      : theme === 'light'
        ? 'bg-[radial-gradient(circle_at_24%_82%,rgba(255,255,255,0.38)_0%,rgba(255,255,255,0.20)_32%,rgba(255,255,255,0.08)_58%,transparent_82%)]'
        : 'bg-[radial-gradient(circle_at_24%_82%,rgba(38,41,46,0.34)_0%,rgba(38,41,46,0.18)_30%,rgba(38,41,46,0.08)_56%,transparent_82%)]';

  const buttonClass = specialButton
    ? theme === 'light'
      ? 'bg-[#26292e] text-white'
      : 'bg-white text-black'
    : 'bg-[var(--surface)] text-[var(--text)]';

  return (
    <Link
      href={href}
      className={cn(
        'group relative block overflow-hidden rounded-[32px] p-[1.5px]',
        heightClassName,
        tall && 'md:row-span-2',
      )}
    >
      <div className="pointer-events-none absolute inset-0 rounded-[32px] bg-[linear-gradient(135deg,rgba(255,255,255,0.70)_0%,rgba(255,255,255,0.10)_24%,rgba(255,255,255,0.52)_48%,rgba(255,255,255,0.10)_74%,rgba(255,255,255,0.68)_100%)] opacity-85" />

      <div
        className={cn(
          'relative h-full overflow-hidden rounded-[30.5px]',
          variant === 'accent'
            ? 'bg-[var(--accent-1)] text-[var(--accent-1-text)]'
            : variant === 'light'
              ? 'bg-[var(--surface)] text-[var(--text)]'
              : 'bg-[var(--accent-2)] text-[var(--accent-2-text)]',
        )}
      >
        <img
          src={imageSrc}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        <div className="relative flex h-full flex-col justify-end p-5">
          <div className="relative">
            <div
              className={cn(
                'pointer-events-none absolute bottom-[-28px] left-[-28px] h-[132px] w-[230px] blur-[24px]',
                localShadowClass,
              )}
            />

            <div className="relative flex items-center justify-between gap-3">
              <div className="max-w-[146px] text-[12px] font-semibold leading-[1.15] tracking-[-0.01em]">
                {title}
              </div>

              <div
                className={cn(
                  'inline-flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-[16px] transition group-hover:translate-x-[2px]',
                  buttonClass,
                )}
              >
                <ArrowRight size={22} strokeWidth={2.1} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
