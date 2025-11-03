import { INGREDIENTS_GROUP_TYPE } from '../../const';

import type { TIngredient, TIngredientsGroupType } from '@/types';
import type { ReactNode } from 'react';

import styles from './ingredients-group.module.css';

type TIngredientsGroupProps = {
  ingredientsGroupType: TIngredientsGroupType;
  ingredients: TIngredient[];
  renderIngredientCard: (ingridient: TIngredient) => ReactNode;
};

export const IngredientsGroup = ({
  ingredientsGroupType,
  ingredients,
  renderIngredientCard,
}: TIngredientsGroupProps): React.JSX.Element => {
  return (
    <section>
      <h2 className="text text_type_main-medium mt-10 mb-6">
        {INGREDIENTS_GROUP_TYPE[ingredientsGroupType]}
      </h2>
      <div className={styles.ingredients}>
        {ingredients?.map((ingredient) => (
          <div key={ingredient._id}>{renderIngredientCard(ingredient)}</div>
        ))}
      </div>
    </section>
  );
};
