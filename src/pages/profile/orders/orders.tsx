import { OrdersHistoryCard } from '@/components/orders-history-card/orders-history-card';
import { OrdersHistory } from '@/components/orders-history/orders-history';
import { useDirectNavigation } from '@/hooks/use-direct-navigation';
import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';

import { useOrders } from './hooks/useOrders';

import styles from './orders.module.css';

export const OrdersPage = (): React.JSX.Element => {
  const { isConnected, isMessageLoading, orders } = useOrders();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { isDirectNavigation, isModal } = useDirectNavigation(!!id);

  if (isDirectNavigation) {
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
                  void navigate(`/profile/orders/${order._id}`, {
                    state: { backgroundLocation: location },
                  });
                }}
              />
            )}
          />
        )}
      </section>
      {isModal && <Outlet />}
    </>
  );
};
