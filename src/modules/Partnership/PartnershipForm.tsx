'use client';

import { useState } from 'react';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

import { IconArrowRight, IconCircleCheck, IconLoader2 } from '@tabler/icons-react';

import { PartnershipSelect } from './PartnershipSelect';

export type PartnerStage = 'idea' | 'prototype' | 'live' | 'revenue';
export type PartnerFunding = 'bootstrapped' | 'preseed' | 'seed' | 'raised';
export type PartnerModel = 'embedded' | 'equity' | 'cto' | 'unsure';

const PARTNER_STAGES: PartnerStage[] = ['idea', 'prototype', 'live', 'revenue'];
const PARTNER_FUNDINGS: PartnerFunding[] = ['bootstrapped', 'preseed', 'seed', 'raised'];
const PARTNER_MODELS: PartnerModel[] = ['embedded', 'equity', 'cto', 'unsure'];

const inputClass =
  'w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-950 ' +
  'placeholder:text-zinc-500 transition focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/20';

const labelClass = 'mb-1.5 block text-sm font-medium text-zinc-200';

export function PartnershipForm() {
  const t = useTranslations('partnership.form');
  const locale = useLocale();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [building, setBuilding] = useState('');
  const [sideCount, setSideCount] = useState('');
  const [stage, setStage] = useState<PartnerStage | ''>('');
  const [funding, setFunding] = useState<PartnerFunding | ''>('');
  const [model, setModel] = useState<PartnerModel | ''>('');
  const [tried, setTried] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const isValid =
    name.trim() &&
    email.trim() &&
    building.trim() &&
    sideCount.trim() &&
    stage &&
    funding &&
    model &&
    tried.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setIsSubmitting(true);
    setError('');

    const description =
      `Stage: ${stage}\nFunding: ${funding}\nModel of interest: ${model}\n\n` +
      `What they're building:\n${building}\n\n` +
      `Side they can reach:\n${sideCount}\n\n` +
      `What didn't work:\n${tried}`;

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName: name.trim(),
          clientEmail: email.trim(),
          productDescription: description,
          selectedServices: [] as string[],
          budget: '',
          consultationType: '',
          source: 'partnership',
          partnerStage: stage,
          partnerFunding: funding,
          partnerModel: model,
        }),
      });

      if (!res.ok) throw new Error('Submission failed');
      setIsSuccess(true);
    } catch {
      setError('Something went wrong. Please try again or email us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center py-14 text-center">
        <IconCircleCheck size={36} className="text-accent" />
        <h3 className="mt-4 text-xl font-semibold text-white">{t('success.title')}</h3>
        <p className="mt-2 max-w-sm text-sm text-zinc-300">{t('success.text')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-5">
      {/* Name + Email */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="partner-name" className={labelClass}>
            {t('name.label')} <span className="text-accent">*</span>
          </label>
          <input
            id="partner-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t('name.placeholder')}
            autoComplete="name"
            required
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="partner-email" className={labelClass}>
            {t('email.label')} <span className="text-accent">*</span>
          </label>
          <input
            id="partner-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('email.placeholder')}
            autoComplete="email"
            required
            className={inputClass}
          />
        </div>
      </div>

      {/* What are you building */}
      <div>
        <label htmlFor="partner-building" className={labelClass}>
          {t('building.label')} <span className="text-accent">*</span>
        </label>
        <textarea
          id="partner-building"
          value={building}
          onChange={(e) => setBuilding(e.target.value)}
          placeholder={t('building.placeholder')}
          rows={3}
          required
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* Side count */}
      <div>
        <label htmlFor="partner-side-count" className={labelClass}>
          {t('sideCount.label')} <span className="text-accent">*</span>
        </label>
        <textarea
          id="partner-side-count"
          value={sideCount}
          onChange={(e) => setSideCount(e.target.value)}
          placeholder={t('sideCount.placeholder')}
          rows={2}
          required
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* Stage + Funding */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <PartnershipSelect
          id="partner-stage"
          label={
            <>
              {t('stage')} <span className="text-accent">*</span>
            </>
          }
          value={stage}
          placeholder={t('selectPlaceholder')}
          options={PARTNER_STAGES}
          getOptionLabel={(s) => t(`stages.${s}`)}
          onChange={setStage}
        />
        <PartnershipSelect
          id="partner-funding"
          label={
            <>
              {t('funding')} <span className="text-accent">*</span>
            </>
          }
          value={funding}
          placeholder={t('selectPlaceholder')}
          options={PARTNER_FUNDINGS}
          getOptionLabel={(f) => t(`fundings.${f}`)}
          onChange={setFunding}
        />
      </div>

      <PartnershipSelect
        id="partner-model"
        label={
          <>
            {t('model')} <span className="text-accent">*</span>
          </>
        }
        value={model}
        placeholder={t('selectPlaceholder')}
        options={PARTNER_MODELS}
        getOptionLabel={(m) => t(`models.${m}`)}
        onChange={setModel}
      />

      {/* What didn't work */}
      <div>
        <label htmlFor="partner-tried" className={labelClass}>
          {t('tried.label')} <span className="text-accent">*</span>
        </label>
        <textarea
          id="partner-tried"
          value={tried}
          onChange={(e) => setTried(e.target.value)}
          placeholder={t('tried.placeholder')}
          rows={3}
          required
          className={`${inputClass} resize-none`}
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      {/* Submit row */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <button
          type="submit"
          disabled={isSubmitting || !isValid}
          className={
            'flex items-center gap-2 rounded-full bg-zinc-950 px-6 py-3 text-sm font-semibold ' +
            'text-white transition hover:bg-accent hover:text-black active:scale-[0.98] ' +
            'disabled:cursor-not-allowed disabled:opacity-60'
          }>
          {isSubmitting ? t('submitting') : t('submit')}
          {isSubmitting ? <IconLoader2 size={14} className="animate-spin" /> : <IconArrowRight size={14} />}
        </button>
        <span className="text-xs text-zinc-300">
          {t('legal')}{' '}
          <Link
            href={`/${locale}/privacy-policy`}
            className="text-zinc-100 underline underline-offset-2 transition hover:text-accent">
            {t('legalLink')}
          </Link>
        </span>
      </div>
    </form>
  );
}
