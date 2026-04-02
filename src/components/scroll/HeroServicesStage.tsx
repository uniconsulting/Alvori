'use client';

import { usePathname, useRouter } from 'next/navigation';
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
  const handledSceneRef = useRef<string | null>(null);

  const pathname = usePathname();
  const router = useRouter();

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

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (pathname !== '/') return;

    const params = new URLSearchParams(window.location.search);
    const scene = params.get('scene');

    if (scene !== 'services' && scene !== 'about') return;
    if (handledSceneRef.current === scene) return;

    const root = rootRef.current;
    if (!root) return;

    handledSceneRef.current = scene;

    let raf1 = 0;
    let raf2 = 0;
    let timeoutId: number | null = null;
    let cleanupTimeoutId: number | null = null;

    const run = () => {
      raf1 = window.requestAnimationFrame(() => {
        raf2 = window.requestAnimationFrame(() => {
          timeoutId = window.setTimeout(() => {
            const rect = root.getBoundingClientRect();
            const pageTop = window.scrollY + rect.top;
            const maxScrollable = Math.max(root.offsetHeight - window.innerHeight, 0);

            const targetProgress = scene === 'services' ? 0.24 : 0.88;
            const targetY = pageTop + maxScrollable * targetProgress;

            window.scrollTo({
              top: targetY,
              behavior: 'smooth',
            });

            cleanupTimeoutId = window.setTimeout(() => {
              router.replace('/', { scroll: false });
            }, 220);
          }, 120);
        });
      });
    };

    run();

    return () => {
      if (raf1) window.cancelAnimationFrame(raf1);
      if (raf2) window.cancelAnimationFrame(raf2);
      if (timeoutId) window.clearTimeout(timeoutId);
      if (cleanupTimeoutId) window.clearTimeout(cleanupTimeoutId);
    };
  }, [pathname, router]);

  const transforms = useMemo(() => {
    const heroToServices = remap(progress, 0, 0.16);
    const servicesExit = remap(progress, 0.72, 0.84);
    const aboutEnter = remap(progress, 0.82, 0.94);

    const servicesHeaderProgress = remap(progress, 0.1, 0.22);
    const servicesCardsProgress = remap(progress, 0.2, 0.7);

    const aboutReveal = remap(progress, 0.82, 0.96);

    return {
      heroLeftX: `${-120 * heroToServices}vw`,
      heroLeftBlur: `${12 * heroToServices}px`,
      heroLeftOpacity: 1 - 0.55 * heroToServices,

      heroRightX: `${120 * heroToServices}vw`,
      heroRightBlur: `${12 * heroToServices}px`,
      heroRightOpacity: 1 - 0.55 * heroToServices,

      servicesOpacity:
        clamp(heroToServices * 1.12, 0, 1) *
        (1 - Math.pow(servicesExit, 1.35)),
      servicesY: `${18 - 18 * heroToServices - 240 * servicesExit}px`,
      servicesBlur: `${10 * (1 - heroToServices) + 18 * servicesExit}px`,

      servicesHeaderProgress,
      servicesCardsProgress,
      servicesExit,

      aboutOpacity: clamp(aboutEnter * 1.06, 0, 1),
      aboutY: `${34 - 34 * aboutEnter}px`,
      aboutBlur: `${8 - 8 * aboutEnter}px`,
      aboutReveal,
    };
  }, [progress]);

  return (
    <>
      <MobileHeroServicesStage />
      <DesktopHeroServicesStage
        rootRef={rootRef}
        progress={progress}
        transforms={transforms}
      />
    </>
  );
}

