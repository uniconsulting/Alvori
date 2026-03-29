'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '@/lib/cn';
import { Container } from '@/components/layout/Container';
import { HeroLeftScene } from '@/components/sections/hero/HeroLeftScene';
import { HeroRightScene } from '@/components/sections/hero/HeroRightScene';
import { SceneIndicator } from '@/components/scroll/SceneIndicator';
import { ArrowRight } from 'lucide-react';

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
      <div className="sticky top-[92px] h-[calc(100vh-92px)] overflow-hidden md:top-[104px] md:h-[calc(100vh-104px)] xl:top-[116px] xl:h-[calc(100vh-116px)]">
        <div className="relative h-full w-full">
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

            <div
              className={cn(
                'absolute inset-0 z-20',
                transforms.servicesOpacity > 0.02 ? 'pointer-events-auto' : 'pointer-events-none',
              )}
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
              className={cn(
                'absolute inset-0 z-30',
                transforms.aboutOpacity > 0.02 ? 'pointer-events-auto' : 'pointer-events-none',
              )}
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
        <div className="flex flex-col gap-8 xl:gap-10">
          <div className="flex items-start justify-between gap-6">
            <h2 className="font-heading text-[64px] leading-[0.92] tracking-[-0.05em] text-[var(--text)]">
              Услуги
            </h2>

            <div className="pt-[10px] text-[18px] font-medium lowercase tracking-[-0.02em] text-[var(--text)]">
              главная -- услуги
            </div>
          </div>

          <div className="grid grid-cols-[1fr_1fr_1fr] gap-6">
            <ServiceCard
              title="Междугородние перевозки"
              description={
                <>
                  междугородние перевозки
                  <br />
                  регулярные b2b-перевозки по
                  <br />
                  ключевым направлениям по рф
                </>
              }
              ctaLabel="изучить географию"
            />

            <ServiceCard
              title="Межтерминальные перевозки"
              description={
                <>
                  работа между терминалами,
                  <br />
                  складами и распределительными
                  <br />
                  узлами с гарантией доставки тс
                </>
              }
              ctaLabel="обсудить условия"
            />

            <ServiceTallCard
              title="Экспедиционное направление"
              description={
                <>
                  подбор и сопровождение
                  <br />
                  перевозки под конкретную
                  <br />
                  логистическую задачу
                </>
              }
              ctaLabel="связаться с нами"
            />

            <ServiceCard
              title="Проектные перевозки"
              description={
                <>
                  перевозки под нестандартные
                  <br />
                  задачи и согласованные маршруты
                </>
              }
              ctaLabel="описать задачу"
            />

            <ServiceCard
              title="Опасные грузы"
              description={
                <>
                  перевозки ADR-грузов с соблюдением
                  <br />
                  требований и регламентов
                </>
              }
              ctaLabel="уточнить детали"
              accentLabel="ADR"
              isAdr
            />
          </div>
        </div>
      </Container>
    </div>
  );
}

function ServiceCard({
  title,
  description,
  ctaLabel,
  accentLabel,
  isAdr = false,
}: {
  title: string;
  description: React.ReactNode;
  ctaLabel: string;
  accentLabel?: string;
  isAdr?: boolean;
}) {
  if (isAdr) {
    return (
      <div className="relative rounded-[32px] p-[2px]">
        <div className="service-adr-border pointer-events-none absolute inset-0 rounded-[32px]" />
        <div className="relative flex h-[308px] flex-col rounded-[30px] bg-[var(--surface)] px-10 py-10">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-heading text-[28px] leading-[1.02] tracking-[-0.03em] text-[var(--text)]">
              {title}
            </h3>

            {accentLabel ? (
              <div className="pt-[2px] text-[24px] font-semibold leading-none tracking-[-0.03em] text-[var(--accent-1)]">
                {accentLabel}
              </div>
            ) : null}
          </div>

          <div
            className="mt-10 text-[18px] font-normal leading-[1.32] tracking-[-0.02em] text-[var(--text-muted)]"
            style={{ fontFamily: 'var(--font-body-text)' }}
          >
            {description}
          </div>

          <div className="mt-auto">
            <CardCTA label={ctaLabel} darkButton={false} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[308px] flex-col rounded-[32px] bg-[var(--surface)] px-10 py-10">
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-heading text-[28px] leading-[1.02] tracking-[-0.03em] text-[var(--text)]">
          {title}
        </h3>
      </div>

      <div
        className="mt-10 text-[18px] font-normal leading-[1.32] tracking-[-0.02em] text-[var(--text-muted)]"
        style={{ fontFamily: 'var(--font-body-text)' }}
      >
        {description}
      </div>

      <div className="mt-auto">
        <CardCTA label={ctaLabel} darkButton={false} />
      </div>
    </div>
  );
}

function ServiceTallCard({
  title,
  description,
  ctaLabel,
}: {
  title: string;
  description: React.ReactNode;
  ctaLabel: string;
}) {
  return (
    <div className="relative row-span-2 h-[640px] overflow-hidden rounded-[32px] bg-[var(--accent-2)]">
      <img
        src="/services/expedition-bg.webp"
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(38,41,46,0.10)_0%,rgba(38,41,46,0.16)_30%,rgba(38,41,46,0.48)_66%,rgba(38,41,46,0.88)_100%)]" />

      <div className="relative flex h-full flex-col px-10 py-10">
        <div className="mt-auto">
          <h3 className="font-heading text-[28px] leading-[1.04] tracking-[-0.03em] text-white">
            {title}
          </h3>

          <div
            className="mt-10 text-[18px] font-normal leading-[1.34] tracking-[-0.02em] text-white/88"
            style={{ fontFamily: 'var(--font-body-text)' }}
          >
            {description}
          </div>

          <div className="mt-10">
            <CardCTA label={ctaLabel} darkButton />
          </div>
        </div>
      </div>
    </div>
  );
}

function CardCTA({
  label,
  darkButton,
}: {
  label: string;
  darkButton: boolean;
}) {
  return (
    <div className="flex h-[68px] items-center justify-between rounded-[16px] bg-[var(--bg)] px-7">
      <span
        className={cn(
          'text-[20px] font-semibold lowercase leading-none tracking-[-0.02em]',
          darkButton ? 'text-white' : 'text-[var(--text)]',
        )}
        style={{ fontFamily: 'var(--font-body-text)' }}
      >
        {label}
      </span>

      <div
        className={cn(
          'inline-flex h-[52px] w-[78px] items-center justify-center rounded-[12px]',
          darkButton ? 'bg-[rgba(255,255,255,0.06)] text-white' : 'bg-[var(--surface)] text-[var(--text)]',
        )}
      >
        <ArrowRight size={30} strokeWidth={2.2} />
      </div>
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
