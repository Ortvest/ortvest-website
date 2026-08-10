import { Order } from '@shared/interfaces/Order.interfaces';

/** Always use internal API route. Server proxies to external backend when configured. */
const apiUrl = '/api/contact';

export const contactApi = {
  createOrder: async (order: Order) => {
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
