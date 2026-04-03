'use client';

import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Container } from '@/components/layout/Container';
import { contacts } from '@/content/contacts';
import { cn } from '@/lib/cn';
import { sitePath } from '@/lib/site-path';

type ThemeMode = 'light' | 'dark';

export function Footer() {
  const [theme, setTheme] = useState<ThemeMode>('light');

  useEffect(() => {
    const root = document.documentElement;

    const syncTheme = () => {
      setTheme(root.dataset.theme === 'dark' ? 'dark' : 'light');
    };

    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] });

    return () => observer.disconnect();
  }, []);

  const isLightTheme = theme === 'light';

  const palette = isLightTheme
    ? {
        bg: '#26292e',
        text: '#f6f6f6',
        muted: 'rgba(246,246,246,0.72)',
        line: 'rgba(246,246,246,0.42)',
        buttonBg: '#f6f6f6',
        buttonText: '#26292e',
        accent: '#fab021',
      }
    : {
        bg: '#f6f6f6',
        text: '#26292e',
        muted: 'rgba(38,41,46,0.64)',
        line: 'rgba(38,41,46,0.34)',
        buttonBg: '#26292e',
        buttonText: '#f6f6f6',
        accent: '#fab021',
      };

  const assets = {
    footerLogo: `${sitePath}/brand/footer/logo.png`,
    footerLogoFallback: `${sitePath}/brand/footer/logo.png`,

    developerLogo:
      theme === 'dark'
        ? `${sitePath}/brand/developer/dark/logo.svg`
        : `${sitePath}/brand/developer/light/logo.svg`,

    maxLogo: isLightTheme
      ? `${sitePath}/brand/messengers/max/light.svg`
      : `${sitePath}/brand/messengers/max/dark.svg`,
    maxLogoFallback: isLightTheme
      ? `${sitePath}/brand/messengers/max/dark.svg`
      : `${sitePath}/brand/messengers/max/light.svg`,

    telegramLogo: isLightTheme
      ? `${sitePath}/brand/messengers/telegram/light.svg`
      : `${sitePath}/brand/messengers/telegram/dark.svg`,
    telegramLogoFallback: isLightTheme
      ? `${sitePath}/brand/messengers/telegram/dark.svg`
      : `${sitePath}/brand/messengers/telegram/light.svg`,

    trucks: [
      isLightTheme
        ? `${sitePath}/brand/trucks/footer/light/truck-1.svg`
        : `${sitePath}/brand/trucks/footer/dark/truck-1.svg`,
      isLightTheme
        ? `${sitePath}/brand/trucks/footer/light/truck-2.svg`
        : `${sitePath}/brand/trucks/footer/dark/truck-2.svg`,
      isLightTheme
        ? `${sitePath}/brand/trucks/footer/light/truck-3.svg`
        : `${sitePath}/brand/trucks/footer/dark/truck-3.svg`,
    ],
  };

  return (
    <footer
      className="relative mt-10 md:mt-14"
      style={
        {
          ['--footer-bg' as string]: palette.bg,
          ['--footer-text' as string]: palette.text,
          ['--footer-muted' as string]: palette.muted,
          ['--footer-line' as string]: palette.line,
          ['--footer-button-bg' as string]: palette.buttonBg,
          ['--footer-button-text' as string]: palette.buttonText,
          ['--footer-accent' as string]: palette.accent,
        } as React.CSSProperties
      }
    >
      <div className="bg-[var(--footer-bg)] text-[var(--footer-text)]">
        <Container className="flex min-h-[500px] flex-col pt-10 pb-5 md:pt-10 md:pb-5">
          <Road trucks={assets.trucks} />

          <div className="mt-10 hidden gap-10 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-start">
            <div className="w-full max-w-[430px] justify-self-start space-y-8">
              <div className="h-[72px] w-[390px] max-w-full">
                <AssetImage
                  src={assets.footerLogo}
                  fallbackSrc={assets.footerLogoFallback}
                  alt="Алвори"
                  className="h-full w-full object-contain object-left"
                />
              </div>

              <div className="space-y-3 text-[17px] leading-[1.25] tracking-[-0.01em] text-[var(--footer-text)]">
                <div>
                  {contacts.company} | ИНН: {contacts.inn}
                </div>
                <div>все права защищены</div>
                <div>© 2021 – 2026</div>
              </div>
            </div>

            <div />

            <div className="w-full max-w-[460px] justify-self-end space-y-8">
              <div className="space-y-5">
                <ContactRow
                  icon={<Phone size={18} strokeWidth={1.9} />}
                  text={contacts.phoneDisplay}
                />
                <ContactRow
                  icon={<Mail size={18} strokeWidth={1.9} />}
                  text={contacts.email}
                />
                <ContactRow
                  icon={<MapPin size={18} strokeWidth={1.9} />}
                  text={contacts.address}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <MessengerButton
                  href={contacts.maxHref}
                  label="написать в max"
                  logoSrc={assets.maxLogo}
                  logoFallbackSrc={assets.maxLogoFallback}
                />

                <MessengerButton
                  href={contacts.telegramHref}
                  label="написать в tg"
                  logoSrc={assets.telegramLogo}
                  logoFallbackSrc={assets.telegramLogoFallback}
                />
              </div>
            </div>
          </div>

          <div className="mt-10 lg:hidden">
            <div className="flex flex-col gap-6">
              <div className="h-[58px] w-[220px] max-w-full">
                <AssetImage
                  src={assets.footerLogo}
                  fallbackSrc={assets.footerLogoFallback}
                  alt="Алвори"
                  className="h-full w-full object-contain object-left"
                />
              </div>

              <div className="space-y-4">
                <ContactRow
                  icon={<Phone size={18} strokeWidth={1.9} />}
                  text={contacts.phoneDisplay}
                  mobile
                />
                <ContactRow
                  icon={<Mail size={18} strokeWidth={1.9} />}
                  text={contacts.email}
                  mobile
                />
                <ContactRow
                  icon={<MapPin size={18} strokeWidth={1.9} />}
                  text={contacts.address}
                  mobile
                />
              </div>

              <div className="grid grid-cols-1 gap-3">
                <MessengerButton
                  href={contacts.maxHref}
                  label="написать в max"
                  logoSrc={assets.maxLogo}
                  logoFallbackSrc={assets.maxLogoFallback}
                  mobile
                />

                <MessengerButton
                  href={contacts.telegramHref}
                  label="написать в tg"
                  logoSrc={assets.telegramLogo}
                  logoFallbackSrc={assets.telegramLogoFallback}
                  mobile
                />
              </div>

              <div className="h-[1px] w-full bg-[var(--footer-line)] opacity-40" />

              <div className="space-y-2 text-left text-[15px] leading-[1.24] tracking-[-0.01em] text-[var(--footer-text)]">
                <div>
                  ООО «АЛВОРИ» | ИНН: 7300045728
                </div>
                <div>все права защищены</div>
                <div>© 2021 – 2026</div>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-6 hidden lg:block">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:gap-8">
              <div className="h-[2px] flex-1 bg-[var(--footer-line)] opacity-40" />

              <div className="grid items-center gap-12 text-[17px] leading-[1.15] tracking-[-0.01em] md:grid-flow-col md:auto-cols-max">
                <div className="flex items-center gap-4 whitespace-nowrap">
                  <div className="flex h-[28px] w-[36px] items-center justify-center">
                    <AssetImage
                      src={assets.developerLogo}
                      alt="Юни"
                      className="h-[20px] w-auto object-contain"
                    />
                  </div>

                  <span className="opacity-40 text-[var(--footer-muted)]">
                    Сайт разработан командой ЮНИ.ai
                  </span>
                </div>

                <span className="whitespace-nowrap opacity-40 text-[var(--footer-muted)]">
                  Telegram: @uni_smb
                </span>

                <span className="whitespace-nowrap opacity-40 text-[var(--footer-muted)]">
                  MAX: +7(995)518-69-42
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 overflow-hidden lg:hidden">
            <div className="relative h-[26px]">
              <div className="footer-marquee absolute left-0 top-0 flex min-w-max items-center gap-4 whitespace-nowrap text-[14px] leading-none tracking-[-0.01em] text-[var(--footer-muted)]">
                <div className="flex items-center gap-3">
                  <div className="flex h-[18px] w-[24px] items-center justify-center">
                    <AssetImage
                      src={assets.developerLogo}
                      alt="Юни"
                      className="h-[14px] w-auto object-contain"
                    />
                  </div>
                  <span>Сайт разработан командой ЮНИ.ai</span>
                </div>

                <span className="opacity-50">|</span>
                <span>Telegram: @uni_smb</span>
                <span className="opacity-50">|</span>
                <span>MAX: +7(995)518-69-42</span>

                <span className="opacity-50">|</span>

                <div className="flex items-center gap-3">
                  <div className="flex h-[18px] w-[24px] items-center justify-center">
                    <AssetImage
                      src={assets.developerLogo}
                      alt="Юни"
                      className="h-[14px] w-auto object-contain"
                    />
                  </div>
                  <span>Сайт разработан командой ЮНИ.ai</span>
                </div>

                <span className="opacity-50">|</span>
                <span>Telegram: @uni_smb</span>
                <span className="opacity-50">|</span>
                <span>MAX: +7(995)518-69-42</span>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <style jsx>{`
        .footer-marquee {
          animation: footerMarquee 20s linear infinite;
        }

        @keyframes footerMarquee {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
      `}</style>
    </footer>
  );
}

