'use client';

import createGlobe from 'cobe';
import { useEffect, useMemo, useRef } from 'react';
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

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

type PointerPoint = {
  x: number;
  y: number;
};

export function GeographyGlobe({
  activeRouteIndex,
  isActive,
  mobile = false,
}: {
  activeRouteIndex: number;
  isActive: boolean;
  mobile?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const globeRef = useRef<ReturnType<typeof createGlobe> | null>(null);

  const phiRef = useRef(mobile ? -2.42 : -2.75);
  const thetaRef = useRef(mobile ? 0.44 : 0.75);
  const scaleRef = useRef(mobile ? 1.18 : 1.18);

  const dragStartRef = useRef<{
    x: number;
    y: number;
    phi: number;
    theta: number;
  } | null>(null);

  const pointersRef = useRef<Map<number, PointerPoint>>(new Map());
  const pinchStartRef = useRef<{
    distance: number;
    scale: number;
  } | null>(null);

  const activeRoute = GEO_ROUTES[activeRouteIndex];

  const cityMap = useMemo(
    () => new Map(GEO_CITIES.map((city) => [city.id, city])),
    [],
  );

  const activeCities = useMemo(
    () => [cityMap.get(activeRoute.from)!, cityMap.get(activeRoute.to)!],
    [activeRoute, cityMap],
  );

  const markers = useMemo(
    () =>
      activeCities.map((city) => ({
        location: city.location,
        size: mobile ? 0.024 : 0.022,
        id: city.id,
      })),
    [activeCities, mobile],
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

  const markersRef = useRef(markers);
  const arcsRef = useRef(activeArc);

  useEffect(() => {
    markersRef.current = markers;
  }, [markers]);

  useEffect(() => {
    arcsRef.current = activeArc;
  }, [activeArc]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isActive) return;

    let frame = 0;

    const globe = createGlobe(canvas, {
      devicePixelRatio: Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 1.5),
      width: mobile ? 1120 : 1440,
      height: mobile ? 1120 : 1440,
      phi: phiRef.current,
      theta: thetaRef.current,

      dark: 0,
      diffuse: 1.22,
      mapSamples: mobile ? 13000 : 14000,
      mapBrightness: 4.2,
      mapBaseBrightness: 0.0,
      baseColor: rgb('#eef1f5'),
      glowColor: rgb('#ffffff'),

      markerColor: rgb('#ffffff'),
      arcColor: rgb('#fab021'),
      arcWidth: mobile ? 1.2 : 1.1,
      arcHeight: 0.13,
      markerElevation: 0.04,
      scale: scaleRef.current,
      offset: mobile ? [98, -6] : [0, -12],
      markers: markersRef.current,
      arcs: arcsRef.current,
    });

    globeRef.current = globe;

    const animate = () => {
      if (!dragStartRef.current && pointersRef.current.size < 2) {
        phiRef.current += mobile ? 0.00028 : 0.00042;
      }

      globe.update({
        phi: phiRef.current,
        theta: thetaRef.current,
        scale: scaleRef.current,

        dark: 0,
        diffuse: 1.22,
        mapBrightness: 4.2,
        mapBaseBrightness: 0.0,
        baseColor: rgb('#eef1f5'),
        glowColor: rgb('#ffffff'),

        markerColor: rgb('#ffffff'),
        markers: markersRef.current,
        arcs: arcsRef.current,
        offset: mobile ? [98, -6] : [0, -12],
      });

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      globe.destroy();
      globeRef.current = null;
    };
  }, [isActive, mobile]);

  const getDistance = (a: PointerPoint, b: PointerPoint) => {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

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

    phiRef.current = start.phi + deltaX / (mobile ? 190 : 220);
    thetaRef.current = clamp(start.theta + deltaY / (mobile ? 300 : 260), -0.55, 0.55);
  };

  const endDrag = () => {
    dragStartRef.current = null;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = 'grab';
    }
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const canvas = event.currentTarget;
    canvas.setPointerCapture(event.pointerId);

    pointersRef.current.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY,
    });

    if (pointersRef.current.size === 1) {
      startDrag(event.clientX, event.clientY);
      pinchStartRef.current = null;
      return;
    }

    if (pointersRef.current.size === 2) {
      const [a, b] = Array.from(pointersRef.current.values());
      pinchStartRef.current = {
        distance: getDistance(a, b),
        scale: scaleRef.current,
      };
      dragStartRef.current = null;
    }
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!pointersRef.current.has(event.pointerId)) return;

    event.preventDefault();
    event.stopPropagation();

    pointersRef.current.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY,
    });

    if (pointersRef.current.size === 1) {
      moveDrag(event.clientX, event.clientY);
      return;
    }

    if (pointersRef.current.size === 2 && pinchStartRef.current) {
      const [a, b] = Array.from(pointersRef.current.values());
      const nextDistance = getDistance(a, b);
      const ratio = nextDistance / pinchStartRef.current.distance;

      scaleRef.current = clamp(
        pinchStartRef.current.scale * ratio,
        mobile ? 0.98 : 0.78,
        mobile ? 1.54 : 1.32,
      );
    }
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    event.stopPropagation();

    pointersRef.current.delete(event.pointerId);

    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {}

    if (pointersRef.current.size === 0) {
      pinchStartRef.current = null;
      endDrag();
      return;
    }

    if (pointersRef.current.size === 1) {
      const remaining = Array.from(pointersRef.current.values())[0];
      pinchStartRef.current = null;
      startDrag(remaining.x, remaining.y);
    }
  };

  const labels = activeCities.map((city) => (
    <div
      key={city.id}
      className="geography-globe-label pointer-events-none"
      style={{
        positionAnchor: `--cobe-${city.id}` as React.CSSProperties['positionAnchor'],
        opacity: `var(--cobe-visible-${city.id}, 0)`,
      }}
    >
      {city.label}
    </div>
  ));

  return (
    <div
      className={
        mobile
          ? 'relative z-10 h-full w-full'
          : 'relative z-10 flex h-full flex-col items-center justify-start'
      }
      style={mobile ? { touchAction: 'none' } : undefined}
    >
      {mobile ? (
        <div className="relative h-full w-full overflow-visible" style={{ touchAction: 'none' }}>
<div className="absolute top-[40%] right-[-34%] w-[76vw] -translate-y-1/2">
  <canvas
    ref={canvasRef}
    className="aspect-square w-full h-auto cursor-grab"
    style={{ touchAction: 'none' }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            />
            {labels}
          </div>
        </div>
      ) : (
        <div className="relative flex h-[580px] w-full items-start justify-center">
          <div className="relative h-[580px] w-[720px] max-w-none">
            <canvas
              ref={canvasRef}
              className="h-[620px] w-[620px] max-w-none -translate-x-[92px] -translate-y-[40px] cursor-grab"
              style={{ aspectRatio: '1 / 1' }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            />
            {labels}
          </div>
        </div>
      )}
    </div>
  );
}
