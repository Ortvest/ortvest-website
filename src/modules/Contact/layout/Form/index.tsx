'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { Button } from '@shared/components';
import { ModalTypes } from '@shared/enums/ModalTypes.enums';
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux.hooks';

import { contactApi } from '@global/api/contact.api';
import { ContactSlice } from '@global/store/slices/ContactSlice';
import { ModalSlice } from '@global/store/slices/ModalSlice';
import { EASE } from '@lib/motion';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, ArrowRight, Check } from 'lucide-react';

type ProjectTypeOption = 'design' | 'dev' | 'marketing';
type BudgetOption = 'under1k' | '1k5k' | '5k15k' | '15kplus';
type ConsultationOption = 'discovery' | 'strategy';

const inputBase = [
  'w-full rounded-xl border border-black/[0.08] bg-white px-4 py-3 text-body text-black outline-none',
  'transition-colors hover:border-black/15 focus:border-accent focus:ring-2 focus:ring-accent/20',
].join(' ');
const inputError = 'border-red-400 focus:border-red-400 focus:ring-red-100';

const PROJECT_OPTIONS: {
  value: ProjectTypeOption;
  labelKey: 'projectTypeDesign' | 'projectTypeDev' | 'projectTypeMarketing';
}[] = [
  { value: 'design', labelKey: 'projectTypeDesign' },
  { value: 'dev', labelKey: 'projectTypeDev' },
  { value: 'marketing', labelKey: 'projectTypeMarketing' },
];

const BUDGET_OPTIONS: {
  value: BudgetOption;
  labelKey: 'budgetUnder1k' | 'budget1k5k' | 'budget5k15k' | 'budget15kPlus';
}[] = [
  { value: 'under1k', labelKey: 'budgetUnder1k' },
  { value: '1k5k', labelKey: 'budget1k5k' },
  { value: '5k15k', labelKey: 'budget5k15k' },
  { value: '15kplus', labelKey: 'budget15kPlus' },
];

const CONSULTATION_OPTIONS: {
  value: ConsultationOption;
  labelKey: 'consultationDiscovery' | 'consultationStrategy';
}[] = [
  { value: 'discovery', labelKey: 'consultationDiscovery' },
  { value: 'strategy', labelKey: 'consultationStrategy' },
];

