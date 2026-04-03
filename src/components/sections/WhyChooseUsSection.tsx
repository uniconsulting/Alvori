'use client';

import {
  Clock3,
  Dot,
  FileText,
  ShieldCheck,
  SlidersHorizontal,
  Truck,
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Container } from '@/components/layout/Container';
import { sitePath } from '@/lib/site-path';

type TiltView = {
  rotateX: number;
  rotateY: number;
  y: number;
  scale: number;
};

type WhyCardItem = {
  id: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  title: string;
  description: React.ReactNode;
  imageSrc: string;
  kind: 'compact' | 'medium' | 'tall';
  showArrow?: boolean;
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

const WHY_CARDS: WhyCardItem[] = [
  {
    id: 'control',
    icon: Clock3,
    title: 'Контроль сроков',
    description: (
      <>
        Следим за движением
        <br />
        и соблюдением сроков.
      </>
    ),
    imageSrc: `${sitePath}/why-choose-us/control-card-bg.webp`,
    kind: 'compact',
  },
  {
    id: 'docs',
    icon: FileText,
    title: 'Документы',
    description: (
      <>
        Закрывающий контур
        <br />
        и комплект документов.
      </>
    ),
    imageSrc: `${sitePath}/why-choose-us/docs-card-bg.webp`,
    kind: 'compact',
  },
  {
    id: 'client',
    icon: SlidersHorizontal,
    title: 'Под задачу клиента',
    description: (
      <>
        Собираем маршрут
        <br />
        и формат работы под задачу,
        <br />
        сопровождая индивидуальным подходом.
      </>
    ),
    imageSrc: `${sitePath}/why-choose-us/client-card-bg.webp`,
    kind: 'medium',
  },
  {
    id: 'terms',
    icon: ShieldCheck,
    title: 'Прозрачные условия',
    description: (
      <>
        Понятная логика взаимодействия,
        <br />
        согласованные условия
        <br />
        и без лишней сложности.
      </>
    ),
    imageSrc: `${sitePath}/why-choose-us/terms-card-bg.webp`,
    kind: 'medium',
  },
  {
    id: 'fleet',
    icon: Truck,
    title: 'Собственный автопарк',
    description: (
      <>
        позволяет держать качество
        <br />
        исполнения под контролем и обеспечивать
        <br />
        предсказуемость работы
      </>
    ),
    imageSrc: `${sitePath}/why-choose-us/fleet-card-bg.webp`,
    kind: 'tall',
    showArrow: true,
  },
];

export function WhyChooseUsSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsActive(true);
      },
      {
        threshold: 0.16,
        rootMargin: '120px 0px 120px 0px',
      },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div id="why-choose-us" ref={sectionRef} className="h-full">
      <Container>
        <div className="px-[14px] md:px-[18px] xl:px-[22px]">
          <div className="flex flex-col gap-8 xl:gap-10">
            <div
              className={cn(
                'transition-[opacity,transform,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
                isActive
                  ? 'translate-y-0 opacity-100 blur-0'
                  : 'translate-y-[18px] opacity-0 blur-[10px]',
              )}
            >
              <div className="flex items-start justify-between gap-6">
                <h2 className="font-heading text-[34px] leading-[0.94] tracking-[-0.045em] text-[var(--text)] md:text-[42px] xl:text-[52px]">
                  Почему выбирают нас
                </h2>

                <div className="hidden xl:block">
                  <WhyChooseUsBreadcrumb />
                </div>
              </div>

              <div className="mt-8">
                <p
                  className="max-w-[760px] text-[18px] font-normal leading-[1.28] tracking-[-0.018em] text-[var(--text)] md:text-[19px] xl:text-[20px]"
                  style={{ fontFamily: 'var(--font-body-text)' }}
                >
                  Нас выбирают за понятные условия,
                  <br />
                  контроль исполнения и устойчивую
                  <br />
                  логистику под задачу бизнеса.
                </p>
              </div>
            </div>

            <div className="xl:hidden">
              <WhyChooseUsMobileStack cards={WHY_CARDS} />
            </div>

            <div className="hidden grid-cols-[1fr_1fr_1fr] grid-rows-[156px_364px] gap-5 xl:grid">
              <RevealCard
                isActive={isActive}
                delayMs={140}
                className="row-span-2 h-[540px] self-start"
              >
                <WhyCardTallImage
                  icon={Truck}
                  title="Собственный автопарк"
                  description={
                    <>
                      позволяет держать качество
                      <br />
                      исполнения под контролем и обеспечивать
                      <br />
                      предсказуемость работы
                    </>
                  }
                  imageSrc={`${sitePath}/why-choose-us/fleet-card-bg.webp`}
                  showArrow
                />
              </RevealCard>

              <RevealCard isActive={isActive} delayMs={240} className="h-[156px] self-start">
                <WhyCardCompactImage
                  icon={Clock3}
                  title="Контроль сроков"
                  description={
                    <>
                      Следим за движением
                      <br />
                      и соблюдением сроков.
                    </>
                  }
                  imageSrc={`${sitePath}/why-choose-us/control-card-bg.webp`}
                />
              </RevealCard>

              <RevealCard isActive={isActive} delayMs={340} className="h-[156px] self-start">
                <WhyCardCompactImage
                  icon={FileText}
                  title="Документы"
                  description={
                    <>
                      Закрывающий контур
                      <br />
                      и комплект документов.
                    </>
                  }
                  imageSrc={`${sitePath}/why-choose-us/docs-card-bg.webp`}
                />
              </RevealCard>

              <RevealCard isActive={isActive} delayMs={440} className="h-[364px] self-start">
                <WhyCardMediumImage
                  icon={SlidersHorizontal}
                  title="Под задачу клиента"
                  description={
                    <>
                      Собираем маршрут
                      <br />
                      и формат работы под задачу,
                      <br />
                      сопровождая индивидуальным подходом.
                    </>
                  }
                  imageSrc={`${sitePath}/why-choose-us/client-card-bg.webp`}
                />
              </RevealCard>

              <RevealCard isActive={isActive} delayMs={540} className="h-[364px] self-start">
                <WhyCardMediumImage
                  icon={ShieldCheck}
                  title="Прозрачные условия"
                  description={
                    <>
                      Понятная логика взаимодействия,
                      <br />
                      согласованные условия
                      <br />
                      и без лишней сложности.
                    </>
                  }
                  imageSrc={`${sitePath}/why-choose-us/terms-card-bg.webp`}
                />
              </RevealCard>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

