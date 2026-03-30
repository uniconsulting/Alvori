'use client';

import Link from 'next/link';
import { Dot, Mail, MapPin, Phone, SendHorizonal } from 'lucide-react';
import { Container } from '@/components/layout/Container';

export function ContactsSection() {
  return (
    <div className="h-full">
      <Container>
        <div className="px-[14px] md:px-[18px] xl:px-[22px]">
          <div className="flex flex-col gap-8 xl:gap-10">
            <div className="flex items-center justify-between gap-6">
              <h2 className="font-heading text-[52px] leading-[0.94] tracking-[-0.045em] text-[var(--text)]">
                Контакты
              </h2>

              <ContactsBreadcrumb />
            </div>

            <div className="grid grid-cols-[0.94fr_1.06fr] items-stretch gap-6 xl:gap-8">
              <div className="flex flex-col gap-6">
                <ContactInfoCard />
                <ContactFormCard />
              </div>

              <MapCard />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

function ContactsBreadcrumb() {
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
        контакты
      </span>
    </div>
  );
}

function ContactInfoCard() {
  return (
    <div className="rounded-[30px] bg-[var(--surface)] px-8 py-8">
      <p
        className="max-w-[560px] text-[20px] font-normal leading-[1.28] tracking-[-0.018em] text-[var(--text)]"
        style={{ fontFamily: 'var(--font-body-text)' }}
      >
        Оставьте короткий запрос,
        <br />
        и мы свяжемся с вами для обсуждения
        <br />
        маршрута, условий и сроков.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-3">
        <ContactLine
          icon={Phone}
          label="Телефон"
          value="+7 (___) ___-__-__"
          href="tel:+70000000000"
        />

        <ContactLine
          icon={SendHorizonal}
          label="Telegram"
          value="@your_telegram"
          href="https://t.me/your_telegram"
        />

        <ContactLine
          icon={Mail}
          label="Email"
          value="info@example.ru"
          href="mailto:info@example.ru"
        />

        <ContactLine
          icon={MapPin}
          label="Адрес"
          value="г. Ульяновск, ул. Жигулевская, 17"
        />
      </div>
    </div>
  );
}

function ContactLine({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-center gap-4 rounded-[18px] bg-[var(--bg)] px-5 py-4">
      <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[12px] bg-[var(--surface)]">
        <Icon size={18} strokeWidth={2.05} className="text-[var(--text)]" />
      </div>

      <div className="flex min-w-0 flex-col">
        <span
          className="text-[13px] font-semibold uppercase tracking-[0.07em] text-[var(--text-muted)]"
          style={{ fontFamily: 'var(--font-body-text)' }}
        >
          {label}
        </span>

        <span
          className="truncate text-[16px] font-medium leading-[1.25] tracking-[-0.015em] text-[var(--text)]"
          style={{ fontFamily: 'var(--font-body-text)' }}
        >
          {value}
        </span>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block">
        {content}
      </a>
    );
  }

  return content;
}

