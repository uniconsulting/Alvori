'use client';

import { useEffect, useMemo, useState } from 'react';
import { HomePageContent } from '@/components/home/HomePageContent';
import { WelcomeLoader } from '@/components/intro/WelcomeLoader';
import { preloadHomeAssets } from '@/lib/preload-home-assets';
import { setIntroAccepted } from '@/lib/intro-storage';
import { sitePath } from '@/lib/site-path';

const MIN_LOADER_TIME_MS = 1400;
const EXIT_ANIMATION_MS = 560;

export function HomeIntroGate() {
  const [progress, setProgress] = useState(0);
  const [assetsReady, setAssetsReady] = useState(false);
  const [minTimeReady, setMinTimeReady] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [showHome, setShowHome] = useState(false);

  const logoSrc = useMemo(
    () => `${sitePath}/brand/footer/light/logo.png`,
    [],
  );

  useEffect(() => {
    let cancelled = false;

    const timer = window.setTimeout(() => {
      if (!cancelled) setMinTimeReady(true);
    }, MIN_LOADER_TIME_MS);

    preloadHomeAssets((nextProgress) => {
      if (!cancelled) setProgress(nextProgress);
    }).finally(() => {
      if (!cancelled) {
        setProgress(100);
        setAssetsReady(true);
      }
    });

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (showHome) return;

    const html = document.documentElement;
    const body = document.body;

    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;

    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';

    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
    };
  }, [showHome]);

  const canAccept = assetsReady && minTimeReady;

  const handleAccept = () => {
    if (!canAccept) return;

    setIntroAccepted();
    setIsExiting(true);

    window.setTimeout(() => {
      setShowHome(true);
    }, EXIT_ANIMATION_MS);
  };

  if (!showHome) {
    return (
      <WelcomeLoader
        progress={progress}
        canAccept={canAccept}
        onAccept={handleAccept}
        isExiting={isExiting}
        logoSrc={logoSrc}
      />
    );
  }

  return <HomePageContent />;
}
