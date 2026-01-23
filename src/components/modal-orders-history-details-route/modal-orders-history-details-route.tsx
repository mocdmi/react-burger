import { FeedPage } from '@/pages/feed/feed';
import { useAppSelector } from '@/services/hooks/use-app-selector';
import { allOrdersHistory } from '@/services/selectors/all-orders-history-selectors';
import { useEffect, useMemo } from 'react';
import { Outlet, useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { useModalActions } from '../modal/hooks/use-modal-actions';

export const ModalOrdersHistoryDetailsRoute = (): React.JSX.Element | null => {
  const { id } = useParams();
  const orders = useAppSelector(allOrdersHistory);
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

  if (!order) return null; // 404 page

  if (modal) {
    return <FeedPage />;
  }

  return <Outlet context={{ order }} />;
};
