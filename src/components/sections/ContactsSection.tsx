'use client';

import Link from 'next/link';
import { FileText } from 'lucide-react';
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
              <div className="hidden items-center justify-between gap-6 xl:flex">
                <h2 className="font-heading text-[52px] leading-[0.94] tracking-[-0.045em] text-[var(--text)]">
                  Связаться с нами
                </h2>

                <RequestProposalButton />
              </div>

              <div className="xl:hidden">
                <h2 className="font-heading text-[34px] leading-[0.94] tracking-[-0.045em] text-[var(--text)] md:text-[42px]">
                  Связаться с нами
                </h2>

                <div className="mt-8">
                  <RequestProposalButton mobile />
                </div>
              </div>
            </div>

            <div className="hidden grid-cols-[0.94fr_1.06fr] items-stretch gap-6 xl:grid xl:gap-8">
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

            <div className="flex flex-col gap-4 xl:hidden">
              <div
                className={cn(
                  'transition-[opacity,transform,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
                  isActive
                    ? 'translate-y-0 opacity-100 blur-0'
                    : 'translate-y-[22px] opacity-0 blur-[10px]',
                )}
                style={{ transitionDelay: '140ms' }}
              >
                <ContactFormCard mobile />
              </div>

              <div
                className={cn(
                  'transition-[opacity,transform,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
                  isActive
                    ? 'translate-y-0 opacity-100 blur-0'
                    : 'translate-y-[22px] opacity-0 blur-[10px]',
                )}
                style={{ transitionDelay: '220ms' }}
              >
                <MapCard mobile />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

function RequestProposalButton({ mobile = false }: { mobile?: boolean }) {
  return (
    <Link
      href={appRoutes.request}
      className={cn(
        'header-utility-button inline-flex items-center rounded-[16px] bg-[var(--surface)] text-[var(--text)] shadow-[0_8px_20px_rgba(38,41,46,0.04)]',
        mobile
          ? 'min-h-[58px] w-full gap-3 px-4 py-3'
          : 'h-[42px] gap-3 px-[12px] pr-[16px]',
      )}
      style={{ fontFamily: 'var(--font-body-text)' }}
    >
      <span
        className={cn(
          'inline-flex shrink-0 items-center justify-center bg-[#26292e] text-white',
          mobile ? 'h-[34px] w-[34px] rounded-[10px]' : 'h-[28px] w-[28px] rounded-[8px]',
        )}
      >
        <FileText size={mobile ? 16 : 14} strokeWidth={2.05} />
      </span>

      <span
        className={cn(
          'text-left font-semibold lowercase tracking-[-0.02em]',
          mobile ? 'text-[15px] leading-[1.18]' : 'text-[14px] leading-none',
        )}
      >
        запросить или отправить
        {mobile ? <br /> : ' '}
        коммерческое предложение
      </span>
    </Link>
  );
}

