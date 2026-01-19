import { Link } from 'react-router-dom';

import type { TOrder } from '@/orders-history.mock';
import type { ReactNode } from 'react';

import styles from './feed-orders.module.css';

type TFeedOrdersProps = {
  orders: TOrder[];
  renderOrderCard: (order: TOrder) => ReactNode;
};

export const FeedOrders = ({
  orders,
  renderOrderCard,
}: TFeedOrdersProps): React.JSX.Element => {
  return (
    <div className={`${styles.feed_orders} mb-10`}>
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