function MobileHeroServicesStage() {
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
    const heroExit = remap(progress, 0.12, 0.34);
    const servicesEnter = remap(progress, 0.22, 0.46);
    const servicesExit = remap(progress, 0.58, 0.76);
    const aboutEnter = remap(progress, 0.68, 0.92);

    return {
      heroOpacity: 1 - heroExit * 0.92,
      heroY: `${heroExit * -46}px`,
      heroBlur: `${heroExit * 8}px`,

      servicesOpacity: servicesEnter * (1 - servicesExit * 0.96),
      servicesY: `${28 - servicesEnter * 28 - servicesExit * 96}px`,
      servicesBlur: `${(1 - servicesEnter) * 10 + servicesExit * 10}px`,

      aboutOpacity: aboutEnter,
      aboutY: `${34 - aboutEnter * 34}px`,
      aboutBlur: `${(1 - aboutEnter) * 10}px`,
    };
  }, [progress]);

  return (
    <section ref={rootRef} className="relative h-[230vh] xl:hidden">
      <div className="sticky top-[92px] h-[calc(100vh-92px)] overflow-hidden">
        <div className="relative h-full w-full">
          <div className="absolute inset-x-0 top-0 z-40 px-[14px]">
            <div className="pt-2">
              <SceneIndicator progress={progress} />
            </div>
          </div>

          <div
            className="absolute inset-x-0 top-[44px] z-10"
            style={{
              opacity: transforms.heroOpacity,
              transform: `translateY(${transforms.heroY})`,
              filter: `blur(${transforms.heroBlur})`,
              transition: 'transform 90ms linear, filter 90ms linear, opacity 90ms linear',
            }}
          >
            <Container>
              <div className="flex flex-col gap-6">
                <HeroLeftScene />
                <HeroRightScene />
              </div>
            </Container>
          </div>

          <div
            className={cn(
              'absolute inset-x-0 top-[36px] z-20',
              transforms.servicesOpacity > 0.02 ? 'pointer-events-auto' : 'pointer-events-none',
            )}
            style={{
              opacity: transforms.servicesOpacity,
              transform: `translateY(${transforms.servicesY})`,
              filter: `blur(${transforms.servicesBlur})`,
              transition: 'transform 90ms linear, filter 90ms linear, opacity 90ms linear',
            }}
          >
            <ServicesSection headerProgress={1} cardsProgress={1} />
          </div>

          <div
            className={cn(
              'absolute inset-x-0 top-[36px] z-30',
              transforms.aboutOpacity > 0.02 ? 'pointer-events-auto' : 'pointer-events-none',
            )}
            style={{
              opacity: transforms.aboutOpacity,
              transform: `translateY(${transforms.aboutY})`,
              filter: `blur(${transforms.aboutBlur})`,
              transition: 'transform 90ms linear, filter 90ms linear, opacity 90ms linear',
            }}
          >
            <About revealProgress={1} />
          </div>
        </div>
      </div>
    </section>
  );
}

function DesktopHeroServicesStage({
  rootRef,
  progress,
  transforms,
}: {
  rootRef: React.RefObject<HTMLDivElement | null>;
  progress: number;
  transforms: {
    heroLeftX: string;
    heroLeftBlur: string;
    heroLeftOpacity: number;
    heroRightX: string;
    heroRightBlur: string;
    heroRightOpacity: number;
    servicesOpacity: number;
    servicesY: string;
    servicesBlur: string;
    servicesHeaderProgress: number;
    servicesCardsProgress: number;
    servicesExit: number;
    aboutOpacity: number;
    aboutY: string;
    aboutBlur: string;
    aboutReveal: number;
  };
}) {
  return (
    <section
      id="hero-services-stage"
      ref={rootRef}
      className="relative hidden h-[300vh] xl:block"
    >
      <div className="sticky top-[116px] h-[calc(100vh-116px)] overflow-visible">
        <div className="relative h-full w-full">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-x-0 top-[76px] bottom-[104px]">
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
              'absolute inset-x-0 top-[-72px] bottom-[112px] z-20',
              transforms.servicesOpacity > 0.02 && transforms.servicesExit < 0.98
                ? 'pointer-events-auto'
                : 'pointer-events-none',
            )}
            style={{
              opacity: transforms.servicesExit >= 0.98 ? 0 : transforms.servicesOpacity,
              transform: `translateY(${transforms.servicesY})`,
              filter: `blur(${transforms.servicesBlur})`,
              transition: 'transform 80ms linear, filter 80ms linear, opacity 80ms linear',
              visibility: transforms.servicesExit >= 0.98 ? 'hidden' : 'visible',
            }}
          >
            <ServicesSection
              headerProgress={transforms.servicesHeaderProgress}
              cardsProgress={transforms.servicesCardsProgress}
            />
          </div>

          <div
            className={cn(
              'absolute inset-x-0 top-[-72px] bottom-[112px] z-30',
              transforms.aboutOpacity > 0.02 ? 'pointer-events-auto' : 'pointer-events-none',
            )}
            style={{
              opacity: transforms.aboutOpacity,
              transform: `translateY(${transforms.aboutY})`,
              filter: `blur(${transforms.aboutBlur})`,
              transition: 'transform 90ms linear, filter 90ms linear, opacity 90ms linear',
            }}
          >
            <About revealProgress={transforms.aboutReveal} />
          </div>

          <div className="absolute inset-x-0 bottom-[36px] z-50">
            <SceneIndicator progress={progress} />
          </div>
        </div>
      </div>
    </section>
  );
}
