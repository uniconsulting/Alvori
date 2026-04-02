'use client';

import Link from 'next/link';
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
import { appRoutes } from '@/config/routes';
import { homeAnchorIds } from '@/config/anchors';

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
    <div id={homeAnchorIds.services} className="h-full scroll-mt-[120px]">
      <Container>
        <div className="px-[14px] md:px-[18px] xl:px-[22px]">
          <div className="flex flex-col gap-8 xl:gap-14">
            <div
              className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between xl:gap-6"
              style={headerRevealStyle(headerProgress)}
            >
              <h2 className="pl-[2px] font-heading text-[34px] leading-[0.94] tracking-[-0.045em] text-[var(--text)] md:text-[42px] xl:pl-[10px] xl:text-[52px]">
                Услуги
              </h2>

              <div className="xl:pr-[10px]">
                <ServicesBreadcrumb />
              </div>
            </div>

            <div className="xl:hidden">
              <ServicesMobileLayout progress={cardsProgress} />
            </div>

            <div className="hidden xl:grid xl:grid-cols-[1fr_1fr_1fr] xl:gap-5">
              <AnimatedCard progress={cardsProgress} delay={0.0}>
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
                  href={appRoutes.services.intercity}
                />
              </AnimatedCard>

              <AnimatedCard progress={cardsProgress} delay={0.2}>
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
                  href={appRoutes.services.interterminal}
                />
              </AnimatedCard>

              <AnimatedCard progress={cardsProgress} delay={0.4} className="row-span-2">
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
                  href={appRoutes.services.expedition}
                />
              </AnimatedCard>

              <AnimatedCard progress={cardsProgress} delay={0.6}>
                <ServiceCard
                  icon={Route}
                  title="Проектные перевозки"
                  description={
                    <>
                      перевозки под нестандартные
                      <br />
                      задачи и согласованные
                      <br />
                      маршруты по рф
                    </>
                  }
                  ctaLabel="описать задачу"
                  href={appRoutes.services.project}
                />
              </AnimatedCard>

              <AnimatedCard progress={cardsProgress} delay={0.8}>
                <ServiceCard
                  icon={ShieldAlert}
                  title="Опасные грузы"
                  description={
                    <>
                      перевозки ADR-грузов с соблюдением
                      <br />
                      требований и действующих
                      <br />
                      регламентов перевозки
                    </>
                  }
                  ctaLabel="уточнить детали"
                  accentLabel="ADR"
                  isAdr
                  href={appRoutes.services.adr}
                />
              </AnimatedCard>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

function ServicesMobileLayout({ progress }: { progress: number }) {
  return (
    <div className="flex flex-col gap-4">
      <AnimatedCard progress={progress} delay={0.0}>
        <div className="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex snap-x snap-mandatory gap-3">
            <div className="min-w-full snap-start">
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
                href={appRoutes.services.intercity}
                mobile
              />
            </div>

            <div className="min-w-full snap-start">
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
                href={appRoutes.services.interterminal}
                mobile
              />
            </div>

            <div className="min-w-full snap-start">
              <ServiceCard
                icon={Route}
                title="Проектные перевозки"
                description={
                  <>
                    перевозки под нестандартные
                    <br />
                    задачи и согласованные
                    <br />
                    маршруты по рф
                  </>
                }
                ctaLabel="описать задачу"
                href={appRoutes.services.project}
                mobile
              />
            </div>

            <div className="min-w-full snap-start">
              <ServiceCard
                icon={ShieldAlert}
                title="Опасные грузы"
                description={
                  <>
                    перевозки ADR-грузов с соблюдением
                    <br />
                    требований и действующих
                    <br />
                    регламентов перевозки
                  </>
                }
                ctaLabel="уточнить детали"
                accentLabel="ADR"
                isAdr
                href={appRoutes.services.adr}
                mobile
              />
            </div>
          </div>
        </div>
      </AnimatedCard>

      <AnimatedCard progress={progress} delay={0.18}>
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
          href={appRoutes.services.expedition}
          mobile
        />
      </AnimatedCard>
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
      style={revealStyle(progress, delay, 0.22, 20, 5, 0.994)}
    >
      {children}
    </div>
  );
}