export function Form() {
  const t = useTranslations('contact');
  const dispatch = useAppDispatch();
  const { orderData } = useAppSelector((state) => state.ContactReducer);
  const { setOrderData } = ContactSlice.actions;
  const { setIsModalOpened, setModalType } = ModalSlice.actions;
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [projectTypes, setProjectTypes] = useState<ProjectTypeOption[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<BudgetOption | null>(null);
  const [selectedConsultation, setSelectedConsultation] = useState<ConsultationOption | null>(null);
  const [shakeKey, setShakeKey] = useState(0);

  const toggleProjectType = (value: ProjectTypeOption) => {
    setProjectTypes((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));
    setSubmitError(null);
  };

  const toggleBudget = (value: BudgetOption) => {
    const next = selectedBudget === value ? null : value;
    setSelectedBudget(next);
    dispatch(setOrderData({ ...orderData, budget: next ? t(`budgetMap.${next}`) : '' }));
    setSubmitError(null);
  };

  const toggleConsultationType = (value: ConsultationOption) => {
    const next = selectedConsultation === value ? null : value;
    setSelectedConsultation(next);
    dispatch(setOrderData({ ...orderData, consultationType: next ? t(`consultationMap.${next}`) : '' }));
    setSubmitError(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    dispatch(setOrderData({ ...orderData, [name]: value }));
    setSubmitError(null);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ clientName: true, clientEmail: true });
    const { clientName, clientEmail, productDescription, budget, consultationType } = orderData;
    if (!clientName?.trim() || !clientEmail?.trim()) {
      setSubmitError(t('error'));
      setShakeKey((prev) => prev + 1);
      return;
    }
    const payload = {
      clientName: clientName.trim(),
      clientEmail: clientEmail.trim(),
      productDescription: (productDescription || '').trim(),
      selectedServices: [...projectTypes],
      budget: budget || '',
      consultationType: consultationType || '',
    };
    setLoading(true);
    try {
      await contactApi.createOrder(payload);
      dispatch(setIsModalOpened(true));
      dispatch(setModalType(ModalTypes.SECCESSFULLY_SENDED));
      dispatch(
        setOrderData({
          clientEmail: '',
          clientName: '',
          productDescription: '',
          selectedServices: [],
          budget: '',
          consultationType: '',
        })
      );
      setProjectTypes([]);
      setSelectedBudget(null);
      setSelectedConsultation(null);
      setSubmitError(null);
      setTouched({});
    } catch {
      dispatch(setIsModalOpened(true));
      dispatch(setModalType(ModalTypes.SEND_FAILED));
      setSubmitError(t('error'));
    } finally {
      setLoading(false);
    }
  };

  const nameError = touched.clientName && !orderData.clientName?.trim();
  const emailError = touched.clientEmail && !orderData.clientEmail?.trim();

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full rounded-2xl border border-black/[0.06] bg-white p-5 shadow-card sm:p-6">
      <div className="space-y-4">
        <motion.div
          key={`name-${shakeKey}`}
          animate={nameError ? { x: [0, -8, 8, -8, 8, 0] } : {}}
          transition={{ duration: 0.4, ease: EASE }}>
          <label htmlFor="contact-name" className="mb-1.5 block text-body-sm font-medium text-black">
            {t('name')}
          </label>
          <input
            id="contact-name"
            type="text"
            name="clientName"
            value={orderData.clientName}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            autoComplete="name"
            className={`${inputBase} ${nameError ? inputError : ''}`}
            placeholder={t('name')}
            aria-invalid={!!nameError}
          />
          <AnimatePresence>
            {nameError && (
              <motion.p
                className="mt-1.5 flex items-center gap-1.5 text-body-sm text-red-600"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3, ease: EASE }}
                role="alert">
                <AlertCircle className="h-3.5 w-3.5" />
                {t('name')} is required
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          key={`email-${shakeKey}`}
          animate={emailError ? { x: [0, -8, 8, -8, 8, 0] } : {}}
          transition={{ duration: 0.4, ease: EASE }}>
          <label htmlFor="contact-email" className="mb-1.5 block text-body-sm font-medium text-black">
            {t('email')}
          </label>
          <input
            id="contact-email"
            type="email"
            name="clientEmail"
            value={orderData.clientEmail}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            autoComplete="email"
            className={`${inputBase} ${emailError ? inputError : ''}`}
            placeholder={t('email')}
            aria-invalid={!!emailError}
          />
          <AnimatePresence>
            {emailError && (
              <motion.p
                className="mt-1.5 flex items-center gap-1.5 text-body-sm text-red-600"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3, ease: EASE }}
                role="alert">
                <AlertCircle className="h-3.5 w-3.5" />
                {t('email')} is required
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        <div>
          <span className="mb-2 block text-body-sm font-medium text-black">
            {t('projectType')} <span className="text-black/40">(optional)</span>
          </span>
          <div className="flex flex-wrap gap-2" role="group" aria-label={t('projectType')}>
            {PROJECT_OPTIONS.map(({ value, labelKey }) => {
              const isSelected = projectTypes.includes(value);
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => toggleProjectType(value)}
                  className={`
                    inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-body-sm font-medium transition
                    ${
                      isSelected
                        ? 'border-accent bg-accent/15 text-black'
                        : 'border-black/[0.12] bg-white text-black/70 hover:border-black/20 hover:bg-black/[0.03]'
                    }
                  `}>
                  {isSelected && <Check className="h-3.5 w-3.5" />}
                  {t(labelKey)}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <span className="mb-2 block text-body-sm font-medium text-black">{t('budget')}</span>
          <div className="flex flex-wrap gap-2" role="group" aria-label={t('budget')}>
            {BUDGET_OPTIONS.map(({ value, labelKey }) => {
              const isSelected = selectedBudget === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => toggleBudget(value)}
                  className={`
                    inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-body-sm font-medium transition
                    ${
                      isSelected
                        ? 'border-accent bg-accent/15 text-black'
                        : 'border-black/[0.12] bg-white text-black/70 hover:border-black/20 hover:bg-black/[0.03]'
                    }
                  `}>
                  {isSelected && <Check className="h-3.5 w-3.5" />}
                  {t(labelKey)}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <span className="mb-2 block text-body-sm font-medium text-black">{t('consultationType')}</span>
          <div className="flex flex-wrap gap-2" role="group" aria-label={t('consultationType')}>
            {CONSULTATION_OPTIONS.map(({ value, labelKey }) => {
              const isSelected = selectedConsultation === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => toggleConsultationType(value)}
                  className={`
                    inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-body-sm font-medium transition
                    ${
                      isSelected
                        ? 'border-accent bg-accent/15 text-black'
                        : 'border-black/[0.12] bg-white text-black/70 hover:border-black/20 hover:bg-black/[0.03]'
                    }
                  `}>
                  {isSelected && <Check className="h-3.5 w-3.5" />}
                  {t(labelKey)}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label htmlFor="contact-message" className="mb-1.5 block text-body-sm font-medium text-black">
            {t('message')} <span className="text-black/40">(optional)</span>
          </label>
          <textarea
            id="contact-message"
            name="productDescription"
            value={orderData.productDescription}
            onChange={handleChange}
            onBlur={handleBlur}
            rows={4}
            maxLength={2000}
            className={`${inputBase} resize-y`}
            placeholder={t('messagePlaceholder')}
          />
        </div>

        <AnimatePresence>
          {submitError && (
            <motion.div
              className="rounded-lg border border-red-200 bg-red-50 p-3"
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.35, ease: EASE }}>
              <p className="flex items-center gap-2 text-body-sm text-red-700" role="alert">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {submitError}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
          <Button type="submit" variant="primary" size="lg" icon={<ArrowRight className="h-4 w-4" />} iconRight>
            {loading ? 'Sending...' : t('send')}
          </Button>
          <p className="text-body-sm text-black/50">{t('trustCopy')}</p>
        </div>

        <p className="text-xs text-black/40">
          {t('policyText')}
          <a href="#" className="underline hover:text-black">
            {t('policyLink')}
          </a>
        </p>
      </div>
    </form>
  );
}
