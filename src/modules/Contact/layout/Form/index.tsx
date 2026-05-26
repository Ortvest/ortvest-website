'use client';

import { useState } from 'react';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

import { contactApi } from '@global/api/contact.api';
import { IconArrowRight, IconCircleCheck, IconLoader2 } from '@tabler/icons-react';

type ProjectType =
  | 'p2p'
  | 'community'
  | 'hospitality'
  | 'conversion'
  | 'sporttech'
  | 'logistics'
  | 'agritech'
  | 'other';

type BudgetOption = 'small' | '1k5k' | '5k15k' | '15k';
type ConsultationOption = 'discovery' | 'strategy';

const PROJECT_TYPES: ProjectType[] = [
  'p2p',
  'community',
  'hospitality',
  'conversion',
  'sporttech',
  'logistics',
  'agritech',
  'other',
];

const BUDGET_OPTIONS: BudgetOption[] = ['small', '1k5k', '5k15k', '15k'];
const CONSULTATION_OPTIONS: ConsultationOption[] = ['discovery', 'strategy'];

const inputClass =
  'w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-950 placeholder:text-zinc-300 transition focus:border-zinc-400 focus:outline-none';

const pillBase =
  'cursor-pointer select-none rounded-full border border-zinc-200 px-3 py-1.5 text-xs text-zinc-500 transition hover:border-zinc-400 hover:text-zinc-950';

const pillSelected = 'border-accent bg-accent font-medium text-black hover:border-accent hover:text-black';

export function ContactForm() {
  const t = useTranslations('contact');
  const locale = useLocale();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<ProjectType[]>([]);
  const [selectedBudget, setSelectedBudget] = useState('');
  const [selectedConsultation, setSelectedConsultation] = useState<ConsultationOption>('discovery');
  const [message, setMessage] = useState('');
  const [acceptedLegal, setAcceptedLegal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const toggleProjectType = (type: ProjectType) => {
    setSelectedTypes((prev) => (prev.includes(type) ? prev.filter((item) => item !== type) : [...prev, type]));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !acceptedLegal) return;

    setIsSubmitting(true);
    try {
      await contactApi.createOrder({
        clientName: name.trim(),
        clientEmail: email.trim(),
        productDescription: message.trim(),
        selectedServices: selectedTypes,
        budget: selectedBudget ? t(`budget.${selectedBudget}` as `budget.${BudgetOption}`) : '',
        consultationType: t(`consultation.${selectedConsultation}`),
      });
      setIsSuccess(true);
    } catch {
      // Keep form visible on error — user can retry
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center py-12 text-center">
        <IconCircleCheck size={32} className="text-green-500" />
        <h3 className="mt-3 text-h3 font-semibold text-zinc-950">{t('form.successTitle')}</h3>
        <p className="mt-1 text-sm text-zinc-400">{t('form.successDesc')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      {/* Name + Email */}
      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-zinc-500">
            {t('form.name.label')}
          </label>
          <input
            id="contact-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t('form.name.placeholder')}
            autoComplete="name"
            required
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-zinc-500">
            {t('form.email.label')}
          </label>
          <input
            id="contact-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('form.email.placeholder')}
            autoComplete="email"
            required
            className={inputClass}
          />
        </div>
      </div>

      {/* Project type */}
      <div className="mb-4">
        <div className="mb-2 flex items-center gap-1">
          <span className="text-sm font-medium text-zinc-500">{t('form.projectType')}</span>
          <span className="ml-1 text-xs text-zinc-400">{t('form.optional')}</span>
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label={t('form.projectType')}>
          {PROJECT_TYPES.map((type) => {
            const isSelected = selectedTypes.includes(type);
            return (
              <button
                key={type}
                type="button"
                onClick={() => toggleProjectType(type)}
                className={`${pillBase} ${isSelected ? pillSelected : ''}`}>
                {t(`projectTypes.${type}`)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Budget */}
      <div className="mb-4">
        <div className="mb-2 flex items-center gap-1">
          <span className="text-sm font-medium text-zinc-500">{t('form.budget')}</span>
          <span className="ml-1 text-xs text-zinc-400">{t('form.optional')}</span>
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label={t('form.budget')}>
          {BUDGET_OPTIONS.map((budget) => {
            const isSelected = selectedBudget === budget;
            return (
              <button
                key={budget}
                type="button"
                onClick={() => setSelectedBudget(isSelected ? '' : budget)}
                className={`${pillBase} ${isSelected ? pillSelected : ''}`}>
                {t(`budget.${budget}`)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Consultation type */}
      <div className="mb-4">
        <div className="mb-2">
          <span className="text-sm font-medium text-zinc-500">{t('form.consultation')}</span>
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label={t('form.consultation')}>
          {CONSULTATION_OPTIONS.map((option) => {
            const isSelected = selectedConsultation === option;
            return (
              <button
                key={option}
                type="button"
                onClick={() => setSelectedConsultation(option)}
                className={`${pillBase} ${isSelected ? pillSelected : ''}`}>
                {t(`consultation.${option}`)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Message */}
      <div className="mb-4">
        <div className="mb-1.5 flex items-center gap-1">
          <label htmlFor="contact-message" className="text-sm font-medium text-zinc-500">
            {t('form.message.label')}
          </label>
          <span className="ml-1 text-xs text-zinc-400">{t('form.optional')}</span>
        </div>
        <textarea
          id="contact-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t('form.message.placeholder')}
          rows={4}
          className={`${inputClass} h-24 resize-none`}
        />
      </div>

      {/* Legal consent */}
      <div className="mt-4 flex items-start gap-2.5">
        <input
          id="contact-legal"
          type="checkbox"
          checked={acceptedLegal}
          onChange={(e) => setAcceptedLegal(e.target.checked)}
          required
          className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-zinc-300 accent-accent text-black focus:ring-2 focus:ring-accent focus:ring-offset-1"
        />
        <label htmlFor="contact-legal" className="cursor-pointer text-xs leading-relaxed text-zinc-400">
          {t('form.legalConsent')}{' '}
          <Link
            href={`/${locale}/privacy-policy`}
            onClick={(e) => e.stopPropagation()}
            className="text-zinc-600 underline underline-offset-2 transition hover:text-black">
            {t('form.privacyLink')}
          </Link>{' '}
          {t('form.legalConsentAnd')}{' '}
          <Link
            href={`/${locale}/terms-of-use`}
            onClick={(e) => e.stopPropagation()}
            className="text-zinc-600 underline underline-offset-2 transition hover:text-black">
            {t('form.termsLink')}
          </Link>
        </label>
      </div>

      {/* Submit row */}
      <div className="mt-4 flex items-center justify-between">
        <button
          type="submit"
          disabled={isSubmitting || !acceptedLegal}
          className="flex items-center gap-2 rounded-full bg-zinc-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent hover:text-black active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60">
          {t('form.submit')}
          {isSubmitting ? <IconLoader2 size={14} className="animate-spin" /> : <IconArrowRight size={14} />}
        </button>
        <span className="text-xs text-zinc-300">{t('form.reply')}</span>
      </div>
    </form>
  );
}
