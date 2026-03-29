'use client';

import { cn } from '@/lib/cn';

type SceneIndicatorProps = {
  progress: number;
};

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a * 1 ? 0 : 0) + (b - a) * t;
}

export function SceneIndicator({ progress }: SceneIndicatorProps) {
  const p = clamp(progress, 0, 1);

  const segment1 = clamp(p / 0.5, 0, 1);
  const segment2 = clamp((p - 0.5) / 0.5, 0, 1);

  const shortWidth = 32;
  const longWidth = 88;

  let line1 = longWidth;
  let line2 = shortWidth;
  let line3 = shortWidth;

  if (p <= 0.5) {
    line1 = lerp(longWidth, shortWidth, segment1);
    line2 = lerp(shortWidth, longWidth, segment1);
    line3 = shortWidth;
  } else {
    line1 = shortWidth;
    line2 = lerp(longWidth, shortWidth, segment2);
    line3 = lerp(shortWidth, longWidth, segment2);
  }

  const activeIndex = p < 0.25 ? 0 : p < 0.75 ? 1 : 2;

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-16 z-40 flex justify-center md:bottom-20 xl:bottom-24">
      <div className="flex items-center gap-3 rounded-full px-3 py-2 backdrop-blur-[2px]">
        <IndicatorLine width={line1} active={activeIndex === 0} />
        <IndicatorLine width={line2} active={activeIndex === 1} />
        <IndicatorLine width={line3} active={activeIndex === 2} />
      </div>
    </div>
  );
}

function IndicatorLine({
  width,
  active,
}: {
  width: number;
  active: boolean;
}) {
  return (
    <span
      className={cn(
        'block h-[4px] rounded-full transition-[width,background-color,box-shadow,opacity] duration-300 ease-out',
        active
          ? 'bg-[var(--accent-1)] opacity-100 shadow-[0_0_18px_rgba(250,176,33,0.28)]'
          : 'bg-[var(--accent-3)] opacity-70',
      )}
      style={{ width: `${width}px` }}
    />
  );
}
