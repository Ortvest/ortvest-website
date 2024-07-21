import { Order } from '@shared/interfaces/Order.interfaces';

import axios from 'axios';

const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_APP;

export const contactApi = {
  createOrder: async (order: Order) => {
    return await axios
      .post(`${backendUrl}/orders/new`, order, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          mode: 'cors',
        },
      })
      .then((response) => response.data);
  },
};
