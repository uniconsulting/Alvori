'use client';

import { Dot, Route } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Container } from '@/components/layout/Container';
import { GeographyGlobe } from '@/components/sections/GeographyGlobe';
import { GEO_CITIES, GEO_ROUTES } from '@/components/sections/geography-data';

const DISTRICTS = [
  'Центральный федеральный округ',
  'Северо-Западный федеральный округ',
  'Южный федеральный округ',
  'Приволжский федеральный округ',
  'Уральский федеральный округ',
];

export function GeographySection() {
  const [activeRouteIndex, setActiveRouteIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveRouteIndex((prev) => (prev + 1) % GEO_ROUTES.length);
    }, 4200);

    return () => window.clearInterval(interval);
  }, []);

  const activeRoute = GEO_ROUTES[activeRouteIndex];
  const from = GEO_CITIES.find((city) => city.id === activeRoute.from)!;
  const to = GEO_CITIES.find((city) => city.id === activeRoute.to)!;

  return (
    <div className="h-full">
      <Container>
        <div className="px-[14px] md:px-[18px] xl:px-[22px]">
          <div className="grid grid-cols-[0.92fr_1.08fr] items-stretch gap-10 xl:gap-14">
            <div className="flex h-full flex-col justify-between">
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between gap-6">
                  <h2 className="font-heading text-[52px] leading-[0.94] tracking-[-0.045em] text-[var(--text)]">
                    <span className="mr-[0.014em] inline-block">Г</span>еография
                  </h2>

                  <div>
                    <GeographyBreadcrumb />
                  </div>
                </div>

                <div className="mt-1 flex flex-col gap-5">
                  <p
                    className="max-w-[660px] text-[20px] font-normal leading-[1.28] tracking-[-0.018em] text-[var(--text)]"
                    style={{ fontFamily: 'var(--font-body-text)' }}
                  >
                    Работаем по ключевым направлениям
                    <br />
                    внутри РФ, выстраивая устойчивую логистику
                    <br />
                    под задачу клиента.
                  </p>
                </div>

                <div className="mt-1 flex flex-col gap-3">
                  {DISTRICTS.map((district, index) => (
                    <DistrictPill
                      key={district}
                      label={district}
                      delayMs={index * 520}
                    />
                  ))}
                </div>
              </div>

<div className="pt-6">
  <div className="w-full rounded-[18px] bg-[#26292e] px-5 py-4 backdrop-blur-md">
    <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-white/56">
      активное направление
    </p>

    <div className="mt-2 flex items-center gap-3">
      <Route
        size={18}
        strokeWidth={2.05}
        className="shrink-0 text-[var(--accent-1)]"
      />

      <p className="text-[18px] font-semibold tracking-[-0.02em] text-white">
        {from.label} — {to.label}
      </p>
    </div>
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

function DistrictPill({
  label,
  delayMs,
}: {
  label: string;
  delayMs: number;
}) {
  return (
    <div
      className="geography-pill inline-flex w-fit rounded-[16px] bg-[var(--surface)] px-4 py-3 shadow-[0_8px_20px_rgba(38,41,46,0.04)]"
      style={{ animationDelay: `${delayMs}ms` }}
    >
      <span
        className="text-[16px] font-medium leading-[1.28] tracking-[-0.014em] text-[var(--text)]"
        style={{ fontFamily: 'var(--font-body-text)' }}
      >
        {label}
      </span>
    </div>
  );
}
