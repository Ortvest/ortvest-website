'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { Container, SectionReveal } from '@shared/components';

import { IconUsers } from '@tabler/icons-react';

const TRANSFORM = '/-/resize/600x/-/quality/smart/-/format/auto/';
const photoUrl = (uuid: string) => `https://ucarecdn.com/${uuid}${TRANSFORM}`;

const members = [
  {
    id: 'dmytro',
    memberKey: 'member1' as const,
    photo: photoUrl('dba1ff91-71c3-4d10-a1ee-3973385a16ff'),
    name: 'Dmytro Kazantsev',
    photoClass: '[object-position:center_5%]',
  },
  {
    id: 'yevheniia',
    memberKey: 'member2' as const,
    photo: photoUrl('3a183cf5-7481-452c-8331-04db474f4750'),
    name: 'Yevheniia Sadvari',
    photoClass: '[object-position:center_10%]',
  },
  {
    id: 'sergey',
    memberKey: 'member3' as const,
    photo: photoUrl('80358094-381a-473a-8055-20882e4b62f0'),
    name: 'Sergey Bekharsky',
    photoClass: 'object-center',
  },
] as const;

export function Team() {
  const t = useTranslations('team');

  return (
    <section id="team" className="relative overflow-hidden section-padding bg-white" aria-labelledby="team-heading">
      <svg
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true">
        <defs>
          <pattern id="teamDotGrid" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.9" fill="#a1a1aa" fillOpacity="0.35" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#teamDotGrid)" />
      </svg>
      <Container className="relative z-10">
        <SectionReveal direction="left">
          <header className="mb-10">
            <div className="mb-3 flex items-center gap-2">
              <IconUsers size={14} className="text-zinc-400" />
              <span className="text-xs uppercase tracking-widest text-zinc-400">{t('label')}</span>
            </div>
            <h2 id="team-heading" className="text-h1 font-bold text-zinc-950">
              {t('title')}
            </h2>
            <p className="mt-3 max-w-xl text-body text-zinc-400">{t('subtitle')}</p>
          </header>

          {/* Vertical list of horizontal cards */}
          <div className="flex flex-col gap-4">
            {members.map(({ id, memberKey, photo, name, photoClass }) => (
              <div
                key={id}
                className="relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition duration-200 hover:border-zinc-400 sm:flex-row">
                {/* Photo — full width on mobile, fixed sidebar on desktop */}
                <div
                  className={
                    'relative h-48 w-full flex-shrink-0 overflow-hidden bg-zinc-100 sm:h-auto sm:w-[140px] sm:self-stretch'
                  }>
                  <Image
                    src={photo}
                    alt={name}
                    fill
                    sizes="(max-width: 640px) 100vw, 140px"
                    className={`object-cover ${photoClass}`}
                  />
                </div>

                {/* Text */}
                <div className="flex flex-1 flex-col justify-center bg-white p-6">
                  <p className="text-h3 font-semibold text-zinc-950">{name}</p>
                  <p className="mb-4 mt-1 text-xs uppercase tracking-widest text-zinc-400">{t(`${memberKey}.role`)}</p>
                  <hr className="mb-4 border-t border-zinc-100" />
                  <p className="text-body-sm italic leading-relaxed text-zinc-400">{t(`${memberKey}.quote`)}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
