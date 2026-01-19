import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';

import type { TOrderIngredient } from '@/orders-history.mock';

import styles from './order-ingredients-card.module.css';

type TOrderIngredientsCardProps = {
  ingredient: TOrderIngredient;
};

export const OrderIngredientsCard = ({
  ingredient,
}: TOrderIngredientsCardProps): React.JSX.Element => {
  return (
    <section className={styles.order_ingredients_card}>
      <div className={styles.ingredient_image}>
        <img src={ingredient.image} alt="" />
      </div>
      <h3 className={`${styles.name} text text_type_main-default`}>{ingredient.name}</h3>
      <div className={styles.sum}>
        <span className="text text_type_digits-default">
          {ingredient.total} x {ingredient.price}
        </span>
        <CurrencyIcon type="primary" />
      </div>
    </section>
  );
};
