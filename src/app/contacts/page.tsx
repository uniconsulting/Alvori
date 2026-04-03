import Link from 'next/link';
import {
  ArrowLeft,
  ExternalLink,
  Mail,
  MapPinned,
  Phone,
  ShieldCheck,
  Building2,
  Link as LinkIcon,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';

const CONTACTS = {
  phoneDisplay: '+7 (902) 123–44–88',
  phoneHref: 'tel:+79021234488',
  email: 'alvori@mail.ru',
  emailHref: 'mailto:alvori@mail.ru',
  atiCode: '1005',
  atiHref: 'https://ati.su/firms/1005/rating',
  telegramHref: '#',
  maxHref: '#',
  address:
    '432045, Ульяновская область, г Ульяновск, Московское ш, зд. 24в, офис 2',
  mapHref: '#',
  mapEmbed:
    'https://yandex.ru/map-widget/v1/?um=constructor%3A27a66f075dac296d1f0870f4a2a9f711d36545eef60e5931464e72c1f6040eb4&amp;source=constructor',
};

const COMPANY = {
  name: 'ООО «АЛВОРИ»',
  inn: '7300045728',
  ogrn: '1257300006886',
  rusprofile: 'https://www.rusprofile.ru/id/1257300006886',
};

const DOCUMENTS = [
  { label: 'договор оферты', href: '#' },
  { label: 'политика конфиденциальности', href: '#' },
  { label: 'пользовательское соглашение', href: '#' },
  { label: 'обработка персональных данных', href: '#' },
];

export default function ContactsPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Header />

      <main>
        <section className="page-offset-from-header pb-6 md:pb-8 xl:pb-8">
          <Container>
            <div className="px-[10px] md:px-[14px] xl:px-[16px]">
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
                    Свяжитесь с нами
                  </h1>

                  <div className="inline-flex h-[42px] items-center rounded-[16px] bg-[var(--surface)] px-[18px] shadow-[0_8px_20px_rgba(38,41,46,0.04)]">
                    <span
                      className="text-[14px] font-semibold lowercase tracking-[-0.02em] text-[var(--text)]"
                      style={{ fontFamily: 'var(--font-body-text)' }}
                    >
                      главная
                      <span className="px-[8px] text-[var(--accent-1)]">·</span>
                      контакты
                    </span>
                  </div>
                </div>

                <p
                  className="mt-10 max-w-[820px] text-[19px] font-normal leading-[1.32] tracking-[-0.018em] text-[var(--muted)]"
                  style={{ fontFamily: 'var(--font-body-text)' }}
                >
                  Выберите удобный способ связи, ознакомьтесь с юридической информацией
                  <br />
                  и при необходимости перейдите к карте или документации.
                </p>
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
                      контакты
                    </span>
                  </div>
                </div>

                <h1 className="mt-7 font-heading text-[34px] leading-[0.96] tracking-[-0.045em] text-[var(--text)] md:text-[40px]">
                  Свяжитесь с нами
                </h1>

                <p
                  className="mt-5 max-w-[640px] text-[16px] font-normal leading-[1.3] tracking-[-0.018em] text-[var(--muted)] md:text-[17px]"
                  style={{ fontFamily: 'var(--font-body-text)' }}
                >
                  Выберите удобный способ связи,
                  <br />
                  ознакомьтесь с юридической информацией
                  <br />
                  и при необходимости перейдите к карте.
                </p>
              </div>
            </div>
          </Container>
        </section>

        <section className="pb-8 pt-0 md:pb-10 xl:pb-10">
          <Container>
            <div className="px-[10px] md:px-[14px] xl:px-[16px]">
              <div className="hidden rounded-[40px] bg-[#26292e] px-6 py-6 text-white shadow-[0_24px_48px_rgba(0,0,0,0.12)] xl:block">
                <div className="grid grid-cols-[1fr_auto] items-stretch gap-4">
                  <div className="grid grid-cols-3 gap-3 items-stretch">
                    <ContactMiniCard
                      icon={<Phone size={17} strokeWidth={2} />}
                      label="телефон"
                      value={CONTACTS.phoneDisplay}
                      href={CONTACTS.phoneHref}
                      stretch
                    />
                    <ContactMiniCard
                      icon={<Mail size={17} strokeWidth={2} />}
                      label="почта"
                      value={CONTACTS.email}
                      href={CONTACTS.emailHref}
                      stretch
                    />
                    <ContactMiniCard
                      icon={<LinkIcon size={17} strokeWidth={2} />}
                      label="код ati.su"
                      value={CONTACTS.atiCode}
                      href={CONTACTS.atiHref}
                      stretch
                    />
                  </div>

                  <div className="flex w-[248px] flex-col gap-3">
                    <Link
                      href={CONTACTS.telegramHref}
                      className="inline-flex h-[56px] items-center justify-center rounded-[20px] bg-[var(--accent-1)] px-6 text-[16px] font-semibold tracking-[-0.02em] !text-[var(--accent-1-text)]"
                    >
                      написать в Telegram
                    </Link>

                    <Link
                      href={CONTACTS.maxHref}
                      className="inline-flex h-[52px] items-center justify-center rounded-[16px] bg-white/10 px-6 text-[15px] font-semibold tracking-[-0.016em] text-white transition hover:bg-white/14"
                    >
                      Написать в MAX
                    </Link>
                  </div>
                </div>
              </div>

<div className="rounded-[24px] bg-[#26292e] px-5 py-5 text-white shadow-[0_24px_48px_rgba(0,0,0,0.12)] xl:hidden">
  <div className="flex flex-col gap-3">
    <ContactMiniCard
      icon={<Phone size={16} strokeWidth={2} />}
      label="телефон"
      value={CONTACTS.phoneDisplay}
      href={CONTACTS.phoneHref}
      mobile
    />

    <ContactMiniCard
      icon={<Mail size={16} strokeWidth={2} />}
      label="почта"
      value={CONTACTS.email}
      href={CONTACTS.emailHref}
      mobile
    />

    <ContactMiniCard
      icon={<Building2 size={16} strokeWidth={2} />}
      label="код ati.su"
      value={CONTACTS.atiCode}
      href={CONTACTS.atiHref}
      mobile
      atiLinked
    />

    <div className="grid grid-cols-2 gap-3">
      <Link
        href={CONTACTS.telegramHref}
        className="inline-flex h-[52px] items-center justify-center rounded-[16px] bg-[var(--accent-1)] px-4 text-[14px] font-semibold tracking-[-0.02em] text-[var(--accent-1-text)]"
      >
        написать в TG
      </Link>

      <Link
        href={CONTACTS.maxHref}
        className="inline-flex h-[52px] items-center justify-center rounded-[16px] bg-white/10 px-4 text-[14px] font-semibold tracking-[-0.016em] text-white"
      >
        написать в MAX
      </Link>
    </div>
  </div>
</div>
            </div>
          </Container>
        </section>

        <section className="pb-8 pt-0 md:pb-10 xl:pb-10">
          <Container>
            <div className="px-[10px] md:px-[14px] xl:px-[16px]">
              <div className="hidden rounded-[30px] bg-[var(--surface)] px-6 py-6 shadow-[var(--shadow-soft)] xl:block">
                <div className="grid grid-cols-[1fr_auto] items-center gap-4">
                  <div className="flex h-[54px] items-center rounded-[22px] bg-[var(--bg)] px-5">
                    <Building2
                      size={18}
                      strokeWidth={2}
                      className="mr-3 text-[var(--text)]"
                    />

                    <span className="text-[18px] font-semibold tracking-[-0.02em] text-[var(--text)]">
                      {COMPANY.name}
                    </span>

                    <span className="mx-4 block h-[22px] w-[1px] bg-[var(--divider)]" />

                    <span className="text-[18px] font-semibold tracking-[-0.02em] text-[var(--text)]">
                      ИНН: {COMPANY.inn}
                    </span>

                    <span className="mx-4 block h-[22px] w-[1px] bg-[var(--divider)]" />

                    <span className="text-[18px] font-semibold tracking-[-0.02em] text-[var(--text)]">
                      ОГРН: {COMPANY.ogrn}
                    </span>
                  </div>

                  <Link
                    href={COMPANY.rusprofile}
                    className="inline-flex h-[54px] items-center justify-center rounded-[16px] bg-[var(--accent-1)] px-6 text-[15px] font-semibold lowercase tracking-[-0.016em] text-[var(--accent-1-text)]"
                  >
                    посмотреть больше данных
                  </Link>
                </div>
              </div>

              <div className="rounded-[24px] bg-[var(--surface)] px-5 py-5 shadow-[var(--shadow-soft)] xl:hidden">
                <div className="rounded-[16px] bg-[var(--bg)] px-4 py-4">
                  <div className="flex items-center gap-2">
                    <Building2
                      size={16}
                      strokeWidth={2}
                      className="text-[var(--text)]"
                    />
                    <span className="text-[14px] font-semibold tracking-[-0.018em] text-[var(--text)]">
                      {COMPANY.name}
                    </span>
                  </div>

                  <div
                    className="mt-4 flex flex-col gap-3 text-[14px] leading-[1.28] tracking-[-0.014em] text-[var(--text)]"
                    style={{ fontFamily: 'var(--font-body-text)' }}
                  >
                    <div>ИНН: {COMPANY.inn}</div>
                    <div>ОГРН: {COMPANY.ogrn}</div>
                  </div>
                </div>

                <Link
                  href={COMPANY.rusprofile}
                  className="mt-4 inline-flex h-[52px] w-full items-center justify-center rounded-[16px] bg-[var(--accent-1)] px-5 text-[14px] font-semibold tracking-[-0.016em] text-[var(--accent-1-text)]"
                >
                  посмотреть больше данных
                </Link>
              </div>
            </div>
          </Container>
        </section>

        <section className="pb-8 pt-0 md:pb-10 xl:pb-10">
          <Container>
            <div className="px-[10px] md:px-[14px] xl:px-[16px]">
              <div className="rounded-[24px] bg-[var(--surface)] p-3 shadow-[var(--shadow-soft)] xl:rounded-[30px] xl:p-4">
                <div className="relative overflow-hidden rounded-[18px] xl:rounded-[22px]">
                  <iframe
                    src={CONTACTS.mapEmbed}
                    width="100%"
                    height="480"
                    loading="lazy"
                    style={{ border: 0, display: 'block' }}
                    title="Карта офиса АЛВОРИ"
                    className="h-[360px] xl:h-[480px]"
                  />

                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(38,41,46,0.28)_0%,rgba(38,41,46,0.1)_28%,rgba(38,41,46,0.08)_100%)]" />

                  <div className="absolute left-4 right-4 top-4 max-w-[420px] rounded-[16px] bg-[rgba(38,41,46,0.78)] px-4 py-4 text-white shadow-[0_18px_36px_rgba(0,0,0,0.22)] backdrop-blur-[10px] xl:left-5 xl:right-auto xl:top-5 xl:rounded-[18px] xl:px-5">
                    <div className="flex items-center gap-2">
                      <MapPinned
                        size={16}
                        strokeWidth={2}
                        className="text-[var(--accent-1)]"
                      />
                      <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-white/62">
                        адрес
                      </span>
                    </div>

                    <p className="mt-3 text-[14px] leading-[1.34] tracking-[-0.014em] text-white xl:text-[15px] xl:leading-[1.38]">
                      {CONTACTS.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="pb-12 pt-0 md:pb-14 xl:pb-16">
          <Container>
            <div className="px-[10px] md:px-[14px] xl:px-[16px]">
              <div className="rounded-[24px] bg-[var(--surface)] px-5 py-5 shadow-[var(--shadow-soft)] xl:rounded-[30px] xl:px-8 xl:py-8">
                <div className="flex items-center gap-3">
                  <ShieldCheck
                    size={18}
                    strokeWidth={2}
                    className="text-[var(--accent-1)] xl:size-[19px]"
                  />
                  <h2 className="font-heading text-[24px] leading-[0.98] tracking-[-0.03em] text-[var(--text)] xl:text-[30px]">
                    Документация
                  </h2>
                </div>

                <div className="mt-5 flex flex-col gap-3 xl:mt-6 xl:grid xl:grid-cols-2 xl:gap-4">
                  {DOCUMENTS.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="group flex items-center justify-between rounded-[16px] bg-[var(--bg)] px-4 py-4 transition hover:translate-y-[-1px] xl:rounded-[22px] xl:px-5 xl:py-5"
                    >
                      <span className="text-[14px] font-semibold leading-[1.24] tracking-[-0.016em] text-[var(--text)] xl:text-[16px] xl:leading-[1.2]">
                        {item.label}
                      </span>
                      <ExternalLink
                        size={15}
                        strokeWidth={2}
                        className="shrink-0 text-[var(--muted)] transition group-hover:text-[var(--text)] xl:size-[16px]"
                      />
                    </Link>
                  ))}
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

