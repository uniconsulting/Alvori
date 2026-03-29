'use client';

import { ArrowRight, Dot } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Container } from '@/components/layout/Container';

export function ServicesSection() {
  return (
    <div className="h-full">
      <Container>
        <div className="px-[14px] md:px-[18px] xl:px-[22px]">
          <div className="flex flex-col gap-10 xl:gap-12">
            <div className="flex items-center justify-between gap-6">
              <h2 className="pl-[6px] font-heading text-[56px] leading-[0.94] tracking-[-0.045em] text-[var(--text)]">
                Услуги
              </h2>

              <div className="pr-[6px]">
                <ServicesBreadcrumb />
              </div>
            </div>

            <div className="grid grid-cols-[1fr_1fr_1fr] gap-5">
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
        </div>
      </Container>
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
  const content = (
    <div className="relative flex h-[262px] flex-col rounded-[26px] px-8 py-8">
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-heading text-[18px] leading-[1.08] tracking-[-0.025em] text-[var(--text)]">
          {title}
        </h3>

        {accentLabel ? (
          <div className="pt-[1px] text-[15px] font-semibold leading-none tracking-[-0.02em] text-[var(--accent-1)]">
            {accentLabel}
          </div>
        ) : null}
      </div>

      <div
        className="mt-[22px] text-[15px] font-normal leading-[1.34] tracking-[-0.012em] text-[var(--text-muted)]"
        style={{ fontFamily: 'var(--font-body-text)' }}
      >
        {description}
      </div>

      <div className="mt-auto pt-[22px]">
        <CardCTA label={ctaLabel} darkButton={false} />
      </div>
    </div>
  );

  if (isAdr) {
    return (
      <div className="relative rounded-[28px] p-[2px]">
        <div className="service-adr-border pointer-events-none absolute inset-0 rounded-[28px]" />
        <div className="relative rounded-[26px] bg-[var(--surface)]">{content}</div>
      </div>
    );
  }

  return <div className="rounded-[28px] bg-[var(--surface)]">{content}</div>;
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
    <div className="relative row-span-2 h-[548px] overflow-hidden rounded-[28px] bg-[var(--accent-2)]">
      <img
        src="/services/expedition-bg.webp"
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(38,41,46,0.08)_0%,rgba(38,41,46,0.14)_28%,rgba(38,41,46,0.46)_62%,rgba(38,41,46,0.90)_100%)]" />

      <div className="relative flex h-full flex-col px-8 py-8">
        <div className="mt-auto">
          <h3 className="font-heading text-[18px] leading-[1.08] tracking-[-0.025em] text-white">
            {title}
          </h3>

          <div
            className="mt-[22px] text-[15px] font-normal leading-[1.34] tracking-[-0.012em] text-white/88"
            style={{ fontFamily: 'var(--font-body-text)' }}
          >
            {description}
          </div>

          <div className="pt-[22px]">
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
    <div className="flex h-[56px] items-center justify-between rounded-[14px] bg-[var(--bg)] px-5">
      <span
        className={cn(
          'text-[15px] font-semibold lowercase leading-none tracking-[-0.02em]',
          darkButton ? 'text-white' : 'text-[var(--text)]',
        )}
        style={{ fontFamily: 'var(--font-body-text)' }}
      >
        {label}
      </span>

      <div
        className={cn(
          'inline-flex h-[40px] w-[58px] shrink-0 items-center justify-center rounded-[10px]',
          darkButton ? 'bg-[rgba(255,255,255,0.06)] text-white' : 'bg-[var(--surface)] text-[var(--text)]',
        )}
      >
        <ArrowRight size={20} strokeWidth={2.1} />
      </div>
    </div>
  );
}
