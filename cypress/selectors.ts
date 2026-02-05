export const SELECTORS = {
  MODAL: '[data-cy="modal"]',
  MODAL_CLOSE: '[data-cy="modal-close"]',
  DROP_ZONE_BUN: '[data-cy="drop-zone-bun"]',
  DROP_ZONE_FILLING: '[data-cy="drop-zone-filling"]',
  INGREDIENT_BUN: 'Краторная булка N-200i',
  INGREDIENT_FILLING: 'Биокотлета из марсианской Магнолии',
  INGREDIENT_SAUCE: 'Соус Spicy-X',
  ORDER_BUTTON: 'Оформить заказ',
  ORDER_TOTAL: '3024',
} as const;

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
