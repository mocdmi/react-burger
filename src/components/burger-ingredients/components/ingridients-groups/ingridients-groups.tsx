import { INGREDIENTS_GROUP_TYPE } from '../../const';

import type { TIngredient, TIngredientsGroupType } from '@/types';
import type { ReactNode } from 'react';

type IngredientsGroupsProps = {
  groupedIngredients: Record<TIngredientsGroupType, TIngredient[]>;
  renderGroup: ({
    ingredientsGroupType,
    ingredients,
  }: {
    ingredientsGroupType: TIngredientsGroupType;
    ingredients: TIngredient[];
  }) => ReactNode;
};

export const IngredientsGroups = ({
  groupedIngredients,
  renderGroup,
}: IngredientsGroupsProps): React.JSX.Element => {
  return (
    <>
      {(Object.keys(INGREDIENTS_GROUP_TYPE) as TIngredientsGroupType[]).map(
        (ingredientsGroupType) => {
          return (
            <div key={ingredientsGroupType}>
              {renderGroup({
                ingredientsGroupType,
                ingredients: groupedIngredients[ingredientsGroupType],
              })}
            </div>
          );
        }
      )}
    </>
  );
};
