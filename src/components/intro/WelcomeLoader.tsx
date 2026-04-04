'use client';

import { Cookie } from 'lucide-react';
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

const SEGMENT_COUNT = 16;

function getSegmentFill(index: number, progress: number) {
  const segmentStart = (index / SEGMENT_COUNT) * 100;
  const segmentEnd = ((index + 1) / SEGMENT_COUNT) * 100;

  if (progress >= segmentEnd) return 1;
  if (progress <= segmentStart) return 0;

  return (progress - segmentStart) / (segmentEnd - segmentStart);
}

function ProgressRail({ progress }: { progress: number }) {
  return (
    <div className="w-full">
      <div className="flex items-center gap-[7px]">
        {Array.from({ length: SEGMENT_COUNT }, (_, index) => {
          const fill = getSegmentFill(index, progress);
          const isMajor = index % 4 === 0;

          return (
            <div
              key={index}
              className="relative overflow-hidden rounded-full bg-[rgba(38,41,46,0.08)]"
              style={{
                height: isMajor ? 4 : 3,
                width: isMajor ? 42 : 26,
              }}
            >
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-[#fab021]"
                style={{
                  width: `${fill * 100}%`,
                  boxShadow: fill > 0 ? '0 0 16px rgba(250,176,33,0.22)' : 'none',
                  transition:
                    'width 420ms cubic-bezier(0.22,1,0.36,1), box-shadow 420ms cubic-bezier(0.22,1,0.36,1)',
                }}
              />
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-[13px] font-medium tracking-[-0.02em] text-[rgba(38,41,46,0.48)]">
          {progress}%
        </span>

        <span className="text-[13px] font-medium tracking-[-0.02em] text-[rgba(38,41,46,0.48)]">
          loading
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
  return (
    <div
      className="relative mt-8 w-full"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(14px) scale(0.985)',
        filter: visible ? 'blur(0px)' : 'blur(12px)',
        transition:
          'opacity 850ms cubic-bezier(0.22,1,0.36,1), transform 950ms cubic-bezier(0.22,1,0.36,1), filter 950ms cubic-bezier(0.22,1,0.36,1)',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <div className="absolute inset-0 rounded-[24px] bg-[linear-gradient(135deg,rgba(250,176,33,0.85),rgba(250,176,33,0.28),rgba(250,176,33,0.85))] p-[1px] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] [mask-composite:xor] [-webkit-mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] [-webkit-mask-composite:xor] animate-[introCookieBorder_4.8s_linear_infinite]" />
      <div className="relative overflow-hidden rounded-[24px] border border-[rgba(38,41,46,0.06)] bg-white/92 px-5 py-5 shadow-[0_18px_42px_rgba(38,41,46,0.10)] backdrop-blur-[10px]">
        <div className="flex items-start gap-4">
          <div className="inline-flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[14px] bg-[rgba(38,41,46,0.06)] text-[#26292e]">
            <Cookie size={18} strokeWidth={2} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-[14px] leading-[1.36] tracking-[-0.016em] text-[rgba(38,41,46,0.72)]">
              Продолжая, вы подтверждаете использование файлов cookie.
            </p>

            <button
              type="button"
              onClick={onAccept}
              disabled={!canAccept}
              className="mt-5 inline-flex h-[52px] w-full items-center justify-center rounded-[18px] px-6 text-[15px] font-semibold tracking-[-0.02em] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] disabled:cursor-not-allowed"
              style={{
                background: canAccept ? '#26292e' : 'rgba(38,41,46,0.16)',
                color: canAccept ? '#f6f6f6' : 'rgba(38,41,46,0.42)',
                boxShadow: canAccept ? '0 12px 28px rgba(38,41,46,0.10)' : 'none',
              }}
            >
              Понятно
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes introCookieBorder {
          0% {
            filter: hue-rotate(0deg);
            opacity: 0.9;
          }
          50% {
            filter: hue-rotate(10deg);
            opacity: 1;
          }
          100% {
            filter: hue-rotate(0deg);
            opacity: 0.9;
          }
        }
      `}</style>
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
      <div className="relative z-10 flex w-full max-w-[430px] flex-col items-center px-6">
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
          <ProgressRail progress={progress} />
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
