import { useModalActions } from '@/components/modal/hooks/use-modal-actions';
import { useGetOrderTotal } from '@/hooks/use-get-order-total';
import { useCreateOrderMutation } from '@/services/api/endpoints/order-endpoints';
import { useAppDispatch } from '@/services/hooks/use-app-dispatch';
import { ingredientsConstructorActions } from '@/services/slices/ingredients-constructor-slice';
import { getErrorMessage } from '@/utils/get-error-message';
import { isAuth } from '@/utils/is-auth';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { TConstructorIngredient } from '@/types';

type TUseOrderResult = {
  total: number;
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  handleSubmit: () => Promise<void>;
};

export const useOrder = (ingredients: TConstructorIngredient[]): TUseOrderResult => {
  const { openModal } = useModalActions();
  const dispatch = useAppDispatch();
  const [createOrder, { isLoading, isError }] = useCreateOrderMutation();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const navigate = useNavigate();
  const total = useGetOrderTotal(ingredients);

  const handleSubmit = useCallback(async (): Promise<void> => {
    setErrorMessage(undefined);
    const ids = ingredients.map((ingredient) => ingredient._id);

    if (!isAuth()) {
      void navigate('/login');
      return;
    }

    try {
      const data = await createOrder({ ingredients: ids }).unwrap();

      if (!data.success) {
        setErrorMessage(data.message);
        return;
      }

      openModal({
        modalType: 'order-details',
        payload: { number: data.order.number },
      });
      dispatch(ingredientsConstructorActions.reset());
    } catch (err: unknown) {
      setErrorMessage(getErrorMessage(err));
    }
  }, [ingredients, createOrder, openModal, dispatch, navigate]);

  return {
    total,
    isLoading,
    isError,
    errorMessage,
    handleSubmit,
  };
};
