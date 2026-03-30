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
                soft
              />

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
                soft
              />

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
  showArrow = false,
}: {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  title: string;
  description: React.ReactNode;
  imageSrc: string;
  showArrow?: boolean;
}) {
  return (
    <div className="relative row-span-2 min-h-[540px] overflow-visible">
      <div className="relative h-full overflow-hidden rounded-[32px] bg-[#26292e]">
        <img
          src={imageSrc}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(38,41,46,0.12)_0%,rgba(38,41,46,0.24)_34%,rgba(38,41,46,0.68)_74%,rgba(38,41,46,0.94)_100%)]" />
        <div className="pointer-events-none absolute inset-0 rounded-[32px] border border-white/12" />

        <div className="relative flex h-full flex-col justify-end px-8 py-8">
          <div className="flex items-start gap-[10px]">
            <Icon size={20} strokeWidth={2.05} className="mt-[1px] shrink-0 text-white" />
            <h3 className="font-heading text-[24px] leading-[1.06] tracking-[-0.028em] text-white">
              {title}
            </h3>
          </div>

          <div
            className="mt-8 text-[15px] font-normal leading-[1.34] tracking-[-0.014em] text-white/84"
            style={{ fontFamily: 'var(--font-body-text)' }}
          >
            {description}
          </div>
        </div>
      </div>

      {showArrow ? (
        <div className="pointer-events-none absolute left-1/2 top-full -translate-x-1/2 text-[#26292e]">
          <svg width="34" height="88" viewBox="0 0 34 88" fill="none" aria-hidden="true">
            <path
              d="M17 0V66M17 66L4 79M17 66L30 79"
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
  soft = false,
}: {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  title: string;
  description: React.ReactNode;
  imageSrc: string;
  soft?: boolean;
}) {
  return (
    <div
      className={`relative min-h-[116px] overflow-hidden rounded-[28px] px-6 py-6 ${
        soft ? 'bg-[var(--surface-soft)]' : 'bg-[var(--surface)]'
      }`}
    >
      <img
        src={imageSrc}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      <div
        className={`absolute inset-0 ${
          soft
            ? 'bg-[linear-gradient(180deg,rgba(245,245,247,0.34)_0%,rgba(245,245,247,0.56)_34%,rgba(245,245,247,0.90)_100%)]'
            : 'bg-[linear-gradient(180deg,rgba(245,245,247,0.20)_0%,rgba(245,245,247,0.46)_34%,rgba(245,245,247,0.92)_100%)]'
        }`}
      />

      <div className="relative flex h-full flex-col justify-end">
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
    <div className="relative min-h-[204px] overflow-hidden rounded-[28px] bg-[var(--surface)] px-7 py-7">
      <img
        src={imageSrc}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(245,245,247,0.18)_0%,rgba(245,245,247,0.40)_34%,rgba(245,245,247,0.92)_100%)]" />

      <div className="relative flex h-full flex-col justify-end">
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
    </div>
  );
}
