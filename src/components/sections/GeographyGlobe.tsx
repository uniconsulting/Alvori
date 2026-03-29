'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { GEO_CITIES, GEO_ROUTES } from '@/components/sections/geography-data';

function rgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '');
  const normalized =
    clean.length === 3 ? clean.split('').map((char) => char + char).join('') : clean;

  const r = parseInt(normalized.slice(0, 2), 16) / 255;
  const g = parseInt(normalized.slice(2, 4), 16) / 255;
  const b = parseInt(normalized.slice(4, 6), 16) / 255;

  return [r, g, b];
}

export function GeographyGlobe() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeRouteIndex, setActiveRouteIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveRouteIndex((prev) => (prev + 1) % GEO_ROUTES.length);
    }, 4200);

    return () => window.clearInterval(interval);
  }, []);

  const activeRoute = GEO_ROUTES[activeRouteIndex];

  const cityMap = useMemo(
    () => new Map(GEO_CITIES.map((city) => [city.id, city])),
    [],
  );

  const markers = useMemo(
    () =>
      GEO_CITIES.map((city) => ({
        location: city.location,
        size: city.id === activeRoute.from || city.id === activeRoute.to ? 0.07 : 0.045,
      })),
    [activeRoute],
  );

  const arcs = useMemo(
    () =>
      GEO_ROUTES.map((route, index) => ({
        from: cityMap.get(route.from)!.location,
        to: cityMap.get(route.to)!.location,
        color: index === activeRouteIndex ? rgb('#fab021') : rgb('#8c93a0'),
      })),
    [activeRouteIndex, cityMap],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let phi = 0;

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: 720 * 2,
      height: 720 * 2,
      phi: 0,
      theta: 0.32,
      dark: 1,
      diffuse: 1.35,
      mapSamples: 20000,
      mapBrightness: 4.8,
      mapBaseBrightness: 0.08,
      baseColor: rgb('#26292e'),
      glowColor: rgb('#26292e'),
      markerColor: rgb('#b7bcc7'),
      arcColor: rgb('#fab021'),
      arcWidth: 0.6,
      arcHeight: 0.16,
      markerElevation: 0.02,
      scale: 0.96,
      offset: [40, 10],
      markers,
      arcs,
      onRender: (state) => {
        state.phi = phi;
        phi += 0.0022;
      },
    });

    return () => {
      globe.destroy();
    };
  }, [markers, arcs]);

  const from = cityMap.get(activeRoute.from)!;
  const to = cityMap.get(activeRoute.to)!;

  return (
    <div className="relative flex h-full min-h-[560px] items-center justify-center overflow-hidden rounded-[32px] bg-[var(--surface)] shadow-[0_16px_40px_rgba(38,41,46,0.06)]">
      <canvas
        ref={canvasRef}
        className="h-[560px] w-[560px]"
        style={{ maxWidth: '100%', aspectRatio: '1 / 1' }}
      />

      <div className="absolute bottom-6 left-6 right-6 rounded-[18px] bg-[rgba(38,41,46,0.78)] px-5 py-4 backdrop-blur-md">
        <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-white/56">
          активное направление
        </p>
        <p className="mt-2 text-[18px] font-semibold tracking-[-0.02em] text-white">
          {from.label} — {to.label}
        </p>
      </div>
    </div>
  );
}
