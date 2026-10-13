'use client';

import { useCallback, useEffect } from 'react';

import Script from 'next/script';

declare global {
  interface Window {
    CLUTCHCO?: { Init?: () => void };
  }
}

const INIT_RETRY_INTERVAL_MS = 150;
const INIT_RETRY_LIMIT = 20;

/**
 * Clutch's widget script used to load from the root layout with
 * `afterInteractive`, so it competed with hydration on every page. It lives
 * here instead, loaded after window load — next/script dedupes by id, so the
 * three widgets on the site still share one request.
 */
const CLUTCH_SCRIPT_ID = 'clutch-widget-script';
const CLUTCH_SCRIPT_SRC = 'https://widget.clutch.co/static/js/widget.js';

type ClutchWidgetProps = {
  widgetType: string;
  height: string;
  companyId: string;
  nofollow?: boolean;
  shape?: string;
  scale?: string;
  className?: string;
};

export function ClutchWidget({
  widgetType,
  height,
  companyId,
  nofollow = false,
  shape,
  scale = '100',
  className,
}: ClutchWidgetProps) {
  const init = useCallback(() => {
    window.CLUTCHCO?.Init?.();
  }, []);

  useEffect(() => {
    let attempts = 0;
    let timer: ReturnType<typeof setTimeout>;

    const tryInit = () => {
      if (window.CLUTCHCO?.Init) {
        window.CLUTCHCO.Init();
        return;
      }
      attempts += 1;
      if (attempts < INIT_RETRY_LIMIT) {
        timer = setTimeout(tryInit, INIT_RETRY_INTERVAL_MS);
      }
    };

    tryInit();

    return () => clearTimeout(timer);
  }, [widgetType, height, companyId, nofollow, shape, scale]);

  return (
    <>
      <Script id={CLUTCH_SCRIPT_ID} src={CLUTCH_SCRIPT_SRC} strategy="lazyOnload" onReady={init} />
      <div
        className={['clutch-widget', className].filter(Boolean).join(' ')}
        data-url="https://widget.clutch.co"
        data-widget-type={widgetType}
        data-height={height}
        data-clutchcompany-id={companyId}
        data-nofollow={nofollow ? 'true' : 'false'}
        data-expandifr="true"
        data-scale={scale}
        data-shape={shape}
      />
    </>
  );
}
