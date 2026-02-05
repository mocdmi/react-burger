import { describe, expect, it } from 'vitest';

import {
  ingredientsConstructorActions,
  ingredientsConstructorReducer,
} from '@services/slices/ingredients-constructor-slice.ts';

import type { TConstructorIngredient } from '@/types.ts';

const createMockIngredient = (
  overrides: Partial<TConstructorIngredient> = {}
): TConstructorIngredient => {
  return {
    _id: 'ingredient-1',
    name: 'Test Ingredient',
    type: 'main',
    proteins: 10,
    fat: 5,
    carbohydrates: 20,
    calories: 100,
    price: 50,
    image: 'image-url',
    image_large: 'image-large-url',
    image_mobile: 'image-mobile-url',
    __v: 0,
    uuid: 'uuid-1',
    ...overrides,
  };
};

describe('ingredientsConstructorReducer', () => {
  it('должен вернуть начальное состояние', () => {
    expect(ingredientsConstructorReducer(undefined, { type: '@@INIT' })).toEqual([]);
  });

  describe('addIngredient', () => {
    it('должен добавить ингредиент', () => {
      const ingredient = createMockIngredient({ uuid: 'uuid-1' });
      const nextState = ingredientsConstructorReducer(
        [],
        ingredientsConstructorActions.addIngredient(ingredient)
      );
      expect(nextState).toHaveLength(1);
      expect(nextState[0]).toEqual(ingredient);
    });
  });

  describe('moveIngredient', () => {
    it('должен переместить ингредиент', () => {
      const ing1 = createMockIngredient({ uuid: 'uuid-1', name: 'First' });
      const ing2 = createMockIngredient({ uuid: 'uuid-2', name: 'Second' });
      const startState = [ing1, ing2];
      const nextState = ingredientsConstructorReducer(
        startState,
        ingredientsConstructorActions.moveIngredient({
          draggedIndex: 0,
          hoveredIndex: 1,
        })
      );
      expect(nextState[0].name).toBe('Second');
    });
  });

  describe('reset', () => {
    it('должен сбросить состояние', () => {
      const ing1 = createMockIngredient({ uuid: 'uuid-1' });
      const startState = [ing1];
      const nextState = ingredientsConstructorReducer(
        startState,
        ingredientsConstructorActions.reset()
      );
      expect(nextState).toEqual([]);
    });
  });

  describe('replaceIngredient', () => {
    it('должен заменить ингредиент по индексу', () => {
      const ing1 = createMockIngredient({ uuid: 'uuid-1', name: 'Old Ingredient' });
      const ing2 = createMockIngredient({ uuid: 'uuid-2', name: 'New Ingredient' });
      const startState = [ing1];
      const nextState = ingredientsConstructorReducer(
        startState,
        ingredientsConstructorActions.replaceIngredient({
          index: 0,
          ingredient: ing2,
        })
      );
      expect(nextState).toHaveLength(1);
      expect(nextState[0].name).toBe('New Ingredient');
    });
  });

  describe('deleteIngredient', () => {
    it('должен удалить ингредиент по индексу', () => {
      const ing1 = createMockIngredient({ uuid: 'uuid-1', name: 'First' });
      const ing2 = createMockIngredient({ uuid: 'uuid-2', name: 'Second' });
      const startState = [ing1, ing2];
      const nextState = ingredientsConstructorReducer(
        startState,
        ingredientsConstructorActions.deleteIngredient({ index: 0 })
      );
      expect(nextState).toHaveLength(1);
      expect(nextState[0].name).toBe('Second');
    });
  });
});
