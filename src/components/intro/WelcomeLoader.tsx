'use client';

import { Cookie } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
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

const SEGMENT_PATTERN = [
  'major',
  'minor',
  'minor',
  'minor',
  'major',
  'minor',
  'minor',
  'minor',
  'major',
  'minor',
  'minor',
  'minor',
  'major',
] as const;

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function getSegmentFill(index: number, progress: number) {
  const total = SEGMENT_PATTERN.length;
  const start = (index / total) * 100;
  const end = ((index + 1) / total) * 100;

  if (progress <= start) return 0;
  if (progress >= end) return 1;

  return clamp((progress - start) / (end - start));
}

function ProgressCounter({ progress }: { progress: number }) {
  const [displayed, setDisplayed] = useState(0);
  const displayedRef = useRef(0);

  useEffect(() => {
    let raf = 0;

    const animate = () => {
      const current = displayedRef.current;
      const diff = progress - current;

      if (Math.abs(diff) < 0.08) {
        displayedRef.current = progress;
        setDisplayed(progress);
        return;
      }

      const next = current + diff * 0.09;
      displayedRef.current = next;
      setDisplayed(next);
      raf = window.requestAnimationFrame(animate);
    };

    raf = window.requestAnimationFrame(animate);

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [progress]);

  return (
    <span className="tabular-nums text-[13px] font-medium tracking-[-0.02em] text-[rgba(38,41,46,0.54)]">
      {Math.round(displayed)}%
    </span>
  );
}

function ProgressRail({ progress }: { progress: number }) {
  const activeIndex = Math.min(
    SEGMENT_PATTERN.length - 1,
    Math.floor((progress / 100) * SEGMENT_PATTERN.length),
  );

  return (
    <div className="w-full max-w-[332px]">
      <div className="flex items-center gap-[6px]">
        {SEGMENT_PATTERN.map((type, index) => {
          const fill = getSegmentFill(index, progress);
          const isActive = fill > 0;
          const width = type === 'major' ? 42 : 14;
          const height = type === 'major' ? 4 : 3;

          return (
            <div
              key={index}
              className="intro-progress-segment"
              style={{
                width: `${width}px`,
                height: `${height}px`,
              }}
            >
              <div
                className="intro-progress-segment-fill"
                style={{
                  width: `${fill * 100}%`,
                  opacity: isActive ? 1 : 0,
                }}
              />
              {index === activeIndex && progress > 0 && progress < 100 ? (
                <div
                  className="intro-progress-segment-scan"
                  style={{
                    opacity: 1,
                  }}
                />
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-[13px] font-medium tracking-[-0.02em] text-[rgba(38,41,46,0.54)]">
          загрузка
        </span>
        <ProgressCounter progress={progress} />
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
  const borderThickness = 1;
  const innerRadius = outerRadius - borderThickness;
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
        className="relative bg-[var(--accent-2)] text-[var(--accent-2-text)] shadow-[0_18px_42px_rgba(38,41,46,0.14)]"
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
          style={{
            borderRadius: `${buttonRadius}px`,
          }}
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
            <ProgressRail progress={progress} />
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
