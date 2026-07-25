import type { ContactBudgetOption, ContactConsultationOption } from '@lib/contact-options';

export interface Order {
  clientEmail: string;
  clientName: string;
  productDescription: string;
  selectedServices: string[];
  budget?: ContactBudgetOption | '';
  consultationType?: ContactConsultationOption | '';
}
