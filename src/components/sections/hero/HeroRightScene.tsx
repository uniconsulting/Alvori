'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '@/lib/cn';
import { sitePath } from '@/lib/site-path';
import { appRoutes } from '@/config/routes';
import { homeAnchorHrefs } from '@/config/anchors';

type ThemeMode = 'light' | 'dark';

export function HeroRightScene() {
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [card1Ready, setCard1Ready] = useState(false);
  const [card2Ready, setCard2Ready] = useState(false);
  const [card3Ready, setCard3Ready] = useState(false);

  useEffect(() => {
    const root = document.documentElement;

    const syncTheme = () => {
      setTheme(root.dataset.theme === 'dark' ? 'dark' : 'light');
    };

    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timers: number[] = [];
    timers.push(window.setTimeout(() => setCard1Ready(true), 6500));
    timers.push(window.setTimeout(() => setCard2Ready(true), 7500));
    timers.push(window.setTimeout(() => setCard3Ready(true), 8500));

    return () => {
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  const assets = useMemo(
    () => ({
      request: `${sitePath}/hero/cards/request.webp`,
      calc: `${sitePath}/hero/cards/calc.webp`,
      principles: `${sitePath}/hero/cards/principles.webp`,
    }),
    [],
  );

  return (
    <>
      <div className="xl:hidden">
        <div className="-mx-[2px] flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <div className="min-w-[calc(100%-8px)] snap-start">
            <BentoCard
              title={
                <>
                  единая форма
                  <br />
                  запроса и отправки кп
                </>
              }
              href={appRoutes.request}
              imageSrc={assets.request}
              theme={theme}
              variant="accent"
              heightClassName="aspect-square w-full"
              visible={card1Ready}
              mobileSquare
            />
          </div>

          <div className="min-w-[calc(100%-8px)] snap-start">
            <BentoCard
              title={
                <>
                  ознакомиться
                  <br />
                  с нашими принципами
                </>
              }
              href={homeAnchorHrefs.about}
              imageSrc={assets.principles}
              theme={theme}
              variant="dark"
              heightClassName="aspect-square w-full"
              visible={card3Ready}
              specialButton
              mobileSquare
            />
          </div>

          <div className="min-w-[calc(100%-8px)] snap-start">
            <BentoCard
              title={
                <>
                  сделать расчёт
                  <br />
                  вашей грузоперевозки
                </>
              }
              href={appRoutes.calculator}
              imageSrc={assets.calc}
              theme={theme}
              variant="light"
              heightClassName="aspect-square w-full"
              visible={card2Ready}
              mobileSquare
            />
          </div>
        </div>
      </div>

      <div className="hidden w-full max-w-[540px] md:max-w-none xl:grid xl:w-full xl:grid-cols-[258px_258px] xl:gap-6 xl:-translate-y-[3px]">
        <BentoCard
          title={
            <>
              единая форма
              <br />
              запроса и отправки кп
            </>
          }
          href={appRoutes.request}
          imageSrc={assets.request}
          theme={theme}
          variant="accent"
          heightClassName="h-[236px]"
          visible={card1Ready}
        />

        <BentoCard
          title={
            <>
              ознакомиться
              <br />
              с нашими принципами
            </>
          }
          href={homeAnchorHrefs.about}
          imageSrc={assets.principles}
          theme={theme}
          variant="dark"
          heightClassName="h-[496px]"
          tall
          specialButton
          visible={card3Ready}
        />

        <BentoCard
          title={
            <>
              сделать расчёт
              <br />
              вашей грузоперевозки
            </>
          }
          href={appRoutes.calculator}
          imageSrc={assets.calc}
          theme={theme}
          variant="light"
          heightClassName="h-[236px]"
          visible={card2Ready}
        />
      </div>
    </>
  );
}

function BentoCard({
  title,
  href,
  imageSrc,
  theme,
  variant,
  heightClassName,
  tall = false,
  specialButton = false,
  visible,
  mobileSquare = false,
}: {
  title: React.ReactNode;
  href: string;
  imageSrc: string;
  theme: ThemeMode;
  variant: 'accent' | 'light' | 'dark';
  heightClassName: string;
  tall?: boolean;
  specialButton?: boolean;
  visible: boolean;
  mobileSquare?: boolean;
}) {
  const currentRef = useRef({
    rotateX: 0,
    rotateY: 0,
    y: 0,
    scale: 1,
    glowX: 50,
    glowY: 50,
    glowOpacity: 0,
  });

  const targetRef = useRef({
    rotateX: 0,
    rotateY: 0,
    y: 0,
    scale: 1,
    glowX: 50,
    glowY: 50,
    glowOpacity: 0,
  });

  const velocityRef = useRef({
    rotateX: 0,
    rotateY: 0,
    y: 0,
    scale: 0,
    glowX: 0,
    glowY: 0,
    glowOpacity: 0,
  });

  const frameRef = useRef<number | null>(null);

  const [view, setView] = useState({
    rotateX: 0,
    rotateY: 0,
    y: 0,
    scale: 1,
    glowX: 50,
    glowY: 50,
    glowOpacity: 0,
  });

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const updateViewportMode = () => {
      setIsDesktop(window.innerWidth >= 1280);
    };

    updateViewportMode();
    window.addEventListener('resize', updateViewportMode);

    return () => window.removeEventListener('resize', updateViewportMode);
  }, []);

  useEffect(() => {
    const stiffness = 0.125;
    const damping = 0.8;

    const step = () => {
      const current = currentRef.current;
      const target = targetRef.current;
      const velocity = velocityRef.current;

      (Object.keys(current) as Array<keyof typeof current>).forEach((key) => {
        const force = (target[key] - current[key]) * stiffness;
        velocity[key] = (velocity[key] + force) * damping;
        current[key] = current[key] + velocity[key];
      });

      setView({ ...currentRef.current });
      frameRef.current = requestAnimationFrame(step);
    };

    frameRef.current = requestAnimationFrame(step);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const textClass = 'text-[#f6f6f6]';

  const buttonClass = specialButton
    ? 'bg-white text-black'
    : 'bg-[#222429] text-white';

  const bottomMaskClass =
    'bg-[linear-gradient(180deg,rgba(38,41,46,0)_0%,rgba(38,41,46,0.14)_18%,rgba(38,41,46,0.34)_38%,rgba(38,41,46,0.68)_62%,rgba(38,41,46,0.95)_100%)]';

  const borderClass =
    theme === 'light'
      ? 'bg-[linear-gradient(135deg,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.42)_24%,rgba(255,255,255,0.88)_48%,rgba(255,255,255,0.36)_74%,rgba(255,255,255,0.98)_100%)] opacity-100'
      : 'bg-[linear-gradient(135deg,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0.06)_24%,rgba(255,255,255,0.12)_48%,rgba(255,255,255,0.05)_74%,rgba(255,255,255,0.18)_100%)] opacity-50';

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isDesktop) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    const rotateY = (px - 0.5) * 3.2;
    const rotateX = (0.5 - py) * 3.2;

    targetRef.current = {
      rotateX,
      rotateY,
      y: -1.5,
      scale: 1.004,
      glowX: px * 100,
      glowY: py * 100,
      glowOpacity: 0.42,
    };
  };

  const handleMouseLeave = () => {
    targetRef.current = {
      rotateX: 0,
      rotateY: 0,
      y: 0,
      scale: 1,
      glowX: 50,
      glowY: 50,
      glowOpacity: 0,
    };
  };

  return (
    <div
      className={cn(
        !visible && 'opacity-0 translate-y-[18px] scale-[0.985]',
        visible &&
          'opacity-100 translate-y-0 scale-100 transition-all duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
        heightClassName,
        tall && 'xl:row-span-2',
      )}
    >
      <div
        className="hero-card-shell h-full"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <Link
          href={href}
          className={cn(
            'hero-card-tilt group relative block h-full overflow-hidden p-[2px]',
            mobileSquare ? 'rounded-[26px]' : 'rounded-[32px]',
          )}
          style={{
            transform: isDesktop
              ? `perspective(1600px) rotateX(${view.rotateX}deg) rotateY(${view.rotateY}deg) translateY(${view.y}px) scale(${view.scale})`
              : undefined,
          }}
        >
          <div
            className={cn(
              'pointer-events-none absolute inset-0',
              mobileSquare ? 'rounded-[26px]' : 'rounded-[32px]',
              borderClass,
            )}
          />

          <div
            className={cn(
              'relative h-full overflow-hidden',
              mobileSquare ? 'rounded-[24px]' : 'rounded-[30px]',
              variant === 'accent'
                ? 'bg-[var(--accent-1)]'
                : variant === 'light'
                  ? 'bg-[var(--surface)]'
                  : 'bg-[var(--accent-2)]',
            )}
          >
            <img
              src={imageSrc}
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-220 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                transform: isDesktop
                  ? `translate3d(${(view.glowX - 50) * -0.038}px, ${(view.glowY - 50) * -0.038}px, 8px) scale(1.025)`
                  : 'scale(1.025)',
              }}
            />

            <div
              className="pointer-events-none absolute inset-0"
              style={{
                opacity: view.glowOpacity,
                background: `radial-gradient(260px circle at ${view.glowX}% ${view.glowY}%, rgba(255,255,255,0.08), transparent 62%)`,
                transition: 'opacity 180ms cubic-bezier(0.22,1,0.36,1)',
              }}
            />

            <div
              className={cn(
                'pointer-events-none absolute bottom-0 left-0 right-0',
                mobileSquare ? 'h-[124px]' : 'h-[132px]',
                bottomMaskClass,
              )}
            />

            <div
              className={cn(
                'relative flex h-full flex-col justify-between',
                mobileSquare ? 'p-4' : 'p-5',
              )}
              style={{
                transform: isDesktop
                  ? `translate3d(${(view.glowX - 50) * 0.022}px, ${(view.glowY - 50) * 0.022}px, 10px)`
                  : undefined,
              }}
            >
              <div className="flex justify-end">
                <div
                  className={cn(
                    'inline-flex shrink-0 items-center justify-center transition-transform duration-220 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[1px]',
                    'h-[38px] w-[38px] rounded-[14px]',
                    buttonClass,
                  )}
                  style={{ transform: isDesktop ? 'translateZ(12px)' : undefined }}
                >
                  <ArrowRight size={19} strokeWidth={2.1} />
                </div>
              </div>

              <div className="relative">
                <div
                  className={cn(
                    'font-semibold leading-[1.15] tracking-[-0.01em]',
                    mobileSquare ? 'max-w-[176px] text-[14px]' : 'max-w-[152px] text-[12px]',
                    textClass,
                  )}
                >
                  {title}
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
