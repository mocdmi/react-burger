import { ConstructorElement } from '@krgaa/react-developer-burger-ui-components';

import type { TConstructorIngredient } from '@/types';

import styles from './constructor-card-bun.module.css';

type TConstructorCardBunProps = {
  ingredient: TConstructorIngredient;
  position: 'top' | 'bottom';
};

export const ConstructorCardBun = ({
  ingredient,
  position,
}: TConstructorCardBunProps): React.JSX.Element => {
  return (
    <ConstructorElement
      isLocked
      price={ingredient.price}
      text={ingredient.name}
      thumbnail={ingredient.image}
      type={position}
      extraClass={styles.constructor_element_custom}
    />
  );
};
