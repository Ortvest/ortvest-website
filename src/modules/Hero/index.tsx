'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

import {
  IconArrowRight,
  IconArrowsExchange,
  IconCode,
  IconPhone,
  IconPlant,
  type IconProps,
  IconTruck,
  IconUsers,
} from '@tabler/icons-react';

type SatelliteNodeProps = {
  left: string;
  top: string;
  circleClass: string;
  icon: React.ComponentType<IconProps>;
  iconSize: number;
  label: string;
};

function SatelliteNode({ left, top, circleClass, icon: Icon, iconSize, label }: SatelliteNodeProps) {
  return (
    <div
      className={`group absolute flex -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col items-center gap-1 ${left} ${top}`}>
      <div className="rounded-full border border-[#cdff4e20] p-1 transition-colors group-hover:border-[#cdff4e40]">
        <div
          className={`flex items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 ${circleClass}`}>
          <Icon size={iconSize} className="text-accent" />
        </div>
      </div>
      <span className="text-[10px] text-zinc-400">{label}</span>
    </div>
  );
}

const ORBIT_LINES = [
  { x2: 220, y2: 50, opacity: 0.22, dash: '4 5', strokeWidth: 0.9, dur: '2s' },
  { x2: 386, y2: 220, opacity: 0.22, dash: '4 5', strokeWidth: 0.9, dur: '2.4s' },
  { x2: 220, y2: 386, opacity: 0.22, dash: '4 5', strokeWidth: 0.9, dur: '1.9s' },
  { x2: 54, y2: 220, opacity: 0.2, dash: '4 5', strokeWidth: 0.85, dur: '2.1s' },
] as const;

export function Hero() {
  const t = useTranslations('hero');

  return (
    <section
      id="hero"
      className="bg-black px-6 pb-10 pt-24 sm:px-6 sm:pt-10 sm:pb-10 md:px-12 md:py-14"
      aria-labelledby="hero-heading">
      <style>{`
        @keyframes hero-center-pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.04); }
        }
        .hero-center-pulse { animation: hero-center-pulse 3s ease-in-out infinite; }
      `}</style>

      <div className="mx-auto max-w-[1160px]">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12">
          <div>
            <h1 id="hero-heading" className="mb-5 text-[38px] font-extrabold leading-[1.1] tracking-tight text-white">
              {t('title1')}
              <br />
              {t('title2')}
              <br />
              {t('title3')}
              <em className="text-accent not-italic">{t('title3em')}</em>
            </h1>

            <p className="mb-7 max-w-[400px] text-[15px] leading-[1.75] text-zinc-400">{t('subtitle')}</p>

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

            <div className="flex items-center gap-1.5 text-[12px] text-zinc-400">
              <IconPhone size={13} className="text-zinc-400" />
              <span>{t('freecall.text')}</span>
              <Link href="#contact" className="text-zinc-400 underline">
                {t('freecall.link')}
              </Link>
            </div>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-[440px]">
            <svg
              viewBox="0 0 440 440"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute inset-0 h-full w-full"
              aria-hidden>
              <defs>
                <pattern id="heroDotGrid" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="0.9" fill="#cdff4e" fillOpacity="0.1" />
                </pattern>
              </defs>
              <rect width="440" height="440" fill="url(#heroDotGrid)" />

              <circle cx="220" cy="220" r="168" fill="none" stroke="#cdff4e" strokeOpacity="0.12" strokeWidth="1" />
              <circle cx="220" cy="220" r="108" fill="none" stroke="#cdff4e" strokeOpacity="0.08" strokeWidth="1" />

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

            <SatelliteNode
              left="left-[50%]"
              top="top-[11.4%]"
              circleClass="h-12 w-12"
              icon={IconArrowsExchange}
              iconSize={20}
              label={t('nodes.p2p')}
            />
            <SatelliteNode
              left="left-[87.7%]"
              top="top-[50%]"
              circleClass="h-12 w-12"
              icon={IconUsers}
              iconSize={20}
              label={t('nodes.community')}
            />
            <SatelliteNode
              left="left-[50%]"
              top="top-[88.6%]"
              circleClass="h-12 w-12"
              icon={IconTruck}
              iconSize={20}
              label={t('nodes.logistics')}
            />
            <SatelliteNode
              left="left-[12.3%]"
              top="top-[50%]"
              circleClass="h-12 w-12"
              icon={IconPlant}
              iconSize={20}
              label={t('nodes.agritech')}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
