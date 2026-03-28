'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
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
  const [displayValue, setDisplayValue] = useState('>0');
  const rafRef = useRef<number | null>(null);

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

  useEffect(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    const duration = 1800;
    const start = performance.now();

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const formatThousands = (value: number) =>
      value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    const formatAti = (value: number) => {
      const padded = value.toString().padStart(6, '0');
      return `${padded.slice(0, 3)} ${padded.slice(3)}`;
    };

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = easeOutCubic(progress);

      if (activeSlide === 0) {
        const value = Math.round(10000 * eased);
        setDisplayValue(`>${formatThousands(value)}`);
      } else if (activeSlide === 1) {
        const value = Math.round(728149 * eased);
        setDisplayValue(formatAti(value));
      } else {
        setDisplayValue('на 100%');
      }

      if (progress < 1 && activeSlide !== 2) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    if (activeSlide === 2) {
      setDisplayValue('на 100%');
    } else if (activeSlide === 1) {
      setDisplayValue('000 000');
      rafRef.current = requestAnimationFrame(tick);
    } else {
      setDisplayValue('>0');
      rafRef.current = requestAnimationFrame(tick);
    }

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [activeSlide]);

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
          <div className="hero-reveal-left relative xl:-ml-[60px]">
            <div className="relative h-auto w-full xl:h-[550px] xl:w-[840px]">
              <img
                src={assets.trailer}
                alt="Полуприцеп"
                className="h-full w-full object-contain object-left-top"
              />

              <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-[42%] top-[15%] w-[380px] max-w-[43%]">
                  <div key={activeSlide} className="hero-slide-animate pointer-events-auto flex flex-col gap-11">
                    <div className="font-heading text-[24px] leading-[1] tracking-[-0.03em] text-[var(--text)] md:text-[30px]">
                      {slide.title}
                    </div>

                    <div
                      className="text-[88px] font-semibold leading-[0.9] tracking-[-0.06em] text-[var(--text)] md:text-[88px]"
                      style={{ fontFamily: 'var(--font-body-text)' }}
                    >
                      {displayValue}
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
              revealClassName="hero-card-delay-1"
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
              specialButton
              revealClassName="hero-card-delay-3"
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
              revealClassName="hero-card-delay-2"
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
    'hero-cta-lift inline-flex h-[48px] w-[284px] items-center justify-center rounded-[20px] bg-[var(--accent-1)] px-8 text-[17px] font-medium lowercase text-[var(--accent-1-text)]';

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
  revealClassName,
}: {
  title: React.ReactNode;
  href: string;
  imageSrc: string;
  theme: ThemeMode;
  variant: 'accent' | 'light' | 'dark';
  heightClassName: string;
  tall?: boolean;
  specialButton?: boolean;
  revealClassName?: string;
}) {
  const localShadowClass =
    theme === 'light'
      ? 'bg-[radial-gradient(circle_at_0%_100%,rgba(255,255,255,0.98)_0%,rgba(255,255,255,0.84)_24%,rgba(255,255,255,0.54)_52%,rgba(255,255,255,0.22)_74%,transparent_94%)]'
      : 'bg-[radial-gradient(circle_at_0%_100%,rgba(38,41,46,0.98)_0%,rgba(38,41,46,0.84)_26%,rgba(38,41,46,0.56)_54%,rgba(38,41,46,0.24)_76%,transparent_94%)]';

  const textClass =
    theme === 'light' ? 'text-[#26292e]' : 'text-[#f6f6f6]';

  const buttonClass = specialButton
    ? theme === 'light'
      ? 'bg-[#26292e] text-white'
      : 'bg-white text-black'
    : theme === 'light'
      ? 'bg-white text-[#26292e]'
      : 'bg-[#222429] text-white';

  const handlePointerMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.innerWidth < 1024) return;

    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    const mx = px - 0.5;
    const my = py - 0.5;

    const rotateX = -my * 12;
    const rotateY = mx * 14;

    el.style.setProperty('--rx', `${rotateX}deg`);
    el.style.setProperty('--ry', `${rotateY}deg`);
    el.style.setProperty('--mx', `${mx}`);
    el.style.setProperty('--my', `${my}`);
    el.style.setProperty('--card-scale', '1.015');
  };

  const handlePointerLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
    el.style.setProperty('--mx', '0');
    el.style.setProperty('--my', '0');
    el.style.setProperty('--card-scale', '1');
  };

  return (
    <Link
      href={href}
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      className={cn(
        'hero-card-reveal hero-card-tilt group relative block overflow-hidden rounded-[32px] p-[1.5px]',
        heightClassName,
        tall && 'md:row-span-2',
        revealClassName,
      )}
    >
      <div className="hero-card-border-3d pointer-events-none absolute inset-0 rounded-[32px] bg-[linear-gradient(135deg,rgba(255,255,255,0.88)_0%,rgba(255,255,255,0.26)_24%,rgba(255,255,255,0.66)_48%,rgba(255,255,255,0.22)_74%,rgba(255,255,255,0.90)_100%)] opacity-90" />

      <div
        className={cn(
          'relative h-full overflow-hidden rounded-[30.5px]',
          variant === 'accent'
            ? 'bg-[var(--accent-1)]'
            : variant === 'light'
              ? 'bg-[var(--surface)]'
              : 'bg-[var(--accent-2)]',
        )}
      >
        <img
          src={imageSrc}
          alt=""
          className="hero-card-image-3d absolute inset-0 h-full w-full object-cover object-center"
        />

        <div className="hero-card-content-3d relative flex h-full flex-col justify-end p-5">
          <div className="relative">
            <div
              className={cn(
                'pointer-events-none absolute bottom-[-30px] left-[-22px] right-[-18px] h-[154px] blur-[30px]',
                localShadowClass,
              )}
            />

            <div className="relative flex items-center justify-between gap-2">
              <div
                className={cn(
                  'max-w-[152px] text-[12px] font-semibold leading-[1.15] tracking-[-0.01em]',
                  textClass,
                )}
              >
                {title}
              </div>

              <div
                className={cn(
                  'inline-flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[14px] transition group-hover:translate-x-[2px]',
                  buttonClass,
                )}
              >
                <ArrowRight size={19} strokeWidth={2.1} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