function ContactFormCard({ mobile = false }: { mobile?: boolean }) {
  return (
    <div
      className={cn(
        'flex h-full flex-col bg-[var(--surface)]',
        mobile ? 'rounded-[24px] px-5 py-5' : 'rounded-[30px] px-8 py-8',
      )}
    >
      <div>
        <h3
          className={cn(
            'font-heading tracking-[-0.03em] text-[var(--text)]',
            mobile ? 'text-[24px] leading-[0.98]' : 'text-[30px] leading-[0.98]',
          )}
        >
          Короткий запрос
        </h3>

        <div className="xl:hidden">
          <p
            className="mt-3 max-w-none text-[15px] font-normal leading-[1.3] tracking-[-0.014em] text-[var(--text-muted)]"
            style={{ fontFamily: 'var(--font-body-text)' }}
          >
            Оставьте краткую информацию по задаче,
            <br />
            и мы свяжемся с вами для обсуждения
            <br />
            маршрута, условий и сроков.
          </p>
        </div>

        <div className="hidden xl:block">
          <p
            className="mt-3 max-w-[520px] text-[16px] font-normal leading-[1.3] tracking-[-0.014em] text-[var(--text-muted)]"
            style={{ fontFamily: 'var(--font-body-text)' }}
          >
            Оставьте краткую информацию по задаче, и мы свяжемся с вами для
            обсуждения маршрута, условий и сроков.
          </p>
        </div>
      </div>

      <form className={cn('flex flex-1 flex-col', mobile ? 'mt-6 gap-3.5' : 'mt-7 gap-4')}>
        <Field label="Ваше имя" mobile={mobile}>
          <input
            type="text"
            placeholder="Введите имя"
            className={cn(
              'w-full rounded-[12px] border border-transparent bg-[var(--bg)] text-[var(--text)] outline-none transition-[border-color,box-shadow,background-color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] placeholder:font-normal placeholder:tracking-[-0.012em] placeholder:text-[var(--text-muted)] hover:border-[rgba(38,41,46,0.08)] focus:border-[rgba(250,176,33,0.34)] focus:bg-white focus:shadow-[0_0_0_4px_rgba(250,176,33,0.08)]',
              mobile
                ? 'h-[54px] px-4 text-[15px] placeholder:text-[13px]'
                : 'h-[56px] px-5 text-[15px] placeholder:text-[13px]',
            )}
            style={{ fontFamily: 'var(--font-body-text)' }}
          />
        </Field>

        <Field label="Телефон или Telegram" mobile={mobile}>
          <input
            type="text"
            placeholder="+7 (...) ... или @telegram"
            className={cn(
              'w-full rounded-[12px] border border-transparent bg-[var(--bg)] text-[var(--text)] outline-none transition-[border-color,box-shadow,background-color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] placeholder:font-normal placeholder:tracking-[-0.012em] placeholder:text-[var(--text-muted)] hover:border-[rgba(38,41,46,0.08)] focus:border-[rgba(250,176,33,0.34)] focus:bg-white focus:shadow-[0_0_0_4px_rgba(250,176,33,0.08)]',
              mobile
                ? 'h-[54px] px-4 text-[15px] placeholder:text-[13px]'
                : 'h-[56px] px-5 text-[15px] placeholder:text-[13px]',
            )}
            style={{ fontFamily: 'var(--font-body-text)' }}
          />
        </Field>

        <Field label="Краткое описание задачи" mobile={mobile}>
          <textarea
            rows={4}
            placeholder="Опишите маршрут, задачу или пожелания"
            className={cn(
              'w-full resize-none rounded-[12px] border border-transparent bg-[var(--bg)] text-[var(--text)] outline-none transition-[border-color,box-shadow,background-color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] placeholder:font-normal placeholder:tracking-[-0.012em] placeholder:text-[var(--text-muted)] hover:border-[rgba(38,41,46,0.08)] focus:border-[rgba(250,176,33,0.34)] focus:bg-white focus:shadow-[0_0_0_4px_rgba(250,176,33,0.08)]',
              mobile
                ? 'min-h-[124px] px-4 py-4 text-[15px] placeholder:text-[13px]'
                : 'min-h-[132px] px-5 py-4 text-[15px] placeholder:text-[13px]',
            )}
            style={{ fontFamily: 'var(--font-body-text)' }}
          />
        </Field>

        <div className={cn('flex flex-col gap-3', mobile ? 'mt-1' : 'mt-2')}>
          <button
            type="submit"
            className={cn(
              'header-utility-button inline-flex items-center justify-center rounded-[14px] bg-[var(--accent-1)] font-semibold tracking-[-0.02em] text-white',
              mobile ? 'h-[56px] px-6 text-[16px]' : 'h-[58px] px-7 text-[17px]',
            )}
            style={{ fontFamily: 'var(--font-body-text)' }}
          >
            отправить запрос
          </button>

          <Link
            href={appRoutes.request}
            className={cn(
              'inline-flex items-center justify-center rounded-[12px] bg-[var(--bg)] font-semibold lowercase tracking-[-0.016em] text-[var(--text)] transition-[transform,box-shadow,background-color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[1px] hover:bg-white hover:shadow-[0_10px_24px_rgba(38,41,46,0.05)]',
              mobile ? 'min-h-[50px] px-5 py-3 text-[15px]' : 'h-[52px] px-6 text-[15px]',
            )}
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
  mobile = false,
}: {
  label: string;
  children: React.ReactNode;
  mobile?: boolean;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span
        className={cn(
          'uppercase text-[var(--text-muted)]',
          mobile
            ? 'pl-[4px] text-[12px] font-semibold tracking-[0.07em]'
            : 'pl-[5px] text-[13px] font-semibold tracking-[0.07em]',
        )}
        style={{ fontFamily: 'var(--font-body-text)' }}
      >
        {label}
      </span>
      {children}
    </label>
  );
}

function MapCard({ mobile = false }: { mobile?: boolean }) {
  return (
    <div
      className={cn(
        'flex h-full flex-col bg-[var(--surface)]',
        mobile ? 'rounded-[24px] p-4' : 'rounded-[30px] p-5',
      )}
    >
      <div
        className={cn(
          'relative flex-1 overflow-hidden bg-[#e9edf2]',
          mobile ? 'min-h-[320px] rounded-[14px]' : 'min-h-[100%] rounded-[10px]',
        )}
      >
        <iframe
          src="https://yandex.ru/map-widget/v1/?um=constructor%3A27a66f075dac296d1f0870f4a2a9f711d36545eef60e5931464e72c1f6040eb4&amp;source=constructor"
          width="760"
          height="620"
          frameBorder="0"
          className="absolute inset-0 h-full w-full border-0"
          title="Карта офиса АЛВОРИ"
        />
        <div
          className={cn(
            'pointer-events-none absolute inset-0 border border-white/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]',
            mobile ? 'rounded-[14px]' : 'rounded-[10px]',
          )}
        />
        <div
          className={cn(
            'pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.00)_18%,rgba(38,41,46,0.03)_100%)]',
            mobile ? 'rounded-[14px]' : 'rounded-[10px]',
          )}
        />
      </div>
    </div>
  );
}
