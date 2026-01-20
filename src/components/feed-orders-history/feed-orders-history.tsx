import { Link } from 'react-router-dom';

import type { TOrder } from '@/orders-history.mock';
import type { ReactNode } from 'react';

import styles from './feed-orders-history.module.css';

type TFeedOrdersHistoryProps = {
  orders: TOrder[];
  renderOrderCard: (order: TOrder) => ReactNode;
};

export const FeedOrdersHistory = ({
  orders,
  renderOrderCard,
}: TFeedOrdersHistoryProps): React.JSX.Element => {
  return (
    <div className={`${styles.feed_orders_history} mb-10`}>
      <div className={`${styles.scrolled} custom-scroll`}>
        {orders.map((order) => (
          <Link
            key={order._id}
            to={`/feed/${order._id}`}
            className={styles.details_link}
          >
            {renderOrderCard(order)}
          </Link>
        ))}
      </div>
    </div>
  );
};
