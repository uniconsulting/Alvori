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
  valueClassName?: string;
  ctaLabel: string;
  href: string;
  external?: boolean;
};

const slides: HeroSlide[] = [
  {
    title: 'успешных перевозок',
    value: '>10.000',
    valueClassName: 'text-[92px] md:text-[112px]',
    ctaLabel: 'оформить заявку',
    href: '/request/',
  },
  {
    title: 'мы на ati.su',
    value: '728 149',
    valueClassName: 'text-[78px] md:text-[92px]',
    ctaLabel: 'открыть профиль',
    href: 'https://ati.su/',
    external: true,
  },
  {
    title: 'знаем своё дело',
    value: 'на 100%',
    valueClassName: 'text-[74px] md:text-[88px]',
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
      request: `${sitePath}/hero/cards/request.png`,
      calc: `${sitePath}/hero/cards/calc.png`,
      principles: `${sitePath}/hero/cards/principles.png`,
    }),
    [theme],
  );

  const overlayClass =
    theme === 'light'
      ? 'bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.18)_100%)]'
      : 'bg-[linear-gradient(180deg,rgba(38,41,46,0)_0%,rgba(38,41,46,0.22)_100%)]';

  const slide = slides[activeSlide];

  const goPrev = () => {
    setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goNext = () => {
    setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="pt-8 md:pt-10 xl:pt-12">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_600px] xl:items-start">
        <div className="relative xl:-ml-[104px]">
          <div className="relative h-auto w-full xl:h-[550px] xl:w-[840px]">
            <img
              src={assets.trailer}
              alt="Полуприцеп"
              className="h-full w-full object-contain object-left-top"
            />

            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-[28%] top-[16%] w-[430px] max-w-[48%]">
                <div className="pointer-events-auto space-y-5">
                  <div className="font-heading text-[28px] leading-[1] tracking-[-0.03em] text-[var(--text)] md:text-[34px]">
                    {slide.title}
                  </div>

                  <div
                    className={cn(
                      'font-heading leading-[0.9] tracking-[-0.06em] text-[var(--text)]',
                      slide.valueClassName,
                    )}
                  >
                    {slide.value}
                  </div>

                  <div className="flex items-center gap-3">
                    <HeroActionButton
                      label={slide.ctaLabel}
                      href={slide.href}
                      external={slide.external}
                      primary
                    />

                    <button
                      type="button"
                      onClick={goPrev}
                      aria-label="предыдущий тезис"
                      className="inline-flex h-[48px] w-[48px] items-center justify-center rounded-[18px] bg-[var(--surface)] text-[var(--text)] shadow-[0_4px_12px_rgba(38,41,46,0.05)] transition hover:opacity-90"
                    >
                      <ArrowLeft size={24} strokeWidth={2.1} />
                    </button>

                    <button
                      type="button"
                      onClick={goNext}
                      aria-label="следующий тезис"
                      className="inline-flex h-[48px] w-[48px] items-center justify-center rounded-[18px] bg-[var(--surface)] text-[var(--text)] shadow-[0_4px_12px_rgba(38,41,46,0.05)] transition hover:opacity-90"
                    >
                      <ArrowRight size={24} strokeWidth={2.1} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid w-full max-w-[600px] justify-self-end gap-5 md:grid-cols-[290px_290px]">
          <BentoCard
            title="единая форма запроса и отправки кп"
            href="/request/"
            imageSrc={assets.request}
            overlayClass={overlayClass}
            accent
            heightClassName="h-[248px]"
          />

          <BentoCard
            title="ознакомиться с нашими принципами"
            href="#about"
            imageSrc={assets.principles}
            overlayClass={overlayClass}
            tall
            heightClassName="h-[516px]"
          />

          <BentoCard
            title="сделать расчёт вашей грузоперевозки"
            href="#pricing"
            imageSrc={assets.calc}
            overlayClass={overlayClass}
            lightCard
            heightClassName="h-[248px]"
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
  primary = false,
}: {
  label: string;
  href: string;
  external?: boolean;
  primary?: boolean;
}) {
  const className = cn(
    'inline-flex items-center justify-center rounded-[20px] font-medium lowercase transition hover:opacity-90',
    primary
      ? 'h-[48px] bg-[var(--accent-1)] px-8 text-[17px] text-[var(--accent-1-text)]'
      : 'h-[40px] bg-[var(--surface)] px-5 text-[15px] text-[var(--text)] shadow-[0_4px_12px_rgba(38,41,46,0.05)]',
  );

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

function BentoCard({
  title,
  href,
  imageSrc,
  overlayClass,
  accent = false,
  tall = false,
  lightCard = false,
  heightClassName,
}: {
  title: string;
  href: string;
  imageSrc: string;
  overlayClass: string;
  accent?: boolean;
  tall?: boolean;
  lightCard?: boolean;
  heightClassName: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        'group relative overflow-hidden rounded-[32px]',
        accent
          ? 'bg-[var(--accent-1)] text-[var(--accent-1-text)]'
          : lightCard
            ? 'bg-[var(--surface)] text-[var(--text)]'
            : 'bg-[var(--accent-2)] text-[var(--accent-2-text)]',
        tall ? 'md:row-span-2' : '',
        heightClassName,
      )}
    >
      <img
        src={imageSrc}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      <div className={cn('absolute inset-0', overlayClass)} />

      <div className="relative flex h-full flex-col justify-end p-6">
        <div
          className={cn(
            'flex items-end justify-between gap-4',
            lightCard &&
              'rounded-[22px] bg-[rgba(246,246,246,0.88)] px-4 py-4 backdrop-blur-sm',
          )}
        >
          <div className="max-w-[220px] text-[20px] font-semibold leading-[1.1] tracking-[-0.02em]">
            {title}
          </div>

          <div className="inline-flex h-[56px] w-[56px] items-center justify-center rounded-[20px] bg-[var(--surface)] text-[var(--text)] transition group-hover:translate-x-[2px]">
            <ArrowRight size={26} strokeWidth={2} />
          </div>
        </div>
      </div>
    </Link>
  );
}
