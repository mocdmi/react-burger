import { useUpdateUserMutation } from '@/services/api/endpoints/auth-endpoints';
import { getErrorData } from '@/services/api/utils/get-error-data';
import { useAppDispatch } from '@/services/hooks/use-app-dispatch';
import { useAppSelector } from '@/services/hooks/use-app-selector';
import { getUser } from '@/services/selectors/user';
import { authSliceActions } from '@/services/slices/auth-slice';
import { useState, useCallback, useMemo } from 'react';

import type { TForm } from '../types';
import type { TLoginResponse } from '@/services/types';

type TUseUserDetailsResult = {
  initForm: TForm;
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export const useUserDetails = (form: TForm): TUseUserDetailsResult => {
  const user = useAppSelector(getUser);
  const [updateUser, { isLoading, isError }] = useUpdateUserMutation();
  const dispatch = useAppDispatch();

  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const initForm: TForm = useMemo(
    () => ({
      name: user?.user?.name ?? '',
      email: user?.user?.email ?? '',
      password: '',
    }),
    [user]
  );

  const sendForm = useCallback(async (): Promise<void> => {
    setErrorMessage(undefined);

    try {
      const data = await updateUser(form).unwrap();

      if (!data.success) {
        setErrorMessage(data.message);
        return;
      }

      dispatch(
        authSliceActions.setUser({
          user: {
            name: data.user.name,
            email: data.user.email,
          },
        })
      );
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

  return { initForm, isLoading, isError, errorMessage, handleSubmit };
};
