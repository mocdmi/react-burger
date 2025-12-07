import { useLoginMutation } from '@/services/api/endpoints/auth-endpoints';
import { getErrorData } from '@/services/api/utils/get-error-data';
import { useAppDispatch } from '@/services/hooks/use-app-dispatch';
import { authSliceActions } from '@/services/slices/auth-slice';
import { useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import type { TForm } from '../types';
import type { TLoginResponse } from '@/services/types';
import type { LocationState } from '@/types';

type TUseLoginResult = {
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export const useLogin = (form: TForm): TUseLoginResult => {
  const [login, { isLoading, isError }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const state = location.state as LocationState;
  const from = state?.from?.pathname ?? '/';

  const sendForm = useCallback(async (): Promise<void> => {
    setErrorMessage(undefined);

    try {
      const data = await login(form).unwrap();

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
      const errorData = getErrorData<TLoginResponse>(err);
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
