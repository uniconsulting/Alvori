'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '@/lib/cn';
import { sitePath } from '@/lib/site-path';
import { appRoutes } from '@/config/routes';
import { homeAnchorHrefs } from '@/config/anchors';

type ThemeMode = 'light' | 'dark';

type MobileCardTransform = {
  rotateY: number;
  translateX: number;
  scaleX: number;
  scaleY: number;
  opacity: number;
  shadowOpacity: number;
};

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function getMobileCardTransform(
  cardRect: DOMRect,
  containerRect: DOMRect,
): MobileCardTransform {
  const containerCenter = containerRect.left + containerRect.width / 2;
  const cardCenter = cardRect.left + cardRect.width / 2;

  const distance = cardCenter - containerCenter;
  const normalized = clamp(distance / (containerRect.width * 0.52), -1, 1);
  const absN = Math.abs(normalized);

  return {
    rotateY: -normalized * 18,
    translateX: -normalized * 8,
    scaleX: 1 - absN * 0.1,
    scaleY: 1 - absN * 0.03,
    opacity: 1 - absN * 0.18,
    shadowOpacity: 0.1 + (1 - absN) * 0.08,
  };
}

export function HeroRightScene() {
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [card1Ready, setCard1Ready] = useState(false);
  const [card2Ready, setCard2Ready] = useState(false);
  const [card3Ready, setCard3Ready] = useState(false);

  const mobileScrollerRef = useRef<HTMLDivElement | null>(null);
  const mobileItemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const frameRef = useRef<number | null>(null);

  const [mobileTransforms, setMobileTransforms] = useState<MobileCardTransform[]>([
    { rotateY: 0, translateX: 0, scaleX: 1, scaleY: 1, opacity: 1, shadowOpacity: 0.18 },
    { rotateY: 0, translateX: 0, scaleX: 1, scaleY: 1, opacity: 1, shadowOpacity: 0.18 },
    { rotateY: 0, translateX: 0, scaleX: 1, scaleY: 1, opacity: 1, shadowOpacity: 0.18 },
  ]);

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

  useEffect(() => {
    const scroller = mobileScrollerRef.current;
    if (!scroller) return;

    const updateTransforms = () => {
      const containerRect = scroller.getBoundingClientRect();

      const next = mobileItemRefs.current.map((node) => {
        if (!node) {
          return {
            rotateY: 0,
            translateX: 0,
            scaleX: 1,
            scaleY: 1,
            opacity: 1,
            shadowOpacity: 0.18,
          };
        }

        return getMobileCardTransform(node.getBoundingClientRect(), containerRect);
      });

      setMobileTransforms(next);
      frameRef.current = null;
    };

    const requestUpdate = () => {
      if (frameRef.current !== null) return;
      frameRef.current = window.requestAnimationFrame(updateTransforms);
    };

    updateTransforms();

    scroller.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      scroller.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
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

  const mobileLeftOpticalSpacer = 16;
  const mobileCardWidth = 248;
  const mobileCardWidthSm = 260;

  return (
    <>
      <div className="xl:hidden">
        <div className="relative left-1/2 w-screen -translate-x-1/2">
          <div
            ref={mobileScrollerRef}
            className="flex snap-x snap-mandatory gap-3 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            style={{
              paddingLeft: `${mobileLeftOpticalSpacer}px`,
              paddingRight: 0,
              scrollPaddingLeft: `${mobileLeftOpticalSpacer}px`,
              scrollPaddingRight: 0,
              WebkitOverflowScrolling: 'touch',
            }}
          >
            <div
              className="h-px shrink-0"
              style={{ width: 0 }}
              aria-hidden="true"
            />

            <div
              ref={(node) => {
                mobileItemRefs.current[0] = node;
              }}
              className="shrink-0 snap-start"
              style={{ width: `${mobileCardWidth}px` }}
            >
              <div className="sm:hidden">
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
                  heightClassName="h-[264px] w-full"
                  visible={card1Ready}
                  mobileSquare
                  mobileTransform={mobileTransforms[0]}
                />
              </div>

              <div className="hidden sm:block">
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
                  heightClassName="h-[276px] w-full"
                  visible={card1Ready}
                  mobileSquare
                  mobileTransform={mobileTransforms[0]}
                  mobileFixedWidth={mobileCardWidthSm}
                />
              </div>
            </div>

            <div
              ref={(node) => {
                mobileItemRefs.current[1] = node;
              }}
              className="shrink-0 snap-start"
              style={{ width: `${mobileCardWidth}px` }}
            >
              <div className="sm:hidden">
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
                  heightClassName="h-[264px] w-full"
                  visible={card3Ready}
                  specialButton
                  mobileSquare
                  mobileTransform={mobileTransforms[1]}
                />
              </div>

              <div className="hidden sm:block">
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
                  heightClassName="h-[276px] w-full"
                  visible={card3Ready}
                  specialButton
                  mobileSquare
                  mobileTransform={mobileTransforms[1]}
                  mobileFixedWidth={mobileCardWidthSm}
                />
              </div>
            </div>

            <div
              ref={(node) => {
                mobileItemRefs.current[2] = node;
              }}
              className="shrink-0 snap-start"
              style={{ width: `${mobileCardWidth}px` }}
            >
              <div className="sm:hidden">
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
                  heightClassName="h-[264px] w-full"
                  visible={card2Ready}
                  mobileSquare
                  mobileTransform={mobileTransforms[2]}
                />
              </div>

              <div className="hidden sm:block">
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
                  heightClassName="h-[276px] w-full"
                  visible={card2Ready}
                  mobileSquare
                  mobileTransform={mobileTransforms[2]}
                  mobileFixedWidth={mobileCardWidthSm}
                />
              </div>
            </div>
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
  mobileTransform,
  mobileFixedWidth,
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
  mobileTransform?: MobileCardTransform;
  mobileFixedWidth?: number;
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
      style={{
        perspective: mobileSquare ? '1200px' : undefined,
        width: mobileSquare && mobileFixedWidth ? `${mobileFixedWidth}px` : undefined,
      }}
    >
      <div
        className="h-full"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <Link
          href={href}
          className={cn(
            isDesktop ? 'hero-card-tilt hero-card-shell' : '',
            'group relative block h-full overflow-hidden p-[2px]',
            mobileSquare ? 'rounded-[24px]' : 'rounded-[32px]',
          )}
          style={{
            transform: isDesktop
              ? `perspective(1600px) rotateX(${view.rotateX}deg) rotateY(${view.rotateY}deg) translateY(${view.y}px) scale(${view.scale})`
              : mobileSquare && mobileTransform
                ? `translateX(${mobileTransform.translateX}px) rotateY(${mobileTransform.rotateY}deg) scaleX(${mobileTransform.scaleX}) scaleY(${mobileTransform.scaleY})`
                : undefined,
            transformStyle: 'preserve-3d',
            transformOrigin:
              mobileSquare && mobileTransform
                ? mobileTransform.rotateY > 0
                  ? 'left center'
                  : 'right center'
                : undefined,
            opacity: mobileSquare && mobileTransform ? mobileTransform.opacity : undefined,
            WebkitTapHighlightColor: 'transparent',
            transition: isDesktop
              ? undefined
              : 'transform 180ms cubic-bezier(0.22,1,0.36,1), opacity 180ms cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          <div
            className={cn(
              'pointer-events-none absolute inset-0',
              mobileSquare ? 'rounded-[24px]' : 'rounded-[32px]',
              borderClass,
            )}
          />

          <div
            className={cn(
              'relative h-full overflow-hidden',
              mobileSquare ? 'rounded-[22px]' : 'rounded-[30px]',
              variant === 'accent'
                ? 'bg-[var(--accent-1)]'
                : variant === 'light'
                  ? 'bg-[var(--surface)]'
                  : 'bg-[var(--accent-2)]',
            )}
            style={{
              boxShadow:
                mobileSquare && mobileTransform
                  ? `0 10px 26px rgba(38,41,46,${mobileTransform.shadowOpacity})`
                  : undefined,
            }}
          >
            <img
              src={imageSrc}
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-220 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                transform: isDesktop
                  ? `translate3d(${(view.glowX - 50) * -0.038}px, ${(view.glowY - 50) * -0.038}px, 8px) scale(1.025)`
                  : mobileSquare && mobileTransform
                    ? `scale(${1.02 + (1 - mobileTransform.scaleX) * 0.08})`
                    : 'scale(1.02)',
              }}
            />

            <div
              className="pointer-events-none absolute inset-0"
              style={{
                opacity: isDesktop ? view.glowOpacity : 0,
                background: `radial-gradient(260px circle at ${view.glowX}% ${view.glowY}%, rgba(255,255,255,0.08), transparent 62%)`,
                transition: 'opacity 180ms cubic-bezier(0.22,1,0.36,1)',
              }}
            />

            {mobileSquare && mobileTransform ? (
              <div
                className="pointer-events-none absolute inset-y-0 right-0 w-[24%]"
                style={{
                  opacity: Math.abs(mobileTransform.rotateY) / 18,
                  background:
                    mobileTransform.rotateY < 0
                      ? 'linear-gradient(270deg, rgba(38,41,46,0.24) 0%, rgba(38,41,46,0.08) 45%, transparent 100%)'
                      : 'transparent',
                }}
              />
            ) : null}

            {mobileSquare && mobileTransform ? (
              <div
                className="pointer-events-none absolute inset-y-0 left-0 w-[24%]"
                style={{
                  opacity: Math.abs(mobileTransform.rotateY) / 18,
                  background:
                    mobileTransform.rotateY > 0
                      ? 'linear-gradient(90deg, rgba(38,41,46,0.24) 0%, rgba(38,41,46,0.08) 45%, transparent 100%)'
                      : 'transparent',
                }}
              />
            ) : null}

            <div
              className={cn(
                'pointer-events-none absolute bottom-0 left-0 right-0',
                mobileSquare ? 'h-[122px]' : 'h-[132px]',
                bottomMaskClass,
              )}
            />

            <div
              className={cn(
                'relative flex h-full flex-col justify-between',
                mobileSquare ? 'p-3.5' : 'p-5',
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
                    'inline-flex shrink-0 items-center justify-center transition-transform duration-220 ease-[cubic-bezier(0.22,1,0.36,1)]',
                    mobileSquare ? 'h-[34px] w-[34px] rounded-[12px]' : 'h-[38px] w-[38px] rounded-[14px]',
                    buttonClass,
                    isDesktop ? 'group-hover:translate-x-[1px]' : '',
                  )}
                  style={{ transform: isDesktop ? 'translateZ(12px)' : undefined }}
                >
                  <ArrowRight size={mobileSquare ? 17 : 19} strokeWidth={2.1} />
                </div>
              </div>

              <div className="relative">
                <div
                  className={cn(
                    'font-semibold leading-[1.15] tracking-[-0.01em]',
                    mobileSquare ? 'max-w-[168px] text-[15px]' : 'max-w-[152px] text-[12px]',
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

