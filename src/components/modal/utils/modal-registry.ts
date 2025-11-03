import { IngredientDetails } from '../../ingredient-details/ingridient-details';
import { OrderDetails } from '../../order-details/order-details';

import type { ModalPayloadMap, TModalType } from '../types';

type TModalRegistry = {
  [K in TModalType]: React.ComponentType<{ payload: ModalPayloadMap[K] }>;
};

export const modalRegistry: TModalRegistry = {
  'ingredient-details': IngredientDetails,
  'order-details': OrderDetails,
};
