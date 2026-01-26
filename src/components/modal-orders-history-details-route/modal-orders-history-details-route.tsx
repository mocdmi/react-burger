import { NotFound } from '@/pages/not-found/not-found';
import { useAppSelector } from '@/services/hooks/use-app-selector';
import { useEffect, useMemo } from 'react';
import { Outlet, useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { useModalActions } from '../modal/hooks/use-modal-actions';

import type { RootState } from '@/services/store';
import type { TOrdersHistory } from '@/types';

type TModalOrdersHistoryDetailsRouteProps = {
  ordersSelector: (state: RootState) => TOrdersHistory[];
  fallbackPage: React.JSX.Element;
};

// Переделать, убрать search параметры и сделать универсальным
export const ModalOrdersHistoryDetailsRoute = ({
  ordersSelector,
  fallbackPage,
}: TModalOrdersHistoryDetailsRouteProps): React.JSX.Element | null => {
  const { id } = useParams();
  const orders = useAppSelector(ordersSelector);
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
  }, [modal, order, openModal]);

  if (!order) return <NotFound />;

  if (modal) {
    return fallbackPage;
  }

  return <Outlet context={{ order }} />;
};
