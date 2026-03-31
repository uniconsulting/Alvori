'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import {
  Calculator,
  ChevronDown,
  CircleAlert,
  FileText,
  MapPinned,
  Route,
  Truck,
  ArrowLeft,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';

type CalcMode = 'quick' | 'advanced';
type BodyType = 'tent' | 'curtain' | 'isotherm' | 'reefer' | 'adr';
type UrgencyType = 'standard' | 'urgent';
type TempMode = 'normal' | 'temp';
type InsuranceType = 'basic' | 'extended';
type LoadingType = 'rear' | 'side' | 'top';

type BodyConfig = {
  label: string;
  min: number;
  max: number;
};

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

const INSURANCE_CONFIG: Record<InsuranceType, { label: string; minAdd: number; maxAdd: number }> = {
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
  return new Intl.NumberFormat('ru-RU', {
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

function formatDistance(value: number) {
  return new Intl.NumberFormat('ru-RU', {
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

function estimateTransitDays(distance: number) {
  if (!distance || distance <= 0) return '—';
  const days = Math.max(1, Math.ceil(distance / 700));
  return `${days} ${pluralize(days, ['день', 'дня', 'дней'])}`;
}

function pluralize(n: number, forms: [string, string, string]) {
  const n10 = n % 10;
  const n100 = n % 100;
  if (n10 === 1 && n100 !== 11) return forms[0];
  if (n10 >= 2 && n10 <= 4 && (n100 < 10 || n100 >= 20)) return forms[1];
  return forms[2];
}

export default function CalculatorPage() {
  const [mode, setMode] = useState<CalcMode>('quick');

  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [distanceKm, setDistanceKm] = useState<number>(950);
  const [loadingDate, setLoadingDate] = useState('');
  const [extraPoints, setExtraPoints] = useState<number>(0);

  const [bodyType, setBodyType] = useState<BodyType>('tent');
  const [urgency, setUrgency] = useState<UrgencyType>('standard');
  const [tempMode, setTempMode] = useState<TempMode>('normal');
  const [insurance, setInsurance] = useState<InsuranceType>('basic');
  const [loadingType, setLoadingType] = useState<LoadingType>('rear');

  const [weightTons, setWeightTons] = useState<number>(20);
  const [volumeM3, setVolumeM3] = useState<number>(82);
  const [pallets, setPallets] = useState<number>(33);
  const [comment, setComment] = useState('');

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
      urgencyLabel: urg.label,
      tempLabel: temp.label,
      insuranceLabel: ins.label,
      loadingLabel: load.label,
      minTotal,
      maxTotal,
      center,
      transitDays: estimateTransitDays(distanceKm),
      pricePerKmMin: minTotal / Math.max(distanceKm, 1),
      pricePerKmMax: maxTotal / Math.max(distanceKm, 1),
      factors: [
        `Маршрут ${distanceKm > 0 ? `~ ${formatDistance(distanceKm)} км` : ''}`,
        `Тип кузова: ${body.label}`,
        `Срочность: ${urg.label}`,
        tempMode === 'temp' ? 'Температурный режим' : 'Стандартный температурный режим',
        extraPoints > 0
          ? `Доп. точки: ${extraPoints} ${pluralize(extraPoints, ['точка', 'точки', 'точек'])}`
          : 'Без дополнительных точек',
      ],
    };
  }, [
    bodyType,
    urgency,
    tempMode,
    insurance,
    loadingType,
    extraPoints,
    distanceKm,
    weightTons,
    volumeM3,
    pallets,
  ]);

  const requestQuery = useMemo(() => {
    const params = new URLSearchParams({
      from: fromCity,
      to: toCity,
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
      date: loadingDate,
      comment,
      result: `${Math.round(result.minTotal)}-${Math.round(result.maxTotal)}`,
    });

    return `/request?${params.toString()}`;
  }, [
    fromCity,
    toCity,
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
    loadingDate,
    comment,
    result,
  ]);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Header />

      <main>
        <section className="pb-8 pt-8 md:pb-10 md:pt-10 xl:pb-12 xl:pt-12">
          <Container>
            <div className="px-[14px] md:px-[18px] xl:px-[22px]">
              <div className="flex items-center justify-between gap-6">
                <h1 className="font-heading text-[48px] leading-[0.96] tracking-[-0.045em] text-[var(--text)] xl:text-[52px]">
                  Расчёт грузоперевозки
                </h1>

                <div className="flex items-center gap-3">
                  <Link
                    href="/"
                    className="inline-flex h-[42px] items-center rounded-[16px] bg-[#26292e] px-[16px] text-[14px] font-semibold lowercase tracking-[-0.02em] text-white shadow-[0_8px_20px_rgba(38,41,46,0.08)]"
                    style={{ fontFamily: 'var(--font-body-text)' }}
                  >
                    <ArrowLeft size={15} className="mr-2" />
                    вернуться
                  </Link>

                  <div className="inline-flex h-[42px] items-center rounded-[16px] bg-[var(--surface)] px-[16px] shadow-[0_8px_20px_rgba(38,41,46,0.04)]">
                    <span
                      className="text-[14px] font-semibold lowercase tracking-[-0.02em] text-[var(--text)]"
                      style={{ fontFamily: 'var(--font-body-text)' }}
                    >
                      калькулятор · запрос · КП
                    </span>
                  </div>
                </div>
              </div>

              <p
                className="mt-8 max-w-[760px] text-[19px] font-normal leading-[1.32] tracking-[-0.018em] text-[var(--text-muted)]"
                style={{ fontFamily: 'var(--font-body-text)' }}
              >
                Получите ориентировочную стоимость перевозки по РФ на основе
                маршрута, параметров груза и текущей рыночной ставки.
              </p>

              <div className="mt-6 inline-flex items-center rounded-[18px] bg-[var(--surface)] px-5 py-3">
                <span
                  className="text-[15px] font-semibold tracking-[-0.016em] text-[var(--text)]"
                  style={{ fontFamily: 'var(--font-body-text)' }}
                >
                  рыночная база: 78–87 ₽/км
                </span>
              </div>
            </div>
          </Container>
        </section>

        <section className="pb-10 pt-4 md:pb-12 xl:pb-14">
          <Container>
            <div className="px-[14px] md:px-[18px] xl:px-[22px]">
              <div className="grid grid-cols-[0.96fr_0.78fr] items-start gap-6 xl:gap-8">
                <div className="rounded-[30px] bg-[var(--surface)] px-8 py-8">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Calculator size={20} strokeWidth={2} className="text-[var(--accent-1)]" />
                      <h2 className="font-heading text-[30px] leading-[0.98] tracking-[-0.03em]">
                        Параметры перевозки
                      </h2>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setMode('quick')}
                        className={cnButton(
                          mode === 'quick'
                            ? 'bg-[var(--accent-1)] text-white'
                            : 'bg-[var(--bg)] text-[var(--text)]'
                        )}
                      >
                        быстрый расчёт
                      </button>
                      <button
                        type="button"
                        onClick={() => setMode('advanced')}
                        className={cnButton(
                          mode === 'advanced'
                            ? 'bg-[var(--accent-1)] text-white'
                            : 'bg-[var(--bg)] text-[var(--text)]'
                        )}
                      >
                        точный расчёт
                      </button>
                    </div>
                  </div>

                  <div className="mt-7 grid grid-cols-2 gap-4">
                    <Field label="Город отправления">
                      <input
                        value={fromCity}
                        onChange={(e) => setFromCity(e.target.value)}
                        placeholder="Например, Ульяновск"
                        className={inputClass}
                      />
                    </Field>

                    <Field label="Город назначения">
                      <input
                        value={toCity}
                        onChange={(e) => setToCity(e.target.value)}
                        placeholder="Например, Москва"
                        className={inputClass}
                      />
                    </Field>

                    <Field label="Расстояние, км">
                      <input
                        type="number"
                        value={distanceKm}
                        onChange={(e) => setDistanceKm(Number(e.target.value || 0))}
                        className={inputClass}
                      />
                    </Field>

                    <Field label="Дата погрузки">
                      <input
                        type="date"
                        value={loadingDate}
                        onChange={(e) => setLoadingDate(e.target.value)}
                        className={inputClass}
                      />
                    </Field>

                    <Field label="Тип кузова">
                      <CustomSelect
                        value={bodyType}
                        onChange={(value) => setBodyType(value as BodyType)}
                        options={Object.entries(BODY_CONFIG).map(([key, config]) => ({
                          value: key,
                          label: config.label,
                        }))}
                      />
                    </Field>

                    <Field label="Доп. точки">
                      <input
                        type="number"
                        min={0}
                        value={extraPoints}
                        onChange={(e) => setExtraPoints(Number(e.target.value || 0))}
                        className={inputClass}
                      />
                    </Field>
                  </div>

                  <div className="mt-8 rounded-[20px] bg-[var(--bg)] p-5">
                    <div className="flex items-center gap-3">
                      <Truck size={18} strokeWidth={2} className="text-[var(--accent-1)]" />
                      <h3 className="font-heading text-[22px] leading-[1] tracking-[-0.025em]">
                        Груз и условия
                      </h3>
                    </div>

                    <div className="mt-5 grid grid-cols-3 gap-4">
                      <Field label="Вес, т">
                        <input
                          type="number"
                          value={weightTons}
                          onChange={(e) => setWeightTons(Number(e.target.value || 0))}
                          className={inputClass}
                        />
                      </Field>

                      <Field label="Объём, м³">
                        <input
                          type="number"
                          value={volumeM3}
                          onChange={(e) => setVolumeM3(Number(e.target.value || 0))}
                          className={inputClass}
                        />
                      </Field>

                      <Field label="Паллеты">
                        <input
                          type="number"
                          value={pallets}
                          onChange={(e) => setPallets(Number(e.target.value || 0))}
                          className={inputClass}
                        />
                      </Field>
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-4">
                      <Field label="Срочность">
                        <CustomSelect
                          value={urgency}
                          onChange={(value) => setUrgency(value as UrgencyType)}
                          options={Object.entries(URGENCY_CONFIG).map(([key, config]) => ({
                            value: key,
                            label: config.label,
                          }))}
                        />
                      </Field>

                      <Field label="Температурный режим">
                        <CustomSelect
                          value={tempMode}
                          onChange={(value) => setTempMode(value as TempMode)}
                          options={Object.entries(TEMP_CONFIG).map(([key, config]) => ({
                            value: key,
                            label: config.label,
                          }))}
                        />
                      </Field>

                      {mode === 'advanced' ? (
                        <>
                          <Field label="Тип загрузки">
                            <CustomSelect
                              value={loadingType}
                              onChange={(value) => setLoadingType(value as LoadingType)}
                              options={Object.entries(LOADING_CONFIG).map(([key, config]) => ({
                                value: key,
                                label: config.label,
                              }))}
                            />
                          </Field>

                          <Field label="Страхование">
                            <CustomSelect
                              value={insurance}
                              onChange={(value) => setInsurance(value as InsuranceType)}
                              options={Object.entries(INSURANCE_CONFIG).map(([key, config]) => ({
                                value: key,
                                label: config.label,
                              }))}
                            />
                          </Field>

                          <div className="col-span-2">
                            <Field label="Комментарий">
                              <textarea
                                rows={4}
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Укажите особенности груза, сроки, пожелания"
                                className={`${inputClass} min-h-[124px] resize-none py-4`}
                              />
                            </Field>
                          </div>
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="sticky top-8 rounded-[30px] bg-[#26292e] px-8 py-8 text-white">
                  <div className="flex items-center gap-3">
                    <Route size={19} strokeWidth={2} className="text-[var(--accent-1)]" />
                    <h2 className="font-heading text-[28px] leading-[0.98] tracking-[-0.03em]">
                      Результат
                    </h2>
                  </div>

                  <div className="mt-7">
                    <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-white/56">
                      ориентировочная стоимость
                    </p>
                    <p className="mt-2 font-heading text-[54px] leading-[0.95] tracking-[-0.05em]">
                      {formatCurrency(result.center)} ₽
                    </p>
                  </div>

                  <div className="mt-6 rounded-[18px] bg-white/6 px-5 py-4">
                    <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-white/56">
                      рабочая вилка
                    </p>
                    <p className="mt-2 text-[24px] font-semibold tracking-[-0.03em]">
                      {formatCurrency(result.minTotal)} – {formatCurrency(result.maxTotal)} ₽
                    </p>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <StatCard label="Расстояние" value={`${formatDistance(distanceKm)} км`} />
                    <StatCard label="Срок" value={result.transitDays} />
                    <StatCard label="Кузов" value={result.bodyLabel} />
                    <StatCard
                      label="Ставка / км"
                      value={`${formatCurrency(result.pricePerKmMin)}–${formatCurrency(result.pricePerKmMax)} ₽`}
                    />
                  </div>

                  <div className="mt-7 rounded-[18px] bg-white/6 px-5 py-5">
                    <div className="flex items-center gap-2">
                      <CircleAlert size={16} strokeWidth={2} className="text-[var(--accent-1)]" />
                      <p className="text-[15px] font-semibold tracking-[-0.016em]">
                        Что повлияло на цену
                      </p>
                    </div>

                    <div className="mt-4 flex flex-col gap-3">
                      {result.factors.map((factor) => (
                        <div key={factor} className="flex items-center gap-3 text-[15px] text-white/82">
                          <span className="h-[6px] w-[6px] rounded-full bg-[var(--accent-1)]" />
                          <span>{factor}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col gap-3">
                    <Link
                      href={requestQuery}
                      className="header-utility-button inline-flex h-[56px] items-center justify-center rounded-[16px] bg-[var(--accent-1)] px-6 text-[16px] font-semibold tracking-[-0.02em] text-white"
                    >
                      отправить этот расчёт
                    </Link>

                    <Link
                      href="/request"
                      className="inline-flex h-[52px] items-center justify-center rounded-[14px] bg-white/10 px-6 text-[15px] font-semibold lowercase tracking-[-0.016em] text-white transition hover:bg-white/14"
                    >
                      запросить коммерческое предложение
                    </Link>
                  </div>

                  <p className="mt-4 text-[13px] leading-[1.35] tracking-[-0.012em] text-white/54">
                    Итоговый тариф подтверждается после уточнения параметров груза,
                    маршрута и условий подачи транспорта.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="pb-10 pt-4 md:pb-12 xl:pb-14">
          <Container>
            <div className="px-[14px] md:px-[18px] xl:px-[22px]">
              <div className="rounded-[30px] bg-[var(--surface)] px-8 py-8">
                <div className="flex items-center gap-3">
                  <MapPinned size={19} strokeWidth={2} className="text-[var(--accent-1)]" />
                  <h2 className="font-heading text-[30px] leading-[0.98] tracking-[-0.03em]">
                    Как мы считаем
                  </h2>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <ExplainCard
                    title="1. Базовая ставка маршрута"
                    text="Берём расстояние маршрута и применяем рыночную базу 78–87 ₽/км для типовой фуры по РФ."
                  />
                  <ExplainCard
                    title="2. Поправка на кузов"
                    text="Дальше учитываем тип кузова: тент, штора, изотерм, рефрижератор или спецперевозка."
                  />
                  <ExplainCard
                    title="3. Поправка на условия"
                    text="Срочность, температурный режим, тип загрузки, страхование и дополнительные точки корректируют итог."
                  />
                  <ExplainCard
                    title="4. Рабочая вилка"
                    text="На выходе показываем ориентир и вилку, чтобы расчёт был честным и ближе к реальной ставке рынка."
                  />
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
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
        className="pl-[4px] text-[13px] font-semibold uppercase tracking-[0.07em] text-[var(--text-muted)]"
        style={{ fontFamily: 'var(--font-body-text)' }}
      >
        {label}
      </span>
      {children}
    </label>
  );
}

function StatCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[16px] bg-white/6 px-4 py-4">
      <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-white/50">
        {label}
      </p>
      <p className="mt-2 text-[16px] font-semibold leading-[1.2] tracking-[-0.018em]">
        {value}
      </p>
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
    <div className="rounded-[20px] bg-[var(--bg)] px-5 py-5">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-[22px] leading-[1] tracking-[-0.024em]">
          {title}
        </h3>
        <ChevronDown size={17} strokeWidth={2} className="text-[var(--text-muted)]" />
      </div>
      <p
        className="mt-4 text-[15px] leading-[1.35] tracking-[-0.014em] text-[var(--text-muted)]"
        style={{ fontFamily: 'var(--font-body-text)' }}
      >
        {text}
      </p>
    </div>
  );
}

function cnButton(activeClass: string) {
  return `inline-flex h-[48px] items-center justify-center rounded-[14px] px-5 text-[14px] font-semibold lowercase tracking-[-0.016em] transition ${activeClass}`;
}

const inputClass =
  'h-[56px] w-full rounded-[12px] border border-transparent bg-white px-5 text-[15px] font-normal tracking-[-0.014em] text-[var(--text)] outline-none transition-[border-color,box-shadow,background-color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] placeholder:text-[13px] placeholder:font-normal placeholder:tracking-[-0.012em] placeholder:text-[var(--text-muted)] hover:border-[rgba(38,41,46,0.08)] focus:border-[rgba(250,176,33,0.34)] focus:shadow-[0_0_0_4px_rgba(250,176,33,0.08)]';

function CustomSelect({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
}) {
  const [open, setOpen] = useState(false);
  const selected = options.find((opt) => opt.value === value);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-[56px] w-full items-center justify-between rounded-[12px] border border-transparent bg-white px-5 text-left text-[15px] tracking-[-0.014em] text-[var(--text)] transition-[border-color,box-shadow] duration-200 hover:border-[rgba(38,41,46,0.08)]"
      >
        <span>{selected?.label}</span>
        <ChevronDown
          size={16}
          strokeWidth={2}
          className={`transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open ? (
        <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-[14px] border border-[rgba(38,41,46,0.08)] bg-white shadow-[0_18px_34px_rgba(38,41,46,0.08)]">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className={`flex w-full items-center px-4 py-3 text-left text-[14px] tracking-[-0.014em] transition hover:bg-[var(--surface)] ${
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
