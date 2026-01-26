import { NotFound } from '@/pages/not-found/not-found';
import { useGetAllIngredientsQuery } from '@/services/api/endpoints/ingredients-endpoints';
import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useMemo } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';

import { useModalActions } from '../modal/hooks/use-modal-actions';

import type { Location } from 'react-router-dom';

import styles from './modal-ingredients-details-route.module.css';

type TLocationState = {
  backgroundLocation?: Location;
};

export const ModalIngredientsDetailsRoute = (): React.JSX.Element | null => {
  const { id } = useParams();
  const { data, isLoading } = useGetAllIngredientsQuery();
  const { openModal } = useModalActions();
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as TLocationState | undefined;
  const isModal = state?.backgroundLocation;

  const ingredient = useMemo(() => data?.data.find((i) => i._id === id), [data, id]);

  useEffect(() => {
    if (isModal && ingredient) {
      openModal({
        modalType: 'ingredient-details',
        payload: ingredient,
        onClose: () => {
          void navigate(-1);
        },
      });
    }
  }, [ingredient, isModal, id, openModal, navigate]);

  if (isModal) {
    return null;
  }

  if (isLoading) {
    return (
      <div className={styles.preloader}>
        <Preloader />
      </div>
    );
  }

  if (!ingredient) return <NotFound />;

  return <Outlet context={{ ingredient }} />;
};
