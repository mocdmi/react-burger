import { useGetIngredientsByIds } from '@/hooks/use-get-ingredients-by-ids';
import { useGetOrderSum } from '@/hooks/use-get-order-sum';
import {
  CurrencyIcon,
  FormattedDate,
} from '@krgaa/react-developer-burger-ui-components';

import type { TOrdersHistory } from '@/types';

import styles from './orders-history-card.module.css';

type TOrdersHistoryCard = {
  order: TOrdersHistory;
  onClick?: () => void;
};

export const OrdersHistoryCard = ({
  order,
  onClick,
}: TOrdersHistoryCard): React.JSX.Element => {
  const { name, number, createdAt, ingredients: ingredientsIds } = order;
  const { ingredients, isLoading } = useGetIngredientsByIds(ingredientsIds);
  const sum = useGetOrderSum(ingredients);

  return (
    <section className={`${styles.orders_history_card} p-6`} onClick={onClick}>
      <div className={`${styles.number} text text_type_digits-default`}>#{number}</div>
      <FormattedDate
        date={new Date(createdAt)}
        className={`${styles.date} text text_type_main-small text_color_inactive`}
      />
      <h3 className={`${styles.name} text text_type_main-medium`}>{name}</h3>
      <div className={styles.ingredients_images}>
        {isLoading ? (
          <span className="text text_type_main-small">Загрузка...</span>
        ) : (
          ingredients.map(({ _id, image }) => (
            <div key={_id} className={styles.ingredient_image}>
              <img src={image} alt="" />
            </div>
          ))
        )}
      </div>
      <div className={styles.sum}>
        <span className="text text_type_digits-default">{sum}</span>
        <CurrencyIcon type="primary" />
      </div>
    </section>
  );
};
