import { FeedOrdersHistory } from '@/components/feed-orders-history/feed-orders-history';
import { FeedSummary } from '@/components/feed-summary/feed-summary';
import { OrdersHistoryCard } from '@/components/orders-history-card/orders-history-card';
import { useAppSelector } from '@/services/hooks/use-app-selector';
import {
  allOrdersHistory,
  isOrdersHistoryWsConnected,
  isOrdersHistoryWsMessageLoading,
  totalOrdersHistory,
  totalTodayOrdersHistory,
} from '@/services/selectors/all-orders-history-selectors';
import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';

import styles from './feed.module.css';

export const FeedPage = (): React.JSX.Element => {
  const orders = useAppSelector(allOrdersHistory);
  const totalTodayOrders = useAppSelector(totalTodayOrdersHistory);
  const totalOrders = useAppSelector(totalOrdersHistory);
  const isConnected = useAppSelector(isOrdersHistoryWsConnected);
  const isMessageLoading = useAppSelector(isOrdersHistoryWsMessageLoading);
  const navigate = useNavigate();

  return (
    <section className={styles.feed}>
      <h1 className="text text_type_main-large mt-10 mb-5 pl-5">Лента заказов</h1>
      <div className={`${styles.content} pl-5 pr-5`}>
        {!isConnected || isMessageLoading ? (
          <div className={styles.preloader}>
            <Preloader />
          </div>
        ) : orders.length === 0 ? (
          <span className="text text_type_main-small">Заказов нет</span>
        ) : (
          <>
            <FeedOrdersHistory
              orders={orders}
              renderOrdersHistoryCard={(order) => (
                <OrdersHistoryCard
                  key={order._id}
                  order={order}
                  onClick={() => {
                    void navigate(`/feed/${order._id}?modal=true`);
                  }}
                />
              )}
            />
            <FeedSummary
              orders={orders}
              totalTodayOrders={totalTodayOrders}
              totalOrders={totalOrders}
            />
          </>
        )}
      </div>
    </section>
  );
};
