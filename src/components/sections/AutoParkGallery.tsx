'use client';

import { useMemo, useState } from 'react';
import { sitePath } from '@/lib/site-path';

type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  className: string;
  baseZ: number;
};

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'main',
    src: `${sitePath}/autopark/gallery-1.webp`,
    alt: 'Тягач в парке',
    className:
      'left-[92px] top-[92px] h-[286px] w-[428px] rotate-[-3deg]',
    baseZ: 30,
  },
  {
    id: 'top',
    src: `${sitePath}/autopark/gallery-2.webp`,
    alt: 'Грузовой состав сверху справа',
    className:
      'left-[286px] top-[20px] h-[188px] w-[282px] rotate-[8deg]',
    baseZ: 20,
  },
  {
    id: 'bottom',
    src: `${sitePath}/autopark/gallery-3.webp`,
    alt: 'Полуприцеп снизу слева',
    className:
      'left-[24px] top-[232px] h-[178px] w-[262px] rotate-[-9deg]',
    baseZ: 10,
  },
  {
    id: 'back',
    src: `${sitePath}/autopark/gallery-4.webp`,
    alt: 'Логистика и парк на заднем плане',
    className:
      'left-[336px] top-[232px] h-[154px] w-[224px] rotate-[10deg]',
    baseZ: 0,
  },
];

export function AutoParkGallery() {
  const [activeId, setActiveId] = useState<string | null>(null);

  const items = useMemo(() => GALLERY_ITEMS, []);

  return (
    <div className="relative h-[504px] overflow-visible">
      {items.map((item) => {
        const isActive = activeId === item.id;
        const isDimmed = activeId !== null && activeId !== item.id;

        return (
          <GalleryCard
            key={item.id}
            src={item.src}
            alt={item.alt}
            className={item.className}
            isActive={isActive}
            isDimmed={isDimmed}
            baseZ={item.baseZ}
            onEnter={() => setActiveId(item.id)}
            onLeave={() => setActiveId(null)}
          />
        );
      })}
    </div>
  );
}

function GalleryCard({
  src,
  alt,
  className,
  isActive,
  isDimmed,
  baseZ,
  onEnter,
  onLeave,
}: {
  src: string;
  alt: string;
  className: string;
  isActive: boolean;
  isDimmed: boolean;
  baseZ: number;
  onEnter: () => void;
  onLeave: () => void;
}) {
  return (
    <div
      className={`group absolute overflow-hidden rounded-[26px] bg-[#26292e] ${className}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        zIndex: isActive ? 80 : baseZ,
        transition:
          'transform 320ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 320ms cubic-bezier(0.22, 1, 0.36, 1), opacity 260ms cubic-bezier(0.22, 1, 0.36, 1), filter 260ms cubic-bezier(0.22, 1, 0.36, 1)',
        transform: isActive
          ? 'translateY(-8px) rotate(0deg) scale(1.035)'
          : undefined,
        opacity: isDimmed ? 0.92 : 1,
        filter: isDimmed ? 'saturate(0.94) brightness(0.96)' : 'none',
        boxShadow: isActive
          ? '0 26px 56px rgba(38,41,46,0.22)'
          : '0 18px 44px rgba(38,41,46,0.14)',
      }}
    >
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover object-center transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
        loading="lazy"
      />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(38,41,46,0.06)_0%,rgba(38,41,46,0.14)_52%,rgba(38,41,46,0.30)_100%)]" />
      <div className="pointer-events-none absolute inset-0 rounded-[26px] border border-white/18" />
      <div className="pointer-events-none absolute inset-0 rounded-[26px] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]" />
    </div>
  );
}
