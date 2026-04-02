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
              className="flex items-start justify-between gap-4 xl:items-center xl:gap-6"
              style={headerRevealStyle(headerProgress)}
            >
              <h2 className="pl-[2px] font-heading text-[34px] leading-[0.94] tracking-[-0.045em] text-[var(--text)] md:text-[42px] xl:pl-[10px] xl:text-[52px]">
                Услуги
              </h2>

              <div className="shrink-0 xl:pr-[10px]">
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
                      задачи и согласованные маршруты
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
                      требований и регламентов
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
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const frameRef = useRef<number | null>(null);
  const railDragRef = useRef(false);

  const [scrollProgress, setScrollProgress] = useState(0);

  const cardCount = 4;
  const baseMainIndices = [4, 9, 14, 19];
  const totalTicks = 24;

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const updateProgress = () => {
      const targets = cardRefs.current
        .map((node) => (node ? node.offsetLeft : 0))
        .slice(0, cardCount);

      if (targets.length < 2) {
        setScrollProgress(0);
        frameRef.current = null;
        return;
      }

      const scrollLeft = scroller.scrollLeft;
      let nextProgress = 0;

      for (let i = 0; i < targets.length - 1; i += 1) {
        const start = targets[i];
        const end = targets[i + 1];

        if (scrollLeft >= start && scrollLeft <= end) {
          const span = end - start || 1;
          const local = (scrollLeft - start) / span;
          nextProgress = i + local;
          setScrollProgress(nextProgress);
          frameRef.current = null;
          return;
        }
      }

      if (scrollLeft <= targets[0]) nextProgress = 0;
      else nextProgress = targets.length - 1;

      setScrollProgress(nextProgress);
      frameRef.current = null;
    };

    const requestUpdate = () => {
      if (frameRef.current !== null) return;
      frameRef.current = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();

    scroller.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      scroller.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const scrollToProgress = (nextProgress: number, smooth = true) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const targets = cardRefs.current
      .map((node) => (node ? node.offsetLeft : 0))
      .slice(0, cardCount);

    if (targets.length < 2) return;

    const clamped = clamp(nextProgress, 0, cardCount - 1);
    const index = Math.floor(clamped);
    const nextIndex = Math.min(index + 1, cardCount - 1);
    const local = clamped - index;

    const left = targets[index] + (targets[nextIndex] - targets[index]) * local;

    scroller.scrollTo({
      left,
      behavior: smooth ? 'smooth' : 'auto',
    });
  };

  const handleRailPointer = (clientX: number) => {
    const rail = railRef.current;
    if (!rail) return;

    const rect = rail.getBoundingClientRect();
    const localX = clamp((clientX - rect.left) / rect.width, 0, 1);
    const nextProgress = localX * (cardCount - 1);
    scrollToProgress(nextProgress, false);
  };

  const accentMarkerIndex = (() => {
    const currentIndex = Math.floor(scrollProgress);
    const local = scrollProgress - currentIndex;

    if (currentIndex >= baseMainIndices.length - 1) {
      return baseMainIndices[baseMainIndices.length - 1];
    }

    const start = baseMainIndices[currentIndex];
    const end = baseMainIndices[currentIndex + 1];

    return start + (end - start) * local;
  })();

  return (
    <div className="flex flex-col gap-4">
      <AnimatedCard progress={progress} delay={0.0}>
        <div
          ref={scrollerRef}
          className="flex snap-x snap-mandatory gap-3 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          <div
            ref={(node) => {
              cardRefs.current[0] = node;
            }}
            className="min-w-full snap-start"
          >
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
              mobileProgress={Math.abs(scrollProgress - 0)}
            />
          </div>

          <div
            ref={(node) => {
              cardRefs.current[1] = node;
            }}
            className="min-w-full snap-start"
          >
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
              mobileProgress={Math.abs(scrollProgress - 1)}
            />
          </div>

          <div
            ref={(node) => {
              cardRefs.current[2] = node;
            }}
            className="min-w-full snap-start"
          >
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
              mobileProgress={Math.abs(scrollProgress - 2)}
            />
          </div>

          <div
            ref={(node) => {
              cardRefs.current[3] = node;
            }}
            className="min-w-full snap-start"
          >
            <ServiceCard
              icon={ShieldAlert}
              title="Опасные грузы"
              description={
                <>
                  перевозки ADR-грузов,
                  <br />
                  с соблюдением действующих
                  <br />
                  регламентов перевозки
                </>
              }
              ctaLabel="уточнить детали"
              accentLabel="ADR"
              isAdr
              href={appRoutes.services.adr}
              mobile
              mobileProgress={Math.abs(scrollProgress - 3)}
            />
          </div>
        </div>
      </AnimatedCard>

      <AnimatedCard progress={progress} delay={0.14}>
        <ServicesMobileRail
          railRef={railRef}
          totalTicks={totalTicks}
          accentMarkerIndex={accentMarkerIndex}
          baseMainIndices={baseMainIndices}
          onTickClick={(index) => scrollToProgress(index, true)}
          onPointerDown={(event) => {
            railDragRef.current = true;
            handleRailPointer(event.clientX);
            event.currentTarget.setPointerCapture(event.pointerId);
          }}
          onPointerMove={(event) => {
            if (!railDragRef.current) return;
            handleRailPointer(event.clientX);
          }}
          onPointerUp={(event) => {
            railDragRef.current = false;
            event.currentTarget.releasePointerCapture(event.pointerId);
          }}
          onPointerCancel={() => {
            railDragRef.current = false;
          }}
        />
      </AnimatedCard>

      <AnimatedCard progress={progress} delay={0.22}>
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

function ServicesMobileRail({
  railRef,
  totalTicks,
  accentMarkerIndex,
  baseMainIndices,
  onTickClick,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerCancel,
}: {
  railRef: React.RefObject<HTMLDivElement | null>;
  totalTicks: number;
  accentMarkerIndex: number;
  baseMainIndices: number[];
  onTickClick: (index: number) => void;
  onPointerDown: (event: React.PointerEvent<HTMLDivElement>) => void;
  onPointerMove: (event: React.PointerEvent<HTMLDivElement>) => void;
  onPointerUp: (event: React.PointerEvent<HTMLDivElement>) => void;
  onPointerCancel: () => void;
}) {
  const mainToCardIndex = new Map<number, number>([
    [baseMainIndices[0], 0],
    [baseMainIndices[1], 1],
    [baseMainIndices[2], 2],
    [baseMainIndices[3], 3],
  ]);

  return (
    <div className="flex justify-center">
      <div
        ref={railRef}
        className="relative flex h-[52px] items-end gap-[8px] rounded-[18px] px-1 py-2 touch-pan-x"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
      >
        {Array.from({ length: totalTicks }, (_, index) => {
          const isMain = baseMainIndices.includes(index);
          const cardIndex = mainToCardIndex.get(index);

          const distanceToAccent = Math.abs(index - accentMarkerIndex);
          const isActiveMain = isMain && distanceToAccent < 0.5;
          const isTrail = !isMain && distanceToAccent < 0.65;

          let opacity = 1;

          if (index <= 3) {
            opacity = [0.1, 0.2, 0.4, 0.6][index] ?? 1;
          } else if (index >= totalTicks - 4) {
            opacity = [0.6, 0.4, 0.2, 0.1][index - (totalTicks - 4)] ?? 1;
          } else if (isMain) {
            opacity = 0.9;
          } else {
            opacity = 0.95;
          }

          const height = isMain ? (isActiveMain ? 42 : 31) : 22;
          const background = isActiveMain || isTrail ? 'var(--accent-1)' : 'var(--accent-2)';

          return (
            <button
              key={index}
              type="button"
              aria-label={cardIndex !== undefined ? `перейти к карточке ${cardIndex + 1}` : undefined}
              onClick={() => {
                if (cardIndex !== undefined) onTickClick(cardIndex);
              }}
              className={cn(
                'relative flex items-end justify-center',
                cardIndex !== undefined ? 'cursor-pointer' : 'cursor-default',
              )}
            >
              <span
                className="services-mobile-rail-tick block w-[3px] rounded-full"
                style={{
                  height: `${height}px`,
                  opacity,
                  background,
                }}
              />
            </button>
          );
        })}
      </div>
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
  mobileProgress = 0,
}: {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  title: string;
  description: React.ReactNode;
  ctaLabel: string;
  href: string;
  accentLabel?: string;
  isAdr?: boolean;
  mobile?: boolean;
  mobileProgress?: number;
}) {
  const mobileAmount = clamp(mobileProgress, 0, 1.15);
  const mobileDepth = 1 - clamp(mobileAmount / 1.15, 0, 1);

  const cardBody = (
    <div
      className={cn(
        'relative overflow-hidden bg-[var(--surface)]',
        mobile ? 'h-[258px] rounded-[22px]' : 'h-[262px] rounded-[26px]',
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
          mobile
            ? 'relative grid h-full grid-rows-[auto_1fr_auto] px-5 py-5'
            : 'relative flex h-full flex-col px-8 py-8',
        )}
      >
        {mobile ? (
          <>
            <div className="w-full">
              <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 items-start gap-[10px]">
                  <Icon
                    size={19}
                    strokeWidth={2.05}
                    className="mt-[1px] shrink-0 text-[var(--text)]"
                  />

                  <h3 className="min-w-0 truncate whitespace-nowrap font-heading text-[18px] leading-[1.04] tracking-[-0.025em] text-[var(--text)]">
                    {title}
                  </h3>
                </div>

                {accentLabel ? (
                  <div className="shrink-0 pt-[1px] text-[16px] font-semibold leading-none tracking-[-0.02em] text-[var(--accent-1)]">
                    {accentLabel}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="flex items-center">
              <div
                className="h-[66px] w-full text-[17px] font-normal leading-[1.28] tracking-[-0.012em] text-[var(--text-muted)]"
                style={{ fontFamily: 'var(--font-body-text)' }}
              >
                {description}
              </div>
            </div>

            <div>
              <CardCTA label={ctaLabel} darkButton={false} mobile />
            </div>
          </>
        ) : (
          <>
            <div className="flex items-start justify-between gap-4">
              <div className="flex min-w-0 items-start gap-[10px]">
                <Icon
                  size={18}
                  strokeWidth={2.05}
                  className="mt-[1px] shrink-0 text-[var(--text)]"
                />

                <h3 className="min-w-0 truncate font-heading text-[19px] leading-[1.08] tracking-[-0.025em] text-[var(--text)]">
                  {title}
                </h3>
              </div>

              {accentLabel ? (
                <div className="shrink-0 pt-[1px] text-[15px] font-semibold leading-none tracking-[-0.02em] text-[var(--accent-1)]">
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
          </>
        )}
      </div>
    </div>
  );

  const wrapped = isAdr ? (
    <div className={cn('relative p-[2px]', mobile ? 'rounded-[24px]' : 'rounded-[28px]')}>
      <div
        className={cn(
          'service-adr-border pointer-events-none absolute inset-0',
          mobile ? 'rounded-[24px]' : 'rounded-[28px]',
        )}
      />
      <div className={cn('relative bg-[var(--surface)]', mobile ? 'rounded-[22px]' : 'rounded-[26px]')}>
        {cardBody}
      </div>
    </div>
  ) : (
    <div className={cn(mobile ? 'rounded-[24px]' : 'rounded-[28px]')}>{cardBody}</div>
  );

  return (
    <TiltCardShell mobile={mobile}>
      <Link href={href} className="block h-full">
        <div
          style={
            mobile
              ? {
                  transform: `perspective(1400px) rotateY(${(1 - mobileDepth) * -18}deg) translateX(${(1 - mobileDepth) * -14}px) scale(${0.94 + mobileDepth * 0.06})`,
                  opacity: 0.72 + mobileDepth * 0.28,
                  transformOrigin: 'center center',
                }
              : undefined
          }
        >
          {wrapped}
        </div>
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
            mobile ? 'h-[316px] rounded-[24px]' : 'h-[548px] rounded-[28px]',
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
              mobile
                ? 'relative grid h-full grid-rows-[auto_1fr_auto] px-5 py-5'
                : 'relative flex h-full flex-col px-8 pt-8 pb-[30px]',
            )}
          >
            {mobile ? (
              <>
                <div className="w-full pt-[64px]">
                  <div className="flex min-w-0 items-start gap-[10px]">
                    <Icon
                      size={19}
                      strokeWidth={2.05}
                      className="mt-[1px] shrink-0 text-white"
                    />

                    <h3 className="min-w-0 truncate whitespace-nowrap font-heading text-[18px] leading-[1.04] tracking-[-0.025em] text-white">
                      {title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center">
                  <div
                    className="h-[66px] w-full text-[17px] font-normal leading-[1.28] tracking-[-0.012em] text-white/88"
                    style={{ fontFamily: 'var(--font-body-text)' }}
                  >
                    {description}
                  </div>
                </div>

                <div>
                  <CardCTA label={ctaLabel} darkButton mobile />
                </div>
              </>
            ) : (
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
            )}
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
      style={
        mobile
          ? {
              transform: 'perspective(1400px) translateZ(0)',
              willChange: 'transform',
            }
          : undefined
      }
    >
      <div
        style={
          mobile
            ? {
                transition: 'transform 220ms cubic-bezier(0.22,1,0.36,1), opacity 220ms cubic-bezier(0.22,1,0.36,1)',
              }
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
        mobile ? 'h-[54px] rounded-[12px] pl-4 pr-[7px]' : 'h-[56px] rounded-[14px] pl-5 pr-[8px]',
        darkButton ? 'bg-[#31353b]' : 'bg-[var(--bg)]',
      )}
    >
      <span
        className={cn(
          'font-semibold lowercase leading-none tracking-[-0.02em]',
          mobile ? 'text-[17px]' : 'text-[16px]',
          darkButton ? 'text-white' : 'text-[var(--text)]',
        )}
        style={{ fontFamily: 'var(--font-body-text)' }}
      >
        {label}
      </span>

      <div
        className={cn(
          'ml-auto inline-flex shrink-0 items-center justify-center',
          mobile ? 'h-[40px] w-[58px] rounded-[10px]' : 'h-[40px] w-[58px] rounded-[10px]',
          darkButton ? 'bg-[#26292e] text-white' : 'bg-[var(--surface)] text-[var(--text)]',
        )}
      >
        <ArrowRight size={20} strokeWidth={2.1} />
      </div>
    </div>
  );
}
