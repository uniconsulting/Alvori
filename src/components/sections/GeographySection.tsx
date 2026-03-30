'use client';

import Link from 'next/link';
import { Calculator, Dot, Route } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
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
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const [activeRouteIndex, setActiveRouteIndex] = useState(0);
  const [shouldMountGlobe, setShouldMountGlobe] = useState(false);
  const [isGlobeActive, setIsGlobeActive] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;

        if (visible) {
          setShouldMountGlobe(true);
        }

        setIsGlobeActive(visible);
      },
      {
        threshold: 0.18,
        rootMargin: '160px 0px 160px 0px',
      },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isGlobeActive) return;

    const interval = window.setInterval(() => {
      setActiveRouteIndex((prev) => (prev + 1) % GEO_ROUTES.length);
    }, 4200);

    return () => window.clearInterval(interval);
  }, [isGlobeActive]);

  const activeRoute = GEO_ROUTES[activeRouteIndex];

  const cityMap = useMemo(
    () => new Map(GEO_CITIES.map((city) => [city.id, city])),
    [],
  );

  const from = cityMap.get(activeRoute.from)!;
  const to = cityMap.get(activeRoute.to)!;

  return (
    <div ref={sectionRef} className="h-full">
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

                <div className="mt-8 flex flex-col gap-3">
                  {DISTRICTS.map((district, index) => (
                    <DistrictPill
                      key={district}
                      label={district}
                      delayMs={index * 520}
                    />
                  ))}
                </div>
              </div>

              <div className="pt-12">
                <div className="flex items-stretch gap-5">
                  <Link
                    href="/calculator"
                    className="header-utility-button inline-flex min-w-[364px] items-center justify-center gap-3 rounded-[22px] bg-[var(--accent-1)] px-8 py-7 text-white"
                  >
                    <Calculator size={20} strokeWidth={2.1} className="shrink-0" />
                    <span
                      className="text-[18px] font-semibold tracking-[-0.02em]"
                      style={{ fontFamily: 'var(--font-body-text)' }}
                    >
                      Открыть калькулятор
                    </span>
                  </Link>

                  <div className="inline-flex min-w-[392px] flex-col justify-center rounded-[22px] bg-[#26292e] px-6 py-5">
                    <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-white/56">
                      активное направление
                    </p>

                    <div className="mt-2 flex items-center gap-3">
                      <Route
                        size={18}
                        strokeWidth={2.05}
                        className="shrink-0 text-[var(--accent-1)]"
                      />

                      <p className="whitespace-nowrap text-[18px] font-semibold tracking-[-0.02em] text-white">
                        {from.label} — {to.label}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-5 -ml-8 xl:-ml-10">
              {shouldMountGlobe ? (
                <GeographyGlobe
                  activeRouteIndex={activeRouteIndex}
                  isActive={isGlobeActive}
                />
              ) : (
                <div className="flex h-full min-h-[560px] items-start justify-center">
                  <div className="h-[540px] w-[540px] max-w-full rounded-full bg-[var(--surface)]/60" />
                </div>
              )}
            </div>
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
