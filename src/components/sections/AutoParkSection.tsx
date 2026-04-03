'use client';

import { Dot } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Container } from '@/components/layout/Container';
import { AutoParkGallery } from '@/components/sections/AutoParkGallery';
import { homeAnchorIds } from '@/config/anchors';

const TRUCK_BRANDS = ['DAF', 'SCANIA', 'MERCEDES', 'MAN'];
const TRAILER_BRANDS = ['KRONE', 'SCHMITZ', 'TONAR'];

const TRUCK_POINTS = [
  'Возраст сцепок ≤ 5 лет',
  'Регулярное ТО и проверки',
  'ADR лицензии и комплектность',
  'Компетентные водители',
];

const TRAILER_POINTS = [
  'Тенты 90–110 м³',
  'Тенты — 16 м',
  'Рефрижераторы',
  'Страхование груза',
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

type FleetMode = 'trucks' | 'trailers';

export function AutoParkSection() {
  const [mobileMode, setMobileMode] = useState<FleetMode>('trucks');

  useEffect(() => {
    const interval = window.setInterval(() => {
      setMobileMode((prev) => (prev === 'trucks' ? 'trailers' : 'trucks'));
    }, 4200);

    return () => window.clearInterval(interval);
  }, []);

  const mobileTitle = mobileMode === 'trucks' ? 'тягачей' : 'и полуприцепов';
  const mobileBrands = mobileMode === 'trucks' ? TRUCK_BRANDS : TRAILER_BRANDS;
  const mobilePoints = mobileMode === 'trucks' ? TRUCK_POINTS : TRAILER_POINTS;
  const mobileTitleDark = mobileMode === 'trailers';

  return (
    <div id={homeAnchorIds.fleet} className="h-full overflow-visible scroll-mt-[120px]">
      <Container>
        <div
          className="overflow-visible px-[14px] md:px-[18px] xl:px-[22px]"
          style={
            {
              '--count-w': '76px',
              '--top-h': '78px',
              '--section-gap': '20px',
              '--truck-title-w': '314px',
              '--trailer-title-w': '338px',
            } as React.CSSProperties
          }
        >
          <div className="hidden flex-col gap-8 overflow-visible xl:flex xl:gap-10">
            <div className="flex items-center justify-between gap-6">
              <h2 className="font-heading text-[52px] leading-[0.94] tracking-[-0.045em] text-[var(--text)]">
                Наш автопарк
              </h2>

              <AutoParkBreadcrumb />
            </div>

            <div className="grid grid-cols-[1.82fr_1fr] items-start gap-8 overflow-visible xl:gap-10">
              <div className="relative z-10 flex flex-col gap-5">
                <div className="flex items-start gap-5">
                  <CountCard value={17} />

                  <div className="w-[var(--truck-title-w)] shrink-0">
                    <TitleCard label="тягачей" />
                  </div>

                  <div className="w-[var(--trailer-title-w)] shrink-0">
                    <TitleCard label="и полуприцепов" dark />
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-[calc(var(--count-w)+var(--section-gap)+var(--truck-title-w))] shrink-0">
                    <InfoCard brands={TRUCK_BRANDS} points={TRUCK_POINTS} />
                  </div>

                  <div className="w-[var(--trailer-title-w)] shrink-0">
                    <InfoCard brands={TRAILER_BRANDS} points={TRAILER_POINTS} />
                  </div>
                </div>
              </div>

              <div className="relative z-30 overflow-visible">
                <AutoParkGallery />
              </div>
            </div>
          </div>

          <div className="xl:hidden">
            <div className="flex flex-col gap-8">
              <div className="flex items-start justify-between gap-4">
                <h2 className="font-heading text-[34px] leading-[0.94] tracking-[-0.045em] text-[var(--text)] md:text-[42px]">
                  Наш автопарк
                </h2>
              </div>

              <div className="flex items-start gap-3">
                <MobileCountCard value={17} />

                <div className="min-w-0 flex-1">
                  <MobileTitleSwitcher
                    label={mobileTitle}
                    dark={mobileTitleDark}
                    mode={mobileMode}
                  />
                </div>
              </div>

              <MobileInfoSwitcher
                brands={mobileBrands}
                points={mobilePoints}
                mode={mobileMode}
              />

              <AutoParkGallery mobile />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

function AutoParkBreadcrumb() {
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
        автопарк
      </span>
    </div>
  );
}

function CountCard({ value }: { value: number }) {
  return (
    <div className="autopark-frame-hover flex h-[var(--top-h)] w-[var(--count-w)] shrink-0 items-center justify-center rounded-[22px] bg-[var(--accent-1)]">
      <span className="relative left-[-2px] top-[1px] font-heading text-[42px] leading-none tracking-[-0.05em] text-white tabular-nums">
        {value}
      </span>
    </div>
  );
}

function MobileCountCard({ value }: { value: number }) {
  return (
    <div className="autopark-frame-hover flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-[20px] bg-[var(--accent-1)]">
      <span className="relative left-[-1px] top-[1px] font-heading text-[40px] leading-none tracking-[-0.05em] text-white tabular-nums">
        {value}
      </span>
    </div>
  );
}

function TitleCard({
  label,
  dark = false,
}: {
  label: string;
  dark?: boolean;
}) {
  return (
    <div
      className={cn(
        'autopark-frame-hover flex h-[var(--top-h)] items-center justify-center rounded-[24px] px-6',
        dark
          ? 'bg-[#26292e]'
          : 'border-[3px] border-[rgba(38,41,46,0.92)] bg-transparent',
      )}
    >
      <span
        className={cn(
          'font-heading text-[26px] leading-none tracking-[-0.03em]',
          dark ? 'text-white' : 'text-[var(--text)]',
        )}
      >
        {label}
      </span>
    </div>
  );
}

function MobileTitleSwitcher({
  label,
  dark,
  mode,
}: {
  label: string;
  dark: boolean;
  mode: FleetMode;
}) {
  return (
    <div
      className={cn(
        'relative h-[72px] overflow-hidden rounded-[20px]',
        dark
          ? 'bg-[#26292e]'
          : 'border-[3px] border-[rgba(38,41,46,0.92)] bg-transparent',
      )}
    >
      <div
        key={mode}
        className="flex h-full items-center justify-center px-5"
        style={{
          animation: 'autoparkMobileFadeIn 320ms cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        <span
          className={cn(
            'font-heading text-[24px] leading-none tracking-[-0.03em]',
            dark ? 'text-white' : 'text-[var(--text)]',
          )}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

function InfoCard({
  brands,
  points,
}: {
  brands: string[];
  points: string[];
}) {
  return (
    <div className="autopark-frame-hover rounded-[24px] bg-[var(--surface)] px-5 py-5">
      <div className="flex flex-wrap gap-3">
        {brands.map((brand) => (
          <BrandPill key={brand} label={brand} />
        ))}
      </div>

      <div
        className="mt-8 flex flex-col gap-4 text-[15px] font-normal leading-[1.26] tracking-[-0.015em] text-[var(--text)]"
        style={{ fontFamily: 'var(--font-body-text)' }}
      >
        {points.map((point) => (
          <div key={point} className="flex items-center gap-3">
            <span className="h-[6px] w-[6px] shrink-0 rounded-full bg-[var(--text)]" />
            <span>{point}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MobileInfoSwitcher({
  brands,
  points,
  mode,
}: {
  brands: string[];
  points: string[];
  mode: FleetMode;
}) {
  return (
    <div className="relative min-h-[244px] overflow-hidden rounded-[22px] bg-[var(--surface)] px-5 py-5 shadow-[0_8px_20px_rgba(38,41,46,0.04)]">
      <div
        key={mode}
        style={{
          animation: 'autoparkMobileFadeIn 340ms cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        <div className="flex flex-wrap gap-2.5">
          {brands.map((brand) => (
            <MobileBrandPill key={brand} label={brand} />
          ))}
        </div>

        <div
          className="mt-6 flex flex-col gap-3.5 text-[15px] font-normal leading-[1.26] tracking-[-0.015em] text-[var(--text)]"
          style={{ fontFamily: 'var(--font-body-text)' }}
        >
          {points.map((point) => (
            <div key={point} className="flex items-center gap-3">
              <span className="h-[6px] w-[6px] shrink-0 rounded-full bg-[var(--text)]" />
              <span>{point}</span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes autoparkMobileFadeIn {
          0% {
            opacity: 0;
            transform: translateY(8px) scale(0.992);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}

function BrandPill({ label }: { label: string }) {
  return (
    <div className="autopark-pill-hover inline-flex h-[40px] items-center rounded-[12px] bg-[var(--bg)] px-4">
      <span
        className="text-[15px] font-semibold leading-none tracking-[-0.02em] text-[var(--text)]"
        style={{ fontFamily: 'var(--font-body-text)' }}
      >
        {label}
      </span>
    </div>
  );
}

function MobileBrandPill({ label }: { label: string }) {
  return (
    <div className="autopark-pill-hover inline-flex h-[38px] items-center rounded-[12px] bg-[var(--bg)] px-3.5">
      <span
        className="text-[14px] font-semibold leading-none tracking-[-0.02em] text-[var(--text)]"
        style={{ fontFamily: 'var(--font-body-text)' }}
      >
        {label}
      </span>
    </div>
  );
}
