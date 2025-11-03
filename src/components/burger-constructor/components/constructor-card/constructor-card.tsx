import { DragIcon } from '@krgaa/react-developer-burger-ui-components';

import { ConstructorCardBun } from '../constructor-card-bun/constructor-card-bun';
import { ConstructorCardFilling } from '../constructor-card-filling/constructor-card-filling';

import type { TConstructorCardProps } from '../../types';

import styles from './constructor-card.module.css';

export const ConstructorCard = ({
  ingredient,
  position,
}: TConstructorCardProps): React.JSX.Element => {
  return (
    <div className={`${styles.constructor_card} pl-8`}>
      {ingredient.type === 'bun' ? (
        <ConstructorCardBun ingredient={ingredient} position={position!} />
      ) : (
        <>
          <DragIcon type="primary" className={styles.drag_icon} />
          <ConstructorCardFilling ingredient={ingredient} />
        </>
      )}
    </div>
  );
};
