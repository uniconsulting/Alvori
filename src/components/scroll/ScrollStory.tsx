'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Container } from '@/components/layout/Container';
import { HeroLeftScene } from '@/components/sections/hero/HeroLeftScene';
import { HeroRightScene } from '@/components/sections/hero/HeroRightScene';
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
      heroLeftX: `${-120 * stage1}vw`,
      heroLeftBlur: `${12 * stage1}px`,
      heroLeftOpacity: 1 - 0.55 * stage1,

      heroRightX: `${120 * stage1}vw`,
      heroRightBlur: `${12 * stage1}px`,
      heroRightOpacity: 1 - 0.55 * stage1,

      servicesOpacity: clamp(stage1 * 1.15, 0, 1),
      servicesY: `${28 - 28 * stage1}px`,
      servicesBlur: `${14 - 14 * stage1}px`,

      aboutOpacity: clamp(stage2 * 1.15, 0, 1),
      aboutY: `${28 - 28 * stage2}px`,
      aboutBlur: `${14 - 14 * stage2}px`,
    };
  }, [progress]);

  return (
    <section
      ref={rootRef}
      className="relative left-1/2 h-[300vh] w-screen -translate-x-1/2 overflow-x-clip"
    >
      <div className="sticky top-[92px] md:top-[104px] xl:top-[116px] h-[calc(100vh-92px)] md:h-[calc(100vh-104px)] xl:h-[calc(100vh-116px)] overflow-hidden">
        <div className="relative h-full w-full">
          <div className="absolute inset-x-0 top-[64px] bottom-[88px] md:top-[72px] md:bottom-[96px] xl:top-[76px] xl:bottom-[104px]">
            <div className="absolute inset-0 z-10">
              <div
                className="absolute left-0 top-[-28px] w-[56vw] min-w-[780px]"
                style={{
                  transform: `translateX(${transforms.heroLeftX})`,
                  filter: `blur(${transforms.heroLeftBlur})`,
                  opacity: transforms.heroLeftOpacity,
                  transition: 'transform 80ms linear, filter 80ms linear, opacity 80ms linear',
                }}
              >
                <HeroLeftScene />
              </div>

              <Container className="relative h-full">
                <div
                  className="absolute top-[-6px] w-[540px]"
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
          </div>

          <div className="absolute inset-x-0 bottom-[28px] z-50 md:bottom-[32px] xl:bottom-[36px]">
            <SceneIndicator progress={progress} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesScene() {
  return (
    <div className="flex h-full items-center">
      <Container>
        <div className="w-full rounded-[40px] bg-[var(--surface)] p-8 shadow-[0_16px_40px_rgba(38,41,46,0.06)] md:p-10 xl:p-12">
          <div className="font-heading text-[32px] leading-none tracking-[-0.03em] text-[var(--text)] md:text-[44px]">
            услуги
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            <ServiceCard
              title="межтерминальные перевозки"
              text="работа между терминалами, складами и распределительными узлами."
            />
            <ServiceCard
              title="междугородние перевозки"
              text="регулярные b2b-перевозки по ключевым направлениям по рф."
            />
            <ServiceCard
              title="проектные перевозки"
              text="перевозки под нестандартные задачи и согласованные маршруты."
            />
            <ServiceCard
              title="опасные грузы (adr)"
              text="перевозки adr-грузов с соблюдением требований и регламентов."
            />
            <ServiceCard
              title="экспедиционное направление"
              text="подбор и сопровождение перевозки под конкретную логистическую задачу."
            />
            <ServiceCard
              title="сопровождение сделки"
              text="расчёт, согласование, перевозка и закрывающие документы."
            />
          </div>
        </div>
      </Container>
    </div>
  );
}

function AboutScene() {
  return (
    <div className="flex h-full items-center">
      <Container>
        <div className="w-full rounded-[40px] bg-[var(--surface)] p-8 shadow-[0_16px_40px_rgba(38,41,46,0.06)] md:p-10 xl:p-12">
          <div className="font-heading text-[32px] leading-none tracking-[-0.03em] text-[var(--text)] md:text-[44px]">
            о компании
          </div>

          <div className="mt-6 max-w-[920px] text-[18px] leading-[1.4] text-[var(--muted)]">
            алвори — логистический партнёр для b2b-клиентов по рф. работаем в формате
            собственного автопарка и экспедиционного направления, выстраивая понятный,
            прозрачный и управляемый цикл взаимодействия: заявка, расчёт, согласование,
            перевозка, документы.
          </div>
        </div>
      </Container>
    </div>
  );
}

function ServiceCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-[28px] bg-[var(--bg)] p-5 md:p-6">
      <div className="font-heading text-[22px] leading-[1.02] tracking-[-0.02em] text-[var(--text)]">
        {title}
      </div>
      <div className="mt-4 text-[16px] leading-[1.35] text-[var(--muted)]">
        {text}
      </div>
    </div>
  );
}
