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

            <div className="pt-3">
              <div className="h-[2px] rounded-full bg-[rgba(38,41,46,0.10)]" />
            </div>

            <div className="pt-3">
              <div className="grid grid-cols-[1.1fr_0.9fr] gap-10 xl:gap-12">
                <div className="flex items-start gap-5">
                  <Quote
                    size={46}
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
            </div>

            <ProcessRoute />
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

function ProcessRoute() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const currentIndex = hoveredIndex ?? activeIndex;
  const stepsCount = PROCESS_STEPS.length;

  useEffect(() => {
    if (hoveredIndex !== null) return;

    const interval = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % PROCESS_STEPS.length);
    }, 2200);

    return () => window.clearInterval(interval);
  }, [hoveredIndex]);

  const markerPosition = useMemo(() => {
    if (stepsCount <= 1) return '0%';
    return `${(currentIndex / (stepsCount - 1)) * 100}%`;
  }, [currentIndex, stepsCount]);

  return (
    <div className="pt-4">
      <div className="relative">
        <div className="mx-auto max-w-[1320px]">
          <div className="relative pb-[110px] pt-[18px]">
            <div className="absolute left-0 right-0 top-[30px] h-[2px] rounded-full bg-[rgba(38,41,46,0.10)]" />

            <div
              className="absolute top-[30px] h-[2px] rounded-full bg-[var(--accent-1)] transition-[width] duration-500 ease-out"
              style={{ width: markerPosition }}
            />

            <div
              className="absolute top-[22px] z-[3] h-[18px] w-[18px] -translate-x-1/2 rounded-full border border-[var(--accent-1)] bg-[var(--accent-1)] shadow-[0_0_18px_rgba(250,176,33,0.30)] transition-[left] duration-500 ease-out"
              style={{ left: markerPosition }}
            >
              <span className="absolute inset-[4px] rounded-full bg-white/45" />
            </div>

            <div className="relative grid grid-cols-5 gap-4">
              {PROCESS_STEPS.map((step, index) => {
                const isActive = index === currentIndex;
                const isPassed = index < currentIndex;

                return (
                  <button
                    key={step.id}
                    type="button"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="group relative flex flex-col items-center text-center"
                  >
                    <span
                      className={cn(
                        'relative z-[2] inline-flex h-[18px] w-[18px] items-center justify-center rounded-full border transition-all duration-300',
                        isActive
                          ? 'border-[var(--accent-1)] bg-[var(--accent-1)]'
                          : isPassed
                            ? 'border-[var(--accent-1)] bg-[rgba(250,176,33,0.18)]'
                            : 'border-[rgba(38,41,46,0.18)] bg-[var(--bg)]',
                      )}
                    />

                    <span
                      className={cn(
                        'mt-[22px] text-[15px] font-semibold lowercase tracking-[-0.02em] transition-colors duration-300',
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

            <div className="pointer-events-none absolute bottom-0 left-1/2 w-full max-w-[760px] -translate-x-1/2">
              <div className="rounded-[22px] border border-white/60 bg-[var(--surface)] px-7 py-5 shadow-[0_14px_32px_rgba(38,41,46,0.05)]">
                <p
                  className="text-center text-[17px] font-normal leading-[1.38] tracking-[-0.016em] text-[var(--text-muted)] transition-all duration-300"
                  style={{ fontFamily: 'var(--font-body-text)' }}
                >
                  {PROCESS_STEPS[currentIndex].description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
