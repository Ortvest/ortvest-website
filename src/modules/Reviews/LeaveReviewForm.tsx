'use client';

import { useState } from 'react';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

import { IconCircleCheck, IconLoader2, IconStar } from '@tabler/icons-react';

interface ReviewFormData {
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
}

const inputClass =
  'w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-950 placeholder:text-zinc-300 transition focus:border-zinc-400 focus:outline-none';

export function LeaveReviewForm() {
  const t = useTranslations('reviews.form');
  const locale = useLocale();

  const [formData, setFormData] = useState<ReviewFormData>({
    name: '',
    role: '',
    company: '',
    text: '',
    rating: 5,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [acceptedConsent, setAcceptedConsent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptedConsent) return;
    setIsSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = (await res.json()) as { error?: string };

      if (!res.ok) {
        throw new Error(data.error || t('error'));
      }

      setIsSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="mx-auto flex max-w-[560px] flex-col items-center px-6 py-24 text-center">
        <IconCircleCheck size={40} className="text-accent" />
        <h1 className="mt-4 text-h2 font-semibold text-black">{t('success.title')}</h1>
        <p className="mt-3 text-body text-black/60">{t('success.text')}</p>
        <Link
          href={`/${locale}`}
          className="mt-8 inline-flex items-center rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-black/90">
          {t('success.back')}
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[560px] px-6 py-section">
      <div className="mb-12">
        <h1 className="text-h2 font-semibold text-black">{t('title')}</h1>
        <p className="mt-3 text-body text-black/60">{t('subtitle')}</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-500">{t('rating')}</label>
          <div className="flex gap-1" role="group" aria-label={t('rating')}>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, rating: star }))}
                className="cursor-pointer p-0.5 transition hover:scale-110"
                aria-label={`${star} stars`}>
                <IconStar
                  size={28}
                  className={star <= formData.rating ? 'fill-accent text-accent' : 'text-zinc-200'}
                  stroke={1.5}
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="review-name" className="mb-2 block text-sm font-medium text-zinc-500">
            {t('name')} *
          </label>
          <input
            id="review-name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            placeholder={t('namePlaceholder')}
            required
            maxLength={100}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="review-role" className="mb-2 block text-sm font-medium text-zinc-500">
            {t('role')} *
          </label>
          <input
            id="review-role"
            type="text"
            value={formData.role}
            onChange={(e) => setFormData((prev) => ({ ...prev, role: e.target.value }))}
            placeholder={t('rolePlaceholder')}
            required
            maxLength={100}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="review-company" className="mb-2 block text-sm font-medium text-zinc-500">
            {t('company')} *
          </label>
          <input
            id="review-company"
            type="text"
            value={formData.company}
            onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
            placeholder={t('companyPlaceholder')}
            required
            maxLength={100}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="review-text" className="mb-2 block text-sm font-medium text-zinc-500">
            {t('text')} *
          </label>
          <textarea
            id="review-text"
            value={formData.text}
            onChange={(e) => setFormData((prev) => ({ ...prev, text: e.target.value }))}
            placeholder={t('textPlaceholder')}
            required
            maxLength={1000}
            rows={5}
            className={`${inputClass} resize-none`}
          />
          <p className="mt-1 text-right text-xs text-zinc-400">{formData.text.length}/1000</p>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="flex items-start gap-2.5">
          <input
            id="review-consent"
            type="checkbox"
            checked={acceptedConsent}
            onChange={(e) => setAcceptedConsent(e.target.checked)}
            required
            className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-zinc-300 accent-accent text-black focus:ring-2 focus:ring-accent focus:ring-offset-1"
          />
          <label htmlFor="review-consent" className="cursor-pointer text-xs leading-relaxed text-zinc-400">
            {t('consent')}{' '}
            <Link
              href={`/${locale}/privacy-policy`}
              onClick={(e) => e.stopPropagation()}
              className="text-zinc-600 underline underline-offset-2 transition hover:text-black">
              {t('consentPrivacyLink')}
            </Link>
            .
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !acceptedConsent}
          className="inline-flex w-fit items-center gap-2 rounded-full bg-zinc-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent hover:text-black disabled:cursor-not-allowed disabled:opacity-60">
          {isSubmitting ? (
            <>
              {t('submitting')}
              <IconLoader2 size={14} className="animate-spin" />
            </>
          ) : (
            t('submit')
          )}
        </button>
      </form>
    </div>
  );
}
