import { OrdersHistoryIngredientsCard } from '@/components/orders-history-ingredients-card/orders-history-ingredients-card';
import { useGetIngredientsByIds } from '@/hooks/use-get-ingredients-by-ids';
import { useGetOrderSum } from '@/hooks/use-get-order-sum';
import { ORDER_HISTORY_STATUS_MAP, type TOrdersHistory } from '@/types';
import {
  CurrencyIcon,
  FormattedDate,
} from '@krgaa/react-developer-burger-ui-components';

// eslint-disable-next-line css-modules/no-unused-class
import styles from './orders-history-details.module.css';

type TOrderHistoryDetailsProps = {
  payload: TOrdersHistory;
  numberCenter?: boolean;
};

export const OrdersHistoryDetails = ({
  payload,
  numberCenter,
}: TOrderHistoryDetailsProps): React.JSX.Element => {
  const { number, name, status, createdAt, ingredients: ingredientsIds } = payload;
  const { ingredients } = useGetIngredientsByIds(ingredientsIds);
  const sum = useGetOrderSum(ingredients);

  return (
    <section className={`${styles.orders_history_details} pt-10 pb-15 pl-10 pr-10`}>
      <div
        className={`${styles.number} ${numberCenter ? styles.number_center : ''} text text_type_digits-default mb-10`}
      >
        #{number}
      </div>
      <h1 className={`${styles.name} text text_type_main-medium mb-3`}>{name}</h1>
      <div
        className={`${styles.status} ${styles[status]} text text_type_main-small mb-15`}
      >
        {ORDER_HISTORY_STATUS_MAP[status]}
      </div>
      <h2 className={`${styles.ingredients_title} text text_type_main-medium mb-6`}>
        Состав:
      </h2>
      <div className={`${styles.ingredients} mb-10`}>
        <ul className={`${styles.scrolled} custom-scroll`}>
          {ingredients.map((ingredient) => (
            <OrdersHistoryIngredientsCard key={ingredient._id} ingredient={ingredient} />
          ))}
        </ul>
      </div>
      <FormattedDate
        date={new Date(createdAt)}
        className={`${styles.date} text text_type_main-small text_color_inactive`}
      />
      <div className={styles.sum}>
        <span className="text text_type_digits-default">{sum}</span>
        <CurrencyIcon type="primary" />
      </div>
    </section>
  );
};
