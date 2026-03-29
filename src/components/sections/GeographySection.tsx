'use client';

import { Dot, MapPinned, Route, ShieldCheck } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { GeographyGlobe } from '@/components/sections/GeographyGlobe';

export function GeographySection() {
  return (
    <div className="h-full">
      <Container>
        <div className="px-[14px] md:px-[18px] xl:px-[22px]">
          <div className="grid grid-cols-[0.95fr_1.05fr] items-center gap-10 xl:gap-14">
            <div className="flex flex-col gap-8">
              <div className="flex items-center justify-between gap-6">
                <h2 className="font-heading text-[52px] leading-[0.94] tracking-[-0.045em] text-[var(--text)]">
                  География
                </h2>

                <div>
                  <GeographyBreadcrumb />
                </div>
              </div>

              <div className="flex flex-col gap-5">
                <p
                  className="max-w-[640px] text-[22px] font-semibold leading-[1.24] tracking-[-0.022em] text-[var(--text)]"
                  style={{ fontFamily: 'var(--font-body-text)' }}
                >
                  Работаем по ключевым направлениям внутри России, выстраивая
                  устойчивую логистику под задачу клиента.
                </p>

                <p
                  className="max-w-[620px] text-[18px] font-normal leading-[1.34] tracking-[-0.016em] text-[var(--text-muted)]"
                  style={{ fontFamily: 'var(--font-body-text)' }}
                >
                  Центральный, Северо-Западный, Южный, Приволжский и Уральский
                  федеральные округа — базовый контур нашей работы.
                </p>
              </div>

              <div className="grid gap-4 pt-2">
                <FeatureRow
                  icon={MapPinned}
                  text="Покрытие по ключевым направлениям внутри России"
                />
                <FeatureRow
                  icon={Route}
                  text="Оптимизация маршрута под срок, бюджет и формат груза"
                />
                <FeatureRow
                  icon={ShieldCheck}
                  text="Сочетание собственного автопарка и экспедиционного покрытия"
                />
              </div>
            </div>

            <GeographyGlobe />
          </div>
        </div>
      </Container>
    </div>
  );
}

function GeographyBreadcrumb() {
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
        география
      </span>
    </div>
  );
}

function FeatureRow({
  icon: Icon,
  text,
}: {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  text: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-[18px] bg-[var(--surface)] px-4 py-4 shadow-[0_8px_20px_rgba(38,41,46,0.04)]">
      <Icon
        size={18}
        strokeWidth={2.1}
        className="mt-[2px] shrink-0 text-[var(--accent-1)]"
      />
      <p
        className="text-[16px] font-medium leading-[1.34] tracking-[-0.014em] text-[var(--text)]"
        style={{ fontFamily: 'var(--font-body-text)' }}
      >
        {text}
      </p>
    </div>
  );
}