function ServicesBreadcrumb() {
  return (
    <div className="inline-flex h-[38px] items-center rounded-[14px] bg-[var(--surface)] px-[14px] shadow-[0_8px_20px_rgba(38,41,46,0.04)] xl:h-[42px] xl:rounded-[16px] xl:px-[16px]">
      <span
        className="text-[13px] font-semibold lowercase tracking-[-0.02em] text-[var(--text)] xl:text-[14px]"
        style={{ fontFamily: 'var(--font-body-text)' }}
      >
        главная
      </span>

      <Dot size={16} className="mx-[2px] text-[var(--accent-1)] xl:size-[18px]" />

      <span
        className="text-[13px] font-semibold lowercase tracking-[-0.02em] text-[var(--text-muted)] xl:text-[14px]"
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
  href,
  accentLabel,
  isAdr = false,
  mobile = false,
}: {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  title: string;
  description: React.ReactNode;
  ctaLabel: string;
  href: string;
  accentLabel?: string;
  isAdr?: boolean;
  mobile?: boolean;
}) {
  const inner = (
    <div
      className={cn(
        'relative overflow-hidden bg-[var(--surface)]',
        mobile ? 'h-[248px] rounded-[22px]' : 'h-[262px] rounded-[26px]',
      )}
    >
      <div
        className={cn(
          'pointer-events-none absolute inset-0',
          mobile ? 'rounded-[22px]' : 'rounded-[26px]',
          isAdr ? 'border border-transparent' : 'border border-white/50',
        )}
      />

      <div
        className={cn(
          'relative flex h-full flex-col',
          mobile ? 'px-5 py-5' : 'px-8 py-8',
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-start gap-[10px]">
            <Icon
              size={mobile ? 17 : 18}
              strokeWidth={2.05}
              className="mt-[1px] shrink-0 text-[var(--text)]"
            />

            <h3
              className={cn(
                'min-w-0 truncate font-heading tracking-[-0.025em] text-[var(--text)]',
                mobile ? 'text-[16px] leading-[1.04] whitespace-nowrap' : 'text-[19px] leading-[1.08]',
              )}
            >
              {title}
            </h3>
          </div>

          {accentLabel ? (
            <div
              className={cn(
                'shrink-0 pt-[1px] font-semibold leading-none tracking-[-0.02em] text-[var(--accent-1)]',
                mobile ? 'text-[14px]' : 'text-[15px]',
              )}
            >
              {accentLabel}
            </div>
          ) : null}
        </div>

        <div
          className={cn(
            'font-normal tracking-[-0.012em] text-[var(--text-muted)]',
            mobile ? 'mt-6 min-h-[64px] text-[15px] leading-[1.34]' : 'mt-[32px] text-[16px] leading-[1.34]',
          )}
          style={{ fontFamily: 'var(--font-body-text)' }}
        >
          {description}
        </div>

        <div className={cn('mt-auto', mobile ? 'pt-6' : 'pt-[32px]')}>
          <CardCTA label={ctaLabel} darkButton={false} mobile={mobile} />
        </div>
      </div>
    </div>
  );

  return (
    <TiltCardShell mobile={mobile}>
      <Link href={href} className="block h-full">
        {isAdr ? (
          <div className={cn('relative p-[2px]', mobile ? 'rounded-[24px]' : 'rounded-[28px]')}>
            <div
              className={cn(
                'service-adr-border pointer-events-none absolute inset-0',
                mobile ? 'rounded-[24px]' : 'rounded-[28px]',
              )}
            />
            <div className={cn('relative bg-[var(--surface)]', mobile ? 'rounded-[22px]' : 'rounded-[26px]')}>
              {inner}
            </div>
          </div>
        ) : (
          <div className={cn(mobile ? 'rounded-[24px]' : 'rounded-[28px]')}>{inner}</div>
        )}
      </Link>
    </TiltCardShell>
  );
}

function ServiceTallCard({
  icon: Icon,
  title,
  description,
  ctaLabel,
  href,
  mobile = false,
}: {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  title: string;
  description: React.ReactNode;
  ctaLabel: string;
  href: string;
  mobile?: boolean;
}) {
  return (
    <TiltCardShell className={!mobile ? 'row-span-2' : undefined} mobile={mobile}>
      <Link href={href} className="block h-full">
        <div
          className={cn(
            'relative overflow-hidden bg-[var(--accent-2)]',
            mobile ? 'h-[248px] rounded-[24px]' : 'h-[548px] rounded-[28px]',
          )}
        >
          <img
            src={`${sitePath}/services/expedition-bg.webp`}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center"
          />

          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(38,41,46,0.08)_0%,rgba(38,41,46,0.14)_28%,rgba(38,41,46,0.46)_62%,rgba(38,41,46,0.90)_100%)]" />
          <div
            className={cn(
              'pointer-events-none absolute inset-0 border border-white/15',
              mobile ? 'rounded-[24px]' : 'rounded-[28px]',
            )}
          />

          <div
            className={cn(
              'relative flex h-full flex-col',
              mobile ? 'px-5 pt-5 pb-5' : 'px-8 pt-8 pb-[30px]',
            )}
          >
            <div className="mt-auto">
              <div className="flex min-w-0 items-start gap-[10px]">
                <Icon
                  size={mobile ? 17 : 18}
                  strokeWidth={2.05}
                  className="mt-[1px] shrink-0 text-white"
                />

                <h3
                  className={cn(
                    'min-w-0 truncate font-heading tracking-[-0.025em] text-white',
                    mobile ? 'text-[16px] leading-[1.04] whitespace-nowrap' : 'text-[19px] leading-[1.08]',
                  )}
                >
                  {title}
                </h3>
              </div>

              <div
                className={cn(
                  'font-normal tracking-[-0.012em] text-white/88',
                  mobile ? 'mt-6 min-h-[64px] text-[15px] leading-[1.34]' : 'mt-[32px] text-[16px] leading-[1.34]',
                )}
                style={{ fontFamily: 'var(--font-body-text)' }}
              >
                {description}
              </div>

              <div className={cn(mobile ? 'pt-6' : 'pt-[32px]')}>
                <CardCTA label={ctaLabel} darkButton mobile={mobile} />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </TiltCardShell>
  );
}

