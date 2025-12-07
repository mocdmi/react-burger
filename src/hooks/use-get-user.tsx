import { useGetCurrentUserQuery } from '@/services/api/endpoints/auth-endpoints';
import { useAppDispatch } from '@/services/hooks/use-app-dispatch';
import { authSliceActions } from '@/services/slices/auth-slice';
import { getCookie } from '@/utils/cookie';
import { useEffect } from 'react';

export const useGetUser = (): void => {
  const dispatch = useAppDispatch();
  const token = getCookie('accessToken');
  const { data } = useGetCurrentUserQuery(undefined, { skip: !token });

  useEffect(() => {
    if (data?.success) {
      dispatch(authSliceActions.setUser(data));
    }
  }, [data]);
};
