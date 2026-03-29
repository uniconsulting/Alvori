'use client';

import { Dot, Quote } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { cn } from '@/lib/cn';
import { Container } from '@/components/layout/Container';

type ProcessStep = {
  id: string;
  title: string;
  description: string;
};

const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 'request',
    title: 'запрос',
    description:
      'Фиксируем задачу, маршрут, сроки, требования к транспорту и документы по заявке.',
  },
  {
    id: 'estimate',
    title: 'расчёт',
    description:
      'Подбираем формат перевозки, считаем стоимость, сроки и оптимальный сценарий исполнения.',
  },
  {
    id: 'approval',
    title: 'согласование',
    description:
      'Подтверждаем условия, детали маршрута, формат работы и запускаем перевозку в работу.',
  },
  {
    id: 'delivery',
    title: 'перевозка',
    description:
      'Организуем исполнение, сопровождаем процесс и контролируем движение на каждом этапе.',
  },
  {
    id: 'docs',
    title: 'документы',
    description:
      'Формируем закрывающий контур: подтверждение исполнения, комплект документов и завершение сделки.',
  },
];

export function About() {
  return (
    <div className="h-full">
      <Container>
        <div className="px-[14px] md:px-[18px] xl:px-[22px]">
          <div className="flex flex-col gap-8 xl:gap-10">
            <div className="flex items-center justify-between gap-6">
              <h2 className="font-heading text-[52px] leading-[0.94] tracking-[-0.045em] text-[var(--text)]">
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

            <div className="h-[2px] rounded-full bg-[rgba(38,41,46,0.10)]" />

            <div className="grid grid-cols-[1.1fr_0.9fr] gap-10 xl:gap-12">
              <div className="flex items-start gap-5">
                <Quote
                  size={58}
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

            <ProcessFlow />
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

function ProcessFlow() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const currentIndex = hoveredIndex ?? activeIndex;

  useEffect(() => {
    if (hoveredIndex !== null) return;

    const interval = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % PROCESS_STEPS.length);
    }, 2200);

    return () => window.clearInterval(interval);
  }, [hoveredIndex]);

  const progressWidth = useMemo(() => {
    if (PROCESS_STEPS.length <= 1) return '0%';
    return `${(currentIndex / (PROCESS_STEPS.length - 1)) * 100}%`;
  }, [currentIndex]);

  return (
    <div className="pt-2">
      <div className="rounded-[28px] bg-[var(--surface)] px-8 py-7 shadow-[0_12px_30px_rgba(38,41,46,0.04)]">
        <div className="flex items-center justify-between gap-6">
          {PROCESS_STEPS.map((step, index) => {
            const isActive = index === currentIndex;
            const isPassed = index < currentIndex;

            return (
              <button
                key={step.id}
                type="button"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative flex flex-1 flex-col items-center text-center"
              >
                <span
                  className={cn(
                    'relative z-[2] inline-flex h-[16px] w-[16px] items-center justify-center rounded-full border transition-all duration-300',
                    isActive
                      ? 'border-[var(--accent-1)] bg-[var(--accent-1)] shadow-[0_0_18px_rgba(250,176,33,0.28)]'
                      : isPassed
                        ? 'border-[var(--accent-1)] bg-[rgba(250,176,33,0.18)]'
                        : 'border-[rgba(38,41,46,0.18)] bg-[var(--bg)]',
                  )}
                />

                <span
                  className={cn(
                    'mt-4 text-[15px] font-semibold lowercase tracking-[-0.02em] transition-colors duration-300',
                    isActive
                      ? 'text-[var(--text)]'
                      : 'text-[var(--text-muted)] group-hover:text-[var(--text)]',
                  )}
                  style={{ fontFamily: 'var(--font-body-text)' }}
                >
                  {step.title}
                </span>
              </button>
            );
          })}
        </div>

        <div className="relative mt-[-30px] h-[2px]">
          <div className="absolute inset-x-0 top-0 h-[2px] rounded-full bg-[rgba(38,41,46,0.10)]" />
          <div
            className="absolute left-0 top-0 h-[2px] rounded-full bg-[var(--accent-1)] transition-[width] duration-500 ease-out"
            style={{ width: progressWidth }}
          />
        </div>

        <div className="mt-10 min-h-[66px]">
          <p
            className="max-w-[860px] text-[18px] font-normal leading-[1.38] tracking-[-0.016em] text-[var(--text-muted)] transition-all duration-300"
            style={{ fontFamily: 'var(--font-body-text)' }}
          >
            {PROCESS_STEPS[currentIndex].description}
          </p>
        </div>
      </div>
    </div>
  );
}
