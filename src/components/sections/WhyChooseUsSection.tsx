'use client';

import {
  Clock3,
  Dot,
  FileText,
  ShieldCheck,
  SlidersHorizontal,
  Truck,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Container } from '@/components/layout/Container';
import { sitePath } from '@/lib/site-path';

type TiltView = {
  rotateX: number;
  rotateY: number;
  y: number;
  scale: number;
};

export function WhyChooseUsSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.18,
        rootMargin: '120px 0px 120px 0px',
      },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="h-full">
      <Container>
        <div className="px-[14px] md:px-[18px] xl:px-[22px]">
          <div className="flex flex-col gap-8 xl:gap-10">
            <div
              className={`transition-[opacity,transform,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isVisible
                  ? 'translate-y-0 opacity-100 blur-0'
                  : 'translate-y-4 opacity-0 blur-[10px]'
              }`}
            >
              <div className="flex items-center justify-between gap-6">
                <h2 className="font-heading text-[52px] leading-[0.94] tracking-[-0.045em] text-[var(--text)]">
                  Почему выбирают нас
                </h2>

                <WhyChooseUsBreadcrumb />
              </div>

              <div className="mt-8">
                <p
                  className="max-w-[760px] text-[20px] font-normal leading-[1.28] tracking-[-0.018em] text-[var(--text)]"
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

            <div className="grid auto-rows-[minmax(132px,auto)] grid-cols-[1fr_1fr_1fr] gap-5">
              <RevealCard isVisible={isVisible} delayMs={120} className="row-span-2">
                <TiltCardShell className="h-full">
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
                </TiltCardShell>
              </RevealCard>

              <RevealCard isVisible={isVisible} delayMs={220}>
                <TiltCardShell>
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
                </TiltCardShell>
              </RevealCard>

              <RevealCard isVisible={isVisible} delayMs={320}>
                <TiltCardShell>
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
                </TiltCardShell>
              </RevealCard>

              <RevealCard isVisible={isVisible} delayMs={420}>
                <TiltCardShell>
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
                </TiltCardShell>
              </RevealCard>

              <RevealCard isVisible={isVisible} delayMs={520}>
                <TiltCardShell>
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
                </TiltCardShell>
              </RevealCard>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

function RevealCard({
  children,
  isVisible,
  delayMs,
  className = '',
}: {
  children: React.ReactNode;
  isVisible: boolean;
  delayMs: number;
  className?: string;
}) {
  return (
    <div
      className={`${className} transition-[opacity,transform,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isVisible
          ? 'translate-y-0 opacity-100 blur-0'
          : 'translate-y-5 opacity-0 blur-[12px]'
      }`}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      {children}
    </div>
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
      rotateX: (0.5 - py) * 5.5,
      rotateY: (px - 0.5) * 5.5,
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
      className={`relative [perspective:1400px] ${className ?? ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        style={{
          transform: `perspective(1400px) rotateX(${view.rotateX}deg) rotateY(${view.rotateY}deg) translateY(${view.y}px) scale(${view.scale})`,
          transition: 'box-shadow 220ms ease',
        }}
      >
        {children}
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
    <div className="relative h-[540px] overflow-visible">
      <div className="relative h-full overflow-hidden rounded-[32px] bg-[#26292e]">
        <img
          src={imageSrc}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

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
            <path
              d="M6 54L14 62L22 54"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
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
    <div className="relative h-[132px] overflow-hidden rounded-[28px] bg-[var(--surface)] px-6 py-6">
      <img
        src={imageSrc}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

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
    <div className="relative h-[224px] overflow-hidden rounded-[28px] bg-[var(--surface)] px-7 py-7">
      <img
        src={imageSrc}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

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
      className={`absolute inset-0 ${
        compact
          ? 'bg-[radial-gradient(120%_90%_at_50%_88%,rgba(38,41,46,0.78)_0%,rgba(38,41,46,0.62)_28%,rgba(38,41,46,0.34)_55%,rgba(38,41,46,0.14)_78%,rgba(38,41,46,0.04)_100%),linear-gradient(180deg,rgba(38,41,46,0.08)_0%,rgba(38,41,46,0.18)_38%,rgba(38,41,46,0.52)_100%)]'
          : 'bg-[radial-gradient(125%_95%_at_50%_88%,rgba(38,41,46,0.82)_0%,rgba(38,41,46,0.66)_26%,rgba(38,41,46,0.40)_52%,rgba(38,41,46,0.18)_76%,rgba(38,41,46,0.06)_100%),linear-gradient(180deg,rgba(38,41,46,0.10)_0%,rgba(38,41,46,0.22)_36%,rgba(38,41,46,0.56)_100%)]'
      }`}
    />
  );
}
