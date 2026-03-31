'use client';

import Link from 'next/link';
import { Calculator, FileText, Menu, Moon, Sun, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Container } from '@/components/layout/Container';
import { ThemeLogo } from '@/components/ui/ThemeLogo';
import { contacts } from '@/content/contacts';
import { homeNavigation } from '@/config/anchors';
import { ctaRoutes } from '@/config/routes';
import { cn } from '@/lib/cn';

type ThemeMode = 'light' | 'dark';

export function Header() {
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const current = root.dataset.theme === 'dark' ? 'dark' : 'light';
    setTheme(current);

    const observer = new MutationObserver(() => {
      setTheme(root.dataset.theme === 'dark' ? 'dark' : 'light');
    });

    observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] });

    return () => observer.disconnect();
  }, []);

  const handleThemeToggle = () => {
    const root = document.documentElement;
    const current: ThemeMode = root.dataset.theme === 'dark' ? 'dark' : 'light';
    const next: ThemeMode = current === 'dark' ? 'light' : 'dark';

    root.dataset.theme = next;
    window.localStorage.setItem('theme', next);
    setTheme(next);
  };

  return (
    <header className="relative z-30 pt-4 md:pt-6 xl:pt-10">
      <Container>
        <div className="hidden items-center xl:flex">
          <LogoBlock />
          <OuterDivider className="ml-[36px]" />
          <AnchorNav className="ml-[36px]" />
          <OuterDivider className="ml-[36px]" />
          <PhoneBlock className="ml-[36px]" />
          <UtilityCluster
            className="ml-[36px]"
            theme={theme}
            onToggleTheme={handleThemeToggle}
          />
        </div>

        <div className="xl:hidden">
          <div className="flex items-center justify-between">
            <div className="h-[48px] w-[184px]">
              <ThemeLogo
                placement="header"
                className="h-full w-full object-contain object-left"
              />
            </div>

            <div className="flex h-[60px] items-center gap-[8px] rounded-[24px] bg-[var(--accent-2)] px-[9px]">
              <CompactAction href={ctaRoutes.headerCalculator} variant="accent" ariaLabel="калькулятор">
                <Calculator size={20} strokeWidth={1.8} />
              </CompactAction>

              <button
                type="button"
                onClick={handleThemeToggle}
                aria-label="сменить тему"
                className={cn(
                  'header-utility-button header-theme-button group inline-flex h-[42px] w-[42px] items-center justify-center rounded-[16px]',
                  theme === 'light'
                    ? 'bg-[var(--surface)] text-[var(--text)]'
                    : 'bg-[var(--accent-3)] text-[var(--accent-3-text)]',
                )}
              >
                {theme === 'light' ? (
                  <Moon size={20} strokeWidth={1.8} className="header-theme-icon" />
                ) : (
                  <Sun size={20} strokeWidth={1.8} className="header-theme-icon" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setMenuOpen((prev) => !prev)}
                aria-label={menuOpen ? 'закрыть меню' : 'открыть меню'}
                className={cn(
                  'header-utility-button group inline-flex h-[42px] w-[42px] items-center justify-center rounded-[16px]',
                  theme === 'light'
                    ? 'bg-[var(--surface)] text-[var(--text)]'
                    : 'bg-[var(--accent-3)] text-[var(--accent-3-text)]',
                )}
              >
                {menuOpen ? <X size={20} strokeWidth={1.8} /> : <Menu size={20} strokeWidth={1.8} />}
              </button>
            </div>
          </div>

          {menuOpen ? (
            <div className="mt-4 rounded-[28px] bg-[var(--surface)] p-5 shadow-[0_8px_20px_rgba(38,41,46,0.05)]">
              <div className="flex flex-col gap-4">
                {homeNavigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="header-link-hover text-[17px] font-medium lowercase leading-none tracking-[-0.01em] text-[var(--text)]"
                  >
                    {item.label}
                  </Link>
                ))}

                <div className="h-[2px] w-full rounded-full bg-[var(--bg)]" />

                <a
                  href={contacts.phoneHref}
                  className="header-phone-hover text-[17px] font-semibold lowercase leading-none tracking-[-0.02em] text-[var(--text)]"
                >
                  {contacts.phoneDisplay}
                </a>

                <Link
                  href={ctaRoutes.headerCalculator}
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex h-[48px] items-center justify-center rounded-[20px] bg-[var(--accent-1)] px-4 text-[15px] font-medium lowercase text-[var(--accent-1-text)] transition hover:opacity-90"
                >
                  рассчитать стоимость
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      </Container>
    </header>
  );
}

