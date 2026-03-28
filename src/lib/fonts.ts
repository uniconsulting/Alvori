import localFont from 'next/font/local';

const garet = localFont({
  src: [
    {
      path: '../fonts/garet/Garet-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/garet/Garet-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/garet/Garet-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-body-text',
  display: 'swap',
  preload: true,
  fallback: ['Arial', 'system-ui', 'sans-serif'],
  adjustFontFallback: 'Arial',
});

const bodyTextFit = localFont({
  src: [
    {
      path: '../fonts/body-text-fit/BodyText-FitBold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/body-text-fit/BodyText-FitBold.woff',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-body-text-fit',
  display: 'swap',
  preload: true,
  fallback: ['Arial', 'system-ui', 'sans-serif'],
  adjustFontFallback: 'Arial',
});

export const fontVariables = `${garet.variable} ${bodyTextFit.variable}`;
