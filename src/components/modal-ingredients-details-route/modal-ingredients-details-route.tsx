import { HomePage } from '@/pages/home/home';
import { useGetAllIngredientsQuery } from '@/services/api/endpoints/ingredients-endpoints';
import { useEffect, useMemo } from 'react';
import { Outlet, useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { useModalActions } from '../modal/hooks/use-modal-actions';

// Переделать, убрать search параметры и сделать универсальным
export const ModalIngredientsDetailsRoute = (): React.JSX.Element | null => {
  const { id } = useParams();
  const { data } = useGetAllIngredientsQuery();
  const { openModal } = useModalActions();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const modal = searchParams.get('modal');

  const ingredient = useMemo(() => data?.data.find((i) => i._id === id), [data, id]);

  useEffect(() => {
    if (modal && ingredient) {
      openModal({
        modalType: 'ingredient-details',
        payload: ingredient,
        onClose: () => {
          void navigate(-1);
        },
      });
    }
  }, [modal, ingredient, openModal]);

  if (!ingredient) return null; // 404 page

  if (modal) {
    return <HomePage />;
  }

  return <Outlet context={{ ingredient }} />;
};
