import { Counter, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';

import type { TIngredient } from '@/types';

import styles from './ingredients-card.module.css';

type TIngredientsCardProps = {
  ingredient: TIngredient;
  count?: number;
  onClick?: () => void;
};

export const IngredientsCard = ({
  ingredient,
  count,
  onClick,
}: TIngredientsCardProps): React.JSX.Element => {
  return (
    <section className={styles.ingredients_card} onClick={onClick}>
      <img
        className={`${styles.image} ml-4 mr-4`}
        src={ingredient.image}
        alt={ingredient.name}
      />
      <div className={`${styles.price} text text_type_digits-default`}>
        {ingredient.price}
        <CurrencyIcon type="primary" />
      </div>
      <h3 className="text text_type_main-default">{ingredient.name}</h3>
      {count && <Counter count={count} size="default" extraClass={styles.counter} />}
    </section>
  );
};
