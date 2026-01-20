import { FeedOrdersHistory } from '@/components/feed-orders-history/feed-orders-history';
import { FeedSummary } from '@/components/feed-summary/feed-summary';
import { OrdersCard } from '@/components/orders-card/orders-card';
import { API_WS_ORDER_HISTORY_ALL } from '@/const';
import {
  ordersHistory,
  finishedNumbers,
  inProgressNumbers,
} from '@/orders-history.mock';
import { ordersHistoryAllWsConnect } from '@/services/actions/orders-history-all-actions';
import { useAppDispatch } from '@/services/hooks/use-app-dispatch';
import { useEffect } from 'react';

import styles from './feed.module.css';

export const FeedPage = (): React.JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(ordersHistoryAllWsConnect(API_WS_ORDER_HISTORY_ALL));
  }, []);

  return (
    <section className={styles.feed}>
      <h1 className="text text_type_main-large mt-10 mb-5 pl-5">Лента заказов</h1>
      <div className={`${styles.content} pl-5 pr-5`}>
        <FeedOrdersHistory
          orders={ordersHistory}
          renderOrderCard={({ name, number, date, ingredients, sum }) => (
            <OrdersCard
              name={name}
              number={number}
              date={date}
              ingredientsImages={ingredients.map((indredient) => indredient.image)}
              sum={sum}
            />
          )}
        />
        <FeedSummary
          finishedNumbers={finishedNumbers}
          inProgressNumbers={inProgressNumbers}
          finishedToday="138"
          finishedTotal="28 752"
        />
      </div>
    </section>
  );
};
