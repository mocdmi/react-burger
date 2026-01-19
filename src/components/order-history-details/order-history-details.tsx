import {
  CurrencyIcon,
  FormattedDate,
} from '@krgaa/react-developer-burger-ui-components';

import type { TOrder, TOrderIngredient } from '@/orders-history.mock';
import type { ReactNode } from 'react';

// eslint-disable-next-line css-modules/no-unused-class
import styles from './order-history-details.module.css';

type TOrderHistoryDetailsProps = {
  order: TOrder;
  renderOrderCard: (ingredient: TOrderIngredient) => ReactNode;
};

export const OrderHistoryDetails = ({
  order,
  renderOrderCard,
}: TOrderHistoryDetailsProps): React.JSX.Element => {
  return (
    <section className={styles.order_history_details}>
      <div className={`${styles.number} text text_type_digits-default mb-10`}>
        #{order.number}
      </div>
      <h1 className={`${styles.name} text text_type_main-medium mb-3`}>{order.name}</h1>
      <div
        className={`${styles.status} ${styles[order.status]} text text_type_main-small mb-15`}
      >
        {order.status}
      </div>
      <h2 className={`${styles.ingredients_title} text text_type_main-medium mb-6`}>
        Состав:
      </h2>
      <div className={`${styles.ingredients} mb-10`}>
        <ul className={`${styles.scrolled} custom-scroll`}>
          {order.ingredients.map((ingredient) => renderOrderCard(ingredient))}
        </ul>
      </div>
      <FormattedDate
        date={order.date}
        className={`${styles.date} text text_type_main-small text_color_inactive`}
      />
      <div className={styles.sum}>
        <span className="text text_type_digits-default">{order.sum}</span>
        <CurrencyIcon type="primary" />
      </div>
    </section>
  );
};
