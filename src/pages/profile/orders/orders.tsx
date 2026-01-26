import { OrdersHistoryCard } from '@/components/orders-history-card/orders-history-card';
import { OrdersHistory } from '@/components/orders-history/orders-history';
import { useModalRoute } from '@/hooks/use-modal-route';
import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

import { useOrders } from './hooks/useOrders';

import styles from './orders.module.css';

export const OrdersPage = (): React.JSX.Element => {
  const { isConnected, isMessageLoading, orders } = useOrders();
  const navigate = useNavigate();
  const { id } = useParams();
  const { shouldShowOnlyOutlet } = useModalRoute();

  if (id && shouldShowOnlyOutlet) {
    return <Outlet />;
  }

  return (
    <>
      <section className={styles.orders}>
        {!isConnected || isMessageLoading ? (
          <div className={styles.preloader}>
            <Preloader />
          </div>
        ) : orders.length === 0 ? (
          <span className="text text_type_main-small">Заказов нет</span>
        ) : (
          <OrdersHistory
            orders={orders}
            renderOrdersHistoryCard={(order) => (
              <OrdersHistoryCard
                key={order._id}
                order={order}
                isShowStatus
                onClick={() => {
                  void navigate(`/profile/orders/${order._id}?modal=true`);
                }}
              />
            )}
          />
        )}
      </section>
      <Outlet />
    </>
  );
};
