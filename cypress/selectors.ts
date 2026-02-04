export const SELECTORS = {
  MODAL: '[data-cy="modal"]' as const,
  MODAL_CLOSE: '[data-cy="modal-close"]' as const,
  DROP_ZONE_BUN: '[data-cy="drop-zone-bun"]' as const,
  DROP_ZONE_FILLING: '[data-cy="drop-zone-filling"]' as const,
  INGREDIENT_BUN: 'Краторная булка N-200i' as const,
  INGREDIENT_FILLING: 'Биокотлета из марсианской Магнолии' as const,
  INGREDIENT_SAUCE: 'Соус Spicy-X' as const,
  ORDER_BUTTON: 'Оформить заказ' as const,
};

export const MODAL_CONTENT = {
  CALORIES: 'Калории,ккал',
  CALORIES_VALUE: '4242',
  PROTEINS: 'Белки, г',
  PROTEINS_VALUE: '420',
  FAT: 'Жиры, г',
  FAT_VALUE: '142',
  CARBOHYDRATES: 'Углеводы, г',
  CARBOHYDRATES_VALUE: '242',
  ORDER_NUMBER: '12345',
  ORDER_ID_LABEL: 'идентификатор заказа',
  INGREDIENT_DETAILS_TITLE: 'Детали ингредиента',
} as const;
