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
  },
  {
    id: 'yevheniia',
    memberKey: 'member2' as const,
    photo: photoUrl('3a183cf5-7481-452c-8331-04db474f4750'),
    name: 'Yevheniia Sadvari',
  },
  {
    id: 'sergey',
    memberKey: 'member3' as const,
    photo: photoUrl('80358094-381a-473a-8055-20882e4b62f0'),
    name: 'Sergey Bekharsky',
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
          <div className="flex flex-col gap-0 sm:gap-4">
            {members.map(({ id, memberKey, photo, name }) => (
              <div
                key={id}
                className="relative mb-3 flex flex-row items-center gap-3 overflow-hidden rounded-2xl border border-zinc-200 bg-white p-4 transition duration-200 hover:border-zinc-400 sm:mb-0 sm:grid sm:grid-cols-[140px_1fr] sm:items-stretch sm:gap-0 sm:p-0">
                {/* Mobile — round avatar */}
                <div className="h-[60px] w-[60px] flex-shrink-0 overflow-hidden rounded-full border-2 border-zinc-100 sm:hidden">
                  <Image
                    src={photo}
                    alt={name}
                    width={60}
                    height={60}
                    className="h-full w-full"
                    style={{ objectFit: 'cover', objectPosition: 'center 10%' }}
                  />
                </div>

                {/* Desktop — rectangular photo */}
                <div className="relative hidden min-h-0 overflow-hidden bg-zinc-100 sm:block sm:h-full sm:w-full">
                  <Image
                    src={photo}
                    alt={name}
                    fill
                    sizes="140px"
                    className="object-cover"
                    style={{ objectPosition: '50% 25%' }}
                  />
                </div>

                {/* Mobile — text */}
                <div className="flex min-w-0 flex-col gap-0.5 sm:hidden">
                  <p className="text-[14px] font-bold text-zinc-950">{name}</p>
                  <p className="mb-1.5 mt-0.5 text-[10px] uppercase tracking-wider text-zinc-400">
                    {t(`${memberKey}.role`)}
                  </p>
                  <p className="text-[12px] italic leading-relaxed text-zinc-400">{t(`${memberKey}.quote`)}</p>
                </div>

                {/* Desktop — text */}
                <div className="hidden flex-1 flex-col justify-center bg-white p-6 sm:flex">
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