function Road({ trucks }: { trucks: string[] }) {
  return (
    <div className="footer-road relative h-[72px]">
      <div className="footer-road-line absolute left-0 right-0 top-[78%] h-[2px] -translate-y-1/2 bg-[var(--footer-line)]" />

      <Truck
        src={trucks[0]}
        alt="Фура 1"
        className="footer-truck footer-truck-1"
      />
      <Truck
        src={trucks[1]}
        alt="Фура 2"
        className="footer-truck footer-truck-2"
      />
      <Truck
        src={trucks[2]}
        alt="Фура 3"
        className="footer-truck footer-truck-3"
      />
    </div>
  );
}

function Truck({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [broken, setBroken] = useState(false);

  useEffect(() => {
    setBroken(false);
  }, [src]);

  return (
    <div className={cn('pointer-events-none absolute', className)}>
      {!broken ? (
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-contain"
          onError={() => setBroken(true)}
        />
      ) : (
        <div className="h-full w-full rounded-[8px] bg-[var(--footer-accent)]/60" />
      )}
    </div>
  );
}

function ContactRow({
  icon,
  text,
  mobile = false,
}: {
  icon: React.ReactNode;
  text: string;
  mobile?: boolean;
}) {
  return (
    <div
      className={cn(
        'flex text-[var(--footer-text)]',
        mobile
          ? 'items-start gap-3 text-[16px] leading-[1.24] tracking-[-0.01em]'
          : 'items-center gap-4 text-[17px] leading-none tracking-[-0.01em]',
      )}
    >
      <span className="inline-flex h-[24px] w-[24px] shrink-0 items-center justify-center text-[var(--footer-accent)]">
        {icon}
      </span>
      <span>{text}</span>
    </div>
  );
}

function MessengerButton({
  href,
  label,
  logoSrc,
  logoFallbackSrc,
  mobile = false,
}: {
  href: string;
  label: string;
  logoSrc: string;
  logoFallbackSrc?: string;
  mobile?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        'header-utility-button inline-flex w-full items-center justify-center gap-3 rounded-[22px] bg-[var(--footer-button-bg)] text-[var(--footer-button-text)]',
        mobile ? 'h-[54px] px-5' : 'h-[56px] px-5',
      )}
    >
      <div className="flex h-[28px] w-[28px] items-center justify-center">
        <AssetImage
          src={logoSrc}
          fallbackSrc={logoFallbackSrc}
          alt=""
          className="h-[22px] w-auto object-contain"
        />
      </div>

      <span
        className={cn(
          'whitespace-nowrap tracking-[-0.01em] text-[var(--footer-button-text)]',
          mobile ? 'text-[16px] leading-none' : 'text-[17px] leading-none',
        )}
      >
        {label}
      </span>
    </Link>
  );
}

function AssetImage({
  src,
  fallbackSrc,
  alt,
  className,
}: {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
}) {
  const [broken, setBroken] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    setBroken(false);
    setCurrentSrc(src);
  }, [src]);

  if (broken && !fallbackSrc) {
    return (
      <div
        className={cn(
          'h-full w-full rounded-[8px] bg-[var(--footer-line)]/30',
          className,
        )}
      />
    );
  }

  return (
    <img
      key={currentSrc}
      src={currentSrc}
      alt={alt}
      onError={() => {
        if (fallbackSrc && currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
          setBroken(false);
          return;
        }

        setBroken(true);
      }}
      className={cn(broken ? 'hidden' : '', className)}
    />
  );
}
