import { getTranslations } from 'next-intl/server';

import { Container, SectionReveal } from '@shared/components';

import { ContactForm } from '@modules/Contact/layout/Form';

const STEP_KEYS = ['1', '2', '3', '4'] as const;
const TRUST_KEYS = ['reply', 'nospam', 'call'] as const;

export async function Contact() {
  const t = await getTranslations('contact');

  return (
    <section id="contact" className="section-padding bg-black" aria-labelledby="contact-heading">
      <Container>
        <SectionReveal direction="left">
          <div className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/40">{t('label')}</p>
              <h2 id="contact-heading" className="text-h1 font-extrabold leading-tight text-white">
                {t('title')}
              </h2>
            </div>
            <div className="max-w-xs lg:pt-2">
              <p className="text-body-sm leading-relaxed text-white/50">{t('subtitle')}</p>
              <p className="mt-4 font-mono text-xs text-white/35">
                {TRUST_KEYS.map((key) => t(`trust.${key}`)).join(' · ')}
              </p>
            </div>
          </div>

          <div className="grid gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-16">
            <div className="flex flex-col lg:justify-end">
              <div className="divide-y divide-white/10">
                <p className="pb-5 text-xs uppercase tracking-widest text-white/40">{t('steps.label')}</p>

                {STEP_KEYS.map((key, index) => (
                  <div key={key} className="flex items-start gap-4 py-5">
                    <div
                      className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                        index === 0 ? 'bg-accent text-black' : 'border border-white/20 text-white/50'
                      }`}>
                      {key}
                    </div>
                    <div>
                      <p className="mb-1 text-[15px] font-semibold text-white">{t(`steps.${key}.title`)}</p>
                      <p className="text-body-sm leading-relaxed text-white/50">{t(`steps.${key}.desc`)}</p>
                    </div>
                  </div>
                ))}

                <p className="pt-6 text-sm text-white/50">
                  {t('preferEmail')}{' '}
                  <a href="mailto:contact@ortvest.com" className="font-medium text-white underline underline-offset-2">
                    contact@ortvest.com
                  </a>
                </p>
              </div>
            </div>

            <ContactForm />
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
