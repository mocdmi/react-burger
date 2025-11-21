import { forwardRef, type ReactNode } from 'react';

import { INGREDIENTS_GROUP_TYPE } from '../../const';

import type { TIngredient, TIngredientsGroupType } from '@/types';

import styles from './ingredients-group.module.css';

type TIngredientsGroupProps = {
  ingredientsGroupType: TIngredientsGroupType;
  ingredients: TIngredient[];
  renderIngredientCard: (ingridient: TIngredient) => ReactNode;
};

export const IngredientsGroup = forwardRef<HTMLElement, TIngredientsGroupProps>(
  (
    { ingredientsGroupType, ingredients, renderIngredientCard },
    ref
  ): React.JSX.Element => {
    return (
      <section ref={ref} data-type={ingredientsGroupType}>
        <h2 className="text text_type_main-medium pt-10 pb-6">
          {INGREDIENTS_GROUP_TYPE[ingredientsGroupType]}
        </h2>
        <div className={styles.ingredients}>
          {ingredients?.map((ingredient) => (
            <div key={ingredient._id}>{renderIngredientCard(ingredient)}</div>
          ))}
        </div>
      </section>
    );
  }
);

IngredientsGroup.displayName = 'IngredientsGroups';
