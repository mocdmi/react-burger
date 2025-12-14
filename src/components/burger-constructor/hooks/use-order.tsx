import { useModalActions } from '@/components/modal/hooks/use-modal-actions';
import { useCreateOrderMutation } from '@/services/api/endpoints/order-endpoints';
import { useAppDispatch } from '@/services/hooks/use-app-dispatch';
import { ingredientsConstructorActions } from '@/services/slices/ingredients-constructor-slice';
import { isAuth } from '@/utils/is-auth';
import { useCallback, useMemo, useState } from 'react';
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

  const total = useMemo(
    () =>
      ingredients.reduce((acc, ingredient) => {
        if (ingredient.type === 'bun') {
          return acc + ingredient.price * 2;
        }

        return acc + ingredient.price;
      }, 0),
    [ingredients]
  );

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
      const message = err instanceof Error ? err.message : 'Неизвестная ошибка';
      setErrorMessage(message);
    }
  }, [ingredients]);

  return {
    total,
    isLoading,
    isError,
    errorMessage,
    handleSubmit,
  };
};
