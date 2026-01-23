import { API_WS_ORDER_HISTORY_ALL } from '@/const';
import { useGetUser } from '@/hooks/use-get-user';
import { allOrdersHistoryWsConnect } from '@/services/actions/all-orders-history-actions';
import { useAppDispatch } from '@/services/hooks/use-app-dispatch';
import { useAppSelector } from '@/services/hooks/use-app-selector';
import { isOrdersHistoryWsConnected } from '@/services/selectors/all-orders-history-selectors';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { AppHeader } from '../app-header/app-header';

import styles from './layout.module.css';

export const Layout = (): React.JSX.Element => {
  const isConnected = useAppSelector(isOrdersHistoryWsConnected);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isConnected) {
      dispatch(allOrdersHistoryWsConnect(API_WS_ORDER_HISTORY_ALL));
    }
  }, [isConnected]);

  useGetUser();

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={`${styles.main} pl-5 pr-5`}>
        <Outlet />
      </main>
    </div>
  );
};
