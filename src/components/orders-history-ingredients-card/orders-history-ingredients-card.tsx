import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';

import type { TIngredient } from '@/types';

import styles from './orders-history-ingredients-card.module.css';

type TOrdersIngredientsCardProps = {
  ingredient: TIngredient & { count: number };
};

export const OrdersHistoryIngredientsCard = ({
  ingredient,
}: TOrdersIngredientsCardProps): React.JSX.Element => {
  const { image, name, price, count } = ingredient;

  return (
    <section className={styles.orders_ingredients_card}>
      <div className={styles.ingredient_image}>
        <img src={image} alt="" />
      </div>
      <h3 className={`${styles.name} text text_type_main-default`}>{name}</h3>
      <div className={styles.sum}>
        <span className="text text_type_digits-default">
          {count} x {price}
        </span>
        <CurrencyIcon type="primary" />
      </div>
    </section>
  );
};
