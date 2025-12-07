import { useResetPasswordMutation } from '@/services/api/endpoints/auth-endpoints';
import { getErrorData } from '@/services/api/utils/get-error-data';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { TForm } from '../types';
import type { TResetPasswordResponse } from '@/services/types';

type TUseResetPasswordrResult = {
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export const useResetPassword = (form: TForm): TUseResetPasswordrResult => {
  const [resetPassword, { isLoading, isError }] = useResetPasswordMutation();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const sendForm = useCallback(async (): Promise<void> => {
    setErrorMessage(undefined);

    try {
      const data = await resetPassword(form).unwrap();

      if (!data.success) {
        setErrorMessage(data.message);
        return;
      }

      void navigate('/login');
    } catch (err: unknown) {
      const errorData = getErrorData<TResetPasswordResponse>(err);
      const message =
        errorData && 'message' in errorData ? errorData.message : 'Неизвестная ошибка';
      setErrorMessage(message);
    }
  }, [form]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    void sendForm();
  };

  useEffect(() => {
    if (!localStorage.getItem('resetPassword')) {
      void navigate('/forgot-password', { replace: true });
    }
  }, [navigate]);

  return { isLoading, isError, errorMessage, handleSubmit };
};