function TiltCardShell({
  children,
  className,
  mobile = false,
}: {
  children: React.ReactNode;
  className?: string;
  mobile?: boolean;
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
    if (mobile) return;

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
  }, [mobile]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (mobile) return;
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
    if (mobile) return;

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
        style={
          mobile
            ? undefined
            : {
                transform: `perspective(1400px) rotateX(${view.rotateX}deg) rotateY(${view.rotateY}deg) translateY(${view.y}px) scale(${view.scale})`,
                transition: 'transform 80ms linear',
              }
        }
      >
        {children}
      </div>
    </div>
  );
}

function CardCTA({
  label,
  darkButton,
  mobile = false,
}: {
  label: string;
  darkButton: boolean;
  mobile?: boolean;
}) {
  return (
    <div
      className={cn(
        'flex items-center',
        mobile ? 'h-[52px] rounded-[12px] pl-4 pr-[7px]' : 'h-[56px] rounded-[14px] pl-5 pr-[8px]',
        darkButton ? 'bg-[#31353b]' : 'bg-[var(--bg)]',
      )}
    >
      <span
        className={cn(
          'font-semibold lowercase leading-none tracking-[-0.02em]',
          mobile ? 'text-[15px]' : 'text-[16px]',
          darkButton ? 'text-white' : 'text-[var(--text)]',
        )}
        style={{ fontFamily: 'var(--font-body-text)' }}
      >
        {label}
      </span>

      <div
        className={cn(
          'ml-auto inline-flex shrink-0 items-center justify-center',
          mobile ? 'h-[38px] w-[54px] rounded-[10px]' : 'h-[40px] w-[58px] rounded-[10px]',
          darkButton ? 'bg-[#26292e] text-white' : 'bg-[var(--surface)] text-[var(--text)]',
        )}
      >
        <ArrowRight size={mobile ? 18 : 20} strokeWidth={2.1} />
      </div>
    </div>
  );
}
