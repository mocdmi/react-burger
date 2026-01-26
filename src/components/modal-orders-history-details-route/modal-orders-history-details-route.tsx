import { NotFound } from '@/pages/not-found/not-found';
import { useAppSelector } from '@/services/hooks/use-app-selector';
import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useMemo } from 'react';
import { Outlet, useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { useModalActions } from '../modal/hooks/use-modal-actions';

import type { RootState } from '@/services/store';
import type { TOrdersHistory } from '@/types';

import styles from './modal-orders-history-details-route.module.css';

type TModalOrdersHistoryDetailsRouteProps = {
  ordersSelector: (state: RootState) => TOrdersHistory[];
  isConnectedSelector: (state: RootState) => boolean;
  isMessageLoadingSelector: (state: RootState) => boolean;
};

// Переделать, убрать search параметры и сделать универсальным
export const ModalOrdersHistoryDetailsRoute = ({
  ordersSelector,
  isConnectedSelector,
  isMessageLoadingSelector,
}: TModalOrdersHistoryDetailsRouteProps): React.JSX.Element | null => {
  const { id } = useParams();
  const orders = useAppSelector(ordersSelector);
  const isConnected = useAppSelector(isConnectedSelector);
  const isMessageLoading = useAppSelector(isMessageLoadingSelector);
  const { openModal } = useModalActions();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const modal = searchParams.get('modal');

  const order = useMemo(() => orders.find((i) => i._id === id), [orders, id]);

  useEffect(() => {
    if (modal && order) {
      openModal({
        modalType: 'orders-history-details',
        payload: order,
        onClose: () => {
          void navigate(-1);
        },
      });
    }
  }, [modal, id, openModal, navigate]);

  if (!isConnected || isMessageLoading) {
    return (
      <div className={styles.preloader}>
        <Preloader />
      </div>
    );
  }

  if (!order) return <NotFound />;

  if (modal) {
    return null;
  }

  return <Outlet context={{ order }} />;
};