function ContactFormCard() {
  return (
    <div className="rounded-[30px] bg-[var(--surface)] px-8 py-8">
      <div className="flex items-start justify-between gap-6">
        <div>
          <h3 className="font-heading text-[30px] leading-[0.98] tracking-[-0.03em] text-[var(--text)]">
            Короткий запрос
          </h3>

          <p
            className="mt-3 max-w-[520px] text-[16px] font-normal leading-[1.3] tracking-[-0.014em] text-[var(--text-muted)]"
            style={{ fontFamily: 'var(--font-body-text)' }}
          >
            Заполните краткую форму для первичного контакта.
          </p>
        </div>
      </div>

      <form className="mt-7 flex flex-col gap-4">
        <Field label="Ваше имя">
          <input
            type="text"
            placeholder="Введите имя"
            className="h-[56px] w-full rounded-[16px] bg-[var(--bg)] px-5 text-[16px] font-medium tracking-[-0.015em] text-[var(--text)] outline-none placeholder:text-[var(--text-muted)]"
            style={{ fontFamily: 'var(--font-body-text)' }}
          />
        </Field>

        <Field label="Телефон или Telegram">
          <input
            type="text"
            placeholder="+7 (...) ... или @telegram"
            className="h-[56px] w-full rounded-[16px] bg-[var(--bg)] px-5 text-[16px] font-medium tracking-[-0.015em] text-[var(--text)] outline-none placeholder:text-[var(--text-muted)]"
            style={{ fontFamily: 'var(--font-body-text)' }}
          />
        </Field>

        <Field label="Краткое описание задачи">
          <textarea
            rows={5}
            placeholder="Опишите маршрут, задачу или пожелания"
            className="w-full resize-none rounded-[16px] bg-[var(--bg)] px-5 py-4 text-[16px] font-medium tracking-[-0.015em] text-[var(--text)] outline-none placeholder:text-[var(--text-muted)]"
            style={{ fontFamily: 'var(--font-body-text)' }}
          />
        </Field>

        <div className="mt-2 flex flex-col gap-3">
          <button
            type="submit"
            className="header-utility-button inline-flex h-[58px] items-center justify-center rounded-[18px] bg-[var(--accent-1)] px-7 text-[17px] font-semibold tracking-[-0.02em] text-white"
            style={{ fontFamily: 'var(--font-body-text)' }}
          >
            Отправить запрос
          </button>

          <Link
            href="/request"
            className="inline-flex h-[52px] items-center justify-center rounded-[16px] bg-[var(--bg)] px-6 text-[15px] font-semibold tracking-[-0.016em] text-[var(--text)]"
            style={{ fontFamily: 'var(--font-body-text)' }}
          >
            Перейти к расширенной форме
          </Link>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span
        className="text-[13px] font-semibold uppercase tracking-[0.07em] text-[var(--text-muted)]"
        style={{ fontFamily: 'var(--font-body-text)' }}
      >
        {label}
      </span>
      {children}
    </label>
  );
}

function MapCard() {
  return (
    <div className="flex h-full flex-col rounded-[30px] bg-[var(--surface)] p-5">
      <div className="relative min-h-[100%] flex-1 overflow-hidden rounded-[24px] bg-[#e9edf2]">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="mx-auto flex h-[62px] w-[62px] items-center justify-center rounded-[18px] bg-white/88 shadow-[0_10px_24px_rgba(38,41,46,0.08)]">
              <MapPin size={26} strokeWidth={2.1} className="text-[var(--accent-1)]" />
            </div>

            <p
              className="mt-4 text-[17px] font-semibold tracking-[-0.018em] text-[var(--text)]"
              style={{ fontFamily: 'var(--font-body-text)' }}
            >
              Модуль Яндекс.Карт
            </p>

            <p
              className="mt-2 text-[14px] font-medium tracking-[-0.014em] text-[var(--text-muted)]"
              style={{ fontFamily: 'var(--font-body-text)' }}
            >
              Здесь будет встроена карта с адресом офиса
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-start gap-3 rounded-[18px] bg-[var(--bg)] px-5 py-4">
        <MapPin size={18} strokeWidth={2.05} className="mt-[2px] shrink-0 text-[var(--accent-1)]" />

        <div className="flex flex-col">
          <span
            className="text-[13px] font-semibold uppercase tracking-[0.07em] text-[var(--text-muted)]"
            style={{ fontFamily: 'var(--font-body-text)' }}
          >
            Адрес офиса
          </span>

          <span
            className="text-[16px] font-medium leading-[1.3] tracking-[-0.015em] text-[var(--text)]"
            style={{ fontFamily: 'var(--font-body-text)' }}
          >
            г. Ульяновск, ул. Жигулевская, 17
          </span>
        </div>
      </div>
    </div>
  );
}
