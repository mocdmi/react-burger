import type { TOrder } from '../order-details/types';
import type { TIngredient, TOrdersHistory } from '@/types';

export type TModalType =
  | 'ingredient-details'
  | 'order-details'
  | 'orders-history-details';

export type ModalPayloadMap = {
  'ingredient-details': TIngredient;
  'order-details': TOrder;
  'orders-history-details': TOrdersHistory;
};

export type TOpenArgs<T extends TModalType> = {
  modalType: TModalType;
  payload?: ModalPayloadMap[T];
  onClose?: () => void;
};
