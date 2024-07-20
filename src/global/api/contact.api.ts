import { Order } from '@shared/interfaces/Order.interfaces';

import { baseApi } from './base.api';

export const contactApi = {
  addOrder: (orderData: Order) => {
    return baseApi.post('/orders/new', orderData).then((response) => response.data);
  },
};
