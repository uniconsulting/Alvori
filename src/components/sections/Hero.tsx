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

  const [trailerReady, setTrailerReady] = useState(false);
  const [metricsReady, setMetricsReady] = useState(false);
  const [card1Ready, setCard1Ready] = useState(false);
  const [card2Ready, setCard2Ready] = useState(false);
  const [card3Ready, setCard3Ready] = useState(false);

  const animationFrameRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);

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
    const timers: number[] = [];

    timers.push(window.setTimeout(() => setTrailerReady(true), 60));
    timers.push(window.setTimeout(() => setMetricsReady(true), 980));

    timers.push(
      window.setTimeout(() => {
        animateSlideValue(0);
      }, 1880),
    );

    timers.push(window.setTimeout(() => setCard1Ready(true), 4700));
    timers.push(window.setTimeout(() => setCard2Ready(true), 5200));
    timers.push(window.setTimeout(() => setCard3Ready(true), 5700));

    return () => {
      timers.forEach((id) => window.clearTimeout(id));
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (!metricsReady) return;
    animateSlideValue(activeSlide);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [activeSlide, metricsReady]);

  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

  const animateCount = (target: number, duration = 2600) => {
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);

    const start = performance.now();

    const formatThousands = (value: number) =>
      value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = easeOutCubic(progress);
      const value = Math.round(target * eased);
      setDisplayValue(`>${formatThousands(value)}`);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(tick);
      }
    };

    setDisplayValue('>0');
    animationFrameRef.current = requestAnimationFrame(tick);
  };

  const animateAtiLock = (target = '728149') => {
    if (intervalRef.current) window.clearInterval(intervalRef.current);

    const locked = ['0', '0', '0', '0', '0', '0'];
    let lockIndex = 0;
    let tickCount = 0;

    const formatAti = (arr: string[]) => `${arr.slice(0, 3).join('')} ${arr.slice(3).join('')}`;

    setDisplayValue('000 000');

    intervalRef.current = window.setInterval(() => {
      tickCount += 1;

      const next = [...locked];

      for (let i = lockIndex; i < 6; i += 1) {
        next[i] = String(Math.floor(Math.random() * 10));
      }

      if (tickCount % 5 === 0 && lockIndex < 6) {
        next[lockIndex] = target[lockIndex];
        locked[lockIndex] = target[lockIndex];
        lockIndex += 1;
      }

      setDisplayValue(formatAti(next));

      if (lockIndex >= 6) {
        if (intervalRef.current) window.clearInterval(intervalRef.current);
        setDisplayValue('728 149');
      }
    }, 90);
  };

  const animateSlideValue = (index: number) => {
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    if (intervalRef.current) window.clearInterval(intervalRef.current);

    if (index === 0) {
      animateCount(10000, 2600);
      return;
    }

    if (index === 1) {
      animateAtiLock('728149');
      return;
    }

    setDisplayValue('на 100%');
  };

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
          <div className={cn('relative xl:-ml-[60px]', !trailerReady && 'hero-trailer-hidden', trailerReady && 'hero-trailer-enter')}>
            <div className="relative h-auto w-full xl:h-[550px] xl:w-[840px]">
              <img
                src={assets.trailer}
                alt="Полуприцеп"
                className="h-full w-full object-contain object-left-top"
              />

              <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-[42%] top-[15%] w-[380px] max-w-[43%]">
                  <div
                    key={activeSlide}
                    className={cn(
                      'pointer-events-auto flex flex-col gap-11',
                      !metricsReady && 'hero-metrics-hidden',
                      metricsReady && 'hero-metrics-enter',
                      metricsReady && activeSlide >= 0 && 'hero-slide-animate',
                    )}
                  >
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
              visible={card1Ready}
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
              visible={card3Ready}
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
              visible={card2Ready}
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
  visible,
}: {
  title: React.ReactNode;
  href: string;
  imageSrc: string;
  theme: ThemeMode;
  variant: 'accent' | 'light' | 'dark';
  heightClassName: string;
  tall?: boolean;
  specialButton?: boolean;
  visible: boolean;
}) {
  const [tilt, setTilt] = useState({
    rotateX: 0,
    rotateY: 0,
    y: 0,
    scale: 1,
  });

  const [glow, setGlow] = useState({
    x: 50,
    y: 50,
    opacity: 0,
  });

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

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1024) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    const rotateY = (px - 0.5) * 8;
    const rotateX = (0.5 - py) * 8;

    setTilt({
      rotateX,
      rotateY,
      y: -4,
      scale: 1.01,
    });

    setGlow({
      x: px * 100,
      y: py * 100,
      opacity: 1,
    });
  };

  const handleMouseLeave = (_event?: React.MouseEvent<HTMLDivElement>) => {
    setTilt({
      rotateX: 0,
      rotateY: 0,
      y: 0,
      scale: 1,
    });

    setGlow({
      x: 50,
      y: 50,
      opacity: 0,
    });
  };

return (
  <div
    className={cn(
      !visible && 'hero-card-hidden',
      visible && 'hero-card-enter',
      heightClassName,
      tall && 'md:row-span-2',
    )}
  >
    <div
      className="hero-card-shell h-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={href}
        className="hero-card-tilt group relative block h-full overflow-hidden rounded-[32px] p-[1.5px]"
        style={{
          transform: `perspective(1400px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) translateY(${tilt.y}px) scale(${tilt.scale})`,
        }}
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
            style={{
              transform: `translate3d(${(glow.x - 50) * -0.12}px, ${(glow.y - 50) * -0.12}px, 18px) scale(1.05)`,
            }}
          />

          <div
            className="hero-card-glow pointer-events-none absolute inset-0"
            style={{
              opacity: glow.opacity,
              background: `radial-gradient(320px circle at ${glow.x}% ${glow.y}%, rgba(255,255,255,0.18), transparent 60%)`,
            }}
          />

          <div
            className="hero-card-content-3d relative flex h-full flex-col justify-end p-5"
            style={{
              transform: `translate3d(${(glow.x - 50) * 0.08}px, ${(glow.y - 50) * 0.08}px, 26px)`,
            }}
          >
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
                    'hero-card-arrow inline-flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[14px]',
                    buttonClass,
                  )}
                  style={{ transform: 'translateZ(32px)' }}
                >
                  <ArrowRight size={19} strokeWidth={2.1} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  </div>
);