function ContactMiniCard({
  icon,
  label,
  value,
  href,
  stretch = false,
  mobile = false,
  atiLinked = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  stretch?: boolean;
  mobile?: boolean;
  atiLinked?: boolean;
}) {
  const valueNode = atiLinked ? (
    <div
      className={`mt-3 flex items-center gap-2 font-semibold tracking-[-0.03em] text-white ${
        mobile ? 'text-[18px] leading-[1.18]' : 'text-[26px]'
      }`}
    >
      <LinkIcon
        size={mobile ? 15 : 17}
        strokeWidth={2}
        className="shrink-0 text-white"
      />
      <span>{value}</span>
    </div>
  ) : (
    <div
      className={`mt-3 font-semibold tracking-[-0.03em] text-white ${
        mobile ? 'text-[18px] leading-[1.18]' : 'text-[26px]'
      }`}
    >
      {value}
    </div>
  );

  const content = (
    <div
      className={`bg-white/6 ${stretch ? 'h-full' : ''} ${
        mobile ? 'rounded-[16px] px-4 py-4' : 'rounded-[20px] px-5 py-5'
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="text-[var(--accent-1)]">{icon}</span>
        <span
          className={`font-semibold uppercase tracking-[0.08em] text-white/50 ${
            mobile ? 'text-[11px]' : 'text-[12px]'
          }`}
        >
          {label}
        </span>
      </div>

      {valueNode}
    </div>
  );

  if (href) {
    return (
      <Link href={href} target="_blank" rel="noreferrer">
        {content}
      </Link>
    );
  }

  return content;
}
