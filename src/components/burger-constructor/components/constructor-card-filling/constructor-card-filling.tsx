import { ConstructorElement } from '@krgaa/react-developer-burger-ui-components';

import type { TConstructorIngredient } from '@/types';

import styles from './constructor-card-filling.module.css';

type TConstructorCardFillingProps = {
  ingredient: TConstructorIngredient;
};

export const ConstructorCardFilling = ({
  ingredient,
}: TConstructorCardFillingProps): React.JSX.Element => {
  return (
    <ConstructorElement
      price={ingredient.price}
      text={ingredient.name}
      thumbnail={ingredient.image}
      extraClass={styles.constructor_element_custom}
    />
  );
};
