'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Hero } from '@/components/sections/Hero';
import { SceneIndicator } from '@/components/scroll/SceneIndicator';

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export function ScrollStory() {
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
    const stage1 = clamp(progress / 0.5, 0, 1);
    const stage2 = clamp((progress - 0.5) / 0.5, 0, 1);

    return {
      heroLeftX: `${-220 * stage1}px`,
      heroLeftBlur: `${10 * stage1}px`,
      heroLeftOpacity: 1 - 0.35 * stage1,

      heroRightX: `${220 * stage1}px`,
      heroRightBlur: `${10 * stage1}px`,
      heroRightOpacity: 1 - 0.35 * stage1,

      servicesOpacity: clamp(stage1 * 1.15, 0, 1),
      servicesY: `${24 - 24 * stage1}px`,
      servicesBlur: `${12 - 12 * stage1}px`,

      aboutOpacity: clamp(stage2 * 1.15, 0, 1),
      aboutY: `${24 - 24 * stage2}px`,
      aboutBlur: `${12 - 12 * stage2}px`,
    };
  }, [progress]);

  return (
    <section ref={rootRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="relative h-full w-full">
          <div
            className="absolute inset-0 z-10"
            style={{
              opacity: 1,
            }}
          >
            <div
              className="absolute inset-y-0 left-0 right-1/2"
              style={{
                transform: `translateX(${transforms.heroLeftX})`,
                filter: `blur(${transforms.heroLeftBlur})`,
                opacity: transforms.heroLeftOpacity,
                transition: 'transform 80ms linear, filter 80ms linear, opacity 80ms linear',
              }}
            >
              <HeroSplitProxy side="left" />
            </div>

            <div
              className="absolute inset-y-0 left-1/2 right-0"
              style={{
                transform: `translateX(${transforms.heroRightX})`,
                filter: `blur(${transforms.heroRightBlur})`,
                opacity: transforms.heroRightOpacity,
                transition: 'transform 80ms linear, filter 80ms linear, opacity 80ms linear',
              }}
            >
              <HeroSplitProxy side="right" />
            </div>
          </div>

          <div
            className="absolute inset-0 z-20"
            style={{
              opacity: transforms.servicesOpacity,
              transform: `translateY(${transforms.servicesY})`,
              filter: `blur(${transforms.servicesBlur})`,
              transition: 'transform 80ms linear, filter 80ms linear, opacity 80ms linear',
            }}
          >
            <ServicesScene />
          </div>

          <div
            className="absolute inset-0 z-30"
            style={{
              opacity: transforms.aboutOpacity,
              transform: `translateY(${transforms.aboutY})`,
              filter: `blur(${transforms.aboutBlur})`,
              transition: 'transform 80ms linear, filter 80ms linear, opacity 80ms linear',
            }}
          >
            <AboutScene />
          </div>

          <SceneIndicator progress={progress} />
        </div>
      </div>
    </section>
  );
}

function HeroSplitProxy({ side }: { side: 'left' | 'right' }) {
  return (
    <div className="h-full w-[200%] overflow-hidden">
      <div
        className={
          side === 'left'
            ? 'h-full w-full'
            : 'h-full w-full -translate-x-1/2'
        }
      >
        <Hero />
      </div>
    </div>
  );
}

function ServicesScene() {
  return (
    <div className="flex h-full items-center justify-center px-4">
      <div className="w-full max-w-[1320px] rounded-[40px] bg-[var(--surface)] p-8 shadow-[0_16px_40px_rgba(38,41,46,0.06)]">
        <div className="font-heading text-[32px] leading-none tracking-[-0.03em] text-[var(--text)] md:text-[44px]">
          услуги
        </div>
        <div className="mt-6 text-[18px] leading-[1.35] text-[var(--muted)]">
          здесь будет сцена секции «Услуги»
        </div>
      </div>
    </div>
  );
}

function AboutScene() {
  return (
    <div className="flex h-full items-center justify-center px-4">
      <div className="w-full max-w-[1320px] rounded-[40px] bg-[var(--surface)] p-8 shadow-[0_16px_40px_rgba(38,41,46,0.06)]">
        <div className="font-heading text-[32px] leading-none tracking-[-0.03em] text-[var(--text)] md:text-[44px]">
          о компании
        </div>
        <div className="mt-6 text-[18px] leading-[1.35] text-[var(--muted)]">
          здесь будет сцена секции «О компании»
        </div>
      </div>
    </div>
  );
}
