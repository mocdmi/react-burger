import { ORDER_HISTORY_STATUS_MAP, type TOrdersHistory } from '@/types';
import {
  CurrencyIcon,
  FormattedDate,
} from '@krgaa/react-developer-burger-ui-components';

import { useOrderHistoryCard } from './hooks/useOrderHistoryCard';

import styles from './orders-history-card.module.css';

type TOrdersHistoryCard = {
  order: TOrdersHistory;
  isShowStatus?: boolean;
  onClick?: () => void;
};

export const OrdersHistoryCard = ({
  order,
  isShowStatus = false,
  onClick,
}: TOrdersHistoryCard): React.JSX.Element => {
  const { isLoading, name, number, status, createdAt, ingredients, moreCount, total } =
    useOrderHistoryCard(order);

  return (
    <section className={`${styles.orders_history_card} p-6`} onClick={onClick}>
      <div className={`${styles.number} text text_type_digits-default`}>#{number}</div>
      <FormattedDate
        date={new Date(createdAt)}
        className={`${styles.date} text text_type_main-small text_color_inactive`}
      />
      <h3 className={`${styles.name} text text_type_main-medium`}>{name}</h3>
      {isShowStatus && (
        <div className={`${styles.status} ${styles[status]} text text_type_main-small`}>
          {ORDER_HISTORY_STATUS_MAP[status]}
        </div>
      )}
      <div className={styles.ingredients_images}>
        {isLoading ? (
          <span className="text text_type_main-small">Загрузка...</span>
        ) : (
          ingredients.map((ingredient, index) => {
            const isLast = index === ingredients.length - 1;
            return (
              <div
                key={`${ingredient._id}_${index}`}
                className={styles.ingredient_image}
              >
                <img src={ingredient.image} alt="" />
                {isLast && moreCount > 0 && (
                  <div
                    className={`${styles.ingredient_more} text text_type_digits-default`}
                  >
                    {`+${moreCount}`}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
      <div className={styles.total}>
        <span className="text text_type_digits-default">{total}</span>
        <CurrencyIcon type="primary" />
      </div>
    </section>
  );
};
