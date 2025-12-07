import { useSendEmailResetPasswordMutation } from '@/services/api/endpoints/auth-endpoints';
import { getErrorData } from '@/services/api/utils/get-error-data';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { TForm } from '../types';
import type { TSendEmailResetPasswordResponse } from '@/services/types';

type TUseForgotPasswordrResult = {
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export const useForgotPassword = (form: TForm): TUseForgotPasswordrResult => {
  const [sendEmailResetPassword, { isLoading, isError }] =
    useSendEmailResetPasswordMutation();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const sendForm = useCallback(async (): Promise<void> => {
    setErrorMessage(undefined);

    try {
      const data = await sendEmailResetPassword(form).unwrap();

      if (!data.success) {
        setErrorMessage(data.message);
        return;
      }

      void navigate('/reset-password', { replace: true });
    } catch (err: unknown) {
      const errorData = getErrorData<TSendEmailResetPasswordResponse>(err);
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
