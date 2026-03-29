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

function remap(value: number, inStart: number, inEnd: number) {
  return clamp((value - inStart) / (inEnd - inStart), 0, 1);
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
    const heroToServices = remap(progress, 0, 0.28);
    const servicesHold = remap(progress, 0.28, 0.72);
    const servicesToAbout = remap(progress, 0.72, 1);

    const servicesHeaderProgress = remap(progress, 0.20, 0.36);
    const servicesCardsProgress = remap(progress, 0.30, 0.58);

    return {
      heroLeftX: `${-120 * heroToServices}vw`,
      heroLeftBlur: `${12 * heroToServices}px`,
      heroLeftOpacity: 1 - 0.55 * heroToServices,

      heroRightX: `${120 * heroToServices}vw`,
      heroRightBlur: `${12 * heroToServices}px`,
      heroRightOpacity: 1 - 0.55 * heroToServices,

      servicesOpacity: clamp(heroToServices * 1.12, 0, 1) * (1 - 0.22 * servicesToAbout),
      servicesY: `${18 - 18 * heroToServices - 24 * servicesToAbout}px`,
      servicesBlur: `${10 * (1 - heroToServices) + 8 * servicesToAbout}px`,

      servicesHeaderProgress,
      servicesCardsProgress,

      aboutOpacity: clamp(servicesToAbout * 1.15, 0, 1),
      aboutY: `${32 - 32 * servicesToAbout}px`,
      aboutBlur: `${12 - 12 * servicesToAbout}px`,

      servicesHold,
    };
  }, [progress]);

  return (
    <section
      ref={rootRef}
      className="relative left-1/2 h-[360vh] w-screen -translate-x-1/2 overflow-x-clip"
    >
      <div className="sticky top-[92px] h-[calc(100vh-92px)] overflow-visible md:top-[104px] md:h-[calc(100vh-104px)] xl:top-[116px] xl:h-[calc(100vh-116px)]">
        <div className="relative h-full w-full">
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

          <div
            className={cn(
              'absolute inset-x-0 top-[-56px] bottom-[96px] z-20 md:top-[-64px] md:bottom-[104px] xl:top-[-72px] xl:bottom-[112px]',
              transforms.servicesOpacity > 0.02 ? 'pointer-events-auto' : 'pointer-events-none',
            )}
            style={{
              opacity: transforms.servicesOpacity,
              transform: `translateY(${transforms.servicesY})`,
              filter: `blur(${transforms.servicesBlur})`,
              transition: 'transform 80ms linear, filter 80ms linear, opacity 80ms linear',
            }}
          >
            <ServicesSection
              headerProgress={transforms.servicesHeaderProgress}
              cardsProgress={transforms.servicesCardsProgress}
            />
          </div>

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

          <div className="absolute inset-x-0 bottom-[28px] z-50 md:bottom-[32px] xl:bottom-[36px]">
            <SceneIndicator progress={progress} />
          </div>
        </div>
      </div>
    </section>
  );
}
