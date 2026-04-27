export interface Order {
  clientEmail: string;
  clientName: string;
  productDescription: string;
  selectedServices: string[];
  budget?: string;
  consultationType?: string;
}
