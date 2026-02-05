import { SELECTORS } from '../selectors';

/* eslint-disable */

export {};

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      drag(options?: { target?: string }): Chainable<Subject>;
      loginAsAuthUser(): Chainable<void>;
      dragIngredient(ingredientName: string, dropZoneSelector: string): Chainable<void>;
      openIngredientModal(ingredientName: string): Chainable<void>;
      closeModal(): Chainable<void>;
      createOrder(): Chainable<void>;
    }
  }
}

Cypress.Commands.add(
  'drag',
  { prevSubject: true },
  (subject, options?: { target?: string }) => {
    const draggable = subject[0];
    const dataTransfer = new DataTransfer();

    const dragStartEvent = new DragEvent('dragstart', {
      bubbles: true,
      cancelable: true,
      dataTransfer,
    });
    const dragOverEvent = new DragEvent('dragover', {
      bubbles: true,
      cancelable: true,
      dataTransfer,
    });
    const dropEvent = new DragEvent('drop', {
      bubbles: true,
      cancelable: true,
      dataTransfer,
    });

    Object.defineProperty(dragStartEvent, 'dataTransfer', {
      value: dataTransfer,
    });
    Object.defineProperty(dragOverEvent, 'dataTransfer', {
      value: dataTransfer,
    });
    Object.defineProperty(dropEvent, 'dataTransfer', {
      value: dataTransfer,
    });

    draggable.dispatchEvent(dragStartEvent);

    const dropTargetSelector = options?.target || SELECTORS.DROP_ZONE_FILLING;
    const dropZone = Cypress.$(dropTargetSelector)[0];
    if (dropZone) {
      dropZone.dispatchEvent(dragOverEvent);
      dropZone.dispatchEvent(dropEvent);
    }

    draggable.dispatchEvent(new DragEvent('dragend', { bubbles: true }));

    return subject;
  }
);

Cypress.Commands.add('loginAsAuthUser', () => {
  cy.setCookie('accessToken', 'Bearer test-token');
  localStorage.setItem('refreshToken', 'test-refresh-token');
  cy.reload();
});

Cypress.Commands.add(
  'dragIngredient',
  (ingredientName: string, dropZoneSelector: string) => {
    cy.contains(ingredientName).drag({ target: dropZoneSelector });
  }
);

Cypress.Commands.add('openIngredientModal', (ingredientName: string) => {
  cy.contains(ingredientName).click();
  cy.get(SELECTORS.MODAL);
});

Cypress.Commands.add('closeModal', () => {
  cy.get(SELECTORS.MODAL_CLOSE).click();
  cy.get(SELECTORS.MODAL).should('not.exist');
});

Cypress.Commands.add('createOrder', () => {
  cy.contains(SELECTORS.ORDER_BUTTON).click();
});
