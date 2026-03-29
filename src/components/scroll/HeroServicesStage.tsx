'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '@/lib/cn';
import { HeroLeftScene } from '@/components/sections/hero/HeroLeftScene';
import { HeroRightScene } from '@/components/sections/hero/HeroRightScene';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { About } from '@/components/sections/About';
import { SceneIndicator } from '@/components/scroll/SceneIndicator';
import { Container } from '@/components/layout/Container';

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export function HeroServicesStage() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const root = rootRef.current;
      if (!root) return;

      const rect = root.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const total = rect.height - viewportHeight;
      const passed = clamp(-rect.top, 0, total);
      const nextProgress = total <= 0 ? 0 : passed / total;

      setProgress(clamp(nextProgress, 0, 1));
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const transforms = useMemo(() => {
    const heroToServices = clamp(progress / 0.35, 0, 1);
    const servicesToAbout = clamp((progress - 0.68) / 0.32, 0, 1);

    return {
      heroLeftX: `${-120 * heroToServices}vw`,
      heroLeftBlur: `${12 * heroToServices}px`,
      heroLeftOpacity: 1 - 0.55 * heroToServices,

      heroRightX: `${120 * heroToServices}vw`,
      heroRightBlur: `${12 * heroToServices}px`,
      heroRightOpacity: 1 - 0.55 * heroToServices,

      servicesOpacity: clamp(heroToServices * 1.15, 0, 1),
      servicesY: `${18 - 18 * heroToServices}px`,
      servicesBlur: `${10 - 10 * heroToServices}px`,

      aboutOpacity: clamp(servicesToAbout * 1.15, 0, 1),
      aboutY: `${24 - 24 * servicesToAbout}px`,
      aboutBlur: `${12 - 12 * servicesToAbout}px`,
    };
  }, [progress]);

  return (
    <section
      ref={rootRef}
      className="relative left-1/2 h-[300vh] w-screen -translate-x-1/2 overflow-x-clip"
    >
      <div className="sticky top-[92px] h-[calc(100vh-92px)] overflow-visible md:top-[104px] md:h-[calc(100vh-104px)] xl:top-[116px] xl:h-[calc(100vh-116px)]">
        <div className="relative h-full w-full">
          {/* HERO — отдельный clipping-контейнер */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-x-0 top-[64px] bottom-[88px] md:top-[72px] md:bottom-[96px] xl:top-[76px] xl:bottom-[104px]">
              <div className="pointer-events-none absolute inset-0 z-10">
                <div
                  className="pointer-events-auto absolute left-0 top-[-28px] w-[56vw] min-w-[780px]"
                  style={{
                    transform: `translateX(${transforms.heroLeftX})`,
                    filter: `blur(${transforms.heroLeftBlur})`,
                    opacity: transforms.heroLeftOpacity,
                    transition: 'transform 80ms linear, filter 80ms linear, opacity 80ms linear',
                  }}
                >
                  <HeroLeftScene />
                </div>

                <Container className="pointer-events-none relative h-full">
                  <div
                    className="pointer-events-auto absolute top-[10px] w-[540px]"
                    style={{
                      right: 'max(16px, calc((100vw - 1440px) / 2 + 40px))',
                      transform: `translateX(${transforms.heroRightX})`,
                      filter: `blur(${transforms.heroRightBlur})`,
                      opacity: transforms.heroRightOpacity,
                      transition: 'transform 80ms linear, filter 80ms linear, opacity 80ms linear',
                    }}
                  >
                    <HeroRightScene />
                  </div>
                </Container>
              </div>
            </div>
          </div>

          {/* SERVICES — больше не режется сверху */}
          <div
            className={cn(
              'absolute inset-x-0 top-[-8px] bottom-[96px] z-20 md:top-[-12px] md:bottom-[104px] xl:top-[-16px] xl:bottom-[112px]',
              transforms.servicesOpacity > 0.02 ? 'pointer-events-auto' : 'pointer-events-none',
            )}
            style={{
              opacity: transforms.servicesOpacity,
              transform: `translateY(${transforms.servicesY})`,
              filter: `blur(${transforms.servicesBlur})`,
              transition: 'transform 80ms linear, filter 80ms linear, opacity 80ms linear',
            }}
          >
            <ServicesSection />
          </div>

          {/* ABOUT — тоже вне clipping Hero */}
          <div
            className={cn(
              'absolute inset-x-0 top-[36px] bottom-[96px] z-30 md:top-[40px] md:bottom-[104px] xl:top-[44px] xl:bottom-[112px]',
              transforms.aboutOpacity > 0.02 ? 'pointer-events-auto' : 'pointer-events-none',
            )}
            style={{
              opacity: transforms.aboutOpacity,
              transform: `translateY(${transforms.aboutY})`,
              filter: `blur(${transforms.aboutBlur})`,
              transition: 'transform 80ms linear, filter 80ms linear, opacity 80ms linear',
            }}
          >
            <About />
          </div>

          {/* PROGRESS */}
          <div className="absolute inset-x-0 bottom-[28px] z-50 md:bottom-[32px] xl:bottom-[36px]">
            <SceneIndicator progress={progress} />
          </div>
        </div>
      </div>
    </section>
  );
}
