'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { cn } from '@/lib/cn';
import { sitePath } from '@/lib/site-path';

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
      <div className="grid gap-6 xl:grid-cols-[840px_520px] xl:items-start xl:justify-between">
        <div className="relative xl:-ml-[64px]">
          <div className="relative h-auto w-full xl:h-[550px] xl:w-[840px]">
            <img
              src={assets.trailer}
              alt="Полуприцеп"
              className="h-full w-full object-contain object-left-top"
            />

            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-[40%] top-[17%] w-[390px] max-w-[45%]">
                <div className="pointer-events-auto flex flex-col gap-10">
                  <div className="font-heading text-[30px] leading-[1] tracking-[-0.03em] text-[var(--text)] md:text-[36px]">
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

        <div className="mt-4 grid w-full max-w-[520px] justify-self-end gap-5 md:grid-cols-[250px_250px] xl:mt-[30px]">
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
            heightClassName="h-[220px]"
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
            heightClassName="h-[460px]"
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
            heightClassName="h-[220px]"
          />
        </div>
      </div>
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
      className="inline-flex h-[48px] w-[48px] items-center justify-center rounded-[18px] bg-[var(--surface)] text-[var(--text)] shadow-[0_4px_12px_rgba(38,41,46,0.05)] transition hover:opacity-90"
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
}: {
  title: React.ReactNode;
  href: string;
  imageSrc: string;
  theme: ThemeMode;
  variant: 'accent' | 'light' | 'dark';
  heightClassName: string;
  tall?: boolean;
}) {
  const overlayClass =
    variant === 'light'
      ? theme === 'light'
        ? 'bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.90)_100%)]'
        : 'bg-[linear-gradient(180deg,rgba(38,41,46,0.04)_0%,rgba(38,41,46,0.84)_100%)]'
      : theme === 'light'
        ? 'bg-[linear-gradient(180deg,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0.22)_100%)]'
        : 'bg-[linear-gradient(180deg,rgba(38,41,46,0.08)_0%,rgba(38,41,46,0.22)_100%)]';

  return (
    <Link
      href={href}
      className={cn(
        'group relative overflow-hidden rounded-[32px]',
        variant === 'accent'
          ? 'bg-[var(--accent-1)] text-[var(--accent-1-text)]'
          : variant === 'light'
            ? 'bg-[var(--surface)] text-[var(--text)]'
            : 'bg-[var(--accent-2)] text-[var(--accent-2-text)]',
        heightClassName,
        tall && 'md:row-span-2',
      )}
    >
      <img
        src={imageSrc}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      <div className={cn('absolute inset-0', overlayClass)} />

      <div className="relative flex h-full flex-col justify-end p-6">
        <div className="flex items-end justify-between gap-4">
          <div className="max-w-[176px] text-[16px] font-semibold leading-[1.12] tracking-[-0.02em]">
            {title}
          </div>

          <div className="inline-flex h-[48px] w-[48px] items-center justify-center rounded-[18px] bg-[var(--surface)] text-[var(--text)] transition group-hover:translate-x-[2px]">
            <ArrowRight size={24} strokeWidth={2.1} />
          </div>
        </div>
      </div>
    </Link>
  );
}
