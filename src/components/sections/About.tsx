'use client';

import {
  Calculator,
  CheckCheck,
  CircleDashed,
  Dot,
  FileText,
  Quote,
  Send,
  Truck,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { cn } from '@/lib/cn';
import { Container } from '@/components/layout/Container';

type ProcessStep = {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
};

const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 'request',
    title: 'запрос',
    description:
      'Фиксируем задачу, маршрут, сроки, требования к транспорту и документы по заявке.',
    icon: Send,
  },
  {
    id: 'estimate',
    title: 'расчёт',
    description:
      'Подбираем формат перевозки, считаем стоимость, сроки и оптимальный сценарий исполнения.',
    icon: Calculator,
  },
  {
    id: 'approval',
    title: 'согласование',
    description:
      'Подтверждаем условия, детали маршрута, формат работы и запускаем перевозку в работу.',
    icon: CheckCheck,
  },
  {
    id: 'delivery',
    title: 'перевозка',
    description:
      'Организуем исполнение, сопровождаем процесс и контролируем движение на каждом этапе.',
    icon: Truck,
  },
  {
    id: 'docs',
    title: 'документы',
    description:
      'Формируем закрывающий контур: подтверждение исполнения, комплект документов и завершение сделки.',
    icon: FileText,
  },
];

export function About() {
  return (
    <div className="h-full">
      <Container>
        <div className="px-[14px] md:px-[18px] xl:px-[22px]">
          <div className="flex flex-col gap-8 xl:gap-10">
            <div className="flex items-center justify-between gap-6">
              <h2 className="pl-[10px] font-heading text-[52px] leading-[0.94] tracking-[-0.045em] text-[var(--text)]">
                О компании
              </h2>

              <div className="pr-[10px]">
                <AboutBreadcrumb />
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <p
                className="max-w-[1120px] text-[22px] font-semibold leading-[1.24] tracking-[-0.022em] text-[var(--text)]"
                style={{ fontFamily: 'var(--font-body-text)' }}
              >
                «АЛВОРИ» – логистическая компания, работающая в B2B-сегменте по РФ.
              </p>

              <p
                className="max-w-[980px] text-[20px] font-normal leading-[1.26] tracking-[-0.02em] text-[var(--text-muted)]"
                style={{ fontFamily: 'var(--font-body-text)' }}
              >
                Мы сочетаем собственный автопарк и экспедиционное направление,
                <br />
                чтобы подбирать оптимальный формат перевозки под задачу клиента.
              </p>
            </div>

            <div className="mt-3 h-[2px] rounded-full bg-[rgba(38,41,46,0.10)]" />

            <div className="mt-3 grid grid-cols-[1.1fr_0.9fr] gap-10 xl:gap-12">
              <div className="flex items-start gap-5">
                <Quote
                  size={48}
                  strokeWidth={2.15}
                  className="mt-[2px] shrink-0 text-[var(--accent-1)]"
                />

                <p
                  className="max-w-[720px] text-[22px] font-semibold leading-[1.22] tracking-[-0.022em] text-[var(--text)]"
                  style={{ fontFamily: 'var(--font-body-text)' }}
                >
                  «Стабильный бизнес – это ответственность,
                  <br />
                  предсказуемость и уважение к клиенту»
                </p>
              </div>

              <div className="flex justify-end">
                <p
                  className="pt-[4px] text-right text-[20px] font-normal leading-[1.18] tracking-[-0.02em] text-[var(--text)]"
                  style={{ fontFamily: 'var(--font-body-text)' }}
                >
                  — Алик, руководитель АЛВОРИ
                </p>
              </div>
            </div>

            <div className="pt-8 xl:pt-10">
              <ProcessFlowNodes />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

function AboutBreadcrumb() {
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
        о компании
      </span>
    </div>
  );
}

function ProcessFlowNodes() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const currentIndex = hoveredIndex ?? activeIndex;
  const ActiveIcon = PROCESS_STEPS[currentIndex].icon;

  useEffect(() => {
    if (hoveredIndex !== null) return;

    const interval = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % PROCESS_STEPS.length);
    }, 3200);

    return () => window.clearInterval(interval);
  }, [hoveredIndex]);

  const segmentStates = useMemo(() => {
    return Array.from({ length: PROCESS_STEPS.length - 1 }, (_, index) => ({
      active: index < currentIndex,
      current: index === currentIndex,
    }));
  }, [currentIndex]);

  return (
    <div className="flex flex-col gap-10 xl:gap-12">
      <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr] items-center gap-x-5">
        {PROCESS_STEPS.map((step, index) => {
          const isActive = index === currentIndex;
          const isPassed = index < currentIndex;

          return (
            <div key={step.id} className="flex items-center justify-center">
              <button
                type="button"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group flex items-center justify-center"
              >
                <span
                  className={cn(
                    'text-[15px] font-semibold lowercase tracking-[-0.02em] transition-colors duration-300',
                    isActive
                      ? 'text-[var(--text)]'
                      : isPassed
                        ? 'text-[var(--text)]'
                        : 'text-[var(--text-muted)] group-hover:text-[var(--text)]',
                  )}
                  style={{ fontFamily: 'var(--font-body-text)' }}
                >
                  {step.title}
                </span>
              </button>
            </div>
          );
        }).flatMap((node, index) => {
          if (index === PROCESS_STEPS.length - 1) return [node];

          const state = segmentStates[index];

          return [
            node,
            <SegmentConnector
              key={`connector-${PROCESS_STEPS[index].id}`}
              active={state.active}
            />,
          ];
        })}
      </div>

      <div className="w-full rounded-[22px] bg-[var(--surface)] px-6 py-5 shadow-[0_8px_20px_rgba(38,41,46,0.04)]">
        <div className="flex items-center gap-4">
          <ActiveIcon
            size={22}
            strokeWidth={2.05}
            className="shrink-0 text-[var(--accent-1)]"
          />

          <p
            className="whitespace-nowrap text-[18px] font-normal leading-[1.36] tracking-[-0.016em] text-[var(--text-muted)] transition-all duration-300"
            style={{ fontFamily: 'var(--font-body-text)' }}
          >
            {PROCESS_STEPS[currentIndex].description}
          </p>
        </div>
      </div>
    </div>
  );
}

function SegmentConnector({ active }: { active: boolean }) {
  return (
    <div className="flex w-[88px] items-center justify-center gap-[6px]">
      {[0, 1, 2, 3].map((item) => (
        <span
          key={item}
          className={cn(
            'h-[2px] w-[16px] rounded-full transition-colors duration-300',
            active ? 'bg-[var(--accent-1)]' : 'bg-[rgba(38,41,46,0.12)]',
          )}
        />
      ))}
    </div>
  );
}
