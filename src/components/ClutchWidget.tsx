'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    CLUTCHCO?: { Init?: () => void };
  }
}

const INIT_RETRY_INTERVAL_MS = 150;
const INIT_RETRY_LIMIT = 20;

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
  );
}
