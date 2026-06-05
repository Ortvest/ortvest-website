import type { ComponentType } from 'react';

import type { IconProps } from '@tabler/icons-react';

export type DisciplineItem = {
  id: 'developers' | 'designers' | 'marketing';
  Icon: ComponentType<IconProps>;
  iconBg: string;
  iconColor: string;
};

type TeamCardProps = {
  discipline: DisciplineItem;
  title: string;
  description: string;
  years: string;
  yearsLabel: string;
};

export function TeamCard({ discipline, title, description, years, yearsLabel }: TeamCardProps) {
  const { Icon, iconBg, iconColor } = discipline;

  return (
    <article className="flex h-full flex-col rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition duration-200 hover:border-zinc-300 hover:shadow-md">
      <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${iconBg}`} aria-hidden="true">
        <Icon size={24} className={iconColor} stroke={1.5} />
      </div>
      <h3 className="mb-3 text-h3 font-semibold text-zinc-950">{title}</h3>
      <p className="flex-1 text-body-sm leading-relaxed text-zinc-500">{description}</p>
      <div className="mt-6 border-t border-zinc-100 pt-5">
        <p className="text-[32px] font-bold leading-none tracking-tight text-zinc-950">{years}</p>
        <p className="mt-1 text-xs uppercase tracking-widest text-zinc-400">{yearsLabel}</p>
      </div>
    </article>
  );
}
