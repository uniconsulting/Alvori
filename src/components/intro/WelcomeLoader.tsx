'use client';

import { Cookie } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { LoaderLogo } from '@/components/intro/LoaderLogo';

type WelcomeLoaderProps = {
  progress: number;
  canAccept: boolean;
  onAccept: () => void;
  isExiting?: boolean;
  logoSrc: string;
  showLogo?: boolean;
  showProgress?: boolean;
  showCookie?: boolean;
};

const SEGMENTS = [
  { kind: 'major', width: 46 },
  { kind: 'minor', width: 12 },
  { kind: 'minor', width: 12 },
  { kind: 'minor', width: 12 },
  { kind: 'major', width: 46 },
  { kind: 'minor', width: 12 },
  { kind: 'minor', width: 12 },
  { kind: 'minor', width: 12 },
  { kind: 'major', width: 46 },
  { kind: 'minor', width: 12 },
  { kind: 'minor', width: 12 },
  { kind: 'minor', width: 12 },
  { kind: 'major', width: 46 },
] as const;

function clamp(value: number, min = 0, max = 100) {
  return Math.min(max, Math.max(min, value));
}

function useAnimatedProgress(target: number, enabled: boolean) {
  const [animated, setAnimated] = useState(0);
  const animatedRef = useRef(0);

  useEffect(() => {
    if (!enabled) {
      animatedRef.current = 0;
      setAnimated(0);
      return;
    }

    let raf = 0;

    const tick = () => {
      const current = animatedRef.current;
      const safeTarget = clamp(target, 0, 100);
      const diff = safeTarget - current;

      if (Math.abs(diff) < 0.12) {
        animatedRef.current = safeTarget;
        setAnimated(safeTarget);

        if (safeTarget < 100) {
          raf = window.requestAnimationFrame(tick);
        }
        return;
      }

      const next = current + diff * 0.082;
      animatedRef.current = next;
      setAnimated(next);
      raf = window.requestAnimationFrame(tick);
    };

    raf = window.requestAnimationFrame(tick);

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [target, enabled]);

  return animated;
}

function ProgressRail({
  progress,
  visible,
}: {
  progress: number;
  visible: boolean;
}) {
  const animatedProgress = useAnimatedProgress(progress, visible);
  const activeCount = Math.round((animatedProgress / 100) * SEGMENTS.length);

  return (
    <div className="w-full max-w-[332px]">
      <div className="flex w-full items-center justify-between gap-[6px]">
        {SEGMENTS.map((segment, index) => {
          const isActive = index < activeCount;

          return (
            <span
              key={index}
              className="block shrink-0 rounded-full transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                width: `${segment.width}px`,
                height: segment.kind === 'major' ? '4px' : '3px',
                backgroundColor: isActive ? 'var(--accent-1)' : 'var(--accent-2)',
                boxShadow: isActive
                  ? '0 0 10px rgba(250,176,33,0.18)'
                  : 'none',
              }}
            />
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-[13px] font-medium tracking-[-0.02em] text-[rgba(38,41,46,0.54)]">
          загрузка
        </span>

        <span className="tabular-nums text-[13px] font-medium tracking-[-0.02em] text-[rgba(38,41,46,0.54)]">
          {Math.round(animatedProgress)}%
        </span>
      </div>
    </div>
  );
}

function CookieConsentCard({
  visible,
  canAccept,
  onAccept,
}: {
  visible: boolean;
  canAccept: boolean;
  onAccept: () => void;
}) {
  const outerRadius = 24;
  const borderSize = 1;
  const innerRadius = outerRadius - borderSize;
  const innerPadding = 18;
  const buttonRadius = innerRadius - innerPadding;

  return (
    <div
      className="relative mt-8 w-full max-w-[332px]"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(14px) scale(0.985)',
        filter: visible ? 'blur(0px)' : 'blur(12px)',
        transition:
          'opacity 850ms cubic-bezier(0.22,1,0.36,1), transform 950ms cubic-bezier(0.22,1,0.36,1), filter 950ms cubic-bezier(0.22,1,0.36,1)',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <div
        className="intro-cookie-border-mask absolute inset-0"
        style={{ borderRadius: `${outerRadius}px` }}
      />

      <div
        className="relative bg-[var(--accent-2)] text-[var(--accent-2-text)]"
        style={{
          borderRadius: `${innerRadius}px`,
          padding: `${innerPadding}px`,
        }}
      >
        <div className="flex items-start gap-4">
          <Cookie
            size={24}
            strokeWidth={2}
            className="mt-[2px] shrink-0 text-[var(--accent-2-text)]"
          />

          <p className="text-[14px] leading-[1.36] tracking-[-0.016em] text-[var(--accent-2-text)]">
            Продолжая, вы подтверждаете
            <br />
            использование файлов cookie.
          </p>
        </div>

        <button
          type="button"
          onClick={onAccept}
          disabled={!canAccept}
          className="mt-5 inline-flex h-[52px] w-full items-center justify-center bg-[var(--accent-1)] px-6 text-[15px] font-semibold tracking-[-0.02em] text-[#26292e] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] disabled:cursor-not-allowed disabled:opacity-45"
          style={{ borderRadius: `${buttonRadius}px` }}
        >
          Понятно
        </button>
      </div>
    </div>
  );
}

export function WelcomeLoader({
  progress,
  canAccept,
  onAccept,
  isExiting = false,
  logoSrc,
  showLogo = true,
  showProgress = true,
  showCookie = true,
}: WelcomeLoaderProps) {
  return (
    <div
      className="fixed inset-0 z-[200] flex min-h-screen items-center justify-center overflow-hidden"
      style={{
        background: '#f6f6f6',
        opacity: isExiting ? 0 : 1,
        transition: 'opacity 620ms cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      <div className="relative z-10 flex w-full max-w-[520px] flex-col items-center px-6">
        <LoaderLogo
          src={logoSrc}
          isExiting={isExiting}
          isVisible={showLogo}
        />

        <div
          className="mt-10 w-full"
          style={{
            opacity: showProgress ? (isExiting ? 0 : 1) : 0,
            transform: showProgress
              ? isExiting
                ? 'translateY(8px)'
                : 'translateY(0)'
              : 'translateY(14px)',
            filter: showProgress ? (isExiting ? 'blur(6px)' : 'blur(0px)') : 'blur(12px)',
            transition:
              'opacity 850ms cubic-bezier(0.22,1,0.36,1), transform 950ms cubic-bezier(0.22,1,0.36,1), filter 950ms cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          <div className="flex justify-center">
            <ProgressRail progress={progress} visible={showProgress} />
          </div>
        </div>

        <CookieConsentCard
          visible={showCookie}
          canAccept={canAccept}
          onAccept={onAccept}
        />
      </div>
    </div>
  );
}