function LogoBlock() {
  return (
    <div className="h-[60px] w-[230px] shrink-0">
      <ThemeLogo
        placement="header"
        className="h-full w-full object-contain object-left"
      />
    </div>
  );
}

function OuterDivider({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'block h-[50px] w-[2px] shrink-0 rounded-full bg-[var(--accent-2)]',
        className,
      )}
    />
  );
}

function AnchorNav({ className }: { className?: string }) {
  return (
    <nav
      className={cn(
        'flex h-[60px] shrink-0 items-center rounded-[24px] bg-[var(--surface)] px-[24px] shadow-[0_4px_12px_rgba(38,41,46,0.025)]',
        className,
      )}
    >
      {homeNavigation.map((item, index) => (
        <div key={item.href} className="flex shrink-0 items-center">
          <Link
            href={item.href}
            className="header-link-hover text-[17px] font-medium lowercase leading-none tracking-[-0.01em] text-[var(--text)]"
          >
            {item.label}
          </Link>

          {index < homeNavigation.length - 1 ? (
            <span className="mx-[16px] block h-[30px] w-[2px] shrink-0 rounded-full bg-[var(--bg)]" />
          ) : null}
        </div>
      ))}
    </nav>
  );
}

function PhoneBlock({ className }: { className?: string }) {
  return (
    <a
      href={contacts.phoneHref}
      className={cn(
        'header-phone-hover shrink-0 text-[18px] font-semibold leading-none tracking-[-0.02em] text-[var(--text)]',
        className,
      )}
    >
      {contacts.phoneDisplay}
    </a>
  );
}

function UtilityCluster({
  className,
  theme,
  onToggleTheme,
}: {
  className?: string;
  theme: ThemeMode;
  onToggleTheme: () => void;
}) {
  return (
    <div
      className={cn(
        'flex h-[60px] w-[158px] shrink-0 items-center gap-[8px] rounded-[24px] bg-[var(--accent-2)] px-[9px]',
        className,
      )}
    >
      <UtilityLinkButton href={ctaRoutes.headerCalculator} variant="accent" ariaLabel="калькулятор">
        <Calculator size={22} strokeWidth={1.8} />
      </UtilityLinkButton>

      <UtilityLinkButton
        href={ctaRoutes.headerRequest}
        variant="neutral"
        ariaLabel="запрос кп"
        theme={theme}
      >
        <FileText size={22} strokeWidth={1.8} />
      </UtilityLinkButton>

      <button
        type="button"
        onClick={onToggleTheme}
        aria-label="смена темы"
        className={cn(
          'header-utility-button header-theme-button group inline-flex h-[42px] w-[42px] items-center justify-center rounded-[16px]',
          theme === 'light'
            ? 'bg-[var(--surface)] text-[var(--text)]'
            : 'bg-[var(--accent-3)] text-[var(--accent-3-text)]',
        )}
      >
        {theme === 'light' ? (
          <Moon size={22} strokeWidth={1.8} className="header-theme-icon" />
        ) : (
          <Sun size={22} strokeWidth={1.8} className="header-theme-icon" />
        )}
      </button>
    </div>
  );
}

function UtilityLinkButton({
  children,
  href,
  ariaLabel,
  variant,
  theme = 'light',
}: {
  children: React.ReactNode;
  href: string;
  ariaLabel: string;
  variant: 'accent' | 'neutral';
  theme?: ThemeMode;
}) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={cn(
        'header-utility-button inline-flex h-[42px] w-[42px] items-center justify-center rounded-[16px]',
        variant === 'accent'
          ? 'bg-[var(--accent-1)] text-[var(--accent-1-text)]'
          : theme === 'light'
            ? 'bg-[var(--surface)] text-[var(--text)]'
            : 'bg-[var(--accent-3)] text-[var(--accent-3-text)]',
      )}
    >
      {children}
    </Link>
  );
}

function CompactAction({
  children,
  href,
  ariaLabel,
  variant,
}: {
  children: React.ReactNode;
  href: string;
  ariaLabel: string;
  variant: 'accent' | 'neutral';
}) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={cn(
        'header-utility-button inline-flex h-[42px] w-[42px] items-center justify-center rounded-[16px]',
        variant === 'accent'
          ? 'bg-[var(--accent-1)] text-[var(--accent-1-text)]'
          : 'bg-[var(--surface)] text-[var(--text)]',
      )}
    >
      {children}
    </Link>
  );
}

