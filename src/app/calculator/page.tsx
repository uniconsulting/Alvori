'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  Calculator,
  ChevronDown,
  CircleAlert,
  MapPinned,
  Route,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { RUSSIA_CITIES, findCityByValue, type RussiaCity } from '@/content/cities';

type CalcMode = 'quick' | 'advanced';
type BodyType = 'tent' | 'curtain' | 'isotherm' | 'reefer' | 'adr';
type UrgencyType = 'standard' | 'urgent';
type TempMode = 'normal' | 'temp';
type InsuranceType = 'basic' | 'extended';
type LoadingType = 'rear' | 'side' | 'top';

type BodyConfig = { label: string; min: number; max: number };

const BODY_CONFIG: Record<BodyType, BodyConfig> = {
  tent: { label: 'Тент', min: 1, max: 1 },
  curtain: { label: 'Штора', min: 1, max: 1 },
  isotherm: { label: 'Изотерм', min: 1.08, max: 1.12 },
  reefer: { label: 'Рефрижератор', min: 1.18, max: 1.28 },
  adr: { label: 'ADR / спец.', min: 1.2, max: 1.35 },
};

const URGENCY_CONFIG: Record<UrgencyType, { label: string; min: number; max: number }> = {
  standard: { label: 'Стандарт', min: 1, max: 1 },
  urgent: { label: 'Срочно', min: 1.08, max: 1.15 },
};

const TEMP_CONFIG: Record<TempMode, { label: string; min: number; max: number }> = {
  normal: { label: 'Обычный режим', min: 1, max: 1 },
  temp: { label: 'Температурный режим', min: 1.1, max: 1.18 },
};

const INSURANCE_CONFIG: Record<InsuranceType, { label: string; minAdd: number; maxAdd: number }> =
  {
    basic: { label: 'Стандартное', minAdd: 0, maxAdd: 0 },
    extended: { label: 'Расширенное', minAdd: 3000, maxAdd: 7000 },
  };

const LOADING_CONFIG: Record<LoadingType, { label: string; minAdd: number; maxAdd: number }> = {
  rear: { label: 'Задняя', minAdd: 0, maxAdd: 0 },
  side: { label: 'Боковая', minAdd: 2500, maxAdd: 5000 },
  top: { label: 'Верхняя', minAdd: 3000, maxAdd: 6000 },
};

const BASE_RATE_MIN = 78;
const BASE_RATE_MAX = 87;

function formatCurrency(value: number) {
  return new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 }).format(Math.round(value));
}

function formatDistance(value: number) {
  return new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 }).format(Math.round(value));
}

function pluralize(n: number, forms: [string, string, string]) {
  const n10 = n % 10;
  const n100 = n % 100;
  if (n10 === 1 && n100 !== 11) return forms[0];
  if (n10 >= 2 && n10 <= 4 && (n100 < 10 || n100 >= 20)) return forms[1];
  return forms[2];
}

function estimateTransitDays(distance: number) {
  if (!distance || distance <= 0) return '—';
  const days = Math.max(1, Math.ceil(distance / 700));
  return `${days} ${pluralize(days, ['день', 'дня', 'дней'])}`;
}

function deg2rad(value: number) {
  return (value * Math.PI) / 180;
}

function calculateRoadDistanceKm(from?: RussiaCity, to?: RussiaCity) {
  if (!from || !to) return 0;
  if (from.value === to.value) return 0;

  const earthRadiusKm = 6371;
  const dLat = deg2rad(to.lat - from.lat);
  const dLon = deg2rad(to.lon - from.lon);
  const lat1 = deg2rad(from.lat);
  const lat2 = deg2rad(to.lat);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const straight = earthRadiusKm * c;

  const roadFactor = straight < 300 ? 1.24 : straight < 900 ? 1.19 : 1.16;
  return Math.round(straight * roadFactor);
}

