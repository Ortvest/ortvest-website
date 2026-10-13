'use client';

import { useState } from 'react';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

import { contactApi } from '@global/api/contact.api';
import {
  CONTACT_CONSULTATION_OPTIONS,
  CONTACT_PROJECT_TYPES,
  type ContactConsultationOption,
  type ContactProjectType,
} from '@lib/contact-options';
import { IconArrowRight, IconCircleCheck, IconLoader2 } from '@tabler/icons-react';

const inputClass =
  'w-full rounded-xl border border-white/15 bg-white/[0.02] px-4 py-2.5 text-sm text-white placeholder:text-white/30 transition focus:border-white/40 focus:outline-none';

const pillBase = 'cursor-pointer select-none rounded-full border px-4 py-2 text-sm font-medium transition';

/**
 * Selected/unselected text colors are mutually exclusive — never combine them
 * via string concatenation. Tailwind's generated stylesheet order (not the
 * order classes appear in the className string) decides which `text-*`
 * utility wins when both are present, so returning one exclusive string per
 * state is the only reliable way to avoid white-on-accent text.
 */
function pillClassName(isSelected: boolean) {
  return isSelected
    ? `${pillBase} border-accent bg-accent text-black`
    : `${pillBase} border-white/15 text-white/70 hover:border-white/40 hover:text-white`;
}

export function ContactForm() {
  const t = useTranslations('contact');
  const locale = useLocale();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<ContactProjectType[]>([]);
  const [selectedConsultation, setSelectedConsultation] = useState<ContactConsultationOption>('discovery');
  const [message, setMessage] = useState('');
  const [acceptedLegal, setAcceptedLegal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const toggleProjectType = (type: ContactProjectType) => {
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
        consultationType: selectedConsultation,
      });
      setIsSuccess(true);
    } catch {
      // Keep form visible on error – user can retry
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-white/10 px-6 py-16 text-center">
        <IconCircleCheck size={32} className="text-accent" />
        <h3 className="mt-3 text-h3 font-semibold text-white">{t('form.successTitle')}</h3>
        <p className="mt-1 text-sm text-white/50">{t('form.successDesc')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
      {/* Name + Email */}
      <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-white">
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
          <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-white">
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
      <div className="mb-5">
        <div className="mb-2.5 flex items-center gap-1.5">
          <span className="text-sm font-medium text-white">{t('form.projectType')}</span>
          <span className="text-xs text-white/40">{t('form.optional')}</span>
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label={t('form.projectType')}>
          {CONTACT_PROJECT_TYPES.map((type) => {
            const isSelected = selectedTypes.includes(type);
            return (
              <button
                key={type}
                type="button"
                onClick={() => toggleProjectType(type)}
                className={pillClassName(isSelected)}>
                {t(`projectTypes.${type}`)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Consultation type */}
      <div className="mb-5">
        <div className="mb-2.5">
          <span className="text-sm font-medium text-white">{t('form.consultation')}</span>
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label={t('form.consultation')}>
          {CONTACT_CONSULTATION_OPTIONS.map((option) => {
            const isSelected = selectedConsultation === option;
            return (
              <button
                key={option}
                type="button"
                onClick={() => setSelectedConsultation(option)}
                className={`${pillClassName(isSelected)} flex items-center gap-1.5`}>
                {t(`consultation.${option}.title`)}
                <span className={isSelected ? 'text-black/60' : 'text-white/40'}>
                  {t(`consultation.${option}.price`)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Message */}
      <div className="mb-5">
        <div className="mb-2 flex items-center gap-1.5">
          <label htmlFor="contact-message" className="text-sm font-medium text-white">
            {t('form.message.label')}
          </label>
          <span className="text-xs text-white/40">{t('form.optional')}</span>
        </div>
        <textarea
          id="contact-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t('form.message.placeholder')}
          rows={4}
          className={`${inputClass} h-28 resize-none`}
        />
      </div>

      {/* Legal consent */}
      <div className="flex items-start gap-2.5">
        <input
          id="contact-legal"
          type="checkbox"
          checked={acceptedLegal}
          onChange={(e) => setAcceptedLegal(e.target.checked)}
          required
          className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-white/25 bg-transparent accent-accent focus:ring-2 focus:ring-accent focus:ring-offset-1 focus:ring-offset-black"
        />
        <label htmlFor="contact-legal" className="cursor-pointer text-xs leading-relaxed text-white/50">
          {t('form.legalConsent')}{' '}
          <Link
            href={`/${locale}/privacy-policy`}
            onClick={(e) => e.stopPropagation()}
            className="font-medium text-white underline underline-offset-2 transition hover:text-accent">
            {t('form.privacyLink')}
          </Link>{' '}
          {t('form.legalConsentAnd')}{' '}
          <Link
            href={`/${locale}/terms-of-use`}
            onClick={(e) => e.stopPropagation()}
            className="font-medium text-white underline underline-offset-2 transition hover:text-accent">
            {t('form.termsLink')}
          </Link>
        </label>
      </div>

      {/* Submit row */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <button
          type="submit"
          disabled={isSubmitting || !acceptedLegal}
          className="group inline-flex items-center justify-between gap-6 rounded-full bg-accent py-1.5 pl-6 pr-1.5 text-sm font-semibold text-black transition hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-60">
          {t('form.submit')}
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black text-accent">
            {isSubmitting ? (
              <IconLoader2 size={16} className="animate-spin" />
            ) : (
              <IconArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            )}
          </span>
        </button>
        <span className="font-mono text-xs text-white/35">{t('form.reply')}</span>
      </div>
    </form>
  );
}
