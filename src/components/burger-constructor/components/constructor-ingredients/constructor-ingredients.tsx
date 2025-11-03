import { Fragment } from 'react';

import type { TConstructorCardProps } from '../../types';
import type { TConstructorIngredient } from '@/types';
import type React from 'react';
import type { ReactNode } from 'react';

import styles from './constructor-ingredients.module.css';

type TConstructorIngredientsProps = {
  bun: TConstructorIngredient | null;
  filling: TConstructorIngredient[];
  renderCard: ({ ingredient, position }: TConstructorCardProps) => ReactNode;
};

export const ConstructorIngredients = ({
  bun,
  filling,
  renderCard,
}: TConstructorIngredientsProps): React.JSX.Element => {
  return (
    <div className={styles.constructor_ingredients}>
      {bun && renderCard({ ingredient: bun, position: 'top' })}

      {filling.length > 0 && (
        <div className={`${styles.filling} custom-scroll`}>
          {filling.map((ingredient) => (
            <Fragment key={ingredient.instanceId}>{renderCard({ ingredient })}</Fragment>
          ))}
        </div>
      )}

      {bun && renderCard({ ingredient: bun, position: 'bottom' })}
    </div>
  );
};
