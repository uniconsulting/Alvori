'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Container } from '@/components/layout/Container';
import { appRoutes } from '@/config/routes';
import { homeAnchorIds } from '@/config/anchors';

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export function ContactsSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsActive(true);
        }
      },
      {
        threshold: 0.16,
        rootMargin: '120px 0px 120px 0px',
      },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div id={homeAnchorIds.contacts} ref={sectionRef} className="h-full scroll-mt-[120px]">
      <Container>
        <div className="px-[14px] md:px-[18px] xl:px-[22px]">
          <div className="flex flex-col gap-8 xl:gap-10">
            <div
              className={cn(
                'transition-[opacity,transform,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
                isActive
                  ? 'translate-y-0 opacity-100 blur-0'
                  : 'translate-y-[18px] opacity-0 blur-[10px]',
              )}
            >
              <div className="flex items-center justify-between gap-6">
                <h2 className="font-heading text-[52px] leading-[0.94] tracking-[-0.045em] text-[var(--text)]">
                  Связаться с нами
                </h2>

                <Link
                  href={appRoutes.request}
                  className="header-utility-button inline-flex h-[42px] items-center rounded-[16px] bg-[var(--surface)] px-[16px] text-[14px] font-semibold lowercase tracking-[-0.02em] text-[var(--text)] shadow-[0_8px_20px_rgba(38,41,46,0.04)]"
                  style={{ fontFamily: 'var(--font-body-text)' }}
                >
                  запросить или отправить коммерческое предложение
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-[0.94fr_1.06fr] items-stretch gap-6 xl:gap-8">
              <div
                className={cn(
                  'transition-[opacity,transform,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
                  isActive
                    ? 'translate-y-0 opacity-100 blur-0'
                    : 'translate-y-[22px] opacity-0 blur-[10px]',
                )}
                style={{ transitionDelay: '140ms' }}
              >
                <ContactFormCard />
              </div>

              <div
                className={cn(
                  'transition-[opacity,transform,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
                  isActive
                    ? 'translate-y-0 opacity-100 blur-0'
                    : 'translate-y-[22px] opacity-0 blur-[10px]',
                )}
                style={{ transitionDelay: '260ms' }}
              >
                <MapCard />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

function ContactFormCard() {
  return (
    <div className="flex h-full flex-col rounded-[30px] bg-[var(--surface)] px-8 py-8">
      <div>
        <h3 className="font-heading text-[30px] leading-[0.98] tracking-[-0.03em] text-[var(--text)]">
          Короткий запрос
        </h3>

        <p
          className="mt-3 max-w-[520px] text-[16px] font-normal leading-[1.3] tracking-[-0.014em] text-[var(--text-muted)]"
          style={{ fontFamily: 'var(--font-body-text)' }}
        >
          Оставьте краткую информацию по задаче, и мы свяжемся с вами для
          обсуждения маршрута, условий и сроков.
        </p>
      </div>

      <form className="mt-7 flex flex-1 flex-col gap-4">
        <Field label="Ваше имя">
          <input
            type="text"
            placeholder="Введите имя"
            className="h-[56px] w-full rounded-[12px] border border-transparent bg-[var(--bg)] px-5 text-[15px] font-normal tracking-[-0.014em] text-[var(--text)] outline-none transition-[border-color,box-shadow,background-color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] placeholder:text-[13px] placeholder:font-normal placeholder:tracking-[-0.012em] placeholder:text-[var(--text-muted)] hover:border-[rgba(38,41,46,0.08)] focus:border-[rgba(250,176,33,0.34)] focus:bg-white focus:shadow-[0_0_0_4px_rgba(250,176,33,0.08)]"
            style={{ fontFamily: 'var(--font-body-text)' }}
          />
        </Field>

        <Field label="Телефон или Telegram">
          <input
            type="text"
            placeholder="+7 (...) ... или @telegram"
            className="h-[56px] w-full rounded-[12px] border border-transparent bg-[var(--bg)] px-5 text-[15px] font-normal tracking-[-0.014em] text-[var(--text)] outline-none transition-[border-color,box-shadow,background-color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] placeholder:text-[13px] placeholder:font-normal placeholder:tracking-[-0.012em] placeholder:text-[var(--text-muted)] hover:border-[rgba(38,41,46,0.08)] focus:border-[rgba(250,176,33,0.34)] focus:bg-white focus:shadow-[0_0_0_4px_rgba(250,176,33,0.08)]"
            style={{ fontFamily: 'var(--font-body-text)' }}
          />
        </Field>

        <Field label="Краткое описание задачи">
          <textarea
            rows={4}
            placeholder="Опишите маршрут, задачу или пожелания"
            className="w-full min-h-[132px] resize-none rounded-[12px] border border-transparent bg-[var(--bg)] px-5 py-4 text-[15px] font-normal tracking-[-0.014em] text-[var(--text)] outline-none transition-[border-color,box-shadow,background-color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] placeholder:text-[13px] placeholder:font-normal placeholder:tracking-[-0.012em] placeholder:text-[var(--text-muted)] hover:border-[rgba(38,41,46,0.08)] focus:border-[rgba(250,176,33,0.34)] focus:bg-white focus:shadow-[0_0_0_4px_rgba(250,176,33,0.08)]"
            style={{ fontFamily: 'var(--font-body-text)' }}
          />
        </Field>

        <div className="mt-2 flex flex-col gap-3">
          <button
            type="submit"
            className="header-utility-button inline-flex h-[58px] items-center justify-center rounded-[14px] bg-[var(--accent-1)] px-7 text-[17px] font-semibold tracking-[-0.02em] text-white"
            style={{ fontFamily: 'var(--font-body-text)' }}
          >
            отправить запрос
          </button>

          <Link
            href={appRoutes.request}
            className="inline-flex h-[52px] items-center justify-center rounded-[12px] bg-[var(--bg)] px-6 text-[15px] font-semibold lowercase tracking-[-0.016em] text-[var(--text)] transition-[transform,box-shadow,background-color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[1px] hover:bg-white hover:shadow-[0_10px_24px_rgba(38,41,46,0.05)]"
            style={{ fontFamily: 'var(--font-body-text)' }}
          >
            перейти к расширенной форме
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
        className="pl-[5px] text-[13px] font-semibold uppercase tracking-[0.07em] text-[var(--text-muted)]"
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
      <div className="relative min-h-[100%] flex-1 overflow-hidden rounded-[10px] bg-[#e9edf2]">
        <iframe
          src="https://yandex.ru/map-widget/v1/?um=constructor%3A27a66f075dac296d1f0870f4a2a9f711d36545eef60e5931464e72c1f6040eb4&amp;source=constructor"
          width="760"
          height="620"
          frameBorder="0"
          className="absolute inset-0 h-full w-full border-0"
          title="Карта офиса АЛВОРИ"
        />
        <div className="pointer-events-none absolute inset-0 rounded-[10px] border border-white/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]" />
        <div className="pointer-events-none absolute inset-0 rounded-[10px] bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.00)_18%,rgba(38,41,46,0.03)_100%)]" />
      </div>
    </div>
  );
}
