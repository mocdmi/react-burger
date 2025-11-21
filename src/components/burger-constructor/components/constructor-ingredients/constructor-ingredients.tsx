import { useIngredientDrop } from '@/hooks/use-ingredient-drop';
import { Fragment } from 'react';

import { DropZone } from '../drop-zone/drop-zone';

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

export const BunDropZone = ({ isOver }: { isOver: boolean }): React.JSX.Element => {
  return <DropZone text="Переместите сюда булку" variant="bun" isOver={isOver} />;
};

export const FillingDropZone = ({ isOver }: { isOver: boolean }): React.JSX.Element => {
  return <DropZone text="Переместите сюда ингредиенты" isOver={isOver} />;
};

export const ConstructorIngredients = ({
  bun,
  filling,
  renderCard,
}: TConstructorIngredientsProps): React.JSX.Element => {
  const { dropRef, isOver } = useIngredientDrop();

  return (
    <div
      ref={dropRef as unknown as React.Ref<HTMLDivElement>}
      className={styles.constructor_ingredients}
    >
      {bun && renderCard({ ingredient: bun, position: 'top' })}

      {filling.length > 0 ? (
        <>
          {!bun && <BunDropZone isOver={isOver} />}

          <div className={`${styles.filling} custom-scroll`}>
            {filling.map((ingredient) => (
              <Fragment key={ingredient.uuid}>{renderCard({ ingredient })}</Fragment>
            ))}
          </div>

          {!bun && <BunDropZone isOver={isOver} />}
        </>
      ) : (
        <FillingDropZone isOver={isOver} />
      )}

      {bun && renderCard({ ingredient: bun, position: 'bottom' })}
    </div>
  );
};
