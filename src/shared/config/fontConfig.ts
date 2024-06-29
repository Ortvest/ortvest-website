import { NextFont } from 'next/dist/compiled/@next/font';
import localFont from 'next/font/local';

export const fontConfig: NextFont = localFont({
  src: [
    { path: '../../../public/fonts/e-Ukraine-Thin.otf', weight: '100', style: 'normal' },
    { path: '../../../public/fonts/e-Ukraine-UltraLight.otf', weight: '200', style: 'normal' },
    { path: '../../../public/fonts/e-Ukraine-Light.otf', weight: '300', style: 'normal' },
    { path: '../../../public/fonts/e-Ukraine-Regular.otf', weight: '400', style: 'normal' },
    { path: '../../../public/fonts/e-Ukraine-Medium.otf', weight: '500', style: 'normal' },
    { path: '../../../public/fonts/e-Ukraine-Bold.otf', weight: '700', style: 'normal' },
  ],
});
