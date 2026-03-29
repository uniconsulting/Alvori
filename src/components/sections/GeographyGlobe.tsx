'use client';

import createGlobe from 'cobe';
import { Minus, Plus } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { GEO_CITIES, GEO_ROUTES } from '@/components/sections/geography-data';

type LabelPosition = {
  x: number;
  y: number;
  visible: boolean;
};

function rgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '');
  const normalized =
    clean.length === 3 ? clean.split('').map((char) => char + char).join('') : clean;

  const r = parseInt(normalized.slice(0, 2), 16) / 255;
  const g = parseInt(normalized.slice(2, 4), 16) / 255;
  const b = parseInt(normalized.slice(4, 6), 16) / 255;

  return [r, g, b];
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

const ZOOM_STEPS = [0.78, 0.84, 0.9, 0.96, 1.02, 1.08, 1.14, 1.2, 1.26, 1.32];
const SCALE_MARKS = Array.from({ length: 16 }, (_, index) => index);
const DISPLAY_SIZE = 540;

function projectLocation(
  location: [number, number],
  phi: number,
  theta: number,
  scale: number,
): LabelPosition {
  const [lat, lon] = location;
  const latRad = (lat * Math.PI) / 180;
  const lonRad = (lon * Math.PI) / 180;

  const x = Math.cos(latRad) * Math.sin(lonRad);
  const y = Math.sin(latRad);
  const z = Math.cos(latRad) * Math.cos(lonRad);

  const cosPhi = Math.cos(phi);
  const sinPhi = Math.sin(phi);
  const x1 = x * cosPhi - z * sinPhi;
  const z1 = x * sinPhi + z * cosPhi;

  const cosTheta = Math.cos(theta);
  const sinTheta = Math.sin(theta);
  const y2 = y * cosTheta - z1 * sinTheta;
  const z2 = y * sinTheta + z1 * cosTheta;

  const radius = DISPLAY_SIZE * 0.315 * scale;
  const centerX = DISPLAY_SIZE / 2;
  const centerY = DISPLAY_SIZE / 2 - 10;

  return {
    x: centerX + x1 * radius,
    y: centerY - y2 * radius,
    visible: z2 > 0,
  };
}

