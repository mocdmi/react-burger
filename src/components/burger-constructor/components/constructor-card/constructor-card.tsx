import { useConstructorCardDnd } from '@/hooks/use-constructor-card-dnd';
import { DragIcon } from '@krgaa/react-developer-burger-ui-components';

import { useConstructorCardActions } from '../../hooks/use-constructor-card-actions';
import { ConstructorCardBun } from '../constructor-card-bun/constructor-card-bun';
import { ConstructorCardFilling } from '../constructor-card-filling/constructor-card-filling';

import type { TConstructorCardProps } from '../../types';

import styles from './constructor-card.module.css';

export const ConstructorCard = ({
  ingredient,
  position,
}: TConstructorCardProps): React.JSX.Element => {
  const { connectRef } = useConstructorCardDnd(ingredient);
  const { handleDeleteClick } = useConstructorCardActions(ingredient);

  return (
    <div ref={connectRef} className={`${styles.constructor_card} pl-8`}>
      {ingredient.type === 'bun' ? (
        <ConstructorCardBun ingredient={ingredient} position={position!} />
      ) : (
        <>
          <DragIcon type="primary" className={styles.drag_icon} />
          <ConstructorCardFilling ingredient={ingredient} onDelete={handleDeleteClick} />
        </>
      )}
    </div>
  );
};
