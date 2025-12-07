import { useRegisterMutation } from '@/services/api/endpoints/auth-endpoints';
import { getErrorData } from '@/services/api/utils/get-error-data';
import { useAppDispatch } from '@/services/hooks/use-app-dispatch';
import { authSliceActions } from '@/services/slices/auth-slice';
import { useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import type { TForm } from '../types';
import type { TRegisterResponse } from '@/services/types';
import type { LocationState } from '@/types';

type TUseRegisterResult = {
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export const useRegister = (form: TForm): TUseRegisterResult => {
  const [register, { isLoading, isError }] = useRegisterMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const state = location.state as LocationState;
  const from = state?.from?.pathname ?? '/';

  const sendForm = useCallback(async (): Promise<void> => {
    setErrorMessage(undefined);

    try {
      const data = await register(form).unwrap();

      if (!data.success) {
        setErrorMessage(data.message);
        return;
      }

      dispatch(
        authSliceActions.setUser({
          user: data.user,
        })
      );

      void navigate(from, { replace: true });
    } catch (err: unknown) {
      const errorData = getErrorData<TRegisterResponse>(err);
      const message =
        errorData && 'message' in errorData ? errorData.message : 'Неизвестная ошибка';
      setErrorMessage(message);
    }
  }, [form]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    void sendForm();
  };

  return { isLoading, isError, errorMessage, handleSubmit };
};
