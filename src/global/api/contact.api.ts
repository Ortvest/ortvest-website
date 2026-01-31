import { Order } from '@shared/interfaces/Order.interfaces';

import axios from 'axios';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_APP;
const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;

/** Use internal MongoDB API when no external backend is set */
const apiUrl = backendUrl ? `${backendUrl}/orders/new` : '/api/contact';

export const contactApi = {
  createOrder: async (order: Order) => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (backendUrl && accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }
    const { data } = await axios.post(apiUrl, order, { headers });
    return data;
  },
};
