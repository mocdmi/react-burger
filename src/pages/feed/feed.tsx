import { FeedSummary } from '@/components/feed-summary/feed-summary';
import { OrdersHistoryCard } from '@/components/orders-history-card/orders-history-card';
import { OrdersHistory } from '@/components/orders-history/orders-history';
import { useModalRoute } from '@/hooks/use-modal-route';
import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

import { useFeed } from './hooks/useFeed';

import styles from './feed.module.css';

export const FeedPage = (): React.JSX.Element => {
  const { orders, totalTodayOrders, totalOrders, isConnected, isMessageLoading } =
    useFeed();
  const navigate = useNavigate();
  const { id } = useParams();
  const { shouldShowOnlyOutlet } = useModalRoute();

  if (id && shouldShowOnlyOutlet) {
    return <Outlet />;
  }

  return (
    <>
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
              <OrdersHistory
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
      <Outlet />
    </>
  );
};
