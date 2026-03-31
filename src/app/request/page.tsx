'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  ArrowLeft,
  Dot,
  FileText,
  SendHorizonal,
  Calculator,
  CircleAlert,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';

export default function RequestPage() {
  const searchParams = useSearchParams();

  const initialData = useMemo(
    () => ({
      from: searchParams.get('from') ?? '',
      to: searchParams.get('to') ?? '',
      distance: searchParams.get('distance') ?? '',
      body: searchParams.get('body') ?? '',
      weight: searchParams.get('weight') ?? '',
      volume: searchParams.get('volume') ?? '',
      pallets: searchParams.get('pallets') ?? '',
      points: searchParams.get('points') ?? '',
      urgency: searchParams.get('urgency') ?? '',
      temp: searchParams.get('temp') ?? '',
      loading: searchParams.get('loading') ?? '',
      insurance: searchParams.get('insurance') ?? '',
      date: searchParams.get('date') ?? '',
      result: searchParams.get('result') ?? '',
      comment: searchParams.get('comment') ?? '',
    }),
    [searchParams]
  );

  const [company, setCompany] = useState('');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [cargoType, setCargoType] = useState('');
  const [details, setDetails] = useState(initialData.comment);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Header />

      <main>
        <section className="pb-6 pt-8 md:pb-8 md:pt-10 xl:pb-8 xl:pt-12">
          <Container>
            <div className="px-[10px] md:px-[14px] xl:px-[16px]">
              <div className="flex items-center justify-between gap-6">
                <h1 className="font-heading text-[42px] leading-[0.98] tracking-[-0.04em] text-[var(--text)] xl:text-[46px]">
                  Запрос / коммерческое предложение
                </h1>

                <div className="flex items-center gap-3">
                  <Link
                    href="/calculator"
                    className="inline-flex h-[42px] items-center rounded-[16px] bg-[#26292e] px-[16px] text-[14px] font-semibold lowercase tracking-[-0.02em] text-[#ffffff] shadow-[0_8px_20px_rgba(38,41,46,0.08)]"
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
                      форма запроса · КП
                    </span>
                  </div>
                </div>
              </div>

              <p
                className="mt-10 max-w-[780px] text-[19px] font-normal leading-[1.32] tracking-[-0.018em] text-[var(--text-muted)]"
                style={{ fontFamily: 'var(--font-body-text)' }}
              >
                Уточните детали перевозки или направьте запрос на коммерческое
                предложение. Если вы пришли из калькулятора, параметры уже
                перенесены в форму.
              </p>
            </div>
          </Container>
        </section>

        <section className="pb-10 pt-0 md:pb-12 xl:pb-14">
          <Container>
            <div className="px-[10px] md:px-[14px] xl:px-[16px]">
              <div className="grid grid-cols-[0.98fr_0.72fr] items-start gap-5 xl:gap-6">
                <div className="rounded-[30px] bg-[var(--surface)] px-8 py-8">
                  <div className="flex items-center gap-3">
                    <FileText size={20} strokeWidth={2} className="text-[var(--accent-1)]" />
                    <h2 className="font-heading text-[28px] leading-[0.98] tracking-[-0.03em]">
                      Расширенная форма
                    </h2>
                  </div>

                  <p
                    className="mt-4 max-w-[700px] text-[16px] leading-[1.32] tracking-[-0.014em] text-[var(--text-muted)]"
                    style={{ fontFamily: 'var(--font-body-text)' }}
                  >
                    Передайте нам параметры перевозки, контактные данные и
                    комментарии по задаче. На основе этого мы уточним расчёт и
                    подготовим коммерческое предложение.
                  </p>

                  <form className="mt-7 grid grid-cols-2 gap-4">
                    <Field label="Компания">
                      <input
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Название компании"
                        className={inputClass}
                      />
                    </Field>

                    <Field label="Контактное лицо">
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ваше имя"
                        className={inputClass}
                      />
                    </Field>

                    <Field label="Телефон / Telegram">
                      <input
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        placeholder="+7 (...) ... или @telegram"
                        className={inputClass}
                      />
                    </Field>

                    <Field label="Тип груза">
                      <input
                        value={cargoType}
                        onChange={(e) => setCargoType(e.target.value)}
                        placeholder="Например, промышленное оборудование"
                        className={inputClass}
                      />
                    </Field>

                    <Field label="Город отправления">
                      <input defaultValue={initialData.from} className={inputClass} />
                    </Field>

                    <Field label="Город назначения">
                      <input defaultValue={initialData.to} className={inputClass} />
                    </Field>

                    <Field label="Расстояние, км">
                      <input defaultValue={initialData.distance} className={inputClass} />
                    </Field>

                    <Field label="Дата погрузки">
                      <input defaultValue={initialData.date} className={inputClass} />
                    </Field>

                    <Field label="Тип кузова">
                      <input defaultValue={initialData.body} className={inputClass} />
                    </Field>

                    <Field label="Доп. точки">
                      <input defaultValue={initialData.points} className={inputClass} />
                    </Field>

                    <Field label="Вес, т">
                      <input defaultValue={initialData.weight} className={inputClass} />
                    </Field>

                    <Field label="Объём, м³">
                      <input defaultValue={initialData.volume} className={inputClass} />
                    </Field>

                    <Field label="Паллеты">
                      <input defaultValue={initialData.pallets} className={inputClass} />
                    </Field>

                    <Field label="Срочность">
                      <input defaultValue={initialData.urgency} className={inputClass} />
                    </Field>

                    <Field label="Температурный режим">
                      <input defaultValue={initialData.temp} className={inputClass} />
                    </Field>

                    <Field label="Тип загрузки">
                      <input defaultValue={initialData.loading} className={inputClass} />
                    </Field>

                    <Field label="Страхование">
                      <input defaultValue={initialData.insurance} className={inputClass} />
                    </Field>

                    <Field label="Расчётная вилка">
                      <input defaultValue={initialData.result} className={inputClass} />
                    </Field>

                    <div className="col-span-2">
                      <Field label="Комментарий / детали запроса">
                        <textarea
                          rows={6}
                          value={details}
                          onChange={(e) => setDetails(e.target.value)}
                          placeholder="Уточните параметры груза, срок, желаемый формат работы, необходимость КП"
                          className={`${inputClass} min-h-[156px] resize-none py-4`}
                        />
                      </Field>
                    </div>

                    <div className="col-span-2 mt-2 flex gap-3">
                      <button
                        type="submit"
                        className="header-utility-button inline-flex h-[56px] items-center justify-center rounded-[14px] bg-[var(--accent-1)] px-7 text-[16px] font-semibold lowercase tracking-[-0.02em] text-white"
                      >
                        <SendHorizonal size={17} className="mr-2" />
                        отправить запрос
                      </button>

                      <Link
                        href="/contacts"
                        className="inline-flex h-[56px] items-center justify-center rounded-[14px] bg-[var(--bg)] px-7 text-[15px] font-semibold lowercase tracking-[-0.016em] text-[var(--text)] transition hover:bg-white"
                      >
                        открыть страницу контактов
                      </Link>
                    </div>
                  </form>
                </div>

                <div className="rounded-[30px] bg-[#26292e] px-8 py-8 text-white">
                  <div className="flex items-center gap-3">
                    <Calculator size={20} strokeWidth={2} className="text-[var(--accent-1)]" />
                    <h2 className="font-heading text-[28px] leading-[0.98] tracking-[-0.03em]">
                      Данные из калькулятора
                    </h2>
                  </div>

                  <p className="mt-4 text-[15px] leading-[1.35] tracking-[-0.014em] text-white/68">
                    Если вы пришли со страницы расчёта, мы уже перенесли
                    основные параметры в форму. Проверьте их и дополните
                    запрос.
                  </p>

                  <div className="mt-7 flex flex-col gap-3">
                    <PreviewRow
                      label="Маршрут"
                      value={`${initialData.from || '—'} → ${initialData.to || '—'}`}
                    />
                    <PreviewRow label="Расстояние" value={initialData.distance || '—'} />
                    <PreviewRow label="Кузов" value={initialData.body || '—'} />
                    <PreviewRow
                      label="Вес / объём"
                      value={`${initialData.weight || '—'} т / ${initialData.volume || '—'} м³`}
                    />
                    <PreviewRow label="Паллеты" value={initialData.pallets || '—'} />
                    <PreviewRow label="Доп. точки" value={initialData.points || '—'} />
                    <PreviewRow label="Срочность" value={initialData.urgency || '—'} />
                    <PreviewRow label="Температура" value={initialData.temp || '—'} />
                    <PreviewRow label="Загрузка" value={initialData.loading || '—'} />
                    <PreviewRow label="Страхование" value={initialData.insurance || '—'} />
                    <PreviewRow label="Вилка расчёта" value={initialData.result || '—'} />
                  </div>

                  <div className="mt-7 rounded-[18px] bg-white/6 px-5 py-5">
                    <div className="flex items-center gap-2">
                      <CircleAlert size={16} strokeWidth={2} className="text-[var(--accent-1)]" />
                      <p className="text-[15px] font-semibold tracking-[-0.016em]">
                        Как это использовать
                      </p>
                    </div>

                    <div className="mt-4 flex flex-col gap-3 text-[15px] text-white/78">
                      <div className="flex items-center gap-3">
                        <span className="h-[6px] w-[6px] rounded-full bg-[var(--accent-1)]" />
                        <span>Проверьте параметры, пришедшие из калькулятора</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="h-[6px] w-[6px] rounded-full bg-[var(--accent-1)]" />
                        <span>Дополните запрос деталями по грузу и условиям</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="h-[6px] w-[6px] rounded-full bg-[var(--accent-1)]" />
                        <span>Отправьте форму для подготовки точного расчёта / КП</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Link
                      href="/calculator"
                      className="inline-flex h-[52px] items-center justify-center rounded-[14px] bg-white/10 px-6 text-[15px] font-semibold lowercase tracking-[-0.016em] text-white transition hover:bg-white/14"
                    >
                      вернуться к калькулятору
                    </Link>
                  </div>
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

function PreviewRow({
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
      <p className="mt-2 text-[15px] font-medium leading-[1.3] tracking-[-0.014em] text-white">
        {value}
      </p>
    </div>
  );
}

const inputClass =
  'h-[56px] w-full rounded-[12px] border border-[rgba(38,41,46,0.12)] bg-[rgba(255,255,255,0.96)] px-5 text-[15px] font-normal tracking-[-0.014em] text-[var(--text)] outline-none transition-[border-color,box-shadow,background-color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] placeholder:text-[13px] placeholder:font-normal placeholder:tracking-[-0.012em] placeholder:text-[var(--text-muted)] hover:border-[rgba(250,176,33,0.26)] focus:border-[rgba(250,176,33,0.38)] focus:bg-white focus:shadow-[0_0_0_4px_rgba(250,176,33,0.08)]';