export default function CalculatorPage() {
  const [mode, setMode] = useState<CalcMode>('quick');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const [fromCity, setFromCity] = useState<string>('ulyanovsk');
  const [toCity, setToCity] = useState<string>('moscow');
  const [distanceKm, setDistanceKm] = useState(0);

  const [bodyType, setBodyType] = useState<BodyType>('tent');
  const [extraPoints, setExtraPoints] = useState<number>(0);

  const [weightTons, setWeightTons] = useState<number>(20);
  const [volumeM3, setVolumeM3] = useState<number>(82);
  const [pallets, setPallets] = useState<number>(33);
  const [urgency, setUrgency] = useState<UrgencyType>('standard');
  const [tempMode, setTempMode] = useState<TempMode>('normal');
  const [loadingType, setLoadingType] = useState<LoadingType>('rear');
  const [insurance, setInsurance] = useState<InsuranceType>('basic');
  const [comment, setComment] = useState('');

  const fromCityObj = useMemo(() => findCityByValue(fromCity), [fromCity]);
  const toCityObj = useMemo(() => findCityByValue(toCity), [toCity]);

  useEffect(() => {
    setDistanceKm(calculateRoadDistanceKm(fromCityObj, toCityObj));
  }, [fromCityObj, toCityObj]);

  useEffect(() => {
    if (!filtersOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [filtersOpen]);

  const result = useMemo(() => {
    const body = BODY_CONFIG[bodyType];
    const urg = URGENCY_CONFIG[urgency];
    const temp = TEMP_CONFIG[tempMode];
    const ins = INSURANCE_CONFIG[insurance];
    const load = LOADING_CONFIG[loadingType];

    const extraPointMinAdd = extraPoints * 3500;
    const extraPointMaxAdd = extraPoints * 6000;

    const heavyWeightMin = weightTons > 20 ? 1.04 : 1;
    const heavyWeightMax = weightTons > 20 ? 1.08 : 1;
    const largeVolumeMin = volumeM3 > 82 ? 1.04 : 1;
    const largeVolumeMax = volumeM3 > 82 ? 1.08 : 1;

    const palletMinAdd = pallets > 33 ? (pallets - 33) * 250 : 0;
    const palletMaxAdd = pallets > 33 ? (pallets - 33) * 400 : 0;

    const baseMin = distanceKm * BASE_RATE_MIN;
    const baseMax = distanceKm * BASE_RATE_MAX;

    const minTotal =
      baseMin *
        body.min *
        urg.min *
        temp.min *
        heavyWeightMin *
        largeVolumeMin +
      ins.minAdd +
      load.minAdd +
      extraPointMinAdd +
      palletMinAdd;

    const maxTotal =
      baseMax *
        body.max *
        urg.max *
        temp.max *
        heavyWeightMax *
        largeVolumeMax +
      ins.maxAdd +
      load.maxAdd +
      extraPointMaxAdd +
      palletMaxAdd;

    const center = (minTotal + maxTotal) / 2;

    return {
      bodyLabel: body.label,
      minTotal,
      maxTotal,
      center,
      transitDays: estimateTransitDays(distanceKm),
      pricePerKmMin: minTotal / Math.max(distanceKm, 1),
      pricePerKmMax: maxTotal / Math.max(distanceKm, 1),
      factors: [
        `Маршрут ~ ${formatDistance(distanceKm)} км`,
        `Тип кузова: ${body.label}`,
        `Срочность: ${urg.label}`,
        tempMode === 'temp' ? 'Температурный режим' : 'Стандартный температурный режим',
        extraPoints > 0
          ? `Доп. точки: ${extraPoints} ${pluralize(extraPoints, ['точка', 'точки', 'точек'])}`
          : 'Без дополнительных точек',
      ],
    };
  }, [bodyType, urgency, tempMode, insurance, loadingType, extraPoints, distanceKm, weightTons, volumeM3, pallets]);

  const requestQuery = useMemo(() => {
    const params = new URLSearchParams({
      from: fromCityObj?.label ?? '',
      to: toCityObj?.label ?? '',
      distance: String(distanceKm),
      body: BODY_CONFIG[bodyType].label,
      weight: String(weightTons),
      volume: String(volumeM3),
      pallets: String(pallets),
      points: String(extraPoints),
      urgency: URGENCY_CONFIG[urgency].label,
      temp: TEMP_CONFIG[tempMode].label,
      loading: LOADING_CONFIG[loadingType].label,
      insurance: INSURANCE_CONFIG[insurance].label,
      comment,
      result: `${Math.round(result.minTotal)}-${Math.round(result.maxTotal)}`,
    });

    return `/request?${params.toString()}`;
  }, [
    fromCityObj,
    toCityObj,
    distanceKm,
    bodyType,
    weightTons,
    volumeM3,
    pallets,
    extraPoints,
    urgency,
    tempMode,
    loadingType,
    insurance,
    comment,
    result.minTotal,
    result.maxTotal,
  ]);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Header />

      <main>
        <section className="page-offset-from-header pb-6 md:pb-8 xl:pb-8">
          <Container>
            <div className="px-[10px] md:px-[14px] xl:px-[16px]">
              <PageHeader />

              <div className="mt-8">
                <ControlBar
                  onOpenFilters={() => setFiltersOpen(true)}
                  fromCity={fromCity}
                  toCity={toCity}
                  onChangeFrom={setFromCity}
                  onChangeTo={setToCity}
                  bodyType={bodyType}
                  onChangeBody={(value) => setBodyType(value as BodyType)}
                  extraPoints={extraPoints}
                  onChangePoints={setExtraPoints}
                  routeFrom={fromCityObj?.label ?? '—'}
                  routeTo={toCityObj?.label ?? '—'}
                  routeDistance={distanceKm}
                />
              </div>
            </div>
          </Container>
        </section>

        <section className="pb-8 pt-0 md:pb-10 xl:pb-10">
          <Container>
            <div className="px-[10px] md:px-[14px] xl:px-[16px]">
              <ResultPanel
                center={result.center}
                min={result.minTotal}
                max={result.maxTotal}
                distance={distanceKm}
                days={result.transitDays}
                body={result.bodyLabel}
                pricePerKm={`${formatCurrency(result.pricePerKmMin)}–${formatCurrency(result.pricePerKmMax)} ₽/км`}
                factors={result.factors}
                requestHref={requestQuery}
              />
            </div>
          </Container>
        </section>

        <section className="pb-12 pt-0 md:pb-14 xl:pb-16">
          <Container>
            <div className="px-[10px] md:px-[14px] xl:px-[16px]">
              <ExplainBlock />
            </div>
          </Container>
        </section>

        <FiltersDrawer
          open={filtersOpen}
          onClose={() => setFiltersOpen(false)}
          mode={mode}
          setMode={setMode}
          weightTons={weightTons}
          setWeightTons={setWeightTons}
          volumeM3={volumeM3}
          setVolumeM3={setVolumeM3}
          pallets={pallets}
          setPallets={setPallets}
          urgency={urgency}
          setUrgency={setUrgency}
          tempMode={tempMode}
          setTempMode={setTempMode}
          loadingType={loadingType}
          setLoadingType={setLoadingType}
          insurance={insurance}
          setInsurance={setInsurance}
          comment={comment}
          setComment={setComment}
        />
      </main>

      <Footer />
    </div>
  );
}

function PageHeader() {
  return (
    <>
      <div className="hidden xl:block">
        <Link
          href="/"
          className="inline-flex items-center text-[14px] font-semibold lowercase tracking-[-0.02em] text-[var(--text)]/70 transition hover:text-[var(--text)]"
          style={{ fontFamily: 'var(--font-body-text)' }}
        >
          <ArrowLeft size={15} className="mr-2" />
          вернуться
        </Link>

        <div className="mt-5 flex items-center justify-between gap-6">
          <h1 className="font-heading text-[42px] leading-[0.98] tracking-[-0.04em] text-[var(--text)] xl:text-[46px]">
            Расчёт грузоперевозки
          </h1>

          <div className="inline-flex h-[42px] items-center rounded-[16px] bg-[var(--surface)] px-[18px] shadow-[0_8px_20px_rgba(38,41,46,0.04)]">
            <span
              className="text-[14px] font-semibold lowercase tracking-[-0.02em] text-[var(--text)]"
              style={{ fontFamily: 'var(--font-body-text)' }}
            >
              главная
              <span className="px-[8px] text-[var(--accent-1)]">·</span>
              калькулятор
            </span>
          </div>
        </div>

        <p
          className="mt-10 max-w-[760px] text-[19px] font-normal leading-[1.32] tracking-[-0.018em] text-[var(--muted)]"
          style={{ fontFamily: 'var(--font-body-text)' }}
        >
          Получите ориентировочную стоимость перевозки по РФ на основе маршрута,
          параметров груза и текущей рыночной ставки.
        </p>

        <div className="mt-8 inline-flex items-center rounded-[18px] bg-[var(--surface)] px-5 py-3 shadow-[var(--shadow-soft)]">
          <span
            className="text-[15px] font-semibold tracking-[-0.016em] text-[var(--text)]"
            style={{ fontFamily: 'var(--font-body-text)' }}
          >
            рыночная база: 78–87 ₽/км
          </span>
        </div>
      </div>

      <div className="xl:hidden">
        <div className="flex items-center justify-between gap-3">
<Link
  href="/"
  className="inline-flex h-[42px] items-center px-0 text-[14px] font-semibold lowercase tracking-[-0.02em] text-[var(--text)]"
  style={{ fontFamily: 'var(--font-body-text)' }}
>
  <ArrowLeft size={15} className="mr-2" />
  вернуться
</Link>

          <div className="inline-flex h-[42px] items-center rounded-[14px] bg-[var(--surface)] px-[14px] shadow-[0_8px_20px_rgba(38,41,46,0.04)]">
            <span
              className="text-[13px] font-semibold lowercase tracking-[-0.02em] text-[var(--text)]"
              style={{ fontFamily: 'var(--font-body-text)' }}
            >
              главная
              <span className="px-[6px] text-[var(--accent-1)]">·</span>
              калькулятор
            </span>
          </div>
        </div>

        <h1 className="mt-7 font-heading text-[34px] leading-[0.96] tracking-[-0.045em] text-[var(--text)] md:text-[40px]">
          Расчёт
          <br />
          грузоперевозки
        </h1>

        <p
          className="mt-5 max-w-[640px] text-[16px] font-normal leading-[1.3] tracking-[-0.018em] text-[var(--muted)] md:text-[17px]"
          style={{ fontFamily: 'var(--font-body-text)' }}
        >
          Получите ориентировочную стоимость перевозки по РФ на основе маршрута,
          параметров груза и текущей рыночной ставки.
        </p>

        <div className="mt-6 inline-flex items-center rounded-[16px] bg-[var(--surface)] px-4 py-3 shadow-[var(--shadow-soft)]">
          <span
            className="text-[14px] font-semibold tracking-[-0.016em] text-[var(--text)]"
            style={{ fontFamily: 'var(--font-body-text)' }}
          >
            рыночная база: 78–87 ₽/км
          </span>
        </div>
      </div>
    </>
  );
}

function ControlBar({
  onOpenFilters,
  fromCity,
  toCity,
  onChangeFrom,
  onChangeTo,
  bodyType,
  onChangeBody,
  extraPoints,
  onChangePoints,
  routeFrom,
  routeTo,
  routeDistance,
}: {
  onOpenFilters: () => void;
  fromCity: string;
  toCity: string;
  onChangeFrom: (value: string) => void;
  onChangeTo: (value: string) => void;
  bodyType: BodyType;
  onChangeBody: (value: string) => void;
  extraPoints: number;
  onChangePoints: (value: number) => void;
  routeFrom: string;
  routeTo: string;
  routeDistance: number;
}) {
  return (
    <div className="rounded-[24px] bg-[var(--surface)] px-4 pb-4 pt-5 shadow-[var(--shadow-soft)] xl:rounded-[30px] xl:px-4 xl:pb-4 xl:pt-6">
      <div className="flex items-center gap-3 pl-[2px] xl:pl-[10px]">
        <Calculator size={20} strokeWidth={2} className="text-[var(--accent-1)]" />
        <h2 className="font-heading text-[24px] leading-[0.98] tracking-[-0.03em] text-[var(--text)] xl:text-[28px]">
          Параметры перевозки
        </h2>
      </div>

<div
  className="mt-4 px-0 py-0 text-[14px] font-medium tracking-[-0.014em] text-[var(--muted)] xl:mt-0 xl:ml-auto xl:mr-[8px] xl:text-right"
  style={{ fontFamily: 'var(--font-body-text)' }}
>
        маршрут:{' '}
        <span className="text-[var(--text)]">
          {routeFrom} → {routeTo}
        </span>{' '}
        <span className="text-[var(--text)]">
          ~ {routeDistance ? formatDistance(routeDistance) : '—'} км
        </span>
      </div>

      <div className="mt-4 hidden xl:grid xl:grid-cols-[1.25fr_1.25fr_0.85fr_0.78fr_auto] xl:gap-3">
        <CitySegment
          label="откуда"
          value={fromCity}
          onChange={onChangeFrom}
          placeholder="Выберите город"
        />

        <CitySegment
          label="куда"
          value={toCity}
          onChange={onChangeTo}
          placeholder="Выберите город"
        />

        <SelectSegment
          label="тип кузова"
          value={bodyType}
          onChange={onChangeBody}
          options={Object.entries(BODY_CONFIG).map(([value, cfg]) => ({
            value,
            label: cfg.label,
          }))}
        />

        <PointsSegment
          label="доп. точки"
          value={extraPoints}
          onChange={onChangePoints}
        />

        <button
          type="button"
          onClick={onOpenFilters}
          className="inline-flex h-[84px] items-center justify-center gap-3 rounded-[18px] bg-[var(--accent-1)] px-6 text-[15px] font-semibold lowercase tracking-[-0.016em] text-[var(--accent-1-text)] transition hover:opacity-95"
          style={{ fontFamily: 'var(--font-body-text)' }}
        >
          <SlidersHorizontal size={17} strokeWidth={2} />
          все фильтры
        </button>
      </div>

      <div className="mt-4 xl:hidden">
        <div className="grid grid-cols-2 gap-3">
          <CitySegment
            label="откуда"
            value={fromCity}
            onChange={onChangeFrom}
            placeholder="Выберите город"
            mobile
          />

          <CitySegment
            label="куда"
            value={toCity}
            onChange={onChangeTo}
            placeholder="Выберите город"
            mobile
          />
        </div>

        <div className="mt-3 grid grid-cols-3 gap-3">
          <SelectSegment
            label="кузов"
            value={bodyType}
            onChange={onChangeBody}
            options={Object.entries(BODY_CONFIG).map(([value, cfg]) => ({
              value,
              label: cfg.label,
            }))}
            mobile
          />

          <PointsSegment
            label="доп. точки"
            value={extraPoints}
            onChange={onChangePoints}
            mobile
          />

<button
  type="button"
  onClick={onOpenFilters}
  className="flex h-[76px] items-center justify-center rounded-[16px] bg-[var(--accent-1)]"
  aria-label="все фильтры"
>
  <SlidersHorizontal
    size={22}
    strokeWidth={2.15}
    className="text-[var(--accent-1-text)]"
  />
</button>
        </div>
      </div>
    </div>
  );
}

function CitySegment({
  label,
  value,
  onChange,
  placeholder,
  mobile = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  mobile?: boolean;
}) {
  const selected = RUSSIA_CITIES.find((city) => city.value === value);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const rootRef = useRef<HTMLDivElement | null>(null);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return RUSSIA_CITIES.slice(0, 12);
    return RUSSIA_CITIES.filter((city) => city.label.toLowerCase().includes(normalized)).slice(
      0,
      12,
    );
  }, [query]);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
        setQuery('');
      }
    }
    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, []);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={mobile ? 'flex h-[76px] w-full items-center justify-between rounded-[16px] bg-[var(--bg)] px-4 text-left transition hover:opacity-95' : 'flex h-[84px] w-full items-center justify-between rounded-[18px] bg-[var(--bg)] px-5 text-left transition hover:opacity-95'}
      >
        <div className="min-w-0">
          <div className={mobile ? 'text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--muted)]' : 'text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--muted)]'}>
            {label}
          </div>
          <div className={mobile ? 'mt-2 truncate text-[15px] font-semibold tracking-[-0.018em] text-[var(--text)]' : 'mt-2 truncate text-[17px] font-semibold tracking-[-0.018em] text-[var(--text)]'}>
            {selected?.label ?? placeholder}
          </div>
        </div>
        <ChevronDown
          size={mobile ? 16 : 18}
          strokeWidth={2}
          className={`ml-4 shrink-0 text-[var(--muted)] transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open ? (
        <div className="absolute z-30 mt-2 w-full overflow-hidden rounded-[18px] bg-[var(--surface)] shadow-[0_20px_44px_rgba(38,41,46,0.12)]">
          <div className="p-3">
<input
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  placeholder="Поиск города"
  className="input-shell h-[46px] rounded-[14px] px-4 py-0 text-[14px] placeholder:text-[12px]"
  style={{ fontFamily: 'var(--font-body-text)' }}
/>
          </div>
          <div className="max-h-[280px] overflow-y-auto pb-2">
            {filtered.length ? (
              filtered.map((city) => (
                <button
                  key={city.value}
                  type="button"
                  onClick={() => {
                    onChange(city.value);
                    setOpen(false);
                    setQuery('');
                  }}
                  className={`flex w-full items-center px-4 py-3 text-left text-[14px] tracking-[-0.014em] text-[var(--text)] transition hover:bg-[var(--bg)] ${
                    city.value === value ? 'bg-[var(--bg)] font-semibold' : ''
                  }`}
                >
                  {city.label}
                </button>
              ))
            ) : (
              <div className="px-4 py-4 text-[14px] text-[var(--muted)]">Ничего не найдено</div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function SelectSegment({
  label,
  value,
  onChange,
  options,
  mobile = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  mobile?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const selected = options.find((opt) => opt.value === value);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, []);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={mobile ? 'flex h-[76px] w-full items-center justify-between rounded-[16px] bg-[var(--bg)] px-4 text-left transition hover:opacity-95' : 'flex h-[84px] w-full items-center justify-between rounded-[18px] bg-[var(--bg)] px-5 text-left transition hover:opacity-95'}
      >
        <div className="min-w-0">
          <div className={mobile ? 'text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--muted)]' : 'text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--muted)]'}>
            {label}
          </div>
          <div className={mobile ? 'mt-2 truncate text-[15px] font-semibold tracking-[-0.018em] text-[var(--text)]' : 'mt-2 truncate text-[17px] font-semibold tracking-[-0.018em] text-[var(--text)]'}>
            {selected?.label}
          </div>
        </div>
        <ChevronDown
          size={mobile ? 16 : 18}
          strokeWidth={2}
          className={`ml-4 shrink-0 text-[var(--muted)] transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open ? (
        <div className="absolute z-30 mt-2 w-full overflow-hidden rounded-[18px] bg-[var(--surface)] shadow-[0_20px_44px_rgba(38,41,46,0.12)]">
          <div className="py-2">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={`flex w-full items-center px-4 py-3 text-left text-[14px] tracking-[-0.014em] text-[var(--text)] transition hover:bg-[var(--bg)] ${
                  option.value === value ? 'bg-[var(--bg)] font-semibold' : ''
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function PointsSegment({
  label,
  value,
  onChange,
  mobile = false,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  mobile?: boolean;
}) {
  return (
    <div className={mobile ? 'relative h-[76px] rounded-[16px] bg-[var(--bg)] px-4 py-3' : 'relative h-[84px] rounded-[18px] bg-[var(--bg)] px-5 py-4'}>
      <div className={mobile ? 'pr-[58px]' : 'pr-[84px]'}>
        <div className={mobile ? 'whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--muted)]' : 'whitespace-nowrap text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--muted)]'}>
          {label}
        </div>
        <div className={mobile ? 'mt-2 text-[15px] font-semibold tracking-[-0.018em] text-[var(--text)]' : 'mt-2 text-[17px] font-semibold tracking-[-0.018em] text-[var(--text)]'}>
          {value}
        </div>
      </div>

      <div className={mobile ? 'absolute bottom-3 right-3 flex items-center gap-1.5' : 'absolute bottom-4 right-4 flex items-center gap-2'}>
        <button
          type="button"
          onClick={() => onChange(Math.max(0, value - 1))}
          className={mobile ? 'inline-flex h-[28px] w-[28px] items-center justify-center rounded-[8px] bg-[var(--surface)] text-[var(--text)]' : 'inline-flex h-[30px] w-[30px] items-center justify-center rounded-[8px] bg-[var(--surface)] text-[var(--text)]'}
        >
          −
        </button>
        <button
          type="button"
          onClick={() => onChange(value + 1)}
          className={mobile ? 'inline-flex h-[28px] w-[28px] items-center justify-center rounded-[8px] bg-[var(--surface)] text-[var(--text)]' : 'inline-flex h-[30px] w-[30px] items-center justify-center rounded-[8px] bg-[var(--surface)] text-[var(--text)]'}
        >
          +
        </button>
      </div>
    </div>
  );
}

function ResultPanel({
  center,
  min,
  max,
  distance,
  days,
  body,
  pricePerKm,
  factors,
  requestHref,
}: {
  center: number;
  min: number;
  max: number;
  distance: number;
  days: string;
  body: string;
  pricePerKm: string;
  factors: string[];
  requestHref: string;
}) {
  const empty = distance <= 0;

  return (
    <div className="rounded-[24px] bg-[#26292e] px-5 py-5 text-white shadow-[0_24px_48px_rgba(0,0,0,0.12)] xl:rounded-[32px] xl:px-8 xl:py-8">
      {empty ? (
        <div className="flex min-h-[240px] items-center justify-center rounded-[20px] bg-white/6 xl:min-h-[260px] xl:rounded-[24px]">
          <div className="text-center">
            <h2 className="font-heading text-[28px] tracking-[-0.03em] xl:text-[34px]">
              Выберите маршрут
            </h2>
            <p className="mt-3 text-[15px] text-white/68 xl:text-[16px]">
              Укажите города отправления и назначения, чтобы получить расчёт.
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-3">
            <Route size={18} strokeWidth={2} className="text-[var(--accent-1)] xl:size-[19px]" />
            <h2 className="font-heading text-[24px] leading-[0.98] tracking-[-0.03em] xl:text-[30px]">
              Результат
            </h2>
          </div>

          <div className="mt-5 xl:hidden">
            <div className="rounded-[18px] bg-white/6 px-4 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-white/56">
                ориентировочная стоимость
              </p>

              <p className="mt-3 font-heading text-[40px] leading-[0.94] tracking-[-0.05em]">
                {formatCurrency(center)} ₽
              </p>

              <div className="mt-4 rounded-[14px] bg-white/6 px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-white/50">
                  рабочая вилка
                </p>
                <p className="mt-2 text-[18px] font-semibold tracking-[-0.03em]">
                  {formatCurrency(min)} – {formatCurrency(max)} ₽
                </p>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <MetricCard label="Расстояние" value={`${formatDistance(distance)} км`} mobile />
              <MetricCard label="Срок" value={days} mobile />
              <MetricCard label="Кузов" value={body} mobile />
              <MetricCard label="Ставка / км" value={pricePerKm} mobile />
            </div>

            <div className="mt-3 rounded-[18px] bg-white/6 px-4 py-4">
              <div className="flex items-center gap-2">
                <CircleAlert size={15} strokeWidth={2} className="text-[var(--accent-1)]" />
                <p className="text-[14px] font-semibold tracking-[-0.016em]">
                  Что повлияло на цену
                </p>
              </div>

              <div className="mt-4 flex flex-col gap-3">
                {factors.map((factor) => (
                  <div key={factor} className="flex items-start gap-3 text-[14px] leading-[1.25] text-white/82">
                    <span className="mt-[5px] h-[6px] w-[6px] shrink-0 rounded-full bg-[var(--accent-1)]" />
                    <span>{factor}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-3">
              <Link
                href={requestHref}
                className="inline-flex h-[52px] w-full items-center justify-center rounded-[14px] bg-[var(--accent-1)] px-6 text-[15px] font-semibold tracking-[-0.02em] !text-[var(--accent-1-text)]"
                style={{ fontFamily: 'var(--font-body-text)' }}
              >
                отправить этот расчёт
              </Link>

              <Link
                href={requestHref}
                className="inline-flex h-[52px] w-full items-center justify-center rounded-[14px] bg-white/10 px-6 text-[14px] font-semibold lowercase tracking-[-0.016em] text-white transition hover:bg-white/14"
                style={{ fontFamily: 'var(--font-body-text)' }}
              >
                запросить коммерческое предложение
              </Link>
            </div>

            <p className="mt-4 text-[12px] leading-[1.35] tracking-[-0.012em] text-white/54">
              Итоговый тариф подтверждается после уточнения параметров груза, маршрута и условий подачи транспорта.
            </p>
          </div>

          <div className="mt-7 hidden xl:block">
            <div className="grid grid-cols-[0.92fr_1.08fr_0.86fr] items-stretch gap-4">
              <div className="rounded-[24px] bg-white/6 px-6 py-6">
                <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-white/56">
                  ориентировочная стоимость
                </p>

                <p className="mt-3 font-heading text-[58px] leading-[0.94] tracking-[-0.05em]">
                  {formatCurrency(center)} ₽
                </p>

                <div className="mt-5 rounded-[14px] bg-white/6 px-5 py-4">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-white/50">
                    рабочая вилка
                  </p>
                  <p className="mt-2 text-[24px] font-semibold tracking-[-0.03em]">
                    {formatCurrency(min)} – {formatCurrency(max)} ₽
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 grid-rows-2 gap-4">
                <MetricCard label="Расстояние" value={`${formatDistance(distance)} км`} />
                <MetricCard label="Срок" value={days} />
                <MetricCard label="Кузов" value={body} />
                <MetricCard label="Ставка / км" value={pricePerKm} />
              </div>

              <div className="h-full rounded-[24px] bg-white/6 px-5 py-5">
                <div className="flex items-center gap-2">
                  <CircleAlert size={16} strokeWidth={2} className="text-[var(--accent-1)]" />
                  <p className="text-[15px] font-semibold tracking-[-0.016em]">
                    Что повлияло на цену
                  </p>
                </div>

                <div className="mt-4 flex flex-col gap-3">
                  {factors.map((factor) => (
                    <div key={factor} className="flex items-center gap-3 text-[15px] text-white/82">
                      <span className="h-[6px] w-[6px] rounded-full bg-[var(--accent-1)]" />
                      <span>{factor}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-[0.92fr_1.08fr_0.86fr] items-center gap-4">
              <Link
                href={requestHref}
                className="inline-flex h-[54px] w-full items-center justify-center rounded-[14px] bg-[var(--accent-1)] px-6 text-[16px] font-semibold tracking-[-0.02em] !text-[var(--accent-1-text)]"
              >
                отправить этот расчёт
              </Link>

              <Link
                href={requestHref}
                className="inline-flex h-[54px] w-full items-center justify-center rounded-[14px] bg-white/10 px-6 text-[15px] font-semibold lowercase tracking-[-0.016em] text-white transition hover:bg-white/14"
              >
                запросить коммерческое предложение
              </Link>

              <div />
            </div>

            <p className="mt-5 text-[13px] leading-[1.35] tracking-[-0.012em] text-white/54">
              Итоговый тариф подтверждается после уточнения параметров груза, маршрута и условий подачи транспорта.
            </p>
          </div>
        </>
      )}
    </div>
  );
}

function MetricCard({
  label,
  value,
  mobile = false,
}: {
  label: string;
  value: string;
  mobile?: boolean;
}) {
  return (
    <div className={mobile ? 'h-full rounded-[16px] bg-white/6 px-4 py-4' : 'h-full rounded-[14px] bg-white/6 px-5 py-5'}>
      <p className={mobile ? 'text-[11px] font-semibold uppercase tracking-[0.08em] text-white/50' : 'text-[12px] font-semibold uppercase tracking-[0.08em] text-white/50'}>
        {label}
      </p>
      <p className={mobile ? 'mt-3 text-[15px] font-semibold leading-[1.2] tracking-[-0.018em] text-white' : 'mt-3 text-[16px] font-semibold leading-[1.2] tracking-[-0.018em] text-white'}>
        {value}
      </p>
    </div>
  );
}

function ExplainBlock() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const frameRef = useRef<number | null>(null);

  const [mobileTransforms, setMobileTransforms] = useState<
    Array<{
      rotateY: number;
      translateX: number;
      scaleX: number;
      scaleY: number;
      opacity: number;
    }>
  >([
    { rotateY: 0, translateX: 0, scaleX: 1, scaleY: 1, opacity: 1 },
    { rotateY: 0, translateX: 0, scaleX: 1, scaleY: 1, opacity: 1 },
    { rotateY: 0, translateX: 0, scaleX: 1, scaleY: 1, opacity: 1 },
    { rotateY: 0, translateX: 0, scaleX: 1, scaleY: 1, opacity: 1 },
  ]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

    const updateTransforms = () => {
      const containerRect = scroller.getBoundingClientRect();

      const next = itemRefs.current.map((node) => {
        if (!node) {
          return { rotateY: 0, translateX: 0, scaleX: 1, scaleY: 1, opacity: 1 };
        }

        const cardRect = node.getBoundingClientRect();
        const containerCenter = containerRect.left + containerRect.width / 2;
        const cardCenter = cardRect.left + cardRect.width / 2;
        const distance = cardCenter - containerCenter;
        const normalized = clamp(distance / (containerRect.width * 0.52), -1, 1);
        const absN = Math.abs(normalized);

        return {
          rotateY: -normalized * 16,
          translateX: -normalized * 8,
          scaleX: 1 - absN * 0.08,
          scaleY: 1 - absN * 0.03,
          opacity: 1 - absN * 0.16,
        };
      });

      setMobileTransforms(next);
      frameRef.current = null;
    };

    const requestUpdate = () => {
      if (frameRef.current !== null) return;
      frameRef.current = window.requestAnimationFrame(updateTransforms);
    };

    updateTransforms();

    scroller.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      scroller.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

const cards = [
  {
    title: '1. Базовая ставка маршрута',
    mobileText:
      'Берём расстояние маршрута\nи применяем рыночную базу\n78–87 ₽/км для типовой\nфуры по РФ.',
    desktopText:
      'Берём расстояние маршрута и применяем рыночную базу 78–87 ₽/км для типовой фуры по РФ.',
  },
  {
    title: '2. Поправка на кузов',
    mobileText:
      'Учитываем тип кузова:\nтент, штора, изотерм, рефрижератор\nили спецперевозка.',
    desktopText:
      'Учитываем тип кузова: тент, штора, изотерм, рефрижератор или спецперевозка.',
  },
  {
    title: '3. Поправка на условия',
    mobileText:
      'Срочность, температура, тип\nзагрузки, страхование и доп-\nточки корректирует итог.',
    desktopText:
      'Срочность, температура, тип загрузки, страхование и дополнительные точки корректируют итог.',
  },
  {
    title: '4. Рабочая вилка',
    mobileText:
      'На выходе показываем\nориентир и вилку,\nчтобы расчёт был ближе\nк реальной ставке рынка.',
    desktopText:
      'На выходе показываем ориентир и вилку, чтобы расчёт был ближе к реальной ставке рынка.',
  },
];

  return (
    <div className="rounded-[24px] bg-[var(--surface)] px-5 py-5 shadow-[var(--shadow-soft)] xl:rounded-[30px] xl:px-8 xl:py-8">
      <div className="flex items-center gap-3">
        <MapPinned size={18} strokeWidth={2} className="text-[var(--accent-1)] xl:size-[19px]" />
        <h2 className="font-heading text-[24px] leading-[0.98] tracking-[-0.03em] text-[var(--text)] xl:text-[30px]">
          Как мы считаем
        </h2>
      </div>

<div className="mt-5 overflow-hidden xl:hidden">
  <div
    ref={scrollerRef}
    className="flex snap-x snap-mandatory gap-3 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
    style={{
      paddingLeft: '0px',
      paddingRight: '0px',
      scrollPaddingLeft: '0px',
      WebkitOverflowScrolling: 'touch',
    }}
  >
          <div className="h-px shrink-0" style={{ width: 0 }} aria-hidden="true" />

          {cards.map((card, index) => {
            const transform = mobileTransforms[index] ?? {
              rotateY: 0,
              translateX: 0,
              scaleX: 1,
              scaleY: 1,
              opacity: 1,
            };

            return (
              <div
                key={card.title}
                ref={(node) => {
                  itemRefs.current[index] = node;
                }}
                className="w-[272px] shrink-0 snap-start"
              >
                <div
                  className="min-h-[164px] rounded-[18px] bg-[var(--bg)] px-5 py-5"
                  style={{
                    transform: `translateX(${transform.translateX}px) rotateY(${transform.rotateY}deg) scaleX(${transform.scaleX}) scaleY(${transform.scaleY})`,
                    transformOrigin: transform.rotateY > 0 ? 'left center' : 'right center',
                    opacity: transform.opacity,
                    transition:
                      'transform 180ms cubic-bezier(0.22,1,0.36,1), opacity 180ms cubic-bezier(0.22,1,0.36,1)',
                  }}
                >
<h3 className="font-heading text-[17px] leading-[1] tracking-[-0.022em] text-[var(--text)]">
  {card.title}
</h3>
<p className="mt-4 whitespace-pre-line text-[14px] leading-[1.35] tracking-[-0.014em] text-[var(--muted)]">
  {card.text}
</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 hidden grid-cols-2 gap-4 xl:grid">
{cards.map((card) => (
  <ExplainCard key={card.title} title={card.title} text={card.desktopText} />
))}
      </div>
    </div>
  );
}

function ExplainCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-[18px] bg-[var(--bg)] px-5 py-5">
      <h3 className="font-heading text-[22px] leading-[1] tracking-[-0.024em] text-[var(--text)]">
        {title}
      </h3>
      <p className="mt-4 text-[15px] leading-[1.35] tracking-[-0.014em] text-[var(--muted)]">
        {text}
      </p>
    </div>
  );
}

function FiltersDrawer(props: {
  open: boolean;
  onClose: () => void;
  mode: CalcMode;
  setMode: (v: CalcMode) => void;
  weightTons: number;
  setWeightTons: (v: number) => void;
  volumeM3: number;
  setVolumeM3: (v: number) => void;
  pallets: number;
  setPallets: (v: number) => void;
  urgency: UrgencyType;
  setUrgency: (v: UrgencyType) => void;
  tempMode: TempMode;
  setTempMode: (v: TempMode) => void;
  loadingType: LoadingType;
  setLoadingType: (v: LoadingType) => void;
  insurance: InsuranceType;
  setInsurance: (v: InsuranceType) => void;
  comment: string;
  setComment: (v: string) => void;
}) {
  const {
    open,
    onClose,
    mode,
    setMode,
    weightTons,
    setWeightTons,
    volumeM3,
    setVolumeM3,
    pallets,
    setPallets,
    urgency,
    setUrgency,
    tempMode,
    setTempMode,
    loadingType,
    setLoadingType,
    insurance,
    setInsurance,
    comment,
    setComment,
  } = props;

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-[rgba(38,41,46,0.22)] backdrop-blur-[6px] transition-opacity duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
      />

      <aside
        className={`drawer-scroll fixed right-0 top-0 z-50 h-screen w-full overflow-y-auto bg-[var(--surface)] px-5 py-5 shadow-[-24px_0_48px_rgba(38,41,46,0.12)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] md:w-[480px] md:px-6 md:py-6 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-[26px] leading-[0.98] tracking-[-0.03em] text-[var(--text)] md:text-[30px]">
            Все фильтры
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-[42px] w-[42px] items-center justify-center rounded-[14px] bg-[var(--accent-1)] text-[var(--accent-1-text)]"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setMode('quick')}
            className={modeButtonClass(mode === 'quick')}
          >
            быстрый расчёт
          </button>
          <button
            type="button"
            onClick={() => setMode('advanced')}
            className={modeButtonClass(mode === 'advanced')}
          >
            точный расчёт
          </button>
        </div>

        <div className="mt-8 space-y-6">
          <div className="rounded-[22px] bg-[var(--bg)] px-5 py-5">
            <h3 className="font-heading text-[22px] tracking-[-0.024em] text-[var(--text)]">
              Груз
            </h3>
            <div className="mt-4 grid grid-cols-1 gap-3">
              <NumberControl label="Вес, т" value={weightTons} onChange={setWeightTons} />
              <NumberControl label="Объём, м³" value={volumeM3} onChange={setVolumeM3} />
              <NumberControl label="Паллеты" value={pallets} onChange={setPallets} />
            </div>
          </div>

          <div className="rounded-[22px] bg-[var(--bg)] px-5 py-5">
            <h3 className="font-heading text-[22px] tracking-[-0.024em] text-[var(--text)]">
              Условия
            </h3>
            <div className="mt-4 grid grid-cols-1 gap-3">
              <DrawerSelect
                label="Срочность"
                value={urgency}
                onChange={(v) => setUrgency(v as UrgencyType)}
                options={Object.entries(URGENCY_CONFIG).map(([value, item]) => ({
                  value,
                  label: item.label,
                }))}
              />
              <DrawerSelect
                label="Температурный режим"
                value={tempMode}
                onChange={(v) => setTempMode(v as TempMode)}
                options={Object.entries(TEMP_CONFIG).map(([value, item]) => ({
                  value,
                  label: item.label,
                }))}
              />
              {mode === 'advanced' && (
                <>
                  <DrawerSelect
                    label="Тип загрузки"
                    value={loadingType}
                    onChange={(v) => setLoadingType(v as LoadingType)}
                    options={Object.entries(LOADING_CONFIG).map(([value, item]) => ({
                      value,
                      label: item.label,
                    }))}
                  />
                  <DrawerSelect
                    label="Страхование"
                    value={insurance}
                    onChange={(v) => setInsurance(v as InsuranceType)}
                    options={Object.entries(INSURANCE_CONFIG).map(([value, item]) => ({
                      value,
                      label: item.label,
                    }))}
                  />
                </>
              )}
            </div>
          </div>

          <div className="rounded-[22px] bg-[var(--bg)] px-5 py-5">
            <h3 className="font-heading text-[22px] tracking-[-0.024em] text-[var(--text)]">
              Комментарий
            </h3>

            <div className="mt-4">
              <textarea
                rows={5}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Укажите особенности груза, сроки, пожелания"
                className="input-shell min-h-[132px] resize-none rounded-[18px]"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <button
            type="button"
            onClick={() => {
              setWeightTons(20);
              setVolumeM3(82);
              setPallets(33);
              setUrgency('standard');
              setTempMode('normal');
              setLoadingType('rear');
              setInsurance('basic');
              setComment('');
            }}
            className="inline-flex h-[54px] items-center justify-center rounded-[16px] bg-[var(--bg)] px-6 text-[15px] font-semibold lowercase text-[var(--text)]"
          >
            сбросить
          </button>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-[54px] items-center justify-center rounded-[16px] bg-[var(--accent-1)] px-6 text-[15px] font-semibold lowercase text-[var(--accent-1-text)]"
          >
            применить
          </button>
        </div>
      </aside>
    </>
  );
}

function NumberControl({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="rounded-[14px] bg-[var(--surface)] px-4 py-4">
      <div className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--muted)]">
        {label}
      </div>

      <div className="mt-3 flex items-center justify-between">
        <button
          type="button"
          onClick={() => onChange(Math.max(0, value - 1))}
          className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-[8px] bg-[var(--bg)] text-[var(--text)]"
        >
          −
        </button>

        <span className="text-[18px] font-semibold text-[var(--text)]">{value}</span>

        <button
          type="button"
          onClick={() => onChange(value + 1)}
          className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-[8px] bg-[var(--bg)] text-[var(--text)]"
        >
          +
        </button>
      </div>
    </div>
  );
}

function DrawerSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: Array<{ value: string; label: string }>;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const selected = options.find((opt) => opt.value === value);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, []);

  return (
    <div ref={rootRef} className="rounded-[14px] bg-[var(--surface)] px-4 py-4">
      <div className="mb-3 text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--muted)]">
        {label}
      </div>

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-[50px] w-full items-center justify-between rounded-[8px] bg-[var(--bg)] px-4 text-left text-[15px] tracking-[-0.014em] text-[var(--text)]"
      >
        <span>{selected?.label}</span>
        <ChevronDown
          size={16}
          strokeWidth={2}
          className={`transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open ? (
        <div className="mt-2 overflow-hidden rounded-[8px] bg-[var(--bg)]">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className={`flex w-full items-center px-4 py-3 text-left text-[14px] tracking-[-0.014em] text-[var(--text)] transition hover:bg-[var(--surface)] ${
                option.value === value ? 'bg-[var(--surface)] font-semibold' : ''
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function modeButtonClass(active: boolean) {
  return `inline-flex h-[48px] items-center justify-center rounded-[14px] px-5 text-[14px] font-semibold lowercase tracking-[-0.016em] transition ${
    active
      ? 'bg-[var(--accent-2)] text-[var(--accent-2-text)]'
      : 'bg-[var(--bg)] text-[var(--text)]'
  }`;
}
