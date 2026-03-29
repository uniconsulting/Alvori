'use client';

import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Container } from '@/components/layout/Container';

type ServicesSectionProps = {
  className?: string;
};

export function ServicesSection({ className }: ServicesSectionProps) {
  return (
    <section className={cn('w-full', className)}>
      <Container>
        <div className="flex flex-col gap-6 xl:gap-7">
          <div className="flex items-start justify-between gap-6">
            <h2 className="font-heading text-[64px] leading-[0.92] tracking-[-0.05em] text-[var(--text)]">
              Услуги
            </h2>

            <div className="pt-[10px] text-[18px] font-medium lowercase tracking-[-0.02em] text-[var(--text)]">
              главная -- услуги
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
      </Container>
    </section>
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
  if (isAdr) {
    return (
      <div className="relative rounded-[28px] p-[2px]">
        <div className="service-adr-border pointer-events-none absolute inset-0 rounded-[28px]" />
        <div className="relative flex h-[262px] flex-col rounded-[26px] bg-[var(--surface)] px-8 py-8">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-heading text-[15px] leading-[1.12] tracking-[-0.02em] text-[var(--text)]">
              {title}
            </h3>

            {accentLabel ? (
              <div className="pt-[2px] text-[15px] font-semibold leading-none tracking-[-0.02em] text-[var(--accent-1)]">
                {accentLabel}
              </div>
            ) : null}
          </div>

          <div
            className="mt-8 text-[13px] font-normal leading-[1.34] tracking-[-0.01em] text-[var(--text-muted)]"
            style={{ fontFamily: 'var(--font-body-text)' }}
          >
            {description}
          </div>

          <div className="mt-auto">
            <CardCTA label={ctaLabel} darkButton={false} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[262px] flex-col rounded-[28px] bg-[var(--surface)] px-8 py-8">
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-heading text-[15px] leading-[1.12] tracking-[-0.02em] text-[var(--text)]">
          {title}
        </h3>
      </div>

      <div
        className="mt-8 text-[13px] font-normal leading-[1.34] tracking-[-0.01em] text-[var(--text-muted)]"
        style={{ fontFamily: 'var(--font-body-text)' }}
      >
        {description}
      </div>

      <div className="mt-auto">
        <CardCTA label={ctaLabel} darkButton={false} />
      </div>
    </div>
  );
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
        <div className="mt-auto pb-6">
          <h3 className="font-heading text-[15px] leading-[1.14] tracking-[-0.02em] text-white">
            {title}
          </h3>

          <div
            className="mt-8 text-[13px] font-normal leading-[1.34] tracking-[-0.01em] text-white/88"
            style={{ fontFamily: 'var(--font-body-text)' }}
          >
            {description}
          </div>

          <div className="mt-8">
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
    <div className={cn('flex h-[52px] items-center justify-between rounded-[14px] px-5', darkButton ? 'bg-white/90' : 'bg-[var(--bg)]')}>
      <span
        className={cn(
          'text-[13px] font-semibold lowercase leading-none tracking-[-0.02em]',
          darkButton ? 'text-[var(--accent-2)]' : 'text-[var(--text)]',
        )}
        style={{ fontFamily: 'var(--font-body-text)' }}
      >
        {label}
      </span>

      <div
        className={cn(
          'inline-flex h-[40px] w-[56px] items-center justify-center rounded-[10px]',
          darkButton ? 'bg-[rgba(38,41,46,0.08)] text-[var(--accent-2)]' : 'bg-[var(--surface)] text-[var(--text)]',
        )}
      >
        <ArrowRight size={22} strokeWidth={2.1} />
      </div>
    </div>
  );
}
