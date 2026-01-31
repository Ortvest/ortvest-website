import { Order } from '@shared/interfaces/Order.interfaces';

import axios from 'axios';

/** Always use internal API route. Server proxies to external backend when configured. */
const apiUrl = '/api/contact';

export const contactApi = {
  createOrder: async (order: Order) => {
    const { data } = await axios.post(apiUrl, order, {
      headers: { 'Content-Type': 'application/json' },
    });
    return data;
  },
};
