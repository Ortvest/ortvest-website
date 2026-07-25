export const CONTACT_PROJECT_TYPES = ['p2p', 'community', 'logistics', 'other'] as const;
export const CONTACT_BUDGET_OPTIONS = ['10k25k', '25k50k', '50k100k', '100k', 'unsure'] as const;
export const CONTACT_CONSULTATION_OPTIONS = ['discovery', 'strategy'] as const;

export type ContactProjectType = (typeof CONTACT_PROJECT_TYPES)[number];
export type ContactBudgetOption = (typeof CONTACT_BUDGET_OPTIONS)[number];
export type ContactConsultationOption = (typeof CONTACT_CONSULTATION_OPTIONS)[number];

export function isContactProjectType(value: unknown): value is ContactProjectType {
  return typeof value === 'string' && CONTACT_PROJECT_TYPES.some((option) => option === value);
}

export function isContactBudgetOption(value: unknown): value is ContactBudgetOption {
  return typeof value === 'string' && CONTACT_BUDGET_OPTIONS.some((option) => option === value);
}

export function isContactConsultationOption(value: unknown): value is ContactConsultationOption {
  return typeof value === 'string' && CONTACT_CONSULTATION_OPTIONS.some((option) => option === value);
}
