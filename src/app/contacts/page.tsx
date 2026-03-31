import Link from 'next/link';
import {
  ArrowLeft,
  Calculator,
  FileText,
  Mail,
  MapPinned,
  MessageCircle,
  Phone,
  ShieldCheck,
  Building2,
  ExternalLink,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';

const CONTACTS = {
  phoneDisplay: '+7 (987) 630–68–63',
  phoneHref: 'tel:+79876306863',
  email: 'alvori@mail.ru',
  emailHref: 'mailto:alvori@mail.ru',
  atiCode: '1005',
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
        <section className="pb-6 pt-12 md:pb-8 md:pt-14 xl:pb-8 xl:pt-16">
          <Container>
            <div className="px-[10px] md:px-[14px] xl:px-[16px]">
              <PageHeader />
            </div>
          </Container>
        </section>

        <section className="pb-8 pt-0 md:pb-10 xl:pb-10">
          <Container>
            <div className="px-[10px] md:px-[14px] xl:px-[16px]">
              <ContactsHeroCard />
            </div>
          </Container>
        </section>

        <section className="pb-8 pt-0 md:pb-10 xl:pb-10">
          <Container>
            <div className="px-[10px] md:px-[14px] xl:px-[16px]">
              <CompanyInfoCard />
            </div>
          </Container>
        </section>

        <section className="pb-8 pt-0 md:pb-10 xl:pb-10">
          <Container>
            <div className="px-[10px] md:px-[14px] xl:px-[16px]">
              <MapAndAddressSection />
            </div>
          </Container>
        </section>

        <section className="pb-12 pt-0 md:pb-14 xl:pb-16">
          <Container>
            <div className="px-[10px] md:px-[14px] xl:px-[16px]">
              <DocumentsSection />
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function PageHeader() {
  return (
    <>
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
    </>
  );
}

function ContactsHeroCard() {
  return (
    <div className="rounded-[32px] bg-[#26292e] px-8 py-8 text-white shadow-[0_24px_48px_rgba(0,0,0,0.12)]">
      <div className="grid grid-cols-[0.96fr_0.72fr] gap-6">
        <div>
          <div className="flex items-center gap-3">
            <Phone size={19} strokeWidth={2} className="text-[var(--accent-1)]" />
            <h2 className="font-heading text-[30px] leading-[0.98] tracking-[-0.03em]">
              Контакты для связи
            </h2>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-3">
            <ContactLine
              icon={<Phone size={17} strokeWidth={2} />}
              label="телефон"
              value={CONTACTS.phoneDisplay}
              href={CONTACTS.phoneHref}
            />
            <ContactLine
              icon={<Mail size={17} strokeWidth={2} />}
              label="почта"
              value={CONTACTS.email}
              href={CONTACTS.emailHref}
            />
            <ContactLine
              icon={<Building2 size={17} strokeWidth={2} />}
              label="код ati.su"
              value={CONTACTS.atiCode}
            />
          </div>
        </div>

        <div className="flex h-full flex-col justify-between rounded-[24px] bg-white/6 px-5 py-5">
          <div>
            <div className="flex items-center gap-2">
              <MessageCircle
                size={16}
                strokeWidth={2}
                className="text-[var(--accent-1)]"
              />
              <p className="text-[15px] font-semibold tracking-[-0.016em]">
                Быстрые действия
              </p>
            </div>

            <div className="mt-4 flex flex-col gap-3 text-[15px] text-white/78">
              <Bullet text="Позвоните нам напрямую" />
              <Bullet text="Напишите на электронную почту" />
              <Bullet text="Перейдите в удобный мессенджер" />
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <Link
              href={CONTACTS.telegramHref}
              className="inline-flex h-[54px] items-center justify-center rounded-[16px] bg-[var(--accent-1)] px-6 text-[16px] font-semibold tracking-[-0.02em] text-[var(--accent-1-text)]"
            >
              написать в Telegram
            </Link>

            <Link
              href={CONTACTS.maxHref}
              className="inline-flex h-[50px] items-center justify-center rounded-[14px] bg-white/10 px-6 text-[15px] font-semibold lowercase tracking-[-0.016em] text-white transition hover:bg-white/14"
            >
              написать в Max
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function CompanyInfoCard() {
  return (
    <div className="rounded-[30px] bg-[var(--surface)] px-8 py-8 shadow-[var(--shadow-soft)]">
      <div className="grid grid-cols-[1fr_auto] items-center gap-6">
        <div>
          <div className="flex items-center gap-3">
            <Building2
              size={19}
              strokeWidth={2}
              className="text-[var(--accent-1)]"
            />
            <h2 className="font-heading text-[30px] leading-[0.98] tracking-[-0.03em] text-[var(--text)]">
              Юридическая информация
            </h2>
          </div>

          <div className="mt-6 rounded-[22px] bg-[var(--bg)] px-5 py-5">
            <div className="text-[22px] font-semibold tracking-[-0.024em] text-[var(--text)]">
              {COMPANY.name}
            </div>
            <div className="mt-3 text-[16px] font-medium leading-[1.32] tracking-[-0.014em] text-[var(--muted)]">
              ИНН: {COMPANY.inn} <span className="px-2">|</span> ОГРН:{' '}
              {COMPANY.ogrn}
            </div>
          </div>
        </div>

        <Link
          href={COMPANY.rusprofile}
          className="inline-flex h-[54px] items-center justify-center rounded-[16px] bg-[var(--accent-1)] px-6 text-[15px] font-semibold lowercase tracking-[-0.016em] text-[var(--accent-1-text)]"
        >
          посмотреть больше данных
        </Link>
      </div>
    </div>
  );
}

function MapAndAddressSection() {
  return (
    <div className="grid grid-cols-[1.08fr_0.72fr] gap-6">
      <div className="rounded-[30px] bg-[var(--surface)] p-4 shadow-[var(--shadow-soft)]">
        <div className="overflow-hidden rounded-[26px] bg-[var(--bg)]">
          <iframe
            src={CONTACTS.mapEmbed}
            width="100%"
            height="460"
            loading="lazy"
            style={{ border: 0, display: 'block' }}
            title="Карта офиса АЛВОРИ"
          />
        </div>
      </div>

      <div className="rounded-[30px] bg-[var(--surface)] px-8 py-8 shadow-[var(--shadow-soft)]">
        <div className="flex items-center gap-3">
          <MapPinned
            size={19}
            strokeWidth={2}
            className="text-[var(--accent-1)]"
          />
          <h2 className="font-heading text-[30px] leading-[0.98] tracking-[-0.03em] text-[var(--text)]">
            Адрес
          </h2>
        </div>

        <div className="mt-6 rounded-[22px] bg-[var(--bg)] px-5 py-5">
          <p className="text-[16px] font-medium leading-[1.38] tracking-[-0.014em] text-[var(--text)]">
            {CONTACTS.address}
          </p>
        </div>

        <div className="mt-6">
          <Link
            href={CONTACTS.mapHref}
            className="inline-flex h-[54px] items-center justify-center rounded-[16px] bg-[var(--accent-1)] px-6 text-[15px] font-semibold lowercase tracking-[-0.016em] text-[var(--accent-1-text)]"
          >
            открыть на карте
          </Link>
        </div>
      </div>
    </div>
  );
}

function DocumentsSection() {
  return (
    <div className="rounded-[30px] bg-[var(--surface)] px-8 py-8 shadow-[var(--shadow-soft)]">
      <div className="flex items-center gap-3">
        <ShieldCheck
          size={19}
          strokeWidth={2}
          className="text-[var(--accent-1)]"
        />
        <h2 className="font-heading text-[30px] leading-[0.98] tracking-[-0.03em] text-[var(--text)]">
          Документация
        </h2>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        {DOCUMENTS.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="group flex items-center justify-between rounded-[22px] bg-[var(--bg)] px-5 py-5 transition hover:translate-y-[-1px]"
          >
            <span className="text-[16px] font-semibold leading-[1.2] tracking-[-0.016em] text-[var(--text)]">
              {item.label}
            </span>
            <ExternalLink
              size={16}
              strokeWidth={2}
              className="text-[var(--muted)] transition group-hover:text-[var(--text)]"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

function ContactLine({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="rounded-[18px] bg-white/6 px-5 py-5">
      <div className="flex items-center gap-3">
        <span className="text-[var(--accent-1)]">{icon}</span>
        <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-white/50">
          {label}
        </span>
      </div>
      <div className="mt-3 text-[18px] font-semibold tracking-[-0.02em] text-white">
        {value}
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}

function Bullet({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-[6px] w-[6px] rounded-full bg-[var(--accent-1)]" />
      <span>{text}</span>
    </div>
  );
}
