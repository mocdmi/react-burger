import { NotFound } from '@/pages/not-found/not-found';
import { useAppSelector } from '@/services/hooks/use-app-selector';
import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useMemo } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';

import { useModalActions } from '../modal/hooks/use-modal-actions';

import type { RootState } from '@/services/store';
import type { TOrdersHistory } from '@/types';
import type { Location } from 'react-router-dom';

import styles from './modal-orders-history-details-route.module.css';

type TModalOrdersHistoryDetailsRouteProps = {
  ordersSelector: (state: RootState) => TOrdersHistory[];
  isConnectedSelector: (state: RootState) => boolean;
  isMessageLoadingSelector: (state: RootState) => boolean;
};

type TLocationState = {
  backgroundLocation?: Location;
};

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
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as TLocationState | undefined;
  const isModal = state?.backgroundLocation;

  const order = useMemo(() => orders.find((i) => i._id === id), [orders, id]);

  useEffect(() => {
    if (isModal && order) {
      openModal({
        modalType: 'orders-history-details',
        payload: order,
        onClose: () => {
          void navigate(-1);
        },
      });
    }
  }, [order, isModal, id, openModal, navigate]);

  if (isModal) {
    return null;
  }

  if (!isConnected || isMessageLoading) {
    return (
      <div className={styles.preloader}>
        <Preloader />
      </div>
    );
  }

  if (!order) return <NotFound />;

  return (
    <Outlet
      context={{
        order,
        isConnected,
        isMessageLoading,
      }}
    />
  );
};
