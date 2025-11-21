import { ConstructorElement } from '@krgaa/react-developer-burger-ui-components';

import type { TConstructorIngredient } from '@/types';

import styles from './constructor-card-filling.module.css';

type TConstructorCardFillingProps = {
  ingredient: TConstructorIngredient;
  onDelete: () => void;
};

export const ConstructorCardFilling = ({
  ingredient,
  onDelete,
}: TConstructorCardFillingProps): React.JSX.Element => {
  return (
    <ConstructorElement
      price={ingredient.price}
      text={ingredient.name}
      thumbnail={ingredient.image}
      extraClass={styles.constructor_element_custom}
      handleClose={onDelete}
    />
  );
};
