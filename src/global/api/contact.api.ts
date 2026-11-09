import type { ContactFormField, DynamicContactOrder, Order } from '@shared/interfaces/Order.interfaces';

/** Always use internal API route. Server proxies to external backend when configured. */
const apiUrl = '/api/contact';

export const contactApi = {
  getFields: async (): Promise<ContactFormField[]> => {
    const response = await fetch(apiUrl, { method: 'GET', cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`Could not load contact fields (${response.status})`);
    }
    const result = (await response.json()) as { fields?: ContactFormField[] | null };
    if (!Array.isArray(result.fields)) throw new Error('Missing CMS form schema');
    return result.fields;
  },

  createOrder: async (order: Order | DynamicContactOrder) => {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return response.json();
  },
};
