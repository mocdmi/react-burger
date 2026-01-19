import { OrderHistoryDetails } from '@/components/order-history-details/order-history-details';
import { OrderIngredientsCard } from '@/components/order-ingredients-card/order-ingredients-card';
import { ordersHistory } from '@/orders-history.mock';

import styles from './feed-details.module.css';

export const FeedDetailsPage = (): React.JSX.Element => {
  return (
    <section className={styles.feed_details}>
      <div className={styles.content}>
        <OrderHistoryDetails
          order={ordersHistory[0]}
          renderOrderCard={(ingredient) => (
            <OrderIngredientsCard key={ingredient._id} ingredient={ingredient} />
          )}
        />
      </div>
    </section>
  );
};
