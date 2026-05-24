'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

import {
  IconAnchor,
  IconArrowRight,
  IconArrowsExchange,
  IconClick,
  IconCode,
  IconPhone,
  IconPlant,
  IconStar,
  IconTruck,
  IconUsers,
  type IconProps,
} from '@tabler/icons-react';

type SatelliteNodeProps = {
  left: string;
  top: string;
  circleClass: string;
  icon: React.ComponentType<IconProps>;
  iconSize: number;
  label: string;
  dimmed?: boolean;
};

function SatelliteNode({ left, top, circleClass, icon: Icon, iconSize, label, dimmed }: SatelliteNodeProps) {
  return (
    <div
      className={`group absolute flex -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col items-center gap-1 ${left} ${top} ${dimmed ? 'opacity-30' : ''}`}>
      <div className="rounded-full border border-[#cdff4e20] p-1 transition-colors group-hover:border-[#cdff4e40]">
        <div
          className={`flex items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 ${circleClass}`}>
          <Icon size={iconSize} className="text-accent" />
        </div>
      </div>
      <span className="text-[10px] text-zinc-500">{label}</span>
    </div>
  );
}

const ORBIT_LINES = [
  { x2: 220, y2: 50, opacity: 0.22, dash: '4 5', strokeWidth: 0.9, dur: '2s' },
  { x2: 353, y2: 114, opacity: 0.22, dash: '4 5', strokeWidth: 0.9, dur: '2.4s' },
  { x2: 386, y2: 250, opacity: 0.22, dash: '4 5', strokeWidth: 0.9, dur: '1.9s' },
  { x2: 313, y2: 374, opacity: 0.22, dash: '4 5', strokeWidth: 0.9, dur: '2.7s' },
  { x2: 127, y2: 374, opacity: 0.22, dash: '4 5', strokeWidth: 0.9, dur: '2.1s' },
  { x2: 54, y2: 245, opacity: 0.2, dash: '4 5', strokeWidth: 0.85, dur: '4s' },
  { x2: 87, y2: 109, opacity: 0.2, dash: '4 5', strokeWidth: 0.85, dur: '4s' },
] as const;

export function Hero() {
  const t = useTranslations('hero');

  return (
    <section id="hero" className="bg-black px-6 py-10 md:px-12 md:py-14" aria-labelledby="hero-heading">
      <style>{`
        @keyframes hero-center-pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.04); }
        }
        .hero-center-pulse { animation: hero-center-pulse 3s ease-in-out infinite; }
      `}</style>

      <div className="mx-auto max-w-[1160px]">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12">
          {/* LEFT — text */}
          <div>
            {/* Title */}
            <h1 id="hero-heading" className="mb-5 text-[38px] font-extrabold leading-[1.1] tracking-tight text-white">
              {t('title1')}
              <br />
              {t('title2')}
              <br />
              {t('title3')}
              <em className="text-accent not-italic">{t('title3em')}</em>
            </h1>

            {/* Subtitle */}
            <p className="mb-7 max-w-[400px] text-[15px] leading-[1.75] text-zinc-500">{t('subtitle')}</p>

            {/* CTAs */}
            <div className="mb-5 flex flex-wrap items-center gap-2.5">
              <Link
                href="#contact"
                className="flex cursor-pointer items-center gap-2 rounded-full border-none bg-accent px-[22px] py-[11px] text-[13px] font-bold text-black transition hover:opacity-85">
                {t('cta.primary')}
                <IconArrowRight size={13} />
              </Link>
              <Link
                href="#services"
                className="cursor-pointer rounded-full border border-zinc-800 bg-transparent px-[22px] py-[11px] text-[13px] text-white transition hover:border-zinc-600">
                {t('cta.secondary')}
              </Link>
            </div>

            {/* Free call */}
            <div className="flex items-center gap-1.5 text-[12px] text-zinc-600">
              <IconPhone size={13} className="text-zinc-600" />
              <span>{t('freecall.text')}</span>
              <Link href="#contact" className="text-zinc-500 underline">
                {t('freecall.link')}
              </Link>
            </div>
          </div>

          {/* RIGHT — illustration */}
          <div className="relative mx-auto aspect-square w-full max-w-[440px]">
            <svg
              viewBox="0 0 440 440"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute inset-0 h-full w-full"
              aria-hidden>
              {/* Dot grid */}
              <defs>
                <pattern id="heroDotGrid" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="0.9" fill="#cdff4e" fillOpacity="0.1" />
                </pattern>
              </defs>
              <rect width="440" height="440" fill="url(#heroDotGrid)" />

              {/* Orbit rings */}
              <circle cx="220" cy="220" r="168" fill="none" stroke="#cdff4e" strokeOpacity="0.12" strokeWidth="1" />
              <circle cx="220" cy="220" r="108" fill="none" stroke="#cdff4e" strokeOpacity="0.08" strokeWidth="1" />

              {/* Dashed lines to nodes */}
              {ORBIT_LINES.map((line, i) => (
                <line
                  key={i}
                  x1="220"
                  y1="220"
                  x2={line.x2}
                  y2={line.y2}
                  stroke="#cdff4e"
                  strokeWidth={line.strokeWidth}
                  strokeOpacity={line.opacity}
                  strokeDasharray={line.dash}>
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="-18"
                    dur={line.dur}
                    repeatCount="indefinite"
                  />
                </line>
              ))}
            </svg>

            {/* Center node */}
            <div className="hero-center-pulse absolute left-1/2 top-1/2 flex flex-col items-center">
              <div className="rounded-full border border-[#cdff4e20] p-2.5">
                <div className="rounded-full border border-[#cdff4e40] p-1.5">
                  <div className="flex h-[66px] w-[66px] items-center justify-center rounded-full bg-accent">
                    <IconCode size={27} className="text-black" />
                  </div>
                </div>
              </div>
              <span className="mt-1.5 text-[11px] font-bold tracking-widest text-accent">ORTVEST</span>
            </div>

            {/* Satellite nodes */}
            <SatelliteNode
              left="left-[50%]"
              top="top-[11.4%]"
              circleClass="h-12 w-12"
              icon={IconArrowsExchange}
              iconSize={20}
              label={t('nodes.p2p')}
            />
            <SatelliteNode
              left="left-[80.2%]"
              top="top-[25.9%]"
              circleClass="h-12 w-12"
              icon={IconUsers}
              iconSize={20}
              label={t('nodes.community')}
            />
            <SatelliteNode
              left="left-[87.7%]"
              top="top-[56.8%]"
              circleClass="h-12 w-12"
              icon={IconAnchor}
              iconSize={20}
              label={t('nodes.hospitality')}
            />
            <SatelliteNode
              left="left-[71.1%]"
              top="top-[85%]"
              circleClass="h-12 w-12"
              icon={IconStar}
              iconSize={20}
              label={t('nodes.sporttech')}
            />
            <SatelliteNode
              left="left-[28.9%]"
              top="top-[85%]"
              circleClass="h-12 w-12"
              icon={IconClick}
              iconSize={20}
              label={t('nodes.conversion')}
            />
            <SatelliteNode
              left="left-[12.3%]"
              top="top-[56.8%]"
              circleClass="h-[38px] w-[38px]"
              icon={IconTruck}
              iconSize={16}
              label={t('nodes.logistics')}
              dimmed
            />
            <SatelliteNode
              left="left-[19.8%]"
              top="top-[25.9%]"
              circleClass="h-[38px] w-[38px]"
              icon={IconPlant}
              iconSize={16}
              label={t('nodes.agritech')}
              dimmed
            />
          </div>
        </div>
      </div>
    </section>
  );
}
