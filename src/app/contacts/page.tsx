import Link from 'next/link';
import {
  ArrowLeft,
  ExternalLink,
  Mail,
  MapPinned,
  Phone,
  ShieldCheck,
  Building2,
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
          </Container>
        </section>

        <section className="pb-8 pt-0 md:pb-10 xl:pb-10">
          <Container>
            <div className="px-[10px] md:px-[14px] xl:px-[16px]">
              <div className="rounded-[32px] bg-[#26292e] px-6 py-6 text-white shadow-[0_24px_48px_rgba(0,0,0,0.12)]">
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
                      icon={<Building2 size={17} strokeWidth={2} />}
                      label="код ati.su"
                      value={CONTACTS.atiCode}
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
            </div>
          </Container>
        </section>

        <section className="pb-8 pt-0 md:pb-10 xl:pb-10">
          <Container>
            <div className="px-[10px] md:px-[14px] xl:px-[16px]">
              <div className="rounded-[30px] bg-[var(--surface)] px-6 py-6 shadow-[var(--shadow-soft)]">
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
            </div>
          </Container>
        </section>

        <section className="pb-8 pt-0 md:pb-10 xl:pb-10">
          <Container>
            <div className="px-[10px] md:px-[14px] xl:px-[16px]">
              <div className="rounded-[30px] bg-[var(--surface)] p-4 shadow-[var(--shadow-soft)]">
                <div className="relative overflow-hidden rounded-[22px]">
                  <iframe
                    src={CONTACTS.mapEmbed}
                    width="100%"
                    height="480"
                    loading="lazy"
                    style={{ border: 0, display: 'block' }}
                    title="Карта офиса АЛВОРИ"
                  />

                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(38,41,46,0.28)_0%,rgba(38,41,46,0.1)_28%,rgba(38,41,46,0.08)_100%)]" />

                  <div className="absolute left-5 top-5 max-w-[420px] rounded-[18px] bg-[rgba(38,41,46,0.78)] px-5 py-4 text-white shadow-[0_18px_36px_rgba(0,0,0,0.22)] backdrop-blur-[10px]">
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

                    <p className="mt-3 text-[15px] leading-[1.38] tracking-[-0.014em] text-white">
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
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  stretch?: boolean;
}) {
  const content = (
    <div className={`rounded-[20px] bg-white/6 px-5 py-5 ${stretch ? 'h-full' : ''}`}>
      <div className="flex items-center gap-3">
        <span className="text-[var(--accent-1)]">{icon}</span>
        <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-white/50">
          {label}
        </span>
      </div>

      <div className="mt-3 text-[26px] font-semibold tracking-[-0.03em] text-white">
        {value}
      </div>
    </div>
  );

  if (href) return <Link href={href}>{content}</Link>;
  return content;
}
