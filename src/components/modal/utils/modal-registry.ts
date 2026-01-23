import { IngredientDetails } from '@/components/ingredient-details/ingridient-details';
import { OrderDetails } from '@/components/order-details/order-details';
import { OrdersHistoryDetails } from '@/components/orders-history-details/orders-history-details';

import type { ModalPayloadMap, TModalType } from '../types';

type TModalRegistry = {
  [K in TModalType]: React.ComponentType<{ payload: ModalPayloadMap[K] }>;
};

export const modalRegistry: TModalRegistry = {
  'ingredient-details': IngredientDetails,
  'order-details': OrderDetails,
  'orders-history-details': OrdersHistoryDetails,
};
