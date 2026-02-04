import { MODAL_CONTENT, SELECTORS } from '../selectors';

import type {
  TGetAllIngredientsResponse,
  TCreateOrderResponse,
  TUserResponse,
  TTokenRefreshResponse,
} from '@services/types';

describe('HomePage', () => {
  beforeEach(() => {
    cy.fixture<TGetAllIngredientsResponse>('ingredients.json').then(
      (ingredientsData) => {
        cy.intercept('GET', '**/api/ingredients', ingredientsData).as('getIngredients');
      }
    );

    cy.fixture<TCreateOrderResponse>('order.json').then((orderData) => {
      cy.intercept('POST', '**/api/orders', orderData).as('createOrder');
    });

    cy.fixture<TUserResponse>('user.json').then((userData) => {
      cy.intercept('GET', '**/api/auth/user', userData);
    });

    cy.fixture<TTokenRefreshResponse>('token.json').then((tokenData) => {
      cy.intercept('POST', '**/api/auth/token', tokenData);
    });

    cy.visit('/');
    cy.wait('@getIngredients');
  });

  describe('Перетаскивание ингредиентов', () => {
    it('должен добавить булку в конструктор при перетаскивании в drop zone', () => {
      cy.contains(SELECTORS.INGREDIENT_BUN).drag({
        position: SELECTORS.DROP_ZONE_BUN,
      });

      cy.contains(SELECTORS.INGREDIENT_BUN).should('exist');
    });

    it('должен добавить начинку в конструктор при перетаскивании в drop zone', () => {
      cy.contains(SELECTORS.INGREDIENT_FILLING).drag({
        position: SELECTORS.DROP_ZONE_FILLING,
      });

      cy.contains(SELECTORS.INGREDIENT_FILLING).should('exist');
    });

    it('должен добавить несколько ингредиентов в конструктор', () => {
      cy.contains(SELECTORS.INGREDIENT_BUN).drag({
        position: SELECTORS.DROP_ZONE_BUN,
      });
      cy.contains(SELECTORS.INGREDIENT_FILLING).drag({
        position: SELECTORS.DROP_ZONE_FILLING,
      });
      cy.contains(SELECTORS.INGREDIENT_SAUCE).drag({
        position: SELECTORS.DROP_ZONE_FILLING,
      });

      cy.contains(SELECTORS.INGREDIENT_BUN).should('exist');
      cy.contains(SELECTORS.INGREDIENT_FILLING).should('exist');
      cy.contains(SELECTORS.INGREDIENT_SAUCE).should('exist');
    });
  });

  describe('Модальное окно ингредиента', () => {
    beforeEach(() => {
      cy.contains(SELECTORS.INGREDIENT_FILLING).click();
      cy.get(SELECTORS.MODAL).as('ingredientModal');
    });

    it('должен открыть модальное окно с деталями ингредиента при клике', () => {
      cy.get('@ingredientModal').should('be.visible');
      cy.contains(MODAL_CONTENT.INGREDIENT_DETAILS_TITLE).should('be.visible');
    });

    it('должен отображать правильные данные ингредиента в модальном окне', () => {
      cy.get('@ingredientModal').within(() => {
        cy.contains(SELECTORS.INGREDIENT_FILLING).should('be.visible');
        cy.contains(MODAL_CONTENT.CALORIES).should('be.visible');
        cy.contains(MODAL_CONTENT.CALORIES_VALUE).should('be.visible');
        cy.contains(MODAL_CONTENT.PROTEINS).should('be.visible');
        cy.contains(MODAL_CONTENT.PROTEINS_VALUE).should('be.visible');
        cy.contains(MODAL_CONTENT.FAT).should('be.visible');
        cy.contains(MODAL_CONTENT.FAT_VALUE).should('be.visible');
        cy.contains(MODAL_CONTENT.CARBOHYDRATES).should('be.visible');
        cy.contains(MODAL_CONTENT.CARBOHYDRATES_VALUE).should('be.visible');
      });
    });

    it('должен закрыть модальное окно ингредиента при клике на кнопку закрытия', () => {
      cy.get(SELECTORS.MODAL_CLOSE).click();
      cy.get(SELECTORS.MODAL).should('not.exist');
    });
  });

  describe('Модальное окно заказа', () => {
    beforeEach(() => {
      cy.setCookie('accessToken', 'Bearer test-token');
      localStorage.setItem('refreshToken', 'test-refresh-token');
      cy.reload();
      cy.wait('@getIngredients');

      cy.contains(SELECTORS.INGREDIENT_BUN).drag({
        position: SELECTORS.DROP_ZONE_BUN,
      });
      cy.contains(SELECTORS.INGREDIENT_FILLING).drag({
        position: SELECTORS.DROP_ZONE_FILLING,
      });
    });

    it('должен открыть модальное окно заказа при клике на "Оформить заказ"', () => {
      cy.contains(SELECTORS.ORDER_BUTTON).click();
      cy.wait('@createOrder');

      cy.get(SELECTORS.MODAL).as('orderModal').should('be.visible');
      cy.contains(MODAL_CONTENT.ORDER_NUMBER).should('be.visible');
      cy.contains(MODAL_CONTENT.ORDER_ID_LABEL).should('be.visible');
    });

    it('должен закрыть модальное окно заказа при клике на кнопку закрытия', () => {
      cy.contains(SELECTORS.ORDER_BUTTON).click();
      cy.wait('@createOrder');
      cy.get(SELECTORS.MODAL).as('orderModal').should('be.visible');

      cy.get(SELECTORS.MODAL_CLOSE).click();
      cy.get(SELECTORS.MODAL).should('not.exist');
    });
  });
});
