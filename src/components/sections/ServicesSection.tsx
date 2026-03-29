'use client';

import {
  ArrowRight,
  Dot,
  Network,
  Route,
  ShieldAlert,
  Truck,
  Warehouse,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/cn';
import { Container } from '@/components/layout/Container';
import { sitePath } from '@/lib/site-path';

type TiltView = {
  rotateX: number;
  rotateY: number;
  y: number;
  scale: number;
};

type ServicesSectionProps = {
  headerProgress?: number;
  cardsProgress?: number;
};

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function revealStyle(
  progress: number,
  delay = 0,
  span = 0.18,
  distance = 18,
  blur = 10,
  scale = 0.988,
) {
  const local = clamp((progress - delay) / span, 0, 1);
  const eased = easeOutCubic(local);

  return {
    opacity: eased,
    transform: `translate3d(0, ${distance * (1 - eased)}px, 0) scale(${scale + (1 - scale) * eased})`,
    filter: `blur(${blur * (1 - eased)}px)`,
    transition: 'transform 120ms linear, filter 120ms linear, opacity 120ms linear',
  } as const;
}

function headerRevealStyle(progress: number) {
  const local = clamp(progress / 0.22, 0, 1);
  const eased = easeOutCubic(local);

  return {
    opacity: eased,
    transform: `translate3d(0, ${26 * (1 - eased)}px, 0)`,
    filter: `blur(${8 * (1 - eased)}px)`,
    transition: 'transform 120ms linear, filter 120ms linear, opacity 120ms linear',
  } as const;
}

export function ServicesSection({
  headerProgress = 1,
  cardsProgress = 1,
}: ServicesSectionProps) {
  return (
    <div className="h-full">
      <Container>
        <div className="px-[14px] md:px-[18px] xl:px-[22px]">
          <div className="flex flex-col gap-12 xl:gap-14">
            <div
              className="flex items-center justify-between gap-6"
              style={headerRevealStyle(headerProgress)}
            >
              <h2 className="pl-[10px] font-heading text-[52px] leading-[0.94] tracking-[-0.045em] text-[var(--text)]">
                Услуги
              </h2>

              <div className="pr-[10px]">
                <ServicesBreadcrumb />
              </div>
            </div>

            <div className="grid grid-cols-[1fr_1fr_1fr] gap-5">
              <AnimatedCard progress={cardsProgress} delay={0.00}>
                <ServiceCard
                  icon={Truck}
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
              </AnimatedCard>

              <AnimatedCard progress={cardsProgress} delay={0.20}>
                <ServiceCard
                  icon={Warehouse}
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
              </AnimatedCard>

              <AnimatedCard progress={cardsProgress} delay={0.40} className="row-span-2">
                <ServiceTallCard
                  icon={Network}
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
              </AnimatedCard>

              <AnimatedCard progress={cardsProgress} delay={0.60}>
                <ServiceCard
                  icon={Route}
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
              </AnimatedCard>

              <AnimatedCard progress={cardsProgress} delay={0.80}>
                <ServiceCard
                  icon={ShieldAlert}
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
              </AnimatedCard>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

function AnimatedCard({
  children,
  progress,
  delay,
  className,
}: {
  children: React.ReactNode;
  progress: number;
  delay: number;
  className?: string;
}) {
  return (
    <div
      className={className}
      style={revealStyle(progress, delay, 0.18, 20, 6, 0.992)}
    >
      {children}
    </div>
  );
}

function ServicesBreadcrumb() {
  return (
    <div className="inline-flex h-[42px] items-center rounded-[16px] bg-[var(--surface)] px-[16px] shadow-[0_8px_20px_rgba(38,41,46,0.04)]">
      <span
        className="text-[14px] font-semibold lowercase tracking-[-0.02em] text-[var(--text)]"
        style={{ fontFamily: 'var(--font-body-text)' }}
      >
        главная
      </span>

      <Dot size={18} className="mx-[2px] text-[var(--accent-1)]" />

      <span
        className="text-[14px] font-semibold lowercase tracking-[-0.02em] text-[var(--text-muted)]"
        style={{ fontFamily: 'var(--font-body-text)' }}
      >
        услуги
      </span>
    </div>
  );
}

function ServiceCard({
  icon: Icon,
  title,
  description,
  ctaLabel,
  accentLabel,
  isAdr = false,
}: {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  title: string;
  description: React.ReactNode;
  ctaLabel: string;
  accentLabel?: string;
  isAdr?: boolean;
}) {
  const inner = (
    <div className="relative h-[262px] overflow-hidden rounded-[26px] bg-[var(--surface)]">
      <div
        className={cn(
          'pointer-events-none absolute inset-0 rounded-[26px]',
          isAdr ? 'border border-transparent' : 'border border-white/50',
        )}
      />

      <div className="relative flex h-full flex-col px-8 py-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-[10px]">
            <Icon size={18} strokeWidth={2.05} className="mt-[1px] shrink-0 text-[var(--text)]" />

            <h3 className="font-heading text-[19px] leading-[1.08] tracking-[-0.025em] text-[var(--text)]">
              {title}
            </h3>
          </div>

          {accentLabel ? (
            <div className="pt-[1px] text-[15px] font-semibold leading-none tracking-[-0.02em] text-[var(--accent-1)]">
              {accentLabel}
            </div>
          ) : null}
        </div>

        <div
          className="mt-[32px] text-[16px] font-normal leading-[1.34] tracking-[-0.012em] text-[var(--text-muted)]"
          style={{ fontFamily: 'var(--font-body-text)' }}
        >
          {description}
        </div>

        <div className="mt-auto pt-[32px]">
          <CardCTA label={ctaLabel} darkButton={false} />
        </div>
      </div>
    </div>
  );

  return (
    <TiltCardShell>
      {isAdr ? (
        <div className="relative rounded-[28px] p-[2px]">
          <div className="service-adr-border pointer-events-none absolute inset-0 rounded-[28px]" />
          <div className="relative rounded-[26px] bg-[var(--surface)]">{inner}</div>
        </div>
      ) : (
        <div className="rounded-[28px]">{inner}</div>
      )}
    </TiltCardShell>
  );
}

function ServiceTallCard({
  icon: Icon,
  title,
  description,
  ctaLabel,
}: {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  title: string;
  description: React.ReactNode;
  ctaLabel: string;
}) {
  return (
    <TiltCardShell className="row-span-2">
      <div className="relative h-[548px] overflow-hidden rounded-[28px] bg-[var(--accent-2)]">
        <img
          src={`${sitePath}/services/expedition-bg.webp`}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(38,41,46,0.08)_0%,rgba(38,41,46,0.14)_28%,rgba(38,41,46,0.46)_62%,rgba(38,41,46,0.90)_100%)]" />
        <div className="pointer-events-none absolute inset-0 rounded-[28px] border border-white/15" />

        <div className="relative flex h-full flex-col px-8 pt-8 pb-[30px]">
          <div className="mt-auto">
            <div className="flex items-start gap-[10px]">
              <Icon size={18} strokeWidth={2.05} className="mt-[1px] shrink-0 text-white" />

              <h3 className="font-heading text-[19px] leading-[1.08] tracking-[-0.025em] text-white">
                {title}
              </h3>
            </div>

            <div
              className="mt-[32px] text-[16px] font-normal leading-[1.34] tracking-[-0.012em] text-white/88"
              style={{ fontFamily: 'var(--font-body-text)' }}
            >
              {description}
            </div>

            <div className="pt-[32px]">
              <CardCTA label={ctaLabel} darkButton />
            </div>
          </div>
        </div>
      </div>
    </TiltCardShell>
  );
}

function TiltCardShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const currentRef = useRef<TiltView>({
    rotateX: 0,
    rotateY: 0,
    y: 0,
    scale: 1,
  });

  const targetRef = useRef<TiltView>({
    rotateX: 0,
    rotateY: 0,
    y: 0,
    scale: 1,
  });

  const velocityRef = useRef<TiltView>({
    rotateX: 0,
    rotateY: 0,
    y: 0,
    scale: 0,
  });

  const frameRef = useRef<number | null>(null);

  const [view, setView] = useState<TiltView>({
    rotateX: 0,
    rotateY: 0,
    y: 0,
    scale: 1,
  });

  useEffect(() => {
    const stiffness = 0.14;
    const damping = 0.78;

    const step = () => {
      const current = currentRef.current;
      const target = targetRef.current;
      const velocity = velocityRef.current;

      (Object.keys(current) as Array<keyof TiltView>).forEach((key) => {
        const force = (target[key] - current[key]) * stiffness;
        velocity[key] = (velocity[key] + force) * damping;
        current[key] = current[key] + velocity[key];
      });

      setView({ ...currentRef.current });
      frameRef.current = requestAnimationFrame(step);
    };

    frameRef.current = requestAnimationFrame(step);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1024) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    targetRef.current = {
      rotateX: (0.5 - py) * 6,
      rotateY: (px - 0.5) * 6,
      y: -2,
      scale: 1.006,
    };
  };

  const handleMouseLeave = () => {
    targetRef.current = {
      rotateX: 0,
      rotateY: 0,
      y: 0,
      scale: 1,
    };
  };

  return (
    <div
      className={cn('relative [perspective:1400px]', className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        style={{
          transform: `perspective(1400px) rotateX(${view.rotateX}deg) rotateY(${view.rotateY}deg) translateY(${view.y}px) scale(${view.scale})`,
          transition: 'transform 80ms linear',
        }}
      >
        {children}
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
    <div
      className={cn(
        'flex h-[56px] items-center rounded-[14px] pl-5 pr-[8px]',
        darkButton ? 'bg-[#31353b]' : 'bg-[var(--bg)]',
      )}
    >
      <span
        className={cn(
          'text-[16px] font-semibold lowercase leading-none tracking-[-0.02em]',
          darkButton ? 'text-white' : 'text-[var(--text)]',
        )}
        style={{ fontFamily: 'var(--font-body-text)' }}
      >
        {label}
      </span>

      <div
        className={cn(
          'ml-auto inline-flex h-[40px] w-[58px] shrink-0 items-center justify-center rounded-[10px]',
          darkButton ? 'bg-[#26292e] text-white' : 'bg-[var(--surface)] text-[var(--text)]',
        )}
      >
        <ArrowRight size={20} strokeWidth={2.1} />
      </div>
    </div>
  );
}
