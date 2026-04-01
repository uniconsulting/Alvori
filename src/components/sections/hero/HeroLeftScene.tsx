'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '@/lib/cn';
import { sitePath } from '@/lib/site-path';
import type { AtiDigitState } from './hero-data';
import { heroSlides } from './hero-data';

type ThemeMode = 'light' | 'dark';

function scrollToHeroScene(scene: 'services' | 'about') {
  if (typeof window === 'undefined') return;

  const root = document.getElementById('hero-services-stage');
  if (!root) return;

  const rect = root.getBoundingClientRect();
  const pageTop = window.scrollY + rect.top;
  const maxScrollable = Math.max(root.offsetHeight - window.innerHeight, 0);

  const progress = scene === 'services' ? 0.24 : 0.88;
  const targetY = pageTop + maxScrollable * progress;

  window.scrollTo({
    top: targetY,
    behavior: 'smooth',
  });
}

export function HeroLeftScene() {
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [activeSlide, setActiveSlide] = useState(0);
  const [displayValue, setDisplayValue] = useState('> 0');
  const [metricValueFinish, setMetricValueFinish] = useState(false);

  const [atiDigits, setAtiDigits] = useState<AtiDigitState[]>([
    { char: '0', locked: false, spinning: false },
    { char: '0', locked: false, spinning: false },
    { char: '0', locked: false, spinning: false },
    { char: '0', locked: false, spinning: false },
  ]);

  const [trailerReady, setTrailerReady] = useState(false);
  const [metricsReady, setMetricsReady] = useState(false);

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

  useEffect(() => {
    const timers: number[] = [];
    timers.push(window.setTimeout(() => setTrailerReady(true), 60));
    timers.push(window.setTimeout(() => setMetricsReady(true), 1380));

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

  const assets = useMemo(
    () => ({
      trailerLight: `${sitePath}/hero/trailer/light.svg`,
      trailerDark: `${sitePath}/hero/trailer/dark.svg`,
    }),
    [],
  );

  useEffect(() => {
    const light = new Image();
    const dark = new Image();

    light.src = assets.trailerLight;
    dark.src = assets.trailerDark;
  }, [assets]);

  const slide = heroSlides[activeSlide];

  const formatThousands = (value: number) =>
    value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  const animateCount = (target: number, duration = 5200) => {
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);

    setMetricValueFinish(false);

    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);

      let value = 0;

      if (progress < 0.26) {
        const t = progress / 0.26;
        value = Math.round(2000 * t * t * t);
      } else if (progress < 0.74) {
        const t = (progress - 0.26) / 0.48;
        value = Math.round(2000 + (8000 - 2000) * (1 - Math.pow(1 - t, 2.4)));
      } else {
        const t = (progress - 0.74) / 0.26;
        value = Math.round(8000 + (target - 8000) * (1 - Math.pow(1 - t, 3.2)));
      }

      if (progress < 1) {
        setDisplayValue(`> ${formatThousands(value)}`);
        animationFrameRef.current = requestAnimationFrame(tick);
        return;
      }

      setDisplayValue(`> ${formatThousands(target)}`);
      setMetricValueFinish(true);

      window.setTimeout(() => {
        setMetricValueFinish(false);
      }, 760);
    };

    setDisplayValue('> 0');
    animationFrameRef.current = requestAnimationFrame(tick);
  };

  const animateAtiLock = (target = '1005') => {
    if (intervalRef.current) window.clearInterval(intervalRef.current);

    const finalDigits = target.split('');
    let activeIndex = 0;
    let spinTick = 0;
    const spinFrames = [16, 15, 14, 13];

    setAtiDigits(
      finalDigits.map(() => ({
        char: '0',
        locked: false,
        spinning: false,
      })),
    );

    intervalRef.current = window.setInterval(() => {
      setAtiDigits((prev) => {
        const next = prev.map((digit, index) => {
          if (index < activeIndex) {
            return { char: finalDigits[index], locked: true, spinning: false };
          }

          if (index > activeIndex) {
            return { char: '0', locked: false, spinning: false };
          }

          const totalFrames = spinFrames[index] ?? 12;
          const progress = Math.min(spinTick / totalFrames, 1);
          const currentFinal = Number(finalDigits[index]);

          let char = '0';

          if (progress < 0.42) {
            char = String(Math.floor(Math.random() * 10));
          } else if (progress < 0.68) {
            char = String((currentFinal + 5 + Math.floor(Math.random() * 3)) % 10);
          } else if (progress < 0.86) {
            char = String((currentFinal + 2 + Math.floor(Math.random() * 2)) % 10);
          } else if (progress < 0.97) {
            char = String((currentFinal + 1) % 10);
          } else {
            char = finalDigits[index];
          }

          return {
            char,
            locked: progress >= 0.97,
            spinning: progress < 0.97,
          };
        });

        return next;
      });

      spinTick += 1;

      if (spinTick >= (spinFrames[activeIndex] ?? 12)) {
        activeIndex += 1;
        spinTick = 0;
      }

      if (activeIndex >= finalDigits.length) {
        if (intervalRef.current) window.clearInterval(intervalRef.current);

        setAtiDigits(
          finalDigits.map((char) => ({
            char,
            locked: true,
            spinning: false,
          })),
        );

        setDisplayValue('1005');
      }
    }, 82);
  };

  const animateSlideValue = (index: number) => {
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    if (intervalRef.current) window.clearInterval(intervalRef.current);

    if (index !== 1) {
      setAtiDigits([
        { char: '0', locked: false, spinning: false },
        { char: '0', locked: false, spinning: false },
        { char: '0', locked: false, spinning: false },
        { char: '0', locked: false, spinning: false },
      ]);
    }

    if (index === 0) {
      animateCount(10000, 5200);
      return;
    }

    if (index === 1) {
      animateAtiLock('1005');
      return;
    }

    setDisplayValue('на 100%');
  };

  const goPrev = () => {
    setActiveSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  const goNext = () => {
    setActiveSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  };

  const MetricsContent = (
    <>
      <div className="font-heading text-[20px] leading-[1] tracking-[-0.03em] text-[var(--text)] sm:text-[22px] md:text-[26px] xl:text-[30px]">
        {slide.title}
      </div>

      <div
        className={cn(
          'text-[52px] font-semibold leading-[0.9] tracking-[-0.06em] text-[var(--text)] sm:text-[60px] md:text-[72px] xl:text-[88px]',
          activeSlide === 0 && metricValueFinish && 'hero-metric-value-finish',
        )}
        style={{ fontFamily: 'var(--font-body-text)' }}
      >
        {activeSlide === 1 ? (
          <span className="hero-ati-code">
            {atiDigits.map((digit, index) => (
              <span
                key={`ati-${index}`}
                className={cn(
                  'hero-ati-digit',
                  digit.spinning ? 'hero-ati-digit--spinning' : 'hero-ati-digit--locked',
                )}
              >
                {digit.char}
              </span>
            ))}
          </span>
        ) : (
          displayValue
        )}
      </div>

      <div className="flex items-center gap-2.5 xl:gap-3">
        <HeroActionButton
          label={slide.ctaLabel}
          href={slide.href}
          external={slide.external}
        />

        <div className="flex items-center gap-2.5">
          <ArrowSquareButton ariaLabel="предыдущая характеристика" onClick={goPrev}>
            <ArrowLeft size={16} strokeWidth={2.1} className="xl:hidden" />
            <ArrowLeft size={22} strokeWidth={2.1} className="hidden xl:block" />
          </ArrowSquareButton>

          <ArrowSquareButton ariaLabel="следующая характеристика" onClick={goNext}>
            <ArrowRight size={16} strokeWidth={2.1} className="xl:hidden" />
            <ArrowRight size={22} strokeWidth={2.1} className="hidden xl:block" />
          </ArrowSquareButton>
        </div>
      </div>
    </>
  );

  return (
    <div className="relative w-full xl:-ml-[60px] min-[1920px]:xl:ml-[24px]">
      <div
        className={cn(
          'hero-trailer-shell relative w-[144%] max-w-none',
          'h-[286px] sm:h-[340px] md:h-[438px] xl:h-[550px] xl:w-[840px] min-[1920px]:xl:w-[910px]',
          trailerReady && 'hero-trailer-shell--ready',
        )}
      >
        <div className="relative h-full w-full">
          <img
            src={assets.trailerLight}
            alt="Полуприцеп"
            className={cn(
              'hero-trailer-visual absolute inset-0 h-full w-full object-contain object-left-top transition-opacity duration-150',
              theme === 'light' ? 'opacity-100' : 'opacity-0',
            )}
          />

          <img
            src={assets.trailerDark}
            alt="Полуприцеп"
            className={cn(
              'hero-trailer-visual absolute inset-0 h-full w-full object-contain object-left-top transition-opacity duration-150',
              theme === 'dark' ? 'opacity-100' : 'opacity-0',
            )}
          />
        </div>

        <div className="pointer-events-none absolute inset-0 hidden xl:block">
          <div className="absolute left-[42%] top-[15%] w-[380px] max-w-[43%] min-[1920px]:left-[45%]">
            <div
              key={activeSlide}
              className={cn(
                'pointer-events-auto flex flex-col gap-11',
                !metricsReady && 'hero-metrics-hidden',
                metricsReady && 'hero-metrics-enter',
                metricsReady && 'hero-slide-animate',
              )}
            >
              {MetricsContent}
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 xl:hidden">
          <div className="absolute left-[162px] top-[40px] w-[234px]">
            <div
              key={activeSlide}
              className={cn(
                'pointer-events-auto flex flex-col gap-3.5',
                !metricsReady && 'hero-metrics-hidden',
                metricsReady && 'hero-metrics-enter',
                metricsReady && 'hero-slide-animate',
              )}
            >
              {MetricsContent}
            </div>
          </div>
        </div>
      </div>
    </div>
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
  'hero-cta-lift inline-flex h-[40px] w-[170px] items-center justify-center rounded-[13px] bg-[var(--accent-1)] px-3.5 text-[12px] font-medium lowercase whitespace-nowrap text-[var(--accent-1-text)] sm:h-[42px] sm:w-[182px] sm:text-[13px] xl:h-[48px] xl:w-[284px] xl:rounded-[20px] xl:px-8 xl:text-[17px]';

  if (label.trim().toLowerCase() === 'познакомиться') {
    return (
      <button
        type="button"
        onClick={() => scrollToHeroScene('about')}
        className={className}
      >
        {label}
      </button>
    );
  }

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
      className="hero-cta-lift inline-flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-[13px] bg-[var(--surface)] text-[var(--text)] shadow-[0_4px_12px_rgba(38,41,46,0.05)] sm:h-[42px] sm:w-[42px] sm:rounded-[14px] xl:h-[48px] xl:w-[48px] xl:rounded-[18px]"
    >
      {children}
    </button>
  );
}
