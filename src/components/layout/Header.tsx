'use client';

import Link from 'next/link';
import { Calculator, FileText, Menu, Moon, Sun, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Container } from '@/components/layout/Container';
import { ThemeLogo } from '@/components/ui/ThemeLogo';
import { contacts } from '@/content/contacts';
import { homeNavigation } from '@/config/anchors';
import { ctaRoutes } from '@/config/routes';
import { cn } from '@/lib/cn';

type ThemeMode = 'light' | 'dark';

function scrollToHeroScene(scene: 'services' | 'about') {
  if (typeof window === 'undefined') return;

  const root = document.getElementById('hero-services-stage');
  if (!root) return;

  const rect = root.getBoundingClientRect();
  const pageTop = window.scrollY + rect.top;
  const maxScrollable = Math.max(root.offsetHeight - window.innerHeight, 0);

  const progress = scene === 'services' ? 0.24 : 0.88;
  const targetY = pageTop + maxScrollable * progress;

  window.scrollTo({
    top: targetY,
    behavior: 'smooth',
  });
}

export function Header() {
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const lastScrollYRef = useRef(0);

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

useEffect(() => {
  const handleScroll = () => {
    const currentY = window.scrollY;
    const delta = currentY - lastScrollYRef.current;

    const isScrollingUp = delta < -2;
    const isScrollingDown = delta > 2;

    const heroStage = document.getElementById('hero-services-stage');
    const whyChooseUs = document.getElementById('why-choose-us');

    if (!heroStage || !whyChooseUs) {
      setIsVisible(true);
      lastScrollYRef.current = currentY;
      return;
    }

    // До первого реального скролла header всегда раскрыт
    if (currentY <= 4) {
      setIsVisible(true);
      lastScrollYRef.current = currentY;
      return;
    }

    const anchorY = currentY + 140;

    const heroTop = heroStage.offsetTop;
    const heroBottom = heroTop + heroStage.offsetHeight;
    const whyTop = whyChooseUs.offsetTop;

    let nextVisible = isVisible;

    // Пока пользователь в hero / scroll-scene — header скрыт
    if (anchorY >= heroTop && anchorY < heroBottom) {
      nextVisible = false;
    }
    // Между концом scroll-scene и секцией "Почему выбирают нас" — тоже скрыт всегда
    else if (anchorY >= heroBottom && anchorY < whyTop) {
      nextVisible = false;
    }
    // После секции "Почему выбирают нас":
    // вверх — показать, вниз — скрыть
    else if (anchorY >= whyTop) {
      if (isScrollingUp) nextVisible = true;
      if (isScrollingDown) nextVisible = false;
    }
    // До начала scroll-scene
    else if (anchorY < heroTop) {
      nextVisible = true;
    }

    setIsVisible(nextVisible);
    lastScrollYRef.current = currentY;
  };

  handleScroll();

  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', handleScroll);

  return () => {
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('resize', handleScroll);
  };
}, [isVisible]);

  const handleThemeToggle = () => {
    const root = document.documentElement;
    const current: ThemeMode = root.dataset.theme === 'dark' ? 'dark' : 'light';
    const next: ThemeMode = current === 'dark' ? 'light' : 'dark';

    root.dataset.theme = next;
    window.localStorage.setItem('theme', next);
    setTheme(next);
  };

  return (
<div
  className={cn(
    'header-shell',
    isVisible ? 'header-shell--visible' : 'header-shell--hidden',
  )}
>
  <div className="header-shell__backdrop" />

  <div className="header-shell__inner">
    <header className="pt-4 md:pt-6 xl:pt-10">
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
              <Link href="/" className="block h-[48px] w-[184px]">
                <ThemeLogo
                  placement="header"
                  className="h-full w-full object-contain object-left"
                />
              </Link>

              <div className="flex h-[60px] items-center gap-[8px] rounded-[24px] bg-[var(--accent-2)] px-[9px]">
                <CompactAction
                  href={ctaRoutes.headerCalculator}
                  variant="accent"
                  ariaLabel="калькулятор"
                  forceIconDark
                >
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
                  {homeNavigation.map((item) => {
                    const isServices = item.href === '#services';
                    const isAbout = item.href === '#about';

                    if (isServices || isAbout) {
                      return (
                        <button
                          key={item.href}
                          type="button"
                          onClick={() => {
                            setMenuOpen(false);
                            scrollToHeroScene(isServices ? 'services' : 'about');
                          }}
                          className="header-link-hover text-left text-[17px] font-medium lowercase leading-none tracking-[-0.01em] text-[var(--text)]"
                        >
                          {item.label}
                        </button>
                      );
                    }

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className="header-link-hover text-[17px] font-medium lowercase leading-none tracking-[-0.01em] text-[var(--text)]"
                      >
                        {item.label}
                      </Link>
                    );
                  })}

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
    </div>
  </div>
);
}

function LogoBlock() {
  return (
    <Link href="/" className="block h-[60px] w-[230px] shrink-0">
      <ThemeLogo
        placement="header"
        className="h-full w-full object-contain object-left"
      />
    </Link>
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
      {homeNavigation.map((item, index) => {
        const isServices = item.href === '#services';
        const isAbout = item.href === '#about';

        return (
          <div key={item.href} className="flex shrink-0 items-center">
            {isServices || isAbout ? (
              <button
                type="button"
                onClick={() => scrollToHeroScene(isServices ? 'services' : 'about')}
                className="header-link-hover text-[17px] font-medium lowercase leading-none tracking-[-0.01em] text-[var(--text)]"
              >
                {item.label}
              </button>
            ) : (
              <Link
                href={item.href}
                className="header-link-hover text-[17px] font-medium lowercase leading-none tracking-[-0.01em] text-[var(--text)]"
              >
                {item.label}
              </Link>
            )}

            {index < homeNavigation.length - 1 ? (
              <span className="mx-[17px] block h-[30px] w-[2px] shrink-0 rounded-full bg-[var(--bg)]" />
            ) : null}
          </div>
        );
      })}
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
      <UtilityLinkButton
        href={ctaRoutes.headerCalculator}
        variant="accent"
        ariaLabel="калькулятор"
        forceIconDark
      >
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
  forceIconDark = false,
}: {
  children: React.ReactNode;
  href: string;
  ariaLabel: string;
  variant: 'accent' | 'neutral';
  theme?: ThemeMode;
  forceIconDark?: boolean;
}) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={cn(
        'header-utility-button inline-flex h-[42px] w-[42px] items-center justify-center rounded-[16px]',
        variant === 'accent'
          ? 'bg-[var(--accent-1)]'
          : theme === 'light'
            ? 'bg-[var(--surface)] text-[var(--text)]'
            : 'bg-[var(--accent-3)] text-[var(--accent-3-text)]',
        forceIconDark ? '!text-[#26292e]' : variant === 'accent' ? 'text-[var(--accent-1-text)]' : '',
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
  forceIconDark = false,
}: {
  children: React.ReactNode;
  href: string;
  ariaLabel: string;
  variant: 'accent' | 'neutral';
  forceIconDark?: boolean;
}) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={cn(
        'header-utility-button inline-flex h-[42px] w-[42px] items-center justify-center rounded-[16px]',
        variant === 'accent'
          ? 'bg-[var(--accent-1)]'
          : 'bg-[var(--surface)] text-[var(--text)]',
        forceIconDark ? '!text-[#26292e]' : variant === 'accent' ? 'text-[var(--accent-1-text)]' : '',
      )}
    >
      {children}
    </Link>
  );
}