export function GeographyGlobe({
  activeRouteIndex,
}: {
  activeRouteIndex: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const phiRef = useRef(0.35);
  const thetaRef = useRef(0.24);
  const scaleRef = useRef(1.02);

  const dragStartRef = useRef<{
    x: number;
    y: number;
    phi: number;
    theta: number;
  } | null>(null);

  const [isDark, setIsDark] = useState(false);
  const [zoomIndex, setZoomIndex] = useState(4);
  const [labelPositions, setLabelPositions] = useState<Record<string, LabelPosition>>({});

  useEffect(() => {
    const root = document.documentElement;

    const updateTheme = () => {
      const darkByClass = root.classList.contains('dark');
      const darkByAttr =
        root.getAttribute('data-theme') === 'dark' ||
        document.body.getAttribute('data-theme') === 'dark';

      setIsDark(darkByClass || darkByAttr);
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(root, {
      attributes: true,
      attributeFilter: ['class', 'data-theme'],
    });
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class', 'data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    scaleRef.current = ZOOM_STEPS[zoomIndex];
  }, [zoomIndex]);

  const activeRoute = GEO_ROUTES[activeRouteIndex];

  const cityMap = useMemo(
    () => new Map(GEO_CITIES.map((city) => [city.id, city])),
    [],
  );

  const activeCities = useMemo(
    () => [
      cityMap.get(activeRoute.from)!,
      cityMap.get(activeRoute.to)!,
    ],
    [activeRoute, cityMap],
  );

  const markers = useMemo(
    () =>
      activeCities.map((city) => ({
        location: city.location,
        size: 0.022,
        id: city.id,
      })),
    [activeCities],
  );

  const activeArc = useMemo(
    () => [
      {
        from: cityMap.get(activeRoute.from)!.location,
        to: cityMap.get(activeRoute.to)!.location,
        color: rgb('#fab021'),
      },
    ],
    [activeRoute, cityMap],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let frame = 0;

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: 720 * 2,
      height: 720 * 2,
      phi: phiRef.current,
      theta: thetaRef.current,
      dark: isDark ? 1 : 0,
      diffuse: isDark ? 1.18 : 1.34,
      mapSamples: 24000,
      mapBrightness: isDark ? 3.4 : 4.8,
      mapBaseBrightness: isDark ? 0.0 : 0.0,
      baseColor: isDark ? rgb('#1f2227') : rgb('#eef1f5'),
      glowColor: isDark ? rgb('#1f2227') : rgb('#ffffff'),
      markerColor: rgb('#ffffff'),
      arcColor: rgb('#fab021'),
      arcWidth: 1.2,
      arcHeight: 0.14,
      markerElevation: 0.04,
      scale: scaleRef.current,
      offset: [0, -10],
      markers,
      arcs: activeArc,
    });

    const animate = () => {
      if (!dragStartRef.current) {
        phiRef.current += 0.0022;
      }

      globe.update({
        phi: phiRef.current,
        theta: thetaRef.current,
        scale: scaleRef.current,
        dark: isDark ? 1 : 0,
        diffuse: isDark ? 1.18 : 1.34,
        mapBrightness: isDark ? 3.4 : 4.8,
        mapBaseBrightness: isDark ? 0.0 : 0.0,
        baseColor: isDark ? rgb('#1f2227') : rgb('#eef1f5'),
        glowColor: isDark ? rgb('#1f2227') : rgb('#ffffff'),
        markerColor: rgb('#ffffff'),
        markers,
        arcs: activeArc,
      });

      const nextPositions: Record<string, LabelPosition> = {};
      for (const city of activeCities) {
        nextPositions[city.id] = projectLocation(
          city.location,
          phiRef.current,
          thetaRef.current,
          scaleRef.current,
        );
      }
      setLabelPositions(nextPositions);

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      globe.destroy();
    };
  }, [markers, activeArc, isDark, activeCities]);

  const startDrag = (clientX: number, clientY: number) => {
    dragStartRef.current = {
      x: clientX,
      y: clientY,
      phi: phiRef.current,
      theta: thetaRef.current,
    };

    if (canvasRef.current) {
      canvasRef.current.style.cursor = 'grabbing';
    }
  };

  const moveDrag = (clientX: number, clientY: number) => {
    const start = dragStartRef.current;
    if (!start) return;

    const deltaX = clientX - start.x;
    const deltaY = clientY - start.y;

    phiRef.current = start.phi - deltaX / 220;
    thetaRef.current = clamp(start.theta + deltaY / 260, -0.55, 0.55);
  };

  const endDrag = () => {
    dragStartRef.current = null;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = 'grab';
    }
  };

  const changeZoom = (nextIndex: number) => {
    setZoomIndex(clamp(nextIndex, 0, ZOOM_STEPS.length - 1));
  };

  const handleWheel = (event: React.WheelEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    if (event.deltaY > 0) {
      changeZoom(zoomIndex + 1);
    } else {
      changeZoom(zoomIndex - 1);
    }
  };

  const isMajorMark = (index: number) => index % 5 === 0;
  const activeMarkIndex = 15 - Math.round((zoomIndex / (ZOOM_STEPS.length - 1)) * 15);

  return (
    <div className="flex h-full flex-col items-center justify-start">
      <div className="relative flex h-[560px] w-full items-start justify-center">
        <canvas
          ref={canvasRef}
          className="h-[540px] w-[540px] max-w-full cursor-grab"
          style={{ aspectRatio: '1 / 1' }}
          onMouseDown={(event) => startDrag(event.clientX, event.clientY)}
          onMouseMove={(event) => moveDrag(event.clientX, event.clientY)}
          onMouseUp={endDrag}
          onMouseLeave={endDrag}
          onTouchStart={(event) => {
            if (event.touches[0]) {
              startDrag(event.touches[0].clientX, event.touches[0].clientY);
            }
          }}
          onTouchMove={(event) => {
            if (event.touches[0]) {
              moveDrag(event.touches[0].clientX, event.touches[0].clientY);
            }
          }}
          onTouchEnd={endDrag}
          onWheel={handleWheel}
        />

        {activeCities.map((city) => {
          const pos = labelPositions[city.id];
          if (!pos) return null;

          return (
            <div
              key={city.id}
              className="pointer-events-none absolute transition-[opacity,transform] duration-300"
              style={{
                left: `${pos.x}px`,
                top: `${pos.y}px`,
                opacity: pos.visible ? 1 : 0,
                transform: 'translate(-50%, -130%)',
              }}
            >
              <div className="rounded-[10px] bg-[rgba(38,41,46,0.78)] px-2.5 py-1 text-[12px] font-medium tracking-[-0.01em] text-white backdrop-blur-md">
                {city.label}
              </div>
            </div>
          );
        })}

        <div className="absolute right-0 top-1/2 flex -translate-y-1/2 flex-col items-center gap-3">
          <button
            type="button"
            onClick={() => changeZoom(zoomIndex + 1)}
            className={`
              inline-flex h-8 w-8 items-center justify-center rounded-full shadow-[0_8px_20px_rgba(38,41,46,0.06)]
              ${isDark ? 'bg-[rgba(255,255,255,0.06)] text-white' : 'bg-[var(--surface)] text-[var(--text)]'}
            `}
            aria-label="увеличить"
          >
            <Plus size={14} />
          </button>

          <div className="flex h-[360px] flex-col items-center justify-between py-1">
            {SCALE_MARKS.map((markIndex) => {
              const major = isMajorMark(markIndex);
              const isActive = markIndex === activeMarkIndex;

              return (
                <button
                  key={markIndex}
                  type="button"
                  onClick={() => {
                    const normalized = 1 - markIndex / 15;
                    const snapped = Math.round(normalized * (ZOOM_STEPS.length - 1));
                    changeZoom(snapped);
                  }}
                  className="flex h-[20px] items-center justify-center"
                  aria-label={`шаг масштаба ${markIndex + 1}`}
                >
                  <span
                    className={`
                      block rounded-full transition-all duration-300
                      ${major ? 'h-[3px] w-[34px]' : 'h-[2px] w-[18px]'}
                      ${
                        isActive
                          ? 'bg-[var(--accent-1)]'
                          : major
                            ? isDark
                              ? 'bg-white/72'
                              : 'bg-[rgba(38,41,46,0.72)]'
                            : isDark
                              ? 'bg-white/18'
                              : 'bg-[rgba(38,41,46,0.16)]'
                      }
                    `}
                  />
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => changeZoom(zoomIndex - 1)}
            className={`
              inline-flex h-8 w-8 items-center justify-center rounded-full shadow-[0_8px_20px_rgba(38,41,46,0.06)]
              ${isDark ? 'bg-[rgba(255,255,255,0.06)] text-white' : 'bg-[var(--surface)] text-[var(--text)]'}
            `}
            aria-label="уменьшить"
          >
            <Minus size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
