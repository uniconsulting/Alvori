'use client';

import { useEffect, useMemo, useState } from 'react';
import { cn } from '@/lib/cn';
import { sitePath } from '@/lib/site-path';

export function ThemeLogo({
  placement,
  className,
}: {
  placement: 'header' | 'footer';
  className?: string;
}) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [src, setSrc] = useState('');

  const logoMap = useMemo(
    () =>
      ({
        header: {
          light: `${sitePath}/brand/header/light/logo.svg`,
          dark: `${sitePath}/brand/header/dark/logo.svg`,
        },
        footer: {
          light: `${sitePath}/brand/footer/light/logo.svg`,
          dark: `${sitePath}/brand/footer/dark/logo.svg`,
        },
      }) as const,
    [],
  );

  useEffect(() => {
    const root = document.documentElement;

    const syncTheme = () => {
      const nextTheme = root.dataset.theme === 'dark' ? 'dark' : 'light';
      setTheme(nextTheme);
      setSrc(logoMap[placement][nextTheme]);
    };

    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] });

    return () => observer.disconnect();
  }, [logoMap, placement]);

  return (
    <img
      src={src}
      alt="Алвори"
      onError={() => {
        setSrc(logoMap[placement].light);
      }}
      className={cn(
        placement === 'header' ? 'h-6 w-auto' : 'h-7 w-auto',
        className,
      )}
      data-theme={theme}
    />
  );
}
