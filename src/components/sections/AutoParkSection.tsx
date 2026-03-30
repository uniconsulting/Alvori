'use client';

import { Dot } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { AutoParkGallery } from '@/components/sections/AutoParkGallery';

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

export function AutoParkSection() {
  return (
    <div className="h-full">
      <Container>
        <div className="px-[14px] md:px-[18px] xl:px-[22px]">
          <div className="flex flex-col gap-8 xl:gap-10">
            <div className="flex items-center justify-between gap-6">
              <h2 className="font-heading text-[52px] leading-[0.94] tracking-[-0.045em] text-[var(--text)]">
                Наш автопарк
              </h2>

              <AutoParkBreadcrumb />
            </div>

            <div className="grid grid-cols-[1.82fr_1fr] items-start gap-8 xl:gap-10">
              <div className="flex flex-col gap-5">
                <div className="flex gap-5">
                  <CountCard value="15" />

                  <div className="flex min-w-0 flex-1 gap-5">
                    <div className="w-[388px] shrink-0">
                      <TitleCard label="тягачей" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <TitleCard label="и полуприцепов" dark />
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-[504px] shrink-0">
                    <InfoCard
                      brands={TRUCK_BRANDS}
                      points={TRUCK_POINTS}
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <InfoCard
                      brands={TRAILER_BRANDS}
                      points={TRAILER_POINTS}
                    />
                  </div>
                </div>
              </div>

              <AutoParkGallery />
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

function CountCard({ value }: { value: string }) {
  return (
    <div className="flex h-[96px] w-[96px] shrink-0 items-center justify-center rounded-[26px] bg-[var(--accent-1)]">
      <span className="font-heading text-[52px] leading-none tracking-[-0.05em] text-white">
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
      className={
        dark
          ? 'flex h-[96px] items-center justify-center rounded-[26px] bg-[#26292e] px-8'
          : 'flex h-[96px] items-center justify-center rounded-[26px] border-[3px] border-[rgba(38,41,46,0.92)] bg-transparent px-8'
      }
    >
      <span
        className={
          dark
            ? 'font-heading text-[30px] leading-none tracking-[-0.032em] text-white'
            : 'font-heading text-[30px] leading-none tracking-[-0.032em] text-[var(--text)]'
        }
      >
        {label}
      </span>
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
    <div className="rounded-[26px] bg-[var(--surface)] px-7 py-7">
      <div className="flex flex-wrap gap-3">
        {brands.map((brand) => (
          <BrandPill key={brand} label={brand} />
        ))}
      </div>

      <div
        className="mt-9 flex flex-col gap-5 text-[16px] font-normal leading-[1.28] tracking-[-0.016em] text-[var(--text)]"
        style={{ fontFamily: 'var(--font-body-text)' }}
      >
        {points.map((point) => (
          <div key={point} className="flex items-start gap-3">
            <span className="mt-[1px] text-[24px] leading-none text-[var(--text)]">•</span>
            <span>{point}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BrandPill({ label }: { label: string }) {
  return (
    <div className="inline-flex h-[44px] items-center rounded-[12px] bg-[var(--bg)] px-5">
      <span
        className="text-[16px] font-semibold leading-none tracking-[-0.02em] text-[var(--text)]"
        style={{ fontFamily: 'var(--font-body-text)' }}
      >
        {label}
      </span>
    </div>
  );
}
