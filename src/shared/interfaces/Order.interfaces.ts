import type { ContactBudgetOption, ContactConsultationOption } from '@lib/contact-options';

export interface Order {
  clientEmail: string;
  clientName: string;
  productDescription: string;
  selectedServices: string[];
  budget?: ContactBudgetOption | '';
  consultationType?: ContactConsultationOption | '';
}

export type ContactFormFieldType = 'text' | 'email' | 'number' | 'date' | 'textarea';

export interface ContactFormField {
  id: string;
  value: string;
  key: string;
  label: string;
  type: ContactFormFieldType;
  required: boolean;
}

export interface DynamicContactOrder {
  source?: string;
  fields: Record<string, string>;
}
