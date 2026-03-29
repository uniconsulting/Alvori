'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '@/lib/cn';
import { Container } from '@/components/layout/Container';
import { HeroLeftScene } from '@/components/sections/hero/HeroLeftScene';
import { HeroRightScene } from '@/components/sections/hero/HeroRightScene';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { SceneIndicator } from '@/components/scroll/SceneIndicator';

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
    const heroExit = clamp(progress / 0.38, 0, 1);
    const servicesReveal = clamp((progress - 0.12) / 0.32, 0, 1);

    return {
      heroLeftX: `${-120 * heroExit}vw`,
      heroLeftBlur: `${12 * heroExit}px`,
      heroLeftOpacity: 1 - 0.55 * heroExit,

      heroRightX: `${120 * heroExit}vw`,
      heroRightBlur: `${12 * heroExit}px`,
      heroRightOpacity: 1 - 0.55 * heroExit,

      servicesOpacity: clamp(servicesReveal * 1.15, 0, 1),
      servicesY: `${18 - 18 * servicesReveal}px`,
      servicesBlur: `${10 - 10 * servicesReveal}px`,
    };
  }, [progress]);

  return (
    <section
      ref={rootRef}
      className="relative left-1/2 h-[230vh] w-screen -translate-x-1/2 overflow-x-clip"
    >
      <div className="sticky top-[92px] h-[calc(100vh-92px)] overflow-hidden md:top-[104px] md:h-[calc(100vh-104px)] xl:top-[116px] xl:h-[calc(100vh-116px)]">
        <div className="relative h-full w-full">
          <div className="absolute inset-0 z-10">
            <div className="pointer-events-none absolute inset-x-0 top-[64px] bottom-[88px] md:top-[72px] md:bottom-[96px] xl:top-[76px] xl:bottom-[104px]">
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

          <div className="absolute inset-x-0 bottom-[28px] z-50 md:bottom-[32px] xl:bottom-[36px]">
            <SceneIndicator progress={progress < 0.5 ? progress * 2 : 1} />
          </div>
        </div>
      </div>
    </section>
  );
}