function WhyChooseUsMobileStack({ cards }: { cards: WhyCardItem[] }) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;

    const handleScroll = () => {
      if (raf) return;

      raf = window.requestAnimationFrame(() => {
        raf = 0;

        const root = rootRef.current;
        if (!root) return;

        const rect = root.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const total = Math.max(root.offsetHeight - viewportHeight, 1);
        const passed = Math.min(Math.max(-rect.top, 0), total);

        setProgress(passed / total);
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  const floatIndex = progress * (cards.length - 1);
  const currentIndex = Math.floor(floatIndex);
  const nextIndex = Math.min(currentIndex + 1, cards.length - 1);
  const localProgress = floatIndex - currentIndex;

  const currentCard = cards[currentIndex];
  const nextCard = cards[nextIndex];

  return (
    <section ref={rootRef} className="relative h-[250vh]">
      <div className="sticky top-[92px] h-[calc(100vh-92px)] overflow-hidden">
        <div className="pt-6">
          <div className="relative h-[286px] w-full overflow-hidden rounded-[24px]">
            <div
              className="absolute inset-0 will-change-opacity"
              style={{
                opacity: nextIndex === currentIndex ? 1 : 1 - localProgress,
                transition: 'opacity 120ms linear',
              }}
            >
              <WhyMobileUnifiedCard card={currentCard} />
            </div>

            {nextIndex !== currentIndex ? (
              <div
                className="absolute inset-0 will-change-opacity"
                style={{
                  opacity: localProgress,
                  transition: 'opacity 120ms linear',
                }}
              >
                <WhyMobileUnifiedCard card={nextCard} />
              </div>
            ) : null}

            <WhyChooseUsMobileRail cards={cards} floatIndex={floatIndex} />
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyChooseUsMobileRail({
  cards,
  floatIndex,
}: {
  cards: WhyCardItem[];
  floatIndex: number;
}) {
  return (
    <div className="pointer-events-none absolute right-[10px] top-1/2 z-30 -translate-y-1/2">
      <div className="flex h-[150px] flex-col items-center justify-between">
        {cards.map((card, index) => {
          const distance = Math.abs(index - floatIndex);
          const isActive = distance < 0.5;

          return (
            <span
              key={card.id}
              className="block rounded-full transition-all duration-200"
              style={{
                width: '2px',
                height: isActive ? '26px' : '18px',
                background: isActive ? 'var(--accent-1)' : '#ffffff',
                opacity: isActive ? 1 : 0.92,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

function WhyMobileUnifiedCard({ card }: { card: WhyCardItem }) {
  return (
    <div className="relative h-full overflow-hidden rounded-[24px] bg-[#26292e]">
      <img
        src={card.imageSrc}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <CardImageMask />
      <div className="pointer-events-none absolute inset-0 rounded-[24px] border border-white/12" />

      <div className="relative flex h-full flex-col justify-end px-5 py-5 pr-[28px]">
        <div className="flex items-start gap-[10px]">
          <card.icon
            size={17}
            strokeWidth={2.05}
            className="mt-[1px] shrink-0 text-white"
          />
          <h3 className="font-heading text-[19px] leading-[1.08] tracking-[-0.024em] text-white">
            {card.title}
          </h3>
        </div>

        <div
          className="mt-5 w-full text-[15px] font-normal leading-[1.28] tracking-[-0.014em] text-white/88"
          style={{ fontFamily: 'var(--font-body-text)' }}
        >
          {card.description}
        </div>
      </div>
    </div>
  );
}

function WhyChooseUsBreadcrumb() {
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
        почему выбирают нас
      </span>
    </div>
  );
}

function RevealCard({
  children,
  isActive,
  delayMs,
  className,
}: {
  children: React.ReactNode;
  isActive: boolean;
  delayMs: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'transition-[opacity,transform,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
        isActive
          ? 'translate-y-0 opacity-100 blur-0'
          : 'translate-y-[22px] opacity-0 blur-[12px]',
        className,
      )}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      <TiltCardShell>{children}</TiltCardShell>
    </div>
  );
}

function TiltCardShell({ children }: { children: React.ReactNode }) {
  const currentRef = useRef<TiltView>({ rotateX: 0, rotateY: 0, y: 0, scale: 1 });
  const targetRef = useRef<TiltView>({ rotateX: 0, rotateY: 0, y: 0, scale: 1 });
  const velocityRef = useRef<TiltView>({ rotateX: 0, rotateY: 0, y: 0, scale: 0 });
  const frameRef = useRef<number | null>(null);
  const [view, setView] = useState<TiltView>({ rotateX: 0, rotateY: 0, y: 0, scale: 1 });

  useEffect(() => {
    const stiffness = 0.14;
    const damping = 0.8;

    const step = () => {
      const current = currentRef.current;
      const target = targetRef.current;
      const velocity = velocityRef.current;

      (Object.keys(current) as Array<keyof TiltView>).forEach((key) => {
        const force = (target[key] - current[key]) * stiffness;
        velocity[key] = (velocity[key] + force) * damping;
        current[key] = current[key] + velocity[key];
      });

      setView({ ...current });
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
      rotateX: (0.5 - py) * 5.2,
      rotateY: (px - 0.5) * 5.2,
      y: -2,
      scale: 1.006,
    };
  };

  const handleMouseLeave = () => {
    targetRef.current = { rotateX: 0, rotateY: 0, y: 0, scale: 1 };
  };

  return (
    <div
      className="relative h-full [perspective:1400px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="h-full will-change-transform"
        style={{
          transform: `perspective(1400px) rotateX(${view.rotateX}deg) rotateY(${view.rotateY}deg) translateY(${view.y}px) scale(${view.scale})`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

function WhyCardTallImage({
  icon: Icon,
  title,
  description,
  imageSrc,
  showArrow = false,
}: {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  title: string;
  description: React.ReactNode;
  imageSrc: string;
  showArrow?: boolean;
}) {
  return (
    <div className="relative h-full overflow-visible">
      <div className="relative h-full overflow-hidden rounded-[32px] bg-[#26292e]">
        <img src={imageSrc} alt="" className="absolute inset-0 h-full w-full object-cover object-center" />
        <CardImageMask />
        <div className="pointer-events-none absolute inset-0 rounded-[32px] border border-white/12" />

        <div className="relative flex h-full flex-col justify-end px-8 py-8">
          <div className="flex items-start gap-[10px]">
            <Icon size={18} strokeWidth={2.05} className="mt-[1px] shrink-0 text-white" />
            <h3 className="font-heading text-[21px] leading-[1.08] tracking-[-0.024em] text-white">
              {title}
            </h3>
          </div>

          <div
            className="mt-7 text-[15px] font-normal leading-[1.3] tracking-[-0.014em] text-white/88"
            style={{ fontFamily: 'var(--font-body-text)' }}
          >
            {description}
          </div>
        </div>
      </div>

      {showArrow ? (
        <div className="pointer-events-none absolute left-1/2 top-full -translate-x-1/2 text-[#26292e]">
          <svg width="28" height="86" viewBox="0 0 28 86" fill="none" aria-hidden="true">
            <path d="M14 0V62" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
            <path d="M6 54L14 62L22 54" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      ) : null}
    </div>
  );
}

function WhyCardCompactImage({
  icon: Icon,
  title,
  description,
  imageSrc,
}: {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  title: string;
  description: React.ReactNode;
  imageSrc: string;
}) {
  return (
    <div className="relative h-full overflow-hidden rounded-[28px] bg-[var(--surface)] px-6 py-6">
      <img src={imageSrc} alt="" className="absolute inset-0 h-full w-full object-cover object-center" />
      <CardImageMask compact />
      <div className="pointer-events-none absolute inset-0 rounded-[28px] border border-white/12" />

      <div className="relative flex h-full flex-col justify-end">
        <div className="flex items-start gap-[10px]">
          <Icon size={18} strokeWidth={2.05} className="mt-[1px] shrink-0 text-white" />
          <h3 className="font-heading text-[21px] leading-[1.08] tracking-[-0.024em] text-white">
            {title}
          </h3>
        </div>

        <div
          className="mt-7 text-[16px] font-normal leading-[1.34] tracking-[-0.014em] text-white/88"
          style={{ fontFamily: 'var(--font-body-text)' }}
        >
          {description}
        </div>
      </div>
    </div>
  );
}

function WhyCardMediumImage({
  icon: Icon,
  title,
  description,
  imageSrc,
}: {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  title: string;
  description: React.ReactNode;
  imageSrc: string;
}) {
  return (
    <div className="relative h-full overflow-hidden rounded-[28px] bg-[var(--surface)] px-7 py-7">
      <img src={imageSrc} alt="" className="absolute inset-0 h-full w-full object-cover object-center" />
      <CardImageMask />
      <div className="pointer-events-none absolute inset-0 rounded-[28px] border border-white/12" />

      <div className="relative flex h-full flex-col justify-end">
        <div className="flex items-start gap-[10px]">
          <Icon size={18} strokeWidth={2.05} className="mt-[1px] shrink-0 text-white" />
          <h3 className="font-heading text-[21px] leading-[1.08] tracking-[-0.024em] text-white">
            {title}
          </h3>
        </div>

        <div
          className="mt-7 text-[16px] font-normal leading-[1.34] tracking-[-0.014em] text-white/88"
          style={{ fontFamily: 'var(--font-body-text)' }}
        >
          {description}
        </div>
      </div>
    </div>
  );
}

function CardImageMask({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={cn(
        'absolute inset-0',
        compact
          ? 'bg-[radial-gradient(120%_90%_at_50%_88%,rgba(38,41,46,0.78)_0%,rgba(38,41,46,0.62)_28%,rgba(38,41,46,0.34)_55%,rgba(38,41,46,0.14)_78%,rgba(38,41,46,0.04)_100%),linear-gradient(180deg,rgba(38,41,46,0.08)_0%,rgba(38,41,46,0.18)_38%,rgba(38,41,46,0.52)_100%)]'
          : 'bg-[radial-gradient(125%_95%_at_50%_88%,rgba(38,41,46,0.82)_0%,rgba(38,41,46,0.66)_26%,rgba(38,41,46,0.40)_52%,rgba(38,41,46,0.18)_76%,rgba(38,41,46,0.06)_100%),linear-gradient(180deg,rgba(38,41,46,0.10)_0%,rgba(38,41,46,0.22)_36%,rgba(38,41,46,0.56)_100%)]',
      )}
    />
  );
}
