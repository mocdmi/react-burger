import type { TIngredient } from '@/types';

export type TModalType = 'ingredient-details' | 'order-details';

export type ModalPayloadMap = {
  'ingredient-details': TIngredient;
  'order-details': undefined;
};

export type TOpenArgs<T extends TModalType> = {
  modalType: TModalType;
  payload?: ModalPayloadMap[T];
};
