'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { sitePath } from '@/lib/site-path';

type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  className: string;
  baseZ: number;
  delayMs: number;
};

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'main',
    src: `${sitePath}/autopark/gallery-1.webp`,
    alt: 'Тягач в парке',
    className: 'left-[64px] top-[92px] h-[286px] w-[428px] rotate-[-3deg]',
    baseZ: 30,
    delayMs: 120,
  },
  {
    id: 'top',
    src: `${sitePath}/autopark/gallery-2.webp`,
    alt: 'Грузовой состав сверху справа',
    className: 'left-[258px] top-[20px] h-[188px] w-[282px] rotate-[8deg]',
    baseZ: 20,
    delayMs: 240,
  },
  {
    id: 'left',
    src: `${sitePath}/autopark/gallery-3.webp`,
    alt: 'Полуприцеп снизу слева',
    className: 'left-[0px] top-[232px] h-[178px] w-[262px] rotate-[-9deg]',
    baseZ: 10,
    delayMs: 360,
  },
  {
    id: 'right',
    src: `${sitePath}/autopark/gallery-4.webp`,
    alt: 'Логистика и парк на заднем плане',
    className: 'left-[308px] top-[232px] h-[154px] w-[224px] rotate-[10deg]',
    baseZ: 0,
    delayMs: 480,
  },
];

export function AutoParkGallery() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  const items = useMemo(() => GALLERY_ITEMS, []);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
        }
      },
      {
        threshold: 0.18,
        rootMargin: '120px 0px 120px 0px',
      },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const handleMouseLeave = () => {
    setActiveId(null);
  };

  return (
    <div
      ref={containerRef}
      className="relative z-[40] h-[504px] overflow-visible"
      onMouseLeave={handleMouseLeave}
    >
      {items.map((item) => {
        const isActive = activeId === item.id;
        const isBlurred = activeId !== null && activeId !== item.id;

        return (
          <GalleryCard
            key={item.id}
            id={item.id}
            src={item.src}
            alt={item.alt}
            className={item.className}
            isActive={isActive}
            isBlurred={isBlurred}
            isRevealed={isRevealed}
            delayMs={item.delayMs}
            baseZ={item.baseZ}
            onEnter={() => setActiveId(item.id)}
          />
        );
      })}
    </div>
  );
}

function GalleryCard({
  id,
  src,
  alt,
  className,
  isActive,
  isBlurred,
  isRevealed,
  delayMs,
  baseZ,
  onEnter,
}: {
  id: string;
  src: string;
  alt: string;
  className: string;
  isActive: boolean;
  isBlurred: boolean;
  isRevealed: boolean;
  delayMs: number;
  baseZ: number;
  onEnter: () => void;
}) {
  const hoverTransform = getHoverTransform(id);

  return (
    <div
      className={`group absolute overflow-hidden rounded-[26px] bg-[#26292e] ${className}`}
      onMouseEnter={onEnter}
      style={{
        zIndex: isActive ? 80 : baseZ,
        transition:
          'transform 220ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 220ms cubic-bezier(0.22, 1, 0.36, 1), filter 110ms cubic-bezier(0.22, 1, 0.36, 1), border-color 140ms cubic-bezier(0.22, 1, 0.36, 1), opacity 220ms cubic-bezier(0.22, 1, 0.36, 1)',
        transform: isRevealed
          ? isActive
            ? hoverTransform
            : 'translate3d(0,0,0) scale(1)'
          : 'translateY(18px) scale(0.99)',
        opacity: isRevealed ? 1 : 0,
        filter: isRevealed
          ? isActive
            ? 'blur(0px) saturate(1) brightness(1)'
            : isBlurred
              ? 'blur(0.9px)'
              : 'blur(0px)'
          : 'blur(8px)',
        boxShadow: isActive
          ? '0 24px 48px rgba(38,41,46,0.2)'
          : '0 18px 44px rgba(38,41,46,0.14)',
        transitionDelay: isRevealed ? `${delayMs}ms` : '0ms',
      }}
    >
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover object-center transition-transform duration-180 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
        loading="lazy"
      />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(38,41,46,0.06)_0%,rgba(38,41,46,0.14)_52%,rgba(38,41,46,0.30)_100%)]" />
      <div
        className={`pointer-events-none absolute inset-0 rounded-[26px] ${
          isActive ? 'border border-white/30' : 'border border-white/22'
        }`}
      />
      <div className="pointer-events-none absolute inset-0 rounded-[26px] shadow-[inset_0_1px_0_rgba(255,255,255,0.07)]" />
    </div>
  );
}

function getHoverTransform(id: string) {
  switch (id) {
    case 'main':
      return 'translate3d(0,-6px,0) rotate(0deg) scale(1.028)';
    case 'left':
      return 'translate3d(-28px,0,0) rotate(-4deg) scale(1.022)';
    case 'top':
      return 'translate3d(-22px,-18px,0) rotate(3deg) scale(1.022)';
    case 'right':
      return 'translate3d(0,20px,0) rotate(4deg) scale(1.022)';
    default:
      return 'translate3d(0,0,0) scale(1)';
  }
}
