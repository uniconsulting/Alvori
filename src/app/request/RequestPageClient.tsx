'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import {
  ArrowLeft,
  Calculator,
  CircleAlert,
  Paperclip,
  SendHorizonal,
  Upload,
  X,
} from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { RUSSIA_CITIES } from '@/content/cities';

type RequestMode = 'request' | 'send';

function cityValueByLabel(label: string) {
  const found = RUSSIA_CITIES.find(
    (city) => city.label.toLowerCase() === label.trim().toLowerCase(),
  );
  return found?.value ?? '';
}

export default function RequestPageClient() {
  const searchParams =
    typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search)
      : new URLSearchParams();

  const initialData = {
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
    result: searchParams.get('result') ?? '',
    comment: searchParams.get('comment') ?? '',
  };

  const [mode, setMode] = useState<RequestMode>('request');

  const [company, setCompany] = useState('');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [cargoType, setCargoType] = useState('');
  const [shortComment, setShortComment] = useState(initialData.comment);
  const [files, setFiles] = useState<File[]>([]);

  const fromCity = cityValueByLabel(initialData.from);
  const toCity = cityValueByLabel(initialData.to);

  const fromCityObj = useMemo(
    () => RUSSIA_CITIES.find((city) => city.value === fromCity),
    [fromCity],
  );
  const toCityObj = useMemo(
    () => RUSSIA_CITIES.find((city) => city.value === toCity),
    [toCity],
  );

  const routeLabel = `${fromCityObj?.label || initialData.from || '—'} → ${
    toCityObj?.label || initialData.to || '—'
  }`;

  function handleFileSelect(nextFiles: FileList | null) {
    if (!nextFiles) return;

    const allowedExt = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt'];
    const maxFiles = 5;

    const prepared = Array.from(nextFiles).filter((file) => {
      const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
      return allowedExt.includes(ext);
    });

    setFiles((prev) => [...prev, ...prepared].slice(0, maxFiles));
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <>
      <section className="page-offset-from-header pb-6 md:pb-8 xl:pb-8">
        <Container>
          <div className="px-[10px] md:px-[14px] xl:px-[16px]">
            <div className="hidden xl:block">
              <Link
                href="/calculator"
                className="inline-flex items-center text-[14px] font-semibold lowercase tracking-[-0.02em] text-[var(--text)]/70 transition hover:text-[var(--text)]"
                style={{ fontFamily: 'var(--font-body-text)' }}
              >
                <ArrowLeft size={15} className="mr-2" />
                вернуться
              </Link>

              <div className="mt-5 flex items-center justify-between gap-6">
                <h1 className="font-heading text-[42px] leading-[0.98] tracking-[-0.04em] text-[var(--text)] xl:text-[46px]">
                  Запросите или отправьте КП
                </h1>

                <div className="inline-flex h-[42px] items-center rounded-[16px] bg-[var(--surface)] px-[18px] shadow-[0_8px_20px_rgba(38,41,46,0.04)]">
                  <span
                    className="text-[14px] font-semibold lowercase tracking-[-0.02em] text-[var(--text)]"
                    style={{ fontFamily: 'var(--font-body-text)' }}
                  >
                    главная
                    <span className="px-[8px] text-[var(--accent-1)]">·</span>
                    форма КП
                  </span>
                </div>
              </div>

<p
  className="mt-10 max-w-[1120px] text-[19px] font-normal leading-[1.32] tracking-[-0.018em] text-[var(--muted)]"
  style={{ fontFamily: 'var(--font-body-text)' }}
>
  Выберите нужный сценарий: запросить коммерческое предложение или отправить свое КП.
</p>
            </div>

            <div className="xl:hidden">
              <div className="flex items-center justify-between gap-3">
                <Link
                  href="/calculator"
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
                    форма КП
                  </span>
                </div>
              </div>

              <h1 className="mt-7 font-heading text-[34px] leading-[0.96] tracking-[-0.045em] text-[var(--text)] md:text-[40px]">
                Запросите или
                <br />
                отправьте КП
              </h1>

              <p
                className="mt-5 max-w-[640px] text-[16px] font-normal leading-[1.3] tracking-[-0.018em] text-[var(--muted)] md:text-[17px]"
                style={{ fontFamily: 'var(--font-body-text)' }}
              >
                Выберите нужный сценарий: запросить
                <br />
                коммерческое предложение
                <br />
                или отправить свое КП.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-8 pt-0 md:pb-10 xl:pb-10">
        <Container>
          <div className="px-[10px] md:px-[14px] xl:px-[16px]">
            <div className="mb-5 grid w-full max-w-[430px] grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setMode('request')}
                className={modeButtonClass(mode === 'request')}
              >
                запросить КП
              </button>
              <button
                type="button"
                onClick={() => setMode('send')}
                className={modeButtonClass(mode === 'send')}
              >
                отправить КП
              </button>
            </div>

            <div className="hidden rounded-[34px] bg-[#26292e] px-8 py-8 text-white shadow-[0_24px_48px_rgba(0,0,0,0.12)] xl:block">
              <div className="grid grid-cols-[0.98fr_0.72fr] gap-6">
                <div className="flex h-full flex-col">
                  <div className="flex items-center gap-3">
                    <SendHorizonal
                      size={19}
                      strokeWidth={2}
                      className="text-[var(--accent-1)]"
                    />
                    <h2 className="font-heading text-[30px] leading-[0.98] tracking-[-0.03em]">
                      {mode === 'request' ? 'Форма запроса КП' : 'Форма отправки КП'}
                    </h2>
                  </div>

                  <div className="mt-8 grid grid-cols-2 gap-3">
                    <FieldDark label="Компания">
                      <input
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Название компании"
                        className={darkInputClass}
                      />
                    </FieldDark>

                    <FieldDark label="Контактное лицо">
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ваше имя"
                        className={darkInputClass}
                      />
                    </FieldDark>

                    <FieldDark label="Телефон / Telegram">
                      <input
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        placeholder="+7 (...) ... или @telegram"
                        className={darkInputClass}
                      />
                    </FieldDark>

                    <FieldDark label="Тип груза">
                      <input
                        value={cargoType}
                        onChange={(e) => setCargoType(e.target.value)}
                        placeholder="Например, оборудование"
                        className={darkInputClass}
                      />
                    </FieldDark>
                  </div>

                  <div className="mt-4">
                    <FieldDark label="Комментарий">
                      <textarea
                        rows={4}
                        value={shortComment}
                        onChange={(e) => setShortComment(e.target.value)}
                        placeholder={
                          mode === 'request'
                            ? 'Кратко опишите задачу и ожидания по запросу'
                            : 'Кратко опишите, что вы направляете в качестве коммерческого предложения'
                        }
                        className={`${darkInputClass} min-h-[118px] resize-none py-4`}
                      />
                    </FieldDark>
                  </div>
                </div>

                <div className="flex h-full flex-col rounded-[34px] bg-white/6 px-5 py-5">
                  {mode === 'request' ? (
                    <div className="flex h-full flex-col">
                      <div className="flex items-center gap-2">
                        <CircleAlert
                          size={16}
                          strokeWidth={2}
                          className="text-[var(--accent-1)]"
                        />
                        <p className="text-[15px] font-semibold tracking-[-0.016em]">
                          Что дальше
                        </p>
                      </div>

                      <div className="mt-4 flex flex-col gap-3 text-[15px] text-white/78">
                        <Bullet text="Выберите сценарий: запросить или отправить КП" />
                        <Bullet text="Заполните основные контактные данные и комментарий" />
                        <Bullet text="Отправьте запрос для получения обратной связи" />
                      </div>

                      <div className="mt-auto flex flex-col gap-3 pt-4">
                        <button
                          type="button"
                          className="inline-flex h-[54px] items-center justify-center rounded-[16px] bg-[var(--accent-1)] px-6 text-[16px] font-semibold tracking-[-0.02em] text-[var(--accent-1-text)]"
                        >
                          отправить запрос
                        </button>

                        <Link
                          href="/calculator"
                          className="inline-flex h-[50px] items-center justify-center rounded-[14px] bg-white/10 px-6 text-[15px] font-semibold lowercase tracking-[-0.016em] text-white transition hover:bg-white/14"
                        >
                          вернуться к калькулятору
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="flex h-full flex-col">
                      <div className="group flex flex-1 flex-col">
                        <div className="flex items-center gap-2">
                          <Paperclip
                            size={16}
                            strokeWidth={2}
                            className="text-[var(--accent-1)]"
                          />
                          <p className="text-[15px] font-semibold tracking-[-0.016em]">
                            Вложения
                          </p>
                        </div>

                        <label className="relative mt-4 flex min-h-[172px] flex-1 cursor-pointer flex-col overflow-hidden rounded-[18px] bg-white/6 px-5 py-5 transition hover:bg-white/10">
                          <input
                            type="file"
                            multiple
                            className="hidden"
                            accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
                            onChange={(e) => handleFileSelect(e.target.files)}
                          />

                          {files.length === 0 ? (
                            <div className="flex h-full flex-col items-center justify-center text-center">
                              <Upload
                                size={22}
                                strokeWidth={2}
                                className="text-[var(--accent-1)]"
                              />
                              <span className="mt-3 text-[15px] font-semibold">
                                Загрузить файлы
                              </span>
                              <span className="mt-2 text-[13px] text-white/58">
                                PDF, DOCX, XLSX, PPTX, TXT · до 3 файлов
                              </span>

                              <div className="pointer-events-none absolute inset-x-5 bottom-5 z-10 rounded-[14px] bg-[#3a3d43] px-4 py-3 text-[13px] leading-[1.35] text-white/0 opacity-0 shadow-[0_12px_28px_rgba(0,0,0,0.28)] transition duration-300 group-hover:text-white/78 group-hover:opacity-100">
                                Прикрепите до 3 файлов с коммерческим предложением в
                                допустимых форматах.
                              </div>
                            </div>
                          ) : (
                            <div className="flex h-full flex-col">
                              <div className="mb-3 flex items-center justify-between">
                                <span className="text-[13px] font-semibold text-white/72">
                                  Загруженные файлы
                                </span>
                                <span className="text-[12px] text-white/52">
                                  {files.length}/5
                                </span>
                              </div>

                              <div className="flex-1 space-y-2 overflow-y-auto pr-1">
                                {files.map((file, index) => (
                                  <div
                                    key={`${file.name}-${index}`}
                                    className="flex items-center justify-between rounded-[14px] bg-white/8 px-4 py-3"
                                  >
                                    <span className="truncate pr-3 text-[14px] text-white/84">
                                      {file.name}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        removeFile(index);
                                      }}
                                      className="ml-2 inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-[10px] bg-white/10 text-white"
                                    >
                                      <X size={14} />
                                    </button>
                                  </div>
                                ))}
                              </div>

                              <div className="mt-3 rounded-[12px] bg-white/8 px-4 py-3 text-[12px] leading-[1.35] text-white/60">
                                Нажмите в область, чтобы добавить ещё файлы.
                              </div>
                            </div>
                          )}
                        </label>
                      </div>

                      <div className="mt-4 flex flex-col gap-3">
                        <button
                          type="button"
                          className="inline-flex h-[54px] items-center justify-center rounded-[16px] bg-[var(--accent-1)] px-6 text-[16px] font-semibold tracking-[-0.02em] text-[var(--accent-1-text)]"
                        >
                          отправить КП
                        </button>

                        <Link
                          href="/calculator"
                          className="inline-flex h-[50px] items-center justify-center rounded-[14px] bg-white/10 px-6 text-[15px] font-semibold lowercase tracking-[-0.016em] text-white transition hover:bg-white/14"
                        >
                          вернуться к калькулятору
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="rounded-[24px] bg-[#26292e] px-5 py-5 text-white shadow-[0_24px_48px_rgba(0,0,0,0.12)] xl:hidden">
              <div className="flex items-center gap-3">
                <SendHorizonal
                  size={18}
                  strokeWidth={2}
                  className="text-[var(--accent-1)]"
                />
                <h2 className="font-heading text-[24px] leading-[0.98] tracking-[-0.03em]">
                  {mode === 'request' ? 'Форма запроса КП' : 'Форма отправки КП'}
                </h2>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <FieldDark label="Компания">
                  <input
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Название компании"
                    className={darkInputClassMobile}
                  />
                </FieldDark>

                <FieldDark label="Контактное лицо">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ваше имя"
                    className={darkInputClassMobile}
                  />
                </FieldDark>

                <FieldDark label="Телефон / Telegram">
                  <input
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="+7 (...) ... или @telegram"
                    className={darkInputClassMobile}
                  />
                </FieldDark>

                <FieldDark label="Тип груза">
                  <input
                    value={cargoType}
                    onChange={(e) => setCargoType(e.target.value)}
                    placeholder="Например, оборудование"
                    className={darkInputClassMobile}
                  />
                </FieldDark>
              </div>

              <div className="mt-4">
                <FieldDark label="Комментарий">
                  <textarea
                    rows={4}
                    value={shortComment}
                    onChange={(e) => setShortComment(e.target.value)}
                    placeholder={
                      mode === 'request'
                        ? 'Кратко опишите задачу и ожидания по запросу'
                        : 'Кратко опишите, что вы направляете в качестве коммерческого предложения'
                    }
                    className={`${darkInputClassMobile} min-h-[112px] resize-none py-4`}
                  />
                </FieldDark>
              </div>

              {mode === 'request' ? (
                <div className="mt-4 rounded-[18px] bg-white/6 px-4 py-4">
                  <div className="flex items-center gap-2">
                    <CircleAlert
                      size={15}
                      strokeWidth={2}
                      className="text-[var(--accent-1)]"
                    />
                    <p className="text-[14px] font-semibold tracking-[-0.016em]">
                      Что дальше
                    </p>
                  </div>

<div className="mt-4 flex flex-col gap-3 text-[14px] leading-[1.25] text-white/78">
  <Bullet text={'Выберите сценарий: запросить\nили отправить КП.'} mobile />
  <Bullet text={'Заполните основные контактные\nданные и комментарий'} mobile />
  <Bullet text={'Отправьте запрос для\nполучения обратной связи'} mobile />
</div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      className="inline-flex h-[50px] items-center justify-center rounded-[14px] bg-[var(--accent-1)] px-4 text-[14px] font-semibold tracking-[-0.02em] text-[var(--accent-1-text)]"
                    >
                      отправить
                    </button>

                    <Link
                      href="/calculator"
                      className="inline-flex h-[50px] items-center justify-center rounded-[14px] bg-white/10 px-4 text-[14px] font-semibold lowercase tracking-[-0.016em] text-white"
                    >
                      к калькулятору
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="mt-4 rounded-[18px] bg-white/6 px-4 py-4">
                  <div className="flex items-center gap-2">
                    <Paperclip
                      size={15}
                      strokeWidth={2}
                      className="text-[var(--accent-1)]"
                    />
                    <p className="text-[14px] font-semibold tracking-[-0.016em]">
                      Вложения
                    </p>
                  </div>

                  <label className="relative mt-4 flex min-h-[152px] cursor-pointer flex-col justify-center overflow-hidden rounded-[16px] bg-white/6 px-4 py-4 transition">
                    <input
                      type="file"
                      multiple
                      className="hidden"
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
                      onChange={(e) => handleFileSelect(e.target.files)}
                    />

                    {files.length === 0 ? (
                      <div className="flex h-full min-h-[120px] w-full flex-col items-center justify-center text-center">
                        <Upload
                          size={20}
                          strokeWidth={2}
                          className="text-[var(--accent-1)]"
                        />
                        <span className="mt-3 text-[14px] font-semibold">
                          Загрузить файлы
                        </span>
                        <span className="mt-2 text-[12px] text-white/58">
                          PDF, DOCX, XLSX, PPTX, TXT · до 5 файлов
                        </span>
                      </div>
                    ) : (
                      <div className="flex h-full w-full flex-col justify-center">
                        <div className="mb-3 flex items-center justify-between">
                          <span className="text-[12px] font-semibold text-white/72">
                            Загруженные файлы
                          </span>
                          <span className="text-[12px] text-white/52">
                            {files.length}/5
                          </span>
                        </div>

                        <div className="flex-1 space-y-2 overflow-y-auto pr-1">
                          {files.map((file, index) => (
                            <div
                              key={`${file.name}-${index}`}
                              className="flex items-center justify-between rounded-[12px] bg-white/8 px-3 py-3"
                            >
                              <span className="truncate pr-3 text-[13px] text-white/84">
                                {file.name}
                              </span>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  removeFile(index);
                                }}
                                className="ml-2 inline-flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-[9px] bg-white/10 text-white"
                              >
                                <X size={13} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </label>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      className="inline-flex h-[50px] items-center justify-center rounded-[14px] bg-[var(--accent-1)] px-4 text-[14px] font-semibold tracking-[-0.02em] text-[var(--accent-1-text)]"
                    >
                      отправить КП
                    </button>

                    <Link
                      href="/calculator"
                      className="inline-flex h-[50px] items-center justify-center rounded-[14px] bg-white/10 px-4 text-[14px] font-semibold lowercase tracking-[-0.016em] text-white"
                    >
                      к калькулятору
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-12 pt-0 md:pb-14 xl:pb-16">
        <Container>
          <div className="px-[10px] md:px-[14px] xl:px-[16px]">
            <div className="rounded-[36px] bg-[var(--surface)] px-5 py-5 shadow-[var(--shadow-soft)] xl:rounded-[40px] xl:px-8 xl:py-8">
              <div className="flex items-center gap-3">
                <Calculator size={18} strokeWidth={2} className="text-[var(--accent-1)] xl:size-[19px]" />
                <h2 className="font-heading text-[24px] leading-[0.98] tracking-[-0.03em] text-[var(--text)] xl:text-[30px]">
                  Данные из калькулятора
                </h2>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 xl:grid-cols-4 xl:gap-4 xl:mt-6">
                <InfoCard label="Маршрут" value={routeLabel} mobile />
                <InfoCard label="Расстояние" value={initialData.distance || '—'} mobile />
                <InfoCard label="Кузов" value={initialData.body || '—'} mobile />
                <InfoCard label="Вилка расчёта" value={initialData.result || '—'} mobile />
                <InfoCard
                  label="Вес / объём"
                  value={`${initialData.weight || '—'} т / ${initialData.volume || '—'} м³`}
                  mobile
                />
                <InfoCard label="Паллеты" value={initialData.pallets || '—'} mobile />
                <InfoCard label="Температура" value={initialData.temp || '—'} mobile />
                <InfoCard label="Страхование" value={initialData.insurance || '—'} mobile />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function FieldDark({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="pl-[4px] text-[12px] font-semibold uppercase tracking-[0.07em] text-white/56 xl:text-[13px]">
        {label}
      </span>
      {children}
    </label>
  );
}

function Bullet({
  text,
  mobile = false,
}: {
  text: string;
  mobile?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-[6px] w-[6px] shrink-0 rounded-full bg-[var(--accent-1)]" />
      <span className={mobile ? 'whitespace-pre-line' : undefined}>{text}</span>
    </div>
  );
}

function InfoCard({
  label,
  value,
  mobile = false,
}: {
  label: string;
  value: string;
  mobile?: boolean;
}) {
  return (
    <div
      className={
        mobile
          ? 'rounded-[18px] bg-[var(--bg)] px-4 py-4'
          : 'rounded-[20px] bg-[var(--bg)] px-5 py-5'
      }
    >
      <div
        className={
          mobile
            ? 'text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--muted)]'
            : 'text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--muted)]'
        }
      >
        {label}
      </div>
      <div
        className={
          mobile
            ? 'mt-3 text-[14px] font-semibold leading-[1.26] text-[var(--text)]'
            : 'mt-3 text-[16px] font-semibold leading-[1.28] text-[var(--text)]'
        }
      >
        {value}
      </div>
    </div>
  );
}

const darkInputClass =
  'h-[56px] w-full rounded-[12px] border-0 bg-white/8 px-5 text-[15px] font-normal tracking-[-0.014em] text-white outline-none transition duration-200 placeholder:text-[13px] placeholder:font-normal placeholder:tracking-[-0.012em] placeholder:text-white/48 hover:bg-white/10 focus:bg-white/12';

const darkInputClassMobile =
  'h-[52px] w-full rounded-[12px] border-0 bg-white/8 px-4 text-[14px] font-normal tracking-[-0.014em] text-white outline-none transition duration-200 placeholder:text-[12px] placeholder:font-normal placeholder:tracking-[-0.012em] placeholder:text-white/48 focus:bg-white/12';

function modeButtonClass(active: boolean) {
  return `inline-flex h-[48px] items-center justify-center rounded-[14px] px-5 text-[14px] font-semibold lowercase tracking-[-0.016em] transition ${
    active
      ? 'bg-[var(--accent-1)] text-[var(--accent-1-text)]'
      : 'bg-[var(--surface-soft)] text-[var(--text)]'
  }`;
}
