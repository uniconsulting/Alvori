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

type ParallaxView = {
  x: number;
  y: number;
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
    id: 'bottom',
    src: `${sitePath}/autopark/gallery-3.webp`,
    alt: 'Полуприцеп снизу слева',
    className: 'left-[0px] top-[232px] h-[178px] w-[262px] rotate-[-9deg]',
    baseZ: 10,
    delayMs: 360,
  },
  {
    id: 'back',
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

  const currentRef = useRef<ParallaxView>({ x: 0, y: 0 });
  const targetRef = useRef<ParallaxView>({ x: 0, y: 0 });
  const velocityRef = useRef<ParallaxView>({ x: 0, y: 0 });
  const frameRef = useRef<number | null>(null);

  const [view, setView] = useState<ParallaxView>({ x: 0, y: 0 });
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

  useEffect(() => {
    const stiffness = 0.08;
    const damping = 0.84;

    const step = () => {
      const current = currentRef.current;
      const target = targetRef.current;
      const velocity = velocityRef.current;

      (Object.keys(current) as Array<keyof ParallaxView>).forEach((key) => {
        const force = (target[key] - current[key]) * stiffness;
        velocity[key] = (velocity[key] + force) * damping;
        current[key] = current[key] + velocity[key];
      });

      setView({ ...current });
      frameRef.current = requestAnimationFrame(step);
    };

    frameRef.current = requestAnimationFrame(step);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1024) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

targetRef.current = {
  x: (px - 0.5) * 8,
  y: (py - 0.5) * 6,
};
  };

  const handleMouseLeave = () => {
    targetRef.current = { x: 0, y: 0 };
    setActiveId(null);
  };

  return (
    <div
      ref={containerRef}
      className="relative z-[40] h-[504px] overflow-visible"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="relative h-full will-change-transform"
        style={{
          transform: `translate3d(${view.x}px, ${view.y}px, 0)`,
        }}
      >
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
              isRevealed={isRevealed}
              delayMs={item.delayMs}
              baseZ={item.baseZ}
              onEnter={() => setActiveId(item.id)}
            />
          );
        })}
      </div>
    </div>
  );
}

function GalleryCard({
  src,
  alt,
  className,
  isActive,
  isDimmed,
  isRevealed,
  delayMs,
  baseZ,
  onEnter,
}: {
  src: string;
  alt: string;
  className: string;
  isActive: boolean;
  isDimmed: boolean;
  isRevealed: boolean;
  delayMs: number;
  baseZ: number;
  onEnter: () => void;
}) {
  return (
    <div
      className={`group absolute overflow-hidden rounded-[26px] bg-[#26292e] ${className}`}
      onMouseEnter={onEnter}
style={{
  zIndex: isActive ? 80 : baseZ,
  transition:
    'transform 260ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 260ms cubic-bezier(0.22, 1, 0.36, 1), opacity 180ms cubic-bezier(0.22, 1, 0.36, 1), filter 180ms cubic-bezier(0.22, 1, 0.36, 1), border-color 180ms cubic-bezier(0.22, 1, 0.36, 1)',
  transform: isRevealed
    ? isActive
      ? 'translateY(-8px) rotate(0deg) scale(1.035)'
      : 'translateY(0) scale(1)'
    : 'translateY(24px) scale(0.985)',
  opacity: isRevealed ? (isDimmed ? 0.9 : 1) : 0,
  filter: isRevealed
    ? isActive
      ? 'none'
      : isDimmed
        ? 'blur(0.8px) saturate(0.95) brightness(0.97)'
        : 'blur(0.35px)'
    : 'blur(10px)',
  boxShadow: isActive
    ? '0 26px 56px rgba(38,41,46,0.22)'
    : '0 18px 44px rgba(38,41,46,0.14)',
  transitionDelay: isRevealed ? `${delayMs}ms` : '0ms',
}}
    >
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover object-center transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
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
