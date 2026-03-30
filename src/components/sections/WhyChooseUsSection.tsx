'use client';

import {
  Clock3,
  Dot,
  FileText,
  ShieldCheck,
  SlidersHorizontal,
  Truck,
} from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { sitePath } from '@/lib/site-path';

export function WhyChooseUsSection() {
  return (
    <div className="h-full">
      <Container>
        <div className="px-[14px] md:px-[18px] xl:px-[22px]">
          <div className="flex flex-col gap-8 xl:gap-10">
            <div className="flex items-center justify-between gap-6">
              <h2 className="font-heading text-[52px] leading-[0.94] tracking-[-0.045em] text-[var(--text)]">
                Почему выбирают нас
              </h2>

              <WhyChooseUsBreadcrumb />
            </div>

            <div>
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

            <div className="grid grid-cols-[1fr_1fr_1fr] gap-5">
              <WhyCardTallImage
                icon={Truck}
                title="Собственный автопарк"
                description={
                  <>
                    Собственные единицы транспорта позволяют
                    <br />
                    держать качество исполнения под контролем
                    <br />
                    и обеспечивать предсказуемость работы.
                  </>
                }
                imageSrc={`${sitePath}/why-choose-us/fleet-card-bg.webp`}
              />

              <WhyCardCompact
                icon={Clock3}
                title="Контроль сроков"
                description={
                  <>
                    Следим за движением
                    <br />
                    и соблюдением сроков.
                  </>
                }
              />

              <WhyCardCompact
                icon={FileText}
                title="Документы"
                description={
                  <>
                    Закрывающий контур
                    <br />
                    и комплект документов.
                  </>
                }
              />

              <WhyCardMedium
                icon={SlidersHorizontal}
                title="Под задачу клиента"
                description={
                  <>
                    Собираем маршрут
                    <br />
                    и формат работы под задачу.
                  </>
                }
              />

              <WhyCardMedium
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
              />
            </div>
          </div>
        </div>
      </Container>
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
}: {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  title: string;
  description: React.ReactNode;
  imageSrc: string;
}) {
  return (
    <div className="relative row-span-2 min-h-[596px] overflow-hidden rounded-[32px] bg-[#26292e] shadow-[0_18px_44px_rgba(38,41,46,0.12)]">
      <img
        src={imageSrc}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(38,41,46,0.18)_0%,rgba(38,41,46,0.34)_34%,rgba(38,41,46,0.72)_76%,rgba(38,41,46,0.94)_100%)]" />
      <div className="pointer-events-none absolute inset-0 rounded-[32px] border border-white/12" />

      <div className="relative flex h-full flex-col px-8 py-8">
        <div className="mt-auto">
          <div className="flex items-start gap-[10px]">
            <Icon size={20} strokeWidth={2.05} className="mt-[1px] shrink-0 text-white" />
            <h3 className="font-heading text-[24px] leading-[1.06] tracking-[-0.028em] text-white">
              {title}
            </h3>
          </div>

          <div
            className="mt-8 text-[17px] font-normal leading-[1.34] tracking-[-0.014em] text-white/84"
            style={{ fontFamily: 'var(--font-body-text)' }}
          >
            {description}
          </div>
        </div>
      </div>
    </div>
  );
}

function WhyCardCompact({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  title: string;
  description: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[132px] flex-col rounded-[28px] bg-[var(--surface)] px-6 py-6 shadow-[0_10px_24px_rgba(38,41,46,0.04)]">
      <div className="flex items-start gap-[10px]">
        <Icon size={17} strokeWidth={2.05} className="mt-[1px] shrink-0 text-[var(--text)]" />
        <h3 className="font-heading text-[18px] leading-[1.08] tracking-[-0.02em] text-[var(--text)]">
          {title}
        </h3>
      </div>

      <div
        className="mt-5 text-[15px] font-normal leading-[1.34] tracking-[-0.012em] text-[var(--text-muted)]"
        style={{ fontFamily: 'var(--font-body-text)' }}
      >
        {description}
      </div>
    </div>
  );
}

function WhyCardMedium({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  title: string;
  description: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[224px] flex-col rounded-[28px] bg-[var(--surface)] px-7 py-7 shadow-[0_12px_30px_rgba(38,41,46,0.05)]">
      <div className="flex items-start gap-[10px]">
        <Icon size={18} strokeWidth={2.05} className="mt-[1px] shrink-0 text-[var(--text)]" />
        <h3 className="font-heading text-[21px] leading-[1.08] tracking-[-0.024em] text-[var(--text)]">
          {title}
        </h3>
      </div>

      <div
        className="mt-7 text-[16px] font-normal leading-[1.34] tracking-[-0.014em] text-[var(--text-muted)]"
        style={{ fontFamily: 'var(--font-body-text)' }}
      >
        {description}
      </div>
    </div>
  );
}
